import { renderLandingCheck, renderScrape, type PageData, type ScrapeData } from "./live";
import { lines, n, opts, or, s, type Block, type ToolDef, type Values } from "./types";

// ---------- Lead Magnet Idea Generator ----------
const leadMagnet: ToolDef = {
  kind: "generator",
  intro: "Tell us what you sell and to whom. You get lead magnets that attract buyers (not freebie hunters), how much work each takes, and a recipe for the best one.",
  examples: [
    { label: "Websites for restaurants", values: { service: "websites + SEO for restaurants", audience: "restaurant owners in Lagos", pain: "not enough orders outside weekends" } },
    { label: "Booking systems for salons", values: { service: "booking websites for salons", audience: "salon owners in Abuja", pain: "no-shows and endless 'are you free?' messages" } },
    { label: "Automation for shops", values: { service: "WhatsApp and order automation", audience: "online sellers on Instagram", pain: "hours lost answering the same questions" } },
  ],
  fields: [
    { key: "service", label: "What you sell", type: "text", default: "websites + SEO for restaurants" },
    { key: "audience", label: "Ideal client", type: "text", default: "restaurant owners in Lagos" },
    { key: "pain", label: "Their biggest pain", type: "text", default: "not enough orders outside weekends" },
  ],
  generate(v) {
    const sv = or(s(v, "service"), "your service"), a = or(s(v, "audience"), "clients"), p = or(s(v, "pain"), "their main problem");
    const rows = [
      ["Free audit", `Free 5-point website & Google check for ${a}`, "Personal: shows them the exact gap you fix", "High", "30–45 min each"],
      ["Checklist", `A 15-point checklist to fix ${p}`, "Quick to read, easy to share", "Medium", "2 hours once"],
      ["Calculator", `How much is “${p}” costing you? (calculator)`, "Makes the cost of doing nothing obvious", "High", "Half a day once"],
      ["Templates", `Ready-made templates for ${a} (price list, WhatsApp replies)`, "Instant, practical value", "Medium", "2–3 hours once"],
      ["Case study", `Case study: how we fixed ${p} for a real client`, "Proof: only once you have a real result", "High", "1 hour per project"],
      ["Mini-course", `3-day WhatsApp mini-course: fix ${p}`, "Builds trust over several days", "Medium", "Half a day once"],
      ["Examples file", `20 real examples of ${sv} that work`, "Inspiration they'll bookmark", "Low", "2 hours once"],
    ];
    return [
      { type: "table", title: "Lead magnet ideas", columns: ["Type", "Title", "Why it works", "Buyer intent", "Your effort"], rows },
      {
        type: "list",
        title: "Recipe: the free audit in under an hour",
        items: [
          "Run their site through the Website Speed Checklist and the On-Page SEO Audit.",
          "Check their Google Business Profile with the Local SEO Checklist.",
          "Write 5 findings in plain English: what's wrong, why it costs them customers, the fix.",
          "Add 2 screenshots, save it as a PDF, and end with “Want me to fix these for you?”",
        ],
      },
      { type: "notice", tone: "info", text: "Start with the free audit: it's the fastest path from stranger to sales call. Offer it in every outreach message." },
    ];
  },
};

// ---------- Prospect List Builder Prompt ----------
const prospectList: ToolDef = {
  kind: "generator",
  intro: "Describe your ideal client. You get ready searches for Google and Google Maps, a research prompt and the sheet to track everything.",
  examples: [
    { label: "Dental clinics, Lagos", values: { niche: "dental clinic", city: "Lagos", signal: "No website or outdated site", count: 100 } },
    { label: "Salons, Abuja", values: { niche: "hair salon", city: "Abuja", signal: "Active on Instagram, no website", count: 100 } },
    { label: "Restaurants, PH", values: { niche: "restaurant", city: "Port Harcourt", signal: "Few Google reviews", count: 50 } },
  ],
  fields: [
    { key: "niche", label: "Business type", type: "text", default: "dental clinic" },
    { key: "city", label: "City / area", type: "text", default: "Lagos" },
    { key: "signal", label: "Buying signal to look for", type: "select", default: "No website or outdated site", options: opts("No website or outdated site", "Few Google reviews", "Not on Google Maps", "Running ads but weak landing page", "Active on Instagram, no website", "Hiring (growing)") },
    { key: "count", label: "How many prospects", type: "number", default: 100, min: 10, max: 1000 },
  ],
  generate(v) {
    const niche = or(s(v, "niche"), "business"), city = or(s(v, "city"), "your city"), sig = s(v, "signal");
    const searches = [
      `${niche} in ${city}  (Google Maps: sort through results, note those without a website link)`,
      `"${niche}" "${city}" site:instagram.com`,
      `"${niche}" "${city}" -site:facebook.com -site:instagram.com`,
      `"${niche}" "${city}" "contact us" "gmail.com"`,
      `${niche} ${city} site:vconnect.com OR site:businesslist.com.ng`,
    ];
    const prompt = `I'm building a prospect list of ${n(v, "count")} ${niche}s in ${city} to offer websites, SEO and automation.
Buying signal: ${sig}.
For each business I paste, extract: name, area, phone, website (or "none"), Instagram, Google rating + review count, and one specific observation about their online presence I can mention in outreach.
Score each 1–5 on how strongly they show the buying signal. Return a table I can paste into Google Sheets.`;
    return [
      { type: "list", title: "Search strings", items: searches },
      { type: "text", title: "Open Google Maps for this search", text: `https://www.google.com/maps/search/${encodeURIComponent(`${niche} in ${city}`)}` },
      { type: "notice", tone: "warn", text: "Collect from Google Maps by hand, scraping Maps breaks Google's terms. 10–20 businesses a session is plenty." },
      { type: "text", title: "Research prompt", text: prompt },
      { type: "table", title: "Sheet columns", columns: ["Column", "Example"], rows: [["Business", "SmileCare Dental"], ["Area", "Lekki Phase 1"], ["Phone / WhatsApp", "+234…"], ["Website", "none"], ["Instagram", "@smilecare"], ["Google rating", "4.2 (11)"], ["Observation", "No online booking; 11 reviews"], ["Score (1–5)", "5"], ["Status", "Not contacted"]] },
      { type: "notice", tone: "info", text: "Respect privacy: use publicly listed business contact details only, and stop contacting anyone who says no." },
    ];
  },
};

// ---------- Outreach Follow-Up Sequence Generator ----------
const followUps: ToolDef = {
  kind: "generator",
  intro: "Set the channel and the offer. You get a polite 4-step follow-up sequence that adds something useful each time.",
  examples: [
    { label: "Email to a clinic", values: { channel: "Email", name: "Tunde", prospect: "SmileCare Dental", offer: "a free website + Google check", asset: "a 2-minute video of 3 quick fixes for their site" } },
    { label: "Instagram to a salon", values: { channel: "Instagram DM", name: "Kemi", prospect: "Glow Beauty", offer: "a free booking page mockup", asset: "a mockup of their booking page" } },
    { label: "LinkedIn to an agency", values: { channel: "LinkedIn", name: "Ade", prospect: "BrightPath Consulting", offer: "a free landing page review", asset: "3 headline ideas for their offer" } },
  ],
  fields: [
    { key: "channel", label: "Channel", type: "select", default: "Email", options: opts("Email", "WhatsApp", "Instagram DM", "LinkedIn") },
    { key: "name", label: "Your name", type: "text", default: "Tunde", half: true },
    { key: "prospect", label: "Prospect business", type: "text", default: "SmileCare Dental", half: true },
    { key: "offer", label: "What you offered", type: "text", default: "a free website + Google audit" },
    { key: "asset", label: "Something useful to share", type: "text", default: "a 2-minute video of 3 quick fixes for their site" },
  ],
  generate(v) {
    const me = or(s(v, "name"), "[name]"), biz = or(s(v, "prospect"), "your business"), offer = or(s(v, "offer"), "my offer"), asset = or(s(v, "asset"), "something useful");
    const steps = [
      { label: "Day 3: bump", detail: `Hi, just floating this back up, happy to do ${offer} for ${biz}, no strings. - ${me}` },
      { label: "Day 7: add value", detail: `I made ${asset} for ${biz}. Want me to send it over?` },
      { label: "Day 14: proof", detail: `[Share one REAL example: a before/after, or a similar project and its result. No project yet? Share your portfolio or a concept you made for them.] Happy to walk you through it, 10 minutes.` },
      { label: "Day 21: close the loop", detail: `I'll stop messaging after this one. If ${biz} wants more customers from Google later, I'm here. All the best! - ${me}` },
    ];
    const out: Block[] = [
      { type: "flow", title: `${s(v, "channel")} follow-ups`, steps },
      { type: "notice", tone: "warn", text: "Only claim results you really got. Replace the [bracket] before sending, and stop after the last message." },
      { type: "notice", tone: "info", text: s(v, "channel") === "WhatsApp" ? "On WhatsApp keep each message under 3 lines, and only message businesses that publicly list their number for enquiries." : "Most replies come on the 2nd–3rd touch. Track every prospect's stage in your sheet." },
    ];
    return out;
  },
};

// ---------- Web Scraper Config Builder ----------
function scraperFields(v: Values) {
  return lines(s(v, "fields")).map((l) => {
    const [name, sel, attr] = l.split("|").map((x) => x.trim());
    return { name: name || "field", selector: sel || "*", attr: attr || "text" };
  });
}

const scraperConfig: ToolDef = {
  kind: "generator",
  intro: "Describe a public directory page and the fields to collect. Test your selectors live, then copy a ready-to-run Node.js script. Check the site's terms first.",
  examples: [
    { label: "Card-style directory", values: { url: "https://example.com/directory?page=1", item: ".listing-card", fields: "name | h3 | text\nphone | .phone | text\nwebsite | a.website | href\narea | .location | text", next: "a.next", pages: 5, delay: 2000 } },
    { label: "Table-style list", values: { url: "https://example.com/members", item: "table tbody tr", fields: "name | td:nth-child(1) | text\ncity | td:nth-child(2) | text\nwebsite | td:nth-child(3) a | href", next: "", pages: 1, delay: 2000 } },
  ],
  live: {
    kind: "scrape",
    title: "Test your selectors on the real page",
    button: "Test scraper",
    payload: (v: Values) => ({ url: s(v, "url"), item: s(v, "item"), fields: scraperFields(v) }),
    render: (d: ScrapeData) => renderScrape(d),
  },
  fields: [
    { key: "url", label: "Start URL", type: "text", default: "https://example.com/directory?page=1" },
    { key: "item", label: "Item selector (one listing)", type: "text", default: ".listing-card" },
    { key: "fields", label: "Fields (name | CSS selector | attribute, one per line)", type: "textarea", rows: 5, default: "name | h3 | text\nphone | .phone | text\nwebsite | a.website | href\narea | .location | text" },
    { key: "next", label: "Next-page selector (optional)", type: "text", default: "a.next" },
    { key: "pages", label: "Max pages", type: "number", default: 5, min: 1, max: 50, half: true },
    { key: "delay", label: "Delay between pages", type: "number", default: 2000, min: 500, suffix: "ms", half: true },
  ],
  generate(v) {
    const fields = scraperFields(v);
    if (!s(v, "url").startsWith("http")) return [{ type: "notice", tone: "warn", text: "Start URL must begin with http:// or https://" }];
    const config = { startUrl: s(v, "url"), itemSelector: or(s(v, "item"), "body"), fields, nextSelector: s(v, "next") || null, maxPages: n(v, "pages"), delayMs: Math.max(500, n(v, "delay")) };
    const script = `// npm i cheerio   ·   node scrape.mjs > leads.csv
import * as cheerio from "cheerio";
const config = ${JSON.stringify(config, null, 2)};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const csv = (x) => \`"\${String(x ?? "").replace(/"/g, '""').trim()}"\`;
console.log(config.fields.map((f) => f.name).join(","));

let url = config.startUrl;
for (let page = 1; url && page <= config.maxPages; page++) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (research; contact: you@example.com)" } });
  if (!res.ok) { console.error("Stopped:", res.status, url); break; }
  const $ = cheerio.load(await res.text());
  $(config.itemSelector).each((_, el) => {
    const row = config.fields.map((f) => {
      const node = $(el).find(f.selector).first();
      return csv(f.attr === "text" ? node.text() : node.attr(f.attr));
    });
    console.log(row.join(","));
  });
  const next = config.nextSelector ? $(config.nextSelector).attr("href") : null;
  url = next ? new URL(next, url).toString() : null;
  await sleep(config.delayMs);
}`;
    return [
      { type: "text", title: "Config (JSON)", text: JSON.stringify(config, null, 2), filename: "scraper-config.json" },
      { type: "text", title: "Node.js script", text: script, filename: "scrape.mjs" },
      { type: "list", title: "Scrape responsibly", items: ["Check the site's terms and robots.txt first; don't scrape where it's forbidden.", "Never scrape Google Maps, Instagram or other platforms whose terms forbid it, collect those by hand.", "Keep the delay at 2 seconds or more and stay within a few pages.", "Collect only public business information, never personal data you don't need.", "If a page needs JavaScript to load, use Playwright instead of fetch."] },
    ];
  },
};

// ---------- Lead Qualification ----------
const qualify: ToolDef = {
  kind: "generator",
  intro: "Score a lead right after the first chat. You get a clear go / nurture / pass decision and the exact message to send next.",
  examples: [
    { label: "Hot lead", values: { lead: "SmileCare Dental, Lekki", budget: "Has budget in range", authority: "Talking to the owner", need: "Clear, painful problem", timing: "Wants it this month", fit: "Exactly what I sell" } },
    { label: "Maybe later", values: { lead: "Kora Foods, Ikeja", budget: "Budget unclear", authority: "Talking to the owner", need: "Nice to have", timing: "Next 3 months", fit: "Exactly what I sell" } },
    { label: "Not a fit", values: { lead: "Big Bank Plc", budget: "Budget unclear", authority: "No access to decision maker", need: "No real problem", timing: "Someday", fit: "Not really" } },
  ],
  fields: [
    { key: "lead", label: "Lead", type: "text", default: "SmileCare Dental, Lekki" },
    { key: "budget", label: "Budget", type: "select", default: "Has budget in range", options: opts("Has budget in range", "Budget unclear", "Budget too low") },
    { key: "authority", label: "Decision maker", type: "select", default: "Talking to the owner", options: opts("Talking to the owner", "Talking to staff who can influence", "No access to decision maker") },
    { key: "need", label: "Need", type: "select", default: "Clear, painful problem", options: opts("Clear, painful problem", "Nice to have", "No real problem") },
    { key: "timing", label: "Timing", type: "select", default: "Wants it this month", options: opts("Wants it this month", "Next 3 months", "Someday") },
    { key: "fit", label: "Fit with what you do", type: "select", default: "Exactly what I sell", options: opts("Exactly what I sell", "Partly", "Not really") },
  ],
  generate(v) {
    const score = (k: string, vals: string[]) => [3, 1, 0][vals.indexOf(s(v, k))] ?? 0;
    const parts = [
      ["Budget", score("budget", ["Has budget in range", "Budget unclear", "Budget too low"])],
      ["Authority", score("authority", ["Talking to the owner", "Talking to staff who can influence", "No access to decision maker"])],
      ["Need", score("need", ["Clear, painful problem", "Nice to have", "No real problem"])],
      ["Timing", score("timing", ["Wants it this month", "Next 3 months", "Someday"])],
      ["Fit", score("fit", ["Exactly what I sell", "Partly", "Not really"])],
    ] as [string, number][];
    const total = parts.reduce((x, [, p]) => x + p, 0);
    const verdict = total >= 12 ? "GO: send a proposal within 24 hours" : total >= 7 ? "NURTURE: follow up with value, check back in 2–4 weeks" : "PASS: politely decline or refer";
    return [
      { type: "stats", items: [{ label: "Lead score", value: `${total}/15` }, { label: "Verdict", value: total >= 12 ? "Go" : total >= 7 ? "Nurture" : "Pass" }] },
      { type: "table", title: or(s(v, "lead"), "Lead"), columns: ["Criterion", "Points"], rows: parts.map(([k, p]) => [k, `${p}/3`]) },
      { type: "notice", tone: total >= 12 ? "good" : total >= 7 ? "info" : "warn", text: verdict },
      {
        type: "text",
        title: "Send this next",
        text:
          total >= 12
            ? `Thanks for the chat today! As promised, I'll send your proposal by tomorrow. It covers what we discussed, the timeline and the price. Anything else you'd like me to include?`
            : total >= 7
              ? `Thanks for the chat! No pressure at all. I'll send you one useful tip for ${or(s(v, "lead"), "your business")} next week, and check back in about a month. Feel free to message me any time.`
              : `Thanks so much for your time. It doesn't sound like the right fit right now, but if things change, I'm happy to help. If I know someone better suited to what you need, I'll send you their details.`,
      },
    ];
  },
};

// ---------- Landing Page Conversion Checklist ----------
const landingChecklist: ToolDef = {
  kind: "checklist",
  intro: "Scan a live landing page to auto-tick what can be detected, then judge the copy items yourself.",
  live: {
    kind: "page",
    title: "Scan a landing page",
    button: "Scan page",
    url: { placeholder: "yourlandingpage.com", hint: "Detects HTTPS, prices, FAQ, testimonials, WhatsApp/phone links, payment logos and analytics." },
    render: (d: PageData) => renderLandingCheck(d),
  },
  groups: [
    { title: "Above the fold", checks: [
      { id: "h1", weight: 3, text: "Headline says what you get, not what you are", fix: "Rewrite the headline as an outcome: “Get a website that takes orders on WhatsApp” beats “Welcome to XYZ Digital”." },
      { id: "sub", weight: 2, text: "Subheadline says who it's for and how", fix: "Add one line under the headline naming the audience and the mechanism." },
      { id: "cta1", weight: 3, text: "One primary button visible without scrolling on a phone", fix: "Put a single, high-contrast button in the first screen on a 375px-wide phone." },
      { id: "visual", weight: 1, text: "Hero image/video shows the product or result", fix: "Replace stock photos with a screenshot, demo or before/after of the actual result." },
      { id: "proof1", weight: 2, text: "Some proof near the top (logos, number, rating)", fix: "Add a proof strip under the hero: client count, rating, or 3–5 client logos." },
    ] },
    { title: "Offer & copy", checks: [
      { id: "benefits", weight: 2, text: "Benefits come before features", fix: "For each feature, lead with the “so that…”, what the customer gains." },
      { id: "price", weight: 2, text: "Price or starting price is visible", fix: "Show a price or “from ₦…”, hiding it loses serious buyers." },
      { id: "objections", weight: 2, text: "Top 3 objections are answered (FAQ)", fix: "Add an FAQ answering cost, timeline, and “what if it doesn't work for me?”." },
      { id: "guarantee", weight: 1, text: "Risk reversal: guarantee, refund, or trial", fix: "Offer a guarantee you can honour, revisions, a refund window, or pay-on-delivery for a first milestone." },
      { id: "scan", weight: 1, text: "Copy is scannable: short paragraphs, clear subheads", fix: "Break paragraphs over 3 lines; make every subhead readable on its own." },
      { id: "urgency", weight: 1, text: "An honest reason to act now", fix: "Use a real constraint: limited slots this month, a price rise date, a cohort start date." },
    ] },
    { title: "Trust", checks: [
      { id: "testimonials", weight: 3, text: "Real testimonials with name, photo or business", fix: "Ask 3 happy clients for a two-line testimonial plus permission to use their name." },
      { id: "contact", weight: 2, text: "Real contact details (WhatsApp, email, location)", fix: "Show a WhatsApp number and a business email. Buyers check for a real person." },
      { id: "https", weight: 2, text: "HTTPS padlock, own domain (not a free subdomain)", fix: "Put the page on your own domain with HTTPS. Vercel and Netlify do this for free." },
      { id: "payment", weight: 1, text: "Trusted payment logos (Paystack, Flutterwave, Stripe)", fix: "Show the payment provider logos near the buy button." },
    ] },
    { title: "Mobile & speed", checks: [
      { id: "mobile", weight: 3, text: "Looks right on a 375px-wide phone", fix: "Test on a real phone, fix overflow, tiny text and cramped buttons first." },
      { id: "speed", weight: 3, text: "Loads in under 3 seconds on 4G", fix: "Run the Website Speed Checklist tool on the page and fix what it finds." },
      { id: "tap", weight: 1, text: "Buttons are at least 44px tall and easy to tap", fix: "Increase button padding; keep tap targets apart." },
      { id: "font", weight: 1, text: "Body text is at least 16px", fix: "Set body font size to 16px or more so phones don't zoom on inputs." },
    ] },
    { title: "Conversion mechanics", checks: [
      { id: "onegoal", weight: 2, text: "The page has one goal (no competing buttons)", fix: "Remove secondary links and menus that pull visitors away from the main action." },
      { id: "form", weight: 2, text: "Forms ask only for what you need", fix: "Cut the form to name + WhatsApp/email. Ask the rest on the call." },
      { id: "wa", weight: 2, text: "A click-to-WhatsApp link with a pre-filled message", fix: "Use https://wa.me/234XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20a%20quote so the first message is already typed." },
      { id: "analytics", weight: 1, text: "Analytics installed and tracking the main button", fix: "Add analytics (Vercel, Plausible or GA4) and track clicks on the main button." },
      { id: "thanks", weight: 1, text: "A thank-you page or message after conversion", fix: "Tell people what happens next and when, and give them a WhatsApp link." },
    ] },
  ],
  grades: [[85, "Ready to run ads"], [60, "Solid: fix the gaps"], [35, "Leaking sales"], [0, "Rebuild the basics"]],
};

export const defs: Record<string, ToolDef> = {
  "lead-magnet-ideas": leadMagnet,
  "prospect-list-builder": prospectList,
  "follow-up-sequence-generator": followUps,
  "web-scraper-config": scraperConfig,
  "lead-qualification": qualify,
  "landing-page-checklist": landingChecklist,
};
