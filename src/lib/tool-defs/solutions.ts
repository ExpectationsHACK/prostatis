import { renderSuggestions, type SuggestData } from "./suggest";
import { arr, lines, n, naira, on, opts, or, s, type Block, type ToolDef } from "./types";

const bizTypes = opts("Salon / barber", "Clinic / dentist", "Restaurant / food vendor", "Gym / fitness", "Hotel / shortlet", "Tutor / school", "Photographer / studio", "Consultant / coach", "Car wash / auto", "Event venue", "Fashion / boutique", "Real estate agent");

// ---------- Business Website Requirements Questionnaire ----------
const requirements: ToolDef = {
  kind: "generator",
  intro: "Walk through this with a client on a call. You get a requirements document, a suggested package, a build estimate and a ready message asking for their content.",
  examples: [
    { label: "Gym", values: { client: "FitZone Gym Ikeja", type: "Gym / fitness", has: ["Instagram", "WhatsApp Business"], features: ["WhatsApp chat button", "Booking / appointments", "Payments (Paystack)", "Google Maps"], pages: 5, launch: "End of the month", notes: "Wants class timetable on the home page.\nPeak sign-ups in January." } },
    { label: "Restaurant", values: { client: "Mama's Kitchen", type: "Restaurant / food vendor", has: ["Instagram", "WhatsApp Business", "Logo"], features: ["WhatsApp chat button", "Gallery", "Google Maps", "Reviews widget"], pages: 4, launch: "In 2 weeks", notes: "Menu changes weekly.\nDelivers within Ikeja only." } },
    { label: "Clinic", values: { client: "CarePoint Clinic", type: "Clinic / dentist", has: ["Domain", "Old website", "Google Business Profile"], features: ["Contact form", "Booking / appointments", "Google Maps", "Blog"], pages: 7, launch: "Next month", notes: "Old site is slow and not mobile friendly.\nWants doctors' profiles." } },
  ],
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
    const pkg = complexity >= 2 || feats.includes("Member login") ? "Complete (site + booking/store/app features)" : complexity === 1 ? "Growth (site + one web solution)" : "Starter (business website)";
    const client = or(s(v, "client"), "the business");
    const doc = `REQUIREMENTS: ${or(s(v, "client"), "Client")} (${s(v, "type")})

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
      { type: "notice", tone: "info", text: `Suggested package: ${pkg}. Price it with the Client Pricing Calculator, then attach this document to the proposal as the agreed scope.` },
      ...(feats.includes("Payments (Paystack)")
        ? [{ type: "notice" as const, tone: "warn" as const, text: "Payments: the business needs its own Paystack account in its name. An unregistered business can start as a Paystack Starter Business with the owner's BVN, ID and bank account." }]
        : []),
      {
        type: "text",
        title: "Send this to the client today (WhatsApp)",
        text: `Hi! Thanks for the call. To start ${client}'s website I'll need:\n\n1. Your logo\n2. 10–20 clear photos (the place, the team, your work)\n3. Your services/products with prices\n4. Opening hours, address, phone and WhatsApp number\n5. 3 short reviews from happy customers (screenshots are fine)\n\nYou can send them here in one go. We're aiming to launch: ${s(v, "launch") || "[date]"}. 🙏`,
      },
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
  intro: "Pick the business type. You get the features that matter, what to skip, the simplest way to start this week, and a build prompt for later.",
  examples: [
    { label: "Salon", values: { type: "Salon / barber", volume: "20–100", noshow: true } },
    { label: "Clinic", values: { type: "Clinic / dentist", volume: "100+", noshow: true } },
    { label: "Coach", values: { type: "Consultant / coach", volume: "Under 20", noshow: false } },
    { label: "Shortlet", values: { type: "Hotel / shortlet", volume: "20–100", noshow: true } },
  ],
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
    const simple = /Hotel|Event|Gym/i.test(s(v, "type"))
      ? "These need availability rules a basic scheduler can't handle well. Start with a WhatsApp enquiry form + manual confirmation this week, then plan the custom build."
      : "Start this week with a free Cal.com scheduler embedded on a /book page, plus a Paystack Payment Page link for the deposit after booking. Upgrade to a custom build only when the business outgrows it.";
    const prompt = `Build a booking system for a ${s(v, "type").toLowerCase()} in Nigeria.\nMust have:\n${must.map((m) => "- " + m).join("\n")}\nNice to have (phase 2):\n${need.nice.map((m) => "- " + m).join("\n")}\nTimes in Africa/Lagos (WAT). Prices in Naira. Mobile-first. Confirmation sent on WhatsApp.`;
    return [
      { type: "table", title: "Feature plan", columns: ["Feature", "Priority"], rows: [...must.map((m) => [m, "Must have"]), ...need.nice.map((m) => [m, "Phase 2"])] },
      { type: "notice", tone: "good", text: `Simplest way to start: ${simple}` },
      { type: "notice", tone: "info", text: `When it grows: ${need.tools}` },
      { type: "text", title: "Build prompt (custom version, for later)", text: prompt + "\nStore bookings in a database with a unique constraint so two people can never take the same slot. Mark a booking confirmed only after the Paystack deposit is verified on the server." },
      { type: "list", title: "Test before launch", items: ["Book a slot yourself on a phone.", "Try to book the same slot twice: it must be refused.", "Pay a deposit in Paystack test mode.", "Cancel or reschedule and check the slot opens again."] },
    ];
  },
};

// ---------- WhatsApp Catalog Setup Guide Generator ----------
const waCatalog: ToolDef = {
  kind: "generator",
  intro: "List the products or services. You get catalog-ready item text, step-by-step setup, a “price list” quick reply and share messages.",
  examples: [
    { label: "Bakery", values: { business: "Ada's Bakery", items: "Chocolate cake (8 inch) | 18000 | Moist, rich, serves 12\nMeat pie (box of 6) | 4500 | Freshly baked every morning\nSmall chops tray | 25000 | For 20 guests, puff-puff, samosa, spring rolls", delivery: "Delivery across Lagos Mainland, 24h notice for cakes" } },
    { label: "Boutique", values: { business: "Adire Shop", items: "Adire maxi dress | 25000 | Hand-dyed, sizes 8–18\nAnkara shirt (men) | 12500 | Short sleeve, sizes M–XXL\nTote bag | 8000 | Adire print, lined, with inner pocket", delivery: "Nationwide delivery in 2–5 days; Lagos same week" } },
    { label: "Salon services", values: { business: "Glow Beauty Studio", items: "Classic lash set | 25000 | Natural look, lasts 3–4 weeks\nVolume lash set | 35000 | Fuller look, lasts 3–4 weeks\nLash refill | 12000 | Within 3 weeks of your last set", delivery: "Book 24h ahead; ₦5,000 deposit confirms your slot" } },
  ],
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
    const unpriced = items.filter((it) => it.price === "Price on request").length;
    const catalog = items.map((it) => `Name: ${it.name}\nPrice: ${it.price}\nDescription: ${[it.desc, s(v, "delivery")].filter(Boolean).join(". ").slice(0, 500)}\nLink: (optional: your website product page)`);
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
      ...(unpriced ? [{ type: "notice" as const, tone: "warn" as const, text: `${unpriced} item${unpriced > 1 ? "s have" : " has"} no price. Customers buy faster when they can see prices, add them if you can.` }] : []),
      {
        type: "text",
        title: "Quick reply for “how much?” (save as /prices in WhatsApp Business)",
        text: `Thanks for asking! 😊 Here are our prices:\n${items.map((it) => `• ${it.name}: ${it.price}`).join("\n")}\n\nSee photos and order in our catalog: [catalog link]\n${s(v, "delivery")}`,
      },
      { type: "list", title: "Photo tips (phones are fine)", items: ["Daylight near a window: no flash.", "Plain background (a white sheet or wall).", "Fill the frame with the product; one item per photo.", "Show size or detail in a second photo."] },
      { type: "list", title: "Share messages", items: [`Our full menu is on WhatsApp now 🛍️ Tap to browse ${s(v, "business")}'s catalog and order in seconds: [catalog link]`, `New this week at ${s(v, "business")}: ${items[0].name}: ${items[0].price}. Order here: [catalog link]`] },
    ];
  },
};

// ---------- Landing Page Copy Generator ----------
const landingCopy: ToolDef = {
  kind: "generator",
  intro: "Fill in the offer. You get complete landing page copy, section by section, with headline options, ready to paste into your build.",
  examples: [
    { label: "Coaching programme", values: { product: "12-week weight-loss coaching", audience: "busy mums in Abuja", pain: "diets that don't fit Nigerian food", outcome: "lose weight eating the food you love", benefits: "Meal plans built on Nigerian food\n20-minute home workouts\nWeekly WhatsApp check-ins", steps: "Book a free call\nGet your personal plan\nCheck in every week", price: "₦120,000", guarantee: "Full refund within 14 days if it isn't for you", cta: "Start my plan" } },
    { label: "Bridal lashes", values: { product: "Bridal lash package", audience: "brides in Lekki and VI", pain: "lashes that look heavy in photos", outcome: "natural lashes that last your whole wedding day", benefits: "Trial session before the big day\nWe come to your venue\nTouch-up kit included", steps: "Book your trial\nChoose your style\nWe style you on the day", price: "₦85,000", guarantee: "", cta: "Book my bridal lashes" } },
    { label: "Online course", values: { product: "Excel for Business (online course)", audience: "small business owners", pain: "messy records and lost sales", outcome: "know your numbers in 15 minutes a week", benefits: "Ready-made templates\nShort videos you can watch on your phone\nLifetime access", steps: "Enrol and get instant access\nWatch one lesson a day\nUse the templates in your business", price: "₦25,000", guarantee: "Refund within 7 days", cta: "Enrol now" } },
  ],
  fields: [
    { key: "product", label: "Offer", type: "text", default: "12-week weight-loss coaching" },
    { key: "audience", label: "For whom", type: "text", default: "busy mums in Abuja" },
    { key: "pain", label: "What they're tired of", type: "text", default: "diets that don't fit Nigerian food", hint: "Write it so it fits: “Tired of …?”" },
    { key: "outcome", label: "The result they want", type: "text", default: "lose weight eating the food you love", hint: "Starts with a verb: “lose…”, “get…”, “stop…”" },
    { key: "benefits", label: "Benefits (one per line)", type: "textarea", default: "Meal plans built on Nigerian food\n20-minute home workouts\nWeekly WhatsApp check-ins", rows: 3 },
    { key: "steps", label: "How it works (3 steps, one per line)", type: "textarea", default: "Book a free call\nGet your personal plan\nCheck in every week", rows: 3, hint: "Only promise what the business really does." },
    { key: "price", label: "Price", type: "text", default: "₦120,000", half: true },
    { key: "guarantee", label: "Guarantee (optional)", type: "text", default: "Full refund within 14 days if it isn't for you", half: true },
    { key: "cta", label: "Button text", type: "text", default: "Start my plan" },
  ],
  generate(v) {
    const out = or(s(v, "outcome"), "get the result you want"), aud = or(s(v, "audience"), "you"), cta = or(s(v, "cta"), "Get started"), pain = s(v, "pain"), prod = or(s(v, "product"), "Our programme");
    const Out = out.charAt(0).toUpperCase() + out.slice(1);
    const bens = lines(s(v, "benefits"));
    const steps = lines(s(v, "steps"));
    const guarantee = s(v, "guarantee");
    const headlines = [`${Out}.`, `${Out}: made for ${aud}.`, ...(pain ? [`${Out}, without ${pain}.`] : []), `${prod} for ${aud}.`];
    const copy = `HERO
Headline: ${headlines[0]}
Subhead: ${prod} for ${aud}.
Button: ${cta}

PROBLEM
${pain ? `Tired of ${pain}? You're not alone, and it isn't your fault. Most solutions weren't built for ${aud}.` : `[Describe the problem in your customer's own words.]`}

SOLUTION
${prod} is built for ${aud}, so it fits your life instead of fighting it.

BENEFITS
${bens.map((b) => "✓ " + b).join("\n") || "✓ [Add your benefits]"}

HOW IT WORKS
${(steps.length ? steps : ["[Step 1]", "[Step 2]", "[Step 3]"]).map((x, i) => `${i + 1}. ${x}`).join("\n")}

PROOF
[Add 3 real reviews: first name, photo if allowed, and the result they got]

OFFER
${prod}: ${or(s(v, "price"), "[price]")}
Button: ${cta}
${guarantee ? `\nGUARANTEE\n${guarantee}.\n` : ""}
QUESTIONS
Q: How soon will I see results?
A: [An honest answer with a realistic timeframe]
Q: What if it doesn't work for me?
A: ${guarantee ? guarantee + "." : "[Your policy: be honest]"}
Q: How do I pay?
A: Card, bank transfer or USSD through Paystack. You get a receipt straight away.

FINAL CALL
Ready to ${out}? ${cta} →`;
    return [
      { type: "list", title: "Headline options (pick one, keep it under 10 words)", items: headlines.map((h) => `${h}  (${h.split(/\s+/).length} words)`) },
      { type: "text", title: "Landing page copy", text: copy, filename: "landing-copy.txt" },
      { type: "notice", tone: "warn", text: "Replace every [bracket] with something true before publishing, never invent reviews, results or numbers." },
    ];
  },
};

// ---------- Pricing Page Layout Picker ----------
const pricingLayout: ToolDef = {
  kind: "generator",
  intro: "Answer three questions. You get the pricing layout that suits your offer, the rules that make it convert, and a build prompt.",
  examples: [
    { label: "Web design packages", values: { tiers: "3", billing: "One-time", buyer: "Small businesses" } },
    { label: "Gym membership", values: { tiers: "3", billing: "Monthly + yearly", buyer: "Individuals" } },
    { label: "Event venue", values: { tiers: "1", billing: "Custom quote", buyer: "Individuals" } },
  ],
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
    else { layout = `${t}-column tier cards, middle highlighted`; sections = [`${t} tier cards: highlight the one you want sold`, "Feature checklist per tier", "Add-ons", "Testimonials", "FAQ"]; }
    if (b === "Monthly + yearly") sections.splice(0, 0, "Monthly / yearly toggle (show yearly saving)");
    return [
      { type: "wireframe", title: `Recommended: ${layout}`, sections: ["Header", ...sections] },
      { type: "list", title: "Conversion rules", items: [
        "Put the tier you want to sell in the middle and label it 'Most popular'.",
        s(v, "buyer") === "Individuals" ? "Show a monthly equivalent price even for one-time offers." : "Name tiers by business size or outcome, not Bronze/Silver/Gold.",
        "Show prices in Naira for local clients and USD for foreign clients, never both on one card.",
        "One button per card, same wording on every card.",
      ] },
      { type: "text", title: "Build prompt", text: `Build a pricing section: ${layout}. Sections: ${sections.join("; ")}. Mobile: cards stack with the highlighted tier first. Accessible, Tailwind CSS.` },
    ];
  },
};

// ---------- FAQ Section Generator ----------
const faqBank: Record<string, [string, string][]> = {
  price: [["How much does it cost?", "{price}. You'll see the full price before you pay, no hidden fees."], ["How do I pay?", "Card, bank transfer or USSD through Paystack. We send a receipt immediately."]],
  time: [["How long does it take?", "{time}. We'll confirm your exact date when you book."], ["Can you do it faster?", "Rush delivery is available for an extra fee when our schedule allows."]],
  trust: [["Why should I choose you?", "{proof}. Every project comes with {guarantee}."], ["Can I see previous work?", "Yes: see our gallery, or ask us on WhatsApp for examples like yours."]],
  delivery: [["Do you deliver / serve my area?", "We serve {area}. Message us if you're outside it."], ["What if I'm not happy?", "{guarantee}. Tell us within 7 days and we'll make it right."]],
  contact: [["How do I get in touch?", "Tap the WhatsApp button: we reply within working hours ({hours})."]],
};
const faqGen: ToolDef = {
  kind: "generator",
  intro: "Fill in the real facts once. You get a FAQ that answers the doubts that stop people buying, for the website, the chatbot and WhatsApp quick replies. Press “Get real questions” to see what else people ask Google.",
  live: {
    kind: "suggest",
    title: "What do people ask Google before buying this?",
    button: "Get real questions",
    note: "Uses “What you sell” and the area below. Answer the ones you can answer honestly.",
    payload: (v) => ({ service: s(v, "service"), location: s(v, "area").split(/,| and /)[0]?.trim() ?? "", mode: "questions" }),
    render: (d: SuggestData, v) => renderSuggestions(d, v),
  },
  examples: [
    { label: "Phone repairs", values: { service: "phone screen repair", business: "SwiftFix Phone Repairs", price: "Screen repairs start from ₦25,000", time: "Most repairs take 1–2 hours", proof: "Over 2,000 phones repaired since 2019", guarantee: "a 90-day warranty on every repair", area: "Ikeja, Yaba and Surulere", hours: "Mon–Sat, 9am–7pm", custom: "Do you use original parts? | Yes: original or top-grade parts, and we tell you which before we start." } },
    { label: "Caterer", values: { service: "event catering", business: "Kora Foods", price: "Party trays start from ₦45,000 for 20 guests", time: "Book at least 3 days ahead", proof: "We cater weddings, office events and birthdays every week", guarantee: "a full refund if we cancel", area: "Ikeja, Maryland and Ogba", hours: "Mon–Sun, 8am–8pm", custom: "Can I taste the food first? | Yes: tasting boxes are ₦5,000, deducted from your order." } },
    { label: "Tutor", values: { service: "home tutor", business: "Bright Minds Tutoring", price: "Lessons are ₦8,000 per hour", time: "Lessons are 1 or 2 hours, once or twice a week", proof: "Students from JSS1 to SS3, WAEC and JAMB", guarantee: "a free first lesson", area: "Online, and in person in Lekki", hours: "Mon–Sat, 3pm–8pm", custom: "" } },
  ],
  fields: [
    { key: "business", label: "Business", type: "text", default: "SwiftFix Phone Repairs", half: true },
    { key: "service", label: "What you sell (customers' words)", type: "text", default: "phone screen repair", half: true },
    { key: "price", label: "Price answer", type: "text", default: "Screen repairs start from ₦25,000", half: true },
    { key: "time", label: "Time answer", type: "text", default: "Most repairs take 1–2 hours", half: true },
    { key: "proof", label: "Proof", type: "text", default: "Over 2,000 phones repaired since 2019" },
    { key: "guarantee", label: "Guarantee", type: "text", default: "a 90-day warranty" },
    { key: "area", label: "Area served", type: "text", default: "Ikeja, Yaba and Surulere", half: true },
    { key: "hours", label: "Hours", type: "text", default: "Mon–Sat, 9am–7pm", half: true },
    { key: "custom", label: "Your own questions (optional, one per line: question | answer)", type: "textarea", default: "Do you use original parts? | Yes: original or top-grade parts, and we tell you which before we start.", rows: 3 },
    { key: "topics", label: "Include", type: "multi", default: ["price", "time", "trust", "delivery", "contact"], options: [{ value: "price", label: "Price & payment" }, { value: "time", label: "Timing" }, { value: "trust", label: "Trust" }, { value: "delivery", label: "Area & guarantee" }, { value: "contact", label: "Contact" }] },
  ],
  generate(v) {
    const fill = (x: string) => {
      const t = x.replace(/\{(\w+)\}/g, (_, k) => or(s(v, k), `[${k}]`));
      return t.charAt(0).toUpperCase() + t.slice(1);
    };
    const custom = lines(s(v, "custom"))
      .map((l) => l.split("|").map((x) => x.trim()))
      .filter(([q, a]) => q && a)
      .map(([q, a]) => [q.endsWith("?") ? q : q + "?", a] as [string, string]);
    const qa = [...arr(v, "topics").flatMap((t) => faqBank[t] ?? []).map(([q, a]) => [q, fill(a)] as [string, string]), ...custom];
    if (!qa.length) return [{ type: "notice", tone: "warn", text: "Pick at least one topic to include." }];
    const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }, null, 2);
    const kb = `# ${or(s(v, "business"), "Business")}: approved answers\n\n${qa.map(([q, a]) => `## ${q}\n${a}`).join("\n\n")}`;
    const missing = qa.filter(([, a]) => /\[\w+\]/.test(a)).length;
    return [
      { type: "list", title: `FAQ (${qa.length})`, items: qa.map(([q, a]) => `Q: ${q}\nA: ${a}`) },
      ...(missing ? [{ type: "notice" as const, tone: "warn" as const, text: `${missing} answer${missing > 1 ? "s have" : " has"} a missing fact in [brackets]: fill it in above.` }] : []),
      { type: "text", title: "Chatbot knowledge base (Markdown)", text: kb, filename: "faq-knowledge-base.md" },
      { type: "text", title: "FAQPage schema (optional)", text: schema, filename: "faq-schema.json" },
      { type: "notice", tone: "info", text: "Google no longer shows FAQ rich results for most business websites, so the schema is optional. The FAQ itself still matters: it answers visitors' doubts and helps AI search tools understand the business." },
    ];
  },
};

// ---------- Testimonial Formatter ----------
const testimonialFormatter: ToolDef = {
  kind: "generator",
  intro: "Paste raw praise from WhatsApp, DMs or email. You get clean testimonials, a short pull-quote, a permission request and website-ready code.",
  examples: [
    { label: "Website client", values: { raw: "omg thank u sooo much!!! the website is sweet 😍😍 we got 3 bookings the first week and my customers keep saying it looks v professional. God bless u", name: "Chioma O.", role: "Owner, Chi's Lash Studio", rating: "5" } },
    { label: "Food order", values: { raw: "the jollof was 🔥🔥 everyone at the office was asking where i ordered from. delivery was fast too, will def order again", name: "Tunde A.", role: "Ikeja", rating: "5" } },
    { label: "Tutoring", values: { raw: "my son passed his maths WAEC with B3!! thank you for your patience with him, he actually enjoys maths now", name: "Mrs Okafor", role: "Parent", rating: "5" } },
  ],
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
      .replace(/\bdef\b/gi, "definitely")
      .replace(/\bi\b/g, "I")
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
    const esc = (x: string) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const card = `<figure class="testimonial">\n  <blockquote>“${esc(pull)}.”</blockquote>\n  <figcaption>${"★".repeat(Number(s(v, "rating")) || 5)}: ${esc(who)}</figcaption>\n</figure>`;
    const blocks: Block[] = [
      { type: "list", title: "Formatted", items: [`“${t}”\n: ${who}`, `“${pull}.”\n: ${who}`, `${"★".repeat(Number(s(v, "rating")) || 5)} “${pull}.”: ${or(s(v, "name"), "Customer")}`] },
      { type: "text", title: "Ask permission first (WhatsApp)", text: `Hi ${or(s(v, "name").split(" ")[0], "there")}! Thank you so much for your kind message 🙏 Could I share it on our website like this?\n\n“${pull}.”: ${who}\n\nReply “yes” if that's okay, or tell me what to change.` },
      { type: "text", title: "Polish with AI (keeps their meaning)", text: `Lightly tidy this customer message into a website testimonial. Fix spelling and punctuation only. Keep their words, meaning and tone. Don't add anything they didn't say. Give a full version and a one-sentence version.\n\nMessage: "${raw}"` },
      { type: "text", title: "Website card (HTML)", text: card },
      { type: "notice", tone: "info", text: "Publish only after the customer says yes. Real first names with a detail (business or area) are far more convincing than anonymous praise." },
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
