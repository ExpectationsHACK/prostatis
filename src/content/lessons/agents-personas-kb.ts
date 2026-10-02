import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "agents-personas-kb",
  title: "AI agents: personas & knowledge bases",
  minutes: 110,
  outcome: "A tested AI assistant for Bisi: its written instructions, a set of facts she has approved, and a 20-question test it passes, built free in a Claude Project.",
  intro:
    "Imagine a new apprentice on their first day who confidently tells a customer the agbada costs ₦5,000 (it's ₦45,000), promises delivery by Friday (impossible), and gives advice about a rash from a fabric. You'd be horrified. An AI assistant without proper instructions does exactly that, politely and instantly. Today you'll design one properly: it knows one business, follows clear rules, uses **only** facts the owner has approved, and knows when to call the owner. That's the difference between an assistant that embarrasses a business and one that brings in orders while the owner sleeps.",
  core: "An AI assistant must only use approved facts from its knowledge base, say so when it doesn't know, and hand sensitive conversations to a person.",
  youNeed: ["The business's prices, hours, policies and common questions", "Your free Claude account (the free plan includes a few Projects)", "20 minutes with the owner to confirm the facts", "Their WhatsApp chats (with permission) to find real questions"],
  sections: [
    {
      heading: "How an AI assistant works",
      blocks: [
        {
          t: "define",
          term: "AI agent",
          also: ["Chat agent"],
          like: "a well-trained shop assistant with a staff handbook, a laminated price list, and the owner's number for anything unusual.",
          meaning: "An AI assistant with a specific job, rules and information, like “answer customer questions for Stitches by Bisi and help them book a fitting”. Some can also take actions, like sending a booking link. On a website it's often called a **chat agent**.",
        },
        {
          t: "define",
          term: "Knowledge base",
          like: "the laminated price list and rule sheet behind a shop counter: staff read from it instead of guessing.",
          meaning: "The collection of approved facts the assistant is allowed to use: prices, hours, location, payment methods, policies and answers to common questions. It's the assistant's **only** source of truth.",
        },
        {
          t: "define",
          term: "Handoff",
          like: "a receptionist walking you to the manager and explaining your problem, instead of telling you to go and queue again.",
          meaning: "Passing a conversation from the AI to a real person, smoothly, with a short summary, so the customer never has to repeat themselves.",
        },
        { t: "figure", figure: { diagram: "agent-loop", caption: "The customer asks; the assistant uses its rules and facts to answer, take an action, or hand over to a person." } },
        { t: "list", items: ["**Instructions**: the assistant's job description and rules.", "**Knowledge base**: the facts it may use: prices, hours, policies, answers.", "**Tools**: actions it can take, like sending the booking link.", "**Handoff**: when and how it passes the chat to a real person."] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "customer asks" }, { draw: "robot", label: "reads the rules + approved facts" }, { draw: "chat", label: "answers from the facts" }, { draw: "phone", label: "or passes it to Bisi", hot: true }] },
          caption: "A trustworthy assistant in four steps: a question comes in, it checks the rules and the approved facts, answers only from those facts, and passes anything unusual straight to the owner.",
        },
      ],
    },
    {
      heading: "Step 1: Write the instructions",
      blocks: [
        {
          t: "define",
          term: "System prompt",
          like: "the staff handbook every new apprentice reads before their first shift.",
          meaning: "The permanent instructions an AI assistant reads before every conversation: who it is, who it serves, what it can and can't do, how it talks, and what to do when it's unsure.",
        },
        { t: "tool", slug: "chatbot-persona-builder", why: "Builds a complete system prompt: role, tone, allowed topics, forbidden actions and handoff rules." },
        { t: "code", lang: "text", text: "You are Ada, the assistant for Stitches by Bisi, a tailoring shop in Yaba, Lagos.\nHelp customers choose an outfit, check starting prices, book a fitting and understand deposits.\nOnly use facts from the knowledge base. If you don't know, say so and offer to connect them to Bisi.\nNever promise discounts, delivery dates or anything not in the knowledge base. Never give health advice.\nTone: warm, short, simple English. Prices in naira (₦).\nHand over to Bisi for: complaints, refunds, skin reactions to fabric, rushed orders, or if the customer asks." },
        {
          t: "define",
          term: "Hallucination",
          like: "a guest at a party who doesn't know the answer but makes one up so confidently that nobody suspects.",
          meaning: "When an AI states something false as if it were true, like an invented price or a made-up policy. Clear instructions and a knowledge base reduce it; testing catches it before customers do.",
        },
        { t: "check", q: "A customer asks the assistant, “Can I get 30% off?” and the knowledge base has no discount. What should it do?", options: ["Agree: customers love discounts", "Say it can't offer discounts and offer to connect them to Bisi", "Ignore the question"], answer: 1, why: "It must never promise things that aren't in its approved facts." },
      ],
    },
    {
      heading: "Step 2: Build the knowledge base",
      blocks: [
        { t: "p", text: "Collect from the owner: services and starting prices, how long each takes, hours, location and directions, payment and deposit rules, the refitting promise, and the **20 questions customers ask most**. Their WhatsApp chats are full of them." },
        { t: "tool", slug: "faq-to-knowledge-base", why: "Paste messy questions or chats and get clean, organised knowledge-base entries." },
        { t: "tool", slug: "faq-generator", why: "Suggests questions customers of this kind of business are likely to ask." },
        { t: "warn", text: "Out-of-date facts are the number-one reason assistants fail in real businesses. Agree with the owner **who** updates prices and hours, and **how often** (for example, every first Monday)." },
        { t: "try", title: "Collect 10 real questions", minutes: 10, steps: ["With the owner's permission, scroll through their recent WhatsApp chats.", "Write down 10 questions customers really asked.", "Next to each, write the owner's correct answer. That's the start of your knowledge base."] },
      ],
    },
    {
      heading: "Step 3: Break the job into small tasks",
      blocks: [
        { t: "p", text: "Split the assistant's job into small tasks. Each has an input, a decision and an output, and you can see exactly where it needs a tool or a person." },
        { t: "tool", slug: "agent-task-decomposer", why: "Breaks a big goal (“handle bookings”) into steps, the tools needed and the handoff points." },
        {
          t: "scenario",
          title: "“Help customers book a fitting”, broken down",
          text: "1) Understand which outfit → answer from the price list. 2) They want a date → send the Cal.com booking link (Day 8). 3) They ask about the deposit → explain the rule from the knowledge base. 4) They mention a skin reaction to a fabric → **hand over to Bisi**. 5) They're upset about a late order → **hand over to Bisi**. Suddenly a vague job is five clear steps, and you can see exactly where the risk lives.",
        },
      ],
    },
    {
      heading: "Step 4: Build it free in a Claude Project",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Create a Project", detail: "In Claude, open **Projects** in the left menu → **Create project**. Name it “Stitches by Bisi assistant”. (The free plan allows a small number of Projects at the time of writing, so use one per client prototype.)" },
            { title: "Add the instructions", detail: "In the project, find **Set project instructions** (or **Instructions**) and paste the system prompt." },
            { title: "Add the knowledge base", detail: "Under the project's knowledge (**Add content** or **+**), paste or upload the knowledge base as a text document." },
            { title: "Chat inside the project", detail: "Start a new chat **inside** the project and talk to it like a customer would." },
          ],
        },
        { t: "tip", text: "Out of free Projects, or prefer Google? **Google AI Studio** (aistudio.google.com) is free: paste the instructions into **System instructions** and the knowledge base under them, then chat. The same 20 test questions work there." },
      ],
    },
    {
      heading: "Step 5: Test before any customer sees it",
      blocks: [
        {
          t: "define",
          term: "Test script",
          like: "the driving-test route: the same route every time, so every learner (and every change) is judged fairly.",
          meaning: "A fixed list of questions you ask the assistant every time you change it, marking each answer pass or fail.",
        },
        { t: "list", items: ["10 normal questions (prices, hours, booking, deposits)", "5 tricky ones (“Can I get a discount?”, “Can you finish it by tomorrow?”, “Is this fabric safe for my eczema?”)", "3 off-topic ones (“Write my assignment”)", "2 upset complaints: these must go to a person"] },
        { t: "tool", slug: "customer-service-scripts", why: "Model replies for common and difficult situations, to compare the assistant's answers against." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "list", label: "the same 20 questions" }, { draw: "robot", label: "the assistant answers" }, { draw: "check", label: "pass or fail each", hot: true }], loop: "fix the facts or rules, then run all 20 again" },
          caption: "The test loop: ask the same 20 questions every time, mark each answer, fix the instructions or the facts, and re-run all 20, because one fix can break another answer.",
        },
        { t: "tip", text: "Fix failures by improving the instructions or the knowledge base, then **re-run all 20**. Keep the script forever: you'll re-run it every time a price or rule changes." },
        { t: "mistakes", items: [{ wrong: "“You are a helpful assistant” and nothing else", right: "Full instructions: role, rules, tone, forbidden actions, handoff" }, { wrong: "Letting it answer from general internet knowledge", right: "Only approved facts from the knowledge base" }, { wrong: "Testing with three easy questions", right: "A 20-question script with tricky, off-topic and upset messages" }] },
        { t: "win", title: "Your assistant passed the test", proved: "you can turn a general AI into a business assistant that sticks to the facts, admits what it doesn't know, and calls the owner when it should.", cue: "Show Bisi the test results: 18 or more out of 20. Finish your mission for the **Agent trainer** badge." },
      ],
    },
  ],
  task: {
    title: "Design and test an assistant",
    steps: ["Write the system prompt for a real business.", "Collect and organise the knowledge base, and confirm every fact with the owner.", "Break the assistant's main job into small tasks with handoff points.", "Build it in a Claude Project (or Google AI Studio).", "Run the 20-question test script and fix failures until it passes."],
    done: ["It refuses to invent facts that aren't in the knowledge base", "Complaints and sensitive topics go to a person", "It stays on topic when asked off-topic things", "It passes at least 18 of the 20 test questions", "The owner knows who updates the facts and when"],
  },
  recap: [
    "A **knowledge base** is the assistant's only source of truth: the approved facts it may use.",
    "When it doesn't know, it must **say so and offer a person**, never guess: guessing is how **hallucinations** reach customers.",
    "Sensitive situations (**complaints, refunds, health or skin reactions**) always go to a person through a **handoff**.",
    "Keep a **test script** of 20 questions and re-run it every time the instructions or facts change.",
    "**Out-of-date facts** are the number-one reason assistants fail: agree who updates them and when.",
  ],
  resources: [
    { label: "Claude: what are Projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", note: "Keep instructions and knowledge together." },
    { label: "Anthropic: prompt engineering overview", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", note: "Official guide to writing strong instructions." },
    { label: "Anthropic: building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "How professionals design assistants." },
    { label: "Google AI Studio", url: "https://aistudio.google.com", note: "Free alternative for prototyping with system instructions." },
  ],
  quiz: [
    { q: "What is the knowledge base for?", options: ["Storing passwords", "The approved facts the assistant may use, its only source of truth", "Designing the logo", "Hosting the website"], answer: 1, why: "It keeps answers accurate and stops invented ones.", from: 0, aim: "core" },
    { q: "A customer asks something that isn't in the knowledge base. What should the assistant do?", options: ["Guess confidently", "Say it doesn't know and offer to connect them to a person", "Make up a price", "Ignore the question"], answer: 1, why: "An honest handoff protects the business. Tomorrow the same rule runs on WhatsApp and the website.", from: 1, aim: "whatsapp-bots-cs-agents" },
    { q: "Which message must always go to a person?", options: ["“What time do you open?”", "An upset complaint, a refund request or a skin reaction", "“Where are you located?”", "“How much is a boubou?”"], answer: 1, why: "Sensitive situations need human judgement. Tomorrow you'll build the handoff itself.", from: 2, aim: "whatsapp-bots-cs-agents" },
    { q: "Why keep a 20-question test script?", options: ["For fun", "To re-test the assistant every time the instructions or facts change", "The law requires it", "It isn't needed"], answer: 1, why: "Changes can break answers that used to work. Re-running it is part of the weekly checks on Day 19.", from: 3, aim: "monitoring-handover" },
    { q: "What's the number-one reason AI assistants fail in real businesses?", options: ["The wrong font", "Out-of-date facts", "Too many emojis", "The domain name"], answer: 1, why: "Agree who updates the facts and when; on Day 19 it goes into the system's instruction manual.", from: 4, aim: "monitoring-handover" },
  ],
  celebrate: {
    title: "Day 16 complete: an assistant you can trust",
    proved: "You can turn a general AI into a business assistant that sticks to approved facts, admits what it doesn't know, and calls the owner when it should.",
    badge: "Agent trainer",
    badgeDesc: "Built and tested an AI assistant",
  },
};

export default lesson;
