import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deploy-domain",
  title: "Go live properly: auto-updates, visitors & domains",
  minutes: 120,
  outcome: "Bisi's site stored on GitHub with every version kept, updating itself on Cloudflare every time you save a change online, free visitor counts switched on, and a tested step-by-step plan to connect her own domain the day she buys one.",
  intro:
    "Bisi has three new requests. “Can you change my prices without uploading everything again?” “How many people actually visit?” And: “Can my address be stitchesbybisi.com.ng?” Today you answer all three. You'll move the site to **GitHub**, a free service that keeps every version of your files, and connect it to Cloudflare so every change goes live by itself. You'll switch on free visitor counts. And you'll learn the full procedure for connecting a business's own domain. The domain itself is the business's cost, bought in Bisi's name; everything else today is free, and you can finish the whole lesson without buying anything.",
  core: "Once your site is on GitHub and connected to Cloudflare, every change you save online goes live by itself, with every earlier version kept.",
  youNeed: ["Your `site` folder and your Cloudflare account", "An email address for a free GitHub account", "Optional: a domain the business has bought in its own name (you can finish the lesson without one)", "About 2 hours"],
  sections: [
    {
      heading: "Step 1: Put the site on GitHub",
      blocks: [
        {
          t: "define",
          term: "Repository",
          also: ["Repo"],
          like: "a family photo album that keeps a dated photo of the house at every stage of building, from foundation to roof.",
          meaning: "Your project's home on GitHub: all the website's files **plus every saved version** of them. Often shortened to **repo**.",
        },
        {
          t: "define",
          term: "Commit",
          also: ["Git"],
          like: "signing and dating each new version of an agreement. Anyone can see what changed, who changed it and when, and go back to any earlier page.",
          meaning: "One saved version of your files on GitHub, with a short note about what changed, like “Update prices”. GitHub is built on a tool called **Git**, which is where the word comes from. You can always go back to any commit.",
        },
        {
          t: "steps",
          items: [
            { title: "Create a free GitHub account", detail: "Go to `github.com` and click **Sign up**. Enter your email, a strong password and a username. Choose a professional username (your name, not a nickname): clients may see it." },
            { title: "Prove you're a person", detail: "GitHub shows a small puzzle. Solve it, then type the code GitHub emails you. If asked, choose the **Free** plan and skip the questions." },
            { title: "Create the repository", detail: "Click the **+** at the top right → **New repository**. Name it `stitches-by-bisi`. Choose **Private** (only you see the files; the website itself stays public). Leave **Add a README** unticked. Click **Create repository**." },
            { title: "Upload the site folder", detail: "On the new, empty page, click the link **uploading an existing file**. Open `bisi-project` on your computer and drag the **`site` folder itself** onto the GitHub page (not `notes`). Everything inside it, including `images`, comes along." },
            { title: "Make your first commit", detail: "When the files finish uploading, type a note in the box under **Commit changes**: “First version of the site”. Click the green **Commit changes** button." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "You see `index.html` at the top instead of a `site` folder", means: "You dragged the files inside `site` rather than the folder itself.", fix: "That works too: in Step 2, leave the build output directory empty. (On Day 9 you'll add a folder beside `site`, so the folder layout is a little tidier.)" },
            { see: "“Yowza, that's a lot of files” or an upload limit message", means: "GitHub's web upload takes up to 100 files at a time.", fix: "Upload in two batches, committing each one." },
          ],
        },
        { t: "warn", text: "Never upload passwords, private notes or secret codes to GitHub, even in a private repository. Your `notes` folder stays on your computer. If something private is ever uploaded by mistake, change that password straight away." },
      ],
    },
    {
      heading: "Step 2: Connect GitHub to Cloudflare",
      blocks: [
        { t: "p", text: "Your Day 3 project was made by dragging files, and Cloudflare can't switch a dragged project to GitHub. So you'll create a new, GitHub-connected project. If you want to keep the same address, first delete the old project: **Workers & Pages** → old project → **Settings** → **Delete project**." },
        {
          t: "steps",
          items: [
            { title: "Start a new project", detail: "Cloudflare → **Workers & Pages** → **Create application** → choose **Pages** → **Import an existing Git repository** (it may say **Connect to Git**)." },
            { title: "Connect GitHub", detail: "Click **Connect GitHub**. A GitHub window opens: choose **Only select repositories**, pick `stitches-by-bisi`, then **Install & Authorize**." },
            { title: "Pick the repository", detail: "Back in Cloudflare, select `stitches-by-bisi` and click **Begin setup**." },
            { title: "Set up the build", detail: "Project name: `stitches-by-bisi`. Production branch: leave it as **main**. Framework preset: **None**. Build command: **leave it empty**. Build output directory: type **`site`** (the folder that holds `index.html`)." },
            { title: "Deploy", detail: "Click **Save and Deploy**. Watch the log for a minute until it says **Success**, then open the `.pages.dev` link." },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "page", label: "change a file on GitHub" }, { draw: "stamp", label: "commit: a dated version" }, { draw: "rocket", label: "Cloudflare updates the site" }, { draw: "phone", label: "live in a minute", hot: true }], loop: "every change, kept forever" },
          caption: "How the site runs from now on: change a file, commit it with a note, Cloudflare rebuilds the live site by itself, and customers see it within a minute. Every version stays in the album.",
        },
        { t: "figure", figure: { diagram: "git-flow", caption: "Edit → commit → GitHub → Cloudflare updates the live site. Every time." } },
      ],
    },
    {
      heading: "Step 3: Change something and watch it go live",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Small change, right on GitHub", detail: "In your repository, open the `site` folder and click `services.html`, then the **pencil icon** (Edit this file). Change one price. Click **Commit changes…**, type a note like “Update corporate gown price” and confirm." },
            { title: "Watch Cloudflare", detail: "Cloudflare → your project → **Deployments**. A new one appears, **In progress**, then **Success**, usually within a minute." },
            { title: "Check the live site", detail: "Open your address on your phone and refresh. The new price is there." },
            { title: "Bigger changes from your builder", detail: "Make and check them on your computer first. Then in GitHub, open the `site` folder → **Add file** → **Upload files** → drag the changed files in. Files with the same name are replaced. Commit with a note." },
            { title: "See the history", detail: "On the repository page, click the **commits** link (with a clock icon). Every change is listed with its date and note. Click one to see what changed: red lines were removed, green lines added." },
          ],
        },
        { t: "try", title: "Time the auto-update", minutes: 5, steps: ["On GitHub, change one word in `site/index.html` and commit, noting the time.", "Keep refreshing the live site on your phone.", "How many seconds until the new word appears? That's how fast every future change will go live."] },
        { t: "tip", text: "Keep one rule so your computer and GitHub never disagree: **make every change on your computer first (with your builder), then upload it to GitHub**. If you'd like a one-click way to upload changes, the free **GitHub Desktop** app does exactly that." },
        { t: "check", q: "Bisi changed the gallery last Tuesday and it broke. What's the quickest safe fix?", options: ["Rebuild the whole website", "Go back to the version before Tuesday: GitHub and Cloudflare keep every earlier version", "Delete the gallery for good", "Buy a new domain"], answer: 1, why: "Every commit and every deployment is kept. Roll back in Cloudflare's Deployments list, or re-upload the old file from the commit history." },
        { t: "win", title: "Your site now updates itself", proved: "you can run a website the way professionals do: every change saved as a dated version, live within minutes, and nothing ever lost.", cue: "Send Bisi the new link and change one real price together on a call. Finish the mission for the **Auto-pilot publisher** badge." },
      ],
    },
    {
      heading: "Step 4: Count the visitors (free)",
      blocks: [
        {
          t: "define",
          term: "Analytics",
          like: "the visitors' book at an estate gate, except it fills itself in and never asks anyone for their name.",
          meaning: "A tool that counts visits: how many people came, which pages they opened, and roughly which country and device. Cloudflare's **Web Analytics** is free and counts without tracking people with cookies.",
        },
        {
          t: "steps",
          items: [
            { title: "Switch it on", detail: "Cloudflare → your project → **Metrics** → under **Web Analytics**, click **Enable**." },
            { title: "Make a new version", detail: "It starts working from the next deployment. Make any small commit (even fixing a word) so a new deployment runs." },
            { title: "Visit and check", detail: "Open the site on your phone, wait a few minutes, then look at **Web Analytics** in Cloudflare. You'll see yourself counted." },
          ],
        },
        { t: "tip", text: "Make it a habit: on the first of each month, screenshot the visitor numbers and send them to the owner with one line, “242 people visited, most from Instagram”. Owners who see results keep paying for care." },
      ],
    },
    {
      heading: "Step 5: Connect the business's own domain",
      blocks: [
        { t: "p", text: "A free `.pages.dev` address works perfectly. Many businesses still want their own name, like stitchesbybisi.com.ng: it's easier to say, prints nicely on a flyer, and looks established. Here's the whole procedure, so you can do it calmly the first time a client buys one." },
        {
          t: "define",
          term: "Registrar",
          like: "the land registry: you register a plot in your name and renew the papers every year, or you lose it.",
          meaning: "A company that sells and renews domains. **.ng** and **.com.ng** domains are sold by registrars accredited by **NiRA**, Nigeria's domain authority (for example Whogohost); **.com** domains by companies like Namecheap or Cloudflare. Prices change, so compare the **renewal** price, not just the first year.",
        },
        {
          t: "define",
          term: "DNS",
          like: "the address book at an estate gate. You tell the gateman “Stitches by Bisi” and he points you to Block C, House 4.",
          meaning: "The internet's address book. When someone types a domain, DNS tells their phone which hosting computer has the website.",
        },
        {
          t: "define",
          term: "Nameserver",
          like: "the estate management office that keeps the address book. Whoever runs that office decides what's written in it.",
          meaning: "The company that keeps a domain's DNS address book. To connect a domain to Cloudflare, you tell the registrar to use **Cloudflare's two nameservers**.",
        },
        {
          t: "define",
          term: "DNS record",
          also: ["CNAME record"],
          like: "one line in the estate's address book: “Stitches by Bisi → Block C, House 4”.",
          meaning: "One entry in DNS, such as a **CNAME record** that points a name to an address. Once the domain uses Cloudflare's nameservers, Cloudflare creates the right records for you.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "types stitchesbybisi.com.ng" }, { draw: "book", label: "DNS: the address book" }, { draw: "shop", label: "Cloudflare hosting" }, { draw: "phone", label: "Bisi's site appears", hot: true }] },
          caption: "What happens in the second after someone types a domain: DNS looks it up like the estate gateman's book, points to Cloudflare, and the site appears on their phone.",
        },
        {
          t: "steps",
          items: [
            { title: "The owner buys the domain, in their name", detail: "Sit with the owner (or on a call) while they buy it at a registrar with **their** name, email and card. You never hold a client's domain." },
            { title: "Add the domain to Cloudflare", detail: "In Cloudflare, go to the account home and click **Add a domain** (it may say **Add a site**). Type the domain, choose the **Free** plan, and continue through the screens." },
            { title: "Copy Cloudflare's two nameservers", detail: "Cloudflare shows two names ending in `ns.cloudflare.com`. Copy both exactly." },
            { title: "Paste them at the registrar", detail: "In the registrar's dashboard, open the domain → **Nameservers** → choose **custom nameservers**. Delete the old ones, paste Cloudflare's two, and save." },
            { title: "Wait for the “active” email", detail: "Cloudflare emails the owner when the domain is active. It can take from a few minutes to 48 hours." },
            { title: "Attach it to the website", detail: "Cloudflare → **Workers & Pages** → your project → **Custom domains** → **Set up a domain** → type the domain → **Continue** → **Activate domain**. Do the same for the `www.` version." },
          ],
        },
        {
          t: "define",
          term: "HTTPS",
          also: ["SSL"],
          like: "a sealed envelope instead of a postcard: the postman carries it, but nobody on the way can read it.",
          meaning: "The secure version of a web address, shown by the **padlock** in the browser. Cloudflare switches it on for free once the domain is attached. You may also hear it called **SSL**.",
        },
        {
          t: "define",
          term: "Propagation",
          like: "news of a shop's new address spreading through a big market: some traders hear in minutes, others by evening.",
          meaning: "The time a DNS change takes to reach every network, from a few minutes up to 48 hours. During that time some phones see the old address and some the new. Wait; don't keep changing things.",
        },
        {
          t: "errors",
          items: [
            { see: "Cloudflare says “Pending nameserver update”", means: "The registrar still has the old nameservers, or the change hasn't spread yet.", fix: "Check the registrar shows only Cloudflare's two names. Then wait; you can't hurry it." },
            { see: "“Error 522” on the domain", means: "The domain was pointed by hand before it was attached in **Custom domains**.", fix: "Remove the hand-made record in Cloudflare's DNS page and attach the domain with **Set up a domain** instead." },
            { see: "“Not secure” for the first hour", means: "Cloudflare is still issuing the padlock certificate.", fix: "Wait up to an hour. If it's still there tomorrow, open **Custom domains** and check the status." },
          ],
        },
        {
          t: "scenario",
          title: "The domain that “didn't work”",
          text: "Picture this common first-time mistake: a developer connects a client's new .com.ng domain, refreshes after five minutes, sees nothing, and changes the nameservers three more times. Each change restarts the wait. When the correct settings are finally left alone, the padlock appears a few hours later. Set it up once, carefully, then be patient.",
        },
        { t: "check", q: "You attached the client's domain 10 minutes ago and it doesn't open yet. What's the most likely reason?", options: ["You broke everything", "DNS changes can take from minutes up to 48 hours to spread", "Cloudflare is closed today", "Domains need a week"], answer: 1, why: "Propagation takes time. Check again later before changing anything." },
        { t: "warn", text: "Register a client's domain in the **client's name and email**. It's their business asset. Holding a client's domain hostage destroys trust and your reputation." },
        { t: "figure", figure: { diagram: "handover", caption: "The client owns the accounts; you're added as a helper." } },
        { t: "tip", text: "A free bonus once the domain is on Cloudflare: **Email Routing** (in the domain's menu) can forward hello@stitchesbybisi.com.ng to Bisi's Gmail. A professional email address, at no cost." },
        { t: "tool", slug: "domain-name-generator", why: "Generates short, sayable name ideas and checks live whether each one is available, to discuss with the owner." },
        { t: "mistakes", items: [{ wrong: "Buying a client's domain with your own card, in your name", right: "The client buys it in their name; you guide them" }, { wrong: "Changing the nameservers again after 10 minutes because “it's not working”", right: "Waiting: propagation can take up to 48 hours" }, { wrong: "Uploading the `notes` folder to GitHub", right: "Only the website's files go to GitHub" }] },
      ],
    },
  ],
  task: {
    title: "Go live properly",
    steps: ["Create a GitHub account and a private repository; upload the site's files and commit.", "Create a GitHub-connected Cloudflare project and deploy it.", "Change one price on GitHub and watch it go live by itself.", "Switch on Cloudflare Web Analytics and see yourself counted.", "Write the domain procedure into your notes (or, if the business has a domain, connect it and check the padlock)."],
    done: ["My site's files are in a private GitHub repository", "A commit on GitHub updates the live site by itself", "I can find and open an earlier version in the commit history", "Web Analytics is switched on", "No passwords or private notes are on GitHub"],
  },
  recap: [
    "Once the site is on **GitHub** and connected to Cloudflare, **every commit goes live by itself**, usually within a minute.",
    "A **commit** is a saved, dated version with a note; the **repository** keeps every version, so you can always go back.",
    "**DNS** is the internet's address book: it points a domain to the hosting. Changes take **minutes up to 48 hours** to spread, so wait before changing anything again.",
    "A client's domain is bought and owned **by the client, in their own name**; you're added as a helper.",
    "**Never upload passwords or private notes** to GitHub, even in a private repository.",
    "Cloudflare **Web Analytics is free** and counts visits without tracking people with cookies.",
  ],
  resources: [
    { label: "Cloudflare Pages: Git integration", url: "https://developers.cloudflare.com/pages/configuration/git-integration/", note: "Official guide to connecting GitHub." },
    { label: "Cloudflare Pages: custom domains", url: "https://developers.cloudflare.com/pages/configuration/custom-domains/", note: "Official steps for attaching a domain." },
    { label: "GitHub Docs: uploading files", url: "https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository", note: "Uploading and committing in the browser." },
    { label: "Cloudflare Web Analytics", url: "https://developers.cloudflare.com/pages/how-to/web-analytics/", note: "Switching on free visitor counts." },
    { label: "NiRA", url: "https://nira.org.ng", note: "Nigeria's domain authority: lists accredited .ng registrars." },
    { label: "GitHub Desktop", url: "https://desktop.github.com", note: "Optional free app: upload changes with one click." },
  ],
  quiz: [
    { q: "You change a price in `services.html` on GitHub and commit. What happens next?", options: ["Nothing until you upload the whole site again", "Cloudflare updates the live site by itself, usually within a minute", "The domain expires", "GitHub emails every customer"], answer: 1, why: "That's the point of connecting GitHub to Cloudflare: every commit goes live by itself.", from: 0, aim: "core" },
    { q: "Why is a commit history useful?", options: ["It makes the site faster", "Every saved, dated version is kept, so you can always go back to one that worked", "Google ranks it", "It replaces backups of photos"], answer: 1, why: "On Day 9 you'll add new files for a store; if anything breaks, the history gets you back.", from: 1, aim: "online-store-paystack" },
    { q: "You attached a client's domain 10 minutes ago and it doesn't open yet. What do you do?", options: ["Change the nameservers again", "Wait: DNS changes can take minutes up to 48 hours to spread", "Delete the project", "Buy another domain"], answer: 1, why: "Changing things again restarts the wait. You'll meet this with every client domain.", from: 2, aim: "client-work" },
    { q: "Who should buy and own a client's domain?", options: ["You, in your name, so they can't leave", "The client, in their own name; you're added as a helper", "Cloudflare", "Nobody"], answer: 1, why: "It's the client's business asset. Ownership is part of every handover.", from: 3, aim: "deliver-get-paid" },
    { q: "Which of these must never be uploaded to GitHub?", options: ["index.html", "The images folder", "Passwords and private notes", "styles.css"], answer: 2, why: "Anything on GitHub can leak. On Day 9 you'll keep a private payment key out of GitHub on purpose.", from: 4, aim: "online-store-paystack" },
  ],
  celebrate: {
    title: "Day 7 complete: the site runs itself",
    proved: "You can run a website like a professional: every change saved and dated, live within minutes, visitors counted, and a domain ready to connect.",
    badge: "Auto-pilot publisher",
    badgeDesc: "Connected GitHub so the site updates itself",
  },
};

export default lesson;
