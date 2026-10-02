import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "seo-keywords-onpage",
  title: "Get found on Google",
  minutes: 110,
  outcome: "A list of the words Bisi's customers really search, those words placed where Google reads them on every page, her business details written in a form Google reads perfectly, the site submitted to Google, and her free listing on Google Maps started.",
  intro:
    "Bisi's website is beautiful, fast and it works. But when someone in Yaba types “tailor near me” or “corporate gown tailor in Lagos” into Google, Bisi doesn't appear. A website nobody finds earns nothing. Today you'll learn the part of getting found that you fully control: choosing the exact words customers type, putting them where Google looks first, and telling Google the site exists. It's the start of a service businesses pay for every month.",
  core: "Find the exact words customers type into Google and put them where Google reads first: the page title, the main heading and the opening words.",
  youNeed: ["Your live site", "A Google account (Gmail)", "The business's services and area (e.g. “Yaba, Lagos”)", "About 90 minutes"],
  sections: [
    {
      heading: "How Google decides what to show",
      blocks: [
        {
          t: "define",
          term: "SEO",
          like: "making a shop easy to find: a clear signboard on the right street, a listing in the market directory, and a good name among customers.",
          meaning: "**SEO** (search engine optimisation) is everything you do so a website appears higher in Google's results for the searches that matter to the business.",
        },
        {
          t: "define",
          term: "Crawl and index",
          like: "Google's messenger walking through the whole market every day, visiting every shop and writing what each one sells in a giant register. When a customer asks, Google checks the register.",
          meaning: "Google's programs visit pages (**crawl**), store what each page is about (**index**), then rank the indexed pages for each search. A page that isn't indexed can't appear at all.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "robot", label: "Google's messenger visits" }, { draw: "book", label: "writes it in the register" }, { draw: "search", label: "a customer searches" }, { draw: "shop", label: "the best matches shown", hot: true }], arrows: ["crawl", "index", "rank"] },
          caption: "How a page reaches a customer on Google: the messenger visits and reads the page, writes it into the register, and when someone searches, the best-matching pages are shown first.",
        },
        { t: "figure", figure: { diagram: "search-journey", caption: "Google visits your page (crawl), stores what it's about (index), orders the results (rank), and a customer clicks." } },
        { t: "p", text: "Google wants to show the most helpful page for each search. It reads a page's **title**, **headings**, **words** and **links**, and checks things like speed, whether it works on phones (you did that on Day 6) and whether other sites trust it. You can't control everything, but you can make every page crystal clear." },
        { t: "figure", figure: { diagram: "serp-anatomy", caption: "One search result: the address, the title (about 60 characters), the description (about 155 characters)." } },
      ],
    },
    {
      heading: "Step 1: Find the words customers actually use",
      blocks: [
        {
          t: "define",
          term: "Keyword",
          like: "what a customer says at the counter (“Do you sew corporate gowns?”), not the words on the owner's certificate.",
          meaning: "The words someone types into Google, like “corporate gown tailor Lagos”. Each page aims at the words its customers really use.",
        },
        {
          t: "define",
          term: "Search intent",
          like: "“How much is aso-ebi sewing?” is someone asking around; “tailor near me open now” is someone with fabric in hand, ready to walk in.",
          meaning: "What the person searching actually wants: to **learn**, to **compare**, or to **buy now**. Each kind needs a different page.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "The owner's words", nodes: [{ draw: "chat", label: "“bespoke couture solutions”" }, { draw: "cross", label: "nobody types this" }] },
            right: { title: "The customer's words", nodes: [{ draw: "search", label: "“tailor in Yaba”", hot: true }, { draw: "check", label: "typed every day" }] },
          },
          caption: "Owners describe themselves in proud words; customers search in plain ones. SEO uses the customer's words.",
        },
        { t: "figure", figure: { diagram: "keyword-intent", caption: "Match each kind of search to the page that answers it: learning → article, comparing → prices page, buying → service page." } },
        { t: "tool", slug: "keyword-research-prompts", why: "Generates research prompts for your AI assistant, plus starter keywords grouped by intent and location." },
        {
          t: "steps",
          items: [
            { title: "Brainstorm with AI", detail: "Use the tool's prompts to list 30 to 50 possible searches for the business and its area." },
            { title: "Check Google itself", detail: "On your phone, type a search slowly (“tailor in Ya…”) and write down every suggestion that appears. Then search it and look at the **People also ask** box. These are real searches." },
            { title: "Check rough numbers (optional)", detail: "Google Keyword Planner (free, inside a Google Ads account) shows roughly how many people search each phrase a month. It asks for business details; you can skip it." },
            { title: "Make a keyword map", detail: "Give each page **one main keyword** plus a few related words. Two pages chasing the same keyword compete with each other." },
          ],
        },
        { t: "table", columns: ["Page", "Main keyword", "Related words"], rows: [["Home", "tailor in Yaba", "female tailor Lagos, native wear tailor"], ["Services", "corporate gown tailor Lagos", "boubou tailor, kimono sewing"], ["Aso-ebi page", "aso ebi tailor Lagos", "aso ebi sewing price, wedding group outfits"], ["Contact", "tailor near me Yaba", "tailor Herbert Macaulay Way"]] },
        { t: "check", q: "Someone searches “web designer near me”. What do they most likely want?", options: ["To learn how websites work", "To hire someone now", "To read the news"], answer: 1, why: "“Near me” searches usually mean ready to act: send them to a service page with a clear button." },
        { t: "try", title: "Read Google's mind", minutes: 5, steps: ["Open Google on your phone.", "Type the business's main service plus your area slowly, e.g. “tailor in Sur…”.", "Write down every suggestion. That's free research, straight from real searches."] },
      ],
    },
    {
      heading: "Step 2: Titles and descriptions",
      blocks: [
        {
          t: "define",
          term: "Title tag",
          like: "the headline of a newspaper at the vendor's stand: the line that makes you pick that paper up.",
          meaning: "The page's name for search engines, usually the **blue link** in Google's results and the words on the browser tab. Keep it about **50 to 60 characters**: main search words first, business name last.",
        },
        {
          t: "define",
          term: "Meta description",
          also: ["Meta tag"],
          like: "the blurb on the back of a Nollywood DVD cover: a few lines that make you want to watch.",
          meaning: "A short summary of the page that often appears as the grey text under the blue link, about **140 to 158 characters**. Google sometimes rewrites it, but a good one helps people click.",
        },
        { t: "list", items: ["**Title**: “Corporate Gown Tailor in Lagos | Stitches by Bisi”.", "**Description**: what they get + why this business + an action: “Corporate gowns sewn to your measurements in Yaba, ready in 10 days. See prices and order on WhatsApp.”", "**Every page** gets its own title and description."] },
        { t: "tool", slug: "meta-tag-generator", why: "Writes the title, description and sharing tags, shows a live Google preview, and can check the tags on any live page." },
      ],
    },
    {
      heading: "Step 3: Headings, words and links",
      blocks: [
        { t: "list", items: ["**One H1 per page** (Day 6) that includes the main keyword naturally: “Corporate gowns sewn to your measurements in Lagos”.", "**H2s** for each section, using related words.", "Answer what customers ask: prices, location, how long, what's included.", "**Alt text** on photos (Day 6) also helps Google Images understand them."] },
        {
          t: "define",
          term: "Internal link",
          like: "the signs inside a plaza pointing to the other shops in the same plaza.",
          meaning: "A link from one page of a website to another page on the **same** website, with clear words (“see our corporate gown prices”, not “click here”). It helps visitors and Google find every page.",
        },
        { t: "prompt", title: "Put the words in place", text: "Here is my keyword map: [paste]. For each page, rewrite only: the <title> (50-60 characters, main keyword first, '| Stitches by Bisi' last), the meta description (140-158 characters, ending with an action), the one h1 (main keyword, naturally), and the first paragraph (mention the main keyword once, naturally). Add one or two internal links with descriptive words. Don't change anything else. Update each page." },
        { t: "warn", text: "Don't **keyword-stuff**: repeating words unnaturally (“tailor Yaba tailor Yaba best tailor Yaba”). Google treats it as spam and customers find it strange. Write for people first." },
        { t: "mistakes", items: [{ wrong: "Every page titled “Home | Stitches by Bisi”", right: "Unique titles: “Corporate Gown Tailor in Lagos | Stitches by Bisi”" }, { wrong: "Link words “click here”", right: "Link words “see our aso-ebi packages”" }, { wrong: "Three H1 headings on one page", right: "One H1, then H2s for sections" }] },
      ],
    },
    {
      heading: "Step 4: Business details Google reads perfectly",
      blocks: [
        {
          t: "define",
          term: "Schema",
          also: ["Structured data", "JSON-LD"],
          like: "filling in a NIN form with labelled boxes, instead of writing a letter and hoping the officer finds your details.",
          meaning: "Hidden code in a page that states facts in a form search engines read perfectly: “this is a tailor, at this address, open these hours, with this phone number.” Also called **structured data**; it's usually written in a format called **JSON-LD**.",
        },
        { t: "prompt", title: "Add business schema", text: "Add LocalBusiness JSON-LD structured data to index.html with: name [ ], business type [ClothingStore or a more specific type if one fits], address [ ], phone [ ], opening hours [ ], website address, logo, and map coordinates [ ]. Only include facts I have given you. Then tell me how to test it with Google's Rich Results Test." },
        { t: "tip", text: "Schema helps Google understand the business, but it doesn't guarantee anything extra in the results (Google doesn't show star ratings for a business's own reviews on its own site). For local customers, the free listing below matters even more." },
        {
          t: "define",
          term: "Google Business Profile",
          also: ["GBP"],
          like: "the business's signboard on Google Maps, often seen before anyone visits the website.",
          meaning: "A free listing that shows a business on Google Search and Google Maps with its address, hours, phone, photos and reviews. For local businesses it often brings more calls than the website itself.",
        },
        {
          t: "steps",
          items: [
            { title: "Start it with the owner", detail: "On the owner's phone or laptop, signed into **their** Google account, go to `business.google.com` and click **Manage now**." },
            { title: "Search first", detail: "Type the business name. If it already exists (customers can add places), claim it; if not, create it." },
            { title: "Choose the category carefully", detail: "Be specific: **Tailor**, not just “Store”. This is the most important field." },
            { title: "Fill the basics and verify", detail: "Address (or the areas served, if customers don't visit), phone, website (your `.pages.dev` address), hours. Then follow Google's verification instructions exactly; it often asks for a short video of the shop." },
          ],
        },
        { t: "later", lesson: "local-seo-gbp", text: "start the profile with the owner using the steps above and add 10 real photos. Main Track students get a full lesson on making it rank in the map results." },
      ],
    },
    {
      heading: "Step 5: Tell Google the site exists",
      blocks: [
        {
          t: "define",
          term: "Sitemap",
          like: "the directory board at a plaza entrance that lists every shop and which floor it's on.",
          meaning: "A file called `sitemap.xml` that lists every page of a website, so Google finds them all.",
        },
        {
          t: "define",
          term: "robots.txt",
          like: "the “Staff only” sign on a door: polite visitors read it and stay out.",
          meaning: "A small file at the top of a site that tells search engines which parts not to visit, and where the sitemap is.",
        },
        {
          t: "define",
          term: "Google Search Console",
          like: "the report card Google writes about a website: how often it appeared, how many people clicked, and what's wrong.",
          meaning: "A free Google tool that shows which searches a site appears for, the clicks it gets, and any problems Google found. You also submit the sitemap there.",
        },
        { t: "prompt", title: "Sitemap and robots.txt", text: "My site's address is [your .pages.dev address] and its pages are: [list every .html file]. Create site/sitemap.xml listing every public page with its full address, and site/robots.txt that allows everything and points to the sitemap. Leave out admin.html and portal.html from the sitemap. Save both in site." },
        {
          t: "steps",
          items: [
            { title: "Upload the two files", detail: "Save `sitemap.xml` and `robots.txt` in `site`, upload to GitHub, commit. Open `your-address/sitemap.xml` to check it's live." },
            { title: "Open Search Console", detail: "Go to `search.google.com/search-console` and click **Start now**, signed into Google." },
            { title: "Add the site", detail: "Choose **URL prefix** (the box on the right) and paste the full address, starting with https://. Click **Continue**." },
            { title: "Prove it's yours", detail: "Choose the **HTML file** method and download the small file. Put it in `site`, upload it to GitHub, commit, wait a minute, then click **Verify**." },
            { title: "Submit the sitemap", detail: "In the left menu click **Sitemaps**, type `sitemap.xml` and click **Submit**. The status should turn to **Success**." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "“Verification failed” or “file not found”", means: "The verification file isn't live yet: not uploaded inside `site`, or the deployment hadn't finished.", fix: "Open your-address/[that file name] in a browser. When it opens, click Verify again." },
            { see: "“Couldn't fetch” next to the sitemap", means: "Google hasn't read it yet, or it isn't at that address.", fix: "Check your-address/sitemap.xml opens in a browser, then wait a day and look again." },
          ],
        },
        {
          t: "define",
          term: "SEO audit",
          also: ["Audit"],
          like: "a mechanic's inspection sheet: what's wrong, how serious it is, and what to fix first.",
          meaning: "A health check of a page or a whole site that lists what stops it appearing in Google (missing titles, no H1, heavy photos, missing details) and what to fix first.",
        },
        { t: "tool", slug: "on-page-seo-audit", why: "Paste any live page: it checks the title, description, headings, alt text, links and schema, and lists the fixes in order." },
        {
          t: "scenario",
          title: "Three weeks later",
          text: "Here's a typical pattern. After a few days, Bisi's site appears when people search her business name, but not yet for “tailor in Yaba”. You check Search Console weekly, add a page answering “How much does it cost to sew a corporate gown in Lagos?”, and link it from the home page. Month by month, more searches show the site. That steady improvement is exactly what a monthly SEO client pays for.",
        },
        { t: "win", title: "Google now knows Bisi exists", proved: "you can find the words customers really search, put them where Google reads them, and hand Google a map of the site, the first steps of every SEO job.", cue: "Screenshot the sitemap's “Success” status. Finish your mission for the **Found on Google** badge." },
      ],
    },
  ],
  task: {
    title: "Get a site ready for Google",
    steps: ["Research 30+ keywords and make a keyword map (one main keyword per page).", "Rewrite every page's title, description, H1 and opening words with the prompt.", "Add LocalBusiness schema and test it with the Rich Results Test.", "Add sitemap.xml and robots.txt, verify the site in Search Console and submit the sitemap.", "Run the on-page audit on two pages, fix what it finds, and start the owner's Google Business Profile."],
    done: ["Every page has its own title of about 50 to 60 characters", "Every page has exactly one H1 with its main keyword", "The schema test shows no errors", "The sitemap shows “Success” in Search Console", "The owner's Google Business Profile is started"],
  },
  recap: [
    "A **keyword** is what customers actually type into Google (like “corporate gown tailor Lagos”): find them by thinking like a customer and using Google's own suggestions.",
    "Give each page **one main keyword** and put it in the **title tag**, the **H1** and the opening words.",
    "A **title tag** is about **50 to 60 characters**, main words first and the business name last, like “Aso Ebi Tailor in Lagos | Stitches by Bisi”; longer titles get cut off.",
    "**Schema** states business facts (type, address, hours, phone) in a form Google reads perfectly.",
    "“Near me” searches usually mean the person is **ready to buy** (to find a business and go now): send them to a page with a clear button and the address.",
    "Submit a **sitemap** in **Google Search Console**, then be patient: new pages can take days to weeks to appear.",
  ],
  resources: [
    { label: "Google: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", note: "Google's own beginner guide." },
    { label: "Google Search Console", url: "https://search.google.com/search-console", note: "See how Google sees your site; submit the sitemap." },
    { label: "Rich Results Test", url: "https://search.google.com/test/rich-results", note: "Check your schema for errors." },
    { label: "Google Business Profile", url: "https://business.google.com", note: "Start or claim the free listing." },
    { label: "Moz: Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo", note: "A thorough, free classic." },
  ],
  quiz: [
    { q: "Bisi's main search words are “tailor in Yaba”. Where should they go first on her home page?", options: ["In the footer only", "In the title tag, the H1 and the opening words", "Hidden in white text", "Repeated 20 times at the bottom"], answer: 1, why: "Those are the places Google reads first. Put the words there naturally, once each.", from: 1, aim: "core" },
    { q: "Which is the best main keyword for Bisi's services page?", options: ["bespoke couture solutions", "corporate gown tailor Lagos", "welcome", "best of the best"], answer: 1, why: "It's what customers actually type. In the Main Track, every helpful article starts from a keyword like this.", from: 0, aim: "content-seo-audit" },
    { q: "Which title tag is best for the aso-ebi page?", options: ["Home", "Aso Ebi Tailor in Lagos for Wedding Groups | Stitches by Bisi", "Stitches by Bisi Stitches by Bisi Stitches by Bisi", "Click here for the best aso ebi tailoring services in all of Lagos State and beyond"], answer: 1, why: "About 50 to 60 characters, main words first, business name last. You'll write the title of your own website the same way.", from: 2, aim: "portfolio-site" },
    { q: "What does schema do for a business website?", options: ["Makes pages load faster", "States facts like business type, address and hours in a form Google reads perfectly", "Changes the colours", "Blocks spam"], answer: 1, why: "It helps Google understand the business precisely, and it must match the Google Business Profile.", from: 3, aim: "local-seo-gbp" },
    { q: "A customer searches “tailor near me”. What do they most likely want?", options: ["To learn how tailoring works", "To compare prices for next year", "To find a tailor and go now", "Nothing"], answer: 2, why: "“Near me” means ready to act. In the Main Track, the Google Business Profile wins exactly these searches.", from: 4, aim: "local-seo-gbp" },
  ],
  celebrate: {
    title: "Day 11 complete: Google knows Bisi exists",
    proved: "You can find the words customers really search, put them where Google reads them, and tell Google about a site: the start of the SEO work businesses pay for every month.",
    badge: "Found on Google",
    badgeDesc: "Submitted a site to Google with a sitemap",
  },
};

export default lesson;
