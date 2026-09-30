import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "cold-outreach",
  title: "Cold outreach & follow-ups",
  minutes: 90,
  outcome: "Your first 10 personalised messages sent to real businesses, a 4-step follow-up plan, and a simple tracker you check every morning.",
  intro:
    "Today you contact real businesses. It feels scary the first time (everyone feels it), and it gets easier fast. The rules are simple: be **specific**, be **short**, be **helpful**, follow up politely, and never spam. By the end of this lesson, your first 10 messages will be sent.",
  youNeed: ["Your scored prospect list with the top 20 researched", "Your lead magnet (the free check-up) and its page", "WhatsApp, Instagram, email or LinkedIn, whichever your niche uses", "A little courage"],
  sections: [
    {
      heading: "What a message that gets replies looks like",
      blocks: [
        { t: "define", term: "Cold outreach", meaning: "Contacting a business that doesn't know you yet, to offer help. “Cold” just means you haven't spoken before.", like: "introducing yourself to a neighbour you've never met: polite, short, with a reason." },
        { t: "list", items: ["**Personal opener**: something specific about them (never “Dear Sir/Ma”).", "**The observation**: the one problem you found in your research.", "**The value**: what fixing it means for them, in customers or naira.", "**A small ask**: “Can I send you the free 5-point check-up?” (not “Can we have a meeting?”)."] },
        { t: "table", columns: ["Weak", "Strong"], rows: [["Hello, I am a web developer. I build websites. Do you need a website?", "Hi Chioma: love the knotless braids on your IG! I noticed people can't book you online and your number isn't on Google Maps. I made a quick free check-up showing 3 fixes that could bring more bookings. Can I send it?"]] },
        { t: "figure", figure: { tool: "cold-dm-script-generator", caption: "A personalised message: opener, observation, value, and one small ask." } },
        { t: "tool", slug: "cold-dm-script-generator", why: "Generates personalised messages for Instagram, WhatsApp, email and LinkedIn from your research notes." },
        { t: "check", q: "What should your first message ask for?", options: ["A contract", "A small, easy yes, like permission to send the free check-up", "Full payment", "A meeting at their office tomorrow"], answer: 1, why: "Small asks get replies. The bigger conversation comes later." },
      ],
    },
    {
      heading: "Step 1: Choose the right channel",
      blocks: [
        { t: "table", columns: ["Channel", "Best for", "Tip"], rows: [["Instagram DM", "Salons, fashion, food, beauty", "Comment genuinely on a post first, then message"], ["Email", "Clinics, schools, firms, clients abroad", "Short subject line, plain text, no attachments"], ["WhatsApp", "Businesses that publicly list WhatsApp for enquiries", "One short message; respect silence"], ["LinkedIn", "Companies, agencies, dollar clients", "Connect with a note, then message"], ["Walk in", "Local shops near you", "Bring the check-up printed or on your phone"]] },
        { t: "warn", text: "Never add people to WhatsApp groups or broadcast lists without permission, and never send bulk copy-paste messages. It's spam, it damages your name, and it can get your number banned." },
      ],
    },
    {
      heading: "Step 2: The follow-up sequence",
      blocks: [
        { t: "p", text: "Many replies come from follow-ups, not the first message. Owners are busy: a polite reminder is a favour, not an annoyance." },
        { t: "figure", figure: { diagram: "outreach-sequence", caption: "Four gentle touches over two weeks, each one adding value." } },
        {
          t: "steps",
          items: [
            { title: "Day 0: First message", detail: "Personal opener + observation + small ask." },
            { title: "Day 3: Add value", detail: "Share one quick tip they can use today, even if they never hire you." },
            { title: "Day 7: Show proof", detail: "A relevant example: a before/after, or a similar business you've helped." },
            { title: "Day 14: A polite last note", detail: "“I'll stop messaging, if you ever want the check-up, just reply ‘audit’.”" },
          ],
        },
        { t: "define", term: "Follow-up", meaning: "A polite later message to someone who hasn't replied yet, each one adding something useful, not just “any update?”.", like: "a friendly second knock on a door, in case they didn't hear the first." },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the whole 4-step sequence for your niche and channel." },
      ],
    },
    {
      heading: "Step 3: Track everything",
      blocks: [
        { t: "p", text: "Use a simple sheet: business, channel, date sent, follow-up dates, status (sent / replied / call booked / proposal / won / lost) and notes. Check it every morning." },
        { t: "tip", text: "Aim for **about 10 new, personalised messages a day**. In two weeks that's over 100 conversations started, enough for real results." },
        { t: "try", title: "Send your first 3 right now", minutes: 15, steps: ["Take your top 3 researched prospects.", "Write each a personal message using the four-part structure.", "Send them: don't wait until they're perfect. Log them in your tracker."] },
      ],
    },
    {
      heading: "Handling replies",
      blocks: [
        { t: "list", items: ["“How much?” → give a range, then ask a qualifying question.", "“Not now” → ask if you can check back in a month; note the date.", "“We already have a website” → “Great, would you like to see how it performs on phones?”", "“No” → thank them, stop, and mark it. Politeness now can mean a referral later."] },
        { t: "scenario", title: "The “no” that became a referral", text: "A caterer told Bola, “No thanks, my nephew handles my website.” Bola replied, “No problem at all, wishing you a great Christmas season!” Two months later the caterer sent her a friend who ran an event centre. The polite reply cost nothing." },
        { t: "mistakes", items: [{ wrong: "“Dear Sir/Ma, I am a web developer…”", right: "“Hi Chioma: I noticed your salon can't take bookings online…”" }, { wrong: "Giving up after one message", right: "A polite 4-step sequence over two weeks" }, { wrong: "Arguing with someone who says no", right: "Thanking them and stopping" }] },
      ],
    },
  ],
  task: {
    title: "Start conversations",
    steps: ["Write personalised messages for your top 10 prospects.", "Send them on the right channel for each.", "Write your 4-step follow-up sequence.", "Set up the tracker with follow-up dates.", "Commit to about 10 new messages a day for two weeks."],
    done: ["10 personalised messages are sent", "Each message mentions something specific to that business", "Follow-up dates are in my tracker", "I didn't send any bulk or group messages"],
  },
  recap: [
    "A message worth replying to has a **specific observation about their business** and a **small, easy ask**.",
    "**Follow-ups** bring many of the replies, busy owners often answer the second or third message.",
    "Adding people to WhatsApp groups or broadcasts without permission, or bulk copy-paste messages, is **spam**.",
    "If someone says “we already have a website”, **offer the check-up**: “Would you like to see how it performs on phones?”",
    "Aim for about **10 new personalised messages a day**, steady, quality volume builds a pipeline.",
  ],
  resources: [
    { label: "HubSpot Academy: Sales training", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and outreach lessons." },
    { label: "Instagram: Business tips", url: "https://business.instagram.com/blog", note: "How businesses use Instagram (your prospects' world)." },
    { label: "LinkedIn Learning: Sales", url: "https://www.linkedin.com/learning/topics/sales", note: "Sales and outreach courses (some free)." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "Respect personal data rules when contacting people." },
  ],
  quiz: [
    { q: "What makes a cold message worth replying to?", options: ["A long list of your skills", "A specific observation about their business and a small, easy ask", "Lots of emojis", "Asking for a meeting straight away"], answer: 1, why: "Specific + helpful + low-commitment.", from: 0 },
    { q: "Where do many replies come from?", options: ["Only the first message", "Follow-ups", "Group messages", "Nowhere"], answer: 1, why: "Busy people often reply to the second or third touch.", from: 1 },
    { q: "Which of these is spam?", options: ["A personal DM", "Adding people to WhatsApp broadcast groups without permission", "A polite follow-up", "An email to a public business address"], answer: 1, why: "Unrequested bulk messaging is spam.", from: 2 },
    { q: "Someone replies “We already have a website.” What's the best response?", options: ["Argue", "Offer to show how it performs on phones with the free check-up", "Block them", "Send your price list"], answer: 1, why: "Turn it into curiosity with a helpful check.", from: 3 },
    { q: "How many new personalised messages a day is a good target?", options: ["One a month", "About 10", "1,000", "None"], answer: 1, why: "Consistent daily volume, with quality, builds a pipeline.", from: 4 },
  ],
};

export default lesson;
