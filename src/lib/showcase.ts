import type { Tone } from "@/components/cover";

import type { ThumbKind } from "@/components/art/product-thumb";

export type ProductCategory = "Website" | "Web app" | "AI agent" | "Automation" | "SEO";

/**
 * EXAMPLE products — what members learn to build and sell. Illustrations, not real client
 * projects. Replace with real member builds (with permission) as they come in.
 */
export const products: { title: string; category: ProductCategory; thumb: ThumbKind; tone: Tone }[] = [
  { title: "Landing page for a coach", category: "Website", thumb: "coach", tone: "peach" },
  { title: "Online product store", category: "Website", thumb: "store", tone: "orange" },
  { title: "Restaurant site with menu", category: "Website", thumb: "restaurant", tone: "sand" },
  { title: "Real estate listings site", category: "Website", thumb: "realestate", tone: "indigo" },
  { title: "Hotel & shortlet booking site", category: "Website", thumb: "hotel", tone: "forest" },
  { title: "Salon booking app", category: "Web app", thumb: "salon", tone: "peach" },
  { title: "Clinic appointment website", category: "Website", thumb: "clinic", tone: "sand" },
  { title: "School admissions website", category: "Website", thumb: "school", tone: "orange" },
  { title: "Church website with live stream", category: "Website", thumb: "church", tone: "indigo" },
  { title: "Gym site with class timetable", category: "Website", thumb: "gym", tone: "ink" },
  { title: "Event ticketing page", category: "Web app", thumb: "tickets", tone: "orange" },
  { title: "Photographer portfolio", category: "Website", thumb: "photographer", tone: "sand" },
  { title: "Freelancer portfolio", category: "Website", thumb: "portfolio", tone: "forest" },
  { title: "Law firm website", category: "Website", thumb: "lawfirm", tone: "peach" },
  { title: "Car dealership listings", category: "Website", thumb: "cars", tone: "sand" },
  { title: "Delivery tracking page", category: "Web app", thumb: "logistics", tone: "indigo" },
  { title: "Fashion brand store", category: "Website", thumb: "fashion", tone: "peach" },
  { title: "NGO donation page", category: "Website", thumb: "ngo", tone: "forest" },
  { title: "Food delivery web app", category: "Web app", thumb: "fooddelivery", tone: "sand" },
  { title: "Online course platform", category: "Web app", thumb: "course", tone: "orange" },
  { title: "SaaS product landing page", category: "Website", thumb: "saas", tone: "indigo" },
  { title: "Job board", category: "Web app", thumb: "jobs", tone: "peach" },
  { title: "Blog / online magazine", category: "Website", thumb: "blog", tone: "sand" },
  { title: "Sales analytics dashboard", category: "Web app", thumb: "dashboard", tone: "forest" },
  { title: "CRM sales pipeline", category: "Web app", thumb: "crm", tone: "orange" },
  { title: "Get-paid web app", category: "Web app", thumb: "invoicing", tone: "indigo" },
  { title: "Tenant & property portal", category: "Web app", thumb: "property", tone: "peach" },
  { title: "Online pharmacy store", category: "Website", thumb: "pharmacy", tone: "forest" },
  { title: "Wedding website with RSVP", category: "Website", thumb: "wedding", tone: "peach" },
  { title: "Paid membership site", category: "Web app", thumb: "membership", tone: "sand" },
  { title: "WhatsApp order bot", category: "AI agent", thumb: "wabot", tone: "forest" },
  { title: "Customer-service chat agent", category: "AI agent", thumb: "supportagent", tone: "indigo" },
  { title: "Appointment reminder automation", category: "Automation", thumb: "reminders", tone: "orange" },
  { title: "Email newsletter automation", category: "Automation", thumb: "newsletter", tone: "sand" },
  { title: "Review collection automation", category: "Automation", thumb: "reviews", tone: "peach" },
  { title: "Prospect list scraper", category: "Automation", thumb: "leadgen", tone: "indigo" },
  { title: "Google Business Profile setup", category: "SEO", thumb: "gbp", tone: "forest" },
];

/**
 * Member wins. PLACEHOLDERS — never ship invented income claims. Replace each with a
 * real member's result (their words, their permission, a screenshot if possible).
 */
export const wins: { name: string; result: string; detail: string; placeholder: boolean }[] = [
  { name: "Member name", result: "First paid build", detail: "Add a real member's first client result here — what they built, for whom, and what they were paid.", placeholder: true },
  { name: "Member name", result: "First dollar payment", detail: "Add a real result: the build, the client's country, and how the payment reached Nigeria.", placeholder: true },
  { name: "Member name", result: "Always-on agent live", detail: "Add a real result: the agent they set up and the time or money it saves each week.", placeholder: true },
];

/** Team. PLACEHOLDERS — replace with real names, roles, photos and one-line bios. */
export const team: { name: string; role: string; bio: string; placeholder: boolean }[] = [
  { name: "Your name", role: "Founder · Lead instructor", bio: "One line on what you've built and who you've built it for.", placeholder: true },
  { name: "Team member", role: "Agents & automation", bio: "One line on their experience.", placeholder: true },
  { name: "Team member", role: "Community & support", bio: "One line on how they help members get unstuck.", placeholder: true },
];
