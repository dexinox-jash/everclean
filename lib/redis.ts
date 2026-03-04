/**
 * Redis Client Configuration
 * Using Upstash Redis for rate limiting and caching
 * 
 * V2.0 Infrastructure Upgrade
 */

import { Redis } from "@upstash/redis";

if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
  console.warn(
    "Warning: REDIS_URL or REDIS_TOKEN environment variables are not set. " +
    "Rate limiting and caching features will be disabled."
  );
}

export const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
});

// Check if Redis is configured
export const isRedisConfigured = 
  !!process.env.REDIS_URL && 
  !!process.env.REDIS_TOKEN &&
  process.env.REDIS_URL !== "https://your-upstash-redis-url.upstash.io";

/**
 * Cache helper functions
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (!isRedisConfigured) return null;
  
  try {
    const data = await redis.get(key);
    return data as T;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

export async function setCache<T>(
  key: string, 
  value: T, 
  ttlSeconds = 3600
): Promise<void> {
  if (!isRedisConfigured) return;
  
  try {
    await redis.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.error("Redis set error:", error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  if (!isRedisConfigured) return;
  
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis delete error:", error);
  }
}

export async function clearCachePattern(pattern: string): Promise<void> {
  if (!isRedisConfigured) return;
  
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error("Redis clear pattern error:", error);
  }
}
