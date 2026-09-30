import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "map-workflows",
  title: "Map a business's workflows",
  minutes: 80,
  outcome: "A process audit of a real business, a list of the 3 tasks most worth automating, and a money-or-time estimate you can put in a proposal.",
  intro:
    "Mr Okafor runs a laundry in Enugu. Every evening he spends an hour typing “Your clothes are ready” to customers one by one, copying orders from a notebook into Excel, and chasing people who haven't paid. He doesn't need a new website. He needs those hours back. Before automating anything, professionals find **where** a business loses time. Today you'll learn to interview an owner, map their daily work, and pick the few automations actually worth paying for.",
  youNeed: ["A real business owner (or staff member) who'll talk to you for 30 minutes", "Our free process audit and ROI tools", "Paper or a notes app"],
  sections: [
    {
      heading: "What automation really means",
      blocks: [
        { t: "define", term: "Automation", meaning: "Software doing a repeated task by itself, without a person: sending a receipt after payment, adding a new customer to a sheet, reminding someone of an appointment.", like: "a standing order at the bank: set it up once, and the payment happens every month without you." },
        { t: "define", term: "Workflow", meaning: "The steps a business follows to get something done, from an order arriving to the customer receiving it.", like: "a recipe: the same steps in the same order, every time." },
        { t: "p", text: "Every automation follows the same pattern:" },
        { t: "figure", figure: { diagram: "trigger-action", caption: "A trigger starts it, an optional filter decides, and one or more actions run." } },
        { t: "list", items: ["**Trigger**: something happens (a form is sent, a payment arrives, it's 9am).", "**Filter**: continue only if something is true (the amount is over ₦50,000).", "**Action**: do something (send a WhatsApp template, add a row to a sheet, email the owner)."] },
        { t: "check", q: "“When a customer pays, send them a thank-you email.” Which part is the trigger?", options: ["Sending the email", "The customer paying", "The thank-you words"], answer: 1, why: "The trigger is the event that starts it; sending the email is the action." },
      ],
    },
    {
      heading: "Step 1: Interview the business",
      blocks: [
        { t: "p", text: "Spend 30 minutes with the owner. Ask them to walk you through a normal day, from the first message in the morning to closing time." },
        {
          t: "steps",
          items: [
            { title: "“What do you do every day that feels repetitive?”", detail: "Answering the same questions, copying orders, sending account numbers." },
            { title: "“Where do things fall through the cracks?”", detail: "Forgotten follow-ups, missed messages, no-shows, unpaid balances." },
            { title: "“Which tools do you already use?”", detail: "WhatsApp Business, Google Sheets, Instagram, Paystack, Excel, a POS." },
            { title: "“If you had 2 extra hours a day, what would you do?”", detail: "This tells you what their time is worth to them." },
          ],
        },
        { t: "tool", slug: "business-process-audit", why: "A structured audit: list each task, how often it happens and how long it takes, and it scores what's worth automating." },
        { t: "try", title: "Map one real task", minutes: 10, steps: ["Choose one task from any business you know (even your own side hustle).", "Write every step, in order, from start to finish.", "Circle the steps that are copying, pasting or sending the same message again. Those are automation candidates."] },
      ],
    },
    {
      heading: "Step 2: Pick what to automate",
      blocks: [
        { t: "p", text: "Good candidates are **frequent**, **repetitive**, **rule-based** (the same every time) and **error-prone**. Bad candidates need judgement, happen rarely, or change every time." },
        { t: "table", columns: ["Automate", "Don't automate (yet)"], rows: [["Payment receipt + thank-you message", "Negotiating a custom price"], ["New enquiry → sheet + owner alert", "Calming an angry customer"], ["Appointment reminders", "A task done twice a year"], ["Weekly sales summary", "Anything the owner can't explain clearly"]] },
        { t: "tool", slug: "automation-idea-generator", why: "Pick the industry and see proven automation ideas with triggers and actions." },
        { t: "check", q: "A school sends the same “fees received” message to about 30 parents a week, by hand. Is it a good automation candidate?", options: ["Yes: it's frequent, repetitive and follows the same rule", "No: messages should always be typed by hand", "Only if the school is very large"], answer: 0, why: "Frequent + repetitive + rule-based = a great candidate." },
      ],
    },
    {
      heading: "Step 3: Estimate the return",
      blocks: [
        { t: "define", term: "ROI (return on investment)", meaning: "What the business gets back compared with what it spends, hours saved and money recovered, compared with your fee and the tool costs.", like: "buying a generator: it costs money, but you stop losing sales during power cuts." },
        { t: "p", text: "Owners buy results, not software. Put a number on it: **hours saved × what an hour is worth**, plus money recovered (fewer no-shows, fewer missed orders)." },
        { t: "tool", slug: "automation-roi-calculator", why: "Enter time per task, how often, and the hourly value. It shows monthly savings and how fast the cost pays for itself." },
        { t: "p", text: "Example: messaging 40 customers a day at 2 minutes each = **80 minutes a day**, about **40 hours a month** if the shop opens every day. That one sentence sells an automation." },
        { t: "scenario", title: "Mr Okafor's numbers", text: "His evening messaging took about an hour a day, six days a week, roughly 26 hours a month. At what he values an hour of his time, that's more than an automation setup costs, and it keeps saving every month after. Presented like that, the decision is easy." },
      ],
    },
    {
      heading: "Step 4: Draw the before and after",
      blocks: [
        { t: "p", text: "For each chosen task, draw **before** (today, by hand) and **after** (trigger → steps → actions). A simple drawing on paper or in Excalidraw makes it easy for the owner to approve." },
        { t: "prompt", title: "Map it with Claude", text: "Here is how [business] handles [task] today: [describe step by step]. They use [tools]. Draw an 'after' workflow as a numbered list: trigger → filter → actions. Name which tool does each step, point out anything that still needs a person, and estimate the time saved per week." },
        { t: "mistakes", items: [{ wrong: "Automating everything the owner mentions", right: "The top 3 tasks that are frequent, repetitive and rule-based" }, { wrong: "“This will save you time”", right: "“This saves about 40 hours a month”" }, { wrong: "Automating a messy process as it is", right: "Simplifying the steps first, then automating" }] },
      ],
    },
  ],
  task: {
    title: "Audit a real business",
    steps: ["Interview an owner or staff member for 30 minutes.", "List every repeated task in the audit tool.", "Pick the top 3 tasks to automate.", "Estimate the time or money saved for each.", "Draw before/after maps and show them to the owner."],
    done: ["I listed at least 8 tasks with how often and how long", "My top 3 are frequent, repetitive and rule-based", "Each has a saving in hours or naira per month", "The owner has seen the maps"],
  },
  recap: [
    "Every automation has three parts: a **trigger** (what starts it), an optional **filter**, and **actions**.",
    "The best tasks to automate are **frequent, repetitive and rule-based**, like sending a receipt after every payment.",
    "Owners buy results: put the saving in **hours or naira per month** (ROI) to sell the project.",
    "Example maths: 40 messages a day × 2 minutes = 80 minutes a day ≈ **40 hours a month** (30 days).",
    "Always **interview the business and map its real tasks** before automating anything.",
  ],
  resources: [
    { label: "Zapier: What is automation?", url: "https://zapier.com/blog/automation/", note: "Beginner articles on what and how to automate." },
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official Make courses." },
    { label: "Excalidraw", url: "https://excalidraw.com", note: "Free hand-drawn style diagrams in the browser." },
    { label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", note: "Most small-business automations start or end in a sheet." },
  ],
  quiz: [
    { q: "What three parts does every automation have?", options: ["Logo, colour, font", "Trigger, filter (optional), action", "Domain, host, DNS", "Keyword, title, description"], answer: 1, why: "Something happens, a condition is checked, something is done.", from: 0 },
    { q: "Which is the best automation candidate?", options: ["Negotiating a custom deal", "Sending a receipt after every payment", "A yearly tax review", "Calming an angry customer"], answer: 1, why: "Frequent, repetitive and rule-based.", from: 1 },
    { q: "Why estimate the ROI?", options: ["It's required by law", "Owners buy results: hours and money saved sell the project", "To make it look complicated", "It isn't useful"], answer: 1, why: "A clear number makes the value obvious.", from: 2 },
    { q: "40 orders a day × 2 minutes of manual messages ≈ how much time a month (30 days)?", options: ["About 2 hours", "About 10 hours", "About 40 hours", "About 400 hours"], answer: 2, why: "80 minutes × 30 days = 2,400 minutes = 40 hours.", from: 3 },
    { q: "What's the first step before automating?", options: ["Buy Zapier", "Interview the business and map its real tasks", "Build a chatbot", "Write a blog post"], answer: 1, why: "You can't automate well what you don't understand.", from: 4 },
  ],
};

export default lesson;
