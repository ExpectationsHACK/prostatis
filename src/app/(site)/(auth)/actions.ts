"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { brandedAuthEmails, sendAuthEmail } from "@/lib/auth-email";
import { oauthProviders, PREFILL_COOKIE, type SocialProvider } from "@/lib/auth-providers";
import { safeNext as safePath } from "@/lib/safe-next";
import { clientIp, rateLimited } from "@/lib/server/rate-limit";
import { site } from "@/lib/site";
import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

/**
 * Whether an account exists for this email, via the service-only `email_registered` SQL
 * function. Returns null when it can't tell (migration not run): then we show the generic
 * message rather than listing every user, which would be slow and easy to abuse.
 */
async function emailRegistered(email: string): Promise<boolean | null> {
  if (!adminConfigured()) return null;
  const rpc = await createAdminClient().rpc("email_registered", { p_email: email });
  return rpc.error ? null : Boolean(rpc.data);
}

/**
 * Slow down password guessing and email-sending abuse: per visitor IP and, for sign-in,
 * per email address too. Returns an error state when over the limit.
 */
async function throttled(kind: "signin" | "signup" | "email", email = ""): Promise<AuthState | null> {
  const ip = clientIp(await headers());
  const limits = { signin: [10, 600_000], signup: [5, 600_000], email: [5, 600_000] } as const;
  const [max, ms] = limits[kind];
  const busy = rateLimited(`auth:${kind}:${ip}`, max, ms) || (kind === "signin" && email && rateLimited(`auth:signin:${email}`, 10, 900_000));
  return busy ? { error: "Too many attempts. Please wait a few minutes and try again." } : null;
}

export type AuthState = { error?: string; message?: string } | undefined;

/** Only allow paths on this site as post-login destinations. */
const safeNext = (v: FormDataEntryValue | null) => safePath(v);

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
  const name = String(form.get("name") ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const whatsapp = normaliseWhatsapp(String(form.get("whatsapp") ?? ""));
  const next = safeNext(form.get("next"));
  const limited = await throttled("signup");
  if (limited) return limited;

  if (!name) return { error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  // Branded Prostatis email once the sending domain is verified; Supabase's mailer otherwise.
  if (brandedAuthEmails()) {
    const sent = await sendAuthEmail("signup", { email, password, next, name, data: { name, whatsapp } });
    if (!sent.ok && sent.reason === "exists") return { error: "An account with this email already exists. Sign in instead, or reset your password." };
    if (!sent.ok) {
      console.error("signup email", sent.error);
      return { error: "We couldn't send your confirmation email. Please try again in a minute." };
    }
    return { message: `We sent a confirmation link to ${email}. Open it to finish creating your account.` };
  }

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
  const limited = await throttled("signin", email);
  if (limited) return limited;

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
  const limited = await throttled("email");
  if (limited) return limited;

  if (brandedAuthEmails()) {
    // Only for existing accounts: generating a link would otherwise create one.
    if ((await emailRegistered(email)) === true) {
      const sent = await sendAuthEmail("magiclink", { email, next });
      if (!sent.ok) console.error("magic link email", sent.error);
    }
    return { message: `If an account exists for ${email}, a sign-in link is on its way.` };
  }

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
  const limited = await throttled("email");
  if (limited) return limited;
  if (brandedAuthEmails()) {
    const sent = await sendAuthEmail("recovery", { email, next: "/reset-password" });
    if (!sent.ok && sent.reason === "failed") console.error("reset email", sent.error);
    return { message: `If an account exists for ${email}, a reset link is on its way. Open it on this device.` };
  }

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
