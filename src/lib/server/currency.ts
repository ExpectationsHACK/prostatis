import "server-only";
import { headers } from "next/headers";
import { geoFrom } from "@/lib/analytics-shared";
import { currencyForCountry, type Currency } from "@/lib/pricing";

/** The visitor's country. Cloudflare sits in front of the site, so its header is the most reliable. */
export function countryFrom(h: Headers): string | null {
  const cf = h.get("cf-ipcountry")?.toUpperCase();
  if (cf && /^[A-Z]{2}$/.test(cf) && cf !== "XX" && cf !== "T1") return cf;
  return geoFrom(h).country;
}

/** The currency this request should see and be charged in (from its country, server-side). */
export async function visitorCurrency(): Promise<Currency> {
  return currencyForCountry(countryFrom(await headers()));
}
