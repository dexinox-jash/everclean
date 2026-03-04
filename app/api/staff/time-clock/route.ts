/**
 * Staff Time Clock API
 * POST: Check in / Check out with GPS
 * GET: Get time clock entries for staff
 */

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { checkIn, checkOut } from "@/lib/services/staff-service";
import { handleApiError, EvercleanError } from "@/lib/error-handling";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const checkInSchema = z.object({
  bookingId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

const checkOutSchema = z.object({
  bookingId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  checklistCompleted: z.record(z.boolean()),
  serviceNotes: z.string().optional(),
  suppliesUsed: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const staff = await prisma.staff.findUnique({
      where: { email: session.user.email! },
    });

    if (!staff) {
      throw new EvercleanError("Staff record not found", "NOT_FOUND", 404);
    }

    const body = await request.json();
    const action = body.action;

    if (action === "checkin") {
      const data = checkInSchema.parse(body);
      const result = await checkIn({
        staffId: staff.id,
        ...data,
      });
      return Response.json(result);
    }

    if (action === "checkout") {
      const data = checkOutSchema.parse(body);
      const result = await checkOut({
        staffId: staff.id,
        ...data,
      });
      return Response.json(result);
    }

    throw new EvercleanError("Invalid action", "VALIDATION_ERROR", 400);
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: "/api/staff/time-clock",
    });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const staff = await prisma.staff.findUnique({
      where: { email: session.user.email! },
    });

    if (!staff) {
      throw new EvercleanError("Staff record not found", "NOT_FOUND", 404);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeClocks = await prisma.timeClock.findMany({
      where: {
        staffId: staff.id,
        checkInAt: { gte: today },
      },
      include: {
        booking: {
          select: {
            id: true,
            bookingNumber: true,
            customerName: true,
            scheduledTime: true,
            status: true,
          },
        },
      },
      orderBy: { checkInAt: "desc" },
    });

    return Response.json({ timeClocks });
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: "/api/staff/time-clock",
    });
  }
}
