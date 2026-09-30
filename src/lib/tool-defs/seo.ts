import { auditFromFacts, renderLocalCheck, renderMetaCheck, renderPageAudit, type PageData } from "./live";
import { extractPage } from "./page-facts";
import { arr, lines, opts, or, s, slugify, type Block, type ToolDef } from "./types";

const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
/** Shorten to a limit without cutting a word in half. */
const clip = (x: string, max: number) => (x.length <= max ? x : x.slice(0, max).replace(/\s+\S*$/, ""));

// ---------- Keyword Research Prompt Generator ----------
const keywordResearch: ToolDef = {
  kind: "generator",
  intro: "Enter a service and a location. You get starter keywords grouped by what the searcher wants, a keyword map for the site, quick Google checks and an AI research prompt.",
  examples: [
    { label: "Web design, Lagos", values: { service: "web design", location: "Lagos", audience: "small businesses" } },
    { label: "Lash extensions, Lekki", values: { service: "lash extensions", location: "Lekki", audience: "working women" } },
    { label: "Solar, Abuja", values: { service: "solar installation", location: "Abuja", audience: "homeowners" } },
    { label: "Catering, PH", values: { service: "event catering", location: "Port Harcourt", audience: "families and offices" } },
  ],
  fields: [
    { key: "service", label: "Service / product", type: "text", default: "web design" },
    { key: "location", label: "Location", type: "text", default: "Lagos" },
    { key: "audience", label: "Customer type", type: "text", default: "small businesses" },
  ],
  generate(v) {
    const sv = or(s(v, "service"), "service"), loc = s(v, "location"), aud = s(v, "audience");
    const L = loc ? ` ${loc}` : "";
    const groups: [string, string[]][] = [
      ["Buy now (commercial)", [`${sv}${L}`, `best ${sv}${L}`, `${sv} company${L}`, `affordable ${sv}${L}`, `${sv} near me`, `${sv} prices${L}`]],
      ["Comparing (investigational)", [`${sv} cost${L}`, `how much is ${sv}${L}`, `price of ${sv}${L}`, `${sv} packages`, `${sv} for ${or(aud, "business")}`]],
      ["Learning (informational)", [`what is ${sv}`, `how to choose a ${sv} provider`, `${sv} checklist`, `${sv} tips for ${or(aud, "beginners")}`, `why ${or(aud, "businesses")} need ${sv}`]],
    ];
    const prompt = `Act as an SEO strategist for a ${sv} business${loc ? ` in ${loc}` : ""} serving ${or(aud, "customers")}.
1. Expand this seed list into 40 keywords people actually search, grouped by intent (commercial, investigational, informational):
${groups.flatMap(([, k]) => k).join(", ")}
2. For each, estimate difficulty (low/med/high) and which page type should target it (service page, location page, blog post, FAQ).
3. Pick the 5 best "quick win" keywords for a new website and explain why.
Return a table.`;
    const g = (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    return [
      { type: "table", title: "Seed keywords by intent", columns: ["Intent", "Keywords to check"], rows: groups.map(([g, k]) => [g, k.join("\n")]) },
      {
        type: "table",
        title: "Starter keyword map: one main keyword per page",
        columns: ["Page", "Main keyword", "Why"],
        rows: [
          ["Home page", groups[0][1][0], "The broadest “ready to buy” search"],
          ["Service page", groups[0][1][2], "People comparing providers"],
          ["Prices page", groups[1][1][0], "People checking cost: close to buying"],
          ["Article", groups[1][1][1], "Answers the “how much” question in depth"],
          ["Article", groups[2][1][1], "Catches people still deciding, earlier"],
        ],
      },
      { type: "table", title: "Check these in Google now (look at autocomplete and “People also ask”)", columns: ["Search", "Open"], rows: [groups[0][1][0], groups[0][1][4], groups[1][1][1], groups[2][1][1]].map((q) => [q, g(q)]) },
      { type: "text", title: "Research prompt for your AI", text: prompt },
      { type: "notice", tone: "info", text: "Check real volumes in Google Keyword Planner (free with a Google Ads account) or Google Search Console once the site is live. Use 'People also ask' for FAQ ideas." },
    ];
  },
};

// ---------- Meta Title / Description Generator ----------
const metaTags: ToolDef = {
  kind: "generator",
  intro: "Check a live page's current tags, then write better ones: title and description options with length checks and a Google preview.",
  live: {
    kind: "page",
    title: "See how a page looks in Google today",
    button: "Check page",
    url: { placeholder: "yourwebsite.com/services", hint: "Reads the page's current title, description and share tags." },
    render: (d: PageData) => renderMetaCheck(d),
  },
  examples: [
    { label: "Lash studio page", values: { brand: "Glow Beauty Studio", domain: "glowbeauty.ng", keyword: "lash extensions in Lekki", benefit: "natural-looking lashes that last 4 weeks", cta: "Book online today", path: "/lash-extensions" } },
    { label: "Solar company", values: { brand: "SunPower NG", domain: "sunpower.ng", keyword: "solar installation in Abuja", benefit: "steady power without generator costs", cta: "Get a free quote", path: "/solar-installation-abuja" } },
    { label: "Restaurant menu", values: { brand: "Mama's Kitchen", domain: "mamaskitchen.ng", keyword: "lunch delivery in Ikeja", benefit: "hot home-style meals in 30 minutes", cta: "Order on WhatsApp", path: "/menu" } },
  ],
  fields: [
    { key: "brand", label: "Brand", type: "text", default: "Glow Beauty Studio", half: true },
    { key: "domain", label: "Domain", type: "text", default: "glowbeauty.ng", half: true },
    { key: "keyword", label: "Main keyword", type: "text", default: "lash extensions in Lekki" },
    { key: "benefit", label: "Main benefit", type: "text", default: "natural-looking lashes that last 4 weeks" },
    { key: "cta", label: "Call to action", type: "text", default: "Book online today" },
    { key: "path", label: "Page path", type: "text", default: "/lash-extensions" },
  ],
  generate(v) {
    const b = or(s(v, "brand"), "Brand"), kw = or(s(v, "keyword"), "keyword"), ben = s(v, "benefit"), cta = s(v, "cta");
    const titles = [`${cap(kw)} | ${b}`, `${cap(kw)}: ${cap(ben || "trusted service")} | ${b}`, `Best ${kw} | ${b}`, `${b}: ${cap(kw)}`];
    const descs = [
      `${cap(ben || kw)}. ${b} offers ${kw}. ${cta}.`,
      `Looking for ${kw}? ${b} delivers ${ben || "great results"}. ${cta}.`,
      `${cap(kw)} by ${b}: ${ben || "quality you can see"}. ${cta}, pay easily online.`,
    ];
    const rate = (x: string, lo: number, hi: number) => (x.length < lo ? `${x.length} chars: a bit short` : x.length > hi ? `${x.length} chars: too long, may be cut off` : `${x.length} chars ✓`);
    const bestT = titles.find((t) => t.length <= 60) ?? titles[0];
    const bestD = descs.find((d) => d.length >= 120 && d.length <= 158) ?? descs[0];
    const url = `https://${or(s(v, "domain"), "example.com")}${s(v, "path").startsWith("/") ? s(v, "path") : "/" + s(v, "path")}`;
    const q = (x: string) => x.replace(/"/g, "&quot;");
    const html = `<title>${bestT}</title>\n<meta name="description" content="${q(bestD)}" />\n<link rel="canonical" href="${url}" />\n<meta property="og:title" content="${q(bestT)}" />\n<meta property="og:description" content="${q(bestD)}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:image" content="https://${or(s(v, "domain"), "example.com")}/og-image.jpg" /> <!-- 1200×630 photo: shows when shared on WhatsApp -->\n<meta name="twitter:card" content="summary_large_image" />`;
    return [
      { type: "serp", title: "Google preview", pageTitle: bestT, url: url.replace(/^https:\/\//, "").replace(/\//g, " › "), description: bestD },
      { type: "table", title: "Title options (aim 50–60 chars)", columns: ["Title", "Length"], rows: titles.map((t) => [t, rate(t, 30, 60)]) },
      { type: "table", title: "Description options (aim 120–158 chars)", columns: ["Description", "Length"], rows: descs.map((d) => [d, rate(d, 110, 158)]) },
      { type: "text", title: "HTML to paste in <head>", text: html },
      { type: "text", title: "Or tell your AI (Next.js)", text: `Set this page's metadata: title "${bestT}", description "${bestD}", canonical ${url}, and an Open Graph image (1200×630). Use the Next.js metadata API.` },
      { type: "list", title: "Before you publish", items: ["Every page gets its own title and description, never copy them between pages.", "Use the live check above on the published page to confirm the tags are there.", "Google may rewrite descriptions; a clear, specific one is still your best advert."] },
    ];
  },
};

// ---------- Local SEO Checklist (GBP) ----------
const localSeo: ToolDef = {
  kind: "checklist",
  intro: "Scan the business website, then tick the Google Business Profile items. Local SEO is how a business shows up in the map pack for 'near me' searches.",
  live: {
    kind: "page",
    title: "Scan a business website for local SEO",
    button: "Scan website",
    url: { placeholder: "businesswebsite.com", hint: "Checks LocalBusiness schema, map embed, click-to-call and address, and ticks what passes." },
    render: (d: PageData) => renderLocalCheck(d),
  },
  groups: [
    { title: "Google Business Profile", checks: [
      { id: "claimed", weight: 3, text: "Profile claimed and verified", fix: "Go to business.google.com, search the business and claim it. Google chooses the method, often a short unedited video showing the location, equipment and the owner managing it." },
      { id: "category", weight: 3, text: "Primary category is the most specific one (e.g. 'Hair salon', not 'Beauty')", fix: "Edit profile → Business category; add 2–4 secondary categories." },
      { id: "nap", weight: 3, text: "Name, address, phone exactly match the website", fix: "Copy the same NAP format everywhere: footer, contact page, directories." },
      { id: "hours", weight: 2, text: "Hours (including holidays) set", fix: "Add regular and special hours so Google doesn't mark you 'possibly closed'." },
      { id: "photos", weight: 2, text: "10+ real photos (outside, inside, team, work)", fix: "Upload new photos monthly; geotagging isn't needed." },
      { id: "services", weight: 2, text: "Services/products added with descriptions", fix: "Add every service with a keyword-rich description and price range." },
      { id: "posts", weight: 1, text: "Posting updates at least weekly", fix: "Use the GBP Post Generator tool: offers, events, updates." },
    ] },
    { title: "Reviews", checks: [
      { id: "count", weight: 3, text: "20+ Google reviews, 4.5★ or higher", fix: "Send the review link on WhatsApp right after every happy job." },
      { id: "reply", weight: 2, text: "Every review gets a reply within 48h", fix: "Thank positive reviews by name; reply calmly to negatives with a fix." },
      { id: "reviewlink", weight: 2, text: "A short review link is saved and sent after every happy job", fix: "Copy it from the profile's “Ask for reviews” button; save it as a WhatsApp quick reply and print a QR code for the counter." },
      { id: "keywords", weight: 1, text: "Reviews mention the service and area", fix: "Ask: 'Could you mention what we did for you?'" },
    ] },
    { title: "Website & citations", checks: [
      { id: "localpage", weight: 3, text: "Website has a page per service (and per area if you serve several)", fix: "Create '/lash-extensions-lekki' style pages with unique content." },
      { id: "schema", weight: 2, text: "LocalBusiness schema on the website", fix: "Add JSON-LD with name, address, geo, hours, phone, sameAs links." },
      { id: "map", weight: 1, text: "Google Map embedded on the contact page", fix: "Embed the map from your GBP listing." },
      { id: "directories", weight: 2, text: "Listed in local directories (e.g. VConnect, BusinessList.com.ng, Finelib)", fix: "Create listings with the exact same NAP." },
      { id: "social", weight: 1, text: "Social profiles link to the website and GBP", fix: "Update Instagram/Facebook/TikTok bios with the site link." },
    ] },
  ],
  grades: [[85, "Map-pack ready"], [60, "Good base: push reviews and pages"], [30, "Getting started"], [0, "Not set up yet"]],
};

// ---------- On-Page SEO Audit ----------
const onPageAudit: ToolDef = {
  kind: "generator",
  intro: "Audit any page by its link (live check above), or paste HTML below to audit a page that isn't online yet.",
  live: {
    kind: "page",
    title: "Audit a live page",
    button: "Run SEO audit",
    url: { placeholder: "yourwebsite.com/page", hint: "Uses the target keyword from the form below." },
    render: (d: PageData, v) => renderPageAudit(d, v),
  },
  fields: [
    { key: "keyword", label: "Target keyword", type: "text", default: "web design lagos" },
    {
      key: "html",
      label: "Or paste page HTML (for pages not online yet)",
      type: "textarea",
      rows: 8,
      default: `<!doctype html><html lang="en"><head><title>Web Design Lagos | PixelHouse</title><meta name="description" content="Fast, mobile-first websites for Lagos businesses. WhatsApp and Paystack built in."><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>Web design in Lagos that brings you customers</h1><h2>Our services</h2><p>We build websites for restaurants, salons and clinics across Lagos.</p><img src="hero.webp"><img src="team.webp" alt="PixelHouse team"><a href="/contact">Contact</a></body></html>`,
    },
  ],
  generate(v) {
    const html = s(v, "html");
    if (html.length < 20) return [{ type: "notice", tone: "info", text: "Use the live check above, or paste a page's HTML here." }];
    const { items, score } = auditFromFacts(extractPage(html), s(v, "keyword"));
    const blocks: Block[] = [
      { type: "stats", items: [{ label: "SEO score", value: `${score}/100` }, { label: "Issues", value: String(items.filter((i) => !i.ok).length), sub: "fix from top to bottom" }] },
      { type: "checks", title: "On-page audit (pasted HTML)", items },
    ];
    return blocks;
  },
};

// ---------- Blog Topic Idea Generator ----------
const blogTopics: ToolDef = {
  kind: "generator",
  intro: "Enter the business and audience. You get article topics that match what customers search before they buy, and which three to publish first.",
  examples: [
    { label: "Solar, Abuja", values: { business: "solar installation", audience: "homeowners in Abuja", location: "Abuja", count: ["How-to", "Cost", "Comparison", "Local", "Mistakes", "Checklist"] } },
    { label: "Wedding cakes", values: { business: "wedding cakes", audience: "couples planning a wedding", location: "Lagos", count: ["Cost", "Checklist", "Mistakes", "Myths"] } },
    { label: "Dental clinic", values: { business: "teeth whitening", audience: "young professionals", location: "Port Harcourt", count: ["Cost", "How-to", "Myths", "Comparison"] } },
  ],
  fields: [
    { key: "business", label: "Business / service", type: "text", default: "solar installation" },
    { key: "audience", label: "Audience", type: "text", default: "homeowners in Abuja" },
    { key: "location", label: "Location", type: "text", default: "Abuja" },
    { key: "count", label: "Include", type: "multi", default: ["How-to", "Cost", "Comparison", "Local", "Mistakes", "Checklist"], options: opts("How-to", "Cost", "Comparison", "Local", "Mistakes", "Checklist", "Case study", "Myths") },
  ],
  generate(v) {
    const b = or(s(v, "business"), "your service"), a = or(s(v, "audience"), "customers"), loc = or(s(v, "location"), "your city");
    const bank: Record<string, string[]> = {
      "How-to": [`How to choose the right ${b} provider`, `How to prepare for ${b}: a step-by-step guide for ${a}`],
      Cost: [`How much does ${b} cost in ${loc}? (${new Date().getFullYear()} prices)`, `What affects the price of ${b}?`],
      Comparison: [`${b}: DIY vs hiring a professional`, `Cheap vs quality ${b}: what's the real difference?`],
      Local: [`Best areas in ${loc} for ${b}`, `${b} in ${loc}: what ${a} should know`],
      Mistakes: [`7 ${b} mistakes that cost ${a} money`, `Signs your ${b} was done wrong`],
      Checklist: [`The complete ${b} checklist for ${a}`, `Questions to ask before paying for ${b}`],
      "Case study": [`How we delivered ${b} for a client in ${loc} (with results)`],
      Myths: [`5 myths about ${b} ${a} still believe`],
    };
    const intent: Record<string, string> = { Cost: "Close to buying", Checklist: "Close to buying", Comparison: "Comparing", Local: "Close to buying", "How-to": "Learning", Mistakes: "Learning", "Case study": "Comparing", Myths: "Learning" };
    const topics = arr(v, "count").flatMap((c) => (bank[c] ?? []).map((t) => [cap(t), c, intent[c] ?? "Learning"]));
    if (!topics.length) return [{ type: "notice", tone: "warn", text: "Pick at least one topic type." }];
    const order = ["Close to buying", "Comparing", "Learning"];
    const first = [...topics].sort((a, b) => order.indexOf(a[2]) - order.indexOf(b[2])).slice(0, 3);
    return [
      { type: "table", title: `${topics.length} article topics`, columns: ["Title", "Type", "Reader is…"], rows: topics },
      { type: "list", title: "Publish these 3 first", items: first.map((t, i) => `${i + 1}. ${t[0]}: ${t[2].toLowerCase()}`) },
      { type: "notice", tone: "info", text: "Next: make a brief for each with the SEO Content Brief tool, and link every article to the matching service page." },
    ];
  },
};

// ---------- Backlink Outreach Script Generator ----------
const backlinkOutreach: ToolDef = {
  kind: "generator",
  intro: "Pick the outreach type. You get short, specific emails that earn links without sounding like spam, plus where to find good link opportunities.",
  examples: [
    { label: "Guest post", values: { type: "Guest post", yourName: "Tunde", site: "pixelhouse.ng", target: "TechCabal", topic: "How Lagos SMEs can get their first 100 customers online" } },
    { label: "Local partner", values: { type: "Local directory / partner", yourName: "Kemi", site: "glowbeauty.ng", target: "Lekki Bridal Hub", topic: "bridal beauty in Lekki" } },
    { label: "Broken link", values: { type: "Broken link", yourName: "Ade", site: "sunpower.ng", target: "Abuja Home Owners blog", topic: "A 2026 guide to solar costs in Abuja" } },
  ],
  fields: [
    { key: "type", label: "Outreach type", type: "select", default: "Guest post", options: opts("Guest post", "Resource page", "Broken link", "Local directory / partner", "Mention without link") },
    { key: "yourName", label: "Your name", type: "text", default: "Tunde", half: true },
    { key: "site", label: "Your site", type: "text", default: "pixelhouse.ng", half: true },
    { key: "target", label: "Their site / blog", type: "text", default: "TechCabal" },
    { key: "topic", label: "Topic / page to offer", type: "text", default: "How Lagos SMEs can get their first 100 customers online" },
  ],
  generate(v) {
    const t = s(v, "type"), me = or(s(v, "yourName"), "[name]"), site = or(s(v, "site"), "[site]"), them = or(s(v, "target"), "[their site]"), topic = or(s(v, "topic"), "[topic]");
    const bodies: Record<string, string> = {
      "Guest post": `Subject: Article idea for ${them}: ${topic}\n\nHi [Name],\n\nI read ${them} regularly: [specific article] was especially useful.\n\nI'd like to write a practical piece for your readers: “${topic}”. It would cover [3 bullet points], with real examples from Nigerian businesses. Original, no fluff, ~1,200 words.\n\nWould that be a fit? Happy to adapt the angle.\n\n${me}\n${site}`,
      "Resource page": `Subject: Resource for your ${topic} page\n\nHi [Name],\n\nI found your resources page on ${them}: great list. I recently published “${topic}” on ${site}, which covers [what it adds that the others don't].\n\nIf it's useful, it might make a good addition. Either way, thanks for putting the list together.\n\n${me}`,
      "Broken link": `Subject: Broken link on ${them}\n\nHi [Name],\n\nQuick heads-up: on [page URL], the link to [dead resource] returns a 404.\n\nIf you're looking for a replacement, I wrote “${topic}” on ${site}, which covers the same ground and is up to date.\n\nHope that helps!\n${me}`,
      "Local directory / partner": `Subject: Partnership: ${site} x ${them}\n\nHi [Name],\n\nWe both serve [shared audience] in [city]. We build websites; you [what they do]. We often get asked for [their service] and would happily recommend you.\n\nWould you be open to listing each other on our partners pages?\n\n${me}\n${site}`,
      "Mention without link": `Subject: Thanks for the mention on ${them}\n\nHi [Name],\n\nThanks for mentioning ${site} in [article]: much appreciated!\n\nWould you mind linking the name to ${site} so readers can find us easily? Happy to share your article with our audience too.\n\n${me}`,
    };
    return [
      { type: "text", title: `${t} email`, text: bodies[t] ?? bodies["Guest post"] },
      { type: "text", title: "Follow-up (5 days later)", text: `Hi [Name], just bumping this up in case it got buried. Happy to send a draft or outline first if that helps. - ${me}` },
      { type: "list", title: "Where to find good link opportunities", items: ["Local business associations and chambers that list members.", "Suppliers and partner businesses (e.g. a salon and a bridal planner).", "Local news and blogs that cover your industry, offer a useful story or data.", "Events you sponsor or speak at.", "Directories real customers use, with the same name, address and phone."] },
      { type: "list", title: "Rules", items: ["Personalise the first line every time, mention a real article.", "Never pay for links or use link schemes. Google treats them as spam.", "Send about 10 good emails a day rather than 100 generic ones."] },
    ];
  },
};

// ---------- SEO Content Brief Generator ----------
const contentBrief: ToolDef = {
  kind: "generator",
  intro: "Enter the keyword and page type. You get a complete brief, and a ready prompt so your AI writes the page properly.",
  examples: [
    { label: "Solar cost article", values: { keyword: "cost of solar installation in Abuja", secondary: "solar panel price Abuja\ninverter and battery cost\nsolar installers Abuja", type: "Blog post", audience: "homeowners tired of generator costs", words: 1400, brand: "SunPower NG" } },
    { label: "Salon service page", values: { keyword: "lash extensions in Lekki", secondary: "classic lashes\nvolume lashes\nlash refill Lekki", type: "Service page", audience: "working women in Lekki and VI", words: 800, brand: "Glow Beauty Studio" } },
    { label: "Area page", values: { keyword: "phone repair in Yaba", secondary: "screen replacement Yaba\niPhone repair Yaba", type: "Location page", audience: "students and workers in Yaba", words: 700, brand: "SwiftFix" } },
  ],
  fields: [
    { key: "keyword", label: "Primary keyword", type: "text", default: "cost of solar installation in Abuja" },
    { key: "secondary", label: "Secondary keywords (one per line)", type: "textarea", default: "solar panel price Abuja\ninverter and battery cost\nsolar installers Abuja", rows: 3 },
    { key: "type", label: "Page type", type: "select", default: "Blog post", options: opts("Blog post", "Service page", "Location page", "Product page") },
    { key: "audience", label: "Reader", type: "text", default: "homeowners tired of generator costs" },
    { key: "words", label: "Target words", type: "number", default: 1400, min: 300, max: 5000, step: 100 },
    { key: "brand", label: "Brand", type: "text", default: "SunPower NG" },
  ],
  generate(v) {
    const kw = or(s(v, "keyword"), "keyword"), sec = lines(s(v, "secondary")), type = s(v, "type");
    const outline = type === "Blog post"
      ? [`H1: ${cap(kw)} (${new Date().getFullYear()} guide)`, "Intro: the question, the short answer, who this is for", `H2: What affects ${kw}`, "H2: Typical price ranges (table)", "H2: How to save money", "H2: Mistakes to avoid", "H2: FAQ (3–5 questions)", `Conclusion + CTA to ${or(s(v, "brand"), "us")}`]
      : type === "Service page"
        ? [`H1: ${cap(kw)}`, "Hero: outcome + CTA", "H2: What's included", "H2: Who it's for", "H2: Process (3–5 steps)", "H2: Pricing / packages", "H2: Results + testimonials", "H2: FAQ", "CTA"]
        : type === "Location page"
          ? [`H1: ${cap(kw)}`, "Intro: serving this area, since when", "H2: Services in this area", "H2: Areas and neighbourhoods covered", "H2: Local projects / reviews", "H2: Map + directions", "H2: FAQ", "CTA"]
          : [`H1: ${cap(kw)}`, "Key benefits (bullets)", "Specs table", "Photos with alt text", "Reviews", "FAQ", "Add to cart CTA"];
    const brief = `SEO CONTENT BRIEF
Primary keyword: ${kw}
Secondary: ${sec.join(", ") || "-"}
Page type: ${type} · Target length: ~${s(v, "words")} words
Reader: ${s(v, "audience")}
Search intent: ${/cost|price|how much/i.test(kw) ? "Commercial investigation: they want numbers" : /how|what|why/i.test(kw) ? "Informational: they want an answer" : "Commercial: they're ready to buy"}

TITLE TAG (≤60): ${clip(cap(kw), Math.max(20, 57 - or(s(v, "brand"), "Brand").length))} | ${or(s(v, "brand"), "Brand")}
META DESCRIPTION (≤158): Clear answer to "${kw}" plus what makes ${or(s(v, "brand"), "you")} the right choice. Include a CTA.
URL: /${slugify(kw)}

OUTLINE
${outline.map((o) => "- " + o).join("\n")}

MUST INCLUDE
- Primary keyword in H1, first 100 words and one H2
- Each secondary keyword at least once, naturally
- A table or checklist where it helps the reader
- 2–3 internal links to service pages, 1–2 links to reputable sources
- Original photos with descriptive alt text
- A short FAQ answering the real questions customers ask

TONE: plain English, short paragraphs, local examples, prices in Naira.`;
    const write = `Write a ${type.toLowerCase()} from this brief for a Nigerian reader. Plain, friendly English; short paragraphs; follow the outline exactly. Give specific, practical advice and real price ranges only where I provide them, otherwise write [CHECK: price]. Don't invent statistics, quotes or reviews. End with a clear invitation to contact ${or(s(v, "brand"), "us")}.\n\n${brief}`;
    return [
      { type: "text", title: "Content brief", text: brief, filename: `brief-${slugify(kw)}.txt` },
      { type: "text", title: "Prompt to write it with AI", text: write },
      { type: "notice", tone: "warn", text: "Always edit the AI draft: check every fact, add the owner's real tips and photos, and read it aloud. Helpful, experienced content is what ranks." },
    ];
  },
};

// ---------- Google Business Profile Post Generator ----------
const gbpPost: ToolDef = {
  kind: "generator",
  intro: "Pick a post type. You get Google Business Profile updates within the 1,500-character limit, a button suggestion and a photo checklist.",
  examples: [
    { label: "Caterer offer", values: { business: "Kora Foods", type: "Offer", headline: "20% off party trays this weekend", details: "Jollof, fried rice and small chops for 20–50 guests", area: "catering in Ikeja", dates: "Fri 3 – Sun 5 Oct" } },
    { label: "Salon new service", values: { business: "Glow Beauty Studio", type: "New product", headline: "Now offering bridal lash packages", details: "Trial session, venue service and a touch-up kit", area: "bridal lashes in Lekki", dates: "" } },
    { label: "Clinic update", values: { business: "CarePoint Clinic", type: "Update", headline: "We're now open on Saturdays", details: "Walk-ins welcome from 9am to 2pm", area: "family clinic in Wuse", dates: "" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "Kora Foods" },
    { key: "type", label: "Post type", type: "select", default: "Offer", options: opts("Offer", "Update", "Event", "New product") },
    { key: "headline", label: "What's it about", type: "text", default: "20% off party trays this weekend" },
    { key: "details", label: "Details", type: "text", default: "Jollof, fried rice and small chops for 20–50 guests" },
    { key: "area", label: "Area / keyword", type: "text", default: "catering in Ikeja" },
    { key: "dates", label: "Dates", type: "text", default: "Fri 3 – Sun 5 Oct" },
  ],
  generate(v) {
    const b = or(s(v, "business"), "We"), h = or(s(v, "headline"), "news"), d = s(v, "details"), area = s(v, "area"), dates = s(v, "dates"), t = s(v, "type");
    const button = t === "Offer" ? "Order online" : t === "Event" ? "Sign up" : t === "New product" ? "Buy" : "Learn more";
    const posts = [
      `${h}! ${d ? d + "." : ""} ${dates ? `Valid ${dates}.` : ""} Looking for ${area || "us"}? ${b} has you covered: tap below to ${button.toLowerCase()}.`,
      `${t === "Event" ? "Join us" : "Good news"}: ${h}. ${d} ${dates ? `(${dates})` : ""}: from ${b}, your go-to for ${area || "quality service"}.`,
      `${b} update: ${h}. ${d}. Message us on WhatsApp or tap "${button}" to get started.`,
    ].map((p) => p.replace(/\s+/g, " ").trim());
    return [
      { type: "table", title: "Posts", columns: ["Post", "Length"], rows: posts.map((p) => [p, `${p.length}/1500`]) },
      { type: "notice", tone: "info", text: `Suggested button: “${button}”.${t === "Offer" || t === "Event" ? " Offers and events need start and end dates in the post settings." : ""} Post weekly: offers expire, updates stay.` },
      { type: "list", title: "Photo checklist", items: ["A real, bright photo of the product, place or team, no text-heavy flyers.", "Landscape, about 1200×900 pixels.", "The subject in the centre (Google crops the edges)."] },
    ];
  },
};

export const defs: Record<string, ToolDef> = {
  "keyword-research-prompts": keywordResearch,
  "meta-tag-generator": metaTags,
  "local-seo-checklist": localSeo,
  "on-page-seo-audit": onPageAudit,
  "blog-topic-generator": blogTopics,
  "backlink-outreach-scripts": backlinkOutreach,
  "seo-content-brief": contentBrief,
  "gbp-post-generator": gbpPost,
};
