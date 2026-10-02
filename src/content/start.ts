import type { Lesson } from "./types";

/** The "Start here" orientation page: read before Day 1 of either track. */
export const startHere: Pick<Lesson, "id" | "sections"> = {
  id: "start-here",
  sections: [
    {
      heading: "How this course works",
      blocks: [
        { t: "p", text: "Every day is one lesson, and every lesson has the same parts. Once you know the pattern, you'll always know what to do next." },
        {
          t: "steps",
          items: [
            { title: "Choose how you build, once", detail: "On Day 3 you set up your AI builder. The default is **Google Antigravity**, free. If you can afford it, you can choose **Claude Code** (Claude Pro) instead. On an older laptop, or in a week when Antigravity's free allowance runs out, use the **free chat** backup. Building steps have three tabs; pick yours and the course remembers it." },
            { title: "Read, with pictures and plain words", detail: "Short sections with hand-drawn **sketches**. Every new word gets a **Jargon buster** box that starts with something you already know from everyday life (“Think of it like…”) before the plain-English meaning. Orange **Real-life scenario** boxes show the idea at work in a Nigerian business." },
            { title: "Try it now", detail: "Boxes that ask you to do something small straight away: open a website, write three sentences, test a link on your phone. Doing beats reading. Tick “I did this” when you finish." },
            { title: "Quick checks and screen messages", detail: "Dotted boxes ask one practice question with instant feedback (not marked, so guess freely). Red **If you see this on screen** boxes explain the error messages you might meet, and exactly what to do." },
            { title: "Your mission", detail: "The real-world task for the day: build the page, set up the account, send the message. Tick every “done when” item honestly, then confirm." },
            { title: "The one idea, takeaways and assessment", detail: "Each lesson ends with the **one idea to remember**, a short list of takeaways, then 5 questions. Every question either tests that one idea or a skill a later lesson needs. Everything they ask is in the takeaways. Score 4 out of 5 (70%+) to pass; retry as often as you like." },
          ],
        },
        { t: "p", text: "A lesson is **complete** when you've passed its assessment **and** confirmed its mission. Then the next day unlocks. At the end of the track there's a final assessment (one question from every lesson, 75% to pass) and your certificate." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "chat", label: "ask in plain English" }, { draw: "list", label: "read the plan, approve" }, { draw: "robot", label: "the AI builds the files" }, { draw: "eye", label: "check like a customer", hot: true }], loop: "ask for one change, then repeat" },
          caption: "The way you'll build all course: ask your AI builder in plain English, read and approve its plan, let it build the files, check the result like a customer would, then ask for one change and go round again.",
        },
      ],
    },
    {
      heading: "Meet Bisi, your practice client",
      blocks: [
        { t: "p", text: "Every lesson follows one business: **Stitches by Bisi**, a tailoring shop in Yaba, Lagos, run by Bisi Adeyemi. She needs what most small businesses need: a website that shows her work, a way to book fittings with a deposit, a small shop, a place to keep customers' measurements, and customers who can find her on Google. In the Main Track, she also gets automations that give her evenings back and an AI assistant that answers customers at night." },
        { t: "p", text: "Follow Bisi's example step by step, or, even better, do every step for a **real** business you know: a friend's, a relative's or your own. Ask the owner's permission first. By the end you'll have real work to show." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "list", label: "plan it" }, { draw: "laptop", label: "build it with a free AI builder" }, { draw: "shop", label: "put it online, free" }, { draw: "people", label: "customers find Bisi", hot: true }] },
          caption: "The journey you'll take Bisi's business on: plan it on paper, build it with a free AI assistant, put it online for free, and watch customers find her.",
        },
      ],
    },
    {
      heading: "XP, levels, streaks and badges",
      blocks: [
        { t: "table", columns: ["You do this", "You earn"], rows: [["Pass a lesson assessment", "10 XP per correct answer (first pass)"], ["Get 5 out of 5", "+25 XP bonus"], ["Confirm your mission", "+50 XP"], ["Complete the lesson", "+100 XP and that lesson's own milestone badge"], ["Pass the final assessment", "+300 XP and your certificate"]] },
        { t: "list", items: ["**Milestone badges**: every lesson has its own, named after what you achieved: “Live on the internet”, “Safe checkout”, “On the map”…", "**Milestone moments**: when you hit a real accomplishment inside a lesson (your first page goes live, your first test payment arrives), an orange card marks it and tells you what you just proved you can do.", "**Levels** go from Newcomer to STEINARK Legend as your XP grows.", "**Streak** = days in a row (Lagos time) on which you passed a quiz or confirmed a mission."] },
        { t: "tip", text: "XP is only given out by our server after your work is checked, so everyone's XP means the same thing. There's no way to buy or skip it." },
      ],
    },
    {
      heading: "What you'll need",
      blocks: [
        { t: "table", columns: ["Item", "Why", "Notes"], rows: [["A laptop or desktop", "You build on a computer", "Windows or Mac; an older laptop with 4–8GB RAM is fine. A phone is great for reading lessons and testing sites, but not for building."], ["Internet", "Setting up and publishing", "The first setup downloads a few hundred megabytes once. After that, a normal day uses far less."], ["Your phone", "Testing sites like a customer", "Most of your clients' customers will visit on a phone."], ["An email you check", "Free accounts and notifications", "Use one email for all course accounts so nothing gets lost."], ["1.5–3 hours a day", "One lesson a day", "Can't manage that? Take two days per lesson: your access lasts longer than the track."]] },
        { t: "tip", text: "Power cuts happen. Keep your laptop charged and save often. From Day 3 every version you publish is kept online, and from Day 7 every change is saved with a date, so a sudden shutdown never costs you more than a few minutes." },
      ],
    },
    {
      heading: "What it costs: nothing",
      blocks: [
        { t: "p", text: "You can finish either track, and build real websites you can sell, **without paying for a single tool**. Every lesson teaches the free way completely." },
        { t: "table", columns: ["Tool", "What it does for you", "Cost"], rows: [["Google Antigravity (the default builder)", "A coding agent that writes the website's files on your computer from your plain-English instructions", "Free plan, with an allowance that refreshes weekly"], ["Claude, ChatGPT or Gemini free plans + VS Code", "The backup way: the AI writes code in a chat, you save it in a free editor", "Free"], ["Cloudflare Pages", "Hosting: puts sites online, business use allowed", "Free"], ["GitHub", "Keeps every version and updates the site by itself", "Free"], ["Web3Forms", "Delivers contact form messages to email", "Free (250 a month)"], ["Cal.com", "Booking pages", "Free for one person"], ["Paystack", "Payments: card, transfer, USSD", "Free account; fees only when real money is paid"], ["Supabase", "Sign-ins and private records", "Free plan"], ["Google Search Console and Business Profile", "Getting found on Google and Maps", "Free"], ["Make, Gemini API, Better Stack (Main Track)", "Automations, the website assistant, uptime alerts", "Free plans"]] },
        { t: "warn", text: "Never buy “shared” AI accounts, cheap resold logins or keys from strangers. They break the terms of service, get banned without warning, and can expose your projects and personal details." },
      ],
    },
    {
      heading: "Optional upgrades, once you're earning",
      blocks: [
        { t: "p", text: "Blue **Optional upgrade** boxes in the lessons point to paid tools that can make you faster or give clients more. You never need them to finish a lesson. The one choice you can make from Day 3 is your builder: Claude Code instead of Antigravity, if you can afford it. Everything else, consider after your first paid project, and charge clients for upgrades that are theirs (like their domain)." },
        { t: "table", columns: ["Upgrade", "What it adds", "Who pays"], rows: [["Claude Pro, which includes Claude Code", "A strong paid alternative to Antigravity, with a bigger allowance; use it from the Claude desktop app's Code tab", "You, if you can afford it (about $20 a month, or $17 a month paid yearly)"], ["A domain name (e.g. .com.ng)", "The business's own address", "The client, in their own name"], ["Supabase Pro", "A client portal that never pauses", "The client, when it's in daily use"], ["A paid AI plan", "Privacy for personal details and more conversations", "The client, when the assistant is busy"], ["Make paid plan", "More automation runs each month", "The client, when the free credits run out"]] },
        { t: "p", text: "Many Nigerian debit cards are declined by foreign websites for subscriptions. When you're ready to upgrade:" },
        {
          t: "steps",
          items: [
            { title: "Ask your bank first", detail: "Some banks let you enable international online payments on your naira card (often with a monthly dollar limit)." },
            { title: "Use a USD virtual card", detail: "Apps from licensed fintechs let you hold dollars and create a virtual dollar card. Check the provider is licensed and read recent reviews before funding it." },
            { title: "Try the mobile app store", detail: "Paying through Google Play or the App Store inside an app sometimes works when the website doesn't." },
          ],
        },
      ],
    },
    {
      heading: "When you get stuck",
      blocks: [
        { t: "list", items: ["**Re-read the Jargon busters**: most confusion is one unfamiliar word. The glossary has them all, each with its everyday comparison.", "**Look for the “If you see this on screen” box** in the lesson: the common error messages are explained there.", "**Copy the exact error message** and give it to your AI assistant with what you expected to happen. Our Debug Prompt Template tool helps.", "**Ask in the WhatsApp community** with a screenshot, the exact error and what you already tried. Good questions get fast answers.", "**Take a break.** Seriously: many problems solve themselves after a short walk."] },
      ],
    },
    {
      heading: "The rules we follow in every lesson",
      blocks: [
        { t: "list", items: ["Never share passwords, secret keys, OTPs or your BVN with anyone, including us.", "A client's domain, Paystack, WhatsApp, Google and hosting accounts belong to the client. You're added as a helper.", "No fake reviews, fake numbers or copied designs. Ever. Practice projects are labelled as practice.", "Test before you go live: test mode first, real money second.", "Be honest in your mission checklists. They're for you."] },
      ],
    },
  ],
};
