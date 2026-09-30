import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "automations-make-zapier-n8n",
  title: "Automations with Make, Zapier & n8n",
  minutes: 120,
  outcome: "Three working automations for a business, new enquiry alerts, payment records and a daily summary, with error alerts and a one-page handover note.",
  intro:
    "Yesterday you found what to automate. Today you build it. You'll use **no-code automation tools**, Make, Zapier or n8n, which connect apps like Google Sheets, Gmail and Paystack by clicking, not coding. Three reliable automations are a real product: you can charge a setup fee plus a monthly fee to keep them running.",
  youNeed: ["Your top 3 automation ideas from the last lesson", "A free Make account (recommended for this lesson)", "A Google account (for Sheets and Gmail)", "Your site's contact form and a Paystack test account"],
  sections: [
    {
      heading: "Choosing a tool",
      blocks: [
        { t: "table", columns: ["Tool", "Best for", "Free plan (check current limits)"], rows: [["Make", "Visual builder, powerful, good value", "Yes: a monthly allowance of operations; webhooks included"], ["Zapier", "Easiest to learn, the most app connections", "Yes: but some features, including webhooks, need a paid plan"], ["n8n", "Very flexible, great with AI; can run on your own server", "Free to self-host; paid cloud plans"]] },
        { t: "define", term: "Scenario / Zap / Workflow", meaning: "The name each tool gives to one automation: Make calls it a **scenario**, Zapier a **Zap**, n8n a **workflow**. Same idea: trigger → actions.", like: "different languages for the word “recipe”." },
        { t: "define", term: "Operation (task)", meaning: "One step that runs once, like “add a row”. Free plans give you a limited number each month, so count them.", like: "units on a prepaid electricity meter." },
        { t: "figure", figure: { diagram: "trigger-action", caption: "Every automation you build today: a trigger, an optional filter, then one or more actions." } },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Describe the workflow and get the step-by-step scenario: which modules, in what order, with what settings." },
        { t: "tip", text: "Learn **one** tool well before trying others, the ideas are the same everywhere. We use Make in the examples because its free plan includes webhooks." },
      ],
    },
    {
      heading: "Automation 1: New enquiry → sheet → owner alert",
      blocks: [
        { t: "define", term: "Webhook (for automations)", meaning: "A special web address your automation tool gives you. When another app sends information to that address, the automation starts.", like: "a dedicated letterbox: anything dropped in it gets processed straight away." },
        {
          t: "steps",
          items: [
            { title: "Trigger: a new enquiry", detail: "In Make, add a **Custom webhook** module and copy its address. Ask Claude to send your contact form's data to it as well as to Formspree, or use a form tool with a built-in Make connection, like Tally or Google Forms." },
            { title: "Action: add a row to Google Sheets", detail: "Columns: date, name, phone, message, source, status." },
            { title: "Action: alert the owner", detail: "Send an email (or a Telegram message): “New enquiry from Ada: wants a quote for braids.”" },
            { title: "Test with real data", detail: "Submit the form yourself and check that the row and the alert both appear." },
          ],
        },
        { t: "try", title: "Build it now", minutes: 20, steps: ["Create a Google Sheet called “Enquiries” with the columns above.", "Build the scenario in Make: webhook → Google Sheets → Email.", "Send a test enquiry. Did a row appear and an email arrive? Screenshot it."] },
      ],
    },
    {
      heading: "Automation 2: Payment → record → thank-you",
      blocks: [
        { t: "p", text: "When a payment succeeds, record the sale in a sheet and send the customer a warm thank-you with next steps (Paystack already sends the receipt itself)." },
        { t: "list", items: ["**Trigger**: Paystack's webhook, pointed at your Make webhook address (in test mode first).", "**Filter**: continue only if the event is `charge.success`.", "**Actions**: add a row with the reference, amount (divide kobo by 100) and customer; send the thank-you email."] },
        { t: "warn", text: "Paystack sends its webhook to **one address per mode** (test and live). If your website already uses the webhook (the store lesson), have your **site** forward verified orders to the automation instead of pointing Paystack at Make, otherwise one of them stops receiving payments." },
        { t: "warn", text: "Automations that touch money must never double-record. Use the **payment reference** as a unique ID: search the sheet for it first, and only add a row if it isn't there." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the thank-you, next-steps and follow-up emails." },
        { t: "check", q: "Why search the sheet for the payment reference before adding a row?", options: ["To make it slower", "So the same payment is never recorded twice", "Paystack requires it"], answer: 1, why: "Webhooks can arrive more than once; checking the unique reference keeps records correct." },
      ],
    },
    {
      heading: "Automation 3: A daily summary",
      blocks: [
        { t: "p", text: "Scheduled automations run at a set time instead of on an event: “every morning at 8am, send the owner yesterday's sales and new enquiries”." },
        { t: "tool", slug: "cron-schedule-generator", why: "Turns “every weekday at 8am Lagos time” into the schedule format automation tools use." },
        { t: "tip", text: "Always set the automation's **time zone to Africa/Lagos**, or your 8am summary may arrive at 7am or 9am." },
      ],
    },
    {
      heading: "Adding AI to automations",
      blocks: [
        { t: "p", text: "All three tools can call AI models. Use AI for steps that need **understanding**: summarising a long enquiry, labelling a lead as hot/warm/cold, drafting a reply for the owner to approve. Use plain rules for simple logic like maths." },
        { t: "tool", slug: "token-cost-calculator", why: "Estimate the monthly AI cost before you quote a price." },
        { t: "tip", text: "Keep a person in the loop for anything customers see, at least at first: AI drafts, the owner approves." },
        { t: "scenario", title: "The enquiry sorter", text: "A property agent got 60 WhatsApp-form enquiries a week, most just “price?”. An automation asked AI to label each one, “ready to view”, “just browsing”, “needs follow-up”, and only alerted the agent about “ready to view”. The agent stopped missing serious buyers in the noise." },
      ],
    },
    {
      heading: "Error alerts and handover",
      blocks: [
        { t: "list", items: ["Turn on **error notifications** so a failure emails you.", "Name every scenario clearly: “Enquiries: form to sheet + alert”.", "Write a one-page handover: what each automation does, where it runs, who owns the account, the monthly cost, and what to do if it stops."] },
        { t: "prompt", title: "Handover note", text: "Write a one-page handover note for a small business owner describing these automations: [list each with trigger, steps, tools]. Include: what each does in one sentence, what to do if it stops, the monthly tool costs, and who owns each account. Plain English, no jargon." },
        { t: "mistakes", items: [{ wrong: "Building on your personal account for a client", right: "Build in an account the client owns; add yourself as a member" }, { wrong: "No error alerts: finding out a week later", right: "Error notifications on from day one" }, { wrong: "Recording every webhook blindly", right: "Checking the unique payment reference first" }] },
      ],
    },
  ],
  task: {
    title: "Build 3 live automations",
    steps: ["Create a free Make account (or your chosen tool).", "Build: new enquiry → sheet → owner alert.", "Build: payment (Paystack test mode) → record once → thank-you email.", "Build one scheduled daily summary in Lagos time.", "Test each with real data, turn on error alerts, and write the handover note."],
    done: ["All three run successfully with test data", "The same payment reference can't be recorded twice", "Error notifications are switched on", "The handover note fits on one page"],
  },
  recap: [
    "**Zapier** is the easiest to learn; **Make** and **n8n** offer more power, and Make's free plan includes webhooks.",
    "Stop double-recording by using the **payment reference as a unique ID** and checking it before adding a row.",
    "A **scheduled automation** runs at a set time (like 8am daily, Lagos time) instead of on an event.",
    "Use **AI for steps that need understanding**, summarising, labelling, drafting, and plain rules for simple logic.",
    "Before handover: **error notifications on**, and a **one-page note** of what runs, where, who owns it and what it costs.",
  ],
  resources: [
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official Make courses." },
    { label: "Make: Webhooks", url: "https://help.make.com/webhooks", note: "Receive data from forms and other apps." },
    { label: "Zapier Learn", url: "https://zapier.com/learn", note: "Free guides and tutorials." },
    { label: "n8n docs: Courses", url: "https://docs.n8n.io/courses/", note: "Official beginner and advanced courses." },
    { label: "Paystack: Webhooks", url: "https://paystack.com/docs/payments/webhooks/", note: "Payment events you can automate from." },
  ],
  quiz: [
    { q: "Which tool is usually easiest for complete beginners?", options: ["Self-hosted n8n", "Zapier", "Writing your own server", "Excel macros"], answer: 1, why: "Zapier has the gentlest learning curve; Make and n8n offer more power.", from: 0 },
    { q: "How do you stop a payment being recorded twice?", options: ["Hope it doesn't happen", "Use the payment reference as a unique ID and check it first", "Turn the automation off", "Record it by hand"], answer: 1, why: "A unique reference makes the automation safe even if it runs twice.", from: 1 },
    { q: "What is a scheduled automation?", options: ["One that runs at a set time instead of on an event", "One that never runs", "A manual task", "A chatbot"], answer: 0, why: "Scheduled runs use a time trigger, like 8am daily.", from: 2 },
    { q: "Where does AI help most in an automation?", options: ["Steps that need understanding: summarising, labelling, drafting", "Adding up numbers", "Nowhere", "Only images"], answer: 0, why: "Rules handle simple logic; AI handles language.", from: 3 },
    { q: "What must be set up before handing automations over?", options: ["Nothing", "Error notifications and a one-page handover note", "A new logo", "A blog"], answer: 1, why: "The client needs to know what runs and what to do when something fails.", from: 4 },
  ],
};

export default lesson;
