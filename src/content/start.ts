import type { Lesson } from "./types";

/** The "Start here" orientation page: read before Day 1 of either track. */
export const startHere: Pick<Lesson, "id" | "sections"> = {
  id: "start-here",
  sections: [
    {
      heading: "How this course works",
      blocks: [
        { t: "p", text: "Every day is one lesson, and every lesson has the same five parts. Once you know the pattern, you'll always know what to do next." },
        {
          t: "steps",
          items: [
            { title: "Read and watch the pictures", detail: "Short sections with drawings. New words are explained in green **Jargon buster** boxes, and orange **Real-life scenario** boxes show where the idea is used in a real Nigerian business situation." },
            { title: "Try it now", detail: "Blue boxes ask you to do something small straight away: open a website, write three sentences, run one command. Doing beats reading. Tick “I did this” when you finish." },
            { title: "Quick checks", detail: "Dotted boxes ask one question with instant feedback. They're practice: not marked, so guess freely." },
            { title: "Your mission", detail: "The real-world task for the day: build the page, set up the account, send the message. Tick every “done when” item honestly, then confirm." },
            { title: "Key takeaways + assessment", detail: "A short list of what matters most, then 5 questions. Everything the questions ask is in the takeaways. Score 4 out of 5 (70%+) to pass. You can retry as many times as you need." },
          ],
        },
        { t: "p", text: "A lesson is **complete** when you've passed its assessment **and** confirmed its mission. Then the next day unlocks. At the end of the track there's a final assessment (one question from every lesson, 75% to pass) and your certificate." },
        { t: "figure", figure: { diagram: "claude-loop", caption: "The way you'll build all course: describe what you want, let the AI plan, approve, check it yourself, then save." } },
      ],
    },
    {
      heading: "XP, levels, streaks and badges",
      blocks: [
        { t: "table", columns: ["You do this", "You earn"], rows: [["Pass a lesson assessment", "10 XP per correct answer (first pass)"], ["Get 5 out of 5", "+25 XP bonus"], ["Confirm your mission", "+50 XP"], ["Complete the lesson", "+100 XP"], ["Pass the final assessment", "+300 XP and your certificate"]] },
        { t: "list", items: ["**Levels** go from Newcomer to STEINARK Legend as your XP grows.", "**Streak** = days in a row (Lagos time) on which you passed a quiz or confirmed a mission. Miss a day and it starts again.", "**Badges** celebrate milestones: your first lesson, a perfect score, a 7-day streak, each week finished, and more."] },
        { t: "tip", text: "XP is only given out by our server after your work is checked, so everyone's XP means the same thing. There's no way to buy or skip it." },
      ],
    },
    {
      heading: "What you'll need",
      blocks: [
        { t: "table", columns: ["Item", "Why", "Notes"], rows: [["A laptop or desktop", "You build on a computer", "Windows or Mac, 8GB RAM is enough. A phone is fine for reading lessons, but not for building."], ["Internet", "Installing tools and deploying", "The first setup downloads about 1–2 GB once. After that, a normal day uses a few hundred MB."], ["Your phone", "Testing sites like a customer", "Most of your clients' customers will visit on a phone."], ["An email you check", "Accounts and notifications", "Use one email for all course accounts so nothing gets lost."], ["1.5–3 hours a day", "One lesson a day", "Can't manage that? Take two days per lesson, your access lasts longer than the track."]] },
        { t: "tip", text: "Power cuts happen. Keep your laptop charged, and save your work often, from Day 3 you'll learn **Git**, which saves snapshots of your project so a sudden shutdown never costs you more than a few minutes." },
      ],
    },
    {
      heading: "What it costs (be ready before Day 3)",
      blocks: [
        { t: "table", columns: ["Tool", "Cost", "When you need it"], rows: [["GitHub, VS Code, Node.js, Git", "Free", "Day 3"], ["Claude (for Claude Code, the AI that builds with you)", "A paid plan: Claude Pro is about $20 a month (check claude.com/pricing)", "From Day 3"], ["Vercel (hosting), Hobby plan", "Free for learning and your own portfolio", "Day 7 in both tracks"], ["Hosting for a paying client's site", "Vercel Pro (about $20/month), or a host whose free plan allows business use", "When you have a client"], ["A domain name", "Roughly ₦5,000–₦25,000 per year, depending on the ending (.com.ng, .ng, .com)", "Optional for practice; required for clients"], ["Paystack, Supabase, Cal.com, Formspree", "Free to start (test mode / free tiers)", "Week 2"]] },
        { t: "warn", text: "Vercel's free Hobby plan is **for personal, non-commercial use only**. The moment someone pays you for a website, host it on a paid plan or a platform whose free tier allows commercial use. We show you how when you deploy." },
      ],
    },
    {
      heading: "Paying for AI tools from Nigeria",
      blocks: [
        { t: "p", text: "Many Nigerian debit cards are declined by foreign websites, especially for monthly subscriptions. This is the most common thing that stops beginners, so sort it out before Day 3." },
        {
          t: "steps",
          items: [
            { title: "Ask your bank first", detail: "Some banks let you enable international online payments on your naira card (often with a monthly dollar limit). Try it on the Claude website." },
            { title: "Use a USD virtual card", detail: "Apps from licensed fintechs let you hold dollars and create a virtual dollar card for online payments. Check that the provider is licensed and read recent reviews before funding it." },
            { title: "Try the mobile app store", detail: "If Claude Pro is offered inside the Claude app on your phone, paying through Google Play or the App Store sometimes works when the website doesn't." },
          ],
        },
        { t: "warn", text: "Never buy “shared” AI accounts, cheap resold logins or keys from strangers. They break the terms of service, get banned without warning, and can expose your projects and personal details." },
      ],
    },
    {
      heading: "When you get stuck",
      blocks: [
        { t: "list", items: ["**Re-read the Jargon busters**: most confusion is one unfamiliar word. The glossary has them all.", "**Copy the exact error message.** Use our Debug Prompt Template tool, paste it into Claude with what you expected to happen.", "**Ask in the WhatsApp community** with a screenshot, the exact error, and what you already tried. Good questions get fast answers.", "**Take a break.** Seriously: many problems solve themselves after a short walk."] },
      ],
    },
    {
      heading: "The rules we follow in every lesson",
      blocks: [
        { t: "list", items: ["Never share passwords, secret keys, OTPs or your BVN with anyone, including us.", "A client's domain, Paystack, WhatsApp and Google accounts belong to the client. You're added as a helper.", "No fake reviews, fake numbers or copied designs. Ever.", "Test before you go live: test mode first, real money second.", "Be honest in your mission checklists. They're for you."] },
      ],
    },
  ],
};
