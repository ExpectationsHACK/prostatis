import { arr, lines, n, naira, on, opts, or, s, type Block, type ToolDef } from "./types";

const bizTypes = opts("Salon / barber", "Clinic / dentist", "Restaurant / food vendor", "Gym / fitness", "Hotel / shortlet", "Tutor / school", "Photographer / studio", "Consultant / coach", "Car wash / auto", "Event venue", "Fashion / boutique", "Real estate agent");

// ---------- Business Website Requirements Questionnaire ----------
const requirements: ToolDef = {
  kind: "generator",
  intro: "Walk through this with a client. You get a requirements doc, a page list and a feature scope you can price.",
  fields: [
    { key: "client", label: "Business name", type: "text", default: "FitZone Gym Ikeja" },
    { key: "type", label: "Business type", type: "select", default: "Gym / fitness", options: bizTypes },
    { key: "has", label: "They already have", type: "multi", default: ["Instagram", "WhatsApp Business"], options: opts("Domain", "Old website", "Logo", "Instagram", "WhatsApp Business", "Google Business Profile", "Professional photos") },
    { key: "features", label: "Features needed", type: "multi", default: ["WhatsApp chat button", "Booking / appointments", "Payments (Paystack)", "Google Maps"], options: opts("WhatsApp chat button", "Contact form", "Booking / appointments", "Payments (Paystack)", "Online store", "Blog", "Gallery", "Reviews widget", "Google Maps", "Multi-language", "Member login", "Newsletter signup") },
    { key: "pages", label: "Number of pages", type: "number", default: 5, min: 1, max: 40, half: true },
    { key: "launch", label: "Launch by", type: "text", default: "End of the month", half: true },
    { key: "notes", label: "Notes from the call", type: "textarea", default: "Wants class timetable on the home page.\nPeak sign-ups in January.", rows: 3 },
  ],
  generate(v) {
    const feats = arr(v, "features"), has = arr(v, "has");
    const missing = ["Domain", "Logo", "Professional photos", "Google Business Profile"].filter((x) => !has.includes(x));
    const complexity = feats.filter((f) => /Booking|Payments|store|login|Multi/i.test(f)).length;
    const days = Math.max(3, Math.round(n(v, "pages") * 0.6 + complexity * 2.5 + 2));
    const doc = `REQUIREMENTS — ${or(s(v, "client"), "Client")} (${s(v, "type")})

PAGES: ${n(v, "pages")}
FEATURES (${feats.length}):
${feats.map((f) => "- [ ] " + f).join("\n") || "- none selected"}

CLIENT ALREADY HAS: ${has.join(", ") || "nothing yet"}
WE NEED TO SET UP: ${missing.join(", ") || "nothing extra"}

LAUNCH: ${s(v, "launch")}
NOTES:
${lines(s(v, "notes")).map((x) => "- " + x).join("\n") || "- none"}

CONTENT CHECKLIST (client to send):
- [ ] Logo (SVG or high-res PNG)
- [ ] 10–20 photos of the business, team and work
- [ ] Services / products with prices
- [ ] Opening hours, address, phone, WhatsApp number
- [ ] 3+ customer testimonials
- [ ] Social media links

OUT OF SCOPE unless agreed: copywriting beyond page headings, paid ads, ongoing content.`;
    return [
      { type: "stats", items: [{ label: "Estimated build", value: `${days} days`, sub: "with AI, first version" }, { label: "Complexity", value: complexity >= 3 ? "High" : complexity >= 1 ? "Medium" : "Low", sub: `${complexity} advanced feature${complexity === 1 ? "" : "s"}` }] },
      { type: "text", title: "Requirements document", text: doc, filename: "requirements.txt" },
    ];
  },
};

// ---------- Booking System Feature Picker ----------
const bookingNeeds: Record<string, { must: string[]; nice: string[]; tools: string }> = {
  "Salon / barber": { must: ["Service menu with durations", "Pick stylist", "Time slots", "Deposit to confirm", "WhatsApp/SMS reminder"], nice: ["Loyalty stamps", "Rebook in one tap"], tools: "Cal.com / custom Next.js + Paystack deposit" },
  "Clinic / dentist": { must: ["Doctor + department", "Appointment slots", "Patient details form", "Reminders", "Reschedule/cancel link"], nice: ["HMO/insurance field", "Telehealth link"], tools: "Cal.com (self-hosted) or custom with Supabase" },
  "Restaurant / food vendor": { must: ["Table booking by party size", "Time slots", "Special requests"], nice: ["Pre-order menu", "Deposit for large groups"], tools: "Custom form → WhatsApp + Google Sheet" },
  "Gym / fitness": { must: ["Class timetable", "Spots per class", "Membership check", "Waitlist"], nice: ["Trainer profiles", "Monthly pass via Paystack"], tools: "Custom Next.js + Supabase + Paystack subscriptions" },
  "Hotel / shortlet": { must: ["Date range picker", "Room types + availability", "Full or part payment", "Check-in instructions email"], nice: ["Airport pickup add-on", "Promo codes"], tools: "Custom with availability table + Paystack" },
  "Tutor / school": { must: ["Subject + level", "Session length", "Recurring bookings", "Parent contact"], nice: ["Online class link", "Package of 10 sessions"], tools: "Cal.com + Paystack payment links" },
  "Photographer / studio": { must: ["Package selection", "Date + location", "Deposit", "Contract acceptance"], nice: ["Mood board upload", "Gallery delivery link"], tools: "Custom form + Paystack + e-signature" },
  "Consultant / coach": { must: ["Call type + length", "Calendar sync", "Pay before booking", "Video link auto-created"], nice: ["Intake questionnaire", "Package credits"], tools: "Cal.com + Stripe/Paystack" },
  "Car wash / auto": { must: ["Service + vehicle type", "Slot booking", "Location (home service)"], nice: ["Subscription washes", "Before/after photos"], tools: "Custom form → WhatsApp confirmation" },
  "Event venue": { must: ["Date availability", "Guest count", "Package + add-ons", "Deposit + balance schedule"], nice: ["Virtual tour", "Vendor list"], tools: "Custom with calendar + Paystack instalments" },
  "Fashion / boutique": { must: ["Fitting appointment", "Measurements form", "Deposit for custom orders"], nice: ["Fabric selection", "Pickup/delivery choice"], tools: "Custom form + Paystack" },
  "Real estate agent": { must: ["Property inspection slots", "Buyer details", "Location + directions"], nice: ["Virtual inspection option", "Mortgage enquiry"], tools: "Cal.com + WhatsApp" },
};
const bookingPicker: ToolDef = {
  kind: "generator",
  intro: "Pick the business type. You get the booking features that matter, what to skip, and a build prompt.",
  fields: [
    { key: "type", label: "Business type", type: "select", default: "Salon / barber", options: bizTypes },
    { key: "volume", label: "Bookings per week", type: "select", default: "20–100", options: opts("Under 20", "20–100", "100+") },
    { key: "noshow", label: "No-shows are a problem", type: "toggle", default: true },
  ],
  generate(v) {
    const need = bookingNeeds[s(v, "type")] ?? bookingNeeds["Salon / barber"];
    const must = [...need.must];
    if (on(v, "noshow") && !must.some((m) => /deposit|pay/i.test(m))) must.push("Deposit or card hold to reduce no-shows");
    if (s(v, "volume") === "100+") must.push("Staff dashboard with day view", "Automatic reminders 24h and 2h before");
    const prompt = `Build a booking system for a ${s(v, "type").toLowerCase()} in Nigeria.\nMust have:\n${must.map((m) => "- " + m).join("\n")}\nNice to have (phase 2):\n${need.nice.map((m) => "- " + m).join("\n")}\nTimes in Africa/Lagos (WAT). Prices in Naira. Mobile-first. Confirmation sent on WhatsApp.`;
    return [
      { type: "table", title: "Feature plan", columns: ["Feature", "Priority"], rows: [...must.map((m) => [m, "Must have"]), ...need.nice.map((m) => [m, "Phase 2"])] },
      { type: "notice", tone: "info", text: `Suggested approach: ${need.tools}` },
      { type: "text", title: "Build prompt", text: prompt },
    ];
  },
};

// ---------- WhatsApp Catalog Setup Guide Generator ----------
const waCatalog: ToolDef = {
  kind: "generator",
  intro: "List the products or services. You get catalog-ready item text, a setup guide and share messages.",
  fields: [
    { key: "business", label: "Business", type: "text", default: "Ada's Bakery" },
    { key: "items", label: "Items (one per line: name | price | short description)", type: "textarea", default: "Chocolate cake (8 inch) | 18000 | Moist, rich, serves 12\nMeat pie (box of 6) | 4500 | Freshly baked every morning\nSmall chops tray | 25000 | For 20 guests, puff-puff, samosa, spring rolls", rows: 5 },
    { key: "delivery", label: "Delivery info", type: "text", default: "Delivery across Lagos Mainland, 24h notice for cakes" },
  ],
  generate(v) {
    const items = lines(s(v, "items")).map((l) => {
      const [name, price, desc] = l.split("|").map((x) => x.trim());
      const p = Number((price ?? "").replace(/[^\d.]/g, ""));
      return { name: name || "Item", price: Number.isFinite(p) && p > 0 ? naira(p) : "Price on request", desc: desc || "" };
    });
    if (!items.length) return [{ type: "notice", tone: "warn", text: "Add at least one item: name | price | description" }];
    const catalog = items.map((it) => `Name: ${it.name}\nPrice: ${it.price}\nDescription: ${[it.desc, s(v, "delivery")].filter(Boolean).join(". ").slice(0, 500)}\nLink: (optional — your website product page)`);
    const guide = [
      { label: "Open WhatsApp Business → Tools → Catalog", detail: "Catalog needs the WhatsApp Business app, not regular WhatsApp." },
      { label: "Add new item for each product", detail: "Upload 1–3 bright photos on a plain background." },
      { label: "Paste name, price and description", detail: "Use the item text generated here." },
      { label: "Group items into Collections", detail: "e.g. Cakes, Pastries, Party trays." },
      { label: "Share the catalog link", detail: "On your status, Instagram bio and website." },
    ];
    return [
      { type: "list", title: `Catalog items (${items.length})`, items: catalog },
      { type: "flow", title: "Setup steps", steps: guide },
      { type: "list", title: "Share messages", items: [`Our full menu is on WhatsApp now 🛍️ Tap to browse ${s(v, "business")}'s catalog and order in seconds: [catalog link]`, `New this week at ${s(v, "business")}: ${items[0].name} — ${items[0].price}. Order here: [catalog link]`] },
    ];
  },
};

// ---------- Landing Page Copy Generator ----------
const landingCopy: ToolDef = {
  kind: "generator",
  intro: "Fill in the offer. You get full landing page copy, section by section, ready to paste into your build.",
  fields: [
    { key: "product", label: "Offer", type: "text", default: "3-month weight-loss coaching" },
    { key: "audience", label: "For whom", type: "text", default: "busy mums in Abuja" },
    { key: "pain", label: "Their main problem", type: "text", default: "no time for the gym and diets that don't fit Nigerian food" },
    { key: "outcome", label: "The result", type: "text", default: "lose 8kg eating the food you love" },
    { key: "benefits", label: "Benefits (one per line)", type: "textarea", default: "Meal plans built on Nigerian food\n20-minute home workouts\nWeekly WhatsApp check-ins", rows: 3 },
    { key: "price", label: "Price", type: "text", default: "₦120,000", half: true },
    { key: "guarantee", label: "Guarantee", type: "text", default: "Full refund in 14 days", half: true },
    { key: "cta", label: "Button text", type: "text", default: "Start my plan" },
  ],
  generate(v) {
    const out = or(s(v, "outcome"), "the result you want"), aud = or(s(v, "audience"), "you"), cta = or(s(v, "cta"), "Get started");
    const bens = lines(s(v, "benefits"));
    const copy = `HERO
Headline: ${out.charAt(0).toUpperCase() + out.slice(1)} — without ${or(s(v, "pain"), "the usual struggle")}.
Subhead: ${or(s(v, "product"), "Our programme")} for ${aud}.
Button: ${cta}

PROBLEM
You've tried before. But ${or(s(v, "pain"), "the usual approach")} makes it hard to stick with. It isn't you — it's the method.

SOLUTION
${or(s(v, "product"), "This programme")} is built for ${aud}, so it fits your life instead of fighting it.

BENEFITS
${bens.map((b) => "✓ " + b).join("\n") || "✓ Add your benefits"}

HOW IT WORKS
1. Sign up and tell us your goals
2. Get your plan within 24 hours
3. Follow it and check in weekly

PROOF
[Add 3 real testimonials with name, photo and result]

OFFER
${or(s(v, "product"), "The programme")} — ${or(s(v, "price"), "[price]")}
Button: ${cta}

GUARANTEE
${or(s(v, "guarantee"), "[Your guarantee]")}. No risk to try.

FAQ
- How soon will I see results?
- What if I miss a week?
- How do I pay? (Card, transfer or USSD via Paystack)

FINAL CALL
Ready to ${out}? ${cta} →`;
    return [{ type: "text", title: "Landing page copy", text: copy, filename: "landing-copy.txt" }];
  },
};

// ---------- Pricing Page Layout Picker ----------
const pricingLayout: ToolDef = {
  kind: "generator",
  intro: "Answer three questions. You get the pricing layout that converts best for your offer, and a build prompt.",
  fields: [
    { key: "tiers", label: "How many packages?", type: "select", default: "3", options: opts("1", "2", "3", "4+") },
    { key: "billing", label: "Billing", type: "select", default: "One-time", options: opts("One-time", "Monthly", "Monthly + yearly", "Custom quote") },
    { key: "buyer", label: "Who buys?", type: "select", default: "Small businesses", options: opts("Individuals", "Small businesses", "Companies") },
  ],
  generate(v) {
    const t = s(v, "tiers"), b = s(v, "billing");
    let layout: string, sections: string[];
    if (b === "Custom quote") { layout = "Package overview + quote form"; sections = ["What's included in every project", "Example packages with 'from' prices", "Quote request form", "Process timeline", "FAQ"]; }
    else if (t === "1") { layout = "Single offer card"; sections = ["One large card with price", "Everything included (checklist)", "Guarantee", "Testimonials", "FAQ"]; }
    else if (t === "4+") { layout = "Comparison table"; sections = ["Tier cards (top 3)", "Full feature comparison table", "Enterprise / custom row", "FAQ"]; }
    else { layout = `${t}-column tier cards, middle highlighted`; sections = [`${t} tier cards — highlight the one you want sold`, "Feature checklist per tier", "Add-ons", "Testimonials", "FAQ"]; }
    if (b === "Monthly + yearly") sections.splice(0, 0, "Monthly / yearly toggle (show yearly saving)");
    return [
      { type: "wireframe", title: `Recommended: ${layout}`, sections: ["Header", ...sections] },
      { type: "list", title: "Conversion rules", items: [
        "Put the tier you want to sell in the middle and label it 'Most popular'.",
        s(v, "buyer") === "Individuals" ? "Show a monthly equivalent price even for one-time offers." : "Name tiers by business size or outcome, not Bronze/Silver/Gold.",
        "Show prices in Naira for local clients and USD for foreign clients — never both on one card.",
        "One button per card, same wording on every card.",
      ] },
      { type: "text", title: "Build prompt", text: `Build a pricing section: ${layout}. Sections: ${sections.join("; ")}. Mobile: cards stack with the highlighted tier first. Accessible, Tailwind CSS.` },
    ];
  },
};

// ---------- FAQ Section Generator ----------
const faqBank: Record<string, [string, string][]> = {
  price: [["How much does it cost?", "{price}. You'll see the full price before you pay — no hidden fees."], ["How do I pay?", "Card, bank transfer or USSD through Paystack. We send a receipt immediately."]],
  time: [["How long does it take?", "{time}. We'll confirm your exact date when you book."], ["Can you do it faster?", "Rush delivery is available for an extra fee when our schedule allows."]],
  trust: [["Why should I choose you?", "{proof}. Every project comes with {guarantee}."], ["Can I see previous work?", "Yes — see our gallery, or ask us on WhatsApp for examples like yours."]],
  delivery: [["Do you deliver / serve my area?", "We serve {area}. Message us if you're outside it."], ["What if I'm not happy?", "{guarantee}. Tell us within 7 days and we'll make it right."]],
  contact: [["How do I get in touch?", "Tap the WhatsApp button — we reply within working hours ({hours})."]],
};
const faqGen: ToolDef = {
  kind: "generator",
  intro: "Fill in the facts once. You get a FAQ that handles objections, plus the SEO schema Google reads.",
  fields: [
    { key: "business", label: "Business", type: "text", default: "SwiftFix Phone Repairs" },
    { key: "price", label: "Price answer", type: "text", default: "Screen repairs start from ₦25,000", half: true },
    { key: "time", label: "Time answer", type: "text", default: "Most repairs take 1–2 hours", half: true },
    { key: "proof", label: "Proof", type: "text", default: "Over 2,000 phones repaired since 2019" },
    { key: "guarantee", label: "Guarantee", type: "text", default: "a 90-day warranty" },
    { key: "area", label: "Area served", type: "text", default: "Ikeja, Yaba and Surulere", half: true },
    { key: "hours", label: "Hours", type: "text", default: "Mon–Sat, 9am–7pm", half: true },
    { key: "topics", label: "Include", type: "multi", default: ["price", "time", "trust", "delivery", "contact"], options: [{ value: "price", label: "Price & payment" }, { value: "time", label: "Timing" }, { value: "trust", label: "Trust" }, { value: "delivery", label: "Area & guarantee" }, { value: "contact", label: "Contact" }] },
  ],
  generate(v) {
    const fill = (x: string) => x.replace(/\{(\w+)\}/g, (_, k) => or(s(v, k), `[${k}]`));
    const qa = arr(v, "topics").flatMap((t) => faqBank[t] ?? []).map(([q, a]) => [q, fill(a)] as [string, string]);
    if (!qa.length) return [{ type: "notice", tone: "warn", text: "Pick at least one topic to include." }];
    const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }, null, 2);
    return [
      { type: "list", title: `FAQ (${qa.length})`, items: qa.map(([q, a]) => `Q: ${q}\nA: ${a}`) },
      { type: "text", title: "FAQPage schema (paste in <script type=\"application/ld+json\">)", text: schema, filename: "faq-schema.json" },
    ];
  },
};

// ---------- Testimonial Formatter ----------
const testimonialFormatter: ToolDef = {
  kind: "generator",
  intro: "Paste raw praise from WhatsApp, DMs or email. You get clean testimonials, a short pull-quote and review schema.",
  fields: [
    { key: "raw", label: "Raw message", type: "textarea", default: "omg thank u sooo much!!! the website is sweet 😍😍 we got 3 bookings the first week and my customers keep saying it looks v professional. God bless u", rows: 5 },
    { key: "name", label: "Customer name", type: "text", default: "Chioma O.", half: true },
    { key: "role", label: "Business / role", type: "text", default: "Owner, Chi's Lash Studio", half: true },
    { key: "rating", label: "Rating", type: "select", default: "5", options: opts("5", "4", "3") },
  ],
  generate(v) {
    const raw = s(v, "raw");
    if (!raw) return [{ type: "notice", tone: "warn", text: "Paste a message to format." }];
    let t = raw
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
      .replace(/([!?.])\1+/g, "$1")
      .replace(/\bu\b/gi, "you")
      .replace(/\bur\b/gi, "your")
      .replace(/\bv\b/gi, "very")
      .replace(/\bpls\b/gi, "please")
      .replace(/\bthx\b/gi, "thanks")
      .replace(/(\w)\1{2,}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    t = t
      .split(/(?<=[.!?])\s+/)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");
    if (!/[.!?]$/.test(t)) t += ".";
    const sentences = t.split(/(?<=[.!?])\s+/);
    const numeric = sentences.find((x) => /\d/.test(x));
    const pull = (numeric ?? sentences.sort((a, b) => b.length - a.length)[0] ?? t).replace(/[.!?]$/, "");
    const who = `${or(s(v, "name"), "Customer")}${s(v, "role") ? `, ${s(v, "role")}` : ""}`;
    const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: s(v, "rating"), bestRating: "5" }, author: { "@type": "Person", name: or(s(v, "name"), "Customer") }, reviewBody: t }, null, 2);
    const blocks: Block[] = [
      { type: "list", title: "Formatted", items: [`“${t}”\n— ${who}`, `“${pull}.”\n— ${who}`, `${"★".repeat(Number(s(v, "rating")) || 5)} “${pull}.” — ${or(s(v, "name"), "Customer")}`] },
      { type: "text", title: "Review schema", text: schema },
      { type: "notice", tone: "info", text: "Send the cleaned version to the customer and get a 'yes' before publishing it with their name." },
    ];
    return blocks;
  },
};

export const defs: Record<string, ToolDef> = {
  "website-requirements-questionnaire": requirements,
  "booking-feature-picker": bookingPicker,
  "whatsapp-catalog-guide": waCatalog,
  "landing-page-copy-generator": landingCopy,
  "pricing-layout-picker": pricingLayout,
  "faq-generator": faqGen,
  "testimonial-formatter": testimonialFormatter,
};
