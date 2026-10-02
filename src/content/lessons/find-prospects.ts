import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "find-prospects",
  title: "Find prospects: lists & research",
  minutes: 100,
  outcome: "A list of 100 real businesses in one niche that need what you sell, each one scored, and the top 20 researched with one specific improvement you can offer each.",
  intro:
    "Skills don't pay until someone buys them. The good news: thousands of Nigerian businesses have no website, a slow one, or no way to book or pay online. Today you'll build a list of 100 of them, carefully, legally, and with enough research that next week's messages feel personal instead of spammy. Start where you're strongest: the niche your portfolio already speaks to (if you followed Bisi, that's tailors and fashion designers).",
  core: "Pick one niche, collect only public business information in allowed ways, score who needs you most, and research the best until you can name one specific improvement for each.",
  youNeed: ["Google Maps and Instagram on your phone or laptop", "A free Google Sheet for your list", "Your portfolio and its niche", "About 90 minutes: the research is worth it"],
  sections: [
    {
      heading: "Why you need 100",
      blocks: [
        {
          t: "define",
          term: "Prospect",
          like: "a house with a leaking roof, to a roofer: it has a problem you can fix, but you haven't knocked yet.",
          meaning: "A business that might become your client: it has a problem you can solve, but you haven't spoken to it yet.",
        },
        {
          t: "define",
          term: "Funnel",
          like: "fishing with a wide net: many fish swim close, and a few are caught.",
          meaning: "The way a large number of prospects narrows, step by step, into a few paying clients: found → contacted → replied → call → client.",
        },
        { t: "figure", figure: { diagram: "funnel", caption: "How the numbers narrow at each step. Better research means better numbers at every step." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "people", label: "100 researched businesses" }, { draw: "chat", label: "personal messages" }, { draw: "handshake", label: "a few calls" }, { draw: "trophy", label: "a handful of clients", hot: true }] },
          caption: "The funnel, honestly: a wide, well-researched list becomes personal messages, a few conversations, and a handful of first clients. Most won't reply, and that's normal.",
        },
        { t: "p", text: "Most people won't reply: that's completely normal and not a judgement on you. A list of 100 well-chosen businesses gives you enough conversations to land your first clients." },
      ],
    },
    {
      heading: "Step 1: Pick one niche",
      blocks: [
        { t: "list", items: ["Tailors and fashion designers in Lagos (your Bisi practice is perfect proof)", "Salons and spas in Lekki", "Private clinics in Abuja", "Restaurants in Port Harcourt", "Schools in Ibadan", "Nigerian-owned businesses abroad (for dollar clients)"] },
        { t: "tip", text: "Choose a niche where businesses **have money**, **need customers to find them**, and where you **understand the customer**. Your practice project can become your niche's first case study." },
        { t: "check", q: "Why choose one niche instead of “any business”?", options: ["It's required", "Your messages, examples and prices can be specific and convincing", "It's cheaper to send messages"], answer: 1, why: "Specific offers win. “I build booking sites for tailors” beats “I do websites”." },
      ],
    },
    {
      heading: "Step 2: Find them, legally",
      blocks: [
        { t: "table", columns: ["Source", "How"], rows: [["Google Maps", "Search “tailor Surulere”, open each result, and note the website, phone and reviews, **by hand**"], ["Instagram", "Search hashtags and locations: many businesses only have Instagram"], ["Directories", "Business directories and associations that list members publicly"], ["Your network", "Friends, family, church, alumni, Bisi's own contacts: often the warmest"]] },
        { t: "tool", slug: "prospect-list-builder", why: "Builds your search queries, the columns to collect, and a scoring sheet." },
        {
          t: "define",
          term: "Scraping",
          like: "photocopying a whole directory with a machine instead of reading it: fast, but some offices forbid it.",
          meaning: "Using software to copy information from websites automatically. Some sites allow it, many forbid it in their terms, and **Google Maps forbids it**.",
        },
        { t: "tool", slug: "web-scraper-config", why: "Extract business names and links from a public directory page, only where that site's terms allow it." },
        { t: "warn", text: "Collect from Google Maps **by hand**. Only collect **public business information**, respect each website's terms, and never collect private individuals' personal data. Nigeria's Data Protection Act protects personal information; a relevant, respectful offer to a business's public contact is normal, spam is not." },
        { t: "try", title: "Find your first 10", minutes: 15, steps: ["Open Google Maps and search your niche plus an area.", "Add 10 businesses to your sheet: name, link, phone or Instagram, rating, notes.", "Note one thing about each: “no website”, “slow site”, “no booking”…"] },
      ],
    },
    {
      heading: "Step 3: Score them",
      blocks: [
        { t: "p", text: "Not all prospects are equal. Give each one points so you contact the best first:" },
        { t: "table", columns: ["Signal", "Points"], rows: [["No website, or a broken or slow one", "+3"], ["Active on Instagram or WhatsApp (they want customers)", "+2"], ["Many good reviews (busy, likely has money)", "+2"], ["No online booking or payment", "+2"], ["Recently opened or expanding", "+1"]] },
        { t: "tool", slug: "lead-qualification", why: "Turns your signals into a consistent score and hot, warm and cold labels." },
        { t: "check", q: "A pharmacy has 4 reviews and a fast website with online ordering. A bakery has 150 great reviews, no website and no online ordering. Who do you contact first?", options: ["The pharmacy", "The bakery", "Neither"], answer: 1, why: "The bakery is busy (likely can pay) and has a clear gap you can fill." },
      ],
    },
    {
      heading: "Step 4: Research the top 20",
      blocks: [
        { t: "p", text: "For your 20 highest scores, spend about 5 minutes each finding **one specific thing** you can help with. That's what makes a message worth replying to." },
        { t: "tool", slug: "website-speed-checklist", why: "Check their site's speed in seconds: a slow site is an easy, specific opener." },
        { t: "prompt", title: "Research prompt", text: "Here is information about a business: [name, website text or Instagram bio, a summary of its Google reviews]. As a web consultant, list the 3 most valuable improvements a website, booking page, Google profile, online payments or a simple automation could bring them, each in one sentence a business owner would understand. Only use the information given." },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Generic", nodes: [{ draw: "chat", label: "“Do you need a website?”" }, { draw: "cross", label: "ignored" }] },
            right: { title: "Specific", nodes: [{ draw: "search", label: "“180 reviews, but no way to book”" }, { draw: "check", label: "“How did you see that?”", hot: true }] },
          },
          caption: "Research turns a stranger into a conversation: a generic question gets ignored, a specific observation about their own business gets a reply.",
        },
        {
          t: "scenario",
          title: "Specific beats generic",
          text: "Generic: “Do you need a website?”, ignored. Specific: “I noticed your shop has 180 great Google reviews, but there's no way to book a fitting online, and your number isn't on your Instagram.” The owner replies: “How did you see that?” Five minutes of research turned a stranger into a conversation.",
        },
        { t: "mistakes", items: [{ wrong: "Scraping Google Maps with a bot", right: "Collecting from Maps by hand; scraping only where terms allow" }, { wrong: "100 random businesses", right: "100 businesses in one niche and area" }, { wrong: "Messaging everyone the same day with no research", right: "Researching the top 20 first, one specific observation each" }] },
        { t: "win", title: "Your top 20 are researched", proved: "you can find businesses that genuinely need you and know exactly what to say to each one, the step most freelancers skip.", cue: "Sort your sheet by score: it's your outreach list for Day 23. Finish the mission for the **List builder** badge." },
      ],
    },
  ],
  task: {
    title: "Build your prospect list",
    steps: ["Choose one niche and one area.", "Collect 100 businesses in your sheet (name, link, phone or Instagram, notes).", "Score all 100.", "Research the top 20 and note one specific improvement for each.", "Sort by score: this is your outreach list."],
    done: ["My list has 100 real businesses in one niche", "Every business has a score", "The top 20 each have a specific, researched improvement", "I only collected public business information, by allowed methods"],
  },
  recap: [
    "Pick a **niche** so your messages, examples and prices are specific and convincing.",
    "The best prospects are **busy (good reviews) but have a clear gap**: no website, booking or payment.",
    "Collect only **public business information**, respect site terms, and **never scrape Google Maps**.",
    "Research each top prospect for **one specific observation**: it makes your message worth replying to.",
    "Most prospects won't reply: from 100, **a handful of clients** is a realistic early result.",
  ],
  resources: [
    { label: "Google Maps", url: "https://www.google.com/maps", note: "The best source of local businesses: collect by hand." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "The rules on personal data." },
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and sales training." },
    { label: "Apollo Academy", url: "https://www.apollo.io/academy", note: "Free lessons on prospecting and outreach." },
  ],
  quiz: [
    { q: "Which prospect deserves the highest score?", options: ["A fast, modern site with online booking", "A busy shop with great reviews but no website or booking", "A closed business", "A big bank"], answer: 1, why: "Busy plus a clear gap = real need and the ability to pay.", from: 1, aim: "core" },
    { q: "Which information is OK to collect?", options: ["Private home addresses", "Public business information, collected in ways the site's terms allow", "Customers' phone numbers", "Anything you can find"], answer: 1, why: "Stick to public business information and respect terms and the law. Your outreach on Day 23 uses only what you collected properly.", from: 2, aim: "cold-outreach" },
    { q: "Why research the top 20 one by one?", options: ["To waste time", "A specific observation makes your message worth replying to", "Google requires it", "To copy their site"], answer: 1, why: "Personal messages get far more replies. On Day 23 each observation becomes your opening line.", from: 3, aim: "cold-outreach" },
    { q: "From 100 well-researched prospects, what's a realistic early result?", options: ["100 clients", "50 clients", "A handful of clients", "Zero, guaranteed"], answer: 2, why: "Most won't reply; a few good clients is a great start.", from: 4, aim: "client-work" },
    { q: "Why focus on one niche?", options: ["It's the law", "Your messages, examples and prices can be specific and convincing", "It's cheaper", "To avoid work"], answer: 1, why: "Specific beats generic. Tomorrow's free offer is built for your niche.", from: 0, aim: "lead-magnets-qualification" },
  ],
  celebrate: {
    title: "Day 21 complete: you know who to call",
    proved: "You can find businesses that genuinely need you, legally and carefully, and know exactly what to say to each one.",
    badge: "List builder",
    badgeDesc: "Built and researched a prospect list",
  },
};

export default lesson;
