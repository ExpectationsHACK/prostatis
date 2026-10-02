import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "build-business-site",
  title: "Build the full business website",
  minutes: 130,
  outcome: "Bisi's complete five-page website live on the internet (Home, Services, About, Gallery, Contact) with one shared menu and footer, WhatsApp buttons that open a chat with the message already typed, and a contact form whose messages really arrive in her email.",
  intro:
    "Yesterday you built one page. Today you build the whole website: the five pages almost every small business needs. Bisi wants customers to see her prices before they ask, see real outfits she has made, meet the real Bisi, and reach her in one tap. You'll also learn the most important habit of building with AI: **small steps, checked one at a time**. Professionals never ask for “the whole website” in one message, and by the end of today you'll see why.",
  core: "Build in small, checked steps: shared parts first, then one page at a time, testing each on a phone before moving to the next.",
  youNeed: [
    "Your `bisi-project` folder and live address from Day 3",
    "Real information from the owner: services, starting prices, address, opening hours, WhatsApp number",
    "3 to 10 real photos if you can get them (labelled boxes are fine for now)",
    "An email address the owner checks every day (for the contact form)",
  ],
  sections: [
    {
      heading: "The five pages every small business needs",
      blocks: [
        { t: "table", columns: ["Page", "Its job", "Must include"], rows: [["Home", "Explain the offer in 5 seconds", "The promise, proof, a summary of services, one main button"], ["Services (or Menu)", "Show what's for sale", "Each service, a starting price, and a button"], ["About", "Build trust", "A real photo, the story, why this business is different"], ["Gallery (or Our work)", "Show proof", "Real photos of real work"], ["Contact", "Make it easy to reach", "WhatsApp, phone, a form, the address with a map link, opening hours"]] },
        { t: "p", text: "Each page is its own file in the `site` folder: `index.html` (Home), `services.html`, `about.html`, `gallery.html` and `contact.html`. Their names become part of the web address: stitches-by-bisi.pages.dev/services." },
        { t: "figure", figure: { product: "restaurant", caption: "A small business website: services with prices, ordering on WhatsApp, and a clear contact page." } },
      ],
    },
    {
      heading: "The golden rule: small steps",
      blocks: [
        { t: "p", text: "Ask AI for the whole website in one message and you'll get something that looks fine at first, with dozens of small problems tangled together inside. Professionals work like this:" },
        {
          t: "steps",
          items: [
            { title: "Shared parts first", detail: "The menu at the top and the footer at the bottom, which appear on every page." },
            { title: "One page at a time", detail: "Build a page, open it, check it at phone width, fix it, then move on." },
            { title: "Deploy when checked", detail: "Upload the `site` folder once a page works, and check it again on a real phone." },
          ],
        },
        {
          t: "define",
          term: "Component",
          like: "an adire stamp. The dyer carves the pattern once, then stamps it on every piece of cloth. Fix the stamp, and every new print is fixed.",
          meaning: "A reusable building block of a website, like the menu at the top or the footer at the bottom. Built once, used on every page. Change it once and it changes everywhere.",
        },
        {
          t: "define",
          term: "JavaScript",
          also: ["JS"],
          like: "the wiring in a building. The walls (HTML) and paint (CSS) just stand there; the wiring is what makes the light come on and the fan turn when you press a switch.",
          meaning: "The language that makes a page **do** things: open the menu when you tap it, check a form before sending, put the same menu on every page. Its files end in .js. Your AI builder writes it.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Menu typed on every page", nodes: [{ draw: "page", label: "5 copies of the menu" }, { draw: "cross", label: "5 places to fix" }] },
            right: { title: "Menu as a component", nodes: [{ draw: "stamp", label: "site.js: made once", hot: true }, { draw: "check", label: "fix it once, done" }] },
          },
          caption: "Without a component, adding “Prices” to the menu means editing five pages (and forgetting one). With the menu in one shared file, like an adire stamp, you change it once.",
        },
        { t: "tool", slug: "component-prompt-library", why: "Copy-ready prompts for menus, footers, service cards, galleries, price lists and forms." },
      ],
    },
    {
      heading: "Step 1: Build the shared parts",
      blocks: [
        { t: "p", text: "Start a new conversation with your builder and send this prompt. It creates three files: the shared look, the shared menu and footer, and an updated home page that uses them." },
        { t: "prompt", title: "Shared look, menu and footer", text: "Read the project brief first and follow it.\n\nI'm building a 5-page website as plain HTML, CSS and JavaScript files (no frameworks, no build tools). Pages: index.html, services.html, about.html, gallery.html, contact.html. Please create:\n1) styles.css with the whole shared look from the brief (colours, Google Fonts, buttons, cards, spacing), phone first.\n2) site.js that inserts the same header and footer on every page: the header has the business name on the left, links to the 5 pages, and an 'Order on WhatsApp' button; on phones the links hide behind a menu button that opens and closes. The footer has the address, opening hours, phone, WhatsApp and Instagram links. The current page's link is highlighted.\n3) A new index.html that uses styles.css and site.js, keeping my home page content.\nSave them in the site folder. Then list the files you created and tell me in one line how each page includes the two shared files." },
        {
          t: "builder",
          title: "Get the three files into your site folder",
          antigravity: [
            { title: "Approve the plan", detail: "Read the Implementation Plan in the side panel. It should mention styles.css, site.js and index.html. Click **Proceed**." },
            { title: "Check the files exist", detail: "In the Walkthrough or the IDE's file list, `site` now holds `styles.css`, `site.js` and the new `index.html`." },
            { title: "Check it in the browser", detail: "Open (or refresh) `index.html` from your `site` folder. The menu, footer and colours should all appear." },
          ],
          claudeCode: [
            { title: "Approve the three files", detail: "Claude shows each new or changed file. Approve them one by one if they match the request." },
            { title: "Check it in the browser", detail: "Ask Claude to open `site/index.html` in the preview, or double-click it in your `site` folder. The menu, footer and colours should all appear." },
          ],
          chat: [
            { title: "Create the two new files", detail: "In VS Code, click the `site` folder, then **New File**. Make `styles.css`, paste its code, save. Make `site.js`, paste its code, save." },
            { title: "Replace the home page", detail: "Open `index.html`, select all (**Ctrl+A** / **Cmd+A**), paste the new version, save." },
            { title: "Check it in the browser", detail: "Open `index.html` in the browser (or refresh it). The menu, footer and colours should all appear." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "The page shows plain black text on white, no colours", means: "The page can't find `styles.css`: the name is spelt differently, or it's saved outside `site`.", fix: "Check the file is exactly `styles.css`, inside `site`, next to `index.html`. Then refresh." },
            { see: "The menu button does nothing when you tap it", means: "`site.js` isn't saved, isn't in `site`, or the page doesn't load it.", fix: "Tell your builder: “The menu button doesn't open on my page. Check site.js and index.html and fix it.” (Free chat: paste both files with that message.)" },
          ],
        },
        { t: "try", title: "Check it like a customer", minutes: 5, steps: ["Make the browser window narrow, like a phone.", "Tap the menu button: do the links appear? Tap it again: do they close?", "Click each link. They'll show “file not found” for now, because those pages don't exist yet. That's expected."] },
      ],
    },
    {
      heading: "Step 2: Build the pages one by one",
      blocks: [
        { t: "p", text: "A coding agent can see every file in your folder, so new pages automatically match the shared files. (Free chat: stay in the same chat while it's going well; in a new chat, paste the brief, then `styles.css` and `site.js`, and say “use these shared files”.)" },
        { t: "prompt", title: "One page at a time", text: "Now create site/services.html using the same styles.css and site.js. Services (use exactly these, they're from the owner): [list each service with a one-line description and its starting price in naira, e.g. Corporate gown, from ₦25,000]. Show each service as a card with an 'Order on WhatsApp' button that opens WhatsApp with the message: 'Hi Bisi, I'd like to order a [service name]'. Phone first. Don't change the shared files." },
        { t: "p", text: "Check it, then do **About**, **Gallery** and **Contact** the same way, one at a time. Replace any [placeholder] with the owner's real words and photos as soon as you have them." },
        { t: "tip", text: "Photos: ask the owner for real ones, such as finished outfits, the shop front, the owner at work. Put them in a folder `site/images`. For placeholders, free photos from **Unsplash** or **Pexels** are allowed. Never take photos from Google Images or another business's page." },
        { t: "later", lesson: "responsive-fast-accessible", text: "use the photos as they are. On Day 6 you'll shrink each one so the site loads fast on mobile data, without it looking any different." },
        {
          t: "scenario",
          title: "The gallery that sells",
          text: "Bisi's first gallery had six nice stock photos of models. When she replaced them with six real photos (her customers in their outfits, her cutting table, her signboard), something changed in her chats: customers started saying “I saw the green boubou on your website”. Real photos answer the silent question every visitor asks: “Is this business real?” (An illustration, but owners see this pattern again and again.)",
        },
      ],
    },
    {
      heading: "Step 3: WhatsApp buttons with the message ready",
      blocks: [
        { t: "p", text: "Most Nigerian customers would rather chat on WhatsApp than fill a form. A WhatsApp link opens a chat with the business, with a message already typed." },
        { t: "figure", figure: { diagram: "phone-number", caption: "Turning a written Nigerian number into a WhatsApp link." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "phone", label: "0803 123 4567" }, { draw: "scissors", label: "drop the 0, add 234" }, { draw: "chain", label: "wa.me/2348031234567", hot: true }, { draw: "whatsapp", label: "chat opens, message typed" }], arrows: ["", "no + or spaces", "tap"] },
          caption: "From a phone number to a WhatsApp button: remove the first 0, put 234 in front, no plus sign and no spaces, then add the message you want typed.",
        },
        { t: "code", lang: "text", text: "https://wa.me/2348031234567?text=Hi%20Bisi%2C%20I%27d%20like%20to%20order" },
        { t: "list", items: ["`234` is Nigeria's country code. Put it in front and **drop the first 0** of the number.", "**No plus sign, no spaces** in the link.", "`?text=` adds the ready-typed message. Spaces become `%20`; the AI converts it for you."] },
        { t: "check", q: "The business number is 0816 555 1234. Which link is correct?", options: ["https://wa.me/08165551234", "https://wa.me/+2348165551234", "https://wa.me/2348165551234", "https://whatsapp.com/08165551234"], answer: 2, why: "Country code 234, drop the first 0, no plus sign, no spaces." },
        {
          t: "builder",
          title: "Put the real number in every page at once",
          antigravity: [
            { title: "Ask for it in one message", detail: "“Replace the placeholder WhatsApp number 2348000000000 with 2348031234567 in every file in site. List the files you changed.” (Use the owner's real number.)" },
            { title: "Check the list", detail: "Read the walkthrough: every page with a WhatsApp button should be on the list." },
          ],
          claudeCode: [
            { title: "Ask for it in one message", detail: "“Replace the placeholder WhatsApp number 2348000000000 with 2348031234567 in every file in site. List the files you changed.”" },
            { title: "Approve the changes", detail: "Check each change shows the new number, then approve." },
          ],
          chat: [
            { title: "Open Replace in Files", detail: "In VS Code: **Edit** → **Replace in Files** (or **Ctrl+Shift+H**, Mac **Cmd+Shift+H**)." },
            { title: "Fill the two boxes", detail: "Top box: the placeholder `2348000000000`. Bottom box: the owner's number, e.g. `2348031234567`." },
            { title: "Replace all and save", detail: "Click **Replace All** (the icon to the right of the bottom box) and confirm. Then **File** → **Save All**." },
          ],
        },
        { t: "try", title: "Test a WhatsApp link with your own number", minutes: 3, steps: ["Write your own number in wa.me format, e.g. `wa.me/2348031234567`.", "Paste it into your phone's browser and open it.", "WhatsApp should open a chat with yourself. That proves the format is right."] },
      ],
    },
    {
      heading: "Step 4: A contact form that really delivers",
      blocks: [
        {
          t: "define",
          term: "Form service",
          like: "a post office box. Customers drop their letters in, and the post office delivers them to the owner's address.",
          meaning: "A company that receives what visitors type into your form and emails it to the business owner. We use **Web3Forms**: its free plan delivers 250 messages a month and needs no account login.",
        },
        { t: "p", text: "A form that looks nice but sends messages nowhere is one of the most common beginner mistakes: the owner never hears from those customers. A form service is the simple, free fix." },
        {
          t: "define",
          term: "Access key",
          like: "a PO box number printed on an envelope. Anyone can see it; it only gets letters to the right box, it can't open the box or read the mail.",
          meaning: "A code that tells Web3Forms which owner a form belongs to. It's **designed to sit in your page** where anyone can see it: it only lets visitors send messages to the owner. (Other keys you'll meet on Day 9 are private and must never go in a page.)",
        },
        {
          t: "steps",
          items: [
            { title: "Get the access key", detail: "Go to `web3forms.com` and find **Create your Access Key**. Type the **owner's** email address (so messages reach them) and submit." },
            { title: "Open the owner's inbox", detail: "Web3Forms sends an email with the access key (a long code with dashes). Copy it. Not there after 2 minutes? Check Spam." },
            { title: "Ask your builder for the form", detail: "Use the prompt below with the key in place, then review the new `contact.html` and `thanks.html`." },
          ],
        },
        { t: "prompt", title: "A form that delivers", text: "Add a contact form to site/contact.html (keep the shared files). Fields: name, phone, and message, all required, with visible labels. Send it to Web3Forms: form action https://api.web3forms.com/submit, method POST, a hidden input access_key with the value [PASTE ACCESS KEY], a hidden subject 'New enquiry from the website', and a hidden checkbox named botcheck for spam protection. After sending, redirect to a new page thanks.html (create it in site, matching the site, with a 'Back to home' button and an 'Order on WhatsApp' button)." },
        { t: "figure", figure: { diagram: "form-flow", caption: "Visitor → form service → owner's email → owner replies." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "customer fills the form" }, { draw: "envelope", label: "Web3Forms delivers it" }, { draw: "phone", label: "lands in Bisi's email", hot: true }, { draw: "whatsapp", label: "Bisi replies" }] },
          caption: "The form's journey: the customer types, the form service carries the message like the post office, it lands in Bisi's inbox, and she replies the same day.",
        },
        { t: "warn", text: "Always test the form yourself after it's live: fill it in from your phone, then check the owner's inbox **and Spam folder**. Only tell the owner it works when a real test message has arrived." },
        {
          t: "errors",
          items: [
            { see: "The thank-you page shows, but no email arrives", means: "The message went to Spam, or the access key belongs to a different email.", fix: "Check Spam and mark it “Not spam”. Then check the key in `contact.html` is the one sent to the owner's email." },
            { see: "“Invalid access key” or an error page from Web3Forms", means: "The key was copied incompletely or with a space.", fix: "Copy it again from the email and paste it exactly between the quotation marks." },
          ],
        },
        { t: "upgrade", title: "More than 250 messages a month", text: "If a business gets more than 250 form messages a month, Web3Forms' paid plans raise the limit. By then the website is clearly bringing in customers, so it's an easy cost to justify to the owner." },
      ],
    },
    {
      heading: "Step 5: Publish and test like a customer",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Deploy the new version", detail: "Cloudflare → **Workers & Pages** → your project → **Create deployment** → drag the `site` folder → **Save and Deploy**." },
            { title: "Test on your phone", detail: "Open your `.pages.dev` address on your phone. Tap every menu link, every WhatsApp button, and send the form." },
            { title: "Check the inbox", detail: "Open the owner's email (or ask them to look). Did your test message arrive?" },
          ],
        },
        { t: "win", title: "The first enquiry landed in the inbox", proved: "your website can carry a customer's message straight to the owner's email, day or night, with nobody watching.", cue: "Screenshot the email: it's proof of your work for later. Finish the mission to collect the **Site builder** badge." },
        { t: "p", text: "**When something breaks**, don't change things at random. Tell your builder exactly what you see, what you expected, and which file is involved (free chat: paste that file)." },
        { t: "tool", slug: "debug-prompt-template", why: "Builds a clear “here's what's wrong” message with the error, what you expected and what you tried: the fastest way to a fix." },
        {
          t: "errors",
          items: [
            { see: "Clicking a menu link shows “404” or “Not found”", means: "The link points to a name that doesn't match the file, e.g. `Services.html` vs `services.html`.", fix: "Make every file name small letters, and make the links in `site.js` match exactly. Deploy again." },
          ],
        },
        { t: "mistakes", items: [{ wrong: "“It's not working, fix it”", right: "“When I tap Send I see the Web3Forms error page. I expected thanks.html. Please check contact.html.”" }, { wrong: "Changing five things at once hoping one works", right: "One change, test, then the next" }, { wrong: "Giving up and starting a new site", right: "Rolling back to the last good version in Cloudflare and trying again from there" }] },
      ],
    },
  ],
  task: {
    title: "Build and publish the full five-page site",
    steps: ["Build the shared `styles.css` and `site.js` and the updated home page.", "Build Services, About, Gallery and Contact, one at a time, checking each at phone width.", "Put the owner's real WhatsApp number in every link with Replace in Files.", "Add the Web3Forms contact form and the thank-you page.", "Deploy, then test every link, button and the form on your phone."],
    done: ["All 5 pages open from the menu on my phone", "Every WhatsApp button opens a chat with the right number and a ready message", "A test form message arrived in the owner's inbox", "Nothing scrolls sideways on my phone", "The live site is the latest version on Cloudflare"],
  },
  recap: [
    "Build in **small, checked steps**: shared parts first, then one page at a time, testing each at phone width before moving on.",
    "A **component**, like the menu in `site.js`, is made once and used on every page: change it in one file and every page changes.",
    "A WhatsApp link uses **234 and drops the first 0**, with no plus sign or spaces: 0803… becomes `wa.me/234803…`.",
    "A form only works when **a real test message arrives** in the owner's inbox (check Spam too).",
    "Web3Forms' **access key is safe to show** in a page because it only lets visitors send messages; **private keys and passwords never go in a page**.",
    "When something breaks, give the AI **exactly what you see**, what you expected, and the file involved.",
  ],
  resources: [
    { label: "Web3Forms documentation", url: "https://docs.web3forms.com", note: "Official guide: access keys, spam protection, redirects." },
    { label: "WhatsApp: click to chat", url: "https://faq.whatsapp.com/5913398998672934", note: "Official guide to wa.me links." },
    { label: "MDN: Web forms", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms", note: "How forms work, in plain language." },
    { label: "VS Code: search and replace across files", url: "https://code.visualstudio.com/docs/editing/codebasics#_search-across-files", note: "The Replace in Files feature, officially explained." },
    { label: "Unsplash", url: "https://unsplash.com", note: "Free photos you may use as placeholders." },
  ],
  quiz: [
    { q: "What's the best way to build a five-page site with AI?", options: ["One giant message asking for everything", "Small steps: shared parts first, then one page at a time, checking each on a phone", "Copy another business's site", "Build it all and look only at the end"], answer: 1, why: "Small, checked steps catch problems early, while they're easy to fix.", from: 0, aim: "core" },
    { q: "Bisi wants “Prices” added to the menu on all five pages. With the shared `site.js` component, how many files do you change?", options: ["Five, one per page", "One: the component file site.js", "None, it updates itself", "Ten"], answer: 1, why: "That's the point of a component. On Day 5 you'll build a page that deliberately leaves the menu out.", from: 1, aim: "landing-pages" },
    { q: "What is the correct WhatsApp link for 0801 234 5678?", options: ["https://wa.me/08012345678", "https://wa.me/+2348012345678", "https://wa.me/2348012345678", "https://whatsapp.com/08012345678"], answer: 2, why: "Use 234 and drop the first 0, no plus sign. You'll use the same format for booking reminders on Day 8.", from: 2, aim: "booking-systems" },
    { q: "How do you know the contact form really works?", options: ["It looks nice", "The AI said so", "A real test message arrived in the owner's inbox", "There's a Send button"], answer: 2, why: "Only a real test proves delivery. It's on your handover checklist for every client.", from: 3, aim: "deliver-get-paid" },
    { q: "Which of these is safe to put inside a page anyone can see?", options: ["A Web3Forms access key", "A payment company's private key", "The owner's email password", "Your Cloudflare password"], answer: 0, why: "The access key only lets visitors send messages; private keys and passwords never go in a page. On Day 9 you'll meet a private payment key and keep it hidden.", from: 4, aim: "online-store-paystack" },
  ],
  celebrate: {
    title: "Day 4 complete: Bisi has a real website",
    proved: "You can build and publish a complete five-page business website, with working WhatsApp buttons and a form that delivers, using only free tools.",
    badge: "Site builder",
    badgeDesc: "Published a full five-page website",
  },
};

export default lesson;
