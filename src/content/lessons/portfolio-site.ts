import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "portfolio-site",
  title: "Build your own portfolio",
  minutes: 100,
  outcome: "A live one-page portfolio with two case studies and a hire-me button — the site that gets you clients.",
  intro:
    "Clients don't hire skills; they hire proof. Your portfolio is your proof: the work you've done, the results it got, and an easy way to hire you. Today you build it — using everything from Week 1 — and it goes live on your own domain.",
  sections: [
    {
      heading: "What a portfolio that wins work contains",
      blocks: [
        { t: "figure", figure: { product: "portfolio", caption: "A one-page portfolio: who you help, best work with results, packages, and a hire-me button." } },
        { t: "list", items: ["**Headline**: who you help and how — “I build websites that bring Lagos salons more bookings.”", "**2–3 case studies**: the business, the problem, what you built, the result", "**Services / packages**: what you offer, with 'from' prices", "**About**: a real photo and a short, human story", "**Contact**: WhatsApp button, email, and a booking link"] },
        { t: "tip", text: "No clients yet? Your Week 1 site counts. So does a redesign concept of a real local business (clearly labelled as a concept)." },
      ],
    },
    {
      heading: "Step 1 — Write your case studies",
      blocks: [
        { t: "steps", items: [
          { title: "The business", detail: "“Mama's Kitchen — a lunch vendor in Ikeja.”" },
          { title: "The problem", detail: "“Orders came in by phone calls only; lunch rush meant missed calls.”" },
          { title: "What you built", detail: "“A mobile site with the menu and WhatsApp ordering.” + screenshots." },
          { title: "The result", detail: "Real numbers if you have them (speed score 94, orders per day). If not yet: what it makes possible." },
        ] },
        { t: "warn", text: "Label concept work honestly (“Concept redesign”). Never claim results you didn't get." },
      ],
    },
    {
      heading: "Step 2 — Build it",
      blocks: [
        { t: "prompt", title: "Portfolio prompt", text: "Build a one-page portfolio site for me: [name], a web designer/developer helping [niche] in [city]. Sections: hero with headline '[headline]' and a 'Hire me on WhatsApp' button; 2 case study cards with image, problem, solution, result and a link; services with 3 packages and 'from' prices; short about with photo; contact with WhatsApp, email and booking link. Use my brand colours [ ] and fonts [ ]. Mobile-first, fast, accessible, with title and meta description set." },
        { t: "tool", slug: "hero-copy-generator", why: "Write your own headline options." },
        { t: "tool", slug: "domain-name-generator", why: "Find an available domain with your name." },
      ],
    },
    {
      heading: "Step 3 — Launch and check",
      blocks: [
        { t: "list", items: ["Deploy on Vercel with your own domain (Day 7).", "Run the speed and responsive checks — your own site must be excellent.", "Check your title and description with the meta tag tool.", "Put the link in your WhatsApp profile, Instagram bio and LinkedIn."] },
        { t: "tool", slug: "meta-tag-generator", why: "Check how your portfolio looks in Google and when shared on WhatsApp." },
      ],
    },
  ],
  task: {
    title: "Launch your portfolio",
    steps: ["Pick your niche headline.", "Write two case studies (real or clearly labelled concepts).", "Build the portfolio with the prompt.", "Launch on your domain and run the speed and responsive checks.", "Add the link to all your profiles."],
    done: ["My headline says who I help and how", "I have two honest case studies", "The hire-me button opens WhatsApp", "The site scores 80+ on mobile speed"],
  },
  resources: [
    { label: "Vercel — Portfolio templates", url: "https://vercel.com/templates/portfolio", note: "Inspiration for layouts." },
    { label: "Awwwards — Portfolio sites", url: "https://www.awwwards.com/websites/portfolio/", note: "Award-winning portfolio designs." },
    { label: "LinkedIn — Featured section", url: "https://www.linkedin.com/help/linkedin/answer/a549047", note: "Showcase your portfolio on LinkedIn." },
  ],
  quiz: [
    { q: "What do clients hire based on?", options: ["Your certificates only", "Proof: work, results and case studies", "Your age", "Your laptop"], answer: 1, why: "Show, don't tell." },
    { q: "What should a case study include?", options: ["Only a screenshot", "Business, problem, what you built, result", "Your code", "Nothing"], answer: 1, why: "It tells the story a client cares about." },
    { q: "How should concept work be shown?", options: ["As real client work", "Clearly labelled as a concept", "Hidden", "With fake results"], answer: 1, why: "Honesty protects your reputation." },
    { q: "Which headline is strongest?", options: ["Web developer", "Welcome to my portfolio", "I build websites that bring Lagos salons more bookings", "Hi"], answer: 2, why: "It names who you help and the result." },
    { q: "Why must your own portfolio score well on speed?", options: ["It doesn't matter", "It's proof you can do it for clients", "Google requires 100", "To use more data"], answer: 1, why: "Your site is your first sample." },
  ],
};

export default lesson;
