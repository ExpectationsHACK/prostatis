import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "local-seo-gbp",
  title: "Local SEO & Google Business Profile",
  minutes: 90,
  outcome: "A complete, optimised Google Business Profile, a system for collecting reviews, and consistent local listings.",
  intro:
    "When someone searches “pharmacy near me” or “best suya in Wuse”, Google shows a map with three businesses before any website. That's called the **map pack**, and getting a business into it can bring more calls than the website itself. The key is a free Google Business Profile (GBP). Today you'll set one up properly.",
  sections: [
    {
      heading: "What decides the map pack",
      blocks: [
        { t: "p", text: "Google says local results are mainly based on three things:" },
        { t: "table", columns: ["Factor", "Meaning", "What you can do"], rows: [["Relevance", "Does the business match the search?", "Right categories, services, description"], ["Distance", "How close is it to the searcher?", "Accurate address / service area"], ["Prominence", "How well known and trusted is it?", "Reviews, photos, website, mentions online"]] },
        { t: "figure", figure: { product: "gbp", caption: "A strong profile: correct category, photos, hours, services and lots of recent reviews." } },
      ],
    },
    {
      heading: "Step 1 — Create or claim the profile",
      blocks: [
        { t: "steps", items: [
          { title: "Go to business.google.com", detail: "Sign in with the business owner's Google account (or ask them to add you as a manager later)." },
          { title: "Search for the business", detail: "It may already exist (customers can add places). If so, claim it; if not, create it." },
          { title: "Choose the primary category carefully", detail: "The most important field. Be specific: 'Nigerian restaurant', not just 'Restaurant'." },
          { title: "Verify", detail: "Google may ask for a video of the premises, a phone call or a postcard. Follow its instructions exactly." },
        ] },
        { t: "warn", text: "Use the business's real name exactly as on its signboard. Adding keywords to the name (“Glow Beauty — Best Lashes Lekki”) breaks Google's guidelines and can get the profile suspended." },
      ],
    },
    {
      heading: "Step 2 — Fill in everything",
      blocks: [
        { t: "list", items: ["Address or service area, phone, website, WhatsApp (as a chat link if offered)", "Opening hours — including holiday hours", "Services or menu with prices", "A description (750 characters) using natural keywords", "At least 10 real photos: outside (so people can find it), inside, team, products, work", "Attributes like 'wheelchair accessible' or 'women-led'"] },
        { t: "tool", slug: "local-seo-checklist", why: "Paste the business website to check its local signals (NAP, schema, maps) and work through the full GBP checklist." },
        { t: "tip", text: "**NAP** = Name, Address, Phone. They must be written exactly the same everywhere: GBP, website, Facebook, directories. Inconsistency confuses Google." },
      ],
    },
    {
      heading: "Step 3 — A review system",
      blocks: [
        { t: "p", text: "Reviews are the biggest thing a business can grow week by week. The secret is simply to **ask every happy customer**, at the right moment, with a direct link." },
        { t: "steps", items: [
          { title: "Get the review link", detail: "In the GBP dashboard, find “Ask for reviews” and copy the short link." },
          { title: "Ask at the happy moment", detail: "Right after the service, the delivery, or a compliment on WhatsApp." },
          { title: "Make it easy", detail: "A WhatsApp message template, a QR code at the counter, a line on receipts." },
          { title: "Reply to every review", detail: "Thank good ones by name; answer bad ones politely and offer to fix it." },
        ] },
        { t: "warn", text: "Never buy fake reviews, review your own business, or offer discounts in exchange for reviews. Google removes them and can suspend the profile." },
      ],
    },
    {
      heading: "Step 4 — Keep it active with posts",
      blocks: [
        { t: "p", text: "GBP lets businesses publish posts: offers, updates and events. Active profiles show customers the business is open and cared for." },
        { t: "tool", slug: "gbp-post-generator", why: "Writes a month of GBP posts — offers, updates and events — in the right length." },
      ],
    },
    {
      heading: "Step 5 — Citations",
      blocks: [
        { t: "p", text: "Citations are mentions of the business on other sites (directories, social profiles, maps). Add the business to Apple Maps (Business Connect), Bing Places, Facebook, Instagram, and Nigerian directories relevant to the industry — with identical NAP." },
      ],
    },
  ],
  task: {
    title: "Set up a real Google Business Profile",
    steps: ["Create or claim the profile and start verification.", "Complete every field and upload 10+ real photos.", "Make sure NAP matches the website exactly.", "Create a review request message with the link and send it to 5 happy customers.", "Publish the first GBP post."],
    done: ["The primary category is specific and correct", "Hours, services and photos are complete", "NAP matches the website exactly", "The review link has been sent to at least 5 customers"],
  },
  resources: [
    { label: "Google Business Profile Help", url: "https://support.google.com/business", note: "Official help centre." },
    { label: "Google — How local ranking works", url: "https://support.google.com/business/answer/7091", note: "Relevance, distance and prominence, from Google." },
    { label: "Guidelines for representing your business", url: "https://support.google.com/business/answer/3038177", note: "Rules that keep profiles from being suspended." },
    { label: "BrightLocal — Local SEO guides", url: "https://www.brightlocal.com/learn/", note: "In-depth free local SEO articles." },
    { label: "Bing Places", url: "https://www.bingplaces.com", note: "Import your GBP into Bing in minutes." },
  ],
  quiz: [
    { q: "What are the three main local ranking factors?", options: ["Colour, font, logo", "Relevance, distance, prominence", "Price, speed, size", "Likes, shares, follows"], answer: 1, why: "These three are how Google describes local ranking." },
    { q: "What is the most important GBP field to get right?", options: ["The cover photo", "The primary category", "The logo colour", "The Q&A"], answer: 1, why: "The primary category tells Google which searches the business is relevant for." },
    { q: "What does NAP stand for?", options: ["Name, Address, Phone", "New Ads Page", "Nigerian Address Protocol", "Name And Password"], answer: 0, why: "NAP must be identical everywhere." },
    { q: "Which review practice is allowed?", options: ["Buying reviews", "Reviewing your own business", "Asking every happy customer with a direct link", "Offering discounts for 5 stars"], answer: 2, why: "Asking genuine customers is allowed and effective; the others break the rules." },
    { q: "Why not add keywords to the business name on GBP?", options: ["It's too long", "It breaks Google's guidelines and can get the profile suspended", "It costs money", "Customers can't read it"], answer: 1, why: "The name must match the real-world business name." },
  ],
};

export default lesson;
