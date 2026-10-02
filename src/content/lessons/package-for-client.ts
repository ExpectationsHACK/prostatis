import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "package-for-client",
  title: "Package, price & pitch",
  minutes: 110,
  outcome: "A clear website package with what's included and what isn't, your three price levels, a ready-to-send quote document, and your first 10 personal messages sent to real businesses.",
  intro:
    "You can now build websites, offer pages, bookings with deposits, shops and private portals. Now you need to **sell** them, and selling starts with being clear. Business owners get nervous when they don't know exactly what they're paying for, so they delay, or bargain you down to nothing. Today you'll turn your skills into a clear offer, price it with confidence, write a document that makes saying yes easy, and send your first messages to real businesses. Bisi can help: ask her which other business owners she knows.",
  core: "Sell a clear package with a written list of what's included, at a price above your lowest acceptable price, and open every pitch with something specific about that business.",
  youNeed: ["Your live portfolio link", "The prices 3 local competitors charge (ask around or check their pages)", "Google Maps and Instagram on your phone", "About 2 hours, including sending messages"],
  sections: [
    {
      heading: "Step 1: Find out what they need",
      blocks: [
        { t: "p", text: "Before quoting, understand the business. A short call or a questionnaire on WhatsApp prevents surprises later." },
        { t: "tool", slug: "website-requirements-questionnaire", why: "A ready questionnaire: goals, pages, features, content, domain, deadline and budget, to send on WhatsApp or email." },
        { t: "list", items: ["What should the website achieve? More calls, bookings, orders, trust?", "Who are the customers?", "Which pages and features?", "Who provides the photos and words?", "Do they have a domain, a logo, a Paystack account?", "When do they need it, and what budget range did they have in mind?"] },
      ],
    },
    {
      heading: "Step 2: Define the package",
      blocks: [
        {
          t: "define",
          term: "Scope",
          like: "the list on Bisi's order slip: two gowns and one boubou, in these fabrics, by this date. Not “some clothes”.",
          meaning: "Exactly what a project includes, and what it doesn't, written down and agreed before work starts.",
        },
        {
          t: "define",
          term: "Package",
          like: "a combo plate at a buka: rice, chicken and a drink for one price, instead of ordering and pricing each item separately.",
          meaning: "A bundle of services sold together as one clear result at one price, like “Get online properly: five-page website, WhatsApp buttons, booking page and Google listing.”",
        },
        { t: "table", columns: ["Included", "Not included (can be added for a price)"], rows: [["5 pages, phone first", "Extra pages (₦X each)"], ["WhatsApp buttons + a working contact form", "An online shop with checkout"], ["Free hosting set up on Cloudflare, in the client's account", "The domain itself (paid by the client, in their name)"], ["Titles, descriptions and Google listing started", "Monthly SEO work"], ["2 rounds of changes", "Extra rounds of changes"], ["30 days of support after launch", "Monthly updates after those 30 days"]] },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Vague", nodes: [{ draw: "chat", label: "“just do my website”" }, { draw: "cross", label: "endless changes, no pay" }] },
            right: { title: "Written scope", nodes: [{ draw: "list", label: "5 pages, form, 2 rounds", hot: true }, { draw: "handshake", label: "both sides agree" }] },
          },
          caption: "A project without a written scope becomes an argument; one with a written list of what's in and what's out becomes a handshake.",
        },
        { t: "tip", text: "Clear scope protects both of you. It's much easier to say “that's an extra” when it was written down from the start." },
        { t: "check", q: "Two weeks in, the client asks you to “just add” a blog. Your package says blogs aren't included. What now?", options: ["Add it free to keep them happy", "Point to the scope kindly and offer it as a priced extra", "Refuse to discuss it"], answer: 1, why: "Written scope turns “can you just…” into a friendly, priced add-on." },
      ],
    },
    {
      heading: "Step 3: Price it",
      blocks: [
        {
          t: "define",
          term: "Floor price",
          like: "a trader's last price at the market: below it, she'd rather keep the goods than sell at a loss.",
          meaning: "The lowest price you can accept: your hours × a fair hourly rate, plus any costs. Never go below it.",
        },
        { t: "list", items: ["**Floor price**: your hours × a fair hourly rate + costs. Your tools are free, so your cost is mostly time and data.", "**Market check**: what others in your city charge for similar work.", "**Value**: what the result is worth. A booking page that stops ₦200,000 of missed fittings a month is cheap at ₦250,000."] },
        { t: "tool", slug: "client-pricing-calculator", why: "Enter your hours, costs and the client's value: see your floor, a fair price, and a price based on what the result is worth to them." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "tag", label: "Starter: one great page" }, { draw: "tag", label: "Business site (most choose)", hot: true }, { draw: "tag", label: "Site + shop or booking" }] },
          caption: "Three price levels, like three combo plates: a small option, the one most owners pick (circled), and the full option with a shop or bookings.",
        },
        { t: "figure", figure: { diagram: "pricing-tiers", caption: "Offer three levels, for example: one-page site, business website, and website + shop or booking." } },
        { t: "tip", text: "Beginners nearly always charge too little. Start fair, deliver excellently, and raise prices after every 2 or 3 projects. Prices vary by city and niche, so use your own numbers." },
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
        { t: "tool", slug: "proposal-generator", why: "Fill in the details and get a complete, professional proposal to send as a PDF or link." },
        { t: "list", items: ["Their goal, in their own words", "What you'll deliver (the package and its scope)", "The timeline", "Price and payment terms: for example **50% deposit to start, 50% before launch**", "What you need from them, and by when", "The next step: “Reply ‘approved’ and I'll send the deposit details.”"] },
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Show the client the whole journey: deposit, build, changes, launch, balance." } },
        {
          t: "define",
          term: "Care plan",
          also: ["Retainer"],
          like: "a generator servicing plan: a fixed monthly fee, and the generator keeps running without drama.",
          meaning: "A monthly fee for looking after a website after launch: checks, small updates, price changes and a short monthly report. Also called a **retainer**. Offer one with every project.",
        },
      ],
    },
    {
      heading: "Step 5: Pitch 10 businesses",
      blocks: [
        {
          t: "define",
          term: "Prospect",
          like: "a house with a leaking roof, to a roofer: it has a problem you can fix, but you haven't knocked yet.",
          meaning: "A business that might become your client: it has a problem you can solve, but you haven't spoken to it yet.",
        },
        {
          t: "define",
          term: "Cold outreach",
          also: ["Cold message"],
          like: "introducing yourself to a new neighbour: polite, short, and with a real reason to talk.",
          meaning: "Contacting a business that doesn't know you yet, to offer help. The first message is a **cold message**. “Cold” just means you haven't spoken before.",
        },
        {
          t: "define",
          term: "Follow-up",
          like: "a friendly second knock on a door, in case they didn't hear the first.",
          meaning: "A polite later message to someone who hasn't replied yet, adding something useful each time, not just “any update?”.",
        },
        { t: "figure", figure: { diagram: "funnel", caption: "Most people won't reply: that's normal. Enough good messages always produce conversations." } },
        { t: "p", text: "Search Google Maps and Instagram in one niche and area (e.g. “tailor Surulere”, “salon Yaba”). Look for **busy** businesses (good reviews, active posts) with no website, a slow one, or no way to book, order or pay online." },
        { t: "tool", slug: "prospect-list-builder", why: "Search ideas and a simple tracking sheet for your prospects." },
        { t: "list", items: ["Start with something specific about them (a post you liked, their reviews)", "Mention one problem you noticed", "Say what fixing it would do for them", "Ask a small question: “Can I send you a quick free mockup?”"] },
        { t: "tool", slug: "cold-dm-script-generator", why: "Writes personal messages for Instagram, WhatsApp and email from your notes about each business." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Polite follow-ups for day 3, 7 and 14: many replies come from these." },
        { t: "warn", text: "Send personal messages one by one. No bulk messages and no adding people to groups or broadcast lists: that's spam and can get your number banned." },
        { t: "try", title: "Send your first 3 pitches now", minutes: 15, steps: ["Find 3 busy businesses with a clear gap.", "Write each a specific, four-sentence message.", "Send them and write the date in your tracking sheet. You've started!"] },
        {
          t: "scenario",
          title: "The first yes",
          text: "Here's how a first client often happens. You send 10 messages to bakeries on a Monday. Three reply; one, a cake shop with lots of Instagram followers and no website, agrees to a call. The owner cares about one thing: customers asking “how much?” all day. So your proposal starts with a price list page and WhatsApp ordering, using the Starter package. That's a first paid project, and it started with ten honest messages.",
        },
        { t: "win", title: "Your first pitches are out", proved: "you can turn your skills into a clear offer and start real conversations with businesses that need it, the step most beginners never take.", cue: "Log every message with a follow-up date. Finish your mission for the **First pitches** badge." },
      ],
    },
  ],
  task: {
    title: "Package, price and pitch",
    steps: ["Define your website package with included and not-included lists.", "Work out your floor price and set three levels.", "Make a proposal template with the generator.", "Find 10 businesses in one niche and send each a personal message.", "Log them with follow-up dates."],
    done: ["My package lists what's included and what isn't", "I know my floor price and my three levels", "My proposal ends with one clear next step", "10 personal messages are sent and logged", "I sent no bulk or group messages"],
  },
  recap: [
    "A **requirements questionnaire** helps you understand the business before quoting, so there are no surprises later.",
    "Writing down **what's not included** in the **scope** prevents misunderstandings and makes extras easy to price.",
    "Common terms for small projects: **50% deposit to start, 50% before launch**.",
    "Never go below your **floor price**: your hours × a fair rate, plus costs.",
    "A first pitch opens with **something specific about the business** and asks for a **small yes**, like permission to send a free mockup.",
    "The **domain belongs to the client**: they pay for it, in their own name. The hosting can stay free on Cloudflare.",
  ],
  resources: [
    { label: "Atlassian: project scope", url: "https://www.atlassian.com/work-management/project-management/project-scope", note: "How to define scope clearly." },
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free sales and prospecting training." },
    { label: "Canva: proposal templates", url: "https://www.canva.com/proposals/templates/", note: "Free designed proposal layouts." },
    { label: "Google Maps", url: "https://www.google.com/maps", note: "Find local businesses to pitch." },
  ],
  quiz: [
    { q: "A salon owner says “just do my website”. What do you send before any work starts?", options: ["Nothing, start building", "A written scope: what's included, what isn't, and the price", "A list of your favourite colours", "Your bank details only"], answer: 1, why: "Writing the scope down first prevents misunderstandings and makes extras easy to price.", from: 1, aim: "core" },
    { q: "What are common payment terms for a small website project?", options: ["Everything after launch, maybe", "50% deposit to start, 50% before launch", "Pay whenever", "Free"], answer: 1, why: "It protects your time and the client's money. Tomorrow's lesson builds your whole get-paid system on these terms.", from: 2, aim: "deliver-get-paid" },
    { q: "Your floor price for a site is ₦180,000. A client offers ₦100,000. What do you do?", options: ["Accept to get the job", "Offer a smaller package that fits their budget, never going below your floor for this one", "Do it free", "Ignore them"], answer: 1, why: "Below your floor you lose money. Offer less work for less money instead.", from: 3, aim: "client-work" },
    { q: "What should your first message to a business ask for?", options: ["A signed contract", "A small yes, like permission to send a free mockup", "Full payment upfront", "A meeting at their office tomorrow"], answer: 1, why: "Small, specific asks get replies; the proposal comes later.", from: 4, aim: "client-work" },
    { q: "Who pays for the client's domain, and in whose name?", options: ["You, in your name, forever", "The client, in their own name", "Cloudflare", "Nobody"], answer: 1, why: "It's the business's asset. You'll check ownership of every account at handover.", from: 5, aim: "deliver-get-paid" },
  ],
  celebrate: {
    title: "Day 13 complete: open for business",
    proved: "You can turn your skills into a clear, priced offer and start real conversations with business owners who need it.",
    badge: "First pitches",
    badgeDesc: "Packaged an offer and sent 10 pitches",
  },
};

export default lesson;
