/**
 * EMAIL SERVICE
 * 
 * Handles all email notifications using Resend
 * Includes booking confirmations, reminders, and admin alerts
 */

import { Resend } from "resend";
import { Booking, ContactForm, Address, Service } from "@prisma/client";

// Extended booking type with address and service
interface BookingWithAddress extends Booking {
  address?: Address | null;
  service?: Service | null;
}

// Initialize Resend client
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Everclean <hello@everclean.ca>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@everclean.ca";

// =============================================================================
// BOOKING EMAILS
// =============================================================================

/**
 * Send booking confirmation to customer
 */
export async function sendBookingConfirmation(booking: BookingWithAddress) {
  if (!resend) {
    console.log("Email service not configured. Booking confirmation:", booking.bookingNumber);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.customerEmail,
      subject: `Booking Confirmation - ${booking.bookingNumber}`,
      html: generateBookingConfirmationHtml(booking),
      text: generateBookingConfirmationText(booking),
    });

    if (error) {
      console.error("Failed to send booking confirmation:", error);
      return;
    }

    console.log("Booking confirmation sent:", data?.id);
  } catch (error) {
    console.error("Error sending booking confirmation:", error);
  }
}

/**
 * Send booking notification to admin
 */
export async function sendAdminBookingNotification(booking: Booking) {
  if (!resend) {
    console.log("Email service not configured. Admin notification for:", booking.bookingNumber);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking - ${booking.bookingNumber}`,
      html: generateAdminBookingHtml(booking),
      text: generateAdminBookingText(booking),
    });

    if (error) {
      console.error("Failed to send admin notification:", error);
      return;
    }

    console.log("Admin notification sent:", data?.id);
  } catch (error) {
    console.error("Error sending admin notification:", error);
  }
}

// =============================================================================
// CONTACT FORM EMAILS
// =============================================================================

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(contact: ContactForm) {
  if (!resend) {
    console.log("Email service not configured. Contact form from:", contact.email);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form - ${contact.subject}`,
      replyTo: contact.email,
      html: generateContactHtml(contact),
      text: generateContactText(contact),
    });

    if (error) {
      console.error("Failed to send contact notification:", error);
      return;
    }

    console.log("Contact notification sent:", data?.id);
  } catch (error) {
    console.error("Error sending contact notification:", error);
  }
}

/**
 * Send contact form auto-reply to customer
 */
export async function sendContactAutoReply(contact: ContactForm) {
  if (!resend) {
    console.log("Email service not configured. Auto-reply to:", contact.email);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: contact.email,
      subject: "We received your message - Everclean",
      html: generateContactAutoReplyHtml(contact),
      text: generateContactAutoReplyText(contact),
    });

    if (error) {
      console.error("Failed to send contact auto-reply:", error);
      return;
    }

    console.log("Contact auto-reply sent:", data?.id);
  } catch (error) {
    console.error("Error sending contact auto-reply:", error);
  }
}

// =============================================================================
// EMAIL TEMPLATES
// =============================================================================

function generateBookingConfirmationHtml(booking: BookingWithAddress): string {
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://everclean.ca"}/icon-192.png`;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Georgia, serif; line-height: 1.6; color: #1c1917; background: #faf9f6; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { display: flex; flex-direction: column; align-items: center; margin-bottom: 8px; }
        .logo img { width: 64px; height: 64px; border-radius: 12px; }
        .logo-text { font-size: 28px; color: #1a202c; margin-top: 8px; }
        .tagline { font-size: 12px; color: #c9a962; letter-spacing: 2px; text-transform: uppercase; }
        .booking-number { background: #1a202c; color: #fff; padding: 12px 24px; display: inline-block; margin: 20px 0; }
        .details { background: #fff; padding: 30px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e7e5e4; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #78716c; font-size: 14px; }
        .value { color: #1c1917; font-weight: 500; }
        .price { font-size: 24px; color: #1a202c; font-weight: 600; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }
        .button { background: #1a202c; color: #fff; padding: 14px 28px; text-decoration: none; display: inline-block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="${logoUrl}" alt="Everclean Luxury Services" />
            <div class="logo-text">Everclean</div>
          </div>
          <div class="tagline">Luxury Services</div>
        </div>
        
        <div style="text-align: center;">
          <h1 style="font-weight: normal; margin-bottom: 10px;">Thank You for Your Booking</h1>
          <p style="color: #78716c;">Your reservation has been received and is being processed.</p>
          <div class="booking-number">${booking.bookingNumber}</div>
        </div>
        
        <div class="details">
          <h2 style="font-weight: normal; margin-top: 0; border-bottom: 2px solid #c9a962; padding-bottom: 10px; display: inline-block;">Booking Details</h2>
          
          <div class="detail-row">
            <span class="label">Service</span>
            <span class="value">${booking.service?.name || "N/A"}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Date</span>
            <span class="value">${new Date(booking.scheduledDate).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Time</span>
            <span class="value">${booking.scheduledTime}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Address</span>
            <span class="value">${booking.address?.street || "N/A"}, ${booking.address?.city || "N/A"}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Home Size</span>
            <span class="value">${booking.homeSize}</span>
          </div>
          
          ${booking.specialRequests ? `
          <div class="detail-row" style="flex-direction: column; gap: 8px;">
            <span class="label">Special Requests</span>
            <span class="value" style="font-weight: normal;">${booking.specialRequests}</span>
          </div>
          ` : ""}
          
          <div class="detail-row" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #1a202c;">
            <span class="label">Total</span>
            <span class="price">$${Number(booking.calculatedPrice).toFixed(2)} CAD</span>
          </div>
        </div>
        
        <div style="background: #fdf9f3; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #78716c;">Payment Status</p>
          <p style="margin: 8px 0 0; font-size: 18px; font-weight: 500; color: ${booking.paymentStatus === "PAID" ? "#059669" : "#d97706"};">
            ${booking.paymentStatus === "PAID" ? "✓ Paid" : "⏳ Payment Pending"}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #78716c; font-size: 14px;">Need to make changes?</p>
          <a href="mailto:hello@everclean.ca?subject=Booking Change Request - ${booking.bookingNumber}" class="button">Contact Us</a>
        </div>
        
        <div class="footer">
          <p>Everclean Luxury Services</p>
          <p>Kitchener-Waterloo, Ontario</p>
          <p><a href="tel:+15195550123" style="color: #c9a962;">+1 (519) 555-0123</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateBookingConfirmationText(booking: BookingWithAddress): string {
  return `
EVERCLEAN LUXURY SERVICES

Thank You for Your Booking

Booking Number: ${booking.bookingNumber}

BOOKING DETAILS
---------------
Service: ${booking.service?.name || "N/A"}
Date: ${new Date(booking.scheduledDate).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Time: ${booking.scheduledTime}
Address: ${booking.address?.street || "N/A"}, ${booking.address?.city || "N/A"}
Home Size: ${booking.homeSize}

${booking.specialRequests ? `Special Requests: ${booking.specialRequests}\n` : ""}
Total: $${Number(booking.calculatedPrice).toFixed(2)} CAD
Payment Status: ${booking.paymentStatus}

Need to make changes? Contact us at hello@everclean.ca or call +1 (519) 555-0123

Everclean Luxury Services
Kitchener-Waterloo, Ontario
  `.trim();
}

function generateAdminBookingHtml(booking: BookingWithAddress): string {
  return `
    <h2>New Booking Received</h2>
    <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
    <p><strong>Customer:</strong> ${booking.customerName}</p>
    <p><strong>Email:</strong> ${booking.customerEmail}</p>
    <p><strong>Phone:</strong> ${booking.customerPhone}</p>
    <p><strong>Service:</strong> ${booking.service?.name || "N/A"}</p>
    <p><strong>Date:</strong> ${new Date(booking.scheduledDate).toLocaleDateString()}</p>
    <p><strong>Time:</strong> ${booking.scheduledTime}</p>
    <p><strong>Address:</strong> ${booking.address?.street || "N/A"}, ${booking.address?.city || "N/A"}</p>
    <p><strong>Amount:</strong> $${Number(booking.calculatedPrice).toFixed(2)}</p>
  `;
}

function generateAdminBookingText(booking: Booking): string {
  return `New booking received: ${booking.bookingNumber} from ${booking.customerName}`;
}

function generateContactHtml(contact: ContactForm): string {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
    <p><strong>Subject:</strong> ${contact.subject}</p>
    <hr/>
    <p><strong>Message:</strong></p>
    <p>${contact.message.replace(/\n/g, "<br/>")}</p>
  `;
}

function generateContactText(contact: ContactForm): string {
  return `New contact from ${contact.name} (${contact.email}): ${contact.subject}`;
}

function generateContactAutoReplyHtml(contact: ContactForm): string {
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://everclean.ca"}/icon-192.png`;
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${logoUrl}" alt="Everclean Luxury Services" style="width: 64px; height: 64px; border-radius: 12px;" />
        <div style="font-size: 24px; color: #1a202c; margin-top: 8px;">Everclean</div>
        <div style="font-size: 12px; color: #c9a962; letter-spacing: 2px; text-transform: uppercase;">Luxury Services</div>
      </div>
      <h1 style="font-weight: normal; color: #1a202c;">Thank You for Contacting Us</h1>
      <p>Dear ${contact.name},</p>
      <p>We have received your message regarding "${contact.subject}" and will get back to you within 24 hours.</p>
      <p>For urgent matters, please call us at <a href="tel:+15195550123" style="color: #c9a962;">+1 (519) 555-0123</a>.</p>
      <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;"/>
      <p style="color: #78716c; font-size: 14px;">Everclean Luxury Services</p>
    </div>
  `;
}

function generateContactAutoReplyText(contact: ContactForm): string {
  return `Thank you for contacting Everclean. We have received your message and will respond within 24 hours.`;
}
