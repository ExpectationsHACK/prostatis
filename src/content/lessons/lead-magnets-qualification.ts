import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "lead-magnets-qualification",
  title: "Lead magnets & qualification",
  minutes: 90,
  outcome: "A free website check-up offer for your niche, a live page for it on your portfolio site, a free booking link for 20-minute calls, and four questions that decide who is ready to buy.",
  intro:
    "Messages to business owners who don't know you work much better when you open with something **useful and free**. You already know how to make the best free gift for a business owner: the website check-up you wrote in Week 2. Today you'll turn it into an offer with its own page, and learn four questions that make sure you spend your time on people who can actually buy, so every conversation you start next week has a clear, generous first step.",
  core: "Lead with a quick, specific free offer that shows your skill, then ask about budget, authority, need and timeline before writing any proposal.",
  youNeed: ["Your website check-up report from Week 2", "Your portfolio site (the offer page can live there)", "Your free Cal.com account from Day 8 (or a new one)", "Your prospect list"],
  sections: [
    {
      heading: "Step 1: Choose your free offer",
      blocks: [
        {
          t: "define",
          term: "Proposal",
          like: "a builder's quotation, written so the customer understands it without being a builder.",
          meaning: "A short document that explains the client's situation, what you'll deliver, the timeline, the price, and exactly how to say yes. You'll write one properly on Day 24; today is about deciding who deserves one.",
        },
        {
          t: "define",
          term: "Lead magnet",
          like: "the free taste at a suya spot: one bite, and you buy a full stick.",
          meaning: "Something valuable you give away free to start a relationship with a potential client: a check-up, a checklist, a sample design.",
        },
        { t: "p", text: "The best free offers are **quick to deliver**, **specific to the business**, and **show your skill**. For website work, a **free 5-point website check-up** wins: it shows real problems with their own site and creates gentle urgency." },
        { t: "figure", figure: { product: "leadgen", caption: "A free-offer page: the check-up, a short form and a booking link." } },
        { t: "tool", slug: "lead-magnet-ideas", why: "Ideas by niche (check-ups, checklists, mockups, calculators) with how long each takes to deliver." },
        { t: "table", columns: ["Free offer", "Why it works"], rows: [["A 5-point website check-up", "Shows real problems with their own site"], ["A homepage mockup", "They see their business looking better: very persuasive"], ["A Google profile check", "Quick, local, easy to understand"], ["“How much are missed fittings costing you?” calculator", "Puts a naira number on the problem"]] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "magnet", label: "free website check-up" }, { draw: "people", label: "interested owners" }, { draw: "calendar", label: "20-minute call" }, { draw: "handshake", label: "the right ones get a proposal", hot: true }] },
          caption: "How a free offer becomes work: the check-up attracts interested owners, a short call follows, and only the owners who can really buy receive a full proposal.",
        },
        { t: "check", q: "Which free offer best fits someone who sells websites?", options: ["A free phone case", "A free 5-point check-up of their own website", "A random e-book about marketing"], answer: 1, why: "It shows your skill and reveals real, specific problems they care about." },
      ],
    },
    {
      heading: "Step 2: A page for your offer",
      blocks: [
        { t: "p", text: "Build a landing page for the offer, exactly like Day 5, as `offer.html` on your portfolio site: a headline, what they get, a sample check-up, and one button (a WhatsApp message or a short form). Link to it from your bio, your messages and your posts." },
        { t: "tool", slug: "landing-page-copy-generator", why: "Writes the words for your free-offer page." },
        { t: "tool", slug: "landing-page-checklist", why: "Paste your live offer page to check it against what makes pages convert." },
        { t: "tool", slug: "hook-line-generator", why: "Opening lines for posts and messages that promote the free check-up." },
        { t: "try", title: "Make a sample check-up", minutes: 20, steps: ["Pick one business from your list.", "Run the speed and on-page tools on its website.", "Write 5 findings in plain English on one page (with permission, or anonymised). This becomes the sample on your offer page."] },
      ],
    },
    {
      heading: "Step 3: Check before you propose",
      blocks: [
        {
          t: "define",
          term: "Qualification",
          like: "a bank checking you can repay before approving a loan.",
          meaning: "Checking, with a few questions, whether an interested person can actually become a client, before you spend hours on a proposal.",
        },
        {
          t: "define",
          term: "BANT",
          like: "the four questions a careful landlord asks before handing over keys: can you pay, are you the one signing, do you need the place, and when do you move in?",
          meaning: "Four checks before a proposal: **B**udget, **A**uthority (who decides), **N**eed, **T**imeline.",
        },
        { t: "table", columns: ["Check", "Question to ask"], rows: [["**B**udget", "“Projects like this usually cost between ₦X and ₦Y. Does that work for you?”"], ["**A**uthority", "“Who else is involved in deciding?”"], ["**N**eed", "“What happens if nothing changes in the next 3 months?”"], ["**T**imeline", "“When would you want this live?”"]] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "naira", label: "Budget: can they pay?" }, { draw: "person", label: "Authority: who decides?" }, { draw: "warning", label: "Need: what if nothing changes?" }, { draw: "calendar", label: "Timeline: when?", hot: true }] },
          caption: "The four BANT questions, like a careful landlord's: can they pay, who signs, how badly do they need it, and when. Only owners who pass all four get a full proposal.",
        },
        { t: "tool", slug: "lead-qualification", why: "A qualification script and scoring sheet to use on calls." },
        { t: "tip", text: "Mention a price **range** early. People who can't afford it step back politely, and serious buyers appreciate the honesty." },
        {
          t: "scenario",
          title: "The proposal nobody read",
          text: "Picture spending a whole evening on a beautiful proposal for a restaurant, then learning that the manager you spoke to can't approve anything and the owner lives abroad. Asking “Who else decides?” on the first call would have saved the evening. Two minutes of questions save hours of wasted work.",
        },
      ],
    },
    {
      heading: "Step 4: Make booking a call easy",
      blocks: [
        { t: "steps", items: [{ title: "Create the call type", detail: "In Cal.com: **Event Types** → **New** → “20-minute website review”, 20 minutes, a short description of what you'll cover." }, { title: "Use it everywhere", detail: "Put the link at the end of every check-up you send, on your offer page, and in your WhatsApp quick replies." }] },
        { t: "mistakes", items: [{ wrong: "A free offer that takes you 5 hours per business", right: "Something you can deliver in under an hour" }, { wrong: "Writing a proposal for everyone who replies", right: "Checking budget, authority, need and timeline first" }, { wrong: "Hiding the price until the end", right: "Sharing a price range early and honestly" }] },
        { t: "win", title: "Your free offer is live", proved: "you can open conversations by giving something genuinely useful, and spot quickly who is ready to buy.", cue: "Share the offer page on your Status today. Finish your mission for the **Lead engine** badge." },
      ],
    },
  ],
  task: {
    title: "Build your free-offer engine",
    steps: ["Pick your free offer and make one real sample.", "Build and publish its page on your portfolio site.", "Check the page with the landing page checklist.", "Write your four qualification questions.", "Create a free booking link for 20-minute calls."],
    done: ["My free offer can be delivered in under an hour", "The offer page is live with one clear action", "My questions cover budget, authority, need and timeline", "My booking link works"],
  },
  recap: [
    "A **lead magnet** is a free, valuable offer that starts the relationship: for website work, a **free website check-up** works best.",
    "The best lead magnets are **quick to deliver, specific to the business, and show your skill**.",
    "**BANT** = Budget, **Authority** (who decides), Need, Timeline: check these before writing a proposal.",
    "Mention a **price range early**: it saves everyone's time and builds trust.",
    "Write proposals only **after qualifying** (checking budget, authority, need and timeline): they take time, so spend it on real buyers.",
  ],
  resources: [
    { label: "Shopify: what is a lead magnet?", url: "https://www.shopify.com/blog/lead-magnet", note: "Types and examples of free offers." },
    { label: "Cal.com", url: "https://cal.com", note: "Free booking links for calls." },
    { label: "HubSpot: BANT explained", url: "https://blog.hubspot.com/sales/bant", note: "The classic qualification checklist." },
    { label: "Carrd", url: "https://carrd.co", note: "A quick one-page builder, if you want an alternative." },
  ],
  quiz: [
    { q: "Which free offer will open the most doors for someone who sells websites?", options: ["A free phone case", "A free 5-point check-up of the owner's own website", "A general e-book about marketing", "A discount voucher"], answer: 1, why: "It shows your skill and reveals real problems they care about.", from: 0, aim: "core" },
    { q: "What makes a good free offer?", options: ["It takes days to make", "Quick to deliver, specific to the business, and shows your skill", "It's about you, not them", "It costs them money"], answer: 1, why: "Quick, specific and skill-showing is what gets replies. Tomorrow it becomes the small ask in your messages.", from: 1, aim: "cold-outreach" },
    { q: "A restaurant manager loves your ideas, but the owner, who lives abroad, makes every decision. Which check is missing?", options: ["Budget", "Authority: who decides", "Need", "Timeline"], answer: 1, why: "Talk to the person who decides before writing a proposal.", from: 2, aim: "proposals-pricing" },
    { q: "Why mention a price range early?", options: ["To scare people", "It saves everyone's time: people who can't afford it step back, buyers trust you", "It's the law", "To look expensive"], answer: 1, why: "Honesty about price filters leads and builds trust, and makes your proposal easier to accept.", from: 3, aim: "proposals-pricing" },
    { q: "When should you write a full proposal?", options: ["For everyone who replies", "After checking budget, authority, need and timeline", "Before speaking to them", "Never"], answer: 1, why: "Proposals take time: spend it on qualified buyers.", from: 4, aim: "proposals-pricing" },
  ],
  celebrate: {
    title: "Day 22 complete: your offer is out there",
    proved: "You can open conversations by giving something genuinely useful, and quickly spot who is ready to buy.",
    badge: "Lead engine",
    badgeDesc: "Launched a free offer and a qualification script",
  },
};

export default lesson;
