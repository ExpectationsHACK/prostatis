import "server-only";
import { canEmailAnyone, sendEmail } from "@/lib/email";
import { authEmail, type AuthKind } from "@/lib/email-templates";
import { site } from "@/lib/site";
import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";

/**
 * Prostatis-branded account emails (confirm, reset, sign-in link). We ask Supabase for the
 * secure token with the secret key, then send our own email through Resend, so nothing says
 * "Supabase". Used once EMAIL_FROM is on a verified domain; until then the caller falls back
 * to Supabase's own mailer.
 */
export function brandedAuthEmails() {
  return canEmailAnyone() && adminConfigured();
}

type Result = { ok: true } | { ok: false; reason: "exists" | "missing" | "failed"; error?: string };

export async function sendAuthEmail(
  kind: AuthKind,
  o: { email: string; next: string; password?: string; data?: Record<string, unknown>; name?: string },
): Promise<Result> {
  const db = createAdminClient();
  const redirectTo = `${site.url}/auth/callback?next=${encodeURIComponent(o.next)}`;
  const { data, error } =
    kind === "signup"
      ? await db.auth.admin.generateLink({ type: "signup", email: o.email, password: o.password ?? "", options: { data: o.data, redirectTo } })
      : await db.auth.admin.generateLink({ type: kind, email: o.email, options: { redirectTo } });

  if (error || !data?.properties?.hashed_token) {
    const msg = error?.message ?? "";
    if (/already (been )?registered|already exists/i.test(msg)) return { ok: false, reason: "exists" };
    if (/not found|no user/i.test(msg)) return { ok: false, reason: "missing" };
    return { ok: false, reason: "failed", error: msg || "Couldn't create the link." };
  }

  // Our callback verifies the token itself (works with the PKCE cookie flow and any device).
  const type = data.properties.verification_type || kind;
  const link = `${site.url}/auth/callback?token_hash=${encodeURIComponent(data.properties.hashed_token)}&type=${encodeURIComponent(type)}&next=${encodeURIComponent(o.next)}`;
  const mail = authEmail(kind, link, o.name);
  const sent = await sendEmail({ to: o.email, ...mail });
  return sent.ok ? { ok: true } : { ok: false, reason: "failed", error: sent.error };
}
