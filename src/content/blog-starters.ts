import type { PostInput } from "@/lib/blog-shared";

/**
 * Three starter articles the admin can add as drafts ("Add starter posts"), review and publish.
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
    author_name: "Prostatis",
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
    author_name: "Prostatis",
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
    author_name: "Prostatis",
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
];
