import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "content-seo-audit",
  title: "Project: content that ranks + SEO audit",
  minutes: 150,
  outcome: "Three helpful articles published as new pages on Bisi's site, each answering a real question customers search, and a plain-English check-up of a real local business's website that you can show its owner.",
  intro:
    "This is your Week 2 project. You'll do two things businesses pay for every month. First, **helpful articles** that answer what customers search before they're ready to buy, like “How much does it cost to sew aso-ebi in Lagos?”. Second, a **website check-up** of a real business that finds what's holding its website back, written so the owner understands every word. That check-up is also your best sales tool: in Week 4 you'll offer it free to win clients.",
  core: "Helpful articles answer real customer questions to earn trust early, and a website check-up explains each problem by what it costs the owner in customers.",
  youNeed: ["Your live site (for the articles)", "A real local business website to check (one you'd like as a client)", "Our free website-check tools", "About 2.5 hours: split it over two sittings if you like"],
  sections: [
    {
      heading: "Part 1: Why helpful articles bring customers",
      blocks: [
        { t: "p", text: "Service pages catch people who are **ready to buy**. Articles catch people **earlier**, while they're still learning and comparing, like a bride's sister asking Google what aso-ebi sewing costs. If the business answers that question honestly and well, it earns trust, and often the order later." },
        {
          t: "define",
          term: "Helpful content",
          like: "a pharmacist's free advice at the counter: you trust them, so next time you buy from them.",
          meaning: "Useful articles, guides and answers published on a website: not adverts, but genuinely helpful information that answers what customers ask.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "search", label: "“how much to sew aso-ebi?”" }, { draw: "page", label: "Bisi's honest article" }, { draw: "star", label: "trust" }, { draw: "whatsapp", label: "a message from the article", hot: true }] },
          caption: "How an article becomes an order: someone searches a question, finds Bisi's honest answer, trusts her, and taps the WhatsApp button at the end of the article.",
        },
        { t: "tool", slug: "blog-topic-generator", why: "Article ideas grouped by what customers are trying to do, with titles ready to use." },
        { t: "figure", figure: { diagram: "keyword-intent", caption: "Articles serve people who are still learning; service pages serve people ready to buy." } },
      ],
    },
    {
      heading: "Part 2: Plan first, then write",
      blocks: [
        {
          t: "define",
          term: "Content brief",
          like: "a tailor's sketch with the measurements written on it, made before any fabric is cut.",
          meaning: "A plan for one article: the main keyword, who it's for, the questions it must answer, the headings, and which pages it links to.",
        },
        { t: "tool", slug: "seo-content-brief", why: "Builds a complete brief (keyword, intent, outline, questions, links) from one topic." },
        { t: "prompt", title: "Write from the brief", text: "Read the project brief first and follow it.\n\nWrite an article from this content brief: [paste brief]. Write for a Nigerian reader in simple, friendly English, in the business's voice. Short paragraphs, the headings from the brief, and a clear answer to every question in it. Give real, specific advice, no filler. Do not invent statistics, prices or quotes: mark anything the owner must confirm with [CHECK]. End with a short invitation to [the business's action, e.g. 'message Bisi on WhatsApp']. Then create it as a new page in site, using styles.css and site.js, with its own title tag, meta description and one h1." },
        { t: "warn", text: "AI drafts must be edited and fact-checked by a person. Google rewards content that's genuinely helpful and shows real experience, so add the owner's real prices, photos and tips. Replace every [CHECK] with a confirmed fact, or delete the line." },
        {
          t: "steps",
          items: [
            { title: "Give the page a clear name", detail: "Ask for a clear file name in `site`, e.g. `aso-ebi-price-guide.html`." },
            { title: "Link it", detail: "Ask the AI to add a link to it from the related service page, and a link from the article to the aso-ebi page." },
            { title: "Add it to the sitemap and publish", detail: "Add the new page to `sitemap.xml`, upload both to GitHub, commit, and check the page on your phone." },
          ],
        },
        {
          t: "scenario",
          title: "The aso-ebi price article",
          text: "Picture Bisi's article “How much does it cost to sew aso-ebi in Lagos? (And what changes the price)”. It lists her real price ranges per person, shows photos of three past groups at different budgets, and explains in plain words why lace costs more to sew than Ankara. Families planning weddings find it while comparing, trust the honest prices, and tap the WhatsApp button at the end.",
        },
        { t: "try", title: "Outline one article", minutes: 10, steps: ["Pick one question customers ask the business all the time.", "Generate a content brief with the tool.", "Read it: does it fully answer the question? Add one real tip from the owner."] },
      ],
    },
    {
      heading: "Part 3: Check a real website",
      blocks: [
        { t: "p", text: "Now turn your SEO audit skill (Day 11) into a full check-up of a real local business's website, in four areas:" },
        { t: "table", columns: ["Area", "Check with", "Look for"], rows: [["Technical", "Speed checklist + PageSpeed Insights", "Slow loading, not phone-friendly, broken pages"], ["On-page", "On-page SEO audit", "Missing titles, no H1, no alt text, no schema"], ["Local", "Local SEO checklist + their Google profile", "No or weak profile, mismatched NAP, few reviews"], ["Content", "Google searches for their services", "Missing service pages, no answers to common questions"]] },
        {
          t: "sketch",
          sketch: { layout: "stack", frame: "laptop", rows: ["Technical: speed, phones, broken pages", "On-page: titles, headings, alt text", "Local: Google profile, NAP, reviews", "Content: answers to customers' questions"], hot: 0 },
          caption: "The four parts of a website check-up, like a mechanic's inspection sheet: the engine (technical), the body (on-page), the paperwork (local) and what it can carry (content).",
        },
        { t: "tool", slug: "on-page-seo-audit", why: "Paste their link and get the on-page findings in seconds." },
        { t: "tool", slug: "website-speed-checklist", why: "Measures page weight and the biggest speed problems." },
        { t: "tool", slug: "local-seo-checklist", why: "Checks the local signals on their site and lists what to look for in their Google profile." },
        { t: "check", q: "A site loads fast and has perfect titles, but the business has no Google profile and three different phone numbers online. Which area of the check-up is weak?", options: ["Technical", "Local", "Content"], answer: 1, why: "The Google profile and matching details (NAP) belong to the local area of the check-up." },
      ],
    },
    {
      heading: "Part 4: A report owners understand",
      blocks: [
        { t: "p", text: "Business owners don't want jargon. They want to know **what's wrong**, **why it costs them customers**, and **what to do**. Keep it short and visual." },
        { t: "list", items: ["**Summary**: the 3 biggest problems, in plain English", "**Evidence**: screenshots and scores", "**Impact**: “Your site takes 9 seconds to appear on a phone. Most visitors leave before it loads.”", "**Fixes**: in order, quick wins first", "**Next step**: an offer to fix it (your service)"] },
        { t: "prompt", title: "Turn findings into a report", text: "Here are website check-up findings for [business website]: [paste results]. Write a short report for a non-technical Nigerian business owner: a 3-point summary, then each issue with 'what's wrong', 'why it costs you customers' and 'how to fix it', ordered by impact. Friendly, honest, no jargon, under 600 words. End with an offer to fix the top issues. Don't criticise anyone who built the current site." },
        { t: "mistakes", items: [{ wrong: "“Your LCP is 9.1s and CLS is 0.3”", right: "“Your site takes 9 seconds to appear on a phone, and buttons jump as it loads”" }, { wrong: "A 20-page report listing 60 problems", right: "The top 3 problems clearly explained, then the rest briefly" }, { wrong: "Criticising the owner's current developer", right: "Staying factual and helpful" }] },
        { t: "win", title: "Week 2 project shipped", proved: "you can write content that earns trust and turn a website check-up into a plain-English report an owner will actually act on.", cue: "Save the report as a PDF: in Week 4 it becomes your free offer. Finish the mission for the **Week 2 shipped** badge." },
      ],
    },
  ],
  task: {
    title: "Ship the Week 2 project",
    steps: ["Generate topic ideas and pick 3 articles for Bisi's site (or a client's).", "Make a content brief for each, draft with AI, then edit and fact-check.", "Publish them as pages with their own titles and descriptions, linked to a service page and added to the sitemap.", "Check a real local business's website in all four areas.", "Write the report and save it as a PDF."],
    done: ["3 articles are live, each aimed at its own main keyword", "Each article links to a service page", "No [CHECK] or invented facts remain", "The check-up covers technical, on-page, local and content", "The report explains each problem's impact in plain English, with a clear next step"],
  },
  recap: [
    "A **content brief** plans one article: keyword, who it's for, questions to answer, headings and links.",
    "AI drafts must be **edited, fact-checked and given the owner's real experience** before publishing.",
    "In a report, explain each problem by its **impact on customers** in plain English (“Your site takes 9 seconds to appear on a phone; most visitors leave first”), not technical scores.",
    "A full SEO audit covers four areas: **technical, on-page, local and content**.",
    "Helpful articles reach customers **earlier**, while they're still learning and comparing, and build trust before they buy.",
  ],
  resources: [
    { label: "Google: creating helpful content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", note: "What Google means by helpful, people-first content." },
    { label: "Google: AI-generated content", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content", note: "Google's position on content written with AI." },
    { label: "Semrush Academy", url: "https://www.semrush.com/academy/", note: "Free SEO and content courses." },
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Official speed measurements for your check-up." },
  ],
  quiz: [
    { q: "Which is the best way to describe a problem in a report for an owner?", options: ["“LCP 9.1s, CLS 0.3”", "“Your site takes 9 seconds to appear on a phone; most visitors leave before it loads.”", "“It's bad”", "Leave it out"], answer: 1, why: "Owners need the impact on their customers, in their own words.", from: 2, aim: "core" },
    { q: "Which four areas does a full website check-up cover?", options: ["Logo, colour, font, photos", "Technical, on-page, local and content", "Facebook, Instagram, TikTok, X", "Price, product, place, promotion"], answer: 1, why: "These cover everything that affects being found. In Week 4 this check-up becomes your free offer to win clients.", from: 3, aim: "lead-magnets-qualification" },
    { q: "How should an AI-written article be handled?", options: ["Publish it immediately", "Edit it, fact-check it and add the owner's real experience first", "Never use AI", "Copy it to many sites"], answer: 1, why: "Helpful, accurate content is what Google rewards; human editing makes it so. Every client article follows this rule.", from: 1, aim: "client-work" },
    { q: "What is a content brief?", options: ["A finished article", "A plan for one article: keyword, audience, questions, headings, links", "A type of advert", "A payment request"], answer: 1, why: "Briefs keep articles focused. Monthly packages often include one or two articles, each starting from a brief.", from: 0, aim: "proposals-pricing" },
    { q: "When do helpful articles reach customers?", options: ["Only after they've bought", "Earlier, while they're still learning and comparing", "Never", "Only on social media"], answer: 1, why: "They earn trust before the customer is ready to buy.", from: 4, aim: "core" },
  ],
  celebrate: {
    title: "Week 2 project complete",
    proved: "You can write helpful content that earns trust, and turn a website check-up into a plain-English report an owner will act on.",
    badge: "Week 2 shipped",
    badgeDesc: "Published articles and wrote a website check-up",
  },
};

export default lesson;
