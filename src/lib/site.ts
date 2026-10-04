export const site = {
  /** The product. */
  name: "Prostatis",
  /** The company that owns and runs it. */
  company: "Stynark",
  /** How the two appear together (footer, emails, certificates, legal pages). */
  byline: "Prostatis by Stynark",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Learn to build websites with AI and turn it into a source of income.",
  subhead:
    "Build business websites, online stores and booking systems with AI in 14 days, then learn exactly what to charge and how to land paying clients. No coding background needed.",
  description:
    "Learn to build websites with AI and sell them to businesses. The 14-day Fast Track takes you from zero to your first paid website; the one-month Main Track adds SEO, automation and AI agents. Paid once in naira, with 50 free tools.",
  whatsappInviteUrl: process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL ?? "",
  /** Public support address, shown on the legal pages. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

/**
 * Two one-time programmes. `accessDays` = how long the dashboard stays unlocked after paying
 * (programme length plus time to catch up). Prices are in naira.
 */
export const plans = [
  {
    id: "fast_track",
    name: "Fast Track",
    priceNgn: 15000,
    period: "14 days",
    accessDays: 30,
    highlight: true,
    blurb: "Build websites with AI and pitch your first paying clients in two weeks.",
    covers: "Web design · Web development · Web solutions · SEO basics · Shipping",
    results: [
      "Your first page live on Day 3 and a full, mobile-first business website on Day 4, built with free tools",
      "Landing pages, online stores, booking systems and web apps with logins and databases",
      "A brand kit and design process you can reuse for every client",
      "SEO basics that get a site found: keywords, titles, meta tags and a sitemap",
      "Your own portfolio website that shows clients what you can do",
      "Your website package, your price list and a proposal, plus 10 pitches sent to real businesses",
      "The handover and get-paid steps to deliver a project and collect every naira",
      "A verified certificate when you pass the final assessment: download it, get it by email, share a public proof link",
      "WhatsApp community access during the track",
    ],
  },
  {
    id: "main_track",
    name: "Main Track",
    priceNgn: 30000,
    period: "1 month",
    accessDays: 60,
    highlight: false,
    blurb: "Everything in the Fast Track, plus the services businesses pay for every month.",
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
