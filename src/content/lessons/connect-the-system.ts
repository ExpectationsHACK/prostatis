import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "connect-the-system",
  title: "Connect website + automation + agent",
  minutes: 120,
  outcome: "One connected system: an enquiry arrives from any channel, the agent replies, the customer list updates once, and the owner is alerted only when it matters.",
  intro:
    "On their own, a website, an automation and an agent are nice. Connected, they become a **system** that runs the front desk of a business, and systems earn the biggest projects and the steadiest monthly fees. Today you'll join everything you've built into one flow, and learn the small detail that decides whether it works: recognising the same customer across different channels.",
  youNeed: ["Your website form, automations and agent from the last three lessons", "A Google Sheet (or Airtable) to use as the customer list", "Your Make (or other) account", "About 2 hours"],
  sections: [
    {
      heading: "The system you're building",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "An enquiry arrives", detail: "From the website form, the website chat, or WhatsApp." },
            { title: "The agent replies instantly", detail: "Answers questions, understands what they need, offers a booking or order." },
            { title: "The customer list updates", detail: "The person is added, or updated if they already exist, with source, need, status and next step." },
            { title: "The owner is alerted only when needed", detail: "A serious buyer, a new booking, or someone asking for a person." },
            { title: "A follow-up is prepared", detail: "If nobody books in 24 hours, a gentle follow-up goes out, inside WhatsApp's rules (approved templates, opted-in customers)." },
          ],
        },
        { t: "define", term: "CRM (customer relationship manager)", meaning: "A list of customers and leads, each with a **status** (new, contacted, booked, paid) and a next step. It can be as simple as a Google Sheet.", like: "a shop owner's notebook of who ordered, who owes and who to call back, but organised and shared." },
        { t: "figure", figure: { diagram: "crm-pipeline", caption: "A simple CRM pipeline: New → Contacted → Booked → Paid." } },
        { t: "define", term: "Lead", meaning: "A person who has shown interest, sent an enquiry, asked a price, but hasn't bought yet.", like: "someone who stops at your market stall and asks “how much?”." },
      ],
    },
    {
      heading: "Step 1: Choose the customer list",
      blocks: [
        { t: "table", columns: ["Option", "Use it when"], rows: [["Google Sheets", "Starting out; one or two people use it"], ["Airtable or Notion", "They want board views and filters, still no code"], ["HubSpot's free CRM", "A sales team, email tracking"], ["Your own Supabase table", "It's part of a web app you've built"]] },
        { t: "tip", text: "Simple beats clever. A well-kept Google Sheet that the owner actually opens is worth more than a powerful CRM nobody uses." },
      ],
    },
    {
      heading: "Step 2: One person, one record",
      blocks: [
        { t: "p", text: "The biggest mistake is creating a new record every time the same person writes, once from the form, again on WhatsApp. The fix: use the **phone number** as the unique key, always written the same way." },
        { t: "define", term: "Unique key", meaning: "One piece of information that identifies each record and is never repeated, here, the phone number in international format.", like: "your NIN: many people share your name, but nobody shares your NIN." },
        { t: "figure", figure: { diagram: "phone-number", caption: "Normalising: every Nigerian number is converted to one standard format before searching the list." } },
        { t: "prompt", title: "Normalise phone numbers", text: "In my [Make / Zapier / n8n] automation, before searching the customer list, convert any Nigerian phone number to international format: remove spaces, dashes and brackets; turn a leading 0 into +234; turn a leading 234 into +234. Give me the exact formula or step for my tool, with three test examples." },
        { t: "check", q: "What is 0803 123 4567 in international format?", options: ["+2340803 1234567", "+2348031234567", "08031234567"], answer: 1, why: "Remove the spaces, drop the leading 0, and put +234 in front." },
        { t: "try", title: "Normalise three numbers by hand", minutes: 3, steps: ["Convert: 0706-555-0101, 234 812 000 1111, (0809) 123 4567.", "Answers: +2347065550101, +2348120001111, +2348091234567.", "If you got them right, you understand exactly what the automation must do."] },
      ],
    },
    {
      heading: "Step 3: Wire it together",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Website form → webhook", detail: "Send form entries to your automation's webhook address." },
            { title: "Agent → webhook", detail: "Most chat platforms can call a webhook when a conversation ends or gets a tag like “hot lead”." },
            { title: "Automation: find or create", detail: "Normalise the phone, search the list: update the record if found, add it if not. Set status and source." },
            { title: "Automation: alert only when it matters", detail: "Filter: status is “hot”, “booked” or “needs a person”." },
          ],
        },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Plan the full scenario, with its branches, before building." },
        { t: "tool", slug: "lead-qualification", why: "Define hot / warm / cold rules that the agent and the automation both use." },
        { t: "scenario", title: "Too many alerts", text: "A clinic owner's first system emailed her about **every** message: 80 a day. By Wednesday she ignored them all, including two urgent ones. After one filter (only “booked” and “needs a person”), she got a handful a day and read every one. Fewer, better alerts are the whole point." },
      ],
    },
    {
      heading: "Step 4: Test the whole journey",
      blocks: [
        { t: "p", text: "Pretend to be three different customers, from start to finish:" },
        { t: "list", items: ["**A** fills the website form → gets a reply, appears in the list once, and the owner isn't disturbed.", "**B** asks on WhatsApp and books → the list shows “booked”, and the owner is alerted.", "**C** complains → handed to a person, the list shows “needs a person”, and the owner is alerted straight away.", "Then **A writes again on WhatsApp** → the same record is updated, not duplicated."] },
        { t: "mistakes", items: [{ wrong: "Searching the list with the phone number exactly as typed", right: "Normalising to +234… first, every time" }, { wrong: "An alert for every single message", right: "Alerts only for hot leads, bookings and requests for a person" }, { wrong: "Testing each part separately and calling it done", right: "An end-to-end test as three different customers, plus a repeat contact" }] },
      ],
    },
  ],
  task: {
    title: "Build the connected system",
    steps: ["Set up the customer list with columns: name, phone, source, need, status, next step.", "Connect the website form, the agent and WhatsApp to one automation.", "Find-or-create customers by normalised phone number.", "Alert the owner only for hot leads, bookings and requests for a person.", "Run the three-customer end-to-end test, plus a repeat contact."],
    done: ["One person = one record, even from two channels", "The owner only gets alerts that need action", "Every enquiry gets an instant reply", "The end-to-end test passes for all three customers"],
  },
  recap: [
    "A **CRM** is simply a list of customers and leads with their status and next step, a Google Sheet is fine to start.",
    "Avoid duplicates by using a **normalised phone number as the unique key**.",
    "0803 123 4567 becomes **+2348031234567**: remove spaces, drop the leading 0, add +234.",
    "Alert the owner **only when action is needed**, hot leads, bookings, requests for a person. Too many alerts get ignored.",
    "Prove it works with an **end-to-end test as several customers**, including someone who contacts you twice.",
  ],
  resources: [
    { label: "HubSpot free CRM", url: "https://www.hubspot.com/products/crm", note: "A free CRM if the client needs more than a sheet." },
    { label: "Airtable guides", url: "https://www.airtable.com/guides", note: "Build a no-code customer list." },
    { label: "Make: Webhooks", url: "https://help.make.com/webhooks", note: "Receive data from forms and chat tools." },
    { label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", note: "Filters, sorting and sharing for your list." },
  ],
  quiz: [
    { q: "What is a CRM?", options: ["A payment gateway", "A list of customers and leads with their status and next step", "A website builder", "An AI model"], answer: 1, why: "At its simplest, a CRM tracks who's who and what's next.", from: 0 },
    { q: "How do you avoid duplicate records from different channels?", options: ["Use the name as the key", "Use a normalised phone number as the unique key", "Delete old leads", "Only use one channel"], answer: 1, why: "Names vary; a normalised phone number is unique.", from: 1 },
    { q: "What's 0803 123 4567 in international format?", options: ["+2340803 1234567", "+2348031234567", "08031234567", "234-0803"], answer: 1, why: "Drop the leading 0, add +234, remove spaces.", from: 2 },
    { q: "When should the owner be alerted?", options: ["For every single message", "Only when action is needed: hot leads, bookings, requests for a person", "Never", "Once a month"], answer: 1, why: "Too many alerts get ignored.", from: 3 },
    { q: "How do you know the system works?", options: ["It looks connected", "An end-to-end test as several customers, including a repeat contact", "The platform says “active”", "Ask the owner"], answer: 1, why: "Only a full journey test proves it.", from: 4 },
  ],
};

export default lesson;
