import { renderDomains, renderSpeed, type DomainData, type SpeedData } from "./live";
import { lines, n, opts, or, s, slugify, type Block, type ToolDef, type Values } from "./types";

// ---------- Tech Stack Picker ----------
const techStack: ToolDef = {
  kind: "generator",
  intro: "Answer six questions about the project. You get the stack (free tools first, the same ones the course teaches), what it costs each month and who pays, and a kick-off prompt for your AI builder.",
  examples: [
    { label: "Salon website (client)", values: { type: "Booking site", who: "A paying client", skill: "Beginner (AI writes the code)", edits: "Sometimes", payments: "Paystack", traffic: "Under 10k" } },
    { label: "My portfolio", values: { type: "Business website", who: "Me (practice / portfolio)", skill: "Beginner (AI writes the code)", edits: "No", payments: "None", traffic: "Under 10k" } },
    { label: "School portal (client)", values: { type: "Web app with logins", who: "A paying client", skill: "Some code", edits: "Yes, often", payments: "Paystack", traffic: "10k–100k" } },
    { label: "Fashion store (client)", values: { type: "Online store", who: "A paying client", skill: "Beginner (AI writes the code)", edits: "Yes, often", payments: "Both", traffic: "10k–100k" } },
  ],
  fields: [
    { key: "type", label: "What are you building?", type: "select", default: "Business website", options: opts("Business website", "Landing page", "Online store", "Booking site", "Blog / content site", "Web app with logins", "Client dashboard / portal") },
    { key: "who", label: "Who is it for?", type: "select", default: "A paying client", options: opts("A paying client", "Me (practice / portfolio)"), hint: "Paid client work is “commercial”. It changes which hosting plans you may use." },
    { key: "skill", label: "Your coding level", type: "select", default: "Beginner (AI writes the code)", options: opts("Beginner (AI writes the code)", "Some code", "Comfortable coding") },
    { key: "edits", label: "Will the client edit content?", type: "select", default: "Sometimes", options: opts("No", "Sometimes", "Yes, often") },
    { key: "payments", label: "Payments", type: "select", default: "Paystack", options: opts("None", "Paystack", "Stripe", "Both") },
    { key: "traffic", label: "Expected monthly visitors", type: "select", default: "Under 10k", options: opts("Under 10k", "10k–100k", "100k+") },
  ],
  generate(v) {
    const type = s(v, "type"), edits = s(v, "edits"), pay = s(v, "payments"), beginner = s(v, "skill").startsWith("Beginner");
    const client = s(v, "who") !== "Me (practice / portfolio)";
    const app = /app|dashboard|portal/i.test(type);
    const store = /store/i.test(type);
    const booking = /booking/i.test(type);
    // Next.js only when someone can maintain it and the project has many logged-in screens; otherwise plain files.
    const next = app && s(v, "skill") === "Comfortable coding";
    const rows: string[][] = [];
    rows.push(["Code", next ? "Next.js + TypeScript" : "Plain HTML, CSS and a little JavaScript", next ? "Many logged-in screens are easier to manage in a framework" : "Nothing to install or update; your AI builder (Antigravity, free) writes it and any host can serve it"]);
    rows.push(["Styling", next ? "Tailwind CSS" : "One style.css file", next ? "Fast to build and easy for AI to edit" : "Simple, light on mobile data, and easy to change later"]);
    if (app) rows.push(["Logins + database", "Supabase", "Sign-in, a database and file storage; Row Level Security keeps each user's data private"]);
    if (app && !next) rows.push(["Server code", "Cloudflare Pages Functions", "Small server files beside the site for the jobs that must stay secret (keys, payment checks)"]);
    if (edits === "Yes, often") rows.push(["Content editing", app ? "A simple admin page backed by Supabase" : "A Google Sheet the site reads, or a small Supabase admin page", "The client updates prices and photos without calling you"]);
    if (edits === "Sometimes") rows.push(["Content editing", "You make the changes on a monthly care plan", "Cheapest and safest when changes are rare, and it's steady income for you"]);
    if (booking) rows.push(["Bookings", "Cal.com (free plan) embed + a Paystack deposit link", "Reliable in an hour; a custom booking system only if the business outgrows it"]);
    if (store) rows.push(["Store", "A few products: product pages with Paystack Payment Page links. Many products: Paystack Storefront", "Both are free to set up; Paystack only takes a fee per sale"]);
    if (pay !== "None") rows.push(["Payments", pay === "Both" ? "Paystack (naira) + Stripe (dollars)" : pay, pay === "Stripe" ? "Cards in USD and other currencies (needs a supported business entity)" : "Card, bank transfer and USSD in naira. Use Payment Pages first; verify payments on the server once you build your own checkout"]);
    rows.push(["Forms", "Web3Forms (free plan)", "Contact and quote forms that land in the owner's email, with no server to run"]);
    rows.push(["Hosting", "Cloudflare Pages (free plan)", "Free for business sites too, fast across Nigeria, HTTPS included"]);
    rows.push(["Domain", "In the client's name: .com.ng / .ng from a NiRA-accredited registrar, .com from any registrar", "The domain is the client's asset"]);
    rows.push(["Analytics", "Cloudflare Web Analytics (free)", "Visitor counts for your monthly report without cookie banners"]);

    const costs: string[][] = [["Domain", "₦5,000–₦25,000 / year", "Client"]];
    costs.push(["Hosting", "$0 on Cloudflare Pages' free plan", client ? "Client's account (free)" : "You (free)"]);
    if (app) costs.push(["Supabase", "Free to start. Free projects pause after a week with no activity, so move to Pro (about $25 / month) once the business depends on it", client ? "Client" : "You"]);
    if (pay !== "None") costs.push(["Payments", "No monthly fee; Paystack takes a fee per transaction (paystack.com/pricing)", "Client"]);
    if (booking) costs.push(["Bookings", "$0 on Cal.com's free plan", "Client"]);
    costs.push(["Forms", "$0 on Web3Forms' free plan (check its monthly limit)", "Client"]);
    if (client) costs.push(["Your care plan", "Your monthly fee for updates and monitoring", "Client"]);

    const blocks: Block[] = [
      { type: "table", title: `Recommended stack: ${type}`, columns: ["Layer", "Pick", "Why"], rows },
      { type: "table", title: "Monthly running costs: put these in your proposal", columns: ["Item", "Cost (check current prices)", "Who pays"], rows: costs },
      { type: "stats", items: [{ label: "First version with AI", value: app ? "1–2 weeks" : store ? "4–7 days" : "2–4 days", sub: beginner ? "at a beginner's pace" : "for a first version" }, { label: "Accounts owned by", value: client ? "The client" : "You", sub: client ? "you're added as a helper" : "" }] },
      {
        type: "text",
        title: "Kick-off prompt for your AI builder",
        text: `Read the project brief first and follow it.\nCreate a new ${type.toLowerCase()} project. Use: ${rows.map((r) => `${r[0]}: ${r[1]}`).join("; ")}.\nStart with the folder structure (site/ for the pages${app && !next ? ", functions/ beside it for server code" : ""}), a mobile-first layout, and a README with setup steps. Add these decisions to the project brief (notes/brief.md, or CLAUDE.md if you use Claude Code). Keep secrets out of the code: they go in Cloudflare's Variables and Secrets.`,
      },
    ];
    if (next) blocks.push({ type: "notice", tone: "info", text: "Next.js on Cloudflare needs its OpenNext adapter; Vercel is simpler for Next.js, but its free Hobby plan is for non-commercial use only, so paid client work there needs Pro." });
    if (client) blocks.push({ type: "notice", tone: "good", text: "Cloudflare Pages' free plan allows business sites, so the client pays nothing for hosting. Create the accounts in the client's name (or hand them over at launch) and keep yourself as a helper." });
    return blocks;
  },
};

// ---------- Component Prompt Library ----------
const components: Record<string, { name: string; spec: string }[]> = {
  Navigation: [
    { name: "Sticky header with mobile menu", spec: "a sticky header with the logo on the left, 4 links, a primary button right; on mobile collapse links into a slide-down menu with a close button; highlight the current page" },
    { name: "WhatsApp floating button", spec: "a floating round WhatsApp button bottom-right that opens https://wa.me/<number>?text=<prefilled message>; hide on print; accessible label" },
  ],
  Hero: [
    { name: "Hero with image + two buttons", spec: "a hero section with a headline, subhead, primary and secondary buttons, image on the right on desktop and below on mobile" },
    { name: "Hero with search bar", spec: "a hero section with a headline and a search bar (location, type, budget) that submits to /search with query params" },
  ],
  Content: [
    { name: "Services grid", spec: "a responsive grid of service cards (icon, title, short text, price from), 1 column mobile, 3 desktop" },
    { name: "Testimonials slider", spec: "testimonial cards with the name, business, photo and quote; horizontal scroll-snap on mobile, 3-up grid on desktop" },
    { name: "FAQ accordion", spec: "an accessible FAQ accordion using <details>/<summary>, with the questions and answers stored in one data array" },
    { name: "Pricing table", spec: "a pricing table with 3 tiers, the middle one highlighted as most popular, feature checklist, monthly/annual toggle" },
  ],
  Commerce: [
    { name: "Product card + grid", spec: "a product card with an image, name, price in Naira formatted like ₦12,500, add-to-cart button; responsive grid with category filter" },
    { name: "Paystack checkout button", spec: "a “Pay now” button that calls a server route to initialise a Paystack transaction and redirects to the authorization_url; verify the reference server-side on return" },
  ],
  Forms: [
    { name: "Contact form with validation", spec: "a contact form (name, email, phone, message) with client + server validation, honeypot spam field, success and error states, sends via a server action" },
    { name: "Booking form", spec: "a booking form with a service select, date picker that disables past dates and Sundays, time-slot buttons, and a confirmation screen" },
  ],
  Footer: [{ name: "Business footer", spec: "a footer with the logo, short about, quick links, contact (phone, WhatsApp, email, address), opening hours, social icons and copyright" }],
};
const componentLib: ToolDef = {
  kind: "generator",
  intro: "Pick a component group and your stack. You get precise prompts that make AI build components right the first time, and a checklist to test them.",
  examples: [
    { label: "Next.js salon site", values: { group: "Content", stack: "Next.js + Tailwind", brand: "primary #b8336a, soft cream backgrounds, rounded corners" } },
    { label: "Store checkout", values: { group: "Commerce", stack: "Next.js + Tailwind", brand: "primary #0f4d3a, accent #ff6719, square corners" } },
    { label: "Plain HTML page", values: { group: "Forms", stack: "Plain HTML + CSS", brand: "blue #1c6fb8, white, simple" } },
  ],
  fields: [
    { key: "group", label: "Category", type: "select", default: "Content", options: opts(...Object.keys(components)) },
    { key: "stack", label: "Stack", type: "select", default: "Next.js + Tailwind", options: opts("Next.js + Tailwind", "React + Tailwind", "Plain HTML + CSS", "WordPress (block theme)") },
    { key: "brand", label: "Brand colours / style", type: "text", default: "primary #0f4d3a, accent #ff6719, rounded corners" },
  ],
  generate(v) {
    const list = components[s(v, "group")] ?? components.Content;
    const items = list.map(
      (c) =>
        `${c.name.toUpperCase()}\nBuild ${c.spec}. Stack: ${s(v, "stack")}. Style: ${or(s(v, "brand"), "clean and modern")}. Requirements: mobile-first (works at 360px), accessible (labels, visible focus, 4.5:1 contrast, keyboard usable), no extra libraries unless needed${/Next|React/.test(s(v, "stack")) ? ", typed props" : ""}, realistic example data in naira where prices appear. Explain how to use it when done.`,
    );
    return [
      { type: "list", title: `${s(v, "group")} components (${items.length})`, items },
      {
        type: "list",
        title: "Test it before you move on",
        items: [
          "Open it at 360px wide: nothing spills off the side.",
          "Press Tab through it: you can see where you are and reach every button.",
          "Check text contrast on its colours with the Color Palette tool.",
          "Try the unhappy path: empty fields, a failed payment, no internet.",
          "Commit once it works.",
        ],
      },
    ];
  },
};

// ---------- Bug / Error Debug Prompt Template ----------
const debugPrompt: ToolDef = {
  kind: "generator",
  intro: "Paste the exact error and what you were doing. You get a debugging prompt that gives the AI everything it needs, plus hints for common errors.",
  examples: [
    { label: "Form won't send", values: { stack: "HTML, CSS, Web3Forms, Cloudflare Pages", expected: "Contact form sends and shows 'Thanks!'", actual: "Button spins forever, nothing arrives", error: "Error: fetch failed\n  at POST (app/api/contact/route.ts:14:5)", tried: "Restarted the dev server", files: "app/api/contact/route.ts, components/ContactForm.tsx" } },
    { label: "Supabase insert blocked", values: { stack: "Next.js, Supabase", expected: "Saving a booking adds a row", actual: "Nothing is saved", error: "new row violates row-level security policy for table \"bookings\"", tried: "Checked the table exists", files: "app/book/actions.ts, supabase/migrations" } },
    { label: "Module not found", values: { stack: "Next.js, Tailwind", expected: "The site starts with npm run dev", actual: "The page shows an error", error: "Module not found: Can't resolve '@/components/Hero'", tried: "", files: "app/page.tsx" } },
  ],
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

RELEVANT FILES: ${or(s(v, "files"), "(unknown: search the project)")}

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
    if (/module not found|can't resolve|cannot find module/i.test(errs)) hints.push("Missing module: the file path or import name is wrong, or a package isn't installed (npm install <package>).");
    if (/row-level security|violates row/i.test(errs)) hints.push("Supabase RLS: the table's policies don't allow this action for this user. Add a policy (or do the write on the server), don't switch RLS off.");
    if (/EADDRINUSE|address already in use|port 3000/i.test(errs)) hints.push("Port in use: another dev server is already running. Close the other terminal, or run on another port.");
    if (/process\.env|env var|environment variable|api key/i.test(errs)) hints.push("Environment variable: check the name matches exactly in .env.local, restart the dev server, and add it on your host too.");
    if (/unexpected token|syntaxerror/i.test(errs)) hints.push("Syntax error: something is misspelled or a bracket/quote isn't closed near the line shown.");
    if (/timeout|timed out|ETIMEDOUT/i.test(errs)) hints.push("Timeout: the service is slow or unreachable. Check your internet and the service's status page, then add a retry.");
    const out: Block[] = [{ type: "text", title: "Debug prompt", text: prompt }];
    if (hints.length) out.push({ type: "list", title: "Quick hints from your error", items: hints });
    const missing = [!errs && "the exact error message (copy it from the terminal or browser console)", !s(v, "expected") && "what should happen", !s(v, "files") && "the files involved"].filter(Boolean) as string[];
    out.push(
      missing.length
        ? { type: "notice", tone: "warn", text: `Add ${missing.join(", ")}: the AI finds the real cause much faster with them.` }
        : { type: "notice", tone: "good", text: "Good prompt: exact error, expected result and files. Paste it into your AI builder (Antigravity, Claude Code or a free chat) and let it explain the cause before it changes anything." },
    );
    out.push({ type: "list", title: "After the fix", items: ["Test the exact thing that was broken.", "Test one thing next to it (fixes sometimes break neighbours).", "Commit with a message like “fix: contact form sends”."] });
    return out;
  },
};

// ---------- Website Speed Checklist ----------
const speedChecklist: ToolDef = {
  kind: "checklist",
  intro: "Paste a link to test the site live, or tick items by hand. Most visitors in Nigeria are on mobile data, speed is conversion.",
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
      { id: "cache", weight: 1, text: "Static files cached with long cache headers", fix: "Cloudflare Pages does this automatically; on other hosts, check the caching settings." },
    ] },
    { title: "Server & delivery", checks: [
      { id: "cdn", weight: 2, text: "Served through a CDN (a worldwide network, e.g. Cloudflare)", fix: "Host on Cloudflare Pages (free, allows business sites) or put the site behind Cloudflare." },
      { id: "ttfb", weight: 2, text: "Server responds in under 600ms", fix: "Use static pages where possible; cache database queries." },
      { id: "https", weight: 1, text: "HTTPS with HTTP/2 or HTTP/3", fix: "Modern hosts enable this: confirm in the browser's network tab." },
    ] },
    { title: "Measured", checks: [
      { id: "psi", weight: 3, text: "PageSpeed Insights mobile score 80+", fix: "Run pagespeed.web.dev and fix the top 3 opportunities it lists." },
      { id: "lcp", weight: 3, text: "Largest Contentful Paint under 2.5s on mobile", fix: "Preload the hero image and make it small; avoid hero sliders." },
      { id: "cls", weight: 2, text: "No layout jumping while loading (CLS under 0.1)", fix: "Set width/height on images and reserve space for embeds." },
    ] },
  ],
  grades: [[85, "Fast: ready for ads"], [60, "Decent: fix the high-impact items"], [35, "Slow: visitors are leaving"], [0, "Very slow: start with images"]],
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
  grades: [[85, "Phone-ready"], [60, "Mostly there: fix the high-impact items"], [0, "Needs work on mobile"]],
};

// ---------- Domain Name Idea Generator ----------
/** The domain ideas for a set of inputs, shared by the generator and the live availability check. */
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
  intro: "Enter a keyword. You get short, brandable domain ideas with a quality check on each, then see which are actually free, live.",
  examples: [
    { label: "Beauty studio", values: { keyword: "glow", extra: "beauty", location: "lagos", tld: ".com", max: 14 } },
    { label: "Food (.ng)", values: { keyword: "mama", extra: "kitchen", location: "ikeja", tld: ".com.ng", max: 16 } },
    { label: "Solar", values: { keyword: "sun", extra: "power", location: "abuja", tld: ".ng", max: 14 } },
  ],
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
    const ng = /\.ng$/.test(s(v, "tld"));
    const verdict = (d: string) => {
      const name = d.split(".")[0];
      const flags: string[] = [];
      if (name.length > 12) flags.push("long");
      if (/(.)\1\1/.test(name) || /([a-z])\1/.test(name.slice(Math.max(0, s(v, "keyword").length - 1), s(v, "keyword").length + 1))) flags.push("double letters at the join, easy to misspell");
      if (/and/.test(name) && s(v, "extra")) flags.push("“and” is often misheard");
      if (/\d|-/.test(name)) flags.push("avoid numbers and hyphens");
      return flags.length ? `Check: ${flags.join(", ")}` : name.length <= 8 ? "Excellent: short and sayable" : "Good";
    };
    const rows = names.map((x) => [x, String(x.split(".")[0].length), verdict(x), ng ? "Buy from a NiRA-accredited registrar (list at nira.org.ng)" : `https://www.namecheap.com/domains/registration/results/?domain=${x}`]);
    return [
      { type: "table", title: `${rows.length} ideas`, columns: ["Domain", "Letters", "Quality", ng ? "Where to buy" : "Search link"], rows },
      { type: "list", title: "Pick the winner", items: ["Tap “Check availability” above and shortlist 3 that are free.", "Say each one out loud as if on a phone call, can the listener type it without asking “how do you spell that?”", "Buy it in the client's name, and check the renewal price, not just the first-year price."] },
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
