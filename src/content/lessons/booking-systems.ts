import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "booking-systems",
  title: "Booking systems & appointments",
  minutes: 100,
  outcome: "A working booking flow — service, time, deposit and reminder — for a salon, clinic or gym.",
  intro:
    "Salons, clinics, gyms, photographers and consultants lose money every week to no-shows and endless back-and-forth messages about times. A booking system fixes both, and it's one of the easiest upsells you can sell on top of a website. Today you'll build one.",
  sections: [
    {
      heading: "What a booking flow looks like",
      blocks: [
        { t: "figure", figure: { diagram: "booking-flow", caption: "Pick a service → pick a time → pay a deposit → get a reminder." } },
        { t: "p", text: "The deposit is the magic part. When customers pay even ₦2,000–₦5,000 upfront, no-shows drop dramatically — and the business owner will happily pay you for that alone." },
      ],
    },
    {
      heading: "Step 1 — Pick the right approach",
      blocks: [
        { t: "p", text: "You don't always need to build from scratch. Choose based on the business:" },
        { t: "table", columns: ["Option", "Best for", "Effort"], rows: [["Embed a booking tool (Cal.com, Calendly)", "Consultants, coaches, simple appointments", "30 minutes"], ["WhatsApp booking button", "Very small businesses already booking by chat", "10 minutes"], ["Custom booking with Supabase + Paystack", "Salons, clinics, gyms with several staff and deposits", "A day"]] },
        { t: "tool", slug: "booking-feature-picker", why: "Pick the business type and it recommends which booking features matter and the build prompt." },
        { t: "tip", text: "Start with the simplest option that solves the problem. You can always upgrade the client later — that's another paid job." },
      ],
    },
    {
      heading: "Step 2 — Quick win: embed a scheduler",
      blocks: [
        { t: "steps", items: [
          { title: "Create a free Cal.com account", detail: "Set the business's working hours and the services as event types (e.g. 'Braids — 4 hours')." },
          { title: "Copy the embed code", detail: "Cal.com gives you a snippet for an inline calendar or a pop-up button." },
          { title: "Ask Claude to add it", detail: "“Add this Cal.com inline embed to a new /book page and link every 'Book now' button to it.”" },
        ] },
      ],
    },
    {
      heading: "Step 3 — Custom booking with a deposit",
      blocks: [
        { t: "p", text: "For a salon with several stylists, build it into the site. You'll need a database to store bookings (Supabase — free tier) and Paystack for deposits. You'll learn both properly in the store and web-app lessons; today, let Claude do the heavy lifting and focus on testing." },
        { t: "prompt", title: "Booking system prompt", text: "Build a booking system for this salon. Services: [list with duration and price]. Opening hours: [hours]. Customers pick a service, see only free time slots for the next 14 days, enter name and phone, and pay a ₦[amount] deposit with Paystack (test mode). Store bookings in Supabase with status 'pending' until payment is verified on the server, then 'confirmed'. Two people must never be able to book the same slot. Add a simple /admin page (password-protected) where the owner sees today's bookings. Explain each step you take." },
        { t: "figure", figure: { product: "salon", caption: "A salon booking page: services with durations, open slots and a deposit." } },
        { t: "warn", text: "Test it like a customer trying to break it: book the same slot twice, close the payment window halfway, enter a bad phone number. Fix anything that goes wrong." },
      ],
    },
    {
      heading: "Step 4 — Reminders",
      blocks: [
        { t: "p", text: "A reminder 24 hours before the appointment cuts no-shows even more. The simplest version is an email; SMS and WhatsApp reminders come with the automation lessons (Main Track)." },
        { t: "tool", slug: "cron-schedule-generator", why: "Build the schedule expression for 'every hour, check for bookings tomorrow and send reminders'." },
      ],
    },
  ],
  task: {
    title: "Add booking to a site",
    steps: ["Choose the approach with the booking feature picker.", "Build it (embed or custom).", "Book 3 test appointments, including one double-booking attempt.", "Confirm the owner can see bookings.", "Set up a reminder (email is fine for now)."],
    done: ["A customer can book a service in under a minute on a phone", "A slot can't be booked twice", "A deposit is taken in Paystack test mode (custom build)", "The owner can see upcoming bookings"],
  },
  resources: [
    { label: "Cal.com", url: "https://cal.com", note: "Open-source scheduling with a free tier and embeds." },
    { label: "Paystack docs — Accept payments", url: "https://paystack.com/docs/payments/accept-payments/", note: "How online payments work with Paystack." },
    { label: "Supabase docs", url: "https://supabase.com/docs", note: "Database, login and storage." },
    { label: "Google — Reserve with Google", url: "https://support.google.com/business/answer/7475773", note: "How bookings can appear on Google Business Profiles." },
  ],
  quiz: [
    { q: "Why add a deposit to bookings?", options: ["To make booking harder", "It dramatically reduces no-shows", "Paystack requires it", "It's decoration"], answer: 1, why: "People who've paid something show up." },
    { q: "A coach needs simple 1-hour calls booked. Best option?", options: ["A custom database system", "Embed a scheduler like Cal.com", "A printed calendar", "An online store"], answer: 1, why: "Start simple — an embed solves it in 30 minutes." },
    { q: "When should a booking be marked 'confirmed'?", options: ["As soon as the form is submitted", "After the server verifies the payment", "When the customer arrives", "Never"], answer: 1, why: "Only a server-verified payment proves the deposit was paid." },
    { q: "What must a booking system never allow?", options: ["Two customers booking the same slot", "Bookings on phones", "Deposits", "Reminders"], answer: 0, why: "Double-bookings destroy trust. Always test for them." },
    { q: "How should you test a booking system?", options: ["Book once and it's done", "Like a customer trying to break it: double bookings, cancelled payments, bad inputs", "Don't test — the AI built it", "Ask the client to test it"], answer: 1, why: "Trying to break it yourself finds problems before customers do." },
  ],
};

export default lesson;
