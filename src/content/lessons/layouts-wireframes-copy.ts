import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "layouts-wireframes-copy",
  title: "Layouts, wireframes & copy that converts",
  minutes: 80,
  outcome: "A wireframe and first-draft words for a home page, ready to build tomorrow.",
  intro:
    "Imagine building a house without a plan: the kitchen ends up upstairs and the door opens into a wall. Websites work the same way. Today you'll draw a simple **plan** of a home page (a wireframe) and write its **words** (the copy), before any building. This is the step most beginners skip, and it's the reason their websites look fine but don't bring customers.",
  youNeed: ["Your brand kit from Day 1", "Paper and pen, or a free Figma account", "The answers to the 5 business questions", "A free Claude account (claude.ai) for writing help"],
  sections: [
    {
      heading: "How a page that sells is built",
      blocks: [
        { t: "p", text: "Visitors arrive with questions in their head. A good page answers them in order, top to bottom. If it doesn't, they leave, usually within seconds." },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a home page, top to bottom." } },
        { t: "list", items: ["**Promise**: What is this, and what do I get? (the headline)", "**Proof**: Why should I believe you? (reviews, photos, numbers)", "**Details**: What exactly do you offer, and for how much?", "**Objections**: What if…? (questions and answers)", "**Action**: What do I do now? (one clear button)"] },
        { t: "define", term: "Hero", meaning: "The very top part of a page, the first thing visitors see before they scroll. It holds the headline, a short line under it, and the main button.", like: "a shop's front window. If it doesn't catch your eye, you walk past." },
        { t: "define", term: "Conversion", meaning: "When a visitor does what the page wants, books, buys, calls or sends a WhatsApp message. “Copy that converts” means words that make people take that action.", like: "a customer who walks into the shop and actually buys, not just looks around." },
      ],
    },
    {
      heading: "Step 1: Draw the wireframe",
      blocks: [
        { t: "define", term: "Wireframe", meaning: "A simple drawing of a page using labelled boxes, no colours, no photos. It shows what goes where.", like: "the floor plan of a house, drawn before anyone buys cement." },
        { t: "p", text: "Pick the page type (business website, landing page, store, restaurant…) and list the sections in order. Paper is fine. Boxes and labels only." },
        { t: "tool", slug: "wireframe-generator", why: "Choose the page type and get a section-by-section wireframe plus a build prompt." },
        { t: "figure", figure: { tool: "wireframe-generator", caption: "A wireframe is just labelled boxes, quick to change and easy to discuss with a client." } },
        { t: "scenario", title: "Why pros send wireframes first", text: "Chidi built a full website for a pharmacy, then the owner said: “Put the delivery section first, and we don't need a gallery.” Two days of rework. Next time, Chidi sent a wireframe on WhatsApp first. The owner moved two boxes in 5 minutes, approved it, and the build matched what she wanted the first time. **Changing a box is free; changing a finished page costs hours.**" },
        { t: "try", title: "Sketch your wireframe on paper", minutes: 10, steps: ["Take the business from Day 1.", "Draw a tall rectangle (a phone screen).", "Inside it, draw and label boxes in order: Hero, Proof, Services, FAQ, Contact/Button.", "Take a photo: you'll use it tomorrow."] },
      ],
    },
    {
      heading: "Step 2: Write the hero",
      blocks: [
        { t: "p", text: "The hero has three parts: a **headline** (the promise, under 10 words), a **subhead** (who it's for and how), and a **button** (the action)." },
        { t: "table", columns: ["Weak", "Strong", "Why"], rows: [["Welcome to Mama's Kitchen", "Hot lunch at your desk in 30 minutes", "Says what the customer gets"], ["We offer quality services", "Lash extensions that last 4 weeks", "Specific result, not vague praise"], ["Submit", "Order on WhatsApp", "Says exactly what happens"]] },
        { t: "p", text: "The pattern: strong headlines describe the **customer's result**, not the business. Strong buttons say **exactly what will happen** when you tap them." },
        { t: "check", q: "Which headline is strongest for a car-wash business?", options: ["Welcome to Sparkle Car Wash", "We are the best", "A spotless car in 20 minutes, while you wait", "Car wash services available"], answer: 2, why: "It promises a specific result the customer wants, in under 10 words." },
        { t: "tool", slug: "hero-copy-generator", why: "Fill in the business details and get five headline + subhead + button combinations." },
      ],
    },
    {
      heading: "Step 3: Write the rest with AI, then make it true",
      blocks: [
        { t: "define", term: "Copy", meaning: "All the words on a website or advert: headlines, descriptions, buttons, questions and answers.", like: "the script of a film. The film can look great, but bad lines ruin it." },
        { t: "p", text: "AI is a great first-draft writer. Your job is to give it the right facts, then **edit** the result so it's true and sounds like the business." },
        { t: "prompt", title: "Draft the home page copy", text: "You are a conversion copywriter. Write home page copy for this business: [paste your answers from Day 1]. Use these sections in order: [paste your wireframe]. Rules: short sentences, plain English, headline under 10 words about the customer's result, benefits before features, one call to action repeated: '[your button text]'. Don't invent reviews, numbers or awards, write [placeholder] where proof should go." },
        { t: "warn", text: "Never publish invented reviews, fake numbers or awards the business didn't win. It's dishonest, customers can tell, and in Nigeria the Federal Competition and Consumer Protection Act treats misleading advertising as a violation. Use [placeholders] until you have real proof." },
        { t: "p", text: "Then **read it out loud**. Anything you wouldn't say to a customer face to face, cut it or rewrite it." },
        { t: "mistakes", items: [{ wrong: "“We are the leading provider of premium solutions”", right: "“Fresh bread delivered to your door before 7am”" }, { wrong: "Three different buttons: Call, Email, Follow us", right: "One main action repeated: “Order on WhatsApp”" }, { wrong: "Publishing the AI draft unedited", right: "Checking every fact with the owner and reading it aloud" }] },
      ],
    },
    {
      heading: "Step 4: Turn it into a design brief",
      blocks: [
        { t: "define", term: "Design brief", meaning: "A short document that agrees the goal of the website, who it's for, the pages, the look and the deadline, so there are no surprises later.", like: "the order slip at a tailor: fabric, style, measurements and collection date, agreed before cutting." },
        { t: "tool", slug: "design-brief-generator", why: "Generates a brief you can send to a client for sign-off." },
        { t: "try", title: "Get one person's reaction", minutes: 5, steps: ["Send your headline and wireframe photo to one friend.", "Ask: “In 5 seconds, what does this business offer, and what would you click?”", "If they hesitate, simplify your headline."] },
      ],
    },
  ],
  task: {
    title: "Plan your home page",
    steps: ["Choose the page type for your business.", "Draw or generate the wireframe.", "Write 3 hero options and pick the best one.", "Draft the rest of the copy with the prompt, then edit it by reading aloud.", "Save everything with your brand kit."],
    done: ["My wireframe has a hero, proof, details, questions and one action", "My headline is under 10 words and about the customer's result", "My copy has no invented reviews or numbers", "My button says exactly what happens"],
  },
  recap: [
    "A **wireframe** is a simple drawing of labelled boxes showing what goes where, made before any design or code.",
    "Strong headlines describe the **customer's result** in under 10 words, like “Hot lunch at your desk in 30 minutes”.",
    "The **hero** (top of the page) must show the headline, a short subhead and one clear button, without scrolling on a phone.",
    "Never invent reviews or numbers: leave **[placeholders]** until the business gives you real proof.",
    "Send the wireframe to the client **before building**: changing a box is free, changing a finished page costs hours.",
  ],
  resources: [
    { label: "Nielsen Norman Group: How people read online", url: "https://www.nngroup.com/articles/how-users-read-on-the-web/", note: "Research on why short, scannable text works." },
    { label: "web.dev: Learn Design", url: "https://web.dev/learn/design", note: "Layout basics for all screen sizes." },
    { label: "Figma", url: "https://www.figma.com", note: "Free tool if you want to draw wireframes on screen." },
    { label: "HubSpot Academy", url: "https://academy.hubspot.com", note: "Free courses on content and marketing." },
  ],
  quiz: [
    { q: "What is a wireframe?", options: ["The finished design with colours", "A simple drawing of labelled boxes showing what goes where", "The website's code", "The hosting server"], answer: 1, why: "A wireframe is labelled boxes, quick to change before any design or code happens.", from: 0 },
    { q: "Which headline is strongest?", options: ["Welcome to our website", "We are the best company", "Hot lunch at your desk in 30 minutes", "Services"], answer: 2, why: "It states a specific result the customer gets, in under 10 words.", from: 1 },
    { q: "What must the hero include?", options: ["Only a big photo", "The headline, a short subhead and one clear button", "The full price list", "The company history"], answer: 1, why: "The hero must explain the offer and show the action without scrolling.", from: 2 },
    { q: "How should you handle reviews you don't have yet?", options: ["Write believable fake ones", "Copy them from a competitor", "Leave clear placeholders until real ones arrive", "Skip proof forever"], answer: 2, why: "Fake reviews are dishonest and misleading advertising. Placeholders keep the layout until real proof arrives.", from: 3 },
    { q: "Why send a wireframe to a client before building?", options: ["To get paid faster", "Changing a box is free, but changing a finished page costs hours", "It's required by law", "So they can build it themselves"], answer: 1, why: "Agreeing the structure early saves rework.", from: 4 },
  ],
};

export default lesson;
