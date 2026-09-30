import { pillars } from "@/lib/curriculum";

export const personas = [
  { id: "beginners", label: "Complete beginners", blurb: "Never built a website? Your first one goes live in week one. If you can type, you can do this." },
  { id: "students", label: "Students", blurb: "Earn while you study, with a skill every business needs and hours that fit around lectures." },
  { id: "freelancers", label: "Freelancers", blurb: "Add websites, SEO and automation to what you already sell, and charge more per client." },
  { id: "business-owners", label: "Business owners", blurb: "Build your own website, bookings and WhatsApp bot instead of waiting on an agency." },
  { id: "career-switchers", label: "Career switchers", blurb: "Move into tech in weeks, not years, with a portfolio clients and employers can see." },
  { id: "agencies", label: "Agencies & creators", blurb: "Deliver client sites faster with AI, and add automation and AI agents to your services." },
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
