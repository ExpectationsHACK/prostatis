import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "package-for-client",
  title: "Package, price & pitch",
  minutes: 80,
  outcome: "A clear website package, your price, a proposal template — and your first 10 personalised pitches sent.",
  intro:
    "You can build a website. Now you need to sell one — and that starts with being clear. Business owners get nervous when they don't know exactly what they're paying for. Today you turn your skills into a package with a clear scope, price it with confidence, write a proposal that makes saying yes easy — and send your first pitches to real businesses.",
  sections: [
    {
      heading: "Step 1 — Discover what they need",
      blocks: [
        { t: "p", text: "Before quoting, understand the business. A short call or questionnaire avoids surprises later." },
        { t: "tool", slug: "website-requirements-questionnaire", why: "A ready questionnaire: goals, pages, features, content, domain, deadline and budget." },
        { t: "list", items: ["What should the website achieve? (more calls, bookings, orders, trust)", "Who are the customers?", "Which pages and features?", "Who provides photos and text?", "Do they have a domain, logo, Paystack account?", "When do they need it, and what's the budget range?"] },
      ],
    },
    {
      heading: "Step 2 — Define the package",
      blocks: [
        { t: "p", text: "A package says exactly what's included — and, just as important, what isn't." },
        { t: "table", columns: ["Included", "Not included (can be added)"], rows: [["5 pages, mobile-first", "Extra pages (₦X each)"], ["WhatsApp buttons + contact form", "Online store with cart"], ["Domain connection + HTTPS", "Domain cost (paid by client)"], ["Basic SEO + Google Business Profile", "Monthly SEO"], ["2 rounds of revisions", "Extra revision rounds"], ["30 days of support after launch", "Monthly care plan"]] },
        { t: "tip", text: "Clear scope protects both of you. It's much easier to say “that's an add-on” when it's written down from the start." },
      ],
    },
    {
      heading: "Step 3 — Write the proposal",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Show the client the whole journey: deposit, build, revisions, launch, balance." } },
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal." },
        { t: "list", items: ["Their goal, in their words", "What you'll deliver (the package)", "Timeline with milestones", "Price and payment terms: e.g. 50% deposit, 50% before launch", "What you need from them, and by when", "Next step: “Reply 'approved' and I'll send the deposit details.”"] },
      ],
    },
    {
      heading: "Step 4 — Price it",
      blocks: [
        { t: "list", items: ["**Floor price**: your hours × a fair hourly rate + tool costs. Never go below it.", "**Market check**: what others in your city charge for similar work.", "**Value**: what the result is worth — a booking system that stops ₦200,000 of no-shows a month is cheap at ₦300,000."] },
        { t: "tool", slug: "client-pricing-calculator", why: "Calculates your floor, fair and value-based prices." },
        { t: "p", text: "Offer three levels so the choice is easy — for example **Landing page**, **Business website**, and **Website + store or booking**. Most people pick the middle one." },
        { t: "tip", text: "Beginners usually charge too little. Start fair, deliver excellently, and raise prices after every 2–3 projects. Prices vary by city and niche — use your own numbers." },
      ],
    },
    {
      heading: "Step 5 — Pitch 10 businesses",
      blocks: [
        { t: "figure", figure: { diagram: "funnel", caption: "Most people won't reply — that's normal. Enough good pitches always produce conversations." } },
        { t: "p", text: "Search Google Maps and Instagram in one niche and area (e.g. “salon Yaba”). Look for busy businesses — good reviews, active posts — with no website, a slow one, or no way to book, order or pay online." },
        { t: "tool", slug: "prospect-list-builder", why: "Search queries and a simple sheet to track your prospects." },
        { t: "list", items: ["Start with something specific about them", "Mention one problem you noticed", "Say what fixing it would do for them", "Ask a small question: “Can I send you a quick free mockup?”"] },
        { t: "tool", slug: "cold-dm-script-generator", why: "Personalised DMs for Instagram, WhatsApp and email." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Polite follow-ups for day 3, 7 and 14 — most replies come from these." },
        { t: "warn", text: "Send personal messages one by one. No bulk messages and no adding people to groups — that's spam and can get your number banned." },
      ],
    },
  ],
  task: {
    title: "Package, price and pitch",
    steps: ["Define your website package with included and not-included lists.", "Calculate your floor and fair prices and set three levels.", "Generate a proposal template.", "Find 10 businesses in one niche and send each a personalised message.", "Log them with follow-up dates."],
    done: ["My package lists what's included and what isn't", "I know my floor price and my three levels", "My proposal ends with one clear next step", "10 personalised messages are sent and logged"],
  },
  resources: [
    { label: "Atlassian — Project scope", url: "https://www.atlassian.com/work-management/project-management/project-scope", note: "How to define scope clearly." },
    { label: "Google Docs templates", url: "https://docs.google.com/document/u/0/?ftv=1&tgif=d", note: "Format your proposal." },
    { label: "Canva — Proposal templates", url: "https://www.canva.com/proposals/templates/", note: "Designed proposal layouts." },
    { label: "HubSpot Academy — Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free sales and prospecting training." },
  ],
  quiz: [
    { q: "Why use a requirements questionnaire before quoting?", options: ["To delay the client", "To understand needs and avoid surprises", "It's legally required", "To get free work"], answer: 1, why: "Clear requirements lead to accurate quotes." },
    { q: "Why list what's NOT included?", options: ["To look strict", "It protects both sides from misunderstandings and scope creep", "It's decoration", "Clients like long lists"], answer: 1, why: "Written scope makes add-ons easy to discuss." },
    { q: "Common payment terms for a small website project?", options: ["100% after launch, maybe", "50% deposit, 50% before launch", "Pay whenever", "Free"], answer: 1, why: "Protects your time and the client's money." },
    { q: "What should your first pitch message ask for?", options: ["A signed contract", "A small yes — like sending a free mockup", "Full payment upfront", "A meeting tomorrow"], answer: 1, why: "Low-commitment asks get replies; the proposal comes later." },
    { q: "How should a proposal end?", options: ["With your CV", "With one clear next step", "With a long legal section", "With a question about the weather"], answer: 1, why: "Make saying yes easy." },
  ],
};

export default lesson;
