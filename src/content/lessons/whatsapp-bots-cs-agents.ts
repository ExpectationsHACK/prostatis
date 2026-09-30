import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "whatsapp-bots-cs-agents",
  title: "WhatsApp bots & customer-service agents",
  minutes: 120,
  outcome: "A WhatsApp setup for a real business: at minimum, a fully configured WhatsApp Business app, plus a designed bot flow, and a website chat agent with a clean handoff to a human.",
  intro:
    "In Nigeria, business happens on WhatsApp. Owners spend hours answering “How much?”, “Are you open?” and “Send account number”, often late at night. Today you'll put yesterday's agent where customers already are: on WhatsApp and on the website. You'll also learn WhatsApp's rules, because breaking them can get a business's main number banned.",
  youNeed: ["Your agent's instructions and knowledge base from the last lesson", "The business's WhatsApp Business app (on the owner's phone)", "Optional: a Meta developer account for the free WhatsApp Cloud API test number", "Your live site"],
  sections: [
    {
      heading: "Your options on WhatsApp",
      blocks: [
        { t: "table", columns: ["Option", "What it can do", "Good for"], rows: [["WhatsApp Business app", "Greeting and away messages, quick replies, a product catalog, labels", "Very small businesses: free, no code"], ["WhatsApp Business Platform (Cloud API)", "Real bots and AI agents, many staff, automations", "Businesses with lots of messages"], ["Platforms built on the API (e.g. respond.io, Wati, Twilio)", "A shared inbox for staff, a bot builder, AI", "Faster setup, monthly fee"]] },
        { t: "define", term: "WhatsApp Business Platform (Cloud API)", meaning: "Meta's official system that lets software send and receive WhatsApp messages for a business. It is the only allowed way to run a real WhatsApp bot.", like: "the official staff entrance with an ID badge, instead of climbing in through a window." },
        { t: "tip", text: "Many clients only need the free **Business app** set up properly: greeting, away message, quick replies and a catalog. It's a quick, valuable, paid job. Start there." },
        { t: "tool", slug: "whatsapp-business-bio", why: "Writes the business profile, greeting, away message and quick replies for the WhatsApp Business app." },
      ],
    },
    {
      heading: "Step 1: WhatsApp's rules (learn these first)",
      blocks: [
        { t: "define", term: "Customer service window", meaning: "The 24 hours after a customer's last message. During it, the business can reply freely, and those replies are free on the Cloud API.", like: "a shop's open hours for a conversation: the customer opened the door, so you can talk." },
        { t: "define", term: "Template message", meaning: "A pre-approved message a business uses to contact someone **outside** the 24-hour window, like an appointment reminder or an order update. Meta approves the wording first.", like: "an official letter format that must be stamped before posting." },
        { t: "list", items: ["Customers must **opt in** (agree to receive messages) before a business messages them first.", "Replies inside the 24-hour window are free. Since July 2025, Meta charges **per template message delivered**, with prices depending on the category (marketing, utility, authentication) and the country. Check Meta's current pricing page.", "Spam gets numbers banned. Never bulk-message people who didn't ask."] },
        { t: "warn", text: "Unofficial WhatsApp bots (scripts or apps that control a normal WhatsApp account) break WhatsApp's terms. Numbers get banned, sometimes the business's main number. Use only the official Business app or the official Business Platform." },
        { t: "check", q: "A customer messaged the salon yesterday morning, 30 hours ago. The salon wants to send a promo. What's needed?", options: ["Nothing: just send it", "An approved template message (and the customer's opt-in), because the 24-hour window has closed", "Use an unofficial bot"], answer: 1, why: "Outside the 24-hour window, businesses may only send approved templates to people who opted in." },
      ],
    },
    {
      heading: "Step 2: Design the conversation",
      blocks: [
        { t: "p", text: "Before building, draw the conversation. Most good bots use a **menu** for common paths plus AI for free-text questions, and always a way to reach a person." },
        { t: "tool", slug: "whatsapp-bot-flow-builder", why: "Builds a complete flow: welcome menu, order or booking steps, questions and handoff, with message text ready to paste." },
        { t: "figure", figure: { product: "wabot", caption: "A WhatsApp order bot: menu, choices, total and payment link." } },
        { t: "list", items: ["Welcome: “Hi! 1) See menu 2) Place an order 3) Track my order 4) Talk to a person”", "Always offer a way to reach a human", "Keep messages short: 1 to 3 lines", "Confirm the important details back (order, address, total)"] },
        { t: "try", title: "Set up the free Business app properly", minutes: 20, steps: ["On the business's phone, open WhatsApp Business → Business tools.", "Turn on a greeting message and an away message (for closing hours).", "Create 5 quick replies for the most common questions (type “/” in a chat to use them).", "Add the business description, hours and address."] },
      ],
    },
    {
      heading: "Step 3: Build a real bot (Cloud API)",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Pick a platform", detail: "For learning, use Meta's **free Cloud API test number** (from the Meta developer dashboard) or a platform's free trial." },
            { title: "Build the menu flow", detail: "Enter the messages and choices from your design." },
            { title: "Connect the AI agent", detail: "Use yesterday's instructions and knowledge base for free-text questions." },
            { title: "Connect actions", detail: "Send a Paystack payment link for orders, a booking link for appointments, and add the lead to your sheet." },
          ],
        },
        { t: "scenario", title: "The late-night rush", text: "A Surulere food vendor's orders came in between 9pm and midnight, when she was cooking for the next day. A simple menu bot took the order, confirmed the total, sent a Paystack link, and passed anything unusual to her in the morning. She stopped answering “Are you still open?” forty times a night." },
      ],
    },
    {
      heading: "Step 4: A support agent on the website",
      blocks: [
        { t: "p", text: "The same agent can live on the website as a chat bubble. Many platforms give you a code snippet to paste; or ask Claude to build a simple chat using the Claude API, with the API key kept on the **server**." },
        { t: "figure", figure: { product: "supportagent", caption: "A website support agent answering from the knowledge base, with a “talk to a person” button." } },
        { t: "warn", text: "An AI API key in browser code can be copied and used to run up a huge bill on the client's account. Keep it on the server, and set a monthly spending limit in the provider's console." },
      ],
    },
    {
      heading: "Step 5: The human handoff",
      blocks: [
        { t: "define", term: "Handoff", meaning: "Passing a conversation from the bot to a real person, smoothly, so the customer never has to repeat themselves.", like: "a receptionist walking you to the manager and explaining your issue, instead of saying “go and queue again”." },
        { t: "tool", slug: "handoff-script-generator", why: "Writes the handoff messages for the customer and the summary note for staff." },
        { t: "list", items: ["Tell the customer a person is coming, and roughly when", "Send staff a short summary: who, what they want, what the bot already said", "Outside working hours: say when someone will reply, and collect their details"] },
        { t: "mistakes", items: [{ wrong: "A bot with no way to reach a person", right: "“Talk to a person” in every menu" }, { wrong: "Using an unofficial WhatsApp bot app", right: "The official Business app or the Cloud API only" }, { wrong: "Messaging everyone in the contact list about a promo", right: "Only people who opted in, with approved templates" }] },
      ],
    },
  ],
  task: {
    title: "Put the agent where customers are",
    steps: ["Set up the WhatsApp Business app: profile, greeting, away message and 5 quick replies.", "Design a bot flow with the flow builder.", "Build it on the Cloud API test number or a platform trial (stretch goal if the business doesn't need a full bot yet).", "Add a website chat agent using your knowledge base, with the key on the server.", "Test the handoff: a complaint goes to a human with a summary."],
    done: ["The Business app has a greeting, away message and quick replies", "Every bot menu offers a way to reach a person", "No unofficial WhatsApp tools are used", "Staff receive a summary on every handoff"],
  },
  recap: [
    "Many small businesses only need the **free WhatsApp Business app** set up properly: greeting, away message, quick replies and a catalog.",
    "After **24 hours** without a customer message, a business can only send **approved template messages**, to people who opted in.",
    "**Unofficial WhatsApp bots** break WhatsApp's terms and can get the number banned.",
    "A good **handoff** tells the customer a person is coming and gives staff a summary, so nobody repeats themselves.",
    "An AI **API key belongs on the server only**, with a spending limit set.",
  ],
  resources: [
    { label: "WhatsApp Business app features", url: "https://business.whatsapp.com/products/business-app", note: "Greeting, away messages, catalogs, labels." },
    { label: "WhatsApp Cloud API: Get started", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started", note: "Official developer guide with a free test number." },
    { label: "Pricing on the WhatsApp Business Platform", url: "https://developers.facebook.com/docs/whatsapp/pricing", note: "Current per-message pricing and free windows." },
    { label: "WhatsApp Business Messaging Policy", url: "https://business.whatsapp.com/policy", note: "Rules on opt-in and messaging." },
    { label: "Anthropic API docs", url: "https://docs.claude.com/en/api/overview", note: "Build your own website chat agent." },
  ],
  quiz: [
    { q: "What's the free option many small businesses only need?", options: ["A custom AI platform", "The WhatsApp Business app, set up properly", "An unofficial bot app", "A new phone"], answer: 1, why: "Greeting, away message, quick replies and a catalog solve a lot.", from: 0 },
    { q: "What happens after 24 hours without a message from the customer?", options: ["Nothing changes", "The business can only send approved template messages", "The chat is deleted", "The number is banned"], answer: 1, why: "That's WhatsApp's customer service window rule.", from: 1 },
    { q: "Why avoid unofficial WhatsApp bots?", options: ["They're slower", "They break WhatsApp's terms and can get the number banned", "They're too expensive", "They don't support English"], answer: 1, why: "Only official tools are safe for a business number.", from: 2 },
    { q: "What makes a good handoff?", options: ["The customer repeats everything", "The customer is told a person is coming, and staff get a summary", "Ending the chat", "Sending a sticker"], answer: 1, why: "No repeating yourself: that's what builds trust.", from: 3 },
    { q: "Where should an AI API key live for a website chat agent?", options: ["In the browser code", "On the server only", "In the chat bubble", "On WhatsApp"], answer: 1, why: "Keys in the browser can be copied and abused.", from: 4 },
  ],
};

export default lesson;
