import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "content-seo-audit",
  title: "Project: content that ranks + SEO audit",
  minutes: 150,
  outcome: "Three SEO articles planned and published, and a full SEO audit report of a real website you can show a client.",
  intro:
    "This is your Week 2 project. You'll do two things SEO clients pay monthly for: create content that answers what customers search, and audit a real website to find what's holding it back. The audit is also your best sales tool — you'll use it again in Week 4 as a free lead magnet.",
  sections: [
    {
      heading: "Part 1 — Why content brings customers",
      blocks: [
        { t: "p", text: "Service pages catch people ready to buy. **Content** — helpful articles — catches people earlier, while they're still learning (“how much does a wedding cake cost in Lagos?”). If the business answers the question well, it earns trust and the sale later." },
        { t: "tool", slug: "blog-topic-generator", why: "Generates article ideas grouped by customer intent, with titles ready to use." },
        { t: "figure", figure: { tool: "on-page-seo-audit", caption: "An on-page audit of a live URL: every check marked pass or fix." } },
      ],
    },
    {
      heading: "Part 2 — Brief first, then write",
      blocks: [
        { t: "p", text: "A **content brief** is a plan for one article: the keyword, who it's for, the questions it must answer, the headings, and the internal links. Writing without one gives you vague articles that don't rank." },
        { t: "tool", slug: "seo-content-brief", why: "Builds a complete brief — keyword, intent, outline, questions, links — from a single topic." },
        { t: "prompt", title: "Write from the brief", text: "Write a blog article from this brief: [paste brief]. Write for a Nigerian reader in simple, friendly English. Use short paragraphs, the headings in the brief, and answer every question clearly. Include real, specific advice — no filler. Don't invent statistics or quotes; mark anything I need to check with [CHECK]. End with a short call to action to [business action]." },
        { t: "warn", text: "AI drafts must be edited and fact-checked by a human. Google rewards content that is helpful and shows real experience — add the owner's real tips, prices, photos and stories." },
      ],
    },
    {
      heading: "Part 3 — Audit a real website",
      blocks: [
        { t: "p", text: "Pick a real local business website (one you'd like as a client). You'll check it in four areas:" },
        { t: "table", columns: ["Area", "Check with", "Look for"], rows: [["Technical", "Speed checklist + PageSpeed", "Slow loading, not mobile-friendly, broken pages"], ["On-page", "On-page SEO audit", "Missing titles, no H1, no alt text, no schema"], ["Local", "Local SEO checklist", "No or weak GBP, inconsistent NAP, few reviews"], ["Content", "Google search", "Missing service pages, no answers to common questions"]] },
        { t: "tool", slug: "on-page-seo-audit", why: "Paste their URL and get the on-page findings in seconds." },
        { t: "tool", slug: "website-speed-checklist", why: "Measures the page weight and the biggest speed problems." },
      ],
    },
    {
      heading: "Part 4 — Write the audit report",
      blocks: [
        { t: "p", text: "A report that sells is short, visual and specific. Business owners don't want jargon; they want to know what's wrong, why it costs them customers, and what to do." },
        { t: "list", items: ["**Summary**: 3 biggest problems, in plain English", "**Evidence**: screenshots and scores", "**Impact**: “Your site takes 9 seconds to load on a phone — most visitors leave before it appears.”", "**Fixes**: prioritised: quick wins first", "**Next step**: offer to fix it (your service)"] },
        { t: "prompt", title: "Turn findings into a report", text: "Here are SEO audit findings for [business website]: [paste results]. Write a short audit report for a non-technical business owner: a 3-point summary, then each issue with 'what's wrong', 'why it costs you customers' and 'how to fix it', ordered by impact. Friendly, honest, no jargon, under 600 words. End with an offer to fix the top issues." },
      ],
    },
  ],
  task: {
    title: "Ship the Week 2 project",
    steps: ["Generate topic ideas and pick 3 articles for your practice site (or a client's).", "Create a brief for each, draft with AI, then edit and fact-check.", "Publish them with titles, descriptions and internal links.", "Audit a real local business website in all four areas.", "Write the audit report and save it as a PDF."],
    done: ["3 articles published, each with its own keyword", "Each article links to a service page", "The audit covers technical, on-page, local and content", "The report explains impact in plain English with a clear next step"],
  },
  resources: [
    { label: "Google — Creating helpful content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", note: "What Google means by helpful, people-first content." },
    { label: "Google — AI-generated content guidance", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content", note: "Google's position on AI-written content." },
    { label: "Semrush Academy", url: "https://www.semrush.com/academy/", note: "Free SEO and content marketing courses." },
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Official speed measurements for your audit." },
  ],
  quiz: [
    { q: "What is a content brief?", options: ["A finished article", "A plan for one article: keyword, audience, questions, headings, links", "A type of backlink", "An invoice"], answer: 1, why: "Briefs keep articles focused and complete." },
    { q: "How should AI-written drafts be handled?", options: ["Publish immediately", "Edit, fact-check and add real experience before publishing", "Never use AI", "Copy them to many sites"], answer: 1, why: "Google rewards helpful, accurate content; human editing makes it so." },
    { q: "Which is the best way to describe a problem in an audit report?", options: ["“LCP 9.1s, CLS 0.3”", "“Your site takes 9 seconds to load on a phone — most visitors leave before it appears.”", "“It's bad”", "Leave it out"], answer: 1, why: "Owners need to understand the impact in their terms." },
    { q: "Which four areas does a full audit cover?", options: ["Logo, colour, font, photos", "Technical, on-page, local and content", "Facebook, Instagram, TikTok, X", "Price, product, place, promotion"], answer: 1, why: "These cover everything that affects search visibility." },
    { q: "Content catches customers at which stage?", options: ["Only after they've bought", "Earlier, while they're still learning and comparing", "Never", "Only on social media"], answer: 1, why: "Helpful content earns trust before the customer is ready to buy." },
  ],
};

export default lesson;
