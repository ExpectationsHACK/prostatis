import type { CSSProperties, ReactNode } from "react";

/**
 * Drawing and motion kit for the thumbnails (tool, product and lesson art).
 * Everything is sized for the fixed 320×200 Artboard. Motion classes come from the
 * "Thumbnail motion kit" in globals.css: they loop on the Stage's duration (--d) and each
 * element starts at its own --at, so every thumbnail tells its own short story.
 */

export type Motion = "in" | "pop" | "left" | "right" | "type" | "grow-y" | "grow-x" | "press" | "glow" | "mark" | "cursor" | "stamp" | "needle" | "draw" | "scroll-y" | "scroll-x" | "swap-a" | "swap-b" | "shake" | "scan" | "fill";
export type Loop = "blink" | "pulse" | "float" | "spin";

/** Class names for a timed motion (or several on one element). */
export const m = (...names: Motion[]) => `art-anim ak ${names.map((n) => `ak-${n}`).join(" ")}`;
/** Class names for a continuous loop (blinking caret, pulse ring, float, spinner). */
export const loop = (name: Loop) => `art-anim ak-${name}`;
/** Style for an element's start time (seconds into the loop) plus any motion variables. */
export const at = (s: number, vars: Record<string, string | number> = {}) => ({ "--at": `${s}s`, ...Object.fromEntries(Object.entries(vars).map(([k, v]) => [`--${k}`, v])) }) as CSSProperties;

export const t = {
  xs: "text-[7px] leading-tight",
  sm: "text-[8.5px] leading-tight",
  md: "text-[10px] leading-tight",
  h: "text-[12px] font-bold leading-tight tracking-[-0.01em]",
  code: "font-code text-[9px] leading-snug",
};

/** The thumbnail canvas. `d` is the loop length for this thumbnail. */
export function Stage({ children, d = 8, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center p-4 ${className}`} style={{ "--d": `${d}s` } as CSSProperties}>
      {children}
    </div>
  );
}

/** A clean app window: traffic lights and a title pill. */
export function Win({ title, children, dark = false, className = "", bodyClass = "p-2.5" }: { title?: string; children: ReactNode; dark?: boolean; className?: string; bodyClass?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] border shadow-[0_12px_26px_-14px_rgba(21,21,21,0.35)] ${dark ? "border-[#2c2c2c] bg-[#161616]" : "border-[#e4e0d8] bg-white"} ${className}`}>
      <div className={`flex h-[16px] items-center gap-[3px] border-b px-2 ${dark ? "border-[#262626] bg-[#1f1f1f]" : "border-[#efece6] bg-[#f7f5f1]"}`}>
        <span className="size-[5px] rounded-full bg-[#ff5f57]" />
        <span className="size-[5px] rounded-full bg-[#febc2e]" />
        <span className="size-[5px] rounded-full bg-[#28c840]" />
        {title && <span className={`mx-auto truncate pr-4 ${t.xs} ${dark ? "text-white/50" : "text-[#8a857b]"}`}>{title}</span>}
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  );
}

/** A plain white card. */
export function Box({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`rounded-[8px] border border-[#e4e0d8] shadow-[0_8px_20px_-14px_rgba(21,21,21,0.35)] ${/(^|\s)bg-/.test(className) ? "" : "bg-white"} ${className}`} style={style}>
      {children}
    </div>
  );
}

/** A phone with a dark bezel. */
export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col rounded-[16px] bg-[#1b1b1b] p-[3px] shadow-[0_14px_28px_-14px_rgba(21,21,21,0.5)] ${className}`}>
      <div className="relative flex-1 overflow-hidden rounded-[13px] bg-white">
        <span className="absolute left-1/2 top-1 z-10 h-[4px] w-7 -translate-x-1/2 rounded-full bg-[#1b1b1b]" />
        {children}
      </div>
    </div>
  );
}

/** A skeleton line standing in for text. */
export const Line = ({ w = "100%", c = "bg-[#ece8e1]", h = "h-[4px]", className = "" }: { w?: string; c?: string; h?: string; className?: string }) => (
  <span className={`block rounded-full ${h} ${c} ${className}`} style={{ width: w }} />
);

/** A mouse pointer. Place it at its start, give it m("cursor") and at(s, { tx, ty }). */
export function Cursor({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 12 16" width="11" height="15" className={"pointer-events-none absolute z-30 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] " + className} style={style} aria-hidden>
      <path d="M1 1l9.5 9.2H5.8L8 15l-2 .8-2.3-4.9L1 13.4z" fill="#151515" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

/** A check mark or cross in a small circle. */
export function Tick({ ok = true, className = "", style }: { ok?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <span className={`grid size-[11px] shrink-0 place-items-center rounded-full text-white ${ok ? "bg-[#16794a]" : "bg-[#d0392b]"} ${className}`} style={style}>
      <svg viewBox="0 0 12 12" className="size-[7px]" aria-hidden>
        {ok ? <path d="M2.5 6.2l2.2 2.2 4.8-4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
      </svg>
    </span>
  );
}

/** Five small stars. */
export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-[1px] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 10 10" className="size-[7px]" aria-hidden>
          <path d="M5 .6l1.3 2.8 3 .3-2.3 2 .7 3L5 7.2 2.3 8.7l.7-3-2.3-2 3-.3z" fill="#f5a623" />
        </svg>
      ))}
    </span>
  );
}
