import { NextResponse, type NextRequest } from "next/server";
import { getPlan, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
import { verifyTransaction } from "@/lib/paystack";

// Paystack redirects the payer here after checkout. We never trust the query string:
// the transaction is re-verified server-to-server before membership is granted.
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference") ?? request.nextUrl.searchParams.get("trxref");
  const back = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl.origin));
  if (!reference) return back("/pricing");

  try {
    const tx = await verifyTransaction(reference);
    const meta = (typeof tx.metadata === "object" && tx.metadata) || {};
    const plan = getPlan(String(meta.plan ?? ""));
    const userId = String(meta.user_id ?? "");

    if (!plan || !userId) return back("/pricing");
    if (tx.status !== "success") return back(`/checkout/${plan.id}?error=declined`);
    if (tx.currency !== "NGN" || tx.amount !== plan.priceNgn * 100) {
      console.error("paystack callback: amount/currency mismatch", reference, tx.amount, tx.currency);
      return back(`/checkout/${plan.id}?error=verify`);
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
    return back("/welcome");
  } catch (e) {
    console.error("paystack callback failed", reference, e);
    return back("/pricing?error=verify");
  }
}
