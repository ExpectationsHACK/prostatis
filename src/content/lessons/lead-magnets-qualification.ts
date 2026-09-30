import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "lead-magnets-qualification",
  title: "Lead magnets & qualification",
  minutes: 90,
  outcome: "A free offer that attracts business owners, a live page for it, a booking link for calls, and a short script to decide who gets a proposal.",
  intro:
    "Cold messages work much better when you lead with something **useful and free**. A **lead magnet** is that free thing, like a quick website check-up. Then **qualification** makes sure you spend your time on people who can actually buy. Today you'll build both, so every conversation you start next has a clear, generous first step.",
  youNeed: ["Your SEO audit skills from the content & audit lesson", "Your live site (for the lead magnet page)", "A free Cal.com account for booking calls", "Your prospect list"],
  sections: [
    {
      heading: "Step 1: Choose a lead magnet",
      blocks: [
        { t: "define", term: "Lead magnet", meaning: "Something valuable you give away free to start a relationship with a potential client: an audit, a checklist, a sample design.", like: "the free taste at a suya spot. One bite and you buy a full stick." },
        { t: "p", text: "The best lead magnets are **quick to deliver**, **specific to the business**, and **show your skill**. You already know how to make the best one: a **free website check-up** (the audit from Week 2)." },
        { t: "figure", figure: { product: "leadgen", caption: "A lead-magnet page: the free audit offer, a short form and a booking link." } },
        { t: "tool", slug: "lead-magnet-ideas", why: "Ideas by niche: audits, checklists, mockups, calculators, with delivery effort and how well each converts." },
        { t: "table", columns: ["Lead magnet", "Why it works"], rows: [["A free 5-point website check-up", "Shows real problems with their site, creates urgency"], ["A homepage mockup", "They see their business looking better, very persuasive"], ["A Google profile check", "Quick, local, easy to understand"], ["“How much are no-shows costing you?” calculator", "Puts a naira number on the problem"]] },
        { t: "check", q: "Which lead magnet best fits someone who sells websites?", options: ["A free phone case", "A free 5-point website check-up of their business", "A random e-book about marketing"], answer: 1, why: "It shows your skill and reveals real, specific problems they care about." },
      ],
    },
    {
      heading: "Step 2: A page for your offer",
      blocks: [
        { t: "p", text: "Build a one-page site for your offer, a landing page, like Day 5: a headline, what they get, a sample, and a short form or WhatsApp button. Link to it in your bio, your messages and your posts." },
        { t: "tool", slug: "landing-page-copy-generator", why: "Writes the copy for your lead-magnet page." },
        { t: "tool", slug: "landing-page-checklist", why: "Paste your live page link to check it against conversion best practice." },
        { t: "tool", slug: "hook-line-generator", why: "Opening lines for posts and messages that promote the free check-up." },
        { t: "try", title: "Make a sample check-up", minutes: 20, steps: ["Pick one business from your list.", "Run the speed and on-page tools on its website.", "Write 5 findings in plain English on one page. This becomes the sample on your offer page."] },
      ],
    },
    {
      heading: "Step 3: Qualify before you propose",
      blocks: [
        { t: "define", term: "Qualification", meaning: "Checking, with a few questions, whether a lead can actually become a client, before you spend hours on a proposal.", like: "a bank checking you can repay before approving a loan." },
        { t: "p", text: "Not everyone who says yes to something free will pay. Before writing a proposal, have a short call or chat to check four things, often called **BANT**:" },
        { t: "table", columns: ["Check", "Question to ask"], rows: [["**B**udget", "“Projects like this usually cost between ₦X and ₦Y. Does that work for you?”"], ["**A**uthority", "“Who else is involved in deciding?”"], ["**N**eed", "“What happens if nothing changes in the next 3 months?”"], ["**T**imeline", "“When would you want this live?”"]] },
        { t: "tool", slug: "lead-qualification", why: "A qualification script and scoring sheet to use on calls." },
        { t: "tip", text: "Mention a price **range** early. People who can't afford it step back politely, and serious buyers appreciate the honesty." },
        { t: "scenario", title: "The proposal nobody read", text: "Emeka spent a whole evening on a beautiful proposal for a restaurant, then learned the manager had no authority and the owner was abroad. Now he asks “Who else decides?” on every first call. Two minutes of questions saves hours of wasted work." },
      ],
    },
    {
      heading: "Step 4: Make booking a call easy",
      blocks: [
        { t: "p", text: "Create a free Cal.com (or Calendly) link for a 20-minute “website review call”, and put it at the end of every check-up you send." },
        { t: "mistakes", items: [{ wrong: "A lead magnet that takes you 5 hours per business", right: "Something you can deliver in under an hour" }, { wrong: "Writing a proposal for everyone who replies", right: "Qualifying budget, authority, need and timeline first" }, { wrong: "Hiding the price until the end", right: "Sharing a price range early and honestly" }] },
      ],
    },
  ],
  task: {
    title: "Build your lead engine",
    steps: ["Pick your lead magnet and make one real sample.", "Build and publish its page.", "Check the page with the landing page checklist.", "Write your qualification questions.", "Create a booking link for 20-minute calls."],
    done: ["My lead magnet can be delivered in under an hour", "The offer page is live with one clear action", "My questions cover budget, authority, need and timeline", "My booking link works"],
  },
  recap: [
    "A **lead magnet** is a free, valuable offer that starts the relationship, for us, a **website check-up** works best.",
    "The best lead magnets are quick to deliver, specific to the business, and show your skill.",
    "**BANT** = Budget, **Authority** (who decides), Need, Timeline: check these before writing a proposal.",
    "Mention a **price range early**: it saves everyone's time and builds trust.",
    "Write proposals only **after qualifying**: they take time, so spend it on real buyers.",
  ],
  resources: [
    { label: "Shopify: What is a lead magnet?", url: "https://www.shopify.com/blog/lead-magnet", note: "Types and examples of lead magnets." },
    { label: "Cal.com", url: "https://cal.com", note: "Free booking links for calls." },
    { label: "HubSpot: BANT explained", url: "https://blog.hubspot.com/sales/bant", note: "The classic qualification framework." },
    { label: "Carrd", url: "https://carrd.co", note: "A quick one-page site builder, if you want an alternative." },
  ],
  quiz: [
    { q: "What is a lead magnet?", options: ["A paid advert", "A free, valuable offer that attracts potential clients", "A type of magnet", "A payment request"], answer: 1, why: "It starts the relationship by giving value first.", from: 0 },
    { q: "What makes a good lead magnet?", options: ["It takes days to make", "Quick to deliver, specific to the business, and shows your skill", "It's about you, not them", "It costs them money"], answer: 1, why: "Quick, specific and skill-showing is what converts.", from: 1 },
    { q: "What does the “A” in BANT stand for?", options: ["Address", "Authority: who decides", "Analytics", "Amount"], answer: 1, why: "Budget, Authority, Need, Timeline.", from: 2 },
    { q: "Why mention a price range early?", options: ["To scare people", "It saves everyone's time: people who can't afford it step back", "It's the law", "To look expensive"], answer: 1, why: "Honesty about price filters leads and builds trust.", from: 3 },
    { q: "When should you write a proposal?", options: ["For everyone who replies", "After qualifying budget, authority, need and timeline", "Before speaking to them", "Never"], answer: 1, why: "Proposals take time: spend it on qualified leads.", from: 4 },
  ],
};

export default lesson;
