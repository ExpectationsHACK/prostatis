import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "map-workflows",
  title: "Map a business's workflows",
  minutes: 80,
  outcome: "A process audit of a real business, an automation map, and an ROI estimate you can put in a proposal.",
  intro:
    "Before automating anything, you need to know where a business actually loses time and money. Most owners can't tell you — they're too busy doing the work. Today you learn to interview a business, map its daily processes, and find the few automations worth paying for.",
  sections: [
    {
      heading: "What automation really means",
      blocks: [
        { t: "p", text: "Automation is software doing a repeated task without a person: sending a receipt after payment, adding a new lead to a sheet, reminding a customer of an appointment. Every automation follows the same pattern:" },
        { t: "figure", figure: { diagram: "trigger-action", caption: "A trigger starts it, an optional filter decides, and one or more actions run." } },
        { t: "list", items: ["**Trigger** — something happens (form submitted, payment received, 9am every day).", "**Filter / condition** — only continue if something is true (amount over ₦50,000).", "**Action** — do something (send WhatsApp, add a row, email the owner)."] },
      ],
    },
    {
      heading: "Step 1 — Interview the business",
      blocks: [
        { t: "p", text: "Spend 30 minutes with the owner (or a staff member). Ask them to walk you through a normal day, from the first message to closing time." },
        { t: "steps", items: [
          { title: "“What do you do every single day that feels repetitive?”", detail: "Replying the same questions, copying orders into a notebook, sending account numbers." },
          { title: "“Where do things fall through the cracks?”", detail: "Forgotten follow-ups, missed messages, no-shows, unpaid balances." },
          { title: "“What tools do you already use?”", detail: "WhatsApp Business, Google Sheets, Instagram, Paystack, a POS, Excel." },
          { title: "“If you had 2 extra hours a day, what would you do?”", detail: "This tells you what the time is worth to them." },
        ] },
        { t: "tool", slug: "business-process-audit", why: "A structured audit form: list each process, how often it happens, how long it takes, and it scores what's worth automating." },
      ],
    },
    {
      heading: "Step 2 — Pick what to automate",
      blocks: [
        { t: "p", text: "Good automation candidates are **frequent**, **repetitive**, **rule-based** and **error-prone**. Bad candidates need judgement, happen rarely, or change every time." },
        { t: "table", columns: ["Automate", "Don't automate (yet)"], rows: [["Payment receipt + thank-you message", "Negotiating a custom price"], ["New lead → sheet + owner alert", "Handling an angry customer"], ["Appointment reminders", "A task done twice a year"], ["Weekly sales summary", "Anything the owner can't describe clearly"]] },
        { t: "tool", slug: "automation-idea-generator", why: "Pick the industry and see proven automation ideas with triggers and actions." },
      ],
    },
    {
      heading: "Step 3 — Estimate the return (ROI)",
      blocks: [
        { t: "p", text: "Owners buy results, not software. Put a number on it: hours saved × value of an hour, plus money recovered (fewer no-shows, fewer missed leads)." },
        { t: "tool", slug: "automation-roi-calculator", why: "Enter time per task, frequency and hourly value — it shows monthly savings and payback time." },
        { t: "p", text: "Example: sending receipts and delivery updates by hand takes 2 minutes × 40 orders a day = 80 minutes a day — about **40 hours a month** if they open every day. That's a sentence that sells." },
      ],
    },
    {
      heading: "Step 4 — Draw the automation map",
      blocks: [
        { t: "p", text: "For each chosen process, draw the before and after as trigger → steps → actions. A simple drawing (paper, Excalidraw or Whimsical) makes it easy for the owner to approve." },
        { t: "prompt", title: "Map it with Claude", text: "Here is how [business] handles [process] today: [describe step by step]. They use [tools]. Draw an 'after' workflow as a numbered list of trigger → filter → actions, name which tool does each step, point out anything that still needs a human, and estimate time saved per week." },
      ],
    },
  ],
  task: {
    title: "Audit a real business",
    steps: ["Interview a business owner or staff member for 30 minutes.", "List every repeated process in the audit tool.", "Pick the top 3 processes to automate.", "Calculate the ROI for each.", "Draw before/after maps and share them with the owner."],
    done: ["I listed at least 8 processes with frequency and time", "My top 3 are frequent, repetitive and rule-based", "Each has an ROI in hours or naira per month", "The owner has seen the maps"],
  },
  resources: [
    { label: "Zapier — Automation guides", url: "https://zapier.com/blog/automation/", note: "Beginner articles on what and how to automate." },
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official courses for Make." },
    { label: "Excalidraw", url: "https://excalidraw.com", note: "Free hand-drawn style diagrams in the browser." },
    { label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", note: "Most small-business automations start or end in a sheet." },
  ],
  quiz: [
    { q: "What three parts does every automation have?", options: ["Logo, colour, font", "Trigger, filter (optional), action", "Domain, host, DNS", "Keyword, title, meta"], answer: 1, why: "Something happens, a condition is checked, something is done." },
    { q: "Which is the best automation candidate?", options: ["Negotiating a custom deal", "Sending a receipt after every payment", "A yearly tax review", "Calming an angry customer"], answer: 1, why: "Frequent, repetitive and rule-based." },
    { q: "Why calculate ROI?", options: ["It's required by law", "Owners buy results — hours and money saved sell the project", "To make it look complex", "It isn't useful"], answer: 1, why: "A clear number makes the value obvious." },
    { q: "40 orders a day × 2 minutes of manual messages ≈ how much time a month (30 days)?", options: ["About 2 hours", "About 10 hours", "About 40 hours", "About 27 hours only on weekdays"], answer: 2, why: "80 minutes × 30 days = 2,400 minutes = 40 hours." },
    { q: "What's the first step before automating?", options: ["Buy Zapier", "Interview the business and map its real processes", "Build a chatbot", "Write a blog post"], answer: 1, why: "You can't automate well what you don't understand." },
  ],
};

export default lesson;
