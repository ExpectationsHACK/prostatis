import { renderDomains, renderSpeed, type DomainData, type SpeedData } from "./live";
import { lines, n, opts, or, s, slugify, type Block, type ToolDef, type Values } from "./types";

// ---------- Tech Stack Picker ----------
const techStack: ToolDef = {
  kind: "generator",
  intro: "Answer five questions about the project. You get a stack recommendation, hosting cost estimate and the reasoning.",
  fields: [
    { key: "type", label: "What are you building?", type: "select", default: "Business website", options: opts("Business website", "Landing page", "Online store", "Booking site", "Blog / content site", "Web app with logins", "Client dashboard / portal") },
    { key: "skill", label: "Your coding level", type: "select", default: "Beginner (AI writes the code)", options: opts("Beginner (AI writes the code)", "Some code", "Comfortable coding") },
    { key: "edits", label: "Will the client edit content?", type: "select", default: "Yes, often", options: opts("No", "Sometimes", "Yes, often") },
    { key: "payments", label: "Payments", type: "select", default: "Paystack", options: opts("None", "Paystack", "Stripe", "Both") },
    { key: "traffic", label: "Expected monthly visitors", type: "select", default: "Under 10k", options: opts("Under 10k", "10k–100k", "100k+") },
  ],
  generate(v) {
    const type = s(v, "type"), edits = s(v, "edits"), pay = s(v, "payments"), beginner = s(v, "skill").startsWith("Beginner");
    const app = /app|dashboard|portal/i.test(type);
    const store = /store/i.test(type);
    const rows: string[][] = [];
    rows.push(["Framework", app || !beginner ? "Next.js (App Router) + TypeScript" : "Next.js (App Router)", "Most AI coding tools write it best; one codebase for pages and APIs"]);
    rows.push(["Styling", "Tailwind CSS", "Fast to build, easy for AI to edit, tiny CSS"]);
    if (app) rows.push(["Auth + database", "Supabase", "Logins, Postgres and file storage with a free tier"]);
    if (edits !== "No") rows.push(["Content editing", edits === "Yes, often" ? "Sanity or Payload CMS" : "Markdown files + simple admin", "Client updates text and photos without calling you"]);
    if (store) rows.push(["Store", beginner ? "Next.js + Paystack checkout (few products) or Shopify (many products)" : "Next.js + Medusa or Shopify headless", "Pick by product count and who manages stock"]);
    if (pay !== "None") rows.push(["Payments", pay === "Both" ? "Paystack (Naira) + Stripe (USD)" : pay, pay === "Paystack" ? "Card, transfer and USSD in Naira" : "Cards in USD and other currencies"]);
    rows.push(["Forms + email", "Resend (email) + server actions", "Contact forms that actually arrive"]);
    rows.push(["Hosting", s(v, "traffic") === "100k+" ? "Vercel Pro or Netlify Pro" : "Vercel (free tier to start)", "Push to GitHub → live in a minute, HTTPS included"]);
    rows.push(["Domain + DNS", "Namecheap / Whogohost + Cloudflare DNS", ".com or .com.ng; Cloudflare for speed"]);
    rows.push(["Analytics", "Vercel Analytics or Plausible", "Privacy-friendly visitor stats"]);
    const cost = (s(v, "traffic") === "100k+" ? 20 : 0) + (app ? (s(v, "traffic") === "Under 10k" ? 0 : 25) : 0);
    const blocks: Block[] = [
      { type: "table", title: `Recommended stack — ${type}`, columns: ["Layer", "Pick", "Why"], rows },
      { type: "stats", items: [{ label: "Hosting to start", value: cost === 0 ? "$0/mo" : `~$${cost}/mo`, sub: "plus ~$12/yr domain" }, { label: "Build time with AI", value: app ? "1–2 weeks" : store ? "4–7 days" : "2–4 days", sub: "for a first version" }] },
      { type: "text", title: "Kick-off prompt for your AI", text: `Create a new ${rows[0][1]} project for a ${type.toLowerCase()}. Use ${rows.map((r) => `${r[0]}: ${r[1]}`).slice(1).join("; ")}. Start with the folder structure, a mobile-first layout and a README with setup steps.` },
    ];
    return blocks;
  },
};

// ---------- Component Prompt Library ----------
const components: Record<string, { name: string; spec: string }[]> = {
  Navigation: [
    { name: "Sticky header with mobile menu", spec: "sticky header with logo left, 4 links, a primary button right; on mobile collapse links into a slide-down menu with a close button; highlight the current page" },
    { name: "WhatsApp floating button", spec: "floating round WhatsApp button bottom-right that opens https://wa.me/<number>?text=<prefilled message>; hide on print; accessible label" },
  ],
  Hero: [
    { name: "Hero with image + two buttons", spec: "hero with headline, subhead, primary and secondary buttons, image on the right on desktop and below on mobile" },
    { name: "Hero with search bar", spec: "hero with headline and a search bar (location, type, budget) that submits to /search with query params" },
  ],
  Content: [
    { name: "Services grid", spec: "responsive grid of service cards (icon, title, short text, price from) — 1 column mobile, 3 desktop" },
    { name: "Testimonials slider", spec: "testimonial cards with name, business, photo and quote; horizontal scroll-snap on mobile, 3-up grid on desktop" },
    { name: "FAQ accordion", spec: "accessible FAQ accordion using <details>/<summary>, with FAQPage JSON-LD schema generated from the same data" },
    { name: "Pricing table", spec: "3 pricing tiers with the middle one highlighted as most popular, feature checklist, monthly/annual toggle" },
  ],
  Commerce: [
    { name: "Product card + grid", spec: "product card with image, name, price in Naira formatted like ₦12,500, add-to-cart button; responsive grid with category filter" },
    { name: "Paystack checkout button", spec: "button that calls a server route to initialise a Paystack transaction and redirects to the authorization_url; verify the reference server-side on return" },
  ],
  Forms: [
    { name: "Contact form with validation", spec: "contact form (name, email, phone, message) with client + server validation, honeypot spam field, success and error states, sends via a server action" },
    { name: "Booking form", spec: "booking form with service select, date picker that disables past dates and Sundays, time-slot buttons, and a confirmation screen" },
  ],
  Footer: [{ name: "Business footer", spec: "footer with logo, short about, quick links, contact (phone, WhatsApp, email, address), opening hours, social icons and copyright" }],
};
const componentLib: ToolDef = {
  kind: "generator",
  intro: "Pick a component and your stack. You get a precise prompt that makes AI build it right the first time.",
  fields: [
    { key: "group", label: "Category", type: "select", default: "Content", options: opts(...Object.keys(components)) },
    { key: "stack", label: "Stack", type: "select", default: "Next.js + Tailwind", options: opts("Next.js + Tailwind", "React + Tailwind", "Plain HTML + CSS", "WordPress (block theme)") },
    { key: "brand", label: "Brand colours / style", type: "text", default: "primary #0f4d3a, accent #ff6719, rounded corners" },
  ],
  generate(v) {
    const list = components[s(v, "group")] ?? components.Content;
    const items = list.map(
      (c) =>
        `${c.name.toUpperCase()}\nBuild a ${c.spec}. Stack: ${s(v, "stack")}. Style: ${or(s(v, "brand"), "clean and modern")}. Requirements: mobile-first, accessible (labels, focus states, 4.5:1 contrast), no extra libraries unless needed, typed props, example data included.`,
    );
    return [{ type: "list", title: `${s(v, "group")} components (${items.length})`, items }];
  },
};

// ---------- Bug / Error Debug Prompt Template ----------
const debugPrompt: ToolDef = {
  kind: "generator",
  intro: "Paste the error and what you were doing. You get a debugging prompt that gives the AI everything it needs.",
  fields: [
    { key: "stack", label: "Stack", type: "text", default: "Next.js 16, Tailwind, Supabase" },
    { key: "expected", label: "What should happen", type: "text", default: "Contact form sends an email and shows 'Thanks!'" },
    { key: "actual", label: "What happens instead", type: "text", default: "Button spins forever, no email arrives" },
    { key: "error", label: "Error message / logs", type: "textarea", default: "Error: fetch failed\n  at POST (app/api/contact/route.ts:14:5)", rows: 4 },
    { key: "tried", label: "What you've tried", type: "textarea", default: "Restarted dev server\nChecked the API key is in .env.local", rows: 3 },
    { key: "files", label: "Relevant files", type: "text", default: "app/api/contact/route.ts, components/ContactForm.tsx" },
  ],
  generate(v) {
    const errs = s(v, "error");
    const prompt = `I need help fixing a bug. Find the root cause before changing code.

STACK: ${s(v, "stack")}
EXPECTED: ${s(v, "expected")}
ACTUAL: ${s(v, "actual")}

ERROR / LOGS:
\`\`\`
${errs || "(no error shown)"}
\`\`\`

ALREADY TRIED:
${lines(s(v, "tried")).map((x) => "- " + x).join("\n") || "- nothing yet"}

RELEVANT FILES: ${or(s(v, "files"), "(unknown — search the project)")}

Please:
1. Read the relevant files first.
2. Explain the most likely cause in one paragraph.
3. Make the smallest fix, and tell me how to verify it.
4. If you need more information (env vars, network tab, versions), ask for exactly what you need.`;
    const hints: string[] = [];
    if (/fetch failed|ECONNREFUSED|ENOTFOUND/i.test(errs)) hints.push("Network error: check the URL/API key and that the service is reachable from the server.");
    if (/undefined|null/i.test(errs)) hints.push("Something is undefined: log the value just before the failing line.");
    if (/hydration/i.test(errs)) hints.push("Hydration error: something renders differently on server and client (dates, random values, window).");
    if (/401|403|unauthori/i.test(errs)) hints.push("Auth error: the key or session is missing or wrong in this environment.");
    if (/404/i.test(errs)) hints.push("404: the route or file path doesn't exist where you think it does.");
    if (/CORS/i.test(errs)) hints.push("CORS: call the third-party API from your server route, not the browser.");
    const out: Block[] = [{ type: "text", title: "Debug prompt", text: prompt }];
    if (hints.length) out.push({ type: "list", title: "Quick hints from your error", items: hints });
    return out;
  },
};

// ---------- Website Speed Checklist ----------
const speedChecklist: ToolDef = {
  kind: "checklist",
  intro: "Paste a link to test the site live, or tick items by hand. Most visitors in Nigeria are on mobile data — speed is conversion.",
  live: {
    kind: "speed",
    title: "Test a website's speed",
    button: "Test speed",
    url: { placeholder: "yourwebsite.com", hint: "We load the page, weigh every image, script and stylesheet, and tick the checks below that pass." },
    render: (d: SpeedData) => renderSpeed(d, "speed"),
  },
  groups: [
    { title: "Images", checks: [
      { id: "webp", weight: 3, text: "Images are WebP/AVIF and under 200KB each", fix: "Convert with Squoosh or next/image; hero under 150KB." },
      { id: "sizes", weight: 2, text: "Images are sized for the screen (no 4000px photos)", fix: "Export at the displayed size ×2 max; use srcset/next/image." },
      { id: "lazy", weight: 2, text: "Below-the-fold images lazy-load", fix: "Add loading=\"lazy\" (next/image does this by default)." },
    ] },
    { title: "Code", checks: [
      { id: "js", weight: 3, text: "Total JavaScript on the home page under 200KB", fix: "Remove unused libraries, sliders and popups; check the Coverage tab." },
      { id: "fonts", weight: 2, text: "Max 2 font families, only used weights, font-display: swap", fix: "Drop extra weights; self-host with next/font." },
      { id: "third", weight: 2, text: "No heavy third-party widgets above the fold", fix: "Load chat widgets and embeds after interaction or on idle." },
      { id: "cache", weight: 1, text: "Static files cached with long cache headers", fix: "Vercel/Netlify do this automatically; check your host." },
    ] },
    { title: "Server & delivery", checks: [
      { id: "cdn", weight: 2, text: "Served through a CDN (Vercel, Netlify, Cloudflare)", fix: "Put the site behind Cloudflare or host on Vercel/Netlify." },
      { id: "ttfb", weight: 2, text: "Server responds in under 600ms", fix: "Use static pages where possible; cache database queries." },
      { id: "https", weight: 1, text: "HTTPS with HTTP/2 or HTTP/3", fix: "Modern hosts enable this — confirm in the browser's network tab." },
    ] },
    { title: "Measured", checks: [
      { id: "psi", weight: 3, text: "PageSpeed Insights mobile score 80+", fix: "Run pagespeed.web.dev and fix the top 3 opportunities it lists." },
      { id: "lcp", weight: 3, text: "Largest Contentful Paint under 2.5s on mobile", fix: "Preload the hero image and make it small; avoid hero sliders." },
      { id: "cls", weight: 2, text: "No layout jumping while loading (CLS under 0.1)", fix: "Set width/height on images and reserve space for embeds." },
    ] },
  ],
  grades: [[85, "Fast — ready for ads"], [60, "Decent — fix the high-impact items"], [35, "Slow — visitors are leaving"], [0, "Very slow — start with images"]],
};

// ---------- Responsive Design Checklist ----------
const responsiveChecklist: ToolDef = {
  kind: "checklist",
  intro: "Run the live mobile check, then test on a real phone (or Chrome DevTools at 360px wide) and tick what passes.",
  live: {
    kind: "speed",
    title: "Check a website on mobile",
    button: "Check mobile",
    url: { placeholder: "yourwebsite.com", hint: "Checks the viewport tag, heavy images, and (with Google PageSpeed enabled) text size and tap targets." },
    render: (d: SpeedData) => renderSpeed(d, "responsive"),
  },
  groups: [
    { title: "Layout", checks: [
      { id: "noscroll", weight: 3, text: "No sideways scrolling at 360px width", fix: "Find the wide element (DevTools → select, check width) and add max-width: 100% / min-w-0." },
      { id: "stack", weight: 2, text: "Multi-column sections stack to one column on phones", fix: "Use grid with 1 column by default and more columns at md/lg breakpoints." },
      { id: "tablet", weight: 1, text: "Looks intentional on a tablet (768px), not stretched", fix: "Add an md breakpoint with 2 columns." },
    ] },
    { title: "Text", checks: [
      { id: "16px", weight: 3, text: "Body text at least 16px; inputs at least 16px (stops iOS zoom)", fix: "Set base font size to 16px; inputs text-base." },
      { id: "measure", weight: 1, text: "Lines aren't too long on desktop (max ~75 characters)", fix: "Limit text containers to max-w-prose / 65ch." },
      { id: "headline", weight: 2, text: "Headlines don't break into single-word lines on phones", fix: "Reduce mobile heading size; use text-balance." },
    ] },
    { title: "Touch", checks: [
      { id: "tap", weight: 3, text: "Buttons and links are at least 44×44px", fix: "Increase padding on buttons and nav links." },
      { id: "spacing", weight: 2, text: "Tap targets have space between them", fix: "Add gap between stacked links and buttons." },
      { id: "menu", weight: 2, text: "Mobile menu opens, closes and is keyboard accessible", fix: "Use a button with aria-expanded; close on link click." },
    ] },
    { title: "Media & forms", checks: [
      { id: "img", weight: 2, text: "Images scale down and keep their aspect ratio", fix: "img { max-width: 100%; height: auto; }" },
      { id: "video", weight: 1, text: "Embeds (YouTube, maps) are responsive", fix: "Wrap in an aspect-ratio container." },
      { id: "forms", weight: 2, text: "Forms use the right keyboard (tel, email, number)", fix: "Set type=\"tel\" / \"email\" and inputMode." },
    ] },
  ],
  grades: [[85, "Phone-ready"], [60, "Mostly there — fix the high-impact items"], [0, "Needs work on mobile"]],
};

// ---------- Domain Name Idea Generator ----------
/** The domain ideas for a set of inputs — shared by the generator and the live availability check. */
export function domainIdeas(v: Values): string[] {
  const k = slugify(s(v, "keyword")).replace(/-/g, ""), e = slugify(s(v, "extra")).replace(/-/g, ""), loc = slugify(s(v, "location")).replace(/-/g, "");
  if (!k) return [];
  const set = new Set<string>();
  const add = (x: string) => x && set.add(x);
  add(k);
  if (e) { add(k + e); add(e + k); }
  if (loc) { add(k + loc); if (e) add(k + e + loc); add(loc + k); }
  ["hq", "hub", "ly", "co", "lab", "studio", "now", "place", "club", "ng"].forEach((sf) => add(k + sf));
  ["get", "try", "the", "my", "go", "hello"].forEach((p) => add(p + k));
  if (e) { add(k + e.slice(0, 4)); add(k + "and" + e); }
  const max = Math.max(5, n(v, "max") || 14);
  return [...set].filter((x) => x.length <= max).slice(0, 24).map((x) => x + s(v, "tld"));
}

const domainGen: ToolDef = {
  kind: "generator",
  intro: "Enter a keyword and a style. You get short, brandable domain ideas — then check which are actually free, live.",
  fields: [
    { key: "keyword", label: "Main keyword", type: "text", default: "glow", half: true },
    { key: "extra", label: "Second word (optional)", type: "text", default: "beauty", half: true },
    { key: "location", label: "Location word (optional)", type: "text", default: "lagos", half: true },
    { key: "tld", label: "Extension", type: "select", default: ".com", options: opts(".com", ".ng", ".com.ng", ".co", ".africa", ".store", ".studio"), half: true },
    { key: "max", label: "Max length (letters)", type: "number", default: 14, min: 5, max: 30 },
  ],
  live: {
    kind: "domain",
    title: "Check which ideas are free right now",
    button: "Check availability",
    payload: (v) => ({ names: domainIdeas(v).slice(0, 20) }),
    render: (d: DomainData) => renderDomains(d),
  },
  generate(v) {
    const names = domainIdeas(v);
    if (!names.length) return [{ type: "notice", tone: "warn", text: "Enter a keyword to get ideas." }];
    const rows = names.map((x) => [x, String(x.split(".")[0].length), `https://www.namecheap.com/domains/registration/results/?domain=${x}`]);
    return [
      { type: "table", title: `${rows.length} ideas`, columns: ["Domain", "Letters", "Search link"], rows },
      { type: "notice", tone: "info", text: "Tap “Check availability” above to see which are free. Good domains are short, easy to say on a phone call, and have no hyphens." },
    ];
  },
};

export const defs: Record<string, ToolDef> = {
  "tech-stack-picker": techStack,
  "component-prompt-library": componentLib,
  "debug-prompt-template": debugPrompt,
  "website-speed-checklist": speedChecklist,
  "responsive-design-checklist": responsiveChecklist,
  "domain-name-generator": domainGen,
};
