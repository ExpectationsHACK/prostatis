import { ArrowRight, Award, BookOpen, Check, Globe, ImagePlus, MessageCircle, Plus, Rocket, UserRound, Wallet, X } from "lucide-react";
import Link from "next/link";
import { ProductThumb } from "@/components/art/product-thumb";
import { WebsiteKindThumb } from "@/components/art/website-kind-thumb";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/marquee";
import { personas } from "@/components/nav-data";
import { ToolCard } from "@/components/tool-card";
import { TrackLessons } from "@/components/track-lessons";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack, pillars, type Track } from "@/lib/curriculum";
import { products, team, wins } from "@/lib/showcase";
import { formatNgn, plans } from "@/lib/site";
import { coreTools } from "@/lib/tools";

const ledger: [string, string][] = [
  ["Paying a developer for every small website", "Building it yourself with AI in a weekend"],
  ["Watching web-dev tutorials, never shipping a site", "A live website on your own domain in week one"],
  ["Charging naira rates for dollar-value websites", "A rate card worked out from your income goals"],
  ["No idea how to find website clients", "Proposals, cold DMs and a get-paid system that lands paying clients"],
  ["Stuck alone when the site breaks", "A WhatsApp community of builders to ask"],
];

const websiteKinds = [
  { kind: "landing" as const, title: "Landing pages", body: "One page that sells one offer: hero, proof, price, button.", lines: ["hero · offer · proof", "one clear button", "fast on 4G"], tone: "sand" as const },
  { kind: "business" as const, title: "Business websites", body: "Five-page sites for real businesses, with WhatsApp and Google Maps built in.", lines: ["home · services · about", "WhatsApp order button", "Google Maps + reviews"], tone: "forest" as const },
  { kind: "store" as const, title: "Online stores", body: "Product pages, carts and checkout with Paystack or Stripe.", lines: ["12 products", "cart → checkout", "Paystack + Stripe"], tone: "orange" as const },
  { kind: "webapp" as const, title: "Web apps", body: "Logins, dashboards and databases: the builds clients pay most for.", lines: ["sign in · dashboard", "Supabase database", "admin panel"], tone: "indigo" as const },
  { kind: "booking" as const, title: "Booking sites", body: "Calendars, deposits and reminders for clinics, salons and coaches.", lines: ["pick a time", "pay deposit", "reminder sent"], tone: "peach" as const },
  { kind: "portfolio" as const, title: "Your portfolio", body: "A one-page portfolio that wins you the next client.", lines: ["3 best builds", "results + prices", "hire-me button"], tone: "ink" as const },
];

const webPath = ["Plan", "Design", "Build with AI", "Deploy", "Hand over", "Get paid"];

const inside = [
  { icon: Globe, title: "Website builds", body: "Landing pages, business sites, stores and web apps, from first page to live on your domain." },
  { icon: Rocket, title: "Fast Track · 14 days", body: "Websites, landing pages, stores, booking systems and web apps: built, live and paid for in two weeks." },
  { icon: BookOpen, title: "Main Track · 1 month", body: "Everything in the Fast Track plus full SEO, automation, AI agents and lead generation." },
  { icon: Award, title: "Verified certificate", body: "Pass the final assessment and get a certificate you can download, receive by email and prove with a public link." },
  { icon: MessageCircle, title: "WhatsApp community", body: "Share builds, get unstuck, hear about client leads." },
  { icon: Wallet, title: "Naira pricing", body: "Pay once with Paystack: card, transfer or USSD. No dollar card needed." },
];

const steps = [
  { title: "Pick a track", body: "Fast Track to build and ship websites, stores and web apps in 14 days, or the Main Track to learn the whole offer in a month." },
  { title: "Build every day", body: "Each lesson ends with something real: a page, a profile, an automation, an agent." },
  { title: "Sell it", body: "Price it, pitch it, send the proposal, get paid." },
];

const faqs = [
  { q: "What's the difference between the Fast Track and the Main Track?", a: "The Fast Track (14 days, ₦15,000) covers web design and development: business websites, landing pages, online stores, booking systems and web apps with logins and databases, plus SEO basics, a portfolio, pitching and getting paid. The Main Track (1 month, ₦30,000) teaches all of that plus full and local SEO, business automation, AI agents and lead generation." },
  { q: "What kind of websites will I build?", a: "Landing pages, business websites, online stores, booking sites, portfolios and web apps with logins and databases, built with AI tools like Claude Code and deployed on your own domain." },
  { q: "Do I need to know how to code?", a: "No. You build by describing what you want to AI tools like Claude Code, then learn to read and adjust what they make." },
  { q: "What do I need to start?", a: "A laptop (a phone is fine for lessons), an internet connection, and a few hours a day. We show you how to start free and keep AI costs low." },
  { q: "Is it a subscription?", a: "No. You pay once per track. The Fast Track stays unlocked for 30 days and the Main Track for 60, so you have time to catch up." },
  { q: "Do I get a certificate?", a: "Yes. Pass every lesson and the final assessment and you get a certificate of completion: download it, receive a copy by email, and share its public proof page so clients and employers can check it's real. It shows your name, track, score and a unique ID." },
  { q: "Can I start with the Fast Track and upgrade later?", a: "Yes: everything in the Fast Track is also in the Main Track, so nothing you learn is wasted." },
];

function Heading({ children, sub, light = false }: { children: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className={"display text-balance text-[38px] sm:text-[56px] " + (light ? "text-paper" : "text-ink")}>{children}</h2>
      {sub && <p className={"mx-auto mt-4 max-w-xl font-mono text-[14px] leading-relaxed " + (light ? "text-paper/75" : "text-muted")}>{sub}</p>}
    </div>
  );
}

function Placeholder() {
  return <span className="label border-2 border-dashed border-brand-text px-2 py-0.5 text-brand-text">Placeholder</span>;
}

/** A short preview of a track: key facts, three lessons, and a link to the full page. */
function TrackSummary({ track, slug, dark = false }: { track: Track; slug: string; dark?: boolean }) {
  const plan = plans.find((p) => p.id === track.id)!;
  return (
    <section id={slug} className={"scroll-mt-24 border-b-2 border-edge px-4 py-20 sm:py-24 " + (dark ? "field-grid bg-night text-paper" : "")}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <span className={"label border-2 px-2.5 py-1 " + (dark ? "border-paper bg-brand text-ink" : "border-edge bg-brand text-ink")}>
              {track.length} · {formatNgn(plan.priceNgn)} · {track.modules.length} lessons
            </span>
            <h2 className={"display mt-5 text-[40px] sm:text-[60px] " + (dark ? "text-paper" : "text-ink")}>The {track.name}</h2>
            <p className={"mt-3 max-w-xl font-mono text-[14px] leading-relaxed " + (dark ? "text-paper/75" : "text-muted")}>{track.blurb}</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {plan.results.slice(0, 4).map((r) => (
              <li key={r} className={"flex gap-2 border-2 px-3 py-2 font-mono text-[13px] font-bold " + (dark ? "border-paper/30 text-paper" : "border-edge bg-card text-ink")}>
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <TrackLessons track={track} compact />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={`/tracks/${slug}`} className={`${btn.secondary} ${size.lg}`}>
            See all {track.modules.length} lessons <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href={`/checkout/${track.id}`} className={`${btn.primary} ${size.lg}`}>
            Enroll Now · {formatNgn(plan.priceNgn)}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const hi = plan.highlight;
  return (
    <div className={"relative flex flex-col border-2 p-7 " + (hi ? "border-brand bg-brand text-ink shadow-[6px_6px_0_var(--paper)]" : "border-paper/30")}>
      {hi && <span className="label absolute -top-3.5 left-6 border-2 border-edge bg-paper px-2.5 py-1 text-ink">Everything included</span>}
      <h3 className="display text-[32px]">{plan.name}</h3>
      <p className={"mt-1 font-mono text-[13px] " + (hi ? "text-ink/80" : "text-paper/70")}>{plan.blurb}</p>
      <p className="display tabular mt-5 text-[48px]">
        {formatNgn(plan.priceNgn)}
        <span className="ml-2 font-mono text-[14px] font-bold">one-time · {plan.period}</span>
      </p>
      <p className={"label mt-2 " + (hi ? "text-ink/80" : "text-brand")}>{plan.covers}</p>
      <p className={"label mt-6 " + (hi ? "text-ink" : "text-paper")}>What you&apos;ll walk away with</p>
      <ul className="mt-3 flex-1 space-y-2.5">
        {plan.results.map((r) => (
          <li key={r} className="flex gap-2.5 text-[14px]">
            <Check className={"mt-0.5 size-[18px] shrink-0 " + (hi ? "text-ink" : "text-brand")} strokeWidth={2.75} aria-hidden />
            {r}
          </li>
        ))}
      </ul>
      <Link href={`/checkout/${plan.id}`} className={`${hi ? `${btn.secondary} bg-paper` : btn.primary} ${size.lg} mt-8 w-full`}>
        Enroll Now <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

const featuredTools = ["website-speed-checklist", "on-page-seo-audit", "domain-name-generator", "color-palette-generator", "whatsapp-bot-flow-builder", "automation-roi-calculator"];

export default function Home() {
  const featured = featuredTools.map((slug) => coreTools.find((t) => t.slug === slug)).filter((t) => t !== undefined);

  return (
    <div className="paper-grid">
      <Hero />

      {/* Websites first */}
      <section className="px-4 py-20 sm:py-24">
        <Heading sub="Web development is the heart of STEINARK. These are the websites you'll learn to build, and sell.">
          Websites <span className="scribble">first</span>
        </Heading>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {websiteKinds.map((w) => (
            <div key={w.title} className="ink-block block-press flex flex-col bg-card">
              <div className="border-b-2 border-edge">
                <WebsiteKindThumb kind={w.kind} tone={w.tone} />
              </div>
              <div className="p-5">
                <h3 className="display text-[24px] text-ink">{w.title}</h3>
                <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-muted">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
        <ol className="ink-block mx-auto mt-14 flex max-w-6xl flex-wrap bg-card">
          {webPath.map((step, i) => (
            <li key={step} className={"flex min-w-[50%] flex-1 items-center gap-3 px-4 py-4 sm:min-w-0 " + (i < webPath.length - 1 ? "border-b-2 border-edge sm:border-b-0 sm:border-r-2" : "")}>
              <span className="display grid size-9 shrink-0 place-items-center border-2 border-edge bg-brand text-[16px] text-ink">{i + 1}</span>
              <span className="label text-[12px] text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Ledger */}
      <section className="px-4 py-20 sm:py-24">
        <Heading sub="What changes when you stop watching and start building for paying clients.">
          The <span className="scribble">ledger</span>
        </Heading>
        <div className="ink-block mx-auto mt-12 max-w-4xl bg-card">
          <div className="grid grid-cols-2 border-b-2 border-edge">
            <p className="label border-r-2 border-edge px-4 py-3 text-muted">Before</p>
            <p className="label bg-accent px-4 py-3 text-accent-ink">After you join</p>
          </div>
          {ledger.map(([b, a], i) => (
            <div key={i} className={"grid grid-cols-2 " + (i < ledger.length - 1 ? "border-b border-line" : "")}>
              <p className="flex gap-2.5 border-r-2 border-edge px-4 py-4 font-mono text-[13px] leading-snug text-muted">
                <X className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={3} aria-hidden />
                <span className="line-through decoration-danger/50">{b}</span>
              </p>
              <p className="flex gap-2.5 px-4 py-4 font-mono text-[13px] font-bold leading-snug text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden />
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section id="inside" className="scroll-mt-24 field-grid border-y-2 border-edge bg-accent px-4 py-20 sm:py-24">
        <Heading light sub="Built for Nigerians: naira pricing, Paystack, WhatsApp, Lagos time.">
          What you get
        </Heading>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inside.map((c, i) => (
            <div key={c.title} className={"ink-block bg-card p-6 " + (i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]")}>
              <span className="grid size-11 place-items-center border-2 border-edge bg-brand">
                <c.icon className="size-5 text-ink" aria-hidden />
              </span>
              <h3 className="display mt-4 text-[22px] text-ink">{c.title}</h3>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <TrackSummary track={fastTrack} slug="fast-track" />

      <TrackSummary track={mainTrack} slug="main-track" />

      {/* Seven skills */}
      <section className="field-grid border-y-2 border-edge bg-night px-4 py-20 text-paper sm:py-24">
        <Heading light sub="Most courses teach these as separate skills. In the Main Track every one feeds the same thing you sell: a website that brings a business customers, and the systems that handle them.">
          Seven skills. <span className="text-brand">One offer.</span>
        </Heading>
        <ol className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-3">
          {pillars.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3">
              <Link href={`/tools#${p.id}`} className="block-press flex items-center gap-2 border-2 border-paper bg-paper px-3 py-2 text-ink shadow-[4px_4px_0_var(--brand)]">
                <span className="display text-[14px] text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[13px] font-bold uppercase tracking-wider">{p.title}</span>
              </Link>
              {i < pillars.length - 1 && <ArrowRight className="hidden size-4 text-brand sm:block" aria-hidden />}
            </li>
          ))}
        </ol>
      </section>


      {/* Free tools */}
      <section className="border-y-2 border-edge bg-sunk px-4 py-20 sm:py-24">
        <Heading sub="Every one works: no signup, runs on your phone. Several analyse a real website from its link.">
          {coreTools.length} free tools, <span className="text-brand-text">no signup</span>
        </Heading>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {pillars.map((p) => (
            <Link key={p.id} href={`/tools#${p.id}`} className="border-2 border-edge bg-card px-3 py-1.5 font-mono text-[12px] font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-paper">
              {p.title} · {coreTools.filter((t) => t.pillar === p.id).length}
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/tools" className={`${btn.primary} ${size.lg}`}>
            All {coreTools.length} free tools <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Products gallery */}
      <section className="field-grid overflow-hidden border-b-2 border-edge bg-brand py-20 sm:py-24">
        <div className="px-4">
        <Heading sub={`${products.length} products you'll be able to build and sell. Examples of what the course walks you through. Real member builds will replace them.`}>
          What you&apos;ll build
        </Heading>
      </div>
      <div className="mt-12 space-y-6">
        {[products.slice(0, Math.ceil(products.length / 2)), products.slice(Math.ceil(products.length / 2))].map((row, r) => (
          <Marquee key={r} reverse={r === 1} seconds={70} gap="gap-5" className="py-2">
            {row.map((p) => (
              <div key={p.title} className="ink-block w-[250px] shrink-0 bg-card sm:w-[290px]">
                <div className="border-b-2 border-edge">
                  <ProductThumb kind={p.thumb} tone={p.tone} />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <p className="display text-[15px] leading-tight text-ink">{p.title}</p>
                  <span className="label shrink-0 bg-wash px-1.5 py-0.5 text-muted">{p.category}</span>
                </div>
              </div>
            ))}
          </Marquee>
        ))}
      </div>
      </section>

      <div className="border-b-2 border-edge bg-night py-3">
        <Marquee seconds={45} gap="gap-8">
          {["Web design", "Web development", "Web solutions", "SEO", "Automation", "Lead generation", "AI agents", "Get paid"].map((w) => (
            <span key={w} className="label flex items-center gap-8 text-[13px] text-brand">
              {w}
              <span className="size-1.5 bg-paper" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Who it's for */}
      <section id="who" className="scroll-mt-24 px-4 py-20 sm:py-24">
        <Heading sub="If you can type, you can build. Here's who STEINARK is built for.">Who it&apos;s for</Heading>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p, i) => (
            <div key={p.id} id={p.id} className="ink-block scroll-mt-28 bg-card p-6">
              <span className="display text-[34px] text-brand-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-2 text-[22px] text-ink">{p.label}</h3>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted">{p.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wins: placeholders */}
      <section className="px-4 py-20 sm:py-24">
        <Heading sub="Real results from members will be printed here.">Member wins</Heading>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {wins.map((w, i) => (
            <figure key={i} className="flex flex-col border-2 border-dashed border-edge/50 bg-card/60 p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center border-2 border-edge bg-wash">
                  <UserRound className="size-5 text-muted" aria-hidden />
                </span>
                {w.placeholder && <Placeholder />}
              </div>
              <p className="display mt-5 text-[22px] text-ink">{w.result}</p>
              <blockquote className="mt-2 flex-1 font-mono text-[13px] leading-relaxed text-muted">{w.detail}</blockquote>
              <figcaption className="label mt-5 text-ink">{w.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-edge bg-sunk px-4 py-20 sm:py-24">
        <Heading>How STEINARK works</Heading>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="ink-block bg-card p-6">
              <span className="display grid size-12 place-items-center border-2 border-edge bg-accent text-[24px] text-accent-ink">{i + 1}</span>
              <h3 className="display mt-4 text-[24px] text-ink">{s.title}</h3>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-16 bg-night px-4 py-20 text-paper sm:py-24">
        <Heading light sub="Pay once in naira with Paystack, card, transfer or USSD. No subscription.">
          Pick your track
        </Heading>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </section>

      {/* Team: placeholders */}
      <section className="px-4 py-20 sm:py-24">
        <Heading>Who&apos;s teaching</Heading>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <div key={i} className="border-2 border-dashed border-edge/50 bg-card/60 p-6 text-center">
              <span className="mx-auto grid size-20 place-items-center border-2 border-edge bg-wash">
                <ImagePlus className="size-7 text-muted" aria-hidden />
              </span>
              <div className="mt-4 flex justify-center">{m.placeholder && <Placeholder />}</div>
              <p className="display mt-3 text-[22px] text-ink">{m.name}</p>
              <p className="label mt-1 text-brand-text">{m.role}</p>
              <p className="mt-2 font-mono text-[13px] text-muted">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-edge bg-sunk px-4 py-20 sm:py-24">
        <Heading>Questions</Heading>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="ink-block group bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-[14px] font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-brand-text transition-transform duration-200 group-open:rotate-45" strokeWidth={3} aria-hidden />
              </summary>
              <p className="border-t-2 border-dashed border-line px-5 py-4 font-mono text-[13px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}

