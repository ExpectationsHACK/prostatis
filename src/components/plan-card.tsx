import { ArrowRight, Award, CalendarClock, Check, Layers, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { formatNgn, type Plan } from "@/lib/site";

const lessonsOf = (id: Plan["id"]) => (id === "main_track" ? mainTrack : fastTrack).modules.length;

/**
 * A structured plan card: header band, price, three key facts, what you'll build,
 * what's included, one button and the payment small print. `show` limits the results list;
 * `compact` tightens the spacing so a whole card fits on one phone screen (the homepage).
 */
export function PlanCard({ plan, show, badge, compact = false }: { plan: Plan; show?: number; badge?: string; compact?: boolean }) {
  const hi = plan.highlight;
  const px = compact ? "px-4 sm:px-6" : "px-6";
  const results = plan.results.filter((r) => !/certificate|WhatsApp community|Weekly build reviews/i.test(r));
  const listed = show ? results.slice(0, show) : results;
  const hidden = results.length - listed.length;
  const slug = plan.id === "main_track" ? "main-track" : "fast-track";

  return (
    <div className="ink-block flex h-full flex-col bg-card">
      {/* Header band */}
      <div className={"flex items-start justify-between gap-3 border-b-2 border-ink " + px + (compact ? " py-3 " : " py-5 ") + (hi ? "bg-brand" : "bg-hue-blue-wash")}>
        <div>
          <h3 className={"display text-ink " + (compact ? "text-[21px] sm:text-[26px]" : "text-[24px] sm:text-[28px]")}>{plan.name}</h3>
          <p className={"mt-1 font-medium leading-snug text-ink/80 " + (compact ? "text-[13px] sm:text-[14px]" : "text-[14.5px]")}>{plan.blurb}</p>
        </div>
        {(badge ?? (hi ? "Start here" : "")) && (
          <span className="shrink-0 rounded-full border-2 border-ink bg-card px-2.5 py-1 text-[12px] font-semibold text-ink">{badge ?? "Start here"}</span>
        )}
      </div>

      {/* Price and key facts */}
      <div className={px + (compact ? " pt-3" : " pt-6")}>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className={"display tabular leading-none text-ink " + (compact ? "text-[32px] sm:text-[40px]" : "text-[40px] sm:text-[48px]")}>{formatNgn(plan.priceNgn)}</span>
          <span className="text-[14px] font-medium text-muted">one-time payment</span>
        </p>
        <dl className={(compact ? "mt-3" : "mt-5") + " grid grid-cols-3 divide-x-2 divide-line rounded-[12px] border-2 border-line text-center"}>
          {[
            [Layers, `${lessonsOf(plan.id)} lessons`, "with tasks"],
            [CalendarClock, "Self-paced", "learn anytime"],
            [ShieldCheck, "Lifetime", "access"],
          ].map(([Icon, v, k]) => {
            const I = Icon as typeof Layers;
            return (
              <div key={k as string} className={"px-1 " + (compact ? "py-1" : "py-2.5")}>
                <I className={"mx-auto size-4 " + (hi ? "text-brand-text" : "text-hue-blue")} aria-hidden />
                <dt className="sr-only">{k as string}</dt>
                <dd className="mt-1 text-[14px] font-semibold leading-tight text-ink">{v as string}</dd>
                <dd className="text-[12px] text-muted">{k as string}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* What you'll build */}
      <div className={"flex-1 " + px + (compact ? " pt-3" : " pt-6")}>
        <p className="label text-muted">What you&apos;ll walk away with</p>
        <ul className={compact ? "mt-1.5 space-y-1" : "mt-3 space-y-2.5"}>
          {listed.map((r) => (
            <li key={r} className={"flex gap-2.5 leading-snug text-ink " + (compact ? "text-[13px]" : "text-[14.5px]")}>
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
      <div className={(compact ? "mx-4 mt-2 pt-2.5 sm:mx-6" : "mx-6 mt-6 pt-5") + " grid grid-cols-3 gap-2 border-t-2 border-dashed border-line"}>
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

      <div className={px + (compact ? " pb-3 pt-3" : " pb-6 pt-6")}>
        <Link href={`/checkout/${plan.id}`} className={`${hi ? btn.primary : btn.accent} ${compact ? size.md : size.lg} w-full`}>
          Enroll Now · {formatNgn(plan.priceNgn)} <ArrowRight className="size-4" aria-hidden />
        </Link>
        <p className={(compact ? "mt-1.5 text-[11.5px]" : "mt-3 text-[12px]") + " text-center text-muted"}>Pay by card, bank transfer or USSD with Paystack. No subscription.</p>
      </div>
    </div>
  );
}
