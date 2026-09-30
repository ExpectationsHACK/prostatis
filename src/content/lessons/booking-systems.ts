import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "booking-systems",
  title: "Booking systems & appointments",
  minutes: 100,
  outcome: "A working booking flow on a real site: customers pick a service and time, pay a deposit with Paystack (test mode), and get a confirmation.",
  intro:
    "Aisha braids hair in Surulere. Every day she answers “Are you free Saturday?” twenty times on WhatsApp, and every week two customers book and don't show up, costing her a whole afternoon each. A booking system fixes both: customers see free times and book themselves, and a small **deposit** makes them far more likely to show up. It's one of the easiest upgrades you can sell on top of a website.",
  youNeed: ["Your live site from Day 7", "A free Cal.com account", "A free Paystack account in test mode (no documents needed to start)", "The business's services, how long each takes, prices and opening hours"],
  sections: [
    {
      heading: "What a booking flow looks like",
      blocks: [
        { t: "figure", figure: { diagram: "booking-flow", caption: "Pick a service → pick a time → pay a deposit → get a reminder." } },
        { t: "define", term: "Booking system", meaning: "Software that shows a business's free time slots, lets customers choose one, and records the booking so two people can't take the same slot.", like: "the appointment book at a hospital reception, but customers fill it themselves, 24 hours a day." },
        { t: "define", term: "Deposit", meaning: "A small part of the price paid in advance to hold the booking, for example ₦5,000 on a ₦30,000 hairstyle. It's taken off the final bill.", like: "the down-payment you give a tailor before they cut the fabric." },
        { t: "define", term: "No-show", meaning: "A customer who books but doesn't turn up and doesn't cancel. The business loses that time completely.", like: "reserving a table at a restaurant and never arriving." },
        { t: "p", text: "The deposit is the part owners love most. When customers have paid even a little upfront, far fewer skip the appointment, so the owner stops losing afternoons." },
      ],
    },
    {
      heading: "Step 1: Choose the right approach",
      blocks: [
        { t: "table", columns: ["Option", "Best for", "Effort"], rows: [["WhatsApp booking button", "Very small businesses already booking by chat", "10 minutes"], ["Scheduling tool (Cal.com) + Paystack deposit link", "Most salons, coaches, consultants, photographers", "About an hour: **today's main build**"], ["Fully custom booking with a database", "Busy businesses with many staff, complex rules", "A day or more: a stretch goal after the web-apps lesson"]] },
        { t: "tool", slug: "booking-feature-picker", why: "Pick the business type and see which booking features matter and which to skip." },
        { t: "tip", text: "Start with the simplest option that solves the problem. You can upgrade the client later, and that upgrade is another paid job." },
        { t: "check", q: "A life coach takes 1-hour calls, 10 a week. What should you build?", options: ["A custom database booking system", "A scheduling tool like Cal.com embedded on the site", "A printed calendar"], answer: 1, why: "Simple needs, simple tool: an embedded scheduler takes an hour and just works." },
      ],
    },
    {
      heading: "Step 2: Set up the scheduler",
      blocks: [
        { t: "define", term: "Embed", meaning: "Placing another service's tool inside your own web page, using a short piece of code they give you. The customer never leaves your site.", like: "a POS machine on the shop counter: the bank's machine, working inside your shop." },
        {
          t: "steps",
          items: [
            { title: "Create a free Cal.com account", detail: "Set the business's working hours and time zone (Africa/Lagos)." },
            { title: "Add each service as an “event type”", detail: "Name, duration and description: e.g. “Knotless braids: 4 hours”. Add a buffer after each if the stylist needs a break." },
            { title: "Copy the embed code", detail: "Cal.com offers an inline calendar or a pop-up button." },
            { title: "Ask Claude to add it", detail: "“Add this Cal.com inline embed to a new /book page and point every ‘Book now’ button to it.”" },
          ],
        },
        { t: "try", title: "Book yourself", minutes: 5, steps: ["Open your /book page on your phone.", "Book a slot for tomorrow with your own email.", "Check the confirmation email, then cancel it from the link in the email."] },
      ],
    },
    {
      heading: "Step 3: Take the deposit with Paystack",
      blocks: [
        { t: "p", text: "Cal.com's built-in payments don't support Paystack, so here's a simple, reliable way: after booking, send the customer straight to a **Paystack Payment Page** for the deposit." },
        { t: "define", term: "Paystack Payment Page", meaning: "A ready-made payment link hosted by Paystack. Customers pay by card, bank transfer or USSD, no payment code on your website at all.", like: "handing the customer the bank's own POS instead of building your own card machine." },
        {
          t: "steps",
          items: [
            { title: "Create a Paystack account", detail: "Test mode works immediately. Live mode later needs the owner's details (see the warning below)." },
            { title: "Create a Payment Page", detail: "Payments → Payment Pages → New. Fixed amount: e.g. ₦5,000, named “Booking deposit”. Ask for the customer's name and phone." },
            { title: "Send customers there after booking", detail: "In each Cal.com event type, look for the option to **redirect to a URL after booking**, and paste the Payment Page link. Also add a “Pay deposit” button on the /book page." },
            { title: "Write the rule on the page", detail: "“Your slot is confirmed when the ₦5,000 deposit is paid. It's deducted from your final bill.”" },
          ],
        },
        { t: "figure", figure: { diagram: "payment-flow", caption: "The customer pays Paystack; the business sees it in its Paystack dashboard." } },
        { t: "p", text: "Test it with the **test card** Paystack lists in its docs (at the time of writing: 4084 0840 8408 4081, CVV 408, any future expiry date). Test mode uses pretend money, never use your real card in test mode." },
        { t: "warn", text: "For a client, the Paystack account must belong to the **client's business**, so the money goes to **their** bank account. An unregistered business can go live as a Paystack **Starter Business** with the owner's BVN, a valid ID and their bank account (Paystack sets a transaction limit until the business registers). Never collect a client's payments into your own account." },
        { t: "scenario", title: "Aisha's new Saturday", text: "Aisha's /book page shows only her free slots. A customer books “Knotless braids, Sat 11:00”, lands on the Paystack page, pays ₦5,000, and Aisha sees the payment in her Paystack app. If someone books but never pays, Aisha knows the slot isn't confirmed and can release it. Her chat is quieter, and deposits discourage no-shows." },
      ],
    },
    {
      heading: "Step 4: Reminders",
      blocks: [
        { t: "p", text: "A reminder the day before cuts no-shows even more. Cal.com emails a confirmation automatically. For reminders, check whether your Cal.com plan includes its **Workflows** feature; if not, keep it simple, each evening, message tomorrow's customers from the owner's WhatsApp Business app using a saved **quick reply**." },
        { t: "tool", slug: "whatsapp-business-bio", why: "Writes quick replies, including a friendly appointment reminder, for the WhatsApp Business app." },
        { t: "tip", text: "Main Track students automate reminders later with Make, Zapier or n8n. For now, a saved quick reply takes the owner 2 minutes a day." },
      ],
    },
    {
      heading: "Stretch goal: a fully custom booking system",
      blocks: [
        { t: "p", text: "Busy businesses with several stylists sometimes need rules a scheduler can't handle. Once you've done the **web apps with logins & databases** lesson, you can build one yourself. Save this prompt for then:" },
        { t: "prompt", title: "Custom booking (after the web-apps lesson)", text: "Build a booking system for this salon. Services: [list with duration and price]. Staff: [names]. Opening hours: [hours]. Customers pick a service and stylist, see only free time slots for the next 14 days, enter name and phone, and pay a ₦[amount] deposit with Paystack (test mode). Store bookings in Supabase with status 'pending' until payment is verified on the server, then 'confirmed'. Two people must never be able to book the same slot. Add a password-protected /admin page listing today's bookings. Explain each step." },
        { t: "mistakes", items: [{ wrong: "Building a complex custom system for a one-person business", right: "Scheduler + deposit link: upgrade later if needed" }, { wrong: "Testing with your real card", right: "Paystack test mode with Paystack's published test card" }, { wrong: "Putting the deposit into your own account “to transfer later”", right: "The business's own Paystack account, from day one" }] },
      ],
    },
  ],
  task: {
    title: "Add booking to a real site",
    steps: ["Choose the approach with the booking feature picker.", "Set up Cal.com with the real services and hours, and embed it on /book.", "Create a Paystack Payment Page for the deposit (test mode) and link it after booking.", "Book a test appointment and pay the deposit with Paystack's test card.", "Set up a reminder method (Cal.com Workflows or a WhatsApp quick reply)."],
    done: ["A customer can book a service in under a minute on a phone", "Taken slots don't appear as free", "A test deposit shows in the Paystack test dashboard", "The page clearly explains the deposit rule"],
  },
  recap: [
    "A **deposit**, a small part of the price paid upfront, makes customers much more likely to show up, which cuts **no-shows**.",
    "Start with the **simplest tool that solves the problem**: a scheduler like Cal.com for simple appointments, custom systems only when needed.",
    "A **Paystack Payment Page** takes card, transfer or USSD payments from a link, with **no payment code** on your site.",
    "The client's payments must go into **the client's own Paystack account**, never yours.",
    "Test like a customer trying to break it: book, cancel, and **pay in test mode with Paystack's test card**, never a real card.",
  ],
  resources: [
    { label: "Cal.com", url: "https://cal.com", note: "Scheduling with a free plan and embeds." },
    { label: "Paystack: Test payments", url: "https://paystack.com/docs/payments/test-payments/", note: "Official test cards and bank details." },
    { label: "Paystack: Starter Businesses", url: "https://paystack.com/blog/product/paystack-starter-businesses", note: "Going live without company registration." },
    { label: "Paystack Support", url: "https://support.paystack.com", note: "Search “Payment Pages” for the step-by-step guide." },
    { label: "Google: Reserve with Google", url: "https://support.google.com/business/answer/7475773", note: "How bookings can appear on Google Business Profiles." },
  ],
  quiz: [
    { q: "Why add a deposit to bookings?", options: ["To make booking harder", "Customers who've paid something are much more likely to show up", "Paystack requires it", "It's decoration"], answer: 1, why: "A deposit cuts no-shows: the thing owners lose most money on.", from: 0 },
    { q: "A coach needs simple 1-hour calls booked. What's the best first option?", options: ["A custom database system", "An embedded scheduler like Cal.com", "A printed calendar", "An online store"], answer: 1, why: "Start simple: an embedded scheduler solves it in about an hour.", from: 1 },
    { q: "What is a Paystack Payment Page?", options: ["A page you must code yourself", "A hosted payment link that takes card, transfer or USSD with no payment code on your site", "A bank branch", "A receipt template"], answer: 1, why: "Paystack hosts the page and handles the payment.", from: 2 },
    { q: "Whose Paystack account should a client's deposits go into?", options: ["Yours, to transfer later", "The client's own business account", "Any account", "Cal.com's"], answer: 1, why: "The money belongs to the business, from day one.", from: 3 },
    { q: "How should you test the deposit payment?", options: ["With your real card in live mode", "In test mode with Paystack's published test card", "Don't test it", "Ask a customer to try"], answer: 1, why: "Test mode uses pretend money, so nothing real is charged.", from: 4 },
  ],
};

export default lesson;
