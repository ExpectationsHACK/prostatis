/**
 * Where to send someone after signing in: only a path on this site. Rejects other origins,
 * protocol-relative "//host" paths, backslashes and control characters (browsers strip tabs
 * and newlines from URLs, so "/\t/evil.com" would otherwise become "//evil.com").
 */
export function safeNext(raw: unknown, fallback = "/dashboard"): string {
  const s = typeof raw === "string" ? raw : "";
  if (!s.startsWith("/") || s.length > 2000 || /[\u0000-\u001f\u007f\\]/.test(s)) return fallback;
  try {
    const base = "https://internal.invalid";
    const u = new URL(s, base);
    if (u.origin !== base || u.pathname.startsWith("//")) return fallback;
    return u.pathname + u.search + u.hash;
  } catch {
    return fallback;
  }
}
