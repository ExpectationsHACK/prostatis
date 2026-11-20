/**
 * Today's US-dollar exchange rates for the money tools (how much of each currency buys $1). Free
 * source (ExchangeRate-API's open endpoint, updated daily, attribution required); cached so we ask
 * at most every 6 hours.
 */
import { currencies } from "@/lib/money";

let cache: { at: number; data: { rates: Record<string, number>; updated: string } } | null = null;
const TTL = 6 * 3600_000;

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL) {
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/USD", { signal: AbortSignal.timeout(8000) });
      const j = await r.json();
      if (j?.result !== "success") throw new Error("no rates");
      // Only the currencies the tools offer, rounded for display.
      const rates: Record<string, number> = {};
      for (const { value } of currencies) {
        const v = Number(j?.rates?.[value]);
        if (v > 0) rates[value] = Math.round(v * 100) / 100;
      }
      cache = { at: Date.now(), data: { rates, updated: String(j.time_last_update_utc ?? "") } };
    } catch {
      if (!cache) return Response.json({ error: "Couldn't fetch today's rates." }, { status: 503 });
    }
  }
  return Response.json(
    { ...cache.data, source: "ExchangeRate-API", sourceUrl: "https://www.exchangerate-api.com" },
    { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } },
  );
}
