/**
 * Stripe Webhook Handler
 * V2.0 Infrastructure Upgrade
 * 
 * Handles:
 * - Subscription events (created, updated, cancelled, payment succeeded/failed)
 * - Payment intent events
 * - Invoice events
 */

import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { captureError, logError } from "@/lib/error-handling";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    logError("payment", `Webhook signature verification failed: ${err.message}`);
    return Response.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    captureError(error, {
      tags: { webhook: "stripe", event: event.type },
      extras: { eventId: event.id },
    });
    
    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(stripeSub: Stripe.Subscription) {
  logError("system", "Subscription created in Stripe", {
    stripeSubscriptionId: stripeSub.id,
    status: stripeSub.status,
  });
}

async function handleSubscriptionUpdated(stripeSub: Stripe.Subscription) {
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: stripeSub.id },
  });

  if (!subscription) return;

  let status = subscription.status;
  if (stripeSub.status === "active") status = "ACTIVE";
  else if (stripeSub.status === "paused") status = "PAUSED";
  else if (stripeSub.status === "canceled") status = "CANCELLED";
  else if (stripeSub.status === "past_due") status = "PAST_DUE";

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status },
  });
}

async function handleSubscriptionDeleted(stripeSub: Stripe.Subscription) {
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: stripeSub.id },
  });

  if (!subscription) return;

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
    },
  });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) return;

  logError("payment", "Subscription payment succeeded", {
    subscriptionId: subscription.id,
    invoiceId: invoice.id,
    amount: invoice.amount_paid,
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) return;

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: "PAST_DUE" },
  });

  logError("payment", "Subscription payment failed", {
    subscriptionId: subscription.id,
    invoiceId: invoice.id,
    attemptCount: invoice.attempt_count,
  });
}
