import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "connect-the-system",
  title: "Connect website + automation + agent",
  minutes: 120,
  outcome: "One connected system: an enquiry arrives, the agent replies, the CRM updates and the owner is notified.",
  intro:
    "Separately, a website, an automation and an agent are nice. Connected, they're a **system** that runs the front of a business — and that's what earns the biggest projects and monthly retainers. Today you connect everything you've built into one flow.",
  sections: [
    {
      heading: "The system you're building",
      blocks: [
        { t: "steps", items: [
          { title: "Enquiry arrives", detail: "From the website form, the website chat, or WhatsApp." },
          { title: "Agent replies instantly", detail: "Answers questions, qualifies the lead, offers a booking or order." },
          { title: "CRM updates", detail: "The lead is added (or updated) with source, need, status and next step." },
          { title: "Owner is notified", detail: "Only when action is needed: hot lead, booking made, human requested." },
          { title: "Follow-up runs", detail: "If no booking in 24h, a gentle follow-up is sent (within WhatsApp's rules)." },
        ] },
        { t: "figure", figure: { product: "crm", caption: "A simple CRM pipeline: New → Contacted → Booked → Paid." } },
      ],
    },
    {
      heading: "Step 1 — Choose the CRM",
      blocks: [
        { t: "p", text: "A CRM (customer relationship manager) is simply a list of customers and leads with a status. For small businesses, simple is better." },
        { t: "table", columns: ["Option", "When"], rows: [["Google Sheets", "Starting out, one or two people"], ["Airtable / Notion", "Want views like a board, still no code"], ["HubSpot free CRM", "A sales team and email tracking"], ["Your own Supabase table", "It's part of a web app you built (Day 10)"]] },
      ],
    },
    {
      heading: "Step 2 — One lead record, many sources",
      blocks: [
        { t: "p", text: "The biggest mistake is creating a new lead every time the same person writes. Use the **phone number** (in +234 format) as the unique key: if it exists, update; if not, create." },
        { t: "prompt", title: "Normalise phone numbers", text: "In my automation, before searching the CRM, convert any Nigerian phone number to international format: remove spaces and dashes, turn a leading 0 into +234, and turn 234… into +234…. Give me the exact formula or code step for [Make / Zapier / n8n]." },
      ],
    },
    {
      heading: "Step 3 — Wire it together",
      blocks: [
        { t: "steps", items: [
          { title: "Website form → webhook", detail: "Send form submissions to your automation's webhook URL." },
          { title: "Agent → webhook", detail: "Most chat platforms can call a webhook when a conversation ends or a tag is added (e.g. 'hot lead')." },
          { title: "Automation: find or create the lead", detail: "Search by phone, update or add, set status and source." },
          { title: "Automation: notify when it matters", detail: "Filter: status is 'hot' or 'booked' or 'needs human'." },
        ] },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Plan the full scenario with branches before building." },
        { t: "tool", slug: "lead-qualification", why: "Define hot / warm / cold rules the agent and automation both use." },
      ],
    },
    {
      heading: "Step 4 — Test the whole journey",
      blocks: [
        { t: "p", text: "Pretend to be three different customers, end to end:" },
        { t: "list", items: ["A: fills the website form → gets a reply, appears in the CRM once, owner not disturbed", "B: asks on WhatsApp, books → CRM shows 'booked', owner notified", "C: complains → handed to a human, CRM shows 'needs human', owner notified immediately", "Then A writes again on WhatsApp → the same record is updated, not duplicated"] },
      ],
    },
  ],
  task: {
    title: "Build the connected system",
    steps: ["Pick a CRM and set its columns: name, phone, source, need, status, next step.", "Connect the website form, the agent and WhatsApp to one automation.", "Find-or-create leads by normalised phone number.", "Notify the owner only for hot leads, bookings and human requests.", "Run the 3-customer end-to-end test."],
    done: ["One person = one CRM record, even from two channels", "The owner only gets notifications that need action", "Every enquiry gets an instant reply", "The end-to-end test passes for all three customers"],
  },
  resources: [
    { label: "HubSpot free CRM", url: "https://www.hubspot.com/products/crm", note: "A free CRM if the client needs more than a sheet." },
    { label: "Airtable guides", url: "https://www.airtable.com/guides", note: "Build a no-code CRM." },
    { label: "Make — Webhooks", url: "https://help.make.com/webhooks", note: "Receive data from forms and chat tools." },
    { label: "Zapier — Webhooks", url: "https://zapier.com/apps/webhook/integrations", note: "Webhooks by Zapier." },
  ],
  quiz: [
    { q: "What is a CRM?", options: ["A payment gateway", "A list of customers and leads with their status", "A website builder", "An AI model"], answer: 1, why: "At its simplest, a CRM tracks who's who and what's next." },
    { q: "How do you avoid duplicate leads from different channels?", options: ["Use the name as the key", "Use a normalised phone number as the unique key", "Delete old leads", "Only use one channel"], answer: 1, why: "Names vary; a normalised phone number is unique." },
    { q: "What's 0803 123 4567 in international format?", options: ["+2340803 1234567", "+2348031234567", "08031234567", "234-0803"], answer: 1, why: "Drop the leading 0, add +234, remove spaces." },
    { q: "When should the owner be notified?", options: ["For every single message", "Only when action is needed: hot leads, bookings, human requests", "Never", "Once a month"], answer: 1, why: "Too many alerts get ignored." },
    { q: "How do you know the system works?", options: ["It looks connected", "An end-to-end test as several customers, including a repeat contact", "The platform says 'active'", "Ask the owner"], answer: 1, why: "Only a full journey test proves it." },
  ],
};

export default lesson;
