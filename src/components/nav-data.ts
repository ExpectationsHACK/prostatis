import { pillars } from "@/lib/curriculum";

export const personas = [
  { id: "beginners", label: "Complete beginners", blurb: "Never built a website? Start here: no code needed." },
  { id: "students", label: "Students", blurb: "Earn while you study with a skill businesses pay for." },
  { id: "freelancers", label: "Freelancers", blurb: "Add websites, SEO and automation to what you sell." },
  { id: "business-owners", label: "Business owners", blurb: "Build your own site, bookings and WhatsApp bot." },
  { id: "career-switchers", label: "Career switchers", blurb: "Move into tech without a four-year degree." },
  { id: "agencies", label: "Agencies & creators", blurb: "Deliver faster with AI and add new services." },
];

export const navMenus = {
  tracks: [
    { href: "/tracks/fast-track", label: "Fast Track", note: "14 days · ₦15,000 · build and sell websites" },
    { href: "/tracks/main-track", label: "Main Track", note: "1 month · ₦30,000 · adds SEO, automation, AI agents" },
    { href: "/pricing", label: "Compare the tracks", note: "What's in each, side by side" },
  ],
  tools: [...pillars.map((p) => ({ href: `/tools#${p.id}`, label: p.title, note: "" })), { href: "/tools", label: "All 50 free tools", note: "" }],
  who: personas.map((p) => ({ href: `/#${p.id}`, label: p.label, note: "" })),
};
