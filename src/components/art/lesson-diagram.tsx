import { ArrowDown, ArrowRight, Bot, CreditCard, Database, Globe, Laptop, Mail, MessageCircle, Search, Server, User } from "lucide-react";
import type { ReactNode } from "react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";

export type DiagramKind =
  | "web-stack"
  | "prompt-anatomy"
  | "page-anatomy"
  | "serp-anatomy"
  | "git-flow"
  | "funnel"
  | "trigger-action"
  | "agent-loop"
  | "delivery-timeline"
  | "payment-flow"
  | "keyword-intent"
  | "booking-flow"
  | "claude-loop"
  | "contrast"
  | "brand-kit"
  | "breakpoints"
  | "form-flow"
  | "rls"
  | "search-journey"
  | "review-loop"
  | "webhook"
  | "crm-pipeline"
  | "pricing-tiers"
  | "outreach-sequence"
  | "folder-map"
  | "phone-number"
  | "handover";

const E = "border-2 border-edge";
const S = "shadow-[3px_3px_0_var(--edge)]";
const m9 = "font-mono text-[9px] leading-tight";
const m10 = "font-mono text-[10px] leading-tight font-bold";
// A node takes the card background unless the caller gives it its own (two bg-* classes would clash).
const Node = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`${E} ${S} px-2 py-1.5 text-center ${/(^|\s)bg-/.test(className) ? "" : "bg-card"} ${className}`}>{children}</div>
);
const Arrow = () => <ArrowRight className="size-4 shrink-0 text-ink" strokeWidth={3} />;
const Row = ({ children }: { children: ReactNode }) => <div className="flex h-full w-full items-center justify-center gap-1.5 p-3">{children}</div>;

const D: Record<DiagramKind, { tone: Tone; draw: () => ReactNode }> = {
  "web-stack": {
    tone: "sand",
    draw: () => (
      <Row>
        <Node><Laptop className="mx-auto size-5" /><p className={m10}>Visitor</p><p className={m9}>types glow.ng</p></Node>
        <Arrow />
        <Node><Globe className="mx-auto size-5" /><p className={m10}>Domain + DNS</p><p className={m9}>name → address</p></Node>
        <Arrow />
        <Node><Server className="mx-auto size-5" /><p className={m10}>Hosting</p><p className={m9}>Vercel sends files</p></Node>
        <Arrow />
        <Node className="bg-brand"><p className={m10}>Your site</p><p className={m9}>shows in 1–2s</p></Node>
      </Row>
    ),
  },
  "prompt-anatomy": {
    tone: "indigo",
    draw: () => (
      <div className="flex h-full flex-col justify-center gap-1 p-4">
        {[["ROLE", "You are a senior web designer…", "bg-brand"], ["CONTEXT", "Client: salon in Lekki, mobile users…", "bg-card"], ["TASK", "Build the home page with 5 sections…", "bg-card"], ["RULES", "Mobile-first, prices in ₦, no new libraries", "bg-card"], ["OUTPUT", "Return the code + a 3-line summary", "bg-accent text-accent-ink"]].map(([k, v, c]) => (
          <div key={k} className={`flex items-center gap-2 ${E} ${c} px-2 py-1`}>
            <span className={`${m10} w-14 shrink-0`}>{k}</span>
            <span className={`${m9} truncate`}>{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  "page-anatomy": {
    tone: "peach",
    draw: () => (
      <div className="flex h-full items-center justify-center gap-3 p-3">
        <div className={`${E} ${S} w-[130px] space-y-1 bg-card p-1.5`}>
          {[["NAV", "h-3"], ["HERO", "h-10 bg-brand"], ["PROOF", "h-3"], ["SERVICES", "h-6"], ["FAQ", "h-4"], ["CTA", "h-4 bg-accent"]].map(([l, c]) => (
            <div key={l} className={`flex items-center justify-center border border-edge/50 ${c}`}><span className="font-mono text-[7px] font-bold">{l}</span></div>
          ))}
        </div>
        <div className="space-y-1.5">
          {["1 · Promise (headline)", "2 · Proof (why trust you)", "3 · Details (what you get)", "4 · Objections (FAQ)", "5 · One clear action"].map((x) => <p key={x} className={m10}>{x}</p>)}
        </div>
      </div>
    ),
  },
  "serp-anatomy": {
    tone: "sand",
    draw: () => (
      <div className="flex h-full items-center justify-center p-4">
        <div className={`${E} ${S} w-[270px] bg-white p-2.5`}>
          <p className="font-sans text-[9px] text-[#1f6f3f]">glowbeauty.ng › lashes <span className="ml-1 bg-[#ffe1cf] px-1 font-mono text-[7px] text-ink">URL</span></p>
          <p className="font-sans text-[13px] leading-tight text-[#1a0dab]">Lash Extensions in Lekki | Glow <span className="bg-[#ffe1cf] px-1 font-mono text-[7px] text-ink">TITLE ≤60</span></p>
          <p className="mt-0.5 font-sans text-[9px] leading-snug text-[#4d5156]">Natural lashes that last 4 weeks. Book online today. <span className="bg-[#ffe1cf] px-1 font-mono text-[7px] text-ink">DESCRIPTION ≤158</span></p>
          <p className="mt-1.5 font-sans text-[9px] text-[#1a0dab]">Prices · Book online · Our work <span className="bg-[#ffe1cf] px-1 font-mono text-[7px] text-ink">SITELINKS</span></p>
        </div>
      </div>
    ),
  },
  "git-flow": {
    tone: "ink",
    draw: () => (
      <Row>
        {[["Edit", "your files"], ["Commit", "save a snapshot"], ["Push", "send to GitHub"], ["Deploy", "Vercel goes live"]].map(([a, b], i, arr) => (
          <div key={a} className="flex items-center gap-1.5">
            <Node className={i === 3 ? "bg-brand" : ""}><p className={m10}>{a}</p><p className={m9}>{b}</p></Node>
            {i < arr.length - 1 && <ArrowRight className="size-4 text-paper" strokeWidth={3} />}
          </div>
        ))}
      </Row>
    ),
  },
  funnel: {
    tone: "forest",
    draw: () => (
      <div className="flex h-full flex-col items-center justify-center gap-1 p-3">
        {[["100 businesses found", "w-[240px]"], ["60 contacted", "w-[200px]"], ["15 replied", "w-[160px]"], ["5 calls booked", "w-[120px]"], ["2 clients", "w-[80px] bg-brand"]].map(([l, w]) => (
          <div key={l} className={`${E} ${w} bg-card py-1 text-center ${m10}`}>{l}</div>
        ))}
      </div>
    ),
  },
  "trigger-action": {
    tone: "orange",
    draw: () => (
      <Row>
        <Node><p className={m10}>TRIGGER</p><p className={m9}>New Paystack payment</p></Node>
        <Arrow />
        <Node className="bg-wash"><p className={m10}>FILTER</p><p className={m9}>amount &gt; ₦50k?</p></Node>
        <Arrow />
        <div className="space-y-1">
          <Node><p className={m9}><MessageCircle className="inline size-3" /> WhatsApp receipt</p></Node>
          <Node><p className={m9}><Database className="inline size-3" /> Add to sheet</p></Node>
          <Node><p className={m9}><Mail className="inline size-3" /> Email owner</p></Node>
        </div>
      </Row>
    ),
  },
  "agent-loop": {
    tone: "indigo",
    draw: () => (
      <div className="flex h-full flex-col items-center justify-center gap-1 p-3">
        <Node><p className={m9}><User className="inline size-3" /> “Do you have a slot Saturday?”</p></Node>
        <ArrowDown className="size-4 text-paper" strokeWidth={3} />
        <Node className="bg-accent text-accent-ink"><p className={m10}><Bot className="inline size-3.5" /> Agent: rules + knowledge base</p></Node>
        <ArrowDown className="size-4 text-paper" strokeWidth={3} />
        <div className="flex gap-2">
          <Node><p className={m9}>Answer from facts</p></Node>
          <Node><p className={m9}>Book with a tool</p></Node>
          <Node className="bg-brand"><p className={m9}>Hand to a human</p></Node>
        </div>
      </div>
    ),
  },
  "delivery-timeline": {
    tone: "peach",
    draw: () => (
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full items-start">
          {[["Deposit", "50% paid"], ["Build", "preview link"], ["Revise", "2 rounds"], ["Launch", "live + handover"], ["Balance", "50% paid"]].map(([a, b], i, arr) => (
            <div key={a} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span className={`h-0.5 flex-1 ${i ? "bg-edge" : ""}`} />
                <span className={`size-5 shrink-0 rounded-full border-2 border-edge ${i === 0 || i === arr.length - 1 ? "bg-success" : "bg-card"}`} />
                <span className={`h-0.5 flex-1 ${i < arr.length - 1 ? "bg-edge" : ""}`} />
              </div>
              <p className={`${m10} mt-1`}>{a}</p>
              <p className={m9}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "payment-flow": {
    tone: "forest",
    draw: () => (
      <Row>
        <Node><p className={m10}>Customer</p><p className={m9}>taps “Pay ₦18,000”</p></Node>
        <Arrow />
        <Node className="bg-[#0fa958] text-white"><CreditCard className="mx-auto size-5" /><p className={m10}>Paystack</p><p className={m9}>card · transfer · USSD</p></Node>
        <Arrow />
        <Node><p className={m10}>Your server</p><p className={m9}>verifies payment</p></Node>
        <Arrow />
        <Node className="bg-brand"><p className={m10}>Order confirmed</p></Node>
      </Row>
    ),
  },
  "keyword-intent": {
    tone: "sand",
    draw: () => (
      <div className="grid h-full grid-cols-3 gap-2 p-4">
        {[["LEARN", "how to choose a web designer", "blog post", "bg-card"], ["COMPARE", "website cost in Lagos", "pricing page", "bg-wash"], ["BUY", "web designer near me", "service page", "bg-brand"]].map(([k, q, page, c]) => (
          <div key={k} className={`${E} ${S} ${c} flex flex-col p-2`}>
            <p className={m10}>{k}</p>
            <p className={`${m9} mt-1 flex-1`}><Search className="inline size-2.5" /> {q}</p>
            <p className={`${m9} mt-1 border-t border-edge/40 pt-1 font-bold`}>→ {page}</p>
          </div>
        ))}
      </div>
    ),
  },
  "booking-flow": {
    tone: "peach",
    draw: () => (
      <Row>
        {[["Pick service", "Braids · 4h"], ["Pick time", "Sat 11:00"], ["Pay deposit", "₦5,000"], ["Reminder", "24h before"]].map(([a, b], i, arr) => (
          <div key={a} className="flex items-center gap-1.5">
            <Node className={i === 2 ? "bg-brand" : ""}><p className={m10}>{a}</p><p className={m9}>{b}</p></Node>
            {i < arr.length - 1 && <Arrow />}
          </div>
        ))}
      </Row>
    ),
  },
  "claude-loop": {
    tone: "indigo",
    draw: () => (
      <div className="flex h-full items-center justify-center p-3">
        <div className="grid grid-cols-5 items-center gap-1">
          {[["1", "You describe", "plain English"], ["2", "AI plans", "lists the changes"], ["3", "You approve", "yes / no / edit"], ["4", "You check", "open the browser"], ["5", "Commit", "save a snapshot"]].map(([n, a, b], i) => (
            <div key={n} className="flex items-center gap-1">
              <Node className={i === 2 ? "bg-brand" : ""}>
                <p className="display text-[14px] leading-none">{n}</p>
                <p className={m10}>{a}</p>
                <p className={m9}>{b}</p>
              </Node>
              {i < 4 && <ArrowRight className="size-3 shrink-0 text-paper" strokeWidth={3} />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  contrast: {
    tone: "sand",
    draw: () => (
      <div className="grid h-full grid-cols-2 gap-2 p-4">
        {[["#9a9a9a", "#e9e9e9", "2.3 : 1", "FAIL", "bg-danger"], ["#595959", "#ffffff", "7.0 : 1", "PASS", "bg-success"], ["#ffffff", "#ff6719", "2.9 : 1", "FAIL", "bg-danger"], ["#1b1714", "#ff6719", "6.1 : 1", "PASS", "bg-success"]].map(([fg, bg, r, v, c]) => (
          <div key={fg + bg} className={`${E} flex items-center justify-between px-2`} style={{ background: bg }}>
            <span className="font-sans text-[13px] font-bold" style={{ color: fg }}>Book now</span>
            <span className="text-right">
              <span className={`${m9} block text-ink`}>{r}</span>
              <span className={`${c} px-1 font-mono text-[8px] font-bold text-paper`}>{v}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  "brand-kit": {
    tone: "peach",
    draw: () => (
      <div className="flex h-full items-center justify-center p-4">
        <div className={`${E} ${S} w-[270px] bg-card p-2.5`}>
          <p className={`${m10} border-b border-edge pb-1`}>GLOW BEAUTY · BRAND KIT</p>
          <div className="mt-1.5 flex gap-1">{["#ff6719", "#0f4d3a", "#1b1714", "#f6efe2"].map((c) => <span key={c} className="h-6 flex-1 border border-edge" style={{ background: c }} />)}</div>
          <p className="mt-1.5 font-display text-[15px] font-bold leading-none">Aa Headline: Archivo</p>
          <p className="font-sans text-[10px]">Aa Body text: Inter, 16px+</p>
          <div className="mt-1.5 flex gap-1">{["Warm", "Reliable", "Premium"].map((w) => <span key={w} className={`${m9} border border-edge bg-brand px-1`}>{w}</span>)}</div>
        </div>
      </div>
    ),
  },
  breakpoints: {
    tone: "forest",
    draw: () => (
      <div className="flex h-full items-end justify-center gap-3 p-4">
        {[["Phone", "360px", "w-[46px] h-[86px]"], ["Tablet", "768px", "w-[78px] h-[104px]"], ["Laptop", "1280px", "w-[130px] h-[88px]"]].map(([n, w, sz]) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <div className={`${E} ${S} ${sz} space-y-1 bg-card p-1`}>
              <span className="block h-1.5 bg-edge/70" />
              <span className="block h-4 bg-brand" />
              <span className="block h-1 bg-wash" />
              <span className="block h-1 w-2/3 bg-wash" />
            </div>
            <p className={`${m10} text-paper`}>{n}</p>
            <p className={`${m9} text-paper/80`}>{w}</p>
          </div>
        ))}
      </div>
    ),
  },
  "form-flow": {
    tone: "sand",
    draw: () => (
      <Row>
        <Node><p className={m10}>Visitor</p><p className={m9}>fills the form</p></Node>
        <Arrow />
        <Node className="bg-wash"><p className={m10}>Form service</p><p className={m9}>e.g. Formspree</p></Node>
        <Arrow />
        <Node><Mail className="mx-auto size-4" /><p className={m10}>Owner&apos;s inbox</p><p className={m9}>email arrives</p></Node>
        <Arrow />
        <Node className="bg-brand"><p className={m10}>Owner replies</p><p className={m9}>same day</p></Node>
      </Row>
    ),
  },
  rls: {
    tone: "indigo",
    draw: () => (
      <div className="flex h-full items-center justify-center gap-3 p-3">
        <div className={`${E} ${S} w-[150px] bg-card`}>
          <p className={`${m10} border-b-2 border-edge bg-wash px-1.5 py-0.5`}>results table</p>
          {[["Ada's child", "A", "bg-[#ffe1cf]"], ["Bola's child", "B", "bg-[#dfe9d8]"], ["Ada's child", "A", "bg-[#ffe1cf]"], ["Chidi's child", "C", ""]].map(([r, o, c], i) => (
            <p key={i} className={`${m9} flex justify-between border-b border-line px-1.5 py-0.5 ${c}`}><span>{r}</span><span className="font-bold">{o}</span></p>
          ))}
        </div>
        <div className="space-y-1.5">
          <Node className="bg-[#ffe1cf]"><p className={m9}><User className="inline size-3" /> Ada sees only rows A</p></Node>
          <Node className="bg-[#dfe9d8]"><p className={m9}><User className="inline size-3" /> Bola sees only rows B</p></Node>
          <p className={`${m9} text-paper`}>The rule lives in the database</p>
        </div>
      </div>
    ),
  },
  "search-journey": {
    tone: "sand",
    draw: () => (
      <Row>
        {[["Crawl", "Google visits your page"], ["Index", "stores what it's about"], ["Rank", "orders the results"], ["Click", "a customer arrives"]].map(([a, b], i, arr) => (
          <div key={a} className="flex items-center gap-1.5">
            <Node className={i === 3 ? "bg-brand" : ""}><p className={m10}>{a}</p><p className={m9}>{b}</p></Node>
            {i < arr.length - 1 && <Arrow />}
          </div>
        ))}
      </Row>
    ),
  },
  "review-loop": {
    tone: "forest",
    draw: () => (
      <div className="grid h-full grid-cols-2 place-items-center gap-2 p-4">
        {[["1 · Happy customer", "right after the service"], ["2 · Ask with the link", "WhatsApp or QR code"], ["4 · More calls", "stronger map ranking"], ["3 · Review + your reply", "thank them by name"]].map(([a, b]) => (
          <Node key={a} className="w-[130px]"><p className={m10}>{a}</p><p className={m9}>{b}</p></Node>
        ))}
      </div>
    ),
  },
  webhook: {
    tone: "orange",
    draw: () => (
      <Row>
        <Node className="bg-[#0fa958] text-white"><p className={m10}>Paystack</p><p className={m9}>&quot;charge.success&quot;</p></Node>
        <Arrow />
        <Node><p className={m10}>Your webhook URL</p><p className={m9}>checks the signature</p></Node>
        <Arrow />
        <Node><p className={m10}>Verify</p><p className={m9}>amount + reference</p></Node>
        <Arrow />
        <Node className="bg-wash"><p className={m10}>Record once</p><p className={m9}>order → paid</p></Node>
      </Row>
    ),
  },
  "crm-pipeline": {
    tone: "indigo",
    draw: () => (
      <div className="grid h-full grid-cols-4 gap-1.5 p-3">
        {([["New", ["Ada · braids", "Tunde · site"]], ["Contacted", ["Kemi · lashes"]], ["Booked", ["Bisi · Sat 11am"]], ["Paid", ["Uche · ₦30k"]]] as const).map(([col, cards]) => (
          <div key={col} className={`${E} bg-wash p-1`}>
            <p className={`${m10} border-b border-edge pb-0.5`}>{col}</p>
            <div className="mt-1 space-y-1">{cards.map((c) => <p key={c} className={`${m9} border border-edge bg-card px-1 py-0.5`}>{c}</p>)}</div>
          </div>
        ))}
      </div>
    ),
  },
  "pricing-tiers": {
    tone: "peach",
    draw: () => (
      <div className="flex h-full items-end justify-center gap-2 p-4">
        {[["Starter", "Landing page", "h-[92px]", "bg-card"], ["Growth", "5-page site + booking", "h-[122px]", "bg-brand"], ["Complete", "Site + store + care plan", "h-[106px]", "bg-card"]].map(([n, d, h, c]) => (
          <div key={n} className={`${E} ${S} ${h} ${c} flex w-[84px] flex-col justify-between p-1.5`}>
            <p className={m10}>{n}</p>
            <p className={m9}>{d}</p>
            {n === "Growth" && <p className={`${m9} bg-ink px-1 text-paper`}>most pick this</p>}
          </div>
        ))}
      </div>
    ),
  },
  "outreach-sequence": {
    tone: "sand",
    draw: () => (
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full items-start">
          {[["Day 0", "personal message"], ["Day 3", "a free tip"], ["Day 7", "an example"], ["Day 14", "polite last note"]].map(([a, b], i, arr) => (
            <div key={a} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span className={`h-0.5 flex-1 ${i ? "bg-edge" : ""}`} />
                <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 border-edge ${i === 0 ? "bg-brand" : "bg-card"}`}><MessageCircle className="size-3" /></span>
                <span className={`h-0.5 flex-1 ${i < arr.length - 1 ? "bg-edge" : ""}`} />
              </div>
              <p className={`${m10} mt-1`}>{a}</p>
              <p className={`${m9} text-center`}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "folder-map": {
    tone: "ink",
    draw: () => (
      <div className="flex h-full items-center justify-center p-3">
        <div className={`${E} bg-night px-3 py-2 font-mono text-[9.5px] leading-[1.45] text-paper`}>
          <p>my-first-site/</p>
          <p>├─ <span className="text-brand">app/</span> <span className="text-paper/60">- your pages</span></p>
          <p>│  ├─ page.tsx <span className="text-paper/60">- the home page</span></p>
          <p>│  └─ contact/page.tsx</p>
          <p>├─ <span className="text-brand">components/</span> <span className="text-paper/60">- reusable parts</span></p>
          <p>├─ <span className="text-brand">public/</span> <span className="text-paper/60">- images, logo</span></p>
          <p>├─ CLAUDE.md <span className="text-paper/60">- rules for the AI</span></p>
          <p>├─ .env.local <span className="text-paper/60">- secrets (never share)</span></p>
          <p>└─ package.json <span className="text-paper/60">- the project&apos;s recipe</span></p>
        </div>
      </div>
    ),
  },
  "phone-number": {
    tone: "forest",
    draw: () => (
      <Row>
        <Node><p className={m10}>Written</p><p className="font-mono text-[12px]">0803 123 4567</p></Node>
        <Arrow />
        <Node className="bg-wash"><p className={m9}>remove spaces · drop the first 0 · put 234 in front</p></Node>
        <Arrow />
        <Node className="bg-brand"><p className={m10}>WhatsApp link</p><p className="font-mono text-[11px]">wa.me/2348031234567</p></Node>
      </Row>
    ),
  },
  handover: {
    tone: "peach",
    draw: () => (
      <div className="flex h-full items-center justify-center gap-3 p-3">
        <Node className="bg-brand"><User className="mx-auto size-5" /><p className={m10}>Client owns</p><p className={m9}>every account</p></Node>
        <div className="grid grid-cols-2 gap-1">
          {["Domain", "Hosting", "Paystack", "WhatsApp", "Google profile", "Automations"].map((a) => <p key={a} className={`${m9} border-2 border-edge bg-card px-1.5 py-0.5`}>{a}</p>)}
        </div>
        <Node><p className={m10}>You</p><p className={m9}>added as a team member</p></Node>
      </div>
    ),
  },
};

export function LessonDiagram({ kind }: { kind: DiagramKind }) {
  const d = D[kind];
  return <Artboard bg={tones[d.tone].bg}>{d.draw()}</Artboard>;
}
