import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { supabaseConfigured, supabasePublishableKey, supabaseUrl } from "./env";

// Create a new client per request, never share one across requests.
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Safe to ignore: proxy.ts refreshes the session on every request.
        }
      },
    },
  });
}

/** The signed-in user (JWT verified via getClaims), or null. */
export async function getCurrentUser() {
  // Opt the caller into per-request rendering even when Supabase isn't configured yet,
  // so auth-gated pages are never prerendered as a static redirect at build time.
  await connection();
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  const c = data.claims;
  const meta = (c.user_metadata as Record<string, unknown> | undefined) ?? {};
  return {
    id: c.sub,
    email: (c.email as string | undefined) ?? "",
    // Display-only fields from signup; never use these for authorization.
    name: typeof meta.name === "string" ? meta.name : "",
    whatsapp: typeof meta.whatsapp === "string" ? meta.whatsapp : "",
  };
}
