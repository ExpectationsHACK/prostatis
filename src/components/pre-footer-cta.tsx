"use client";

import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Scattered paper squares: position, size, rotation, and how long each takes to drift.
const bits = [
  { l: "5%", t: "12%", s: 16, r: 18, d: 9, c: "bg-ink/20" },
  { l: "90%", t: "9%", s: 18, r: -12, d: 11, c: "bg-ink/20" },
  { l: "84%", t: "26%", s: 12, r: 30, d: 8, c: "bg-ink/25" },
  { l: "9%", t: "38%", s: 12, r: 8, d: 10, c: "bg-paper/50" },
  { l: "3%", t: "60%", s: 10, r: 45, d: 12, c: "bg-ink/30" },
  { l: "91%", t: "48%", s: 20, r: -20, d: 9, c: "bg-paper/45" },
  { l: "86%", t: "72%", s: 10, r: 40, d: 13, c: "bg-paper/50" },
  { l: "30%", t: "93%", s: 14, r: 12, d: 10, c: "bg-ink/20" },
  { l: "6%", t: "84%", s: 18, r: -8, d: 11, c: "bg-paper/40" },
  { l: "66%", t: "94%", s: 12, r: 25, d: 9, c: "bg-ink/25" },
];

// Pages where a "join" push would be out of place.
const HIDDEN = ["/checkout", "/login", "/signup", "/welcome", "/auth"];

/** The last push before the footer: one big promise, one button, and the honest small print. */
export function PreFooterCta({ from }: { from: string }) {
  const path = usePathname();
  if (HIDDEN.some((p) => path === p || path.startsWith(p + "/"))) return null;
  return (
    <section className="field-grid relative isolate overflow-hidden border-t-2 border-edge bg-brand px-4 py-20 text-center sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {bits.map((b, i) => (
          <span
            key={i}
            className={`float-bit absolute border-2 border-edge/40 ${b.c}`}
            style={{ left: b.l, top: b.t, width: b.s, height: b.s, ["--r" as string]: `${b.r}deg`, animationDuration: `${b.d}s` }}
          />
        ))}
      </div>
      <h2 className="display mx-auto max-w-4xl text-balance text-[44px] uppercase leading-[0.95] text-paper [text-shadow:3px_3px_0_var(--edge)] sm:text-[80px]">
        Learn. Build. Get paid.
      </h2>
      <p className="mx-auto mt-6 max-w-md font-mono text-[14px] font-bold uppercase leading-relaxed tracking-[0.08em] text-ink">
        The Nigeria-first school for building websites with AI.
      </p>
      <Link
        href="/pricing"
        className="block-press mx-auto mt-9 flex w-full max-w-md items-center justify-center gap-3 border-2 border-edge bg-[#f2c230] px-6 py-5 font-mono text-[15px] font-bold uppercase tracking-[0.06em] text-ink shadow-[6px_6px_0_var(--edge)] sm:text-[16px]"
      >
        Enroll Now · from {from} <ArrowRight className="size-5 shrink-0" aria-hidden />
      </Link>
      <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-paper">
        <li className="flex items-center gap-1.5">
          <Check className="size-4" strokeWidth={3} aria-hidden /> First site live in week 1
        </li>
        <li className="flex items-center gap-1.5">
          <Check className="size-4" strokeWidth={3} aria-hidden /> Pay once, in naira
        </li>
      </ul>
      <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink/70">
        <X className="size-4" strokeWidth={3} aria-hidden /> <span className="line-through decoration-2">Dollar-priced bootcamps</span>
      </p>
    </section>
  );
}
