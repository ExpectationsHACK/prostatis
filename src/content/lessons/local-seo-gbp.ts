import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "local-seo-gbp",
  title: "Local SEO & Google Business Profile",
  minutes: 100,
  outcome: "Bisi's Google Business Profile complete and submitted for verification, her name, address and phone written identically everywhere online, a simple system that asks every happy customer for a review, and a month of profile updates planned.",
  intro:
    "Search “tailor near me” anywhere in Yaba and look at the top of the results: before any website, Google shows a **map with three businesses**. Getting Bisi into those three can bring more calls than her website ever will. On Day 11 you started her free Google Business Profile. Today you finish it properly, make her details match everywhere, and set up the review habit that keeps her climbing. It's one of the most valuable things you can do for any local business, and it costs nothing.",
  core: "Google ranks local businesses by relevance, distance and prominence: a complete, accurate profile and a steady flow of genuine reviews are the parts you control.",
  youNeed: ["The owner's cooperation (they must verify and own the profile)", "The profile you started on Day 11, or the owner's Google account", "10+ real photos of the business", "The exact business name, address, phone and opening hours"],
  sections: [
    {
      heading: "What decides the three businesses on the map",
      blocks: [
        {
          t: "define",
          term: "Map pack",
          like: "the three shops right at the entrance of a busy market: most buyers never walk further in.",
          meaning: "The map with (usually) three businesses that Google shows for local searches like “tailor near me”, above the ordinary results.",
        },
        { t: "table", columns: ["What Google weighs", "Meaning", "What you can do"], rows: [["Relevance", "Does the business match the search?", "The right category, services and description"], ["Distance", "How close is it to the person searching?", "An accurate address or service areas"], ["Prominence", "How well known and trusted is it?", "Reviews, photos, a good website, mentions on other sites"]] },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "search", label: "“tailor near me”" }, { draw: "map", label: "the map pack: 3 businesses", hot: true }, { draw: "phone", label: "tap to call or get directions" }] },
          caption: "The local search journey: someone nearby searches, Google shows three businesses on a map, and most people call or get directions straight from there, without visiting any website.",
        },
        { t: "figure", figure: { product: "gbp", caption: "A strong profile: the right category, real photos, hours, services and plenty of recent reviews." } },
      ],
    },
    {
      heading: "Step 1: Claim, categorise, verify",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Open the profile with the owner", detail: "On the owner's phone or laptop, signed into **their** Google account, go to `business.google.com`. Open the profile you started on Day 11, or search for the business and claim it." },
            { title: "Choose the primary category", detail: "The most important field. For Bisi: **Tailor**. Add one or two extra categories only if true, e.g. **Dressmaker**." },
            { title: "Verify the business", detail: "Google often asks for a short **video** recorded in one continuous take on a phone: the street or signboard outside, the inside with the sewing machines, and the owner managing the shop (unlocking the door, using the equipment). Follow the on-screen instructions exactly." },
            { title: "Add yourself as a helper", detail: "After verification, the owner opens **Business Profile settings** → **People and access** → **Add**, and adds your email as a **Manager**. The owner stays the owner." },
          ],
        },
        {
          t: "define",
          term: "Service-area business",
          like: "a mobile mechanic, or a tailor who visits clients at home or in the office: customers never come to a shop.",
          meaning: "A business that goes to its customers. It can **hide its address** and show the areas it serves instead, such as Yaba, Surulere and Ikeja.",
        },
        { t: "warn", text: "Use the business's **real name, exactly** as on its signboard. Adding search words to the name (“Stitches by Bisi: Best Tailor Yaba Lagos”) breaks Google's rules and can get the profile suspended." },
        {
          t: "errors",
          items: [
            { see: "“Your video didn't meet the requirements”", means: "Google couldn't confirm the location or that the owner runs it.", fix: "Reshoot in one take: outside (street name or signboard), inside (equipment), and the owner doing something only staff can do. Good light, no cuts." },
            { see: "“Profile suspended”", means: "Usually a broken rule: search words in the name, a wrong address, or a home address shown when customers don't visit.", fix: "Fix the cause first, then use Google's reinstatement request form from the profile's help page." },
          ],
        },
        { t: "check", q: "A home tailoring service works from the owner's flat and visits clients' offices. What should the profile show?", options: ["The owner's home address publicly", "Service areas, with the address hidden", "No location at all"], answer: 1, why: "Service-area businesses hide the address and show where they work." },
      ],
    },
    {
      heading: "Step 2: Fill in everything",
      blocks: [
        { t: "list", items: ["Address or service areas, phone, website (your live address)", "Opening hours, including special holiday hours", "Services with starting prices", "A description of up to 750 characters, written naturally (who, what, where, why choose you)", "At least 10 real photos: outside (so people can find it), inside, the owner at work, finished outfits", "Attributes such as “women-owned”, where true"] },
        {
          t: "define",
          term: "NAP",
          like: "your name on your NIN slip, your BVN and your bank account: if they don't match exactly, the bank starts asking questions.",
          meaning: "**N**ame, **A**ddress, **P**hone. They must be written **exactly the same** everywhere online: the Google profile, the website, Instagram, Facebook and directories. Mismatches confuse Google and customers.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Mismatched", nodes: [{ draw: "browser", label: "website: 0803 123 4567" }, { draw: "phone", label: "Instagram: 0816 555 1234" }] },
            right: { title: "Matching", nodes: [{ draw: "check", label: "same name, address, phone everywhere", hot: true }] },
          },
          caption: "Two different phone numbers on two different pages make Google unsure which is right; the same details everywhere make the business easy to trust and find.",
        },
        { t: "tool", slug: "local-seo-checklist", why: "Paste the website to check its local signals (business details, schema, map link), then work through the full profile checklist." },
        { t: "try", title: "Check a real business's NAP", minutes: 5, steps: ["Search Google for a business you know.", "Compare its name, address and phone on Google with its Instagram and website.", "Any difference? That's a quick, useful fix you could offer the owner."] },
      ],
    },
    {
      heading: "Step 3: A review system",
      blocks: [
        { t: "p", text: "Reviews are the part a business can grow week by week. The secret is simply to **ask every happy customer, at the happy moment, with a direct link**." },
        { t: "figure", figure: { diagram: "review-loop", caption: "Happy customer → ask with the link → review → owner replies → more calls." } },
        {
          t: "steps",
          items: [
            { title: "Get the review link", detail: "In the profile, tap **Ask for reviews** (or **Get more reviews**) and copy the short link." },
            { title: "Ask at the happy moment", detail: "Right after a fitting goes well, at collection, or when a customer sends a compliment on WhatsApp." },
            { title: "Make it easy", detail: "Save a WhatsApp quick reply with the link (`/review`), print a QR code of the link for the mirror, and add a line on receipts." },
            { title: "Reply to every review", detail: "Thank good ones by name; answer bad ones calmly and offer to put things right." },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "person", label: "happy customer" }, { draw: "qr", label: "QR code by the mirror" }, { draw: "star", label: "an honest review" }, { draw: "chat", label: "Bisi replies by name", hot: true }] },
          caption: "The review habit: a happy customer, an easy QR code or link, an honest review, and a personal reply from the owner, every single time.",
        },
        { t: "warn", text: "Never buy reviews, review your own business, or give discounts or gifts in exchange for reviews. Google removes them and can restrict or suspend the profile." },
        {
          t: "scenario",
          title: "The QR code by the mirror",
          text: "Picture Bisi taping her review QR code beside the fitting mirror. After each fitting she says: “If you're happy with it, scanning this helps me a lot.” No gifts, no pressure, just asking, every time. Asking consistently is what makes reviews grow, and it's exactly what businesses in the map pack do.",
        },
        { t: "win", title: "Profile submitted and reviews requested", proved: "you can put a local business on Google Maps properly and set up the habit that keeps it climbing for years.", cue: "Screenshot the completed profile and the first review request sent. Finish the mission for the **On the map** badge." },
      ],
    },
    {
      heading: "Step 4: Keep it active, and get listed elsewhere",
      blocks: [
        { t: "p", text: "Profiles can publish **updates**: offers, news and events. An active profile shows customers the business is open and cared for." },
        { t: "tool", slug: "gbp-post-generator", why: "Writes a month of profile updates (offers, news and events) at the right length." },
        {
          t: "define",
          term: "Citation",
          like: "a shop being listed in the church bulletin, the estate directory and the market association's register: each mention makes it easier to find and trust.",
          meaning: "A mention of the business's name, address and phone on another site: a directory, a map app, a social profile. Each one, with **identical NAP**, adds to its prominence.",
        },
        { t: "list", items: ["**Apple Business Connect**: puts the business on Apple Maps (free).", "**Bing Places**: can import the Google profile in minutes (free).", "**Facebook and Instagram**: same name, address and phone.", "Reputable Nigerian business directories in the owner's industry."] },
        { t: "mistakes", items: [{ wrong: "Category: “Store”", right: "Category: “Tailor” (plus “Dressmaker” if true)" }, { wrong: "Stock photos from the internet", right: "Real photos of the real shop, owner and work" }, { wrong: "Ignoring a 1-star review", right: "A calm, polite public reply offering to fix it" }] },
      ],
    },
  ],
  task: {
    title: "Set up a real Google Business Profile",
    steps: ["Claim or finish the profile with the owner, choose the category and start verification.", "Complete every field and upload 10+ real photos.", "Make the name, address and phone match exactly on the website and social pages.", "Save a review-request message with the link and send it to 5 happy customers.", "Publish the first update and add the business to Bing Places or Apple Business Connect."],
    done: ["The primary category is specific and correct", "Hours, services and 10+ real photos are on the profile", "NAP matches the website exactly", "The review link has gone to at least 5 real customers", "The owner owns the profile and I'm a manager"],
  },
  recap: [
    "Google's local results weigh three things: **relevance, distance and prominence**.",
    "The **primary category** is the most important field: be specific, like **Tailor**, not “Store”.",
    "**NAP** (name, address, phone) must be **written exactly the same** everywhere online; details that don't match confuse Google and customers.",
    "Asking **every happy customer with a direct review link** is allowed and works; buying reviews, reviewing yourself or giving rewards for reviews is not.",
    "Use the business's **real name exactly**: adding search words to the name breaks Google's rules and risks suspension.",
  ],
  resources: [
    { label: "Google Business Profile Help", url: "https://support.google.com/business", note: "Official help centre." },
    { label: "Google: how local results are ranked", url: "https://support.google.com/business/answer/7091", note: "Relevance, distance and prominence, from Google." },
    { label: "Guidelines for representing your business", url: "https://support.google.com/business/answer/3038177", note: "The rules that keep profiles from being suspended." },
    { label: "Bing Places", url: "https://www.bingplaces.com", note: "Import the Google profile into Bing." },
    { label: "Apple Business Connect", url: "https://businessconnect.apple.com", note: "Get the business onto Apple Maps." },
  ],
  quiz: [
    { q: "What three things does Google weigh for local map results?", options: ["Colour, font, logo", "Relevance, distance and prominence", "Price, speed, size", "Likes, shares, follows"], answer: 1, why: "These are the three factors Google itself describes; you control relevance and prominence.", from: 0, aim: "core" },
    { q: "Which primary category is best for Bisi's profile?", options: ["Store", "Business", "Tailor", "Fashion and lifestyle hub"], answer: 2, why: "Specific beats general. Tomorrow's website check includes looking at the profile's category.", from: 1, aim: "content-seo-audit" },
    { q: "Bisi's website shows 0803 123 4567 but her Instagram shows 0816 555 1234. What's the problem?", options: ["None", "Her NAP doesn't match: Google and customers can't tell which details are right", "Instagram is banned", "Phones don't matter for maps"], answer: 1, why: "Name, address and phone must match exactly everywhere. Mismatches are a common finding in a website check.", from: 2, aim: "content-seo-audit" },
    { q: "Which review practice is allowed?", options: ["Buying reviews", "Reviewing your own business", "Asking every happy customer with a direct review link", "A discount for 5 stars"], answer: 2, why: "Asking real customers is allowed and effective. Your final client project includes setting up this habit.", from: 3, aim: "capstone" },
    { q: "Why not name the profile “Stitches by Bisi: Best Tailor Yaba Lagos”?", options: ["It's too long to type", "It breaks Google's rules and can get the profile suspended", "It costs money", "Customers can't read it"], answer: 1, why: "The name must match the real-world business name. You'll explain this to every local client.", from: 4, aim: "client-work" },
  ],
  celebrate: {
    title: "Day 12 complete: Bisi is on the map",
    proved: "You can put a local business on Google Maps properly, make its details match everywhere, and set up the review habit that keeps it climbing.",
    badge: "On the map",
    badgeDesc: "Completed a Google Business Profile",
  },
};

export default lesson;
