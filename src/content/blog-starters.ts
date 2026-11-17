import type { PostInput } from "@/lib/blog-shared";

/**
 * Starter articles the admin can add as drafts ("Add starter posts"), review and publish.
 * Evergreen, no invented numbers or stories; prices are left for the reader to work out.
 */
export const starterPosts: Omit<PostInput, "status" | "published_at">[] = [
  {
    slug: "build-your-first-website-with-ai-no-coding",
    title: "How to build your first website with AI (no coding background)",
    excerpt: "What you actually need, the order to do things in, and how to go from a blank screen to a live website, using free tools.",
    tags: ["Getting started", "Web development"],
    seo_title: "Build Your First Website With AI: No Coding Needed",
    seo_description: "A plain-English guide to building your first website with AI using free tools: what you need, the steps in order, and how to put it live.",
    seo_keywords: ["build a website with AI", "website without coding", "free AI website builder"],
    canonical_url: null,
    og_image: null,
    cover_image: null,
    cover_alt: null,
    author_name: "Stynark",
    content_md: `If you can describe what you want in plain English, you can build a website with AI. You don't need a computer science degree. You need a clear idea, the right tools, and a way of checking the result.

This guide walks through the whole path, in order.

## What you need before you start

- **A laptop.** Lessons can be read on a phone, but building is far easier on a laptop.
- **An internet connection.** Most of the tools are online.
- **An AI builder.** A coding agent works inside your project folder and creates and edits the files for you. Google Antigravity has a free plan; Claude Code is a strong paid option if you can afford it.
- **A free Cloudflare account** to put the site online. Its free plan allows business websites, so the same setup works for paying clients.

## Step 1: Decide what the website is for

Before any AI tool, answer three questions on paper:

1. Who is this website for?
2. What should a visitor *do* after reading it (call, WhatsApp, book, buy)?
3. What pages does it need to get them there?

A clear answer here saves hours later. The [Website Requirements Questionnaire](/tools/website-requirements-questionnaire) turns these questions into a short brief you can reuse.

## Step 2: Pick a look

Choose two or three colours and a font pairing that suit the business. A bakery and a law firm should not look the same. Use the [Colour Palette Generator](/tools/color-palette-generator) and the [Font Pairing Picker](/tools/font-pairing-picker) to decide quickly, then write the choices down so every page stays consistent.

## Step 3: Describe the page, section by section

AI builds best from specific instructions. Instead of "make me a website", describe each section:

> A hero section with the headline "Fresh bread in Yaba, every morning", one line under it, and a green WhatsApp button that says "Order now".

Give the AI one section at a time, look at the result in your browser, and ask for changes in plain words: "make the button bigger", "stack these on mobile".

## Step 4: Check it on a phone

Most of your visitors will arrive on a phone, often on mobile data. Open the site at phone width, tap every button, and make sure nothing spills off the screen. The [Responsive Design Checklist](/tools/responsive-design-checklist) lists what to test.

## Step 5: Put it live

Upload your site's folder to Cloudflare Pages (you can drag and drop it) and you get a free address ending in .pages.dev. Later, connect GitHub so every change goes live by itself, and connect the business's own domain when it buys one.

## Step 6: Get found on Google

Give every page its own title and description, submit your sitemap in Google Search Console, and link your pages to each other. The [Meta Tag Generator](/tools/meta-tag-generator) writes the tags for you.

## Where to go from here

Your first site is the hardest. The second is faster, and by the third you'll be ready to build for paying clients. If you want a guided path with daily lessons, practical tasks and a certificate at the end, see the [Fast Track](/tracks/fast-track).`,
  },
  {
    slug: "landing-page-vs-website-which-does-a-business-need",
    title: "Landing page or full website: which does a small business need?",
    excerpt: "The difference in plain English, when each one is the right choice, and how to explain it to a client so they buy the right thing.",
    tags: ["Landing pages", "Clients"],
    seo_title: "Landing Page vs Website: Which Does a Business Need?",
    seo_description: "Landing page or full website? The difference in plain English, when each is right for a small business, and how to explain it to clients.",
    seo_keywords: ["landing page vs website", "small business website", "landing page Nigeria"],
    canonical_url: null,
    og_image: null,
    cover_image: null,
    cover_alt: null,
    author_name: "Stynark",
    content_md: `Clients often ask for "a website" when what they need is a landing page, and the other way round. Knowing the difference helps you sell the right thing, finish faster and get better results for the client.

## The short answer

- A **landing page** is one page with one job: get the visitor to take one action, like booking, buying or sending a WhatsApp message.
- A **website** is several pages that explain a whole business: services, about, contact, sometimes a blog or a shop.

## When a landing page is the right choice

Choose a landing page when the business is:

- **Running ads.** Ad traffic converts better on a page about exactly that offer.
- **Launching one product, event or offer**, like a training, a sale or a new menu.
- **Just starting** and needs something live this week.

A good landing page has a clear headline, proof, the offer and price, answers to common worries, and **one** button repeated down the page. The [Landing Page Checklist](/tools/landing-page-checklist) covers each part.

## When a full website is the right choice

Choose a website when the business:

- Offers **several services** that each need explaining.
- Wants to be **found on Google** for many different searches (each page can rank for its own topic).
- Needs **trust**: clinics, schools, law firms and property companies are checked carefully before anyone calls.

## A simple way to explain it to a client

| Question | Landing page | Website |
|---|---|---|
| How many pages? | One | Usually 4 to 8 |
| Main goal | One action | Explain the whole business |
| Best for | Ads, launches, one offer | Google, trust, many services |
| Time to build | Days | One to two weeks |

Many businesses end up with both: a website as their home, and landing pages for each campaign. That is also a natural way to grow a client relationship.

## Pricing the two

Price by the value and the work, not the page count alone. A landing page for a paid ad campaign can be worth a lot to the client because it directly affects sales. Use the [Client Pricing Calculator](/tools/client-pricing-calculator) to work out a fair price for your time, then package it clearly with the [Proposal Generator](/tools/proposal-generator).

## Learn to build both

Landing pages and full websites are both covered step by step in the [Fast Track](/tracks/fast-track), with a real project to build for each.`,
  },
  {
    slug: "how-to-find-your-first-website-client",
    title: "How to find your first website client in Nigeria",
    excerpt: "A practical, honest plan for landing your first paying website project: who to approach, what to say, and how to follow up without being annoying.",
    tags: ["Clients", "Getting paid"],
    seo_title: "How to Find Your First Website Client in Nigeria",
    seo_description: "A practical plan to land your first paying website client: who to approach, what to say, what to show, and how to follow up professionally.",
    seo_keywords: ["find website clients", "first web design client", "web designer Nigeria"],
    canonical_url: null,
    og_image: null,
    cover_image: null,
    cover_alt: null,
    author_name: "Stynark",
    content_md: `Your first client is the hardest to get, because you have no past clients to point to. The good news: small businesses around you need websites, and most of them are not being asked properly.

Here is a plan that works without ads or a big following.

## Step 1: Build proof before you pitch

Nobody wants to be your experiment. Before contacting anyone, build **two or three sample websites** for the kind of business you want to serve, like a restaurant, a salon or a clinic. Put them on a simple portfolio page with your WhatsApp number.

## Step 2: Choose one type of business

"Anyone who needs a website" is too broad. Pick one group you understand, for example salons in your area. You will learn their problems quickly and your message will sound like it was written for them, because it was.

## Step 3: Make a short list

Search Google Maps for that business type in your area. Look for businesses that:

- Have **no website**, or a slow, broken or outdated one.
- Have **good reviews**, so they are active and care about customers.
- Already **advertise on Instagram or WhatsApp**, so they spend on getting customers.

Aim for 20 to 30 names. The [Prospect List Builder](/tools/prospect-list-builder) gives you a sheet to track them.

## Step 4: Send a specific, short message

Generic messages get ignored. Mention one real thing you noticed and one clear benefit:

> Good afternoon! I found your salon on Google Maps and loved the braids on your Instagram. I noticed people can't book online, so they have to call during busy hours. I build simple booking websites for salons. Can I send you a 1-minute example?

Asking permission to send an example gets far more replies than sending a price list. The [Cold DM Script Generator](/tools/cold-dm-script-generator) helps you write these for any business type.

## Step 5: Follow up, politely

Most replies come after a follow-up, not the first message. Wait a few days, then send one short, friendly reminder with something useful, like a screenshot of how their homepage could look. Stop after two or three follow-ups. The [Follow-up Sequence Generator](/tools/follow-up-sequence-generator) plans the timing.

## Step 6: Make saying yes easy

When someone is interested:

1. Ask a few questions about their business and goal.
2. Send a clear proposal with what's included, the timeline and the price.
3. Ask for a deposit before you start, and the balance before handover.

The [Proposal Generator](/tools/proposal-generator) and [Invoice Generator](/tools/invoice-generator) handle the paperwork.

## Keep going

Treat outreach like a daily habit: a few new messages and follow-ups every day. Your first "yes" is the start of a portfolio, a testimonial and referrals. Finding clients, pitching and getting paid are all taught with scripts and practice in the [Fast Track](/tracks/fast-track).`,
  },
  {
    slug: "how-to-build-a-website-and-put-it-online",
    title: "How to build a website and put it online (free, step by step)",
    excerpt: "Build a personal website with React and Vite, then put it online for free with GitHub and Vercel or Cloudflare Pages. Every step explained, with an optional custom domain.",
    tags: ["Getting started", "Web development"],
    seo_title: "Build a Website and Put It Online: Free Step-by-Step Guide",
    seo_description: "Build a personal website with React and Vite, save it to GitHub and put it online free with Vercel or Cloudflare Pages, plus an optional custom domain.",
    seo_keywords: ["how to build a website", "put a website online", "React Vite tutorial", "host a website for free", "deploy a website"],
    canonical_url: null,
    og_image: null,
    cover_image: null,
    cover_alt: null,
    author_name: "Stynark",
    content_md: "> **Want to skip straight to building real websites for businesses?** The [Fast Track](/tracks/fast-track) takes you from beginner to building your first website in 14 short lessons, with a free AI builder that writes the code while you learn what it does. It's ₦15,000, paid once, with lifetime access. The [Main Track](/tracks/main-track) adds SEO, automation, AI agents and lead generation across 26 lessons for ₦30,000. Or read on and build your first page by hand today.\n\nA website is just a folder of files that a browser knows how to read. In this guide you'll make that folder on your laptop, turn it into a personal page with your name and your projects, then put it on the internet so anyone with the link can open it.\n\nYou don't need to understand everything before you start. Each tool is explained the moment we use it. By the end you'll have a live link to share, and you'll know how to update it whenever you like.\n\n**What you need:** a laptop or desktop (Windows or Mac), an internet connection, and about two hours. Everything we use is free.\n\n**Already have a project?** Maybe one an AI tool made for you. Keep it. Open its folder in VS Code and read its README and `package.json`. If it's a React + Vite project, run `npm install` and jump to Step 3. If it already runs on your laptop, start at Step 5. Projects built with something else, like Next.js or plain HTML, use different build settings from the ones below.\n\n## Step 1: Make a home for your files\n\nEvery website starts as files: the words on the page, the colours, and the instructions for what happens when someone taps a button. We'll keep them together in one folder.\n\n1. Create a folder called `website-projects` somewhere easy to find, like Documents. Keep it separate from any other coding projects.\n2. Install **VS Code**, a free code editor, from [code.visualstudio.com](https://code.visualstudio.com/). It's where you'll open and change your website's files.\n3. In VS Code, choose **File → Open Folder** and pick `website-projects`.\n\nIt's empty for now. That's exactly right.\n\n## Step 2: Pick your tools\n\nThere are many ways to build a website, and you don't need to learn them all. Here's a quick map:\n\n| Option | Good for |\n|---|---|\n| HTML, CSS and JavaScript | Learning the basics, or a small site with no extra tools |\n| **React + Vite** | Learning React and building a page from reusable pieces (this guide) |\n| Next.js | Bigger sites with many pages and features that run on a server |\n| Astro | Blogs, portfolios and sites that are mostly reading |\n| Vue or SvelteKit | Other popular ways to build interactive pages |\n\nIf you already have something working, don't switch just because another option sounds exciting. If you're starting fresh, follow along with React + Vite.\n\n**React** lets you build a page out of components: small, reusable pieces like a header or a project card. **Vite** creates the starter project, shows you a live preview while you work, and packs everything up for publishing later.\n\n### Install Node.js\n\nReact and Vite run on **Node.js**. Download the **LTS** version from [nodejs.org](https://nodejs.org/en/download). It includes **npm**, which downloads the packages (ready-made code other people share) your project needs. Vite needs Node 20.19 or newer (22.12 or newer on the 22 line), and the current LTS meets that.\n\nRestart VS Code after installing, open `website-projects` again, then choose **Terminal → New Terminal**. The terminal is where you type instructions for your computer. Check that Node and npm are ready by typing each line and pressing Enter:\n\n```bash\nnode --version\nnpm --version\n```\n\nEach should print a version number. If one says \"not recognised\", finish the Node installation and restart VS Code.\n\n### Create the project\n\nRun:\n\n```bash\nnpm create vite@latest my-first-website -- --template react --no-interactive\n```\n\nIf npm asks to download `create-vite`, say yes. This creates a folder called `my-first-website` with a React starter inside. Then run these two lines, one at a time:\n\n```bash\ncd my-first-website\nnpm install\n```\n\n`cd` means \"change directory\": it moves the terminal into your new folder. `npm install` downloads the packages the project lists.\n\nNow choose **File → Open Folder** again and open `my-first-website` itself. You'll work inside this folder from here on.\n\n## Step 3: See it in your browser\n\nOpen a new terminal and run:\n\n```bash\nnpm run dev\n```\n\nThis starts a **development server**: a small program on your laptop that shows your site to your browser while you work on it. The terminal prints an address, usually `http://localhost:5173`. Open exactly the address it shows.\n\nYou should see Vite's starter page. Your first website is running.\n\nOne thing to know: **localhost** means \"this computer\". If you send that link to a friend, their browser looks on *their* laptop and finds nothing. That's why we'll publish the site properly in Step 7.\n\nLeave the server running while you edit. If you stop it with **Ctrl+C**, start it again with `npm run dev`.\n\n## Step 4: Make it yours\n\nIn the file list, open `src/App.jsx`. This file is the component that describes your page. Replace everything in it with:\n\n```jsx\nexport default function App() {\n  return (\n    <main>\n      <p className=\"tag\">WELCOME</p>\n      <h1>Hi, I'm Ada. I build websites.</h1>\n      <p>\n        I'm learning to build useful websites for people and businesses.\n        Here's what I've made so far.\n      </p>\n      <a href=\"#work\">See my work</a>\n      <section id=\"work\">\n        <h2>Project one</h2>\n        <p>My first website, built and published by me.</p>\n      </section>\n    </main>\n  )\n}\n```\n\nChange Ada to your own name and write a line about yourself. The link points to `#work`, which matches the section's `id`, so tapping it jumps down to your projects. Save, and your browser updates on its own.\n\nNow the look. Open `src/index.css` and replace everything with:\n\n```css\n* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  background: #faf8f4;\n  color: #151515;\n  font-family: system-ui, sans-serif;\n  line-height: 1.6;\n}\nmain { max-width: 720px; margin: auto; padding: 56px 20px; }\nh1 { font-size: clamp(2.2rem, 7vw, 3.6rem); line-height: 1.1; }\n.tag { font-weight: 700; letter-spacing: 0.1em; color: #b8400f; }\na { color: #b8400f; font-weight: 700; }\na:focus-visible { outline: 3px solid #b8400f; outline-offset: 4px; }\nsection { margin-top: 56px; }\n```\n\n**CSS** controls how the page looks: colours, spacing and sizes. The `clamp()` line makes the heading shrink on phones and grow on laptops. Save and look again.\n\nLeave `src/main.jsx` alone: it loads your component and your styles. In `index.html`, change the text between `<title>` and `</title>` to your name. That's what shows in the browser tab.\n\n**Try this:** add a second project section, change the background colour, or rewrite your introduction. Make one change at a time and watch what happens. It's the fastest way to learn what each line does.\n\n### Getting help from AI\n\nOnce the page works, an AI assistant can help you improve it. Tell it what to keep, not just what to add. For example:\n\n```text\nI'm building a one-page React + Vite personal website. Keep the current setup.\nAdd three project cards to App.jsx and style them in index.css so they look\ngood on a phone. Don't add new packages or outside services. Explain each\nchange so I understand it, and tell me how to check it works.\n```\n\nRead what it changes, ask about anything you don't understand, and check the result in your browser. Keep a first site simple: a WhatsApp or email link is much easier than a contact form, which needs somewhere to send the messages.\n\n## Step 5: Build the version visitors will see\n\nBefore publishing, Vite packs your project into a small, fast set of files. This is called a **production build**. Stop the dev server with Ctrl+C, then run:\n\n```bash\nnpm run build\nnpm run preview\n```\n\nThe build creates a folder called `dist` holding your finished site. `npm run preview` shows that finished version at an address like `http://localhost:4173`. It's still only on your laptop.\n\nCheck it properly:\n\n- Tap every link.\n- Make the browser window narrow to see it at phone size.\n- Press **Tab** and **Enter** to make sure the link works from the keyboard.\n- Remove any sample text you don't want the world to see.\n\nIf the build shows an error, fix it before moving on.\n\n## Step 6: Save your project to GitHub\n\n**Git** records versions of your files. Each saved version is a **commit**, and your files plus their history make a **repository**. **GitHub** keeps a copy of that repository online, which your hosting service reads every time you update the site.\n\n1. Install Git from [git-scm.com](https://git-scm.com/downloads) and create a free GitHub account.\n2. Restart VS Code and run `git --version` to check that Git is installed.\n3. **Never upload passwords, API keys or private details.** This project has none. If you add one later, remember that anything in a Vite `VITE_` variable ends up in the browser, so it's not a safe place for secrets.\n4. In VS Code, open **Source Control** and choose **Initialize Repository**. If Git asks for your name and email, use GitHub's private no-reply email if you'd rather keep your own address out of your commits.\n5. Stage your files with the **+** buttons, type `My first website` as the message, and choose **Commit**.\n6. Open the Command Palette (**Ctrl+Shift+P** on Windows, **Cmd+Shift+P** on Mac), run **Publish to GitHub**, sign in and pick a name. A private repository is fine.\n7. Open the repository on GitHub and check your files are there.\n\nThe starter's `.gitignore` file already leaves out `node_modules` and `dist`, which is what you want: the hosting service installs the packages and builds the site itself.\n\n## Step 7: Put it online\n\n**Hosting** means keeping your site on a computer that's always connected, so it stays up even when your laptop is closed. Your site is **static**: finished files the browser downloads and runs. Static doesn't mean boring. Buttons and animations still work, because they run in the visitor's browser.\n\nFour free places that host a site like this:\n\n| Host | Worth knowing |\n|---|---|\n| **Vercel** | Connects to GitHub and republishes on every update. Its free Hobby plan is for **personal, non-commercial use** only, so it suits this personal site but not a business's site. |\n| **Cloudflare Pages** | Connects to GitHub or takes a folder upload. Its free plan allows business websites, so it's the one to use for sites you build for clients. |\n| Netlify | A similar GitHub workflow. Check its current free limits before relying on it. |\n| GitHub Pages | Fine for personal and project pages, but not meant as a free host for businesses. |\n\nAlways check a plan's rules and limits before you rely on it.\n\n### Option A: Vercel (your personal site)\n\n1. Create a Vercel account and choose **Add New → Project**.\n2. Import your GitHub repository and give Vercel access to it.\n3. Check the settings Vercel detects: **Framework Preset:** Vite, **Build Command:** `npm run build`, **Output Directory:** `dist`. Leave the install command as it is.\n4. Choose **Deploy**.\n\nWhen it finishes, open the address ending in `.vercel.app`. That's your website, live on the internet. Open it in a private browser window while signed out: if it asks you to log in, you've copied a protected preview link instead of the main one. Your repository can stay private while the site is public.\n\n### Option B: Cloudflare Pages (for client and business sites)\n\n1. Create a free Cloudflare account and open **Workers & Pages**, then create a Pages project and choose to connect to Git.\n2. Pick your repository.\n3. Set **Build command:** `npm run build` and **Build output directory:** `dist`.\n4. Choose **Save and Deploy**.\n\nYour site goes live at an address ending in `.pages.dev`. This is the setup we use in the course for every site you build for a paying client.\n\nEither way: you did it. Send the link to someone.\n\n## Step 8 (optional): Get your own address\n\nYour free address already works. A custom **domain**, like `yourname.com` or `yourname.com.ng`, is an address you choose, and you can add one any time.\n\nThe domain and the hosting are separate things. You can buy the domain from one company (a **registrar**) and host the site somewhere else. You don't need the hosting bundles registrars offer at checkout.\n\nWhen comparing registrars:\n\n- Compare the **renewal** price, not just the first-year offer. Domains are rented yearly, not bought forever.\n- Check whether the name is marked \"premium\" and whether privacy protection is included.\n- Prices change, so trust the checkout page over any old price list.\n- Turn on auto-renew or set a reminder so you don't lose the name.\n\nTo connect it, open your host's **Domains** settings and add the domain. The host shows you the exact **DNS records** to add (DNS is the internet's address book). Add them wherever your domain's DNS is managed, usually your registrar or Cloudflare, then wait for the host to confirm. Copy the records from your own dashboard, not from another tutorial, and leave any email records alone.\n\n## Step 9: Keep improving it\n\nUpdating your site is now a simple loop:\n\n1. Open the project in VS Code and run `npm run dev`.\n2. Make your change and check it in the browser.\n3. Run `npm run build` to make sure it still builds.\n4. Commit in Source Control and push to GitHub.\n5. Your host spots the push, rebuilds and publishes the new version automatically.\n\n## If you get stuck\n\n- **\"Can't find package.json\":** you're in the wrong folder. Open `my-first-website` itself and start a new terminal.\n- **The local page won't open:** check that the dev server is still running and use the exact address it printed, including the port number.\n- **The online build fails:** read the first real error in the build log. Check that every file was committed, and check capital letters: `Photo.png` and `photo.png` are different files on the server.\n- **A page like `/about` shows 404 when refreshed:** this site uses a jump link, so it won't happen here. If you add separate pages later, follow your host's instructions for Vite routing.\n\n## What's next\n\nYou can now build a page, preview it and publish it to the world. That's the foundation of everything on the web.\n\n> **Ready to build websites businesses pay for?** This guide builds one personal page by hand. The [Fast Track](/tracks/fast-track) goes much further in 14 self-paced lessons: business websites, landing pages, online stores with Paystack, booking systems and web apps. You build them with a free AI builder and host them free on Cloudflare, then learn what to charge and how to pitch real clients. ₦15,000, paid once, with lifetime access and no coding background needed.\n\n> **Want the full skill set?** The [Main Track](/tracks/main-track) includes everything in the Fast Track, plus SEO that gets businesses found on Google, automations that save them hours, AI agents that answer their customers, and a lead-generation system to keep clients coming. That's 26 lessons for ₦30,000, paid once. [Compare both tracks](/pricing) and start today. You'll need a laptop or desktop to build.",
  },
];
