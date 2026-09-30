import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "seo-keywords-onpage",
  title: "SEO: keywords, titles & on-page",
  minutes: 100,
  outcome: "A keyword plan for a site, plus a unique title, description, headings and business details added to every page, and the site submitted to Google.",
  intro:
    "A beautiful website that nobody finds earns nothing. When someone in Lekki types “lash extensions near me” into Google, which businesses appear? Today you learn **SEO**, making a website easy for Google to understand and show to the right people. You'll focus on the part you fully control: choosing the words customers really search for, and putting them where Google looks.",
  youNeed: ["Your live site", "A Google account", "The business's list of services and its area (e.g. “Lekki Phase 1”)", "About 90 minutes"],
  sections: [
    {
      heading: "How Google decides what to show",
      blocks: [
        { t: "define", term: "SEO (search engine optimisation)", meaning: "Everything you do so a website appears higher in Google's results for the searches that matter to the business.", like: "arranging a shop so the right customers can find it: clear signboard, right street, good reputation." },
        { t: "figure", figure: { diagram: "search-journey", caption: "Google visits your page (crawl), stores what it's about (index), orders the results (rank), and a customer clicks." } },
        { t: "p", text: "Google wants to show the most helpful page for each search. It reads your page's **title**, **headings**, **text** and **links**, and checks things like speed, whether it works on phones, and whether other sites trust you. You can't control everything, but you can make every page crystal clear." },
        { t: "figure", figure: { diagram: "serp-anatomy", caption: "One search result: the address, the title (about 60 characters), the description (about 155 characters) and extra links." } },
      ],
    },
    {
      heading: "Step 1: Find the words customers actually use",
      blocks: [
        { t: "define", term: "Keyword", meaning: "The words someone types into Google, like “lash extensions lekki price”.", like: "what a customer says when they walk up to the counter." },
        { t: "p", text: "Think like a **customer**, not the owner. The owner says “aesthetic lash services”; the customer types “lash extensions lekki price”." },
        { t: "define", term: "Search intent", meaning: "What the person searching actually wants: to **learn** something, to **compare** options, or to **buy** now. Different intents need different pages.", like: "“how do lash extensions work?” is a question; “lash studio near me” is someone ready to book." },
        { t: "figure", figure: { diagram: "keyword-intent", caption: "Match each keyword to the page that answers it: learning → article, comparing → prices page, buying → service page." } },
        { t: "tool", slug: "keyword-research-prompts", why: "Generates research prompts for AI, plus starter keywords grouped by intent and location." },
        {
          t: "steps",
          items: [
            { title: "Brainstorm with AI", detail: "Use the prompts to list 30–50 possible searches." },
            { title: "Check Google itself", detail: "Type a keyword slowly and read the autocomplete suggestions, then the “People also ask” box. These are real searches." },
            { title: "Check rough volume (optional)", detail: "Google Keyword Planner (free, inside a Google Ads account) shows roughly how many people search each month." },
            { title: "Make a keyword map", detail: "Give each page **one main keyword**. Two pages chasing the same keyword compete with each other." },
          ],
        },
        { t: "table", columns: ["Page", "Main keyword", "Supporting words"], rows: [["Home", "lash extensions lekki", "lash studio lagos"], ["Services", "lash extensions price lagos", "classic vs volume lashes"], ["Contact", "lash studio near me", "lekki phase 1 salon"]] },
        { t: "check", q: "Someone searches “web designer near me”. What do they most likely want?", options: ["To learn how websites work", "To hire someone now", "To read the news"], answer: 1, why: "“Near me” searches usually mean ready to act, send them to a service page with a clear button." },
        { t: "try", title: "Spy on Google's suggestions", minutes: 5, steps: ["Open Google on your phone.", "Type the business's main service plus your area slowly, e.g. “braids in sur…”.", "Write down every suggestion that appears. That's free keyword research."] },
      ],
    },
    {
      heading: "Step 2: Titles and descriptions",
      blocks: [
        { t: "define", term: "Title tag", meaning: "The page's name for search engines, usually the **blue link** in Google results and the text on the browser tab.", like: "the headline on a newspaper stand: the thing that makes you pick it up." },
        { t: "define", term: "Meta description", meaning: "A short summary of the page that often appears as the grey text under the blue link. Google sometimes rewrites it, but a good one still helps people click.", like: "the blurb on the back of a book." },
        { t: "list", items: ["**Title**: main keyword near the start, business name at the end, about **50–60 characters**. Example: “Lash Extensions in Lekki | Glow Beauty”.", "**Description**: what they get + why you + an action, about **140–158 characters**.", "**Every page** gets its own unique title and description."] },
        { t: "tool", slug: "meta-tag-generator", why: "Writes the title, description and social-share tags, shows a live Google preview, and can check the tags on any live link." },
      ],
    },
    {
      heading: "Step 3: Headings, words and links",
      blocks: [
        { t: "list", items: ["**One H1 per page** (the main title) that includes the main keyword naturally.", "**H2s** for each section, using related words.", "Answer what customers ask: prices, location, how long, what's included.", "**Internal links**: link your own pages together with clear words (“see our lash prices”, not “click here”).", "**Alt text** on images (Day 6). It also helps Google Images."] },
        { t: "define", term: "Internal link", meaning: "A link from one page of a website to another page on the **same** website.", like: "signs inside a shopping mall pointing to other shops in the same mall." },
        { t: "warn", text: "Don't **keyword-stuff**, repeating a keyword unnaturally (“lash lekki lash lekki best lash lekki”). Google treats it as spam and customers find it strange. Write for humans first." },
        { t: "mistakes", items: [{ wrong: "Every page titled “Home | Glow Beauty”", right: "Unique titles: “Lash Prices in Lagos | Glow Beauty”" }, { wrong: "Link text “click here”", right: "Link text “see our bridal lash packages”" }, { wrong: "Three H1 headings on one page", right: "One H1, then H2s for sections" }] },
      ],
    },
    {
      heading: "Step 4: Business details Google can read (schema)",
      blocks: [
        { t: "define", term: "Schema (structured data)", meaning: "Hidden code that tells search engines facts in a format they read perfectly: “this is a beauty salon, at this address, open these hours, phone number…”.", like: "filling in a government form with labelled boxes, instead of writing a letter and hoping they find the details." },
        { t: "prompt", title: "Add business schema", text: "Add LocalBusiness JSON-LD structured data to the site's layout with: name [ ], business type [BeautySalon / Restaurant / etc.], address [ ], phone [ ], opening hours [ ], website URL, logo, and map coordinates [ ]. Only include facts I've given you. Then tell me how to test it with Google's Rich Results Test." },
        { t: "tip", text: "Schema helps Google understand the business, but it doesn't guarantee anything extra in results, for example, Google doesn't show review stars for a business's own reviews on its own site. For local visibility, the Google Business Profile (next lesson) matters much more." },
      ],
    },
    {
      heading: "Step 5: Check, and tell Google",
      blocks: [
        { t: "tool", slug: "on-page-seo-audit", why: "Paste any link: it checks title, description, headings, alt text, links and schema, and lists the fixes." },
        {
          t: "steps",
          items: [
            { title: "Add a sitemap", detail: "A sitemap is a list of all your pages for Google. Ask Claude to add sitemap.xml and robots.txt. Next.js can generate both." },
            { title: "Verify the site in Google Search Console", detail: "It's free. Add the site, prove you own it (usually a DNS record, like on deploy day), then submit the sitemap." },
            { title: "Be patient", detail: "New pages can take days to weeks to appear in Google. SEO is a long game. That's why businesses pay for it monthly." },
          ],
        },
        { t: "define", term: "Google Search Console", meaning: "A free Google tool that shows how Google sees your site: which searches it appears for, how many clicks it gets, and any problems.", like: "a report card from Google for your website." },
        { t: "scenario", title: "Three weeks later", text: "A clinic's new site appeared in Google for its own name after a few days, but not yet for “family clinic Wuse”. The developer checked Search Console weekly, added a page answering common patient questions, and linked it from the home page. Month by month, more searches showed the site. That steady improvement is exactly what a monthly SEO client pays for." },
      ],
    },
  ],
  task: {
    title: "Optimise a site for search",
    steps: ["Research 30+ keywords and make a keyword map (one main keyword per page).", "Write a unique title and description for every page.", "Fix headings, alt text and internal links.", "Add LocalBusiness schema and test it.", "Run the on-page audit, fix what it finds, and submit the sitemap in Search Console."],
    done: ["Every page has a unique title of about 50–60 characters", "Every page has exactly one H1", "The schema test shows no errors", "The sitemap is submitted in Search Console"],
  },
  recap: [
    "A **keyword** is what someone types into Google, find them by thinking like a customer and using Google's own suggestions.",
    "A page **title** should be about **50–60 characters**, with the main keyword near the start; longer titles get cut off.",
    "Give each page **one main keyword**, pages chasing the same keyword compete with each other.",
    "**Schema** tells Google facts like business type, address and hours in a format it reads perfectly.",
    "“Near me” searches usually mean the person is **ready to buy**, send them to a service page with a clear button.",
  ],
  resources: [
    { label: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", note: "Google's own beginner guide." },
    { label: "Google Search Console", url: "https://search.google.com/search-console", note: "See how Google sees your site." },
    { label: "Rich Results Test", url: "https://search.google.com/test/rich-results", note: "Check your schema." },
    { label: "Ahrefs: SEO for beginners", url: "https://ahrefs.com/seo", note: "Free, well-explained SEO course." },
    { label: "Moz: Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo", note: "A classic, thorough free guide." },
  ],
  quiz: [
    { q: "What is a keyword?", options: ["A password", "What someone types into Google", "A type of font", "A domain name"], answer: 1, why: "Keywords are the searches you want the page to appear for.", from: 0 },
    { q: "Roughly how long should a page title be?", options: ["5–10 characters", "50–60 characters", "300 characters", "Length doesn't matter"], answer: 1, why: "Longer titles get cut off in Google's results.", from: 1 },
    { q: "How many main keywords should each page target?", options: ["One main keyword, plus related words", "The same keyword on every page", "As many as possible", "None"], answer: 0, why: "One clear focus per page; pages chasing the same keyword compete.", from: 2 },
    { q: "What does schema (structured data) do?", options: ["Makes pages load faster", "Tells Google facts like business type, address and hours in a format it reads perfectly", "Changes colours", "Blocks spam"], answer: 1, why: "It helps Google understand the page precisely.", from: 3 },
    { q: "A customer searches “web designer near me”. What's their likely intent?", options: ["Learning", "Comparing", "Ready to buy or hire", "Nothing"], answer: 2, why: "“Near me” searches usually mean ready to act.", from: 4 },
  ],
};

export default lesson;
