import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "connect-the-system",
  title: "Connect website + automation + agent",
  minutes: 120,
  outcome: "One connected system for Bisi: an enquiry arrives from the website form, the website chat or WhatsApp; it gets an instant reply; her customer list is updated once (never twice); she's alerted only when it matters; and a morning list tells her who to follow up.",
  intro:
    "On their own, a website, an automation and an AI assistant are nice. Connected, they become a **system** that runs the front desk of a business, and systems earn the biggest projects and the steadiest monthly fees. Today you'll join everything you've built for Bisi into one flow. You'll also learn the small detail that decides whether it works: recognising the **same customer** when she writes on the website on Monday and on WhatsApp on Wednesday.",
  core: "One person must be one record: normalise every phone number to one format and use it as the unique key, then alert the owner only when action is needed.",
  youNeed: ["Your website form, Make automations and website assistant from the last three lessons", "A Google Sheet to use as the customer list", "Your Make account", "About 2 hours"],
  sections: [
    {
      heading: "The system you're building",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "An enquiry arrives", detail: "From the website form, the website chat, or WhatsApp." },
            { title: "It gets an instant reply", detail: "The website thanks them or the assistant answers; WhatsApp's greeting replies." },
            { title: "The customer list updates once", detail: "New person? Add them. Known person? Update their record. Never two rows for one person." },
            { title: "The owner is alerted only when needed", detail: "A serious buyer, a new booking, or someone asking for a person." },
            { title: "A morning list is prepared", detail: "Each morning, Bisi gets a short list of people who haven't booked yet, to message personally." },
          ],
        },
        {
          t: "define",
          term: "Follow-up",
          like: "a friendly second knock on a door, in case they didn't hear the first.",
          meaning: "A polite later message to someone who hasn't replied or booked yet, sent personally and adding something useful, not just “any update?”.",
        },
        {
          t: "define",
          term: "CRM",
          like: "a shop owner's notebook of who ordered, who owes and who to call back, but organised, searchable and shared.",
          meaning: "A **CRM** (customer relationship manager) is a list of customers and interested people, each with a **status** and a next step. It can be as simple as a Google Sheet.",
        },
        {
          t: "define",
          term: "Lead",
          like: "someone who stops at your market stall and asks “how much?”, but hasn't bought yet.",
          meaning: "A person who has shown interest (sent an enquiry, asked a price) but hasn't bought yet. **Hot leads** are ready to buy soon; **cold leads** are just looking.",
        },
        {
          t: "define",
          term: "Pipeline",
          like: "the order board on Bisi's wall: measured → cutting → sewing → ready. Every order sits in exactly one stage.",
          meaning: "The stages a lead moves through, like New → Replied → Booked → Paid. Each record in the CRM has one status at a time.",
        },
        { t: "figure", figure: { diagram: "crm-pipeline", caption: "A simple CRM pipeline: New → Contacted → Booked → Paid." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "envelope", label: "form, chat or WhatsApp" }, { draw: "sheet", label: "one customer list", hot: true }, { draw: "bell", label: "alert only when it matters" }, { draw: "phone", label: "Bisi acts" }] },
          caption: "The connected front desk: enquiries from three doors land in one customer list, and Bisi's phone rings only for the ones that need her.",
        },
      ],
    },
    {
      heading: "Step 1: Choose the customer list",
      blocks: [
        { t: "table", columns: ["Option", "Use it when", "Cost"], rows: [["Google Sheets", "Starting out; one or two people use it", "Free"], ["Airtable", "They want board views and filters, still no code", "Free plan"], ["HubSpot's free CRM", "A sales team, email tracking", "Free plan"], ["Your own Supabase table", "It's part of a web app you've built (Day 10)", "Free plan"]] },
        { t: "tip", text: "Simple beats clever. A Google Sheet the owner actually opens is worth more than a powerful CRM nobody uses. Columns: Name, Phone, Source, Need, Status, Next step, Last contact." },
      ],
    },
    {
      heading: "Step 2: One person, one record",
      blocks: [
        { t: "p", text: "The biggest mistake is creating a new record every time the same person writes: once from the form, again on WhatsApp. The fix: use the **phone number** as the unique key (Day 15), always written the same way." },
        {
          t: "define",
          term: "Normalise",
          like: "a bank insisting your name is written the same way on every form, so “Adebisi”, “Bisi” and “A. Adeyemi” don't become three different customers.",
          meaning: "Converting information into one standard format before saving or searching it. For Nigerian phone numbers: remove spaces, dashes and brackets; turn a leading 0 into +234; turn a leading 234 into +234.",
        },
        { t: "figure", figure: { diagram: "phone-number", caption: "Normalising: every Nigerian number is converted to one standard format before searching the list." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "phone", label: "“0803 123 4567”" }, { draw: "scissors", label: "normalise" }, { draw: "tag", label: "+2348031234567", hot: true }, { draw: "sheet", label: "the one record found" }] },
          caption: "However the customer typed it, the number is trimmed into one standard form first, so the search always finds the same single record.",
        },
        { t: "prompt", title: "Normalise phone numbers in Make", text: "In my Make scenario, before searching my Google Sheet, I need to convert any Nigerian phone number to international format: remove spaces, dashes and brackets; a leading 0 becomes +234; a leading 234 becomes +234; a leading +234 stays. Give me the exact Make formula (using Make's built-in text functions) to put in a Set Variable module, with three test examples." },
        { t: "check", q: "What is 0803 123 4567 in the standard international format?", options: ["+2340803 1234567", "+2348031234567", "08031234567"], answer: 1, why: "Remove the spaces, drop the leading 0, and put +234 in front." },
        { t: "try", title: "Normalise three numbers by hand", minutes: 3, steps: ["Convert: 0706-555-0101, 234 812 000 1111, (0809) 123 4567.", "Answers: +2347065550101, +2348120001111, +2348091234567.", "If you got them right, you understand exactly what the automation must do."] },
      ],
    },
    {
      heading: "Step 3: Wire it together",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Website form → Make (done on Day 15)", detail: "Open the enquiries scenario. After the webhook, add **Tools** → **Set variable** with the normalising formula." },
            { title: "Find or create", detail: "Add **Google Sheets** → **Search Rows** where Phone equals the normalised number. Then a **Router** with two paths: if a row was found, **Update a Row** (last contact, need); if not, **Add a Row** (status New)." },
            { title: "Website chat → Make", detail: "Ask your AI assistant to make the chat function send a short summary to a second Make webhook (stored as a Cloudflare secret) whenever the assistant hands over or the customer leaves a phone number. Use the same find-or-create steps." },
            { title: "WhatsApp, honestly", detail: "The free Business app can't send chats to Make. Give Bisi a 10-second Google Form on her home screen (name, phone, need) for hot WhatsApp enquiries, and send that form to the same sheet. (A Cloud API bot from the stretch goal can send to a webhook directly.)" },
            { title: "Alert only when it matters", detail: "Add a **filter** before the Gmail alert: continue only if status is Booked, the assistant marked it hot, or the customer asked for a person." },
            { title: "The morning follow-up list", detail: "In your 8am summary scenario, add the rows with status New and last contact over 24 hours ago, as a list Bisi works through with her `/followup` quick reply, personally, one chat at a time." },
          ],
        },
        { t: "tool", slug: "zapier-make-scenario-planner", why: "Plan the full scenario, with its router paths, before you build it." },
        { t: "tool", slug: "lead-qualification", why: "Define the hot, warm and cold rules that the assistant and the automation both use." },
        {
          t: "scenario",
          title: "Too many alerts",
          text: "Picture a clinic owner whose first system emailed her about **every** message: 80 a day. By Wednesday she ignored them all, including two urgent ones. After one filter (only “booked” and “needs a person”), she got a handful a day and read every one. Fewer, better alerts are the whole point.",
        },
      ],
    },
    {
      heading: "Step 4: Test the whole journey",
      blocks: [
        { t: "p", text: "Pretend to be three different customers, from start to finish:" },
        { t: "list", items: ["**A** fills the website form → gets the thank-you page, appears in the list **once**, and Bisi isn't disturbed.", "**B** chats on the website, books a fitting → the list shows Booked, and Bisi is alerted.", "**C** asks the assistant for a person → handed to Bisi, the list shows “needs a person”, and Bisi is alerted straight away.", "Then **A writes again**, typing her number differently (with spaces) → the **same** record is updated, not duplicated."] },
        { t: "mistakes", items: [{ wrong: "Searching the list with the number exactly as typed", right: "Normalising to +234… first, every time" }, { wrong: "An alert for every single message", right: "Alerts only for hot leads, bookings and requests for a person" }, { wrong: "Testing each part separately and calling it done", right: "An end-to-end test as three customers, plus a repeat contact" }] },
        { t: "win", title: "One person, one record", proved: "you can join a website, an AI assistant and automations into one front desk that recognises returning customers and only interrupts the owner when it matters.", cue: "Screenshot the sheet after the four tests: three people, three rows. Finish your mission for the **System builder** badge." },
      ],
    },
  ],
  task: {
    title: "Build the connected system",
    steps: ["Set up the customer list with columns: Name, Phone, Source, Need, Status, Next step, Last contact.", "Add phone normalising and find-or-create to the enquiries scenario.", "Connect the website chat's handoffs and a Google Form for hot WhatsApp enquiries.", "Alert Bisi only for bookings, hot leads and requests for a person; add the morning follow-up list.", "Run the three-customer end-to-end test, plus a repeat contact."],
    done: ["One person = one record, even from two channels", "Bisi only gets alerts that need action", "Every enquiry gets an instant reply", "The end-to-end test passes for all three customers", "The follow-up list arrives each morning"],
  },
  recap: [
    "A **CRM** is a list of customers and leads with their status and next step: a Google Sheet is fine to start.",
    "Avoid duplicates by using a **normalised phone number as the unique key**.",
    "0803 123 4567, **normalised**, becomes **+2348031234567**: remove spaces, drop the leading 0, add +234.",
    "Alert the owner **only when action is needed** (hot leads, bookings, requests for a person): too many alerts get ignored.",
    "Prove it works with an **end-to-end test as several customers**, including someone who contacts you twice.",
  ],
  resources: [
    { label: "Make: router", url: "https://help.make.com/router", note: "Splitting a scenario into find-or-create paths." },
    { label: "Make: text functions", url: "https://help.make.com/text-and-binary-functions", note: "The functions for normalising phone numbers." },
    { label: "HubSpot free CRM", url: "https://www.hubspot.com/products/crm", note: "If a client outgrows a sheet." },
    { label: "Google Forms", url: "https://forms.google.com", note: "A 10-second form that writes to the same sheet." },
  ],
  quiz: [
    { q: "How do you stop the same customer becoming two records when she writes from two channels?", options: ["Use her name as the key", "Use her normalised phone number as the unique key", "Delete old records weekly", "Only allow one channel"], answer: 1, why: "Names vary; a normalised phone number is unique.", from: 1, aim: "core" },
    { q: "A customer types her number as 0803 123 4567. What does the automation save it as?", options: ["+2340803 1234567", "+2348031234567", "08031234567", "234-0803"], answer: 1, why: "Drop the leading 0, add +234, remove spaces. Your final project's test includes a returning customer exactly like this.", from: 2, aim: "capstone" },
    { q: "When should Bisi be alerted?", options: ["For every message", "Only when action is needed: hot leads, bookings, requests for a person", "Never", "Once a month"], answer: 1, why: "Too many alerts get ignored. Tomorrow you'll set alerts for when something breaks, with the same rule.", from: 3, aim: "monitoring-handover" },
    { q: "Bisi asks what a CRM is. What do you tell her?", options: ["A payment company", "A list of customers and interested people, each with a status and next step; her Google Sheet is one", "A website builder", "An AI model"], answer: 1, why: "At its simplest, a CRM tracks who's who and what's next. The list of businesses you build in Week 4 works the same way.", from: 0, aim: "find-prospects" },
    { q: "How do you know the whole system works?", options: ["It looks connected", "An end-to-end test as several customers, including one who contacts you twice", "Make says “active”", "Ask the owner"], answer: 1, why: "Only a full journey test proves it. It's one of the checks in your final project.", from: 4, aim: "capstone" },
  ],
  celebrate: {
    title: "Day 18 complete: one connected system",
    proved: "You can join a website, an AI assistant and automations into one front desk that recognises returning customers and only interrupts the owner when it matters.",
    badge: "System builder",
    badgeDesc: "Connected site, assistant and automations",
  },
};

export default lesson;
