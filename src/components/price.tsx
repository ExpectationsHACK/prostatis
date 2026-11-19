"use client";

import { useSyncExternalStore } from "react";
import { formatPrice, priceOf, type Currency } from "@/lib/pricing";
import { plans, type Plan } from "@/lib/site";

/*
 * Public pages are cached and shared by every visitor, so prices render in US dollars (what search
 * engines and most of the world see) and switch to naira for visitors in Nigeria once /api/geo
 * answers. The answer is remembered for a day. What a buyer is actually charged is decided again
 * on the server at checkout.
 */
const KEY = "stynark:currency";
const DAY = 86_400_000;
let current: Currency = "USD";
let started = false;
const listeners = new Set<() => void>();

function set(c: Currency) {
  if (c === current) return;
  current = c;
  listeners.forEach((l) => l());
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null") as { c: Currency; at: number } | null;
    if (saved && (saved.c === "NGN" || saved.c === "USD")) {
      set(saved.c);
      if (Date.now() - saved.at < DAY) return;
    }
  } catch {
    /* storage blocked: ask the server */
  }
  fetch("/api/geo")
    .then((r) => (r.ok ? r.json() : null))
    .then((d: { currency?: Currency } | null) => {
      if (d?.currency !== "NGN" && d?.currency !== "USD") return;
      set(d.currency);
      try {
        localStorage.setItem(KEY, JSON.stringify({ c: d.currency, at: Date.now() }));
      } catch {
        /* storage blocked */
      }
    })
    .catch(() => {});
}

function subscribe(l: () => void) {
  listeners.add(l);
  start();
  return () => listeners.delete(l);
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, () => current, () => "USD");
}

/** A plan's price in the visitor's currency; `min` gives the cheaper plan's price ("From $27"). */
export function Price({ plan, min = false }: { plan?: Plan["id"]; min?: boolean }) {
  const currency = useCurrency();
  const list = min || !plan ? plans : plans.filter((p) => p.id === plan);
  const amount = Math.min(...list.map((p) => priceOf(p, currency)));
  return <span className="tabular">{formatPrice(amount, currency)}</span>;
}
