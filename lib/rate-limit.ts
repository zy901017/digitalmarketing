interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  
  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt < now) {
        rateLimitStore.delete(key)
      }
    }
  }
  
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { success: true, remaining: limit - 1 }
  }
  
  if (entry.count >= limit) {
    return { success: false, remaining: 0 }
  }
  
  entry.count++
  return { success: true, remaining: limit - entry.count }
}
