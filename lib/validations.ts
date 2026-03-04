/**
 * VALIDATION SCHEMAS
 * 
 * Zod schemas for form validation
 * Used across the application for consistent validation
 */

import { z } from "zod";

// =============================================================================
// BOOKING VALIDATIONS
// =============================================================================

export const bookingSchema = z.object({
  // Customer Information
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  
  // Service Details
  serviceId: z.string().min(1, "Please select a service"),
  serviceName: z.string(),
  homeSize: z.string().min(1, "Please select your home size"),
  price: z.number().positive("Invalid price"),
  
  // Schedule
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  scheduledTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  
  // Address
  address: z.string().min(5, "Please enter your full address").max(200),
  city: z.enum(["kitchener", "waterloo", "cambridge"], {
    errorMap: () => ({ message: "Please select a city" }),
  }),
  postalCode: z.string().optional(),
  
  // Additional Info
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
  specialRequests: z.string().max(1000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// =============================================================================
// CONTACT FORM VALIDATIONS
// =============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(
    ["general", "booking", "quote", "feedback", "careers"],
    { errorMap: () => ({ message: "Please select a subject" }) }
  ),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// =============================================================================
// PAYMENT VALIDATIONS
// =============================================================================

export const paymentIntentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("cad"),
});

export type PaymentIntentInput = z.infer<typeof paymentIntentSchema>;

// =============================================================================
// USER VALIDATIONS
// =============================================================================

export const userProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

// =============================================================================
// SERVICE VALIDATIONS
// =============================================================================

export const serviceSchema = z.object({
  slug: z.string().min(1).max(50),
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(2000),
  shortDescription: z.string().min(10).max(200),
  basePrice: z.number().positive(),
  duration: z.string().min(1),
  features: z.array(z.string()),
  bestFor: z.string().optional(),
  icon: z.string(),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validate Canadian postal code
 */
export function isValidCanadianPostalCode(code: string): boolean {
  const pattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return pattern.test(code);
}

/**
 * Validate Canadian phone number
 */
export function isValidCanadianPhoneNumber(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  // Should be 10 digits (without country code) or 11 with country code
  return /^1?\d{10}$/.test(cleaned);
}

/**
 * Format Canadian phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(1)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
}

/**
 * Validate booking date (must be in the future)
 */
export function isValidBookingDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/**
 * Validate booking time is within business hours
 */
export function isValidBookingTime(timeString: string): boolean {
  const [hours, minutes] = timeString.split(":").map(Number);
  const time = hours + minutes / 60;
  // Business hours: 8 AM to 6 PM
  return time >= 8 && time <= 18;
}
