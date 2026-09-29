import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "capstone",
  title: "Capstone: ship a full client project",
  minutes: 240,
  outcome: "One complete project — website, SEO, automation and agent — shipped for a real business, with a case study and testimonial.",
  intro:
    "This is the finish line of the Main Track, and it's what the whole month has been building to: one real business, one complete system, shipped and paid. You'll reuse everything — your brand kit process, build workflow, SEO checklist, automations, agent and get-paid system. Take the time you need; quality matters more than speed here.",
  sections: [
    {
      heading: "What 'done' means",
      blocks: [
        { t: "table", columns: ["Part", "Minimum for the capstone", "Taught on"], rows: [["Website", "Live on a domain, mobile-first, 80+ speed, working contact", "Days 1–7"], ["Web solution", "Booking, store or web app feature that fits the business", "Days 8–10"], ["SEO", "Titles, meta, schema, GBP set up, sitemap submitted", "Days 11–13"], ["Automation", "At least one live automation with error alerts", "Days 14–15"], ["Agent", "Knowledge base + handoff, tested with your script", "Days 16–17"], ["System", "Connected to a CRM, monitored, with a runbook", "Days 18–19"], ["Business", "Proposal accepted, delivered, paid, testimonial", "Days 20–24"]] },
        { t: "tip", text: "Don't have a paying client yet? Do it for a real business at a friendly price or free in exchange for a testimonial and case study — then everything else is exactly the same." },
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "The capstone runs like every paid project: deposit, build, revise, launch, balance." } },
      ],
    },
    {
      heading: "Step 1 — Plan the project",
      blocks: [
        { t: "prompt", title: "Project plan", text: "I'm delivering a full project for [business, niche, city]. Their main problems: [list]. We agreed on: [package]. Create a day-by-day plan covering discovery, brand kit, website build, [booking/store/app feature], SEO and GBP, automation, agent, testing, handover and payment milestones. Flag what I need from the client and when." },
        { t: "tool", slug: "automation-roi-calculator", why: "Estimate the client's savings — you'll use this number in the case study." },
      ],
    },
    {
      heading: "Step 2 — Build and ship",
      blocks: [
        { t: "p", text: "Follow your own lessons in order. At each stage, run the checklist tools before moving on:" },
        { t: "list", items: ["Responsive and speed checklist before launch", "On-page SEO audit on every page", "Agent test script (18/20 or better)", "End-to-end system test with three pretend customers", "Uptime monitor on and runbook written"] },
      ],
    },
    {
      heading: "Step 3 — Write the case study",
      blocks: [
        { t: "p", text: "A case study turns one project into your best sales tool. Keep it short and specific:" },
        { t: "steps", items: [
          { title: "The client", detail: "Who they are, in one sentence." },
          { title: "The problem", detail: "What was costing them customers or time." },
          { title: "What you built", detail: "With screenshots." },
          { title: "The result", detail: "Real numbers when you have them: speed score, bookings, hours saved, reviews gained." },
          { title: "The testimonial", detail: "In their words." },
        ] },
        { t: "warn", text: "Only publish real results, and ask the client's permission before using their name, logo or numbers." },
        { t: "tool", slug: "testimonial-formatter", why: "Format the testimonial for your portfolio and social posts." },
      ],
    },
    {
      heading: "What's next",
      blocks: [
        { t: "list", items: ["Add the case study to your portfolio and pin it on your socials.", "Offer the client a monthly care plan.", "Ask for two referrals — happy clients know other business owners.", "Keep sending 10 personalised messages a day."] },
      ],
    },
  ],
  task: {
    title: "Ship the capstone",
    steps: ["Plan the project with your client.", "Build and launch every part in the table.", "Run every checklist and test.", "Hand over, collect payment and ask for a testimonial.", "Publish the case study on your portfolio."],
    done: ["The website is live on the client's domain", "SEO, automation and agent are all live and tested", "The client owns every account and has the runbook", "The case study with a real testimonial is on my portfolio"],
  },
  resources: [
    { label: "web.dev — Learn", url: "https://web.dev/learn", note: "Revisit any web topic in depth." },
    { label: "Google Search Central", url: "https://developers.google.com/search", note: "Official SEO documentation." },
    { label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "Keep improving your agents." },
  ],
  quiz: [
    { q: "What should you do if you don't have a paying client yet?", options: ["Skip the capstone", "Do it for a real business at a friendly price or in exchange for a testimonial", "Make up a client", "Copy someone else's project"], answer: 1, why: "A real business gives you real proof." },
    { q: "Which check must pass before launch?", options: ["The logo is big", "Responsive/speed checklist and on-page SEO audit", "The owner likes the colour", "Nothing"], answer: 1, why: "Quality gates prevent embarrassing launches." },
    { q: "What makes a strong case study?", options: ["Long technical detail", "Client, problem, what you built, real results, testimonial", "Only screenshots", "Invented numbers"], answer: 1, why: "Short, specific and true." },
    { q: "Before publishing a client's name and results, you must…", options: ["Do nothing", "Ask their permission", "Pay them", "Change the numbers"], answer: 1, why: "Respect client confidentiality." },
    { q: "What's the best follow-up after a successful project?", options: ["Disappear", "Offer a care plan and ask for referrals", "Raise the price of the finished project", "Delete the site"], answer: 1, why: "Happy clients bring recurring income and new clients." },
  ],
};

export default lesson;
