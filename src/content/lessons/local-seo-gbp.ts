import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "local-seo-gbp",
  title: "Local SEO & Google Business Profile",
  minutes: 90,
  outcome: "A complete Google Business Profile for a real business, a simple system for collecting reviews, and matching business details everywhere online.",
  intro:
    "Search “pharmacy near me” in any Nigerian city and look at the top: a **map with three businesses**, before any website. That's called the **map pack**, and getting a business into it can bring more calls than the website itself. The key is a free **Google Business Profile**. Today you'll set one up properly, one of the most valuable things you can do for any local business.",
  youNeed: ["A real local business and the owner's cooperation (they'll need to verify)", "The owner's Google account (or yours, added as a manager later)", "10+ real photos of the business", "The exact business name, address, phone and hours"],
  sections: [
    {
      heading: "What decides the map pack",
      blocks: [
        { t: "define", term: "Google Business Profile (GBP)", meaning: "A free listing that shows a business on Google Search and Google Maps: name, location, hours, phone, photos, reviews and more.", like: "the business's front door on Google, often seen before the website." },
        { t: "define", term: "Map pack", meaning: "The map with (usually) three businesses that Google shows for local searches like “salon near me”.", like: "the three shops right at the entrance of a busy market." },
        { t: "table", columns: ["What Google weighs", "Meaning", "What you can do"], rows: [["Relevance", "Does the business match the search?", "Right categories, services, description"], ["Distance", "How close is it to the person searching?", "An accurate address or service area"], ["Prominence", "How well known and trusted is it?", "Reviews, photos, a good website, mentions online"]] },
        { t: "figure", figure: { product: "gbp", caption: "A strong profile: the right category, photos, hours, services and plenty of recent reviews." } },
      ],
    },
    {
      heading: "Step 1: Create or claim the profile",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Go to business.google.com", detail: "Sign in with the owner's Google account (they can add you as a manager later)." },
            { title: "Search for the business first", detail: "It may already exist: customers can add places. If it does, claim it; if not, create it." },
            { title: "Choose the primary category carefully", detail: "The most important field. Be specific: “Nigerian restaurant”, not just “Restaurant”." },
            { title: "Verify", detail: "Google often asks for a short **video**: recorded in one take on a phone, showing the location (street signs or landmarks), the business equipment, and the owner managing it (e.g. unlocking the shop). Follow its instructions exactly." },
          ],
        },
        { t: "define", term: "Service-area business", meaning: "A business that goes to customers instead of customers coming to it, a mobile make-up artist, a plumber, a home cleaner. It can **hide its address** and show the areas it serves instead.", like: "a mobile mechanic who comes to your house." },
        { t: "warn", text: "Use the business's **real name exactly** as on its signboard. Adding keywords to the name (“Glow Beauty: Best Lashes Lekki”) breaks Google's rules and can get the profile suspended." },
        { t: "check", q: "A home-cleaning business works from the owner's flat and visits clients. What should the profile show?", options: ["The owner's home address publicly", "A service area, with the address hidden", "No location at all"], answer: 1, why: "Service-area businesses hide the address and show where they work." },
      ],
    },
    {
      heading: "Step 2: Fill in everything",
      blocks: [
        { t: "list", items: ["Address or service area, phone, website", "Opening hours: including special holiday hours", "Services or menu, with prices", "A description (up to 750 characters) written naturally", "At least 10 real photos: outside (so people can find it), inside, team, products, finished work", "Attributes like “wheelchair accessible” or “women-owned”, where true"] },
        { t: "define", term: "NAP", meaning: "**N**ame, **A**ddress, **P**hone. They must be written **exactly the same** everywhere: Google profile, website, Facebook, directories. Mismatches confuse Google.", like: "your name on your ID, bank account and certificates, if they don't match, you get questions." },
        { t: "tool", slug: "local-seo-checklist", why: "Paste the website to check its local signals (business details, schema, map), then work through the full profile checklist." },
        { t: "try", title: "Check a real business's NAP", minutes: 5, steps: ["Search Google for a business you know.", "Compare its name, address and phone on Google with its Instagram or website.", "Any difference? That's a quick fix you can offer the owner."] },
      ],
    },
    {
      heading: "Step 3: A review system",
      blocks: [
        { t: "p", text: "Reviews are the thing a business can grow week by week. The secret is simply to **ask every happy customer, at the happy moment, with a direct link**." },
        { t: "figure", figure: { diagram: "review-loop", caption: "Happy customer → ask with the link → review → owner replies → more calls." } },
        {
          t: "steps",
          items: [
            { title: "Get the review link", detail: "In the profile dashboard, find “Ask for reviews” and copy the short link." },
            { title: "Ask at the happy moment", detail: "Right after the service, after delivery, or when a customer compliments them on WhatsApp." },
            { title: "Make it easy", detail: "A saved WhatsApp message with the link, a QR code at the counter, a line on receipts." },
            { title: "Reply to every review", detail: "Thank good ones by name; answer bad ones politely and offer to put things right." },
          ],
        },
        { t: "warn", text: "Never buy reviews, review your own business, or give discounts or gifts in exchange for reviews. Google removes them and can restrict or suspend the profile." },
        { t: "scenario", title: "The QR code on the counter", text: "A barber in Yaba printed his review QR code and taped it by the mirror. After each cut he said: “If you liked it, scanning this helps me a lot.” No gifts, no pressure, just asking, every time. Asking consistently is what makes reviews grow." },
      ],
    },
    {
      heading: "Step 4: Keep it active",
      blocks: [
        { t: "p", text: "Profiles can publish **updates** (posts): offers, news and events. An active profile shows customers the business is open and cared for." },
        { t: "tool", slug: "gbp-post-generator", why: "Writes a month of profile updates, offers, news and events, at the right length." },
        { t: "p", text: "**Citations** are mentions of the business on other sites: directories, social profiles, maps. Add the business to Apple Maps (Apple Business Connect), Bing Places (it can import from Google), Facebook and Instagram, with **identical NAP**." },
        { t: "mistakes", items: [{ wrong: "Category: “Store”", right: "Category: “Pharmacy” or “Children's clothing store”" }, { wrong: "Stock photos from the internet", right: "Real photos of the real place, team and work" }, { wrong: "Ignoring a 1-star review", right: "A calm, polite public reply offering to fix it" }] },
      ],
    },
  ],
  task: {
    title: "Set up a real Google Business Profile",
    steps: ["Create or claim the profile and start verification.", "Complete every field and upload 10+ real photos.", "Make sure NAP matches the website exactly.", "Write a review request message with the link and send it to 5 happy customers.", "Publish the first update."],
    done: ["The primary category is specific and correct", "Hours, services and photos are complete", "NAP matches the website exactly", "The review link has gone to at least 5 real customers"],
  },
  recap: [
    "Google's local results weigh three things: **relevance, distance and prominence**.",
    "The **primary category** is the most important field in a Google Business Profile, be specific.",
    "**NAP** means Name, Address, Phone: they must match exactly everywhere online.",
    "Asking **every happy customer with a direct link** is allowed and works; buying reviews, reviewing yourself or offering rewards is not.",
    "Use the business's **real name**, adding keywords to the name breaks Google's rules and risks suspension.",
  ],
  resources: [
    { label: "Google Business Profile Help", url: "https://support.google.com/business", note: "Official help centre." },
    { label: "Google: How local results are ranked", url: "https://support.google.com/business/answer/7091", note: "Relevance, distance and prominence, from Google." },
    { label: "Guidelines for representing your business", url: "https://support.google.com/business/answer/3038177", note: "Rules that keep profiles from being suspended." },
    { label: "BrightLocal: Local SEO guides", url: "https://www.brightlocal.com/learn/", note: "In-depth free local SEO articles." },
    { label: "Bing Places", url: "https://www.bingplaces.com", note: "Import your Google profile into Bing in minutes." },
  ],
  quiz: [
    { q: "What are the three main things Google weighs for local results?", options: ["Colour, font, logo", "Relevance, distance, prominence", "Price, speed, size", "Likes, shares, follows"], answer: 1, why: "These are the three factors Google itself describes.", from: 0 },
    { q: "Which Google Business Profile field matters most?", options: ["The cover photo", "The primary category", "The logo colour", "The Q&A"], answer: 1, why: "The category tells Google which searches the business matches.", from: 1 },
    { q: "What does NAP stand for?", options: ["Name, Address, Phone", "New Ads Page", "Nigerian Address Protocol", "Name And Password"], answer: 0, why: "NAP must be identical everywhere.", from: 2 },
    { q: "Which review practice is allowed?", options: ["Buying reviews", "Reviewing your own business", "Asking every happy customer with a direct link", "Giving discounts for 5 stars"], answer: 2, why: "Asking real customers is allowed and effective.", from: 3 },
    { q: "Why not add keywords to the business name on the profile?", options: ["It's too long", "It breaks Google's rules and can get the profile suspended", "It costs money", "Customers can't read it"], answer: 1, why: "The name must match the real-world business name.", from: 4 },
  ],
};

export default lesson;
