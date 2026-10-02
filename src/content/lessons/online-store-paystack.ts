import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "online-store-paystack",
  title: "Online stores & Paystack checkout",
  minutes: 130,
  outcome: "Two working ways for Bisi to sell her ready-to-wear pieces online: a free Paystack Storefront set up in minutes with no code, and a shop on her own website whose payments your own private code checks with Paystack (in test mode) before any order is confirmed.",
  intro:
    "Besides sewing to measure, Bisi sells eight ready-to-wear pieces: kimonos, boubous and tops in standard sizes. Every sale is a long chat: “How much? Which sizes? Send account number. Did you see my transfer?” She can't sell while she sleeps, and last month a buyer sent a fake transfer screenshot. Today you'll give her two ways to sell online with Nigerian payments (card, bank transfer and USSD): first a free ready-made shop she can run from her phone, then a shop inside her own website. You'll also learn the one rule of online payments that separates professionals from beginners.",
  core: "Never trust the customer's side: your own private code must check every payment with Paystack before an order is confirmed.",
  youNeed: ["Your GitHub-connected site from Day 7 and your Paystack test account from Day 8", "4 to 8 products: names, prices in naira, sizes and photos (placeholders are fine)", "About 2 hours: this is a big build", "Patience for one new idea: the private side of a website"],
  sections: [
    {
      heading: "Option 1: a free shop in minutes (Paystack Storefront)",
      blocks: [
        { t: "p", text: "Free tools first. Paystack includes a ready-made online shop called **Storefront**, with no monthly fee (Paystack only takes its usual fee from each sale). For many small sellers this is all they need." },
        {
          t: "steps",
          items: [
            { title: "Open Storefront", detail: "In the Paystack dashboard (still in **Test Mode**), find **Storefront** in the menu (it may sit under **Commerce**) and click **Create storefront**." },
            { title: "Name and style it", detail: "Name: “Stitches by Bisi”. Add the logo and pick the brand colour (#7A1F3D). Choose a short link like `stitchesbybisi`." },
            { title: "Add the products", detail: "For each piece: name, price in naira, a clear photo, the sizes as options, and how many are in stock." },
            { title: "Publish and test", detail: "Publish it, open its link on your phone, buy one item using Paystack's **test card** from Day 8, and check the order appears in the dashboard." },
            { title: "Link it from the website", detail: "Ask the AI to add a “Shop ready-to-wear” link to the menu in `site.js`, pointing to the Storefront link. Upload and commit." },
          ],
        },
        { t: "check", q: "A seller has 6 products, no budget and wants to sell online this week. What do you set up first?", options: ["A fully custom shop", "A free Paystack Storefront", "Nothing until they can afford a developer"], answer: 1, why: "Free, no code, live in minutes. Build a custom shop only when they need their own branded checkout." },
        { t: "tool", slug: "whatsapp-catalog-guide", why: "For sellers who close every sale in chat: set up a WhatsApp Business catalog instead, or as well." },
      ],
    },
    {
      heading: "The one rule of online payments",
      blocks: [
        { t: "p", text: "Before building a shop inside Bisi's own website, you need the rule that protects her money: **never trust the customer's side**. A customer (or a scammer) can fake a “payment successful” message on their own phone. So the confirmation must come from a place they can't touch." },
        {
          t: "define",
          term: "Server",
          like: "the back office of a shop: customers see the counter, but the safe, the books and the manager's phone are in a back room customers can't enter.",
          meaning: "A computer that runs the **private** part of a website, the part visitors can't see or change. Private keys and payment checks live there, never in the pages customers download.",
        },
        {
          t: "scenario",
          title: "The fake screenshot",
          text: "A buyer sends Bisi a bank-alert screenshot for ₦45,000 and asks her to send the kimonos today. The money never arrives: the screenshot was edited. Online, the same trick is done with fake “success” pages. Checking with Paystack from the server is the digital version of opening your own banking app before handing over the goods.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Trusting the screenshot", nodes: [{ draw: "phone", label: "“payment successful!”" }, { draw: "cross", label: "goods sent, no money" }] },
            right: { title: "Checking with the bank", nodes: [{ draw: "server", label: "your server asks Paystack" }, { draw: "check", label: "confirmed only if real", hot: true }] },
          },
          caption: "Left: the order is confirmed because the customer's phone says so, which anyone can fake. Right: your own server asks Paystack directly and confirms only real, full payments.",
        },
        { t: "figure", figure: { diagram: "payment-flow", caption: "The customer pays Paystack; your server checks with Paystack before confirming the order." } },
      ],
    },
    {
      heading: "Option 2: your own shop: the new words",
      blocks: [
        {
          t: "define",
          term: "API",
          like: "a waiter. You don't walk into the kitchen; you give your order to the waiter, and they bring back exactly what the kitchen sends.",
          meaning: "A way for one program to ask another for something, following fixed rules. Your server asks **Paystack's API**: “Start a payment for ₦25,000” and later “Was payment X real, and for how much?”",
        },
        {
          t: "define",
          term: "Secret key",
          also: ["Public key", "API key"],
          like: "your account number versus your ATM PIN. You give the account number to anyone; the PIN never leaves your head.",
          meaning: "Paystack gives you two **API keys**. The **public key** (starts `pk_`) may appear in a page. The **secret key** (starts `sk_`) can move money and read every transaction, so it lives **only on the server**: never in a page, never on GitHub, never in a chat.",
        },
        {
          t: "define",
          term: "Environment variable",
          also: ["Variables and Secrets"],
          like: "the combination of the shop's safe: staff know where the safe is, but the combination is kept separately, not painted on the wall.",
          meaning: "A private setting, like the secret key, stored in the hosting's settings instead of in your files. Your server code asks for it by name. On Cloudflare they live under **Settings → Variables and Secrets**, encrypted.",
        },
        {
          t: "define",
          term: "Serverless function",
          also: ["Cloudflare Function", "Pages Function", "functions folder"],
          like: "a POS agent who only opens the stand when a customer needs a transaction. You don't pay for the hours nobody comes.",
          meaning: "A small piece of server code that runs only when it's needed. On Cloudflare, every file inside a folder named **functions** (next to your `site` folder) becomes one, free for a generous number of uses every day. This is where the private payment check runs.",
        },
        {
          t: "define",
          term: "Kobo",
          like: "counting a ₦1,000 note as 100,000 kobo: the same money, written in the smallest coin.",
          meaning: "Paystack counts money in **kobo**, the smallest unit of the naira. ₦1 = 100 kobo, so ₦25,000 is sent as **2,500,000**. Forgetting to multiply by 100 is the classic beginner bug.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "phone", label: "shop page (the counter)" }, { draw: "server", label: "your function (back office)", hot: true }, { draw: "bank", label: "Paystack's API" }], arrows: ["“start a payment”", "secret key + check"] },
          caption: "Who talks to whom: the shop page asks your function to start a payment; only the function, holding the secret key in the back office, talks to Paystack and checks the result.",
        },
      ],
    },
    {
      heading: "Step 1: Keep the secret key secret",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Find the test secret key", detail: "Paystack dashboard → **Settings** → the page called `API Keys & Webhooks`. You'll see a **Test Public Key** (`pk_test_…`) and a **Test Secret Key** (`sk_test_…`). Click to reveal and copy the secret one." },
            { title: "Store it in Cloudflare, encrypted", detail: "Cloudflare → **Workers & Pages** → your project → **Settings** → **Variables and Secrets** → **Add**. Type: **Secret** (encrypted). Name: `PAYSTACK_SECRET_KEY`. Value: paste the key. **Save**." },
            { title: "Nowhere else", detail: "Don't paste it into any file, chat or note. Your code will ask Cloudflare for it by name." },
          ],
        },
        { t: "warn", text: "If a secret key is ever exposed (posted in a chat, pasted into a page, uploaded to GitHub), go to Paystack and generate a new one immediately, then update the value in Cloudflare." },
      ],
    },
    {
      heading: "Step 2: Build the shop",
      blocks: [
        { t: "p", text: "Your project gets a new folder, `functions`, **beside** `site` (not inside it). The pages stay in `site`; the private code goes in `functions`." },
        { t: "prompt", title: "The shop and the private payment check", text: "Read the project brief first and follow it.\n\nAdd a small shop to my plain HTML site, hosted on Cloudflare Pages with Pages Functions. My folders: site/ (the public pages, already using styles.css and site.js) and functions/ (beside site, for server code). Build:\n1) One product list used by everything: name, id, price in naira, sizes, photo path. Put it in a file inside functions/ and also serve it to the browser from /api/products.\n2) site/shop.html: a product grid (photo, name, price, size choice, 'Add to bag'), a bag saved in the browser, and a checkout form for name, phone, email and delivery address.\n3) functions/api/pay.js: receives the bag (product ids, sizes, quantities only). On the server, recalculate the total from the product list (never trust prices from the browser), convert to kobo (x100), and start a Paystack transaction with the secret key from context.env.PAYSTACK_SECRET_KEY, putting the order details in metadata and setting callback_url to /order.html. Return Paystack's authorization_url.\n4) functions/api/verify.js: given a reference, verify it with Paystack using the secret key, check status is success and the amount matches the order total, and return a simple yes/no with the order summary.\n5) site/order.html: reads the reference from the address, calls /api/verify, and shows 'Order confirmed' with the summary only if the server says yes; otherwise a friendly 'payment not confirmed' message with a WhatsApp link.\nAdd 'Shop' to the menu in site.js. Test mode only. Create every file in the right folder and explain each step in one plain sentence." },
        {
          t: "steps",
          items: [
            { title: "Check the files landed in the right folders", detail: "Approve the plan, then check that `functions` sits beside `site` with `api` inside it. (Free chat: in VS Code, right-click `bisi-project` → **New Folder** → `functions`, make `api` inside it, and create each file where its path says.)" },
            { title: "Upload both folders to GitHub", detail: "In your repository's main page: **Add file** → **Upload files** → drag the `functions` folder (it lands beside `site`). Then open `site` → **Upload files** → drag the new and changed pages. Commit." },
            { title: "Watch the deployment", detail: "Cloudflare → **Deployments**. The new one should succeed; its details mention your functions." },
          ],
        },
        { t: "check", q: "A kimono costs ₦12,500. What amount does your function send to Paystack?", options: ["12,500", "125,000", "1,250,000", "125"], answer: 2, why: "₦1 = 100 kobo, so ₦12,500 × 100 = 1,250,000 kobo." },
        {
          t: "errors",
          items: [
            { see: "“Something went wrong” at checkout, or an error with the number 500", means: "The function couldn't use the secret key: the name in Cloudflare is different, or you added it after the last deployment.", fix: "Check the name is exactly `PAYSTACK_SECRET_KEY`. Then make any small commit so a new deployment runs with the key." },
            { see: "“404” when the shop calls /api/pay", means: "The `functions` folder isn't at the top level of the repository (it's inside `site`, or missing).", fix: "In GitHub, `functions` and `site` must sit side by side. Move it and commit again." },
            { see: "Paystack's page shows ₦125 instead of ₦12,500", means: "The kobo conversion is missing.", fix: "Tell the AI: “Paystack shows ₦125 for a ₦12,500 item: the amount must be multiplied by 100 on the server.”" },
          ],
        },
      ],
    },
    {
      heading: "Step 3: Test it like a scammer would",
      blocks: [
        { t: "p", text: "Use Paystack's test card from its “Test payments” page (at the time of writing: **4084 0840 8408 4081**, CVV **408**, any future expiry; if asked, PIN **408408** and OTP **123456**). Then try to break your own shop:" },
        { t: "list", items: ["A successful payment → “Order confirmed”, and the payment shows in the Paystack dashboard.", "A cancelled payment → no confirmation, a friendly message instead.", "Closing the payment window halfway → nothing marked as paid.", "Opening `order.html` with a made-up reference → “not confirmed”.", "Changing a price on the page with developer tools → Paystack still charges the real price."] },
        { t: "try", title: "Try to cheat your own shop", minutes: 10, steps: ["Open your live shop and add a kimono to the bag.", "Press **F12**, find the price on the page and change it to ₦10.", "Go to checkout. The Paystack page must still show the real price. If it shows ₦10, tell the AI: “Prices must be calculated on the server from the product list.”"] },
        { t: "win", title: "A test payment, checked by your own server", proved: "you can build a shop where no order is ever confirmed until Paystack itself says the money is real, the protection serious online businesses rely on.", cue: "Screenshot the confirmed order and the matching Paystack test transaction. Finish your mission for the **Safe checkout** badge." },
      ],
    },
    {
      heading: "Step 4: Tell the owner about every order",
      blocks: [
        { t: "p", text: "Paystack already emails the customer a receipt. The simplest way for the owner to hear about each order instantly is the free **Paystack app** on their phone, with notifications on." },
        {
          t: "define",
          term: "Webhook",
          like: "the credit alert SMS your bank sends the moment money lands, instead of you checking your balance every hour.",
          meaning: "A message Paystack's server sends to **your** server the moment something happens, like a successful payment, even if the customer closed their browser before coming back to your site.",
        },
        { t: "figure", figure: { diagram: "webhook", caption: "Paystack tells your server about the payment; your server checks it and records it once." } },
        { t: "prompt", title: "Optional: an order alert by webhook", text: "Add functions/api/paystack-webhook.js. It must check the x-paystack-signature header with the secret key (HMAC SHA512) before trusting anything, ignore any event except charge.success, verify the transaction with Paystack, and then send the owner an email with the order details through Web3Forms (access key in an encrypted variable WEB3FORMS_KEY). Make sure the same payment reference can never trigger two emails. Explain how to add the webhook address in Paystack's settings." },
        { t: "tool", slug: "email-autoresponder-generator", why: "Writes the words for order confirmation, dispatch and thank-you messages." },
        { t: "upgrade", title: "A very busy shop", text: "Cloudflare's free plan covers a large number of function uses every day, far more than a small shop needs. If a shop ever grows past it, Cloudflare's paid plan raises the limits for a small monthly fee." },
        { t: "mistakes", items: [{ wrong: "Marking an order paid because the customer's page said “success”", right: "Marking it paid only after the server verifies with Paystack" }, { wrong: "Sending the price from the browser to Paystack", right: "Recalculating the total on the server from the product list" }, { wrong: "₦15,000 sent as 15000", right: "₦15,000 sent as 1,500,000 kobo" }, { wrong: "The secret key pasted into a page “just to test”", right: "Only in Cloudflare's encrypted Variables and Secrets" }] },
      ],
    },
  ],
  task: {
    title: "Build and test both shops",
    steps: ["Set up a Paystack Storefront with the products and make a test purchase.", "Store the Paystack test secret key in Cloudflare as an encrypted secret.", "Build the custom shop with the prompt; upload `functions` beside `site` and commit.", "Complete a test purchase with Paystack's test card.", "Try the price-cheating test, a cancelled payment and a made-up reference."],
    done: ["The Storefront takes a test payment", "An order shows as confirmed only after the server verifies it", "The price-cheating test still charges the real price", "The secret key is only in Cloudflare's encrypted settings, not in my files or on GitHub", "The test payments appear in the Paystack test dashboard"],
  },
  recap: [
    "**Never trust the customer's side**: your server must check every payment with Paystack before confirming an order.",
    "The Paystack **secret key** lives only on the server, in Cloudflare's encrypted **Variables and Secrets**: never in a page, never on GitHub.",
    "Paystack counts in **kobo**: ₦1 = 100 kobo, so ₦15,000 is sent as **1,500,000**.",
    "A small seller can start today with a free **Paystack Storefront**: no code, live in minutes.",
    "A client's shop uses **the client's own Paystack account**, so the money reaches their bank.",
    "A **webhook** is Paystack telling your server about a payment the moment it happens, like a bank's credit alert.",
  ],
  resources: [
    { label: "Paystack: Accept payments", url: "https://paystack.com/docs/payments/accept-payments/", note: "Official guide to starting and verifying payments." },
    { label: "Paystack: Test payments", url: "https://paystack.com/docs/payments/test-payments/", note: "The current test cards and bank details." },
    { label: "Paystack Storefront", url: "https://paystack.com/storefront", note: "The free, no-code shop." },
    { label: "Cloudflare Pages Functions", url: "https://developers.cloudflare.com/pages/functions/", note: "Official guide to the functions folder." },
    { label: "Cloudflare: variables and secrets", url: "https://developers.cloudflare.com/pages/functions/bindings/", note: "Storing keys outside your files." },
    { label: "Paystack: Webhooks", url: "https://paystack.com/docs/payments/webhooks/", note: "Receiving and checking payment events." },
  ],
  quiz: [
    { q: "Why must your server check every payment with Paystack?", options: ["It's faster", "A “success” message on the customer's side can be faked", "Paystack charges less", "It isn't necessary"], answer: 1, why: "Only a server-to-Paystack check proves the money really arrived.", from: 0, aim: "core" },
    { q: "Where does the Paystack secret key go?", options: ["In shop.html", "In a GitHub file", "Only on the server: Cloudflare's encrypted Variables and Secrets", "In the WhatsApp group"], answer: 2, why: "Anyone with the secret key can act on the account. Tomorrow, Supabase gives you a secret key that follows the same rule.", from: 1, aim: "web-apps-auth-db" },
    { q: "A boubou costs ₦15,000. What amount goes to Paystack?", options: ["15,000", "150,000", "1,500,000", "15"], answer: 2, why: "Multiply by 100 for kobo. Later, when you record payments in a sheet, you'll divide by 100 to get naira back.", from: 2, aim: "automations-make-zapier-n8n" },
    { q: "A seller with 6 products and no budget wants to sell online this week. What do you set up first?", options: ["A fully custom shop", "A free Paystack Storefront", "A paid website builder", "Nothing yet"], answer: 1, why: "Free and no code. When you package your services, a Storefront setup is a quick, cheap option to offer.", from: 3, aim: "package-for-client" },
    { q: "What is a Paystack webhook for?", options: ["Designing products", "Paystack telling your server about a payment the moment it happens, even if the customer closed the tab", "Sending adverts", "Making photos smaller"], answer: 1, why: "Like a credit alert. In the Main Track, webhooks start the tasks that run by themselves after every payment.", from: 5, aim: "automations-make-zapier-n8n" },
  ],
  celebrate: {
    title: "Day 9 complete: a shop that can't be fooled",
    proved: "You can give a seller two ways to take payments online, and make sure no order is ever confirmed until the money is real.",
    badge: "Safe checkout",
    badgeDesc: "Built a shop with server-checked payments",
  },
};

export default lesson;
