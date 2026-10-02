import "server-only";
import { createClient } from "@/lib/supabase/server";

export type PaymentRow = {
  reference: string;
  plan: string;
  amount_kobo: number;
  currency: string;
  provider: string;
  status: string;
  created_at: string;
  /** Local preview only: a clearly labelled example, never a real payment. */
  sample?: boolean;
};

const PREVIEW_SAMPLE: PaymentRow = {
  reference: "preview_sample",
  plan: "main_track",
  amount_kobo: 3_000_000,
  currency: "NGN",
  provider: "demo",
  status: "success",
  created_at: new Date(Date.now() - 20 * 86400_000).toISOString(),
  sample: true,
};

/** The signed-in member's payments, newest first (RLS limits the rows to their own). */
export async function myPayments(preview: boolean, limit = 50): Promise<PaymentRow[]> {
  if (preview) return [PREVIEW_SAMPLE];
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("reference, plan, amount_kobo, currency, provider, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as PaymentRow[] | null) ?? [];
}

/** One of the member's own payments, for a receipt. */
export async function myPayment(preview: boolean, reference: string): Promise<PaymentRow | null> {
  if (preview) return reference === PREVIEW_SAMPLE.reference ? PREVIEW_SAMPLE : null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("reference, plan, amount_kobo, currency, provider, status, created_at")
    .eq("reference", reference)
    .maybeSingle();
  return (data as PaymentRow | null) ?? null;
}

export const money = (kobo: number, currency: string) =>
  (currency === "NGN" ? "₦" : currency === "USD" ? "$" : currency + " ") + (kobo / 100).toLocaleString("en-NG", { maximumFractionDigits: 2 });

export const longDate = (s: string) => new Date(s).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
