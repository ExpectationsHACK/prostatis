import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "layouts-wireframes-copy",
  title: "Layouts, wireframes & copy that converts",
  minutes: 80,
  outcome: "A wireframe and first-draft copy for a home page, ready to build.",
  intro:
    "A wireframe is a simple sketch of a page: boxes that show what goes where, with no colours or pictures yet. Copy is the words on the page. Together they decide whether a visitor understands the offer and takes action. Today you'll plan a home page on paper (or with our tools) before building it — this is the step most beginners skip, and it's why their sites don't bring customers.",
  sections: [
    {
      heading: "How a page that sells is built",
      blocks: [
        { t: "p", text: "Almost every page that converts visitors into customers follows the same order. People arrive with questions in their head, and the page answers them one by one:" },
        { t: "figure", figure: { diagram: "page-anatomy", caption: "The five jobs of a home page, top to bottom." } },
        { t: "list", items: ["**Promise** — What is this and what do I get? (the headline)", "**Proof** — Why should I believe you? (reviews, numbers, logos)", "**Details** — What exactly do you offer? (services, prices)", "**Objections** — What if…? (FAQ, guarantee)", "**Action** — What do I do now? (one clear button)"] },
        { t: "tip", text: "Visitors decide in about 5 seconds whether to stay. The top of the page — called the **hero** — must say what you offer and show a button without scrolling on a phone." },
      ],
    },
    {
      heading: "Step 1 — Wireframe the page",
      blocks: [
        { t: "p", text: "Pick the page type (business website, landing page, store, restaurant…). Then list the sections in order. Don't think about colours yet — just boxes." },
        { t: "tool", slug: "wireframe-generator", why: "Choose the page type and get a section-by-section wireframe plus a build prompt." },
        { t: "figure", figure: { tool: "wireframe-generator", caption: "A wireframe is just labelled boxes. It's fast to change and easy to discuss with a client." } },
        { t: "p", text: "If you're working with a client, send the wireframe before you build. Changing a box is free; changing a finished page costs hours." },
      ],
    },
    {
      heading: "Step 2 — Write the hero",
      blocks: [
        { t: "p", text: "The hero has three parts: a **headline** (the promise, under 10 words), a **subhead** (who it's for and how), and a **button** (the action)." },
        { t: "table", columns: ["Weak", "Strong"], rows: [["Welcome to Mama's Kitchen", "Hot lunch at your desk in 30 minutes"], ["We offer quality services", "Lash extensions that last 4 weeks"], ["Submit", "Order on WhatsApp"]] },
        { t: "p", text: "Notice the pattern: strong headlines describe the **result** for the customer, not the business. Strong buttons say exactly what will happen." },
        { t: "tool", slug: "hero-copy-generator", why: "Fill in the business details and get five headline + subhead + button combinations to choose from." },
      ],
    },
    {
      heading: "Step 3 — Write the rest of the page with AI (then edit)",
      blocks: [
        { t: "p", text: "AI is a great first-draft writer. Your job is to give it the right information and then edit the result so it sounds human and true." },
        { t: "prompt", title: "Draft the home page copy", text: "You are a conversion copywriter. Write home page copy for this business: [paste the answers from your brand kit]. Use these sections in order: [paste your wireframe]. Rules: short sentences, plain English, the headline under 10 words and focused on the customer's result, benefits before features, one call to action repeated: '[your button text]'. Don't invent reviews, numbers or awards — leave [placeholders] where proof should go." },
        { t: "warn", text: "Never publish invented testimonials, fake numbers or awards the business didn't win. It's dishonest and in many countries it's illegal. Use [placeholders] until you have real proof." },
        { t: "p", text: "Read the draft out loud. Anything you wouldn't say to a customer in person — cut it." },
      ],
    },
    {
      heading: "Step 4 — Turn it into a design brief",
      blocks: [
        { t: "p", text: "A design brief pulls everything together — the goal of the site, the audience, the pages, the look, the deadline — so there are no surprises later." },
        { t: "tool", slug: "design-brief-generator", why: "Generates a brief you can send to a client for sign-off." },
      ],
    },
  ],
  task: {
    title: "Plan your home page",
    steps: ["Choose the page type for your business.", "Generate or sketch the wireframe.", "Write 3 hero options and pick the best.", "Draft the rest of the copy with the prompt, then edit it by reading aloud.", "Save everything with your brand kit."],
    done: ["My wireframe has a clear hero, proof, details, FAQ and one action", "My headline is under 10 words and about the customer's result", "My copy has no invented reviews or numbers", "My button says exactly what happens"],
  },
  resources: [
    { label: "Nielsen Norman Group — How people read online", url: "https://www.nngroup.com/articles/how-users-read-on-the-web/", note: "Research on why short, scannable text works." },
    { label: "web.dev — Learn Design", url: "https://web.dev/learn/design", note: "Layout basics for all screen sizes." },
    { label: "Figma", url: "https://www.figma.com", note: "Free tool if you want to draw wireframes visually." },
    { label: "HubSpot Academy", url: "https://academy.hubspot.com", note: "Free courses on content and inbound marketing." },
  ],
  quiz: [
    { q: "What is a wireframe?", options: ["The finished design with colours", "A simple sketch of what goes where on a page", "The website's code", "The hosting server"], answer: 1, why: "A wireframe is labelled boxes — quick to change before any design or code happens." },
    { q: "Which headline is strongest?", options: ["Welcome to our website", "We are the best company", "Hot lunch at your desk in 30 minutes", "Services"], answer: 2, why: "It states a specific result the customer gets." },
    { q: "What should the hero include?", options: ["Only a big photo", "Headline, subhead and a clear button", "The full price list", "The company history"], answer: 1, why: "The hero must explain the offer and show the action without scrolling." },
    { q: "How should you handle testimonials you don't have yet?", options: ["Write believable fake ones", "Copy them from a competitor", "Leave clear placeholders until real ones arrive", "Skip the whole proof section forever"], answer: 2, why: "Fake reviews are dishonest and can be illegal. Placeholders keep the layout until you collect real proof." },
    { q: "Why send a wireframe to a client before building?", options: ["To get paid faster", "Because changing a box is free, but changing a finished page costs hours", "It's required by law", "So they can build it themselves"], answer: 1, why: "Agreeing on structure early saves you rework later." },
  ],
};

export default lesson;
