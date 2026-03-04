/**
 * Next.js Middleware
 * V2.0 Infrastructure Upgrade
 * 
 * Features:
 * - Authentication & authorization (NextAuth v5)
 * - Redis-based rate limiting
 * - Route protection (admin, portal)
 * - Security headers injection
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { checkRateLimit, getRateLimitKey, rateLimits } from "@/lib/rate-limit";

// Paths that should skip rate limiting
const SKIP_RATE_LIMIT = [
  "/_next",
  "/api/auth",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip rate limiting for static assets and auth routes
  if (SKIP_RATE_LIMIT.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();
  const userId = session?.user?.id;
  
  // Rate limiting check
  const rateLimitResult = await checkPublicRateLimit(request, userId);
  if (!rateLimitResult.success) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests",
        message: "Please slow down and try again later.",
        retryAfter: rateLimitResult.retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetAt.toISOString(),
          "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
        },
      }
    );
  }

  // Add rate limit headers to successful responses
  const response = await handleRouting(request, session);
  
  // Add rate limit info to response headers
  response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
  response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
  response.headers.set("X-RateLimit-Reset", rateLimitResult.resetAt.toISOString());
  
  return response;
}

async function handleRouting(
  request: NextRequest,
  session: any
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const user = session?.user;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!user || !["ADMIN", "MANAGER"].includes(user.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // Apply stricter rate limiting for admin routes
    const adminRateLimit = await checkRateLimit(
      getRateLimitKey(request, user.id),
      rateLimits.admin
    );
    
    if (!adminRateLimit.success) {
      return new NextResponse("Admin rate limit exceeded", { status: 429 });
    }
  }

  // Protect portal routes (except login)
  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    if (!user) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
    
    // Staff can only access their own portal area
    if (user.role === "STAFF" && !pathname.startsWith("/portal/staff")) {
      return NextResponse.redirect(new URL("/portal/staff", request.url));
    }
  }

  // Protect staff PWA routes
  if (pathname.startsWith("/staff")) {
    if (!user || !["STAFF", "ADMIN", "MANAGER"].includes(user.role)) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  // Protect API admin routes
  if (pathname.startsWith("/api/admin")) {
    if (!user || !["ADMIN", "MANAGER"].includes(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  // API route rate limiting (additional layer)
  if (pathname.startsWith("/api/")) {
    const apiRateLimit = await checkApiRateLimit(request, user?.id);
    if (!apiRateLimit.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { 
          status: 429,
          headers: {
            "Retry-After": apiRateLimit.retryAfter?.toString() || "60",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

/**
 * Apply rate limiting to public routes
 */
async function checkPublicRateLimit(
  request: NextRequest,
  userId?: string
): Promise<{ success: boolean; limit: number; remaining: number; resetAt: Date; retryAfter?: number }> {
  const { pathname } = request.nextUrl;
  const identifier = getRateLimitKey(request, userId);
  
  // Different rate limits for different path types
  if (pathname.startsWith("/api/booking")) {
    return checkRateLimit(identifier, rateLimits.booking);
  }
  
  if (pathname.startsWith("/api/auth")) {
    return checkRateLimit(identifier, rateLimits.auth);
  }
  
  if (pathname.startsWith("/api/gift-cards")) {
    return checkRateLimit(identifier, rateLimits.giftCard);
  }
  
  if (pathname.startsWith("/api/contact")) {
    return checkRateLimit(identifier, rateLimits.contact);
  }
  
  // Default general rate limit
  return checkRateLimit(identifier, rateLimits.general);
}

/**
 * Apply rate limiting to API routes
 */
async function checkApiRateLimit(
  request: NextRequest,
  userId?: string
): Promise<{ success: boolean; limit: number; remaining: number; resetAt: Date; retryAfter?: number }> {
  const { pathname } = request.nextUrl;
  const identifier = getRateLimitKey(request, userId);
  
  // Stricter limits for sensitive API endpoints
  if (pathname.includes("/api/admin/") || pathname.includes("/api/stripe/")) {
    return checkRateLimit(identifier, rateLimits.strict);
  }
  
  return checkRateLimit(identifier, rateLimits.general);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
