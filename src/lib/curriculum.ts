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
  blurb: "One lesson a day. Your first site is live on your own domain by day 7. By day 14 you have built a store, a booking system and a web app, and pitched real businesses.",
  weeks: [
    { week: 1, title: "Design & build websites", blurb: "Brand, layout, your AI setup, a five-page business site and a landing page, live on your own domain." },
    { week: 2, title: "Web solutions, SEO & shipping", blurb: "Booking systems, online stores and web apps, then SEO, your portfolio, your price and your first pitches." },
  ],
  modules: [
    { day: 1, lesson: "design-brand-kit", week: 1, pillar: "web_design", title: "Design direction & brand kit", summary: "Pick a look that fits the business: colours, fonts and a logo concept, with AI.", outcomes: ["Colour palette with contrast checks", "Font pairing", "Logo concept prompts"], thumb: { tool: "color-palette-generator" } },
    { day: 2, lesson: "layouts-wireframes-copy", week: 1, pillar: "web_design", title: "Layouts & hero copy", summary: "Wireframe the pages and write the words at the top that make people stay.", outcomes: ["Home page wireframe", "Hero headline + button", "Section-by-section outline"], thumb: { tool: "hero-copy-generator" } },
    { day: 3, lesson: "ai-dev-setup", week: 1, pillar: "web_dev", title: "Your AI build setup", summary: "Set up Claude Code, pick the stack and build your first page from a prompt.", outcomes: ["Tools installed", "Project + CLAUDE.md", "First page live locally"], thumb: { tool: "tech-stack-picker" } },
    { day: 4, lesson: "build-business-site", week: 1, pillar: "web_dev", title: "Build a 5-page business website", summary: "Home, services, about, gallery, contact, built with AI, on real content.", outcomes: ["5 pages built", "WhatsApp click-to-chat", "Contact form that delivers"], thumb: { product: "clinic" } },
    { day: 5, lesson: "landing-pages", week: 1, pillar: "web_solutions", title: "Landing pages that convert", summary: "One offer, one action: plan, write and build a landing page that sells.", outcomes: ["Landing page copy", "Page built + deployed", "Checklist passed"], thumb: { tool: "landing-page-copy-generator" } },
    { day: 6, lesson: "responsive-fast-accessible", week: 1, pillar: "web_dev", title: "Mobile, speed & polish", summary: "Make it fast on 4G and perfect on every phone.", outcomes: ["Mobile QA passed", "Images optimised", "Speed score 80+"], thumb: { tool: "responsive-design-checklist" } },
    { day: 7, lesson: "deploy-domain", week: 1, pillar: "web_dev", title: "Deploy on your own domain", summary: "Buy the domain, deploy on Vercel, connect HTTPS, the site is live.", outcomes: ["Domain connected", "Live on HTTPS", "Analytics installed"], thumb: { product: "coach" } },
    { day: 8, lesson: "booking-systems", week: 2, pillar: "web_solutions", title: "Booking systems & appointments", summary: "Calendars, deposits and reminders for salons, clinics and gyms.", outcomes: ["Booking flow", "Deposit with Paystack", "Reminders"], thumb: { product: "salon" } },
    { day: 9, lesson: "online-store-paystack", week: 2, pillar: "web_solutions", title: "Online stores & Paystack checkout", summary: "Products, cart, checkout and order notifications.", outcomes: ["Product catalogue", "Cart + checkout", "Order emails"], thumb: { product: "store" } },
    { day: 10, lesson: "web-apps-auth-db", week: 2, pillar: "web_solutions", title: "Web apps with logins & databases", summary: "Sign-in, a database and an admin view with Supabase, the builds clients pay most for.", outcomes: ["Auth + database", "Dashboard", "Admin page"], thumb: { product: "dashboard" } },
    { day: 11, lesson: "seo-keywords-onpage", week: 2, pillar: "seo", title: "SEO basics: keywords, titles & meta", summary: "Find what customers search and put it where Google looks.", outcomes: ["Keyword list", "Titles + meta descriptions", "Sitemap submitted"], thumb: { tool: "meta-tag-generator" } },
    { day: 12, lesson: "portfolio-site", week: 2, pillar: "web_dev", title: "Build your own portfolio", summary: "A one-page portfolio that shows your work and gets you hired.", outcomes: ["Portfolio site live", "2 case studies", "Hire-me button"], thumb: { product: "portfolio" } },
    { day: 13, lesson: "package-for-client", week: 2, pillar: "lead_gen", title: "Package, price & pitch", summary: "Scope a package, set your price, write the proposal and pitch real businesses.", outcomes: ["Website package", "Your rate card", "10 pitches sent"], thumb: { tool: "client-pricing-calculator" } },
    { day: 14, lesson: "deliver-get-paid", week: 2, pillar: "web_solutions", title: "Ship & get paid", summary: "Deliver, hand over and get paid, then ask for the testimonial.", outcomes: ["Handover done", "Paid in full", "Testimonial collected"], thumb: { tool: "invoice-generator" } },
  ],
};

// ---------- Main Track: one month, the full offer ----------
export const mainTrack: Track = {
  id: "main_track",
  name: "Main Track",
  length: "1 month",
  blurb: "Everything in the Fast Track, plus SEO that ranks businesses on Google, automations that save them hours and AI agents that answer their customers 24/7, sold together as one package.",
  weeks: [
    { week: 1, title: "Design & build", blurb: "Brand, layout, your AI setup, a business website and landing pages, live on your own domain." },
    { week: 2, title: "Web solutions & SEO", blurb: "Online stores, booking systems and web apps, then the SEO that makes Google show them." },
    { week: 3, title: "Automation & AI agents", blurb: "Automations that save a business hours and AI agents that answer its customers 24/7." },
    { week: 4, title: "Lead gen, sales & shipping", blurb: "Find clients, win them with a proposal, then deliver the full package and get paid." },
  ],
  modules: [
    { day: 1, lesson: "design-brand-kit", week: 1, pillar: "web_design", title: "Design direction & brand kits", summary: "Moodboards, palettes, fonts and a style guide clients can keep.", outcomes: ["Brand style guide", "Palette + fonts", "Logo concepts"], thumb: { tool: "brand-style-guide" } },
    { day: 2, lesson: "layouts-wireframes-copy", week: 1, pillar: "web_design", title: "Layouts, wireframes & conversion copy", summary: "Plan pages that convert before you build a single one.", outcomes: ["Wireframes for 3 page types", "Hero + section copy", "Design brief"], thumb: { tool: "wireframe-generator" } },
    { day: 3, lesson: "ai-dev-setup", week: 1, pillar: "web_dev", title: "Your AI dev setup", summary: "Claude Code, CLAUDE.md, Git and the stack you'll use all month.", outcomes: ["Dev environment", "CLAUDE.md", "First commit"], thumb: { tool: "claude-md-generator" } },
    { day: 4, lesson: "build-business-site", week: 1, pillar: "web_dev", title: "Build a business website with AI", summary: "A full restaurant-style site with menu, ordering and contact.", outcomes: ["Multi-page site", "Reusable components", "Forms that work"], thumb: { product: "restaurant" } },
    { day: 5, lesson: "landing-pages", week: 1, pillar: "web_solutions", title: "Landing pages that convert", summary: "One offer, one action: landing pages for promos, launches and ad campaigns.", outcomes: ["Landing page copy", "Page built + deployed", "Checklist passed"], thumb: { tool: "landing-page-copy-generator" } },
    { day: 6, lesson: "responsive-fast-accessible", week: 1, pillar: "web_dev", title: "Responsive, fast & accessible", summary: "Speed, mobile and accessibility: the checks that separate pros from hobbyists.", outcomes: ["Speed score 90+", "Mobile QA", "Accessibility fixes"], thumb: { tool: "website-speed-checklist" } },
    { day: 7, lesson: "deploy-domain", week: 1, pillar: "web_dev", title: "Project: deploy on your own domain", summary: "Domain, DNS, HTTPS, analytics: shipped like an agency would.", outcomes: ["Domain + DNS", "Live deployment", "Weekly review"], thumb: { tool: "domain-name-generator" } },
    { day: 8, lesson: "booking-systems", week: 2, pillar: "web_solutions", title: "Booking systems & appointments", summary: "Calendars, deposits and reminders for salons, clinics and gyms.", outcomes: ["Booking flow", "Deposit with Paystack", "Reminders"], thumb: { product: "salon" } },
    { day: 9, lesson: "online-store-paystack", week: 2, pillar: "web_solutions", title: "Online stores & Paystack checkout", summary: "Products, cart, checkout and order notifications.", outcomes: ["Product catalogue", "Cart + checkout", "Order emails"], thumb: { product: "store" } },
    { day: 10, lesson: "web-apps-auth-db", week: 2, pillar: "web_solutions", title: "Web apps with logins & databases", summary: "Dashboards and portals with Supabase, the builds clients pay most for.", outcomes: ["Auth + database", "Dashboard", "Admin panel"], thumb: { product: "dashboard" } },
    { day: 11, lesson: "seo-keywords-onpage", week: 2, pillar: "seo", title: "SEO: keywords & on-page", summary: "Keyword research, titles, headings, content structure and schema.", outcomes: ["Keyword map", "On-page fixes", "Schema added"], thumb: { tool: "keyword-research-prompts" } },
    { day: 12, lesson: "local-seo-gbp", week: 2, pillar: "seo", title: "Local SEO & Google Business Profile", summary: "Map-pack rankings, reviews and citations for local businesses.", outcomes: ["Optimised GBP", "Review system", "Local citations"], thumb: { product: "gbp" } },
    { day: 13, lesson: "content-seo-audit", week: 2, pillar: "seo", title: "Project: content that ranks + SEO audit", summary: "Content briefs, blog posts and a full audit of a real site.", outcomes: ["3 SEO articles", "Full site audit", "Weekly review"], thumb: { tool: "on-page-seo-audit" } },
    { day: 14, lesson: "map-workflows", week: 3, pillar: "automation", title: "Map a business's workflows", summary: "Find the hours a business wastes and what's worth automating.", outcomes: ["Process audit", "Automation map", "ROI estimate"], thumb: { tool: "business-process-audit" } },
    { day: 15, lesson: "automations-make-zapier-n8n", week: 3, pillar: "automation", title: "Automations with Make, Zapier & n8n", summary: "Triggers, filters and actions that run the busywork.", outcomes: ["3 live automations", "Error handling", "Client handover doc"], thumb: { tool: "zapier-make-scenario-planner" } },
    { day: 16, lesson: "agents-personas-kb", week: 3, pillar: "agents", title: "AI agents: personas & knowledge bases", summary: "Give an agent a job, rules and the facts it's allowed to use.", outcomes: ["System prompt", "Knowledge base", "Test script"], thumb: { tool: "chatbot-persona-builder" } },
    { day: 17, lesson: "whatsapp-bots-cs-agents", week: 3, pillar: "agents", title: "WhatsApp bots & customer-service agents", summary: "Order bots and support agents that answer customers day and night.", outcomes: ["WhatsApp bot flow", "Support agent", "Human handoff"], thumb: { product: "wabot" } },
    { day: 18, lesson: "connect-the-system", week: 3, pillar: "automation", title: "Connect website + automation + agent", summary: "One system: enquiry in, agent replies, CRM updated, owner notified.", outcomes: ["Connected system", "CRM pipeline", "Notifications"], thumb: { product: "crm" } },
    { day: 19, lesson: "monitoring-handover", week: 3, pillar: "agents", title: "Project: monitoring & handover", summary: "Uptime, logs, costs and a runbook, so the system keeps working.", outcomes: ["Monitoring live", "Runbook", "Weekly review"], thumb: { tool: "agent-monitoring-checklist" } },
    { day: 20, lesson: "find-prospects", week: 4, pillar: "lead_gen", title: "Find prospects: lists & scraping", summary: "Build a list of 100 businesses that need exactly what you sell.", outcomes: ["Prospect list of 100", "Lead scores", "Research prompts"], thumb: { product: "leadgen" } },
    { day: 21, lesson: "lead-magnets-qualification", week: 4, pillar: "lead_gen", title: "Lead magnets & qualification", summary: "Attract buyers with a free audit, then qualify who gets a proposal.", outcomes: ["Lead magnet", "Qualification script", "Booking link"], thumb: { tool: "lead-magnet-ideas" } },
    { day: 22, lesson: "cold-outreach", week: 4, pillar: "lead_gen", title: "Cold outreach & follow-ups", summary: "DMs, emails and follow-ups that get replies without spamming.", outcomes: ["Outreach scripts", "4-touch sequence", "Tracking sheet"], thumb: { tool: "cold-dm-script-generator" } },
    { day: 23, lesson: "proposals-pricing", week: 4, pillar: "lead_gen", title: "Proposals, pricing & packaging", summary: "Bundle website + SEO + automation + agent into packages that sell.", outcomes: ["3-tier package", "Proposal template", "Retainer offer"], thumb: { tool: "proposal-generator" } },
    { day: 24, lesson: "deliver-get-paid", week: 4, pillar: "web_solutions", title: "Deliver & get paid", summary: "Delivery, getting paid, payment follow-up and retainers.", outcomes: ["Delivery checklist", "Get-paid system set up", "Retainer signed"], thumb: { product: "invoicing" } },
    { day: 25, lesson: "capstone", week: 4, pillar: "web_solutions", title: "Capstone: ship a full client project", summary: "Website + SEO + automation + agent for one real business, shipped and paid.", outcomes: ["Full project shipped", "Case study", "Testimonial"], thumb: { tool: "automation-roi-calculator" } },
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
