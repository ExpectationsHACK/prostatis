import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "booking-systems",
  title: "Bookings & deposits",
  minutes: 110,
  outcome: "A working booking page on Bisi's site: customers pick a fitting time that's really free, pay a ₦5,000 deposit with Paystack (in practice mode, with pretend money), get a confirmation, and a reminder the day before.",
  intro:
    "Every day Bisi answers “Are you free on Saturday?” on WhatsApp, again and again. Worse, about two customers a week book a fitting and never come, and she loses that hour each time. A booking page fixes both: customers see the times she's really free and choose one themselves, day or night. A small **deposit** paid upfront makes people far more likely to turn up, and it's taken off the final price. It's one of the easiest upgrades you can sell on top of any website, and every tool today is free to start.",
  core: "Let customers book only real free times, and ask for a small deposit: paying something upfront is what makes people turn up.",
  youNeed: ["Your live, GitHub-connected site from Day 7", "The owner's services, how long each takes, prices and opening hours", "An email address for a free Cal.com account", "An email address for a free Paystack account (no business documents needed to practise)"],
  sections: [
    {
      heading: "What a booking flow looks like",
      blocks: [
        {
          t: "define",
          term: "Booking system",
          like: "the appointment book at a hospital reception, except the patients fill it in themselves, any time, and two people can never be written into the same slot.",
          meaning: "Software that shows a business's free times, lets customers choose one, and records it so the same time can't be taken twice.",
        },
        {
          t: "define",
          term: "No-show",
          like: "a guest who says yes to your party, lets you cook for them, and never arrives or calls.",
          meaning: "A customer who books but doesn't turn up and doesn't cancel. The business loses that time completely.",
        },
        { t: "p", text: "Bisi already understands deposits: she never cuts fabric before the customer pays something. A booking deposit works the same way. When a customer has paid even ₦5,000, they're far more likely to come, and if they don't, Bisi hasn't lost everything." },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "calendar", label: "pick a free time" }, { draw: "card", label: "pay ₦5,000 deposit", hot: true }, { draw: "bell", label: "reminder the day before" }, { draw: "tape", label: "Bisi measures" }] },
          caption: "A fitting booked properly: the customer picks a time that's really free, pays a small deposit, gets a reminder the day before, and turns up to be measured.",
        },
        { t: "figure", figure: { diagram: "booking-flow", caption: "Pick a service → pick a time → pay a deposit → get a reminder." } },
      ],
    },
    {
      heading: "Step 1: Choose the simplest tool that works",
      blocks: [
        { t: "table", columns: ["Option", "Best for", "Cost", "Effort"], rows: [["A WhatsApp “Book a fitting” button", "Tiny businesses already booking by chat", "Free", "10 minutes"], ["**Cal.com** booking page + Paystack deposit", "Most tailors, salons, coaches, clinics, photographers", "Free plan for one person", "About an hour: **today's build**"], ["Google Calendar booking page", "One person, one kind of appointment", "Free with a Gmail account", "30 minutes"], ["A fully custom booking system", "Busy businesses with several staff and complex rules", "Free tools, but days of work", "A stretch goal, later"]] },
        { t: "tool", slug: "booking-feature-picker", why: "Pick the type of business and see which booking features matter and which to skip." },
        { t: "tip", text: "Start with the simplest option that solves the problem. You can upgrade the client later, and that upgrade is another paid job for you." },
        { t: "check", q: "A life coach takes 1-hour calls, about 10 a week, alone. What should you build?", options: ["A custom-built system from scratch", "A free booking page like Cal.com, added to the website", "A printed calendar on the wall"], answer: 1, why: "Simple need, simple tool: a free booking page takes an hour and just works." },
      ],
    },
    {
      heading: "Step 2: Set up the booking calendar",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Create a free Cal.com account", detail: "Go to `cal.com` and click **Get started** (or **Sign up**). Sign up with the owner's Google account or email. Choose a username like `stitchesbybisi`: their booking link becomes cal.com/stitchesbybisi." },
            { title: "Set the working hours", detail: "When asked about availability, set the real days and hours (Bisi: Monday to Saturday, 9am to 6pm). Set the time zone to **Africa/Lagos**." },
            { title: "Connect the owner's calendar (recommended)", detail: "If the owner uses Google Calendar on their phone, connect it. Cal.com then hides any time they're already busy." },
            { title: "Add each service as an event type", detail: "Go to **Event Types** → **New**. Title: “Fitting and measurements”. Duration: 45 minutes. Add a short description and the shop address. Make another for “Collection and final fitting” (20 minutes)." },
            { title: "Add a break after each booking", detail: "In the event type's **Limits** (or advanced settings), add a **buffer** of 15 minutes after each appointment so the owner can breathe between customers." },
          ],
        },
        { t: "try", title: "Book yourself", minutes: 5, steps: ["Open your booking link (cal.com/your-username) on your phone.", "Book a slot for tomorrow using your own email.", "Open the confirmation email, then cancel the booking using the link inside it. The slot should become free again."] },
      ],
    },
    {
      heading: "Step 3: Put the calendar on the website",
      blocks: [
        {
          t: "define",
          term: "Embed",
          like: "the bank's POS machine on a shop counter: it's the bank's machine, but it works right inside your shop and the customer never leaves.",
          meaning: "Placing another service's tool **inside** your own web page, using a short piece of code they give you. Customers book without leaving Bisi's site.",
        },
        {
          t: "steps",
          items: [
            { title: "Copy the embed code", detail: "In Cal.com, open the event type → the **⋯** or **Share** menu → **Embed**. Choose **Inline embed** (the calendar sits inside the page) and copy the code." },
            { title: "Ask your builder for a booking page", detail: "Use the prompt below, then review the new `site/book.html` and the updated menu." },
            { title: "Upload and check", detail: "Upload `book.html` (and any changed files) to GitHub, commit, wait a minute, then open `/book` on your phone." },
          ],
        },
        { t: "prompt", title: "The booking page", text: "Read the project brief first and follow it.\n\nCreate site/book.html for this site, using styles.css and site.js like the other pages. Heading: 'Book your fitting'. Above the calendar, explain in 3 short lines: choose a time, pay the ₦5,000 deposit to confirm, it's taken off your final price. Then paste this Cal.com inline embed code exactly as given: [PASTE EMBED CODE]. Under it, add a gold 'Pay ₦5,000 deposit' button that links to [PAYSTACK LINK, I'll add it later] and a line: 'Your slot is confirmed once the deposit is paid.' Also add a 'Book a fitting' link to the menu in site.js." },
        {
          t: "errors",
          items: [
            { see: "The booking page shows a blank space where the calendar should be", means: "The embed code was cut short when copying, or it was changed.", fix: "Copy the whole embed code again from Cal.com and ask the AI to paste it in exactly." },
          ],
        },
      ],
    },
    {
      heading: "Step 4: Take the deposit with Paystack",
      blocks: [
        {
          t: "define",
          term: "Payment page",
          like: "handing a customer the bank's own POS instead of building your own card machine: the bank handles the card, and you get the money.",
          meaning: "A ready-made payment link hosted by **Paystack**, Nigeria's best-known payment company. Customers pay by card, bank transfer or USSD. There's no payment code on your website at all.",
        },
        { t: "p", text: "Cal.com's own payment add-ons don't support Paystack, so here's a simple, reliable way: after booking, send the customer to a Paystack payment page for the deposit." },
        {
          t: "define",
          term: "Test mode",
          also: ["Test card"],
          like: "a fire drill: everyone practises the real steps, but there's no real fire.",
          meaning: "Paystack's practice mode, with pretend money. You can make test payments with Paystack's published **test card** to check everything works, and no real money moves. New accounts start in test mode.",
        },
        {
          t: "steps",
          items: [
            { title: "Create a free Paystack account", detail: "Go to `paystack.com` → **Create a free account**. Enter the business email, business name (Stitches by Bisi), country (Nigeria) and a password, then confirm the email they send you. You land in the dashboard in **Test Mode** (a banner says so)." },
            { title: "Create the payment page", detail: "In the dashboard menu, open **Payment Pages** (it may sit under **Commerce** or **Payments**) → **Create a payment page** → choose **One-time payment**." },
            { title: "Fill it in", detail: "Name: “Fitting deposit”. Amount: **5000** (naira). Description: “Confirms your fitting. Taken off your final price.” Turn on fields for the customer's **name** and **phone**. Save." },
            { title: "Copy the link", detail: "Paystack shows the page's link (paystack.com/pay/…). Put it in the gold button on `book.html` (ask the AI or replace it yourself), upload to GitHub, commit." },
            { title: "Send people there automatically", detail: "In Cal.com, open each event type → **Advanced** → look for **Redirect on booking** (or “after booking, redirect to a URL”) and paste the payment page link. Customers land on the payment page straight after booking." },
            { title: "Write the rule on the page", detail: "“Your slot is confirmed once the ₦5,000 deposit is paid. It's taken off your final price.” Agree with the owner what happens with late cancellations, and write that too." },
          ],
        },
        { t: "figure", figure: { diagram: "payment-flow", caption: "The customer pays Paystack; the business sees it in its Paystack dashboard." } },
        { t: "p", text: "Test it with Paystack's test card. At the time of writing it's **4084 0840 8408 4081**, CVV **408**, any future expiry date (check Paystack's “Test payments” page for the current one). In test mode, **never** use your real card." },
        {
          t: "errors",
          items: [
            { see: "“Invalid card” when paying in test mode", means: "You typed a real card number, or a test card that has changed.", fix: "Copy the current test card from Paystack's “Test payments” page." },
            { see: "A real customer can't pay: “This business is in test mode”", means: "The account hasn't been activated for real payments yet.", fix: "The owner completes **Activate business** in Paystack (see the warning below). Until then, only test payments work." },
          ],
        },
        { t: "warn", text: "For a client, the Paystack account must belong to the **client's business**, so the money goes to **their** bank account. An unregistered business can go live as a Paystack **Starter Business** with the owner's BVN, a valid ID and their bank account (Paystack sets a limit until the business registers). Paystack's fees come out of each payment; there's no monthly charge. Never collect a client's money into your own account." },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Your account", nodes: [{ draw: "wallet", label: "client's money with you" }, { draw: "cross", label: "trouble, mistrust" }] },
            right: { title: "Client's account", nodes: [{ draw: "bank", label: "straight to Bisi's bank", hot: true }, { draw: "check", label: "clean and trusted" }] },
          },
          caption: "Where a client's deposits go: never through your wallet, always straight into the business's own Paystack account and bank.",
        },
        { t: "win", title: "Your first test deposit arrived", proved: "you can connect a booking calendar to a real payment system so a business gets paid before the customer even walks in.", cue: "Screenshot the test payment in Paystack's dashboard. Finish the mission for the **Booked & paid** badge." },
      ],
    },
    {
      heading: "Step 5: Reminders",
      blocks: [
        { t: "p", text: "A reminder the day before cuts no-shows even more. Cal.com emails a booking confirmation automatically, and its settings can also send reminder emails before the appointment (check which reminder options the free plan includes when you set it up). A WhatsApp reminder works best of all in Nigeria, and it's free:" },
        {
          t: "steps",
          items: [
            { title: "Save a reminder as a quick reply", detail: "In the owner's **WhatsApp Business** app: **Settings** → **Business tools** → **Quick replies** → **+**. Message: “Hi! A reminder of your fitting with Stitches by Bisi tomorrow at [time]. Reply 1 to confirm or 2 to move it.” Shortcut: `/remind`." },
            { title: "Each evening, two minutes", detail: "The owner opens tomorrow's bookings in Cal.com, opens each customer's chat, types `/remind`, fills in the time, sends." },
          ],
        },
        { t: "tool", slug: "whatsapp-business-bio", why: "Writes quick replies for WhatsApp Business, including a friendly appointment reminder." },
        { t: "later", lesson: "automations-make-zapier-n8n", text: "a saved quick reply takes the owner about two minutes each evening. Main Track students later make reminders send themselves." },
        {
          t: "scenario",
          title: "Bisi's new Saturday",
          text: "Bisi's booking page shows only her real free times. A customer books “Fitting and measurements, Saturday 11:00”, lands on the Paystack page and pays ₦5,000. Bisi sees the payment in her Paystack app. On Friday evening she sends `/remind` to tomorrow's three customers. If someone books but never pays, she knows the slot isn't confirmed and can release it. Her chat is quieter, and her Saturdays are full of people who actually come.",
        },
      ],
    },
    {
      heading: "Stretch goal: a fully custom system",
      blocks: [
        { t: "p", text: "Busy businesses with several staff sometimes need rules a booking page can't handle, like “two tailors, each with different hours”. You'll be able to build that yourself after the lesson on sign-ins and private customer records." },
        { t: "later", lesson: "web-apps-auth-db", text: "stick with Cal.com plus a Paystack payment page. It already solves the problem for most small businesses." },
        { t: "mistakes", items: [{ wrong: "Building a complex custom system for a one-person business", right: "A free booking page plus a deposit link; upgrade only when needed" }, { wrong: "Testing with your real card", right: "Test mode with Paystack's published test card" }, { wrong: "Taking the deposit into your own account “to send later”", right: "The business's own Paystack account, from day one" }] },
      ],
    },
  ],
  task: {
    title: "Add booking and deposits to a real site",
    steps: ["Choose the approach with the booking feature picker.", "Set up a free Cal.com account with real services, hours and buffers.", "Build `book.html` with the inline calendar and add it to the menu.", "Create a Paystack payment page for the deposit (test mode) and link it after booking.", "Book a test appointment and pay the deposit with Paystack's test card.", "Save a WhatsApp reminder quick reply."],
    done: ["A customer can book a fitting in under a minute on a phone", "Booked times disappear from the calendar", "A test deposit shows in the Paystack dashboard", "The page explains the deposit rule clearly", "The payments go to the business's own Paystack account"],
  },
  recap: [
    "A **deposit**, a small part of the price paid upfront, makes customers much more likely to come, which cuts **no-shows**.",
    "Start with the **simplest tool that solves the problem**: a free booking page like Cal.com, and custom systems only when truly needed.",
    "A Paystack **payment page** takes card, transfer or USSD payments from a link, with **no payment code** on your site.",
    "The client's payments go into **the client's own Paystack account**, never yours.",
    "Test like a customer: book, cancel, and **pay in test mode with Paystack's test card**, never a real card.",
  ],
  resources: [
    { label: "Cal.com", url: "https://cal.com", note: "Free booking pages and embeds for one person." },
    { label: "Paystack: Test payments", url: "https://paystack.com/docs/payments/test-payments/", note: "The current official test cards." },
    { label: "Paystack: Starter Businesses", url: "https://paystack.com/blog/product/paystack-starter-businesses", note: "Going live without company registration." },
    { label: "Paystack Support", url: "https://support.paystack.com", note: "Search “Payment Pages” for the step-by-step guide." },
    { label: "Google Calendar: booking pages", url: "https://support.google.com/calendar/answer/10729749", note: "The free alternative for one kind of appointment." },
  ],
  quiz: [
    { q: "Why ask for a deposit when someone books?", options: ["To make booking harder", "Customers who've paid something are much more likely to turn up, so no-shows drop", "Paystack requires it", "It looks professional"], answer: 1, why: "Deposits cut no-shows, which cost owners the most.", from: 0, aim: "core" },
    { q: "A barber who works alone wants online bookings. What do you set up first?", options: ["A custom-built system from scratch", "A free booking page like Cal.com on the website", "A new phone", "An online store"], answer: 1, why: "Start with the simplest tool that solves the problem. You'll use the same thinking every time you choose a tool for a client.", from: 1, aim: "client-work" },
    { q: "What is a Paystack payment page?", options: ["A page you must code yourself", "A hosted payment link that takes card, transfer or USSD with no payment code on your site", "A bank branch", "A receipt"], answer: 1, why: "Paystack hosts it. You'll use payment pages again to collect your own project payments on the get-paid day.", from: 2, aim: "deliver-get-paid" },
    { q: "Whose Paystack account should a client's deposits go into?", options: ["Yours, to transfer later", "The client's own business account", "Any account that works", "Cal.com's"], answer: 1, why: "The money belongs to the business from day one. Tomorrow's store follows the same rule.", from: 3, aim: "online-store-paystack" },
    { q: "How should you test the deposit payment?", options: ["With your real card", "In test mode with Paystack's published test card", "Don't test it", "Ask a real customer to try"], answer: 1, why: "Test mode moves pretend money. Tomorrow you'll use test mode again for the store.", from: 4, aim: "online-store-paystack" },
  ],
  celebrate: {
    title: "Day 8 complete: booked and paid",
    proved: "You can give a business a booking page that only offers real free times and takes a deposit through Paystack, so customers turn up and the owner gets paid first.",
    badge: "Booked & paid",
    badgeDesc: "Connected bookings to Paystack deposits",
  },
};

export default lesson;
