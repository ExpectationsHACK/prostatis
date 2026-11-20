"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { fmtMoney } from "@/lib/money";

export type LiveRates = { rates: Record<string, number>; updated: string; source: string; sourceUrl: string };

const KEY = "stynark:fx-rates";
let pending: Promise<LiveRates | null> | null = null;

/** Fetch today's US-dollar rates once per browser session (they change daily, not by the minute). */
function load(): Promise<LiveRates | null> {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return Promise.resolve(JSON.parse(saved) as LiveRates);
  } catch {
    /* storage blocked: fetch instead */
  }
  pending ??= fetch("/api/tools/fx")
    .then((r) => (r.ok ? r.json() : null))
    .then((j: LiveRates | null) => {
      if (j && j.rates && Object.keys(j.rates).length) {
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

export function useLiveRates() {
  const [rates, setRates] = useState<LiveRates | null>(null);
  useEffect(() => {
    let live = true;
    load().then((r) => live && setRates(r));
    return () => {
      live = false;
    };
  }, []);
  return rates;
}

/** Today's market rate for one currency (units per $1), or null while loading / unavailable. */
export function useLiveRate(currency: string) {
  const live = useLiveRates();
  const rate = live?.rates[currency];
  return live && rate ? { rate, updated: live.updated, source: live.source, sourceUrl: live.sourceUrl } : null;
}

/** A rate as typed into the tool's field: whole units for big numbers (₦1,523), two decimals for small (€0.92). */
export const rateText = (r: number) => String(r >= 20 ? Math.round(r) : r);

const day = (x: string) => {
  const d = new Date(x);
  return Number.isNaN(d.getTime()) ? "today" : d.toLocaleDateString("en", { day: "numeric", month: "short" });
};

/** Under an "amount per $1" box: today's market rate, one tap to use it, and an honest note about card rates. */
export function RateHint({ currency, current, onUse }: { currency: string; current: number; onUse: (rate: number) => void }) {
  const live = useLiveRate(currency);
  if (!live || currency === "USD") return null;
  const r = live.rate >= 20 ? Math.round(live.rate) : live.rate;
  const same = Math.abs(current - r) < (r >= 20 ? 1 : 0.01);
  return (
    <p className="mt-1.5 text-[12px] leading-snug text-muted">
      Market rate {day(live.updated)}: <strong className="text-ink">{fmtMoney(r, currency, r >= 20 ? 0 : 2)}</strong> per $1 (
      <a href={live.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
        {live.source}
      </a>
      ).{" "}
      {!same && (
        <button type="button" onClick={() => onUse(r)} className="inline-flex items-center gap-1 font-semibold text-brand-text underline">
          <RefreshCw className="size-3" aria-hidden /> Use it
        </button>
      )}{" "}
      Cards and payout services usually charge a few percent more, so use your bank&apos;s rate if you know it.
    </p>
  );
}
