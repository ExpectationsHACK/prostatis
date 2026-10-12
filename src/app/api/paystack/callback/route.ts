import { NextResponse, type NextRequest } from "next/server";
import { cleanReference } from "@/lib/payment-status";
import { settlePayment } from "@/lib/settle-payment";

// Paystack redirects the payer here after checkout. We never trust the query string: the
// transaction is re-verified server-to-server before membership is granted. Anything but a clean
// success goes to the payment status page, which explains it and keeps checking pending payments.
export async function GET(request: NextRequest) {
  const reference = cleanReference(request.nextUrl.searchParams.get("reference") ?? request.nextUrl.searchParams.get("trxref"));
  const back = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl.origin));
  if (!reference) return back("/pricing");
  const status = `/checkout/status?ref=${encodeURIComponent(reference)}`;

  try {
    const { outcome, planId } = await settlePayment(reference);
    if (!planId) return back("/pricing");
    return back(outcome.kind === "success" ? "/welcome" : status);
  } catch (e) {
    // Paystack unreachable or recording failed: the status page retries and explains.
    console.error("paystack callback failed", reference, e);
    return back(status);
  }
}
