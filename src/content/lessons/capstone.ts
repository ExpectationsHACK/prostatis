import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "capstone",
  title: "Capstone: ship a full client project",
  minutes: 240,
  outcome: "One complete project for a real business, website, a web solution, SEO, an automation and an agent, shipped, handed over, paid, and written up as a case study.",
  intro:
    "This is the finish line of the Main Track, and what the whole month has been building towards: one real business, one complete system, shipped and paid. You'll reuse everything: the brand kit, the build workflow, the SEO checks, automations, the agent, and your get-paid system. Take the time you need; quality matters more than speed. When you finish, you'll have the kind of proof that wins the next ten clients.",
  youNeed: ["One real business (a paying client, or a real business you help at a friendly price)", "Everything you've built in Weeks 1–4", "A few days: spread the work out", "Permission from the business to use the project as a case study"],
  sections: [
    {
      heading: "What “done” means",
      blocks: [
        { t: "table", columns: ["Part", "Minimum for the capstone", "Taught in"], rows: [["Website", "Live on a domain, mobile-first, 80+ speed, a working contact method", "Days 1–7"], ["Web solution", "Booking, store or web-app feature that fits the business", "Days 8–10"], ["SEO", "Titles, descriptions, schema, Google profile set up, sitemap submitted", "Days 11–13"], ["Automation", "At least one live automation with error alerts", "Days 14–15"], ["Agent", "Knowledge base + handoff, passing your test script", "Days 16–17"], ["System", "Connected to a customer list, monitored, with a runbook", "Days 18–19"], ["Business", "Proposal accepted, delivered, paid, testimonial collected", "Days 20–24"]] },
        { t: "define", term: "Capstone", meaning: "A final project that brings together everything a course taught, done for real.", like: "the final exam in cooking school: a full three-course meal for real guests, not a quiz." },
        { t: "tip", text: "No paying client yet? Do it for a **real** business at a friendly price, or free in exchange for a testimonial and case study. Everything else stays exactly the same." },
      ],
    },
    {
      heading: "Step 1: Plan the project",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "The capstone runs like every paid project: deposit, build, revise, launch, balance." } },
        { t: "prompt", title: "Project plan", text: "I'm delivering a full project for [business, niche, city]. Their main problems: [list]. We agreed on: [package]. Create a day-by-day plan covering discovery, brand kit, website build, [booking/store/web-app feature], SEO and Google profile, automation, agent, testing, handover and payment milestones. Flag what I need from the client, and when." },
        { t: "tool", slug: "automation-roi-calculator", why: "Estimate the client's time and money saved. You'll use this number in the case study." },
        { t: "check", q: "You don't have a paying client yet. What's the right way to do the capstone?", options: ["Skip it", "Do it for a real business at a friendly price or in exchange for a testimonial", "Invent a pretend client"], answer: 1, why: "A real business gives you real proof, which is the whole point." },
      ],
    },
    {
      heading: "Step 2: Build and ship, with quality checks",
      blocks: [
        { t: "p", text: "Follow your own lessons in order. Before moving on from each stage, run its checks:" },
        { t: "list", items: ["Responsive and speed checklist before launch", "On-page SEO audit on every page", "Agent test script: 18 out of 20 or better", "End-to-end system test as three pretend customers", "Uptime monitor on, spending limits set, runbook written"] },
        { t: "define", term: "Quality gate", meaning: "A check a project must pass before it can move to the next stage.", like: "a checkpoint on a highway: you don't continue until your papers are in order." },
        { t: "try", title: "Make your launch checklist", minutes: 10, steps: ["Copy the five checks above into a note.", "Add any client-specific checks (e.g. “prices match the menu board”).", "Don't launch until every box is ticked."] },
      ],
    },
    {
      heading: "Step 3: Write the case study",
      blocks: [
        { t: "define", term: "Case study", meaning: "A short story of one project: the client, the problem, what you built, and the result, with proof.", like: "a before-and-after photo, with the story of how it happened." },
        {
          t: "steps",
          items: [
            { title: "The client", detail: "Who they are, in one sentence." },
            { title: "The problem", detail: "What was costing them customers or time." },
            { title: "What you built", detail: "With screenshots." },
            { title: "The result", detail: "Real numbers when you have them: speed score, bookings, hours saved, reviews gained." },
            { title: "The testimonial", detail: "In their own words." },
          ],
        },
        { t: "warn", text: "Only publish real results, and ask the client's permission before using their name, logo or numbers." },
        { t: "tool", slug: "testimonial-formatter", why: "Format the testimonial for your portfolio and social posts." },
        { t: "scenario", title: "One case study, many clients", text: "A developer's case study: “Booking site for a Surulere braider: deposits cut no-shows, and she gets her Saturdays back”, became the first thing she sent to every salon prospect. It answered the question every owner silently asks: “Have you done this before, for someone like me?”" },
      ],
    },
    {
      heading: "What's next",
      blocks: [
        { t: "list", items: ["Add the case study to your portfolio and pin it on your socials.", "Offer the client a monthly care plan.", "Ask for two referrals: happy clients know other business owners.", "Keep sending about 10 personalised messages a day."] },
        { t: "mistakes", items: [{ wrong: "Launching without running the checks", right: "Every quality gate passed first" }, { wrong: "Publishing invented results", right: "Only real, permitted numbers" }, { wrong: "Disappearing after launch", right: "Care-plan offer + a referral request" }] },
      ],
    },
  ],
  task: {
    title: "Ship the capstone",
    steps: ["Plan the project with your client.", "Build and launch every part in the table.", "Run every quality check.", "Hand over, collect payment and ask for a testimonial.", "Publish the case study on your portfolio."],
    done: ["The website is live on the client's domain", "The SEO, automation and agent parts are live and tested", "The client owns every account and has the runbook", "The case study, with a real testimonial, is on my portfolio"],
  },
  recap: [
    "No paying client yet? Do the capstone for a **real business** at a friendly price or in exchange for a testimonial.",
    "Before launch, pass the **quality gates**: speed/responsive checklist and on-page SEO audit (plus the agent and system tests).",
    "A strong case study has: **the client, the problem, what you built, real results and a testimonial**.",
    "Always **ask permission** before publishing a client's name, logo or numbers.",
    "After a successful project, **offer a care plan and ask for referrals**.",
  ],
  resources: [
    { label: "web.dev: Learn", url: "https://web.dev/learn", note: "Revisit any web topic in depth." },
    { label: "Google Search Central", url: "https://developers.google.com/search", note: "Official SEO documentation." },
    { label: "Anthropic: Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "Keep improving your agents." },
  ],
  quiz: [
    { q: "What should you do if you don't have a paying client yet?", options: ["Skip the capstone", "Do it for a real business at a friendly price or in exchange for a testimonial", "Make up a client", "Copy someone else's project"], answer: 1, why: "A real business gives you real proof.", from: 0 },
    { q: "Which checks must pass before launch?", options: ["The logo is big", "The speed/responsive checklist and the on-page SEO audit", "The owner likes the colour", "None"], answer: 1, why: "Quality gates prevent embarrassing launches.", from: 1 },
    { q: "What makes a strong case study?", options: ["Long technical detail", "The client, the problem, what you built, real results and a testimonial", "Only screenshots", "Invented numbers"], answer: 1, why: "Short, specific and true.", from: 2 },
    { q: "Before publishing a client's name and results, you must…", options: ["Do nothing", "Ask their permission", "Pay them", "Change the numbers"], answer: 1, why: "Respect client confidentiality.", from: 3 },
    { q: "What's the best follow-up after a successful project?", options: ["Disappear", "Offer a care plan and ask for referrals", "Raise the price of the finished project", "Delete the site"], answer: 1, why: "Happy clients bring recurring income and new clients.", from: 4 },
  ],
};

export default lesson;
