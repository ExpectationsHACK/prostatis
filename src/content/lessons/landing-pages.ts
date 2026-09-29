import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "landing-pages",
  title: "Landing pages that convert",
  minutes: 100,
  outcome: "A live landing page for one offer — headline, proof, details, FAQ and one clear action — that you've checked against conversion best practice.",
  intro:
    "A landing page is a single page with a single job: get the visitor to take one action — book, buy, call, or join a list. Businesses use them for a new product, a promotion, an event or an ad campaign, and they're one of the fastest things you can build and sell. Today you'll plan, write and build one, then test it with our landing page checker.",
  sections: [
    {
      heading: "Landing page vs. website",
      blocks: [
        { t: "table", columns: ["", "Business website", "Landing page"], rows: [["Goal", "Explain the whole business", "One offer, one action"], ["Pages", "5 or more", "One"], ["Menu", "Full navigation", "Usually none — no exits"], ["Traffic", "Google, word of mouth", "Ads, Instagram bio, WhatsApp status, email"], ["Build time", "Days", "Hours"]] },
        { t: "p", text: "Because there's nothing else to click, a good landing page often turns far more visitors into customers than a normal page. That's why businesses running ads on Instagram or Google should always send people to one." },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a landing page, top to bottom: promise, proof, details, objections, action." } },
      ],
    },
    {
      heading: "Step 1 — One offer, one audience, one action",
      blocks: [
        { t: "p", text: "Before writing anything, fill in this sentence. If you can't, the page isn't ready to build:" },
        { t: "code", lang: "text", text: "This page gets [who] to [one action]\nbecause they want [result], and we're the best choice because [reason]." },
        { t: "p", text: "Example: “This page gets office workers in Ikeja to **order lunch on WhatsApp** because they want **a hot, affordable meal at their desk**, and we're the best choice because **we deliver in 30 minutes**.”" },
        { t: "tip", text: "One page per offer. A salon running a bridal promo and a lash promo needs two landing pages, not one page with both." },
      ],
    },
    {
      heading: "Step 2 — Write copy that sells",
      blocks: [
        { t: "p", text: "Every visitor silently asks: Is this for me? What do I get? Can I trust you? How much? What if…? What do I do now? Your page answers them in that order." },
        { t: "table", columns: ["Rule", "Before", "After"], rows: [["Benefits before features", "We use premium fibres", "Lashes that look natural and last 4 weeks"], ["Specific beats vague", "Fast delivery", "Delivered in Ikeja within 45 minutes"], ["Customer's words", "Bespoke aesthetic solutions", "Braids that don't hurt"], ["One action", "Call, email, follow, subscribe…", "Book on WhatsApp"]] },
        { t: "tool", slug: "landing-page-copy-generator", why: "Generates the full page — headline, benefits, proof, FAQ and call to action — from the offer details." },
        { t: "tool", slug: "hero-copy-generator", why: "Five headline + subhead + button options for the top of the page." },
        { t: "warn", text: "Never invent testimonials, numbers or awards. Use [placeholders] until you have real proof, and get customers' permission before using their words." },
      ],
    },
    {
      heading: "Step 3 — Proof and objections",
      blocks: [
        { t: "list", items: ["**Proof**: 3+ real testimonials with names (screenshots of real WhatsApp messages work well), before/after photos, numbers you can back up.", "**Objections**: an FAQ answering the real questions from the owner's chats — price, location, how long, refunds.", "**Risk reversal**: a guarantee or clear refund/rebooking policy if the business offers one."] },
        { t: "tool", slug: "testimonial-formatter", why: "Turns messy messages into clean testimonial cards." },
        { t: "tool", slug: "faq-generator", why: "Likely questions and clear answers, plus FAQ schema for Google." },
      ],
    },
    {
      heading: "Step 4 — Build it",
      blocks: [
        { t: "prompt", title: "Landing page prompt", text: "Build a single landing page at /[offer-name] for [business]. Audience: [who]. Offer: [what, price]. Use this copy: [paste]. Sections in order: hero with headline, subhead and one button; 3 benefits; proof (testimonials); what's included and price; FAQ; final call to action repeating the same button. No navigation menu — only the logo. The button opens WhatsApp https://wa.me/234XXXXXXXXXX with the message '[pre-filled text]' (or links to [Paystack payment page / booking page]). Mobile-first, fast, accessible, with a unique title and meta description. Use the brand colours and fonts in CLAUDE.md." },
        { t: "figure", figure: { product: "coach", caption: "A coaching landing page: one promise, proof, and one button — “Book a free call”." } },
        { t: "tip", text: "The button must be visible without scrolling on a phone. Check at 360px wide." },
      ],
    },
    {
      heading: "Step 5 — Test it before launch",
      blocks: [
        { t: "tool", slug: "landing-page-checklist", why: "Paste your deployed page URL — it checks headline, calls to action, proof, forms, speed signals and more, then gives you the manual checklist." },
        { t: "list", items: ["Ask two people who don't know the business: “What is this page offering, and what would you click?” If they hesitate, simplify.", "Tap the button on a real phone — does WhatsApp/payment/booking open correctly?", "Add analytics (see the deploy lesson) so you can report visits and clicks to the client."] },
      ],
    },
  ],
  task: {
    title: "Ship a landing page",
    steps: ["Write your one-offer sentence.", "Generate and edit the copy; replace placeholders with real proof where you can.", "Build the page with the prompt.", "Deploy it (a Vercel preview link is fine for now).", "Run the landing page checklist on the live URL and fix what it finds."],
    done: ["The page has one offer and one repeated action", "The button is visible without scrolling on a phone", "Every testimonial and number is real or clearly a placeholder", "The landing page checklist passes on the live URL"],
  },
  resources: [
    { label: "Nielsen Norman Group — Writing for the web", url: "https://www.nngroup.com/topic/writing-web/", note: "Research-based web writing guidance." },
    { label: "Copyhackers blog", url: "https://copyhackers.com/blog/", note: "Free lessons on conversion copywriting." },
    { label: "Google — FAQ structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/faqpage", note: "How FAQ schema works." },
    { label: "HubSpot Academy — Content marketing", url: "https://academy.hubspot.com/courses/content-marketing", note: "Free content course." },
  ],
  quiz: [
    { q: "What makes a landing page different from a normal website?", options: ["It has more pages", "One offer, one action, usually no menu", "It has no text", "It can't be on a phone"], answer: 1, why: "Removing exits and focusing on one action is what makes it convert." },
    { q: "Which is a benefit rather than a feature?", options: ["We use premium fibres", "Lashes that look natural and last 4 weeks", "Our studio has 3 chairs", "We use Next.js"], answer: 1, why: "Benefits describe the customer's result." },
    { q: "A salon runs two promotions. How many landing pages?", options: ["One page with both", "Two — one per offer", "None", "Five"], answer: 1, why: "One page per offer keeps the message and action clear." },
    { q: "Where must the main button appear on a phone?", options: ["Only at the very bottom", "Visible without scrolling, and repeated at the end", "Hidden in a menu", "Nowhere"], answer: 1, why: "Visitors decide in seconds — the action must be immediately visible." },
    { q: "How do you know the page is ready?", options: ["It looks nice", "The checklist passes on the live URL and strangers can say what it offers", "The AI said so", "It has many colours"], answer: 1, why: "Test with tools and real people before launch." },
  ],
};

export default lesson;
