import type { ThumbKind } from "@/components/art/product-thumb";

export type Pillar = "web_design" | "web_dev" | "web_solutions" | "seo" | "automation" | "lead_gen" | "agents";

export const pillars: { id: Pillar; title: string; short: string; blurb: string }[] = [
  { id: "web_design", title: "Web Design", short: "Design", blurb: "Design direction, brand kits and layouts that look agency-made." },
  { id: "web_dev", title: "Web Development", short: "Dev", blurb: "Build and launch real websites and web apps with AI." },
  { id: "web_solutions", title: "Web Solutions", short: "Solutions", blurb: "Booking systems, WhatsApp catalogs and storefronts for local businesses." },
  { id: "seo", title: "SEO", short: "SEO", blurb: "Keywords, on-page SEO, local SEO and Google Business Profile." },
  { id: "automation", title: "AI Business Automation", short: "Automation", blurb: "Map a business's workflows and automate the busywork." },
  { id: "lead_gen", title: "Lead Generation", short: "Leads", blurb: "Find, qualify and reach the businesses that will pay you." },
  { id: "agents", title: "AI Agents for Business", short: "Agents", blurb: "Chatbots, WhatsApp bots and customer-service agents." },
];

export function getPillar(id: Pillar) {
  return pillars.find((p) => p.id === id)!;
}

/** What a lesson's thumbnail shows: a tool's output, or a finished product. */
export type Thumb = { tool: string } | { product: ThumbKind };

export type Module = {
  day: number;
  /** Id of the written lesson in src/content/lessons. Tracks share lessons where they overlap. */
  lesson: string;
  week: number;
  title: string;
  summary: string;
  pillar: Pillar;
  outcomes: string[];
  thumb: Thumb;
};

export type Track = {
  id: "fast_track" | "main_track";
  name: string;
  length: string;
  blurb: string;
  weeks: { week: number; title: string; blurb: string }[];
  modules: Module[];
};

// ---------- Fast Track: 14 days, ~55% of the Main Track ----------
export const fastTrack: Track = {
  id: "fast_track",
  name: "Fast Track",
  length: "14 days",
  blurb: "One lesson a day, free tools only. Your first page is live on Day 3 and a full business website by Day 4. By Day 14 you have built a store, a booking system and a web app, launched your portfolio and pitched real businesses.",
  weeks: [
    { week: 1, title: "Design & build websites", blurb: "Brand, page plan, your free AI build kit, a five-page business site and a landing page, live on the internet and updating itself." },
    { week: 2, title: "Web solutions, SEO & shipping", blurb: "Bookings with deposits, an online store and a web app, then Google, your portfolio, your price and your first pitches." },
  ],
  modules: [
    { day: 1, lesson: "design-brand-kit", week: 1, pillar: "web_design", title: "Design direction & brand kit", summary: "Give a real business one look: colours, fonts, a logo idea and a voice, with free AI.", outcomes: ["Colour palette that passes the readability check", "Two fonts", "Logo idea and voice words"], thumb: { tool: "color-palette-generator" } },
    { day: 2, lesson: "layouts-wireframes-copy", week: 1, pillar: "web_design", title: "Plan the page & write the words", summary: "Sketch the home page as boxes and write the words that make visitors stay and order.", outcomes: ["Home page wireframe", "Headline, subhead and button", "Section-by-section words"], thumb: { tool: "hero-copy-generator" } },
    { day: 3, lesson: "ai-dev-setup", week: 1, pillar: "web_dev", title: "Your free AI build kit & first live page", summary: "A free AI chat writes the page, you save it, and it goes live on the internet the same day. No coding, no cost.", outcomes: ["Free tools set up", "Project brief for the AI", "First page live on the internet"], thumb: { tool: "tech-stack-picker" } },
    { day: 4, lesson: "build-business-site", week: 1, pillar: "web_dev", title: "Build the full business website", summary: "Home, services, about, gallery and contact, with WhatsApp buttons and a form that really delivers.", outcomes: ["5 pages live", "WhatsApp click-to-chat", "Contact form that delivers"], thumb: { product: "clinic" } },
    { day: 5, lesson: "landing-pages", week: 1, pillar: "web_solutions", title: "Landing pages that convert", summary: "One offer, one action: plan, write and publish a landing page that sells.", outcomes: ["Landing page words", "Page live", "Checker passed"], thumb: { tool: "landing-page-copy-generator" } },
    { day: 6, lesson: "responsive-fast-accessible", week: 1, pillar: "web_dev", title: "Fast on any phone, usable by everyone", summary: "Make it quick on 4G, right on every phone and usable by everyone.", outcomes: ["Phone check passed", "Photos made light", "Speed score 80+"], thumb: { tool: "responsive-design-checklist" } },
    { day: 7, lesson: "deploy-domain", week: 1, pillar: "web_dev", title: "Go live properly: auto-updates, visitors & domains", summary: "GitHub keeps every version and updates the site by itself; free visitor counts; connect a client's domain.", outcomes: ["Every change goes live by itself", "Visitor counts on", "Domain steps ready for a client"], thumb: { product: "coach" } },
    { day: 8, lesson: "booking-systems", week: 2, pillar: "web_solutions", title: "Bookings & deposits", summary: "Free booking calendar, a Paystack deposit and reminders, so customers stop not showing up.", outcomes: ["Booking page", "Deposit with Paystack", "Reminders"], thumb: { product: "salon" } },
    { day: 9, lesson: "online-store-paystack", week: 2, pillar: "web_solutions", title: "Online stores & Paystack checkout", summary: "A free no-code shop first, then a custom store whose payments your own server checks.", outcomes: ["Paystack Storefront", "Custom store with checkout", "Payments checked by your server"], thumb: { product: "store" } },
    { day: 10, lesson: "web-apps-auth-db", week: 2, pillar: "web_solutions", title: "Web apps with logins & databases", summary: "Sign-in and a private database where each customer sees only their own records, free with Supabase.", outcomes: ["Sign-in", "Private customer records", "Admin page"], thumb: { product: "dashboard" } },
    { day: 11, lesson: "seo-keywords-onpage", week: 2, pillar: "seo", title: "Get found on Google", summary: "Find the words customers search, put them where Google reads, and tell Google the site exists.", outcomes: ["Keyword map", "Titles + descriptions", "Sitemap submitted"], thumb: { tool: "meta-tag-generator" } },
    { day: 12, lesson: "portfolio-site", week: 2, pillar: "web_dev", title: "Build your own portfolio", summary: "A one-page portfolio that shows your work honestly and gets you hired.", outcomes: ["Portfolio live", "2 case studies", "Hire-me button"], thumb: { product: "portfolio" } },
    { day: 13, lesson: "package-for-client", week: 2, pillar: "lead_gen", title: "Package, price & pitch", summary: "Scope a package, set your price, write the proposal and pitch real businesses.", outcomes: ["Website package", "Your price levels", "10 pitches sent"], thumb: { tool: "client-pricing-calculator" } },
    { day: 14, lesson: "deliver-get-paid", week: 2, pillar: "web_solutions", title: "Deliver & get paid", summary: "Deliver, hand over and collect every naira on time, then ask for the testimonial.", outcomes: ["Handover done", "Paid in full", "Testimonial asked"], thumb: { tool: "invoice-generator" } },
  ],
};

// ---------- Main Track: one month, the full offer ----------
export const mainTrack: Track = {
  id: "main_track",
  name: "Main Track",
  length: "1 month",
  blurb: "Everything in the Fast Track, plus SEO that ranks businesses on Google, automations that save them hours and AI agents that answer their customers day and night, sold together as one package. Free tools all the way.",
  weeks: [
    { week: 1, title: "Design & build", blurb: "Brand, page plan, your free AI build kit, a business website and landing pages, live and updating itself." },
    { week: 2, title: "Web solutions & SEO", blurb: "Bookings, online stores and web apps, then the SEO and Google profile that make Google show them." },
    { week: 3, title: "Automation & AI agents", blurb: "Automations that save a business hours and AI agents that answer its customers day and night." },
    { week: 4, title: "Portfolio, sales & shipping", blurb: "Your portfolio, then find clients, win them with a proposal, deliver the full package and get paid." },
  ],
  modules: [
    { day: 1, lesson: "design-brand-kit", week: 1, pillar: "web_design", title: "Design direction & brand kits", summary: "Palettes, fonts, a logo idea and a voice, in a style guide clients can keep.", outcomes: ["Brand style guide", "Palette + fonts", "Logo idea"], thumb: { tool: "brand-style-guide" } },
    { day: 2, lesson: "layouts-wireframes-copy", week: 1, pillar: "web_design", title: "Plan the page & write the words", summary: "Wireframe the page and write words that convert, before you build a single thing.", outcomes: ["Wireframe", "Hero + section words", "Design brief"], thumb: { tool: "wireframe-generator" } },
    { day: 3, lesson: "ai-dev-setup", week: 1, pillar: "web_dev", title: "Your free AI build kit & first live page", summary: "A free AI chat, a code editor and free hosting: your first page live the same day.", outcomes: ["Free tools set up", "Project brief", "First page live"], thumb: { tool: "claude-md-generator" } },
    { day: 4, lesson: "build-business-site", week: 1, pillar: "web_dev", title: "Build the full business website", summary: "Five pages with a shared header and footer, WhatsApp buttons and a working form.", outcomes: ["5 pages live", "Reusable header + footer", "Form that delivers"], thumb: { product: "restaurant" } },
    { day: 5, lesson: "landing-pages", week: 1, pillar: "web_solutions", title: "Landing pages that convert", summary: "One offer, one action: landing pages for promos, launches and adverts.", outcomes: ["Landing page words", "Page live", "Checker passed"], thumb: { tool: "landing-page-copy-generator" } },
    { day: 6, lesson: "responsive-fast-accessible", week: 1, pillar: "web_dev", title: "Fast on any phone, usable by everyone", summary: "Speed, phones and accessibility: the checks that separate pros from hobbyists.", outcomes: ["Speed score 80+", "Phone check", "Accessibility fixes"], thumb: { tool: "website-speed-checklist" } },
    { day: 7, lesson: "deploy-domain", week: 1, pillar: "web_dev", title: "Project: go live properly", summary: "GitHub versions, automatic updates, visitor counts and the full client-domain setup.", outcomes: ["Auto-updating site", "Visitor counts", "Domain steps ready"], thumb: { tool: "domain-name-generator" } },
    { day: 8, lesson: "booking-systems", week: 2, pillar: "web_solutions", title: "Bookings & deposits", summary: "Free booking calendars, Paystack deposits and reminders for salons, tailors, clinics and gyms.", outcomes: ["Booking page", "Deposit with Paystack", "Reminders"], thumb: { product: "salon" } },
    { day: 9, lesson: "online-store-paystack", week: 2, pillar: "web_solutions", title: "Online stores & Paystack checkout", summary: "A free no-code shop, then a custom store whose payments your own server checks.", outcomes: ["Paystack Storefront", "Custom checkout", "Server-checked payments"], thumb: { product: "store" } },
    { day: 10, lesson: "web-apps-auth-db", week: 2, pillar: "web_solutions", title: "Web apps with logins & databases", summary: "Customer portals with sign-in and private records, free with Supabase.", outcomes: ["Sign-in", "Private records", "Admin page"], thumb: { product: "dashboard" } },
    { day: 11, lesson: "seo-keywords-onpage", week: 2, pillar: "seo", title: "Get found on Google", summary: "Keywords, titles, headings, business details and a sitemap Google accepts.", outcomes: ["Keyword map", "On-page fixes", "Sitemap submitted"], thumb: { tool: "keyword-research-prompts" } },
    { day: 12, lesson: "local-seo-gbp", week: 2, pillar: "seo", title: "Local SEO & Google Business Profile", summary: "Get a business onto Google Maps with a complete profile and a steady flow of reviews.", outcomes: ["Complete profile", "Review system", "Matching details everywhere"], thumb: { product: "gbp" } },
    { day: 13, lesson: "content-seo-audit", week: 2, pillar: "seo", title: "Project: content that ranks + SEO audit", summary: "Helpful articles and a plain-English audit of a real business website.", outcomes: ["3 helpful articles", "Full site audit", "Report for the owner"], thumb: { tool: "on-page-seo-audit" } },
    { day: 14, lesson: "map-workflows", week: 3, pillar: "automation", title: "Map a business's workflows", summary: "Find the hours a business wastes and what's worth automating.", outcomes: ["Process audit", "Automation map", "Hours and naira saved"], thumb: { tool: "business-process-audit" } },
    { day: 15, lesson: "automations-make-zapier-n8n", week: 3, pillar: "automation", title: "Automations with Make (free)", summary: "Triggers, filters and actions that run the busywork, on Make's free plan.", outcomes: ["3 live automations", "Error alerts", "Handover note"], thumb: { tool: "zapier-make-scenario-planner" } },
    { day: 16, lesson: "agents-personas-kb", week: 3, pillar: "agents", title: "AI agents: personas & knowledge bases", summary: "Give an AI assistant a job, rules and the only facts it may use, then test it.", outcomes: ["Agent instructions", "Knowledge base", "20-question test"], thumb: { tool: "chatbot-persona-builder" } },
    { day: 17, lesson: "whatsapp-bots-cs-agents", week: 3, pillar: "agents", title: "WhatsApp & website chat agents", summary: "A properly set-up WhatsApp Business, a bot flow and a free website chat agent with a human handoff.", outcomes: ["WhatsApp Business set up", "Website chat agent", "Human handoff"], thumb: { product: "wabot" } },
    { day: 18, lesson: "connect-the-system", week: 3, pillar: "automation", title: "Connect website + automation + agent", summary: "One system: enquiry in, reply out, customer list updated once, owner alerted only when it matters.", outcomes: ["Connected system", "Customer list", "Smart alerts"], thumb: { product: "crm" } },
    { day: 19, lesson: "monitoring-handover", week: 3, pillar: "agents", title: "Project: monitoring & handover", summary: "Uptime alerts, spending limits and a runbook, so the system keeps working.", outcomes: ["Monitoring live", "Runbook", "Handover done"], thumb: { tool: "agent-monitoring-checklist" } },
    { day: 20, lesson: "portfolio-site", week: 4, pillar: "web_dev", title: "Build your own portfolio", summary: "A one-page portfolio with honest case studies from this month, ready to send to prospects.", outcomes: ["Portfolio live", "2 case studies", "Hire-me button"], thumb: { product: "portfolio" } },
    { day: 21, lesson: "find-prospects", week: 4, pillar: "lead_gen", title: "Find prospects: lists & research", summary: "Build a list of 100 businesses that need exactly what you sell.", outcomes: ["Prospect list of 100", "Scores", "Top 20 researched"], thumb: { product: "leadgen" } },
    { day: 22, lesson: "lead-magnets-qualification", week: 4, pillar: "lead_gen", title: "Lead magnets & qualification", summary: "Attract owners with a free check-up, then qualify who gets a proposal.", outcomes: ["Free offer page", "Qualification questions", "Booking link"], thumb: { tool: "lead-magnet-ideas" } },
    { day: 23, lesson: "cold-outreach", week: 4, pillar: "lead_gen", title: "Cold outreach & follow-ups", summary: "Messages and follow-ups that get replies without spamming.", outcomes: ["10 messages sent", "4-step follow-up plan", "Tracker"], thumb: { tool: "cold-dm-script-generator" } },
    { day: 24, lesson: "proposals-pricing", week: 4, pillar: "lead_gen", title: "Proposals, pricing & packaging", summary: "Bundle website + SEO + automation + agent into packages that sell.", outcomes: ["3 packages", "Proposal template", "Care plan"], thumb: { tool: "proposal-generator" } },
    { day: 25, lesson: "deliver-get-paid", week: 4, pillar: "web_solutions", title: "Deliver & get paid", summary: "Delivery, getting paid on time, payment reminders and care plans.", outcomes: ["Delivery checklist", "Get-paid system", "Care plan offer"], thumb: { product: "invoicing" } },
    { day: 26, lesson: "capstone", week: 4, pillar: "web_solutions", title: "Capstone: ship a full client project", summary: "Website + SEO + automation + agent for one real business, shipped and paid.", outcomes: ["Full project shipped", "Case study", "Testimonial"], thumb: { tool: "automation-roi-calculator" } },
  ],
};

export const tracks = [fastTrack, mainTrack] as const;

export function getTrack(id: string) {
  return tracks.find((t) => t.id === id) ?? fastTrack;
}

/** Where a pillar is taught in each track, for "learn it" links from tools. */
export function lessonsForPillar(p: Pillar) {
  return tracks
    .map((t) => ({ track: t, module: t.modules.find((m) => m.pillar === p) }))
    .filter((x): x is { track: Track; module: Module } => Boolean(x.module));
}
