import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "layouts-wireframes-copy",
  title: "Plan the page & write the words",
  minutes: 80,
  outcome: "A drawing of a real home page as labelled boxes, the words for every part of it, and the owner's yes, ready to build tomorrow.",
  intro:
    "Imagine building a house without a plan: the kitchen ends up upstairs and the front door opens into a wall. Websites go wrong the same way. Bisi's customers send her the same five questions on WhatsApp every day: Is this for me? Can I trust you? How much? How long? How do I order? Her home page should answer them, **in that order**, before anyone has to ask. Today you'll draw a simple plan of that page with pen and paper, write its words with help from your free AI assistant, and get Bisi's yes, all before building anything. This is the step most beginners skip, and the reason their websites look fine but bring no customers.",
  core: "Plan the page as labelled boxes and write words about the customer's result before building: changing a box is free, changing a built page costs hours.",
  youNeed: ["Your brand kit from Day 1", "Paper and a pen (or our free online planner)", "Your free Claude account", "The owner's answers to the 5 questions"],
  sections: [
    {
      heading: "What visitors are silently asking",
      blocks: [
        { t: "p", text: "A visitor decides in a few seconds whether to stay. In their head, they're asking questions in a fixed order. A page that answers them in that order keeps them; a page that doesn't loses them, usually without a word." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "Is this for me?" }, { draw: "star", label: "Can I trust her?" }, { draw: "tag", label: "How much? How long?" }, { draw: "whatsapp", label: "How do I order?", hot: true }] },
          caption: "The four questions in a customer's head, in order. Bisi's home page will answer each one, top to bottom, ending with the easiest possible way to order.",
        },
        { t: "list", items: ["**Promise**: what is this, and what do I get? (the big headline at the top)", "**Proof**: why should I believe you? (real photos, real reviews)", "**Details**: what exactly, for how much, how long?", "**Doubts**: what if it doesn't fit? Where are you? (questions and answers)", "**Action**: what do I do now? (one clear button)"] },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a home page, top to bottom." } },
        {
          t: "define",
          term: "Mobile-first",
          like: "sewing first for the size most of your customers wear, then adjusting the pattern for the others.",
          meaning: "Planning and building for a **phone screen first**, because most Nigerian customers open websites on their phones, then making it look good on laptops too. Your plan is drawn on a phone-shaped rectangle for this reason.",
        },
      ],
    },
    {
      heading: "Step 1: Draw the boxes",
      blocks: [
        {
          t: "define",
          term: "Wireframe",
          like: "the building plan you take to the council before buying a single block: rooms drawn as labelled boxes, no paint, no tiles.",
          meaning: "A simple drawing of a page using labelled boxes, with no colours and no photos. It shows what goes where, so everyone agrees before anything is built.",
        },
        {
          t: "define",
          term: "Hero",
          also: ["Subhead"],
          like: "the signboard and front window of a shop: the first thing people see from the road. If it doesn't catch their eye, they walk past.",
          meaning: "The very top part of a page, the first thing visitors see before they scroll. It holds the **headline** (the big promise), a short line under it called the **subhead** (who it's for and how), and the main button.",
        },
        {
          t: "sketch",
          sketch: { layout: "stack", frame: "phone", rows: ["HERO: headline, subhead, Order button", "Proof: real outfits + reviews", "What I sew + starting prices", "Questions answered", "Order on WhatsApp"], hot: 0 },
          caption: "Bisi's home page wireframe on a phone-shaped rectangle: five labelled boxes from top to bottom, the hero (circled) holding the promise and the main button.",
        },
        { t: "try", title: "Draw the wireframe on paper", minutes: 10, steps: ["Draw a tall rectangle on paper, about the shape of a phone.", "Inside it, draw five boxes from top to bottom and label them: Hero, Proof, What we offer + prices, Questions, Order button.", "Inside the Hero box, write the words “headline”, “subhead” and “button”.", "Take a clear photo of it with your phone. You'll paste a written version of it into the AI on Day 3."] },
        { t: "tool", slug: "wireframe-generator", why: "Prefer the screen? Choose the type of page and get the same plan, section by section, ready to copy." },
        {
          t: "scenario",
          title: "Bisi would never cut first",
          text: "Ask Bisi how she sews a new style. She sketches it, shows the customer, adjusts the sketch, and only then cuts the fabric, because a cut can't be undone. Websites are the same. A developer who builds a whole site and then hears “put the prices first, and we don't need the gallery” loses days. One who sends a wireframe on WhatsApp gets those changes in five minutes, before any building. **Changing a box is free; changing a built page costs hours.**",
        },
      ],
    },
    {
      heading: "Step 2: Write the hero",
      blocks: [
        { t: "p", text: "The hero has three parts: a **headline** (the promise, under 10 words), a **subhead** (who it's for and how), and a **button** (the action)." },
        {
          t: "define",
          term: "Call to action",
          also: ["CTA"],
          like: "the danfo conductor shouting one destination: “Oshodi! Oshodi!” Nobody is confused about what happens if they climb in.",
          meaning: "The button or link that asks the visitor to do **one** thing: “Order on WhatsApp”, “Book a fitting”. Often shortened to **CTA**. One clear action, said the same way every time it appears.",
        },
        { t: "table", columns: ["Weak", "Strong", "Why"], rows: [["Welcome to Stitches by Bisi", "Outfits that fit the first time, ready in 10 days", "Says what the customer gets"], ["We offer quality tailoring services", "Native and corporate wear, sewn to your measurements in Yaba", "Specific: what, how, where"], ["Submit", "Order on WhatsApp", "Says exactly what happens when you tap"]] },
        { t: "p", text: "The pattern: strong headlines describe the **customer's result**, not the business. Strong buttons say **exactly what will happen** when you tap them." },
        { t: "check", q: "Which headline is strongest for a car-wash business?", options: ["Welcome to Sparkle Car Wash", "We are the best", "A spotless car in 20 minutes, while you wait", "Car wash services available"], answer: 2, why: "It promises a specific result the customer wants, in under 10 words." },
        { t: "tool", slug: "hero-copy-generator", why: "Fill in the business details and get five headline, subhead and button combinations to choose from." },
      ],
    },
    {
      heading: "Step 3: Write the rest with AI, then make it true",
      blocks: [
        {
          t: "define",
          term: "Conversion",
          like: "the difference at a market stall between people who stop to look and people who actually pay.",
          meaning: "When a visitor does what the page wants: orders, books, calls or sends a WhatsApp message. “Words that convert” means words that make people take that action.",
        },
        {
          t: "define",
          term: "Placeholder",
          like: "the “Reserved” card on a chair at a wedding: it holds the seat until the real guest arrives.",
          meaning: "A clearly marked gap, like **[real customer review here]**, that holds a space until the real content arrives. It is never filled with made-up content.",
        },
        { t: "p", text: "Your AI assistant is a quick first-draft writer. Your job is to give it the true facts, then **edit** what it writes so it's accurate and sounds like the owner." },
        { t: "prompt", title: "Draft the home page words", text: "You are a copywriter for small Nigerian businesses. Write the words for a home page for this business: [paste your answers from Day 1]. Brand voice: [your 3 voice words]. Use these sections in order: [paste your wireframe boxes]. Rules: short sentences in plain English; a headline under 10 words about the customer's result; benefits before features; one call to action repeated in the same words: '[your button text]'. Do not invent reviews, numbers, awards or prices: write [placeholder] wherever proof or a fact from the owner is needed." },
        { t: "p", text: "Then **read it out loud**. Anything you wouldn't say to a customer face to face, cut or rewrite. Check every fact (prices, times, area) with the owner." },
        { t: "warn", text: "Never publish invented reviews, fake numbers or awards the business didn't win. It's dishonest, customers can tell, and Nigeria's Federal Competition and Consumer Protection Act treats misleading adverts as a violation. Keep clear placeholders until you have the real thing." },
        { t: "mistakes", items: [{ wrong: "“We are the leading provider of premium fashion solutions”", right: "“Corporate dresses that fit the first time, ready in 10 days”" }, { wrong: "Three different buttons: Call, Email, Follow us", right: "One main action, repeated: “Order on WhatsApp”" }, { wrong: "Publishing the AI draft without reading it", right: "Checking every fact with the owner and reading it aloud" }] },
      ],
    },
    {
      heading: "Step 4: Get a yes before building",
      blocks: [
        {
          t: "define",
          term: "Design brief",
          like: "the order slip at Bisi's shop: fabric, style, measurements, price and collection date, agreed and written before she cuts.",
          meaning: "A short page that agrees the website's goal, who it's for, the pages, the look and the deadline, so there are no surprises later. You send it with the wireframe and ask the owner to say yes.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "page", label: "plan + words" }, { draw: "whatsapp", label: "send to the owner" }, { draw: "check", label: "owner says yes", hot: true }, { draw: "laptop", label: "then build" }], arrows: ["", "changes?", "Day 3"] },
          caption: "The order that saves days of rework: plan and words first, the owner's changes and yes on WhatsApp, and only then building.",
        },
        { t: "tool", slug: "design-brief-generator", why: "Turns your plan into a one-page brief you can send to the owner for a yes." },
        { t: "try", title: "The 5-second test", minutes: 5, steps: ["Send your headline, subhead and the photo of your wireframe to one friend who doesn't know the business.", "Ask: “In 5 seconds, what does this business offer, and what would you tap?”", "If they hesitate or get it wrong, make the headline simpler and try again."] },
        { t: "win", title: "The plan has the owner's yes", proved: "you can turn a business owner's answers into a page plan and words that answer customers' questions in order, and agree it before any building.", cue: "Keep the photo and the words together in your project notes: on Day 3 they become a real page. Tick your mission to collect the **Planner** badge." },
      ],
    },
  ],
  task: {
    title: "Plan your home page",
    steps: ["Draw the wireframe on paper (or with the planner tool) in a phone-shaped rectangle.", "Write 3 hero options (headline, subhead, button) and pick the best one.", "Draft the other sections with the prompt, then edit them by reading aloud and checking facts with the owner.", "Do the 5-second test with one friend.", "Send the wireframe and words (or the design brief) to the owner and get a yes."],
    done: ["My wireframe has a hero, proof, details, questions and one action", "My headline is under 10 words and about the customer's result", "My words contain no invented reviews or numbers, only clear placeholders", "My button says exactly what happens", "The owner (or a friend standing in) said yes to the plan"],
  },
  recap: [
    "A **wireframe** is a drawing of labelled boxes showing what goes where, made and agreed before any building, because changing a box is free and changing a built page costs hours.",
    "Strong headlines describe the **customer's result** in under 10 words, like “Outfits that fit the first time, ready in 10 days”.",
    "The **hero** (top of the page) must show the headline, a short subhead and one clear button, without scrolling on a phone.",
    "Never invent reviews or numbers: leave clear **[placeholders]** until the business gives you real proof.",
    "A **call to action** asks for one thing in the same words every time, like “Order on WhatsApp”.",
  ],
  resources: [
    { label: "Nielsen Norman Group: How people read online", url: "https://www.nngroup.com/articles/how-users-read-on-the-web/", note: "Research on why short, scannable words work." },
    { label: "web.dev: Learn Design", url: "https://web.dev/learn/design", note: "Layout basics for every screen size, free from Google." },
    { label: "Excalidraw", url: "https://excalidraw.com", note: "Free hand-drawn style boxes in the browser, if you prefer the screen to paper." },
    { label: "HubSpot Academy", url: "https://academy.hubspot.com", note: "Free courses on writing and marketing." },
  ],
  quiz: [
    { q: "Why draw a wireframe and get the owner's yes before building?", options: ["It's required by law", "Changing a box is free, but changing a built page costs hours", "So the owner can build it themselves", "To make the website load faster"], answer: 1, why: "Agreeing the plan first saves days of rework.", from: 0, aim: "core" },
    { q: "Which headline will work best at the top of Bisi's page?", options: ["Welcome to our website", "Stitches by Bisi: quality services", "Outfits that fit the first time, ready in 10 days", "About us"], answer: 2, why: "It states the customer's result in under 10 words. You'll write a headline like this for every offer page on Day 5.", from: 1, aim: "landing-pages" },
    { q: "What must the hero show on a phone without scrolling?", options: ["Only a big photo", "The headline, a short subhead and one clear button", "The full price list", "The owner's life story"], answer: 1, why: "On Day 6 you'll check exactly this on a real phone screen.", from: 2, aim: "responsive-fast-accessible" },
    { q: "Bisi has no customer reviews written down yet. What goes in the proof box?", options: ["Believable reviews you write yourself", "Reviews copied from another tailor", "A clear [placeholder] until she sends real ones", "Nothing, delete the box forever"], answer: 2, why: "Honest placeholders keep the layout until real proof arrives. The same honesty rule applies when you show your own work to clients later.", from: 3, aim: "portfolio-site" },
    { q: "How many different main actions should Bisi's page ask for?", options: ["As many as possible: call, email, follow, DM", "One call to action, in the same words every time, like “Order on WhatsApp”", "None: let visitors decide", "A different one in every section"], answer: 1, why: "On Day 4 every page of the website gets this one WhatsApp button, built once and reused.", from: 4, aim: "build-business-site" },
  ],
  celebrate: {
    title: "Day 2 complete: the plan is approved",
    proved: "You can turn an owner's answers into a page plan and words that answer customers' questions in order, before a single thing is built.",
    badge: "Planner",
    badgeDesc: "Planned a page and wrote its words",
  },
};

export default lesson;
