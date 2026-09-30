import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "content-seo-audit",
  title: "Project: content that ranks + SEO audit",
  minutes: 150,
  outcome: "Three helpful articles published on a site, and a clear SEO audit report of a real business website that you can show the owner.",
  intro:
    "This is your Week 2 project. You'll do two things businesses pay for every month: create **helpful content** that answers what customers search, and **audit** a real website to find what's holding it back. The audit is also your best sales tool, in Week 4 you'll offer it free to win clients.",
  youNeed: ["Your live site (for the articles)", "A real local business website to audit (one you'd like as a client)", "Our free SEO tools", "About 2.5 hours: split it over two sittings if you like"],
  sections: [
    {
      heading: "Part 1: Why helpful content brings customers",
      blocks: [
        { t: "p", text: "Service pages catch people who are **ready to buy**. Articles catch people **earlier**, while they're still learning, like “How much does a wedding cake cost in Lagos?”. If the business answers the question well, it earns trust, and often the sale later." },
        { t: "define", term: "Content", meaning: "Useful articles, guides and answers published on a website, not adverts, but genuinely helpful information for customers.", like: "a pharmacist giving free advice at the counter. You trust them, so you buy from them." },
        { t: "tool", slug: "blog-topic-generator", why: "Article ideas grouped by what customers are trying to do, with titles ready to use." },
        { t: "figure", figure: { diagram: "keyword-intent", caption: "Articles serve people who are still learning; service pages serve people ready to buy." } },
      ],
    },
    {
      heading: "Part 2: Plan first, then write",
      blocks: [
        { t: "define", term: "Content brief", meaning: "A plan for one article: the main keyword, who it's for, the questions it must answer, the headings, and which pages it links to.", like: "a recipe card written before you start cooking." },
        { t: "tool", slug: "seo-content-brief", why: "Builds a complete brief: keyword, intent, outline, questions, links, from one topic." },
        { t: "prompt", title: "Write from the brief", text: "Write a blog article from this brief: [paste brief]. Write for a Nigerian reader in simple, friendly English. Use short paragraphs and the headings in the brief, and answer every question clearly. Give real, specific advice: no filler. Don't invent statistics, prices or quotes; mark anything I must check with [CHECK]. End with a short invitation to [business action]." },
        { t: "warn", text: "AI drafts must be edited and fact-checked by a person. Google rewards content that's genuinely helpful and shows real experience, so add the owner's real tips, prices, photos and stories." },
        { t: "scenario", title: "The cake article", text: "A Lagos baker's article “How much does a wedding cake cost in Lagos? (And what changes the price)” listed her real price ranges, showed photos of three real cakes at different budgets, and explained tiers and fondant in simple words. Couples found it while planning, trusted the honest prices, and messaged her from the button at the end." },
        { t: "try", title: "Draft one article outline", minutes: 10, steps: ["Pick one question customers ask the business all the time.", "Generate a brief with the tool.", "Read the brief: does it answer the question fully? Add one real tip from the owner."] },
      ],
    },
    {
      heading: "Part 3: Audit a real website",
      blocks: [
        { t: "define", term: "SEO audit", meaning: "A health check of a website that finds what stops it appearing in Google or converting visitors, slow pages, missing titles, a weak Google profile, missing information.", like: "a mechanic's inspection report: what's wrong, how serious, and what to fix first." },
        { t: "table", columns: ["Area", "Check with", "Look for"], rows: [["Technical", "Speed checklist + PageSpeed", "Slow loading, not mobile-friendly, broken pages"], ["On-page", "On-page SEO audit", "Missing titles, no H1, no alt text, no schema"], ["Local", "Local SEO checklist", "No or weak Google profile, mismatched NAP, few reviews"], ["Content", "Google search", "Missing service pages, no answers to common questions"]] },
        { t: "tool", slug: "on-page-seo-audit", why: "Paste their link and get the on-page findings in seconds." },
        { t: "tool", slug: "website-speed-checklist", why: "Measures page weight and the biggest speed problems." },
        { t: "check", q: "Which four areas does a full SEO audit cover?", options: ["Logo, colour, font, photos", "Technical, on-page, local and content", "Facebook, Instagram, TikTok, X"], answer: 1, why: "Those four cover everything that affects whether customers find, and choose, the business." },
      ],
    },
    {
      heading: "Part 4: Write a report owners understand",
      blocks: [
        { t: "p", text: "Business owners don't want jargon. They want to know **what's wrong**, **why it costs them customers**, and **what to do**. Keep it short and visual." },
        { t: "list", items: ["**Summary**: the 3 biggest problems, in plain English", "**Evidence**: screenshots and scores", "**Impact**: “Your site takes 9 seconds to appear on a phone. Most visitors leave before it loads.”", "**Fixes**: in order: quick wins first", "**Next step**: an offer to fix it (your service)"] },
        { t: "prompt", title: "Turn findings into a report", text: "Here are SEO audit findings for [business website]: [paste results]. Write a short audit report for a non-technical business owner: a 3-point summary, then each issue with 'what's wrong', 'why it costs you customers' and 'how to fix it', ordered by impact. Friendly, honest, no jargon, under 600 words. End with an offer to fix the top issues." },
        { t: "mistakes", items: [{ wrong: "“Your LCP is 9.1s and CLS is 0.3”", right: "“Your site takes 9 seconds to appear on a phone, and buttons jump as it loads”" }, { wrong: "A 20-page report listing 60 problems", right: "The top 3 problems, clearly explained, then the rest briefly" }, { wrong: "Criticising the owner's current developer", right: "Staying factual and helpful" }] },
      ],
    },
  ],
  task: {
    title: "Ship the Week 2 project",
    steps: ["Generate topic ideas and pick 3 articles for your site (or a client's).", "Make a brief for each, draft with AI, then edit and fact-check.", "Publish them with their own titles, descriptions and a link to a service page.", "Audit a real local business website in all four areas.", "Write the audit report and save it as a PDF."],
    done: ["3 articles are live, each with its own main keyword", "Each article links to a service page", "The audit covers technical, on-page, local and content", "The report explains the impact in plain English with a clear next step"],
  },
  recap: [
    "A **content brief** plans one article: keyword, audience, questions to answer, headings and links.",
    "AI drafts must be **edited, fact-checked and given real experience** before publishing.",
    "In an audit report, explain each problem by its **impact on customers**, in plain English: “Your site takes 9 seconds to appear on a phone; most visitors leave before it loads”, not technical scores.",
    "A full SEO audit covers four areas: **technical, on-page, local and content**.",
    "Helpful articles reach customers **earlier**, while they're still learning and comparing, and build trust before they buy.",
  ],
  resources: [
    { label: "Google: Creating helpful content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", note: "What Google means by helpful, people-first content." },
    { label: "Google: AI-generated content guidance", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content", note: "Google's position on AI-written content." },
    { label: "Semrush Academy", url: "https://www.semrush.com/academy/", note: "Free SEO and content marketing courses." },
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Official speed measurements for your audit." },
  ],
  quiz: [
    { q: "What is a content brief?", options: ["A finished article", "A plan for one article: keyword, audience, questions, headings, links", "A type of backlink", "A payment request"], answer: 1, why: "Briefs keep articles focused and complete.", from: 0 },
    { q: "How should AI-written drafts be handled?", options: ["Publish immediately", "Edit, fact-check and add real experience before publishing", "Never use AI", "Copy them to many sites"], answer: 1, why: "Helpful, accurate content is what Google rewards, human editing makes it so.", from: 1 },
    { q: "Which is the best way to describe a problem in an audit report?", options: ["“LCP 9.1s, CLS 0.3”", "“Your site takes 9 seconds to appear on a phone. Most visitors leave before it loads.”", "“It's bad”", "Leave it out"], answer: 1, why: "Owners need to understand the impact in their own terms.", from: 2 },
    { q: "Which four areas does a full audit cover?", options: ["Logo, colour, font, photos", "Technical, on-page, local and content", "Facebook, Instagram, TikTok, X", "Price, product, place, promotion"], answer: 1, why: "These cover everything that affects search visibility.", from: 3 },
    { q: "Helpful articles reach customers at which stage?", options: ["Only after they've bought", "Earlier, while they're still learning and comparing", "Never", "Only on social media"], answer: 1, why: "Helpful content earns trust before the customer is ready to buy.", from: 4 },
  ],
};

export default lesson;
