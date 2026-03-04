/**
 * Subscriptions API
 * POST: Create new subscription
 * GET: Get user's subscriptions
 */

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { createSubscription, calculateSubscriptionPricing } from "@/lib/services/subscription-service";
import { handleApiError, EvercleanError } from "@/lib/error-handling";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  serviceId: z.string(),
  frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
  homeSize: z.string(),
  addressId: z.string(),
  preferredDay: z.string(),
  preferredTime: z.string(),
  paymentMethodId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const body = await request.json();
    const validated = createSchema.parse(body);

    const result = await createSubscription({
      userId: session.user.id,
      customerEmail: session.user.email!,
      customerName: session.user.name || session.user.email!,
      ...validated,
    });

    return Response.json({
      success: true,
      subscription: {
        id: result.dbSubscription.id,
        stripeId: result.subscription.id,
        status: result.subscription.status,
        clientSecret: (result.subscription.latest_invoice as any)?.payment_intent?.client_secret,
      },
    });
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: "/api/subscriptions",
    });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      include: {
        service: {
          select: { name: true, slug: true },
        },
        bookings: {
          take: 4,
          orderBy: { scheduledDate: "asc" },
          select: {
            id: true,
            scheduledDate: true,
            scheduledTime: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ subscriptions });
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: "/api/subscriptions",
    });
  }
}
