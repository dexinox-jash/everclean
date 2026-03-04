/**
 * Booking Service
 * V2.0 Infrastructure Upgrade
 * 
 * Enhanced booking operations with Redis caching and Stripe integration
 */

import { prisma } from "@/lib/prisma";
import { getCache, setCache, deleteCache, clearCachePattern } from "@/lib/redis";
import { captureError, EvercleanError } from "@/lib/error-handling";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const CACHE_TTL = {
  BOOKING: 300,      // 5 minutes
  USER_BOOKINGS: 60, // 1 minute
  AVAILABILITY: 120, // 2 minutes
};

/**
 * Get booking by ID with caching
 */
export async function getBookingById(bookingId: string) {
  const cacheKey = `booking:${bookingId}`;
  
  const cached = await getCache(cacheKey);
  if (cached) return cached;
  
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: true,
      address: true,
      staff: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      review: true,
      timeClock: true,
    },
  });
  
  if (booking) {
    await setCache(cacheKey, booking, CACHE_TTL.BOOKING);
  }
  
  return booking;
}

/**
 * Get user's bookings with caching
 */
export async function getUserBookings(userId: string, limit = 10) {
  const cacheKey = `user:${userId}:bookings:${limit}`;
  
  const cached = await getCache(cacheKey);
  if (cached) return cached;
  
  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { scheduledDate: "desc" },
    take: limit,
    include: {
      service: {
        select: { name: true, slug: true },
      },
      address: {
        select: { street: true, city: true },
      },
      staff: {
        select: { name: true, photo: true },
      },
      review: {
        select: { id: true, overallRating: true },
      },
    },
  });
  
  await setCache(cacheKey, bookings, CACHE_TTL.USER_BOOKINGS);
  
  return bookings;
}

/**
 * Invalidate booking caches
 */
export async function invalidateBookingCache(
  bookingId: string,
  userId?: string
): Promise<void> {
  await deleteCache(`booking:${bookingId}`);
  
  if (userId) {
    await clearCachePattern(`user:${userId}:bookings:*`);
  }
}

/**
 * Check availability for a date
 */
export async function checkAvailability(date: Date, serviceId: string) {
  const dateKey = date.toISOString().split("T")[0];
  const cacheKey = `availability:${dateKey}:${serviceId}`;
  
  const cached = await getCache(cacheKey);
  if (cached) return cached;
  
  // Get service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { durationHours: true },
  });
  
  if (!service) {
    throw new EvercleanError("Service not found", "SERVICE_NOT_FOUND", 404);
  }
  
  // Get all bookings for that date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const existingBookings = await prisma.booking.findMany({
    where: {
      scheduledDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        in: ["CONFIRMED", "PENDING"],
      },
    },
    select: {
      scheduledTime: true,
      duration: true,
      teamSize: true,
    },
  });
  
  // Business hours: 8 AM - 6 PM
  const businessHours = {
    start: 8,
    end: 18,
  };
  
  // Generate available slots (every 30 minutes)
  const slots: Array<{ time: string; available: boolean }> = [];
  const durationHours = service.durationHours;
  
  for (let hour = businessHours.start; hour < businessHours.end; hour++) {
    for (const minute of [0, 30]) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      
      // Check if this slot overlaps with any existing booking
      const isAvailable = !existingBookings.some(booking => {
        const [bookingHour, bookingMinute] = booking.scheduledTime.split(":").map(Number);
        const bookingStart = bookingHour * 60 + bookingMinute;
        const bookingEnd = bookingStart + (booking.duration * 60);
        
        const slotStart = hour * 60 + minute;
        const slotEnd = slotStart + (durationHours * 60);
        
        return (slotStart < bookingEnd && slotEnd > bookingStart);
      });
      
      slots.push({ time: timeStr, available: isAvailable });
    }
  }
  
  const result = {
    date: dateKey,
    slots,
    fullyBooked: slots.every(s => !s.available),
  };
  
  await setCache(cacheKey, result, CACHE_TTL.AVAILABILITY);
  
  return result;
}

/**
 * Confirm booking and process payment
 */
export async function confirmBooking(
  bookingId: string,
  paymentIntentId: string
) {
  try {
    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== "succeeded") {
      throw new EvercleanError(
        "Payment not completed",
        "PAYMENT_FAILED",
        400
      );
    }
    
    // Update booking
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        confirmedAt: new Date(),
        amountPaid: paymentIntent.amount / 100,
      },
      include: { user: true },
    });
    
    // Clear caches
    await invalidateBookingCache(bookingId, booking.userId || undefined);
    
    // Add history entry
    await prisma.bookingHistory.create({
      data: {
        bookingId,
        action: "BOOKING_CONFIRMED",
        actor: "SYSTEM",
        details: {
          paymentIntentId,
          amount: paymentIntent.amount,
        },
      },
    });
    
    return booking;
  } catch (error) {
    captureError(error, {
      tags: { operation: "confirmBooking" },
      extras: { bookingId, paymentIntentId },
    });
    throw error;
  }
}

/**
 * Cancel booking with refund logic
 */
export async function cancelBooking(
  bookingId: string,
  userId: string,
  reason?: string
) {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
  });
  
  if (!booking) {
    throw new EvercleanError("Booking not found", "BOOKING_NOT_FOUND", 404);
  }
  
  // Check cancellation policy (24 hours notice)
  const hoursUntilService = (
    booking.scheduledDate.getTime() - Date.now()
  ) / (1000 * 60 * 60);
  
  const isLateCancellation = hoursUntilService < 24;
  
  // Process refund if applicable
  if (booking.paymentStatus === "PAID" && booking.paymentIntentId && !isLateCancellation) {
    try {
      await stripe.refunds.create({
        payment_intent: booking.paymentIntentId,
        reason: "requested_by_customer",
      });
    } catch (error) {
      captureError(error, {
        tags: { operation: "refundFailed" },
        extras: { bookingId, paymentIntentId: booking.paymentIntentId },
      });
    }
  }
  
  // Update booking
  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancellationReason: reason,
      paymentStatus: isLateCancellation ? booking.paymentStatus : "REFUNDED",
    },
  });
  
  // Clear caches
  await invalidateBookingCache(bookingId, userId);
  
  // Add history
  await prisma.bookingHistory.create({
    data: {
      bookingId,
      action: "BOOKING_CANCELLED",
      actor: `USER:${userId}`,
      details: {
        reason,
        isLateCancellation,
        refundProcessed: !isLateCancellation && booking.paymentStatus === "PAID",
      },
    },
  });
  
  return updated;
}

/**
 * Get booking statistics for admin dashboard
 */
export async function getBookingStats(startDate: Date, endDate: Date) {
  const cacheKey = `stats:bookings:${startDate.toISOString()}:${endDate.toISOString()}`;
  
  const cached = await getCache(cacheKey);
  if (cached) return cached;
  
  const [totalBookings, completedBookings, totalRevenue, cancelledBookings] = await Promise.all([
    prisma.booking.count({
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
    }),
    prisma.booking.count({
      where: {
        status: "COMPLETED",
        completedAt: { gte: startDate, lte: endDate },
      },
    }),
    prisma.booking.aggregate({
      where: {
        paymentStatus: "PAID",
        createdAt: { gte: startDate, lte: endDate },
      },
      _sum: { amountPaid: true },
    }),
    prisma.booking.count({
      where: {
        status: "CANCELLED",
        cancelledAt: { gte: startDate, lte: endDate },
      },
    }),
  ]);
  
  const result = {
    totalBookings,
    completedBookings,
    cancelledBookings,
    totalRevenue: totalRevenue._sum.amountPaid || 0,
    completionRate: totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0,
  };
  
  await setCache(cacheKey, result, 60); // Cache for 1 minute
  
  return result;
}
