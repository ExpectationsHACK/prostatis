import { BadgeCheck, Check, CircleAlert, FlaskConical, Lock, PlayCircle, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoMark } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { getMySubscription, getPlan, hasAccess, includesPlan } from "@/lib/membership";
import { isTestKey, paymentsMode } from "@/lib/paystack";
import { priceLabel } from "@/lib/pricing";
import { visitorCurrency } from "@/lib/server/currency";
import { plans } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { startCheckout } from "../actions";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

const errors: Record<string, string> = {
  init: "We couldn't start the payment. Please try again.",
  declined: "The payment didn't go through. You haven't been charged: try again or use another card.",
  verify: "We couldn't confirm that payment. If you were charged, message us with your payment reference and we'll sort it out.",
  unavailable: "Payments aren't open yet.",
  currency: "Card payments in US dollars aren't switched on yet. Please try again soon, or message us and we'll help you enroll.",
  record: "The payment went through but we couldn't update your account. Please try again, or message us and we'll fix it right away.",
};

export default async function CheckoutPage({ params, searchParams }: { params: Promise<{ plan: string }>; searchParams: Promise<{ error?: string }> }) {
  const plan = getPlan((await params).plan);
  if (!plan) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=/checkout/${plan.id}`);

  const sub = await getMySubscription();
  const error = errors[String((await searchParams).error ?? "")];
  const mode = paymentsMode();
  // The same country check the payment uses, so the price shown is the price charged.
  const currency = await visitorCurrency();
  const price = priceLabel(plan, currency);
  const active = hasAccess(sub);
  const current = active && sub ? getPlan(sub.plan) : undefined;
  // Access is lifetime, so a track you already have (the Main Track includes the Fast Track) is
  // never sold again: the page shows the way back to the course instead of a pay button.
  const owned = includesPlan(sub, plan.id);
  const slug = (sub?.plan === "main_track" || plan.id === "main_track") && owned ? "main-track" : "fast-track";
  const note = owned
    ? { icon: BadgeCheck, title: current?.id === plan.id ? `You already own the ${plan.name}` : "The Main Track already includes this", text: "Your access is lifetime, so there's nothing to pay. Pick up where you left off." }
    : current && plan.id === "main_track"
      ? { icon: Sparkles, title: "Upgrade to the Main Track", text: "You keep all your Fast Track progress, and the Main Track opens straight away, with lifetime access." }
      : null;

  return (
    <div className="mx-auto max-w-[480px] px-4 py-12 sm:py-14">
      <div className="flex flex-col items-center text-center">
        <LogoMark size={44} />
        <h1 className="display mt-5 text-[28px] leading-tight text-ink sm:text-[40px]">{owned ? `You have the ${plan.name}` : current && plan.id === "main_track" ? "Upgrade to the Main Track" : `Enroll in the ${plan.name}`}</h1>
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
        <div className="mt-4 flex gap-3 rounded-[12px] border border-edge bg-brand-wash p-4 text-ink">
          <note.icon className="mt-0.5 size-5 shrink-0 text-brand-text" aria-hidden />
          <div>
            <p className="font-bold">{note.title}</p>
            <p className="mt-0.5 text-[14px] leading-relaxed">{note.text}</p>
          </div>
        </div>
      )}

      <div className="ink-block mt-4 bg-card p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="display text-[21px] sm:text-[24px] text-ink">{plan.name}</span>
          <span className="tabular text-right">
            <span className="display text-[24px] sm:text-[28px] text-ink">{price}</span>
            <span className="block font-mono text-[12px] text-muted">one payment · lifetime access</span>
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
          <p className="mt-5 flex items-start gap-2 rounded-[12px] border border-edge bg-danger/10 px-3 py-2.5 text-[14px] text-ink" role="alert">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
            {error}
          </p>
        )}

        {owned ? (
          <Link href={`/learn/${slug}`} className={`${btn.primary} ${size.lg} mt-6 w-full`}>
            <PlayCircle className="size-5" aria-hidden /> Start Learning
          </Link>
        ) : mode === "disabled" ? (
          <p className="mt-6 rounded-[12px] border border-edge bg-sunk px-3 py-3 text-center text-[14px] text-ink">Payments aren&apos;t open yet. Check back soon.</p>
        ) : (
          <form action={startCheckout} className="mt-6">
            <input type="hidden" name="plan" value={plan.id} />
            <button className={`${btn.primary} ${size.lg} w-full`}>
              <Lock className="size-4" aria-hidden /> Pay {price} with Paystack
            </button>
          </form>
        )}
        {!owned && <p className="mt-3 text-center text-[13px] text-muted">{currency === "NGN" ? "Card, bank transfer or USSD" : "Visa, Mastercard or Verve card, charged in US dollars"}. One payment · {plan.period} · lifetime access · nothing renews.</p>}

        {mode === "paystack" && isTestKey() && (
          <p className="mt-5 flex items-start gap-2 rounded-[12px] border border-edge bg-brand-wash px-3 py-2.5 text-[13px] text-ink">
            <FlaskConical className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
            <span>
              <strong>Paystack test mode.</strong> Use test card 4084 0840 8408 4081, any future expiry, CVV 408.
            </span>
          </p>
        )}
      </div>
      <p className="mt-4 text-center text-[12.5px] text-muted">
        Changed your mind after paying? See the <Link href="/refund-policy" className="underline">refund policy</Link>.
      </p>
    </div>
  );
}
