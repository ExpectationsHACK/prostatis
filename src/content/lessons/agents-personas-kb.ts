import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "agents-personas-kb",
  title: "AI agents: personas & knowledge bases",
  minutes: 100,
  outcome: "A tested AI assistant for a business: its system prompt, a knowledge base of facts, and a test script.",
  intro:
    "An AI agent is an assistant with a job. Unlike a general chatbot, it knows one business, follows rules, only uses approved facts, and knows when to hand over to a human. Today you design one properly — the difference between an agent that embarrasses a business and one that brings sales.",
  sections: [
    {
      heading: "How an agent works",
      blocks: [
        { t: "figure", figure: { diagram: "agent-loop", caption: "The customer asks; the agent uses its rules and knowledge base to answer, take an action, or hand over to a human." } },
        { t: "list", items: ["**System prompt** — the agent's job description and rules.", "**Knowledge base** — the facts it may use: prices, hours, policies, FAQs.", "**Tools** — actions it can take: check a calendar, create an order.", "**Handoff** — when and how it passes the chat to a human."] },
      ],
    },
    {
      heading: "Step 1 — Write the persona and rules",
      blocks: [
        { t: "p", text: "The system prompt is the most important part. A good one says who the agent is, who it serves, what it can and can't do, how it talks, and what to do when unsure." },
        { t: "tool", slug: "chatbot-persona-builder", why: "Builds a complete system prompt: role, tone, allowed topics, forbidden actions, handoff rules." },
        { t: "code", lang: "text", text: "You are Ada, the assistant for Glow Beauty, a lash studio in Lekki.\nHelp customers choose a service, check prices and book.\nOnly use facts from the knowledge base. If you don't know, say so\nand offer to connect them to the team.\nNever promise discounts, medical advice or times not in the calendar.\nTone: warm, short, simple English. Use naira (₦).\nHand over to a human if: complaint, refund, allergy, or the customer asks." },
      ],
    },
    {
      heading: "Step 2 — Build the knowledge base",
      blocks: [
        { t: "p", text: "The knowledge base is the agent's only source of truth. Collect it from the owner: services and prices, hours, location and directions, payment methods, policies (deposits, cancellations, refunds), and the top 20 questions customers ask." },
        { t: "tool", slug: "faq-to-knowledge-base", why: "Paste messy FAQs or WhatsApp chats and get clean, structured knowledge-base entries." },
        { t: "tool", slug: "faq-generator", why: "Generates the questions customers are likely to ask for a given business." },
        { t: "warn", text: "Out-of-date facts are the #1 reason agents fail. Agree with the owner who updates prices and hours, and how often." },
      ],
    },
    {
      heading: "Step 3 — Plan the tasks",
      blocks: [
        { t: "p", text: "Break the agent's job into small tasks. Each task has an input, a decision and an output. This shows where tools or humans are needed." },
        { t: "tool", slug: "agent-task-decomposer", why: "Breaks a big goal (“handle bookings”) into steps, tools needed and handoff points." },
      ],
    },
    {
      heading: "Step 4 — Test before anyone sees it",
      blocks: [
        { t: "p", text: "Build a quick prototype: paste the system prompt and knowledge base into a Claude Project (or your agent platform), then test with a script of 20 questions:" },
        { t: "list", items: ["10 normal questions (prices, hours, booking)", "5 tricky ones (“can I get a discount?”, “is it safe if I'm pregnant?”)", "3 off-topic ones (“write my assignment”)", "2 angry complaints — must hand over to a human"] },
        { t: "tool", slug: "customer-service-scripts", why: "Model replies for common and difficult situations to compare the agent against." },
        { t: "tip", text: "Record each answer as pass or fail. Fix the prompt or the knowledge base, then re-run the whole script. Keep the script — you'll re-run it every time something changes." },
      ],
    },
  ],
  task: {
    title: "Design and test an agent",
    steps: ["Write the system prompt for a real business.", "Collect and structure the knowledge base.", "Decompose the agent's main tasks.", "Prototype it in a Claude Project.", "Run the 20-question test script and fix failures until it passes."],
    done: ["The agent refuses to invent facts not in the knowledge base", "Complaints and sensitive topics go to a human", "It stays on topic for off-topic requests", "It passes at least 18 of 20 test questions"],
  },
  resources: [
    { label: "Anthropic — Prompt engineering overview", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", note: "Official guide to writing strong prompts." },
    { label: "Claude — Projects", url: "https://support.claude.com/en/articles/9517075-what-are-projects", note: "Store a knowledge base and instructions together." },
    { label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "How professionals design agents." },
    { label: "DeepLearning.AI short courses", url: "https://www.deeplearning.ai/short-courses/", note: "Free short courses on prompting and agents." },
  ],
  quiz: [
    { q: "What is a knowledge base for?", options: ["Storing passwords", "The approved facts the agent may use", "Designing the logo", "Hosting the website"], answer: 1, why: "It keeps the agent's answers accurate and on-brand." },
    { q: "What should the agent do when it doesn't know the answer?", options: ["Guess confidently", "Say so and offer a human", "Make up a price", "Ignore the question"], answer: 1, why: "Honest handoff protects the business." },
    { q: "Which situation should always go to a human?", options: ["“What time do you open?”", "An angry complaint or refund request", "“Where are you located?”", "“What's the price of classic lashes?”"], answer: 1, why: "Sensitive situations need human judgement." },
    { q: "Why keep a test script?", options: ["For fun", "To re-test the agent every time the prompt or facts change", "Clients require it by law", "It isn't needed"], answer: 1, why: "Changes can break things that used to work." },
    { q: "What's the #1 reason agents fail in real businesses?", options: ["Wrong font", "Out-of-date facts", "Too many emojis", "The domain name"], answer: 1, why: "Agree who updates the knowledge base and when." },
  ],
};

export default lesson;
