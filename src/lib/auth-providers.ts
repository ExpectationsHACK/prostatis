import "server-only";
import { supabasePublishableKey, supabaseConfigured, supabaseUrl } from "@/lib/supabase/env";

/** Short-lived cookie that carries an email from sign-in to the signup form (never in the URL). */
export const PREFILL_COOKIE = "bwac_signup_email";

/** Social sign-in providers we show buttons for, in display order. */
export const SUPPORTED = ["google", "facebook", "apple", "github"] as const;
export type SocialProvider = (typeof SUPPORTED)[number];

/**
 * The providers switched on in Supabase (Authentication → Sign In / Providers), read from the
 * public auth settings endpoint and cached for 5 minutes. Buttons only appear for these, so a
 * provider is never shown before it works.
 */
export async function oauthProviders(): Promise<SocialProvider[]> {
  if (!supabaseConfigured) return [];
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/settings`, { headers: { apikey: supabasePublishableKey }, next: { revalidate: 300 } });
    if (!res.ok) return [];
    const { external } = (await res.json()) as { external?: Record<string, boolean> };
    return SUPPORTED.filter((p) => external?.[p]);
  } catch {
    return [];
  }
}
