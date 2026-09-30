"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { oauthProviders, PREFILL_COOKIE, type SocialProvider } from "@/lib/auth-providers";
import { site } from "@/lib/site";
import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

/**
 * Whether an account exists for this email. Uses the service-only `email_registered` SQL
 * function, falling back to listing users if that migration hasn't been run yet.
 * Returns null when it can't tell (then we show the generic message).
 */
async function emailRegistered(email: string): Promise<boolean | null> {
  if (!adminConfigured()) return null;
  const db = createAdminClient();
  const rpc = await db.rpc("email_registered", { p_email: email });
  if (!rpc.error) return Boolean(rpc.data);
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) return null;
    if (data.users.some((u) => u.email?.toLowerCase() === email)) return true;
    if (data.users.length < 1000) return false;
  }
  return null;
}

export type AuthState = { error?: string; message?: string } | undefined;

/** Only allow same-site relative paths as post-login destinations. */
function safeNext(v: FormDataEntryValue | null) {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/") && !s.startsWith("//") && !s.startsWith("/\\") ? s : "/dashboard";
}

function normaliseWhatsapp(raw: string) {
  const digits = raw.replace(/[^\d+]/g, "");
  if (/^0\d{10}$/.test(digits)) return "+234" + digits.slice(1);
  if (/^234\d{10}$/.test(digits)) return "+" + digits;
  return digits;
}

function callbackUrl(next: string) {
  return `${site.url}/auth/callback?next=${encodeURIComponent(next)}`;
}

const notConfigured = { error: "Sign-in isn't set up yet (Supabase keys missing)." };

export async function signUp(_: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfigured) return notConfigured;
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const whatsapp = normaliseWhatsapp(String(form.get("whatsapp") ?? ""));
  const next = safeNext(form.get("next"));

  if (!name) return { error: "Please enter your name." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // Display-only fields. Never use user_metadata for authorization.
    options: { data: { name, whatsapp }, emailRedirectTo: callbackUrl(next) },
  });
  if (error) return { error: error.message };

  // Email confirmation disabled → we have a session straight away.
  if (data.session) redirect(next);
  return { message: `We sent a confirmation link to ${email}. Open it on this device to continue.` };
}

export async function signIn(_: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfigured) return notConfigured;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = safeNext(form.get("next"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message !== "Invalid login credentials") return { error: error.message === "Email not confirmed" ? "Please confirm your email first: open the link we sent you." : error.message };
    // No account with this email: send them to sign up, with the email filled in.
    if ((await emailRegistered(email)) === false) {
      (await cookies()).set(PREFILL_COOKIE, email, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" });
      redirect(`/signup?from=login&next=${encodeURIComponent(next)}`);
    }
    return { error: "Wrong password for this email. Try again or reset your password." };
  }
  redirect(next);
}

export async function sendMagicLink(_: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfigured) return notConfigured;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const next = safeNext(form.get("next"));
  if (!email) return { error: "Enter your email first." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: callbackUrl(next), shouldCreateUser: false },
  });
  if (error) return { error: error.message };
  return { message: `Check ${email} for a sign-in link.` };
}

/** Google (and other enabled providers): hand off to the provider, back via /auth/callback. */
export async function signInWithProvider(form: FormData) {
  const provider = String(form.get("provider")) as SocialProvider;
  const next = safeNext(form.get("next"));
  const back = String(form.get("from")) === "signup" ? "/signup" : "/login";
  if (!supabaseConfigured || !(await oauthProviders()).includes(provider)) redirect(`${back}?error=oauth`);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: callbackUrl(next) } });
  if (error || !data.url) redirect(`${back}?error=oauth`);
  redirect(data.url);
}

/** Emails a password-reset link. Always answers the same way so it can't be used to probe for accounts. */
export async function requestPasswordReset(_: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfigured) return notConfigured;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: callbackUrl("/reset-password") });
  if (error && /rate limit/i.test(error.message)) return { error: "Too many emails sent. Please wait a few minutes and try again." };
  if (error) console.error("reset password", error.message);
  return { message: `If an account exists for ${email}, a reset link is on its way. Open it on this device.` };
}

/** Sets a new password for the user signed in through the reset link. */
export async function updatePassword(_: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfigured) return notConfigured;
  const password = String(form.get("password") ?? "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== String(form.get("confirm") ?? "")) return { error: "The two passwords don't match." };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: /session/i.test(error.message) ? "Your reset link has expired. Request a new one." : error.message };
  redirect("/dashboard?password=updated");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
