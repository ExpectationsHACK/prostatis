import { bestInk, hexToRgb, hslToHex, normHex, ratioLabel, rgbToHsl } from "./color";
import { lines, opts, or, s, arr, type ToolDef, type Block } from "./types";

const industries = opts("Restaurant & food", "Beauty & salon", "Health & clinic", "Real estate", "Fashion & retail", "Education & school", "Church & NGO", "Finance & fintech", "Tech & SaaS", "Coaching & consulting", "Logistics", "Events & hospitality");
const moods = opts("Bold & energetic", "Calm & trustworthy", "Premium & elegant", "Friendly & playful", "Minimal & modern", "Earthy & natural");

// ---------- Color Palette Generator ----------
const colorPalette: ToolDef = {
  kind: "generator",
  intro: "Pick a brand colour and a harmony. You get a full palette with text-contrast checks and ready-to-paste CSS.",
  fields: [
    { key: "base", label: "Brand colour", type: "color", default: "#ff6719" },
    { key: "harmony", label: "Harmony", type: "select", default: "complementary", options: [
      { value: "complementary", label: "Complementary (bold contrast)" },
      { value: "analogous", label: "Analogous (calm, related hues)" },
      { value: "triadic", label: "Triadic (playful, three hues)" },
      { value: "split", label: "Split-complementary (balanced)" },
      { value: "mono", label: "Monochrome (one hue)" },
    ] },
    { key: "neutral", label: "Neutral warmth", type: "select", default: "warm", options: opts("warm", "cool", "pure") },
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
    const css = `:root {\n${colors.map((c) => `  --${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")}\n}`;
    const tw = `// tailwind: @theme in globals.css (Tailwind v4)\n@theme {\n${colors.map((c) => `  --color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")}\n}`;
    const textOnBg = bestInk(colors[5].hex, colors[8].hex, "#ffffff");
    const blocks: Block[] = [
      { type: "swatches", title: "Your palette", colors },
      { type: "notice", tone: textOnBg.ratio >= 4.5 ? "good" : "warn", text: `Body text on background: ${ratioLabel(textOnBg.ratio)}. ${textOnBg.ratio >= 4.5 ? "Readable for everyone." : "Darken the text colour for readability."}` },
      { type: "text", title: "CSS variables", text: css, filename: "palette.css" },
      { type: "text", title: "Tailwind v4 theme", text: tw },
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
const wireframe: ToolDef = {
  kind: "generator",
  intro: "Choose the kind of page. You get a section-by-section wireframe and a build prompt for your AI.",
  fields: [
    { key: "type", label: "Page type", type: "select", default: "Business website (home)", options: opts(...Object.keys(layouts)) },
    { key: "business", label: "Business", type: "text", default: "Glow Beauty Studio, Lekki" },
    { key: "extras", label: "Extra sections", type: "multi", default: ["Pricing"], options: opts("Pricing", "Blog preview", "Team", "Video", "Instagram feed", "Newsletter") },
  ],
  generate(v) {
    const secs = [...(layouts[s(v, "type")] ?? layouts["Business website (home)"])];
    const extras = arr(v, "extras");
    if (extras.length) secs.splice(Math.max(secs.length - 2, 1), 0, ...extras);
    const prompt = `Build a mobile-first ${s(v, "type").toLowerCase()} for ${or(s(v, "business"), "the business")}.\nUse these sections in order:\n${secs.map((x, i) => `${i + 1}. ${x}`).join("\n")}\n\nRequirements: loads fast on 4G, one clear primary button, WhatsApp click-to-chat, accessible contrast, semantic HTML.`;
    return [
      { type: "wireframe", title: `${s(v, "type")} — ${secs.length} sections`, sections: secs },
      { type: "text", title: "Build prompt for your AI", text: prompt },
    ];
  },
};

// ---------- Hero Section Copy Generator ----------
const heroCopy: ToolDef = {
  kind: "generator",
  intro: "Describe the business in a few words. You get headline, subhead and button combinations to test.",
  fields: [
    { key: "business", label: "Business", type: "text", default: "Mama's Kitchen" },
    { key: "offer", label: "What you sell", type: "text", default: "home-style Nigerian meals delivered" },
    { key: "audience", label: "Who it's for", type: "text", default: "busy professionals in Lagos" },
    { key: "outcome", label: "Result they get", type: "text", default: "a hot lunch without leaving your desk" },
    { key: "proof", label: "Proof point", type: "text", default: "4.8★ from 300+ orders" },
    { key: "cta", label: "Main action", type: "select", default: "Order on WhatsApp", options: opts("Order on WhatsApp", "Book a call", "Get a quote", "Shop now", "Book an appointment", "Start free") },
  ],
  generate(v) {
    const b = or(s(v, "business"), "Your business"), off = or(s(v, "offer"), "what you sell"), aud = or(s(v, "audience"), "your customers"), out = or(s(v, "outcome"), "the result they want"), pr = s(v, "proof"), cta = s(v, "cta");
    const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
    const heads = [
      `${cap(out)}.`,
      `${cap(off)} for ${aud}.`,
      `The easiest way to get ${out}.`,
      `${b}: ${off}, done right.`,
      `Stop settling. Get ${out}.`,
    ];
    const subs = [`${cap(off)} for ${aud}. ${pr ? pr + "." : ""}`.trim(), `${b} helps ${aud} get ${out} — without the stress.`, `Trusted by ${aud}${pr ? ` · ${pr}` : ""}.`];
    const combos = heads.map((h, i) => `HEADLINE: ${h}\nSUBHEAD: ${subs[i % subs.length]}\nBUTTON: ${cta}${pr ? `\nPROOF LINE: ${pr}` : ""}`);
    return [
      { type: "list", title: "Hero combinations", items: combos },
      { type: "notice", tone: "info", text: "Keep the headline under 10 words and put the button above the fold on a phone." },
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
const fontPairing: ToolDef = {
  kind: "generator",
  intro: "Pick a mood. You get three tested Google Font pairings with live previews and copy-paste CSS.",
  fields: [{ key: "mood", label: "Brand mood", type: "select", default: "Calm & trustworthy", options: moods }],
  generate(v) {
    const pairs = fontPairs[s(v, "mood")] ?? fontPairs["Calm & trustworthy"];
    return [
      { type: "fonts", title: `${s(v, "mood")} pairings`, pairs },
      { type: "notice", tone: "info", text: "Load only the weights you use (e.g. 400 and 700) to keep pages fast on mobile data." },
    ];
  },
};

// ---------- Logo Concept Prompt Generator ----------
const logoPrompts: ToolDef = {
  kind: "generator",
  intro: "Get image-model prompts for logo concepts in several directions. Use them in any AI image tool.",
  fields: [
    { key: "name", label: "Business name", type: "text", default: "Kora Foods" },
    { key: "industry", label: "Industry", type: "select", default: "Restaurant & food", options: industries },
    { key: "mood", label: "Mood", type: "select", default: "Friendly & playful", options: moods },
    { key: "symbol", label: "Symbol idea (optional)", type: "text", default: "a steaming pot" },
    { key: "colors", label: "Colours", type: "text", default: "tomato red and cream" },
  ],
  generate(v) {
    const name = or(s(v, "name"), "Brand"), ind = s(v, "industry").toLowerCase(), mood = s(v, "mood").toLowerCase(), sym = s(v, "symbol"), col = or(s(v, "colors"), "two brand colours");
    const base = `flat vector logo, ${mood}, ${col}, white background, centred, no mockup, no gradients, crisp edges, scalable, simple enough to read at 32px`;
    const items = [
      `Wordmark: the word "${name}" in custom lettering for a ${ind} brand, ${base}`,
      `Lettermark: the letter "${name.charAt(0)}" as a bold monogram for a ${ind} brand, ${base}`,
      `Symbol + wordmark: ${sym || `an icon that represents ${ind}`} beside the name "${name}", ${base}`,
      `Emblem: circular badge containing "${name}" and ${sym || "a simple icon"}, ${base}`,
      `Negative space: ${sym || "an icon"} hidden in the letter "${name.charAt(0)}", ${base}`,
    ];
    return [
      { type: "list", title: "Logo prompts (5 directions)", items },
      { type: "notice", tone: "info", text: "Generate 4 of each, shortlist 3, then redraw the winner as clean vector before handing it to a client." },
    ];
  },
};

// ---------- Brand Style Guide Generator ----------
const styleGuide: ToolDef = {
  kind: "generator",
  intro: "Fill in the brand basics. You get a one-page style guide you can hand to a client or paste into your AI.",
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
    const voice = arr(v, "voice").join(", ") || "Clear";
    const doc = `# ${or(s(v, "name"), "Brand")} — Style Guide

## Mission
${s(v, "mission")}

## Audience
${s(v, "audience")}

## Voice
${voice}. Write like you speak to one person. Short sentences. Avoid: ${or(s(v, "avoid"), "jargon")}.

## Colour
- Primary: ${p} — buttons, links, key highlights (text on it: ${bestInk(p).ink}, ${ratioLabel(bestInk(p).ratio)})
- Secondary: ${sc} — backgrounds and cards (text on it: ${bestInk(sc).ink}, ${ratioLabel(bestInk(sc).ratio)})
- Neutral: #111111 text, #ffffff page

## Typography
- Headings: ${s(v, "headingFont")} (700)
- Body: ${s(v, "bodyFont")} (400, 16px minimum)

## Logo use
- Keep clear space equal to the logo's height on all sides
- Never stretch, recolour outside the palette or place on busy photos

## Photography
- Real customers and real work over stock
- Natural light, warm tones

## Do / Don't
- Do: one clear button per section, WhatsApp contact visible
- Don't: more than two fonts, walls of text, low-contrast text
`;
    return [
      { type: "swatches", title: "Brand colours", colors: [p, sc].map((hex, i) => ({ name: i ? "Secondary" : "Primary", hex, ink: bestInk(hex).ink, contrast: ratioLabel(bestInk(hex).ratio) })) },
      { type: "text", title: "Style guide (Markdown)", text: doc, filename: "style-guide.md" },
    ];
  },
};

// ---------- Website Design Brief Generator ----------
const designBrief: ToolDef = {
  kind: "generator",
  intro: "Run this with the client on the first call. It becomes the brief you design and build from.",
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
    const brief = `WEBSITE DESIGN BRIEF — ${or(s(v, "client"), "Client")}

Industry: ${s(v, "industry")}
Primary goal: ${s(v, "goal")}
Audience: ${s(v, "audience")}
Look & feel: ${s(v, "mood")}

Pages (${arr(v, "pages").length}): ${arr(v, "pages").join(", ")}

Reference sites:
${lines(s(v, "competitors")).map((x) => "- " + x).join("\n") || "- none given"}

Must-haves:
- Mobile-first, loads in under 3s on 4G
- WhatsApp click-to-chat on every page
- Clear primary action: ${s(v, "goal").toLowerCase().includes("sell") ? "Add to cart / Checkout" : s(v, "goal").toLowerCase().includes("book") ? "Book now" : "Contact / Enquire"}
- SEO basics: titles, meta descriptions, Google Business Profile link

Content the client provides: logo, photos, service/product list, prices, testimonials
Deadline: ${s(v, "deadline")} · Budget: ${s(v, "budget")}

Sign-off: ____________________  Date: __________`;
    return [{ type: "text", title: "Design brief", text: brief, filename: "design-brief.txt" }];
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
