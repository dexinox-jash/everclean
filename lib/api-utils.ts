/**
 * API UTILITIES
 * 
 * Helper functions for API route handlers
 * Includes error handling, response formatting, and validation
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

// =============================================================================
// RESPONSE HELPERS
// =============================================================================

/**
 * Success response wrapper
 */
export function successResponse<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Error response wrapper
 */
export function errorResponse(
  message: string, 
  status: number = 500, 
  errors?: Record<string, string[]>
) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Validation error response
 */
export function validationErrorResponse(zodError: ZodError) {
  const errors: Record<string, string[]> = {};
  
  zodError.errors.forEach((error) => {
    const path = error.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  });

  return errorResponse("Validation failed", 400, errors);
}

// =============================================================================
// ERROR HANDLERS
// =============================================================================

/**
 * Handle API errors with appropriate responses
 */
export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  // Handle known error types
  if (error instanceof Error) {
    // Prisma errors
    if (error.name === "PrismaClientKnownRequestError") {
      // @ts-ignore - Prisma error codes
      const code = error.code;
      
      if (code === "P2002") {
        return errorResponse("A record with this information already exists", 409);
      }
      
      if (code === "P2025") {
        return errorResponse("Record not found", 404);
      }
      
      if (code === "P2003") {
        return errorResponse("Related record not found", 400);
      }
    }

    // Stripe errors
    if (error.name === "StripeError") {
      // @ts-ignore - Stripe error types
      const type = error.type;
      
      if (type === "StripeCardError") {
        return errorResponse(error.message, 400);
      }
      
      return errorResponse("Payment processing error", 402);
    }

    return errorResponse(error.message, 500);
  }

  return errorResponse("An unexpected error occurred", 500);
}

// =============================================================================
// REQUEST HELPERS
// =============================================================================

/**
 * Parse JSON request body with error handling
 */
export async function parseRequestBody<T>(request: Request): Promise<T> {
  try {
    const body = await request.json();
    return body as T;
  } catch {
    throw new Error("Invalid JSON in request body");
  }
}

/**
 * Get query parameters from URL
 */
export function getQueryParams(request: Request): URLSearchParams {
  const url = new URL(request.url);
  return url.searchParams;
}

// =============================================================================
// PAGINATION HELPERS
// =============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Parse pagination parameters from request
 */
export function getPaginationParams(request: Request): PaginationParams {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20")));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResponse<T> {
  const { page, limit } = params;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

// =============================================================================
// RATE LIMITING (Simple in-memory implementation)
// =============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
}

// =============================================================================
// CORS HEADERS
// =============================================================================

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
