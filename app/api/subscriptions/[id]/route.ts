/**
 * Subscription Detail API
 * PATCH: Pause/Resume/Cancel subscription
 * GET: Get subscription details
 */

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { pauseSubscription, resumeSubscription, cancelSubscription } from "@/lib/services/subscription-service";
import { handleApiError, EvercleanError } from "@/lib/error-handling";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  action: z.enum(["pause", "resume", "cancel"]),
  pauseUntil: z.string().datetime().optional(),
  reason: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const body = await request.json();
    const { action, pauseUntil, reason } = updateSchema.parse(body);

    switch (action) {
      case "pause":
        if (!pauseUntil) {
          throw new EvercleanError("pauseUntil required", "VALIDATION_ERROR", 400);
        }
        await pauseSubscription(params.id, session.user.id, new Date(pauseUntil), reason);
        break;

      case "resume":
        await resumeSubscription(params.id, session.user.id);
        break;

      case "cancel":
        await cancelSubscription(params.id, session.user.id, reason);
        break;
    }

    return Response.json({ success: true });
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: `/api/subscriptions/${params.id}`,
    });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new EvercleanError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        service: true,
        bookings: {
          take: 10,
          orderBy: { scheduledDate: "desc" },
          include: {
            staff: { select: { name: true, photo: true } },
            review: { select: { overallRating: true } },
          },
        },
      },
    });

    if (!subscription) {
      throw new EvercleanError("Subscription not found", "NOT_FOUND", 404);
    }

    return Response.json({ subscription });
  } catch (error) {
    return handleApiError(error, {
      userId: (await auth())?.user?.id,
      path: `/api/subscriptions/${params.id}`,
    });
  }
}
