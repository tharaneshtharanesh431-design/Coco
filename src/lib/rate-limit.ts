// Basic in-memory rate limiter for Phase 10
// In production, this should be replaced with Redis (Upstash) or Cloudflare rate limiting

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip);

  if (!userRecord) {
    // Emergency bounds check to prevent OOM
    if (rateLimitMap.size > 10000) {
      rateLimitMap.clear();
    }
    
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // If window has passed, reset
  if (now - userRecord.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // If within window and over limit
  if (userRecord.count >= limit) {
    return false;
  }

  // Increment count
  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);
  
  return true;
}

// Clean up stale entries periodically to prevent memory leaks in dev
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((value, key) => {
    if (now - value.timestamp > 60000) { // Clean older than 1 min
      rateLimitMap.delete(key);
    }
  });
}, 60000);
