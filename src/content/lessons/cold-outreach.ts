import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "cold-outreach",
  title: "Cold outreach & follow-ups",
  minutes: 90,
  outcome: "Personalised outreach messages, a 4-touch follow-up sequence and a tracking sheet — with your first messages sent.",
  intro:
    "Today you contact real businesses. It feels scary the first time; it gets easy fast. The rules are simple: be specific, be short, be helpful, follow up politely, and never spam. You'll send your first 10 messages before the end of the lesson.",
  sections: [
    {
      heading: "Anatomy of a message that gets replies",
      blocks: [
        { t: "list", items: ["**Personal opener** — something specific about them (not “Dear Sir/Ma”).", "**The observation** — the one problem you found in your research.", "**The value** — what fixing it means for them, in customers or naira.", "**A small ask** — “Can I send you the free 5-point audit?” (not “Can we have a meeting?”)."] },
        { t: "table", columns: ["Weak", "Strong"], rows: [["Hello, I am a web developer. I build websites. Do you need a website?", "Hi Chioma — love the knotless braids on your IG! I noticed people can't book you online and your number isn't on Google Maps. I made a quick free audit showing 3 fixes that could bring more bookings. Can I send it?"]] },
        { t: "tool", slug: "cold-dm-script-generator", why: "Generates personalised DMs for Instagram, WhatsApp, email and LinkedIn from your research notes." },
        { t: "figure", figure: { tool: "cold-dm-script-generator", caption: "A personalised DM: opener, observation, value, and one small ask." } },
      ],
    },
    {
      heading: "Step 1 — Choose the channel",
      blocks: [
        { t: "table", columns: ["Channel", "Best for", "Tip"], rows: [["Instagram DM", "Salons, fashion, food, beauty", "Comment on a post first, then DM"], ["Email", "Clinics, schools, professional firms, foreign clients", "Short subject line, plain text, no attachments"], ["WhatsApp", "Businesses that list WhatsApp publicly for enquiries", "Very short, one message, respect if they don't reply"], ["LinkedIn", "Companies, agencies, dollar clients", "Connect with a note, then message"], ["Walk in", "Local shops near you", "Bring the audit printed or on your phone"]] },
        { t: "warn", text: "Don't add people to WhatsApp groups or broadcast lists without permission, and don't send bulk identical messages. It's spam, it damages your reputation, and it can get your number banned." },
      ],
    },
    {
      heading: "Step 2 — The follow-up sequence",
      blocks: [
        { t: "p", text: "Most replies come from follow-ups, not the first message. People are busy — a polite reminder is a favour, not an annoyance." },
        { t: "steps", items: [
          { title: "Day 0 — First message", detail: "Personal opener + observation + small ask." },
          { title: "Day 3 — Add value", detail: "Share one quick tip they can use today, even if they never hire you." },
          { title: "Day 7 — Proof", detail: "Show a relevant example: a before/after or a similar business you helped." },
          { title: "Day 14 — Polite close", detail: "“I'll stop messaging — if you ever want the audit, just reply 'audit'.”" },
        ] },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the whole 4-touch sequence for your niche and channel." },
      ],
    },
    {
      heading: "Step 3 — Track everything",
      blocks: [
        { t: "p", text: "Use a simple sheet: business, channel, date sent, follow-up dates, status (sent / replied / call booked / proposal / won / lost), notes. Review it every morning." },
        { t: "tip", text: "Aim for 10 new, personalised messages a day. In two weeks, that's 140 conversations started — enough for real results." },
      ],
    },
    {
      heading: "Handling replies",
      blocks: [
        { t: "list", items: ["“How much?” → give a range and ask a qualifying question.", "“Not now” → ask if you can check back in a month; note it.", "“We already have a website” → offer the audit: “Great — want to see how it performs on phones?”", "“No” → thank them, stop, and mark it. Politeness now can mean a referral later."] },
      ],
    },
  ],
  task: {
    title: "Start conversations",
    steps: ["Write personalised messages for your top 10 prospects.", "Send them on the right channel for each.", "Write your 4-touch follow-up sequence.", "Set up the tracking sheet with follow-up dates.", "Commit to 10 new messages a day for two weeks."],
    done: ["10 personalised messages sent today", "Each message mentions something specific to that business", "Follow-up dates are in my tracker", "I didn't send any bulk or group messages"],
  },
  resources: [
    { label: "HubSpot Academy — Sales training", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and outreach lessons." },
    { label: "Instagram — Business tips", url: "https://business.instagram.com/blog", note: "How businesses use Instagram (your prospects' world)." },
    { label: "LinkedIn Learning — Sales", url: "https://www.linkedin.com/learning/topics/sales", note: "Sales and outreach courses (some free)." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "Respect personal data rules when contacting people." },
  ],
  quiz: [
    { q: "What makes a cold message worth replying to?", options: ["A long list of your skills", "A specific observation about their business and a small, easy ask", "Many emojis", "Asking for a meeting immediately"], answer: 1, why: "Specific + helpful + low-commitment ask." },
    { q: "Where do most replies come from?", options: ["The first message", "Follow-ups", "Group messages", "Nowhere"], answer: 1, why: "Busy people often reply to the second or third touch." },
    { q: "Which is spam and should be avoided?", options: ["A personal DM", "Adding people to WhatsApp broadcast groups without permission", "A polite follow-up", "An email to a public business address"], answer: 1, why: "Unrequested bulk messaging is spam." },
    { q: "Someone replies “We already have a website.” Best response?", options: ["Argue", "Offer to show how it performs on phones with the free audit", "Block them", "Send the price list"], answer: 1, why: "Turn it into curiosity with a helpful check." },
    { q: "How many new personalised messages a day is a good target?", options: ["1 a month", "About 10", "1,000", "None"], answer: 1, why: "Consistent daily volume with quality builds a pipeline." },
  ],
};

export default lesson;
