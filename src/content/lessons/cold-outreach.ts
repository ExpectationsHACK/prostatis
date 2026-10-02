import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "cold-outreach",
  title: "Cold outreach & follow-ups",
  minutes: 90,
  outcome: "Your first 10 personal messages sent to real businesses, a four-step follow-up plan for each, and a simple tracker you check every morning.",
  intro:
    "Today you contact real businesses. It feels scary the first time (everyone feels it), and it gets easier fast. The rules are simple: be **specific**, be **short**, be **helpful**, follow up politely, and never spam. You already have everything you need: a researched list, a free check-up to offer and a portfolio to prove you can do the work. By the end of this lesson, your first 10 messages will be sent.",
  core: "Open with one specific observation about their business, ask for a small yes, follow up politely, and never send bulk or unwanted group messages.",
  youNeed: ["Your scored prospect list with the top 20 researched", "Your free check-up offer and its page", "WhatsApp, Instagram, email or LinkedIn, whichever your niche uses", "A little courage"],
  sections: [
    {
      heading: "What a message that gets replies looks like",
      blocks: [
        {
          t: "define",
          term: "Cold outreach",
          also: ["Cold message"],
          like: "introducing yourself to a new neighbour: polite, short, and with a real reason to talk.",
          meaning: "Contacting a business that doesn't know you yet, to offer help. The first message is a **cold message**. “Cold” just means you haven't spoken before.",
        },
        { t: "list", items: ["**A personal opener**: something specific about them (never “Dear Sir/Ma”).", "**The observation**: the one problem you found in your research.", "**The value**: what fixing it would mean for them, in customers or naira.", "**A small ask**: “Can I send you the free 5-point check-up?” (not “Can we have a meeting?”)."] },
        { t: "table", columns: ["Weak", "Strong"], rows: [["Hello, I am a web developer. I build websites. Do you need a website?", "Hi Chioma! Your Ankara gowns on Instagram are beautiful. I noticed people can't book a fitting online and your number isn't on Google Maps. I made a quick free check-up with 3 fixes that could bring more orders. Can I send it?"]] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "search", label: "one specific observation" }, { draw: "chat", label: "four short sentences" }, { draw: "gift", label: "a free check-up offer" }, { draw: "check", label: "a small yes", hot: true }] },
          caption: "The shape of a message that gets replies: show you looked at their business, keep it to four sentences, offer something free and useful, and ask only for a small yes.",
        },
        { t: "figure", figure: { tool: "cold-dm-script-generator", caption: "A personal message: opener, observation, value and one small ask." } },
        { t: "tool", slug: "cold-dm-script-generator", why: "Writes personal messages for Instagram, WhatsApp, email and LinkedIn from your research notes." },
        { t: "check", q: "What should your first message ask for?", options: ["A contract", "A small, easy yes, like permission to send the free check-up", "Full payment", "A meeting at their office tomorrow"], answer: 1, why: "Small asks get replies. The bigger conversation comes later." },
      ],
    },
    {
      heading: "Step 1: Choose the right channel",
      blocks: [
        { t: "table", columns: ["Channel", "Best for", "Tip"], rows: [["Instagram DM", "Tailors, salons, food, beauty", "Comment genuinely on a post first, then message"], ["Email", "Clinics, schools, firms, clients abroad", "Short subject line, plain text, no attachments"], ["WhatsApp", "Businesses that publicly list WhatsApp for enquiries", "One short message; respect silence"], ["LinkedIn", "Companies, agencies, dollar clients", "Connect with a note, then message"], ["Walk in", "Shops near you", "Bring the check-up on your phone"]] },
        { t: "warn", text: "Never add people to WhatsApp groups or broadcast lists without permission, and never send bulk copy-paste messages. It's spam, it damages your name, and it can get your number banned." },
      ],
    },
    {
      heading: "Step 2: The follow-up plan",
      blocks: [
        {
          t: "define",
          term: "Follow-up",
          like: "a friendly second knock on a door, in case they didn't hear the first.",
          meaning: "A polite later message to someone who hasn't replied yet, adding something useful each time, not just “any update?”.",
        },
        { t: "p", text: "Many replies come from follow-ups, not the first message. Owners are busy: a polite reminder that adds something useful is a favour, not an annoyance." },
        { t: "figure", figure: { diagram: "outreach-sequence", caption: "Four gentle touches over two weeks, each one adding value." } },
        {
          t: "steps",
          items: [
            { title: "Day 0: the first message", detail: "Personal opener + observation + small ask." },
            { title: "Day 3: add value", detail: "One quick tip they can use today, even if they never hire you." },
            { title: "Day 7: show proof", detail: "A relevant example: a before-and-after, or your practice project for a similar business." },
            { title: "Day 14: a polite last note", detail: "“I'll stop messaging now. If you ever want the check-up, just reply ‘check-up’.”" },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "door", label: "day 0: hello" }, { draw: "bulb", label: "day 3: a free tip" }, { draw: "star", label: "day 7: an example" }, { draw: "flag", label: "day 14: a polite last note", hot: true }] },
          caption: "Four friendly knocks over two weeks, each bringing something useful, then a gracious stop. Most replies come from the second or third knock.",
        },
        { t: "tool", slug: "follow-up-sequence-generator", why: "Writes the whole four-step plan for your niche and channel." },
      ],
    },
    {
      heading: "Step 3: Track everything",
      blocks: [
        { t: "p", text: "Use a simple sheet as your pipeline (Day 18): business, channel, date sent, follow-up dates, status (sent / replied / call booked / proposal / won / lost) and notes. Check it every morning." },
        { t: "tip", text: "Aim for **about 10 new personal messages a day**. In two weeks that's over 100 conversations started: enough for real results." },
        { t: "try", title: "Send your first 3 right now", minutes: 15, steps: ["Take your top 3 researched prospects.", "Write each a personal message using the four-part shape.", "Send them: don't wait until they're perfect. Log them in your tracker with follow-up dates."] },
      ],
    },
    {
      heading: "Handling replies",
      blocks: [
        { t: "list", items: ["“How much?” → give a range, then ask one of your qualification questions.", "“Not now” → ask if you can check back in a month; note the date.", "“We already have a website” → “Great! Would you like to see how it performs on phones?”", "“No” → thank them, stop, and mark it. Politeness now can mean a referral later."] },
        {
          t: "scenario",
          title: "The “no” that became a referral",
          text: "Picture a caterer replying: “No thanks, my nephew handles my website.” You answer: “No problem at all. Wishing you a great Christmas season!” Two months later the caterer sends you a friend who runs an event centre. The polite reply cost nothing.",
        },
        { t: "mistakes", items: [{ wrong: "“Dear Sir/Ma, I am a web developer…”", right: "“Hi Chioma, I noticed your shop can't take bookings online…”" }, { wrong: "Giving up after one message", right: "A polite four-step plan over two weeks" }, { wrong: "Arguing with someone who says no", right: "Thanking them and stopping" }] },
        { t: "win", title: "Your first 10 messages are out", proved: "you can start honest, specific conversations with business owners who've never heard of you, the skill that turns everything you've learned into income.", cue: "Screenshot your tracker with 10 rows. When the first reply arrives, celebrate it. Finish your mission for the **Conversation starter** badge." },
      ],
    },
  ],
  task: {
    title: "Start conversations",
    steps: ["Write personal messages for your top 10 prospects.", "Send them on the right channel for each.", "Write your four-step follow-up plan.", "Set up the tracker with follow-up dates.", "Commit to about 10 new messages a day for two weeks."],
    done: ["10 personal messages are sent", "Each message mentions something specific to that business", "Follow-up dates are in my tracker", "I sent no bulk or group messages"],
  },
  recap: [
    "A message worth replying to has **one specific observation** about their business and a **small, easy ask**.",
    "**Follow-ups** bring many of the replies: busy owners often answer the second or third message.",
    "Adding people to groups or broadcast lists without permission, or sending bulk copy-paste messages, is **spam**.",
    "If someone says “we already have a website”, **offer the check-up**: “Would you like to see how it performs on phones?”",
    "Aim for about **10 new personal messages a day**: steady, quality volume builds a pipeline.",
  ],
  resources: [
    { label: "HubSpot Academy: Sales", url: "https://academy.hubspot.com/courses/sales", note: "Free prospecting and outreach lessons." },
    { label: "Instagram for business", url: "https://business.instagram.com/blog", note: "How businesses use Instagram (your prospects' world)." },
    { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng", note: "Respect personal data rules when contacting people." },
    { label: "LinkedIn Learning: Sales", url: "https://www.linkedin.com/learning/topics/sales", note: "Sales and outreach courses (some free)." },
  ],
  quiz: [
    { q: "What makes a cold message worth replying to?", options: ["A long list of your skills", "One specific observation about their business and a small, easy ask", "Lots of emojis", "Asking for a meeting straight away"], answer: 1, why: "Specific, helpful and low-commitment.", from: 0, aim: "core" },
    { q: "Where do many replies come from?", options: ["Only the first message", "Polite follow-ups", "Group messages", "Nowhere"], answer: 1, why: "Busy people often reply to the second or third message. Keep following up with every real prospect.", from: 1, aim: "client-work" },
    { q: "Which of these is spam?", options: ["A personal message to a business's public WhatsApp", "Adding people to a WhatsApp broadcast list without permission", "A polite follow-up", "An email to a public business address"], answer: 1, why: "Unwanted bulk messaging is spam, and it can get your number banned.", from: 2, aim: "client-work" },
    { q: "An owner replies, “We already have a website.” What's the best response?", options: ["Argue that yours is better", "Offer the free check-up: “Would you like to see how it performs on phones?”", "Block them", "Send your price list"], answer: 1, why: "Turn it into curiosity with something useful.", from: 3, aim: "client-work" },
    { q: "How many new personal messages a day is a good target?", options: ["One a month", "About 10", "1,000", "None"], answer: 1, why: "Steady daily volume, with quality, builds a pipeline. After your final project, keep this habit going.", from: 4, aim: "capstone" },
  ],
  celebrate: {
    title: "Day 23 complete: conversations started",
    proved: "You can start honest, specific conversations with business owners who've never heard of you, and keep them going without being pushy.",
    badge: "Conversation starter",
    badgeDesc: "Sent 10 personal messages with a follow-up plan",
  },
};

export default lesson;
