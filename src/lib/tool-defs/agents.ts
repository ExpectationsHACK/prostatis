import { renderUptime, type UptimeData } from "./live";
import { arr, lines, opts, or, s, type Block, type ToolDef } from "./types";

// ---------- Chatbot Persona Builder ----------
const persona: ToolDef = {
  kind: "generator",
  intro: "Define who the assistant is, what it may do and the facts it may use. You get a complete system prompt and a pass/fail test script.",
  examples: [
    { label: "Lash studio (WhatsApp)", values: { business: "Glow Beauty Studio, Lekki", name: "Ada", channel: "WhatsApp", tone: ["Warm", "Concise"], can: ["Answer FAQs", "Share prices", "Book appointments", "Send payment links"], never: "Give medical advice\nPromise discounts not in the price list\nShare other customers' details", facts: "Open Mon–Sat 9am–7pm\nClassic lashes ₦25,000; volume ₦35,000\n₦5,000 deposit to book, non-refundable within 24h\nAddress: 12 Admiralty Way, Lekki" } },
    { label: "Clinic (website chat)", values: { business: "CarePoint Clinic, Wuse", name: "Nkechi", channel: "Website chat", tone: ["Professional", "Reassuring"], can: ["Answer FAQs", "Book appointments", "Collect leads"], never: "Give medical advice or diagnoses\nDiscuss test results\nPromise appointment times not in the calendar", facts: "Open Mon–Sat 8am–6pm; emergencies: call 0803 000 0000\nConsultation ₦10,000\nWe accept most HMOs, confirm at reception" } },
    { label: "Online store (Instagram)", values: { business: "Adire Shop", name: "Tobi", channel: "Instagram DM", tone: ["Playful", "Concise"], can: ["Answer FAQs", "Share prices", "Track orders", "Send payment links"], never: "Promise delivery dates we can't meet\nOffer discounts not listed", facts: "Delivery: Lagos 1–2 days (₦3,000), other states 3–5 days (₦5,000)\nReturns within 7 days if unworn\nPay by card, transfer or USSD via Paystack" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "Glow Beauty Studio, Lekki" },
    { key: "name", label: "Bot name", type: "text", default: "Ada", half: true },
    { key: "channel", label: "Channel", type: "select", default: "WhatsApp", options: opts("WhatsApp", "Website chat", "Instagram DM", "Phone (voice)"), half: true },
    { key: "tone", label: "Tone", type: "multi", default: ["Warm", "Concise"], options: opts("Warm", "Concise", "Professional", "Playful", "Reassuring", "Uses light Pidgin") },
    { key: "can", label: "It can…", type: "multi", default: ["Answer FAQs", "Share prices", "Book appointments", "Send payment links"], options: opts("Answer FAQs", "Share prices", "Book appointments", "Send payment links", "Track orders", "Collect leads", "Recommend services") },
    { key: "never", label: "It must never… (one per line)", type: "textarea", rows: 3, default: "Give medical advice\nPromise discounts not in the price list\nShare other customers' details" },
    { key: "facts", label: "Key facts (one per line)", type: "textarea", rows: 4, default: "Open Mon–Sat 9am–7pm\nLash extensions from ₦25,000\n₦5,000 deposit to book, non-refundable within 24h\nAddress: 12 Admiralty Way, Lekki" },
  ],
  generate(v) {
    const name = or(s(v, "name"), "Assistant"), biz = or(s(v, "business"), "the business");
    const prompt = `You are ${name}, the ${s(v, "channel")} assistant for ${biz}. You are an AI assistant, say so in your first message and whenever asked.

PERSONALITY: ${arr(v, "tone").join(", ") || "Friendly"}. Keep replies short: ${s(v, "channel") === "WhatsApp" ? "max 3 lines, no markdown tables" : "2–4 sentences"}. Use the customer's name when you know it.

YOU CAN:
${arr(v, "can").map((c) => "- " + c).join("\n") || "- Answer questions"}

YOU MUST NEVER:
${lines(s(v, "never")).map((c) => "- " + c).join("\n") || "- Make things up"}
- Invent prices, availability or policies that aren't in the facts below
- Claim to be human if asked

FACTS (your only source of truth):
${lines(s(v, "facts")).map((c) => "- " + c).join("\n")}

WHEN YOU DON'T KNOW: say you'll check with the team, collect name + phone, and hand over to a human.
HAND OVER TO A HUMAN IF: the customer is upset, asks for a refund, asks the same thing twice, or asks something outside the facts.
ALWAYS END with a clear next step (book, pay, or ask a question).`;
    const can = arr(v, "can");
    const tests: [string, string][] = [
      ["What are your opening hours?", "Answers only from the facts"],
      ["Can I get 30% off?", "Refuses politely: no discount unless it's in the facts"],
      ["Are you a real person?", "Says it's an AI assistant and offers a human"],
      ["I'm very angry, nobody has replied to me!", "Apologises and hands over to a human"],
      ["Can you write my school assignment?", "Stays on topic and redirects politely"],
      ["Something you don't sell or do", "Says it doesn't know / doesn't offer it: never invents"],
      ...(can.includes("Book appointments") ? ([["Can I come tomorrow at 11pm?", "Doesn't book outside opening hours; offers real times"]] as [string, string][]) : []),
      ...(can.includes("Send payment links") ? ([["Send me your account number", "Sends the official payment link only, never a personal account"]] as [string, string][]) : []),
      ...(can.includes("Track orders") ? ([["Where is my order?", "Asks for the order number before answering"]] as [string, string][]) : []),
    ];
    return [
      { type: "text", title: "System prompt", text: prompt, filename: `${name.toLowerCase()}-system-prompt.txt` },
      { type: "table", title: "Test script: the assistant passes only if every answer matches", columns: ["Send this", "It should…"], rows: tests },
      { type: "list", title: "Where to paste it", items: ["Prototype: create a Claude Project and paste the prompt into the project instructions.", "Live: paste it into your chatbot platform's “system prompt” or “instructions” box.", "Re-run the test script every time you change the prompt or the facts."] },
    ];
  },
};

// ---------- Customer Service Agent Script Generator ----------
const csScripts: ToolDef = {
  kind: "generator",
  intro: "Pick the situations your agent (or staff) handles. You get approved reply scripts, tone rules and clear handoff points.",
  examples: [
    { label: "Logistics", values: { business: "QuickShip Logistics", cases: ["Where is my order?", "Complaint", "Refund request", "After hours"], refund: "Refunds within 7 days for undelivered items", hours: "Mon–Sat 8am–8pm" } },
    { label: "Fashion store", values: { business: "Adire Shop", cases: ["Price enquiry", "Wrong item received", "Change or cancel", "Refund request"], refund: "Returns within 7 days if unworn, refund in 3 working days", hours: "Mon–Sat 9am–6pm" } },
    { label: "Restaurant", values: { business: "Mama's Kitchen", cases: ["Where is my order?", "Complaint", "After hours"], refund: "Full refund or a free replacement for wrong or late orders", hours: "Daily 10am–9pm" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "QuickShip Logistics" },
    { key: "cases", label: "Situations", type: "multi", default: ["Where is my order?", "Price enquiry", "Complaint", "Refund request"], options: opts("Where is my order?", "Price enquiry", "Complaint", "Refund request", "Change or cancel", "After hours", "Wrong item received") },
    { key: "refund", label: "Refund policy", type: "text", default: "Refunds within 7 days for undelivered items" },
    { key: "hours", label: "Support hours", type: "text", default: "Mon–Sat 8am–8pm" },
  ],
  generate(v) {
    const b = or(s(v, "business"), "us");
    const bank: Record<string, string> = {
      "Where is my order?": `Customer: Where is my order?\nAgent: Sorry for the wait! Please send your order number and I'll check right away.\n→ [look up status]\nAgent: Your order #{id} is {status}. Expected delivery: {eta}. I'll message you if anything changes.`,
      "Price enquiry": `Customer: How much is…?\nAgent: {item} is {price}. It includes {what's included}. Would you like me to book it / send a payment link?`,
      Complaint: `Customer: [complaint]\nAgent: I'm really sorry about this, thank you for telling us. Let me fix it. Could you share {order number / photo}?\n→ [if unresolved in 2 replies → hand to human]\nAgent: I've passed this to our team lead, who will contact you within 2 hours.`,
      "Refund request": `Customer: I want a refund.\nAgent: I understand. Our policy: ${or(s(v, "refund"), "[refund policy]")}. Could you share your order number so I can check eligibility?\n→ [always hand refunds to a human]`,
      "Change or cancel": `Customer: Can I change/cancel?\nAgent: Yes, if it hasn't been dispatched yet. Send your order number and what you'd like to change.`,
      "After hours": `Agent: Thanks for messaging ${b}! We're offline right now (${or(s(v, "hours"), "business hours")}). Leave your question and order number. We'll reply first thing.`,
      "Wrong item received": `Customer: I got the wrong item.\nAgent: So sorry! Please send a photo of what arrived and your order number. We'll arrange a swap at no cost to you.`,
    };
    const items = arr(v, "cases").map((c) => bank[c]).filter(Boolean);
    if (!items.length) return [{ type: "notice", tone: "warn", text: "Pick at least one situation." }];
    return [
      { type: "list", title: `Reply scripts: ${b}`, items },
      { type: "list", title: "Tone rules for every reply", items: ["Apologise once, then fix: don't over-apologise.", "Use the customer's name when you know it.", "Never blame the customer, a rider or another staff member.", "Always end with the next step and when it will happen.", "Refunds, angry customers and anything unusual go to a person."] },
      { type: "notice", tone: "info", text: "Paste these into the agent's knowledge base as approved replies, and give the same scripts to human staff. Values in {braces} come from your order system." },
    ];
  },
};

// ---------- WhatsApp Business Bot Flow Builder ----------
const waFlow: ToolDef = {
  kind: "generator",
  intro: "List the menu options customers pick from. You get the bot flow, the exact messages and a build spec, plus WhatsApp's rules so the number stays safe.",
  examples: [
    { label: "Food orders", values: { business: "Mama's Kitchen", greeting: "Hi 👋 Welcome to Mama's Kitchen! What would you like to do?", options: "See today's menu | Send menu image + prices\nPlace an order | Ask items → address → send Paystack link\nTrack my order | Ask order number → send status\nTalk to a person | Hand over to staff", fallback: "Sorry, I didn't get that. Reply with a number from the menu 🙏" } },
    { label: "Salon bookings", values: { business: "Glow Beauty Studio", greeting: "Hi! 💖 Welcome to Glow Beauty. How can we help?", options: "Prices | Send the price list\nBook an appointment | Send the booking link\nOur location | Send address + map link\nTalk to a person | Hand over to staff", fallback: "Sorry, I didn't catch that: reply 1, 2, 3 or 4 🙏" } },
    { label: "School enquiries", values: { business: "Bright Stars Academy", greeting: "Hello! Welcome to Bright Stars Academy. What would you like to know?", options: "School fees | Send the fees for each class\nAdmissions | Send admission steps + form link\nBook a school visit | Send the booking link\nTalk to the office | Hand over to the admin officer", fallback: "Sorry, please reply with a number from the menu." } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "Mama's Kitchen" },
    { key: "greeting", label: "Welcome message", type: "text", default: "Hi 👋 Welcome to Mama's Kitchen! What would you like to do?" },
    { key: "options", label: "Menu options (one per line: label | what happens)", type: "textarea", rows: 5, default: "See today's menu | Send menu image + prices\nPlace an order | Ask items → address → send Paystack link\nTrack my order | Ask order number → send status\nTalk to a person | Hand over to staff" },
    { key: "fallback", label: "If the message isn't understood", type: "text", default: "Sorry, I didn't get that. Reply with a number from the menu 🙏" },
  ],
  generate(v) {
    const opts2 = lines(s(v, "options")).map((l, i) => {
      const [label, action] = l.split("|").map((x) => x.trim());
      return { n: i + 1, label: label || `Option ${i + 1}`, action: action || "Reply with info" };
    });
    if (!opts2.length) return [{ type: "notice", tone: "warn", text: "Add at least one menu option." }];
    const menuMsg = `${or(s(v, "greeting"), "Hi! How can we help?")}\n\n${opts2.map((o) => `${o.n}. ${o.label}`).join("\n")}`;
    const steps = [
      { label: "Customer sends any message", detail: "Trigger: new conversation or 'menu'" },
      { label: "Bot sends the menu", detail: `${opts2.length} numbered options` },
      ...opts2.map((o) => ({ label: `${o.n} → ${o.label}`, detail: o.action })),
      { label: "Not understood", detail: s(v, "fallback") },
    ];
    const spec = `WhatsApp bot spec: ${or(s(v, "business"), "Business")}
Platform: WhatsApp Business API (via a provider like Twilio, 360dialog or Wati)
Session keywords: "menu", "hi", "hello" → show menu
Options:
${opts2.map((o) => `  ${o.n}. ${o.label}: ${o.action}`).join("\n")}
Fallback: ${s(v, "fallback")}
Human handoff: any time the customer types "agent" or after 2 fallbacks
Business hours auto-reply: outside hours, collect the question and promise a reply`;
    const out: Block[] = [
      { type: "flow", title: "Bot flow", steps },
      { type: "text", title: "Menu message", text: menuMsg },
      { type: "text", title: "Build spec", text: spec, filename: "whatsapp-bot-spec.txt" },
      {
        type: "list",
        title: "WhatsApp's rules (break them and the number can be banned)",
        items: [
          "Use only the official WhatsApp Business Platform (Cloud API or a provider), never unofficial bot apps on a normal WhatsApp number.",
          "Replies within 24 hours of the customer's last message are free and unrestricted.",
          "After 24 hours, only pre-approved template messages, sent to customers who opted in. Meta charges per template message.",
          "Always keep a “talk to a person” option.",
        ],
      },
      ...(opts2.some((o) => /person|staff|human|office|agent/i.test(`${o.label} ${o.action}`)) ? [] : [{ type: "notice" as const, tone: "warn" as const, text: "Add a “Talk to a person” option. Customers must always be able to reach a human." }]),
    ];
    return out;
  },
};

// ---------- Agent Task Decomposer ----------
const decomposer: ToolDef = {
  kind: "generator",
  intro: "Describe a job you want an AI agent to do. You get it broken into clear steps with tools, checks and human approval points, plus instructions to paste into the agent.",
  examples: [
    { label: "Weekly prospecting", values: { goal: "Every Monday, find 20 new restaurants in Lagos without a website and draft outreach", tools: ["Web search", "Google Sheets", "Email drafts"], approval: "Sending anything" } },
    { label: "Daily sales report", values: { goal: "Every morning, summarise yesterday's orders from the Orders sheet and email the owner", tools: ["Google Sheets", "Email drafts"], approval: "Nothing (fully automatic)" } },
    { label: "Review replies", values: { goal: "Draft polite replies to new Google reviews for the owner to approve", tools: ["Web browser", "Files"], approval: "Sending anything" } },
  ],
  fields: [
    { key: "goal", label: "Goal", type: "text", default: "Every Monday, find 20 new restaurants in Lagos without a website and draft outreach" },
    { key: "tools", label: "Tools the agent can use", type: "multi", default: ["Web search", "Google Sheets", "Email drafts"], options: opts("Web search", "Web browser", "Google Sheets", "Email drafts", "WhatsApp", "CRM", "Calendar", "Files") },
    { key: "approval", label: "Human approval before", type: "select", default: "Sending anything", options: opts("Sending anything", "Spending money", "Nothing (fully automatic)") },
  ],
  generate(v) {
    const goal = or(s(v, "goal"), "the task"), tools = arr(v, "tools");
    const has = (t: string) => tools.includes(t);
    const steps = [
      { label: "Understand the goal", detail: `Restate: “${goal}”. Define done: what output, what format, where saved.` },
      { label: "Gather inputs", detail: has("Web search") || has("Web browser") ? "Search/browse for candidates; keep source URLs." : "Read the inputs provided (files, sheet)." },
      { label: "Filter & verify", detail: "Apply the criteria; drop duplicates and anything unverifiable." },
      { label: "Enrich", detail: "Add the details needed for the next step (contact, observation, score)." },
      { label: "Save results", detail: has("Google Sheets") ? "Append rows to the Google Sheet with a date column." : "Write results to a file." },
      { label: "Draft the action", detail: has("Email drafts") ? "Create email drafts: personalised first line per row." : has("WhatsApp") ? "Prepare WhatsApp messages." : "Prepare the next action." },
      { label: s(v, "approval") === "Nothing (fully automatic)" ? "Execute" : `Pause for approval (${s(v, "approval").toLowerCase()})`, detail: "Human reviews before anything leaves the building." },
      { label: "Report", detail: "Summary: counts, what was done, anything that failed and why." },
    ];
    const prompt = `GOAL: ${goal}\nTOOLS: ${tools.join(", ") || "none"}\nFollow these steps in order, stop and ask if a step fails twice:\n${steps.map((st, i) => `${i + 1}. ${st.label}: ${st.detail}`).join("\n")}\nNever invent data. If you can't verify something, mark it "unverified".`;
    const out: Block[] = [
      { type: "flow", title: "Agent plan", steps },
      { type: "text", title: "Agent instructions", text: prompt },
      { type: "list", title: "Before you let it run alone", items: ["Run it once while watching every step.", "Check the output against the “done” definition.", "Keep a log of each run so you can see what it did.", "Set a spending limit on any paid AI or tool it uses."] },
    ];
    if (s(v, "approval") === "Nothing (fully automatic)" && (has("Email drafts") || has("WhatsApp"))) out.push({ type: "notice", tone: "warn", text: "This agent can contact people with no human check. Keep an approval step until it has run correctly many times." });
    return out;
  },
};

// ---------- FAQ-to-Agent Knowledge Base Converter ----------
const faqToKb: ToolDef = {
  kind: "generator",
  intro: "Paste questions and answers in any rough format (Q:/A:, numbered, or lines ending in “?”). You get a clean knowledge base, with missing answers, duplicates and gaps flagged.",
  examples: [
    { label: "Lash studio", values: { business: "Glow Beauty Studio", raw: "Q: What are your opening hours?\nA: Monday to Saturday, 9am to 7pm.\n\nHow much are lash extensions?\nClassic sets start at ₦25,000, volume at ₦35,000.\n\nQ: Do I need to pay a deposit?\nA: Yes, ₦5,000 to confirm your booking. It's deducted from your bill." } },
    { label: "Messy WhatsApp notes", values: { business: "Mama's Kitchen", raw: "do you deliver?\nyes within ikeja, 1000 naira\n\nwhat time do you open\n10am till 9pm everyday\n\nhow do I pay?\n\nDo you do party orders?\nyes, 3 days notice" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "Glow Beauty Studio" },
    { key: "raw", label: "FAQ text", type: "textarea", rows: 9, default: "Q: What are your opening hours?\nA: Monday to Saturday, 9am to 7pm.\n\nHow much are lash extensions?\nClassic sets start at ₦25,000, volume at ₦35,000.\n\nQ: Do I need to pay a deposit?\nA: Yes, ₦5,000 to confirm your booking. It's deducted from your bill." },
  ],
  generate(v) {
    const raw = s(v, "raw");
    const pairs: { q: string; a: string }[] = [];
    let q = "", a: string[] = [];
    const flush = () => { if (q) pairs.push({ q: q.trim(), a: a.join(" ").trim() || "(answer missing)" }); q = ""; a = []; };
    for (const line of raw.split("\n").map((l) => l.trim())) {
      if (!line) continue;
      const qm = line.match(/^(?:q(?:uestion)?\s*[:.)-]\s*|\d+[.)]\s*)(.*)$/i);
      if (qm && (/^q/i.test(line) || qm[1].endsWith("?"))) { flush(); q = qm[1]; continue; }
      const am = line.match(/^a(?:nswer)?\s*[:.)-]\s*(.*)$/i);
      if (am) { a.push(am[1]); continue; }
      if (line.endsWith("?") && (!q || a.length)) { flush(); q = line; continue; }
      a.push(line);
    }
    flush();
    if (!pairs.length) return [{ type: "notice", tone: "warn", text: "No questions found. Put each question on its own line ending with '?' or starting with 'Q:'." }];
    const md = `# ${or(s(v, "business"), "Business")}: Knowledge base\n\n${pairs.map((p) => `## ${p.q}\n${p.a}`).join("\n\n")}`;
    const json = JSON.stringify(pairs.map((p, i) => ({ id: `faq-${i + 1}`, question: p.q, answer: p.a })), null, 2);
    const missing = pairs.filter((p) => p.a === "(answer missing)").length;
    const out: Block[] = [
      { type: "stats", items: [{ label: "Q&A pairs found", value: String(pairs.length) }, { label: "Missing answers", value: String(missing) }] },
      { type: "text", title: "Knowledge base (Markdown)", text: md, filename: "knowledge-base.md" },
      { type: "text", title: "Knowledge base (JSON)", text: json, filename: "knowledge-base.json" },
    ];
    if (missing) out.push({ type: "notice", tone: "warn", text: `${missing} question(s) have no answer: fill them in before giving this to the agent.` });
    const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
    const seen = new Set<string>();
    const dupes = pairs.filter((p) => (seen.has(norm(p.q)) ? true : (seen.add(norm(p.q)), false))).length;
    if (dupes) out.push({ type: "notice", tone: "warn", text: `${dupes} duplicate question(s), keep one answer per question so the agent never gives two different answers.` });
    const all = pairs.map((p) => `${p.q} ${p.a}`).join(" ").toLowerCase();
    const topics: [RegExp, string][] = [[/hour|open|close/, "Opening hours"], [/where|address|location|located/, "Location / directions"], [/pay|transfer|card|ussd/, "How to pay"], [/price|cost|how much|₦/, "Prices"], [/deliver|pickup|shipping/, "Delivery or pickup"], [/refund|return|cancel/, "Refunds and cancellations"], [/contact|phone|whatsapp|call/, "How to reach a person"]];
    const gaps = topics.filter(([re]) => !re.test(all)).map(([, t]) => t);
    if (gaps.length) out.push({ type: "list", title: "Common questions still missing: add them", items: gaps });
    return out;
  },
};

// ---------- Agent Uptime / Monitoring Checklist ----------
const monitoring: ToolDef = {
  kind: "checklist",
  intro: "Ping the agent's website or webhook, then make sure you'll know when it breaks, before the customer does.",
  live: {
    kind: "uptime",
    title: "Ping an agent, webhook or website",
    button: "Ping it",
    url: { placeholder: "yourapp.com/api/whatsapp-webhook", hint: "Sends 3 requests and reports status and response time." },
    render: (d: UptimeData) => renderUptime(d),
  },
  groups: [
    { title: "Reliability", checks: [
      { id: "uptime", weight: 3, text: "Uptime monitor pings the agent/webhook every 5 minutes", fix: "Use UptimeRobot or Better Stack free tier on the webhook URL." },
      { id: "alerts", weight: 3, text: "Failures alert you on WhatsApp/email/Slack", fix: "Connect the monitor and your automation's error handler to your phone." },
      { id: "retry", weight: 2, text: "Failed API calls retry with backoff", fix: "Retry 2–3 times with increasing delay before giving up." },
      { id: "fallback", weight: 2, text: "If the AI fails, customers get a friendly fallback message", fix: "Catch errors and send 'We'll get back to you shortly' + notify staff." },
    ] },
    { title: "Quality", checks: [
      { id: "logs", weight: 3, text: "Every conversation is logged", fix: "Store messages (without payment data) in a sheet or database." },
      { id: "review", weight: 2, text: "Someone reviews 20 conversations a week", fix: "Book a weekly 15-minute review; fix the knowledge base." },
      { id: "tests", weight: 2, text: "A test script of 10 tricky questions is re-run after every change", fix: "Keep the list in the handover doc; run it before each update." },
      { id: "handoff", weight: 3, text: "Human handoff works and is tested", fix: "Test 'agent', an angry message and a refund request." },
    ] },
    { title: "Cost & safety", checks: [
      { id: "budget", weight: 2, text: "Monthly AI spend limit set", fix: "Set a usage limit with your AI provider and alert at 80%." },
      { id: "keys", weight: 3, text: "API keys stored in environment variables, not in code", fix: "Move keys to your host's secrets; rotate any that leaked." },
      { id: "privacy", weight: 2, text: "Customers are told they're chatting with an AI assistant", fix: "Add it to the welcome message." },
      { id: "owner", weight: 1, text: "Client knows who to call and has a handover doc", fix: "Share a one-page runbook with contacts and how to pause the bot." },
    ] },
  ],
  grades: [[85, "Production-ready"], [60, "Launchable: close the high-impact gaps"], [0, "Not ready for real customers"]],
};

// ---------- Agent Handoff-to-Human Script Generator ----------
const handoff: ToolDef = {
  kind: "generator",
  intro: "Set when and how the agent passes a chat to a person. You get the handoff rules and every message the customer and staff see, and a test.",
  examples: [
    { label: "Phone repairs", values: { business: "SwiftFix Phone Repairs", triggers: ["Customer asks for a person", "Customer is upset", "Refund or payment issue", "Bot fails twice"], staff: "Tolu (support lead)", wait: "under 30 minutes", hours: "Mon–Sat, 9am–6pm" } },
    { label: "Clinic", values: { business: "CarePoint Clinic", triggers: ["Customer asks for a person", "Medical, legal or safety question", "Refund or payment issue"], staff: "the front desk", wait: "within 15 minutes", hours: "Mon–Sat, 8am–6pm" } },
    { label: "Event venue", values: { business: "Grand Hall Events", triggers: ["Customer asks for a person", "Large order / VIP", "Bot fails twice"], staff: "Bisi (events manager)", wait: "within 1 hour", hours: "Mon–Sun, 9am–7pm" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "SwiftFix Phone Repairs" },
    { key: "triggers", label: "Hand over when", type: "multi", default: ["Customer asks for a person", "Customer is upset", "Refund or payment issue", "Bot fails twice"], options: opts("Customer asks for a person", "Customer is upset", "Refund or payment issue", "Bot fails twice", "Large order / VIP", "Medical, legal or safety question") },
    { key: "staff", label: "Who takes over", type: "text", default: "Tolu (support lead)" },
    { key: "wait", label: "Typical wait", type: "text", default: "under 30 minutes" },
    { key: "hours", label: "Staff hours", type: "text", default: "Mon–Sat, 9am–6pm" },
  ],
  generate(v) {
    const b = or(s(v, "business"), "our team"), staff = or(s(v, "staff"), "a team member");
    const trig = arr(v, "triggers");
    return [
      { type: "list", title: "Handoff triggers", items: trig.length ? trig : ["Customer asks for a person"] },
      { type: "text", title: "Customer messages", text: `DURING HOURS:\n"I'm connecting you with ${staff} now: they'll reply here ${or(s(v, "wait"), "shortly")}. 🙏"\n\nOUTSIDE HOURS:\n"Our team is offline (${or(s(v, "hours"), "business hours")}). I've saved your message and ${staff} will reply first thing. If it's urgent, call {phone}."\n\nIF THE CUSTOMER IS UPSET:\n"I'm sorry about this. I'm getting ${staff} to handle it personally. You won't need to repeat yourself."` },
      { type: "text", title: "Note sent to staff", text: `🔔 HANDOFF: ${b}\nCustomer: {name} ({phone})\nReason: {trigger}\nSummary: {one-line AI summary}\nLast message: "{last_message}"\nOrder/booking: {reference}\nWaiting since: {time}\n→ Reply in the same chat. Type /bot to hand back to the assistant.` },
      { type: "notice", tone: "info", text: "Pause the bot for that conversation once a human takes over, or it will keep replying." },
      { type: "list", title: "Test the handoff before launch", items: ["Type “I want to speak to a person”, do staff get the note?", "Send an angry message: does it hand over without arguing?", "Message outside hours: does the customer get the offline message?", "Reply as staff: does the bot stay quiet in that chat?"] },
    ];
  },
};

export const defs: Record<string, ToolDef> = {
  "chatbot-persona-builder": persona,
  "customer-service-scripts": csScripts,
  "whatsapp-bot-flow-builder": waFlow,
  "agent-task-decomposer": decomposer,
  "faq-to-knowledge-base": faqToKb,
  "agent-monitoring-checklist": monitoring,
  "handoff-script-generator": handoff,
};
