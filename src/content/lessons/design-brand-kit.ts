import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "design-brand-kit",
  title: "Design direction & brand kit",
  minutes: 75,
  outcome: "A one-page brand kit — colours, fonts, logo concept and voice — for a real business.",
  intro:
    "Before anyone writes code, a professional decides how the website should look and feel. That decision is called a design direction, and the document that captures it is a brand kit. Today you'll make one for a real business (yours, a friend's, or a local shop you'd like as a client). It takes about an hour, and every page you build later will be faster because the big decisions are already made.",
  sections: [
    {
      heading: "Why design starts before building",
      blocks: [
        { t: "p", text: "Most beginners open a website builder and start picking colours as they go. The result looks messy because every page makes slightly different choices. Clients notice — even if they can't say why — and messy sites feel untrustworthy." },
        { t: "p", text: "A brand kit fixes this. It's a single page that answers: **Who is this for? How should it feel? Which colours and fonts, exactly? How does the business talk?** Once that page exists, you (and your AI) just follow it." },
        { t: "figure", figure: { tool: "brand-style-guide", caption: "The finished brand kit: colours, headline font, and three words that describe the voice." } },
      ],
    },
    {
      heading: "Step 1 — Understand the business in 5 questions",
      blocks: [
        { t: "p", text: "Ask the owner (or answer yourself) these five questions. Write the answers down in plain sentences." },
        {
          t: "steps",
          items: [
            { title: "What do you sell, in one sentence?", detail: "“Home-style Nigerian lunch delivered to offices in Ikeja.”" },
            { title: "Who buys it?", detail: "Be specific: “office workers aged 25–40 ordering on their phones at 11am”." },
            { title: "Why do they choose you over others?", detail: "Faster delivery? Better taste? Cheaper? Cleaner? One reason is enough." },
            { title: "Which 3 words should people feel?", detail: "For example: warm, reliable, affordable. These become the brand voice." },
            { title: "Which websites or brands do you admire?", detail: "Two or three examples tell you more than an hour of discussion." },
          ],
        },
        { t: "tip", text: "Save these answers — you'll reuse them in the design brief (Day 2), the website copy, and even the AI chatbot later." },
      ],
    },
    {
      heading: "Step 2 — Pick colours that work together (and are readable)",
      blocks: [
        { t: "p", text: "A good website needs only a few colours: one **primary** colour for buttons and highlights, one **accent** for small touches, a **dark** colour for text and a **light** background. More than that and the site starts to look busy." },
        { t: "p", text: "Colour also has to be readable. Text needs enough **contrast** against its background — the international accessibility standard (WCAG) asks for a ratio of at least **4.5 : 1** for normal text. Grey text on a light grey background fails this, and many people (especially on bright phone screens outdoors) simply can't read it." },
        { t: "tool", slug: "color-palette-generator", why: "Pick the business's main colour and it builds the full palette, shows the contrast ratio for each colour, and gives you ready CSS." },
        { t: "list", items: ["Food and energy brands often use warm colours (orange, red, yellow).", "Health, finance and schools often use calm colours (blue, green) because they feel trustworthy.", "Luxury brands often use black, white and one rich colour (gold, deep green, plum)."] },
        { t: "warn", text: "Don't pick colours only because you like them. Pick colours that match the three feeling-words from Step 1." },
      ],
    },
    {
      heading: "Step 3 — Choose two fonts",
      blocks: [
        { t: "p", text: "Use **two fonts at most**: one for headings (with personality) and one for body text (easy to read). Google Fonts is free and works on every website." },
        { t: "tool", slug: "font-pairing-picker", why: "Choose the mood and see three tested pairings with a live preview and copy-paste CSS." },
        { t: "tip", text: "Body text should be at least 16px on phones. Anything smaller makes people pinch and zoom — and leave." },
      ],
    },
    {
      heading: "Step 4 — Get a logo concept with AI",
      blocks: [
        { t: "p", text: "You don't need to be an illustrator. An AI image tool can give you logo *concepts* in minutes. Treat them as sketches: you'll pick the best idea and clean it up (or ask a designer to redraw it) before it goes on a real business." },
        { t: "tool", slug: "logo-concept-prompts", why: "Writes precise prompts for five logo styles: wordmark, lettermark, symbol, emblem and negative space." },
        { t: "warn", text: "Never copy another company's logo or use a famous brand's style too closely. It can get your client into legal trouble. Original, simple and readable at small sizes wins." },
      ],
    },
    {
      heading: "Step 5 — Put it all on one page",
      blocks: [
        { t: "p", text: "Your brand kit is one page (a Google Doc, Canva page or Notion page is fine). It should contain:" },
        { t: "list", items: ["The one-sentence description and the target customer", "The three voice words, plus a few words to avoid", "Colour swatches with their hex codes (e.g. #ff6719)", "The two fonts and where each is used", "The chosen logo concept", "Two or three do's and don'ts"] },
        { t: "prompt", title: "Ask Claude to write the voice section", text: "You are a brand strategist. Here is a business: [paste your answers from Step 1]. Write a short 'brand voice' section for its style guide: 3 voice words with one sentence each explaining them, 5 example phrases that sound on-brand, and 5 words or phrases to avoid. Keep it simple enough for a small business owner to follow." },
        { t: "tool", slug: "brand-style-guide", why: "Fills everything into a clean, one-page style guide you can hand to a client." },
      ],
    },
  ],
  task: {
    title: "Make a brand kit for a real business",
    steps: ["Pick a real business (yours, a friend's, or one you'd like as a client).", "Answer the 5 questions.", "Build the palette and check contrast.", "Pick two fonts.", "Generate logo concepts and choose one.", "Put everything on one page and save it — you'll use it tomorrow."],
    done: ["My palette has a primary, accent, dark and light colour", "Body text passes 4.5:1 contrast", "I have exactly two fonts", "My brand kit fits on one page"],
  },
  resources: [
    { label: "Google Fonts", url: "https://fonts.google.com", note: "Free fonts that work on every website." },
    { label: "Coolors", url: "https://coolors.co", note: "Explore and save colour palettes." },
    { label: "WebAIM contrast checker", url: "https://webaim.org/resources/contrastchecker/", note: "Check any two colours against the accessibility standard." },
    { label: "web.dev — Learn Design", url: "https://web.dev/learn/design", note: "Free course on responsive design basics from Google." },
    { label: "Canva", url: "https://www.canva.com", note: "Easy place to lay out your one-page brand kit." },
  ],
  quiz: [
    { q: "What is the main purpose of a brand kit?", options: ["To look impressive in a proposal", "To make the big design decisions once, so every page follows them", "To replace the website", "To choose a domain name"], answer: 1, why: "A brand kit captures colours, fonts, logo and voice in one place, so every page (and every AI prompt) stays consistent." },
    { q: "What contrast ratio does WCAG ask for normal body text?", options: ["1.5 : 1", "3 : 1", "4.5 : 1", "10 : 1"], answer: 2, why: "4.5 : 1 is the minimum for normal text. Large headings can go down to 3 : 1." },
    { q: "How many fonts should a typical business website use?", options: ["One per page", "Two at most — one for headings, one for body", "As many as possible for variety", "Five"], answer: 1, why: "Two fonts give personality and readability. More fonts look messy and slow the page down." },
    { q: "Which is the best basis for choosing brand colours?", options: ["Your personal favourite colours", "Whatever is trending on Instagram", "The feeling the business wants customers to have", "The cheapest colours to print"], answer: 2, why: "Colours should support the three voice words — warm, calm, premium and so on." },
    { q: "How should you treat AI-generated logos?", options: ["Use them exactly as generated", "As concepts to pick from and clean up before real use", "Copy a famous logo instead", "Logos aren't needed"], answer: 1, why: "AI gives fast concepts; the chosen one should be simplified and redrawn so it's clean and original." },
  ],
};

export default lesson;
