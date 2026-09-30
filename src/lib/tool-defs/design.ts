import { bestInk, contrast, hexToRgb, hslToHex, normHex, ratioLabel, rgbToHsl } from "./color";
import { lines, opts, or, s, arr, type ToolDef, type Block } from "./types";

const industries = opts("Restaurant & food", "Beauty & salon", "Health & clinic", "Real estate", "Fashion & retail", "Education & school", "Church & NGO", "Finance & fintech", "Tech & SaaS", "Coaching & consulting", "Logistics", "Events & hospitality");
const moods = opts("Bold & energetic", "Calm & trustworthy", "Premium & elegant", "Friendly & playful", "Minimal & modern", "Earthy & natural");
const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
const words = (x: string) => x.split(/\s+/).filter(Boolean).length;

// ---------- Color Palette Generator ----------
const colorPalette: ToolDef = {
  kind: "generator",
  intro: "Pick the brand's main colour and a harmony. You get a full palette with readability scores, a “which colour where” guide and ready code.",
  examples: [
    { label: "Food brand (warm orange)", values: { base: "#e8590c", harmony: "complementary", neutral: "warm" } },
    { label: "Clinic (calm blue)", values: { base: "#1c6fb8", harmony: "analogous", neutral: "cool" } },
    { label: "Beauty (rich plum)", values: { base: "#8e2c68", harmony: "split", neutral: "warm" } },
    { label: "Fintech (trust green)", values: { base: "#0f7a55", harmony: "mono", neutral: "pure" } },
  ],
  fields: [
    { key: "base", label: "Brand colour", type: "color", default: "#ff6719", hint: "Take it from the logo if there is one." },
    { key: "harmony", label: "Harmony", type: "select", default: "complementary", options: [
      { value: "complementary", label: "Complementary (bold contrast)" },
      { value: "analogous", label: "Analogous (calm, related hues)" },
      { value: "triadic", label: "Triadic (playful, three hues)" },
      { value: "split", label: "Split-complementary (balanced)" },
      { value: "mono", label: "Monochrome (one hue)" },
    ] },
    { key: "neutral", label: "Neutral warmth", type: "select", default: "warm", options: opts("warm", "cool", "pure"), hint: "Warm suits food and beauty; cool suits health, finance and tech." },
  ],
  generate(v) {
    const base = normHex(s(v, "base"));
    if (!base) return [{ type: "notice", tone: "warn", text: "Enter a hex colour like #ff6719." }];
    const [h, sat, l] = rgbToHsl(hexToRgb(base));
    const harm = s(v, "harmony");
    const offsets = harm === "complementary" ? [180, 180] : harm === "analogous" ? [30, -30] : harm === "triadic" ? [120, 240] : harm === "split" ? [150, 210] : [0, 0];
    const accentS = harm === "mono" ? Math.max(sat - 30, 10) : Math.min(sat, 85);
    const nh = s(v, "neutral") === "cool" ? 220 : s(v, "neutral") === "warm" ? 30 : h;
    const ns = s(v, "neutral") === "pure" ? 0 : 12;
    const raw: [string, string][] = [
      ["Primary", base],
      ["Primary dark", hslToHex(h, sat, Math.max(l - 18, 8))],
      ["Primary light", hslToHex(h, Math.min(sat, 90), Math.min(l + 35, 95))],
      ["Accent", hslToHex(h + offsets[0], accentS, harm === "mono" ? Math.min(l + 15, 80) : 45)],
      ["Accent 2", hslToHex(h + offsets[1], accentS, harm === "mono" ? Math.max(l - 30, 15) : 35)],
      ["Background", hslToHex(nh, ns, 97)],
      ["Surface", hslToHex(nh, ns, 92)],
      ["Muted text", hslToHex(nh, ns, 40)],
      ["Text", hslToHex(nh, ns + 5, 10)],
    ];
    const colors = raw.map(([name, hex]) => {
      const b = bestInk(hex);
      return { name, hex, ink: b.ink, contrast: ratioLabel(b.ratio) };
    });
    const hex = (name: string) => colors.find((c) => c.name === name)!.hex;
    const css = `:root {\n${colors.map((c) => `  --${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")}\n}`;
    const tw = `/* Tailwind v4: paste into globals.css */\n@theme {\n${colors.map((c) => `  --color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")}\n}`;
    const textOnBg = contrast(hex("Text"), hex("Background"));
    const mutedOnBg = contrast(hex("Muted text"), hex("Background"));
    // Links are usually the primary colour, as text, on the page background.
    const linkOnBg = contrast(hex("Primary dark"), hex("Background"));
    const primaryAsText = contrast(base, hex("Background"));
    const btnInk = bestInk(base);
    const blocks: Block[] = [
      { type: "swatches", title: "Your palette", colors },
      {
        type: "checks",
        title: "Readability checks (WCAG: 4.5 : 1 for normal text)",
        items: [
          { ok: textOnBg >= 4.5, text: `Body text on background: ${ratioLabel(textOnBg)}`, fix: "Darken the Text colour." },
          { ok: mutedOnBg >= 4.5, text: `Muted text on background: ${ratioLabel(mutedOnBg)}`, fix: "Use muted text only for large or unimportant text, or darken it." },
          { ok: btnInk.ratio >= 4.5, text: `Button label on primary (use ${btnInk.ink === "#ffffff" ? "white" : "dark"} text), ${ratioLabel(btnInk.ratio)}`, fix: "Pick a darker or lighter primary so button text is readable." },
          { ok: linkOnBg >= 4.5, text: `Links in “Primary dark” on background, ${ratioLabel(linkOnBg)}`, fix: "Use the Primary dark colour for links, or darken it further." },
          { ok: primaryAsText >= 3, text: `Primary as large heading text, ${ratioLabel(primaryAsText)} (large text needs 3 : 1)`, fix: "Don't use the primary colour for headings; use Text or Primary dark." },
        ],
      },
      {
        type: "table",
        title: "Which colour goes where (the 60-30-10 rule)",
        columns: ["Share of the page", "Colour", "Use it for"],
        rows: [
          ["60%", `Background ${hex("Background")} + Surface ${hex("Surface")}`, "Page background, cards, sections"],
          ["30%", `Text ${hex("Text")} + Muted ${hex("Muted text")}`, "Headings, body text, borders"],
          ["10%", `Primary ${base} (+ Accent ${hex("Accent")})`, "Buttons, links, badges: the things you want tapped"],
        ],
      },
      { type: "text", title: "CSS variables", text: css, filename: "palette.css" },
      { type: "text", title: "Tailwind v4 theme", text: tw },
      {
        type: "text",
        title: "Tell your AI (paste into Claude or CLAUDE.md)",
        text: `Use this colour palette everywhere:\n${colors.map((c) => `- ${c.name}: ${c.hex}`).join("\n")}\nRules: page background ${hex("Background")}; body text ${hex("Text")}; buttons ${base} with ${btnInk.ink} text; links ${hex("Primary dark")}. Keep the primary colour to about 10% of the page. All text must pass 4.5:1 contrast.`,
      },
    ];
    return blocks;
  },
};

// ---------- Layout / Wireframe Generator ----------
const layouts: Record<string, string[]> = {
  "Business website (home)": ["Header · logo · menu · WhatsApp button", "Hero · promise · primary button · photo", "Services (3–6)", "Why choose us · 3 proof points", "Testimonials", "Gallery / recent work", "FAQ", "Contact · map · hours", "Footer"],
  "Landing page (one offer)": ["Header · logo · one button", "Hero · outcome headline · button", "Problem → solution", "Benefits (3)", "How it works (3 steps)", "Social proof", "Offer + price", "Guarantee", "FAQ", "Final call to action"],
  "Online store (home)": ["Header · search · cart", "Hero banner · current promo", "Categories", "Best sellers grid", "Trust bar · delivery · payment · returns", "New arrivals", "Reviews", "Newsletter / WhatsApp", "Footer"],
  "Restaurant": ["Header · Order on WhatsApp", "Hero · signature dish · Order now", "Menu (tabs by category)", "Specials of the day", "Delivery areas + hours", "Reviews", "Location map", "Footer"],
  "Booking / appointments": ["Header · Book now", "Hero · service + next available slot", "Services with prices + durations", "Booking calendar", "Staff", "Policies (deposit, cancellation)", "Reviews", "Contact · map"],
  "Portfolio": ["Header · name · hire me", "Intro · what I do · for whom", "Selected work grid (6)", "Case study highlight", "Services + starting prices", "Testimonials", "Contact form"],
  "School / training": ["Header · Apply now", "Hero · outcome + next intake date", "Programmes", "Why us · facilities", "Admissions steps", "Fees", "Gallery", "FAQ", "Contact"],
  "Real estate listings": ["Header · search · list property", "Hero · search by area, type, budget", "Featured listings", "Areas we cover", "How buying works", "Agents", "Reviews", "Contact"],
};
// What each kind of section must do for the visitor, matched by its first word(s).
const sectionJobs: [RegExp, string][] = [
  [/^header/i, "Show who this is and give one way to act, on every page."],
  [/^hero/i, "Answer “what is this and what do I get?” in 5 seconds, with the main button visible on a phone."],
  [/problem/i, "Show you understand the visitor's pain in their words."],
  [/benefit|why (choose|us)/i, "Say what the customer gains, results, not features."],
  [/how (it|buying) works|admissions/i, "Make the next steps feel easy: 3 steps, no jargon."],
  [/testimonial|review|social proof/i, "Prove it with real names and results."],
  [/services|menu|programmes|categories|listings|best sellers|new arrivals|selected work/i, "Show exactly what's on offer, with prices or “from” prices."],
  [/price|pricing|fees|offer/i, "Make the cost clear so serious buyers don't leave to ask."],
  [/faq/i, "Answer the doubts that stop people buying."],
  [/guarantee|policies|trust/i, "Make saying yes feel safe."],
  [/contact|map|location|delivery/i, "Make it effortless to reach or find the business."],
  [/final call|footer/i, "Give one last clear action and the essential details."],
];
const wireframe: ToolDef = {
  kind: "generator",
  intro: "Choose the kind of page. You get a section-by-section plan, what each section must do, a build prompt, and a message to get the client's approval.",
  examples: [
    { label: "Salon home page", values: { type: "Business website (home)", business: "Glow Beauty Studio, Lekki", extras: ["Pricing", "Instagram feed"] } },
    { label: "Coaching offer", values: { type: "Landing page (one offer)", business: "FitMum 12-week programme, Abuja", extras: ["Video"] } },
    { label: "Restaurant", values: { type: "Restaurant", business: "Mama's Kitchen, Ikeja", extras: [] } },
    { label: "School", values: { type: "School / training", business: "Bright Stars Academy, Ibadan", extras: ["Team"] } },
  ],
  fields: [
    { key: "type", label: "Page type", type: "select", default: "Business website (home)", options: opts(...Object.keys(layouts)) },
    { key: "business", label: "Business", type: "text", default: "Glow Beauty Studio, Lekki" },
    { key: "extras", label: "Extra sections", type: "multi", default: ["Pricing"], options: opts("Pricing", "Blog preview", "Team", "Video", "Instagram feed", "Newsletter") },
  ],
  generate(v) {
    const secs = [...(layouts[s(v, "type")] ?? layouts["Business website (home)"])];
    const extras = arr(v, "extras").filter((x) => !secs.some((sec) => sec.toLowerCase().startsWith(x.toLowerCase())));
    if (extras.length) secs.splice(Math.max(secs.length - 2, 1), 0, ...extras);
    const biz = or(s(v, "business"), "the business");
    const job = (sec: string) => sectionJobs.find(([re]) => re.test(sec))?.[1] ?? "Keep it short and useful, cut it if it doesn't help the visitor decide.";
    const prompt = `Build a mobile-first ${s(v, "type").toLowerCase()} for ${biz}.\nUse these sections in order:\n${secs.map((x, i) => `${i + 1}. ${x}: ${job(x)}`).join("\n")}\n\nRequirements: loads fast on 4G, one clear primary button repeated, WhatsApp click-to-chat, text contrast of at least 4.5:1, semantic HTML, works at 360px wide. Use the brand colours and fonts in CLAUDE.md.`;
    return [
      { type: "wireframe", title: `${s(v, "type")}: ${secs.length} sections`, sections: secs },
      { type: "table", title: "What each section must do", columns: ["Section", "Its job"], rows: secs.map((x) => [x, job(x)]) },
      { type: "text", title: "Build prompt for your AI", text: prompt },
      {
        type: "text",
        title: "Send to the client for approval (WhatsApp)",
        text: `Hi! Before I start building ${biz}'s page, here's the plan: top to bottom:\n\n${secs.map((x, i) => `${i + 1}. ${x}`).join("\n")}\n\nAnything to add, remove or move? Reply “approved” and I'll start building. 🙏`,
      },
    ];
  },
};

// ---------- Hero Section Copy Generator ----------
const heroCopy: ToolDef = {
  kind: "generator",
  intro: "Describe the business in plain words. You get headline, subhead and button combinations, each checked against the 10-word rule.",
  examples: [
    { label: "Food delivery", values: { business: "Mama's Kitchen", offer: "home-style Nigerian lunch, delivered", audience: "office workers in Ikeja", outcome: "a hot lunch at your desk in 30 minutes", pain: "cold food and long queues", proof: "4.8★ from 300+ orders", cta: "Order on WhatsApp" } },
    { label: "Lash studio", values: { business: "Glow Beauty Studio", offer: "lash extensions", audience: "busy women in Lekki", outcome: "natural lashes that last 4 weeks", pain: "lashes that fall off in days", proof: "", cta: "Book an appointment" } },
    { label: "Solar installer", values: { business: "SunPower NG", offer: "home solar installation", audience: "homeowners in Abuja", outcome: "steady power, day and night", pain: "generator noise and fuel costs", proof: "", cta: "Get a quote" } },
    { label: "Web designer", values: { business: "PixelHouse", offer: "websites for small businesses", audience: "Lagos business owners", outcome: "a website that brings you customers", pain: "a site nobody visits", proof: "", cta: "Book a call" } },
  ],
  fields: [
    { key: "business", label: "Business name", type: "text", default: "Mama's Kitchen" },
    { key: "offer", label: "What you sell", type: "text", default: "home-style Nigerian lunch, delivered" },
    { key: "audience", label: "Who it's for", type: "text", default: "office workers in Ikeja" },
    { key: "outcome", label: "The result they get", type: "text", default: "a hot lunch at your desk in 30 minutes", hint: "Write it the way a customer would say it." },
    { key: "pain", label: "What they're tired of (optional)", type: "text", default: "cold food and long queues" },
    { key: "proof", label: "Real proof (optional)", type: "text", default: "4.8★ from 300+ orders", hint: "Only real numbers: leave empty if you don't have any yet." },
    { key: "cta", label: "Main action", type: "select", default: "Order on WhatsApp", options: opts("Order on WhatsApp", "Book an appointment", "Book a call", "Get a quote", "Shop now", "Start free") },
  ],
  generate(v) {
    const b = or(s(v, "business"), "Your business"), off = or(s(v, "offer"), "what you sell"), aud = or(s(v, "audience"), "your customers"), out = or(s(v, "outcome"), "the result they want"), pain = s(v, "pain"), pr = s(v, "proof"), cta = s(v, "cta");
    const heads = [
      `${cap(out)}.`,
      ...(pain ? [`${cap(out)}: no more ${pain}.`] : []),
      `${cap(off)} for ${aud}.`,
      `The easy way to get ${out}.`,
      `${cap(out)}, from ${b}.`,
    ];
    const subs = [
      `${cap(off)} for ${aud}.${pr ? ` ${pr}.` : ""}`,
      `${b} gives ${aud} ${out}.${pr ? ` ${pr}.` : ""}`,
      `For ${aud} who want ${out}${pain ? ` - without ${pain}` : ""}.`,
    ];
    const combos = heads.map((h, i) => {
      const n = words(h);
      return `HEADLINE: ${h}  (${n} words ${n <= 10 ? "✓" : "- too long, shorten it"})\nSUBHEAD: ${subs[i % subs.length]}\nBUTTON: ${cta}${pr ? `\nPROOF LINE: ${pr}` : ""}`;
    });
    return [
      { type: "list", title: "Hero combinations", items: combos },
      {
        type: "list",
        title: "Pick the winner in 5 minutes",
        items: [
          "Read each headline aloud. Would a customer say it like that?",
          "Show your top 2 to someone who doesn't know the business for 5 seconds. Ask: “What does this business offer?”",
          "Keep the one they explain correctly, and make sure the button shows without scrolling on a phone.",
        ],
      },
      { type: "notice", tone: pr ? "info" : "warn", text: pr ? "Only use proof you can back up: real ratings and real numbers." : "No proof yet? That's fine: add a real review or number as soon as you have one." },
    ];
  },
};

// ---------- Font Pairing Picker ----------
const fontPairs: Record<string, { heading: string; body: string; note: string }[]> = {
  "Bold & energetic": [{ heading: "Archivo Black", body: "Inter", note: "punchy, loud headlines" }, { heading: "Bricolage Grotesque", body: "Figtree", note: "modern, confident" }, { heading: "Anton", body: "Roboto", note: "poster-style" }],
  "Calm & trustworthy": [{ heading: "Merriweather", body: "Source Sans 3", note: "clinics, finance, schools" }, { heading: "Libre Franklin", body: "Libre Franklin", note: "clear and dependable" }, { heading: "Lora", body: "Nunito Sans", note: "warm authority" }],
  "Premium & elegant": [{ heading: "Playfair Display", body: "Lato", note: "fashion, beauty, hospitality" }, { heading: "Cormorant Garamond", body: "Montserrat", note: "luxury feel" }, { heading: "DM Serif Display", body: "DM Sans", note: "refined, modern" }],
  "Friendly & playful": [{ heading: "Fredoka", body: "Nunito", note: "kids, food, events" }, { heading: "Baloo 2", body: "Poppins", note: "rounded and warm" }, { heading: "Quicksand", body: "Mulish", note: "soft and light" }],
  "Minimal & modern": [{ heading: "Manrope", body: "Manrope", note: "tech, SaaS, agencies" }, { heading: "Space Grotesk", body: "Inter", note: "techy edge" }, { heading: "Sora", body: "Work Sans", note: "clean geometry" }],
  "Earthy & natural": [{ heading: "Fraunces", body: "Karla", note: "organic, handmade" }, { heading: "Josefin Sans", body: "Crimson Pro", note: "artisan" }, { heading: "Zilla Slab", body: "Open Sans", note: "grounded, sturdy" }],
};
const nextFont = (name: string) => name.replace(/ /g, "_");
const fontPairing: ToolDef = {
  kind: "generator",
  intro: "Pick a mood. You get three tested Google Font pairings with live previews, plus the exact code to load them.",
  examples: [
    { label: "Clinic / finance", values: { mood: "Calm & trustworthy", pick: "1" } },
    { label: "Beauty / fashion", values: { mood: "Premium & elegant", pick: "1" } },
    { label: "Kids / food / events", values: { mood: "Friendly & playful", pick: "1" } },
    { label: "Tech startup", values: { mood: "Minimal & modern", pick: "2" } },
  ],
  fields: [
    { key: "mood", label: "Brand mood", type: "select", default: "Calm & trustworthy", options: moods },
    { key: "pick", label: "Get code for pairing", type: "select", default: "1", options: [{ value: "1", label: "Pairing 1" }, { value: "2", label: "Pairing 2" }, { value: "3", label: "Pairing 3" }] },
  ],
  generate(v) {
    const pairs = fontPairs[s(v, "mood")] ?? fontPairs["Calm & trustworthy"];
    const p = pairs[Math.min(2, Math.max(0, Number(s(v, "pick")) - 1 || 0))];
    const same = p.heading === p.body;
    const nf = same
      ? `import { ${nextFont(p.heading)} } from "next/font/google";\n\nconst font = ${nextFont(p.heading)}({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });\n// <body className={font.className}>`
      : `import { ${nextFont(p.heading)}, ${nextFont(p.body)} } from "next/font/google";\n\nconst heading = ${nextFont(p.heading)}({ subsets: ["latin"], weight: ["700"], display: "swap", variable: "--font-heading" });\nconst body = ${nextFont(p.body)}({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-body" });\n// <html className={\`\${heading.variable} \${body.variable}\`}>\n// CSS: h1,h2,h3 { font-family: var(--font-heading) } body { font-family: var(--font-body) }`;
    const fam = (x: string) => x.replace(/ /g, "+");
    const link = `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=${fam(p.heading)}:wght@700${same ? ";400" : `&family=${fam(p.body)}:wght@400;700`}&display=swap" rel="stylesheet">`;
    return [
      { type: "fonts", title: `${s(v, "mood")} pairings`, pairs },
      { type: "text", title: `Next.js code: ${p.heading} + ${p.body}`, text: nf },
      { type: "text", title: "Plain HTML (any website)", text: link },
      { type: "notice", tone: "info", text: "Load only the weights you use (like 400 and 700) and keep body text at 16px or bigger, fast and readable on phones." },
    ];
  },
};

// ---------- Logo Concept Prompt Generator ----------
const logoPrompts: ToolDef = {
  kind: "generator",
  intro: "Get image prompts for logo concepts in five directions. Use them in any AI image tool, then judge them with the checklist.",
  examples: [
    { label: "Restaurant", values: { name: "Kora Foods", industry: "Restaurant & food", mood: "Friendly & playful", symbol: "a steaming pot", colors: "tomato red and cream" } },
    { label: "Law firm", values: { name: "Adeyemi & Co", industry: "Coaching & consulting", mood: "Calm & trustworthy", symbol: "a simple column", colors: "navy and gold" } },
    { label: "Beauty studio", values: { name: "Glow Beauty", industry: "Beauty & salon", mood: "Premium & elegant", symbol: "a single eyelash curve", colors: "plum and blush pink" } },
    { label: "Logistics", values: { name: "SwiftMove", industry: "Logistics", mood: "Bold & energetic", symbol: "an arrow", colors: "orange and charcoal" } },
  ],
  fields: [
    { key: "name", label: "Business name", type: "text", default: "Kora Foods" },
    { key: "industry", label: "Industry", type: "select", default: "Restaurant & food", options: industries },
    { key: "mood", label: "Mood", type: "select", default: "Friendly & playful", options: moods },
    { key: "symbol", label: "Symbol idea (optional)", type: "text", default: "a steaming pot", hint: "One simple object. Leave empty for name-only logos." },
    { key: "colors", label: "Colours", type: "text", default: "tomato red and cream" },
  ],
  generate(v) {
    const name = or(s(v, "name"), "Brand"), ind = s(v, "industry").toLowerCase(), mood = s(v, "mood").toLowerCase(), sym = s(v, "symbol"), col = or(s(v, "colors"), "two brand colours");
    const base = `flat vector logo, ${mood}, ${col}, white background, centred, no mockup, no gradients, no shadows, crisp edges, scalable, simple enough to read at 32px`;
    const items = [
      `Wordmark: the word "${name}" in custom lettering for a ${ind} brand, ${base}`,
      `Lettermark: the letter "${name.charAt(0)}" as a bold monogram for a ${ind} brand, ${base}`,
      `Symbol + wordmark: ${sym || `a simple icon that represents ${ind}`} beside the name "${name}", ${base}`,
      `Emblem: circular badge containing "${name}" and ${sym || "a simple icon"}, ${base}`,
      `Negative space: ${sym || "a simple icon"} formed from the empty space inside the letter "${name.charAt(0)}", ${base}`,
    ];
    return [
      { type: "list", title: "Logo prompts (5 directions)", items },
      { type: "text", title: "Add this if the tool supports a “negative prompt”", text: "photo, 3D, mockup, gradient, shadow, clutter, tiny details, extra text, watermark, blurry" },
      {
        type: "list",
        title: "Judge each concept: keep only those that pass all five",
        items: [
          "☐ Readable at 32px (shrink it to a phone icon). If not: remove small details and thin lines.",
          "☐ Works in one colour, black on white. If not: simplify the shape.",
          "☐ The name is spelled exactly right. AI often misspells: retype it in a real font.",
          "☐ Doesn't look like a famous brand. Compare with the big logos in the industry.",
          "☐ Matches the brand kit's mood and exact colours.",
        ],
      },
      { type: "notice", tone: "info", text: "Generate 3–4 of each, shortlist 3, then redraw the winner as a clean vector (or ask a designer) before a client uses it." },
    ];
  },
};

// ---------- Brand Style Guide Generator ----------
const voicePhrases: Record<string, string> = {
  Warm: "“You're in good hands: we'll take it from here.”",
  Confident: "“We deliver in 30 minutes. Every time.”",
  Playful: "“Hungry? Say less. 🍛”",
  Professional: "“Your appointment is confirmed for 10:00, Monday.”",
  Premium: "“Crafted by hand. Made to last.”",
  Direct: "“Book now. Pay a ₦5,000 deposit. Done.”",
  Inspiring: "“Your best skin starts today.”",
};
const styleGuide: ToolDef = {
  kind: "generator",
  intro: "Fill in the brand basics. You get a one-page style guide to hand to a client, and a block to paste into your AI so it stays on-brand.",
  examples: [
    { label: "Beauty studio", values: { name: "Glow Beauty Studio", mission: "Make every client leave feeling confident.", audience: "Working women 22–40 in Lekki and VI", voice: ["Warm", "Confident"], primary: "#b8336a", secondary: "#f5e6d3", headingFont: "Playfair Display", bodyFont: "Lato", avoid: "cheap, discount, basic" } },
    { label: "Clinic", values: { name: "CarePoint Clinic", mission: "Quality family care without the long wait.", audience: "Families in Wuse and Garki, Abuja", voice: ["Professional", "Warm"], primary: "#1c6fb8", secondary: "#eaf2fb", headingFont: "Merriweather", bodyFont: "Source Sans 3", avoid: "cure, guaranteed, miracle" } },
    { label: "Food brand", values: { name: "Kora Foods", mission: "Home-style meals, fast and fresh.", audience: "Office workers in Ikeja", voice: ["Playful", "Direct"], primary: "#d9480f", secondary: "#fff4e6", headingFont: "Fredoka", bodyFont: "Nunito", avoid: "gourmet, exquisite" } },
  ],
  fields: [
    { key: "name", label: "Brand", type: "text", default: "Glow Beauty Studio" },
    { key: "mission", label: "One-line mission", type: "text", default: "Make every client leave feeling confident." },
    { key: "audience", label: "Audience", type: "text", default: "Working women 22–40 in Lekki and VI" },
    { key: "voice", label: "Voice", type: "multi", default: ["Warm", "Confident"], options: opts("Warm", "Confident", "Playful", "Professional", "Premium", "Direct", "Inspiring") },
    { key: "primary", label: "Primary colour", type: "color", default: "#b8336a", half: true },
    { key: "secondary", label: "Secondary colour", type: "color", default: "#f5e6d3", half: true },
    { key: "headingFont", label: "Heading font", type: "text", default: "Playfair Display", half: true },
    { key: "bodyFont", label: "Body font", type: "text", default: "Lato", half: true },
    { key: "avoid", label: "Words to avoid", type: "text", default: "cheap, discount, basic" },
  ],
  generate(v) {
    const p = normHex(s(v, "primary")) ?? "#000000", sc = normHex(s(v, "secondary")) ?? "#ffffff";
    const voices = arr(v, "voice");
    const voice = voices.join(", ") || "Clear";
    const name = or(s(v, "name"), "Brand");
    const doc = `# ${name}: Style Guide

## Mission
${s(v, "mission")}

## Audience
${s(v, "audience")}

## Voice: ${voice}
Write like you're speaking to one person. Short sentences. Plain words.
${voices.map((x) => `- ${x}: ${voicePhrases[x] ?? ""}`).join("\n")}
Avoid: ${or(s(v, "avoid"), "jargon")}.

## Colour
- Primary: ${p}: buttons, links, key highlights (text on it: ${bestInk(p).ink}, ${ratioLabel(bestInk(p).ratio)})
- Secondary: ${sc}: backgrounds and cards (text on it: ${bestInk(sc).ink}, ${ratioLabel(bestInk(sc).ratio)})
- Neutral: #111111 text, #ffffff page

## Typography
- Headings: ${s(v, "headingFont")} (700)
- Body: ${s(v, "bodyFont")} (400, 16px minimum)

## Logo use
- Keep clear space equal to the logo's height on all sides
- Never stretch it, recolour it outside the palette, or place it on busy photos

## Photography
- Real customers and real work over stock photos
- Natural light, bright and clear

## Do / Don't
- Do: one clear button per section; WhatsApp contact visible
- Don't: more than two fonts, walls of text, low-contrast text
`;
    const ai = `BRAND RULES: ${name}\nVoice: ${voice}. Short sentences, plain English. Never use: ${or(s(v, "avoid"), "jargon")}.\nColours: primary ${p} (buttons, links), secondary ${sc} (backgrounds). Text #111111.\nFonts: headings ${s(v, "headingFont")}, body ${s(v, "bodyFont")} (16px+).\nAudience: ${s(v, "audience")}.`;
    return [
      { type: "swatches", title: "Brand colours", colors: [p, sc].map((hex, i) => ({ name: i ? "Secondary" : "Primary", hex, ink: bestInk(hex).ink, contrast: ratioLabel(bestInk(hex).ratio) })) },
      { type: "text", title: "Style guide (Markdown)", text: doc, filename: "style-guide.md" },
      { type: "text", title: "Paste into CLAUDE.md so your AI stays on-brand", text: ai },
    ];
  },
};

// ---------- Website Design Brief Generator ----------
const designBrief: ToolDef = {
  kind: "generator",
  intro: "Run this with the client on the first call. You get the brief you build from, the questions to ask, and a sign-off message.",
  examples: [
    { label: "Real estate", values: { client: "Adeola Properties", industry: "Real estate", goal: "Get enquiries / leads", audience: "Diaspora Nigerians buying property in Lagos", pages: ["Home", "About", "Listings", "Contact"], mood: "Premium & elegant", competitors: "propertypro.ng\nprivateproperty.ng", deadline: "3 weeks", budget: "$900" } },
    { label: "Restaurant", values: { client: "Mama's Kitchen", industry: "Restaurant & food", goal: "Sell products online", audience: "Office workers in Ikeja", pages: ["Home", "Shop", "About", "Contact"], mood: "Friendly & playful", competitors: "", deadline: "2 weeks", budget: "₦350,000" } },
    { label: "Clinic", values: { client: "CarePoint Clinic", industry: "Health & clinic", goal: "Take bookings", audience: "Families in Abuja", pages: ["Home", "Services", "Booking", "FAQ", "Contact"], mood: "Calm & trustworthy", competitors: "", deadline: "4 weeks", budget: "₦600,000" } },
  ],
  fields: [
    { key: "client", label: "Client / business", type: "text", default: "Adeola Properties" },
    { key: "industry", label: "Industry", type: "select", default: "Real estate", options: industries },
    { key: "goal", label: "Main goal of the site", type: "select", default: "Get enquiries / leads", options: opts("Get enquiries / leads", "Sell products online", "Take bookings", "Build credibility", "Share information") },
    { key: "audience", label: "Target audience", type: "text", default: "Diaspora Nigerians buying property in Lagos" },
    { key: "pages", label: "Pages", type: "multi", default: ["Home", "About", "Listings", "Contact"], options: opts("Home", "About", "Services", "Listings", "Shop", "Blog", "Pricing", "Gallery", "FAQ", "Contact", "Booking") },
    { key: "mood", label: "Look & feel", type: "select", default: "Premium & elegant", options: moods },
    { key: "competitors", label: "Sites they like (one per line)", type: "textarea", default: "propertypro.ng\nprivateproperty.ng", rows: 3 },
    { key: "deadline", label: "Deadline", type: "text", default: "3 weeks", half: true },
    { key: "budget", label: "Budget", type: "text", default: "$900", half: true },
  ],
  generate(v) {
    const client = or(s(v, "client"), "Client");
    const goal = s(v, "goal").toLowerCase();
    const action = goal.includes("sell") ? "Add to cart / Checkout" : goal.includes("book") ? "Book now" : "Contact / Enquire";
    const brief = `WEBSITE DESIGN BRIEF: ${client}

Industry: ${s(v, "industry")}
Primary goal: ${s(v, "goal")}
Audience: ${s(v, "audience")}
Look & feel: ${s(v, "mood")}

Pages (${arr(v, "pages").length}): ${arr(v, "pages").join(", ")}

Reference sites:
${lines(s(v, "competitors")).map((x) => "- " + x).join("\n") || "- none given"}

Must-haves:
- Mobile-first, loads in under 3 seconds on 4G
- WhatsApp click-to-chat on every page
- Clear primary action: ${action}
- SEO basics: titles, descriptions, Google Business Profile link

Content the client provides: logo, photos, service/product list, prices, testimonials
Deadline: ${s(v, "deadline")} · Budget: ${s(v, "budget")}

Sign-off: ____________________  Date: __________`;
    return [
      { type: "text", title: "Design brief", text: brief, filename: "design-brief.txt" },
      {
        type: "list",
        title: "Ask these on the call (write the answers in their words)",
        items: [
          "If the website works perfectly, what's different in 3 months?",
          "Who is your best customer, and how do they find you today?",
          "What do customers always ask before buying?",
          "Which competitor do you lose customers to, and why?",
          "Who will send the photos, prices and words, and by when?",
          "Who else needs to approve the design?",
        ],
      },
      { type: "text", title: "Sign-off message (email or WhatsApp)", text: `Hi! Here's the brief from our call for ${client}'s website (attached). Please check it's right, especially the pages, deadline and budget. Reply “approved” and I'll send the proposal and start date. Thank you!` },
    ];
  },
};

export const defs: Record<string, ToolDef> = {
  "color-palette-generator": colorPalette,
  "wireframe-generator": wireframe,
  "hero-copy-generator": heroCopy,
  "font-pairing-picker": fontPairing,
  "logo-concept-prompts": logoPrompts,
  "brand-style-guide": styleGuide,
  "design-brief-generator": designBrief,
};
