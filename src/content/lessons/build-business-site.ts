import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "build-business-site",
  title: "Build a business website with AI",
  minutes: 120,
  outcome: "A complete five-page business website, home, services, about, gallery and contact, with WhatsApp buttons and a contact form that really delivers messages.",
  intro:
    "Yesterday you built one page. Today you build a whole website: the five pages almost every small business needs. You'll also learn the most important habit of building with AI: **small steps, checked one at a time**. Pros never ask for “the whole website” in one go, and by the end of today you'll see why.",
  youNeed: ["Your project from Day 3 (with CLAUDE.md)", "Real information from the business: services, prices, address, opening hours, WhatsApp number", "3–10 real photos if you can get them (placeholders are fine for now)", "A free Formspree account (formspree.io)"],
  sections: [
    {
      heading: "The five pages every business site needs",
      blocks: [
        { t: "table", columns: ["Page", "Its job", "Must include"], rows: [["Home", "Explain the offer in 5 seconds", "Hero, proof, a summary of services, one main button"], ["Services (or Menu)", "Show what's for sale", "Each service, its price or “from” price, and a button"], ["About", "Build trust", "A real photo, the story, why you're different"], ["Gallery (or Our work)", "Show proof", "Real photos of real work"], ["Contact", "Make it easy to reach you", "WhatsApp, phone, a form, a map, opening hours"]] },
        { t: "define", term: "Page (and URL)", meaning: "Each page has its own address, called a **URL**, for example `mamaskitchen.ng/menu`. The part after the slash tells the browser which page to show.", like: "rooms in a house. Same house (the domain), different rooms (the pages)." },
        { t: "figure", figure: { product: "restaurant", caption: "A restaurant site: menu with prices, ordering on WhatsApp, and a clear contact page." } },
      ],
    },
    {
      heading: "The golden rule: small steps",
      blocks: [
        { t: "p", text: "Ask AI for “the whole website” in one prompt and you'll get something that looks fine at first, with dozens of small problems hidden inside, all tangled together. Pros work like this:" },
        {
          t: "steps",
          items: [
            { title: "Shared parts first", detail: "The header (logo + menu) and footer that appear on every page." },
            { title: "One page at a time", detail: "Build a page, open it, check it at phone size, fix, then commit." },
            { title: "Reuse components", detail: "A service card or a testimonial should be built once and reused everywhere." },
            { title: "Commit after each page", detail: "If the next step goes wrong, you can go back to a working version." },
          ],
        },
        { t: "define", term: "Component", meaning: "A reusable building block of a website, like a “service card” or a “footer”. Built once, used many times. Change it once and it changes everywhere.", like: "a rubber stamp. Carve it once, stamp it on every page, fix the stamp and every future print is fixed." },
        { t: "tool", slug: "component-prompt-library", why: "Copy-ready prompts for headers, footers, service cards, galleries, pricing tables and forms." },
      ],
    },
    {
      heading: "Step 1: Build the shared layout",
      blocks: [
        { t: "prompt", title: "Header and footer", text: "Read CLAUDE.md first. Create a shared layout for the whole site: a header with the logo on the left, links to Home, Services, About, Gallery and Contact, and a WhatsApp button on the right. On phones, put the links behind a menu button. Add a footer with the address, opening hours, phone, WhatsApp and social links. Use the brand colours and fonts from CLAUDE.md. Show me the result before building any pages." },
        { t: "try", title: "Check it like a customer", minutes: 5, steps: ["Open localhost:3000.", "Make the browser window narrow, like a phone (or press F12 and click the phone icon).", "Tap the menu button: do the links appear? Does it close again?", "If it works, ask Claude to commit: “Commit: header and footer.”"] },
      ],
    },
    {
      heading: "Step 2: Build the pages, one by one",
      blocks: [
        { t: "prompt", title: "One page at a time", text: "Build the Services page. Services: [list each service with a one-line description and price in naira]. Create a reusable ServiceCard component. Each card has a 'Book on WhatsApp' button that opens WhatsApp with the message: 'Hi, I'd like to book [service name]'. Mobile-first. Don't change the header or footer." },
        { t: "p", text: "Repeat for About, Gallery and Contact. Replace the AI's placeholder text with the business's real content as soon as you have it. Real words and real photos always convert better." },
        { t: "tip", text: "Photos: ask the owner for real ones: the shop front, the team, the work. Stock photos are fine as placeholders; Unsplash and Pexels photos are free to use. Never take photos from Google Images or other businesses' pages." },
        { t: "scenario", title: "The pharmacy that got calls from its gallery", text: "A Port Harcourt pharmacy replaced stock photos with 6 real photos: the clean shelves, the pharmacist in a white coat, the delivery bike. The owner said customers started calling and saying “I saw your shop on your website.” Real photos are proof: they answer “are these people real?”" },
      ],
    },
    {
      heading: "Step 3: WhatsApp click-to-chat",
      blocks: [
        { t: "p", text: "Most Nigerian customers would rather chat on WhatsApp than fill a form. A WhatsApp link opens a chat with the business, with a message already typed." },
        { t: "figure", figure: { diagram: "phone-number", caption: "Turning a written Nigerian number into a WhatsApp link." } },
        { t: "code", lang: "text", text: "https://wa.me/2348031234567?text=Hi%2C%20I%27d%20like%20to%20book" },
        { t: "list", items: ["`234` is Nigeria's country code. Put it in front and **drop the first 0** of the number.", "**No plus sign, no spaces** in the link.", "`?text=` pre-fills the message. Spaces become `%20` - Claude does this conversion for you."] },
        { t: "check", q: "The business number is 0816 555 1234. Which link is correct?", options: ["https://wa.me/08165551234", "https://wa.me/+2348165551234", "https://wa.me/2348165551234", "https://whatsapp.com/08165551234"], answer: 2, why: "Country code 234, drop the leading 0, no plus sign, no spaces." },
        { t: "try", title: "Test your own WhatsApp link", minutes: 3, steps: ["Write your own number in wa.me format.", "Paste it into your phone's browser.", "WhatsApp should open a chat with yourself, that proves the format is right."] },
      ],
    },
    {
      heading: "Step 4: A contact form that actually delivers",
      blocks: [
        { t: "p", text: "A form that looks nice but sends messages nowhere is one of the most common beginner mistakes, the owner never hears from those customers. The simplest reliable fix is a **form service**." },
        { t: "define", term: "Form service", meaning: "A company that receives what visitors type into your form and emails it to the business owner. Formspree is one: its free plan handles 50 messages a month.", like: "a post office for your form. You drop the letter in; they deliver it to the right inbox." },
        { t: "figure", figure: { diagram: "form-flow", caption: "Visitor → form service → owner's email → owner replies." } },
        { t: "prompt", title: "Working contact form", text: "Add a contact form to the Contact page with name, phone and message fields. Send it to Formspree using this form endpoint: [paste the endpoint from your Formspree dashboard]. Show a clear success message after sending and a helpful error message if it fails. Make name and phone required. Don't store anything in the browser." },
        { t: "warn", text: "Always test the form yourself: submit it, then check the owner's inbox **and spam folder**. Only tell the client it's done when a real message has arrived." },
      ],
    },
    {
      heading: "When something breaks",
      blocks: [
        { t: "p", text: "Errors are normal: every developer sees them every day. Don't panic and don't change things at random. Copy the **exact** error message and give it to Claude with context." },
        { t: "tool", slug: "debug-prompt-template", why: "Builds a debug prompt with the error, what you expected and what you tried, the fastest way to a fix." },
        { t: "mistakes", items: [{ wrong: "“It's not working, fix it”", right: "“When I click Send I see this error: [paste]. I expected a success message. I already checked the endpoint.”" }, { wrong: "Changing five things at once hoping one works", right: "One change, test, then the next" }, { wrong: "Giving up and starting a new project", right: "Go back to your last commit and try again from there" }] },
      ],
    },
  ],
  task: {
    title: "Build the full five-page site",
    steps: ["Build the header and footer; commit.", "Build Home, Services, About, Gallery and Contact, one at a time, committing after each.", "Add WhatsApp buttons with pre-filled messages.", "Connect the contact form and send yourself a test message.", "Check every page at phone width."],
    done: ["All 5 pages open from the menu, on a phone-size screen too", "WhatsApp buttons open a chat with the right number", "A test form message arrived in the inbox", "Nothing scrolls sideways on a phone-size screen"],
  },
  recap: [
    "Build in **small steps**: shared layout first, then one page at a time, check each one and commit before moving on.",
    "A WhatsApp link uses the **country code 234 and drops the leading 0**, with no plus sign or spaces: 0803… becomes `wa.me/234803…`.",
    "A **component** (like a ServiceCard) is built once and reused everywhere, change it once and every copy updates.",
    "A form only works if a **real test message arrives** in the owner's inbox. Test it yourself before calling it done.",
    "When something breaks, copy the **exact error message** and give it to Claude with what you expected to happen.",
  ],
  resources: [
    { label: "MDN: Web forms", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms", note: "How forms work, in plain language." },
    { label: "WhatsApp: click to chat", url: "https://faq.whatsapp.com/5913398998672934", note: "Official guide to wa.me links." },
    { label: "Formspree", url: "https://formspree.io", note: "Send form messages to email; free plan to start." },
    { label: "Next.js Learn", url: "https://nextjs.org/learn", note: "Free official course if you want to understand the framework." },
    { label: "Unsplash", url: "https://unsplash.com", note: "Free placeholder photos." },
  ],
  quiz: [
    { q: "What's the best way to build a site with AI?", options: ["One giant prompt for everything", "Small steps: shared layout, then one page at a time, checking and committing", "Copy another site's code", "Build it all without looking until the end"], answer: 1, why: "Small, checked steps catch problems early and give you commits to go back to.", from: 0 },
    { q: "What is the correct WhatsApp link for 0801 234 5678?", options: ["https://wa.me/08012345678", "https://wa.me/+2348012345678", "https://wa.me/2348012345678", "https://whatsapp.com/08012345678"], answer: 2, why: "Use the country code 234 and drop the leading 0, no plus sign.", from: 1 },
    { q: "Why build a reusable ServiceCard component?", options: ["It only matters to programmers", "Change it once and every card updates everywhere", "It's required by law", "It makes the site slower"], answer: 1, why: "Reusable components keep the design consistent and make changes fast.", from: 2 },
    { q: "How do you know the contact form works?", options: ["It looks nice", "The AI said it works", "You submit a test message and it arrives in the inbox", "There's a Send button"], answer: 2, why: "Only a real test proves messages are delivered.", from: 3 },
    { q: "You get an error. What should you do first?", options: ["Delete the project", "Change random things until it works", "Copy the exact error and give it to Claude with what you expected", "Ignore it"], answer: 2, why: "The exact error plus context gets you a precise fix.", from: 4 },
  ],
};

export default lesson;
