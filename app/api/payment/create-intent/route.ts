/**
 * PAYMENT INTENT API
 * 
 * Creates Stripe payment intents for bookings
 * POST /api/payment/create-intent
 */

import { NextRequest } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return errorResponse("Payment processing is not configured", 503);
    }

    // Parse request body
    const { bookingId } = await request.json();

    if (!bookingId) {
      return errorResponse("Booking ID is required", 400);
    }

    // Get booking from database
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return errorResponse("Booking not found", 404);
    }

    // Check if already paid
    if (booking.paymentStatus === "PAID") {
      return errorResponse("This booking has already been paid", 400);
    }

    // Create or retrieve payment intent
    let paymentIntentId = booking.paymentIntentId;
    let clientSecret: string | null = null;

    if (paymentIntentId) {
      // Retrieve existing payment intent
      const existingIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (existingIntent.status === "succeeded") {
        return errorResponse("Payment already completed", 400);
      }
      
      clientSecret = existingIntent.client_secret;
    } else {
      // Create new payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(booking.calculatedPrice) * 100), // Convert to cents
        currency: "cad",
        automatic_payment_methods: { enabled: true },
        metadata: {
          bookingId: booking.id,
          bookingNumber: booking.bookingNumber,
          customerEmail: booking.customerEmail,
          serviceName: booking.serviceName,
        },
        receipt_email: booking.customerEmail,
        description: `Everclean - ${booking.serviceName} (${booking.bookingNumber})`,
      });

      // Save payment intent ID to booking
      await db.booking.update({
        where: { id: booking.id },
        data: { 
          paymentIntentId: paymentIntent.id,
          paymentStatus: "PROCESSING",
        },
      });

      paymentIntentId = paymentIntent.id;
      clientSecret = paymentIntent.client_secret;
    }

    return successResponse({
      clientSecret,
      paymentIntentId,
      amount: Number(booking.calculatedPrice),
      currency: "cad",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
