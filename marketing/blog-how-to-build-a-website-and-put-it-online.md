> **Want to skip straight to building real websites for businesses?** The [Fast Track](/tracks/fast-track) takes you from beginner to building your first website in 14 short lessons, with a free AI builder that writes the code while you learn what it does. It's ₦15,000, paid once, with lifetime access. The [Main Track](/tracks/main-track) adds SEO, automation, AI agents and lead generation across 26 lessons for ₦30,000. Or read on and build your first page by hand today.

A website is just a folder of files that a browser knows how to read. In this guide you'll make that folder on your laptop, turn it into a personal page with your name and your projects, then put it on the internet so anyone with the link can open it.

You don't need to understand everything before you start. Each tool is explained the moment we use it. By the end you'll have a live link to share, and you'll know how to update it whenever you like.

**What you need:** a laptop or desktop (Windows or Mac), an internet connection, and about two hours. Everything we use is free.

**Already have a project?** Maybe one an AI tool made for you. Keep it. Open its folder in VS Code and read its README and `package.json`. If it's a React + Vite project, run `npm install` and jump to Step 3. If it already runs on your laptop, start at Step 5. Projects built with something else, like Next.js or plain HTML, use different build settings from the ones below.

## Step 1: Make a home for your files

Every website starts as files: the words on the page, the colours, and the instructions for what happens when someone taps a button. We'll keep them together in one folder.

1. Create a folder called `website-projects` somewhere easy to find, like Documents. Keep it separate from any other coding projects.
2. Install **VS Code**, a free code editor, from [code.visualstudio.com](https://code.visualstudio.com/). It's where you'll open and change your website's files.
3. In VS Code, choose **File → Open Folder** and pick `website-projects`.

It's empty for now. That's exactly right.

## Step 2: Pick your tools

There are many ways to build a website, and you don't need to learn them all. Here's a quick map:

| Option | Good for |
|---|---|
| HTML, CSS and JavaScript | Learning the basics, or a small site with no extra tools |
| **React + Vite** | Learning React and building a page from reusable pieces (this guide) |
| Next.js | Bigger sites with many pages and features that run on a server |
| Astro | Blogs, portfolios and sites that are mostly reading |
| Vue or SvelteKit | Other popular ways to build interactive pages |

If you already have something working, don't switch just because another option sounds exciting. If you're starting fresh, follow along with React + Vite.

**React** lets you build a page out of components: small, reusable pieces like a header or a project card. **Vite** creates the starter project, shows you a live preview while you work, and packs everything up for publishing later.

### Install Node.js

React and Vite run on **Node.js**. Download the **LTS** version from [nodejs.org](https://nodejs.org/en/download). It includes **npm**, which downloads the packages (ready-made code other people share) your project needs. Vite needs Node 20.19 or newer (22.12 or newer on the 22 line), and the current LTS meets that.

Restart VS Code after installing, open `website-projects` again, then choose **Terminal → New Terminal**. The terminal is where you type instructions for your computer. Check that Node and npm are ready by typing each line and pressing Enter:

```bash
node --version
npm --version
```

Each should print a version number. If one says "not recognised", finish the Node installation and restart VS Code.

### Create the project

Run:

```bash
npm create vite@latest my-first-website -- --template react --no-interactive
```

If npm asks to download `create-vite`, say yes. This creates a folder called `my-first-website` with a React starter inside. Then run these two lines, one at a time:

```bash
cd my-first-website
npm install
```

`cd` means "change directory": it moves the terminal into your new folder. `npm install` downloads the packages the project lists.

Now choose **File → Open Folder** again and open `my-first-website` itself. You'll work inside this folder from here on.

## Step 3: See it in your browser

Open a new terminal and run:

```bash
npm run dev
```

This starts a **development server**: a small program on your laptop that shows your site to your browser while you work on it. The terminal prints an address, usually `http://localhost:5173`. Open exactly the address it shows.

You should see Vite's starter page. Your first website is running.

One thing to know: **localhost** means "this computer". If you send that link to a friend, their browser looks on *their* laptop and finds nothing. That's why we'll publish the site properly in Step 7.

Leave the server running while you edit. If you stop it with **Ctrl+C**, start it again with `npm run dev`.

## Step 4: Make it yours

In the file list, open `src/App.jsx`. This file is the component that describes your page. Replace everything in it with:

```jsx
export default function App() {
  return (
    <main>
      <p className="tag">WELCOME</p>
      <h1>Hi, I'm Ada. I build websites.</h1>
      <p>
        I'm learning to build useful websites for people and businesses.
        Here's what I've made so far.
      </p>
      <a href="#work">See my work</a>
      <section id="work">
        <h2>Project one</h2>
        <p>My first website, built and published by me.</p>
      </section>
    </main>
  )
}
```

Change Ada to your own name and write a line about yourself. The link points to `#work`, which matches the section's `id`, so tapping it jumps down to your projects. Save, and your browser updates on its own.

Now the look. Open `src/index.css` and replace everything with:

```css
* { box-sizing: border-box; }
body {
  margin: 0;
  background: #faf8f4;
  color: #151515;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
main { max-width: 720px; margin: auto; padding: 56px 20px; }
h1 { font-size: clamp(2.2rem, 7vw, 3.6rem); line-height: 1.1; }
.tag { font-weight: 700; letter-spacing: 0.1em; color: #b8400f; }
a { color: #b8400f; font-weight: 700; }
a:focus-visible { outline: 3px solid #b8400f; outline-offset: 4px; }
section { margin-top: 56px; }
```

**CSS** controls how the page looks: colours, spacing and sizes. The `clamp()` line makes the heading shrink on phones and grow on laptops. Save and look again.

Leave `src/main.jsx` alone: it loads your component and your styles. In `index.html`, change the text between `<title>` and `</title>` to your name. That's what shows in the browser tab.

**Try this:** add a second project section, change the background colour, or rewrite your introduction. Make one change at a time and watch what happens. It's the fastest way to learn what each line does.

### Getting help from AI

Once the page works, an AI assistant can help you improve it. Tell it what to keep, not just what to add. For example:

```text
I'm building a one-page React + Vite personal website. Keep the current setup.
Add three project cards to App.jsx and style them in index.css so they look
good on a phone. Don't add new packages or outside services. Explain each
change so I understand it, and tell me how to check it works.
```

Read what it changes, ask about anything you don't understand, and check the result in your browser. Keep a first site simple: a WhatsApp or email link is much easier than a contact form, which needs somewhere to send the messages.

## Step 5: Build the version visitors will see

Before publishing, Vite packs your project into a small, fast set of files. This is called a **production build**. Stop the dev server with Ctrl+C, then run:

```bash
npm run build
npm run preview
```

The build creates a folder called `dist` holding your finished site. `npm run preview` shows that finished version at an address like `http://localhost:4173`. It's still only on your laptop.

Check it properly:

- Tap every link.
- Make the browser window narrow to see it at phone size.
- Press **Tab** and **Enter** to make sure the link works from the keyboard.
- Remove any sample text you don't want the world to see.

If the build shows an error, fix it before moving on.

## Step 6: Save your project to GitHub

**Git** records versions of your files. Each saved version is a **commit**, and your files plus their history make a **repository**. **GitHub** keeps a copy of that repository online, which your hosting service reads every time you update the site.

1. Install Git from [git-scm.com](https://git-scm.com/downloads) and create a free GitHub account.
2. Restart VS Code and run `git --version` to check that Git is installed.
3. **Never upload passwords, API keys or private details.** This project has none. If you add one later, remember that anything in a Vite `VITE_` variable ends up in the browser, so it's not a safe place for secrets.
4. In VS Code, open **Source Control** and choose **Initialize Repository**. If Git asks for your name and email, use GitHub's private no-reply email if you'd rather keep your own address out of your commits.
5. Stage your files with the **+** buttons, type `My first website` as the message, and choose **Commit**.
6. Open the Command Palette (**Ctrl+Shift+P** on Windows, **Cmd+Shift+P** on Mac), run **Publish to GitHub**, sign in and pick a name. A private repository is fine.
7. Open the repository on GitHub and check your files are there.

The starter's `.gitignore` file already leaves out `node_modules` and `dist`, which is what you want: the hosting service installs the packages and builds the site itself.

## Step 7: Put it online

**Hosting** means keeping your site on a computer that's always connected, so it stays up even when your laptop is closed. Your site is **static**: finished files the browser downloads and runs. Static doesn't mean boring. Buttons and animations still work, because they run in the visitor's browser.

Four free places that host a site like this:

| Host | Worth knowing |
|---|---|
| **Vercel** | Connects to GitHub and republishes on every update. Its free Hobby plan is for **personal, non-commercial use** only, so it suits this personal site but not a business's site. |
| **Cloudflare Pages** | Connects to GitHub or takes a folder upload. Its free plan allows business websites, so it's the one to use for sites you build for clients. |
| Netlify | A similar GitHub workflow. Check its current free limits before relying on it. |
| GitHub Pages | Fine for personal and project pages, but not meant as a free host for businesses. |

Always check a plan's rules and limits before you rely on it.

### Option A: Vercel (your personal site)

1. Create a Vercel account and choose **Add New → Project**.
2. Import your GitHub repository and give Vercel access to it.
3. Check the settings Vercel detects: **Framework Preset:** Vite, **Build Command:** `npm run build`, **Output Directory:** `dist`. Leave the install command as it is.
4. Choose **Deploy**.

When it finishes, open the address ending in `.vercel.app`. That's your website, live on the internet. Open it in a private browser window while signed out: if it asks you to log in, you've copied a protected preview link instead of the main one. Your repository can stay private while the site is public.

### Option B: Cloudflare Pages (for client and business sites)

1. Create a free Cloudflare account and open **Workers & Pages**, then create a Pages project and choose to connect to Git.
2. Pick your repository.
3. Set **Build command:** `npm run build` and **Build output directory:** `dist`.
4. Choose **Save and Deploy**.

Your site goes live at an address ending in `.pages.dev`. This is the setup we use in the course for every site you build for a paying client.

Either way: you did it. Send the link to someone.

## Step 8 (optional): Get your own address

Your free address already works. A custom **domain**, like `yourname.com` or `yourname.com.ng`, is an address you choose, and you can add one any time.

The domain and the hosting are separate things. You can buy the domain from one company (a **registrar**) and host the site somewhere else. You don't need the hosting bundles registrars offer at checkout.

When comparing registrars:

- Compare the **renewal** price, not just the first-year offer. Domains are rented yearly, not bought forever.
- Check whether the name is marked "premium" and whether privacy protection is included.
- Prices change, so trust the checkout page over any old price list.
- Turn on auto-renew or set a reminder so you don't lose the name.

To connect it, open your host's **Domains** settings and add the domain. The host shows you the exact **DNS records** to add (DNS is the internet's address book). Add them wherever your domain's DNS is managed, usually your registrar or Cloudflare, then wait for the host to confirm. Copy the records from your own dashboard, not from another tutorial, and leave any email records alone.

## Step 9: Keep improving it

Updating your site is now a simple loop:

1. Open the project in VS Code and run `npm run dev`.
2. Make your change and check it in the browser.
3. Run `npm run build` to make sure it still builds.
4. Commit in Source Control and push to GitHub.
5. Your host spots the push, rebuilds and publishes the new version automatically.

## If you get stuck

- **"Can't find package.json":** you're in the wrong folder. Open `my-first-website` itself and start a new terminal.
- **The local page won't open:** check that the dev server is still running and use the exact address it printed, including the port number.
- **The online build fails:** read the first real error in the build log. Check that every file was committed, and check capital letters: `Photo.png` and `photo.png` are different files on the server.
- **A page like `/about` shows 404 when refreshed:** this site uses a jump link, so it won't happen here. If you add separate pages later, follow your host's instructions for Vite routing.

## What's next

You can now build a page, preview it and publish it to the world. That's the foundation of everything on the web.

> **Ready to build websites businesses pay for?** This guide builds one personal page by hand. The [Fast Track](/tracks/fast-track) goes much further in 14 self-paced lessons: business websites, landing pages, online stores with Paystack, booking systems and web apps. You build them with a free AI builder and host them free on Cloudflare, then learn what to charge and how to pitch real clients. ₦15,000, paid once, with lifetime access and no coding background needed.

> **Want the full skill set?** The [Main Track](/tracks/main-track) includes everything in the Fast Track, plus SEO that gets businesses found on Google, automations that save them hours, AI agents that answer their customers, and a lead-generation system to keep clients coming. That's 26 lessons for ₦30,000, paid once. [Compare both tracks](/pricing) and start today. You'll need a laptop or desktop to build.
