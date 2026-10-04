"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export type LiveRate = { rate: number; updated: string; source: string; sourceUrl: string };

const KEY = "prostatis:fx";
let pending: Promise<LiveRate | null> | null = null;

/** Fetch today's USD→NGN rate once per browser session (it changes daily, not by the minute). */
function load(): Promise<LiveRate | null> {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return Promise.resolve(JSON.parse(saved) as LiveRate);
  } catch {
    /* storage blocked: fetch instead */
  }
  pending ??= fetch("/api/tools/fx")
    .then((r) => (r.ok ? r.json() : null))
    .then((j: LiveRate | null) => {
      if (j && j.rate > 0) {
        try {
          sessionStorage.setItem(KEY, JSON.stringify(j));
        } catch {
          /* ignore */
        }
        return j;
      }
      return null;
    })
    .catch(() => null);
  return pending;
}

export function useLiveRate() {
  const [rate, setRate] = useState<LiveRate | null>(null);
  useEffect(() => {
    let live = true;
    load().then((r) => live && setRate(r));
    return () => {
      live = false;
    };
  }, []);
  return rate;
}

const day = (x: string) => {
  const d = new Date(x);
  return Number.isNaN(d.getTime()) ? "today" : d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
};

/** Under a "₦ per $1" box: today's market rate, one tap to use it, and an honest note about card rates. */
export function RateHint({ current, onUse }: { current: number; onUse: (rate: number) => void }) {
  const live = useLiveRate();
  if (!live) return null;
  const r = Math.round(live.rate);
  const same = Math.abs(current - r) < 1;
  return (
    <p className="mt-1.5 text-[12px] leading-snug text-muted">
      Market rate {day(live.updated)}: <strong className="text-ink">₦{r.toLocaleString("en-NG")}</strong> per $1 (
      <a href={live.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
        {live.source}
      </a>
      ).{" "}
      {!same && (
        <button type="button" onClick={() => onUse(r)} className="inline-flex items-center gap-1 font-semibold text-brand-text underline">
          <RefreshCw className="size-3" aria-hidden /> Use it
        </button>
      )}{" "}
      Naira cards and dollar accounts usually charge a few percent more, so use your bank's rate if you know it.
    </p>
  );
}
