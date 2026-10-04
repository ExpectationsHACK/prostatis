import { getPlan, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
import { isValidWebhookSignature, verifyTransaction } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase/admin";

// Tracks are one-time payments, so charge.success is the only event that matters.
type PaystackEvent = { event: string; data?: { reference?: string } };

/** For a charge without our metadata: the member who paid with this Paystack customer before. */
async function userIdForCustomer(customerCode?: string) {
  if (!customerCode) return null;
  const { data } = await createAdminClient()
    .from("subscriptions")
    .select("user_id")
    .eq("paystack_customer_code", customerCode)
    .maybeSingle();
  return data?.user_id ?? null;
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (!isValidWebhookSignature(raw, req.headers.get("x-paystack-signature"))) {
    return new Response("invalid signature", { status: 401 });
  }

  let evt: PaystackEvent;
  try {
    evt = JSON.parse(raw) as PaystackEvent;
  } catch {
    return new Response("bad payload", { status: 400 });
  }
  const reference = evt.data?.reference;
  if (evt.event !== "charge.success" || !reference) return new Response("ok");

  try {
    // Re-verify with Paystack rather than trusting the payload.
    const tx = await verifyTransaction(reference);
    if (tx.status !== "success" || tx.currency !== "NGN") return new Response("ok");
    const meta = (typeof tx.metadata === "object" && tx.metadata) || {};
    const plan = getPlan(String(meta.plan ?? ""));
    const userId = (meta.user_id as string | undefined) ?? (await userIdForCustomer(tx.customer?.customer_code));
    if (!plan || !userId) {
      console.warn("paystack webhook: unmatched charge", reference);
      return new Response("ok");
    }
    if (tx.amount !== plan.priceNgn * 100) {
      console.error("paystack webhook: amount mismatch", reference, tx.amount);
      return new Response("ok");
    }
    await recordSuccessfulPayment({
      userId,
      plan: plan.id as PlanId,
      reference,
      amountKobo: tx.amount,
      currency: tx.currency,
      provider: "paystack",
      customerCode: tx.customer?.customer_code,
      raw: tx,
    });
  } catch (e) {
    // Non-2xx makes Paystack retry, which is what we want for transient failures.
    console.error("paystack webhook failed", reference, e);
    return new Response("error", { status: 500 });
  }
  return new Response("ok");
}
