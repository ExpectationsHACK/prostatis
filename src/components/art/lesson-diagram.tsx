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
  | "booking-flow";

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
          <p className="mt-1.5 font-sans text-[9px] text-[#e0a82e]">★★★★★ 4.9 · 212 reviews <span className="bg-[#ffe1cf] px-1 font-mono text-[7px] text-ink">SCHEMA</span></p>
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
};

export function LessonDiagram({ kind }: { kind: DiagramKind }) {
  const d = D[kind];
  return <Artboard bg={tones[d.tone].bg}>{d.draw()}</Artboard>;
}
