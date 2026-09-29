import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "ai-dev-setup",
  title: "Your AI build setup",
  minutes: 90,
  outcome: "A working setup — code editor, Node.js, Git and Claude Code — and your first page running on your own computer.",
  intro:
    "Today you set up the tools professionals use, and you build your first page by describing it in plain English. You don't need to know how to code. The AI writes the code; you tell it what you want, check the result, and ask for changes. Set aside 90 minutes and a stable internet connection — installing things is the slowest part, and you only do it once.",
  sections: [
    {
      heading: "What you're installing and why",
      blocks: [
        {
          t: "table",
          columns: ["Tool", "What it does", "Cost"],
          rows: [
            ["VS Code", "The editor where your project files live", "Free"],
            ["Node.js", "Runs modern website projects on your computer", "Free"],
            ["Git", "Saves snapshots of your work so you can undo mistakes", "Free"],
            ["GitHub account", "Stores your project online and connects to hosting", "Free"],
            ["Claude Code", "The AI that reads your project and writes the code", "Needs a Claude plan or API credit"],
          ],
        },
        { t: "tip", text: "A laptop with 8GB of RAM is enough. You can follow lessons on your phone, but building needs a computer (Windows, Mac or Linux all work)." },
      ],
    },
    {
      heading: "Step 1 — Install the basics",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Install VS Code", detail: "Download from code.visualstudio.com and install with the default options." },
            { title: "Install Node.js (LTS version)", detail: "Download the LTS (long-term support) version from nodejs.org. LTS is the stable one." },
            { title: "Install Git", detail: "Download from git-scm.com. On Windows, keep the default options during installation." },
            { title: "Create a GitHub account", detail: "Sign up at github.com with an email you check." },
          ],
        },
        { t: "p", text: "Check everything worked. Open a terminal (on Windows: search for **Terminal** or **PowerShell**; on Mac: **Terminal**) and type these one at a time, pressing Enter after each:" },
        { t: "code", lang: "bash", text: "node -v\ngit --version" },
        { t: "p", text: "Each should print a version number. If you see “not recognized” or “command not found”, close the terminal, open a new one, and try again — new installs only appear in new windows." },
      ],
    },
    {
      heading: "Step 2 — Install Claude Code",
      blocks: [
        { t: "p", text: "Claude Code is an AI assistant that works inside your project folder. It can read your files, create new ones and run commands — always asking permission before it changes things." },
        { t: "p", text: "Follow the install instructions on the official Claude Code docs (link in Resources). At the time of writing, one common way is through Node's package manager:" },
        { t: "code", lang: "bash", text: "npm install -g @anthropic-ai/claude-code" },
        { t: "p", text: "Then create a folder for your project, open it in the terminal, and start Claude:" },
        { t: "code", lang: "bash", text: "mkdir my-first-site\ncd my-first-site\nclaude" },
        { t: "p", text: "The first time, it asks you to log in with your Claude account. Follow the prompts in the terminal and browser." },
        { t: "warn", text: "Installation methods change over time. If a command here doesn't work, the official docs always have the current one." },
      ],
    },
    {
      heading: "Step 3 — Give your AI a memory: CLAUDE.md",
      blocks: [
        { t: "p", text: "Every time you start Claude Code, it reads a file called **CLAUDE.md** in your project. Put your rules there once — the business, the style, the do's and don'ts — and you never have to repeat them." },
        { t: "tool", slug: "claude-md-generator", why: "Answer a few questions and download a ready CLAUDE.md for your project." },
        { t: "figure", figure: { tool: "claude-md-generator", caption: "A CLAUDE.md file: short, clear rules the AI follows every session." } },
      ],
    },
    {
      heading: "Step 4 — Build your first page",
      blocks: [
        { t: "p", text: "Now describe what you want. Good prompts have five parts:" },
        { t: "figure", figure: { diagram: "prompt-anatomy", caption: "Role, context, task, rules, output — the anatomy of a prompt that gets good results." } },
        { t: "prompt", title: "Your first page", text: "You are a senior web developer. Create a new Next.js website with Tailwind CSS in this folder. Build a mobile-first home page for [business name] using my brand kit: colours [paste hex codes], fonts [heading font] and [body font]. Sections: [paste your wireframe]. Use the copy from [paste or describe]. Keep it simple, fast and accessible. When you're done, tell me the exact command to run it and what to open in my browser." },
        { t: "p", text: "Claude will propose a plan and ask permission to create files and run commands. Read what it wants to do, then approve. When it finishes, run the command it gives you (usually `npm run dev`) and open **http://localhost:3000** in your browser." },
        { t: "tip", text: "If something looks wrong, just say so in plain English: “The headline is too small on phones” or “Make the button orange like the brand kit.” Small, specific requests work best." },
      ],
    },
    {
      heading: "Step 5 — Save your work with Git",
      blocks: [
        { t: "figure", figure: { diagram: "git-flow", caption: "Edit → commit (save a snapshot) → push to GitHub → deploy." } },
        { t: "p", text: "Ask Claude: “Initialise Git and make a first commit called ‘first page’.” A commit is a saved snapshot. If anything breaks later, you can always go back to it." },
      ],
    },
  ],
  task: {
    title: "Get your first page running",
    steps: ["Install VS Code, Node.js and Git; create a GitHub account.", "Install and log in to Claude Code.", "Generate and add a CLAUDE.md file.", "Build your home page from your wireframe with the prompt.", "Open it at localhost:3000 and make 3 improvements by asking Claude.", "Make your first Git commit."],
    done: ["`node -v` and `git --version` both print versions", "My page runs at http://localhost:3000", "My project has a CLAUDE.md file", "I made at least one Git commit"],
  },
  resources: [
    { label: "Claude Code documentation", url: "https://docs.claude.com/en/docs/claude-code/overview", note: "Official install and usage guide — always the current commands." },
    { label: "Node.js downloads", url: "https://nodejs.org", note: "Pick the LTS version." },
    { label: "Git downloads", url: "https://git-scm.com", note: "Installer plus the free Pro Git book." },
    { label: "VS Code", url: "https://code.visualstudio.com", note: "Free code editor." },
    { label: "MDN — Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", note: "The most trusted free reference for how the web works." },
    { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn", note: "Free lessons if you want to understand the code the AI writes." },
  ],
  quiz: [
    { q: "What does Claude Code do?", options: ["Hosts your website", "Reads your project and writes code from your instructions", "Registers domain names", "Designs logos"], answer: 1, why: "It's an AI assistant that works in your project folder — you describe, it builds, you review." },
    { q: "What is CLAUDE.md for?", options: ["Storing passwords", "Rules and context the AI reads at the start of every session", "The home page content", "Billing"], answer: 1, why: "It gives the AI a memory of your project so you don't repeat yourself." },
    { q: "`node -v` says “not recognized” right after installing. What do you try first?", options: ["Reinstall Windows", "Open a new terminal window and try again", "Buy a new laptop", "Skip Node.js"], answer: 1, why: "Terminals only see newly installed programs after they're reopened." },
    { q: "What is a Git commit?", options: ["A payment", "A saved snapshot of your project you can go back to", "A type of website", "A domain setting"], answer: 1, why: "Commits let you undo mistakes by returning to an earlier snapshot." },
    { q: "Which prompt is most likely to get a good result?", options: ["“Make a website”", "“Build a mobile-first home page for Mama's Kitchen using these colours, fonts and sections, then tell me how to run it”", "“Do something nice”", "“Copy apple.com”"], answer: 1, why: "Specific role, context, task, rules and output give the AI what it needs." },
  ],
};

export default lesson;
