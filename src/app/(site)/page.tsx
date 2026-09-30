import { ArrowRight, Check, Plus } from "lucide-react";
import Link from "next/link";
import { LiveSite, type SiteKind } from "@/components/art/live-site";
import { Hero } from "@/components/home/hero";
import { ToolCard } from "@/components/tool-card";
import { btn, size } from "@/components/ui";
import { fastTrack } from "@/lib/curriculum";
import { formatNgn, plans } from "@/lib/site";
import { coreTools } from "@/lib/tools";

// Each card is a real project in the Fast Track (the day it's built is shown on the card).
const websiteKinds: { kind: SiteKind; title: string; body: string; day: number }[] = [
  { kind: "landing", title: "Landing pages", body: "One page, one offer, one button. The quickest site to sell to a business that runs ads.", day: 5 },
  { kind: "business", title: "Business websites", body: "The five-page site every business needs, with WhatsApp orders and Google Maps built in.", day: 4 },
  { kind: "store", title: "Online stores", body: "Products, cart and Paystack checkout, so a business can take orders day and night.", day: 9 },
  { kind: "webapp", title: "Web apps", body: "Logins, dashboards and databases: the builds businesses pay the most for.", day: 10 },
  { kind: "booking", title: "Booking systems", body: "Calendars, deposits and reminders for salons, clinics, gyms and coaches.", day: 8 },
  { kind: "portfolio", title: "Your portfolio", body: "Your own site that shows your work and wins you the next client.", day: 12 },
];

const steps = [
  { title: "Enroll in a track", body: "Pay once in naira. Your course, dashboard and WhatsApp community open straight away." },
  { title: "Build one project a day", body: "Short lessons, then you build the real thing with AI: a landing page, a store, a booking system." },
  { title: "Sell it and get paid", body: "Package it, price it, pitch local businesses and deliver. Finish with a verified certificate." },
];

const faqs = [
  { q: "Do I need to know how to code?", a: "No. You build by describing what you want to AI tools like Claude Code, then learn to read and adjust what they make." },
  { q: "What's the difference between the Fast Track and the Main Track?", a: "The Fast Track (14 days, ₦15,000) takes you from zero to building and selling websites: business sites, landing pages, online stores, booking systems and web apps, plus SEO basics, a portfolio, pitching and getting paid. The Main Track (1 month, ₦30,000) includes all of that and adds full SEO, business automation, AI agents and lead generation." },
  { q: "What do I need to start?", a: "A laptop (a phone is fine for reading lessons), an internet connection and a few hours a day. We show you how to start free and keep AI costs low." },
  { q: "Is it a subscription?", a: "No. You pay once per track. The Fast Track stays open for 30 days and the Main Track for 60, so you have time to catch up." },
  { q: "Do I get a certificate?", a: "Yes. Pass every lesson and the final assessment to get a certificate of completion: download it, receive a copy by email, and share its public proof page so clients can check it's real." },
  { q: "Can I start with the Fast Track and upgrade later?", a: "Yes. Everything in the Fast Track is part of the Main Track, so nothing you learn is wasted." },
];

const featuredTools = ["website-speed-checklist", "on-page-seo-audit", "client-pricing-calculator"];

function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow?: string; title: React.ReactNode; sub?: string; align?: "center" | "left" }) {
  const c = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${c}`}>
      {eyebrow && <p className="text-[13px] font-semibold text-brand-text">{eyebrow}</p>}
      <h2 className="display mt-2 text-balance text-[32px] text-ink sm:text-[44px]">{title}</h2>
      {sub && <p className="mt-4 text-pretty text-[16.5px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const hi = plan.highlight;
  return (
    <div className={"relative flex flex-col rounded-[16px] border bg-card p-7 " + (hi ? "border-brand shadow-[0_20px_50px_-30px_rgba(235,94,40,0.6)]" : "border-line")}>
      {hi && <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-brand-ink">Start here</span>}
      <h3 className="text-[20px] font-semibold text-ink">{plan.name}</h3>
      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{plan.blurb}</p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="display tabular text-[44px] text-ink">{formatNgn(plan.priceNgn)}</span>
        <span className="text-[14px] text-muted">once · {plan.period}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.results.slice(0, 6).map((r) => (
          <li key={r} className="flex gap-2.5 text-[14.5px] leading-snug text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-text" strokeWidth={2.5} aria-hidden />
            {r}
          </li>
        ))}
      </ul>
      <Link href={`/checkout/${plan.id}`} className={`${hi ? btn.primary : btn.secondary} ${size.lg} mt-8 w-full`}>
        Enroll Now <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export default function Home() {
  const featured = featuredTools.map((slug) => coreTools.find((t) => t.slug === slug)).filter((t) => t !== undefined);
  const fastPlan = plans.find((p) => p.id === "fast_track")!;
  // The Fast Track is the main offer, so it always comes first.
  const ordered = [...plans].sort((a, b) => Number(b.id === "fast_track") - Number(a.id === "fast_track"));

  return (
    <div>
      <Hero />

      {/* What you'll build and sell */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="What you'll build"
            title="Websites businesses pay for"
            sub="Six kinds of websites, each one a real project in the course. Build it with AI, put it live, then sell it to businesses around you."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websiteKinds.map((w) => (
              <article key={w.kind} className="ink-block flex flex-col bg-card">
                <div className="border-b border-line bg-sunk">
                  <LiveSite kind={w.kind} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[18px] font-semibold text-ink">{w.title}</h3>
                  <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-muted">{w.body}</p>
                  <p className="mt-4 text-[12.5px] font-medium text-brand-text">Built on Day {w.day} of the Fast Track</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-card px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="How it works" title="Learn it, build it, get paid for it" />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="grid size-10 place-items-center rounded-full bg-brand-wash text-[15px] font-semibold text-brand-text">{i + 1}</span>
                <h3 className="mt-4 text-[18px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The Fast Track: the main offer */}
      <section id="fast-track" className="scroll-mt-24 px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHead
              align="left"
              eyebrow={`The Fast Track · ${fastTrack.length} · ${formatNgn(fastPlan.priceNgn)}`}
              title="Your first paid website in 14 days"
              sub={fastTrack.blurb}
            />
            <ul className="mt-8 space-y-3">
              {fastPlan.results.slice(0, 6).map((r) => (
                <li key={r} className="flex gap-3 text-[15px] leading-snug text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-wash">
                    <Check className="size-3 text-brand-text" strokeWidth={3} aria-hidden />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/checkout/fast_track" className={`${btn.primary} ${size.lg}`}>
                Enroll Now <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/tracks/fast-track" className={`${btn.secondary} ${size.lg}`}>
                See all {fastTrack.modules.length} lessons
              </Link>
            </div>
            <p className="mt-6 text-[14px] text-muted">
              Want the full skill set? The{" "}
              <Link href="/tracks/main-track" className="font-semibold text-ink underline">
                Main Track
              </Link>{" "}
              adds full SEO, automation, AI agents and lead generation.
            </p>
          </div>

          <div className="ink-block bg-card">
            {fastTrack.weeks.map((w, wi) => (
              <div key={w.week} className={wi > 0 ? "border-t border-line" : ""}>
                <p className="bg-sunk px-5 py-2.5 text-[13px] font-semibold text-ink">
                  Week {w.week} · {w.title}
                </p>
                <ol className="divide-y divide-line">
                  {fastTrack.modules
                    .filter((m) => m.week === w.week)
                    .map((m) => (
                      <li key={m.day} className="flex items-center gap-4 px-5 py-3">
                        <span className="tabular w-12 shrink-0 text-[12.5px] font-medium text-muted">Day {m.day}</span>
                        <span className="min-w-0 flex-1 truncate text-[14.5px] text-ink">{m.title}</span>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="border-y border-line bg-card px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead align="left" eyebrow="Free, no signup" title={`${coreTools.length} tools to use today`} sub="Check a website's speed and SEO, price a project, write a proposal. Built for the same work the course teaches." />
            <Link href="/tools" className={`${btn.secondary} ${size.md}`}>
              Browse all tools <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Pricing" title="Pay once. Keep what you build." sub="Pay in naira with Paystack: card, bank transfer or USSD. No subscription." />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {ordered.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
          <p className="mt-6 text-center text-[14px] text-muted">
            <Link href="/pricing" className="font-semibold text-ink underline">
              Compare everything in each track
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-card px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHead title="Questions" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
