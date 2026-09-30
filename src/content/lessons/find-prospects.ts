import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "find-prospects",
  title: "Find prospects: lists & research",
  minutes: 100,
  outcome: "A list of 100 real businesses in one niche that need what you sell, each one scored, and the top 20 researched with a specific improvement you can offer.",
  intro:
    "Skills don't pay until someone buys them. The good news: thousands of Nigerian businesses have no website, a slow one, or no way to book or pay online. Today you'll build a list of 100 of them, carefully, legally, and with enough research that your messages next week feel personal instead of spammy.",
  youNeed: ["Google Maps and Instagram on your phone or laptop", "A Google Sheet for your list", "Your portfolio or Week 1–3 projects (to decide your niche)", "About 90 minutes: the research is worth it"],
  sections: [
    {
      heading: "The funnel: why you need 100",
      blocks: [
        { t: "define", term: "Prospect", meaning: "A business that might become your client: it has a problem you can solve, but you haven't spoken to it yet.", like: "a house with an old roof, for a roofer." },
        { t: "define", term: "Funnel", meaning: "The way a large number of prospects narrows down, step by step, into a few paying clients: found → contacted → replied → call → client.", like: "fishing with a wide net: many fish swim near, a few are caught." },
        { t: "figure", figure: { diagram: "funnel", caption: "An illustration of how numbers narrow at each step. Better research means better numbers at every step." } },
        { t: "p", text: "Most people won't reply: that's completely normal and not a reflection on you. A list of 100 well-chosen businesses gives you enough conversations to land your first clients." },
      ],
    },
    {
      heading: "Step 1: Pick a niche",
      blocks: [
        { t: "define", term: "Niche", meaning: "One specific type of customer you focus on, for example “salons in Lekki” or “private clinics in Abuja”, instead of “any business”.", like: "a doctor who specialises in children: parents trust them more for their kids." },
        { t: "list", items: ["Salons and spas in Lekki", "Private clinics in Abuja", "Restaurants in Port Harcourt", "Schools in Ibadan", "Real-estate agents in Lagos", "Nigerian-owned businesses abroad (for dollar clients)"] },
        { t: "tip", text: "Choose a niche where businesses **have money**, **need customers to find them**, and you **understand the customer**. Your earlier projects can become your niche portfolio." },
        { t: "check", q: "Why choose one niche instead of “any business”?", options: ["It's required", "Your messages, examples and prices can be specific and convincing", "It's cheaper to email"], answer: 1, why: "Specific offers win. “I build booking sites for salons” beats “I do websites”." },
      ],
    },
    {
      heading: "Step 2: Find them (legally)",
      blocks: [
        { t: "table", columns: ["Source", "How"], rows: [["Google Maps", "Search “salon Lekki”, open each result, note the website, phone and reviews, by hand"], ["Instagram", "Search hashtags and locations: many businesses only have Instagram"], ["Directories", "Business directories and industry associations that list members publicly"], ["Your network", "Friends, family, church, alumni, often the warmest leads"]] },
        { t: "tool", slug: "prospect-list-builder", why: "Builds your search queries, the columns to collect, and a scoring template." },
        { t: "tool", slug: "web-scraper-config", why: "Extract business names and links from a public directory page, only where the site's terms allow it." },
        { t: "warn", text: "Don't use scraping tools on Google Maps. It breaks Google's terms. Collect from Maps by hand. Only collect **public business information**, respect each website's terms, and never collect people's personal data. Nigeria's Data Protection Act protects personal information; business contact details used for a relevant, respectful offer are normal, spam is not." },
        { t: "try", title: "Find your first 10", minutes: 15, steps: ["Open Google Maps and search your niche + area.", "Add 10 businesses to your sheet: name, link, phone or Instagram, rating, notes.", "Note one thing about each: “no website”, “slow site”, “no booking”…"] },
      ],
    },
    {
      heading: "Step 3: Score them",
      blocks: [
        { t: "p", text: "Not all prospects are equal. Give each one points so you contact the best first:" },
        { t: "table", columns: ["Signal", "Points"], rows: [["No website, or a broken or slow one", "+3"], ["Active on Instagram or WhatsApp (they want customers)", "+2"], ["Many good reviews (busy, likely has money)", "+2"], ["No online booking or payment", "+2"], ["Recently opened or expanding", "+1"]] },
        { t: "tool", slug: "lead-qualification", why: "Turns your signals into a consistent score and hot / warm / cold labels." },
        { t: "check", q: "A pharmacy has 4 reviews and a fast, modern website with online ordering. A bakery has 150 great reviews, no website and no online ordering. Who do you contact first?", options: ["The pharmacy", "The bakery", "Neither"], answer: 1, why: "The bakery is busy (likely can pay) and has a clear gap you can fill." },
      ],
    },
    {
      heading: "Step 4: Research the top 20",
      blocks: [
        { t: "p", text: "For your 20 highest scores, spend about 5 minutes each finding **one specific thing** you can help with. That's what makes a message worth replying to." },
        { t: "tool", slug: "website-speed-checklist", why: "Check their site's speed in seconds: a slow site is an easy, specific opener." },
        { t: "prompt", title: "Research prompt", text: "Here is information about a business: [name, website text or Instagram bio, a summary of reviews]. As a web consultant, list the 3 most valuable improvements a website, booking system, SEO or automation could bring them, each in one sentence a business owner would understand. Only use the information given." },
        { t: "scenario", title: "Specific beats generic", text: "Generic: “Do you need a website?”, ignored. Specific: “I noticed your salon has 180 great Google reviews, but no way to book online, and your number isn't on your Instagram.”: the owner replies “How did you see that?” Research turns a stranger into a conversation." },
        { t: "mistakes", items: [{ wrong: "Scraping Google Maps with a bot", right: "Collecting from Maps by hand; scraping only where terms allow" }, { wrong: "A list of 100 random businesses", right: "100 businesses in one niche and area" }, { wrong: "Messaging everyone the same day with no research", right: "Researching the top 20 first, one specific observation each" }] },
      ],
    },
  ],
  task: {
    title: "Build your prospect list",
    steps: ["Choose one niche and one area.", "Collect 100 businesses in your sheet (name, link, phone or Instagram, notes).", "Score all 100.", "Research the top 20 and note one specific improvement for each.", "Sort by score: this is your outreach list for the cold outreach lesson."],
    done: ["My list has 100 real businesses in one niche", "Every business has a score", "The top 20 each have a specific, researched improvement", "I only collected public business information, by allowed methods"],
  },
  recap: [
    "Pick a **niche** so your messages, examples and prices can be specific and convincing.",
    "The best prospects are **busy (good reviews) but have a clear gap**, no website, booking or payment.",
    "Collect only **public business information**, respect site terms, and don't scrape Google Maps.",
    "Research each top prospect for **one specific observation**: it makes your message worth replying to.",
    "Most prospects won't reply, from 100, **a handful of clients** is a realistic early result.",
  ],
  resources: [
    { label: "Google Maps", url: "https://www.google.com/maps", note: "The best source of local businesses, collect by hand." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "Know the rules on personal data." },
    { label: "HubSpot Academy: Sales training", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and sales training." },
    { label: "Apollo Academy", url: "https://www.apollo.io/academy", note: "Free lessons on prospecting and outreach." },
  ],
  quiz: [
    { q: "Why pick a niche?", options: ["It's required", "Your messages, examples and prices can be specific and convincing", "It's cheaper", "To avoid working"], answer: 1, why: "Specific beats generic in outreach.", from: 0 },
    { q: "Which prospect deserves the highest score?", options: ["A fast, modern site with online booking", "A busy salon with great reviews but no website or booking", "A closed business", "A big bank"], answer: 1, why: "Busy plus a clear gap = strong need and ability to pay.", from: 1 },
    { q: "What information is OK to collect?", options: ["Personal home addresses", "Public business information, collected in ways the site's terms allow", "Customers' phone numbers", "Anything you can find"], answer: 1, why: "Stick to public business info and respect terms and data protection law.", from: 2 },
    { q: "Why research the top 20 individually?", options: ["To waste time", "A specific observation makes your message worth replying to", "Google requires it", "To copy their site"], answer: 1, why: "Personalised messages get far more replies.", from: 3 },
    { q: "Out of 100 prospects, what's a realistic early result?", options: ["100 clients", "50 clients", "A handful of clients", "Zero is guaranteed"], answer: 2, why: "Most won't reply: a few good clients is a great start.", from: 4 },
  ],
};

export default lesson;
