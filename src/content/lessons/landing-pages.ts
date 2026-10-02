import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "landing-pages",
  title: "Landing pages that convert",
  minutes: 100,
  outcome: "A live page for one offer (Bisi's aso-ebi package for wedding groups) with one promise, real proof, the details, answers to doubts and one repeated button, checked by our live checker and by two real people.",
  intro:
    "Wedding season is coming, and Bisi wants more **aso-ebi** orders: whole groups of friends and family sewing matching outfits for one wedding. She'll post it on her WhatsApp Status and put ₦10,000 behind an Instagram post. If those posts send people to her home page, they'll wander into the gallery, the about page and the price list, get distracted and leave. If they land on a page about **only** the aso-ebi package, with **one** button (“Plan your aso-ebi on WhatsApp”), far more of them are likely to message her. That single-purpose page has a name, and it's one of the fastest things you can build and sell.",
  core: "One page, one offer, one action: removing every other choice is what makes visitors act.",
  youNeed: [
    "Your live website from Day 4",
    "One real offer from the owner: what it is, who it's for, the price and any deadline",
    "At least one real review or photo (or clear placeholders)",
    "Two friends who don't know the business, for a 5-second test",
  ],
  sections: [
    {
      heading: "One offer, one page",
      blocks: [
        {
          t: "define",
          term: "Landing page",
          like: "a hawker at Oshodi selling only one thing and shouting one price, versus a supermarket with a hundred aisles. The hawker sells faster because there's nothing else to look at.",
          meaning: "A single page with a single job: get the visitor to take **one** action (order, book, pay or join a list). It usually has **no menu**, so there's nothing else to click.",
        },
        { t: "table", columns: ["", "Business website", "Landing page"], rows: [["Goal", "Explain the whole business", "One offer, one action"], ["Pages", "5 or more", "One"], ["Menu", "Full menu", "Usually none: no other doors"], ["Visitors come from", "Google, friends, the signboard", "Adverts, WhatsApp Status, Instagram bio, a flyer's QR code"], ["Build time", "Days", "Hours"]] },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Website: many doors", nodes: [{ draw: "shop", label: "gallery, about, prices…" }, { draw: "person", label: "visitor wanders off" }] },
            right: { title: "Landing page: one door", nodes: [{ draw: "door", label: "aso-ebi only", hot: true }, { draw: "whatsapp", label: "one button: message Bisi" }] },
          },
          caption: "A website is a shop with many doors to wander through; a landing page is one door with one thing behind it. People sent by an advert need the one door.",
        },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a landing page, top to bottom: promise, proof, details, doubts, action." } },
        { t: "check", q: "A salon has a bridal promo and a separate lash promo this month. What should you build?", options: ["One page with both promos", "Two landing pages: one per offer", "Nothing: send people to the home page"], answer: 1, why: "One page per offer keeps the message and the action crystal clear." },
      ],
    },
    {
      heading: "Step 1: Pass the one-sentence test",
      blocks: [
        { t: "p", text: "Before writing anything, fill in this sentence. If you can't, the page isn't ready to build:" },
        { t: "code", lang: "text", text: "This page gets [who] to [one action]\nbecause they want [result], and we're the best choice because [reason]." },
        { t: "p", text: "Bisi's: “This page gets **families and friends planning aso-ebi for a Lagos wedding** to **send their group's details on WhatsApp** because they want **every outfit sewn to each person's size and ready before the wedding**, and Bisi is the best choice because **she measures every person and delivers on the date she promises**.”" },
        { t: "try", title: "Write your one-offer sentence", minutes: 5, steps: ["Ask the owner which single offer they most want to sell this month.", "Fill in the sentence above for that offer.", "Read it to someone: can they repeat back what's on offer and what to do?"] },
      ],
    },
    {
      heading: "Step 2: Words that sell",
      blocks: [
        { t: "p", text: "Every visitor silently asks: Is this for me? What do I get? Can I trust you? How much? What if…? What do I do now? Your page answers them **in that order**." },
        {
          t: "define",
          term: "Benefit and feature",
          like: "a phone seller at Computer Village saying “5,000 mAh battery” (a feature) versus “lasts a full day of WhatsApp and calls without charging” (a benefit). Only one of them makes you reach for your wallet.",
          meaning: "A **feature** is a fact about the product. A **benefit** is what the customer gets from it. Lead with benefits; mention features as proof.",
        },
        { t: "table", columns: ["Rule", "Before", "After"], rows: [["Benefits before features", "We use a measuring app", "Every outfit fits on the wedding day"], ["Specific beats vague", "Fast delivery", "Ready 5 days before the wedding"], ["The customer's words", "Bespoke group couture solutions", "Matching aso-ebi for your whole group"], ["One action", "Call, email, follow, subscribe…", "Plan your aso-ebi on WhatsApp"]] },
        { t: "tool", slug: "landing-page-copy-generator", why: "Writes the whole page (headline, benefits, proof, questions and button) from the offer details." },
        { t: "tool", slug: "hero-copy-generator", why: "Five headline, subhead and button options for the top of the page." },
        { t: "check", q: "Which line is a benefit?", options: ["Made with 100% cotton lining", "Stays cool and comfortable through a long Lagos reception", "Available in size M", "Imported fabric"], answer: 1, why: "It says what the customer experiences. The others are features: facts about the product." },
      ],
    },
    {
      heading: "Step 3: Proof and doubts",
      blocks: [
        {
          t: "define",
          term: "Objection",
          like: "the questions a customer asks at the market before handing over money: Is it original? Can you reduce it? What if it doesn't fit?",
          meaning: "A doubt that stops someone from buying. A good page answers the real ones (from the owner's chats) before the visitor leaves to ask someone else.",
        },
        {
          t: "define",
          term: "Risk reversal",
          like: "a mechanic saying “if the noise comes back within a week, bring it back and I'll fix it free”. Suddenly saying yes feels safe.",
          meaning: "A clear promise that makes buying feel safe, like Bisi's “free adjustment if anything doesn't fit”. Only include it if the business **really** offers it, in writing.",
        },
        { t: "list", items: ["**Proof**: 3 or more real reviews with first names (screenshots of real WhatsApp messages work well; ask permission first), real photos of past group orders.", "**Objections**: answer the questions from the owner's chats: price per person, how long, how measuring works for people outside Lagos, what if it doesn't fit.", "**Risk reversal**: a refitting or deposit-refund rule, only if the owner truly offers it."] },
        { t: "tool", slug: "testimonial-formatter", why: "Turns messy WhatsApp messages into clean review cards with first name and result." },
        { t: "tool", slug: "faq-generator", why: "Suggests the questions customers are likely to ask, with clear answers to edit." },
        { t: "warn", text: "Never invent reviews, numbers or awards. Get each customer's permission before using their words or photo." },
        { t: "tip", text: "You may read online that a special code makes extra question lines appear under your result in Google. Google stopped showing those for ordinary business websites, so don't promise that to a client. The questions still help visitors, and that's what matters." },
      ],
    },
    {
      heading: "Step 4: Build it inside the same site",
      blocks: [
        {
          t: "define",
          term: "Above the fold",
          also: ["Below the fold"],
          like: "the top half of a newspaper on the vendor's table: the part people see before they pick it up. If the headline isn't there, they walk past.",
          meaning: "What shows on the screen **before** any scrolling. On a phone it's small, so the headline and the button must both fit there. Anything further down is **below the fold**.",
        },
        { t: "p", text: "The page lives in your existing site as a new file, `aso-ebi.html`. It uses the shared look (`styles.css`) but **not** the shared menu (`site.js`): no menu means no other doors." },
        { t: "prompt", title: "The aso-ebi page", text: "Read the project brief first and follow it.\n\nCreate ONE new page, site/aso-ebi.html, for this offer: [paste your one-offer sentence]. Use these words: [paste the copy you edited]. Use styles.css but do NOT use site.js: no menu, just the business name at the top. Sections in order: hero (headline, subhead, one button); 3 benefits; proof (reviews and photos, or clear [placeholders]); what's included and the price per person; questions and answers; a final repeat of the same button. Every button opens https://wa.me/[NUMBER]?text= with the message 'Hi Bisi, I'm planning aso-ebi for a wedding on [date] for [number] people.' The headline and button must both show on a 360-pixel-wide phone without scrolling. Give the page its own title and a one-sentence description for search results." },
        {
          t: "steps",
          items: [
            { title: "Review it", detail: "Approve the plan and the new `site/aso-ebi.html` (free chat: in VS Code, make `aso-ebi.html` in `site`, paste, save)." },
            { title: "Check it at phone width", detail: "Open it in your browser and make the window narrow. Are the headline and button visible without scrolling?" },
            { title: "Publish it", detail: "Cloudflare → your project → **Create deployment** → drag `site` → **Save and Deploy**. Your page is now at `stitches-by-bisi.pages.dev/aso-ebi`." },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "megaphone", label: "Status + Instagram post" }, { draw: "page", label: "the aso-ebi page" }, { draw: "whatsapp", label: "one button", hot: true }, { draw: "people", label: "group details in Bisi's chat" }] },
          caption: "Where the visitors come from and where they go: the post links to one page about one offer, which has one button, which ends in Bisi's WhatsApp with the group's details already typed.",
        },
        { t: "figure", figure: { product: "coach", caption: "A landing page for one offer: one promise, proof, and one button." } },
        {
          t: "scenario",
          title: "Same post, better destination",
          text: "Picture Bisi running the same Instagram post two weeks in a row. Week 1 it links to her home page, where visitors can wander into the gallery, about page and price list. Week 2 it links to the aso-ebi page with one WhatsApp button repeated three times. Nothing else changes, so any difference in messages comes from the page. You can run this exact test with a real client: count the WhatsApp messages that start with the ready-typed sentence. That count is real proof you can show future clients.",
        },
      ],
    },
    {
      heading: "Step 5: Test it before anyone sees it",
      blocks: [
        { t: "p", text: "Because your site is already live, you can check the real page right now." },
        { t: "tool", slug: "landing-page-checklist", why: "Paste your live page's address: it checks the headline, buttons, proof, forms and speed signals, and lists what to fix first." },
        {
          t: "steps",
          items: [
            { title: "Run the checker", detail: "Paste `https://stitches-by-bisi.pages.dev/aso-ebi` (with your own project name) and run it." },
            { title: "Fix the top items", detail: "Ask your builder for each fix, one at a time. Save, deploy, and run the checker again." },
            { title: "Tap the button on a real phone", detail: "Does WhatsApp open with the message typed? Is the number right?" },
          ],
        },
        { t: "try", title: "The 5-second test with two strangers", minutes: 5, steps: ["Send the live link to two people who don't know Bisi.", "Ask: “In 5 seconds: what is this offering, and what would you tap?”", "If either hesitates, simplify the headline and button text, then test again."] },
        { t: "later", lesson: "deploy-domain", text: "to see how many people opened the page, ask the owner to count WhatsApp messages that begin with the ready-typed sentence. On Day 7 you'll switch on free visitor counts for the whole site." },
        { t: "mistakes", items: [{ wrong: "A full menu at the top “just in case”", right: "Business name only: every extra door is a lost customer" }, { wrong: "Three different buttons", right: "One action, repeated at the top, middle and end" }, { wrong: "A beautiful photo pushing the button below the fold on phones", right: "Headline and button visible on a 360-pixel phone without scrolling" }] },
        { t: "win", title: "Your page passed the live check", proved: "you can turn one offer into a focused page, publish it, and prove it works with a real checker and real people, not just your own opinion.", cue: "Send Bisi the link with a one-line note: “Use this link in your Status and Instagram post.” Then finish the mission for the **One offer, one action** badge." },
      ],
    },
  ],
  task: {
    title: "Ship a landing page for one offer",
    steps: ["Write the one-offer sentence with the owner.", "Generate the words, then edit them; use real proof or clear placeholders.", "Build `aso-ebi.html` (or your offer's page) without the menu, and deploy it.", "Run the live checker and fix the top items.", "Do the 5-second test with two people and tap the button on a real phone."],
    done: ["The page has one offer and one repeated button", "The headline and button show without scrolling on my phone", "Every review and number is real or clearly a placeholder", "The live checker's top items are fixed", "Two people could say what it offers within 5 seconds"],
  },
  recap: [
    "A **landing page** has one offer and one action, and usually **no menu**: removing other choices is what makes visitors act.",
    "A **benefit** says what the customer gets (“every outfit fits on the wedding day”); a **feature** is a fact (“we use a measuring app”). Lead with benefits.",
    "**One page per offer**: two promos need two landing pages.",
    "The main button must show **above the fold on a phone**, without scrolling, and again at the end.",
    "A page is ready when it **passes the live checker and two strangers can say what it offers** in 5 seconds.",
    "Answer the real **objections** from the owner's chats (price, time, fit, location) right on the page.",
  ],
  resources: [
    { label: "Nielsen Norman Group: Writing for the web", url: "https://www.nngroup.com/topic/writing-web/", note: "Research-based advice on web writing." },
    { label: "Copyhackers blog", url: "https://copyhackers.com/blog/", note: "Free lessons on writing words that sell." },
    { label: "Google: FAQ results changes", url: "https://developers.google.com/search/blog/2023/08/howto-faq-changes", note: "Why extra question lines no longer show for most sites." },
    { label: "HubSpot Academy: Content marketing", url: "https://academy.hubspot.com/courses/content-marketing", note: "Free course on writing for customers." },
  ],
  quiz: [
    { q: "What makes a landing page different from a normal website?", options: ["It has more pages", "One offer, one action, usually no menu", "It has no words", "It only works on laptops"], answer: 1, why: "Removing other doors and focusing on one action is what makes it work.", from: 0, aim: "core" },
    { q: "Which line is a benefit rather than a feature?", options: ["We use a measuring app", "Every outfit fits on the wedding day", "Our shop has 3 sewing machines", "We opened in 2019"], answer: 1, why: "Benefits describe the customer's result. When you describe your own services to clients later, the same rule applies: say what they get.", from: 1, aim: "portfolio-site" },
    { q: "Bisi wants to promote aso-ebi packages and a separate “corporate week” discount. How many landing pages?", options: ["One page with both", "Two: one per offer", "None, use the home page", "Five"], answer: 1, why: "One page per offer keeps the message and action clear. You'll build a page for your own free offer the same way later.", from: 2, aim: "lead-magnets-qualification" },
    { q: "Where must the main button appear on a phone?", options: ["Only at the very bottom", "Above the fold, visible without scrolling, and again at the end", "Inside a menu", "Nowhere, people will find WhatsApp"], answer: 1, why: "Visitors decide in seconds. On Day 6 you'll test this on real phone sizes.", from: 3, aim: "responsive-fast-accessible" },
    { q: "How do you know a landing page is ready to share?", options: ["It looks nice to you", "It passes the live checker and two strangers can say what it offers in 5 seconds", "The AI said it's done", "It has lots of colours"], answer: 1, why: "Test with a tool and with real people. You'll use the same 5-second test on the page that sells your own services.", from: 4, aim: "portfolio-site" },
  ],
  celebrate: {
    title: "Day 5 complete: one offer, one page, one button",
    proved: "You can turn a single offer into a focused page that tells visitors exactly what to do, and prove it works with a live check and real people.",
    badge: "One offer, one action",
    badgeDesc: "Published a landing page that passed the checker",
  },
};

export default lesson;
