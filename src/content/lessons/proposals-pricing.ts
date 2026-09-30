import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "proposals-pricing",
  title: "Proposals, pricing & packaging",
  minutes: 100,
  outcome: "Three clear packages, prices you can defend, a monthly care plan, and a proposal template that makes saying yes easy.",
  intro:
    "You now have skills worth real money. Today you'll learn to **package** and **price** them so business owners understand what they're buying and say yes. The secret: sell **outcomes**, more bookings, fewer hours on WhatsApp, not hours or technology. Nobody wakes up wanting “Next.js”; they want more customers.",
  youNeed: ["Your list of skills from Weeks 1–3", "What you spent in time and tools on your practice projects", "Prices local competitors charge (check 3 of them)", "The Get Paid and Proposal tools"],
  sections: [
    {
      heading: "Step 1: Package, don't list",
      blocks: [
        { t: "define", term: "Package", meaning: "A bundle of services sold together as one clear result at one price, for example “Get online properly: 5-page site, WhatsApp button, domain and Google profile”.", like: "a combo meal: rice, chicken and drink for one price, instead of ordering each item separately." },
        { t: "p", text: "A menu of skills (“design, SEO, automation…”) confuses buyers. Packages make it easy: **three options**, each a clear result. Many buyers choose the middle one." },
        { t: "figure", figure: { diagram: "pricing-tiers", caption: "Three levels, the middle one highlighted." } },
        { t: "table", columns: ["", "Starter", "Growth", "Complete"], rows: [["For", "Get online properly", "Get found and booked", "Run on autopilot"], ["Includes", "5-page site, WhatsApp, domain, basic SEO", "+ booking or payments, Google profile, 3 articles", "+ automations, AI agent, customer list, monitoring"], ["Example price", "₦250,000", "₦500,000", "₦900,000 + monthly care"]] },
        { t: "tip", text: "These prices are **examples only**. Real prices depend on your city, niche and portfolio. Use the calculator below with your own numbers." },
      ],
    },
    {
      heading: "Step 2: Price it",
      blocks: [
        { t: "p", text: "Check your price three ways:" },
        { t: "list", items: ["**Cost-based**: your hours × a fair hourly rate + tool costs. This is your **floor**, the minimum you can charge.", "**Market-based**: what others charge for similar work in your area.", "**Value-based**: what the result is worth to the client. If a booking system saves ₦300,000 a month in no-shows, ₦400,000 is a bargain."] },
        { t: "define", term: "Value-based pricing", meaning: "Setting your price by what the result is worth to the client, not only by your hours.", like: "a generator installer charging for keeping a shop's sales flowing during outages, not just for the hours of wiring." },
        { t: "tool", slug: "client-pricing-calculator", why: "Enter hours, costs and the client's value: see a floor price, a fair price and a value-based price." },
        { t: "warn", text: "Don't underprice to win work. Very low prices attract difficult clients and make you look inexperienced. Charge fairly, then deliver excellently." },
        { t: "check", q: "A booking system will save a salon about ₦300,000 a month in no-shows. Which pricing approach uses that fact?", options: ["Cost-based", "Value-based", "Random"], answer: 1, why: "Value-based pricing looks at what the result is worth to the client." },
      ],
    },
    {
      heading: "Step 3: Monthly care plans",
      blocks: [
        { t: "define", term: "Retainer (care plan)", meaning: "A monthly fee for ongoing work (updates, monitoring, reports), agreed in advance.", like: "a car service plan: a fixed monthly amount and the car keeps running well." },
        { t: "p", text: "One-off projects end. A care plan gives you steady income. Offer one with every project:" },
        { t: "list", items: ["Hosting checks, updates and backups", "Uptime and automation monitoring", "A set number of content changes per month", "A monthly SEO report and 1–2 articles", "Agent knowledge-base updates"] },
        { t: "tool", slug: "pricing-layout-picker", why: "Choose how to present your packages on your own website." },
      ],
    },
    {
      heading: "Step 4: Write the proposal",
      blocks: [
        { t: "define", term: "Proposal", meaning: "A short document that explains the client's situation, what you'll deliver, the timeline, the price and how to say yes.", like: "a builder's quotation, written so the customer can understand it without a builder." },
        {
          t: "steps",
          items: [
            { title: "Their situation", detail: "What they told you, in their own words." },
            { title: "The outcome", detail: "What will be different after the project." },
            { title: "The options", detail: "Your three packages, with your recommendation highlighted." },
            { title: "Timeline and process", detail: "Milestones, and what you need from them." },
            { title: "Price and payment terms", detail: "For example: 50% to start, 50% before launch." },
            { title: "Next step", detail: "“Reply ‘approved’ and I'll send the deposit details.”" },
          ],
        },
        { t: "figure", figure: { tool: "proposal-generator", caption: "A proposal: their situation, the outcome, three options, timeline, price and next step." } },
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal to send or print." },
        { t: "try", title: "Draft a proposal for a real prospect", minutes: 20, steps: ["Choose one qualified lead from your tracker.", "Fill the proposal generator with their situation in their own words.", "Read it as the owner: is anything confusing? Is the next step obvious?"] },
      ],
    },
    {
      heading: "Selling in dollars",
      blocks: [
        { t: "p", text: "The same packages sell abroad, to small businesses in the UK, US and Canada, including Nigerians in the diaspora. Price in USD, show your portfolio and the hours you overlap with their time zone, and receive payment through services like Payoneer or Grey (check each one's fees and current availability)." },
        { t: "scenario", title: "The diaspora caterer", text: "A Nigerian caterer in Houston wanted a site that spoke to both Nigerian and American customers. A Lagos developer showed two similar projects, priced in dollars, and scheduled calls in the Lagos evening (Houston morning). Same skills: a different market." },
        { t: "mistakes", items: [{ wrong: "A list of technologies: “Next.js, Tailwind, Supabase”", right: "Results: “More bookings, fewer WhatsApp hours”" }, { wrong: "Dropping your price the moment someone hesitates", right: "Offering the smaller package instead" }, { wrong: "A 15-page proposal", right: "2–4 pages with one clear next step" }] },
      ],
    },
  ],
  task: {
    title: "Create your offer",
    steps: ["Define three packages for your niche, each described as a result.", "Price them with the calculator; write down your floor price.", "Define a monthly care plan.", "Write a proposal template with the generator.", "Put your packages on your portfolio site or a pricing page."],
    done: ["Each package is described as a result, not a list of tech", "I know my floor price and won't go below it", "I have a monthly care plan", "My proposal is 2–4 pages with a clear next step"],
  },
  recap: [
    "Offer **three packages**: it makes choosing easy, and many buyers pick the middle one.",
    "**Value-based pricing** sets the price by what the result is worth to the client.",
    "**Underpricing** attracts difficult clients and makes you look inexperienced, charge fairly.",
    "A **retainer** (care plan) is a monthly fee for ongoing work. It gives you steady income.",
    "A proposal ends with **one clear next step**, like “Reply ‘approved’ and I'll send the deposit details.”",
  ],
  resources: [
    { label: "Payoneer", url: "https://www.payoneer.com", note: "Receive payments from clients abroad." },
    { label: "Grey", url: "https://grey.co", note: "Foreign accounts for Africans to receive USD, GBP and EUR." },
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free training on selling and proposals." },
    { label: "Canva: Proposal templates", url: "https://www.canva.com/proposals/templates/", note: "Designed proposal layouts." },
  ],
  quiz: [
    { q: "Why offer three packages?", options: ["To confuse clients", "It makes choosing easy, and many buyers pick the middle one", "It's a legal requirement", "To charge less"], answer: 1, why: "Clear levels simplify the decision.", from: 0 },
    { q: "What does value-based pricing look at?", options: ["Only your hours", "What the result is worth to the client", "Competitors' logos", "The weather"], answer: 1, why: "Price in relation to the value created.", from: 1 },
    { q: "Why avoid underpricing?", options: ["It attracts difficult clients and makes you look inexperienced", "It's illegal", "It's always good", "Clients prefer it"], answer: 0, why: "Fair prices signal quality and keep you in business.", from: 2 },
    { q: "What is a retainer?", options: ["A one-time fee", "A monthly fee for ongoing work", "A type of website", "A deposit"], answer: 1, why: "Retainers give steady income.", from: 3 },
    { q: "How should a proposal end?", options: ["With your life story", "With one clear next step to say yes", "With a long list of technologies", "With nothing"], answer: 1, why: "Make saying yes easy.", from: 4 },
  ],
};

export default lesson;
