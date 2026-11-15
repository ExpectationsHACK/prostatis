import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

const MEMBER_PATHS = ["/dashboard", "/learn", "/checkout", "/welcome", "/admin"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!supabaseConfigured) return response;

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  // Refreshes the auth token if needed. Must run before anything else reads the session.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims?.sub);

  // Optimistic redirect only: pages still check auth and membership themselves.
  const { pathname, search } = request.nextUrl;
  if (!signedIn && MEMBER_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // A leftover Supabase auth cookie without a valid session means the session expired (rather
    // than a first visit), so the login page can say so.
    const expired = request.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
    url.search = `?next=${encodeURIComponent(pathname + search)}${expired ? "&reason=expired" : ""}`;
    return NextResponse.redirect(url);
  }

  return response;
}

// Only routes that read the signed-in user. Public pages are static: running the proxy (an Edge
// Function plus a session check) in front of them stopped Netlify serving them straight from its
// cache and added about half a second to every visit.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learn/:path*",
    "/checkout/:path*",
    "/welcome",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/auth/:path*",
    "/api/track",
  ],
};
