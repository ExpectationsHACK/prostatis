import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

/**
 * Privileged client (bypasses RLS). Server-only — used for payment/subscription writes
 * and the waitlist. Never import this from client code.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !key) {
    throw new Error("Supabase admin client needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY");
  }
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function adminConfigured() {
  return Boolean(supabaseUrl && (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY));
}
