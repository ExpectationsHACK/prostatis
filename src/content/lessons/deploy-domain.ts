import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deploy-domain",
  title: "Deploy on your own domain",
  minutes: 100,
  outcome: "Your website live on the internet at a public address, with the padlock (HTTPS), updating automatically every time you save to GitHub.",
  intro:
    "So far your website only lives on your laptop, like a meal cooked at home that nobody else can taste. Today it goes live for the whole world. You'll put your code on GitHub, publish it with Vercel, and connect a domain name. By the end, anyone can type your address into their phone and see your work. That's the moment a practice project becomes something you can sell.",
  youNeed: ["Your project from Days 3–6, with at least one commit", "Your GitHub account", "A free Vercel account (sign up with GitHub)", "Optional: money for a domain: roughly ₦5,000–₦25,000 a year depending on the ending"],
  sections: [
    {
      heading: "How a website reaches a visitor",
      blocks: [
        { t: "figure", figure: { diagram: "web-stack", caption: "The visitor types your domain → DNS finds where it lives → the host sends your files → the site appears." } },
        { t: "define", term: "Domain", meaning: "The name people type to reach a website, like `glowbeauty.ng`. You rent it yearly from a company called a **registrar**.", like: "a shop's name and street address on a signboard." },
        { t: "define", term: "Hosting", meaning: "A computer that's always on and connected to the internet, which stores your website and sends it to visitors. We use **Vercel**.", like: "renting the shop space itself." },
        { t: "define", term: "DNS", meaning: "The internet's phone book. When someone types your domain, DNS tells their phone which hosting computer to ask for the website.", like: "a directory that says “Glow Beauty? That's at Shop 12, Admiralty Road.”" },
        { t: "define", term: "HTTPS", meaning: "The secure version of a web address, shown by the **padlock** in the browser. It scrambles the connection so nobody in between can read it. Vercel sets it up for free.", like: "a sealed envelope instead of a postcard." },
      ],
    },
    {
      heading: "Step 1: Put your code on GitHub",
      blocks: [
        { t: "define", term: "Repository (repo)", meaning: "Your project's home on GitHub, all the files plus every snapshot (commit) you've made.", like: "a safe-deposit box that keeps every version of your document." },
        { t: "figure", figure: { diagram: "git-flow", caption: "Edit → commit → push to GitHub → Vercel updates the live site. Every time." } },
        { t: "prompt", title: "Push to GitHub", text: "Help me put this project on GitHub. First check that .env files and node_modules are listed in .gitignore. Commit everything. Then walk me through creating a new PRIVATE repository on github.com and pushing to it. Give me one command at a time and explain what each does." },
        { t: "p", text: "The first time you push, Git asks you to sign in to GitHub, a browser window opens. Sign in and approve. That's normal and only happens once." },
        { t: "define", term: "Environment variable", meaning: "A secret setting, like a password or key, kept **outside** your code, in a file called `.env.local` on your computer and in your host's settings online. Code reads it, but it's never uploaded to GitHub.", like: "the combination to the shop's safe. Staff know where the safe is (the code), but the combination is kept separately." },
        { t: "warn", text: "Never commit passwords or secret keys to GitHub, even in a private repo. If one ever leaks, create a new key immediately and delete the old one." },
      ],
    },
    {
      heading: "Step 2: Publish with Vercel",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Sign up at vercel.com with GitHub", detail: "Choose the free Hobby plan for learning and your own portfolio." },
            { title: "Import your repository", detail: "Click Add New → Project, pick your repo, keep the default settings." },
            { title: "Add environment variables (if any)", detail: "Settings → Environment Variables. Copy them from your .env.local, for example a Formspree endpoint." },
            { title: "Deploy", detail: "In a minute or two you get a live link ending in `.vercel.app`. Open it on your phone!" },
          ],
        },
        { t: "tip", text: "From now on, every time you push to GitHub, Vercel rebuilds and updates the live site on its own, usually within a minute or two." },
        { t: "warn", text: "Vercel's free **Hobby** plan is for **personal, non-commercial** projects only. A website you're paid to build or host for a client is commercial: use Vercel **Pro** (about $20/month per team member), or a host whose free plan allows business use, check the host's current terms before you choose." },
        { t: "check", q: "A client pays you ₦250,000 for their salon website. Can it stay on your free Vercel Hobby plan?", options: ["Yes, it's small", "No: paid client work is commercial, so use a paid plan or a host that allows commercial use on its free plan", "Only for the first year"], answer: 1, why: "Hobby is personal and non-commercial only; being paid to build or host makes it commercial." },
        { t: "try", title: "Open your live site on your phone", minutes: 3, steps: ["Copy your .vercel.app link.", "Send it to yourself on WhatsApp and open it on your phone.", "Send it to one friend: your first real visitor!"] },
      ],
    },
    {
      heading: "Step 3: Choose and buy a domain",
      blocks: [
        { t: "p", text: "A good domain is **short**, **easy to say out loud**, and has **no hyphens**. For a Nigerian business, **.ng** or **.com.ng** shows it's local; **.com** is best for international customers." },
        { t: "tool", slug: "domain-name-generator", why: "Generates name ideas and checks live whether each one is available." },
        { t: "p", text: ".ng domains are sold by **NiRA-accredited registrars** (NiRA runs the .ng system; its website lists them). For .com, popular registrars include Namecheap, Porkbun and Cloudflare. Prices change, so compare the **renewal** price too, not just the first-year deal." },
        { t: "warn", text: "Register a client's domain in the **client's name and email** (or give them full access). It's their business asset, not yours. Holding a client's domain hostage destroys trust, and your reputation." },
        { t: "figure", figure: { diagram: "handover", caption: "The client owns the accounts; you're added as a helper." } },
      ],
    },
    {
      heading: "Step 4: Connect the domain",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "In Vercel, add the domain", detail: "Project → Settings → Domains → type your domain → Add." },
            { title: "Copy the DNS records Vercel shows you", detail: "Usually one record for the main domain and one for www. Copy them **exactly**, the values can differ between projects." },
            { title: "Add them at your registrar", detail: "Open the domain's DNS settings at the registrar and add exactly what Vercel showed." },
            { title: "Wait, then check", detail: "It can take from a few minutes to 48 hours. Vercel shows a green tick and turns on HTTPS automatically." },
          ],
        },
        { t: "define", term: "DNS record", meaning: "One line in the DNS phone book, like “glowbeauty.ng → this Vercel address”. The two you'll see most are **A records** and **CNAME records**.", like: "one entry in a contacts list." },
        { t: "scenario", title: "The domain that “didn't work”", text: "Femi connected a client's .com.ng domain, refreshed after five minutes, saw nothing, and changed the DNS records three more times. Each change restarted the wait. When he finally left the correct records alone, the green tick appeared a few hours later. Copy the records exactly once, then be patient." },
        { t: "check", q: "You connected the domain 10 minutes ago and it doesn't work yet. What's the most likely reason?", options: ["You broke everything", "DNS changes can take minutes to 48 hours to spread", "Vercel is shut down", "Domains need a week"], answer: 1, why: "DNS updates spread across the internet gradually. Check again later before changing things." },
        { t: "tip", text: "Stuck? Screenshot your registrar's DNS page and Vercel's Domains page, and ask Claude what's different between them." },
      ],
    },
    {
      heading: "Step 5: Add analytics",
      blocks: [
        { t: "define", term: "Analytics", meaning: "A tool that counts visitors: how many came, which pages they viewed, and where they came from. It's proof the website is working.", like: "a visitors' book at the entrance, but it fills itself in." },
        { t: "prompt", title: "Add analytics", text: "Add Vercel Web Analytics to this project so we can see visitors and top pages. Keep it privacy-friendly. Tell me exactly what to switch on in the Vercel dashboard." },
        { t: "mistakes", items: [{ wrong: "Buying a domain with hyphens and numbers: best-lashes-4u.com", right: "Short and sayable: glowlashes.ng" }, { wrong: "Registering the client's domain in your own name", right: "Registering it in the client's name, with you as a helper" }, { wrong: "Changing DNS again after 10 minutes because “it's not working”", right: "Waiting: propagation can take up to 48 hours" }] },
      ],
    },
  ],
  task: {
    title: "Go live",
    steps: ["Push your project to a private GitHub repository.", "Deploy on Vercel and open the .vercel.app link on your phone.", "Choose a domain (buy it now, or plan it for your first client).", "If you bought one, connect it and wait for the green tick.", "Turn on analytics and visit the site to see yourself counted."],
    done: ["My site loads at a public link", "The padlock (HTTPS) shows in the browser", "Pushing to GitHub updates the live site", "No secret keys are in my GitHub repository"],
  },
  recap: [
    "**DNS** is the internet's phone book: it points your domain to the computer that hosts your site.",
    "Secrets go in **environment variables** (`.env.local` and the host's settings), **never in GitHub**.",
    "A client's domain belongs to **the client**, register it in their name or give them full access.",
    "DNS changes can take **from minutes up to 48 hours** to work everywhere. Wait before changing things.",
    "After connecting GitHub, **every push automatically updates** the live site on Vercel.",
    "Vercel's free Hobby plan is **non-commercial only**; paid client sites need a paid plan or a host whose free plan allows business use.",
  ],
  resources: [
    { label: "Vercel: Deploying from Git", url: "https://vercel.com/docs/git", note: "Official deployment guide." },
    { label: "Vercel: Adding a custom domain", url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain", note: "Step-by-step domain connection." },
    { label: "Vercel: Fair use guidelines", url: "https://vercel.com/docs/limits/fair-use-guidelines", note: "What the free Hobby plan allows." },
    { label: "GitHub Docs: Get started", url: "https://docs.github.com/en/get-started", note: "Repositories, commits and pushes explained." },
    { label: "NiRA", url: "https://nira.org.ng", note: "The .ng registry: lists accredited registrars." },
    { label: "MDN: What is a domain name?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name", note: "Simple explanation of domains." },
  ],
  quiz: [
    { q: "What does DNS do?", options: ["Stores the website files", "Points your domain name to the computer that hosts the site", "Designs the site", "Takes payments"], answer: 1, why: "DNS is like a phone book: it turns a name into the host's address.", from: 0 },
    { q: "Where should secret keys go?", options: ["Committed in the code", "In environment variables: never in GitHub", "In the footer", "In the domain name"], answer: 1, why: "Anything in GitHub can leak. Secrets go in .env.local and the host's settings.", from: 1 },
    { q: "Who should own a client's domain?", options: ["You, forever", "The client: registered in their name or with their full access", "Vercel", "Nobody"], answer: 1, why: "It's the client's business asset.", from: 2 },
    { q: "After connecting a domain, it doesn't work immediately. Why?", options: ["You definitely did it wrong", "DNS changes can take minutes to 48 hours to spread", "Domains need a week", "Vercel is down"], answer: 1, why: "DNS propagation takes time. Check again later before changing things.", from: 3 },
    { q: "What happens when you push new code to GitHub?", options: ["Nothing", "Vercel automatically rebuilds and updates the live site", "The domain expires", "You must redeploy by hand every time"], answer: 1, why: "Connected Git deployments update the site on every push.", from: 4 },
  ],
};

export default lesson;
