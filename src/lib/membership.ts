import "server-only";
import { cache } from "react";
import { productEvent } from "./server/product-events";
import { plans } from "./site";
import { adminConfigured, createAdminClient } from "./supabase/admin";
import { supabaseConfigured } from "./supabase/env";
import { createClient, getCurrentUser } from "./supabase/server";

export type PlanId = (typeof plans)[number]["id"];

export function getPlan(id: string) {
  return plans.find((p) => p.id === id);
}

/** The Main Track includes the Fast Track, so it outranks it when both are owned. */
const rank: Record<string, number> = { fast_track: 1, main_track: 2 };

export type Subscription = {
  status: "active" | "non_renewing" | "past_due" | "cancelled";
  plan: PlanId;
  current_period_end: string;
  paystack_subscription_code: string | null;
  /** Set for permanent student accounts (PERMANENT_STUDENT_EMAILS): access never ends. */
  permanent?: boolean;
};

/**
 * Accounts that always have the Main Track without paying, e.g. the owner's production test
 * account. Comma-separated PERMANENT_STUDENT_EMAILS; the address must also be confirmed.
 */
export function permanentStudentEmails(): string[] {
  return (process.env.PERMANENT_STUDENT_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** True only when Supabase says this account's email is confirmed (checked with the secret key). */
const emailConfirmed = cache(async (userId: string, email: string) => {
  if (!adminConfigured()) return false;
  const { data, error } = await createAdminClient().auth.admin.getUserById(userId);
  return !error && Boolean(data.user?.email_confirmed_at) && data.user?.email?.toLowerCase() === email.toLowerCase();
});

/** The end date of lifetime access. */
export const LIFETIME_END = "9999-12-31T00:00:00.000Z";
const PERMANENT_END = LIFETIME_END;

/** An access row that never ends: every paid track (lifetime access), and the owner's test accounts. */
export function isPermanentEnd(periodEnd: string) {
  return new Date(periodEnd).getUTCFullYear() >= 9999;
}

// Paid access never ends (the end date is 9999-12-31). An admin can still close access, e.g.
// after a refund, by setting an end date in the past.
export function hasAccess(sub: Subscription | null) {
  if (!sub) return false;
  return new Date(sub.current_period_end).getTime() > Date.now();
}

/**
 * The current member's access, read through RLS as that user. A confirmed permanent student
 * gets the Main Track with no end date. Cached per request (several components ask).
 */
export const getMySubscription = cache(async (): Promise<Subscription | null> => {
  if (!supabaseConfigured) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  // Matching the email isn't enough (anyone could sign up with it first): it must be confirmed.
  if (permanentStudentEmails().includes(user.email.toLowerCase()) && (await emailConfirmed(user.id, user.email))) {
    return { status: "active", plan: "main_track", current_period_end: PERMANENT_END, paystack_subscription_code: null, permanent: true };
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("status, plan, current_period_end, paystack_subscription_code")
    .maybeSingle();
  const row = data as Subscription | null;
  return row ? { ...row, permanent: isPermanentEnd(row.current_period_end) } : null;
});

/** Whether this access already includes `plan` (the Main Track includes the Fast Track). */
export function includesPlan(sub: Subscription | null, plan: PlanId) {
  return hasAccess(sub) && (rank[sub!.plan] ?? 0) >= (rank[plan] ?? 0);
}

/**
 * Record a verified successful payment and grant lifetime access to the track. Idempotent per reference:
 * the Paystack callback and webhook can both call this for the same payment safely.
 */
export async function recordSuccessfulPayment(p: {
  userId: string;
  plan: PlanId;
  reference: string;
  amountKobo: number;
  currency: string;
  provider: "paystack" | "manual";
  customerCode?: string | null;
  raw?: unknown;
}) {
  const db = createAdminClient();

  const { data: inserted, error: payErr } = await db
    .from("payments")
    .upsert(
      {
        user_id: p.userId,
        reference: p.reference,
        provider: p.provider,
        plan: p.plan,
        amount_kobo: p.amountKobo,
        currency: p.currency,
        status: "success",
        raw: p.raw ?? null,
      },
      { onConflict: "reference", ignoreDuplicates: true },
    )
    .select("id");
  if (payErr) throw new Error(`Couldn't record payment ${p.reference}: ${payErr.message}`);
  if (!inserted?.length) return { alreadyProcessed: true };

  const { data: existing } = await db
    .from("subscriptions")
    .select("current_period_end, status, plan")
    .eq("user_id", p.userId)
    .maybeSingle();

  // One-time purchase, lifetime access: every paid track stays open for good. Buying the Main
  // Track after the Fast Track upgrades; a lower track never replaces a higher one.
  const plan = existing && (rank[existing.plan] ?? 0) > (rank[p.plan] ?? 0) ? (existing.plan as PlanId) : p.plan;

  const { error: subErr } = await db.from("subscriptions").upsert(
    {
      user_id: p.userId,
      status: "active",
      plan,
      paystack_ref: p.reference,
      ...(p.customerCode ? { paystack_customer_code: p.customerCode } : {}),
      current_period_end: PERMANENT_END,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (subErr) throw new Error(`Payment ${p.reference} recorded but access wasn't updated: ${subErr.message}`);
  productEvent(p.userId, "payment_succeeded", { plan: p.plan, amount_ngn: p.amountKobo / 100, currency: p.currency, provider: p.provider });
  return { alreadyProcessed: false };
}

export function newReference(userId: string) {
  return `pst_${userId.slice(0, 8)}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
