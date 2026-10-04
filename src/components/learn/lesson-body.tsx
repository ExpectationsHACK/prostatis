import { AlertTriangle, ArrowUpRight, BookA, CheckCircle2, Clock3, Lightbulb, MapPin, MonitorX, Rocket, Wrench, XCircle } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LessonDiagram } from "@/components/art/lesson-diagram";
import { SketchIcon, SketchView } from "@/components/art/sketch";
import { ProductThumb } from "@/components/art/product-thumb";
import { ToolThumb } from "@/components/art/tool-thumb";
import type { Tone } from "@/components/cover";
import { CopyButton } from "@/components/tool-ui";
import type { Figure, Lesson, LessonBlock } from "@/content/types";
import { BuilderSteps } from "./builder-choice";
import { SelfCheck, TryIt } from "./practice";
import { Rich } from "./rich";
import type { Track } from "@/lib/curriculum";
import { tracks } from "@/lib/curriculum";
import { getTool } from "@/lib/tools";

const figureTones: Tone[] = ["sand", "peach", "forest", "indigo", "orange"];

export { Rich };

function FigureView({ f, i }: { f: Figure; i: number }) {
  let art: ReactNode = null;
  if ("diagram" in f) art = <LessonDiagram kind={f.diagram} />;
  else if ("product" in f) art = <ProductThumb kind={f.product} tone={figureTones[i % figureTones.length]} />;
  else art = <ToolThumb slug={f.tool} tone={getTool(f.tool)?.tone ?? "sand"} />;
  return (
    <figure className="my-6">
      <div className="ink-block overflow-hidden bg-card">{art}</div>
      <figcaption className="mt-2.5 font-mono text-[12.5px] leading-relaxed text-muted">
        <span className="label mr-2 text-brand-text">Fig.</span>
        {f.caption}
      </figcaption>
    </figure>
  );
}

function Callout({ tone, icon, title, children }: { tone: "tip" | "warn"; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className={"my-5 flex gap-3 border border-edge p-4 " + (tone === "tip" ? "bg-[#fff4d6]" : "bg-[#ffe3dc]")}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="label text-ink">{title}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink">{children}</p>
      </div>
    </div>
  );
}

export const slugTerm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Block({ b, i, lessonId, track }: { b: LessonBlock; i: number; lessonId: string; track?: Track }) {
  switch (b.t) {
    case "p":
      return <p className="my-4 text-[16px] leading-[1.75] text-ink/90"><Rich text={b.text} /></p>;
    case "list":
      return (
        <ul className="my-4 space-y-2">
          {b.items.map((x) => (
            <li key={x} className="flex gap-3 text-[16px] leading-relaxed text-ink/90">
              <span className="mt-2.5 size-1.5 shrink-0 bg-brand" aria-hidden />
              <span><Rich text={x} /></span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="my-5 space-y-3">
          {b.items.map((s, n) => (
            <li key={s.title} className="flex gap-3.5">
              <span className="display grid size-8 shrink-0 place-items-center border border-edge bg-brand text-[15px] text-ink">{n + 1}</span>
              <div className="pt-0.5">
                <p className="font-bold text-ink"><Rich text={s.title} /></p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-muted"><Rich text={s.detail} /></p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "prompt":
      return (
        <div className="my-6 border border-edge bg-night text-paper">
          <div className="flex items-center justify-between gap-3 border-b border-paper/20 px-4 py-2.5">
            <p className="label text-brand">Prompt · {b.title}</p>
            <CopyButton text={b.text} label="Copy prompt" />
          </div>
          <p className="whitespace-pre-wrap px-4 py-4 font-mono text-[13.5px] leading-relaxed text-paper/90">{b.text}</p>
        </div>
      );
    case "code":
      return (
        <div className="my-5 border border-edge bg-sunk">
          <div className="flex items-center justify-between border-b border-edge px-3 py-1.5">
            <span className="label text-muted">{b.lang}</span>
            <CopyButton text={b.text} />
          </div>
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-ink">{b.text}</pre>
        </div>
      );
    case "tip":
      return <Callout tone="tip" icon={<Lightbulb className="size-5 text-ink" />} title="Tip"><Rich text={b.text} /></Callout>;
    case "warn":
      return <Callout tone="warn" icon={<AlertTriangle className="size-5 text-danger" />} title="Watch out"><Rich text={b.text} /></Callout>;
    case "figure":
      return <FigureView f={b.figure} i={i} />;
    case "table":
      return (
        <div className="my-5 overflow-x-auto border border-edge">
          <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
            <thead className="bg-ink text-paper">
              <tr>{b.columns.map((c, n) => <th key={n} className="px-3 py-2 font-mono text-[12px] font-bold">{c}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, n) => (
                <tr key={n} className={n % 2 ? "bg-wash/60" : "bg-card"}>
                  {r.map((c, k) => <td key={k} className={"border-t border-line px-3 py-2 align-top leading-snug " + (k === 0 ? "font-bold text-ink" : "text-ink/85")}><Rich text={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "define":
      return (
        <div id={`term-${slugTerm(b.term)}`} className="my-5 scroll-mt-24 border border-edge bg-card">
          <p className="label flex items-center gap-1.5 border-b border-edge bg-accent px-3 py-1.5 text-accent-ink">
            <BookA className="size-3.5" aria-hidden /> Jargon buster
          </p>
          <div className="px-4 py-3">
            <p className="display text-[17px] sm:text-[19px] text-ink">{b.term}</p>
            <p className="mt-1.5 border-l-4 border-brand pl-3 text-[15.5px] leading-relaxed text-ink">
              <span className="font-semibold">Think of it like </span>
              <Rich text={b.like} />
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-ink/90">
              <span className="font-semibold">In plain English: </span>
              <Rich text={b.meaning} />
            </p>
          </div>
        </div>
      );
    case "scenario":
      return (
        <div className="my-6 border border-edge bg-[#fff8ec] p-4">
          <p className="label flex items-center gap-1.5 text-brand-text"><MapPin className="size-3.5" aria-hidden /> Real-life scenario</p>
          <p className="display mt-1.5 text-[16.5px] sm:text-[18px] text-ink">{b.title}</p>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink/90"><Rich text={b.text} /></p>
        </div>
      );
    case "try":
      return <TryIt id={`${lessonId}:${i}`} title={b.title} minutes={b.minutes} steps={b.steps} />;
    case "check":
      return <SelfCheck q={b.q} options={b.options} answer={b.answer} why={b.why} />;
    case "mistakes":
      return (
        <div className="my-6 border border-edge">
          <p className="label border-b border-edge bg-ink px-3 py-1.5 text-paper">Common mistakes: and the fix</p>
          <ul>
            {b.items.map((m, n) => (
              <li key={n} className={"grid gap-2 px-3 py-3 sm:grid-cols-2 " + (n ? "border-t border-line" : "")}>
                <p className="flex gap-2 text-[14.5px] leading-snug text-ink/80"><XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden /><span><Rich text={m.wrong} /></span></p>
                <p className="flex gap-2 text-[14.5px] font-semibold leading-snug text-ink"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /><span><Rich text={m.right} /></span></p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "tool": {
      const tool = getTool(b.slug);
      if (!tool) return null;
      return (
        <Link href={`/tools/${tool.slug}`} target="_blank" className="ink-block block-press my-5 flex items-center gap-4 bg-card p-3">
          <div className="w-28 shrink-0 border border-edge sm:w-36">
            <ToolThumb slug={tool.slug} tone={tool.tone} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="label flex items-center gap-1.5 text-brand-text"><Wrench className="size-3.5" aria-hidden /> Free tool</p>
            <p className="display mt-1 text-[16px] sm:text-[17px] text-ink">{tool.title}</p>
            <p className="mt-1 font-mono text-[12.5px] leading-snug text-muted">{b.why}</p>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-ink" aria-hidden />
        </Link>
      );
    }
    case "sketch":
      return <SketchView sketch={b.sketch} caption={b.caption} />;
    case "builder":
      return <BuilderSteps title={b.title} paths={{ antigravity: b.antigravity, "claude-code": b.claudeCode, chat: b.chat }} />;
    case "win":
      return (
        <div className="ink-block relative my-7 overflow-hidden bg-brand p-5 text-ink" role="note">
          <span className="pointer-events-none absolute -right-3 -top-3 opacity-90" aria-hidden>
            <SketchIcon draw="trophy" className="size-20" />
          </span>
          <p className="label">Milestone</p>
          <p className="display mt-1 max-w-[30rem] pr-14 text-[21px] sm:text-[24px] leading-tight">{b.title}</p>
          <p className="mt-2 text-[15.5px] leading-relaxed"><span className="font-bold">You just proved: </span><Rich text={b.proved} /></p>
          <p className="label mt-3 inline-block border border-edge bg-paper px-2 py-1 normal-case tracking-normal"><Rich text={b.cue} /></p>
        </div>
      );
    case "later": {
      const at = laterAt(b.lesson, track);
      return (
        <div className="my-5 flex gap-3 border border-dashed border-edge bg-sunk p-4">
          <Clock3 className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
          <div>
            <p className="label text-ink">Coming later{at ? `: ${at}` : ""}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink"><span className="font-semibold">For now: </span><Rich text={b.text} /></p>
          </div>
        </div>
      );
    }
    case "upgrade":
      return (
        <div className="my-5 flex gap-3 border border-edge bg-[#eef6ff] p-4">
          <Rocket className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
          <div>
            <p className="label text-ink">Optional upgrade · once you&apos;re earning</p>
            <p className="mt-1 font-bold text-ink">{b.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink/90"><Rich text={b.text} /></p>
            <p className="mt-2 text-[13px] text-muted">You don&apos;t need this to finish the lesson or the track. The free way above is complete.</p>
          </div>
        </div>
      );
    case "errors":
      return (
        <div className="my-6 border border-edge">
          <p className="label flex items-center gap-1.5 border-b border-edge bg-[#ffe3dc] px-3 py-1.5 text-ink"><MonitorX className="size-3.5" aria-hidden /> If you see this on screen</p>
          <ul>
            {b.items.map((e, n) => (
              <li key={n} className={"px-3 py-3 " + (n ? "border-t border-line" : "")}>
                <p className="font-code text-[13px] font-semibold text-danger">{e.see}</p>
                <p className="mt-1 text-[14.5px] leading-snug text-ink"><span className="font-semibold">It means: </span><Rich text={e.means} /></p>
                <p className="mt-1 text-[14.5px] leading-snug text-ink"><span className="font-semibold">Do this: </span><Rich text={e.fix} /></p>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

/** "Day 9 · Online stores" in the learner's track, or the lesson's title when there's no track. */
function laterAt(lessonId: string, track?: Track) {
  const inTrack = track?.modules.find((m) => m.lesson === lessonId);
  if (inTrack) return `Day ${inTrack.day}, ${inTrack.title}`;
  const any = tracks.flatMap((t) => t.modules).find((m) => m.lesson === lessonId);
  return any?.title ?? "";
}

export function LessonBody({ lesson, track }: { lesson: Pick<Lesson, "id" | "sections">; track?: Track }) {
  // Number figures across the whole lesson so each picks a different background tone.
  const figureNo = new Map<LessonBlock, number>();
  lesson.sections.flatMap((s) => s.blocks).filter((b) => b.t === "figure").forEach((b, n) => figureNo.set(b, n));
  return (
    <>
      {lesson.sections.map((s, n) => (
        <section key={s.heading} id={`s${n + 1}`} className="scroll-mt-24 border-t border-dashed border-line pt-8 first:border-0 first:pt-0 [&+section]:mt-10">
          <h2 className="display text-[22px] text-ink sm:text-[30px]">{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} i={figureNo.get(b) ?? n * 100 + i} lessonId={lesson.id} track={track} />
          ))}
        </section>
      ))}
    </>
  );
}
