import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "capstone",
  title: "Capstone: ship a full client project",
  minutes: 240,
  outcome: "One complete project for a real business (a website, a web solution, SEO, an automation and an AI assistant) shipped, handed over, paid, and written up as an honest case study on your portfolio.",
  intro:
    "This is the finish line of the Main Track, and what the whole month has been building towards. Everything you did for Bisi, you'll now do for **one real business** you choose: a website live on their domain, a booking page, shop or portal that fits them, Google set up properly, an automation that gives them hours back, and an assistant that answers their customers, all owned by them, all paid for. Take the time you need; quality matters more than speed. When you finish, you'll have the kind of proof that wins the next ten clients.",
  core: "Ship a real project through every quality check, hand it over with the client owning everything, and turn the result into an honest case study.",
  youNeed: ["One real business (a paying client, or a real business you help at a friendly price)", "Everything you've built in Weeks 1 to 4", "A few days: spread the work out", "Permission from the business to use the project as a case study"],
  sections: [
    {
      heading: "What “done” means",
      blocks: [
        {
          t: "define",
          term: "Capstone",
          like: "the final practical at catering school: a full three-course meal cooked for real guests, not a written test.",
          meaning: "A final project that brings together everything a course taught, done for real.",
        },
        { t: "table", columns: ["Part", "Minimum for the capstone", "Taught in"], rows: [["Website", "Live (on the client's domain if they have one), phone first, 80+ mobile speed, a working form and WhatsApp buttons", "Days 1 to 7"], ["Web solution", "Booking with deposits, a shop, or a portal: whichever fits the business", "Days 8 to 10"], ["SEO", "Titles, descriptions, schema, sitemap submitted, Google Business Profile complete", "Days 11 to 13"], ["Automation", "At least one live automation with error alerts", "Days 14 and 15"], ["Assistant", "Knowledge base and handoff, passing the 20-question test", "Days 16 and 17"], ["System", "Connected to a customer list, monitored, with a runbook", "Days 18 and 19"], ["Business", "Proposal accepted, delivered, paid, testimonial collected", "Days 20 to 25"]] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "shop", label: "website + booking or shop" }, { draw: "search", label: "found on Google" }, { draw: "robot", label: "assistant + automations" }, { draw: "check", label: "owned, paid, documented", hot: true }] },
          caption: "The whole system for one real business: a website with the right web solution, set up to be found, an assistant and automations doing the busywork, and everything owned, paid for and written down.",
        },
        { t: "tip", text: "No paying client yet? Do it for a **real** business at a friendly price, or free in exchange for a testimonial and case study. Everything else stays exactly the same. Bisi doesn't count here: the capstone must be a business you haven't practised on." },
      ],
    },
    {
      heading: "Step 1: Plan the project",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "The capstone runs like every paid project: deposit, build, changes, balance, launch." } },
        { t: "prompt", title: "Project plan", text: "I'm delivering a full project for [business, niche, city]. Their main problems: [list]. We agreed on: [package and scope]. Create a day-by-day plan covering: kick-off, brand kit, website build, [booking / shop / portal], SEO and Google Business Profile, one automation, the website assistant, testing, handover and the payment stages. Flag what I need from the client, and by when. Every tool must be on a free plan unless the client has agreed to pay for an upgrade." },
        { t: "tool", slug: "automation-roi-calculator", why: "Estimate the client's hours and naira saved: you'll use the number in the case study." },
        { t: "check", q: "You don't have a paying client yet. What's the right way to do the capstone?", options: ["Skip it", "Do it for a real business at a friendly price, or in exchange for a testimonial", "Invent a pretend client"], answer: 1, why: "A real business gives you real proof, which is the whole point." },
      ],
    },
    {
      heading: "Step 2: Build and ship, through every check",
      blocks: [
        {
          t: "define",
          term: "Quality gate",
          like: "a police checkpoint on the highway: you don't continue until your papers are in order.",
          meaning: "A check a project must pass before it moves to the next stage, or before it goes live.",
        },
        { t: "p", text: "Follow your own lessons in order. Before launch, every gate must pass:" },
        { t: "list", items: ["**Speed and phones**: 80+ mobile score; nothing scrolls sideways at 360 pixels (Day 6).", "**On-page check** on every main page (Day 11).", "**Payments**: the price-cheating and fake-reference tests fail safely (Day 9), then one small real payment works in live mode.", "**Privacy**: two test customers can't see each other's records (Day 10), if there's a portal.", "**Assistant**: 18 of 20 test questions or better (Day 16).", "**End-to-end test** as three customers plus a repeat contact (Day 18).", "**Monitoring** with a keyword check, limits in place, and a runbook without passwords (Day 19).", "**Ownership**: every account in the client's name, with you as a member (Day 25)."] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "list", label: "every gate on the checklist" }, { draw: "gate", label: "one gate at a time" }, { draw: "check", label: "all ticked" }, { draw: "rocket", label: "only then: launch", hot: true }] },
          caption: "Launch day as a series of checkpoints: work through every gate on the list, tick each one honestly, and launch only when the whole list is ticked.",
        },
        { t: "try", title: "Make your launch checklist", minutes: 10, steps: ["Copy the gates above into a note.", "Add any checks specific to this client (e.g. “prices match the shop's price list”).", "Don't launch until every box is ticked."] },
      ],
    },
    {
      heading: "Step 3: Write the case study",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "The client", detail: "Who they are, in one sentence." },
            { title: "The problem", detail: "What was costing them customers or time, in their words." },
            { title: "What you built", detail: "With screenshots." },
            { title: "The result", detail: "Real numbers only: speed score, bookings in the first month, hours saved per week, reviews gained." },
            { title: "The testimonial", detail: "In their own words, with their permission." },
          ],
        },
        { t: "warn", text: "Only publish real results, and ask the client's permission before using their name, logo, photos or numbers." },
        { t: "tool", slug: "testimonial-formatter", why: "Format the testimonial for your portfolio and social posts." },
        {
          t: "scenario",
          title: "One case study, many clients",
          text: "Picture a short case study: “Booking site for a Surulere braider: deposits cut no-shows, and she gets her Saturdays back”, with her own words underneath. It becomes the first thing you send every salon prospect, because it answers the question every owner silently asks: “Have you done this before, for someone like me?”",
        },
      ],
    },
    {
      heading: "What's next",
      blocks: [
        { t: "list", items: ["Add the case study to your portfolio and pin it on your social pages.", "Offer the client a monthly care plan.", "Ask for two referrals: happy clients know other business owners.", "Keep sending about 10 personal messages a day."] },
        { t: "upgrade", title: "Upgrades the client pays for once the system earns", text: "The domain renews yearly. A busy portal may move to Supabase Pro so it never pauses. An assistant handling personal details should move to a paid AI plan for privacy. If automations outgrow Make's free credits, Make's paid plan. And for you: Claude Pro with Claude Code, to build faster. None of these were needed to build it; add them only when the business is earning from the system." },
        { t: "mistakes", items: [{ wrong: "Launching without running the checks", right: "Every quality gate passed first" }, { wrong: "Publishing invented results", right: "Only real, permitted numbers" }, { wrong: "Disappearing after launch", right: "A care-plan offer and a referral request" }] },
        { t: "win", title: "Capstone shipped", proved: "you can deliver a complete digital system for a real business (built, checked, handed over and paid for) using free tools and your own skill.", cue: "Publish the case study, then finish your mission. Your final assessment and certificate are next." },
      ],
    },
  ],
  task: {
    title: "Ship the capstone",
    steps: ["Plan the project with your client.", "Build and launch every part in the table.", "Run every quality gate.", "Hand over, collect the balance and ask for a testimonial.", "Publish the case study on your portfolio."],
    done: ["The website is live (on the client's domain if they have one)", "The web solution, SEO, automation and assistant are live and tested", "Every quality gate passed", "The client owns every account and has the runbook", "The case study, with a real testimonial, is on my portfolio"],
  },
  recap: [
    "No paying client yet? Do the capstone for a **real business** at a friendly price or in exchange for a testimonial.",
    "Before launch, pass every **quality gate**: speed, on-page check, payment and privacy tests, the assistant's 20 questions and the end-to-end test.",
    "A strong case study has **the client, the problem, what you built, real results and a testimonial**.",
    "Always **ask permission** before publishing a client's name, logo or numbers.",
    "After a successful project, **offer a care plan and ask for referrals**.",
  ],
  resources: [
    { label: "web.dev: Learn", url: "https://web.dev/learn", note: "Revisit any web topic in depth." },
    { label: "Google Search Central", url: "https://developers.google.com/search", note: "Official SEO documentation." },
    { label: "Anthropic: building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "Keep improving your assistants." },
    { label: "Cloudflare Pages docs", url: "https://developers.cloudflare.com/pages/", note: "Everything about the hosting you've used all month." },
  ],
  quiz: [
    { q: "What must happen before the capstone goes live?", options: ["The logo is big enough", "Every quality gate passes: speed, on-page check, payment and privacy tests, the assistant's 20 questions and the end-to-end test", "The owner likes the colours", "Nothing"], answer: 1, why: "Quality gates prevent embarrassing launches and protect the client's customers.", from: 1, aim: "core" },
    { q: "You don't have a paying client yet. What should you do?", options: ["Skip the capstone", "Do it for a real business at a friendly price or in exchange for a testimonial", "Make up a client", "Copy someone else's project"], answer: 1, why: "A real business gives you real proof.", from: 0, aim: "client-work" },
    { q: "What makes a strong case study?", options: ["Long technical detail", "The client, the problem, what you built, real results and a testimonial", "Only screenshots", "Invented numbers"], answer: 1, why: "Short, specific and true wins the next client.", from: 2, aim: "client-work" },
    { q: "Before publishing a client's name and results, you must…", options: ["Do nothing", "Ask their permission", "Pay them", "Change the numbers"], answer: 1, why: "Respect the client's privacy and trust.", from: 3, aim: "client-work" },
    { q: "What's the best follow-up after a successful project?", options: ["Disappear", "Offer a care plan and ask for referrals", "Raise the price of the finished project", "Delete the site"], answer: 1, why: "Happy clients bring steady income and new clients.", from: 4, aim: "client-work" },
  ],
  celebrate: {
    title: "Main Track complete: you shipped a full system",
    proved: "You can deliver a complete digital system for a real business (built, checked, handed over and paid for) with free tools and your own skill.",
    badge: "Full-system shipper",
    badgeDesc: "Shipped a complete client project",
  },
};

export default lesson;
