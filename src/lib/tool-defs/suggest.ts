import type { Block, Values } from "./types";

/**
 * Real search phrases from Google's autocomplete for the country the user picks. The server asks
 * Google for suggestions to a set of starter searches; these pure helpers build those searches and
 * sort what comes back by what the searcher wants.
 */

export type SuggestMode = "all" | "questions";
export type SuggestData = { seed: string; location: string; mode: SuggestMode; country?: string; results: { query: string; suggestions: string[] }[] };
export type Intent = "local" | "price" | "buy" | "question" | "other" | "not-customer";

const clean = (x: string) => x.toLowerCase().replace(/\s+/g, " ").trim();

/** English-language Google markets the search tools can ask (ISO country code → name). */
export const searchCountries = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "IE", label: "Ireland" },
  { value: "NZ", label: "New Zealand" },
  { value: "IN", label: "India" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "NG", label: "Nigeria" },
  { value: "GH", label: "Ghana" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "South Africa" },
];
export const countryName = (code?: string) => searchCountries.find((c) => c.value === code)?.label ?? "United States";
export const isSearchCountry = (code: unknown): code is string => typeof code === "string" && searchCountries.some((c) => c.value === code);

/** The starter searches sent to Google's autocomplete (kept small: one light request each). */
export function suggestQueries(service: string, location: string, mode: SuggestMode): string[] {
  const sv = clean(service).slice(0, 60);
  const loc = clean(location).slice(0, 40);
  if (!sv) return [];
  const qs =
    mode === "questions"
      ? [`what is ${sv}`, `how much is ${sv}`, `how to choose ${sv}`, `how long does ${sv}`, `why ${sv}`, `which ${sv}`, `where to ${sv}`, `can ${sv}`, `is ${sv}`, `does ${sv}`, `should i ${sv}`, `${sv} vs`, `${sv} or`, `${sv} for`, `best ${sv}`, loc ? `${sv} in ${loc}` : `${sv} near me`]
      : [sv, loc ? `${sv} ${loc}` : `${sv} near me`, loc ? `${sv} in ${loc}` : `${sv} company`, `best ${sv}`, `affordable ${sv}`, `${sv} price`, `${sv} cost`, `how much is ${sv}`, `${sv} near me`, `${sv} company`, `${sv} for`, `what is ${sv}`, `how to choose ${sv}`, `${sv} vs`, `is ${sv}`, `${sv} packages`];
  return [...new Set(qs)];
}

// Country and city names per market. Autocomplete often mixes in other countries ("…cost in
// philippines"); those phrases are dropped unless they mention the chosen country or the user's place.
const places: Record<string, string> = {
  US: "usa|united states|america|texas|california|florida|chicago|houston|dallas|fort worth|austin|atlanta|miami|los angeles|san diego|seattle|boston|denver|phoenix|new york|nyc",
  GB: "uk|united kingdom|england|scotland|wales|london|manchester|birmingham|leeds|glasgow|liverpool|bristol",
  CA: "canada|toronto|vancouver|calgary|ottawa|montreal|edmonton",
  AU: "australia|sydney|melbourne|brisbane|perth|adelaide",
  IE: "ireland|dublin|cork|galway",
  NZ: "new zealand|auckland|wellington|christchurch",
  IN: "india|indian|delhi|mumbai|chennai|bangalore|bengaluru|hyderabad|pune|kolkata|coimbatore|kochi|hindi|tamil|telugu",
  PK: "pakistan|lahore|karachi|islamabad|urdu",
  PH: "philippines|manila|cebu|davao",
  SG: "singapore",
  AE: "dubai|uae|abu dhabi|sharjah",
  NG: "nigeria|lagos|abuja|lekki|ikeja|yaba|ajah|surulere|victoria island|ikoyi|port harcourt|ibadan|kano|kaduna|enugu|benin|abeokuta|owerri|uyo|calabar|jos|ilorin|warri|asaba|onitsha|akure|gbagada|ikorodu|gwarinpa|wuse|garki|maitama",
  GH: "ghana|accra|kumasi|tema|takoradi",
  KE: "kenya|nairobi|mombasa|kisumu",
  ZA: "south africa|johannesburg|cape town|durban|pretoria",
};
const OTHER = "uganda|kampala|rwanda|kigali|ethiopia|addis ababa|zambia|tanzania|cameroon|egypt|bangladesh|dhaka|sri lanka|nepal|bangla|germany|malaysia";
const word = (alts: string) => new RegExp(`\\b(${alts})\\b`);
const localTo = (country: string) => word(places[country] ?? places.US);
const foreignTo = (country: string) =>
  word([OTHER, ...Object.entries(places).filter(([c]) => c !== country).map(([, v]) => v)].join("|"));

/** Which kind of searcher typed this phrase. */
export function intentOf(phrase: string, location = "", country = "US"): Intent {
  const p = clean(phrase);
  const loc = clean(location);
  // Job seekers, students and do-it-yourselfers: real searches, but they won't hire anyone.
  if (/\b(jobs?|salary|salaries|vacanc(y|ies)|internships?|courses?|training|school|class(es)?|subject|j?ss ?[1-3]|waec|neco|jamb|data processing|tutorials?|certificat(e|ion)|apprentice(ship)?|free download|templates?|pdf|youtube|diy|for beginners|for dummies|for kids|learn(ing)?|skills?|software|career|forum)\b/.test(p)) return "not-customer";
  if (/\b(price|prices|pricing|cost|costs|how much|cheap|cheapest|affordable|rates?|charges?|fees?|budget|quote)\b/.test(p)) return "price";
  if (/\bnear me\b/.test(p) || (loc && p.includes(loc)) || localTo(country).test(p)) return "local";
  if (/^(what|how|why|which|where|when|who|can|is|are|do|does|should|will)\b/.test(p) || /\b(vs|versus|or)\b/.test(p)) return "question";
  if (/\b(best|top|company|companies|agency|agencies|services?|hire|book|booking|buy|order|shop|store|vendors?|experts?|specialists?|contractors?|installers?|packages?)\b/.test(p)) return "buy";
  return "other";
}

/** Unique phrases, minus ones about other countries (unless the user asked for that place). */
export function cleanSuggestions(data: SuggestData): string[] {
  const loc = clean(data.location);
  const foreign = foreignTo(data.country ?? "US");
  const out = new Set<string>();
  for (const r of data.results) {
    for (const s of r.suggestions) {
      const p = clean(s);
      if (!p || p.length > 90) continue;
      if (foreign.test(p) && !(loc && p.includes(loc))) continue;
      out.add(p);
    }
  }
  return [...out];
}

const groupInfo: Record<Intent, { title: string; use: string }> = {
  local: { title: "Ready to hire nearby", use: "Home and service pages (one main phrase per page) and the Google Business Profile" },
  buy: { title: "Looking for a provider", use: "Service pages and the home page" },
  price: { title: "Checking prices", use: "A prices page, and “from …” prices on service pages" },
  question: { title: "Questions people ask", use: "Blog posts and the FAQ section" },
  other: { title: "Other related searches", use: "Ideas for later pages; check what Google shows before writing" },
  "not-customer": { title: "Not customers: skip these", use: "Job seekers and people learning the trade, they won't hire you" },
};

const order: Intent[] = ["local", "buy", "price", "question", "other", "not-customer"];

export function renderSuggestions(d: SuggestData, v: Values = {}): { blocks: Block[] } {
  const phrases = cleanSuggestions(d);
  const loc = String(v.location ?? d.location);
  const country = d.country ?? "US";
  if (!phrases.length) {
    return { blocks: [{ type: "notice", tone: "warn", text: `Google had no suggestions for “${d.seed}”. Try the plain words a customer would type (e.g. “lash extensions”, not “premium lash artistry”).` }] };
  }
  const grouped = new Map<Intent, string[]>(order.map((k) => [k, []]));
  for (const p of phrases) grouped.get(intentOf(p, loc, country))!.push(p);
  const useful = phrases.length - grouped.get("not-customer")!.length;
  const blocks: Block[] = [
    { type: "stats", items: [{ label: "Real searches found", value: String(useful), sub: `from Google ${countryName(country)}, just now` }, { label: "Questions", value: String(grouped.get("question")!.length + grouped.get("price")!.filter((p) => /^how|^what/.test(p)).length), sub: "ready-made FAQ and blog ideas" }] },
  ];
  const focus: Intent[] = d.mode === "questions" ? ["question", "price", "local", "buy", "other", "not-customer"] : order;
  for (const k of focus) {
    const list = grouped.get(k)!;
    if (list.length) blocks.push({ type: "list", title: `${groupInfo[k].title} (${list.length}) · use for: ${groupInfo[k].use}`, items: list });
  }
  const pick = (k: Intent) => grouped.get(k)![0];
  const map = [
    ["Home page", pick("local") ?? pick("buy")],
    ["Service page", pick("buy") ?? grouped.get("local")![1]],
    ["Prices page", pick("price")],
    ["Article or FAQ", pick("question")],
  ].filter((r): r is [string, string] => !!r[1]);
  if (d.mode === "all" && map.length) blocks.push({ type: "table", title: "Starter keyword map from these real searches", columns: ["Page", "Main phrase"], rows: map });
  blocks.push({
    type: "text",
    title: "Spreadsheet (CSV): paste into Google Sheets",
    filename: "keywords.csv",
    text: ["phrase,group", ...phrases.map((p) => `"${p.replace(/"/g, '""')}",${groupInfo[intentOf(p, loc, country)].title}`)].join("\n"),
  });
  blocks.push({
    type: "notice",
    tone: "info",
    text: `These are real phrases from Google's autocomplete for ${countryName(country)}: Google only suggests what enough people type. It doesn't say how many search each one; for numbers, use Google Keyword Planner (free with a Google Ads account) or Search Console once the site is live.`,
  });
  return { blocks };
}
