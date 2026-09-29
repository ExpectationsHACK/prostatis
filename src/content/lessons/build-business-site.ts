import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "build-business-site",
  title: "Build a business website with AI",
  minutes: 120,
  outcome: "A complete multi-page business website — home, services, about, gallery and contact — running on your computer.",
  intro:
    "Yesterday you built one page. Today you build a whole website: the five pages almost every small business needs, a WhatsApp button, and a contact form that actually delivers messages. You'll learn the most important habit when building with AI: build in small pieces, check each piece, then move on.",
  sections: [
    {
      heading: "The five pages every business site needs",
      blocks: [
        {
          t: "table",
          columns: ["Page", "Its job", "Must include"],
          rows: [
            ["Home", "Explain the offer in 5 seconds", "Hero, proof, services summary, one button"],
            ["Services / Menu", "Show what's for sale", "Each service, price or 'from' price, button"],
            ["About", "Build trust", "Real photo, story, why you're different"],
            ["Gallery / Work", "Show proof", "Real photos of real work"],
            ["Contact", "Make it easy to reach you", "WhatsApp, phone, form, map, opening hours"],
          ],
        },
        { t: "figure", figure: { product: "restaurant", caption: "A restaurant site: menu, ordering on WhatsApp and a clear contact page." } },
      ],
    },
    {
      heading: "The golden rule: small steps",
      blocks: [
        { t: "p", text: "If you ask AI for “the whole website” in one prompt, you'll get something that looks fine at first glance and has dozens of small problems. Pros work in small steps:" },
        {
          t: "steps",
          items: [
            { title: "Shared pieces first", detail: "Ask for the header (with menu) and footer used on every page." },
            { title: "One page at a time", detail: "Build a page, open it, check it on a phone-size window, fix, commit." },
            { title: "Reuse components", detail: "A 'service card' or 'testimonial' should be one component used everywhere — change it once, it changes everywhere." },
            { title: "Commit after each page", detail: "If the next step goes wrong, you can go back." },
          ],
        },
        { t: "tool", slug: "component-prompt-library", why: "Copy-ready prompts for headers, footers, service cards, galleries, pricing tables and forms." },
      ],
    },
    {
      heading: "Build the shared layout",
      blocks: [
        { t: "prompt", title: "Header and footer", text: "Read CLAUDE.md first. Create a shared layout for the whole site: a sticky header with the logo on the left, links to Home, Services, About, Gallery and Contact, and a WhatsApp button on the right. On phones, the links go into a menu button. Add a footer with address, opening hours, phone, WhatsApp and social links. Use the brand colours and fonts from CLAUDE.md. Show me the result before building any pages." },
        { t: "p", text: "Open the site, make the browser window narrow (like a phone), and check that the menu button works. Then commit." },
      ],
    },
    {
      heading: "Build the pages one by one",
      blocks: [
        { t: "prompt", title: "One page at a time", text: "Build the Services page. Services: [list each service with a one-line description and price]. Create a reusable ServiceCard component. Each card has a 'Book on WhatsApp' button that opens WhatsApp with the message: 'Hi, I'd like to book [service name]'. Mobile-first. Don't change the header or footer." },
        { t: "p", text: "Repeat for About, Gallery and Contact. Replace the AI's placeholder text with real content from the business as soon as you have it — real content always converts better than placeholder text." },
        { t: "tip", text: "Images: ask the owner for real photos. Stock photos are OK as placeholders, but real photos of the real shop and team build far more trust. Unsplash and Pexels have free placeholders." },
      ],
    },
    {
      heading: "WhatsApp click-to-chat",
      blocks: [
        { t: "p", text: "In Nigeria, most customers would rather chat on WhatsApp than fill a form. A WhatsApp link uses the phone number in international format, without the plus sign or the leading zero:" },
        { t: "code", lang: "text", text: "https://wa.me/2348012345678?text=Hi%2C%20I%27d%20like%20to%20book" },
        { t: "p", text: "`234` is Nigeria's country code, followed by the number without its first `0`. The `text=` part pre-fills the message (spaces become `%20`). Ask Claude to build these links for you — just give it the number." },
      ],
    },
    {
      heading: "A contact form that actually delivers",
      blocks: [
        { t: "p", text: "A form that looks nice but sends messages nowhere is a common beginner mistake. The easiest reliable option is a form service: the form sends to the service, and the service emails the business owner." },
        { t: "prompt", title: "Working contact form", text: "Add a contact form to the Contact page with name, phone, and message fields. Use Formspree (I'll paste the form endpoint). Show a clear success message after sending and an error message if it fails. Validate that name and phone are filled in. Don't store anything in the browser." },
        { t: "warn", text: "Always test the form yourself: submit it and confirm the email actually arrives (check spam too) before telling the client it's done." },
      ],
    },
    {
      heading: "When something breaks",
      blocks: [
        { t: "p", text: "Errors are normal. Don't panic, and don't randomly change things. Copy the exact error message and give it to Claude with context." },
        { t: "tool", slug: "debug-prompt-template", why: "Builds a debug prompt with the error, what you expected and what you already tried — the fastest way to get a fix." },
      ],
    },
  ],
  task: {
    title: "Build the full 5-page site",
    steps: ["Build the header and footer; commit.", "Build Home, Services, About, Gallery and Contact — one at a time, committing after each.", "Add WhatsApp buttons with pre-filled messages.", "Connect the contact form and send yourself a test message.", "Check every page at phone width."],
    done: ["All 5 pages open from the menu", "WhatsApp buttons open a chat with the right number", "A test form message arrived in my inbox", "Nothing overflows sideways on a phone-size screen"],
  },
  resources: [
    { label: "MDN — HTML forms", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms", note: "How forms work, in plain language." },
    { label: "WhatsApp click-to-chat help", url: "https://faq.whatsapp.com/5913398998672934", note: "Official guide to wa.me links." },
    { label: "Formspree", url: "https://formspree.io", note: "Free tier for sending form messages to email." },
    { label: "Next.js Learn", url: "https://nextjs.org/learn", note: "Free official course if you want to understand the framework." },
    { label: "Unsplash", url: "https://unsplash.com", note: "Free placeholder photos." },
  ],
  quiz: [
    { q: "What's the best way to build a site with AI?", options: ["One giant prompt for everything", "Small steps: shared layout, then one page at a time, checking and committing", "Copy another site's code", "Build it all without looking until the end"], answer: 1, why: "Small, checked steps catch problems early and give you commits to go back to." },
    { q: "What is the correct WhatsApp link for 0801 234 5678?", options: ["https://wa.me/08012345678", "https://wa.me/+2348012345678", "https://wa.me/2348012345678", "https://whatsapp.com/08012345678"], answer: 2, why: "Use the country code 234 and drop the leading 0 — no plus sign." },
    { q: "Why make a reusable ServiceCard component?", options: ["It looks more professional in code only", "Change it once and every card updates everywhere", "It's required by Next.js", "It makes the site slower"], answer: 1, why: "Reusable components keep the design consistent and make changes fast." },
    { q: "How do you know the contact form works?", options: ["It looks nice", "The AI said it works", "You submit a test message and confirm the email arrives", "There's a Send button"], answer: 2, why: "Only a real test proves messages are delivered." },
    { q: "You get an error. What should you do first?", options: ["Delete the project", "Change random things until it works", "Copy the exact error and give it to Claude with what you expected", "Ignore it"], answer: 2, why: "The exact error plus context gets you a precise fix." },
  ],
};

export default lesson;
