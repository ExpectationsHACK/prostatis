import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "design-brand-kit",
  title: "Design direction & brand kit",
  minutes: 75,
  outcome: "A one-page brand kit: colours, fonts, a logo idea and a voice, for a real business you can show a client.",
  intro:
    "Meet Mama Tobi. She sells home-cooked lunch to offices in Ikeja. Her Instagram uses a different colour and font in every post, so customers don't remember her. Today you'll fix that kind of problem the way professionals do: before building any website, you decide how the business should **look and sound**, and you write it down on one page. That page is called a **brand kit**. You'll make one for a real business, yours, a friend's, or a shop near you.",
  youNeed: ["A phone or laptop with internet", "A real business to practise on (yours, a friend's or a shop near you)", "30 minutes to talk to the owner (or answer the questions yourself)", "Free tools only: nothing to pay for today"],
  sections: [
    {
      heading: "Why design starts before building",
      blocks: [
        { t: "p", text: "When beginners build a website, they choose colours and fonts as they go. Page 1 uses orange, page 2 uses red, the buttons are three different shapes. Visitors can't say what's wrong, but the site feels messy, and a messy site feels untrustworthy. People don't buy from businesses they don't trust." },
        { t: "define", term: "Brand kit", meaning: "A one-page guide that says exactly how a business looks and sounds: its colours, its fonts, its logo, and the words it uses. Everything you make for the business follows it.", like: "a school uniform rule. Everyone knows the exact colour and style, so every student looks like they belong to the same school." },
        { t: "p", text: "A brand kit makes the big decisions **once**. After that, every page, and every instruction you give an AI tool, follows the same rules. You'll work faster and the result will look professional." },
        { t: "figure", figure: { diagram: "brand-kit", caption: "A finished brand kit: four colours, two fonts and three voice words, all on one card." } },
        { t: "scenario", title: "Mama Tobi's Kitchen, before and after", text: "Before: red posts, green posts, five fonts, and the logo is a blurry photo. After a one-page brand kit: warm orange and deep green, one bold headline font, one easy reading font, and three voice words, **warm, fast, homely**. Now every post, menu and web page looks like it came from the same kitchen. Customers start recognising her posts before they read the name." },
      ],
    },
    {
      heading: "Step 1: Understand the business with 5 questions",
      blocks: [
        { t: "p", text: "You can't design for a business you don't understand. Ask the owner these five questions and write the answers in plain sentences. If it's your own business, answer them yourself." },
        {
          t: "steps",
          items: [
            { title: "What do you sell, in one sentence?", detail: "Example: “Home-style Nigerian lunch delivered to offices in Ikeja.”" },
            { title: "Who buys it?", detail: "Be specific: “office workers aged 25–40 who order on their phones around 11am”. “Everybody” is not an answer." },
            { title: "Why do people choose you over others?", detail: "Faster? Tastier? Cheaper? Cleaner? One strong reason is enough." },
            { title: "Which 3 words should customers feel?", detail: "For example: warm, reliable, affordable. These become the **brand voice**." },
            { title: "Which brands or websites do you admire?", detail: "Two or three examples tell you more than an hour of talking." },
          ],
        },
        { t: "define", term: "Brand voice", meaning: "How a business sounds when it writes or speaks, for example friendly and playful, or calm and professional. It's usually summed up in three words.", like: "the difference between how you text your best friend and how you write to your bank manager. Same person, different voice." },
        { t: "try", title: "Ask the 5 questions today", minutes: 15, steps: ["Choose a real business near you (or your own).", "Send the owner the 5 questions on WhatsApp, or ask them in person.", "Write the answers in a note on your phone. You'll use them all week."] },
        { t: "tip", text: "Save these answers somewhere safe. You'll reuse them tomorrow for the website plan, later for the website words, and in the Main Track for the AI chatbot." },
      ],
    },
    {
      heading: "Step 2: Pick colours that work together",
      blocks: [
        { t: "p", text: "A good website needs only **four colours**:" },
        { t: "table", columns: ["Colour role", "Used for", "Mama Tobi example"], rows: [["Primary", "Buttons and the most important highlights", "Warm orange #FF6719"], ["Accent", "Small touches: badges, icons, links", "Deep green #0F4D3A"], ["Dark", "Body text", "Near-black #1B1714"], ["Light", "Page background", "Cream #F6EFE2"]] },
        { t: "define", term: "Hex code", meaning: "A colour's exact name written as # plus six letters or numbers, like #FF6719. Computers use it so the colour is identical everywhere.", like: "a paint code at the paint shop. Say “orange” and you might get any orange; give the code and you get exactly the right one." },
        { t: "p", text: "Match colours to the **three feeling words** from Step 1, not to your personal favourites:" },
        { t: "list", items: ["Food and energy brands often use warm colours: orange, red, yellow.", "Health, finance and schools often use calm colours, blue and green feel trustworthy.", "Luxury brands often use black, white and one rich colour like gold or deep green."] },
        { t: "tool", slug: "color-palette-generator", why: "Pick one main colour; it builds the full palette, shows how readable each colour is, and gives you the codes." },
      ],
    },
    {
      heading: "Step 3: Make sure people can read it",
      blocks: [
        { t: "p", text: "Pretty colours are useless if people can't read the text. Light grey on white looks stylish on a big laptop screen, but on a phone in bright Lagos sunlight it disappears." },
        { t: "define", term: "Contrast ratio", meaning: "A number that says how different two colours are in brightness. 1 : 1 means identical (unreadable). 21 : 1 is black on white. The international accessibility standard, WCAG, asks for at least **4.5 : 1** for normal text.", like: "writing with chalk. White chalk on a blackboard is easy to read; white chalk on a white wall is not." },
        { t: "figure", figure: { diagram: "contrast", caption: "Same button, four colour pairs. Only the ones at 4.5 : 1 or higher pass for normal text." } },
        { t: "p", text: "Notice the orange button: **white** text on orange is only 2.9 : 1 (fails), but **dark** text on the same orange is 6.1 : 1 (passes). Small change, huge difference." },
        { t: "check", q: "Your client wants light grey text (#9A9A9A) on a light grey background (#E9E9E9). The ratio is 2.3 : 1. What do you tell them?", options: ["It passes: it looks modern", "It fails the 4.5 : 1 rule; we should darken the text", "Ratios only matter for print"], answer: 1, why: "Normal text needs at least 4.5 : 1. At 2.3 : 1 many people, especially on phones outdoors, won't be able to read it." },
        { t: "try", title: "Test two colours right now", minutes: 5, steps: ["Open webaim.org/resources/contrastchecker in your browser.", "Type your primary colour's hex code as the background and #FFFFFF (white) as the text.", "Now try your dark colour as the text instead. Which one passes 4.5 : 1?"] },
      ],
    },
    {
      heading: "Step 4: Choose two fonts",
      blocks: [
        { t: "p", text: "Use **two fonts at most**: a **headline font** with personality for titles, and a **body font** that's easy to read for everything else. Google Fonts has hundreds, all free to use on websites." },
        { t: "define", term: "Font", meaning: "The style of the letters. “Archivo” and “Inter” are fonts. Some are bold and loud; some are plain and easy to read for long.", like: "handwriting. Same words, but each person's handwriting gives them a different feeling." },
        { t: "tool", slug: "font-pairing-picker", why: "Choose a mood and see tested pairs with a live preview, then copy the names into your brand kit." },
        { t: "tip", text: "Body text should be at least **16px** on phones. Smaller than that and people pinch, zoom, and leave." },
      ],
    },
    {
      heading: "Step 5: Get a logo idea with AI",
      blocks: [
        { t: "p", text: "You don't need to be an artist. AI image tools can give you logo **ideas** in minutes. Treat them as sketches: choose the best idea, then simplify it (or pay a designer to redraw it) before a real business uses it." },
        { t: "tool", slug: "logo-concept-prompts", why: "Writes clear prompts for five logo styles, name only, initials, symbol, badge and negative space." },
        { t: "warn", text: "Never copy another company's logo or imitate a famous brand closely. It can get your client into legal trouble. Simple, original and readable when small always wins." },
        { t: "check", q: "The AI gave you a beautiful logo with tiny details. What's the professional next step?", options: ["Use it exactly as it is", "Pick the best idea and simplify it so it's clear even when small", "Add more details"], answer: 1, why: "AI logos are concepts. Logos must be readable as a tiny icon on a phone, so simplify before real use." },
      ],
    },
    {
      heading: "Step 6: Put everything on one page",
      blocks: [
        { t: "p", text: "Your brand kit fits on **one page**, a Google Doc, a Canva page or a Notion page is fine. It contains:" },
        { t: "list", items: ["The one-sentence description and the target customer", "The three voice words, plus a few words to avoid", "Four colour swatches with their hex codes", "The two fonts and where each is used", "The chosen logo idea", "Two or three do's and don'ts"] },
        { t: "prompt", title: "Ask Claude to write the voice section", text: "You are a brand strategist. Here is a business: [paste your answers from Step 1]. Write a short 'brand voice' section for its style guide: the 3 voice words with one sentence each explaining them, 5 example phrases that sound on-brand, and 5 phrases to avoid. Use simple English a small business owner can follow." },
        { t: "tool", slug: "brand-style-guide", why: "Fills everything into a clean one-page style guide you can hand to a client." },
        { t: "mistakes", items: [{ wrong: "Choosing colours you personally like", right: "Choosing colours that match the three feeling words" }, { wrong: "Five different fonts “for variety”", right: "Two fonts: one for headlines, one for body text" }, { wrong: "Light grey text because it “looks clean”", right: "Checking every text colour passes 4.5 : 1" }, { wrong: "Using an AI logo exactly as generated", right: "Simplifying it and checking it's original" }] },
      ],
    },
  ],
  task: {
    title: "Make a brand kit for a real business",
    steps: ["Pick a real business (yours, a friend's, or one you'd like as a client).", "Ask the 5 questions and write down the answers.", "Build a 4-colour palette and check the text colours pass 4.5 : 1.", "Pick two fonts.", "Generate logo ideas and choose one.", "Put everything on one page and save it. You'll use it tomorrow."],
    done: ["My palette has a primary, accent, dark and light colour with hex codes", "My body text colour passes 4.5 : 1 on my background", "I have exactly two fonts", "My brand kit fits on one page"],
  },
  recap: [
    "A **brand kit** makes the big design decisions once, colours, fonts, logo and voice, so every page and every AI prompt stays consistent.",
    "Normal text needs a **contrast ratio of at least 4.5 : 1** against its background (the WCAG rule). Lower than that, many people can't read it.",
    "Use **two fonts at most**: one with personality for headlines, one easy to read for body text.",
    "Choose colours to match the **feeling the business wants customers to have** (its three voice words), not your personal favourites.",
    "AI logos are **concepts**: pick the best idea, simplify it, make sure it's original, then use it.",
  ],
  resources: [
    { label: "Google Fonts", url: "https://fonts.google.com", note: "Free fonts that work on every website." },
    { label: "Coolors", url: "https://coolors.co", note: "Explore and save colour palettes." },
    { label: "WebAIM contrast checker", url: "https://webaim.org/resources/contrastchecker/", note: "Check any two colours against the accessibility rule." },
    { label: "web.dev: Learn Design", url: "https://web.dev/learn/design", note: "Free course on design for all screen sizes, from Google." },
    { label: "Canva", url: "https://www.canva.com", note: "An easy place to lay out your one-page brand kit." },
  ],
  quiz: [
    { q: "What is the main purpose of a brand kit?", options: ["To look impressive in a proposal", "To make the big design decisions once, so everything follows them", "To replace the website", "To choose a domain name"], answer: 1, why: "A brand kit captures colours, fonts, logo and voice in one place, so every page (and every AI prompt) stays consistent.", from: 0 },
    { q: "What contrast ratio does the accessibility rule (WCAG) ask for normal text?", options: ["1.5 : 1", "3 : 1", "4.5 : 1", "10 : 1"], answer: 2, why: "4.5 : 1 is the minimum for normal-sized text.", from: 1 },
    { q: "How many fonts should a typical business website use?", options: ["One per page", "Two at most: one for headlines, one for body text", "As many as possible for variety", "Five"], answer: 1, why: "Two fonts give personality and readability. More fonts look messy and slow the page down.", from: 2 },
    { q: "What should decide a brand's colours?", options: ["Your personal favourite colours", "Whatever is trending this month", "The feeling the business wants customers to have", "The cheapest colours to print"], answer: 2, why: "Colours should support the three voice words, warm, calm, premium and so on.", from: 3 },
    { q: "How should you treat a logo made by AI?", options: ["Use it exactly as generated", "As a concept: pick the best idea, simplify it and check it's original", "Copy a famous logo instead", "Logos aren't needed"], answer: 1, why: "AI gives fast ideas; the chosen one must be simplified and original before real use.", from: 4 },
  ],
};

export default lesson;
