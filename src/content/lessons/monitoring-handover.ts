import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "monitoring-handover",
  title: "Project: monitoring & handover",
  minutes: 120,
  outcome: "Uptime monitoring, cost tracking and a runbook for your system — plus a professional handover to the client.",
  intro:
    "This is your Week 3 project. Systems that nobody watches eventually break silently: the website goes down, an automation stops, the agent starts giving wrong prices. Professionals set up monitoring and write a runbook so problems are caught early — and that monitoring is exactly what clients pay a monthly retainer for.",
  sections: [
    {
      heading: "What to watch",
      blocks: [
        { t: "table", columns: ["Part", "What can go wrong", "How to catch it"], rows: [["Website", "Down, slow, expired domain or SSL", "Uptime monitor, domain renewal reminder"], ["Automations", "A connection expires, an app changes", "Error emails, weekly run history check"], ["Agent", "Wrong answers, outdated facts, cost spike", "Weekly conversation review, usage limits"], ["Payments", "Webhook fails", "Compare Paystack dashboard with your records weekly"]] },
        { t: "tool", slug: "agent-monitoring-checklist", why: "Checks a live URL's uptime and response time, and gives the full monitoring checklist for agents and automations." },
      ],
    },
    {
      heading: "Step 1 — Uptime monitoring",
      blocks: [
        { t: "p", text: "An uptime monitor visits the site every few minutes and alerts you if it's down. UptimeRobot and Better Stack have free plans." },
        { t: "steps", items: [
          { title: "Create a monitor for the homepage", detail: "HTTPS, every 5 minutes." },
          { title: "Add a keyword check", detail: "Alert if an important word (like the business name) disappears — catches broken pages that still 'load'." },
          { title: "Alert to email and phone", detail: "You should know before the client does." },
        ] },
      ],
    },
    {
      heading: "Step 2 — Cost control",
      blocks: [
        { t: "p", text: "AI and automation tools charge by usage. A bug or a spam attack can create a surprise bill." },
        { t: "list", items: ["Set monthly spend limits in the AI provider's console", "Set usage alerts at 50% and 80%", "Check automation operation counts weekly", "Record every monthly cost in the runbook, with who pays it"] },
        { t: "tool", slug: "token-cost-calculator", why: "Re-estimate AI costs with real message volumes from the first week." },
      ],
    },
    {
      heading: "Step 3 — Write the runbook",
      blocks: [
        { t: "p", text: "A runbook is the instruction manual for the system: what exists, where it lives, and what to do when something fails. Someone else should be able to fix a problem using only the runbook." },
        { t: "prompt", title: "Draft the runbook", text: "Write a runbook for this system: [list website, hosting, domain registrar, automations, agent platform, CRM, payment provider]. For each part include: what it does, where it's hosted, which account owns it, monthly cost, how to tell if it's broken, and step-by-step what to do. Add a 'first 15 minutes' checklist for when the owner reports 'it's not working'. Plain language." },
        { t: "warn", text: "Never write passwords in the runbook. Say where access is managed (e.g. the client's password manager), not the password itself." },
      ],
    },
    {
      heading: "Step 4 — The handover",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Handover is a stage of every project, not an afterthought." } },
        { t: "list", items: ["Transfer ownership: domain, hosting, Paystack, WhatsApp, automation and AI accounts belong to the client (you're added as a team member)", "A 30-minute walkthrough call — record it", "Give the runbook and a one-page 'how to update prices and hours'", "Agree what's included in support, and offer a monthly care plan"] },
      ],
    },
  ],
  task: {
    title: "Ship the Week 3 project",
    steps: ["Set up uptime monitoring with a keyword check.", "Set spend limits and usage alerts on AI and automation tools.", "Review a week of agent conversations and fix any wrong answers.", "Write the runbook.", "Do a recorded handover walkthrough (with a client, friend or classmate)."],
    done: ["I get an alert within 5 minutes if the site goes down", "Spend limits are set", "The runbook has no passwords in it", "Every account is owned by the client"],
  },
  resources: [
    { label: "UptimeRobot", url: "https://uptimerobot.com", note: "Free uptime monitoring." },
    { label: "Better Stack", url: "https://betterstack.com/uptime", note: "Uptime monitoring and status pages." },
    { label: "Anthropic Console — usage limits", url: "https://docs.claude.com/en/api/rate-limits", note: "Spend and rate limits for API use." },
    { label: "Google SRE book — Monitoring", url: "https://sre.google/sre-book/monitoring-distributed-systems/", note: "How professionals think about monitoring (advanced, optional)." },
  ],
  quiz: [
    { q: "What does an uptime monitor do?", options: ["Designs pages", "Checks the site every few minutes and alerts you if it's down", "Writes blog posts", "Takes payments"], answer: 1, why: "You find out before the client does." },
    { q: "Why add a keyword check to uptime monitoring?", options: ["It improves SEO", "It catches broken pages that still load but show an error", "It's decoration", "It's faster"], answer: 1, why: "A page can return 'OK' while showing the wrong content." },
    { q: "What must never go in a runbook?", options: ["Where things are hosted", "Monthly costs", "Passwords", "What to do when it breaks"], answer: 2, why: "Point to where access is managed instead." },
    { q: "Who should own the accounts after handover?", options: ["You", "The client, with you added as a team member", "Nobody", "Your friend"], answer: 1, why: "It's their business; ownership builds trust and protects everyone." },
    { q: "How do you protect a client from a surprise AI bill?", options: ["Don't use AI", "Set spend limits and usage alerts", "Pay it yourself", "Hope"], answer: 1, why: "Limits cap the damage from bugs or abuse." },
  ],
};

export default lesson;
