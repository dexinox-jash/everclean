/**
 * Error Handling Utilities
 * V2.0 Infrastructure Upgrade
 * 
 * Centralized error handling with Sentry integration
 */

import * as Sentry from "@sentry/nextjs";

export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class EvercleanError extends Error implements AppError {
  code: string;
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "EvercleanError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Predefined error types
export const Errors = {
  // Authentication errors
  UNAUTHORIZED: new EvercleanError(
    "You must be signed in to access this resource",
    "UNAUTHORIZED",
    401
  ),
  FORBIDDEN: new EvercleanError(
    "You do not have permission to access this resource",
    "FORBIDDEN",
    403
  ),
  
  // Booking errors
  BOOKING_NOT_FOUND: new EvercleanError(
    "Booking not found",
    "BOOKING_NOT_FOUND",
    404
  ),
  INVALID_BOOKING_DATE: new EvercleanError(
    "The selected date is not available",
    "INVALID_BOOKING_DATE",
    400
  ),
  PAYMENT_FAILED: new EvercleanError(
    "Payment processing failed",
    "PAYMENT_FAILED",
    400
  ),
  
  // Service errors
  SERVICE_NOT_FOUND: new EvercleanError(
    "Service not found",
    "SERVICE_NOT_FOUND",
    404
  ),
  SERVICE_UNAVAILABLE: new EvercleanError(
    "Service temporarily unavailable",
    "SERVICE_UNAVAILABLE",
    503
  ),
  
  // User errors
  USER_NOT_FOUND: new EvercleanError(
    "User not found",
    "USER_NOT_FOUND",
    404
  ),
  EMAIL_ALREADY_EXISTS: new EvercleanError(
    "An account with this email already exists",
    "EMAIL_ALREADY_EXISTS",
    409
  ),
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: new EvercleanError(
    "Too many requests. Please try again later.",
    "RATE_LIMIT_EXCEEDED",
    429
  ),
  
  // Validation
  VALIDATION_ERROR: new EvercleanError(
    "Invalid input data",
    "VALIDATION_ERROR",
    400
  ),
} as const;

/**
 * Capture error to Sentry with context
 */
export function captureError(
  error: Error | unknown,
  context?: {
    user?: { id: string; email?: string };
    tags?: Record<string, string>;
    extras?: Record<string, unknown>;
  }
): void {
  if (process.env.NODE_ENV === "development") {
    console.error("[DEV] Error captured:", error);
    return;
  }

  Sentry.withScope((scope) => {
    if (context?.user) {
      scope.setUser({
        id: context.user.id,
        email: context.user.email,
      });
    }

    if (context?.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }

    if (context?.extras) {
      scope.setExtras(context.extras);
    }

    Sentry.captureException(error);
  });
}

/**
 * Create a safe error response
 */
export function createErrorResponse(
  error: EvercleanError | Error,
  includeDetails = false
): { error: AppError } {
  if (error instanceof EvercleanError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        details: includeDetails ? error.details : undefined,
      },
    };
  }

  // Generic error - don't expose internal details
  return {
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
      statusCode: 500,
    },
  };
}

/**
 * Handle API errors consistently
 */
export function handleApiError(
  error: unknown,
  context?: { userId?: string; path?: string }
): Response {
  const isDev = process.env.NODE_ENV === "development";
  
  // Capture to Sentry
  if (error instanceof Error) {
    captureError(error, {
      user: context?.userId ? { id: context.userId } : undefined,
      tags: { path: context?.path || "unknown" },
    });
  }

  // Return appropriate response
  if (error instanceof EvercleanError) {
    return Response.json(
      createErrorResponse(error, isDev),
      { status: error.statusCode }
    );
  }

  return Response.json(
    createErrorResponse(
      new EvercleanError("Internal server error", "INTERNAL_ERROR", 500),
      isDev
    ),
    { status: 500 }
  );
}

/**
 * Safe async handler wrapper
 */
export function safeAsync<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => T
): Promise<T> {
  return fn().catch((error) => {
    captureError(error);
    
    if (errorHandler) {
      return errorHandler(error);
    }
    
    throw error;
  });
}

/**
 * Log structured errors for monitoring
 */
export function logError(
  category: "booking" | "payment" | "auth" | "api" | "system",
  message: string,
  details?: Record<string, unknown>
): void {
  const timestamp = new Date().toISOString();
  const errorLog = {
    timestamp,
    category,
    message,
    details,
    environment: process.env.NODE_ENV,
  };

  // Log to console (will be captured by Vercel logs)
  console.error(JSON.stringify(errorLog));

  // Also capture to Sentry in production
  if (process.env.NODE_ENV === "production") {
    Sentry.captureMessage(message, {
      level: "error",
      tags: { category },
      extra: details,
    });
  }
}

/**
 * Validation helper
 */
export function validateOrThrow(
  condition: boolean,
  error: EvercleanError
): asserts condition {
  if (!condition) {
    throw error;
  }
}
