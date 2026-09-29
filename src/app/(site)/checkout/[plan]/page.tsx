import { Check, CircleAlert, FlaskConical, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoTile } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { getMySubscription, getPlan, hasAccess } from "@/lib/membership";
import { isTestKey, paymentsMode } from "@/lib/paystack";
import { formatNgn, plans } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { startCheckout } from "../actions";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

const errors: Record<string, string> = {
  init: "We couldn't start the payment. Please try again.",
  declined: "The payment didn't go through. You haven't been charged — try again or use another card.",
  verify: "We couldn't confirm that payment. If you were charged, message us and we'll sort it out.",
  unavailable: "Payments aren't open yet.",
};

export default async function CheckoutPage({ params, searchParams }: PageProps<"/checkout/[plan]">) {
  const plan = getPlan((await params).plan);
  if (!plan) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=/checkout/${plan.id}`);

  const sub = await getMySubscription();
  const error = errors[String((await searchParams).error ?? "")];
  const mode = paymentsMode();

  if (hasAccess(sub)) {
    return (
      <div className="mx-auto flex max-w-[440px] flex-col items-center px-4 py-20 text-center">
        <LogoTile size={48} />
        <h1 className="display mt-5 text-[40px] text-ink">You're already a member</h1>
        <p className="mt-2 text-muted">Your membership is active.</p>
        <Link href="/dashboard" className={`${btn.primary} ${size.lg} mt-6`}>
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[480px] px-4 py-14">
      <div className="flex flex-col items-center text-center">
        <LogoTile size={48} />
        <h1 className="display mt-5 text-[40px] text-ink">Join the {plan.name}</h1>
        <p className="mt-1 text-[15px] text-muted">Signed in as {user.email}</p>
      </div>

      {/* Plan switcher */}
      <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-wash p-1" role="tablist" aria-label="Billing period">
        {plans.map((p) => {
          const on = p.id === plan.id;
          return (
            <Link
              key={p.id}
              href={`/checkout/${p.id}`}
              role="tab"
              aria-selected={on}
              className={
                "rounded-lg px-3 py-2 text-center text-[14px] font-semibold transition-colors " +
                (on ? "bg-card text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted hover:text-ink")
              }
            >
              {p.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-line bg-card p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-xl font-semibold text-ink">{plan.name}</span>
          <span className="tabular text-right">
            <span className="text-2xl font-semibold text-ink">{formatNgn(plan.priceNgn)}</span>
            <span className="block font-mono text-[12px] text-muted">one-time · {plan.period}</span>
          </span>
        </div>
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
          {plan.results.slice(0, 5).map((m) => (
            <li key={m} className="flex gap-2.5 text-[15px] text-ink">
              <Check className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
              {m}
            </li>
          ))}
        </ul>

        {error && (
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger" role="alert">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {error}
          </p>
        )}

        <form action={startCheckout} className="mt-6">
          <input type="hidden" name="plan" value={plan.id} />
          <button disabled={mode === "disabled"} className={`${btn.primary} ${size.lg} w-full`}>
            <Lock className="size-4" aria-hidden /> Pay {formatNgn(plan.priceNgn)} with Paystack
          </button>
        </form>
        <p className="mt-3 text-center text-[13px] text-muted">Card, bank transfer or USSD. One-time payment · {plan.accessDays} days access · no subscription.</p>

        {(mode === "demo" || (mode === "paystack" && isTestKey())) && (
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-brand-wash px-3 py-2.5 text-[13px] text-ink">
            <FlaskConical className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
            {mode === "demo" ? (
              <span>
                <strong>Demo mode.</strong> No Paystack key is set, so a simulated checkout is used. No money moves.
              </span>
            ) : (
              <span>
                <strong>Paystack test mode.</strong> Use test card 4084 0840 8408 4081, any future expiry, CVV 408.
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
