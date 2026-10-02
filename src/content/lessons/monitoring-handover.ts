import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "monitoring-handover",
  title: "Project: monitoring & handover",
  minutes: 120,
  outcome: "Free alerts that tell you within minutes if Bisi's site goes down, limits and weekly checks on every tool that could cost money, a written instruction manual for her whole system, and a recorded handover where she owns every account.",
  intro:
    "This is your Week 3 project. Systems that nobody watches break silently: the website goes down on a Saturday, an automation stops because Google asked to reconnect, the assistant keeps quoting last month's prices. Professionals set up automatic watching and write a clear instruction manual, so problems are caught early and anyone can fix them. That watching is exactly what clients pay a monthly fee for, and today you'll set it up for free.",
  core: "Watch every part of a system automatically, cap anything that can cost money, and hand over a written manual with every account in the client's name.",
  youNeed: ["Your connected system from yesterday", "An email address for a free Better Stack account", "Access to the Make, Cloudflare, Google AI Studio and Paystack dashboards you used", "A client, friend or classmate for a recorded walkthrough"],
  sections: [
    {
      heading: "What to watch",
      blocks: [
        {
          t: "define",
          term: "Monitoring",
          like: "a smoke alarm: you hope it never rings, but you'd never sleep in a house without one.",
          meaning: "Tools and habits that watch a system and warn you when something goes wrong, ideally before the client or customers notice.",
        },
        {
          t: "define",
          term: "Uptime",
          like: "how many hours a day there's light from the electricity company. “Twenty-four hours” is what everybody wants.",
          meaning: "The share of time a website is online and working. 99.9% uptime means less than about 45 minutes offline in a month.",
        },
        { t: "table", columns: ["Part", "What can go wrong", "How to catch it"], rows: [["Website", "Down, slow, or the domain expires", "A free uptime monitor; the domain's renewal date in your calendar"], ["Automations", "A connection expires; an app changes", "Make's error emails; a weekly look at its run history"], ["AI assistant", "Wrong answers, old prices, a usage spike", "Re-run the 20 questions monthly; check usage weekly"], ["Payments", "A payment isn't recorded", "Compare Paystack's dashboard with the Payments sheet weekly"]] },
        { t: "tool", slug: "agent-monitoring-checklist", why: "Checks a live link's availability and response time, and gives the full monitoring checklist for assistants and automations." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "shop", label: "the website" }, { draw: "eye", label: "checked every few minutes" }, { draw: "bell", label: "alert if it's down", hot: true }, { draw: "person", label: "you fix it before Bisi notices" }] },
          caption: "Uptime monitoring like a smoke alarm: a free service looks at the site every few minutes and rings your phone the moment it's down, so you're fixing it before the owner hears from a customer.",
        },
      ],
    },
    {
      heading: "Step 1: Uptime alerts (free)",
      blocks: [
        { t: "warn", text: "Choose the free plan carefully: **UptimeRobot's free plan is for personal, non-commercial use only**, so it isn't allowed for a client's site. **Better Stack's free plan** allows business use (check its current terms when you sign up)." },
        {
          t: "steps",
          items: [
            { title: "Create a free Better Stack account", detail: "Go to `betterstack.com`, open **Uptime** and sign up free with your email." },
            { title: "Create a monitor", detail: "Click **Create monitor**. Paste the site's address, starting with https://." },
            { title: "Add a keyword check", detail: "For **Alert us when**, choose the option for when the page **doesn't contain a keyword**, and type the business name, e.g. “Stitches by Bisi”. This catches pages that load but show an error." },
            { title: "Send alerts to you", detail: "Choose email (and, if you like, Better Stack's free phone app for push alerts). Save." },
          ],
        },
        { t: "check", q: "The site loads but shows an error message instead of Bisi's page. Which check catches this?", options: ["A plain “is it online” check only", "A keyword check that looks for the business name", "Nothing can catch it"], answer: 1, why: "A page can answer “OK” while showing the wrong content; a keyword check notices." },
        { t: "try", title: "Make it ring", minutes: 10, steps: ["Set up a monitor for your own site with a keyword check.", "Edit the monitor's keyword to a word that isn't on the page, and save.", "Wait a few minutes: did an alert arrive? Then change the keyword back."] },
      ],
    },
    {
      heading: "Step 2: Cap anything that can cost money",
      blocks: [
        { t: "p", text: "Most of Bisi's system runs on free plans, but some parts charge by use if they're upgraded, and a bug or a spam attack can burn through a free allowance in one night." },
        { t: "list", items: ["**Make**: check the credits used each week (your organisation's **Usage** or credits page).", "**AI assistant**: the free Gemini allowance simply stops at its limit, and the assistant falls back to WhatsApp. On a paid plan, set a **budget and alerts** in Google's billing settings.", "**Cloudflare and Supabase**: both show usage on their dashboards; small sites stay far inside the free limits.", "Write every monthly cost in the manual, with who pays it (often: nothing, plus the domain once a year)."] },
        { t: "tool", slug: "token-cost-calculator", why: "Estimate what the assistant would cost on a paid plan, using the real number of chats from the first weeks." },
        {
          t: "scenario",
          title: "The chat bubble that got spammed",
          text: "Picture a chat assistant on a public page hit by thousands of automated messages overnight. Because it ran on a capped free allowance (or a paid plan with a budget), it simply stopped at the limit, showed the WhatsApp fallback, and the developer got an alert: a small inconvenience instead of a surprise bill. Limits are cheap insurance.",
        },
      ],
    },
    {
      heading: "Step 3: Write the instruction manual",
      blocks: [
        {
          t: "define",
          term: "Runbook",
          like: "the card stuck on the wall beside the generator: what to do when the light goes, step by step, so anyone in the house can do it.",
          meaning: "The instruction manual for a system: what exists, where it lives, who owns each account, what it costs, and exactly what to do when something fails.",
        },
        { t: "prompt", title: "Draft the runbook", text: "Write a runbook for this system: [list the website on Cloudflare Pages, the GitHub repository, the domain and registrar, the Make scenarios, the website assistant and its Gemini key, the Google Sheets, Paystack, the Supabase portal, WhatsApp Business]. For each part: what it does, where it lives, which account owns it, the monthly cost, how to tell it's broken, and step-by-step what to do. Add a 'first 15 minutes' checklist for when the owner says 'it's not working'. Plain English for a busy owner." },
        { t: "warn", text: "Never write passwords in the runbook. Say **where** access is managed (for example “in the owner's password manager”; Bitwarden has a free plan), never the password itself." },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "No manual", nodes: [{ draw: "person", label: "only you know how it works" }, { draw: "cross", label: "you travel, it breaks" }] },
            right: { title: "A runbook", nodes: [{ draw: "book", label: "anyone can follow it", hot: true }, { draw: "check", label: "fixed in 15 minutes" }] },
          },
          caption: "Without a manual, the system depends on you being reachable; with a runbook, the owner or any helper can follow the steps and fix the common problems.",
        },
      ],
    },
    {
      heading: "Step 4: The handover",
      blocks: [
        { t: "figure", figure: { diagram: "handover", caption: "The client owns every account; you're added as a team member." } },
        { t: "list", items: ["**Ownership**: domain, Cloudflare, GitHub, Paystack, WhatsApp, Google profile, Make, Supabase and the AI key belong to the client, with you added as a member.", "**A 30-minute walkthrough call**, recorded (a WhatsApp video call or Google Meet), so they can rewatch it.", "**The runbook**, plus a one-page “how to change prices and hours”.", "Agree what support is included, and offer a monthly fee for looking after the system."] },
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Handover is a planned stage of every project, not an afterthought." } },
        { t: "mistakes", items: [{ wrong: "Keeping the client's accounts in your name “to make it easier”", right: "The client owns everything; you're a member they can remove" }, { wrong: "Passwords written in the runbook", right: "The runbook says where access is managed" }, { wrong: "No limits on anything that could cost money", right: "Free plans with their natural caps, or budgets and alerts on paid ones" }] },
        { t: "win", title: "Week 3 project shipped", proved: "you can hand over a system that keeps working without you: watched, capped, documented, and owned by the client.", cue: "Record the walkthrough and send the runbook. Finish your mission for the **Watchful handover** badge." },
      ],
    },
  ],
  task: {
    title: "Ship the Week 3 project",
    steps: ["Set up a free Better Stack monitor with a keyword check, and test the alert.", "Check usage on Make and the assistant, and note any limits or budgets.", "Re-run the assistant's 20 questions and fix any wrong answers.", "Write the runbook.", "Do a recorded handover walkthrough (with a client, friend or classmate)."],
    done: ["I get an alert within minutes if the site goes down", "Limits or budgets are in place for anything that could cost money", "The runbook contains no passwords", "Every account is owned by the client, with me as a member", "The walkthrough is recorded"],
  },
  recap: [
    "An **uptime monitor** checks the site every few minutes and alerts you if it's down, so you know before the client does.",
    "A **keyword check** catches pages that load but show the wrong content, like an error message.",
    "A **runbook** explains every part of the system and what to do when it fails, but **never contains passwords**.",
    "After handover, the **client owns every account**, with you added as a team member.",
    "**Limits and weekly usage checks** protect clients from surprise bills.",
    "UptimeRobot's free plan is **non-commercial**; for client sites use a monitor whose free plan allows business use, like **Better Stack**.",
  ],
  resources: [
    { label: "Better Stack Uptime", url: "https://betterstack.com/uptime", note: "Uptime monitoring with a free plan." },
    { label: "Make: credits and usage", url: "https://help.make.com/credits", note: "How Make counts and shows usage." },
    { label: "Gemini API: rate limits", url: "https://ai.google.dev/gemini-api/docs/rate-limits", note: "The free allowance's limits." },
    { label: "Bitwarden", url: "https://bitwarden.com", note: "Free password manager for sharing access safely." },
  ],
  quiz: [
    { q: "What does an uptime monitor do?", options: ["Designs pages", "Checks the site every few minutes and alerts you if it's down", "Writes articles", "Takes payments"], answer: 1, why: "You find out before the client does.", from: 0, aim: "core" },
    { q: "Why add a keyword check to the monitor?", options: ["It helps Google", "It catches pages that load but show an error or the wrong content", "It's decoration", "It makes the site faster"], answer: 1, why: "A page can answer “OK” while showing the wrong thing. Your final project's checklist includes this.", from: 1, aim: "capstone" },
    { q: "What must never go in a runbook?", options: ["Where things live", "Monthly costs", "Passwords", "What to do when it breaks"], answer: 2, why: "Point to where access is managed instead. Your final project ends with a runbook like this.", from: 2, aim: "capstone" },
    { q: "Who owns the accounts after handover?", options: ["You", "The client, with you added as a team member", "Nobody", "Your friend"], answer: 1, why: "It's their business. You'll confirm it on the deliver-and-get-paid day.", from: 3, aim: "deliver-get-paid" },
    { q: "How do you protect a client from a surprise bill?", options: ["Never use AI", "Limits or budgets, plus weekly usage checks", "Pay it yourself", "Hope"], answer: 1, why: "Caps limit the damage from bugs or spam. Include these checks in every monthly support package.", from: 4, aim: "client-work" },
  ],
  celebrate: {
    title: "Week 3 project complete",
    proved: "You can hand over a system that keeps working without you: watched, capped, documented, and owned by the client.",
    badge: "Watchful handover",
    badgeDesc: "Monitored, documented and handed over a system",
  },
};

export default lesson;
