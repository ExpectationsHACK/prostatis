import { NextResponse, type NextRequest } from "next/server";
import { recordView, visitorId } from "@/lib/analytics";
import { cleanPath, deviceOf, geoFrom, isBot, lagosDate, referrerHost } from "@/lib/analytics-shared";
import { clientIp, rateLimited } from "@/lib/server/rate-limit";
import { getCurrentUser } from "@/lib/supabase/server";

/** Page-view beacon from <Analytics />. Always answers 204 so it never affects the page. */
export async function POST(request: NextRequest) {
  const done = new NextResponse(null, { status: 204 });
  try {
    const ua = request.headers.get("user-agent") ?? "";
    if (isBot(ua)) return done;
    // A real visitor views a few pages a minute; more than that is a script padding the numbers.
    if (rateLimited(`track:${clientIp(request.headers)}`, 30, 60_000)) return done;
    const body = (await request.json().catch(() => null)) as { p?: unknown; r?: unknown; u?: unknown } | null;
    const path = cleanPath(body?.p);
    if (!path) return done;

    const h = request.headers;
    const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "0.0.0.0";
    const now = new Date().toISOString();
    // Only look up the member when a Supabase session cookie is present.
    const signedIn = request.cookies.getAll().some((c) => c.name.startsWith("sb-"));
    const user = signedIn ? await getCurrentUser().catch(() => null) : null;

    await recordView({
      created_at: now,
      path,
      referrer: referrerHost(typeof body?.r === "string" ? body.r : undefined, request.nextUrl.hostname),
      utm_source: typeof body?.u === "string" && body.u ? body.u.slice(0, 60).toLowerCase() : null,
      // From the host's edge (Netlify, Vercel or Cloudflare). Empty when running locally.
      ...geoFrom(h),
      device: deviceOf(ua),
      visitor: visitorId(ip, ua, lagosDate(now)),
      user_id: user?.id ?? null,
    });
  } catch (e) {
    console.error("track", e);
  }
  return done;
}
