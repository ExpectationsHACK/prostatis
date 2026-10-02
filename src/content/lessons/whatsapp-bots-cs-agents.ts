import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "whatsapp-bots-cs-agents",
  title: "WhatsApp & website chat agents",
  minutes: 130,
  outcome: "Bisi's WhatsApp Business app fully set up (profile, greeting, away message, quick replies, catalog and labels), a designed bot conversation, and a free chat assistant on her website that answers from her approved facts and hands over to her when it should.",
  intro:
    "In Nigeria, business happens on WhatsApp. Bisi answers “How much?”, “Are you open?” and “Send account number” late into the night, often while cutting fabric for the next day. Today you'll put yesterday's assistant where customers already are: in her WhatsApp setup and on her website. You'll also learn WhatsApp's rules first, because breaking them can get a business's main number banned, and that's a disaster no website can fix.",
  core: "Use only official WhatsApp tools, respect the 24-hour rule and customers' consent, and always give customers a smooth way to reach a person.",
  youNeed: ["Your assistant's instructions and knowledge base from yesterday", "The owner's phone with the free WhatsApp Business app", "Your GitHub-connected site with its `functions` folder", "A Google account for a free Gemini API key"],
  sections: [
    {
      heading: "Your options on WhatsApp",
      blocks: [
        {
          t: "define",
          term: "WhatsApp Business Platform",
          also: ["Cloud API"],
          like: "the official staff entrance with an ID badge, instead of climbing in through a window.",
          meaning: "Meta's official system that lets software send and receive WhatsApp messages for a business (its developer version is called the **Cloud API**). It's the only allowed way to run a real WhatsApp bot.",
        },
        { t: "table", columns: ["Option", "What it can do", "Cost"], rows: [["WhatsApp Business app", "Profile, greeting and away messages, quick replies, a catalog, labels", "Free"], ["WhatsApp Business Platform (Cloud API)", "Real bots and AI assistants, several staff, automations", "Free to set up; Meta charges for some messages (check its pricing page)"], ["Platforms built on it (e.g. respond.io, Wati)", "A shared inbox for staff, a bot builder, AI", "Monthly fees"]] },
        { t: "tip", text: "Many small businesses only need the free **Business app**, set up properly. It's a quick, valuable job you can charge for. Start there; build a real bot only when the business has enough messages to need it." },
        { t: "tool", slug: "whatsapp-business-bio", why: "Writes the business profile, greeting, away message and quick replies for the WhatsApp Business app." },
      ],
    },
    {
      heading: "Step 1: Set up the free Business app properly",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Open Business tools", detail: "On the owner's phone, in **WhatsApp Business**: tap **⋮** (Android) or **Settings** (iPhone) → **Business tools**." },
            { title: "Business profile", detail: "Add the description (from the brand kit), category (**Clothing Store** or the closest), address, hours, email and the website address." },
            { title: "Greeting message", detail: "**Greeting message** → on. “Hi! Thanks for messaging Stitches by Bisi 👗 See prices and book a fitting: [website]. Bisi replies personally between 9am and 6pm.”" },
            { title: "Away message", detail: "**Away message** → on → **Outside of business hours**. “We're closed now and will reply from 9am. To book a fitting any time: [booking link].”" },
            { title: "Quick replies", detail: "**Quick replies** → add 5 for the most common questions: `/prices`, `/book`, `/deposit`, `/location`, `/remind`." },
            { title: "Catalog and labels", detail: "**Catalog**: add the ready-to-wear pieces with prices and photos. **Labels**: create New order, Awaiting payment, Paid, Ready for collection." },
          ],
        },
        { t: "try", title: "Test it like a customer", minutes: 10, steps: ["From your own phone, message the business number “Hi”.", "Did the greeting arrive? Is the website link correct?", "Ask the owner to type `/prices` in your chat. Does the quick reply appear?"] },
        { t: "win", title: "WhatsApp Business, set up properly", proved: "you can turn a business's WhatsApp from a pile of unanswered chats into an organised front desk, with zero cost and zero code.", cue: "Ask the owner how many “how much?” messages the greeting saves this week. Keep going: the mission and the **Always open** badge are at the end." },
      ],
    },
    {
      heading: "Step 2: WhatsApp's rules, before any bot",
      blocks: [
        {
          t: "define",
          term: "Customer service window",
          like: "a shop door that stays open for 24 hours after a customer knocks: inside that time you can talk freely.",
          meaning: "The 24 hours after a customer's last message. During it, a business on the Business Platform can reply freely. After it closes, the business may only send pre-approved templates.",
        },
        {
          t: "define",
          term: "Template message",
          like: "an official letter format that must be stamped and approved before it can be posted.",
          meaning: "A pre-approved message a business uses to contact someone **outside** the 24-hour window, like an appointment reminder or an order update. Meta approves the wording first.",
        },
        {
          t: "define",
          term: "Opt-in",
          like: "asking before adding someone to a WhatsApp group, instead of adding them and waiting for the complaints.",
          meaning: "A customer's clear yes to receive messages from the business, given **before** the business messages them first.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "the customer writes first" }, { draw: "clock", label: "24 hours to reply freely", hot: true }, { draw: "stamp", label: "after that: approved templates only" }] },
          caption: "The 24-hour rule: once a customer writes, the business can reply freely for 24 hours; after that, only pre-approved templates, and only to customers who opted in.",
        },
        { t: "list", items: ["Customers must **opt in** before a business messages them first.", "Meta charges for some messages on the Business Platform (marketing templates always; others depending on category and country), and its pricing changes. **Check Meta's current pricing page** before quoting a client.", "Spam gets numbers banned. Never bulk-message people who didn't ask."] },
        { t: "warn", text: "Unofficial WhatsApp bots (apps or scripts that control a normal WhatsApp account) break WhatsApp's terms. Numbers get banned, sometimes the business's main number. Use only the official Business app or the official Business Platform." },
        { t: "check", q: "A customer messaged Bisi 30 hours ago. Bisi wants to send her a promotion through the Business Platform. What's needed?", options: ["Nothing: just send it", "An approved template, and the customer's opt-in, because the 24-hour window has closed", "An unofficial bot"], answer: 1, why: "Outside the 24-hour window, businesses may only send approved templates to people who opted in." },
      ],
    },
    {
      heading: "Step 3: Design the conversation",
      blocks: [
        { t: "p", text: "Before building a bot, draw the conversation. Good bots use a **menu** for common paths, AI for free-text questions, and always a way to reach a person." },
        { t: "tool", slug: "whatsapp-bot-flow-builder", why: "Builds a complete flow (welcome menu, order or booking steps, questions and handoff) with message text ready to paste." },
        { t: "figure", figure: { product: "wabot", caption: "A WhatsApp order bot: a menu, choices, the total and a payment link." } },
        { t: "list", items: ["Welcome: “Hi! 1) Prices 2) Book a fitting 3) Check my order 4) Talk to Bisi”", "Always offer a way to reach a person", "Keep messages short: 1 to 3 lines", "Repeat the important details back (outfit, date, total)"] },
      ],
    },
    {
      heading: "Step 4 (stretch): a real bot on the free test number",
      blocks: [
        { t: "p", text: "For learning, Meta gives you a **free test number** that can message a few phone numbers you verify. It's how professionals practise before touching a real business number." },
        {
          t: "steps",
          items: [
            { title: "Create a developer app", detail: "Go to `developers.facebook.com` → **My Apps** → **Create App** → choose the **Business** type, then add the **WhatsApp** product." },
            { title: "Message yourself", detail: "In **WhatsApp** → **API Setup**, add your own phone number as a recipient (Meta sends a code), then send the sample message. It arrives on your phone from the test number." },
            { title: "Connect your assistant (optional)", detail: "Receiving messages needs a webhook on your site: ask your AI assistant to write `functions/api/whatsapp.js` that verifies Meta's token, sends the customer's message to the same assistant you build in Step 5, and replies through the Cloud API. Keep every key as a Cloudflare secret." },
          ],
        },
        { t: "tip", text: "Moving a real business number onto the Platform needs Meta business verification and changes how that number is used. Do it only when the business truly needs a bot; for most, Step 1 plus the website assistant is plenty." },
        {
          t: "scenario",
          title: "The late-night rush",
          text: "Picture wedding season: aso-ebi enquiries arrive between 9pm and midnight, while Bisi is sewing. With the greeting, the away message and the website assistant, every enquirer gets prices, the booking link and the deposit rule instantly, and anything unusual waits for Bisi in the morning with a summary. She stops answering “Are you still open?” forty times a night.",
        },
      ],
    },
    {
      heading: "Step 5: A free chat assistant on the website",
      blocks: [
        { t: "p", text: "The same assistant can live on the website as a chat bubble. The free route: Google's **Gemini API** free allowance, called from a Cloudflare function so the key never reaches the page." },
        {
          t: "steps",
          items: [
            { title: "Get a free Gemini API key", detail: "Go to `aistudio.google.com`, sign in with Google, click **Get API key** → **Create API key**, and copy it." },
            { title: "Store it as a secret", detail: "Cloudflare → your project → **Settings** → **Variables and Secrets** → add a **Secret** named `GEMINI_API_KEY`." },
            { title: "Ask your builder to build it", detail: "Use the prompt below, review the new files, upload them to GitHub and commit." },
            { title: "Test it with your 20 questions", detail: "Run yesterday's test script in the website chat. It should pass just like the prototype." },
          ],
        },
        { t: "prompt", title: "Website chat assistant (free tier)", text: "Add an AI chat assistant to my plain HTML site on Cloudflare Pages.\n1) functions/api/chat.js: receives the visitor's recent messages (limit to the last 10, each under 500 characters), adds my system prompt and knowledge base (stored in a file inside functions/, not in the site), and calls Google's Gemini API with the key from context.env.GEMINI_API_KEY, using a fast Flash model. If the API fails or hits a limit, return a friendly 'I'm busy right now, please message Bisi on WhatsApp' reply. Never send the key to the browser.\n2) site/chat.js: a small chat bubble on every page (loaded by site.js) with a short notice 'Please don't share private details here', and a 'Talk to Bisi on WhatsApp' button that is always visible.\nPhone first, accessible, light. Create every file in the right folder." },
        { t: "warn", text: "On Google's free allowance, Google may use the messages sent to the API to improve its products. Tell the owner, show the “don't share private details” notice, and never let the assistant ask for sensitive information (ID numbers, health details, card or account details)." },
        { t: "figure", figure: { product: "supportagent", caption: "A website assistant answering from the knowledge base, with a “talk to a person” button." } },
        {
          t: "errors",
          items: [
            { see: "The assistant often says “I'm busy right now”", means: "The free allowance has a limit per minute and per day, and it's been reached.", fix: "That's the safe fallback working. For a busy site, move to a paid AI plan (see below)." },
            { see: "Every reply fails, with an error mentioning the key", means: "The secret is missing, misspelt, or was added after the last deployment.", fix: "Check the name is exactly `GEMINI_API_KEY`, then make a small commit so a new deployment uses it." },
          ],
        },
        { t: "upgrade", title: "Paid AI for privacy and volume", text: "When the assistant handles personal details or many visitors, switch to a paid AI plan (Gemini's paid tier, or Claude's or OpenAI's paid API). Paid plans don't use your messages to train their products and allow far more conversations. Set a monthly spending limit in the provider's console and include the cost in the client's monthly fee." },
      ],
    },
    {
      heading: "Step 6: The human handoff",
      blocks: [
        { t: "tool", slug: "handoff-script-generator", why: "Writes the handoff messages for the customer and the summary note for the owner." },
        { t: "list", items: ["Tell the customer a person is coming, and roughly when.", "Give the owner a short summary: who, what they want, what the assistant already said.", "Outside working hours: say when someone will reply, and collect their WhatsApp number."] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "robot", label: "“Let me get Bisi for you”" }, { draw: "list", label: "summary: who, what, already said" }, { draw: "whatsapp", label: "Bisi continues on WhatsApp", hot: true }] },
          caption: "A good handoff: the assistant tells the customer a person is coming, passes the owner a short summary, and the conversation continues on WhatsApp without the customer repeating anything.",
        },
        { t: "mistakes", items: [{ wrong: "A bot with no way to reach a person", right: "“Talk to Bisi” in every menu and in the website chat" }, { wrong: "Using an unofficial WhatsApp bot app", right: "The official Business app or the Business Platform only" }, { wrong: "The AI key pasted into chat.js", right: "The key as a Cloudflare secret, used only by the function" }] },
        { t: "win", title: "Bisi is open day and night", proved: "you can put a business's assistant on its website and organise its WhatsApp, safely and for free, with a person always one tap away.", cue: "Run the 20-question script on the live website chat and screenshot the results. Finish your mission for the **Always open** badge." },
      ],
    },
  ],
  task: {
    title: "Put the assistant where customers are",
    steps: ["Set up the WhatsApp Business app: profile, greeting, away message, 5 quick replies, catalog and labels.", "Design a bot conversation with the flow builder.", "(Stretch) Send a message from Meta's free test number to your own phone.", "Add the website chat assistant with a free Gemini key stored as a Cloudflare secret.", "Run the 20-question test on the website chat and test the handoff."],
    done: ["The Business app has a greeting, away message, quick replies and a catalog", "Every menu and the website chat offer a way to reach a person", "No unofficial WhatsApp tools are used", "The AI key is a Cloudflare secret, not in any page", "The website chat passes at least 18 of the 20 test questions"],
  },
  recap: [
    "Many small businesses only need the **free WhatsApp Business app** set up properly: profile, greeting, away message, quick replies, catalog and labels.",
    "After **24 hours** without a message from the customer, a business may only send **approved template messages**, and only to people who **opted in**.",
    "**Unofficial WhatsApp bots** break WhatsApp's terms and can get the business's number banned: use only the official app or the official Business Platform.",
    "A good **handoff** tells the customer a person is coming and gives the owner a summary, so nobody repeats themselves.",
    "An AI **API key lives on the server only**, as a Cloudflare secret, and the free tier's terms mean **no sensitive customer details**.",
  ],
  resources: [
    { label: "WhatsApp Business app features", url: "https://business.whatsapp.com/products/business-app", note: "Greeting and away messages, catalogs, labels." },
    { label: "WhatsApp Cloud API: get started", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started", note: "Official guide with the free test number." },
    { label: "WhatsApp Business Platform pricing", url: "https://developers.facebook.com/docs/whatsapp/pricing", note: "Check the current pricing before quoting." },
    { label: "WhatsApp Business Messaging Policy", url: "https://business.whatsapp.com/policy", note: "The rules on opt-in and messaging." },
    { label: "Gemini API: pricing and free tier", url: "https://ai.google.dev/gemini-api/docs/pricing", note: "Free allowance, limits and data terms." },
  ],
  quiz: [
    { q: "Someone offers Bisi a cheap app that “automates her normal WhatsApp”. What do you advise?", options: ["Install it today", "Don't: unofficial bots break WhatsApp's terms and can get her main number banned", "Use it only at night", "Use it for promotions only"], answer: 1, why: "Only the official Business app or the Business Platform are safe for a business number.", from: 2, aim: "core" },
    { q: "What do many small businesses really need first on WhatsApp?", options: ["A custom AI platform", "The free WhatsApp Business app, set up properly", "An unofficial bot", "A second phone"], answer: 1, why: "Profile, greeting, away message, quick replies and a catalog solve a lot. It's a cheap, quick item to include in your packages.", from: 0, aim: "proposals-pricing" },
    { q: "A customer last messaged 30 hours ago. What may a business on the Platform send her?", options: ["Anything it likes", "Only an approved template, and only if she opted in", "Nothing ever again", "A voice note"], answer: 1, why: "That's the 24-hour rule. Tomorrow's reminder messages are designed to respect it.", from: 1, aim: "connect-the-system" },
    { q: "What makes a good handoff?", options: ["The customer repeats everything", "The customer is told a person is coming, and the owner gets a summary", "Ending the chat", "Sending a sticker"], answer: 1, why: "No repeating yourself: that's what builds trust. Tomorrow, handoffs also update the customer list.", from: 3, aim: "connect-the-system" },
    { q: "Where does the Gemini API key for the website assistant live?", options: ["In chat.js, so it works faster", "Only on the server, as a Cloudflare secret", "In the WhatsApp greeting", "In the sitemap"], answer: 1, why: "Keys in a page can be copied and abused. On Day 19 you'll add spending limits as a second protection.", from: 4, aim: "monitoring-handover" },
  ],
  celebrate: {
    title: "Day 17 complete: open day and night",
    proved: "You can organise a business's WhatsApp and put a safe, free AI assistant on its website, with a person always one tap away.",
    badge: "Always open",
    badgeDesc: "Set up WhatsApp Business and a website assistant",
  },
};

export default lesson;
