import { z } from "zod";

// ============================================================================
// BOOKING VALIDATIONS
// ============================================================================

export const homeSizeEnum = z.enum([
  "studio",
  "1bed",
  "2bed", 
  "3bed",
  "4bed",
  "estate"
]);

export const accessTypeEnum = z.enum([
  "present",
  "key",
  "lockbox",
  "doorman"
]);

export const bookingStep1Schema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
});

export const bookingStep2Schema = z.object({
  homeSize: homeSizeEnum,
  hasPets: z.boolean().default(false),
  hasFineArt: z.boolean().default(false),
});

export const bookingStep3Schema = z.object({
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  scheduledTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
});

export const bookingStep4Schema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  address: z.object({
    street: z.string().min(5, "Please enter a valid street address"),
    city: z.string().min(2, "Please enter a city"),
    postalCode: z.string().min(6, "Please enter a valid postal code"),
  }),
  accessType: accessTypeEnum,
  specialRequests: z.string().max(1000, "Please keep requests under 1000 characters").optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to our privacy policy to continue",
  }),
});

export const bookingCompleteSchema = z.object({
  serviceId: z.string(),
  homeSize: homeSizeEnum,
  hasPets: z.boolean(),
  hasFineArt: z.boolean(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    province: z.string().default("Ontario"),
    country: z.string().default("Canada"),
  }),
  accessType: accessTypeEnum,
  specialRequests: z.string().optional(),
  gdprConsent: z.boolean(),
  calculatedPrice: z.number().positive(),
  paymentIntentId: z.string().optional(),
});

export type BookingStep1Input = z.infer<typeof bookingStep1Schema>;
export type BookingStep2Input = z.infer<typeof bookingStep2Schema>;
export type BookingStep3Input = z.infer<typeof bookingStep3Schema>;
export type BookingStep4Input = z.infer<typeof bookingStep4Schema>;
export type BookingCompleteInput = z.infer<typeof bookingCompleteSchema>;

// ============================================================================
// CONTACT FORM VALIDATIONS
// ============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(["consultation", "quote", "careers", "general"]),
  message: z.string().min(10, "Please provide more details (at least 10 characters)").max(2000, "Please keep your message under 2000 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ============================================================================
// USER PROFILE VALIDATIONS
// ============================================================================

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  preferredContact: z.enum(["email", "sms", "call"]),
  notesForStaff: z.string().max(1000).optional(),
  entryInstructions: z.string().max(1000).optional(),
  marketingConsent: z.boolean(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

// ============================================================================
// ADDRESS VALIDATIONS
// ============================================================================

export const addressSchema = z.object({
  street: z.string().min(5, "Please enter a valid street address"),
  city: z.string().min(2, "Please enter a city"),
  postalCode: z.string().min(6, "Please enter a valid postal code"),
  province: z.string().default("Ontario"),
  country: z.string().default("Canada"),
  isPrimary: z.boolean().default(false),
  accessNotes: z.string().max(500).optional(),
  parkingInfo: z.string().max(500).optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;

// ============================================================================
// GIFT CARD VALIDATIONS
// ============================================================================

export const giftCardSchema = z.object({
  amount: z.number().min(100).max(2000),
  purchaserName: z.string().min(2),
  purchaserEmail: z.string().email(),
  recipientName: z.string().optional(),
  recipientEmail: z.string().email().optional(),
  message: z.string().max(500).optional(),
});

export type GiftCardInput = z.infer<typeof giftCardSchema>;

// ============================================================================
// REVIEW VALIDATIONS
// ============================================================================

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
