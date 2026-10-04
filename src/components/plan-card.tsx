import { ArrowRight, Award, CalendarClock, Check, Layers, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { formatNgn, type Plan } from "@/lib/site";

const lessonsOf = (id: Plan["id"]) => (id === "main_track" ? mainTrack : fastTrack).modules.length;

/**
 * A structured plan card: header band, price, three key facts, what you'll build,
 * what's included, one button and the payment small print. `show` limits the results list.
 */
export function PlanCard({ plan, show, badge }: { plan: Plan; show?: number; badge?: string }) {
  const hi = plan.highlight;
  const results = plan.results.filter((r) => !/certificate|WhatsApp community|Weekly build reviews/i.test(r));
  const listed = show ? results.slice(0, show) : results;
  const hidden = results.length - listed.length;
  const slug = plan.id === "main_track" ? "main-track" : "fast-track";

  return (
    <div className="ink-block flex h-full flex-col bg-card">
      {/* Header band */}
      <div className={"flex items-start justify-between gap-3 border-b-2 border-ink px-6 py-5 " + (hi ? "bg-brand" : "bg-sunk")}>
        <div>
          <h3 className="display text-[28px] text-ink">{plan.name}</h3>
          <p className="mt-1 text-[14.5px] font-medium leading-snug text-ink/80">{plan.blurb}</p>
        </div>
        {(badge ?? (hi ? "Start here" : "")) && (
          <span className="shrink-0 rounded-full border-2 border-ink bg-card px-2.5 py-1 text-[12px] font-semibold text-ink">{badge ?? "Start here"}</span>
        )}
      </div>

      {/* Price and key facts */}
      <div className="px-6 pt-6">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="display tabular text-[48px] leading-none text-ink">{formatNgn(plan.priceNgn)}</span>
          <span className="text-[14px] font-medium text-muted">one-time payment</span>
        </p>
        <dl className="mt-5 grid grid-cols-3 divide-x-2 divide-line rounded-[12px] border-2 border-line text-center">
          {[
            [CalendarClock, plan.period, "course"],
            [Layers, `${lessonsOf(plan.id)} lessons`, "with tasks"],
            [ShieldCheck, `${plan.accessDays} days`, "access"],
          ].map(([Icon, v, k]) => {
            const I = Icon as typeof Layers;
            return (
              <div key={k as string} className="px-1 py-2.5">
                <I className="mx-auto size-4 text-brand-text" aria-hidden />
                <dt className="sr-only">{k as string}</dt>
                <dd className="mt-1 text-[14px] font-semibold leading-tight text-ink">{v as string}</dd>
                <dd className="text-[12px] text-muted">{k as string}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* What you'll build */}
      <div className="flex-1 px-6 pt-6">
        <p className="label text-muted">What you&apos;ll walk away with</p>
        <ul className="mt-3 space-y-2.5">
          {listed.map((r) => (
            <li key={r} className="flex gap-2.5 text-[14.5px] leading-snug text-ink">
              <span className="mt-[1px] grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-wash">
                <Check className="size-3 text-brand-text" strokeWidth={3} aria-hidden />
              </span>
              {r}
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <Link href={`/tracks/${slug}`} className="mt-1.5 inline-flex min-h-[44px] items-center text-[13.5px] font-semibold text-brand-text underline">
            + {hidden} more on the full curriculum
          </Link>
        )}
      </div>

      {/* Included with every track */}
      <div className="mx-6 mt-6 grid grid-cols-3 gap-2 border-t-2 border-dashed border-line pt-5">
        {[
          [Award, "Verified certificate"],
          [MessageCircle, "WhatsApp community"],
          [Wrench, "50 free tools"],
        ].map(([Icon, l]) => {
          const I = Icon as typeof Award;
          return (
            <p key={l as string} className="flex flex-col items-center gap-1 text-center text-[12px] font-medium leading-tight text-ink">
              <I className="size-4 text-ink" aria-hidden />
              {l as string}
            </p>
          );
        })}
      </div>

      <div className="px-6 pb-6 pt-6">
        <Link href={`/checkout/${plan.id}`} className={`${hi ? btn.primary : btn.accent} ${size.lg} w-full`}>
          Enroll Now · {formatNgn(plan.priceNgn)} <ArrowRight className="size-4" aria-hidden />
        </Link>
        <p className="mt-3 text-center text-[12.5px] text-muted">Pay by card, bank transfer or USSD with Paystack. No subscription.</p>
      </div>
    </div>
  );
}
