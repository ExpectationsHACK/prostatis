import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "ai-dev-setup",
  title: "Your free AI build kit & first live page",
  minutes: 120,
  outcome: "Bisi's home page built by a free AI builder right on your computer, checked by you, and live on the internet at a free address you can send to anyone. No code typed by you, no money spent.",
  intro:
    "Today is a big day. By tonight, Bisi's home page will be on the internet, at a link you can send her on WhatsApp and she can open on her phone in Yaba. You won't write code yourself. You'll use **Google Antigravity**, a free app in which an AI builder works right on your computer: it plans the page, creates the files and shows you what it did, and you check it and ask for changes in plain English. If you can afford it, you can choose Claude Code instead; if your laptop is old, there's a free backup way. Then you'll put the page online with a free service that allows business websites. Charge your laptop and set aside about two hours. Setting up is the slowest part, and you only do it once.",
  core: "A website is a set of files: you keep them in one folder on your computer, and hosting puts them online at a web address anyone can open.",
  youNeed: [
    "A laptop or desktop computer: Windows 10 or 11 (64-bit) or a Mac from the last few years is best for Antigravity; any computer with a browser works with the backup way",
    "A personal Gmail account (not a work or school one). Antigravity is for people aged 18 and over",
    "Your brand kit (Day 1) and your page plan and words (Day 2)",
    "An email address for one more free account (Cloudflare)",
  ],
  sections: [
    {
      heading: "What a website really is",
      blocks: [
        { t: "p", text: "Here's the surprising truth: a website is just **a few files**, the same kind of thing as the photos and documents on your phone. Once you see that, everything today makes sense." },
        {
          t: "define",
          term: "File and folder",
          like: "the papers in an office file jacket. Each paper is a file; the jacket holding them together is a folder.",
          meaning: "A **file** is one saved thing on a computer: a photo, a document, one page of a website. A **folder** holds files together. One website = one folder of files.",
        },
        {
          t: "define",
          term: "HTML",
          like: "the blocks, walls and rooms of a building: what is there, and in what order.",
          meaning: "The language a web page is written in. It says what's on the page: this is a headline, this is a paragraph, this is a photo, this is a button. A web page's file name ends in .html, like index.html.",
        },
        {
          t: "define",
          term: "CSS",
          like: "the paint, tiles, curtains and furniture: how the building looks once the walls are up.",
          meaning: "The instructions that make a page look the way it does: colours, fonts, sizes and spacing. Your brand kit becomes CSS.",
        },
        { t: "p", text: "You won't write HTML or CSS by hand. Your AI builder writes them. Your job is to describe what you want, check the result like a customer would, and ask for changes." },
        {
          t: "define",
          term: "Hosting",
          like: "renting a shop. Your goods can sit in your house, but customers can only buy once they're in a shop on a busy street that's open day and night.",
          meaning: "A company's computer that is always switched on and connected to the internet. It keeps your website's files and sends them to every visitor. Today you'll use **Cloudflare's** free hosting, which allows business websites.",
        },
        {
          t: "define",
          term: "Web address",
          also: ["URL"],
          like: "the shop's street address: 12 Herbert Macaulay Way, Yaba. Give it to anyone and they can find the shop.",
          meaning: "What people type or tap to open a website, like stitches-by-bisi.pages.dev. Its official name is **URL**.",
        },
        {
          t: "define",
          term: "Domain",
          also: ["Subdomain"],
          like: "the name on a shop's signboard. A shop with its own building has its own name (stitchesbybisi.com.ng); a stall inside a big plaza uses the plaza's name too (Bisi's stall, Tejuosho Plaza).",
          meaning: "The main name in a web address, like stitchesbybisi.com.ng, which a business rents every year. Today you'll get a free **subdomain**, a name under Cloudflare's own domain: stitches-by-bisi.pages.dev. It works perfectly, and the business can add its own domain later.",
        },
        {
          t: "define",
          term: "Deploy",
          like: "opening day: moving the goods from your house into the rented shop and opening the doors.",
          meaning: "To put a website's files onto the hosting so the public can open them. People also say **publish** or **go live**.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "house", label: "your laptop: only you see it" }, { draw: "shop", label: "hosting: open day and night", hot: true }, { draw: "signpost", label: "the web address" }, { draw: "people", label: "customers anywhere" }], arrows: ["deploy", "found at", "open it"] },
          caption: "The whole journey of a website: files on your laptop, deployed to hosting that never closes, found at a web address, opened by customers anywhere on their phones.",
        },
        { t: "check", q: "Bisi opens the page on your laptop and loves it, but her customer in Ikeja can't open it from your description. Why?", options: ["Ikeja has bad network", "The page is still only on your laptop: it hasn't been deployed to hosting", "Customers need a password"], answer: 1, why: "Until the files are on hosting, the page exists only on your computer, like food cooked at home that no customer can buy." },
      ],
    },
    {
      heading: "Your free toolkit",
      blocks: [
        {
          t: "define",
          term: "Coding agent",
          like: "a skilled apprentice who works in your workshop: you describe the outfit, they show you their plan, then they cut and sew while you watch, and you approve the result before it goes to the customer.",
          meaning: "An AI builder that works **directly inside your project folder**: it plans, creates and edits the files itself, can open the page to check its own work, and waits for your approval at the important steps. Google Antigravity and Claude Code are coding agents.",
        },
        {
          t: "define",
          term: "Code editor",
          also: ["IDE"],
          like: "a tailor's cutting table. You could cut fabric on the floor, but the table, with its ruler and chalk, makes the work neat and safe.",
          meaning: "An app for creating and opening a website's files. Antigravity has one built in (based on Microsoft's free **VS Code**). An editor that also has an AI builder and other tools inside it is often called an **IDE**.",
        },
        { t: "table", columns: ["Tool", "Its job", "Cost"], rows: [["**Google Antigravity** (the default)", "A coding agent with a built-in editor: writes the files in your folder for you", "Free plan, with an allowance that refreshes every week"], ["Claude Code (your choice, if you can afford it)", "Anthropic's coding agent, used from the Claude desktop app", "Needs Claude Pro: about $20 a month ($17 a month if paid yearly)"], ["Free AI chat + VS Code (the backup)", "Claude, ChatGPT or Gemini write the code in a chat; you copy it into VS Code", "Free"], ["Cloudflare Pages", "Hosting: where the website lives online", "Free, and allowed for business websites"], ["Chrome (or any browser)", "Shows you the page", "Free"]] },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Free chat (backup)", nodes: [{ draw: "chat", label: "AI writes in a chat" }, { draw: "page", label: "you copy and paste" }] },
            right: { title: "Coding agent (default)", nodes: [{ draw: "robot", label: "writes the files itself", hot: true }, { draw: "eye", label: "you review and approve" }] },
          },
          caption: "Two ways to build with AI: a chat that hands you code to copy into files yourself, or a coding agent that writes the files straight into your folder while you review and approve each step.",
        },
        { t: "p", text: "**Which should you use?** Start with **Antigravity**: it's free and it does the copying, saving and checking for you. If you can comfortably afford Claude Pro, **Claude Code** is an excellent choice and every prompt in this course works there too. Keep the **free chat** way in your back pocket: you'll use it on older laptops, or in a week when Antigravity's free allowance runs out." },
        { t: "tip", text: "In every lesson, boxes like the one in Step 2 have three tabs: **Antigravity · free**, **Claude Code · paid** and **Free chat · backup**. Pick yours once; the course remembers it and shows your steps." },
        { t: "check", q: "Halfway through the week, Antigravity says you've used this week's free allowance. You still have a page to build. What do you do?", options: ["Stop until next week", "Switch to the free chat backup (Claude, ChatGPT or Gemini) for the rest of the week", "Pay for any plan immediately"], answer: 1, why: "The free path always has a backup. The same prompts work in the free chat; you just copy the code into the file yourself." },
      ],
    },
    {
      heading: "Step 1: Make the project folder",
      blocks: [
        { t: "p", text: "Every project gets its own folder, with two folders inside: **site** (what goes on the internet) and **notes** (private things that never go online)." },
        {
          t: "steps",
          items: [
            { title: "Windows: open File Explorer", detail: "Click the yellow folder icon on the bar at the bottom of the screen. On the left, click **Documents**." },
            { title: "Mac: open Finder", detail: "Click the blue smiling-face icon at the bottom of the screen. On the left, click **Documents**." },
            { title: "Make the project folder", detail: "Right-click an empty white space (on a Mac trackpad: tap with two fingers) → **New** → **Folder** (Mac: **New Folder**). Type `bisi-project` and press Enter." },
            { title: "Make two folders inside it", detail: "Double-click `bisi-project` to open it. Make a folder called `site` and another called `notes` the same way." },
          ],
        },
        { t: "tip", text: "Use **small letters and dashes, no spaces** in names: `bisi-project`, not `Bisi Project`. Web addresses can't contain spaces, so this habit saves you errors later." },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "site: goes online", nodes: [{ draw: "page", label: "index.html", hot: true }, { draw: "camera", label: "photos" }] },
            right: { title: "notes: stays private", nodes: [{ draw: "list", label: "brief for the AI" }, { draw: "book", label: "owner's answers" }] },
          },
          caption: "Inside bisi-project: everything in the site folder will be on the internet; everything in the notes folder stays on your laptop. Never put private notes in site.",
        },
      ],
    },
    {
      heading: "Step 2: Install your builder",
      blocks: [
        {
          t: "define",
          term: "File size",
          like: "data bundles: 1 GB lasts much longer than 100 MB because it's ten times bigger. Files are measured in the same units.",
          meaning: "How much space a file takes, and so how much data it costs to download. **KB** is small, **MB** is 1,000 KB, **GB** is 1,000 MB, exactly like your data plan. Each of today's installers is roughly 100 MB to 250 MB, a one-time cost.",
        },
        {
          t: "builder",
          title: "Install and set up",
          antigravity: [
            { title: "Download Antigravity", detail: "In your browser, go to `antigravity.google/download` and choose **Windows** or **macOS**. Only download it from this official address." },
            { title: "Install it", detail: "Windows: open **Downloads** and double-click the installer, then follow the screens. Mac: open the downloaded file and drag **Antigravity** into **Applications**, then open it from there." },
            { title: "Sign in", detail: "Click **Continue with Google** and choose your **personal Gmail** account (not a work or school account). Then click **Open Antigravity**." },
            { title: "Finish the setup screens", detail: "Pick a theme, skip any optional plugins, accept the terms and click **Finish**." },
            { title: "Open your project", detail: "On the **Select Project** screen, click **Create New Project** → **New Project**, and choose `Documents` → `bisi-project`." },
            { title: "Make it ask before acting", detail: "Open **Project Settings**. Where it asks how much the agent may do on its own, choose the option that makes it **ask for your review** before running commands or changing things. Safer while you're learning. If you prefer, also switch off data sharing in **Settings**." },
          ],
          claudeCode: [
            { title: "Get Claude Pro", detail: "Only if you can afford it: at claude.ai, click your name → **Upgrade** → **Pro** (about $20 a month; $17 a month if paid yearly). “Start here” explains paying from Nigeria." },
            { title: "Install the Claude desktop app", detail: "Download it from `claude.com/download` (Windows or Mac), install it and sign in with your Claude account." },
            { title: "Open the Code tab", detail: "At the top of the app, click **Code**. This is Claude Code: no terminal needed." },
            { title: "Choose your project folder", detail: "Start a new session and select `Documents` → `bisi-project` as its folder." },
            { title: "Approve every change while learning", detail: "Next to the send button, open the mode selector and choose **Manual**, so Claude asks before every file change. You can relax this later." },
          ],
          chat: [
            { title: "Install VS Code (free editor)", detail: "Go to `code.visualstudio.com`, click **Download**, and install it (Windows: accept → Next → Install; Mac: unzip and drag it into Applications)." },
            { title: "Open your project", detail: "In VS Code: **File** → **Open Folder…** → `Documents` → `bisi-project`. When asked “Do you trust the authors?”, click **Yes, I trust the authors**: it's your folder." },
            { title: "Keep your free AI chat open", detail: "Use **claude.ai** (your Day 1 account) in the browser. If you hit its free limit, the same prompts work in **ChatGPT** (chatgpt.com) or **Gemini** (gemini.google.com)." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "“Your current account is not eligible for Antigravity”", means: "You signed in with a work or school account, the account belongs to someone under 18, or a VPN makes it look as if you're in an unsupported country (Nigeria is supported).", fix: "Sign in with a personal @gmail.com account, aged 18+, with any VPN switched off. Still blocked? Use the **Free chat · backup** tab: everything in this course works that way too." },
            { see: "“Do you want to allow this app to make changes to your device?” (Windows)", means: "Windows double-checks before any app installs.", fix: "Click **Yes**, but only for apps you downloaded from the official website." },
            { see: "“…is an app downloaded from the Internet. Are you sure you want to open it?” (Mac)", means: "Your Mac double-checks apps from the internet the first time.", fix: "Click **Open**." },
          ],
        },
      ],
    },
    {
      heading: "Step 3: Write the instructions for your AI",
      blocks: [
        {
          t: "define",
          term: "Project brief",
          like: "the notice pinned on the wall of Bisi's workshop for every new apprentice: our colours, how we greet customers, never promise a date we can't meet. They read it on their first day and never need reminding.",
          meaning: "A short note with the business facts and your building rules: brand colours, fonts, voice words, “phone first”, “no invented reviews”. Your AI builder reads it before every job, so you never have to repeat yourself.",
        },
        { t: "tool", slug: "claude-md-generator", why: "Answer a few questions and get a ready project brief to copy. (The file name CLAUDE.md is what Claude Code reads automatically; for Antigravity and the free chat, use the same text.)" },
        { t: "code", lang: "text", text: "PROJECT BRIEF: Stitches by Bisi\nBusiness: tailoring shop in Yaba, Lagos. Native and corporate outfits for women, sewn to measure, ready in 7-10 days.\nCustomers: working women 25-45 in Yaba, Surulere, Ikeja. They order on WhatsApp from their phones.\nVoice: elegant, reliable, warm. Simple English. Prices in naira (₦).\nColours: main #7A1F3D (wine), accent #D4A017 (gold), text #1F1A17, background #FBF6EE.\nFonts (Google Fonts): headlines Playfair Display, everything else Lato.\nBuild rules: plain HTML, CSS and JavaScript files in the site folder, no frameworks. Phone first. Body text at least 16px. Gold buttons have dark words.\nOne main action everywhere: \"Order on WhatsApp\" (wa.me link).\nNever invent reviews, prices, numbers or awards: use [placeholders].\nNever put anything from the notes folder into the site folder." },
        {
          t: "builder",
          title: "Where the brief goes",
          antigravity: [
            { title: "Save it as notes/brief.md", detail: "In your first conversation, type: “Create the file notes/brief.md with exactly this text:” and paste the brief. Approve the change." },
            { title: "Point to it every time", detail: "Start every new conversation with: “Read notes/brief.md and follow it for everything you build.”" },
          ],
          claudeCode: [
            { title: "Save it as CLAUDE.md", detail: "Ask: “Create CLAUDE.md in the top of this folder with exactly this text:” and paste the brief. Approve the change." },
            { title: "Nothing else to do", detail: "Claude Code reads CLAUDE.md automatically at the start of every session." },
          ],
          chat: [
            { title: "Save it in notes", detail: "In VS Code, click `notes` → **New File** icon → type `brief.md` → paste the brief → **Ctrl+S** (Mac **Cmd+S**). A white dot on the tab means “not saved yet”." },
            { title: "Paste it first in every chat", detail: "The free chat doesn't remember yesterday's conversation, so paste the brief at the start of every new chat." },
          ],
        },
      ],
    },
    {
      heading: "Step 4: Ask for the page",
      blocks: [
        { t: "p", text: "Now the moment: your plan and words from Day 2 become a real page. Fill in the brackets in this prompt first (in a notes app), then send it." },
        { t: "prompt", title: "Bisi's home page", text: "Read the project brief first and follow it.\n\nCreate ONE file, site/index.html, for the home page. Put all the styling inside a <style> tag in the same file and load the two Google Fonts from the brief. Build it phone first, then make it look good on laptops. Use these sections in this order: [paste your wireframe boxes]. Use exactly these words: [paste your words from Day 2]. Every 'Order on WhatsApp' button opens https://wa.me/2348000000000 (I'll change the number later). Where photos will go, show a tasteful coloured box with a label like [photo: green boubou]. Don't invent reviews, prices or numbers. When you're done, tell me in one sentence what to check.\n\n(Free chat only: also say 'Give me the complete file from <!DOCTYPE html> to </html> in one code block.')" },
        {
          t: "builder",
          title: "Send it and review the result",
          antigravity: [
            { title: "Start a conversation", detail: "In your project, click **Start first conversation** (or the **+** for a new one). The model menu can stay on its default." },
            { title: "Send the prompt", detail: "Paste it into the message box and press Enter. For a whole page, the agent usually makes an **Implementation Plan** first." },
            { title: "Read the plan, then approve", detail: "Open the side panel (the **Auxiliary Pane**, top right) to read the plan. Something wrong? Comment on it in plain English. When it's right, click **Proceed**." },
            { title: "Read the walkthrough", detail: "When it finishes, it shows a **Walkthrough** of what it did. Click **Open IDE** to see `site/index.html` in the file list." },
          ],
          claudeCode: [
            { title: "Send the prompt", detail: "Paste it into the Code tab's message box and press Enter." },
            { title: "Approve each change", detail: "In **Manual** mode, Claude shows each file before saving it. If it matches what you asked, approve it; if not, say what's wrong." },
            { title: "Look at it", detail: "Ask: “Open site/index.html in the preview.” It appears in the app's Browser pane." },
          ],
          chat: [
            { title: "New chat, brief first", detail: "At claude.ai, click **New chat**, paste the brief, then the prompt (with the “free chat only” line), and press Enter." },
            { title: "Copy the code", detail: "Click the **Code** tab of the preview panel (or the code box in the chat), then the **Copy** button." },
            { title: "Save it as index.html", detail: "In VS Code: click `site` → **New File** → type `index.html` exactly → click in the empty area → paste (**Ctrl+V** / **Cmd+V**) → save (**Ctrl+S** / **Cmd+S**)." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "Antigravity says you've reached your weekly limit", means: "The free plan's agent allowance for this week is used up. It refreshes weekly.", fix: "Switch to the **Free chat · backup** tab for the rest of the week, or wait for the refresh. Small, clear requests use less of the allowance than big vague ones." },
            { see: "The agent wants to run a command you don't understand", means: "Coding agents sometimes run small helper commands.", fix: "Ask it: “What does this command do and why do you need it?” before approving. Never approve deleting files or folders you didn't ask about." },
            { see: "(Free chat) The code stops halfway and doesn't end with </html>", means: "The answer was too long for one message.", fix: "Reply: “Your file was cut off. Give me the complete file again, shorter, in one code block.”" },
          ],
        },
        { t: "tip", text: "**Using the free chat?** One rule for every prompt in the rest of the course: paste your brief first, and add at the end “Give me each new or changed file complete, with its file name.” Then save each file in the right folder. Antigravity and Claude Code read the brief and save the files themselves." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "chat", label: "ask in plain English" }, { draw: "list", label: "read the plan, approve" }, { draw: "robot", label: "the agent builds the files" }, { draw: "eye", label: "check like a customer", hot: true }], loop: "ask for one change, then repeat" },
          caption: "The build loop you'll use for every page in this course: ask in plain English, read and approve the plan, let the agent build, check the result like a customer, then ask for one change and go round again.",
        },
      ],
    },
    {
      heading: "Step 5: Open it and improve it",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Find the file", detail: "Open File Explorer (or Finder) → `Documents` → `bisi-project` → `site`. You'll see `index.html`." },
            { title: "Open it", detail: "Double-click `index.html`. It opens in your browser. That's Bisi's home page!" },
            { title: "Look at the address", detail: "It starts with `file:///`. That means the page is opening from your own computer: only you can see it, like food cooked at home." },
            { title: "See it at phone size", detail: "Make the browser window very narrow by dragging its right edge to the left. The layout should become one column, like on a phone." },
          ],
        },
        { t: "tip", text: "Why `index.html`? It's the name every website uses for its **front page**. When someone opens your web address, the hosting looks for `index.html` first, like a visitor going straight to the reception desk." },
        { t: "try", title: "Make three improvements, one at a time", minutes: 15, steps: ["Look at the page like Bisi's customer. Write down three improvements, e.g. “the headline is too small on phones”, “make the button gold with dark words”, “more space between sections”.", "Ask your builder for **one** change: “Make the headline bigger on phones.” (Free chat: add “Give me the complete updated file”, then replace everything in index.html and save.)", "Refresh the browser (**F5**, or **Cmd+R** on Mac) and check it. Then ask for the next change."] },
        { t: "check", q: "Your builder says it changed the page, but the browser still shows the old version. What's the most likely fix?", options: ["Buy a new laptop", "Refresh the browser (and, with the free chat, check the file is really saved)", "Delete the folder and start again"], answer: 1, why: "The browser shows what it loaded last. Refresh to load the saved file." },
        { t: "mistakes", items: [{ wrong: "A file called `Index.html`, `home.html` or `index.html.txt`", right: "Exactly `index.html`, all small letters, inside `site`" }, { wrong: "Approving a plan without reading it", right: "Reading the plan and asking about anything you don't understand" }, { wrong: "Asking for ten changes in one message", right: "One change, check, then the next" }] },
      ],
    },
    {
      heading: "Step 6: Put it on the internet (free)",
      blocks: [
        { t: "p", text: "Now the page moves from your laptop to Cloudflare, where it's open day and night. You'll create one free account, upload the `site` folder, and get a real web address." },
        {
          t: "steps",
          items: [
            { title: "Create a free Cloudflare account", detail: "Go to `dash.cloudflare.com/sign-up`. Type your email and a strong password (write it somewhere safe, not in the `site` folder), then click **Sign up**. Open the email from Cloudflare and click the link to confirm your address." },
            { title: "Open Workers & Pages", detail: "In the Cloudflare dashboard, find **Workers & Pages** in the menu on the left. (On a small screen, open the menu with the ☰ button.)" },
            { title: "Start a new site", detail: "Click **Create application**. Choose the **Pages** option, then **Drag and drop your files** (it may say **Upload assets**)." },
            { title: "Name the project", detail: "Type `stitches-by-bisi` (small letters and dashes). This name becomes your address: stitches-by-bisi.pages.dev. Click **Create project**." },
            { title: "Upload the site folder", detail: "Drag the **`site`** folder (not `bisi-project`) from File Explorer or Finder into the upload box, or click **Select from computer → Upload folder** and pick `site`. Wait until the files show as uploaded." },
            { title: "Deploy", detail: "Click **Deploy site**. In a few seconds you'll see a success message and a link ending in `.pages.dev`. Click it." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "“A project with this name already exists”", means: "Someone already used that name.", fix: "Add something to it, like `stitches-by-bisi-ada`. The address changes to match." },
            { see: "Your link shows “404” or “Not found”", means: "Cloudflare can't find index.html at the top level. You probably uploaded `bisi-project`, so the file is one folder deeper.", fix: "Create a new deployment (Step 7) and drag the `site` folder itself." },
            { see: "The link doesn't open in the first minute", means: "Brand-new addresses can take a minute or two to reach every network.", fix: "Wait two minutes and refresh. Try on your phone's data too." },
          ],
        },
        { t: "win", title: "Bisi's page is live on the internet", proved: "you can take an idea from a notebook to a web address anyone in the world can open, using only free tools.", cue: "Send the link to Bisi (or a friend) on WhatsApp and watch them open it on their phone. Then finish your mission to collect the **Live on the internet** badge." },
      ],
    },
    {
      heading: "Step 7: Update it, and go back in time",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Change and check as usual", detail: "Ask your builder for a change and check it in your browser first." },
            { title: "Upload a new version", detail: "In Cloudflare: **Workers & Pages** → click `stitches-by-bisi` → **Create deployment** (or **Create new deployment**) → drag the `site` folder again → **Save and Deploy**." },
            { title: "See every version", detail: "On the project page, the **Deployments** list keeps every upload with its date, like a photo album of the website." },
            { title: "Undo a bad change", detail: "Find an older version in the list, open its **⋯** menu and choose **Rollback to this deployment**. The live site goes back instantly." },
          ],
        },
        { t: "later", lesson: "deploy-domain", text: "upload the `site` folder again whenever you change something. On Day 7 the website will start updating by itself every time you save a change online, with a full history of every edit." },
        { t: "scenario", title: "The power cut that cost nothing", text: "Picture this: you're halfway through changes when the light goes and your laptop dies. Nothing on the internet is affected, because the live site is the last version you deployed. When the light comes back, your files are still in `site`, and Cloudflare still has every earlier version if a change went wrong. Check often; deploy when a change is right." },
        { t: "mistakes", items: [{ wrong: "Uploading `bisi-project` (with your notes inside)", right: "Uploading only the `site` folder" }, { wrong: "Deploying without checking in your browser first", right: "Check on your computer, then deploy" }, { wrong: "Letting the agent change things you didn't ask for", right: "Reading its plan and walkthrough, and saying no to anything unexpected" }] },
      ],
    },
  ],
  task: {
    title: "Get your first page live",
    steps: ["Make the `bisi-project` folder with `site` and `notes` inside.", "Set up your builder: Antigravity (free, the default), Claude Code (if you've chosen to pay) or the free chat backup.", "Save your project brief where your builder reads it.", "Build the home page as `site/index.html` with the prompt, reviewing the plan and the result.", "Open it in your browser and make 3 improvements, one at a time.", "Create a free Cloudflare account and upload the `site` folder.", "Open your `.pages.dev` link on your phone and send it to one person."],
    done: ["My page opens from my computer (the address starts with file:///)", "My page opens on my phone at a .pages.dev address", "My project brief is in my project, not in the site folder", "I made at least 3 changes by asking in plain English, one at a time", "I uploaded only the site folder: no notes, no passwords"],
  },
  recap: [
    "A website is a set of **files** (HTML for what's on the page, CSS for how it looks), kept together in one folder.",
    "**Hosting** keeps the files online and the **web address** is how people find them; **deploying** puts the files on the hosting.",
    "A **coding agent** like Antigravity (free, the default) writes the files in your folder for you: **read its plan, approve it, then check the result**.",
    "Your builder needs the **project brief** every time: Antigravity reads notes/brief.md when you point to it, Claude Code reads CLAUDE.md by itself, and the free chat needs it pasted.",
    "Ask for **one change at a time** in plain English, then refresh and check: the loop you'll use to build every page.",
    "An address starting **file:///** is only on your computer; the **.pages.dev** address is the one the world can open.",
    "Antigravity's free allowance ran out? **Use the free chat backup (Claude, ChatGPT or Gemini) for the rest of the week**, or wait for the weekly refresh.",
  ],
  resources: [
    { label: "Google Antigravity", url: "https://antigravity.google", note: "Official download, plans and FAQ (including supported countries)." },
    { label: "Antigravity: getting started codelab", url: "https://codelabs.developers.google.com/getting-started-google-antigravity", note: "Google's own step-by-step first project." },
    { label: "Claude Code in the desktop app", url: "https://code.claude.com/docs/en/desktop", note: "For the paid choice: the Code tab, explained." },
    { label: "Cloudflare Pages: drag and drop", url: "https://developers.cloudflare.com/pages/get-started/direct-upload/", note: "Official guide to uploading a site folder." },
    { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn", note: "Free lessons if you want to understand the HTML and CSS your builder writes." },
  ],
  quiz: [
    { q: "Bisi loves the page on your laptop, but her customer in Ikeja can't open it. Why?", options: ["Ikeja has no network", "It's only on your computer (file:///) and hasn't been put on the hosting yet", "Customers need a password", "Chrome doesn't work in Ikeja"], answer: 1, why: "Until the files are deployed to hosting, the page exists only on your laptop.", from: 5, aim: "core" },
    { q: "What does hosting do for a website?", options: ["Designs the logo", "Keeps the files online, open day and night, at a web address anyone can reach", "Writes the words", "Takes payments"], answer: 1, why: "Hosting is the shop that never closes. On Day 7 you'll point a business's own domain at it.", from: 1, aim: "deploy-domain" },
    { q: "Antigravity shows you a plan before building the page. What do you do?", options: ["Approve it without reading", "Read the plan, comment on anything wrong, then approve it and check the result", "Close the app", "Delete the project"], answer: 1, why: "You're the master; the agent is the apprentice. Tomorrow you'll approve five pages this way.", from: 2, aim: "build-business-site" },
    { q: "The headline is too small and the button is the wrong colour. What's the best way to fix them?", options: ["One message asking for ten changes", "One change at a time: ask, refresh, check, then the next", "Start a brand-new website", "Edit the code by guessing"], answer: 1, why: "Small checked steps keep problems easy to spot. Tomorrow you build five pages this way.", from: 4, aim: "build-business-site" },
    { q: "Antigravity says you've used this week's free allowance and you're mid-build. What do you do?", options: ["Pay for a plan immediately", "Use the free chat backup (Claude, ChatGPT or Gemini) for the rest of the week, or wait for the refresh", "Give up for the month", "Buy someone's account"], answer: 1, why: "The free path always has a backup, and the same prompts work there.", from: 6, aim: "build-business-site" },
  ],
  celebrate: {
    title: "Day 3 complete: you're live on the internet",
    proved: "You can build a real web page with a free AI builder and publish it at a web address anyone can open, with no code typed and no money spent.",
    badge: "Live on the internet",
    badgeDesc: "Published a first page on free hosting",
  },
};

export default lesson;
