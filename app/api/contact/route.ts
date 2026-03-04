import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

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

    // Validate
    const validation = contactFormSchema.safeParse(body);
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

    // Save to database
    const contactForm = await db.contactForm.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: "NEW",
      },
    });

    // TODO: Send notification email to admin
    // await sendContactNotification(contactForm);

    // TODO: Send auto-reply to user
    // await sendContactAutoReply(data.email, data.name);

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll respond within 2 business hours.",
        data: { id: contactForm.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit message. Please try again." },
      { status: 500 }
    );
  }
}
