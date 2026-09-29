import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "whatsapp-bots-cs-agents",
  title: "WhatsApp bots & customer-service agents",
  minutes: 120,
  outcome: "A WhatsApp bot flow for orders or bookings, a website support agent, and a clean handoff to a human.",
  intro:
    "In Nigeria, business happens on WhatsApp. Owners spend hours answering “how much?”, “are you open?” and “send account number” — often late at night. Today you'll put yesterday's agent where customers already are: on WhatsApp and on the website.",
  sections: [
    {
      heading: "Your options on WhatsApp",
      blocks: [
        { t: "table", columns: ["Option", "What it can do", "Good for"], rows: [["WhatsApp Business app", "Greeting message, away message, quick replies, catalog, labels", "Very small businesses — free, no code"], ["WhatsApp Business Platform (Cloud API)", "Real bots and AI agents, many staff, automations", "Businesses with lots of messages"], ["Platforms built on the API (e.g. respond.io, Wati, Twilio)", "Inbox for staff + bot builder + AI", "Faster setup, monthly fee"]] },
        { t: "tip", text: "Many clients only need the free app set up properly: greeting, away message, quick replies and a catalog. That's a quick, paid job — start there." },
        { t: "tool", slug: "whatsapp-business-bio", why: "Writes the business profile, greeting, away message and quick replies for the WhatsApp Business app." },
      ],
    },
    {
      heading: "Step 1 — Design the conversation flow",
      blocks: [
        { t: "p", text: "Before building, draw the conversation. Most bots use a menu for common paths, plus AI for free-text questions." },
        { t: "tool", slug: "whatsapp-bot-flow-builder", why: "Builds a complete flow: welcome menu, order/booking steps, FAQs and handoff — with message text ready to paste." },
        { t: "figure", figure: { product: "wabot", caption: "A WhatsApp order bot: menu, choices, total and payment link." } },
        { t: "list", items: ["Welcome: “Hi! 1) See menu 2) Place an order 3) Track order 4) Talk to a person”", "Always offer a way to reach a human", "Keep messages short — 1–3 lines", "Confirm important details back to the customer (order, address, total)"] },
      ],
    },
    {
      heading: "Step 2 — Rules WhatsApp enforces",
      blocks: [
        { t: "list", items: ["Customers must **opt in** before a business messages them first.", "The business can reply freely within **24 hours** of the customer's last message. After that, only pre-approved **template messages** can be sent.", "Template messages (like reminders) are charged per conversation — check Meta's current pricing.", "Spam gets numbers banned. Never bulk-message people who didn't ask."] },
        { t: "warn", text: "Unofficial WhatsApp bots (scripts that control a normal WhatsApp account) break WhatsApp's terms and numbers get banned — sometimes the business's main number. Use only the official Business app or the official Business Platform." },
      ],
    },
    {
      heading: "Step 3 — Build it",
      blocks: [
        { t: "steps", items: [
          { title: "Pick a platform", detail: "For learning, use a platform's free trial or Meta's Cloud API test number (free for development)." },
          { title: "Build the menu flow", detail: "Enter the messages and choices from your flow." },
          { title: "Connect the AI agent", detail: "Use your system prompt and knowledge base from yesterday for free-text questions." },
          { title: "Connect actions", detail: "Send a Paystack payment link for orders; create a booking; add the lead to your sheet (Day 15)." },
        ] },
      ],
    },
    {
      heading: "Step 4 — A support agent on the website",
      blocks: [
        { t: "p", text: "The same agent can live on the website as a chat widget. Many platforms give you a widget code; or ask Claude to build a simple one using the Claude API — keeping the API key on the server." },
        { t: "figure", figure: { product: "supportagent", caption: "A website support agent answering from the knowledge base, with a 'talk to a person' button." } },
      ],
    },
    {
      heading: "Step 5 — The human handoff",
      blocks: [
        { t: "p", text: "A smooth handoff is what makes customers trust the bot. The customer should never have to repeat themselves." },
        { t: "tool", slug: "handoff-script-generator", why: "Writes the handoff messages for the customer and the summary note for staff." },
        { t: "list", items: ["Tell the customer a person is coming and roughly when", "Send staff a short summary: who, what they want, what the bot already said", "Out of hours: say when someone will reply, and collect details"] },
      ],
    },
  ],
  task: {
    title: "Put an agent on WhatsApp and the website",
    steps: ["Set up the WhatsApp Business app profile, greeting, away message and quick replies.", "Design a bot flow with the flow builder.", "Build it on a platform's trial or the Cloud API test number.", "Add a website chat agent using your knowledge base.", "Test the handoff: complaint → human with summary."],
    done: ["The bot always offers a way to reach a person", "Orders or bookings can be completed in the chat", "No unofficial WhatsApp tools are used", "Staff receive a summary on every handoff"],
  },
  resources: [
    { label: "WhatsApp Business app features", url: "https://business.whatsapp.com/products/business-app", note: "Greeting, away messages, catalogs, labels." },
    { label: "WhatsApp Cloud API — Get started", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started", note: "Official developer guide with a free test number." },
    { label: "WhatsApp Business Messaging Policy", url: "https://business.whatsapp.com/policy", note: "Rules on opt-in and messaging." },
    { label: "Anthropic API docs", url: "https://docs.claude.com/en/api/overview", note: "Build your own web chat agent." },
  ],
  quiz: [
    { q: "What's the free option that many small businesses only need?", options: ["A custom AI platform", "The WhatsApp Business app, set up properly", "An unofficial bot script", "A new phone"], answer: 1, why: "Greeting, away message, quick replies and a catalog solve a lot." },
    { q: "What happens after 24 hours without a customer message?", options: ["Nothing changes", "The business can only send pre-approved template messages", "The chat is deleted", "The number is banned"], answer: 1, why: "That's WhatsApp's customer service window rule." },
    { q: "Why avoid unofficial WhatsApp bots?", options: ["They're slower", "They break WhatsApp's terms and can get the number banned", "They're too expensive", "They don't support English"], answer: 1, why: "Only official tools are safe for a business number." },
    { q: "What makes a good handoff?", options: ["The customer repeats everything", "The customer is told a person is coming, and staff get a summary", "Ending the chat", "Sending a sticker"], answer: 1, why: "No repeating yourself — that's what builds trust." },
    { q: "Where should a Claude API key live for a website chat agent?", options: ["In the browser code", "On the server only", "In the chat widget", "On WhatsApp"], answer: 1, why: "Keys in the browser can be stolen and abused." },
  ],
};

export default lesson;
