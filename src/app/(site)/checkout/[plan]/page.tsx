import { CalendarPlus, Check, CircleAlert, FlaskConical, Lock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoMark } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { getMySubscription, getPlan, hasAccess } from "@/lib/membership";
import { isTestKey, paymentsMode } from "@/lib/paystack";
import { formatNgn, plans } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { startCheckout } from "../actions";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

const errors: Record<string, string> = {
  init: "We couldn't start the payment. Please try again.",
  declined: "The payment didn't go through. You haven't been charged: try again or use another card.",
  verify: "We couldn't confirm that payment. If you were charged, message us with your payment reference and we'll sort it out.",
  unavailable: "Payments aren't open yet.",
  record: "The payment went through but we couldn't update your account. Please try again, or message us and we'll fix it right away.",
};

const longDate = (d: Date) => d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });

export default async function CheckoutPage({ params, searchParams }: { params: Promise<{ plan: string }>; searchParams: Promise<{ error?: string }> }) {
  const plan = getPlan((await params).plan);
  if (!plan) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=/checkout/${plan.id}`);

  const sub = await getMySubscription();
  const error = errors[String((await searchParams).error ?? "")];
  const mode = paymentsMode();
  const active = hasAccess(sub);
  const current = active && sub ? getPlan(sub.plan) : undefined;
  const end = active && sub ? new Date(sub.current_period_end) : null;

  // Members can buy again: an upgrade, or more time. Buying always adds days to the current
  // end date (see recordSuccessfulPayment), so it's never wasted, but say exactly what happens.
  const note = !current
    ? null
    : current.id === plan.id
      ? { icon: CalendarPlus, title: `You already have the ${plan.name}`, text: `Your access runs until ${longDate(end!)}. Paying again adds ${plan.accessDays} days to that date.` }
      : plan.id === "main_track"
        ? { icon: Sparkles, title: "Upgrade to the Main Track", text: `You keep all your Fast Track progress. The Main Track opens straight away, and ${plan.accessDays} days are added to your current end date (${longDate(end!)}).` }
        : { icon: CalendarPlus, title: "You already have the Main Track", text: `It includes everything in the Fast Track. Buying the Fast Track would only add ${plan.accessDays} days to your access (now until ${longDate(end!)}).` };

  return (
    <div className="mx-auto max-w-[480px] px-4 py-12 sm:py-14">
      <div className="flex flex-col items-center text-center">
        <LogoMark size={44} />
        <h1 className="display mt-5 text-[34px] leading-tight text-ink sm:text-[40px]">{current?.id === plan.id ? `Add time to the ${plan.name}` : current && plan.id === "main_track" ? "Upgrade to the Main Track" : `Enroll in the ${plan.name}`}</h1>
        <p className="mt-1 break-all font-mono text-[13px] text-muted">Signed in as {user.email}</p>
      </div>

      {/* Track switcher */}
      <div className="mt-8 grid grid-cols-2 gap-2" role="tablist" aria-label="Choose a track">
        {plans.map((p) => {
          const on = p.id === plan.id;
          return (
            <Link
              key={p.id}
              href={`/checkout/${p.id}`}
              role="tab"
              aria-selected={on}
              className={"border-2 border-edge px-3 py-2.5 text-center font-mono text-[13px] font-bold transition-colors " + (on ? "bg-ink text-paper" : "bg-card text-ink hover:bg-wash")}
            >
              {p.name}
            </Link>
          );
        })}
      </div>

      {note && (
        <div className="mt-4 flex gap-3 border border-edge bg-brand-wash p-4 text-ink">
          <note.icon className="mt-0.5 size-5 shrink-0 text-brand-text" aria-hidden />
          <div>
            <p className="font-bold">{note.title}</p>
            <p className="mt-0.5 text-[14px] leading-relaxed">{note.text}</p>
          </div>
        </div>
      )}

      <div className="ink-block mt-4 bg-card p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="display text-[24px] text-ink">{plan.name}</span>
          <span className="tabular text-right">
            <span className="display text-[28px] text-ink">{formatNgn(plan.priceNgn)}</span>
            <span className="block font-mono text-[12px] text-muted">one payment · {plan.period}</span>
          </span>
        </div>
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
          {plan.results.slice(0, 5).map((m) => (
            <li key={m} className="flex gap-2.5 text-[15px] leading-snug text-ink">
              <Check className="mt-0.5 size-[18px] shrink-0 text-success" strokeWidth={3} aria-hidden />
              {m}
            </li>
          ))}
        </ul>

        {error && (
          <p className="mt-5 flex items-start gap-2 border border-edge bg-danger/10 px-3 py-2.5 text-[14px] text-ink" role="alert">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
            {error}
          </p>
        )}

        {mode === "disabled" ? (
          <p className="mt-6 border border-edge bg-sunk px-3 py-3 text-center text-[14px] text-ink">Payments aren&apos;t open yet. Check back soon.</p>
        ) : (
          <form action={startCheckout} className="mt-6">
            <input type="hidden" name="plan" value={plan.id} />
            <button className={`${btn.primary} ${size.lg} w-full`}>
              <Lock className="size-4" aria-hidden /> Pay {formatNgn(plan.priceNgn)} with Paystack
            </button>
          </form>
        )}
        <p className="mt-3 text-center text-[13px] text-muted">Card, bank transfer or USSD. One payment · {plan.accessDays} days of access · nothing renews.</p>

        {(mode === "demo" || (mode === "paystack" && isTestKey())) && (
          <p className="mt-5 flex items-start gap-2 border border-edge bg-brand-wash px-3 py-2.5 text-[13px] text-ink">
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
      <p className="mt-4 text-center text-[12.5px] text-muted">
        Changed your mind after paying? See the <Link href="/refund-policy" className="underline">refund policy</Link>.
      </p>
    </div>
  );
}
