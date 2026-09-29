import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deliver-get-paid",
  title: "Deliver & get paid",
  minutes: 90,
  outcome: "A delivery process from deposit to launch, a get-paid system that collects on time, and a retainer offer.",
  intro:
    "Winning the client is half the job. The other half is delivering smoothly and actually collecting the money — on time, without awkward chasing. Today you set up the process professionals use, so every project ends with a happy client, a full payment and, often, a monthly retainer.",
  sections: [
    {
      heading: "The delivery timeline",
      blocks: [
        { t: "figure", figure: { diagram: "delivery-timeline", caption: "Deposit → build → revise → launch → balance. Money is collected at the start and before handover." } },
        { t: "steps", items: [
          { title: "Kick-off (after the deposit)", detail: "Collect content, logins and photos with a checklist. No work starts before the deposit." },
          { title: "Build with a preview link", detail: "Share a Vercel preview link so the client sees progress." },
          { title: "Two rounds of revisions", detail: "Collect feedback in one list per round — not 30 separate WhatsApp messages." },
          { title: "Balance before launch", detail: "The remaining payment is due before the site goes live on the domain." },
          { title: "Launch and handover", detail: "Go live, transfer ownership, walkthrough and a short handover note (Main Track: the full runbook from the monitoring lesson)." },
        ] },
        { t: "tool", slug: "website-requirements-questionnaire", why: "Send this at kick-off to collect everything you need in one go." },
      ],
    },
    {
      heading: "Step 1 — Protect scope",
      blocks: [
        { t: "p", text: "**Scope creep** is when a client keeps adding “small” requests. It destroys profit. The fix is being clear from the start and kind but firm during the project." },
        { t: "list", items: ["The proposal lists exactly what's included (pages, features, revisions).", "New requests get a friendly reply: “Happy to add that! It's outside this project — it would be ₦X and take Y days. Shall I add it?”", "Keep all decisions in writing (email or one WhatsApp thread)."] },
      ],
    },
    {
      heading: "Step 2 — Your get-paid system",
      blocks: [
        { t: "p", text: "Getting paid on time comes down to clear payment requests, easy ways to pay, and polite, automatic reminders." },
        { t: "tool", slug: "invoice-generator", why: "The Get Paid Generator creates a clean NGN or USD payment request with your bank, Paystack or Payoneer details — print or save as PDF." },
        { t: "list", items: ["Every request has: your details, the client's details, a reference number, what it's for, the amount, due date and how to pay.", "Offer easy payment: bank transfer, a Paystack payment link, or USD options for foreign clients.", "Send it the same day each milestone is reached."] },
        { t: "tip", text: "A Paystack **Payment Page** lets clients pay by card, transfer or USSD from a link — no website needed. Create one in the Paystack dashboard." },
      ],
    },
    {
      heading: "Step 3 — Polite reminders",
      blocks: [
        { t: "table", columns: ["When", "Message tone"], rows: [["3 days before due", "Friendly heads-up with the payment link"], ["Due date", "“Just a reminder that today is the due date”"], ["3 days late", "Polite check: “Did you receive the payment request?”"], ["7 days late", "Firm and clear: work pauses until payment, per the agreement"]] },
        { t: "p", text: "Start by sending them by hand from a simple sheet of unpaid requests — check it every morning. Main Track students turn this into a scheduled automation." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the payment reminder messages in the right tone." },
      ],
    },
    {
      heading: "Step 4 — Turn delivery into a retainer",
      blocks: [
        { t: "p", text: "The best moment to offer a monthly care plan is at launch, when the client is happiest. Show them what you'll monitor and improve each month." },
        { t: "tool", slug: "testimonial-formatter", why: "When they're happy, ask for a testimonial and format it for your site." },
      ],
    },
  ],
  task: {
    title: "Set up delivery and getting paid",
    steps: ["Create your kick-off checklist from the requirements questionnaire.", "Create a payment request template with the Get Paid Generator.", "Create a Paystack Payment Page (test mode is fine).", "Write your four reminder messages and set up a sheet to track unpaid requests.", "Write your scope-change reply and your retainer offer message."],
    done: ["No work starts before a deposit", "My payment request includes a reference, due date and how to pay", "I have a reminder ready for every stage", "I have a ready reply for extra requests"],
  },
  resources: [
    { label: "Paystack — Payment Pages", url: "https://support.paystack.com", note: "Search “Payment Pages” in the help centre for the step-by-step guide." },
    { label: "Payoneer — Request a payment", url: "https://www.payoneer.com/resources/", note: "Getting paid by international clients." },
    { label: "Atlassian — Scope creep", url: "https://www.atlassian.com/agile/project-management/scope-creep", note: "What it is and how to prevent it." },
    { label: "Vercel — Preview deployments", url: "https://vercel.com/docs/deployments/preview-deployments", note: "Share progress links with clients." },
  ],
  quiz: [
    { q: "When should work start on a project?", options: ["Immediately after the first chat", "After the deposit is paid", "After launch", "Whenever"], answer: 1, why: "The deposit confirms commitment and protects your time." },
    { q: "When is the balance usually due?", options: ["A year later", "Before the site goes live on the domain", "Never", "After the retainer"], answer: 1, why: "Collect before handing over the finished work." },
    { q: "What is scope creep?", options: ["A slow website", "Clients adding extra requests beyond what was agreed", "A type of bug", "A payment method"], answer: 1, why: "Handle it kindly with a price and timeline for extras." },
    { q: "What must every payment request include?", options: ["Only the amount", "Reference, what it's for, amount, due date and how to pay", "Your life story", "A discount"], answer: 1, why: "Clear requests get paid faster." },
    { q: "Best time to offer a monthly care plan?", options: ["Before the proposal", "At launch, when the client is happiest", "Never", "After they complain"], answer: 1, why: "Satisfaction makes the next yes easy." },
  ],
};

export default lesson;
