import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { LiveSite, type SiteKind } from "@/components/art/live-site";
import { StepArt, type Step } from "@/components/art/step-art";
import { CurriculumExplorer } from "@/components/curriculum-explorer";
import { Hero } from "@/components/home/hero";
import { personas } from "@/components/nav-data";
import { PlanCard } from "@/components/plan-card";
import { ToolCard } from "@/components/tool-card";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack, type Track } from "@/lib/curriculum";
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

const steps: { step: Step; title: string; body: string }[] = [
  { step: "enroll", title: "Enroll today, start today", body: "Pay once in naira by card, transfer or USSD. Your lessons, dashboard and WhatsApp community unlock the moment your payment clears." },
  { step: "build", title: "Build a real website every day", body: "Short, practical lessons. You describe what you want, AI writes the code, and you ship a real page, store or booking system you can show clients." },
  { step: "pitch", title: "Pitch businesses near you", body: "Use the pricing calculator, proposal template and message scripts to reach local businesses. You'll know what to charge and exactly what to say." },
  { step: "paid", title: "Get paid and get certified", body: "Deliver the project, collect your payment, then pass the final assessment for a verified certificate you can show every future client." },
];

const compare: [string, boolean | string, boolean | string][] = [
  ["Price, paid once", formatNgn(plans[0].priceNgn), formatNgn(plans[1].priceNgn)],
  ["Length", "14 days", "1 month"],
  ["Lessons with practical tasks", String(fastTrack.modules.length), String(mainTrack.modules.length)],
  ["Business websites and landing pages", true, true],
  ["Online stores, booking systems and web apps", true, true],
  ["SEO basics, portfolio, pricing and pitching", true, true],
  ["Full and local SEO that ranks", false, true],
  ["Automations that save clients hours", false, true],
  ["AI chatbots and WhatsApp bots", false, true],
  ["A lead-generation system", false, true],
  ["Verified certificate and WhatsApp community", true, true],
];

const faqs = [
  { q: "Do I need to know how to code?", a: "No. You build by describing what you want to AI tools like Claude Code, then learn to read and adjust what they make. Every lesson shows you the exact prompts." },
  { q: "Do I need a powerful laptop?", a: "Any laptop that can run a modern browser is enough. You can read lessons on your phone, but you build on a laptop." },
  { q: "How soon can I start earning?", a: "The Fast Track has you pricing your work and pitching real businesses in week two, with the scripts, proposal and portfolio to do it. How fast you land a client depends on how many businesses you reach, so we won't promise a date or an amount." },
  { q: "What's the difference between the Fast Track and the Main Track?", a: "The Fast Track (14 days, ₦15,000) takes you from zero to building and selling websites. The Main Track (1 month, ₦30,000) includes all of it and adds full SEO, automation, AI agents and lead generation, so you can sell monthly services, not just one-off websites." },
  { q: "Is it a subscription?", a: "No. You pay once per track. The Fast Track stays open for 30 days and the Main Track for 60, so you have time to catch up." },
  { q: "Do I get a certificate?", a: "Yes. Pass every lesson and the final assessment to get a certificate of completion: download it, receive a copy by email, and share its public proof page so clients can check it's real." },
  { q: "Can I start with the Fast Track and upgrade later?", a: "Yes. Everything in the Fast Track is part of the Main Track, so nothing you learn is wasted." },
];

const featuredTools = ["website-speed-checklist", "on-page-seo-audit", "client-pricing-calculator", "proposal-generator", "cold-dm-script-generator", "invoice-generator"];

function Heading({ eyebrow, children, sub, light = false }: { eyebrow?: string; children: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className={"label " + (light ? "text-brand" : "text-brand-text")}>{eyebrow}</p>}
      <h2 className={"display mt-3 text-balance text-[36px] sm:text-[52px] " + (light ? "text-white" : "text-ink")}>{children}</h2>
      {sub && <p className={"mx-auto mt-4 max-w-2xl text-pretty text-[16.5px] leading-relaxed " + (light ? "text-white/70" : "text-muted")}>{sub}</p>}
    </div>
  );
}

function TrackSection({ track, dark = false, eyebrow, title, sub }: { track: Track; dark?: boolean; eyebrow: string; title: string; sub: string }) {
  const plan = plans.find((p) => p.id === track.id)!;
  const slug = track.id === "main_track" ? "main-track" : "fast-track";
  return (
    <section id={slug} className={"scroll-mt-24 px-4 py-20 sm:py-28 " + (dark ? "relative overflow-clip bg-night [&_.ink-block]:shadow-[5px_5px_0_var(--brand)]!" : "")}>
      {dark && <div className="pointer-events-none absolute -top-48 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" aria-hidden />}
      <div className="relative mx-auto max-w-6xl">
        <Heading eyebrow={eyebrow} sub={sub} light={dark}>
          {title}
        </Heading>
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[370px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <PlanCard plan={plan} show={5} />
          </div>
          <div>
            <CurriculumExplorer track={track} dark={dark} />
            <p className={"mt-6 text-center text-[14px] lg:text-left " + (dark ? "text-white/70" : "text-muted")}>
              <Link href={`/tracks/${slug}`} className={"font-semibold underline " + (dark ? "text-white" : "text-ink")}>
                See the full {track.name} curriculum
              </Link>{" "}
              with every lesson, task and outcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featured = featuredTools.map((slug) => coreTools.find((t) => t.slug === slug)).filter((t) => t !== undefined);

  return (
    <div>
      <Hero />

      {/* What you'll build and sell */}
      <section id="inside" className="scroll-mt-24 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="What you'll build" sub="Six kinds of websites, each one a real project in the course. Build it with AI, put it live, then sell it to businesses around you.">
            Websites businesses <span className="scribble">pay for</span>
          </Heading>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {websiteKinds.map((w) => (
              <article key={w.kind} className="ink-block block-press flex flex-col bg-card">
                <div className="border-b-2 border-ink bg-sunk">
                  <LiveSite kind={w.kind} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="display text-[22px] text-ink">{w.title}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{w.body}</p>
                  <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-wash px-2.5 py-1 text-[12.5px] font-semibold text-brand-text">
                    Built on Day {w.day} of the Fast Track
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-ink bg-sunk px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="How it works" sub="No coding background, no expensive laptop, no guesswork. Here's exactly what happens after you enroll.">
            From first lesson to first paid website
          </Heading>
          <ol className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.step} className="ink-block flex flex-col bg-card">
                <div className="relative border-b-2 border-ink">
                  <StepArt step={s.step} />
                  <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-full border-2 border-ink bg-brand text-[15px] font-bold text-ink shadow-[2px_2px_0_var(--ink)]">{i + 1}</span>
                </div>
                <div className="p-5">
                  <h3 className="display text-[20px] leading-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className={`${btn.primary} ${size.lg}`}>
              Enroll Now <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/tracks/fast-track" className={`${btn.secondary} ${size.lg}`}>
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      <TrackSection
        track={fastTrack}
        eyebrow={`The Fast Track · ${fastTrack.length} · ${formatNgn(plans[0].priceNgn)}`}
        title="Your first paid website in 14 days"
        sub={fastTrack.blurb}
      />

      <TrackSection
        track={mainTrack}
        dark
        eyebrow={`The Main Track · ${mainTrack.length} · ${formatNgn(plans[1].priceNgn)}`}
        title="Sell the full package, not just a website"
        sub={mainTrack.blurb}
      />

      {/* Who it's for */}
      <section id="who" className="scroll-mt-24 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Who it's for" sub="You don't need a tech background. You need a laptop, a few hours a day and the will to pitch real businesses.">
            Built for people who want to earn with a real skill
          </Heading>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((p, i) => (
              <div key={p.id} id={p.id} className="ink-block scroll-mt-28 bg-card p-6">
                <span className="grid size-10 place-items-center rounded-[12px] border-2 border-ink bg-brand-wash text-[15px] font-bold text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[21px] text-ink">{p.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="border-y-2 border-ink bg-sunk px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Free, no signup" sub="Check a website's speed and SEO, work out your price, write the proposal and the cold message, then send the invoice. Use them today, even before you enroll.">
            {coreTools.length} free tools that do the work for you
          </Heading>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/tools" className={`${btn.secondary} ${size.lg}`}>
              See all {coreTools.length} free tools <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="scroll-mt-24 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Heading eyebrow="Compare" sub="Start with the Fast Track to build and sell websites. Choose the Main Track to sell monthly services on top.">
            Fast Track or Main Track?
          </Heading>
          <div className="ink-block mt-12 bg-card">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="px-3 py-4 text-[13px] font-semibold text-muted sm:px-6">What you get</th>
                  <th className="w-[27%] bg-brand px-1.5 py-4 text-center sm:px-6">
                    <span className="display block text-[15px] text-ink sm:text-[22px]">Fast Track</span>
                    <span className="text-[12px] font-semibold text-ink/80">Start here</span>
                  </th>
                  <th className="w-[27%] px-1.5 py-4 text-center sm:px-6">
                    <span className="display block text-[15px] text-ink sm:text-[22px]">Main Track</span>
                    <span className="text-[12px] font-medium text-muted">Everything</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([row, a, b]) => (
                  <tr key={row} className="border-b border-line last:border-0">
                    <td className="px-3 py-3.5 text-[13.5px] text-ink sm:px-6 sm:text-[14.5px]">{row}</td>
                    {[a, b].map((v, i) => (
                      <td key={i} className={"px-1.5 py-3.5 text-center sm:px-3 " + (i === 0 ? "bg-brand-wash/60" : "")}>
                        {typeof v === "string" ? (
                          <span className="text-[13px] font-semibold text-ink sm:text-[14.5px]">{v}</span>
                        ) : v ? (
                          <Check className="mx-auto size-5 text-success" strokeWidth={3} aria-label="Included" />
                        ) : (
                          <Minus className="mx-auto size-5 text-faint" aria-label="Not included" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-5 sm:px-6" />
                  <td className="bg-brand-wash/60 px-2 py-5 text-center">
                    <Link href="/checkout/fast_track" className={`${btn.primary} h-9 w-full max-w-[150px] px-1.5 text-[12px] sm:text-[13px]`}>Enroll Now</Link>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <Link href="/checkout/main_track" className={`${btn.accent} h-9 w-full max-w-[150px] px-1.5 text-[12px] sm:text-[13px]`}>Enroll Now</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-ink bg-sunk px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="FAQ">Questions, answered</Heading>
          <div className="mt-12 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="ink-block group bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-brand-text transition-transform duration-200 group-open:rotate-45" strokeWidth={2.5} aria-hidden />
                </summary>
                <p className="border-t-2 border-dashed border-line px-5 py-4 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
