import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "proposals-pricing",
  title: "Proposals, pricing & packaging",
  minutes: 100,
  outcome: "Three clear packages for your niche, prices you can defend, a monthly support offer, and a ready document that makes saying yes easy.",
  intro:
    "You now have skills worth real money: websites, bookings, shops, portals, SEO, automations and AI assistants. Today you'll package and price them so business owners understand exactly what they're buying, and say yes. The secret: sell **outcomes** (more orders, fewer evenings on WhatsApp), not hours or technology. Nobody wakes up wanting “a Cloudflare Function”; Bisi wanted her Saturdays back and her customers to stop asking “how much?”.",
  core: "Sell three clear packages described as results, priced above your floor using what the result is worth to the client, and end every proposal with one clear next step.",
  youNeed: ["Your list of skills from Weeks 1 to 3", "How many hours your practice projects took", "What 3 local competitors charge", "The hours-and-naira numbers from your workflow mapping (Day 14)"],
  sections: [
    {
      heading: "Step 1: Package, don't list",
      blocks: [
        {
          t: "define",
          term: "Package",
          like: "a combo plate at a buka: rice, chicken and a drink for one price, instead of pricing each spoon separately.",
          meaning: "A bundle of services sold together as one clear result at one price, like “Get found and booked: website, booking page, Google profile and 3 articles”.",
        },
        {
          t: "define",
          term: "Scope",
          like: "the list on Bisi's order slip: two gowns and one boubou, in these fabrics, by this date. Not “some clothes”.",
          meaning: "Exactly what a project includes, and what it doesn't, written down and agreed before work starts. Every package has a written scope.",
        },
        { t: "p", text: "A menu of skills (“design, SEO, automation…”) confuses buyers. Packages make it easy: **three options**, each a clear result. Many buyers choose the middle one." },
        { t: "figure", figure: { diagram: "pricing-tiers", caption: "Three levels, the middle one highlighted." } },
        { t: "table", columns: ["", "Starter", "Growth", "Complete"], rows: [["For", "Get online properly", "Get found and booked", "Run on autopilot"], ["Includes", "5-page site, WhatsApp buttons, free hosting, Google listing started", "+ booking with deposits or a shop, full Google profile, 3 articles", "+ automations, website assistant, customer list, monitoring"], ["Example price", "₦250,000", "₦500,000", "₦900,000 + monthly care"]] },
        { t: "tip", text: "These prices are **examples only**. Real prices depend on your city, niche and portfolio. Use the calculator below with your own numbers." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "pot", label: "Starter: online properly" }, { draw: "pot", label: "Growth: found and booked", hot: true }, { draw: "pot", label: "Complete: on autopilot" }] },
          caption: "Three combo plates instead of a long menu: each package is a clear result at one price, and the middle one, circled, is the one most owners choose.",
        },
      ],
    },
    {
      heading: "Step 2: Price it",
      blocks: [
        {
          t: "define",
          term: "Floor price",
          like: "a trader's last price at the market: below it, she'd rather keep the goods than sell at a loss.",
          meaning: "The lowest price you can accept: your hours × a fair hourly rate, plus any costs. Never go below it.",
        },
        {
          t: "define",
          term: "Value-based pricing",
          like: "a generator installer charging for keeping a shop's sales flowing through every outage, not just for the hours of wiring.",
          meaning: "Setting your price by what the result is worth to the client, not only by your hours. If an automation saves Bisi ₦78,000 of time every month, ₦150,000 to build it is a bargain for her.",
        },
        { t: "list", items: ["**Cost-based**: your hours × a fair hourly rate + costs. This is your **floor**.", "**Market-based**: what others charge for similar work in your area.", "**Value-based**: what the result is worth to the client, using the numbers from Day 14."] },
        { t: "tool", slug: "client-pricing-calculator", why: "Enter hours, costs and the client's value: see your floor, a fair price and a value-based price." },
        { t: "warn", text: "Don't underprice to win work. Very low prices attract difficult clients and make you look inexperienced. Charge fairly, then deliver excellently." },
        { t: "check", q: "A booking system will save a salon about ₦300,000 a month in missed appointments. Which pricing approach uses that fact?", options: ["Cost-based", "Value-based", "Random"], answer: 1, why: "Value-based pricing looks at what the result is worth to the client." },
      ],
    },
    {
      heading: "Step 3: Monthly income",
      blocks: [
        {
          t: "define",
          term: "Care plan",
          also: ["Retainer"],
          like: "a generator servicing plan: a fixed monthly fee, and the generator keeps running without drama.",
          meaning: "A monthly fee for ongoing work (checks, updates, reports) agreed in advance. Also called a **retainer**. One-off projects end; care plans give you steady income.",
        },
        { t: "list", items: ["Uptime alerts and a monthly speed check", "A set number of content changes per month (prices, photos, opening hours)", "A monthly report: visitors, enquiries, bookings", "1 or 2 helpful articles a month", "Assistant fact updates and a monthly re-run of its 20 questions", "Weekly usage checks on anything that could cost money"] },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "One-off projects only", nodes: [{ draw: "coins", label: "paid once" }, { draw: "hourglass", label: "then waiting for the next" }] },
            right: { title: "Projects + care plans", nodes: [{ draw: "calendar", label: "paid every month", hot: true }, { draw: "generator", label: "the client's system kept running" }] },
          },
          caption: "Why care plans matter: one-off projects pay once and then you wait; a care plan, like a generator service contract, pays every month while you keep the client's system running.",
        },
        { t: "tool", slug: "pricing-layout-picker", why: "Choose how to show your packages and care plan on your own website." },
      ],
    },
    {
      heading: "Step 4: Put it in writing",
      blocks: [
        {
          t: "define",
          term: "Proposal",
          like: "a builder's quotation, written so the customer understands it without being a builder.",
          meaning: "A short document that explains the client's situation, what you'll deliver, the timeline, the price, and exactly how to say yes.",
        },
        {
          t: "steps",
          items: [
            { title: "Their situation", detail: "What they told you, in their own words." },
            { title: "The outcome", detail: "What will be different after the project." },
            { title: "The options", detail: "Your three packages, with your recommendation highlighted." },
            { title: "Timeline and process", detail: "The stages, and what you need from them." },
            { title: "Price and payment terms", detail: "For example: 50% to start, 50% before launch." },
            { title: "Next step", detail: "“Reply ‘approved’ and I'll send the deposit details.”" },
          ],
        },
        { t: "figure", figure: { tool: "proposal-generator", caption: "A proposal: their situation, the outcome, three options, timeline, price and next step." } },
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal to send or print." },
        { t: "try", title: "Draft a proposal for a real prospect", minutes: 20, steps: ["Choose one prospect who passed your four qualification questions.", "Fill the proposal generator with their situation in their own words.", "Read it as the owner: is anything confusing? Is the next step obvious?"] },
      ],
    },
    {
      heading: "Selling in dollars",
      blocks: [
        { t: "p", text: "The same packages sell abroad, to small businesses in the UK, US and Canada, including Nigerians in the diaspora. Price in dollars, show your portfolio and the hours you overlap with their time zone, and receive payment through services like Payoneer or Grey (check each one's fees and current availability)." },
        {
          t: "scenario",
          title: "The diaspora caterer",
          text: "Picture a Nigerian caterer in Houston who wants a site that speaks to both Nigerian and American customers. You show two similar projects, price in dollars, and schedule calls in the Lagos evening (Houston morning). Same skills: a different market.",
        },
        { t: "mistakes", items: [{ wrong: "A list of technologies: “HTML, Cloudflare, Supabase”", right: "Results: “More bookings, fewer evenings on WhatsApp”" }, { wrong: "Dropping your price the moment someone hesitates", right: "Offering the smaller package instead" }, { wrong: "A 15-page proposal", right: "2 to 4 pages with one clear next step" }] },
        { t: "win", title: "Your offer is ready to sell", proved: "you can turn a month of skills into clear packages, defend your price with the value you create, and make saying yes easy.", cue: "Put your packages on your portfolio's offer page. Finish your mission for the **Deal maker** badge." },
      ],
    },
  ],
  task: {
    title: "Create your offer",
    steps: ["Define three packages for your niche, each described as a result, each with a written scope.", "Price them with the calculator; write down your floor price.", "Define a monthly care plan.", "Write a proposal template with the generator.", "Put your packages on your portfolio site."],
    done: ["Each package is described as a result, not a list of technologies", "I know my floor price and won't go below it", "I have a monthly care plan", "My proposal is 2 to 4 pages with one clear next step"],
  },
  recap: [
    "Offer **three packages** described as results: it makes choosing easy, and many buyers pick the middle one.",
    "**Value-based pricing** sets the price by what the result is worth to the client, never below your **floor price**.",
    "**Underpricing** attracts difficult clients and makes you look inexperienced: charge fairly.",
    "A **care plan** (retainer) is a monthly fee for ongoing work: it gives you steady income.",
    "A proposal ends with **one clear next step**, like “Reply ‘approved’ and I'll send the deposit details.”",
  ],
  resources: [
    { label: "Payoneer", url: "https://www.payoneer.com", note: "Receive payments from clients abroad." },
    { label: "Grey", url: "https://grey.co", note: "Foreign accounts for receiving USD, GBP and EUR." },
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free training on selling and proposals." },
    { label: "Canva: proposal templates", url: "https://www.canva.com/proposals/templates/", note: "Free designed proposal layouts." },
  ],
  quiz: [
    { q: "Why offer three packages instead of a list of services?", options: ["To confuse clients", "It makes choosing easy, and many buyers pick the middle one", "It's a legal requirement", "To charge less"], answer: 1, why: "Clear levels described as results simplify the decision.", from: 0, aim: "core" },
    { q: "An automation saves a client ₦78,000 of time every month. Which pricing approach uses that number?", options: ["Cost-based only", "Value-based pricing: what the result is worth to the client", "Copying competitors", "Guessing"], answer: 1, why: "Price in relation to the value created, never below your floor. You'll price your final project this way.", from: 1, aim: "capstone" },
    { q: "Why avoid underpricing?", options: ["It attracts difficult clients and makes you look inexperienced", "It's illegal", "It always wins work", "Clients prefer it"], answer: 0, why: "Fair prices signal quality and keep you in business.", from: 2, aim: "client-work" },
    { q: "What is a care plan (retainer)?", options: ["A one-time fee", "A monthly fee for ongoing work, agreed in advance", "A type of website", "A deposit"], answer: 1, why: "It gives you steady income. Tomorrow you'll offer it at the moment of launch.", from: 3, aim: "deliver-get-paid" },
    { q: "How should a proposal end?", options: ["With your life story", "With one clear next step to say yes", "With a long list of technologies", "With nothing"], answer: 1, why: "Make saying yes easy. Tomorrow, the deposit request follows that yes.", from: 4, aim: "deliver-get-paid" },
  ],
  celebrate: {
    title: "Day 24 complete: your offer is ready",
    proved: "You can turn a month of skills into clear packages, defend your price with the value you create, and make saying yes easy.",
    badge: "Deal maker",
    badgeDesc: "Packaged and priced your services",
  },
};

export default lesson;
