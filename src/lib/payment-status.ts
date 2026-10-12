/**
 * What a Paystack transaction means for the payer, in plain words. Pure, so the callback, the
 * status page and the tests all agree.
 */

export type PaymentOutcome =
  | { kind: "success" }
  | { kind: "pending" }
  | { kind: "failed"; reason: string; reversed: boolean }
  | { kind: "mismatch" };

/** Paystack statuses that can still turn into a success (bank transfers and USSD often sit here). */
const PENDING = new Set(["ongoing", "pending", "processing", "queued", "send_birthday", "send_otp", "send_pin", "send_phone", "send_address", "open_url"]);

export function classifyPayment(tx: { status: string; amount: number; currency: string; gateway_response?: string | null }, priceKobo: number): PaymentOutcome {
  const status = tx.status.toLowerCase();
  if (status === "success") return tx.currency === "NGN" && tx.amount === priceKobo ? { kind: "success" } : { kind: "mismatch" };
  if (PENDING.has(status)) return { kind: "pending" };
  return { kind: "failed", reason: failureReason(status, tx.gateway_response ?? ""), reversed: status === "reversed" };
}

/** Why a payment failed, from the payer's side, and what to try instead. */
export function failureReason(status: string, gateway: string): string {
  if (status === "abandoned") return "The payment wasn't finished: the Paystack window was closed before paying.";
  if (status === "reversed") return "Your bank reversed this payment, so the money goes back to your account.";
  if (/insufficient/i.test(gateway)) return "Your bank said there isn't enough money in the account for this payment.";
  if (/declin|not permitted|do not honou?r|restricted|invalid card|expired card/i.test(gateway)) return "Your bank declined the card. Try another card, or pay by bank transfer or USSD instead.";
  if (/time ?out|timed out|unavailable|issuer/i.test(gateway)) return "Your bank didn't respond in time. Wait a minute and try again, or use another payment method.";
  if (/pin|otp|token/i.test(gateway)) return "The PIN or one-time code wasn't accepted. Try again and check the code your bank sent.";
  return "The payment didn't go through.";
}

/** Payment references we create (pst_…) or Paystack's own: letters, digits and a few symbols. */
export function cleanReference(ref: unknown): string | null {
  return typeof ref === "string" && /^[A-Za-z0-9_.=-]{6,100}$/.test(ref) ? ref : null;
}
