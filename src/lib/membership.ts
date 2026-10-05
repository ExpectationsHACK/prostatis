import "server-only";
import { cache } from "react";
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

const PERMANENT_END = "9999-12-31T00:00:00.000Z";

/** An access row that never ends (an admin or the owner set its end date to 9999-12-31). */
export function isPermanentEnd(periodEnd: string) {
  return new Date(periodEnd).getUTCFullYear() >= 9999;
}

// Grace period so a renewal that lands a little late doesn't lock members out.
const GRACE_MS = 3 * 86400_000;

// Access runs to the end of the paid period whatever the status: a member who cancels
// keeps what they paid for.
export function hasAccess(sub: Subscription | null) {
  if (!sub) return false;
  return new Date(sub.current_period_end).getTime() + GRACE_MS > Date.now();
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

function addAccess(from: Date, plan: PlanId) {
  const days = getPlan(plan)?.accessDays ?? 30;
  return new Date(from.getTime() + days * 86400_000);
}

/**
 * Record a verified successful payment and extend membership. Idempotent per reference:
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

  // One-time purchase: access runs from the later of now or the current end, so buying again
  // (or buying the Main Track after the Fast Track) never shortens access.
  const stillActive = existing && new Date(existing.current_period_end) > new Date();
  const base = stillActive ? new Date(existing.current_period_end) : new Date();
  // A permanent account keeps its "never ends" date (adding days would overflow year 9999).
  const periodEnd = existing && isPermanentEnd(existing.current_period_end) ? new Date(existing.current_period_end) : addAccess(base, p.plan);
  const plan = stillActive && (rank[existing.plan] ?? 0) > (rank[p.plan] ?? 0) ? (existing.plan as PlanId) : p.plan;

  const { error: subErr } = await db.from("subscriptions").upsert(
    {
      user_id: p.userId,
      status: "active",
      plan,
      paystack_ref: p.reference,
      ...(p.customerCode ? { paystack_customer_code: p.customerCode } : {}),
      current_period_end: periodEnd.toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (subErr) throw new Error(`Payment ${p.reference} recorded but access wasn't updated: ${subErr.message}`);
  return { alreadyProcessed: false };
}

export function newReference(userId: string) {
  return `pst_${userId.slice(0, 8)}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
