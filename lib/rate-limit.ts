/**
 * Redis-based Rate Limiting
 * V2.0 Infrastructure Upgrade
 * 
 * Provides robust rate limiting for:
 * - API endpoints (general, strict, authenticated)
 * - Booking creation
 * - Admin operations
 * - Authentication attempts
 */

import { redis, isRedisConfigured } from "./redis";

export interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
  keyPrefix: string;     // Redis key prefix
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
  retryAfter?: number;   // Seconds to wait
}

// Predefined rate limit configurations
export const rateLimits = {
  // General API: 100 requests per minute
  general: {
    windowMs: 60 * 1000,
    maxRequests: 100,
    keyPrefix: "ratelimit:api",
  },
  
  // Strict API: 20 requests per minute (sensitive endpoints)
  strict: {
    windowMs: 60 * 1000,
    maxRequests: 20,
    keyPrefix: "ratelimit:strict",
  },
  
  // Booking: 5 per minute per IP
  booking: {
    windowMs: 60 * 1000,
    maxRequests: 5,
    keyPrefix: "ratelimit:booking",
  },
  
  // Admin: 200 per minute per admin user
  admin: {
    windowMs: 60 * 1000,
    maxRequests: 200,
    keyPrefix: "ratelimit:admin",
  },
  
  // Authentication: 5 attempts per 15 minutes per IP
  auth: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    keyPrefix: "ratelimit:auth",
  },
  
  // Login: 10 attempts per hour per email
  login: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    keyPrefix: "ratelimit:login",
  },
  
  // Contact form: 3 submissions per hour per IP
  contact: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 3,
    keyPrefix: "ratelimit:contact",
  },
  
  // Gift card: 5 purchases per hour per IP
  giftCard: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 5,
    keyPrefix: "ratelimit:giftcard",
  },
  
  // Subscription: 10 changes per hour per user
  subscription: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    keyPrefix: "ratelimit:subscription",
  },
} as const;

/**
 * Check rate limit for a given key
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  // If Redis is not configured, allow all requests (development fallback)
  if (!isRedisConfigured) {
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetAt: new Date(Date.now() + config.windowMs),
    };
  }

  const key = `${config.keyPrefix}:${identifier}`;
  const windowSeconds = Math.ceil(config.windowMs / 1000);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline();
    
    // Remove old entries outside the window
    pipeline.zremrangebyscore(key, 0, windowStart);
    
    // Count current entries in the window
    pipeline.zcard(key);
    
    // Add current request
    pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    
    // Set expiry on the key
    pipeline.expire(key, windowSeconds);
    
    const results = await pipeline.exec();
    const currentCount = results[1] as number;
    
    const remaining = Math.max(0, config.maxRequests - currentCount);
    const success = currentCount <= config.maxRequests;
    const resetAt = new Date((now + windowSeconds) * 1000);
    
    return {
      success,
      limit: config.maxRequests,
      remaining,
      resetAt,
      retryAfter: success ? undefined : Math.ceil(config.windowMs / 1000),
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    
    // Fail open in case of Redis error
    return {
      success: true,
      limit: config.maxRequests,
      remaining: 1,
      resetAt: new Date(Date.now() + config.windowMs),
    };
  }
}

/**
 * Get client IP from request
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback (won't work in most serverless environments)
  return "unknown";
}

/**
 * Get rate limit key based on user session or IP
 */
export function getRateLimitKey(
  request: Request,
  userId?: string
): string {
  if (userId) {
    return `user:${userId}`;
  }
  
  return `ip:${getClientIP(request)}`;
}

/**
 * Increment failure count for lockout protection
 */
export async function incrementFailureCount(
  identifier: string,
  type: "auth" | "login" | "booking",
  windowMs = 15 * 60 * 1000
): Promise<number> {
  if (!isRedisConfigured) return 0;
  
  const key = `failures:${type}:${identifier}`;
  const windowSeconds = Math.ceil(windowMs / 1000);
  
  try {
    const count = await redis.incr(key);
    await redis.expire(key, windowSeconds);
    return count;
  } catch (error) {
    console.error("Failure count increment error:", error);
    return 0;
  }
}

/**
 * Check if account is temporarily locked
 */
export async function isLocked(
  identifier: string,
  type: "auth" | "login",
  maxFailures = 5,
  lockoutMs = 15 * 60 * 1000
): Promise<{ locked: boolean; remainingMs: number }> {
  if (!isRedisConfigured) return { locked: false, remainingMs: 0 };
  
  const key = `failures:${type}:${identifier}`;
  
  try {
    const count = await redis.get<number>(key);
    
    if (!count || count < maxFailures) {
      return { locked: false, remainingMs: 0 };
    }
    
    const ttl = await redis.ttl(key);
    return { locked: true, remainingMs: ttl * 1000 };
  } catch (error) {
    console.error("Lock check error:", error);
    return { locked: false, remainingMs: 0 };
  }
}

/**
 * Reset failure count (after successful operation)
 */
export async function resetFailureCount(
  identifier: string,
  type: "auth" | "login" | "booking"
): Promise<void> {
  if (!isRedisConfigured) return;
  
  const key = `failures:${type}:${identifier}`;
  
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Failure count reset error:", error);
  }
}
