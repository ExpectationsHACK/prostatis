import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { pillars } from "@/lib/curriculum";
import { pillarClasses } from "@/lib/hues";
import { bonusTools, coreTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "50 free tools for web design, SEO, automation and AI agents",
  description:
    "50 free, no-signup tools for building and selling websites, SEO, automations and AI agents: colour palettes, meta tags, SEO audit, WhatsApp bot flows, ROI calculator and more.",
};

export default function ToolsPage() {
  return (
    <div className="paper-grid">
      <header className="border-b-2 border-ink bg-card px-4 py-10 text-center sm:py-20">
        <p className="label text-brand-text">Free, no signup</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-balance text-[32px] text-ink sm:text-[60px]">{coreTools.length} free tools that do the work for you</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[16.5px] leading-relaxed text-muted">
          Pick a colour palette, check a site&apos;s speed and SEO, write the proposal and the cold message, then send the invoice. Every tool works on your phone and gives you results you can copy straight away.
        </p>
        <nav className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Pillars">
          {pillars.map((p) => (
            <Link key={p.id} href={`#${p.id}`} className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-transform hover:-translate-y-0.5 ${pillarClasses(p.id).wash}`}>
              <span className={`size-2 rounded-full ${pillarClasses(p.id).solid}`} aria-hidden />
              {p.title} · {coreTools.filter((t) => t.pillar === p.id).length}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {pillars.map((p) => {
          const list = coreTools.filter((t) => t.pillar === p.id);
          return (
            <section key={p.id} id={p.id} className="scroll-mt-24 pb-12 sm:pb-16">
              <div className={`flex flex-wrap items-end justify-between gap-3 border-b-2 pb-3 ${pillarClasses(p.id).border}`}>
                <div>
                  <h2 className="display flex items-center gap-3 text-[26px] text-ink sm:text-[40px]">
                    <span className={`size-3.5 shrink-0 rounded-full sm:size-4 ${pillarClasses(p.id).solid}`} aria-hidden />
                    {p.title}
                  </h2>
                  <p className="mt-1 font-mono text-[13px] text-muted">{p.blurb}</p>
                </div>
                <span className={`label rounded-full px-2.5 py-1 ${pillarClasses(p.id).wash} ${pillarClasses(p.id).text}`}>{list.length} tools</span>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          );
        })}

        <section id="bonus" className="scroll-mt-24">
          <div className="border-b border-edge pb-3">
            <h2 className="display text-[26px] text-ink sm:text-[40px]">Bonus: getting paid</h2>
            <p className="mt-1 font-mono text-[13px] text-muted">Proposals, pricing, getting paid and promotion.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bonusTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
