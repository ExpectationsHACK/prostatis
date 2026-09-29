import { arr, lines, n, naira, opts, or, s, type Block, type ToolDef } from "./types";

const bizTypes = opts("Restaurant / food vendor", "Salon / spa", "Clinic", "Online store", "Real estate agency", "School / tutor", "Logistics / delivery", "Agency / freelancer", "Consultant / coach", "Hotel / shortlet");

// ---------- Automation Workflow Idea Generator ----------
const ideas: Record<string, [string, string, string][]> = {
  "Restaurant / food vendor": [["WhatsApp order → kitchen sheet", "New WhatsApp order", "Log to Google Sheet + notify kitchen group"], ["Daily sales summary", "Every day 10pm", "Total Paystack payments → send owner a WhatsApp summary"], ["Review request", "Order delivered", "Wait 2h → send Google review link"]],
  "Salon / spa": [["Booking reminders", "Booking created", "Reminder 24h + 2h before via WhatsApp"], ["No-show follow-up", "Booking marked no-show", "Send rebook link + deposit policy"], ["Birthday offer", "Customer birthday (sheet)", "Send 10% off message"]],
  Clinic: [["Appointment confirmations", "Form submitted", "Create calendar event + confirm by SMS"], ["Lab result ready", "Status changed in sheet", "Notify patient to log in / collect"], ["Recall reminders", "6 months after last visit", "Send check-up reminder"]],
  "Online store": [["Order confirmation", "Paystack charge.success", "Email receipt + WhatsApp message + add to sheet"], ["Abandoned cart", "Cart idle 1h", "Send reminder with cart link"], ["Low stock alert", "Stock below 5", "Notify owner"]],
  "Real estate agency": [["Lead capture", "Website enquiry", "Add to CRM + assign agent + WhatsApp intro"], ["Listing alerts", "New listing added", "Send to matching buyers list"], ["Inspection reminders", "Inspection booked", "Remind buyer + agent 1 day before"]],
  "School / tutor": [["Fee reminders", "3 days before due date", "Send parent payment link"], ["Attendance alert", "Student absent", "Notify parent"], ["Enrolment pipeline", "Form submitted", "Add to sheet + send welcome pack"]],
  "Logistics / delivery": [["Tracking updates", "Status change", "WhatsApp customer with ETA"], ["Proof of delivery", "Rider uploads photo", "Email to sender"], ["Rider daily report", "End of day", "Summarise deliveries per rider"]],
  "Agency / freelancer": [["Lead to proposal", "Form submitted", "Draft proposal with AI + notify you"], ["Get-paid chaser", "Payment overdue 3 days", "Send polite reminder"], ["Client onboarding", "Payment received", "Create folder + send onboarding form"]],
  "Consultant / coach": [["Discovery call booked", "Calendar booking", "Send prep questionnaire + reminder"], ["Session notes", "Call ends", "AI summary → client email"], ["Renewal nudge", "Package 80% used", "Offer renewal"]],
  "Hotel / shortlet": [["Booking confirmation", "Payment received", "Send check-in guide + location"], ["Pre-arrival", "1 day before check-in", "Ask arrival time, offer pickup"], ["Post-stay review", "Checkout", "Request review + return discount"]],
};
const automationIdeas: ToolDef = {
  kind: "generator",
  intro: "Pick the business type and the tools they use. You get automation ideas with trigger → action and estimated time saved.",
  fields: [
    { key: "type", label: "Business type", type: "select", default: "Online store", options: bizTypes },
    { key: "tools", label: "Tools they use", type: "multi", default: ["WhatsApp", "Google Sheets", "Paystack"], options: opts("WhatsApp", "Google Sheets", "Gmail", "Paystack", "Instagram", "Google Calendar", "Notion", "Airtable") },
  ],
  generate(v) {
    const list = ideas[s(v, "type")] ?? ideas["Online store"];
    const tools = arr(v, "tools");
    const rows = list.map(([name, trig, act], i) => [name, trig, act, `${[3, 2, 1][i] ?? 1}–${[5, 4, 2][i] ?? 2} hrs/week`]);
    return [
      { type: "table", title: `Automations for a ${s(v, "type").toLowerCase()}`, columns: ["Automation", "Trigger", "Action", "Time saved"], rows },
      { type: "notice", tone: "info", text: `Build with: ${tools.length ? tools.join(", ") : "their existing tools"} connected through Make or Zapier. Start with the first one — it pays back fastest.` },
    ];
  },
};

// ---------- Zapier / Make Scenario Planner ----------
const scenarioPlanner: ToolDef = {
  kind: "generator",
  intro: "Describe the trigger and steps. You get a step-by-step scenario plan, the data you need to map, and error handling.",
  fields: [
    { key: "platform", label: "Platform", type: "select", default: "Make", options: opts("Make", "Zapier", "n8n") },
    { key: "trigger", label: "Trigger (when…)", type: "text", default: "A new row is added to the 'Orders' Google Sheet" },
    { key: "steps", label: "Then… (one step per line)", type: "textarea", default: "Look up the customer in Airtable\nSend WhatsApp confirmation with order number\nIf total > ₦50,000, notify the owner on Slack\nMark the row as 'Confirmed'", rows: 5 },
    { key: "volume", label: "Runs per month", type: "number", default: 600, min: 1 },
  ],
  generate(v) {
    const steps = lines(s(v, "steps"));
    if (!steps.length) return [{ type: "notice", tone: "warn", text: "Add at least one step." }];
    const plat = s(v, "platform");
    const ops = n(v, "volume") * (steps.length + 1);
    const flow = [{ label: `Trigger: ${or(s(v, "trigger"), "…")}`, detail: "Test with one real sample record first." }, ...steps.map((x) => ({ label: x, detail: /if |when |only /i.test(x) ? `Use a ${plat === "Zapier" ? "Filter/Paths" : plat === "Make" ? "Router + filter" : "IF node"} step` : undefined }))];
    const blocks: Block[] = [
      { type: "flow", title: `${plat} scenario (${steps.length + 1} modules)`, steps: flow },
      { type: "stats", items: [{ label: plat === "Zapier" ? "Tasks / month" : plat === "Make" ? "Operations / month" : "Executions", value: ops.toLocaleString(), sub: plat === "n8n" ? "self-hosted: no per-run cost" : "check your plan's limit" }, { label: "Modules", value: String(steps.length + 1) }] },
      { type: "list", title: "Before you switch it on", items: [
        "Map every field explicitly (name, phone, amount, order ID) — don't rely on defaults.",
        "Format phone numbers to +234… before sending WhatsApp messages.",
        `Add an error handler: ${plat === "Make" ? "right-click a module → Add error handler → Email the owner" : plat === "Zapier" ? "Zap settings → Error notifications on" : "Error Trigger workflow → notify"}.`,
        "Add a 'processed' column so the same record never runs twice.",
        "Run 5 test records end-to-end before going live.",
      ] },
    ];
    return blocks;
  },
};

// ---------- Business Process Audit ----------
const processAudit: ToolDef = {
  kind: "generator",
  intro: "List the business's recurring tasks. Each line: task | hours per week | how repetitive (1–5). You get a ranked automation shortlist.",
  fields: [
    { key: "tasks", label: "Tasks", type: "textarea", rows: 7, default: "Replying to 'how much?' WhatsApp messages | 8 | 5\nTyping orders into Excel | 5 | 5\nSending payment reminders | 3 | 5\nPosting on Instagram | 4 | 3\nPreparing weekly sales report | 2 | 4\nHiring new staff | 2 | 1" },
    { key: "rate", label: "Staff cost per hour", type: "number", default: 1500, suffix: "₦/hr", half: true },
    { key: "weeks", label: "Working weeks / year", type: "number", default: 50, half: true },
  ],
  generate(v) {
    const rows = lines(s(v, "tasks")).map((l) => {
      const [task, h, r] = l.split("|").map((x) => x.trim());
      const hours = Math.max(0, Number(h) || 0);
      const rep = Math.min(5, Math.max(1, Number(r) || 3));
      return { task: task || "Task", hours, rep, score: hours * rep };
    });
    if (!rows.length) return [{ type: "notice", tone: "warn", text: "Add at least one task: name | hours/week | repetitiveness 1–5" }];
    rows.sort((a, b) => b.score - a.score);
    const rate = n(v, "rate"), weeks = n(v, "weeks") || 50;
    const table = rows.map((r) => {
      const saveable = r.hours * (r.rep / 5) * 0.8;
      return [r.task, `${r.hours}h`, `${r.rep}/5`, r.rep >= 4 ? "Automate" : r.rep === 3 ? "Assist with AI" : "Keep manual", `${saveable.toFixed(1)}h/wk · ${naira(saveable * rate * weeks)}/yr`];
    });
    const totalH = rows.reduce((x, r) => x + r.hours * (r.rep / 5) * 0.8, 0);
    return [
      { type: "stats", items: [{ label: "Hours saved / week", value: totalH.toFixed(1) }, { label: "Value / year", value: naira(totalH * rate * weeks) }] },
      { type: "table", title: "Ranked: automate from the top", columns: ["Task", "Hours", "Repetitive", "Verdict", "Potential saving"], rows: table },
    ];
  },
};

// ---------- Email Autoresponder Script Generator ----------
const autoresponder: ToolDef = {
  kind: "generator",
  intro: "Pick the situation. You get the auto-reply plus a short follow-up sequence, ready for Gmail, Mailchimp or Brevo.",
  fields: [
    { key: "business", label: "Business", type: "text", default: "PixelHouse Studio" },
    { key: "type", label: "Situation", type: "select", default: "New enquiry", options: opts("New enquiry", "New customer welcome", "Out of office", "Order received", "Abandoned quote") },
    { key: "reply", label: "Reply time", type: "text", default: "within 4 working hours" },
    { key: "link", label: "Link to include", type: "text", default: "https://pixelhouse.ng/portfolio" },
    { key: "name", label: "Signed by", type: "text", default: "Tunde, PixelHouse" },
  ],
  generate(v) {
    const b = or(s(v, "business"), "our team"), link = s(v, "link"), sig = or(s(v, "name"), b), t = s(v, "type");
    const mail: Record<string, { subject: string; body: string; seq: string[] }> = {
      "New enquiry": { subject: `Thanks for contacting ${b}`, body: `Hi {{first_name}},\n\nThanks for reaching out — we've got your message and will reply ${s(v, "reply")}.\n\nWhile you wait, here's some of our recent work: ${link}\n\nIf it's urgent, reply to this email with "URGENT" in the subject.\n\n${sig}`, seq: ["Day 2: Case study relevant to their enquiry", "Day 5: 'Did you get what you needed?' check-in"] },
      "New customer welcome": { subject: `Welcome to ${b} 🎉`, body: `Hi {{first_name}},\n\nWelcome aboard! Here's what happens next:\n1. We'll send your onboarding form today\n2. Kick-off call within 2 working days\n3. First draft within the agreed timeline\n\nUseful link: ${link}\n\n${sig}`, seq: ["Day 1: Onboarding form reminder", "Day 7: Progress update", "Day 30: Review request"] },
      "Out of office": { subject: "Out of office", body: `Hi,\n\nThanks for your email. I'm away and will reply ${s(v, "reply")}.\n\nFor urgent matters, please message us on WhatsApp.\n\n${sig}`, seq: [] },
      "Order received": { subject: `Order {{order_id}} confirmed — ${b}`, body: `Hi {{first_name}},\n\nThanks for your order! We've received payment of {{amount}} and are preparing it now.\n\nTrack or manage your order: ${link}\n\n${sig}`, seq: ["When shipped: tracking details", "3 days after delivery: review request"] },
      "Abandoned quote": { subject: "Still thinking it over?", body: `Hi {{first_name}},\n\nI sent over your quote a few days ago. Any questions I can answer?\n\nYou can see it again here: ${link}\n\nIf the timing isn't right, no problem — just let me know.\n\n${sig}`, seq: ["Day 7: Offer a quick call", "Day 14: Close the loop politely"] },
    };
    const m = mail[t] ?? mail["New enquiry"];
    const out: Block[] = [{ type: "text", title: `Auto-reply — ${t}`, text: `Subject: ${m.subject}\n\n${m.body}` }];
    if (m.seq.length) out.push({ type: "flow", title: "Follow-up sequence", steps: m.seq.map((x) => ({ label: x })) });
    out.push({ type: "notice", tone: "info", text: "{{first_name}}-style tags work in Mailchimp and Brevo; in Gmail replace them before saving the template." });
    return out;
  },
};

// ---------- Automation ROI Calculator ----------
const roiCalc: ToolDef = {
  kind: "generator",
  intro: "Enter the time a task takes today and what the automation costs. You get payback time and yearly savings to show the client.",
  fields: [
    { key: "hours", label: "Hours spent per week on the task", type: "number", default: 10, min: 0, step: 0.5, half: true },
    { key: "rate", label: "Cost of that time", type: "number", default: 2000, suffix: "₦/hr", half: true },
    { key: "cut", label: "Share of work automated", type: "number", default: 80, min: 0, max: 100, suffix: "%", half: true },
    { key: "errors", label: "Errors avoided / month (value)", type: "number", default: 20000, suffix: "₦", half: true },
    { key: "setup", label: "Your setup fee", type: "number", default: 250000, suffix: "₦", half: true },
    { key: "monthly", label: "Monthly tool + maintenance", type: "number", default: 25000, suffix: "₦", half: true },
  ],
  generate(v) {
    const weekly = n(v, "hours") * n(v, "rate") * (Math.min(100, Math.max(0, n(v, "cut"))) / 100);
    const monthlyGain = weekly * 4.33 + n(v, "errors");
    const net = monthlyGain - n(v, "monthly");
    const payback = net > 0 ? n(v, "setup") / net : Infinity;
    const year1 = net * 12 - n(v, "setup");
    const roi = n(v, "setup") > 0 ? (year1 / n(v, "setup")) * 100 : 0;
    const blocks: Block[] = [
      { type: "stats", items: [
        { label: "Saved per month", value: naira(monthlyGain), sub: `${(n(v, "hours") * 4.33 * n(v, "cut") / 100).toFixed(0)} hours back` },
        { label: "Payback", value: Number.isFinite(payback) ? `${payback < 1 ? "<1" : payback.toFixed(1)} months` : "Never", sub: "time to earn back the setup fee" },
        { label: "Year-1 net gain", value: naira(year1) },
        { label: "Year-1 ROI", value: `${roi.toFixed(0)}%` },
      ] },
      { type: "text", title: "Client pitch line", text: net > 0 ? `This automation saves you about ${naira(monthlyGain)} a month. After tools, that's ${naira(net)} back every month — it pays for itself in ${Number.isFinite(payback) ? payback.toFixed(1) : "—"} months, then keeps saving.` : "At these numbers the automation costs more than it saves — automate a bigger task or lower the monthly cost." },
    ];
    if (net <= 0) blocks.push({ type: "notice", tone: "warn", text: "Monthly costs exceed savings. Reduce tool costs or pick a task with more hours." });
    return blocks;
  },
};

// ---------- MCP Server Picker ----------
const mcpCatalog: { name: string; for: string[]; does: string; docs: string }[] = [
  { name: "Filesystem (reference server)", for: ["Files & documents"], does: "Read and write files in folders you allow", docs: "github.com/modelcontextprotocol/servers" },
  { name: "Fetch (reference server)", for: ["Web research"], does: "Fetch web pages and convert them to readable text", docs: "github.com/modelcontextprotocol/servers" },
  { name: "Memory (reference server)", for: ["Customer knowledge"], does: "A simple knowledge graph the AI can remember facts in", docs: "github.com/modelcontextprotocol/servers" },
  { name: "GitHub", for: ["Websites & code"], does: "Read repos, open issues and pull requests", docs: "github.com/github/github-mcp-server" },
  { name: "Playwright", for: ["Web research", "Websites & code"], does: "Control a browser: test sites, fill forms, take screenshots", docs: "github.com/microsoft/playwright-mcp" },
  { name: "Supabase", for: ["Databases", "Websites & code"], does: "Query and manage a Supabase Postgres database", docs: "supabase.com/docs/guides/getting-started/mcp" },
  { name: "Stripe", for: ["Payments"], does: "Look up customers, payments and create payment links", docs: "docs.stripe.com/mcp" },
  { name: "Notion", for: ["Files & documents", "Customer knowledge"], does: "Search and update Notion pages and databases", docs: "developers.notion.com" },
  { name: "Google Drive / Workspace connectors", for: ["Files & documents", "Email & calendar"], does: "Search Docs, Sheets and Drive; read mail and calendar (via your AI app's connectors)", docs: "your AI app's connector settings" },
  { name: "Slack", for: ["Team chat"], does: "Read and post messages in channels", docs: "check your AI app's connector directory" },
];
const mcpPicker: ToolDef = {
  kind: "generator",
  intro: "Pick what the business needs its AI to reach. You get the MCP servers to connect, and where to find setup docs.",
  fields: [{ key: "needs", label: "The AI needs to…", type: "multi", default: ["Files & documents", "Web research", "Payments"], options: opts("Files & documents", "Web research", "Websites & code", "Databases", "Payments", "Email & calendar", "Customer knowledge", "Team chat") }],
  generate(v) {
    const needs = arr(v, "needs");
    const hits = mcpCatalog.filter((m) => m.for.some((f) => needs.includes(f)));
    if (!hits.length) return [{ type: "notice", tone: "warn", text: "Pick at least one need." }];
    return [
      { type: "table", title: `${hits.length} servers to consider`, columns: ["Server", "What it does", "Setup docs"], rows: hits.map((m) => [m.name, m.does, m.docs]) },
      { type: "notice", tone: "warn", text: "Only connect servers from sources you trust, give them the least access they need, and keep API keys out of shared files." },
    ];
  },
};

export const defs: Record<string, ToolDef> = {
  "automation-idea-generator": automationIdeas,
  "zapier-make-scenario-planner": scenarioPlanner,
  "business-process-audit": processAudit,
  "email-autoresponder-generator": autoresponder,
  "automation-roi-calculator": roiCalc,
  "mcp-server-picker": mcpPicker,
};
