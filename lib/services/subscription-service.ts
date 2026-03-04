/**
 * Subscription Service
 * V2.0 Infrastructure Upgrade
 * 
 * Handles Stripe Subscription API integration for recurring cleaning services
 */

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { captureError, EvercleanError } from "@/lib/error-handling";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

export interface CreateSubscriptionInput {
  userId: string;
  serviceId: string;
  frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY";
  homeSize: string;
  addressId: string;
  preferredDay: string;
  preferredTime: string;
  customerEmail: string;
  customerName: string;
  paymentMethodId: string;
}

export interface SubscriptionPricing {
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  interval: "week" | "month";
  intervalCount: number;
}

/**
 * Calculate subscription pricing
 */
export function calculateSubscriptionPricing(
  basePrice: number,
  frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY"
): SubscriptionPricing {
  const discounts = {
    WEEKLY: 15,
    BIWEEKLY: 10,
    MONTHLY: 5,
  };

  const intervals = {
    WEEKLY: { interval: "week" as const, intervalCount: 1 },
    BIWEEKLY: { interval: "week" as const, intervalCount: 2 },
    MONTHLY: { interval: "month" as const, intervalCount: 1 },
  };

  const discountPercent = discounts[frequency];
  const discountAmount = (basePrice * discountPercent) / 100;
  const finalPrice = Math.round((basePrice - discountAmount) * 100) / 100;

  return {
    basePrice,
    discountPercent,
    finalPrice,
    ...intervals[frequency],
  };
}

/**
 * Create a new subscription
 */
export async function createSubscription(
  input: CreateSubscriptionInput
): Promise<{ subscription: Stripe.Subscription; dbSubscription: any }> {
  try {
    const service = await prisma.service.findUnique({
      where: { id: input.serviceId },
    });

    if (!service) {
      throw new EvercleanError("Service not found", "SERVICE_NOT_FOUND", 404);
    }

    const pricing = calculateSubscriptionPricing(
      service.basePrice.toNumber(),
      input.frequency
    );

    let customerId: string;
    const existingCustomer = await stripe.customers.list({
      email: input.customerEmail,
      limit: 1,
    });

    if (existingCustomer.data.length > 0) {
      customerId = existingCustomer.data[0].id;
      await stripe.paymentMethods.attach(input.paymentMethodId, {
        customer: customerId,
      });
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: input.paymentMethodId,
        },
      });
    } else {
      const customer = await stripe.customers.create({
        email: input.customerEmail,
        name: input.customerName,
        payment_method: input.paymentMethodId,
        invoice_settings: {
          default_payment_method: input.paymentMethodId,
        },
      });
      customerId = customer.id;
    }

    const price = await stripe.prices.create({
      unit_amount: Math.round(pricing.finalPrice * 100),
      currency: "cad",
      recurring: {
        interval: pricing.interval,
        interval_count: pricing.intervalCount,
      },
      product_data: {
        name: `Everclean ${service.name} - ${input.frequency.toLowerCase()}`,
      },
    });

    const stripeSubscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        userId: input.userId,
        serviceId: input.serviceId,
        frequency: input.frequency,
        homeSize: input.homeSize,
        addressId: input.addressId,
      },
    });

    const nextBookingDate = calculateNextBookingDate(
      input.preferredDay,
      input.preferredTime,
      input.frequency
    );

    const dbSubscription = await prisma.subscription.create({
      data: {
        userId: input.userId,
        serviceId: input.serviceId,
        frequency: input.frequency,
        basePrice: pricing.basePrice,
        discountPercent: pricing.discountPercent,
        finalPrice: pricing.finalPrice,
        homeSize: input.homeSize,
        addressId: input.addressId,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId: customerId,
        preferredDay: input.preferredDay,
        preferredTime: input.preferredTime,
        nextBookingDate,
        status: "ACTIVE",
      },
    });

    return {
      subscription: stripeSubscription,
      dbSubscription,
    };
  } catch (error) {
    captureError(error, {
      tags: { operation: "createSubscription" },
      extras: { userId: input.userId, frequency: input.frequency },
    });
    throw error;
  }
}

/**
 * Pause a subscription
 */
export async function pauseSubscription(
  subscriptionId: string,
  userId: string,
  pauseUntil: Date,
  reason?: string
): Promise<void> {
  const subscription = await prisma.subscription.findFirst({
    where: { id: subscriptionId, userId },
  });

  if (!subscription) {
    throw new EvercleanError("Subscription not found", "NOT_FOUND", 404);
  }

  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    pause_collection: { behavior: "void" },
  });

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: "PAUSED",
      pausedUntil: pauseUntil,
      pauseReason: reason,
    },
  });
}

/**
 * Resume a subscription
 */
export async function resumeSubscription(
  subscriptionId: string,
  userId: string
): Promise<void> {
  const subscription = await prisma.subscription.findFirst({
    where: { id: subscriptionId, userId },
  });

  if (!subscription) {
    throw new EvercleanError("Subscription not found", "NOT_FOUND", 404);
  }

  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    pause_collection: "",
  });

  const nextBookingDate = calculateNextBookingDate(
    subscription.preferredDay,
    subscription.preferredTime,
    subscription.frequency
  );

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: "ACTIVE",
      pausedUntil: null,
      pauseReason: null,
      nextBookingDate,
    },
  });
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  userId: string,
  cancelReason?: string
): Promise<void> {
  const subscription = await prisma.subscription.findFirst({
    where: { id: subscriptionId, userId },
  });

  if (!subscription) {
    throw new EvercleanError("Subscription not found", "NOT_FOUND", 404);
  }

  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancelReason,
    },
  });
}

/**
 * Calculate next booking date
 */
function calculateNextBookingDate(
  preferredDay: string,
  preferredTime: string,
  frequency: string
): Date {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const targetDay = daysOfWeek.indexOf(preferredDay);
  
  const now = new Date();
  const result = new Date(now);
  
  result.setDate(result.getDate() + ((targetDay + 7 - result.getDay()) % 7));
  
  const [hours, minutes] = preferredTime.split(":").map(Number);
  if (result.getDay() === now.getDay() && now.getHours() >= hours) {
    result.setDate(result.getDate() + 7);
  }
  
  result.setHours(hours, minutes, 0, 0);
  
  return result;
}
