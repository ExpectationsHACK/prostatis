import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deliver-get-paid",
  title: "Deliver & get paid",
  minutes: 100,
  outcome: "A delivery process from deposit to launch, a get-paid system (clear payment requests, a Paystack payment link and polite reminders) that collects every naira on time, a handover checklist, and a care-plan offer.",
  intro:
    "Winning the client is half the job. The other half is delivering smoothly and **actually collecting the money**, on time, without awkward chasing. Many beginners do great work and then wait months to be paid. Bisi learned this long ago: she takes a deposit before cutting, and she never releases an outfit until the balance is paid. Today you'll set up the same professional habits for websites, so every project ends with a happy client, full payment and often a monthly fee.",
  core: "Collect the deposit before work starts and the balance before launch, with clear written payment requests and polite reminders.",
  youNeed: ["A real or practice client project (Bisi's counts)", "Your proposal and package from earlier", "Your Paystack account (test mode is fine to practise)", "A free Google Sheet to track payment requests"],
  sections: [
    {
      heading: "The delivery timeline",
      blocks: [
        {
          t: "define",
          term: "Milestone",
          like: "the stages of building a house: foundation, roof, finishing. The builder is paid at each stage, not all at the end.",
          meaning: "A clear checkpoint in a project, like “deposit paid” or “site live”, often tied to a payment.",
        },
        {
          t: "steps",
          items: [
            { title: "Kick-off: after the deposit", detail: "Collect the words, photos, logins and details with one checklist. No work starts before the deposit." },
            { title: "Build, with a live preview link", detail: "Share the `.pages.dev` address so the client sees progress on their own phone." },
            { title: "Two rounds of changes", detail: "Collect feedback as **one written list per round**, not 30 separate voice notes." },
            { title: "Balance before launch", detail: "The remaining payment is due before the site goes live on the client's own domain." },
            { title: "Launch and handover", detail: "Go live, hand over every account, walk the client through it, and leave a short handover note." },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "card", label: "deposit paid" }, { draw: "laptop", label: "build + preview link" }, { draw: "list", label: "2 rounds of changes" }, { draw: "check", label: "balance, then launch", hot: true }] },
          caption: "The order that gets you paid: deposit first, build in the open, two written rounds of changes, and the balance before the site goes live on the client's domain.",
        },
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Deposit → build → changes → balance → launch. Money comes at the start and before handover." } },
        { t: "tool", slug: "website-requirements-questionnaire", why: "Send this at kick-off to collect everything you need from the client in one go." },
      ],
    },
    {
      heading: "Step 1: Protect the scope",
      blocks: [
        {
          t: "define",
          term: "Scope creep",
          like: "a customer who buys one plate of rice, then asks for extra meat, extra plantain and a cold drink, at the same price.",
          meaning: "When a client keeps adding “small” requests beyond what was agreed, until the project eats all your profit.",
        },
        { t: "list", items: ["The proposal lists exactly what's included: pages, features, rounds of changes.", "New requests get a friendly reply: “Happy to add that! It's outside this project: it would be ₦X and take Y days. Shall I add it?”", "Keep decisions in writing: one email thread or one WhatsApp chat."] },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Yes to everything", nodes: [{ draw: "pot", label: "one plate, many extras" }, { draw: "cross", label: "no profit left" }] },
            right: { title: "Priced extras", nodes: [{ draw: "tag", label: "extra = new price + time", hot: true }, { draw: "handshake", label: "client agrees" }] },
          },
          caption: "Scope creep in one picture: saying yes to every extra on the same plate, versus a friendly price and timeline for each extra.",
        },
        { t: "check", q: "Halfway through, the client asks for an online shop that wasn't in the agreement. What do you say?", options: ["“Sure, free of charge!”", "“Happy to add it: it's outside this project, so it would be ₦X and take Y extra days. Shall I add it?”", "Ignore the message"], answer: 1, why: "Kind but firm: extras get a price and a timeline." },
      ],
    },
    {
      heading: "Step 2: Your get-paid system",
      blocks: [
        { t: "p", text: "Getting paid on time comes down to three things: a **clear payment request**, an **easy way to pay**, and **polite reminders**." },
        {
          t: "define",
          term: "Payment request",
          like: "the bill a tailor writes on her order book: what was ordered, how much, when it's due and where to pay.",
          meaning: "A clear document asking for payment: your details, the client's, a reference number, what it's for, the amount, the due date and how to pay. Many people call it an invoice.",
        },
        { t: "tool", slug: "invoice-generator", why: "The Get Paid Generator creates a clean naira (or dollar) payment request with your bank, Paystack or other payment details. Save it as a PDF or print it." },
        { t: "list", items: ["Every request shows: your details, the client's details, a **reference number**, what it's for, the amount, the **due date** and **how to pay**.", "Make paying easy: bank transfer, plus a Paystack payment link for card, transfer or USSD.", "Send it the same day each stage is reached."] },
        { t: "tip", text: "The Paystack payment page you made on Day 8 works for your own business too: create one called “Website deposit” in your own Paystack account and put its link on every payment request. Paystack takes its fee only when someone pays." },
        { t: "try", title: "Make your first payment request", minutes: 10, steps: ["Open the Get Paid Generator.", "Fill it in for your practice project's 50% deposit, due 3 days from today.", "Save it as a PDF. Read it as the client: would you pay it? Is anything unclear?"] },
        { t: "win", title: "Your first payment request is ready", proved: "you can ask for money clearly and professionally, the habit that separates freelancers who get paid on time from those who chase for months.", cue: "Keep the template: every project from now on uses it. Finish your mission for the **Paid in full** badge." },
      ],
    },
    {
      heading: "Step 3: Polite reminders",
      blocks: [
        { t: "table", columns: ["When", "Tone of the message"], rows: [["3 days before it's due", "A friendly heads-up, with the payment link"], ["On the due date", "“Just a reminder that today is the due date.”"], ["3 days late", "A polite check: “Did you receive the payment request?”"], ["7 days late", "Firm and clear: work pauses until payment, as agreed"]] },
        { t: "p", text: "Keep a simple Google Sheet of unpaid requests (client, amount, due date, status) and check it every morning." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the reminder messages in the right tone for each stage." },
        {
          t: "scenario",
          title: "The client who “forgot”",
          text: "Picture Tolu, who launched a site and then waited six weeks for the balance, too shy to ask. On the next project she agreed the timeline in writing, sent a friendly reminder 3 days before the due date, and didn't launch on the client's domain until the balance cleared. Same kind of client: paid on time. The difference was a written plan and one reminder.",
        },
      ],
    },
    {
      heading: "Step 4: Hand over properly",
      blocks: [
        { t: "list", items: ["**Everything works**: a test form message arrives, every WhatsApp button opens the right chat, payments work in **live** mode (one small real payment, refunded), privacy tests pass, mobile speed is 80+.", "**The client owns every account**: domain, Paystack, Google listing, and the GitHub and Cloudflare accounts that hold the site. For a paying client, create these in the client's name from the start and get invited as a helper (or transfer them at handover).", "**A recorded walkthrough**: a 20-minute WhatsApp video or Google Meet call showing how to see visitors, check payments and request changes.", "**A one-page handover note**: what's where, the domain's renewal date, monthly costs (hosting is free; the domain renews yearly), and how to reach you."] },
        { t: "figure", figure: { diagram: "handover", caption: "The client owns the accounts; you're added as a helper." } },
        { t: "warn", text: "Never keep a client's accounts in your name “to make it easier”. If you disappeared tomorrow, the business must still be able to run its website." },
      ],
    },
    {
      heading: "Step 5: Offer a care plan, ask for a testimonial",
      blocks: [
        { t: "p", text: "The best moment to offer a monthly **care plan** is **at launch**, when the client is happiest. Show what you'll check and improve each month: visitors, speed, prices and photos kept up to date, a short monthly report." },
        { t: "tool", slug: "testimonial-formatter", why: "When they're happy, ask for a testimonial and format it for your portfolio and posts." },
        { t: "mistakes", items: [{ wrong: "Starting work before the deposit “to show goodwill”", right: "Kick-off happens after the deposit, every time" }, { wrong: "Launching on their domain before the balance is paid", right: "Balance first, then launch" }, { wrong: "Feedback scattered across 30 voice notes", right: "One written list per round of changes" }] },
        { t: "tip", text: "When your first real client payment lands, screenshot the alert. It's the moment this course was built for, and you'll want to remember it." },
      ],
    },
  ],
  task: {
    title: "Set up delivery and getting paid",
    steps: ["Create your kick-off checklist from the requirements questionnaire.", "Create a payment request template with the Get Paid Generator.", "Create a Paystack payment page for your own deposits (test mode is fine).", "Write your four reminder messages and set up a Google Sheet to track unpaid requests.", "Write your handover checklist, your reply for extra requests, and your care-plan offer."],
    done: ["No work starts before a deposit", "My payment request shows a reference, due date and how to pay", "I have a reminder ready for every stage", "My handover checklist puts every account in the client's name", "I have a ready reply for extra requests"],
  },
  recap: [
    "Work starts **after the deposit** is paid: it confirms the client is serious and protects your time.",
    "The **balance is due before launch** on the client's domain, just as Bisi releases an outfit only after the balance.",
    "**Scope creep** is extra requests beyond the agreement: answer kindly with a price and a timeline.",
    "Every **payment request** needs a **reference, what it's for, the amount, the due date and how to pay**.",
    "At handover the **client owns every account** (domain, Paystack, GitHub, Cloudflare), with you added as a helper.",
    "Offer a **care plan at launch**, when the client is happiest, and ask for a testimonial.",
  ],
  resources: [
    { label: "Paystack Support", url: "https://support.paystack.com", note: "Search “Payment Pages” for collecting payments with a link." },
    { label: "Atlassian: scope creep", url: "https://www.atlassian.com/agile/project-management/scope-creep", note: "What it is and how to prevent it." },
    { label: "Cloudflare: account members", url: "https://developers.cloudflare.com/fundamentals/manage-members/", note: "Adding people to a Cloudflare account." },
    { label: "GitHub: transferring a repository", url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository", note: "Handing a repository to the client." },
  ],
  quiz: [
    { q: "When should work start on a project?", options: ["Right after the first chat", "After the deposit is paid", "After launch", "Whenever you feel like it"], answer: 1, why: "The deposit confirms the client is serious and protects your time.", from: 0, aim: "core" },
    { q: "When is the balance usually due?", options: ["A year later", "Before the site goes live on the client's domain", "Never", "After the care plan ends"], answer: 1, why: "Collect before handing over the finished work. Your final client project follows exactly this order.", from: 1, aim: "capstone" },
    { q: "Halfway through, the client asks for a blog that wasn't agreed. What's this called, and what do you do?", options: ["A bug; fix it free", "Scope creep; reply kindly with a price and a timeline", "A milestone; celebrate", "Nothing; ignore it"], answer: 1, why: "Kind but firm. You'll meet scope creep on every real project.", from: 2, aim: "capstone" },
    { q: "What must every payment request include?", options: ["Only the amount", "A reference, what it's for, the amount, the due date and how to pay", "Your life story", "A discount"], answer: 1, why: "Clear requests get paid faster. You'll send one at every stage of every client project.", from: 3, aim: "client-work" },
    { q: "After handover, who owns the domain, Paystack, GitHub and Cloudflare accounts?", options: ["You, so they can't leave", "The client, with you added as a helper", "Nobody", "Cloudflare"], answer: 1, why: "It's the client's business. Ownership builds trust and protects everyone.", from: 4, aim: "client-work" },
  ],
  celebrate: {
    title: "Get-paid system ready",
    proved: "You can deliver a project from deposit to handover and collect every naira on time, without awkward chasing.",
    badge: "Paid in full",
    badgeDesc: "Set up a complete get-paid system",
  },
};

export default lesson;
