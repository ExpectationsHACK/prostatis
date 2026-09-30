import { ArrowRight, CircleAlert, Clock, Gift, ListChecks, Rocket } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { ToolThumb } from "@/components/art/tool-thumb";
import { LogoTile } from "@/components/brand";
import { SharePills } from "@/components/share-pills";
import { ToolCard } from "@/components/tool-card";
import ToolRenderer from "@/components/tools/tool-renderer";
import { btn, byline, size } from "@/components/ui";
import { SubscribeForm } from "@/components/waitlist-form";
import { getPillar, lessonsForPillar } from "@/lib/curriculum";
import { site } from "@/lib/site";
import { guides } from "@/lib/tool-guides";
import { coreTools, getTool, nextTool, tools } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return {
    title: `${tool.title}: free, no signup`,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}

export default async function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const pillar = getPillar(tool.pillar);
  const lessons = lessonsForPillar(tool.pillar);
  const next = nextTool[tool.slug] ? getTool(nextTool[tool.slug]) : undefined;
  const related = coreTools.filter((t) => t.pillar === tool.pillar && t.slug !== tool.slug).slice(0, 3);
  const guide = guides[tool.slug];

  return (
    <article className="paper-grid pb-16">
      <header className="border-b border-edge">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1.3fr_1fr] md:py-14">
          <div>
            <Link href={`/tools#${tool.pillar}`} className="label text-brand-text hover:underline">
              {pillar.title} tools
            </Link>
            <h1 className="display mt-3 text-balance text-[40px] text-ink sm:text-[56px]">{tool.title}</h1>
            <p className="mt-3 text-pretty font-mono text-[15px] leading-relaxed text-muted">{tool.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <p className="flex items-start gap-2 border border-edge bg-card px-3 py-2.5 text-[14px] leading-snug text-ink">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
                <span>
                  <strong>The problem:</strong> {guide.problem}
                </span>
              </p>
              <p className="flex items-start gap-2 border border-edge bg-[#e3f5e9] px-3 py-2.5 text-[14px] leading-snug text-ink">
                <Gift className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                <span>
                  <strong>You get:</strong> {guide.get}
                </span>
              </p>
            </div>
            <p className="label mt-3 inline-flex items-center gap-1.5 text-muted">
              <Clock className="size-3.5" aria-hidden /> About {guide.minutes} min · {tool.useCase}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogoTile size={32} />
                <p className={byline}>Free · no signup · runs in your browser</p>
              </div>
              <SharePills title={tool.title} />
            </div>
          </div>
          <div className="ink-block hidden md:block">
            <ToolThumb slug={tool.slug} tone={tool.tone} />
          </div>
        </div>
      </header>

      {/* How to use it */}
      <section className="mx-auto mt-10 max-w-6xl px-4" aria-labelledby="how">
        <h2 id="how" className="label flex items-center gap-1.5 text-ink">
          <ListChecks className="size-4" aria-hidden /> How to use it
        </h2>
        <ol className="mt-3 grid gap-3 md:grid-cols-3">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 border border-edge bg-card p-3.5">
              <span className="display grid size-7 shrink-0 place-items-center border border-edge bg-brand text-[14px] text-ink">{i + 1}</span>
              <span className="text-[14px] leading-snug text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* The tool itself */}
      <div className="mx-auto mt-8 max-w-6xl px-4">
        <ToolRenderer slug={tool.slug} pillar={tool.pillar} />
      </div>

      {/* What to do with the result */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="ink-block bg-accent p-5 text-accent-ink sm:p-7">
          <h2 className="display flex items-center gap-2 text-[26px]">
            <Rocket className="size-6" aria-hidden /> Now put it to work
          </h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {guide.next.map((step, i) => (
              <li key={i} className="flex gap-3 border border-paper/40 p-3.5">
                <span className="display text-[18px] text-brand">{i + 1}</span>
                <span className="text-[14.5px] leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next tool in the workflow */}
      {next && (
        <section className="mx-auto mt-14 max-w-4xl px-4">
          <p className="label text-muted">Next tool in your workflow</p>
          <Link href={`/tools/${next.slug}`} className="ink-block block-press group mt-3 grid overflow-hidden bg-card sm:grid-cols-[1fr_1.3fr]">
            <div className="border-b border-edge sm:border-b-0 sm:border-r">
              <ToolThumb slug={next.slug} tone={next.tone} />
            </div>
            <div className="flex flex-col justify-center p-5">
              <p className="label text-brand-text">{getPillar(next.pillar).title}</p>
              <p className="display mt-1 flex items-center gap-2 text-[24px] text-ink">
                {next.title} <ArrowRight className="size-5 text-brand-text transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
              <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-muted">{next.description}</p>
            </div>
          </Link>
        </section>
      )}

      {/* Where it's taught */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="display border-b border-edge pb-3 text-[28px] text-ink">Learn it properly</h2>
        <div className={`mt-6 grid gap-6 ${lessons.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
          {lessons.map(({ track, module: m }, i) => (
            <div key={track.id} className="ink-block flex flex-col overflow-hidden bg-card">
              <div className="border-b border-edge">
                <LessonThumb thumb={m.thumb} index={m.day + i} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="label text-brand-text">
                  {track.name} · Day {m.day} · Week {m.week}
                </p>
                <h3 className="display mt-2 text-[22px] text-ink">{m.title}</h3>
                <p className="mt-1.5 flex-1 font-mono text-[13px] leading-relaxed text-muted">{m.summary}</p>
                <Link href={`/checkout/${track.id}`} className={`${btn.primary} ${size.md} mt-5 w-full`}>
                  Enroll Now <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="mx-auto mt-14 max-w-2xl px-4">
        <div className="border border-dashed border-edge/50 bg-card px-6 py-8 text-center">
          <p className="display text-[22px] text-ink">Found this useful?</p>
          <p className="mt-1 font-mono text-[13px] text-muted">Get new free tools by email from {site.name}.</p>
          <div className="mx-auto mt-5 max-w-[420px]">
            <SubscribeForm source={`tool-${tool.slug}`} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4">
          <h2 className="display border-b border-edge pb-3 text-[28px] text-ink">More {pillar.title} tools</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
