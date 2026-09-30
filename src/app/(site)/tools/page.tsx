import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { pillars } from "@/lib/curriculum";
import { bonusTools, coreTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "50 free tools for web design, SEO, automation and AI agents",
  description:
    "50 free, no-signup tools for building and selling websites, SEO, automations and AI agents: colour palettes, meta tags, SEO audit, WhatsApp bot flows, ROI calculator and more.",
};

export default function ToolsPage() {
  return (
    <div className="paper-grid">
      <header className="border-b border-line bg-card px-4 py-14 text-center sm:py-20">
        <h1 className="display mx-auto max-w-3xl text-balance text-[44px] text-ink sm:text-[68px]">{coreTools.length} free tools</h1>
        <p className="mx-auto mt-4 max-w-xl font-mono text-[14px] leading-relaxed text-ink">
          Everything you need to design, build, rank, automate and sell websites, no signup, runs on your phone, output you can copy.
        </p>
        <nav className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Pillars">
          {pillars.map((p) => (
            <Link key={p.id} href={`#${p.id}`} className="border border-edge bg-paper px-3 py-1.5 font-mono text-[12px] font-bold text-ink hover:bg-ink hover:text-paper">
              {p.title} · {coreTools.filter((t) => t.pillar === p.id).length}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {pillars.map((p) => {
          const list = coreTools.filter((t) => t.pillar === p.id);
          return (
            <section key={p.id} id={p.id} className="scroll-mt-24 pb-16">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-edge pb-3">
                <div>
                  <h2 className="display text-[32px] text-ink sm:text-[40px]">{p.title}</h2>
                  <p className="mt-1 font-mono text-[13px] text-muted">{p.blurb}</p>
                </div>
                <span className="label text-muted">{list.length} tools</span>
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
            <h2 className="display text-[32px] text-ink sm:text-[40px]">Bonus: getting paid</h2>
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
