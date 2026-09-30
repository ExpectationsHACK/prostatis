import { getPlan, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
import { isValidWebhookSignature, verifyTransaction } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase/admin";

type Customer = { customer_code?: string; email?: string };
type PaystackEvent = {
  event: string;
  data: {
    reference?: string;
    status?: string;
    metadata?: Record<string, unknown> | string | null;
    customer?: Customer;
    plan?: { plan_code?: string } | string | null;
    subscription_code?: string;
    email_token?: string;
    next_payment_date?: string | null;
    subscription?: { subscription_code?: string };
  };
};

async function userIdForCustomer(customerCode?: string) {
  if (!customerCode) return null;
  const { data } = await createAdminClient()
    .from("subscriptions")
    .select("user_id")
    .eq("paystack_customer_code", customerCode)
    .maybeSingle();
  return data?.user_id ?? null;
}

async function setStatus(match: { customer?: string; subscription?: string }, status: string) {
  const db = createAdminClient().from("subscriptions").update({ status, updated_at: new Date().toISOString() });
  if (match.subscription) await db.eq("paystack_subscription_code", match.subscription);
  else if (match.customer) await db.eq("paystack_customer_code", match.customer);
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (!isValidWebhookSignature(raw, req.headers.get("x-paystack-signature"))) {
    return new Response("invalid signature", { status: 401 });
  }

  const evt = JSON.parse(raw) as PaystackEvent;
  const d = evt.data;
  const customerCode = d.customer?.customer_code;

  try {
    switch (evt.event) {
      case "charge.success": {
        if (!d.reference) break;
        // Re-verify with Paystack rather than trusting the payload.
        const tx = await verifyTransaction(d.reference);
        if (tx.status !== "success" || tx.currency !== "NGN") break;
        const meta = (typeof tx.metadata === "object" && tx.metadata) || {};
        const plan = getPlan(String(meta.plan ?? ""));
        const userId = (meta.user_id as string | undefined) ?? (await userIdForCustomer(tx.customer?.customer_code));
        if (!plan || !userId) {
          console.warn("paystack webhook: unmatched charge", d.reference);
          break;
        }
        if (tx.amount !== plan.priceNgn * 100) {
          console.error("paystack webhook: amount mismatch", d.reference, tx.amount);
          break;
        }
        await recordSuccessfulPayment({
          userId,
          plan: plan.id as PlanId,
          reference: d.reference,
          amountKobo: tx.amount,
          currency: tx.currency,
          provider: "paystack",
          customerCode: tx.customer?.customer_code,
          raw: tx,
        });
        break;
      }
      case "subscription.create": {
        if (!customerCode) break;
        const { data: updated, error } = await createAdminClient()
          .from("subscriptions")
          .update({
            paystack_subscription_code: d.subscription_code,
            paystack_email_token: d.email_token,
            ...(d.next_payment_date ? { current_period_end: d.next_payment_date } : {}),
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("paystack_customer_code", customerCode)
          .select("id");
        if (error) throw error;
        // Can arrive before charge.success has created the row, fail so Paystack retries.
        if (!updated?.length) throw new Error(`no subscription row yet for ${customerCode}`);
        break;
      }
      case "subscription.not_renew":
        await setStatus({ subscription: d.subscription_code, customer: customerCode }, "non_renewing");
        break;
      case "subscription.disable":
        await setStatus({ subscription: d.subscription_code, customer: customerCode }, "cancelled");
        break;
      case "invoice.payment_failed":
        await setStatus({ subscription: d.subscription?.subscription_code, customer: customerCode }, "past_due");
        break;
    }
  } catch (e) {
    // Non-2xx makes Paystack retry, which is what we want for transient failures.
    console.error("paystack webhook failed", evt.event, e);
    return new Response("error", { status: 500 });
  }

  return new Response("ok");
}
