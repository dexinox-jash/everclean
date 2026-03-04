import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingCompleteSchema } from "@/lib/validations/index";
import { generateBookingNumber } from "@/lib/utils";

// Rate limiting helper (simple in-memory)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = requestCounts.get(ip);
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// ============================================================================
// POST /api/bookings - Create a new booking
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? "anonymous";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validation = bookingCompleteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Generate booking number
    const bookingNumber = generateBookingNumber();

    // Calculate end time
    const service = await db.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Parse scheduled time and calculate end time
    const [hours, minutes] = data.scheduledTime.split(":").map(Number);
    const endHours = hours + Math.floor(service.durationHours);
    const endMinutes = minutes + Math.round((service.durationHours % 1) * 60);
    const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

    // Create address first
    const address = await db.address.create({
      data: {
        street: data.address.street,
        city: data.address.city,
        postalCode: data.address.postalCode,
        province: data.address.province || "Ontario",
        country: data.address.country || "Canada",
      },
    });

    // Create booking
    const booking = await db.booking.create({
      data: {
        bookingNumber,
        serviceId: data.serviceId,
        addressId: address.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        homeSize: data.homeSize,
        hasPets: data.hasPets,
        hasFineArt: data.hasFineArt,
        calculatedPrice: data.calculatedPrice,
        specialRequests: data.specialRequests,
        accessType: data.accessType,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime,
        duration: Math.ceil(service.durationHours),
        estimatedHours: service.durationHours,
        endTime,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
    });

    // Create booking history
    await db.bookingHistory.create({
      data: {
        bookingId: booking.id,
        action: "CREATED",
        actor: "SYSTEM",
        details: { source: "web_booking" },
      },
    });

    // TODO: Send confirmation email
    // await sendBookingConfirmation(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        data: {
          booking: {
            id: booking.id,
            bookingNumber: booking.bookingNumber,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            scheduledDate: booking.scheduledDate,
            scheduledTime: booking.scheduledTime,
            calculatedPrice: booking.calculatedPrice,
            status: booking.status,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking. Please try again.",
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/bookings - List bookings (admin or user-specific)
// ============================================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};

    if (email) {
      where.customerEmail = email;
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const [bookings, total] = await Promise.all([
      db.booking.findMany({
        where,
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
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
