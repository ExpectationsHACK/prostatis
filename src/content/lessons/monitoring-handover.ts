import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "monitoring-handover",
  title: "Project: monitoring & handover",
  minutes: 120,
  outcome: "Uptime monitoring, spending limits and a runbook for your system, and a professional handover where the client owns every account.",
  intro:
    "This is your Week 3 project. Systems that nobody watches break silently: the website goes down on a Saturday, an automation stops after an app update, the agent keeps quoting last month's prices. Professionals set up **monitoring** and write a **runbook** so problems are caught early and anyone can fix them. That watching is exactly what clients pay a monthly fee for.",
  youNeed: ["Your connected system from the last lesson", "A free uptime monitoring account (UptimeRobot or Better Stack)", "Access to the AI and automation dashboards you used", "A client, friend or classmate for a recorded walkthrough"],
  sections: [
    {
      heading: "What to watch",
      blocks: [
        { t: "table", columns: ["Part", "What can go wrong", "How to catch it"], rows: [["Website", "Down, slow, expired domain or security certificate", "An uptime monitor; a domain renewal reminder"], ["Automations", "A connection expires; an app changes", "Error emails; a weekly look at run history"], ["Agent", "Wrong answers, old facts, a cost spike", "A weekly read of conversations; spending limits"], ["Payments", "A webhook fails", "Compare the Paystack dashboard with your records weekly"]] },
        { t: "define", term: "Monitoring", meaning: "Tools and habits that watch a system and warn you when something goes wrong, ideally before the client or customers notice.", like: "a smoke alarm. You hope it never rings, but you'd never live without one." },
        { t: "tool", slug: "agent-monitoring-checklist", why: "Checks a live link's uptime and response time, and gives the full monitoring checklist for agents and automations." },
      ],
    },
    {
      heading: "Step 1: Uptime monitoring",
      blocks: [
        { t: "define", term: "Uptime", meaning: "The share of time a website is online and working. A monitor visits it every few minutes and alerts you if it's down.", like: "a security guard doing rounds and calling you the moment a door is open." },
        {
          t: "steps",
          items: [
            { title: "Create a monitor for the home page", detail: "HTTPS, checking every few minutes. UptimeRobot and Better Stack both have free plans, check each plan's current terms for client work." },
            { title: "Add a keyword check", detail: "Alert if an important word (like the business name) disappears. This catches broken pages that still technically “load”." },
            { title: "Send alerts to your email and phone", detail: "You should know before the client does." },
          ],
        },
        { t: "check", q: "The site loads but shows an error message instead of the business. Which check catches this?", options: ["A plain uptime check only", "A keyword check that looks for the business name", "Nothing can catch it"], answer: 1, why: "A page can respond “OK” while showing the wrong content; a keyword check notices." },
        { t: "try", title: "Monitor your own site", minutes: 10, steps: ["Create a free UptimeRobot (or Better Stack) account.", "Add your live site as a monitor with a keyword check.", "Pause your Vercel deployment or change the keyword to test: did an alert arrive?"] },
      ],
    },
    {
      heading: "Step 2: Cost control",
      blocks: [
        { t: "p", text: "AI and automation tools charge by usage. A bug or a spam attack can create a surprise bill in a single night." },
        { t: "list", items: ["Set a **monthly spending limit** in the AI provider's console", "Turn on usage alerts (for example at 50% and 80%)", "Check automation operation counts weekly", "Write every monthly cost in the runbook, with who pays it"] },
        { t: "tool", slug: "token-cost-calculator", why: "Re-estimate AI costs using real message numbers from the first week." },
        { t: "scenario", title: "The chatbot that got spammed", text: "A bot on a public page was hit by thousands of automated messages overnight. Because a monthly limit was set, the AI simply stopped at the cap and the developer got an alert, a small, annoying bill instead of a disaster. Limits are cheap insurance." },
      ],
    },
    {
      heading: "Step 3: Write the runbook",
      blocks: [
        { t: "define", term: "Runbook", meaning: "The instruction manual for a system: what exists, where it lives, who owns each account, what it costs, and exactly what to do when something fails.", like: "the emergency card in a hotel room: short, clear steps anyone can follow under pressure." },
        { t: "prompt", title: "Draft the runbook", text: "Write a runbook for this system: [list the website, hosting, domain registrar, automations, agent platform, customer list, payment provider]. For each part include: what it does, where it's hosted, which account owns it, the monthly cost, how to tell if it's broken, and step-by-step what to do. Add a 'first 15 minutes' checklist for when the owner says 'it's not working'. Plain language." },
        { t: "warn", text: "Never write passwords in the runbook. Say **where** access is managed (for example “in the owner's password manager”), never the password itself." },
      ],
    },
    {
      heading: "Step 4: The handover",
      blocks: [
        { t: "figure", figure: { diagram: "handover", caption: "The client owns every account; you're added as a team member." } },
        { t: "list", items: ["**Ownership**: domain, hosting, Paystack, WhatsApp, Google profile, automation and AI accounts belong to the client, with you added as a member.", "A 30-minute walkthrough call: recorded, so they can rewatch it.", "Give them the runbook and a one-page “how to update prices and hours”.", "Agree what support is included, and offer a monthly care plan."] },
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Handover is a planned stage of every project, not an afterthought." } },
        { t: "mistakes", items: [{ wrong: "Keeping the client's accounts in your name “to make it easier”", right: "Client owns everything; you're a member they can remove" }, { wrong: "Passwords written in the runbook", right: "The runbook says where access is managed" }, { wrong: "No spending limits on AI", right: "A monthly cap and usage alerts from day one" }] },
      ],
    },
  ],
  task: {
    title: "Ship the Week 3 project",
    steps: ["Set up uptime monitoring with a keyword check.", "Set spending limits and usage alerts on the AI and automation tools.", "Read a week of agent conversations and fix any wrong answers.", "Write the runbook.", "Do a recorded handover walkthrough (with a client, friend or classmate)."],
    done: ["I get an alert within minutes if the site goes down", "Spending limits are set", "The runbook contains no passwords", "Every account is owned by the client"],
  },
  recap: [
    "An **uptime monitor** checks the site every few minutes and alerts you if it's down, so you know before the client does.",
    "A **keyword check** catches pages that load but show the wrong content, like an error message.",
    "A **runbook** explains every part of the system and what to do when it fails, but **never contains passwords**.",
    "After handover, the **client owns every account**, with you added as a team member.",
    "**Spending limits and usage alerts** protect clients from surprise AI and automation bills.",
  ],
  resources: [
    { label: "UptimeRobot", url: "https://uptimerobot.com", note: "Uptime monitoring with a free plan." },
    { label: "Better Stack", url: "https://betterstack.com/uptime", note: "Uptime monitoring and status pages." },
    { label: "Anthropic: Rate and spend limits", url: "https://docs.claude.com/en/api/rate-limits", note: "How API usage limits work." },
    { label: "Google SRE book: Monitoring", url: "https://sre.google/sre-book/monitoring-distributed-systems/", note: "How professionals think about monitoring (advanced, optional)." },
  ],
  quiz: [
    { q: "What does an uptime monitor do?", options: ["Designs pages", "Checks the site every few minutes and alerts you if it's down", "Writes articles", "Takes payments"], answer: 1, why: "You find out before the client does.", from: 0 },
    { q: "Why add a keyword check to uptime monitoring?", options: ["It improves SEO", "It catches pages that load but show an error or the wrong content", "It's decoration", "It's faster"], answer: 1, why: "A page can respond “OK” while showing the wrong content.", from: 1 },
    { q: "What must never go in a runbook?", options: ["Where things are hosted", "Monthly costs", "Passwords", "What to do when it breaks"], answer: 2, why: "Point to where access is managed instead.", from: 2 },
    { q: "Who should own the accounts after handover?", options: ["You", "The client, with you added as a team member", "Nobody", "Your friend"], answer: 1, why: "It's their business; ownership builds trust and protects everyone.", from: 3 },
    { q: "How do you protect a client from a surprise AI bill?", options: ["Don't use AI", "Set spending limits and usage alerts", "Pay it yourself", "Hope"], answer: 1, why: "Limits cap the damage from bugs or abuse.", from: 4 },
  ],
};

export default lesson;
