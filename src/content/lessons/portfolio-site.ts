import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "portfolio-site",
  title: "Build your own portfolio",
  minutes: 100,
  outcome: "Your own one-page website, live and free: who you help and how, two honest examples of your work (including Bisi's site), what you offer, and a hire-me button, ready for your WhatsApp and Instagram bio.",
  intro:
    "You've built a lot for Bisi. Now build the one website you'll share more than any other: **your own**. When a business owner asks “Have you done this before?”, this page answers in ten seconds, on their phone, while you're still typing your reply. Clients don't hire skills; they hire proof they can see. Today you'll turn what you've already built into that proof, honestly labelled, and put it live for free.",
  core: "Clients hire proof: show who you help, real (or honestly labelled) work with results, and one easy way to hire you.",
  youNeed: ["Screenshots of your work so far, especially Bisi's site (home, booking, shop, portal)", "A clear, friendly photo of yourself", "Your own mini brand kit (do Day 1's steps for yourself in 20 minutes)", "Optional: your own domain (you can finish on a free .pages.dev address)"],
  sections: [
    {
      heading: "What a page that wins work contains",
      blocks: [
        {
          t: "define",
          term: "Portfolio",
          like: "Bisi's display of finished outfits in her shop window: customers trust what they can see with their own eyes.",
          meaning: "A collection of your best work that shows potential clients what you can do, ideally with what each project achieved. Yours will be a one-page website.",
        },
        {
          t: "define",
          term: "Niche",
          like: "a doctor who only treats children: parents trust a paediatrician more with their kids than a general doctor.",
          meaning: "One specific type of client you focus on, like “tailors and fashion designers in Lagos” or “private clinics in Abuja”, instead of “any business”. Your examples, words and prices can then be specific, and specific offers win.",
        },
        { t: "figure", figure: { product: "portfolio", caption: "A one-page portfolio: who you help, your best work with results, your offer, and a hire-me button." } },
        {
          t: "sketch",
          sketch: { layout: "stack", frame: "phone", rows: ["Who I help + the result", "My work: 2 honest examples", "What I offer + starting prices", "About me + a real photo", "Hire me on WhatsApp"], hot: 0 },
          caption: "Your portfolio on a phone screen, top to bottom: the promise to your niche, proof, the offer, a human face, and one button.",
        },
        { t: "check", q: "Which portfolio headline is strongest?", options: ["Web developer", "Welcome to my portfolio", "I build websites that bring Lagos tailors more orders"], answer: 2, why: "It names who you help and the result they get." },
      ],
    },
    {
      heading: "Step 1: Write honest examples",
      blocks: [
        {
          t: "define",
          term: "Case study",
          like: "before-and-after photos of a renovated house, with the story of what was done in between.",
          meaning: "A short story of one project: the business, the problem, what you built, and the result, with screenshots.",
        },
        {
          t: "define",
          term: "Concept project",
          also: ["Concept work", "Concept redesign"],
          like: "a fashion student's sketchbook: real skill, but nobody ordered those designs yet.",
          meaning: "Work you made to show your skills that a business didn't hire you for, such as your practice site for Bisi, or a redesign idea for a real shop. It's fine to show, as long as it's **clearly labelled** “practice project” or “concept”.",
        },
        {
          t: "steps",
          items: [
            { title: "The business", detail: "“Stitches by Bisi: a tailor in Yaba, Lagos (practice project).”" },
            { title: "The problem", detail: "“Customers couldn't find her work, asked for prices all day, and missed fittings.”" },
            { title: "What you built", detail: "“A five-page website, an aso-ebi offer page, online booking with deposits, a small shop and a customer portal.” Add 2 or 3 screenshots." },
            { title: "The result", detail: "Real numbers only: “mobile speed score 92”, “books a fitting in under a minute”. No client numbers yet? Say what it makes possible." },
          ],
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "warning", label: "the problem" }, { draw: "laptop", label: "what I built" }, { draw: "chart", label: "the real result", hot: true }, { draw: "chat", label: "the owner's words" }] },
          caption: "The shape of every case study: the problem the business had, what you built, the real result in numbers, and (when you have it) the owner's own words.",
        },
        { t: "warn", text: "Label practice and concept work honestly. Never claim results you didn't get or clients you didn't have: one discovered lie ends a reputation in a city where business owners talk to each other." },
        { t: "tip", text: "No paying clients yet? Bisi's site counts, clearly labelled. So does a concept redesign of a real local business: screenshot their current site, show your improved version beside it, and label it “concept”." },
      ],
    },
    {
      heading: "Step 2: Build it",
      blocks: [
        { t: "p", text: "It's a new project: make a folder `yourname-portfolio` with `site` and `notes` inside (exactly like Day 3), write a short project brief about **you**, and open the folder in your builder as a new project." },
        { t: "prompt", title: "Your portfolio", text: "Read my project brief first (about me: name, city, niche, colours, fonts, voice) and follow it.\n\nCreate ONE file, site/index.html, a one-page portfolio for me. Sections: a hero with the headline '[your headline]', one line under it, and a 'Hire me on WhatsApp' button (https://wa.me/[your number]?text=Hi%2C%20I%20saw%20your%20portfolio); 2 case study cards, each with a screenshot from images/, the business, the problem, what I built and the result, and a label 'Practice project' where true; 3 services with 'from' prices; a short about section with my photo; a contact section with WhatsApp and email. Phone first, fast, accessible, one h1, its own title and meta description." },
        { t: "tool", slug: "hero-copy-generator", why: "Write five headline options for yourself, then pick the clearest." },
        {
          t: "scenario",
          title: "Two pages, one owner",
          text: "Picture a clinic owner who receives two links on the same day. One says “Full-stack developer: HTML, CSS, JavaScript” with ten screenshots and no words. The other says “I build websites that help clinics get more bookings”, with two short case studies and a WhatsApp button. Most owners reply to the second: they buy results, explained simply, not a list of tools.",
        },
      ],
    },
    {
      heading: "Step 3: Launch and share",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Put it live", detail: "Create a GitHub repository and a GitHub-connected Cloudflare project, exactly as on Day 7. Name the project after you, e.g. `ada-builds`: your address becomes ada-builds.pages.dev." },
            { title: "Check it like a client", detail: "Run PageSpeed on it (Day 6) and the meta tag checker below. Your own site must be excellent: it's the first sample a client sees." },
            { title: "Share it everywhere", detail: "WhatsApp Business: **Settings** → **Business tools** → **Business profile** → **Website**. Also your Instagram bio, Facebook and LinkedIn." },
          ],
        },
        { t: "tool", slug: "meta-tag-generator", why: "See how your portfolio looks in Google and when shared on WhatsApp, and fix the title and description." },
        { t: "try", title: "The 10-second test", minutes: 5, steps: ["Send your live link to two friends.", "Ask: “In 10 seconds: who do I help, and how would you hire me?”", "If either hesitates, sharpen the headline and the button."] },
        { t: "upgrade", title: "Your own domain", text: "A name like adabuilds.com.ng costs a few thousand naira a year (.com.ng is among the cheapest; compare renewal prices at NiRA-accredited registrars). It's worth buying with the money from your first client, then connecting it exactly as on Day 7." },
        { t: "tool", slug: "domain-name-generator", why: "Find an available, sayable name for when you're ready." },
        { t: "mistakes", items: [{ wrong: "Listing tools instead of results", right: "“I build websites that bring Lagos tailors more orders”" }, { wrong: "Presenting a practice project as a paid client job", right: "Labelling it “Practice project” or “Concept”" }, { wrong: "A slow page full of huge screenshots", right: "WebP screenshots and a mobile score of 80+" }] },
        { t: "win", title: "Your portfolio is live", proved: "you can present your own work honestly and persuasively, at a link that answers “have you done this before?” in ten seconds.", cue: "Put the link in your WhatsApp profile today. Finish your mission for the **Proof on display** badge." },
      ],
    },
  ],
  task: {
    title: "Launch your portfolio",
    steps: ["Write your niche headline.", "Write two case studies (real, or clearly labelled practice or concept work).", "Build the portfolio with the prompt in its own project folder.", "Put it live on Cloudflare and run the speed and meta checks.", "Add the link to your WhatsApp, Instagram and LinkedIn profiles."],
    done: ["My headline says who I help and the result", "I have two honest case studies, labelled where they're practice or concept work", "The hire-me button opens WhatsApp with a ready message", "My portfolio scores 80+ on mobile speed", "The link is in my WhatsApp profile"],
  },
  recap: [
    "Clients hire **proof**: real work, results and **case studies**, not a list of skills.",
    "A case study covers **the business, the problem, what you built, and the result**.",
    "Practice and **concept projects** must be **clearly labelled**, never presented as paid client work.",
    "The strongest headline says **who you help and the result**: name your **niche**, like “I build websites that bring Lagos tailors more orders”.",
    "Your own site must be **fast and clear on a phone**, because it's the first sample of your work a client sees.",
  ],
  resources: [
    { label: "Awwwards: portfolio sites", url: "https://www.awwwards.com/websites/portfolio/", note: "Award-winning portfolio layouts for inspiration." },
    { label: "WhatsApp Business: business profile", url: "https://faq.whatsapp.com/794517045178057", note: "Adding your website to your WhatsApp Business profile." },
    { label: "LinkedIn: Featured section", url: "https://www.linkedin.com/help/linkedin/answer/a549047", note: "Show your portfolio on LinkedIn." },
    { label: "NiRA", url: "https://nira.org.ng", note: "Accredited registrars for .ng and .com.ng domains." },
  ],
  quiz: [
    { q: "What do clients hire you based on?", options: ["Your certificates alone", "Proof: real work, results and case studies", "Your age", "Your laptop brand"], answer: 1, why: "Show, don't tell.", from: 0, aim: "core" },
    { q: "What should every case study include?", options: ["Only a screenshot", "The business, the problem, what you built, and the result", "Your code", "Your prices"], answer: 1, why: "That's the story a client cares about. After each real project, you'll write one with the owner's testimonial.", from: 1, aim: "deliver-get-paid" },
    { q: "How should your practice site for Bisi appear in your portfolio?", options: ["As a paid client project", "Clearly labelled as a practice project", "Hidden", "With invented results"], answer: 1, why: "Honesty protects your reputation with every future client.", from: 2, aim: "client-work" },
    { q: "Which headline will win the most replies from Lagos tailors?", options: ["Web developer", "Welcome to my site", "I build websites that bring Lagos tailors more orders", "HTML, CSS and JavaScript expert"], answer: 2, why: "It names the niche and the result. Your packages and pitches will speak to the same niche.", from: 3, aim: "package-for-client" },
    { q: "Why must your own portfolio be fast and clear on a phone?", options: ["It doesn't matter", "It's the first sample of your work a client sees, usually on their phone", "Google requires 100", "To use more data"], answer: 1, why: "Owners judge your skill by your own page before anything else.", from: 4, aim: "client-work" },
  ],
  celebrate: {
    title: "Portfolio live: your proof is public",
    proved: "You can present your own work honestly and persuasively, with a live page that answers “have you done this before?” in ten seconds.",
    badge: "Proof on display",
    badgeDesc: "Launched your own portfolio",
  },
};

export default lesson;
