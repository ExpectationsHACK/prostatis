import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { LiveSite, type SiteKind } from "@/components/art/live-site";
import { StepArt, type Step } from "@/components/art/step-art";
import { Hero } from "@/components/home/hero";
import { personas } from "@/components/nav-data";
import { PlanCard } from "@/components/plan-card";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { formatNgn, plans } from "@/lib/site";
import { cycle, hueClass, type Hue } from "@/lib/hues";
import { Eyebrow } from "@/components/eyebrow";

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
  { step: "enroll", title: "Enroll today, start today", body: "Pay once in naira by card, transfer or USSD. Your lessons, dashboard and WhatsApp community unlock the moment you make payment." },
  { step: "build", title: "Build a real website in every lesson", body: "Short, practical lessons. Learn to use AI to write code, ship a real web page, online store, booking system or e-commerce site, and host it on the internet with free tools." },
  { step: "pitch", title: "Pitch and sell to businesses that need your services", body: "A ready-to-use proposal template, pricing calculator and message scripts to reach small and large businesses. You'll know what to charge and exactly what to say." },
  { step: "paid", title: "Get certified", body: "Go through the course properly, deliver your projects, then pass the final assessment for a verified certificate you can show every future client." },
];

const compare: [string, boolean | string, boolean | string][] = [
  ["Price, paid once", formatNgn(plans[0].priceNgn), formatNgn(plans[1].priceNgn)],
  ["Lessons, each with a task", `${fastTrack.modules.length} lessons`, `${mainTrack.modules.length} lessons`],
  ["Self-paced, lifetime access", true, true],
  ["Business sites and landing pages", true, true],
  ["Stores, bookings and web apps", true, true],
  ["SEO basics, portfolio, pitching", true, true],
  ["Full and local SEO", false, true],
  ["Business automations", false, true],
  ["AI chatbots and WhatsApp bots", false, true],
  ["A lead-generation system", false, true],
  ["Certificate and WhatsApp group", true, true],
];

const faqs = [
  { q: "Do I need to know how to code?", a: "No. You build by describing what you want to an AI builder, then check and adjust what it makes. We set you up with Google Antigravity, which is free; if you can afford Claude Pro, you can use Claude Code instead. Every lesson shows you the exact prompts." },
  { q: "Do I need to pay for any tools?", a: "No. Every lesson uses free tools: Google Antigravity to build, Cloudflare to put sites online (business use allowed), Paystack in test mode, and the free plans of the rest. Paid upgrades are always marked optional, and a client pays for their own domain." },
  { q: "Do I need a powerful laptop?", a: "No. Antigravity runs best on Windows 10 or 11 (64-bit) or a recent Mac, and any laptop with a modern browser can follow the free backup way. You can read lessons on your phone, but you build on a laptop." },
  { q: "How soon can I start earning?", a: "The Fast Track has you pricing your work and pitching real businesses in week two, with the scripts, proposal and portfolio to do it. How fast you land a client depends on how many businesses you reach, so we won't promise a date or an amount." },
  { q: "What's the difference between the Fast Track and the Main Track?", a: "The Fast Track (14 lessons, ₦15,000) takes you from zero to building and selling websites. The Main Track (26 lessons, ₦30,000) includes all of it and adds full SEO, automation, AI agents and lead generation, so you can sell monthly services, not just one-off websites." },
  { q: "Is it a subscription?", a: "No. You pay once per track and keep lifetime access, so you can learn at your own pace and come back to any lesson whenever you need it." },
  { q: "Do I get a certificate?", a: "Yes. Pass every lesson and the final assessment to get a certificate of completion: download it, receive a copy by email, and share its public proof page so clients can check it's real." },
  { q: "Can I start with the Fast Track and upgrade later?", a: "Yes. Everything in the Fast Track is part of the Main Track, so nothing you learn is wasted." },
];

function Heading({ eyebrow, children, sub, light = false, hue = "orange" }: { eyebrow?: string; children: React.ReactNode; sub?: string; light?: boolean; hue?: Hue }) {
  // Each section's eyebrow is a small coloured pill, so the long page reads as distinct parts.
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (light ? <p className="label inline-block rounded-full bg-white/10 px-3 py-1 text-brand">{eyebrow}</p> : <Eyebrow hue={hue}>{eyebrow}</Eyebrow>)}
      <h2 className={"display mt-3 text-balance text-[30px] sm:text-[52px] " + (light ? "text-white" : "text-ink")}>{children}</h2>
      {sub && <p className={"mx-auto mt-4 max-w-2xl text-pretty text-[16.5px] leading-relaxed " + (light ? "text-white/70" : "text-muted")}>{sub}</p>}
    </div>
  );
}

/** The two tracks side by side: price, facts and outcomes. Each full curriculum has its own page. */
function Tracks() {
  return (
    <section id="tracks" className="scroll-mt-24 px-4 py-12 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Heading hue="green" eyebrow="Two tracks, paid once" sub="Start with the Fast Track to learn how to build your first website, or take the Main Track to learn to build websites, AI agents and AI automation systems.">
          Pick the track that fits your goal
        </Heading>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 sm:mt-14 md:grid-cols-2 md:gap-x-16 lg:gap-x-32">
          {[fastTrack, mainTrack].map((track) => {
            const plan = plans.find((p) => p.id === track.id)!;
            const slug = track.id === "main_track" ? "main-track" : "fast-track";
            return (
              <div key={track.id} id={slug} className="scroll-mt-28">
                <h3 className="display mb-3 text-balance text-center text-[17px] leading-tight text-ink sm:mb-5 sm:text-[26px]">{track.headline}</h3>
                <PlanCard plan={plan} show={3} compact />
                <p className="mt-2 text-center text-[13.5px] text-muted sm:mt-4">
                  <Link href={`/tracks/${slug}`} className="font-semibold text-ink underline">
                    See the full {track.name} curriculum
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />

      {/* What you'll build and sell */}
      <section id="inside" className="scroll-mt-24 px-4 py-14 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="What you'll build" sub="Learn to build different kinds of websites. You'll build six kinds of website as real projects in the course. Build each one with AI, put it live, then sell it to businesses that need it.">
            Learn to build websites businesses <span className="scribble">pay for</span>
          </Heading>
          {/* One card per row on phones, picture beside the text, so two cards fit on one screen. */}
          <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
            {websiteKinds.map((w) => (
              <article key={w.kind} className="ink-block block-press flex flex-row bg-card sm:flex-col">
                <div className="flex w-[44%] shrink-0 items-center border-r-2 border-ink bg-sunk sm:block sm:w-auto sm:border-b-2 sm:border-r-0">
                  <div className="w-full">
                    <LiveSite kind={w.kind} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="display text-[16px] leading-tight text-ink sm:text-[22px]">{w.title}</h3>
                  <p className="mt-1 flex-1 text-[12.5px] leading-snug text-muted sm:mt-1.5 sm:text-[15px] sm:leading-relaxed">{w.body}</p>
                  <p className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-wash px-2 py-0.5 text-[11px] font-semibold text-brand-text sm:mt-4 sm:px-2.5 sm:py-1 sm:text-[12.5px]">
                    Lesson {w.day}<span className="hidden sm:inline">&nbsp;of the Fast Track</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-ink bg-sunk px-4 py-14 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading hue="blue" eyebrow="How it works" sub="No coding background, no expensive laptop, no guesswork. Here's exactly what happens after you enroll.">
            From first lesson to building your first website
          </Heading>
          {/* On phones the picture sits beside the text, so two steps fit on one screen. */}
          <ol className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.step} className="ink-block flex flex-row bg-card sm:flex-col">
                <div className="relative flex w-[38%] shrink-0 items-center border-r-2 border-ink bg-sunk sm:block sm:w-auto sm:border-b-2 sm:border-r-0">
                  <div className="w-full">
                    <StepArt step={s.step} />
                  </div>
                  <span className={`absolute left-2 top-2 grid size-7 place-items-center rounded-full border-2 border-ink text-[13px] font-bold shadow-[2px_2px_0_var(--ink)] sm:left-3 sm:top-3 sm:size-9 sm:text-[15px] ${hueClass[cycle[i % cycle.length]].wash} ${hueClass[cycle[i % cycle.length]].text}`}>{i + 1}</span>
                </div>
                <div className={`flex-1 p-3 sm:p-5 ${hueClass[cycle[i % cycle.length]].wash}`}>
                  <h3 className="display text-[15px] leading-tight text-ink sm:text-[20px]">{s.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-snug text-ink/80 sm:mt-2 sm:text-[14.5px] sm:leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-12">
            <Link href="/#tracks" className={`${btn.primary} ${size.lg}`}>
              Enroll Now <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/tracks/fast-track" className={`${btn.secondary} ${size.lg}`}>
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      <Tracks />

      {/* Compare */}
      <section id="compare" className="scroll-mt-20 border-y-2 border-ink bg-sunk px-4 py-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Heading hue="pink" eyebrow="Compare">
            Fast Track or Main Track?
          </Heading>
          <div className="ink-block mt-6 bg-card sm:mt-12">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="px-3 py-2 text-[12px] font-semibold text-muted sm:px-6 sm:py-4 sm:text-[13px]">What you get</th>
                  <th className="w-[24%] bg-brand px-1 py-2 text-center sm:w-[27%] sm:px-6 sm:py-4">
                    <span className="display block text-[14px] leading-tight text-ink sm:text-[22px]">Fast Track</span>
                    <span className="text-[11px] font-semibold text-ink/80 sm:text-[12px]">Start here</span>
                  </th>
                  <th className="w-[24%] px-1 py-2 text-center sm:w-[27%] sm:px-6 sm:py-4">
                    <span className="display block text-[14px] leading-tight text-ink sm:text-[22px]">Main Track</span>
                    <span className="text-[11px] font-medium text-muted sm:text-[12px]">Everything</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([row, a, b]) => (
                  <tr key={row} className="border-b border-line last:border-0">
                    <td className="px-3 py-1.5 text-[12.5px] leading-snug text-ink sm:px-6 sm:py-3.5 sm:text-[14.5px]">{row}</td>
                    {[a, b].map((v, i) => (
                      <td key={i} className={"px-1 py-1.5 text-center sm:px-3 sm:py-3.5 " + (i === 0 ? "bg-brand-wash/60" : "")}>
                        {typeof v === "string" ? (
                          <span className="text-[12px] font-semibold leading-tight text-ink sm:text-[14.5px]">{v}</span>
                        ) : v ? (
                          <Check className="mx-auto size-4 text-success sm:size-5" strokeWidth={3} aria-label="Included" />
                        ) : (
                          <Minus className="mx-auto size-4 text-faint sm:size-5" aria-label="Not included" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-3 py-2.5 sm:px-6 sm:py-5" />
                  <td className="bg-brand-wash/60 px-1 py-2.5 text-center sm:px-2 sm:py-5">
                    <Link href="/checkout/fast_track" className={`${btn.primary} h-9 w-full max-w-[150px] px-1.5 text-[12px] sm:text-[13px]`}>Enroll Now</Link>
                  </td>
                  <td className="px-1 py-2.5 text-center sm:px-2 sm:py-5">
                    <Link href="/checkout/main_track" className={`${btn.accent} h-9 w-full max-w-[150px] px-1.5 text-[12px] sm:text-[13px]`}>Enroll Now</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who it's for: a list */}
      <section id="who" className="scroll-mt-24 px-4 py-12 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Heading hue="purple" eyebrow="Who it's for" sub="You don't need a tech background. You need a laptop, a few hours a day and the will to go through the course to the end.">
            Built for people who want to earn with a real skill
          </Heading>
          <ul className="mt-8 grid gap-x-10 sm:mt-12 md:grid-cols-2">
            {personas.map((p, i) => (
              <li key={p.id} id={p.id} className="flex scroll-mt-28 gap-3 border-b border-line py-4">
                <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold ${hueClass[cycle[i % cycle.length]].wash} ${hueClass[cycle[i % cycle.length]].text}`}>{i + 1}</span>
                <p className="text-[15px] leading-relaxed text-muted">
                  <span className="font-semibold text-ink">{p.label}.</span> {p.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* FAQ */}
      <section className="border-t-2 border-ink bg-sunk px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading hue="yellow" eyebrow="FAQ">Questions, answered</Heading>
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
