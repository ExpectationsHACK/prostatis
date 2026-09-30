import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "package-for-client",
  title: "Package, price & pitch",
  minutes: 110,
  outcome: "A clear website package, your price levels, a proposal template, and your first 10 personalised pitches sent to real businesses.",
  intro:
    "You can build websites, landing pages, stores and web apps. Now you need to **sell** them, and that starts with being clear. Business owners get nervous when they don't know exactly what they're paying for. Today you'll turn your skills into a package with a clear scope, price it with confidence, write a proposal that makes saying yes easy, and send your first pitches to real businesses.",
  youNeed: ["Your portfolio link", "The prices 3 local competitors charge", "Google Maps and Instagram for finding businesses", "About 2 hours, including sending messages"],
  sections: [
    {
      heading: "Step 1: Discover what they need",
      blocks: [
        { t: "p", text: "Before quoting, understand the business. A short call or questionnaire prevents surprises later." },
        { t: "tool", slug: "website-requirements-questionnaire", why: "A ready questionnaire: goals, pages, features, content, domain, deadline and budget." },
        { t: "list", items: ["What should the website achieve? (more calls, bookings, orders, trust)", "Who are the customers?", "Which pages and features?", "Who provides the photos and words?", "Do they have a domain, a logo, a Paystack account?", "When do they need it, and what's their budget range?"] },
      ],
    },
    {
      heading: "Step 2: Define the package",
      blocks: [
        { t: "define", term: "Scope", meaning: "Exactly what a project includes, and what it doesn't. Written down and agreed before work starts.", like: "the list of items on a tailor's order: two shirts and one trouser, not “some clothes”." },
        { t: "table", columns: ["Included", "Not included (can be added)"], rows: [["5 pages, mobile-first", "Extra pages (₦X each)"], ["WhatsApp buttons + a contact form", "An online store with a cart"], ["Domain connection + HTTPS", "The domain itself (paid by the client, in their name)"], ["Basic SEO + Google profile setup", "Monthly SEO"], ["2 rounds of changes", "Extra rounds of changes"], ["30 days of support after launch", "A monthly care plan"]] },
        { t: "tip", text: "Clear scope protects both of you. It's much easier to say “that's an extra” when it's written down from the start." },
        { t: "check", q: "Two weeks in, the client asks you to “just add” a blog. Your package says blogs aren't included. What now?", options: ["Add it free to keep them happy", "Point to the scope kindly and offer it as a priced extra", "Refuse to talk about it"], answer: 1, why: "Written scope turns “can you just…” into a friendly, priced add-on." },
      ],
    },
    {
      heading: "Step 3: Write the proposal",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Show the client the whole journey: deposit, build, revisions, launch, balance." } },
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal." },
        { t: "list", items: ["Their goal, in their own words", "What you'll deliver (the package)", "The timeline, with milestones", "Price and payment terms, for example 50% deposit, 50% before launch", "What you need from them, and by when", "The next step: “Reply ‘approved’ and I'll send the deposit details.”"] },
      ],
    },
    {
      heading: "Step 4: Price it",
      blocks: [
        { t: "define", term: "Floor price", meaning: "The lowest price you can accept: your hours × a fair hourly rate, plus tool costs. Never go below it.", like: "the price below which a trader would rather keep the goods than sell at a loss." },
        { t: "list", items: ["**Floor price**: your hours × a fair hourly rate + tool costs.", "**Market check**: what others in your city charge for similar work.", "**Value**: what the result is worth, a booking system that stops ₦200,000 of no-shows a month is cheap at ₦300,000."] },
        { t: "tool", slug: "client-pricing-calculator", why: "Calculates your floor, fair and value-based prices." },
        { t: "figure", figure: { diagram: "pricing-tiers", caption: "Offer three levels, for example landing page, business website, and website + store or booking." } },
        { t: "tip", text: "Beginners usually charge too little. Start fair, deliver excellently, and raise prices after every 2–3 projects. Prices vary by city and niche, use your own numbers." },
      ],
    },
    {
      heading: "Step 5: Pitch 10 businesses",
      blocks: [
        { t: "figure", figure: { diagram: "funnel", caption: "Most people won't reply: that's normal. Enough good pitches always produce conversations." } },
        { t: "p", text: "Search Google Maps and Instagram in one niche and area (e.g. “salon Yaba”). Look for **busy** businesses: good reviews, active posts, with no website, a slow one, or no way to book, order or pay online." },
        { t: "tool", slug: "prospect-list-builder", why: "Search ideas and a simple sheet to track your prospects." },
        { t: "list", items: ["Start with something specific about them", "Mention one problem you noticed", "Say what fixing it would do for them", "Ask a small question: “Can I send you a quick free mockup?”"] },
        { t: "tool", slug: "cold-dm-script-generator", why: "Personalised messages for Instagram, WhatsApp and email." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Polite follow-ups for day 3, 7 and 14, many replies come from these." },
        { t: "warn", text: "Send personal messages one by one. No bulk messages and no adding people to groups. That's spam and can get your number banned." },
        { t: "try", title: "Send your first 3 pitches now", minutes: 15, steps: ["Find 3 busy businesses with a clear gap.", "Write each a specific, 4-sentence message.", "Send them and note the date in your tracker. You've started!"] },
        { t: "scenario", title: "The first yes", text: "Blessing sent 10 messages to bakeries in Ibadan on a Monday. Three replied; one: a cake shop with 200 Instagram followers and no website, agreed to a call. The owner cared about one thing: customers asking “how much?” all day. Blessing's proposal led with a price list page and WhatsApp ordering. That was her first paid project." },
      ],
    },
  ],
  task: {
    title: "Package, price and pitch",
    steps: ["Define your website package with included and not-included lists.", "Calculate your floor price and set three levels.", "Generate a proposal template.", "Find 10 businesses in one niche and send each a personalised message.", "Log them with follow-up dates."],
    done: ["My package lists what's included and what isn't", "I know my floor price and my three levels", "My proposal ends with one clear next step", "10 personalised messages are sent and logged"],
  },
  recap: [
    "A **requirements questionnaire** helps you understand the business before quoting, no surprises later.",
    "Listing what's **not included** prevents misunderstandings and makes extras easy to price.",
    "Common terms for small projects: **50% deposit, 50% before launch**.",
    "The **domain belongs to the client**: they pay for it, in their name.",
    "A first pitch asks for a **small yes**, like permission to send a free mockup, not a contract.",
  ],
  resources: [
    { label: "Atlassian: Project scope", url: "https://www.atlassian.com/work-management/project-management/project-scope", note: "How to define scope clearly." },
    { label: "Canva: Proposal templates", url: "https://www.canva.com/proposals/templates/", note: "Designed proposal layouts." },
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free sales and prospecting training." },
    { label: "Google Maps", url: "https://www.google.com/maps", note: "Find local businesses to pitch." },
  ],
  quiz: [
    { q: "Why use a requirements questionnaire before quoting?", options: ["To delay the client", "To understand their needs and avoid surprises", "It's legally required", "To get free work"], answer: 1, why: "Clear requirements lead to accurate quotes.", from: 0 },
    { q: "Why list what's NOT included?", options: ["To look strict", "It prevents misunderstandings and makes extras easy to price", "It's decoration", "Clients like long lists"], answer: 1, why: "Written scope makes add-ons easy to discuss.", from: 1 },
    { q: "What are common payment terms for a small website project?", options: ["100% after launch, maybe", "50% deposit, 50% before launch", "Pay whenever", "Free"], answer: 1, why: "It protects your time and the client's money.", from: 2 },
    { q: "Who pays for the domain, and in whose name?", options: ["You, in your name, forever", "The client, in their own name (it's their asset)", "Vercel", "Nobody"], answer: 1, why: "The domain belongs to the business.", from: 3 },
    { q: "What should your first pitch message ask for?", options: ["A signed contract", "A small yes, like sending a free mockup", "Full payment upfront", "A meeting tomorrow"], answer: 1, why: "Low-commitment asks get replies; the proposal comes later.", from: 4 },
  ],
};

export default lesson;
