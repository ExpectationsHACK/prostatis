import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "agents-personas-kb",
  title: "AI agents: personas & knowledge bases",
  minutes: 100,
  outcome: "A tested AI assistant for a real business: its instructions, a knowledge base of approved facts, and a 20-question test it passes.",
  intro:
    "Imagine a new receptionist on day one who confidently invents prices, promises discounts and gives medical advice. You'd be horrified. An AI assistant without proper instructions does exactly that. Today you learn to design an **AI agent** properly: it knows one business, follows rules, only uses approved facts, and knows when to hand over to a human. That's the difference between an agent that embarrasses a business and one that brings in sales.",
  youNeed: ["A real business with its prices, hours, policies and common questions", "A Claude account (a Project is the easiest way to prototype)", "20 minutes with the owner to collect facts", "Their WhatsApp chats (with permission) to find real questions"],
  sections: [
    {
      heading: "How an agent works",
      blocks: [
        { t: "define", term: "AI agent", meaning: "An AI assistant with a specific job, rules and information, for example “answer customer questions for Glow Beauty and help them book”. Some agents can also take actions, like checking a calendar.", like: "a well-trained receptionist with a script, a price list and a manager to call when needed." },
        { t: "figure", figure: { diagram: "agent-loop", caption: "The customer asks; the agent uses its rules and knowledge to answer, take an action, or hand over to a human." } },
        { t: "list", items: ["**System prompt**: the agent's job description and rules.", "**Knowledge base**: the facts it may use: prices, hours, policies, answers.", "**Tools**: actions it can take, like checking a calendar or creating an order.", "**Handoff**: when and how it passes the chat to a real person."] },
      ],
    },
    {
      heading: "Step 1: Write the instructions",
      blocks: [
        { t: "define", term: "System prompt", meaning: "The permanent instructions an AI agent reads before every conversation: who it is, who it serves, what it can and can't do, how it talks, and what to do when unsure.", like: "the staff handbook every new employee reads before their first shift." },
        { t: "tool", slug: "chatbot-persona-builder", why: "Builds a complete system prompt: role, tone, allowed topics, forbidden actions, handoff rules." },
        { t: "code", lang: "text", text: "You are Ada, the assistant for Glow Beauty, a lash studio in Lekki.\nHelp customers choose a service, check prices and book.\nOnly use facts from the knowledge base. If you don't know, say so\nand offer to connect them to the team.\nNever promise discounts, give medical advice, or offer times not in the calendar.\nTone: warm, short, simple English. Prices in naira (₦).\nHand over to a human for: complaints, refunds, allergies, or if the customer asks." },
        { t: "check", q: "A customer asks the agent, “Can I get 30% off?” and the knowledge base has no discount. What should the agent do?", options: ["Agree: customers love discounts", "Say it can't offer discounts and offer to connect them to the team", "Ignore the question"], answer: 1, why: "The agent must never promise things that aren't in its approved facts." },
      ],
    },
    {
      heading: "Step 2: Build the knowledge base",
      blocks: [
        { t: "define", term: "Knowledge base", meaning: "The collection of approved facts the agent is allowed to use, prices, hours, location, payment methods, policies and answers to common questions. It's the agent's **only** source of truth.", like: "the laminated price list and rule sheet behind a shop counter." },
        { t: "p", text: "Collect from the owner: services and prices, hours, location and directions, payment methods, policies (deposits, cancellations, refunds), and the **20 questions customers ask most**. Their WhatsApp chats are full of them." },
        { t: "tool", slug: "faq-to-knowledge-base", why: "Paste messy questions or chats and get clean, organised knowledge-base entries." },
        { t: "tool", slug: "faq-generator", why: "Suggests questions customers are likely to ask for this kind of business." },
        { t: "warn", text: "Out-of-date facts are the number-one reason agents fail in real businesses. Agree with the owner **who** updates prices and hours, and **how often**." },
        { t: "try", title: "Collect 10 real questions", minutes: 10, steps: ["With the owner's permission, scroll through their recent WhatsApp chats.", "Write down 10 questions customers really asked.", "Next to each, write the owner's correct answer. That's the start of your knowledge base."] },
      ],
    },
    {
      heading: "Step 3: Break the job into tasks",
      blocks: [
        { t: "p", text: "Split the agent's job into small tasks. Each has an input, a decision and an output. This shows where it needs a tool, or a human." },
        { t: "tool", slug: "agent-task-decomposer", why: "Breaks a big goal (“handle bookings”) into steps, tools needed and handoff points." },
        { t: "scenario", title: "“Handle bookings”, broken down", text: "1) Understand which service → answer from the price list. 2) Check the date → needs the calendar tool. 3) Collect name and phone → simple question. 4) Take the deposit → send the Paystack payment link. 5) Customer mentions an allergy → **hand over to a human**. Suddenly a vague job is five clear steps, and you can see exactly where risk lives." },
      ],
    },
    {
      heading: "Step 4: Test before any customer sees it",
      blocks: [
        { t: "p", text: "Prototype it: create a **Claude Project**, paste the system prompt into the project instructions, and add the knowledge base. Then test it with a script of **20 questions**:" },
        { t: "list", items: ["10 normal questions (prices, hours, booking)", "5 tricky ones (“Can I get a discount?”, “Is it safe if I'm pregnant?”)", "3 off-topic ones (“Write my assignment”)", "2 angry complaints: these must go to a human"] },
        { t: "define", term: "Test script", meaning: "A fixed list of questions you ask the agent every time you change it, marking each answer pass or fail.", like: "a driving test route: same route every time, so you can compare fairly." },
        { t: "tool", slug: "customer-service-scripts", why: "Model replies for common and difficult situations to compare the agent's answers against." },
        { t: "tip", text: "Fix failures by improving the instructions or the knowledge base, then **re-run all 20**. Keep the script forever: you'll re-run it every time something changes." },
        { t: "mistakes", items: [{ wrong: "“You are a helpful assistant” and nothing else", right: "A full system prompt: role, rules, tone, forbidden actions, handoff" }, { wrong: "Letting the agent answer from general internet knowledge", right: "Only approved facts from the knowledge base" }, { wrong: "Testing with three easy questions", right: "A 20-question script including tricky, off-topic and angry messages" }] },
      ],
    },
  ],
  task: {
    title: "Design and test an agent",
    steps: ["Write the system prompt for a real business.", "Collect and organise the knowledge base.", "Break the agent's main job into tasks.", "Prototype it in a Claude Project.", "Run the 20-question test script and fix failures until it passes."],
    done: ["The agent refuses to invent facts that aren't in the knowledge base", "Complaints and sensitive topics go to a human", "It stays on topic when asked off-topic things", "It passes at least 18 of the 20 test questions"],
  },
  recap: [
    "A **knowledge base** is the agent's only source of truth: the approved facts it may use.",
    "When the agent doesn't know, it should **say so and offer a human**, never guess or invent.",
    "Sensitive situations (**complaints, refunds, medical questions**) always go to a human.",
    "Keep a **test script** and re-run it every time the instructions or facts change.",
    "**Out-of-date facts** are the number-one reason agents fail, agree who updates them and when.",
  ],
  resources: [
    { label: "Anthropic: Prompt engineering overview", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", note: "Official guide to writing strong prompts." },
    { label: "Claude: What are Projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", note: "Keep instructions and a knowledge base together." },
    { label: "Anthropic: Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "How professionals design agents." },
    { label: "DeepLearning.AI short courses", url: "https://www.deeplearning.ai/short-courses/", note: "Free short courses on prompting and agents." },
  ],
  quiz: [
    { q: "What is a knowledge base for?", options: ["Storing passwords", "The approved facts the agent may use", "Designing the logo", "Hosting the website"], answer: 1, why: "It keeps the agent's answers accurate and on-brand.", from: 0 },
    { q: "What should the agent do when it doesn't know the answer?", options: ["Guess confidently", "Say so and offer a human", "Make up a price", "Ignore the question"], answer: 1, why: "Honest handoff protects the business.", from: 1 },
    { q: "Which situation should always go to a human?", options: ["“What time do you open?”", "An angry complaint or refund request", "“Where are you located?”", "“How much are classic lashes?”"], answer: 1, why: "Sensitive situations need human judgement.", from: 2 },
    { q: "Why keep a test script?", options: ["For fun", "To re-test the agent every time the instructions or facts change", "The law requires it", "It isn't needed"], answer: 1, why: "Changes can break things that used to work.", from: 3 },
    { q: "What's the number-one reason agents fail in real businesses?", options: ["The wrong font", "Out-of-date facts", "Too many emojis", "The domain name"], answer: 1, why: "Agree who updates the knowledge base and when.", from: 4 },
  ],
};

export default lesson;
