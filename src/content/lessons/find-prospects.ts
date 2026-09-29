import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "find-prospects",
  title: "Find prospects: lists & research",
  minutes: 100,
  outcome: "A list of 100 real businesses that need what you sell, each scored and researched.",
  intro:
    "Skills don't pay until someone buys them. The good news: thousands of Nigerian businesses have no website, a broken one, or no way to book or pay online. Today you'll build a list of 100 of them — carefully, legally, and with enough research that your messages feel personal.",
  sections: [
    {
      heading: "The funnel: why you need 100",
      blocks: [
        { t: "figure", figure: { diagram: "funnel", caption: "Typical numbers: out of 100 good prospects, a handful become clients. More research = better numbers." } },
        { t: "p", text: "Outreach is a numbers game played with quality. Most people won't reply — that's normal. A list of 100 well-chosen businesses gives you enough conversations to land your first clients." },
      ],
    },
    {
      heading: "Step 1 — Pick a niche",
      blocks: [
        { t: "p", text: "“Any business” is too broad. Pick one niche and one area to start — your messages, portfolio and pricing can then be specific." },
        { t: "list", items: ["Salons and spas in Lekki", "Private clinics in Abuja", "Restaurants in Port Harcourt", "Schools in Ibadan", "Real-estate agents in Lagos", "Nigerian businesses abroad (for dollar clients)"] },
        { t: "tip", text: "Choose a niche where businesses have money, rely on customers finding them, and you understand the customer. Your Week 1–3 projects can become your niche portfolio." },
      ],
    },
    {
      heading: "Step 2 — Find them",
      blocks: [
        { t: "table", columns: ["Source", "How"], rows: [["Google Maps", "Search “salon Lekki”, open each result, note website, phone, reviews"], ["Instagram", "Search hashtags and locations — many businesses only have Instagram"], ["Directories", "VConnect, BusinessList.com.ng, industry associations"], ["Your network", "Friends, family, church, alumni — often the warmest leads"]] },
        { t: "tool", slug: "prospect-list-builder", why: "Builds your search queries, the columns to collect, and a scoring template." },
        { t: "tool", slug: "web-scraper-config", why: "Paste a public directory page and extract business names, links and phone numbers into a table." },
        { t: "warn", text: "Only collect public business information, respect each site's terms, and never scrape personal data. Nigeria's Data Protection Act (NDPA) applies to personal information — business contact details used respectfully for a relevant offer are the norm; spam is not." },
      ],
    },
    {
      heading: "Step 3 — Score them",
      blocks: [
        { t: "p", text: "Not all prospects are equal. Give each one points so you contact the best first:" },
        { t: "table", columns: ["Signal", "Points"], rows: [["No website, or a broken/slow one", "+3"], ["Active on Instagram/WhatsApp (they want customers)", "+2"], ["Many good reviews (busy, has money)", "+2"], ["No online booking or payment", "+2"], ["Recently opened or expanding", "+1"]] },
        { t: "tool", slug: "lead-qualification", why: "Turn your signals into a consistent score and hot/warm/cold labels." },
      ],
    },
    {
      heading: "Step 4 — Research the top 20",
      blocks: [
        { t: "p", text: "For your 20 highest-scored prospects, spend 5 minutes each finding one specific thing you can help with. This is what makes a message worth replying to." },
        { t: "tool", slug: "website-speed-checklist", why: "Check their site's speed in seconds — a slow site is an easy, specific opener." },
        { t: "prompt", title: "Research prompt", text: "Here is information about a business: [name, website text or Instagram bio, reviews summary]. As a web consultant, list the 3 most valuable improvements a website, booking system, SEO or automation could bring them, each in one sentence a business owner would understand. Only use the information given." },
      ],
    },
  ],
  task: {
    title: "Build your prospect list",
    steps: ["Choose one niche and one area.", "Collect 100 businesses in a sheet (name, link, phone/IG, notes).", "Score all 100.", "Research the top 20 and note one specific improvement for each.", "Sort by score — this is your outreach list for Day 22."],
    done: ["My list has 100 real businesses in one niche", "Every business has a score", "The top 20 each have a specific, researched improvement", "I only collected public business information"],
  },
  resources: [
    { label: "Google Maps", url: "https://www.google.com/maps", note: "The best source of local businesses." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "Know the rules on personal data." },
    { label: "HubSpot Academy — Sales courses", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and sales training." },
    { label: "Instantly / Apollo blogs", url: "https://www.apollo.io/academy", note: "Free lessons on prospecting and outreach." },
  ],
  quiz: [
    { q: "Why pick a niche?", options: ["It's required", "Your messages, portfolio and pricing can be specific and convincing", "It's cheaper", "To avoid working"], answer: 1, why: "Specific beats generic in outreach." },
    { q: "Which prospect deserves the highest score?", options: ["A fast, modern site with online booking", "A busy salon with great reviews but no website or booking", "A closed business", "A big bank"], answer: 1, why: "Busy + clear gap = strong need and ability to pay." },
    { q: "What information is OK to collect?", options: ["Personal home addresses", "Public business information, respecting site terms", "Customers' phone numbers", "Anything you can find"], answer: 1, why: "Stick to public business info and respect data protection law." },
    { q: "Why research the top 20 individually?", options: ["To waste time", "A specific observation makes your message worth replying to", "It's required by Google", "To copy their site"], answer: 1, why: "Personalised messages get far more replies." },
    { q: "Out of 100 prospects, how many clients is a realistic early result?", options: ["100", "50", "A handful", "Zero is guaranteed"], answer: 2, why: "Most won't reply — a few good clients is a great start." },
  ],
};

export default lesson;
