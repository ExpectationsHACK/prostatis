import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "ai-dev-setup",
  title: "Your AI build setup",
  minutes: 100,
  outcome: "Your computer set up like a professional's: code editor, Node.js, Git and Claude Code, and your first web page running on it.",
  intro:
    "Today you set up your workshop. Professionals use four free tools plus an AI helper, and by the end of this lesson you'll have all five working and your first page on screen, built by describing it in plain English. You don't need to understand code. The AI writes it; you describe, check and ask for changes. Set aside about 90 minutes and a stable connection. Installing is the slowest part, and you only do it once.",
  youNeed: ["A laptop or desktop (Windows or Mac, 8GB RAM is enough)", "About 1–2 GB of data for downloads", "A paid Claude plan (Claude Pro, about $20/month), see “Start here” for paying from Nigeria", "Your wireframe and copy from Day 2"],
  sections: [
    {
      heading: "What you're installing, and why",
      blocks: [
        { t: "table", columns: ["Tool", "What it does", "Cost"], rows: [["VS Code", "The app where your project files live and you can read them", "Free"], ["Node.js", "Lets modern website projects run on your computer", "Free"], ["Git", "Saves snapshots of your work so you can undo mistakes", "Free"], ["GitHub account", "Stores your project online; hosting connects to it later", "Free"], ["Claude Code", "The AI that reads your project and writes the code with you", "Needs a paid Claude plan"]] },
        { t: "define", term: "Terminal", meaning: "A window where you type short text commands instead of clicking buttons. It looks old-fashioned but it's how developers install and run things. On Windows it's called **PowerShell** or **Terminal**; on Mac it's **Terminal**.", like: "sending an SMS order instead of walking into the shop, short, exact instructions." },
        { t: "define", term: "Command", meaning: "One instruction typed into the terminal and run by pressing Enter. For example `node -v` asks: “which version of Node.js is installed?”", like: "one line on a shopping list." },
        { t: "tip", text: "Type commands exactly as shown, spaces and dashes matter. Or copy them with the Copy button and paste (in most terminals: right-click or Ctrl+V)." },
      ],
    },
    {
      heading: "Step 1: Install the basics",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Install VS Code", detail: "Download from code.visualstudio.com and install with the default options." },
            { title: "Install Node.js: the LTS version", detail: "Download from nodejs.org. **LTS** means Long-Term Support: the stable version. Keep the default options." },
            { title: "Install Git", detail: "Download from git-scm.com. On Windows keep the default options. They also install **Git Bash**, which Claude Code needs on Windows." },
            { title: "Create a GitHub account", detail: "Sign up at github.com with an email you check. Pick a professional username: clients may see it." },
          ],
        },
        { t: "p", text: "Now check everything worked. Open a **new** terminal window and type these, one at a time, pressing Enter after each:" },
        { t: "code", lang: "bash", text: "node -v\ngit --version" },
        { t: "p", text: "Each should print a version number, like `v22.11.0`. If you see “not recognized” or “command not found”, **close the terminal, open a new one** and try again: newly installed programs only appear in new windows. Still failing? Restart the computer." },
        { t: "check", q: "You just installed Node.js, but `node -v` says “not recognized”. What do you try first?", options: ["Reinstall Windows", "Close the terminal, open a new one, and try again", "Buy a new laptop", "Skip Node.js"], answer: 1, why: "Terminals only see newly installed programs after they're reopened." },
      ],
    },
    {
      heading: "Step 2: Tell Git who you are (once)",
      blocks: [
        { t: "define", term: "Git", meaning: "A tool that saves **snapshots** of your project. Each snapshot is called a **commit**. If you break something later, you can go back to any snapshot.", like: "the save points in a video game. Lose a fight, go back to the last save, not to the very beginning." },
        { t: "p", text: "Git labels every snapshot with your name and email. Set them once, or your first save will fail with an error:" },
        { t: "code", lang: "bash", text: "git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"" },
        { t: "tip", text: "Use the same email as your GitHub account so your work shows up on your GitHub profile." },
      ],
    },
    {
      heading: "Step 3: Install Claude Code",
      blocks: [
        { t: "define", term: "Claude Code", meaning: "An AI assistant that works inside your project folder. It can read your files, create new ones and run commands, and it asks your permission before changing things.", like: "a skilled builder you direct. You say what you want; they propose how, you approve, they build, you inspect." },
        { t: "p", text: "Anthropic's recommended way is the **native installer**. Copy the command for your computer into the terminal:" },
        { t: "table", columns: ["Your computer", "Command"], rows: [["Windows (PowerShell)", "`irm https://claude.ai/install.ps1 | iex`"], ["Mac or Linux (Terminal)", "`curl -fsSL https://claude.ai/install.sh | bash`"]] },
        { t: "p", text: "When it finishes, open a new terminal and check it:" },
        { t: "code", lang: "bash", text: "claude --version" },
        { t: "warn", text: "Install methods change from time to time. If a command here stops working, the official Claude Code docs (in Go deeper below) always have the current one. Never run install commands from random websites or strangers." },
      ],
    },
    {
      heading: "Step 4: Create your project and start Claude",
      blocks: [
        { t: "define", term: "Project folder", meaning: "One folder that holds everything for one website: pages, images, settings. One website = one folder.", like: "one ring-binder per school subject." },
        { t: "figure", figure: { diagram: "folder-map", caption: "What's inside a project folder. You don't need to memorise it. Claude creates it, but it helps to recognise the names." } },
        { t: "p", text: "In the terminal, make a folder, go into it, and start Claude:" },
        { t: "code", lang: "bash", text: "mkdir my-first-site\ncd my-first-site\nclaude" },
        { t: "list", items: ["`mkdir` = make a directory (folder).", "`cd` = change directory: step into the folder.", "`claude` = start Claude Code in this folder."] },
        { t: "p", text: "The first time, Claude asks you to log in. It opens your browser: sign in with your Claude account, then come back to the terminal." },
        { t: "try", title: "Say hello to Claude Code", minutes: 3, steps: ["Once Claude is running, type: `What can you help me with in this folder?`", "Press Enter and read the answer.", "Type `/help` to see the built-in commands. Press Esc to close it."] },
      ],
    },
    {
      heading: "Step 5: Give your AI a memory: CLAUDE.md",
      blocks: [
        { t: "define", term: "CLAUDE.md", meaning: "A text file in your project that Claude Code reads at the start of **every** session. Put your rules there once, the business, the brand colours, “always mobile-first”, and you never repeat yourself.", like: "the notice on a kitchen wall: every new cook reads it before they start." },
        { t: "tool", slug: "claude-md-generator", why: "Answer a few questions and download a ready CLAUDE.md for your project. Save it inside your project folder." },
        { t: "figure", figure: { tool: "claude-md-generator", caption: "A CLAUDE.md file: short, clear rules the AI follows every session." } },
      ],
    },
    {
      heading: "Step 6: Build your first page",
      blocks: [
        { t: "p", text: "Good instructions (prompts) have five parts. The clearer your prompt, the better the result:" },
        { t: "figure", figure: { diagram: "prompt-anatomy", caption: "Role, context, task, rules, output, the anatomy of a prompt that gets good results." } },
        { t: "prompt", title: "Your first page", text: "You are a senior web developer. Create a new Next.js website with Tailwind CSS in this folder. Build a mobile-first home page for [business name] using my brand kit: colours [paste hex codes], fonts [headline font] and [body font]. Sections: [paste your wireframe]. Use this copy: [paste]. Keep it simple, fast and accessible. When you're done, tell me the exact command to run it and what to open in my browser." },
        { t: "figure", figure: { diagram: "claude-loop", caption: "How every build goes: you describe → Claude plans → you approve → you check in the browser → you save." } },
        { t: "p", text: "Claude will show a plan and ask permission to create files and run commands. **Read what it wants to do**, then approve. When it's finished, open a second terminal in the same folder and run the command it gives you, usually:" },
        { t: "code", lang: "bash", text: "npm run dev" },
        { t: "define", term: "localhost", meaning: "The address of your own computer. `http://localhost:3000` shows your website running privately on your machine. Nobody else can see it yet.", like: "cooking at home before opening the restaurant. Only you taste it." },
        { t: "p", text: "Open **http://localhost:3000** in your browser. That's your website!" },
        { t: "tip", text: "Something looks wrong? Say it in plain English: “The headline is too small on phones” or “Make the button orange like the brand kit.” Small, specific requests work best." },
        { t: "scenario", title: "Ngozi's first evening", text: "Ngozi, a teacher in Enugu, had never opened a terminal. She followed these steps, pasted the prompt, approved Claude's plan, and saw her aunt's bakery page at localhost:3000 within 40 minutes. Then she asked for three changes, bigger photos, a WhatsApp button, prices in naira, and each took under a minute. That's the whole workflow you'll use all course." },
      ],
    },
    {
      heading: "Step 7: Save your first snapshot",
      blocks: [
        { t: "figure", figure: { diagram: "git-flow", caption: "Edit → commit (save a snapshot) → push to GitHub → the website updates. You'll do the last two on deploy day." } },
        { t: "p", text: "Ask Claude: **“Initialise Git and make a first commit called ‘first page’.”** Now you have a save point. From today, commit every time something works." },
        { t: "mistakes", items: [{ wrong: "Closing the terminal running `npm run dev` and wondering why the site stopped", right: "Keep that terminal open while you work; use a second one for other commands" }, { wrong: "Approving everything without reading", right: "Read Claude's plan, if it wants to delete or install something you didn't ask for, say no and ask why" }, { wrong: "One giant change, then no commit for hours", right: "Small change → check → commit. Power cuts can't hurt you then." }] },
      ],
    },
  ],
  task: {
    title: "Get your first page running",
    steps: ["Install VS Code, Node.js and Git; create a GitHub account.", "Set your Git name and email.", "Install Claude Code and log in.", "Add a CLAUDE.md to your project.", "Build your home page from your wireframe with the prompt.", "Open it at localhost:3000 and make 3 improvements by asking Claude.", "Make your first commit."],
    done: ["`node -v`, `git --version` and `claude --version` all print versions", "My page runs at http://localhost:3000", "My project has a CLAUDE.md file", "I made at least one Git commit"],
  },
  recap: [
    "**Claude Code** is an AI assistant that works in your project folder: you describe, it plans and writes the code, you approve and check.",
    "**CLAUDE.md** is a file of rules and context that Claude reads at the start of every session, your AI's memory for the project.",
    "If a new program says “not recognized”, **close the terminal and open a new one**. New installs only appear in new windows.",
    "A **Git commit** is a saved snapshot of your project you can go back to. Commit every time something works.",
    "Good prompts are **specific**: role, context, task, rules and output, “Build a mobile-first home page for Mama's Kitchen with these colours and sections, then tell me how to run it.”",
    "`http://localhost:3000` is your site running **privately on your own computer**. Nobody else can see it until you deploy.",
  ],
  resources: [
    { label: "Claude Code documentation", url: "https://docs.claude.com/en/docs/claude-code/overview", note: "Official install and usage guide, always the current commands." },
    { label: "Node.js downloads", url: "https://nodejs.org", note: "Pick the LTS version." },
    { label: "Git downloads", url: "https://git-scm.com", note: "Installer plus the free Pro Git book." },
    { label: "VS Code", url: "https://code.visualstudio.com", note: "Free code editor." },
    { label: "MDN: Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", note: "The most trusted free reference for how the web works." },
    { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn", note: "Free lessons if you want to understand the code the AI writes." },
  ],
  quiz: [
    { q: "What does Claude Code do?", options: ["Hosts your website", "Reads your project and writes code from your instructions, asking before changes", "Registers domain names", "Designs logos"], answer: 1, why: "It's an AI assistant in your project folder: you describe, it builds, you review.", from: 0 },
    { q: "What is CLAUDE.md for?", options: ["Storing passwords", "Rules and context the AI reads at the start of every session", "The home page text", "Billing"], answer: 1, why: "It gives the AI a memory of your project so you don't repeat yourself.", from: 1 },
    { q: "`node -v` says “not recognized” right after installing. What do you try first?", options: ["Reinstall Windows", "Close the terminal, open a new one, and try again", "Buy a new laptop", "Skip Node.js"], answer: 1, why: "Terminals only see newly installed programs after they're reopened.", from: 2 },
    { q: "What is a Git commit?", options: ["A payment", "A saved snapshot of your project you can go back to", "A type of website", "A domain setting"], answer: 1, why: "Commits let you undo mistakes by returning to an earlier snapshot.", from: 3 },
    { q: "Which prompt is most likely to get a good result?", options: ["“Make a website”", "“Build a mobile-first home page for Mama's Kitchen with these colours and sections, then tell me how to run it”", "“Do something nice”", "“Copy apple.com”"], answer: 1, why: "A specific role, context, task, rules and output give the AI what it needs.", from: 4 },
  ],
};

export default lesson;
