import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "design-brand-kit",
  title: "Design direction & brand kit",
  minutes: 80,
  outcome: "A one-page guide to how a real business looks and sounds (four colours that are easy to read, two lettering styles, a logo idea and three feeling words), plus your free Claude account, ready for tomorrow.",
  intro:
    "Meet **Bisi Adeyemi**. She runs **Stitches by Bisi**, a tailoring shop in Yaba, Lagos, sewing native and corporate outfits for women. Her work is beautiful, but her Instagram is a mix: a red post one week, a green one the next, five styles of lettering, and a blurry photo of her signboard as the logo. Customers scroll past without knowing it's her. Bisi has asked you, her friend who is learning to build websites, to make her a website. Before anyone builds anything, professionals decide **how the business should look and sound**, and write it down on one page. Today you'll make that page for Bisi. Even better: do it for a real business you know, and follow Bisi's example step by step.",
  core: "A brand kit makes the look-and-sound decisions once, so every page, post and instruction you give the AI matches.",
  youNeed: [
    "A phone or laptop with internet",
    "A real business to practise on (a friend's, a relative's or your own), or simply follow Bisi's example",
    "An email address you can open right now (for your free Claude account)",
    "No money needed: every tool today is free",
  ],
  sections: [
    {
      heading: "Meet Bisi, your first client",
      blocks: [
        { t: "p", text: "Bisi's problem is common. When a business uses different colours and lettering every time, nobody can say exactly what's wrong, but it feels messy, and messy feels untrustworthy. People don't send money to businesses they don't trust." },
        {
          t: "scenario",
          title: "What Bisi's customers see today",
          text: "Ada, a banker in Surulere, saw a lovely boubou on Instagram last month. This week she wants to order one, but she can't find the account again: the new posts look nothing like the one she remembers. She orders from another tailor whose posts all look the same. Bisi never knew she lost that order. (Ada is an illustration, but every tailor will recognise her.)",
        },
        {
          t: "define",
          term: "Brand kit",
          like: "the uniform rules at a Nigerian secondary school: the exact shade of the shirt, the length of the skirt, the badge on the pocket. Every student looks like they belong to the same school, even from far away.",
          meaning: "A one-page guide that says how a business looks and sounds: its colours, its lettering, its logo and the kind of words it uses. Everything you make for the business, from the website to an Instagram post, follows it.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Before", nodes: [{ draw: "page", label: "red post" }, { draw: "page", label: "green post" }, { draw: "camera", label: "blurry logo photo" }] },
            right: { title: "After", nodes: [{ draw: "palette", label: "4 colours, always", hot: true }, { draw: "letters", label: "2 lettering styles" }, { draw: "dress", label: "one Bisi look" }] },
          },
          caption: "Left: three of Bisi's posts that look like three different shops. Right: the same shop after one page of decisions, four colours, two lettering styles, one recognisable look.",
        },
        { t: "p", text: "A brand kit makes the big decisions **once**. After that, every page you build and every instruction you give follows the same rules, so you work faster and the result looks professional." },
        { t: "figure", figure: { diagram: "brand-kit", caption: "A finished brand kit: four colours, two fonts and three feeling words, all on one card." } },
      ],
    },
    {
      heading: "Step 1: Ask the owner 5 questions",
      blocks: [
        { t: "p", text: "You can't design for a business you don't understand. Ask the owner these five questions and write the answers in full sentences. Bisi's answers are under each one, as an example." },
        {
          t: "steps",
          items: [
            { title: "What do you sell, in one sentence?", detail: "Bisi: “Native and corporate outfits for women, sewn to measure in Yaba, ready in 7 to 10 days.”" },
            { title: "Who buys it?", detail: "Be specific. Bisi: “Working women aged 25 to 45 in Yaba, Surulere and Ikeja, who see my work on Instagram and order on WhatsApp.” “Everybody” is not an answer." },
            { title: "Why do people choose you over others?", detail: "One strong reason is enough. Bisi: “It fits perfectly the first time, and I deliver on the day I promise.”" },
            { title: "Which 3 words should customers feel?", detail: "Bisi: **elegant, reliable, warm**." },
            { title: "Which brands or pages do you admire?", detail: "Two or three examples tell you more than an hour of talking. Ask them to show you on their phone." },
          ],
        },
        {
          t: "define",
          term: "Brand voice",
          like: "how you greet your pastor after service versus how you greet your best friend at a party. Same you, different tone.",
          meaning: "How a business sounds when it writes or speaks: friendly and playful, or calm and professional. It's summed up in the three feeling words, called **voice words**. Bisi's are elegant, reliable and warm.",
        },
        { t: "try", title: "Ask the 5 questions today", minutes: 15, steps: ["Choose a real business near you, or your own. (No business? Use Bisi's answers.)", "Send the owner the 5 questions on WhatsApp, or ask them in person.", "Copy the answers into a note on your phone called “[Business name] project notes”. You'll use them every day of this course."] },
        { t: "tip", text: "Ask the owner for permission to use their business as your practice project, and promise you won't publish anything without their yes. Most owners are delighted." },
      ],
    },
    {
      heading: "Step 2: Get your free writing helper",
      blocks: [
        { t: "p", text: "From today you'll work with a free assistant that writes drafts in seconds. You need two words first." },
        {
          t: "define",
          term: "AI",
          like: "a very well-read apprentice who has read millions of pages. Ask clearly and they draft in seconds; but they can sound confident and still be wrong, so the master (you) always checks the work.",
          meaning: "AI (artificial intelligence) here means a computer program you chat with in plain English, like WhatsApp. It writes drafts, ideas and, from Day 3, the website itself. It only knows the business if you tell it, and it makes mistakes, so you check everything it gives you.",
        },
        {
          t: "define",
          term: "Browser",
          like: "a television set: the TV is the same, but it shows whatever channel you tune it to. Websites are the channels.",
          meaning: "The app you use to open websites: Chrome, Safari, Edge or Opera. You type a website's name at the top and it shows the site.",
        },
        { t: "p", text: "We use **Claude** in this course because its free plan is generous and it writes good website code. Create your free account now:" },
        {
          t: "steps",
          items: [
            { title: "Open your browser and go to claude.ai", detail: "Type `claude.ai` in the bar at the very top of the browser and press Enter (or Go on a phone)." },
            { title: "Sign up", detail: "If you use Gmail, tap **Continue with Google** and choose your account. Otherwise type your email address and tap **Continue with email**." },
            { title: "Confirm your email", detail: "Open your email inbox in a new tab. Claude has sent a message with a code or a link. Type the code, or tap the link. Can't see it after 2 minutes? Look in **Spam** or **Promotions**." },
            { title: "Answer the welcome questions", detail: "Type your name. If it asks for a phone number, type it in international form: **+234**, then your number **without the first 0** (0803 123 4567 becomes +234 803 123 4567). Type the code it sends by SMS." },
            { title: "Stay on the free plan", detail: "If a screen offers a paid plan, look for **Continue with free**, **Maybe later** or a small **×**. You never need to pay in this course." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "“You are out of free messages until 3:00 PM” (or a similar limit message)", means: "The free plan allows a certain number of messages every few hours. You've used them for now.", fix: "Wait until the time shown, or paste the same message into **ChatGPT** (chatgpt.com) or **Gemini** (gemini.google.com). Both are free and work the same way for this course." },
            { see: "“Invalid code” or “This link has expired”", means: "You used an old code, or waited too long.", fix: "Ask for a new code and use only the newest email or SMS." },
          ],
        },
        {
          t: "define",
          term: "Prompt",
          like: "the order you give a tailor. “Sew me something nice” gets a surprise. “Green Ankara, A-line, knee length, size 12, ready Friday” gets exactly what you pictured.",
          meaning: "The message you type to the AI. Clear, specific prompts (who it's for, what you want, the rules, what to give back) get useful answers. Vague prompts get vague answers.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Vague order", nodes: [{ draw: "chat", label: "“make me a logo”" }, { draw: "cross", label: "random result" }] },
            right: { title: "Clear order", nodes: [{ draw: "list", label: "business, feeling, colours" }, { draw: "check", label: "useful drafts", hot: true }] },
          },
          caption: "A vague prompt is like telling a tailor “sew me something nice”. A clear prompt, with the business, the feeling and the colours, gets drafts you can actually use.",
        },
        { t: "try", title: "Say hello to your assistant", minutes: 5, steps: ["In Claude, tap the message box at the bottom and type: “I'm learning to build websites for small businesses in Nigeria. In 3 short bullet points, what should a tailor's website do for her customers?”", "Press Enter (or the arrow button) and read the answer.", "Send another message: “Make it simpler, for someone who has never had a website.” Notice how it adjusts. That back-and-forth is how you'll work all course."] },
      ],
    },
    {
      heading: "Step 3: Pick four colours that work together",
      blocks: [
        { t: "p", text: "A good website needs only **four colours**, each with a job:" },
        {
          t: "define",
          term: "Hex code",
          like: "the code on a paint tin at the market. Say “cream” and you might go home with any cream; read out the code and you get that exact shade.",
          meaning: "A colour's exact name: a # followed by six letters or numbers, like #7A1F3D. Computers use it so the colour looks identical on every phone, laptop and printer. You'll paste these codes into your instructions to the AI.",
        },
        { t: "table", columns: ["Colour job", "Used for", "Bisi's choice"], rows: [["Main colour", "Buttons and the most important highlights", "Deep wine **#7A1F3D**"], ["Accent", "Small touches: badges, icons, little lines", "Gold **#D4A017**"], ["Dark", "Body text", "Near-black **#1F1A17**"], ["Light", "Page background", "Cream **#FBF6EE**"]] },
        { t: "p", text: "Choose colours that match the **three voice words**, not your favourites. Bisi's words are elegant, reliable and warm, so: deep wine (elegant, rich), gold (celebration, aso-ebi), warm cream (soft, welcoming)." },
        { t: "list", items: ["Food and energy businesses often use warm colours: orange, red, yellow.", "Clinics, schools and finance often use calm blues and greens, which feel trustworthy.", "Fashion and luxury often use black, cream and one rich colour like wine, gold or deep green."] },
        { t: "tool", slug: "color-palette-generator", why: "Pick one main colour; it builds the full palette, shows how readable each pairing is, and gives you the codes to copy." },
      ],
    },
    {
      heading: "Step 4: Make sure people can read it",
      blocks: [
        { t: "p", text: "Pretty colours are useless if people can't read the words. Light grey on white looks stylish on a big laptop, but on a phone in bright Lagos sunshine it disappears." },
        {
          t: "define",
          term: "Contrast ratio",
          also: ["WCAG"],
          like: "chalk on a blackboard versus chalk on a white wall. The same chalk is easy to read on one and almost invisible on the other.",
          meaning: "A number that says how different two colours are in brightness. 1 : 1 means identical (unreadable); 21 : 1 is black on white. The world's readability rule for websites, called **WCAG**, asks for at least **4.5 : 1** for normal text.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Easy to read", nodes: [{ draw: "board", label: "white on dark: passes", hot: true }] },
            right: { title: "Hard to read", nodes: [{ draw: "page", label: "light grey on white: fails" }] },
          },
          caption: "The chalk test: light words on a dark board are easy to read; light words on a light wall are not. Every text colour on a website must pass this test.",
        },
        { t: "p", text: "Here's what the checker says about Bisi's colours. **White** words on her deep wine: about **10 : 1**, a pass. **White** words on gold: about **2.4 : 1**, a fail. **Near-black** words on the same gold: about **7.3 : 1**, a pass. So her gold buttons get dark words, not white ones. A tiny change that decides whether customers can read the button." },
        { t: "figure", figure: { diagram: "contrast", caption: "Same button, four colour pairs. Only the ones at 4.5 : 1 or higher pass for normal text." } },
        { t: "try", title: "Test two colours yourself", minutes: 6, steps: ["In your browser, go to `webaim.org/resources/contrastchecker`.", "Find the box labelled **Foreground** (that's the words). Click in its **Hex Value** box, delete what's there and type `FFFFFF` (white).", "In the **Background** box, type `D4A017` (gold).", "Read the big **Contrast Ratio** number and, under **Normal Text**, whether it says **Pass** or **Fail**.", "Now change the foreground to `1F1A17` (near-black). Watch it pass. Then try your own business's colours."] },
        { t: "check", q: "A salon owner wants light grey words (#9A9A9A) on a light grey background (#E9E9E9). The ratio is 2.3 : 1. What do you tell her?", options: ["It passes: it looks modern", "It fails the 4.5 : 1 rule, so we darken the words", "The ratio only matters for printing"], answer: 1, why: "Normal text needs at least 4.5 : 1. At 2.3 : 1 many people, especially on phones outdoors, can't read it." },
      ],
    },
    {
      heading: "Step 5: Choose two lettering styles",
      blocks: [
        {
          t: "define",
          term: "Font",
          like: "handwriting. The same words written by your mother and by your younger brother give a different feeling, before you even read them.",
          meaning: "A style of letters. Some fonts are bold and loud, some elegant, some plain and easy to read for a long time. Websites use **two at most**: one for headlines and one for everything else.",
        },
        {
          t: "define",
          term: "Pixel",
          like: "the tiles on a floor. From the door you see one smooth floor; kneel down and it's thousands of small squares. Your phone screen is made the same way.",
          meaning: "A pixel (written **px**) is one tiny dot of a screen. Text sizes on websites are measured in pixels. **16px** is the comfortable minimum for reading on a phone; smaller and people pinch, squint and leave.",
        },
        {
          t: "steps",
          items: [
            { title: "Open Google Fonts", detail: "Go to `fonts.google.com`. Every font there is free to use on websites." },
            { title: "Type a sentence from the business", detail: "Find the box that says **Type here to preview text** and type: “Stitches by Bisi: outfits that fit the first time.” Every font now shows your sentence." },
            { title: "Pick the headline font", detail: "For an elegant brand, search **Playfair Display** in the search box. For a bold, modern one, try **Archivo**. Choose one with the feeling of the voice words." },
            { title: "Pick the reading font", detail: "Plain and clear: **Inter**, **Lato** or **Nunito Sans**. Test it with a long sentence: is it easy to read on your phone?" },
            { title: "Write both names in your notes", detail: "Bisi: headlines in **Playfair Display**, everything else in **Lato**." },
          ],
        },
        { t: "tool", slug: "font-pairing-picker", why: "Choose a mood and see tested headline and reading pairs with a live preview, then copy the names." },
      ],
    },
    {
      heading: "Step 6: A logo idea with free tools",
      blocks: [
        { t: "p", text: "You don't need to be an artist. Free AI image makers can give you logo **ideas** in minutes. Treat them as sketches: choose the best idea, then simplify it so it still works as a tiny icon." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "bulb", label: "the idea in words" }, { draw: "spark", label: "free AI draws 4 options" }, { draw: "scissors", label: "simplify the best" }, { draw: "check", label: "clear even when tiny", hot: true }], arrows: ["prompt", "choose", "test"] },
          caption: "How a logo idea becomes a usable logo: describe it, let a free image maker draw options, pick and simplify one, then check it still reads at the size of a WhatsApp profile picture.",
        },
        { t: "tool", slug: "logo-concept-prompts", why: "Writes clear prompts for five logo styles (name only, initials, symbol, badge, hidden shape) from the business details." },
        {
          t: "steps",
          items: [
            { title: "Write the prompts with our tool", detail: "Fill in the business name, what it sells and the three voice words, then copy one prompt." },
            { title: "Paste it into a free image maker", detail: "**Gemini** (gemini.google.com) and **ChatGPT** (chatgpt.com) can both draw images on their free plans; sign in with Google to start. Claude writes text, not pictures, so use one of these for this step." },
            { title: "Choose and simplify", detail: "Pick the clearest idea. Ask: “Make it simpler, with fewer details, so it's clear at 48 pixels.” For Bisi, a needle forming the letter **B** in wine and gold." },
            { title: "Or start from a template", detail: "**Canva** (canva.com, free plan) has logo templates you can edit with your colours and fonts." },
          ],
        },
        { t: "warn", text: "Never copy another company's logo or imitate a famous brand. It can get your client into legal trouble. Simple, original and readable when small always wins." },
        { t: "check", q: "The AI drew a beautiful logo full of tiny details. What's the professional next step?", options: ["Use it exactly as it is", "Pick the best idea and simplify it so it's clear even when tiny", "Add more details so it looks expensive"], answer: 1, why: "AI logos are ideas. A logo must still be readable as a small profile picture, so simplify before real use." },
      ],
    },
    {
      heading: "Step 7: Put it all on one page",
      blocks: [
        { t: "p", text: "Your brand kit fits on **one page**: a Google Doc, a Canva page or even a neat page in your notebook, photographed. It contains:" },
        { t: "list", items: ["The one-sentence description and who buys", "The three voice words, plus 3 words to avoid (Bisi avoids “cheap”, “hustle”, “slay”)", "The four colours with their hex codes", "The two fonts and where each is used", "The chosen logo idea", "Two or three do's and don'ts, like “gold buttons always have dark words”"] },
        { t: "prompt", title: "Ask Claude to write the voice section", text: "You are a brand strategist for small Nigerian businesses. Here is a business: [paste your answers from Step 1]. Its three voice words are [word 1], [word 2], [word 3]. Write a short 'brand voice' section for its one-page guide: each voice word with one sentence explaining it, 5 example phrases that sound right for this business, and 5 phrases to avoid. Use simple English a busy owner can follow." },
        { t: "tool", slug: "brand-style-guide", why: "Fills everything into a clean one-page style guide you can download, print or send to the owner." },
        { t: "mistakes", items: [{ wrong: "Choosing colours you personally like", right: "Choosing colours that match the three voice words" }, { wrong: "Five different fonts “for variety”", right: "Two fonts: one for headlines, one for reading" }, { wrong: "Light grey words because they “look clean”", right: "Checking every text colour passes 4.5 : 1" }, { wrong: "Using an AI logo exactly as drawn", right: "Simplifying it and checking it's original" }] },
        { t: "win", title: "You made your first brand kit", proved: "you can listen to an owner, turn their answers into clear design decisions, and check those decisions are readable for real customers.", cue: "Send the page to the owner (or a friend) for a reaction, then tick your mission to collect the **Brand maker** badge." },
      ],
    },
  ],
  task: {
    title: "Make a brand kit for a real business",
    steps: ["Pick a real business (or follow Bisi).", "Ask the 5 questions and save the answers in your project notes.", "Create your free Claude account and try one prompt.", "Choose 4 colours and check the text colours pass 4.5 : 1 on WebAIM.", "Pick two fonts on Google Fonts.", "Get a logo idea from a free image maker and simplify it.", "Put everything on one page and save it. You'll use it tomorrow and on Day 3."],
    done: ["My palette has a main, accent, dark and light colour, each with a hex code", "My body text colour passes 4.5 : 1 on my background", "I chose exactly two fonts", "I have a free Claude account and sent it at least one prompt", "My brand kit fits on one page"],
  },
  recap: [
    "A **brand kit** makes the look-and-sound decisions once (colours, fonts, logo, voice) so everything you make for the business matches.",
    "Normal text needs a **contrast ratio of at least 4.5 : 1**. If white words on a colour fail, use dark words on it instead.",
    "Write down each colour's exact **hex code**: you'll paste these codes into your prompts so the AI builds with the exact colours.",
    "A clear **prompt** says who it's for, what you want, the rules and what to give back, like a precise order to a tailor.",
    "The three **voice words** decide the colours today and the words on the website tomorrow, and you'll give them to the AI in every build prompt.",
  ],
  resources: [
    { label: "Google Fonts", url: "https://fonts.google.com", note: "Free fonts for any website." },
    { label: "WebAIM contrast checker", url: "https://webaim.org/resources/contrastchecker/", note: "Check any two colours against the readability rule." },
    { label: "Coolors", url: "https://coolors.co", note: "Explore and save colour palettes, free." },
    { label: "Canva", url: "https://www.canva.com", note: "Free plan: lay out your one-page brand kit or edit a logo template." },
    { label: "web.dev: Learn Design", url: "https://web.dev/learn/design", note: "Google's free course on design for every screen size." },
  ],
  quiz: [
    { q: "What is a brand kit for?", options: ["Looking impressive in a meeting", "Making the look-and-sound decisions once, so everything matches", "Replacing the website", "Choosing the shop's location"], answer: 1, why: "One page of decisions keeps every page, post and AI instruction consistent.", from: 0, aim: "core" },
    { q: "Bisi wants white words on her gold buttons. The checker says 2.4 : 1. What do you do?", options: ["Keep white: it looks classy", "Use dark words on the gold, which pass the 4.5 : 1 contrast rule", "Make the button bigger", "Remove the button"], answer: 1, why: "White on gold fails; near-black on the same gold passes. You'll check every page's contrast again on Day 6.", from: 1, aim: "responsive-fast-accessible" },
    { q: "Why write down the exact hex codes of the colours?", options: ["Printers need them", "So you can paste the exact colours into your prompts when the AI builds the page", "They make the logo bigger", "Google asks for them"], answer: 1, why: "On Day 3 your build prompt includes the codes, so the website comes out in the exact brand colours.", from: 2, aim: "ai-dev-setup" },
    { q: "Which prompt will get the most useful logo ideas?", options: ["“Make me a logo”", "“A simple logo for Stitches by Bisi, a Yaba tailor: elegant, reliable, warm; wine and gold; clear at small sizes”", "“Something nice”", "“Copy a famous fashion logo”"], answer: 1, why: "A specific prompt (who, what, feeling, colours, rules) gets usable drafts. You'll write prompts like this every day.", from: 3, aim: "ai-dev-setup" },
    { q: "Bisi's voice words are elegant, reliable and warm. Where do they matter next?", options: ["Nowhere: they were only for colours", "In the words on her website and in every build prompt you give the AI", "Only on her business card", "In her bank account name"], answer: 1, why: "Tomorrow you write the website's words in her voice, and from Day 3 the voice words go into every build prompt.", from: 4, aim: "layouts-wireframes-copy" },
  ],
  celebrate: {
    title: "Day 1 complete: the look is decided",
    proved: "You can take a business that looks different in every post and give it one clear, readable identity, the first thing every customer notices.",
    badge: "Brand maker",
    badgeDesc: "Made a one-page brand kit",
  },
};

export default lesson;
