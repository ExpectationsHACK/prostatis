import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "portfolio-site",
  title: "Build your own portfolio",
  minutes: 100,
  outcome: "A live one-page portfolio with two honest case studies, clear packages and a hire-me button, the website that gets you clients.",
  intro:
    "Clients don't hire skills; they hire **proof**. When a business owner asks “Have you done this before?”, your portfolio answers, in 10 seconds, on their phone. Today you'll build it using everything from Week 1, and put it live on your own domain. It's the one website you'll share more than any other.",
  youNeed: ["Screenshots of your projects so far (Days 1–10)", "A clear, friendly photo of yourself", "Your brand kit: make one for yourself if you haven't", "Optional: a domain in your name (e.g. yourname.ng)"],
  sections: [
    {
      heading: "What a portfolio that wins work contains",
      blocks: [
        { t: "define", term: "Portfolio", meaning: "A collection of your best work that shows potential clients what you can do, ideally with the results each project achieved.", like: "a tailor's display of finished outfits in the shop window." },
        { t: "figure", figure: { product: "portfolio", caption: "A one-page portfolio: who you help, best work with results, packages, and a hire-me button." } },
        { t: "list", items: ["**Headline**: who you help and how, “I build websites that bring Lagos salons more bookings.”", "**2–3 case studies**: the business, the problem, what you built, the result", "**Services / packages**: what you offer, with “from” prices", "**About**: a real photo and a short, human story", "**Contact**: a WhatsApp button, email, and a booking link"] },
        { t: "check", q: "Which portfolio headline is strongest?", options: ["Web developer", "Welcome to my portfolio", "I build websites that bring Lagos salons more bookings"], answer: 2, why: "It says who you help and the result they get." },
      ],
    },
    {
      heading: "Step 1: Write honest case studies",
      blocks: [
        { t: "define", term: "Concept project", meaning: "A project you made to show your skills, for example a redesign idea for a real business, that the business didn't hire you for. It's fine to show, as long as it's **clearly labelled** as a concept.", like: "a fashion student's sketch collection: real skill, not yet a customer's order." },
        {
          t: "steps",
          items: [
            { title: "The business", detail: "“Mama's Kitchen: a lunch vendor in Ikeja.”" },
            { title: "The problem", detail: "“Orders only came in by phone; during the lunch rush, calls were missed.”" },
            { title: "What you built", detail: "“A mobile site with the menu and WhatsApp ordering” + screenshots." },
            { title: "The result", detail: "Real numbers if you have them (a speed score of 94, orders per day). If not yet: what it makes possible." },
          ],
        },
        { t: "warn", text: "Label concept work honestly (“Concept redesign”). Never claim results you didn't get: one discovered lie ends your reputation in a niche where owners talk to each other." },
        { t: "tip", text: "No clients yet? Your Week 1 site counts. So does a concept redesign of a real local business, clearly labelled." },
      ],
    },
    {
      heading: "Step 2: Build it",
      blocks: [
        { t: "prompt", title: "Portfolio prompt", text: "Build a one-page portfolio site for me: [name], a web designer/developer helping [niche] in [city]. Sections: a hero with the headline '[headline]' and a 'Hire me on WhatsApp' button; 2 case study cards with image, problem, solution, result and a link; services with 3 packages and 'from' prices; a short about section with my photo; a contact section with WhatsApp, email and a booking link. Use my brand colours [ ] and fonts [ ]. Mobile-first, fast, accessible, with its own title and meta description." },
        { t: "tool", slug: "hero-copy-generator", why: "Write your own headline options." },
        { t: "tool", slug: "domain-name-generator", why: "Find an available domain with your name." },
        { t: "scenario", title: "Two portfolios, one client", text: "A clinic owner received two links. One said “Full-stack developer: React, Next.js, Tailwind” with ten screenshots and no words. The other said “I build websites that help clinics get more bookings” with two short case studies and a WhatsApp button. She replied to the second within the hour. Clients buy results, explained simply." },
      ],
    },
    {
      heading: "Step 3: Launch and share",
      blocks: [
        { t: "list", items: ["Deploy on Vercel with your own domain. This is your personal portfolio, so the free Hobby plan is fine.", "Run the speed and responsive checks, your own site must be excellent; it's your first sample.", "Check your title and description with the meta tag tool.", "Put the link in your WhatsApp Business profile, Instagram bio and LinkedIn."] },
        { t: "tool", slug: "meta-tag-generator", why: "See how your portfolio looks in Google and when shared on WhatsApp." },
        { t: "try", title: "The 10-second test", minutes: 5, steps: ["Send your live portfolio link to two friends.", "Ask them: “In 10 seconds: who do I help, and how would you hire me?”", "If either hesitates, sharpen your headline and button."] },
        { t: "mistakes", items: [{ wrong: "Listing technologies instead of results", right: "“I build websites that bring clinics more bookings”" }, { wrong: "Presenting a concept as a paid client project", right: "Labelling it “Concept redesign”" }, { wrong: "A slow portfolio full of huge images", right: "80+ mobile speed: your site is your first sample" }] },
      ],
    },
  ],
  task: {
    title: "Launch your portfolio",
    steps: ["Write your niche headline.", "Write two case studies (real, or clearly labelled concepts).", "Build the portfolio with the prompt.", "Launch it and run the speed and responsive checks.", "Add the link to all your profiles."],
    done: ["My headline says who I help and how", "I have two honest case studies", "The hire-me button opens WhatsApp", "The site scores 80+ on mobile speed"],
  },
  recap: [
    "Clients hire **proof**: work, results and case studies, not a list of skills.",
    "A case study covers **the business, the problem, what you built, and the result**.",
    "Concept work must be **clearly labelled as a concept**, never presented as paid client work.",
    "The strongest headline says **who you help and the result**: “I build websites that bring Lagos salons more bookings.”",
    "Your own portfolio must score well on speed, because **it's your first sample** of what you can do.",
  ],
  resources: [
    { label: "Vercel: Portfolio templates", url: "https://vercel.com/templates/portfolio", note: "Inspiration for layouts." },
    { label: "Awwwards: Portfolio sites", url: "https://www.awwwards.com/websites/portfolio/", note: "Award-winning portfolio designs." },
    { label: "LinkedIn: Featured section", url: "https://www.linkedin.com/help/linkedin/answer/a549047", note: "Showcase your portfolio on LinkedIn." },
  ],
  quiz: [
    { q: "What do clients hire based on?", options: ["Your certificates alone", "Proof: work, results and case studies", "Your age", "Your laptop"], answer: 1, why: "Show, don't tell.", from: 0 },
    { q: "What should a case study include?", options: ["Only a screenshot", "The business, the problem, what you built, and the result", "Your code", "Nothing"], answer: 1, why: "It tells the story a client cares about.", from: 1 },
    { q: "How should concept work be shown?", options: ["As real client work", "Clearly labelled as a concept", "Hidden", "With made-up results"], answer: 1, why: "Honesty protects your reputation.", from: 2 },
    { q: "Which headline is strongest?", options: ["Web developer", "Welcome to my portfolio", "I build websites that bring Lagos salons more bookings", "Hi"], answer: 2, why: "It names who you help and the result.", from: 3 },
    { q: "Why must your own portfolio score well on speed?", options: ["It doesn't matter", "It's your first sample of what you can do for clients", "Google requires 100", "To use more data"], answer: 1, why: "Your own site is the first thing a client judges.", from: 4 },
  ],
};

export default lesson;
