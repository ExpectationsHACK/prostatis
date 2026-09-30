export const site = {
  name: "STEINARK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Learn to build websites with AI and turn it into a source of income.",
  subhead:
    "Build websites, rank them on Google, add automation and AI agents, and sell it all to businesses as one package. No coding background required.",
  description:
    "A Nigeria-first school for building and selling websites with AI: a 14-day Fast Track for websites, landing pages, stores and web apps, a one-month Main Track that adds full SEO, automation, lead generation and AI agents, and 50 free tools, no signup required.",
  whatsappInviteUrl: process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL ?? "",
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
    highlight: false,
    blurb: "Design, build and ship websites, landing pages, stores and web apps, your first paid project in two weeks.",
    covers: "Web design · Web development · Web solutions · SEO basics · Shipping",
    results: [
      "A brand kit and design direction you can reuse for clients",
      "A live, mobile-first business website on your own domain",
      "Online stores, landing pages, booking systems and web apps with logins and databases",
      "SEO basics done right: keywords, titles, meta tags and a sitemap on Google",
      "Your own portfolio website to win clients",
      "A client-ready website package, proposal, price, and your first pitches sent",
      "Your first website shipped and paid for",
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
    highlight: true,
    blurb: "The complete skill set: build, rank, automate, sell, as one offer.",
    covers: "Everything: design · development · web solutions · SEO · automation · lead gen · AI agents",
    results: [
      "Everything in the Fast Track",
      "Landing pages, online stores, booking systems and web apps with logins and databases",
      "Full SEO: keyword strategy, on-page, local SEO and content that ranks",
      "Business automations with Make, Zapier or n8n that save clients hours",
      "AI agents: chatbots, WhatsApp bots and customer-service agents with human handoff",
      "A lead-generation system: prospect lists, scraping, outreach and follow-ups",
      "Proposals, pricing and packaging for the full “AI Business Growth” offer",
      "A complete client project: website + SEO + automation + agent, shipped and paid",
      "A verified certificate when you pass the final assessment: download it, get it by email, share a public proof link",
      "Weekly build reviews and the WhatsApp community",
    ],
  },
] as const;

export type Plan = (typeof plans)[number];

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
