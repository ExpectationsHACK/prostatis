import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { formatNgn, plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing: Fast Track ₦15,000 · Main Track ₦30,000",
  description: "Two one-time tracks: a 14-day Fast Track for websites, landing pages, stores, booking systems and web apps, or the one-month Main Track that adds full SEO, automation, AI agents and lead generation.",
};

const pricingFaqs = [
  { q: "How do I pay?", a: "Once, in naira, through Paystack, card, bank transfer or USSD. No subscription and no dollar card needed." },
  { q: "How long do I keep access?", a: "The Fast Track stays unlocked for 30 days and the Main Track for 60, the track itself plus time to catch up." },
  { q: "What happens right after I pay?", a: "You're taken straight to the WhatsApp community invite, and your dashboard unlocks immediately." },
  { q: "Do I get a certificate?", a: "Yes, on both tracks. Pass every lesson and the final assessment and your certificate is ready to download, emailed to you, and verifiable on a public page with its unique ID." },
  { q: "Can I upgrade from the Fast Track later?", a: "Yes. Everything in the Fast Track is part of the Main Track, so nothing you've learned is wasted." },
];

export default function PricingPage() {
  const lessons = { fast_track: fastTrack.modules.length, main_track: mainTrack.modules.length };

  return (
    <div className="paper-grid">
      <header className="field-grid border-b-2 border-edge bg-brand px-4 py-14 text-center sm:py-20">
        <h1 className="display mx-auto max-w-3xl text-balance text-[44px] text-ink sm:text-[68px]">Pick your track</h1>
        <p className="mx-auto mt-4 max-w-xl font-mono text-[14px] leading-relaxed text-ink">
          Pay once. Build websites, stores and web apps in 14 days, or learn the whole offer in a month.
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 md:grid-cols-2">
        {plans.map((p) => {
          const hi = p.highlight;
          return (
            <div key={p.id} className={"ink-block relative flex flex-col p-7 " + (hi ? "bg-brand" : "bg-card")}>
              {hi && <span className="label absolute -top-3.5 left-6 border-2 border-edge bg-paper px-2.5 py-1 text-ink">Everything included</span>}
              <h2 className="display text-[34px] text-ink">{p.name}</h2>
              <p className={"mt-1 font-mono text-[13px] " + (hi ? "text-ink/80" : "text-muted")}>{p.blurb}</p>
              <p className="display tabular mt-5 text-[52px] text-ink">{formatNgn(p.priceNgn)}</p>
              <p className="label text-ink/80">
                One-time · {p.period} · {lessons[p.id]} lessons · {p.accessDays} days access
              </p>
              <p className={"mt-3 border-2 border-dashed px-3 py-2 font-mono text-[12px] " + (hi ? "border-ink/40 text-ink" : "border-line text-muted")}>{p.covers}</p>
              <p className="label mt-6 text-ink">What you&apos;ll walk away with</p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[14px] text-ink">
                    <Check className={"mt-0.5 size-[18px] shrink-0 " + (hi ? "text-ink" : "text-success")} strokeWidth={2.75} aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <Link href={`/checkout/${p.id}`} className={`${hi ? `${btn.secondary} bg-paper` : btn.primary} ${size.lg} mt-8 w-full`}>
                Enroll Now <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href={p.id === "fast_track" ? "/tracks/fast-track" : "/tracks/main-track"} className="mt-3 text-center font-mono text-[12px] font-bold uppercase tracking-wider text-ink underline">
                See the {p.name} curriculum
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <p className="ink-block bg-card px-4 py-3 text-center font-mono text-[13px] text-muted">
          Not ready to pay? All 50 tools are free, {" "}
          <Link href="/tools" className="font-bold text-ink underline">
            start with those
          </Link>
          .
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {pricingFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-mono text-[14px] font-bold text-ink">{f.q}</h3>
              <p className="mt-1 font-mono text-[13px] leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
