"use client";

import { Check, Dumbbell, Lightbulb, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Rich } from "./rich";

function useStored(key: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once after hydration
      setOn(localStorage.getItem(key) === "1");
    } catch {
      /* storage blocked: start unticked */
    }
  }, [key]);
  const set = (v: boolean) => {
    setOn(v);
    try {
      if (v) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  };
  return [on, set] as const;
}

/** "Try it now": a short real-life practice, ticked off in this browser. */
export function TryIt({ id, title, minutes, steps }: { id: string; title: string; minutes: number; steps: string[] }) {
  const [done, setDone] = useStored(`bwac:try:${id}`);
  return (
    <div className={"my-6 border border-edge p-4 transition-colors " + (done ? "bg-[#e3f5e9]" : "bg-[#eaf0ff]")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label flex items-center gap-1.5 text-ink">
          <Dumbbell className="size-4" aria-hidden /> Try it now · {minutes} min
        </p>
        {done && <span className="label bg-success px-1.5 py-0.5 text-paper">Practised ✓</span>}
      </div>
      <p className="display mt-2 text-[17px] sm:text-[19px] text-ink">{title}</p>
      <ol className="mt-2 space-y-1.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
            <span className="display w-4 shrink-0 text-brand-text">{i + 1}</span>
            <span><Rich text={s} /></span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setDone(!done)}
        className={"label mt-3 inline-flex items-center gap-1.5 border border-edge px-2.5 py-1.5 " + (done ? "bg-card text-ink" : "bg-ink text-paper")}
      >
        {done ? <><RotateCcw className="size-3.5" aria-hidden /> Mark as not done</> : <><Check className="size-3.5" strokeWidth={3} aria-hidden /> I did this</>}
      </button>
    </div>
  );
}

/** A quick self-check. Instant feedback; practice only, not graded. */
export function SelfCheck({ q, options, answer, why }: { q: string; options: string[]; answer: number; why: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const right = picked === answer;
  return (
    <div className="my-6 border border-dashed border-edge bg-card p-4">
      <p className="label flex items-center gap-1.5 text-brand-text">
        <Lightbulb className="size-4" aria-hidden /> Quick check · not graded
      </p>
      <p className="mt-2 font-bold leading-snug text-ink"><Rich text={q} /></p>
      <div className="mt-3 grid gap-2">
        {options.map((o, k) => {
          const state = picked === null ? "" : k === answer ? "border-success bg-[#e3f5e9]" : k === picked ? "border-danger bg-[#ffe3dc]" : "opacity-60";
          return (
            <button
              key={k}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(k)}
              className={"border border-line px-3 py-2 text-left text-[15px] leading-snug text-ink transition-colors enabled:hover:border-edge " + state}
            >
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div role="status" className={"mt-3 flex gap-2 text-[14px] leading-relaxed " + (right ? "text-success" : "text-danger")}>
          {right ? <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} /> : <X className="mt-0.5 size-4 shrink-0" strokeWidth={3} />}
          <p>
            <strong>{right ? "Yes! " : "Not quite. "}</strong>
            <span className="text-ink"><Rich text={why} /></span>{" "}
            {!right && (
              <button type="button" className="font-bold text-ink underline" onClick={() => setPicked(null)}>
                Try again
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
