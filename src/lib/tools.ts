import type { Pillar } from "./curriculum";
import type { Tone } from "@/components/cover";

export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  /** Where it helps: one line on the job it does for you. */
  useCase: string;
  pillar: Pillar;
  /** Background colour of the tool's thumbnail. */
  tone: Tone;
  bonus?: boolean;
  live: true;
};

const t = (pillar: Pillar, slug: string, title: string, description: string, useCase: string, tone: Tone, bonus = false): ToolMeta => ({
  slug, title, description, useCase, pillar, tone, bonus, live: true,
});

export const tools: ToolMeta[] = [
  // Web Design
  t("web_design", "color-palette-generator", "Color Palette Generator", "Turn one brand colour into a full palette with contrast checks and ready CSS.", "Starting a new site or brand kit and need colours that work together.", "sand"),
  t("web_design", "wireframe-generator", "Layout / Wireframe Generator", "Get a section-by-section wireframe for any page type, plus a build prompt.", "Planning a page before you build, or showing a client the structure.", "peach"),
  t("web_design", "hero-copy-generator", "Hero Section Copy Generator", "Headline, subhead and button combinations for the top of the page.", "Writing the first thing visitors read, the part that decides if they stay.", "orange"),
  t("web_design", "font-pairing-picker", "Font Pairing Picker", "Three tested Google Font pairings per mood, with live previews and CSS.", "Choosing fonts that match the brand without guessing.", "ink"),
  t("web_design", "logo-concept-prompts", "Logo Concept Prompt Generator", "Image-model prompts for logos in five directions.", "A client needs a logo and you want strong concepts fast.", "forest"),
  t("web_design", "brand-style-guide", "Brand Style Guide Generator", "A one-page style guide: voice, colours, fonts, do's and don'ts.", "Handing a brand over to a client, or keeping AI output on-brand.", "indigo"),
  t("web_design", "design-brief-generator", "Website Design Brief Generator", "A client brief covering goals, pages, audience, look and sign-off.", "The first client call, so nothing gets missed.", "sand"),
  // Web Development
  t("web_dev", "tech-stack-picker", "Tech Stack Picker", "Answer five questions, get the right stack, hosting cost and kick-off prompt.", "Deciding what to build a project with before you start.", "indigo"),
  t("web_dev", "claude-md-generator", "CLAUDE.md Generator", "A CLAUDE.md file that gives your AI permanent memory of the project.", "Starting any build with Claude Code so it follows your rules.", "ink"),
  t("web_dev", "component-prompt-library", "Component Prompt Library", "Precise prompts for headers, pricing tables, forms, carts and more.", "Getting AI to build a component right the first time.", "forest"),
  t("web_dev", "debug-prompt-template", "Bug / Error Debug Prompt Template", "Turns an error into a debugging prompt with everything the AI needs.", "Something broke and you need the AI to find the real cause.", "ink"),
  t("web_dev", "website-speed-checklist", "Website Speed Checklist", "Score a site's speed on mobile data and get a prioritised fix list.", "Before launch, or when a client says the site is slow.", "orange"),
  t("web_dev", "responsive-design-checklist", "Responsive Design Checklist", "Make sure the site works on every phone, tablet and laptop.", "QA before handing a site to a client.", "peach"),
  t("web_dev", "domain-name-generator", "Domain Name Idea Generator", "Short, brandable domain ideas with one-click availability searches.", "Naming a new business or project site.", "sand"),
  // Web Solutions
  t("web_solutions", "website-requirements-questionnaire", "Business Website Requirements Questionnaire", "A requirements doc, content checklist and build estimate from one call.", "Scoping and pricing a client website accurately.", "forest"),
  t("web_solutions", "booking-feature-picker", "Booking System Feature Picker", "The booking features a business type needs, and what to skip.", "Building bookings for salons, clinics, gyms, hotels and more.", "peach"),
  t("web_solutions", "whatsapp-catalog-guide", "WhatsApp Catalog Setup Guide Generator", "Catalog-ready product text, setup steps and share messages.", "Getting a small business selling on WhatsApp today.", "forest"),
  t("web_solutions", "landing-page-copy-generator", "Landing Page Copy Generator", "Full landing page copy, section by section, from a short brief.", "Launching an offer, campaign or ad landing page.", "orange"),
  t("web_solutions", "pricing-layout-picker", "Pricing Page Layout Picker", "The pricing layout that converts best for your offer, with a build prompt.", "Designing a pricing page or section.", "indigo"),
  t("web_solutions", "faq-generator", "FAQ Section Generator", "FAQ answers built from the business's real facts, for the website, the chatbot and quick replies.", "Answering the doubts that stop customers from buying.", "sand"),
  t("web_solutions", "testimonial-formatter", "Testimonial Formatter", "Turn raw WhatsApp praise into clean testimonials, with a permission request and website code.", "Turning happy-customer messages into social proof.", "peach"),
  // SEO
  t("seo", "keyword-research-prompts", "Keyword Research Prompt Generator", "Keyword ideas grouped by search intent, plus a research prompt.", "Deciding which searches a business should rank for.", "indigo"),
  t("seo", "meta-tag-generator", "Meta Title / Description Generator", "Title and description options with length checks and a Google preview.", "Every page you publish: it's the ad for your page in Google.", "sand"),
  t("seo", "local-seo-checklist", "Local SEO Checklist (GBP)", "Score a business's local SEO and Google Business Profile.", "Getting a local business into the map pack.", "forest"),
  t("seo", "on-page-seo-audit", "On-Page SEO Audit", "Audit any page by its link (or pasted HTML), a 16-point SEO check with a fix for each issue.", "Checking a client's page, or your own before launch.", "ink"),
  t("seo", "blog-topic-generator", "Blog Topic Idea Generator", "Blog topics that match what customers search before they buy.", "Planning content that brings in buyers, not just readers.", "peach"),
  t("seo", "backlink-outreach-scripts", "Backlink Outreach Script Generator", "Short outreach emails for guest posts, resource pages and broken links.", "Earning links that lift a site's rankings.", "orange"),
  t("seo", "seo-content-brief", "SEO Content Brief Generator", "A complete brief: outline, keywords, links, for a page that ranks.", "Briefing a writer or your AI to write SEO content.", "indigo"),
  t("seo", "gbp-post-generator", "Google Business Profile Post Generator", "Offer, update and event posts for Google Business Profile.", "Keeping a business's Google profile active every week.", "forest"),
  // AI Business Automation
  t("automation", "automation-idea-generator", "Automation Workflow Idea Generator", "Automation ideas by business type, with trigger → action and time saved.", "Finding the first automation to sell a client.", "orange"),
  t("automation", "zapier-make-scenario-planner", "Zapier / Make Scenario Planner", "A step-by-step scenario plan with field mapping and error handling.", "Planning an automation before building it in Make or Zapier.", "indigo"),
  t("automation", "business-process-audit", "Business Process Audit", "Rank a business's tasks by how much automating them would save.", "The discovery call: show the client where their hours go.", "sand"),
  t("automation", "email-autoresponder-generator", "Email Autoresponder Script Generator", "Auto-replies plus follow-up sequences for common situations.", "Never leaving an enquiry unanswered.", "peach"),
  t("automation", "automation-roi-calculator", "Automation ROI Calculator", "Payback time and yearly savings of an automation, in Naira.", "Pricing and pitching an automation project.", "forest"),
  t("automation", "token-cost-calculator", "Token Cost Calculator (₦)", "Estimate a Claude API bill in dollars and naira, model by model.", "Pricing AI features and chatbots for clients.", "ink"),
  t("automation", "mcp-server-picker", "MCP Server Picker (business use cases)", "The MCP servers to connect so an AI can reach a business's tools.", "Giving an AI assistant access to files, payments or data.", "indigo"),
  // Lead Generation
  t("lead_gen", "cold-dm-script-generator", "Cold DM / Email Script Generator", "Short, specific cold messages and follow-ups that get replies.", "Reaching out to businesses that need what you sell.", "orange"),
  t("lead_gen", "lead-magnet-ideas", "Lead Magnet Idea Generator", "Lead magnets that attract buyers, with titles ready to use.", "Getting prospects to come to you.", "peach"),
  t("lead_gen", "prospect-list-builder", "Prospect List Builder Prompt", "Search strings, a research prompt and a sheet layout for your prospect list.", "Building a list of 100 businesses to contact.", "sand"),
  t("lead_gen", "follow-up-sequence-generator", "Outreach Follow-Up Sequence Generator", "A 4-touch follow-up sequence that adds value each time.", "Turning no-replies into conversations.", "forest"),
  t("lead_gen", "web-scraper-config", "Web Scraper Config Builder", "A scraper config and a ready-to-run Node.js script for business listings.", "Collecting public business data for a prospect list.", "indigo"),
  t("lead_gen", "lead-qualification", "Lead Qualification Checklist", "Score a lead on budget, authority, need, timing and fit.", "Deciding who gets a proposal and who gets nurtured.", "ink"),
  t("lead_gen", "landing-page-checklist", "Landing Page Conversion Checklist", "Score a landing page against conversion checks and get a fix list.", "Before running ads or sending traffic to a page.", "orange"),
  // AI Agents for Business
  t("agents", "chatbot-persona-builder", "Chatbot Persona Builder", "A production-ready system prompt: personality, rules, facts, handoff.", "Setting up any business chatbot or AI assistant.", "forest"),
  t("agents", "customer-service-scripts", "Customer Service Agent Script Generator", "Approved reply scripts for orders, complaints, refunds and more.", "Making a support agent answer consistently.", "indigo"),
  t("agents", "whatsapp-bot-flow-builder", "WhatsApp Business Bot Flow Builder", "A visual menu flow, message texts and build spec for a WhatsApp bot.", "Building an order or enquiry bot on WhatsApp.", "forest"),
  t("agents", "agent-task-decomposer", "Agent Task Decomposer", "Break a job into agent steps with tools, checks and approval points.", "Designing an agent that runs a real business task.", "sand"),
  t("agents", "faq-to-knowledge-base", "FAQ-to-Agent Knowledge Base Converter", "Turn messy FAQs into a clean knowledge base in Markdown and JSON.", "Feeding a chatbot the facts it's allowed to use.", "peach"),
  t("agents", "agent-monitoring-checklist", "Agent Uptime / Monitoring Checklist", "Make sure you know when an agent breaks, before customers do.", "Handing an agent over to a client.", "ink"),
  t("agents", "handoff-script-generator", "Agent Handoff-to-Human Script Generator", "Rules and messages for passing a chat from AI to a person.", "Keeping customers happy when the bot can't help.", "orange"),
  // Bonus: getting paid
  t("lead_gen", "proposal-generator", "Proposal Template Generator", "A client-ready proposal with scope, timeline, pricing and terms.", "Sending a proposal right after a good call.", "ink", true),
  t("lead_gen", "client-pricing-calculator", "Client Pricing Calculator (₦→$)", "Work out what to charge foreign clients in dollars from your naira goal.", "Setting your rates for dollar clients.", "forest", true),
  t("lead_gen", "invoice-generator", "Get Paid Generator", "A clean USD or NGN payment request with your payment details, print or save as PDF.", "Getting paid once the project is delivered.", "sand", true),
  t("web_solutions", "whatsapp-business-bio", "WhatsApp Business Bio Generator", "A WhatsApp Business bio inside the 139-character limit.", "Setting up a client's WhatsApp Business profile.", "peach", true),
  t("automation", "cron-schedule-generator", "Cron Schedule Generator", "Cron expressions in plain English, with Lagos-time conversion.", "Scheduling agents and automations to run on time.", "ink", true),
  t("lead_gen", "hook-line-generator", "Hook Line Generator", "Scroll-stopping first lines for TikTok, Reels, X and LinkedIn.", "Promoting your services on social media.", "orange", true),
];

/** Tools with a hand-built component; every other tool is driven by a definition in lib/tool-defs. */
export const CUSTOM_TOOL_SLUGS = [
  "claude-md-generator",
  "token-cost-calculator",
  "cold-dm-script-generator",
  "whatsapp-business-bio",
  "cron-schedule-generator",
  "hook-line-generator",
  "proposal-generator",
  "client-pricing-calculator",
  "invoice-generator",
] as const;

/** The next tool in a student's workflow, shown at the end of each tool page. */
export const nextTool: Record<string, string> = {
  "color-palette-generator": "font-pairing-picker",
  "font-pairing-picker": "brand-style-guide",
  "brand-style-guide": "logo-concept-prompts",
  "logo-concept-prompts": "design-brief-generator",
  "design-brief-generator": "wireframe-generator",
  "wireframe-generator": "hero-copy-generator",
  "hero-copy-generator": "landing-page-copy-generator",
  "tech-stack-picker": "claude-md-generator",
  "claude-md-generator": "component-prompt-library",
  "component-prompt-library": "debug-prompt-template",
  "debug-prompt-template": "responsive-design-checklist",
  "responsive-design-checklist": "website-speed-checklist",
  "website-speed-checklist": "domain-name-generator",
  "website-requirements-questionnaire": "booking-feature-picker",
  "booking-feature-picker": "whatsapp-catalog-guide",
  "whatsapp-catalog-guide": "pricing-layout-picker",
  "pricing-layout-picker": "faq-generator",
  "faq-generator": "testimonial-formatter",
  "testimonial-formatter": "proposal-generator",
  "keyword-research-prompts": "seo-content-brief",
  "seo-content-brief": "blog-topic-generator",
  "blog-topic-generator": "meta-tag-generator",
  "meta-tag-generator": "on-page-seo-audit",
  "on-page-seo-audit": "local-seo-checklist",
  "local-seo-checklist": "gbp-post-generator",
  "gbp-post-generator": "backlink-outreach-scripts",
  "business-process-audit": "automation-idea-generator",
  "automation-idea-generator": "zapier-make-scenario-planner",
  "zapier-make-scenario-planner": "email-autoresponder-generator",
  "email-autoresponder-generator": "automation-roi-calculator",
  "automation-roi-calculator": "mcp-server-picker",
  "mcp-server-picker": "token-cost-calculator",
  "prospect-list-builder": "web-scraper-config",
  "web-scraper-config": "lead-qualification",
  "lead-qualification": "lead-magnet-ideas",
  "lead-magnet-ideas": "cold-dm-script-generator",
  "cold-dm-script-generator": "follow-up-sequence-generator",
  "follow-up-sequence-generator": "landing-page-checklist",
  "landing-page-checklist": "proposal-generator",
  "chatbot-persona-builder": "faq-to-knowledge-base",
  "faq-to-knowledge-base": "customer-service-scripts",
  "customer-service-scripts": "whatsapp-bot-flow-builder",
  "whatsapp-bot-flow-builder": "handoff-script-generator",
  "handoff-script-generator": "agent-task-decomposer",
  "agent-task-decomposer": "agent-monitoring-checklist",
  "proposal-generator": "client-pricing-calculator",
  "client-pricing-calculator": "invoice-generator",
  "whatsapp-business-bio": "hook-line-generator",
  "cron-schedule-generator": "agent-monitoring-checklist",
};

export const coreTools = tools.filter((x) => !x.bonus);
export const bonusTools = tools.filter((x) => x.bonus);
/** Back-compat alias: every tool is live now. */
export const liveTools = tools;

export function getTool(slug: string) {
  return tools.find((x) => x.slug === slug);
}
