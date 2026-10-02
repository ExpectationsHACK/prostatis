import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "map-workflows",
  title: "Map a business's workflows",
  minutes: 90,
  outcome: "A list of Bisi's repeated daily tasks (how often, how long each takes), the 3 most worth handing to software, the hours and naira they cost her every month, and before-and-after drawings she has approved.",
  intro:
    "Every evening, after a full day of sewing, Bisi spends about an hour on her phone: typing “Your outfit is ready for collection” to customers one by one, copying new orders from WhatsApp into her notebook, and gently chasing people who still owe a balance. She doesn't need a new website. She needs those hours back. Before making any task run by itself, professionals first find **where** the time goes. Today you'll interview an owner, map their real tasks, pick the few worth paying to fix, and put a number on the saving that any owner understands.",
  core: "Only hand tasks to software when they're frequent, repetitive and follow the same rule every time, and sell the change by the hours and naira it saves.",
  youNeed: ["A real owner (or staff member) who'll talk to you for 30 minutes (Bisi counts)", "Our free process check and savings calculator", "Paper or a notes app"],
  sections: [
    {
      heading: "Making tasks run by themselves",
      blocks: [
        {
          t: "define",
          term: "Automation",
          like: "a standing order at the bank: set it up once, and the payment goes out every month without you lifting a finger.",
          meaning: "Software doing a repeated task by itself, without a person: sending a thank-you after a payment, adding a new customer to a sheet, sending a reminder the day before an appointment.",
        },
        {
          t: "define",
          term: "Workflow",
          like: "the steps for cooking jollof: the same steps, in the same order, every single time.",
          meaning: "The steps a business follows to get something done, from an order arriving to the customer receiving it.",
        },
        {
          t: "define",
          term: "Trigger",
          also: ["Filter", "Action"],
          like: "an estate gateman's rule: **when** a car arrives (the trigger), **if** it has a resident's sticker (the filter), **open** the gate (the action).",
          meaning: "Every automation has the same three parts: a **trigger** (something happens: a form is sent, a payment arrives, it's 8am), an optional **filter** (continue only if something is true), and one or more **actions** (send a message, add a row to a sheet, email the owner).",
        },
        { t: "figure", figure: { diagram: "trigger-action", caption: "A trigger starts it, an optional filter decides, and one or more actions run." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "bolt", label: "trigger: an order is marked ready" }, { draw: "funnel", label: "filter: balance paid?" }, { draw: "whatsapp", label: "action: “your outfit is ready”", hot: true }] },
          caption: "One of Bisi's tasks as an automation: when an order is marked ready, check the balance is paid, then send the collection message, the gateman's rule applied to her evenings.",
        },
        { t: "check", q: "“When a customer pays, send them a thank-you message.” Which part is the trigger?", options: ["Sending the message", "The customer paying", "The words of the thank-you"], answer: 1, why: "The trigger is the event that starts it; sending the message is the action." },
      ],
    },
    {
      heading: "Step 1: Interview the business",
      blocks: [
        { t: "p", text: "Spend 30 minutes with the owner. Ask them to walk you through a normal day, from the first message in the morning to closing time." },
        {
          t: "steps",
          items: [
            { title: "“What do you do every day that feels repetitive?”", detail: "Answering the same questions, copying orders, sending account numbers, telling customers their order is ready." },
            { title: "“Where do things fall through the cracks?”", detail: "Customers nobody got back to, missed messages, no-shows, unpaid balances." },
            { title: "“Which tools do you already use?”", detail: "WhatsApp Business, Google Sheets, Instagram, Paystack, a notebook." },
            { title: "“If you had two extra hours a day, what would you do with them?”", detail: "The answer tells you what their time is really worth to them." },
          ],
        },
        { t: "tool", slug: "business-process-audit", why: "A structured check: list each task, how often it happens and how long it takes, and it scores which are worth handing to software." },
        { t: "try", title: "Map one real task", minutes: 10, steps: ["Choose one task from any business you know (even your own side hustle).", "Write every step, in order, from start to finish.", "Circle the steps that are copying, pasting, or sending the same message again. Those are the candidates."] },
      ],
    },
    {
      heading: "Step 2: Pick what to automate",
      blocks: [
        { t: "p", text: "Good candidates are **frequent**, **repetitive**, **rule-based** (the same every time) and **easy to get wrong** by hand. Bad candidates need judgement, happen rarely, or change every time." },
        { t: "table", columns: ["Hand to software", "Keep for a person (for now)"], rows: [["A thank-you message after every payment", "Agreeing a custom price"], ["New enquiry → sheet + owner alert", "Calming an upset customer"], ["Appointment reminders", "A task done twice a year"], ["A weekly summary of orders", "Anything the owner can't explain clearly"]] },
        { t: "tool", slug: "automation-idea-generator", why: "Pick the industry and see proven ideas, each with its trigger and actions." },
        { t: "check", q: "A school sends the same “fees received” message to about 30 parents a week, by hand. Is it a good candidate?", options: ["Yes: it's frequent, repetitive and follows the same rule", "No: messages should always be typed by hand", "Only if the school is very large"], answer: 0, why: "Frequent + repetitive + rule-based = a great candidate." },
      ],
    },
    {
      heading: "Step 3: Put a number on it",
      blocks: [
        {
          t: "define",
          term: "ROI",
          like: "buying a generator: it costs money upfront, but you stop losing sales every time there's no light, so it pays for itself.",
          meaning: "**ROI** (return on investment) is what the business gets back compared with what it spends: hours saved and money recovered, compared with your fee and any tool costs.",
        },
        { t: "p", text: "Owners buy results, not software. Put a number on it: **hours saved × what an hour is worth**, plus money recovered (fewer no-shows, fewer missed orders, balances paid sooner)." },
        { t: "p", text: "Example: messaging 40 customers a day at 2 minutes each = **80 minutes a day**, about **40 hours a month** if the shop opens every day. That one sentence sells a project." },
        { t: "tool", slug: "automation-roi-calculator", why: "Enter time per task, how often it happens and what an hour is worth: see the monthly saving and how fast your fee pays for itself." },
        {
          t: "scenario",
          title: "Bisi's numbers",
          text: "Bisi's evening messages take about an hour a day, six days a week: roughly 26 hours a month. She says an hour of her sewing time is worth at least ₦3,000, so those messages cost her about ₦78,000 of time every month, every month. Presented like that, a one-time setup fee plus a small monthly fee is an easy decision. (Use the owner's own numbers; never guess for them.)",
        },
      ],
    },
    {
      heading: "Step 4: Draw the before and after",
      blocks: [
        { t: "p", text: "For each chosen task, draw **before** (today, by hand) and **after** (trigger → filter → actions). A simple drawing on paper, or in the free Excalidraw website, makes it easy for the owner to say yes." },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Before", nodes: [{ draw: "person", label: "Bisi types 20 messages" }, { draw: "clock", label: "1 hour every evening" }] },
            right: { title: "After", nodes: [{ draw: "bolt", label: "order marked ready" }, { draw: "whatsapp", label: "message goes by itself", hot: true }] },
          },
          caption: "The before-and-after drawing to show the owner: an hour of typing every evening, versus a message that goes out by itself the moment an order is marked ready.",
        },
        { t: "prompt", title: "Map it with your AI assistant", text: "Here is how [business] handles [task] today: [describe step by step]. They use [tools]. Draw an 'after' workflow as a numbered list: trigger → filter → actions. Name which free tool could do each step (for example Google Sheets, Make, WhatsApp Business), point out anything that still needs a person, and estimate the time saved per week. Plain English." },
        { t: "mistakes", items: [{ wrong: "Automating everything the owner mentions", right: "The top 3 tasks that are frequent, repetitive and rule-based" }, { wrong: "“This will save you time”", right: "“This saves about 26 hours a month”" }, { wrong: "Automating a messy process exactly as it is", right: "Simplifying the steps first, then automating" }] },
        { t: "win", title: "You found the lost hours", proved: "you can look at any small business and show exactly where its time goes, with a number the owner understands.", cue: "Show the owner the before-and-after drawings and get a yes on the top three. Finish the mission for the **Time finder** badge." },
      ],
    },
  ],
  task: {
    title: "Map a real business",
    steps: ["Interview an owner or staff member for 30 minutes.", "List every repeated task in the process check tool, with how often and how long.", "Pick the top 3 tasks to hand to software.", "Work out the hours or naira saved for each with the calculator.", "Draw before-and-after maps and show them to the owner."],
    done: ["I listed at least 8 tasks with how often and how long", "My top 3 are frequent, repetitive and rule-based", "Each has a saving in hours or naira per month", "The owner has seen and approved the maps"],
  },
  recap: [
    "Every automation has three parts: a **trigger** (what starts it), an optional **filter**, and one or more **actions**.",
    "The best tasks to automate are **frequent, repetitive and rule-based**, like sending a receipt after every payment.",
    "Owners buy results: put the saving in **hours or naira per month** (the **ROI**) to sell the project.",
    "Example maths: 40 messages a day × 2 minutes = 80 minutes a day ≈ **40 hours a month** (30 days).",
    "Always **interview the owner and map the real tasks** before automating anything.",
  ],
  resources: [
    { label: "Zapier: what is automation?", url: "https://zapier.com/blog/automation/", note: "Beginner articles on what and how to automate." },
    { label: "Make Academy", url: "https://academy.make.com", note: "Free official Make courses (you'll use Make tomorrow)." },
    { label: "Excalidraw", url: "https://excalidraw.com", note: "Free hand-drawn-style diagrams in the browser." },
    { label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", note: "Most small-business automations start or end in a sheet." },
  ],
  quiz: [
    { q: "Which of Bisi's tasks is the best one to automate first?", options: ["Agreeing a custom price with a bride", "Sending “your outfit is ready” every time an order is finished", "Her yearly tax review", "Calming an upset customer"], answer: 1, why: "Frequent, repetitive and rule-based: the perfect candidate.", from: 1, aim: "core" },
    { q: "What three parts does every automation have?", options: ["Logo, colour, font", "Trigger, filter (optional) and action", "Domain, hosting, DNS", "Keyword, title, description"], answer: 1, why: "Something happens, a condition is checked, something is done. Tomorrow you'll build them in Make.", from: 0, aim: "automations-make-zapier-n8n" },
    { q: "40 orders a day × 2 minutes of messages ≈ how much time a month (30 days)?", options: ["About 2 hours", "About 10 hours", "About 40 hours", "About 400 hours"], answer: 2, why: "80 minutes × 30 days = 2,400 minutes = 40 hours. Numbers like this set your price later.", from: 3, aim: "proposals-pricing" },
    { q: "Why put a naira or hours figure on an automation?", options: ["It's required by law", "Owners buy results: the saving makes the value obvious and justifies your price", "To make it look complicated", "It isn't useful"], answer: 1, why: "A clear number sells. You'll use it again when pricing by value.", from: 2, aim: "proposals-pricing" },
    { q: "What's the first step before automating anything for a client?", options: ["Buy a paid tool", "Interview the owner and map their real tasks", "Build a chatbot", "Write a blog post"], answer: 1, why: "You can't automate well what you don't understand. Your final client project starts the same way.", from: 4, aim: "capstone" },
  ],
  celebrate: {
    title: "Day 14 complete: you found the lost hours",
    proved: "You can look at any small business, find exactly where its time goes, and put a number on it the owner understands.",
    badge: "Time finder",
    badgeDesc: "Mapped a business's workflows and savings",
  },
};

export default lesson;
