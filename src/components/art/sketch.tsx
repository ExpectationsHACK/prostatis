import { Caveat } from "next/font/google";
import { Fragment, type ReactNode } from "react";
import type { Sketch, SketchNode } from "@/content/types";
import { glyphs } from "./sketch-glyphs";

// A handwriting face for the labels, loaded only where sketches appear.
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });

/** Shared "hand-drawn" filter: a little noise displaces every line so nothing looks ruler-straight. */
export function RoughFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <filter id="sk-rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

function Drawn({ node, size = "size-[70px] sm:size-[78px]" }: { node: SketchNode; size?: string }) {
  return (
    <span className={`relative inline-grid place-items-center ${size}`}>
      {node.hot && (
        <svg viewBox="0 0 100 100" className="absolute -inset-3 size-[calc(100%+1.5rem)]" aria-hidden>
          <ellipse cx="50" cy="52" rx="46" ry="40" fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" filter="url(#sk-rough)" transform="rotate(-7 50 50)" strokeDasharray="250 40" />
        </svg>
      )}
      <svg viewBox="0 0 64 64" className="relative size-full text-ink" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" filter="url(#sk-rough)">
          {glyphs[node.draw]}
        </g>
      </svg>
    </span>
  );
}

function Item({ node }: { node: SketchNode }) {
  return (
    <div className="flex w-[8.5rem] flex-col items-center text-center">
      <Drawn node={node} />
      <span className={"hand mt-1.5 text-[19px] font-bold leading-[1.05] " + (node.hot ? "text-brand-text" : "text-ink")}>{node.label}</span>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-0.5 py-1 sm:mt-6 sm:w-14 sm:py-0" aria-hidden>
      {label && <span className="hand max-w-[7rem] text-center text-[16px] font-bold leading-none text-brand-text">{label}</span>}
      {/* Phones stack the drawings, so the arrow points down; wider screens lay them out in a row. */}
      <svg viewBox="0 0 24 44" className="h-10 w-6 text-ink sm:hidden">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" filter="url(#sk-rough)">
          <path d="M12 4C7 16 16 26 12 38" />
          <path d="m5 31 7 8 7-8" />
        </g>
      </svg>
      <svg viewBox="0 0 60 24" className="hidden h-6 w-12 text-ink sm:block">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" filter="url(#sk-rough)">
          <path d="M4 14C18 8 34 18 52 12" />
          <path d="m44 5 9 7-9 7" />
        </g>
      </svg>
    </div>
  );
}

/** A box with a wobbly pencil outline; the text inside stays crisp. */
function RoughBox({ children, className = "", hot = false }: { children: ReactNode; className?: string; hot?: boolean }) {
  return (
    <div className={"relative " + className}>
      <span aria-hidden className={"absolute inset-0 rounded-[7px] border-2 [filter:url(#sk-rough)] " + (hot ? "border-brand bg-brand-wash" : "border-ink bg-white/70")} />
      <span className="relative">{children}</span>
    </div>
  );
}

function describe(s: Sketch) {
  if (s.layout === "flow") return s.nodes.map((n) => n.label).join(" → ") + (s.loop ? ` (${s.loop})` : "");
  if (s.layout === "stack") return `A ${s.frame} screen with: ${s.rows.join(", ")}`;
  return `${s.left.title}: ${s.left.nodes.map((n) => n.label).join(", ")}. ${s.right.title}: ${s.right.nodes.map((n) => n.label).join(", ")}`;
}

function Drawing({ s }: { s: Sketch }) {
  if (s.layout === "flow") {
    return (
      <div>
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
          {s.nodes.map((n, i) => (
            <Fragment key={i}>
              <Item node={n} />
              {i < s.nodes.length - 1 && <Arrow label={s.arrows?.[i]} />}
            </Fragment>
          ))}
        </div>
        {s.loop && (
          <p className="hand mt-3 flex items-center justify-center gap-2 text-[17px] font-bold text-brand-text">
            <svg viewBox="0 0 40 24" className="h-6 w-10 text-brand" aria-hidden>
              <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" filter="url(#sk-rough)">
                <path d="M34 6c4 10-4 16-14 16S4 16 6 8" />
                <path d="m2 12 4-5 5 4" />
              </g>
            </svg>
            {s.loop}
          </p>
        )}
      </div>
    );
  }
  if (s.layout === "stack") {
    const phone = s.frame === "phone";
    return (
      <div className="flex justify-center">
        <div className={phone ? "w-[220px]" : "w-full max-w-[340px]"}>
          <RoughBox className={phone ? "rounded-[24px] px-3 pb-5 pt-6" : "px-3 pb-4 pt-5"}>
            <span className="flex flex-col gap-2">
              {s.rows.map((r, i) => (
                <RoughBox key={i} hot={s.hot === i} className={"px-2.5 text-center " + (i === 0 ? "py-4" : "py-2")}>
                  <span className={"hand text-[18px] font-bold leading-tight " + (s.hot === i ? "text-brand-text" : "text-ink")}>{r}</span>
                </RoughBox>
              ))}
            </span>
          </RoughBox>
          {!phone && <div className="mx-[-14px] mt-1 h-3 rounded-b-[8px] border-2 border-t-0 border-ink [filter:url(#sk-rough)]" aria-hidden />}
        </div>
      </div>
    );
  }
  const side = (p: { title: string; nodes: SketchNode[] }) => (
    <div className="flex flex-1 flex-col items-center">
      <p className="hand text-[22px] font-bold text-ink underline decoration-brand decoration-wavy decoration-2 underline-offset-4">{p.title}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-x-1 gap-y-3">
        {p.nodes.map((n, i) => (
          <Item key={i} node={n} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      {side(s.left)}
      <span className="hand self-center text-[28px] font-bold text-brand-text" aria-hidden>
        vs
      </span>
      {side(s.right)}
    </div>
  );
}

/** A lesson sketch: everyday things, drawn by hand on exercise-book paper, labelled with the new idea. */
export function SketchView({ sketch, caption }: { sketch: Sketch; caption: string }) {
  return (
    <figure className={`${hand.variable} my-7`}>
      <RoughFilter />
      <div className="sketch-paper ink-block overflow-hidden px-4 py-6 sm:px-8" role="img" aria-label={`Sketch: ${describe(sketch)}`}>
        <Drawing s={sketch} />
      </div>
      <figcaption className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
        <span className="label mr-2 text-brand-text">Sketch</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** A single drawn object, for badges and callouts. */
export function SketchIcon({ draw, className = "size-12" }: { draw: SketchNode["draw"]; className?: string }) {
  return (
    <span className={hand.variable}>
      <RoughFilter />
      <Drawn node={{ draw, label: "" }} size={className} />
    </span>
  );
}
