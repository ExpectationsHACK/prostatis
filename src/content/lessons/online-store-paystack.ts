import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "online-store-paystack",
  title: "Online stores & Paystack checkout",
  minutes: 120,
  outcome: "A small online store on your site, products, a cart and a Paystack checkout (test mode) that your server verifies before confirming the order.",
  intro:
    "Tunde sells Ankara shirts on Instagram. Every sale is a long chat: “How much? What sizes? Send account number. Did you see my transfer?”, and he can't sell while he sleeps. Today you'll give a seller like Tunde a real online store that takes Nigerian payments, card, bank transfer and USSD, through Paystack. You'll learn the one rule of online payments that separates professionals from beginners.",
  youNeed: ["Your project and live site", "A Paystack account in test mode", "4–8 products with names, prices in naira and photos (placeholders are fine)", "About 2 hours: this is a big build"],
  sections: [
    {
      heading: "How online payment works",
      blocks: [
        { t: "figure", figure: { diagram: "payment-flow", caption: "The customer pays Paystack; your server checks with Paystack before confirming the order." } },
        { t: "p", text: "The most important rule in online payments: **never trust the browser**. A customer: or a scammer, can fake a “payment successful” message in their own browser. So your **server** must ask Paystack directly: “Was payment XYZ really made, and for how much?” Only then do you confirm the order." },
        { t: "define", term: "Server", meaning: "A computer (in our case, Vercel's) that runs the private part of your website, the part visitors can't see or change. Secret keys and payment checks live there.", like: "the back office of a shop. Customers see the counter; the safe and the accounts are in the back room." },
        { t: "define", term: "Verify a payment", meaning: "Your server asking Paystack, using your secret key, whether a payment (identified by its **reference**) really succeeded and for the right amount.", like: "calling the bank to confirm a transfer, instead of trusting a screenshot of an alert." },
        { t: "scenario", title: "The fake screenshot", text: "A buyer sends a bank-alert screenshot for ₦45,000 and asks for the goods. The money never arrives: the screenshot was edited. Online, the same trick happens with fake “success” pages. Server verification is the digital version of checking your actual account balance before handing over the goods." },
      ],
    },
    {
      heading: "Step 1: Does this seller need a full store?",
      blocks: [
        { t: "table", columns: ["Option", "Best for", "Code?"], rows: [["WhatsApp catalog + order buttons", "Sellers with a few products who close sales in chat", "No"], ["Paystack Storefront", "Sellers who want a simple hosted shop fast", "No: Paystack hosts it"], ["Custom store on their website", "Sellers who want their own branded shop, on their domain", "Yes: **today's build**"]] },
        { t: "tool", slug: "whatsapp-catalog-guide", why: "Set up a WhatsApp Business catalog when that's the better fit." },
        { t: "tip", text: "Paystack also offers **Storefronts**, a free hosted shop you can set up from the dashboard in minutes. It's a great quick win for a small seller, and a good backup to mention in your proposal." },
        { t: "figure", figure: { product: "store", caption: "A small branded store: product grid, cart and Paystack checkout." } },
      ],
    },
    {
      heading: "Step 2: Set up Paystack keys safely",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Find your test keys", detail: "Paystack dashboard → Settings → API Keys & Webhooks. You'll see a **test public key** (pk_test_…) and a **test secret key** (sk_test_…)." },
            { title: "Put the secret key in .env.local", detail: "`PAYSTACK_SECRET_KEY=sk_test_...` - never in your code, never on GitHub." },
            { title: "Add it to Vercel too", detail: "Project → Settings → Environment Variables, so the live site's server can use it." },
          ],
        },
        { t: "define", term: "Secret key vs. public key", meaning: "The **public key** can safely appear in a web page. The **secret key** can move money and read transactions, so it must only ever live on the server.", like: "your account number (fine to share) versus your bank PIN (never share)." },
        { t: "warn", text: "If a secret key is ever exposed, posted in a chat, pushed to GitHub, go to the Paystack dashboard and generate a new one immediately." },
      ],
    },
    {
      heading: "Step 3: Build the store",
      blocks: [
        { t: "p", text: "For a small shop, the products can live in a simple file in your project, no database needed yet. (After the web-apps lesson, you can move them into a database so the owner can edit them.)" },
        { t: "define", term: "Kobo", meaning: "Paystack counts money in **kobo**, the smallest unit of the naira. ₦1 = 100 kobo, so ₦15,000 is sent as 1,500,000.", like: "counting in cents instead of dollars." },
        { t: "prompt", title: "Store prompt", text: "Build a small online store. Put the products in a file (name, slug, price in naira, image, sizes). Pages: a product grid, a product page, and a cart saved in the browser. At checkout, collect name, phone, email and delivery address. On the SERVER, recalculate the total from the product file (never trust prices sent from the browser), convert it to kobo, and start a Paystack transaction with my secret key from the environment variable PAYSTACK_SECRET_KEY, putting the order details in the transaction metadata. When Paystack sends the customer back, verify the transaction on the server using its reference, check the amount matches, and only then show 'Order confirmed' with the order summary. Test mode only. Explain each step in simple terms." },
        { t: "tip", text: "The most common beginner bug is forgetting to multiply by 100 for kobo, a ₦15,000 dress charged as ₦150. Ask Claude to show you where the conversion happens." },
        { t: "check", q: "A dress costs ₦12,500. What amount goes to Paystack?", options: ["12,500", "125,000", "1,250,000", "125"], answer: 2, why: "₦1 = 100 kobo, so ₦12,500 × 100 = 1,250,000 kobo." },
        { t: "tool", slug: "pricing-layout-picker", why: "Choose how prices, bundles and discounts are shown." },
      ],
    },
    {
      heading: "Step 4: Test like a scammer",
      blocks: [
        { t: "p", text: "Use Paystack's test card from its docs (at the time of writing: **4084 0840 8408 4081**, CVV **408**, any future expiry; if asked, PIN **408408** and OTP **123456**). Then try to break your own store:" },
        { t: "list", items: ["A successful payment → “Order confirmed”, and the transaction appears in the Paystack test dashboard.", "A failed or cancelled payment → no confirmation; a helpful message instead.", "Closing the payment window halfway → nothing is marked paid.", "Changing a price in the browser's developer tools (F12) → the server still charges the real price."] },
        { t: "try", title: "Try to cheat your own store", minutes: 10, steps: ["Add a product to the cart.", "Press F12, find the price in the page and change it to ₦10.", "Go to checkout. The Paystack page must still show the real price, if it shows ₦10, tell Claude: “Prices must be calculated on the server from the product file.”"] },
      ],
    },
    {
      heading: "Step 5: Order notifications",
      blocks: [
        { t: "p", text: "When a payment is verified, the owner needs to know straight away and the customer should get a receipt. Paystack already emails a payment receipt to the customer. For the owner, the simplest option is the **Paystack mobile app** notifications, plus, if you want, an email from your site." },
        { t: "define", term: "Webhook", meaning: "A message Paystack's server sends to **your** server the moment something happens, like a successful payment, even if the customer closed their browser before coming back to your site.", like: "the bank texting you a credit alert, instead of you checking your balance every hour." },
        { t: "figure", figure: { diagram: "webhook", caption: "Paystack tells your server about the payment; your server checks it and records it once." } },
        { t: "prompt", title: "Owner email + webhook (optional)", text: "When an order is verified as paid, email the owner the order details using Resend (API key in RESEND_API_KEY). Also add a Paystack webhook endpoint that checks the x-paystack-signature header before trusting the message, verifies the transaction, and sends the same owner email. Make sure the webhook and the return page can never send the email twice for the same payment reference." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the text for order confirmation, shipping and thank-you emails." },
        { t: "mistakes", items: [{ wrong: "Marking an order paid because the browser said “success”", right: "Marking it paid only after the server verifies with Paystack" }, { wrong: "Sending the price from the browser to Paystack", right: "Recalculating the total on the server from the product list" }, { wrong: "₦15,000 sent as 15000", right: "₦15,000 sent as 1,500,000 kobo" }] },
      ],
    },
  ],
  task: {
    title: "Build and test a store",
    steps: ["Choose the right option for your practice seller (and note the other two for your proposal).", "Add your test secret key to .env.local and Vercel.", "Build the store with 4–8 products.", "Complete a test purchase with Paystack's test card.", "Try the price-cheating test and a cancelled payment."],
    done: ["An order shows as confirmed only after server verification", "The price-cheating test still charges the real price", "No secret key is in my code or on GitHub", "The test payment appears in my Paystack test dashboard"],
  },
  recap: [
    "**Never trust the browser**: your server must verify every payment with Paystack before confirming an order.",
    "Paystack counts in **kobo**: ₦1 = 100 kobo, so ₦15,000 is sent as **1,500,000**.",
    "The **secret key** lives only on the server, in environment variables, never in the browser or on GitHub.",
    "A client's store must use **the client's own Paystack account**, so the money reaches their bank.",
    "A **webhook** is Paystack telling your server about a payment, even if the customer closed the tab.",
  ],
  resources: [
    { label: "Paystack: Accept payments", url: "https://paystack.com/docs/payments/accept-payments/", note: "Official guide to starting and verifying payments." },
    { label: "Paystack: Test payments", url: "https://paystack.com/docs/payments/test-payments/", note: "Current test cards and bank details." },
    { label: "Paystack: Webhooks", url: "https://paystack.com/docs/payments/webhooks/", note: "How to receive and verify payment events." },
    { label: "Resend docs", url: "https://resend.com/docs", note: "Send emails from your site." },
    { label: "WhatsApp Business catalog", url: "https://faq.whatsapp.com/1049637315738936", note: "When a catalog is the better fit." },
  ],
  quiz: [
    { q: "Why must your server verify payments with Paystack?", options: ["It's faster", "A “success” message in the browser can be faked", "Paystack charges less", "It isn't necessary"], answer: 1, why: "Only a server-to-Paystack check proves the money was really paid.", from: 0 },
    { q: "₦15,000 in Paystack's kobo is…", options: ["15,000", "150,000", "1,500,000", "15"], answer: 2, why: "₦1 = 100 kobo, so multiply by 100.", from: 1 },
    { q: "Where does the Paystack secret key go?", options: ["In the browser code", "In a GitHub README", "Only on the server, in environment variables", "In the footer"], answer: 2, why: "Anyone with the secret key can act on the account.", from: 2 },
    { q: "Whose name should a client store's Paystack account be in?", options: ["Yours", "The client's business", "Paystack's", "Anyone's"], answer: 1, why: "The money must reach the client's bank account.", from: 3 },
    { q: "What is a Paystack webhook used for?", options: ["Designing products", "Paystack telling your server about a payment, even if the customer closed the tab", "Sending marketing emails", "Speeding up images"], answer: 1, why: "Webhooks catch payments the return page might miss.", from: 4 },
  ],
};

export default lesson;
