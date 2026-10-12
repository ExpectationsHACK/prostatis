import "server-only";
import { getPlan, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
import { classifyPayment, type PaymentOutcome } from "@/lib/payment-status";
import { verifyTransaction } from "@/lib/paystack";

export type Settled = { outcome: PaymentOutcome; planId: PlanId | null; userId: string };

/**
 * Ask Paystack (server to server) what happened to a payment, and grant access if it succeeded.
 * Recording is idempotent per reference, so the callback, the status page and the webhook can
 * all call this for the same payment. Throws if Paystack can't be reached.
 */
export async function settlePayment(reference: string): Promise<Settled> {
  const tx = await verifyTransaction(reference);
  const meta = (typeof tx.metadata === "object" && tx.metadata) || {};
  const plan = getPlan(String(meta.plan ?? ""));
  const userId = String(meta.user_id ?? "");
  if (!plan || !userId) return { outcome: { kind: "mismatch" }, planId: null, userId };

  const outcome = classifyPayment(tx, plan.priceNgn * 100);
  if (outcome.kind === "mismatch") console.error("paystack: amount/currency mismatch", reference, tx.amount, tx.currency);
  if (outcome.kind === "success") {
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
  }
  return { outcome, planId: plan.id as PlanId, userId };
}
