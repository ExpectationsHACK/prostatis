import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "lead-magnets-qualification",
  title: "Lead magnets & qualification",
  minutes: 90,
  outcome: "A free offer that attracts business owners, a landing page for it, and a script to qualify who gets a proposal.",
  intro:
    "Cold messages work better when you lead with something valuable and free. A **lead magnet** is that free thing — a mini audit, a checklist, a sample. Then **qualification** makes sure you spend your time on people who can actually buy. Today you create both.",
  sections: [
    {
      heading: "Step 1 — Choose a lead magnet",
      blocks: [
        { t: "p", text: "The best lead magnets are quick to deliver, specific to the business, and show your skill. You already know how to make the best one: a **free website audit** (Day 13)." },
        { t: "tool", slug: "lead-magnet-ideas", why: "Ideas by niche: audits, checklists, mockups, calculators — with delivery effort and conversion strength." },
        { t: "table", columns: ["Lead magnet", "Why it works"], rows: [["Free 5-point website audit", "Shows real problems with their site — creates urgency"], ["Homepage mockup", "They see their business looking better — very persuasive"], ["Google Business Profile check", "Quick, local, easy to understand"], ["“How much are no-shows costing you?” calculator", "Puts a naira number on the problem"]] },
        { t: "figure", figure: { product: "leadgen", caption: "A lead-magnet page: the free audit offer, a short form and a booking link." } },
      ],
    },
    {
      heading: "Step 2 — A landing page for it",
      blocks: [
        { t: "p", text: "Make a one-page site for your offer: headline, what they get, a sample, and a short form or WhatsApp button. Link to it in your bio, your outreach and your posts." },
        { t: "tool", slug: "landing-page-copy-generator", why: "Writes the copy for your lead-magnet page." },
        { t: "tool", slug: "landing-page-checklist", why: "Paste your live page URL to check it against conversion best practices." },
        { t: "tool", slug: "hook-line-generator", why: "Opening lines for posts and messages that promote the free audit." },
      ],
    },
    {
      heading: "Step 3 — Qualify before you propose",
      blocks: [
        { t: "p", text: "Not everyone who says yes to something free will pay. Before writing a proposal, have a short call or chat to check four things (often called **BANT**):" },
        { t: "table", columns: ["Check", "Question to ask"], rows: [["Budget", "“Projects like this usually range from ₦X to ₦Y. Does that work for you?”"], ["Authority", "“Who else is involved in deciding?”"], ["Need", "“What happens if nothing changes in the next 3 months?”"], ["Timeline", "“When would you want this live?”"]] },
        { t: "tool", slug: "lead-qualification", why: "A qualification script and scoring sheet you can use on calls." },
        { t: "tip", text: "Mentioning a price range early saves everyone time. People who can't afford it self-select out politely, and serious ones appreciate the honesty." },
      ],
    },
    {
      heading: "Step 4 — Make booking a call easy",
      blocks: [
        { t: "p", text: "Create a free Cal.com or Calendly link for a 20-minute “website review call”. Put it at the end of every audit you send." },
      ],
    },
  ],
  task: {
    title: "Build your lead engine",
    steps: ["Pick your lead magnet and create a sample.", "Build and publish its landing page.", "Check the page with the landing page checklist.", "Write your qualification script.", "Create a booking link for 20-minute calls."],
    done: ["My lead magnet can be delivered in under an hour", "The landing page is live with one clear action", "My script covers budget, authority, need and timeline", "My booking link works"],
  },
  resources: [
    { label: "Shopify — What is a lead magnet?", url: "https://www.shopify.com/blog/lead-magnet", note: "Types and examples of lead magnets." },
    { label: "Cal.com", url: "https://cal.com", note: "Free booking links." },
    { label: "HubSpot — BANT explained", url: "https://blog.hubspot.com/sales/bant", note: "The classic qualification framework." },
    { label: "Carrd", url: "https://carrd.co", note: "Quick one-page sites if you want an alternative to building one." },
  ],
  quiz: [
    { q: "What is a lead magnet?", options: ["A paid ad", "A free, valuable offer that attracts potential clients", "A type of magnet", "An invoice"], answer: 1, why: "It starts the relationship by giving value first." },
    { q: "Which lead magnet fits this course best?", options: ["A free website audit", "A free car", "A random e-book", "A lottery"], answer: 0, why: "It shows your skill and reveals real problems." },
    { q: "What does the 'A' in BANT stand for?", options: ["Address", "Authority — who decides", "Analytics", "Amount"], answer: 1, why: "Budget, Authority, Need, Timeline." },
    { q: "Why mention a price range early?", options: ["To scare people", "It saves everyone's time — people who can't afford it self-select out", "It's the law", "To look expensive"], answer: 1, why: "Honesty about price filters and builds trust." },
    { q: "When should you write a proposal?", options: ["For everyone who replies", "After qualifying need, budget, authority and timeline", "Before talking", "Never"], answer: 1, why: "Proposals take time — spend it on qualified leads." },
  ],
};

export default lesson;
