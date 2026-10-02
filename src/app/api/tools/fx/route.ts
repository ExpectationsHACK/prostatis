/**
 * Today's US dollar to naira rate for the money tools. Free source (ExchangeRate-API's open
 * endpoint, updated daily, attribution required); cached so we ask at most every 6 hours.
 */

let cache: { at: number; data: { rate: number; updated: string } } | null = null;
const TTL = 6 * 3600_000;

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL) {
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/USD", { signal: AbortSignal.timeout(8000) });
      const j = await r.json();
      const rate = Number(j?.rates?.NGN);
      if (j?.result !== "success" || !(rate > 0)) throw new Error("no NGN rate");
      cache = { at: Date.now(), data: { rate: Math.round(rate * 100) / 100, updated: String(j.time_last_update_utc ?? "") } };
    } catch {
      if (!cache) return Response.json({ error: "Couldn't fetch today's rate." }, { status: 503 });
    }
  }
  return Response.json(
    { ...cache.data, source: "ExchangeRate-API", sourceUrl: "https://www.exchangerate-api.com" },
    { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } },
  );
}
