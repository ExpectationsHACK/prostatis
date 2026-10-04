/**
 * Best-effort request limiter, kept in memory per server instance. Good enough to stop a
 * script hammering one endpoint; not a substitute for the host's own protection.
 *
 * Keys starting with "global:" (site-wide caps, e.g. the daily AI budget) are never evicted,
 * so flooding the limiter with new keys can't reset them.
 */
const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000;

export function rateLimited(key: string, max = 20, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    // Over the limit: don't record the attempt, so a blocked caller can't grow the list.
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.delete(key); // re-insert so the Map's order is least-recently-used first
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    for (const k of hits.keys()) {
      if (hits.size <= MAX_KEYS * 0.9) break;
      if (!k.startsWith("global:")) hits.delete(k);
    }
  }
  return false;
}

/** The visitor's IP as the host reports it (first x-forwarded-for entry). */
export function clientIp(h: Headers): string {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Test helper: forget everything. */
export function resetRateLimits() {
  hits.clear();
}
