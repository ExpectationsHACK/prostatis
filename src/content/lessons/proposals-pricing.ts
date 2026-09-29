import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "proposals-pricing",
  title: "Proposals, pricing & packaging",
  minutes: 100,
  outcome: "A 3-tier package, a proposal template, and a monthly care/retainer offer — priced with confidence.",
  intro:
    "You now have skills worth a lot of money. Today you learn to package and price them so business owners understand what they're buying and say yes. The secret: sell outcomes (more bookings, less time on WhatsApp), not hours or technology.",
  sections: [
    {
      heading: "Step 1 — Package, don't list",
      blocks: [
        { t: "p", text: "A menu of skills (“design, SEO, automation…”) confuses buyers. Packages make it easy: three options, each a clear result. Most people choose the middle one." },
        { t: "table", columns: ["", "Starter", "Growth", "Complete"], rows: [["For", "Get online properly", "Get found and booked", "Run on autopilot"], ["Includes", "5-page site, WhatsApp, domain, basic SEO", "+ booking/payments, GBP, 3 SEO articles", "+ automations, AI agent, CRM, monitoring"], ["Example price", "₦250,000", "₦500,000", "₦900,000 + monthly care"]] },
        { t: "tip", text: "Prices are examples only — they vary by city, niche and your portfolio. Use the calculator below with your own numbers." },
        { t: "figure", figure: { tool: "proposal-generator", caption: "A proposal: their situation, the outcome, three options, timeline, price and next step." } },
      ],
    },
    {
      heading: "Step 2 — Price it",
      blocks: [
        { t: "p", text: "Three ways to check a price:" },
        { t: "list", items: ["**Cost-based**: your hours × your hourly rate + tools. The minimum you can charge.", "**Market-based**: what others charge for similar work in your area.", "**Value-based**: what the result is worth to the client. If a booking system saves ₦300,000 a month in no-shows, ₦400,000 is a bargain."] },
        { t: "tool", slug: "client-pricing-calculator", why: "Enter hours, costs, and the client's value — see a floor price, a fair price and a value-based price." },
        { t: "warn", text: "Don't underprice to win. Very low prices attract difficult clients and make you look inexperienced. Charge fairly and deliver excellently." },
      ],
    },
    {
      heading: "Step 3 — Monthly retainers",
      blocks: [
        { t: "p", text: "One-off projects end. **Retainers** — monthly care plans — give you steady income. Offer one with every project." },
        { t: "list", items: ["Hosting check, updates and backups", "Uptime and automation monitoring (Day 19)", "Content changes (up to X per month)", "Monthly SEO report and 1–2 articles", "Agent knowledge-base updates"] },
        { t: "tool", slug: "pricing-layout-picker", why: "Choose how to present your tiers on your own website." },
      ],
    },
    {
      heading: "Step 4 — Write the proposal",
      blocks: [
        { t: "p", text: "A good proposal is short (2–4 pages), about the client, and makes saying yes easy." },
        { t: "steps", items: [
          { title: "Their situation", detail: "What they told you, in their words." },
          { title: "The outcome", detail: "What will be different after the project." },
          { title: "The options", detail: "Your three packages, recommended one highlighted." },
          { title: "Timeline and process", detail: "Milestones and what you need from them." },
          { title: "Price and payment terms", detail: "E.g. 50% to start, 50% before launch." },
          { title: "Next step", detail: "“Reply 'approved' and I'll send the deposit details.”" },
        ] },
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal to send or print." },
      ],
    },
    {
      heading: "Selling in dollars",
      blocks: [
        { t: "p", text: "The same packages sell to clients abroad — small businesses in the UK, US and Canada, including Nigerians in the diaspora. Price in USD, get paid through Payoneer, Grey, Wise or Paystack (for supported currencies), and show your portfolio and time-zone overlap clearly." },
      ],
    },
  ],
  task: {
    title: "Create your offer",
    steps: ["Define three packages for your niche, each with a clear outcome.", "Price them with the calculator.", "Define a monthly care plan.", "Write a proposal template with the generator.", "Put your packages on your portfolio site (or a pricing page)."],
    done: ["Each package is described as a result, not a list of tech", "I know my floor price and I won't go below it", "I have a monthly care plan", "My proposal is 2–4 pages with a clear next step"],
  },
  resources: [
    { label: "Payoneer", url: "https://www.payoneer.com", note: "Receive payments from international clients." },
    { label: "Grey", url: "https://grey.co", note: "Foreign accounts for Africans to receive USD, GBP, EUR." },
    { label: "Paystack — Supported currencies", url: "https://paystack.com/docs/api/#supported-currency", note: "Which currencies Paystack supports." },
  ],
  quiz: [
    { q: "Why offer three packages?", options: ["To confuse clients", "It's easy to choose and most people pick the middle option", "It's a legal requirement", "To charge less"], answer: 1, why: "Clear tiers simplify the decision." },
    { q: "What does value-based pricing look at?", options: ["Your hours only", "What the result is worth to the client", "Competitors' logos", "The weather"], answer: 1, why: "Price relative to the value created." },
    { q: "Why avoid underpricing?", options: ["It attracts difficult clients and looks inexperienced", "It's illegal", "It's always good", "Clients prefer it"], answer: 0, why: "Fair prices signal quality and keep you in business." },
    { q: "What is a retainer?", options: ["A one-time fee", "A monthly care plan for ongoing work", "A type of website", "A deposit"], answer: 1, why: "Retainers give steady income." },
    { q: "What should the last part of a proposal be?", options: ["Your life story", "A clear next step to say yes", "A long list of technologies", "Nothing"], answer: 1, why: "Make saying yes easy." },
  ],
};

export default lesson;
