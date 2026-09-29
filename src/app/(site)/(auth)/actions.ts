"use server";

import { redirect } from "next/navigation";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

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
  if (error) return { error: error.message === "Invalid login credentials" ? "Wrong email or password." : error.message };
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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
