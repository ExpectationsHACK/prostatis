// The site's public address. Trailing slashes are trimmed ("https://x.com/" + "/blog" would give
// "//blog"), and a retired Netlify address left in the environment is replaced by the live
// domain, so share images, the sitemap and canonical links never point at a dead host.
function siteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").trim().replace(/\/+$/, "");
  return /\/\/(prostatis|stynark)\.netlify\.app$/.test(raw) ? "https://stynark.com" : raw;
}

export const site = {
  /** The product. */
  name: "Stynark",
  /** The company that owns and runs it. */
  company: "Stynark",
  /** How the two appear together (footer, emails, certificates, legal pages). */
  byline: "Stynark",
  url: siteUrl(),
  tagline: "Learn to build websites with AI and turn it into a source of income.",
  subhead:
    "Build business websites, online stores, landing pages, booking systems, web apps and your portfolio, then learn exactly what to charge and how to land paying clients. Learn at your own pace, no coding background needed.",
  description:
    "Learn to build websites with AI and sell them to businesses. The 14-lesson Fast Track takes you from beginner to your first website; the 26-lesson Main Track adds SEO, automation and AI agents. Pay once in naira, keep lifetime access, with 50 free tools.",
  /** Public support address, shown on the legal pages. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

/**
 * Two one-time programmes, self-paced, with lifetime access: a payment never expires, so nothing
 * here is measured in days. Prices are in naira; lesson counts come from the curriculum.
 */
export const plans = [
  {
    id: "fast_track",
    name: "Fast Track",
    priceNgn: 23500,
    formerPricesNgn: [15000],
    period: "14 lessons",
    highlight: true,
    blurb: "Build websites with AI and pitch your first paying clients, one lesson at a time.",
    covers: "Web design · Web development · Web solutions · SEO basics · Shipping",
    results: [
      "Your first page live by the third lesson and a full, mobile-first business website by the fourth, built with free tools",
      "Landing pages, online stores, booking systems and web apps with logins and databases",
      "A brand kit and design process you can reuse for every client",
      "SEO basics that get a site found: keywords, titles, meta tags and a sitemap",
      "Your own portfolio website that shows clients what you can do",
      "Your website package, your price list and a proposal, plus 10 pitches sent to real businesses",
      "The handover and get-paid steps to deliver a project and collect every naira",
      "A verified certificate when you pass the final assessment: download it, get it by email, share a public proof link",
      "WhatsApp community access",
    ],
  },
  {
    id: "main_track",
    name: "Main Track",
    priceNgn: 46500,
    formerPricesNgn: [30000],
    period: "26 lessons",
    highlight: false,
    blurb: "Everything in the Fast Track, plus the skills businesses pay for, such as AI automation and AI agents.",
    covers: "Everything: design · development · web solutions · SEO · automation · lead gen · AI agents",
    results: [
      "Everything in the Fast Track",
      "Full SEO: keyword research, on-page, local SEO and content that ranks on Google",
      "Automations on Make's free plan that save a business hours every week",
      "AI agents: website chatbots and WhatsApp bots that answer customers 24/7, with a human handoff",
      "A lead-generation system: prospect lists, outreach and follow-ups that keep clients coming",
      "Proposals and pricing for the full package, including monthly retainers",
      "A complete client project: website, SEO, automation and an AI agent, delivered and paid",
      "A verified certificate when you pass the final assessment: download it, get it by email, share a public proof link",
      "Weekly build reviews and the WhatsApp community",
    ],
  },
] as const;

export type Plan = (typeof plans)[number];

/** Refund terms, shown on the refund policy and billing pages. Owner to confirm before launch. */
export const refund = { days: 7, maxLessons: 3 } as const;

export function formatNgn(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export function formatUsd(n: number, digits = 2) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
  );
}

/**
 * Prices changed on 2026-11-18. A Paystack checkout opened before then was created at the old
 * price, so one paid a little later is still valid at that amount. New checkouts are always
 * created on the server at the current price, so the old amount can't be started again.
 */
export const PRICES_CHANGED_AT = "2026-11-18T23:59:59Z";

/** Amounts (in kobo) a payment for this plan may be, given when its checkout was opened. */
export function acceptedAmountsKobo(plan: Plan, openedAt?: string | null): number[] {
  const opened = openedAt ? Date.parse(openedAt) : NaN;
  const former = opened < Date.parse(PRICES_CHANGED_AT) ? plan.formerPricesNgn.map((n) => n * 100) : [];
  return [plan.priceNgn * 100, ...former];
}
