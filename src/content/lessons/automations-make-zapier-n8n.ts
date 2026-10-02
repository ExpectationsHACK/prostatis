import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "automations-make-zapier-n8n",
  title: "Automations with Make (free)",
  minutes: 130,
  outcome: "Three working automations for Bisi on Make's free plan: every website enquiry lands in a Google Sheet and alerts her phone, every Paystack payment is recorded once with a thank-you sent, and a summary of open orders arrives every morning at 8am Lagos time, with error alerts on and a one-page handover note.",
  intro:
    "Yesterday you found Bisi's lost hours. Today you get them back. You'll use **Make**, a tool that connects apps like Google Sheets, Gmail and your website by clicking and dragging, not coding. Its free plan is enough for a small business, and three reliable automations are a real product: you can charge a setup fee plus a monthly fee to keep them running. By the end of the lesson, something useful will happen on Bisi's phone without anyone touching it.",
  core: "Build each automation as trigger → filter → actions, test it with real data, make sure it can never record the same thing twice, and switch on error alerts before handing it over.",
  youNeed: ["Your top 3 automation ideas from yesterday", "An email address for a free Make account", "Your Google account (for Sheets and Gmail)", "Your site's contact form, `functions` folder and Paystack test account"],
  sections: [
    {
      heading: "Choosing a tool, free first",
      blocks: [
        { t: "table", columns: ["Tool", "Best for", "Free plan (check current limits)"], rows: [["**Make**", "A visual builder, powerful, good value: **today's tool**", "Yes: 1,000 credits a month at the time of writing; webhooks included"], ["Zapier", "The gentlest to learn, the most app connections", "Yes: 100 tasks a month, two-step only; webhooks need a paid plan"], ["n8n", "Very flexible, good with AI", "Free if you run it on your own computer or server; its cloud is paid"], ["Google Apps Script", "Anything inside Google Sheets and Gmail", "Free; it's code, but your AI assistant can write it"]] },
        {
          t: "define",
          term: "Module",
          also: ["Scenario"],
          like: "one station on a tailoring line: one person cuts, the next stitches, the next irons. Each station does one job and passes the work on.",
          meaning: "One step in Make: “receive the form”, “add a row”, “send an email”. A whole automation is called a **scenario**. (Zapier calls it a Zap; n8n calls it a workflow. Same idea.)",
        },
        {
          t: "define",
          term: "Operation",
          also: ["Credit"],
          like: "units on a prepaid electricity meter: every time something runs, a few units are used, and the meter shows what's left this month.",
          meaning: "Each module that runs is an **operation**, paid for in **credits** from your monthly allowance. A three-module scenario uses about three credits each time it runs, so 1,000 credits covers a few hundred runs a month.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Prepaid meter", nodes: [{ draw: "meter", label: "units left this month" }] },
            right: { title: "Make's free plan", nodes: [{ draw: "meter", label: "1,000 credits a month", hot: true }] },
          },
          caption: "Make's free plan works like a prepaid meter: each step that runs uses a little, the allowance refills monthly, and you check the balance so the light never goes off.",
        },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Describe the task and get the step-by-step scenario: which modules, in what order, with what settings." },
        { t: "tip", text: "Learn **one** tool well before trying others: the ideas are the same everywhere. Make's free plan includes webhooks, which you need today." },
      ],
    },
    {
      heading: "Automation 1: Website enquiry → sheet → owner alert",
      blocks: [
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "envelope", label: "website form sent" }, { draw: "plug", label: "Make's webhook receives it" }, { draw: "sheet", label: "row added to Enquiries" }, { draw: "bell", label: "Bisi's phone pings", hot: true }] },
          caption: "The first automation: the website form sends the enquiry to Make's private address, Make adds a row to Bisi's sheet and alerts her phone, all within seconds, day or night.",
        },
        {
          t: "steps",
          items: [
            { title: "Make the sheet", detail: "In Google Sheets, create a sheet called **Enquiries** with these column headings in row 1: Date, Name, Phone, Message, Source, Status." },
            { title: "Create a free Make account", detail: "Go to `make.com` → **Get started free**. Sign up with Google or email and confirm. If asked for a region, any is fine." },
            { title: "Start a scenario with a webhook", detail: "Click **Create a new scenario**, then the big **+**. Search **Webhooks** → **Custom webhook** → **Add** → name it “Website enquiries” → **Save**. Make shows a long private address: copy it." },
            { title: "Store the address as a secret", detail: "Cloudflare → your project → **Settings** → **Variables and Secrets** → add a **Secret** named `MAKE_ENQUIRY_HOOK` with that address. (It's private: anyone with it could send fake enquiries.)" },
            { title: "Send the form to Make too", detail: "Use the prompt below to add a small function, so the form still emails Bisi through Web3Forms **and** sends a copy to Make." },
            { title: "Teach Make the shape of the data", detail: "In Make, click **Run once**. Then submit a test enquiry on your live site. Make shows “Successfully determined”." },
            { title: "Add the row", detail: "Click **+** after the webhook → **Google Sheets** → **Add a Row**. Connect your Google account, pick the **Enquiries** sheet, and drag each webhook field into its column. Source: type “Website”. Status: type “New”." },
            { title: "Alert the owner", detail: "Add **Gmail** → **Send an email** to Bisi: subject “New enquiry from {{name}}”. Her Gmail app pings her phone. Click **Run once**, submit another test enquiry, and check both the row and the email appear." },
            { title: "Switch it on", detail: "Toggle the scenario **On** and set it to run **Immediately as data arrives**." },
          ],
        },
        { t: "prompt", title: "Send the form to Make as well", text: "My contact form in site/contact.html currently posts straight to Web3Forms. Change it to post to a new Cloudflare Pages Function, functions/api/contact.js. On the server, the function must: check the hidden botcheck field is empty; send the message to Web3Forms (access key in an encrypted variable WEB3FORMS_KEY) so the owner still gets the email; send the same name, phone and message as JSON to the Make webhook address in the encrypted variable MAKE_ENQUIRY_HOOK; then redirect the visitor to thanks.html. If Make fails, the visitor must still see thanks.html and the email must still go. Create or update both files and tell me which variables to add in Cloudflare." },
        {
          t: "errors",
          items: [
            { see: "Make says “Waiting for data” and nothing arrives", means: "Make only listens while **Run once** is active, or the function doesn't have the address yet.", fix: "Click **Run once** first, then submit the form. Check the secret's name in Cloudflare is exactly `MAKE_ENQUIRY_HOOK`, then make a small commit so a new deployment uses it." },
            { see: "The row appears but some columns are empty", means: "The fields weren't dragged into those columns in the Google Sheets module.", fix: "Open the module, drag the missing webhook fields into the right columns, and save." },
          ],
        },
        { t: "try", title: "Build it now", minutes: 25, steps: ["Create the Enquiries sheet and the Make scenario: webhook → Google Sheets → Gmail.", "Add the contact function with the prompt and the two secrets in Cloudflare; commit.", "Send a test enquiry from your phone. Did a row appear and an email arrive? Screenshot both."] },
      ],
    },
    {
      heading: "Automation 2: Payment → record once → thank-you",
      blocks: [
        { t: "p", text: "When a payment succeeds, record it in a **Payments** sheet and send the customer a warm thank-you with next steps (Paystack already sends the receipt itself)." },
        { t: "list", items: ["**Trigger**: a second Make webhook, called by your site's function after it has verified the payment with Paystack (Day 9), so Make only ever hears about real payments.", "**Filter**: continue only if the status is “success”.", "**Actions**: search the Payments sheet for the payment **reference**; only if it isn't there, add a row (reference, customer, item, amount = kobo ÷ 100) and send the thank-you email."] },
        {
          t: "define",
          term: "Unique key",
          also: ["Unique ID"],
          like: "your NIN: many people share your name, but nobody shares your NIN.",
          meaning: "One piece of information that identifies a record and is never repeated. For payments it's Paystack's **reference**; for customers (Day 18) it's the phone number, written one standard way. Also called a **unique ID**.",
        },
        { t: "warn", text: "Automations that touch money must never record a payment twice. Messages can arrive more than once, so always use the **payment reference** as the unique ID: search for it first, and add a row only if it isn't there." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the thank-you and next-step emails in the business's voice." },
        { t: "check", q: "Why search the sheet for the payment reference before adding a row?", options: ["To make it slower", "So the same payment is never recorded twice", "Paystack requires it"], answer: 1, why: "The same message can arrive more than once; checking the unique reference keeps the records right." },
      ],
    },
    {
      heading: "Automation 3: A morning summary",
      blocks: [
        { t: "p", text: "Scheduled automations start at a set time instead of on an event: “every morning at 8am, send Bisi today's fittings and yesterday's new enquiries and payments”." },
        {
          t: "steps",
          items: [
            { title: "Set your time zone first", detail: "In Make, open your **Profile** → time zone → **Africa/Lagos**. Otherwise “8am” may arrive at 7am or 9am." },
            { title: "Start with a schedule", detail: "New scenario. Add **Google Sheets** → **Search Rows** on the Enquiries sheet (status “New”), then the Payments sheet (yesterday's date)." },
            { title: "Write the summary", detail: "Add a **Text aggregator** (or ask the scenario planner tool how) to join the rows into one short message, then **Gmail** → **Send an email** to Bisi." },
            { title: "Schedule it", detail: "Click the clock under the first module → **Every day** → **08:00**. Switch the scenario **On**." },
          ],
        },
        { t: "tool", slug: "cron-schedule-generator", why: "Make has its own schedule picker; this tool helps when another service asks for a schedule written as a short code." },
      ],
    },
    {
      heading: "Adding AI to automations (optional)",
      blocks: [
        {
          t: "define",
          term: "AI model",
          also: ["LLM"],
          like: "the brain behind the chat: the same well-read apprentice from Day 1, now working without the chat window, inside your automation.",
          meaning: "The trained program that actually reads and writes text, such as Claude or Gemini. Automations can send it text and get an answer back. These programs are also called **LLMs** (large language models).",
        },
        {
          t: "define",
          term: "Token",
          like: "data counted in MB: AI services count text in small pieces, and limit or charge by how many pieces you use.",
          meaning: "A small piece of text, roughly three-quarters of a word. AI services measure every question and answer in tokens: free plans give a daily allowance; paid plans charge per million tokens.",
        },
        { t: "p", text: "Use AI for steps that need **understanding**: summarising a long enquiry, labelling it “ready to order”, “just asking” or “needs a person”, or drafting a reply for the owner to approve. Use plain rules for simple logic like maths." },
        { t: "p", text: "The free route: Google's **Gemini API** has a free allowance for its fast models. Create a free key at `aistudio.google.com` (**Get API key**), store it in Make's HTTP module as a connection, and send the enquiry text with a short instruction. Important: on the free allowance, Google may use what you send to improve its products, so **never send sensitive customer details** (health, ID numbers, account details)." },
        { t: "tool", slug: "token-cost-calculator", why: "Estimate what the same AI step would cost on a paid plan, before you quote a client." },
        { t: "tip", text: "Keep a person in the loop for anything customers see, at least at first: the AI drafts, the owner approves." },
        {
          t: "scenario",
          title: "The enquiry sorter",
          text: "Picture a property agent who gets 60 website enquiries a week, most of them just “price?”. An automation asks AI to label each one (“ready to view”, “just browsing”, “needs a call back”) and only alerts the agent about “ready to view”. The agent stops missing serious buyers in the noise.",
        },
        { t: "upgrade", title: "When the free allowances run out", text: "If a business outgrows Make's free credits, its paid plans start at a modest monthly fee; include it in the client's monthly fee. For AI steps that handle private customer details, use a paid AI plan, where providers don't use your data to train their products." },
      ],
    },
    {
      heading: "Error alerts and handover",
      blocks: [
        { t: "list", items: ["Make sure **error emails** are on: Make → your profile → **Notifications**.", "Name every scenario clearly: “Enquiries: form to sheet + alert”.", "Write a one-page handover: what each automation does, where it runs, who owns the account, the monthly cost, and what to do if it stops."] },
        { t: "prompt", title: "Handover note", text: "Write a one-page handover note for a small business owner describing these automations: [list each with trigger, steps, tools]. Include: what each does in one sentence, what to do if it stops, the monthly cost (free unless the credits run out), and who owns each account. Plain English, no jargon." },
        { t: "mistakes", items: [{ wrong: "Building a client's automations in your personal account", right: "An account the client owns, with you added as a member" }, { wrong: "No error alerts, finding out a week later", right: "Error emails on from day one" }, { wrong: "Recording every message blindly", right: "Checking the unique payment reference first" }] },
        { t: "win", title: "Your first automation ran on real data", proved: "you can make a business's busywork happen by itself, reliably, with nobody touching a phone.", cue: "Screenshot the new sheet row and Bisi's alert. Finish your mission for the **Automator** badge." },
      ],
    },
  ],
  task: {
    title: "Build 3 live automations",
    steps: ["Create a free Make account.", "Build: website enquiry → sheet → owner alert (with the contact function).", "Build: verified payment → record once (search the reference first) → thank-you.", "Build one scheduled morning summary at 8am Lagos time.", "Test each with real data, check error emails are on, and write the handover note."],
    done: ["All three run successfully with test data", "The same payment reference can't be recorded twice", "The morning summary arrives at 8am Lagos time", "Error emails are on", "The handover note fits on one page"],
  },
  recap: [
    "Make's **free plan** gives a monthly allowance of credits; each module that runs uses some, like units on a prepaid meter.",
    "Stop double-recording by using the **payment reference as a unique ID**: search the sheet first and add a row only if it isn't there.",
    "A **scheduled automation** runs at a set time (like 8am daily, Lagos time) instead of on an event.",
    "Use **AI for steps that need understanding** (summarising, labelling, drafting) and plain rules for simple logic like maths.",
    "Before handover: **error alerts on**, and a **one-page note** of what runs, where, who owns it and what it costs.",
    "Build client automations in an **account the client owns**, with you added as a member.",
  ],
  resources: [
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official Make courses." },
    { label: "Make: webhooks", url: "https://help.make.com/webhooks", note: "Receiving data from your website." },
    { label: "Make: pricing", url: "https://www.make.com/en/pricing", note: "Current free-plan credits and paid plans." },
    { label: "Google AI Studio", url: "https://aistudio.google.com", note: "Free Gemini API key and the free-tier terms." },
    { label: "Zapier Learn", url: "https://zapier.com/learn", note: "Free guides if you try Zapier later." },
  ],
  quiz: [
    { q: "The same Paystack payment reaches your automation twice. What stops it being recorded twice?", options: ["Hoping it doesn't happen", "Using the payment reference as a unique ID: search the sheet first, add a row only if it isn't there", "Turning the automation off", "Recording it by hand"], answer: 1, why: "A unique reference makes the automation safe even if it runs twice.", from: 1, aim: "core" },
    { q: "Make's free plan works like what?", options: ["Unlimited data", "A prepaid meter: a monthly allowance of credits, used a little each time a module runs", "A one-time payment", "A bank loan"], answer: 1, why: "Credits refill monthly. Checking the balance is part of the weekly checks you'll set up on Day 19.", from: 0, aim: "monitoring-handover" },
    { q: "What is a scheduled automation?", options: ["One that runs at a set time, like 8am daily, instead of on an event", "One that never runs", "A task done by hand", "A chatbot"], answer: 0, why: "Scheduled runs start from the clock. You'll use one for reminder messages when you connect the whole system.", from: 2, aim: "connect-the-system" },
    { q: "Where does AI help most in an automation?", options: ["Steps that need understanding: summarising, labelling, drafting", "Adding up numbers", "Nowhere", "Only images"], answer: 0, why: "Rules handle simple logic; AI handles language. Tomorrow you'll design an AI assistant properly.", from: 3, aim: "agents-personas-kb" },
    { q: "What must be ready before you hand automations to a client?", options: ["Nothing", "Error alerts on and a one-page handover note", "A new logo", "A blog"], answer: 1, why: "The client needs to know what runs and what to do when something fails. Day 19 builds on this.", from: 4, aim: "monitoring-handover" },
  ],
  celebrate: {
    title: "Day 15 complete: Bisi's evenings are back",
    proved: "You can make a business's busywork happen by itself, reliably, on a free plan, with records that never double up and alerts when anything fails.",
    badge: "Automator",
    badgeDesc: "Built three live automations",
  },
};

export default lesson;
