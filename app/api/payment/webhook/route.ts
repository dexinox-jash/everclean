/**
 * STRIPE WEBHOOK HANDLER
 * 
 * Handles Stripe webhook events
 * POST /api/payment/webhook
 */

import { NextRequest } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email/service";

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!stripe || !webhookSecret) {
      return new Response("Webhook not configured", { status: 503 });
    }

    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response("Invalid signature", { status: 400 });
    }

    // Handle events
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(paymentIntent);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleRefund(charge);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId;
  
  if (!bookingId) {
    console.error("No booking ID in payment intent metadata");
    return;
  }

  try {
    // Update booking status
    const booking = await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "PAID",
        amountPaid: paymentIntent.amount_received / 100,
        status: "CONFIRMED",
        confirmedAt: new Date(),
      },
    });

    // Send confirmation email
    await sendBookingConfirmation(booking);

    console.log(`Payment succeeded for booking ${booking.bookingNumber}`);
  } catch (error) {
    console.error("Error processing payment success:", error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId;
  
  if (!bookingId) return;

  try {
    await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "FAILED",
      },
    });

    console.log(`Payment failed for booking ${bookingId}`);
  } catch (error) {
    console.error("Error processing payment failure:", error);
  }
}

async function handleRefund(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent as string;
  
  if (!paymentIntentId) return;

  try {
    // Find booking by payment intent ID
    const booking = await db.booking.findFirst({
      where: { paymentIntentId },
    });

    if (!booking) return;

    await db.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: charge.refunded ? "REFUNDED" : "PARTIALLY_REFUNDED",
      },
    });

    console.log(`Refund processed for booking ${booking.bookingNumber}`);
  } catch (error) {
    console.error("Error processing refund:", error);
  }
}
