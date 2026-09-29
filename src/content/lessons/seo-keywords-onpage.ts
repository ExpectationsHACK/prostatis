import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "seo-keywords-onpage",
  title: "SEO: keywords, titles & on-page",
  minutes: 100,
  outcome: "A keyword map for a site, plus titles, meta descriptions, headings and schema added to every page.",
  intro:
    "SEO (search engine optimisation) means making a website easy for Google to understand and show to the right people. A beautiful site nobody finds earns nothing. Today you learn the part of SEO you fully control: choosing the words customers search for, and putting them where Google looks.",
  sections: [
    {
      heading: "How Google decides what to show",
      blocks: [
        { t: "p", text: "Google wants to show the most helpful page for each search. It reads your page's **title**, **headings**, **text**, **links** and **structured data**, and looks at signals like speed, mobile-friendliness and whether other sites trust you. You can't control everything — but you can make every page crystal clear." },
        { t: "figure", figure: { diagram: "serp-anatomy", caption: "A search result: the URL, the title (≈60 characters), the description (≈155 characters) and rich results from schema." } },
      ],
    },
    {
      heading: "Step 1 — Find the keywords customers actually use",
      blocks: [
        { t: "p", text: "A **keyword** is what someone types into Google. The trick is to think like a customer, not the business owner. The owner says “aesthetic lash services”; the customer types “lash extensions lekki price”." },
        { t: "figure", figure: { diagram: "keyword-intent", caption: "Match each keyword to the page that answers it: learning → blog, comparing → pricing, buying → service page." } },
        { t: "tool", slug: "keyword-research-prompts", why: "Generates research prompts for AI, plus seed keywords by intent and location." },
        { t: "steps", items: [
          { title: "Brainstorm with AI", detail: "Use the prompts to list 30–50 possible searches." },
          { title: "Check Google itself", detail: "Type a keyword and look at the autocomplete suggestions and the 'People also ask' box — these are real searches." },
          { title: "Check volume (optional)", detail: "Google Keyword Planner (free with a Google Ads account) shows rough monthly searches." },
          { title: "Build a keyword map", detail: "One main keyword per page. Two pages targeting the same keyword compete with each other." },
        ] },
        { t: "table", columns: ["Page", "Main keyword", "Supporting"], rows: [["Home", "lash extensions lekki", "lash studio lagos"], ["Services", "lash extensions price lagos", "classic vs volume lashes"], ["Contact", "lash studio near me", "lekki phase 1 salon"]] },
      ],
    },
    {
      heading: "Step 2 — Titles and meta descriptions",
      blocks: [
        { t: "p", text: "The **title** is the blue link in Google. The **meta description** is the grey text under it. Together they're your advert on Google — they decide whether people click." },
        { t: "list", items: ["Title: main keyword near the start, brand at the end, about 50–60 characters.", "Description: what they get + why you + a call to action, about 140–158 characters.", "Every page gets its own unique title and description."] },
        { t: "tool", slug: "meta-tag-generator", why: "Writes the title, description and social-share tags, shows a live Google preview, and can check the tags on any live URL." },
      ],
    },
    {
      heading: "Step 3 — Headings, content and links",
      blocks: [
        { t: "list", items: ["**One H1 per page** that includes the main keyword naturally.", "**H2s** for each section, using related words.", "Answer the questions customers ask — prices, location, how long, what's included.", "**Internal links**: link between your own pages with descriptive text (“see our lash prices”, not “click here”).", "**Image alt text** describing each image (it also helps image search)."] },
        { t: "warn", text: "Don't “keyword stuff” — repeating a keyword unnaturally. Google penalises it and customers find it strange. Write for humans first." },
      ],
    },
    {
      heading: "Step 4 — Schema: help Google understand the business",
      blocks: [
        { t: "p", text: "**Schema** (structured data) is hidden code that tells Google facts in a format it reads perfectly: “this is a beauty salon, at this address, open these hours, with this phone number.” It can unlock rich results like star ratings." },
        { t: "prompt", title: "Add schema", text: "Add LocalBusiness JSON-LD schema to the site's layout with: name [ ], type [BeautySalon / Restaurant / etc.], address [ ], phone [ ], opening hours [ ], URL, logo and geo coordinates [ ]. Only include facts I've given you. Then tell me how to test it with Google's Rich Results Test." },
      ],
    },
    {
      heading: "Step 5 — Audit and submit to Google",
      blocks: [
        { t: "tool", slug: "on-page-seo-audit", why: "Paste any URL — it checks title, description, headings, alt text, links, canonical and schema, and lists the fixes." },
        { t: "steps", items: [
          { title: "Add a sitemap", detail: "Ask Claude to generate sitemap.xml and robots.txt (Next.js can do this automatically)." },
          { title: "Verify in Google Search Console", detail: "Free tool from Google. Add the site, verify it (usually a DNS record), submit the sitemap." },
          { title: "Be patient", detail: "New pages can take days to weeks to appear. SEO is a long game — that's why clients pay monthly for it." },
        ] },
      ],
    },
  ],
  task: {
    title: "Optimise a site for search",
    steps: ["Research 30+ keywords and build a keyword map (one main keyword per page).", "Write a unique title and description for every page.", "Fix headings, alt text and internal links.", "Add LocalBusiness schema and test it.", "Run the on-page audit, fix issues, and submit the sitemap in Search Console."],
    done: ["Every page has a unique title under 60 characters", "Every page has exactly one H1", "Schema passes the Rich Results Test", "The sitemap is submitted in Search Console"],
  },
  resources: [
    { label: "Google Search Central — SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", note: "Google's own beginner guide." },
    { label: "Google Search Console", url: "https://search.google.com/search-console", note: "See how Google sees your site." },
    { label: "Rich Results Test", url: "https://search.google.com/test/rich-results", note: "Check your schema." },
    { label: "Ahrefs — SEO for beginners", url: "https://ahrefs.com/seo", note: "Free, well-explained SEO course." },
    { label: "Moz — Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo", note: "A classic, very thorough free guide." },
  ],
  quiz: [
    { q: "What is a keyword?", options: ["A password", "What someone types into Google", "A type of font", "A domain name"], answer: 1, why: "Keywords are the searches you want the page to appear for." },
    { q: "How long should a page title be, roughly?", options: ["5–10 characters", "50–60 characters", "300 characters", "It doesn't matter"], answer: 1, why: "Longer titles get cut off in Google's results." },
    { q: "How many main keywords should each page target?", options: ["One main keyword (plus related ones)", "The same keyword on every page", "As many as possible", "None"], answer: 0, why: "One clear focus per page; pages targeting the same keyword compete." },
    { q: "What does schema (structured data) do?", options: ["Makes pages load faster", "Tells Google facts like business type, address and hours in a machine-readable way", "Changes colours", "Blocks spam"], answer: 1, why: "It helps Google understand the page and can unlock rich results." },
    { q: "A customer searches “web designer near me”. What intent is that?", options: ["Learning", "Comparing", "Buying — ready to hire", "None"], answer: 2, why: "“Near me” searches usually mean ready to act — match them to a service page." },
  ],
};

export default lesson;
