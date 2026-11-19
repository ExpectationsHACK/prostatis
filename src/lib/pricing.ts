import type { Plan } from "@/lib/site";

/**
 * Global pricing: visitors in Nigeria pay in naira; everyone else (and anyone whose country we
 * can't tell) pays in US dollars. The server decides the currency from the request's country at
 * checkout, never from anything the browser sends, and verifies every payment in the currency it
 * was charged in. Paystack amounts are in the currency's subunit (kobo or cents).
 */
export type Currency = "NGN" | "USD";

export const currencyForCountry = (country?: string | null): Currency => (country?.toUpperCase() === "NG" ? "NGN" : "USD");

export function priceOf(plan: Plan, currency: Currency): number {
  return currency === "NGN" ? plan.priceNgn : plan.priceUsd;
}

export function formatPrice(amount: number, currency: Currency): string {
  return currency === "NGN" ? "₦" + Math.round(amount).toLocaleString("en-NG") : "$" + amount.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export const priceLabel = (plan: Plan, currency: Currency) => formatPrice(priceOf(plan, currency), currency);

/**
 * Naira prices changed on 2026-11-18. A Paystack checkout opened before then was created at the
 * old price, so one paid a little later is still valid at that amount. New checkouts are always
 * created on the server at the current price, so the old amount can't be started again.
 */
export const PRICES_CHANGED_AT = "2026-11-18T23:59:59Z";

/** Amounts (in the currency's subunit) a payment for this plan may be, given when its checkout was opened. */
export function acceptedAmounts(plan: Plan, currency: string, openedAt?: string | null): number[] {
  if (currency === "USD") return [plan.priceUsd * 100];
  if (currency !== "NGN") return [];
  const opened = openedAt ? Date.parse(openedAt) : NaN;
  const former = opened < Date.parse(PRICES_CHANGED_AT) ? plan.formerPricesNgn.map((n) => n * 100) : [];
  return [plan.priceNgn * 100, ...former];
}
