import Link from "next/link";
import { btn, byline, size } from "@/components/ui";
import { redirect } from "next/navigation";
import { getMySubscription, getPlan, hasAccess } from "@/lib/membership";
import { getManageLink, paymentsMode } from "@/lib/paystack";
import { formatNgn, plans } from "@/lib/site";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

const statusLabel: Record<string, string> = {
  active: "Active",
  non_renewing: "Active — won't renew",
  past_due: "Payment failed — please update your card",
  cancelled: "Cancelled",
};

async function openManageLink(form: FormData) {
  "use server";
  const sub = await getMySubscription();
  if (!sub?.paystack_subscription_code || String(form.get("code")) !== sub.paystack_subscription_code) redirect("/dashboard/billing");
  const { link } = await getManageLink(sub.paystack_subscription_code);
  redirect(link);
}

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/billing");
  const sub = await getMySubscription();
  const active = hasAccess(sub);

  const supabase = await createClient();
  const { data: payments } = await supabase
    .from("payments")
    .select("reference, plan, amount_kobo, currency, provider, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  const date = (s: string) => new Date(s).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="mx-auto max-w-[640px] px-4 py-6 sm:px-6 lg:py-8">
      <h1 className="text-xl font-bold text-ink">Billing</h1>

      <div className="mt-6 rounded-xl border border-line bg-card p-6">
        {sub ? (
          <>
            <p className={byline}>{getPlan(sub.plan)?.name} plan</p>
            <p className="mt-2 font-display text-[22px] font-semibold text-ink">{active ? statusLabel[sub.status] : "Expired"}</p>
            <p className="mt-1 text-sm text-muted">
              {active ? "Access until" : "Ended"} {date(sub.current_period_end)}
            </p>
            {sub.paystack_subscription_code && paymentsMode() === "paystack" && (
              <form action={openManageLink} className="mt-4">
                <input type="hidden" name="code" value={sub.paystack_subscription_code} />
                <button className={`${btn.secondary} ${size.md}`}>
                  Change card or cancel on Paystack
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="font-display text-[22px] font-semibold text-ink">You don't have a membership yet</p>
        )}

        {!active && (
          <div className="mt-5 flex flex-wrap gap-3">
            {plans.map((p) => (
              <Link key={p.id} href={`/checkout/${p.id}`} className={`${btn.primary} ${size.md}`}>
                {sub ? "Buy again:" : "Join the"} {p.name} · {formatNgn(p.priceNgn)}
              </Link>
            ))}
          </div>
        )}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Payment history</h2>
      {payments?.length ? (
        <table className="tabular mt-3 w-full text-left text-[14px]">
          <thead className="text-[11px] uppercase tracking-[0.06em] text-muted">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Plan</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payments.map((p) => (
              <tr key={p.reference}>
                <td className="py-2.5 text-ink">
                  {date(p.created_at)} {p.provider === "demo" && <span className="ml-1.5 rounded-full bg-brand-wash px-2 py-px text-[11px] font-semibold text-brand-text">demo</span>}
                </td>
                <td className="py-2.5 capitalize text-ink">{p.plan}</td>
                <td className="py-2.5 text-right font-semibold text-ink">{formatNgn(p.amount_kobo / 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-3 text-sm text-muted">No payments yet.</p>
      )}
    </div>
  );
}
