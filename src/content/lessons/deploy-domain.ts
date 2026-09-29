import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "deploy-domain",
  title: "Deploy on your own domain",
  minutes: 90,
  outcome: "Your website live on the internet at your own domain, with HTTPS and analytics.",
  intro:
    "Today your site leaves your computer and goes live for the whole world. You'll push it to GitHub, deploy it on Vercel (free), buy a domain name and connect it. By the end, anyone can type your address into their phone and see your work — and you'll have done what clients pay for.",
  sections: [
    {
      heading: "How a website reaches a visitor",
      blocks: [
        { t: "figure", figure: { diagram: "web-stack", caption: "The visitor types your domain → DNS finds the address → the host sends your files → the site appears." } },
        { t: "list", items: ["**Domain** — the name people type (e.g. glowbeauty.ng). You rent it yearly.", "**DNS** — the internet's phone book that points the name to your host.", "**Hosting** — the computer that stores and serves your site. We use Vercel.", "**HTTPS** — the padlock. It encrypts the connection. Vercel sets it up for free."] },
      ],
    },
    {
      heading: "Step 1 — Push your code to GitHub",
      blocks: [
        { t: "figure", figure: { diagram: "git-flow", caption: "Every push to GitHub automatically deploys a new version." } },
        { t: "prompt", title: "Push to GitHub", text: "Help me put this project on GitHub. Check that .env files and node_modules are in .gitignore, commit everything, then walk me through creating a new private repository on github.com and pushing to it. Give me each command one at a time." },
        { t: "warn", text: "Never commit passwords or secret keys. They belong in environment variables (`.env.local`), which stay on your computer and are added to Vercel separately." },
      ],
    },
    {
      heading: "Step 2 — Deploy on Vercel",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Sign up at vercel.com with GitHub", detail: "The free Hobby plan is enough to learn and for your portfolio. Client sites for businesses should use the Pro plan — check Vercel's terms." },
            { title: "Import your repository", detail: "Click Add New → Project, choose your repo, keep the default settings." },
            { title: "Add environment variables", detail: "If your site uses any keys (like Formspree), add them under Settings → Environment Variables." },
            { title: "Deploy", detail: "In a minute or two you get a live link ending in .vercel.app. Open it on your phone!" },
          ],
        },
        { t: "tip", text: "From now on, every time you push to GitHub, Vercel rebuilds and updates the live site automatically." },
      ],
    },
    {
      heading: "Step 3 — Choose and buy a domain",
      blocks: [
        { t: "p", text: "A good domain is short, easy to spell out loud, and has no hyphens. For a Nigerian business, **.ng** or **.com.ng** shows it's local; **.com** is best for international reach." },
        { t: "tool", slug: "domain-name-generator", why: "Generates name ideas and checks live whether each domain is available." },
        { t: "p", text: "Buy from a registrar. For .ng domains, use a NiRA-accredited registrar (Whogohost, Qservers and others). For .com, Namecheap, Cloudflare or Porkbun are popular. Expect roughly ₦5,000–₦20,000 per year." },
        { t: "warn", text: "Register the client's domain in the **client's** name and email (or give them full access). It's their business asset, not yours." },
      ],
    },
    {
      heading: "Step 4 — Connect the domain",
      blocks: [
        { t: "steps", items: [
          { title: "In Vercel, add the domain", detail: "Project → Settings → Domains → type your domain → Add." },
          { title: "Copy the DNS records Vercel shows", detail: "Usually an A record for the main domain and a CNAME record for www." },
          { title: "Add them at your registrar", detail: "Find the DNS settings for your domain and add exactly what Vercel showed." },
          { title: "Wait and check", detail: "It can take from a few minutes up to 48 hours. Vercel shows a green tick and sets up HTTPS automatically." },
        ] },
        { t: "tip", text: "Stuck? Take a screenshot of your registrar's DNS page and Vercel's domain page, and ask Claude what's different." },
      ],
    },
    {
      heading: "Step 5 — Add analytics",
      blocks: [
        { t: "p", text: "Analytics tells you how many people visit and where they come from — proof that the site works, which you'll show clients in reports." },
        { t: "prompt", title: "Add analytics", text: "Add Vercel Web Analytics to this project so we can see visitors and top pages. Keep it privacy-friendly: no cookies banner needed. Tell me what to switch on in the Vercel dashboard." },
      ],
    },
  ],
  task: {
    title: "Go live",
    steps: ["Push the project to a private GitHub repository.", "Deploy on Vercel and open the .vercel.app link on your phone.", "Pick and buy a domain (or use a free .vercel.app link if you're not ready to buy yet).", "Connect the domain and wait for the green tick.", "Turn on analytics and visit the site to see yourself counted."],
    done: ["My site loads at a public link", "The padlock (HTTPS) shows in the browser", "Pushing to GitHub updates the live site", "Analytics shows at least one visit"],
  },
  resources: [
    { label: "Vercel — Deploying Git repositories", url: "https://vercel.com/docs/git", note: "Official deployment guide." },
    { label: "Vercel — Adding a custom domain", url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain", note: "Step-by-step domain connection." },
    { label: "GitHub Docs — Get started", url: "https://docs.github.com/en/get-started", note: "Repositories, commits and pushes explained." },
    { label: "NiRA", url: "https://nira.org.ng", note: "The .ng registry — lists accredited registrars." },
    { label: "MDN — What is a domain name?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name", note: "Simple explanation of domains and DNS." },
  ],
  quiz: [
    { q: "What does DNS do?", options: ["Stores the website files", "Points your domain name to the server that hosts the site", "Designs the site", "Takes payments"], answer: 1, why: "DNS is like a phone book: it turns a name into the host's address." },
    { q: "Where should secret keys go?", options: ["Committed in the code", "In environment variables, never in GitHub", "In the footer", "In the domain name"], answer: 1, why: "Anything in GitHub can leak. Secrets go in .env.local and Vercel's settings." },
    { q: "Who should own a client's domain?", options: ["You, forever", "The client — registered in their name or with their access", "Vercel", "Nobody"], answer: 1, why: "It's the client's business asset; holding it hostage destroys trust." },
    { q: "After connecting a domain, it doesn't work immediately. Why?", options: ["You did it wrong for sure", "DNS changes can take minutes to 48 hours to spread", "Domains need a week", "Vercel is down"], answer: 1, why: "DNS propagation takes time. Check again later before changing things." },
    { q: "What happens when you push new code to GitHub?", options: ["Nothing", "Vercel automatically rebuilds and updates the live site", "The domain expires", "You must redeploy by hand every time"], answer: 1, why: "Connected Git deployments update the site on every push." },
  ],
};

export default lesson;
