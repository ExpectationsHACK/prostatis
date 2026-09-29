import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "online-store-paystack",
  title: "Online stores & Paystack checkout",
  minutes: 120,
  outcome: "A small online store with products, a cart, Paystack checkout (test mode) and order notifications.",
  intro:
    "Fashion brands, food vendors, skincare sellers and pharmacies all want to sell online without losing 10–20% to marketplaces. Today you build a store that takes real Nigerian payments — card, bank transfer and USSD — through Paystack.",
  sections: [
    {
      heading: "How online payment works",
      blocks: [
        { t: "figure", figure: { diagram: "payment-flow", caption: "The customer pays Paystack; your server checks with Paystack before confirming the order." } },
        { t: "p", text: "The most important rule in payments: **never trust the browser**. A customer (or a scammer) can fake a 'payment successful' message in their browser. Your server must ask Paystack directly, “Was reference XYZ paid, and how much?” — and only then confirm the order." },
        { t: "list", items: ["**Test mode** — fake money, test cards. Use this while building.", "**Live mode** — real money. Only after the business has completed Paystack's verification (KYC).", "**Secret key** — lives only on the server, never in the browser or on GitHub.", "**Webhook** — Paystack calls your server when a payment succeeds, even if the customer closed the tab."] },
      ],
    },
    {
      heading: "Step 1 — Is a full store needed?",
      blocks: [
        { t: "p", text: "Not every seller needs a full store. A seller with 10 products who closes sales in chat may be better served by a WhatsApp catalog plus a simple website. A seller with 50+ products, or who wants to sell while they sleep, needs a store." },
        { t: "tool", slug: "whatsapp-catalog-guide", why: "Set up a WhatsApp Business catalog when that's the better fit." },
        { t: "figure", figure: { product: "store", caption: "A small store: product grid, cart and Paystack checkout." } },
      ],
    },
    {
      heading: "Step 2 — Set up Paystack (test mode)",
      blocks: [
        { t: "steps", items: [
          { title: "Create a Paystack account", detail: "Sign up at paystack.com. You can use test mode immediately, before verification." },
          { title: "Find your test keys", detail: "Settings → API Keys & Webhooks. You'll see a test public key (pk_test_…) and a test secret key (sk_test_…)." },
          { title: "Put keys in .env.local", detail: "PAYSTACK_SECRET_KEY=sk_test_… — never in code, never on GitHub." },
        ] },
        { t: "warn", text: "For a client's store, the Paystack account must be in the **client's business name**, so money goes to their bank account — not yours." },
      ],
    },
    {
      heading: "Step 3 — Build the store",
      blocks: [
        { t: "prompt", title: "Store prompt", text: "Build a small online store in this project. Products are stored in Supabase (name, price in kobo, image, stock, category). Pages: product grid with category filter, product page, cart (saved in the browser), and checkout collecting name, phone, email and delivery address. At checkout, create a pending order on the server, start a Paystack transaction for the server-calculated total (never trust prices from the browser), and redirect to Paystack. On return, verify the transaction on the server with the secret key and mark the order paid only if the amount matches. Also add a Paystack webhook endpoint that verifies the signature. Use test mode keys from .env.local." },
        { t: "tip", text: "Paystack amounts are in **kobo**: ₦15,000 = 1,500,000 kobo. A missing ×100 is the most common beginner bug." },
        { t: "tool", slug: "pricing-layout-picker", why: "Choose how prices, bundles and discounts are displayed." },
      ],
    },
    {
      heading: "Step 4 — Test with Paystack's test cards",
      blocks: [
        { t: "p", text: "Paystack's docs list test card numbers that simulate success, failure and bank verification (OTP). Use them — never your own card — while in test mode." },
        { t: "list", items: ["A successful payment → order marked paid, stock reduced", "A failed payment → order stays pending, customer sees a helpful message", "Closing the payment window → nothing is marked paid", "Changing the price in the browser's developer tools → the server still charges the real price"] },
      ],
    },
    {
      heading: "Step 5 — Order notifications",
      blocks: [
        { t: "p", text: "When an order is paid, the owner needs to know immediately, and the customer needs a receipt." },
        { t: "prompt", title: "Notifications", text: "When an order is verified as paid, send the customer a receipt email and the owner an email with the order details, using Resend. Include order number, items, total in naira and delivery address. Make sure a webhook and the return page can't send the emails twice for the same order." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the text for order confirmation, shipping and thank-you emails." },
      ],
    },
  ],
  task: {
    title: "Build and test a store",
    steps: ["Create a Paystack account and add test keys to .env.local.", "Build the store with 6+ products.", "Complete a test purchase with a Paystack test card.", "Try a failed payment and a tampered price.", "Confirm the owner and customer emails arrive once."],
    done: ["A test order shows as paid only after server verification", "Prices come from the server, not the browser", "No secret key is in the code or GitHub", "Order emails arrive exactly once"],
  },
  resources: [
    { label: "Paystack — Accept payments", url: "https://paystack.com/docs/payments/accept-payments/", note: "Official guide to starting and verifying transactions." },
    { label: "Paystack — Test payments", url: "https://paystack.com/docs/payments/test-payments/", note: "Test cards and bank details." },
    { label: "Paystack — Webhooks", url: "https://paystack.com/docs/payments/webhooks/", note: "How to receive and verify payment events." },
    { label: "Resend", url: "https://resend.com/docs", note: "Send emails from your app." },
    { label: "WhatsApp Business catalog", url: "https://faq.whatsapp.com/1049637315738936", note: "When a catalog is the better fit." },
  ],
  quiz: [
    { q: "Why must the server verify payments with Paystack?", options: ["It's faster", "The browser's 'success' message can be faked", "Paystack charges less", "It isn't necessary"], answer: 1, why: "Only a server-to-Paystack check proves money was actually paid." },
    { q: "₦15,000 in Paystack's kobo is…", options: ["15,000", "150,000", "1,500,000", "15"], answer: 2, why: "1 naira = 100 kobo, so ×100." },
    { q: "Where does the Paystack secret key go?", options: ["In the browser code", "In a GitHub README", "Only on the server in environment variables", "In the footer"], answer: 2, why: "Anyone with the secret key can act on the account." },
    { q: "Whose name should a client store's Paystack account be in?", options: ["Yours", "The client's business", "Paystack's", "Anyone's"], answer: 1, why: "The money must go to the client's bank account." },
    { q: "What is a webhook used for here?", options: ["Designing products", "Paystack notifying your server when payment succeeds, even if the tab was closed", "Sending marketing emails", "Speeding up images"], answer: 1, why: "Webhooks catch payments the return page might miss." },
  ],
};

export default lesson;
