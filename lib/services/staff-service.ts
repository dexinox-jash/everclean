/**
 * Staff Service
 * V2.0 Infrastructure Upgrade
 * 
 * Handles staff time tracking, GPS check-in/out, and scheduling
 */

import { prisma } from "@/lib/prisma";
import { captureError, EvercleanError } from "@/lib/error-handling";
import { getCache, setCache } from "@/lib/redis";

export interface CheckInInput {
  staffId: string;
  bookingId: string;
  latitude: number;
  longitude: number;
}

export interface CheckOutInput {
  staffId: string;
  bookingId: string;
  latitude: number;
  longitude: number;
  checklistCompleted: Record<string, boolean>;
  serviceNotes?: string;
  suppliesUsed?: string[];
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

const GEOFENCE_RADIUS_METERS = 200; // 200m radius for check-in

/**
 * Get staff member by ID with caching
 */
export async function getStaffById(staffId: string) {
  const cacheKey = `staff:${staffId}`;
  
  // Try cache first
  const cached = await getCache(cacheKey);
  if (cached) return cached;
  
  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
    include: {
      bookings: {
        where: {
          scheduledDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { scheduledDate: "asc" },
        take: 10,
      },
    },
  });
  
  if (staff) {
    await setCache(cacheKey, staff, 300); // Cache for 5 minutes
  }
  
  return staff;
}

/**
 * Check if location is within geofence of booking address
 */
export async function isWithinGeofence(
  bookingId: string,
  location: GeoLocation
): Promise<{ within: boolean; distance: number; address?: string }> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { address: true },
  });
  
  if (!booking || !booking.address) {
    throw new EvercleanError("Booking not found", "BOOKING_NOT_FOUND", 404);
  }
  
  // If address has coordinates, use them
  if (booking.address.latitude && booking.address.longitude) {
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      booking.address.latitude,
      booking.address.longitude
    );
    
    return {
      within: distance <= GEOFENCE_RADIUS_METERS,
      distance,
      address: booking.address.street,
    };
  }
  
  // Without coordinates, allow check-in with warning
  return {
    within: true,
    distance: 0,
    address: booking.address.street,
  };
}

/**
 * Staff check-in with GPS
 */
export async function checkIn(input: CheckInInput) {
  try {
    // Verify staff is assigned to this booking
    const booking = await prisma.booking.findFirst({
      where: {
        id: input.bookingId,
        OR: [
          { staffId: input.staffId },
          { backupStaffId: input.staffId },
        ],
      },
      include: { address: true },
    });
    
    if (!booking) {
      throw new EvercleanError("Not assigned to this booking", "UNAUTHORIZED", 403);
    }
    
    // Check if already checked in
    const existing = await prisma.timeClock.findFirst({
      where: {
        staffId: input.staffId,
        bookingId: input.bookingId,
      },
    });
    
    if (existing?.checkOutAt) {
      throw new EvercleanError("Already checked out", "ALREADY_CHECKED_OUT", 400);
    }
    
    if (existing) {
      throw new EvercleanError("Already checked in", "ALREADY_CHECKED_IN", 400);
    }
    
    // Geofence check (warn but don't block)
    const geofence = await isWithinGeofence(input.bookingId, {
      latitude: input.latitude,
      longitude: input.longitude,
    });
    
    // Create check-in record
    const timeClock = await prisma.timeClock.create({
      data: {
        staffId: input.staffId,
        bookingId: input.bookingId,
        checkInAt: new Date(),
        checkInLat: input.latitude,
        checkInLng: input.longitude,
        checkInAddress: geofence.address,
      },
    });
    
    // Update booking status
    await prisma.booking.update({
      where: { id: input.bookingId },
      data: { status: "IN_PROGRESS" },
    });
    
    // Add to history
    await prisma.bookingHistory.create({
      data: {
        bookingId: input.bookingId,
        action: "STAFF_CHECKED_IN",
        actor: `STAFF:${input.staffId}`,
        details: {
          latitude: input.latitude,
          longitude: input.longitude,
          withinGeofence: geofence.within,
          distance: geofence.distance,
        },
      },
    });
    
    return {
      timeClock,
      geofenceStatus: geofence.within ? "OK" : "WARNING",
      distance: geofence.distance,
    };
  } catch (error) {
    captureError(error, {
      tags: { operation: "checkIn" },
      extras: { staffId: input.staffId, bookingId: input.bookingId },
    });
    throw error;
  }
}

/**
 * Staff check-out with GPS
 */
export async function checkOut(input: CheckOutInput) {
  try {
    // Find existing time clock entry
    const timeClock = await prisma.timeClock.findFirst({
      where: {
        staffId: input.staffId,
        bookingId: input.bookingId,
        checkOutAt: null,
      },
    });
    
    if (!timeClock) {
      throw new EvercleanError("Not checked in", "NOT_CHECKED_IN", 400);
    }
    
    // Geofence check
    const geofence = await isWithinGeofence(input.bookingId, {
      latitude: input.latitude,
      longitude: input.longitude,
    });
    
    // Calculate duration
    const checkInAt = new Date(timeClock.checkInAt);
    const checkOutAt = new Date();
    const durationMinutes = Math.round(
      (checkOutAt.getTime() - checkInAt.getTime()) / 60000
    );
    
    // Update time clock
    const updated = await prisma.timeClock.update({
      where: { id: timeClock.id },
      data: {
        checkOutAt,
        checkOutLat: input.latitude,
        checkOutLng: input.longitude,
        checkOutAddress: geofence.address,
        durationMinutes,
        checklistCompleted: input.checklistCompleted,
        serviceNotes: input.serviceNotes,
        suppliesUsed: input.suppliesUsed || [],
      },
    });
    
    // Update booking status
    await prisma.booking.update({
      where: { id: input.bookingId },
      data: {
        status: "COMPLETED",
        completedAt: checkOutAt,
        checklistCompleted: input.checklistCompleted,
        serviceSummary: input.serviceNotes,
      },
    });
    
    // Add to history
    await prisma.bookingHistory.create({
      data: {
        bookingId: input.bookingId,
        action: "SERVICE_COMPLETED",
        actor: `STAFF:${input.staffId}`,
        details: {
          durationMinutes,
          checklistCompleted: input.checklistCompleted,
        },
      },
    });
    
    return {
      timeClock: updated,
      geofenceStatus: geofence.within ? "OK" : "WARNING",
      durationMinutes,
    };
  } catch (error) {
    captureError(error, {
      tags: { operation: "checkOut" },
      extras: { staffId: input.staffId, bookingId: input.bookingId },
    });
    throw error;
  }
}

/**
 * Get staff schedule for date range
 */
export async function getStaffSchedule(
  staffId: string,
  startDate: Date,
  endDate: Date
) {
  const schedules = await prisma.staffSchedule.findMany({
    where: {
      staffId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: "asc" },
    include: {
      booking: {
        select: {
          id: true,
          bookingNumber: true,
          customerName: true,
          scheduledTime: true,
          status: true,
          service: {
            select: { name: true },
          },
          address: {
            select: { street: true, city: true },
          },
        },
      },
    },
  });
  
  return schedules;
}

/**
 * Get today's bookings for staff member
 */
export async function getTodaysBookings(staffId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        { staffId },
        { backupStaffId: staffId },
      ],
      scheduledDate: {
        gte: today,
        lt: tomorrow,
      },
      status: {
        in: ["CONFIRMED", "IN_PROGRESS"],
      },
    },
    orderBy: { scheduledTime: "asc" },
    include: {
      service: {
        select: { name: true, durationHours: true },
      },
      address: true,
      user: {
        select: { phone: true },
      },
      timeClock: {
        where: { staffId },
      },
    },
  });
  
  return bookings;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
