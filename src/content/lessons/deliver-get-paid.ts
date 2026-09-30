import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deliver-get-paid",
  title: "Deliver & get paid",
  minutes: 90,
  outcome: "A delivery process from deposit to launch, a way of getting paid on time without awkward chasing, and a ready monthly care-plan offer.",
  intro:
    "Winning the client is half the job. The other half is delivering smoothly and **actually collecting the money**, on time, without awkward chasing. Many beginners do great work and then wait months to be paid. Today you'll set up the simple process professionals use, so every project ends with a happy client, full payment and often a monthly care plan.",
  youNeed: ["A real or practice client project", "Our Get Paid Generator and requirements questionnaire", "A Paystack account (test mode is fine to practise)", "A spreadsheet to track payment requests"],
  sections: [
    {
      heading: "The delivery timeline",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Deposit → build → revise → launch → balance. Money is collected at the start and before handover." } },
        {
          t: "steps",
          items: [
            { title: "Kick-off: after the deposit", detail: "Collect content, logins and photos with one checklist. No work starts before the deposit." },
            { title: "Build, with a preview link", detail: "Share a Vercel preview link so the client sees progress." },
            { title: "Two rounds of changes", detail: "Collect feedback as **one list per round**, not 30 separate WhatsApp messages." },
            { title: "Balance before launch", detail: "The remaining payment is due before the site goes live on their domain." },
            { title: "Launch and handover", detail: "Go live, transfer ownership, a walkthrough and a short handover note (Main Track: the full runbook from the monitoring lesson)." },
          ],
        },
        { t: "define", term: "Milestone", meaning: "A clear checkpoint in a project, like “deposit paid” or “site live”, often tied to a payment.", like: "stages in building a house: foundation, roof, finishing, each paid when done." },
        { t: "tool", slug: "website-requirements-questionnaire", why: "Send this at kick-off to collect everything you need in one go." },
      ],
    },
    {
      heading: "Step 1: Protect the scope",
      blocks: [
        { t: "define", term: "Scope creep", meaning: "When a client keeps adding “small” extra requests beyond what was agreed, until the project eats all your profit.", like: "a customer who buys one plate of rice, then asks for extra meat, extra plantain, a drink… at the same price." },
        { t: "list", items: ["The proposal lists exactly what's included: pages, features, rounds of changes.", "New requests get a friendly reply: “Happy to add that! It's outside this project: it would be ₦X and take Y days. Shall I add it?”", "Keep decisions in writing: one email thread or one WhatsApp chat."] },
        { t: "check", q: "Halfway through, the client asks for an online store that wasn't in the agreement. What do you say?", options: ["“Sure, free of charge!”", "“Happy to add it: it's outside this project, so it would be ₦X and take Y extra days. Shall I add it?”", "Ignore the message"], answer: 1, why: "Kind but firm: extras get a price and a timeline." },
      ],
    },
    {
      heading: "Step 2: Your get-paid system",
      blocks: [
        { t: "p", text: "Getting paid on time comes down to three things: a **clear payment request**, an **easy way to pay**, and **polite reminders**." },
        { t: "tool", slug: "invoice-generator", why: "The Get Paid Generator creates a clean NGN or USD payment request with your bank, Paystack or Payoneer details, print it or save it as a PDF." },
        { t: "list", items: ["Every request shows: your details, the client's details, a **reference number**, what it's for, the amount, the **due date** and **how to pay**.", "Make paying easy: bank transfer, a Paystack payment link, or USD options for clients abroad.", "Send it the same day each milestone is reached."] },
        { t: "tip", text: "A Paystack **Payment Page** lets clients pay by card, transfer or USSD from a single link, no website needed. Create one in the Paystack dashboard." },
        { t: "try", title: "Make your first payment request", minutes: 10, steps: ["Open the Get Paid Generator.", "Fill it in for your practice project's 50% deposit, with a due date 3 days from today.", "Save it as a PDF. Would you pay it, if you were the client? Is anything unclear?"] },
      ],
    },
    {
      heading: "Step 3: Polite reminders",
      blocks: [
        { t: "table", columns: ["When", "Tone of the message"], rows: [["3 days before it's due", "Friendly heads-up, with the payment link"], ["On the due date", "“Just a reminder that today is the due date”"], ["3 days late", "A polite check: “Did you receive the payment request?”"], ["7 days late", "Firm and clear: work pauses until payment, as agreed"]] },
        { t: "p", text: "Start by sending these by hand from a simple sheet of unpaid requests, check it every morning. Main Track students turn this into a scheduled automation." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the payment reminder messages in the right tone." },
        { t: "scenario", title: "The client who “forgot”", text: "Tolu launched a site but waited 6 weeks for the balance, feeling too awkward to ask. On the next project she agreed the timeline in writing, sent a reminder 3 days before the due date, and didn't launch until the balance cleared. Same kind of client: paid on time." },
      ],
    },
    {
      heading: "Step 4: Turn delivery into a care plan",
      blocks: [
        { t: "p", text: "The best moment to offer a monthly care plan is **at launch**, when the client is happiest. Show what you'll monitor and improve each month." },
        { t: "tool", slug: "testimonial-formatter", why: "When they're happy, ask for a testimonial and format it for your site." },
        { t: "mistakes", items: [{ wrong: "Starting work before the deposit “to show goodwill”", right: "Kick-off happens after the deposit, every time" }, { wrong: "Launching on their domain before the balance is paid", right: "Balance first, then launch" }, { wrong: "Feedback scattered across 30 voice notes", right: "One written list per round of changes" }] },
      ],
    },
  ],
  task: {
    title: "Set up delivery and getting paid",
    steps: ["Create your kick-off checklist from the requirements questionnaire.", "Create a payment request template with the Get Paid Generator.", "Create a Paystack Payment Page (test mode is fine).", "Write your four reminder messages and set up a sheet to track unpaid requests.", "Write your reply for extra requests and your care-plan offer."],
    done: ["No work starts before a deposit", "My payment request includes a reference, due date and how to pay", "I have a reminder ready for every stage", "I have a ready reply for extra requests"],
  },
  recap: [
    "Work starts **after the deposit** is paid: it confirms commitment and protects your time.",
    "The **balance is due before the site goes live** on the client's domain.",
    "**Scope creep** is extra requests beyond the agreement, answer kindly with a price and a timeline.",
    "Every payment request needs a **reference, what it's for, the amount, the due date and how to pay**.",
    "Offer a monthly care plan **at launch**, when the client is happiest.",
  ],
  resources: [
    { label: "Paystack Support", url: "https://support.paystack.com", note: "Search “Payment Pages” for collecting payments with a link." },
    { label: "Payoneer", url: "https://www.payoneer.com", note: "Getting paid by clients abroad." },
    { label: "Atlassian: Scope creep", url: "https://www.atlassian.com/agile/project-management/scope-creep", note: "What it is and how to prevent it." },
    { label: "Vercel: Preview deployments", url: "https://vercel.com/docs/deployments/preview-deployments", note: "Share progress links with clients." },
  ],
  quiz: [
    { q: "When should work start on a project?", options: ["Right after the first chat", "After the deposit is paid", "After launch", "Whenever"], answer: 1, why: "The deposit confirms commitment and protects your time.", from: 0 },
    { q: "When is the balance usually due?", options: ["A year later", "Before the site goes live on the client's domain", "Never", "After the care plan"], answer: 1, why: "Collect before handing over the finished work.", from: 1 },
    { q: "What is scope creep?", options: ["A slow website", "Clients adding extra requests beyond what was agreed", "A type of bug", "A payment method"], answer: 1, why: "Handle it kindly with a price and timeline for extras.", from: 2 },
    { q: "What must every payment request include?", options: ["Only the amount", "A reference, what it's for, the amount, due date and how to pay", "Your life story", "A discount"], answer: 1, why: "Clear requests get paid faster.", from: 3 },
    { q: "When is the best time to offer a monthly care plan?", options: ["Before the proposal", "At launch, when the client is happiest", "Never", "After they complain"], answer: 1, why: "Satisfaction makes the next yes easy.", from: 4 },
  ],
};

export default lesson;
