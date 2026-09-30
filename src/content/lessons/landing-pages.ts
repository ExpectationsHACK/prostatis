import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "landing-pages",
  title: "Landing pages that convert",
  minutes: 100,
  outcome: "A live landing page for one offer, headline, proof, details, questions and one clear action, checked with our landing page tool.",
  intro:
    "Kemi runs a lash studio. She's about to spend ₦50,000 on Instagram ads for a bridal promo. If the ad sends people to her general website, they'll wander, get distracted and leave. If it sends them to a page about **only** the bridal promo, with **one** button: “Book your bridal lashes”, far more of them are likely to book. That single-purpose page is a **landing page**, and it's one of the fastest things you can build and sell.",
  youNeed: ["Your project from Day 4 (or a new one: landing pages can stand alone)", "One real offer: what it is, who it's for, the price", "At least one real review or photo (or clear placeholders)", "Your WhatsApp link, a payment link, or a booking link for the button"],
  sections: [
    {
      heading: "Landing page vs. website",
      blocks: [
        { t: "define", term: "Landing page", meaning: "A single page with a single job: get the visitor to take **one** action: book, buy, call or join a list. It usually has no menu, so there's nothing else to click.", like: "a stall at a market selling one thing, with one person saying “Buy here”, versus a whole supermarket." },
        { t: "table", columns: ["", "Business website", "Landing page"], rows: [["Goal", "Explain the whole business", "One offer, one action"], ["Pages", "5 or more", "One"], ["Menu", "Full menu", "Usually none: no exits"], ["Visitors come from", "Google, word of mouth", "Ads, Instagram bio, WhatsApp status, email"], ["Build time", "Days", "Hours"]] },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a landing page, top to bottom: promise, proof, details, objections, action." } },
        { t: "check", q: "A salon has a bridal promo and a separate lash promo this month. What should you build?", options: ["One page with both promos", "Two landing pages: one per offer", "Nothing: use the home page"], answer: 1, why: "One page per offer keeps the message and the action crystal clear." },
      ],
    },
    {
      heading: "Step 1: One offer, one audience, one action",
      blocks: [
        { t: "p", text: "Before writing anything, fill in this sentence. If you can't, the page isn't ready to build:" },
        { t: "code", lang: "text", text: "This page gets [who] to [one action]\nbecause they want [result], and we're the best choice because [reason]." },
        { t: "p", text: "Example: “This page gets **brides in Lekki** to **book bridal lashes on WhatsApp** because they want **lashes that look natural in photos and last the whole day**, and we're the best choice because **we come to your venue**.”" },
        { t: "define", term: "Call to action (CTA)", meaning: "The button or link that asks the visitor to act, “Book on WhatsApp”, “Pay deposit”, “Get the free guide”. A landing page has **one** CTA, repeated.", like: "the “Pay here” sign at a counter. There's only one counter, and the sign points to it." },
        { t: "try", title: "Write your one-offer sentence", minutes: 5, steps: ["Pick one real offer from your practice business.", "Fill in the sentence above.", "Read it to someone: can they repeat back what's on offer?"] },
      ],
    },
    {
      heading: "Step 2: Write copy that sells",
      blocks: [
        { t: "p", text: "Every visitor silently asks: Is this for me? What do I get? Can I trust you? How much? What if…? What do I do now? Your page answers them **in that order**." },
        { t: "define", term: "Benefit vs. feature", meaning: "A **feature** is a fact about the product (“premium silk fibres”). A **benefit** is what the customer gets from it (“lashes that look natural and last 4 weeks”). Lead with benefits.", like: "a phone's “5000mAh battery” (feature) versus “lasts all day without charging” (benefit)." },
        { t: "table", columns: ["Rule", "Before", "After"], rows: [["Benefits before features", "We use premium fibres", "Lashes that look natural and last 4 weeks"], ["Specific beats vague", "Fast delivery", "Delivered in Ikeja within 45 minutes"], ["Customer's words", "Bespoke aesthetic solutions", "Braids that don't hurt"], ["One action", "Call, email, follow, subscribe…", "Book on WhatsApp"]] },
        { t: "tool", slug: "landing-page-copy-generator", why: "Generates the full page: headline, benefits, proof, questions and CTA, from the offer details." },
        { t: "tool", slug: "hero-copy-generator", why: "Five headline + subhead + button options for the top of the page." },
        { t: "check", q: "Which line is a benefit?", options: ["Made with 100% cotton", "Stays cool and comfortable in Lagos heat", "Available in size M", "Imported from Turkey"], answer: 1, why: "It says what the customer experiences. The others are features: facts about the product." },
      ],
    },
    {
      heading: "Step 3: Proof and objections",
      blocks: [
        { t: "list", items: ["**Proof**: 3 or more real reviews with first names (screenshots of real WhatsApp messages work well, ask permission first), before/after photos, numbers you can back up.", "**Objections**: answer the real questions from the owner's chats: price, location, how long it takes, what if I'm not happy.", "**Risk reversal**: a clear refund or rebooking policy, if the business offers one. It makes saying yes feel safe."] },
        { t: "define", term: "Objection", meaning: "A doubt that stops someone from buying, “it's too expensive”, “what if it hurts?”, “is it far from me?”. A good page answers these before the visitor leaves to ask someone else.", like: "the questions a customer asks at the market before handing over money." },
        { t: "tool", slug: "testimonial-formatter", why: "Turns messy messages into clean review cards with first name and result." },
        { t: "tool", slug: "faq-generator", why: "Likely questions and clear answers for the business type." },
        { t: "warn", text: "Never invent reviews, numbers or awards. Get each customer's permission before using their words or photo." },
        { t: "tip", text: "You may read advice to add “FAQ schema” to get extra lines in Google results. Google no longer shows those FAQ results for ordinary business websites, so don't promise a client that. The questions themselves still help visitors. That's what matters." },
      ],
    },
    {
      heading: "Step 4: Build it",
      blocks: [
        { t: "prompt", title: "Landing page prompt", text: "Build a single landing page at /[offer-name] for [business]. Audience: [who]. Offer: [what, price]. Use this copy: [paste]. Sections in order: hero with headline, subhead and one button; 3 benefits; proof (reviews); what's included and price; questions and answers; a final call to action repeating the same button. No navigation menu: only the logo. The button opens https://wa.me/234XXXXXXXXXX with the message '[pre-filled text]' (or links to [payment or booking link]). Mobile-first, fast, accessible, with its own page title and description. Use the brand colours and fonts in CLAUDE.md." },
        { t: "figure", figure: { product: "coach", caption: "A coaching landing page: one promise, proof, and one button, “Book a free call”." } },
        { t: "tip", text: "The button must be visible **without scrolling** on a phone. Check at 360px wide (F12 → phone icon)." },
        { t: "scenario", title: "Same ad, better destination", text: "Picture a lash studio running the same Instagram ad two weeks in a row. Week 1 it links to the home page, where visitors can wander into Gallery, About and Prices. Week 2 it links to a bridal landing page with one WhatsApp button repeated three times. Nothing else changes, so any difference in enquiries comes from the page. Run this test with your own client and count the WhatsApp messages: that's real proof you can put in your portfolio." },
      ],
    },
    {
      heading: "Step 5: Test it before launch",
      blocks: [
        { t: "p", text: "Test it locally now; once it's live (deploy day), run the checker on the real link." },
        { t: "tool", slug: "landing-page-checklist", why: "Paste the page's live link: it checks the headline, buttons, proof, forms and speed signals, then gives you the manual checklist." },
        { t: "list", items: ["Ask two people who don't know the business: “What is this offering, and what would you click?” If they hesitate, simplify.", "Tap the button on a **real phone**, does WhatsApp, payment or booking open correctly?", "Add analytics (see the deploy lesson) so you can report visits and clicks to the client."] },
        { t: "mistakes", items: [{ wrong: "A full menu at the top “just in case”", right: "Logo only: every exit is a lost customer" }, { wrong: "Three different buttons", right: "One CTA, repeated at the top, middle and end" }, { wrong: "A beautiful hero with the button below the fold on phones", right: "Headline + button visible on a 360px screen without scrolling" }] },
      ],
    },
  ],
  task: {
    title: "Ship a landing page",
    steps: ["Write your one-offer sentence.", "Generate the copy and edit it; replace placeholders with real proof where you can.", "Build the page with the prompt.", "Test it on a real phone and with two people.", "After deploy day, run the landing page checklist on the live link and fix what it finds."],
    done: ["The page has one offer and one repeated call to action", "The button is visible without scrolling on a phone", "Every review and number is real or clearly a placeholder", "Two people could say what it offers within 5 seconds"],
  },
  recap: [
    "A **landing page** has one offer and one action, and usually **no menu**, removing exits is what makes it convert.",
    "A **benefit** says what the customer gets (“lashes that last 4 weeks”); a **feature** is a fact (“premium fibres”). Lead with benefits.",
    "**One page per offer**: two promos need two landing pages.",
    "The main button must be **visible without scrolling on a phone**, and repeated at the end.",
    "A page is ready when it **passes the checklist and strangers can say what it offers** within seconds.",
  ],
  resources: [
    { label: "Nielsen Norman Group: Writing for the web", url: "https://www.nngroup.com/topic/writing-web/", note: "Research-based web writing guidance." },
    { label: "Copyhackers blog", url: "https://copyhackers.com/blog/", note: "Free lessons on conversion copywriting." },
    { label: "HubSpot Academy: Content marketing", url: "https://academy.hubspot.com/courses/content-marketing", note: "Free content course." },
    { label: "Shopify: What is a lead magnet?", url: "https://www.shopify.com/blog/lead-magnet", note: "Landing pages are often used with free offers like these." },
  ],
  quiz: [
    { q: "What makes a landing page different from a normal website?", options: ["It has more pages", "One offer, one action, usually no menu", "It has no text", "It can't be opened on a phone"], answer: 1, why: "Removing exits and focusing on one action is what makes it convert.", from: 0 },
    { q: "Which line is a benefit rather than a feature?", options: ["We use premium fibres", "Lashes that look natural and last 4 weeks", "Our studio has 3 chairs", "We use Next.js"], answer: 1, why: "Benefits describe the customer's result.", from: 1 },
    { q: "A salon runs two promotions. How many landing pages?", options: ["One page with both", "Two: one per offer", "None", "Five"], answer: 1, why: "One page per offer keeps the message and action clear.", from: 2 },
    { q: "Where must the main button appear on a phone?", options: ["Only at the very bottom", "Visible without scrolling, and repeated at the end", "Hidden in a menu", "Nowhere"], answer: 1, why: "Visitors decide in seconds: the action must be visible straight away.", from: 3 },
    { q: "How do you know a landing page is ready?", options: ["It looks nice", "It passes the checklist and strangers can say what it offers", "The AI said so", "It has many colours"], answer: 1, why: "Test with the tool and with real people before launch.", from: 4 },
  ],
};

export default lesson;
