/**
 * Staff Bookings API
 * GET: Get today's bookings and upcoming schedule for staff member
 */

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getTodaysBookings, getStaffSchedule } from "@/lib/services/staff-service";
import { handleApiError, EvercleanError } from "@/lib/error-handling";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "today";

    if (view === "today") {
      const bookings = await getTodaysBookings(staff.id);
      return Response.json({ bookings });
    }

    if (view === "schedule") {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 14);

      const schedule = await getStaffSchedule(staff.id, startDate, endDate);
      return Response.json({ schedule });
    }

    throw new EvercleanError("Invalid view parameter", "VALIDATION_ERROR", 400);
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: "/api/staff/bookings",
    });
  }
}
