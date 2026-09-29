import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "automations-make-zapier-n8n",
  title: "Automations with Make, Zapier & n8n",
  minutes: 120,
  outcome: "Three working automations for a business, with error handling and a handover document.",
  intro:
    "Yesterday you found what to automate. Today you build it. You'll use no-code automation tools — Make, Zapier or n8n — which connect apps like Google Sheets, Gmail, Paystack and WhatsApp without writing code. Three live automations is a real product you can sell for a setup fee plus a monthly retainer.",
  sections: [
    {
      heading: "Choosing a tool",
      blocks: [
        { t: "table", columns: ["Tool", "Best for", "Pricing (check current plans)"], rows: [["Zapier", "Easiest to learn, most app connections", "Free tier, then per task"], ["Make", "Visual, powerful, cheaper for many steps", "Free tier, then per operation"], ["n8n", "Self-hosted, very flexible, great with AI", "Free to self-host; paid cloud"]] },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Describe the workflow and get the step-by-step scenario: which modules, in what order, with what settings." },
        { t: "tip", text: "Start with Make or Zapier's free tier. Learn one tool well before trying others — the ideas are the same everywhere." },
        { t: "figure", figure: { diagram: "trigger-action", caption: "Every automation you build today: a trigger, an optional filter, then one or more actions." } },
      ],
    },
    {
      heading: "Automation 1 — New lead → sheet → owner alert",
      blocks: [
        { t: "steps", items: [
          { title: "Trigger: form submitted", detail: "Use the website's form (Formspree, Tally or Google Forms) or a webhook from your site." },
          { title: "Action: add a row to Google Sheets", detail: "Columns: date, name, phone, message, source, status." },
          { title: "Action: alert the owner", detail: "Email or Telegram/Slack message: “New lead: Ada, wants a quote for braids.”" },
          { title: "Test with real data", detail: "Submit the form yourself and confirm the row and the alert appear." },
        ] },
      ],
    },
    {
      heading: "Automation 2 — Payment → receipt → record",
      blocks: [
        { t: "p", text: "When Paystack confirms a payment, send the customer a thank-you email with details, and record the sale in a sheet. In Make and Zapier, look for the Paystack app or use a webhook." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the receipt, thank-you and follow-up emails." },
        { t: "warn", text: "Automations that handle money must never double-send or double-record. Use the payment reference as a unique ID and check it before adding a row." },
      ],
    },
    {
      heading: "Automation 3 — Scheduled: daily summary or reminders",
      blocks: [
        { t: "p", text: "Scheduled automations run at a time instead of on an event: “every morning at 8am, send the owner yesterday's sales”, or “every day at 6pm, remind tomorrow's appointments”." },
        { t: "tool", slug: "cron-schedule-generator", why: "Converts “every weekday at 8am Lagos time” into the schedule format automation tools use." },
      ],
    },
    {
      heading: "Adding AI to automations",
      blocks: [
        { t: "p", text: "All three tools can call AI models. Use it for steps that need understanding: summarising a long enquiry, classifying a lead as hot/warm/cold, drafting a reply for the owner to approve." },
        { t: "tool", slug: "token-cost-calculator", why: "Estimate the monthly AI cost before you promise a price." },
        { t: "tip", text: "Keep a human in the loop for anything customer-facing at first: AI drafts, the owner approves." },
      ],
    },
    {
      heading: "Error handling and handover",
      blocks: [
        { t: "list", items: ["Turn on error notifications so failures email you.", "Add a fallback: if WhatsApp fails, send an email.", "Name every scenario clearly: “Leads — Form to Sheet + Alert”.", "Write a one-page handover: what each automation does, where it runs, who to contact, monthly cost."] },
        { t: "prompt", title: "Handover doc", text: "Write a one-page handover document for a small business owner describing these automations: [list each with trigger, steps, tools]. Include: what it does in one sentence, what to do if it stops, the monthly tool costs, and who owns each account. Plain English, no jargon." },
      ],
    },
  ],
  task: {
    title: "Build 3 live automations",
    steps: ["Choose Make, Zapier or n8n and create a free account.", "Build the lead → sheet → alert automation.", "Build the payment → receipt → record automation (Paystack test mode).", "Build one scheduled automation.", "Test each with real data, turn on error alerts, and write the handover doc."],
    done: ["All three run successfully with test data", "Payment records can't be duplicated", "Error notifications are on", "The handover doc fits on one page"],
  },
  resources: [
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official Make courses." },
    { label: "Zapier Learn", url: "https://zapier.com/learn", note: "Free guides and tutorials." },
    { label: "n8n docs — Courses", url: "https://docs.n8n.io/courses/", note: "Official beginner and advanced courses." },
    { label: "Paystack — Webhooks", url: "https://paystack.com/docs/payments/webhooks/", note: "Trigger automations from payments." },
    { label: "Tally", url: "https://tally.so", note: "Free forms that connect to automations." },
  ],
  quiz: [
    { q: "Which tool is usually easiest for complete beginners?", options: ["n8n self-hosted", "Zapier", "Writing your own server", "Excel macros"], answer: 1, why: "Zapier has the gentlest learning curve; Make and n8n offer more power." },
    { q: "How do you stop a payment being recorded twice?", options: ["Hope it doesn't happen", "Use the payment reference as a unique ID and check it first", "Turn the automation off", "Record it manually"], answer: 1, why: "A unique reference makes the automation safe to run twice." },
    { q: "What's a scheduled automation?", options: ["One that runs at a set time instead of on an event", "One that never runs", "A manual task", "A chatbot"], answer: 0, why: "Scheduled runs use a time trigger like 8am daily." },
    { q: "Where should AI be used in an automation?", options: ["For steps that need understanding: summarising, classifying, drafting", "For adding numbers", "Nowhere", "Only for images"], answer: 0, why: "Rules handle simple logic; AI handles language." },
    { q: "What must you set up before handing over?", options: ["Nothing", "Error notifications and a one-page handover document", "A new logo", "A blog"], answer: 1, why: "The client needs to know what runs and what to do when something fails." },
  ],
};

export default lesson;
