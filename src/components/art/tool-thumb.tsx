import {
  ArrowDown,
  ArrowRight,
  Bell,
  Bot,
  Check,
  Clock,
  Database,
  FileText,
  Gift,
  GitBranch,
  HardDrive,
  Link2,
  Mail,
  MapPin,
  Monitor,
  Search,
  Smartphone,
  Star,
  Tablet,
  User,
  X,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";

/* ---------- primitives, sized for a 320×200 artboard ---------- */
const E = "border-2 border-edge";
const S = "shadow-[4px_4px_0_var(--edge)]";
const m9 = "font-mono text-[9px] leading-tight";
const m10 = "font-mono text-[10px] leading-tight";
const h12 = "font-display text-[13px] font-bold leading-tight";

function Win({ title, children, dark = false, className = "" }: { title?: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`${E} ${S} overflow-hidden ${dark ? "bg-night" : "bg-card"} ${className}`}>
      <div className={`flex items-center gap-1.5 border-b-2 border-edge px-2 py-1 ${dark ? "bg-[#2a2627]" : "bg-wash"}`}>
        <span className="size-2 rounded-full bg-danger" />
        <span className="size-2 rounded-full bg-[#e0a82e]" />
        <span className="size-2 rounded-full bg-success" />
        {title && <span className={`ml-1 truncate ${m9} ${dark ? "text-paper/70" : "text-muted"}`}>{title}</span>}
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}
function Box({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Card background unless the caller sets its own (two bg-* classes would clash).
  return <div className={`${E} ${S} ${/(^|\s)bg-/.test(className) ? "" : "bg-card"} ${className}`}>{children}</div>;
}
const Bar = ({ w = "100%", c = "bg-wash", h = "h-1.5" }: { w?: string; c?: string; h?: string }) => <span className={`block ${h} ${c}`} style={{ width: w }} />;
const Ok = () => <Check className="size-3 shrink-0 text-success" strokeWidth={4} />;
const No = () => <X className="size-3 shrink-0 text-danger" strokeWidth={4} />;
function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${E} ${S} flex flex-col rounded-[14px] bg-card p-1.5 ${className}`}>
      <span className="mx-auto mb-1 h-1 w-8 rounded-full bg-edge/60" />
      <div className="flex-1 overflow-hidden rounded-[8px] bg-paper">{children}</div>
    </div>
  );
}
const Stage = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`flex h-full w-full items-center justify-center p-4 ${className}`}>{children}</div>;

/* ---------- one thumbnail per tool ---------- */
const T: Record<string, () => ReactNode> = {
  // ---- Web design
  "color-palette-generator": () => (
    <Stage className="gap-2">
      {[["#ff6719", "Primary", "#1b1714"], ["#b8430a", "Dark", "#fff"], ["#ffe1cf", "Light", "#1b1714"], ["#0f4d3a", "Accent", "#fff"], ["#1b1714", "Text", "#fff"]].map(([c, n, ink]) => (
        <div key={c} className={`${E} ${S} flex h-[120px] w-[48px] flex-col justify-between p-1`} style={{ background: c, color: ink }}>
          <span className="font-display text-[14px] font-bold">Aa</span>
          <div>
            <p className="font-mono text-[8px] font-bold">{n}</p>
            <p className="font-mono text-[7.5px]">{c}</p>
          </div>
        </div>
      ))}
    </Stage>
  ),
  "wireframe-generator": () => (
    <Stage>
      <Box className="w-[220px] space-y-1 p-2">
        {[["Header", "h-4"], ["Hero · headline · button", "h-12"], ["Services ×3", "h-7"], ["Testimonials", "h-5"], ["Contact · map", "h-5"]].map(([l, h]) => (
          <div key={l} className={`flex items-center justify-between border-2 border-dashed border-edge/50 px-1.5 ${h}`}>
            <span className={`${m9} font-bold uppercase text-muted`}>{l}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "hero-copy-generator": () => (
    <Stage>
      <Win title="mamaskitchen.ng" className="w-[250px]">
        <p className="font-display text-[20px] font-bold leading-[1.05] text-ink">Hot lunch at your desk.</p>
        <p className={`${m10} mt-1.5 text-muted`}>Home-style meals delivered across Lagos</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className={`${E} bg-brand px-2 py-1 ${m9} font-bold text-ink`}>Order on WhatsApp</span>
          <span className={`${m9} text-[#b8430a]`}>★ 4.8 · 300+ orders</span>
        </div>
      </Win>
    </Stage>
  ),
  "font-pairing-picker": () => (
    <Stage className="gap-3">
      {[["Georgia, serif", "system-ui, sans-serif", "Playfair + Lato"], ["system-ui, sans-serif", "Georgia, serif", "Manrope + Lora"]].map(([h, b, n]) => (
        <Box key={n} className="w-[125px] p-2.5">
          <p className="text-[34px] font-bold leading-none text-ink" style={{ fontFamily: h }}>Aa</p>
          <p className="mt-1 text-[11px] leading-snug text-muted" style={{ fontFamily: b }}>Fast websites for Lagos businesses.</p>
          <p className={`${m9} mt-2 border-t border-line pt-1 font-bold text-ink`}>{n}</p>
        </Box>
      ))}
    </Stage>
  ),
  "logo-concept-prompts": () => (
    <Stage>
      <div className="grid grid-cols-2 gap-2">
        <Box className="grid h-[70px] w-[110px] place-items-center"><span className="grid size-11 place-items-center rounded-full bg-brand font-display text-[22px] font-bold text-ink">K</span></Box>
        <Box className="grid h-[70px] w-[110px] place-items-center"><span className="font-display text-[22px] font-bold tracking-tight text-ink">kora</span></Box>
        <Box className="grid h-[70px] w-[110px] place-items-center"><span className="grid size-12 place-items-center rounded-full border-[3px] border-edge font-mono text-[8px] font-bold text-ink">KORA<br />FOODS</span></Box>
        <Box className="flex h-[70px] w-[110px] items-center justify-center gap-1.5"><span className="size-6 rotate-45 border-2 border-edge bg-accent" /><span className="font-display text-[15px] font-bold text-ink">Kora</span></Box>
      </div>
    </Stage>
  ),
  "brand-style-guide": () => (
    <Stage>
      <Box className="w-[250px] p-3">
        <p className={`${m9} font-bold uppercase tracking-widest text-muted`}>Glow Beauty · Style guide</p>
        <div className="mt-2 flex gap-1.5">{["#b8336a", "#f5e6d3", "#1b1714"].map((c) => <span key={c} className="h-7 flex-1 border-2 border-edge" style={{ background: c }} />)}</div>
        <p className="mt-2 text-[18px] font-bold leading-none text-ink" style={{ fontFamily: "Georgia, serif" }}>Confidence, styled.</p>
        <div className="mt-2 flex gap-1">{["Warm", "Confident", "Premium"].map((v) => <span key={v} className={`border border-edge px-1.5 ${m9} text-ink`}>{v}</span>)}</div>
      </Box>
    </Stage>
  ),
  "design-brief-generator": () => (
    <Stage>
      <Box className="w-[220px] p-3">
        <p className={h12}>Website design brief</p>
        {[["Goal", "Get enquiries"], ["Pages", "Home · About · Listings"], ["Look", "Premium & elegant"], ["Budget", "$900"]].map(([k, v]) => (
          <div key={k} className="mt-1.5 flex gap-2 border-b border-line pb-1"><span className={`${m9} w-12 text-muted`}>{k}</span><span className={`${m9} font-bold text-ink`}>{v}</span></div>
        ))}
        <p className={`${m9} mt-2 text-muted`}>Sign-off: <span className="font-display text-[12px] italic text-ink">Adeola</span></p>
      </Box>
    </Stage>
  ),
  // ---- Web development
  "tech-stack-picker": () => (
    <Stage className="gap-3">
      <div className="w-[150px] space-y-1.5">
        {[["Next.js", "Framework"], ["Tailwind", "Styling"], ["Supabase", "Auth + DB"], ["Vercel", "Hosting"]].map(([n, r], i) => (
          <Box key={n} className="flex items-center justify-between px-2 py-1" >
            <span className={`${m10} font-bold text-ink`} style={{ marginLeft: i * 6 }}>{n}</span>
            <span className={`${m9} text-muted`}>{r}</span>
          </Box>
        ))}
      </div>
      <Box className="bg-brand p-2 text-center"><p className={`${m9} text-ink`}>Hosting</p><p className="font-display text-[20px] font-bold text-ink">$0/mo</p></Box>
    </Stage>
  ),
  "claude-md-generator": () => (
    <Stage>
      <Win title="CLAUDE.md" dark className="w-[250px]">
        {[["# Mama's Kitchen site", "text-paper"], ["## Rules — always follow", "text-brand"], ["- Mobile-first, pages < 1MB", "text-paper/70"], ["- Prices in naira: ₦4,500", "text-paper/70"], ["- Ask before new packages", "text-paper/70"], ["## Decisions", "text-brand"]].map(([l, c]) => <p key={l} className={`${m10} ${c}`}>{l}</p>)}
      </Win>
    </Stage>
  ),
  "component-prompt-library": () => (
    <Stage className="flex-col gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {["Header", "Pricing", "FAQ", "Cart", "Booking", "Footer"].map((c, i) => <span key={c} className={`${E} px-2 py-1 text-center ${m10} font-bold ${i === 1 ? "bg-brand text-ink" : "bg-card text-ink"}`}>{c}</span>)}
      </div>
      <Box className="w-[250px] p-2"><p className={`${m9} text-ink`}>Build a pricing table: 3 tiers, middle highlighted, monthly/annual toggle, mobile-first…</p></Box>
    </Stage>
  ),
  "debug-prompt-template": () => (
    <Stage>
      <Win title="terminal" dark className="w-[260px]">
        <p className={`${m10} text-danger`}>✕ Error: fetch failed</p>
        <p className={`${m10} text-paper/60`}>  at POST (app/api/contact/route.ts:14)</p>
        <p className={`${m10} mt-1.5 text-paper/80`}>→ cause: RESEND_API_KEY missing</p>
        <p className={`${m10} mt-1.5 text-success`}>✓ fixed · form sends email</p>
      </Win>
    </Stage>
  ),
  "website-speed-checklist": () => (
    <Stage className="gap-3">
      <Box className="flex w-[110px] flex-col items-center p-2">
        <div className="relative h-[50px] w-[96px] overflow-hidden">
          <div className="absolute inset-0 rounded-t-full border-[9px] border-b-0 border-success" />
          <span className="absolute bottom-0 left-1/2 h-[44px] w-[3px] origin-bottom rotate-[55deg] bg-edge" />
        </div>
        <p className="font-display text-[22px] font-bold text-ink">92</p>
        <p className={`${m9} text-muted`}>Mobile score</p>
      </Box>
      <Box className="w-[130px] space-y-1 p-2">
        {[["LCP", "1.8s"], ["CLS", "0.02"], ["TBT", "90ms"], ["Weight", "850KB"]].map(([k, v]) => <div key={k} className="flex justify-between"><span className={`${m10} text-muted`}>{k}</span><span className={`${m10} font-bold text-success`}>{v}</span></div>)}
      </Box>
    </Stage>
  ),
  "responsive-design-checklist": () => (
    <Stage className="items-end gap-2">
      {[[150, 95, Monitor], [80, 105, Tablet], [48, 88, Smartphone]].map(([w, h, I], i) => {
        const Icon = I as typeof Monitor;
        return (
          <Box key={i} className="flex flex-col overflow-hidden" >
            <div style={{ width: w as number, height: h as number }} className="flex flex-col gap-1 p-1.5">
              <Bar c="bg-brand" h="h-2" w="60%" />
              <Bar w="90%" /><Bar w="70%" />
              <div className={`grid flex-1 gap-1 ${i === 0 ? "grid-cols-3" : "grid-cols-1"}`}>{[0, 1, 2].slice(0, i === 0 ? 3 : 1).map((k) => <span key={k} className="bg-sunk" />)}</div>
              <Icon className="size-3 self-end text-muted" />
            </div>
          </Box>
        );
      })}
    </Stage>
  ),
  "domain-name-generator": () => (
    <Stage>
      <Box className="w-[240px] p-2.5">
        <div className={`flex items-center gap-1.5 border-2 border-edge px-2 py-1 ${m10}`}><Search className="size-3" /> glow beauty lagos</div>
        {[["glowbeauty.ng", true], ["getglow.com", true], ["glow.com", false], ["glowhq.co", true]].map(([d, ok]) => (
          <div key={d as string} className="mt-1.5 flex items-center justify-between border-b border-line pb-1">
            <span className={`${m10} font-bold text-ink`}>{d}</span>
            <span className={`flex items-center gap-1 ${m9} ${ok ? "text-success" : "text-danger"}`}>{ok ? <Ok /> : <No />}{ok ? "available" : "taken"}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  // ---- Web solutions
  "website-requirements-questionnaire": () => (
    <Stage className="gap-3">
      <Box className="w-[160px] space-y-1.5 p-2.5">
        <p className={h12}>Requirements</p>
        {[["WhatsApp button", true], ["Booking", true], ["Paystack", true], ["Blog", false]].map(([f, on]) => (
          <div key={f as string} className="flex items-center gap-1.5">
            <span className={`grid size-3.5 place-items-center border-2 border-edge ${on ? "bg-brand" : "bg-card"}`}>{on && <Check className="size-2.5 text-ink" strokeWidth={4} />}</span>
            <span className={`${m10} text-ink`}>{f}</span>
          </div>
        ))}
      </Box>
      <Box className="bg-accent p-2 text-center text-accent-ink"><p className={m9}>Estimate</p><p className="font-display text-[20px] font-bold">9 days</p><p className={m9}>Medium</p></Box>
    </Stage>
  ),
  "booking-feature-picker": () => (
    <Stage>
      <Box className="w-[230px] p-2.5">
        <div className="flex justify-between"><p className={h12}>October</p><p className={`${m9} text-muted`}>Glow Studio</p></div>
        <div className="mt-1.5 grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => <span key={i} className={`grid h-4 place-items-center border border-edge/40 ${m9} ${[3, 9, 10].includes(i) ? "bg-wash text-muted line-through" : i === 12 ? "bg-brand font-bold text-ink" : "text-ink"}`}>{i + 1}</span>)}
        </div>
        <p className={`${m9} mt-1.5 font-bold text-ink`}>13 Oct · 11:00 · Deposit ₦5,000</p>
      </Box>
    </Stage>
  ),
  "whatsapp-catalog-guide": () => (
    <Stage className="gap-3">
      <Phone className="h-[170px] w-[100px]">
        <p className={`bg-[#0f4d3a] px-1.5 py-1 ${m9} font-bold text-paper`}>Ada&apos;s Bakery · Catalog</p>
        <div className="grid grid-cols-2 gap-1 p-1">
          {[["Cake", "₦18,000", "#ffd0b0"], ["Meat pie", "₦4,500", "#f1e9dc"], ["Small chops", "₦25,000", "#ffe1cf"], ["Puff-puff", "₦2,000", "#e7ddd0"]].map(([n, p, c]) => (
            <div key={n} className="border border-edge/40 bg-card"><div className="h-6" style={{ background: c }} /><p className="px-0.5 font-mono text-[7px] text-ink">{n}</p><p className="px-0.5 font-mono text-[7.5px] font-bold text-ink">{p}</p></div>
          ))}
        </div>
      </Phone>
      <div className="space-y-1.5">{["1 · Open Catalog", "2 · Add items", "3 · Share link"].map((x) => <Box key={x} className="px-2 py-1"><span className={`${m10} font-bold text-ink`}>{x}</span></Box>)}</div>
    </Stage>
  ),
  "landing-page-copy-generator": () => (
    <Stage>
      <Box className="w-[250px] space-y-1 p-2">
        {[["HERO", "Lose 8kg eating the food you love."], ["PROBLEM", "Diets that don't fit Nigerian food"], ["BENEFITS", "✓ Meal plans ✓ 20-min workouts"], ["OFFER", "₦120,000 · Start my plan"], ["GUARANTEE", "Full refund in 14 days"]].map(([k, v], i) => (
          <div key={k} className="flex gap-2 border-b border-line pb-1">
            <span className={`w-16 shrink-0 ${m9} font-bold ${i === 0 ? "text-brand-text" : "text-muted"}`}>{k}</span>
            <span className={`${m9} truncate text-ink`}>{v}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "pricing-layout-picker": () => (
    <Stage className="items-end gap-2">
      {[["Starter", "₦80k", false], ["Growth", "₦150k", true], ["Pro", "₦300k", false]].map(([n, p, hi]) => (
        <Box key={n as string} className={`w-[82px] p-2 ${hi ? "-translate-y-3 bg-brand" : ""}`}>
          {hi && <p className="mb-1 bg-ink px-1 text-center font-mono text-[7px] font-bold text-paper">MOST POPULAR</p>}
          <p className={`${m10} font-bold text-ink`}>{n}</p>
          <p className="font-display text-[17px] font-bold text-ink">{p}</p>
          <div className="mt-1 space-y-1">{[0, 1, 2].map((i) => <div key={i} className="flex items-center gap-1"><Check className="size-2.5 text-ink" strokeWidth={4} /><Bar w="70%" c="bg-edge/20" /></div>)}</div>
        </Box>
      ))}
    </Stage>
  ),
  "faq-generator": () => (
    <Stage className="flex-col gap-1.5">
      {[["How much does a repair cost?", "From ₦25,000 — price confirmed before we start."], ["How long does it take?", ""], ["Do you give a warranty?", ""]].map(([q, a]) => (
        <Box key={q} className="w-[250px] px-2 py-1.5">
          <div className="flex justify-between"><span className={`${m10} font-bold text-ink`}>{q}</span><span className={`${m10} font-bold text-brand-text`}>{a ? "−" : "+"}</span></div>
          {a && <p className={`${m9} mt-1 text-muted`}>{a}</p>}
        </Box>
      ))}
      <span className={`self-end ${E} bg-success px-1.5 ${m9} font-bold text-paper`}>FAQPage schema ✓</span>
    </Stage>
  ),
  "testimonial-formatter": () => (
    <Stage className="gap-2">
      <p className={`w-[110px] border-2 border-edge bg-[#d7f5c4] p-2 ${m9} text-ink`}>omg thx sooo much!!! the website is sweet 😍😍 3 bookings first week</p>
      <ArrowRight className="size-5 shrink-0 text-ink" strokeWidth={3} />
      <Box className="w-[130px] p-2">
        <div className="flex gap-0.5 text-[#e0a82e]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-current" />)}</div>
        <p className="mt-1 font-display text-[12px] font-bold leading-tight text-ink">“We got 3 bookings the first week.”</p>
        <p className={`${m9} mt-1 text-muted`}>— Chioma O., Lash Studio</p>
      </Box>
    </Stage>
  ),
  // ---- SEO
  "keyword-research-prompts": () => (
    <Stage>
      <Box className="w-[250px] p-2.5">
        {[["web design lagos", "Buy", 90], ["website cost nigeria", "Compare", 70], ["how to choose a web designer", "Learn", 45], ["web designer near me", "Buy", 80]].map(([k, intent, w]) => (
          <div key={k as string} className="mb-1.5">
            <div className="flex justify-between"><span className={`${m10} text-ink`}>{k}</span><span className={`${m9} font-bold ${intent === "Buy" ? "text-success" : intent === "Compare" ? "text-brand-text" : "text-muted"}`}>{intent}</span></div>
            <Bar w={`${w}%`} c="bg-brand" h="h-1.5" />
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "meta-tag-generator": () => (
    <Stage>
      <div className={`${E} ${S} w-[270px] bg-white p-3`}>
        <p className="font-sans text-[10px] text-[#1f6f3f]">glowbeauty.ng › lash-extensions</p>
        <p className="font-sans text-[14px] leading-tight text-[#1a0dab]">Lash Extensions in Lekki | Glow Beauty</p>
        <p className="mt-0.5 font-sans text-[10px] leading-snug text-[#4d5156]">Natural-looking lashes that last 4 weeks. Book online today and pay easily.</p>
        <div className="mt-2 flex gap-2">
          <span className={`${m9} border border-success px-1 font-bold text-success`}>Title 41/60 ✓</span>
          <span className={`${m9} border border-success px-1 font-bold text-success`}>Desc 142/158 ✓</span>
        </div>
      </div>
    </Stage>
  ),
  "local-seo-checklist": () => (
    <Stage className="gap-2">
      <div className="relative h-[140px] w-[140px]">
        <Box className="h-full w-full bg-[#e9efe4] p-0"><div className="h-full w-full bg-[linear-gradient(90deg,transparent_45%,#fff_45%,#fff_53%,transparent_53%),linear-gradient(0deg,transparent_38%,#fff_38%,#fff_46%,transparent_46%)]" /></Box>
        <MapPin className="absolute left-[40%] top-6 size-9 fill-brand text-edge" />
        <MapPin className="absolute left-[15%] top-16 size-5 fill-card text-edge" />
        <MapPin className="absolute right-[15%] top-20 size-5 fill-card text-edge" />
      </div>
      <Box className="w-[120px] p-2">
        <p className={`${m10} font-bold text-ink`}>Glow Beauty</p>
        <p className={`${m9} text-[#e0a82e]`}>★★★★★ 4.9 (212)</p>
        {["Verified", "Category set", "20+ reviews"].map((x) => <div key={x} className="mt-1 flex items-center gap-1"><Ok /><span className={`${m9} text-ink`}>{x}</span></div>)}
      </Box>
    </Stage>
  ),
  "on-page-seo-audit": () => (
    <Stage className="gap-3">
      <Box className="grid size-[100px] place-items-center">
        <div className="grid size-[76px] place-items-center rounded-full border-[8px] border-brand"><span className="font-display text-[22px] font-bold text-ink">81</span></div>
      </Box>
      <Box className="w-[140px] space-y-1 p-2">
        {[["Title 52 chars", true], ["Meta description", true], ["One H1", false], ["Image alt text", false], ["Canonical", true], ["Schema", true]].map(([t, ok]) => (
          <div key={t as string} className="flex items-center gap-1.5">{ok ? <Ok /> : <No />}<span className={`${m9} text-ink`}>{t}</span></div>
        ))}
      </Box>
    </Stage>
  ),
  "blog-topic-generator": () => (
    <Stage className="flex-col gap-1.5">
      {[["COST", "How much does solar cost in Abuja?"], ["MISTAKES", "7 solar mistakes that cost you money"], ["COMPARE", "Inverter vs generator: the real numbers"], ["LOCAL", "Best areas in Abuja for solar"]].map(([k, t]) => (
        <Box key={t} className="flex w-[260px] items-center gap-2 px-2 py-1">
          <FileText className="size-3.5 shrink-0 text-brand-text" />
          <span className={`${m10} flex-1 truncate text-ink`}>{t}</span>
          <span className={`${m9} font-bold text-muted`}>{k}</span>
        </Box>
      ))}
    </Stage>
  ),
  "backlink-outreach-scripts": () => (
    <Stage>
      <Win title="New message" className="w-[260px]">
        <p className={`${m9} text-muted`}>To: editor@techcabal.com</p>
        <p className={`${m10} font-bold text-ink`}>Subject: Article idea — first 100 customers online</p>
        <div className="mt-1.5 space-y-1"><Bar w="90%" /><Bar w="80%" /><Bar w="60%" /></div>
        <div className="mt-2 flex items-center gap-1.5"><Link2 className="size-3.5 text-brand-text" /><span className={`${m9} font-bold text-success`}>Link earned → Domain authority ↑</span></div>
      </Win>
    </Stage>
  ),
  "seo-content-brief": () => (
    <Stage>
      <Box className="w-[240px] p-2.5">
        <p className={`${m9} font-bold uppercase text-muted`}>Content brief · 1,400 words</p>
        {[["H1", "Cost of solar installation in Abuja", 0], ["H2", "What affects the price", 1], ["H2", "Typical prices (table)", 1], ["H2", "How to save money", 1], ["H2", "FAQ + schema", 1]].map(([t, l, ind]) => (
          <p key={l as string} className={`${m10} mt-1 text-ink`} style={{ marginLeft: (ind as number) * 12 }}><span className="font-bold text-brand-text">{t}</span> {l}</p>
        ))}
      </Box>
    </Stage>
  ),
  "gbp-post-generator": () => (
    <Stage>
      <Box className="w-[200px] overflow-hidden">
        <div className="grid h-[70px] place-items-center bg-brand"><span className="font-display text-[22px] font-bold text-ink">20% OFF</span></div>
        <div className="p-2">
          <p className={`${m10} font-bold text-ink`}>Party trays this weekend</p>
          <p className={`${m9} text-muted`}>Jollof, fried rice & small chops · Ikeja</p>
          <span className={`mt-1.5 inline-block border-2 border-edge px-1.5 ${m9} font-bold text-ink`}>Order online</span>
        </div>
      </Box>
    </Stage>
  ),
  // ---- Automation
  "automation-idea-generator": () => (
    <Stage className="flex-col gap-1.5">
      {[["New Paystack payment", "WhatsApp receipt + sheet", "3h/wk"], ["Order delivered", "Ask for Google review", "2h/wk"], ["Stock below 5", "Alert the owner", "1h/wk"]].map(([a, b, t]) => (
        <Box key={a} className="flex w-[270px] items-center gap-1.5 px-2 py-1">
          <Zap className="size-3.5 shrink-0 text-brand-text" />
          <span className={`${m9} text-ink`}>{a}</span>
          <ArrowRight className="size-3 shrink-0" />
          <span className={`${m9} flex-1 text-ink`}>{b}</span>
          <span className={`${m9} font-bold text-success`}>{t}</span>
        </Box>
      ))}
    </Stage>
  ),
  "zapier-make-scenario-planner": () => (
    <Stage className="gap-1">
      {[["Sheets", "#0f9d58"], ["Filter", "#e0a82e"], ["WhatsApp", "#25d366"], ["Slack", "#4a154b"]].map(([n, c], i, a) => (
        <div key={n} className="flex items-center gap-1">
          <div className="flex flex-col items-center gap-1">
            <span className={`grid size-[48px] place-items-center rounded-full ${E} ${S}`} style={{ background: c }}><span className="font-mono text-[9px] font-bold text-white">{n.slice(0, 2)}</span></span>
            <span className={`${m9} font-bold text-ink`}>{n}</span>
          </div>
          {i < a.length - 1 && <span className="mb-4 h-0.5 w-4 bg-edge" />}
        </div>
      ))}
    </Stage>
  ),
  "business-process-audit": () => (
    <Stage>
      <Box className="w-[260px] p-2.5">
        {[["Replying 'how much?'", 8, "Automate"], ["Typing orders", 5, "Automate"], ["Payment reminders", 3, "Automate"], ["Instagram posts", 4, "AI assist"], ["Hiring", 2, "Manual"]].map(([t, h, v]) => (
          <div key={t as string} className="mb-1 flex items-center gap-1.5">
            <span className={`${m9} w-[100px] truncate text-ink`}>{t}</span>
            <span className="h-2.5 bg-brand" style={{ width: (h as number) * 9 }} />
            <span className={`${m9} ml-auto font-bold ${v === "Automate" ? "text-success" : "text-muted"}`}>{v}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "email-autoresponder-generator": () => (
    <Stage className="gap-2">
      <Win title="Inbox" className="w-[170px]">
        {[["New enquiry — Kemi", false], ["Re: Thanks for contacting us", true]].map(([t, auto]) => (
          <div key={t as string} className="mb-1 flex items-center gap-1 border-b border-line pb-1"><Mail className="size-3 text-brand-text" /><span className={`${m9} flex-1 truncate text-ink`}>{t}</span>{auto && <span className={`${m9} font-bold text-success`}>0:02</span>}</div>
        ))}
      </Win>
      <div className="space-y-1">{["Now", "Day 2", "Day 5"].map((d, i) => <Box key={d} className={`px-2 py-0.5 ${i === 0 ? "bg-brand" : ""}`}><span className={`${m9} font-bold text-ink`}>{d}</span></Box>)}</div>
    </Stage>
  ),
  "automation-roi-calculator": () => (
    <Stage className="gap-3">
      <div className="space-y-2">
        <Box className="px-2 py-1"><p className={`${m9} text-muted`}>Payback</p><p className="font-display text-[18px] font-bold text-ink">2.5 months</p></Box>
        <Box className="bg-accent px-2 py-1 text-accent-ink"><p className={m9}>Saved per year</p><p className="font-display text-[18px] font-bold">₦2,100,000</p></Box>
      </div>
      <Box className="flex items-end gap-1.5 px-2.5 pb-2 pt-4">{[20, 34, 50, 70, 95].map((h, i) => <span key={i} className={`w-4 border-2 border-edge ${i === 4 ? "bg-brand" : "bg-accent"}`} style={{ height: h }} />)}</Box>
    </Stage>
  ),
  "token-cost-calculator": () => (
    <Stage>
      <Box className="w-[250px] p-2.5">
        {[["Haiku 4.5", "₦27,900"], ["Sonnet 5", "₦55,800"], ["Opus 5.5", "₦111,600"]].map(([m, p], i) => (
          <div key={m} className={`mb-1 flex justify-between px-1.5 py-1 ${i === 1 ? "border-2 border-edge bg-brand-wash" : "border-b border-line"}`}><span className={`${m10} font-bold text-ink`}>{m}</span><span className={`${m10} text-ink`}>{p}/mo</span></div>
        ))}
        <p className={`${m9} mt-1 text-muted`}>6,000 chatbot replies · ₦1,550/$</p>
      </Box>
    </Stage>
  ),
  "mcp-server-picker": () => (
    <Stage>
      <div className="relative h-[160px] w-[260px]">
        <Box className="absolute left-1/2 top-1/2 grid size-[56px] -translate-x-1/2 -translate-y-1/2 place-items-center bg-brand"><Bot className="size-7 text-ink" /></Box>
        {[["GitHub", GitBranch, "left-0 top-2"], ["Drive", HardDrive, "right-0 top-2"], ["Supabase", Database, "left-0 bottom-2"], ["Stripe", Zap, "right-0 bottom-2"]].map(([n, I, pos]) => {
          const Icon = I as typeof GitBranch;
          return <Box key={n as string} className={`absolute flex items-center gap-1 px-2 py-1 ${pos}`}><Icon className="size-3.5 text-ink" /><span className={`${m10} font-bold text-ink`}>{n as string}</span></Box>;
        })}
        <svg className="absolute inset-0 -z-0" viewBox="0 0 260 160" aria-hidden><path d="M50 22 L130 80 L210 22 M50 138 L130 80 L210 138" stroke="var(--edge)" strokeWidth="2" strokeDasharray="4 3" fill="none" /></svg>
      </div>
    </Stage>
  ),
  // ---- Lead gen
  "cold-dm-script-generator": () => (
    <Stage>
      <Phone className="h-[176px] w-[150px]">
        <p className={`bg-ink px-1.5 py-1 ${m9} font-bold text-paper`}>@oakandironbarbers</p>
        <div className="space-y-1 p-1.5">
          <p className={`bg-card px-1.5 py-1 ${m9} text-ink border border-edge/30`}>Hi James, noticed your <span className="bg-brand-wash font-bold">booking link doesn&apos;t load on mobile</span>.</p>
          <p className={`bg-card px-1.5 py-1 ${m9} text-ink border border-edge/30`}>Want a free 2-min video of the fix?</p>
          <p className={`ml-auto w-[70%] bg-[#d7f5c4] px-1.5 py-1 ${m9} text-ink`}>Yes please! 🙏</p>
        </div>
      </Phone>
    </Stage>
  ),
  "lead-magnet-ideas": () => (
    <Stage className="gap-3">
      <Box className="w-[140px] p-2.5">
        <Gift className="size-5 text-brand-text" />
        <p className="mt-1 font-display text-[14px] font-bold leading-tight text-ink">Free 5-point website check</p>
        <div className={`mt-2 border-2 border-edge px-1.5 py-0.5 ${m9} text-muted`}>your@email.com</div>
        <p className={`mt-1 bg-brand text-center ${m9} font-bold text-ink`}>Get my audit</p>
      </Box>
      <Box className="bg-accent p-2 text-center text-accent-ink"><p className="font-display text-[22px] font-bold">124</p><p className={m9}>leads this month</p></Box>
    </Stage>
  ),
  "prospect-list-builder": () => (
    <Stage>
      <Box className="w-[270px] overflow-hidden">
        <div className={`flex items-center gap-1.5 border-b-2 border-edge px-2 py-1 ${m10}`}><Search className="size-3" /> dental clinic in Lagos</div>
        {[["SmileCare", "Lekki", "no site", "5"], ["DentPro", "Ikeja", "old site", "4"], ["BrightTeeth", "Yaba", "no site", "5"], ["OralPlus", "VI", "good", "2"]].map((r) => (
          <div key={r[0]} className="grid grid-cols-[1.2fr_0.8fr_0.9fr_0.4fr] border-b border-line px-2 py-0.5">
            {r.map((c, j) => <span key={j} className={`${m9} ${j === 3 ? `font-bold ${Number(c) >= 4 ? "text-success" : "text-muted"}` : "text-ink"}`}>{c}</span>)}
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "follow-up-sequence-generator": () => (
    <Stage className="flex-col gap-2">
      <div className="flex w-[270px] items-center">
        {["D3", "D7", "D14", "D21"].map((d, i, a) => (
          <div key={d} className="flex flex-1 items-center">
            <span className={`grid size-10 shrink-0 place-items-center ${E} ${S} ${i === 1 ? "bg-brand" : "bg-card"} ${m10} font-bold text-ink`}>{d}</span>
            {i < a.length - 1 && <span className="h-0.5 flex-1 bg-edge" />}
          </div>
        ))}
      </div>
      <p className={`ml-8 self-start border-2 border-edge bg-[#d7f5c4] px-2 py-1 ${m10} text-ink`}>“Yes, send the video!” — reply on day 7</p>
    </Stage>
  ),
  "web-scraper-config": () => (
    <Stage className="gap-2">
      <Win title="directory.ng" className="w-[140px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-1 border-2 border-dashed border-brand p-1"><Bar w="70%" c="bg-edge/40" /><div className="mt-0.5"><Bar w="45%" /></div></div>
        ))}
      </Win>
      <ArrowRight className="size-5 shrink-0" strokeWidth={3} />
      <Box className="w-[100px] overflow-hidden">
        <p className={`bg-wash px-1 ${m9} font-bold`}>leads.csv</p>
        {["name,phone", "Kora,0803…", "Ada,0812…", "Chi,0906…"].map((r) => <p key={r} className={`border-t border-line px-1 ${m9} text-ink`}>{r}</p>)}
      </Box>
    </Stage>
  ),
  "lead-qualification": () => (
    <Stage className="gap-3">
      <Box className="w-[140px] p-2">
        {[["Budget", 3], ["Authority", 3], ["Need", 3], ["Timing", 1], ["Fit", 3]].map(([k, p]) => (
          <div key={k as string} className="mb-1 flex items-center gap-1.5"><span className={`${m9} w-14 text-ink`}>{k}</span>{[0, 1, 2].map((i) => <span key={i} className={`size-3 border border-edge ${i < (p as number) ? "bg-brand" : "bg-wash"}`} />)}</div>
        ))}
      </Box>
      <Box className="bg-success p-2 text-center text-paper"><p className="font-display text-[26px] font-bold">13</p><p className={m9}>/15 · GO</p></Box>
    </Stage>
  ),
  "landing-page-checklist": () => (
    <Stage className="gap-2">
      <Win title="offer.ng" className="w-[160px]">
        {[["1", "Clear headline"], ["2", "One button"], ["3", "Real proof"]].map(([n, t]) => (
          <div key={n} className="mb-1 flex items-center gap-1.5"><span className={`grid size-4 place-items-center rounded-full bg-brand ${m9} font-bold text-ink`}>{n}</span><span className={`${m9} text-ink`}>{t}</span></div>
        ))}
        <p className={`mt-1 bg-ink text-center ${m9} font-bold text-paper`}>Book a call</p>
      </Win>
      <Box className="p-2 text-center"><p className="font-display text-[24px] font-bold text-ink">72</p><p className={`${m9} text-muted`}>/100</p></Box>
    </Stage>
  ),
  // ---- Agents
  "chatbot-persona-builder": () => (
    <Stage>
      <Box className="flex w-[250px] gap-2.5 p-2.5">
        <span className="grid size-14 shrink-0 place-items-center border-2 border-edge bg-accent"><Bot className="size-8 text-accent-ink" /></span>
        <div>
          <p className={h12}>Ada · Glow Beauty assistant</p>
          <div className="mt-1 flex gap-1">{["Warm", "Concise"].map((x) => <span key={x} className={`border border-edge px-1 ${m9}`}>{x}</span>)}</div>
          <p className={`${m9} mt-1.5 text-success`}>✓ books · quotes · takes deposits</p>
          <p className={`${m9} text-danger`}>✕ no medical advice · no fake discounts</p>
        </div>
      </Box>
    </Stage>
  ),
  "customer-service-scripts": () => (
    <Stage>
      <Box className="w-[220px] overflow-hidden">
        <p className={`flex items-center gap-1 bg-accent px-2 py-1 ${m10} font-bold text-accent-ink`}><Bot className="size-3.5" /> QuickShip support</p>
        <div className="space-y-1 p-2">
          <p className={`w-[75%] bg-sunk px-1.5 py-1 ${m9} text-ink`}>Where is my order?</p>
          <p className={`ml-auto w-[85%] bg-brand-wash px-1.5 py-1 ${m9} text-ink`}>QS-48213 is out for delivery 🚚 ETA 2:30pm</p>
          <p className={`w-[70%] bg-sunk px-1.5 py-1 ${m9} text-ink`}>I want a refund</p>
          <p className={`ml-auto w-[85%] bg-brand-wash px-1.5 py-1 ${m9} text-ink`}>Connecting you to Tolu now 🙏</p>
        </div>
      </Box>
    </Stage>
  ),
  "whatsapp-bot-flow-builder": () => (
    <Stage className="flex-col gap-1">
      <Box className="bg-[#0f4d3a] px-3 py-1"><span className={`${m10} font-bold text-paper`}>Hi 👋 pick an option</span></Box>
      <ArrowDown className="size-4" strokeWidth={3} />
      <div className="flex gap-2">
        {["1 · Menu", "2 · Order", "3 · Track", "4 · Human"].map((o, i) => <Box key={o} className={`px-1.5 py-1 ${i === 1 ? "bg-brand" : ""}`}><span className={`${m9} font-bold text-ink`}>{o}</span></Box>)}
      </div>
      <p className={`${m9} mt-1 text-ink`}>Order → items → address → Paystack link</p>
    </Stage>
  ),
  "agent-task-decomposer": () => (
    <Stage className="flex-col gap-1">
      {["1 · Search 20 restaurants", "2 · Filter: no website", "3 · Save to Google Sheet", "4 · Draft outreach emails", "5 · ⏸ Wait for approval"].map((s, i) => (
        <Box key={s} className={`w-[220px] px-2 py-0.5 ${i === 4 ? "bg-brand-wash" : ""}`}><span className={`${m10} font-bold text-ink`}>{s}</span></Box>
      ))}
    </Stage>
  ),
  "faq-to-knowledge-base": () => (
    <Stage className="gap-2">
      <p className={`w-[100px] rotate-[-2deg] border-2 border-edge bg-card p-1.5 ${m9} text-muted`}>opening hrs? mon-sat 9-7. lash price?? 25k classic 35k volume…</p>
      <ArrowRight className="size-5 shrink-0" strokeWidth={3} />
      <Win title="knowledge-base.json" dark className="w-[140px]">
        <p className={`${m9} text-brand`}>{"{"} &quot;q&quot;: &quot;Hours?&quot;,</p>
        <p className={`${m9} text-paper/80`}>  &quot;a&quot;: &quot;Mon–Sat 9–7&quot; {"}"}</p>
        <p className={`${m9} mt-1 text-success`}>✓ 12 Q&amp;A pairs</p>
      </Win>
    </Stage>
  ),
  "agent-monitoring-checklist": () => (
    <Stage>
      <Box className="w-[260px] p-2.5">
        <div className="flex justify-between"><span className={`${m10} font-bold text-ink`}>WhatsApp agent</span><span className={`${m10} font-bold text-success`}>● 99.9% up</span></div>
        <svg viewBox="0 0 240 40" className="mt-1.5 h-10 w-full" aria-hidden><polyline points="0,24 50,24 60,6 70,34 80,24 150,24 160,10 170,30 180,24 240,24" fill="none" stroke="var(--success)" strokeWidth="3" /></svg>
        <p className={`${m9} mt-1 flex items-center gap-1 text-ink`}><Bell className="size-3 text-brand-text" /> Alert → your WhatsApp if it goes down</p>
      </Box>
    </Stage>
  ),
  "handoff-script-generator": () => (
    <Stage className="gap-3">
      <span className={`grid size-[60px] place-items-center ${E} ${S} bg-accent`}><Bot className="size-8 text-accent-ink" /></span>
      <div className="flex flex-col items-center">
        <p className={`border-2 border-edge bg-card px-2 py-1 ${m9} text-ink`}>“Connecting you to Tolu…”</p>
        <ArrowRight className="mt-1 size-6" strokeWidth={3} />
      </div>
      <span className={`grid size-[60px] place-items-center ${E} ${S} bg-brand`}><User className="size-8 text-ink" /></span>
    </Stage>
  ),
  // ---- Bonus
  "proposal-generator": () => (
    <Stage>
      <Box className="w-[210px] p-3">
        <p className={`${m9} font-bold uppercase text-muted`}>Proposal · Brightside Dental</p>
        {["1. The problem", "2. What you'll get", "3. Timeline — 2 weeks", "4. Investment"].map((l) => <p key={l} className={`${m10} mt-1 text-ink`}>{l}</p>)}
        <p className="mt-1.5 font-display text-[20px] font-bold text-ink">$1,200 <span className={`${m9} text-muted`}>· 50/50</span></p>
      </Box>
    </Stage>
  ),
  "client-pricing-calculator": () => (
    <Stage className="gap-3">
      <Box className="p-2"><p className={`${m9} text-muted`}>Goal</p><p className="font-display text-[16px] font-bold text-ink">₦1.5m/mo</p></Box>
      <ArrowRight className="size-5" strokeWidth={3} />
      <Box className="bg-brand p-2 text-center"><p className={`${m9} text-ink`}>Your floor</p><p className="font-display text-[24px] font-bold text-ink">$40/hr</p><p className={`${m9} text-ink`}>Landing page $325</p></Box>
    </Stage>
  ),
  "invoice-generator": () => (
    <Stage>
      <Box className="relative w-[200px] p-3">
        <div className="flex justify-between"><p className={`${m10} font-bold text-ink`}>GET PAID</p><p className={`${m9} text-muted`}>INV-001</p></div>
        {[["Website build", "$900"], ["AI chat setup", "$300"]].map(([a, b]) => <div key={a} className="mt-1 flex justify-between border-b border-line pb-0.5"><span className={`${m9} text-ink`}>{a}</span><span className={`${m9} text-ink`}>{b}</span></div>)}
        <p className="mt-1.5 text-right font-display text-[18px] font-bold text-ink">$1,200.00</p>
        <span className="absolute -right-3 top-6 rotate-12 border-[3px] border-success px-1.5 font-mono text-[13px] font-bold text-success">PAID</span>
      </Box>
    </Stage>
  ),
  "whatsapp-business-bio": () => (
    <Stage>
      <Phone className="h-[170px] w-[150px]">
        <div className="flex flex-col items-center p-2">
          <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-[14px] font-bold text-ink">T</span>
          <p className={`${m10} mt-1 font-bold text-ink`}>Tolu Builds</p>
          <p className={`${m9} mt-1 text-center text-ink`}>✨ AI websites for Lagos businesses. Delivered in 5 days. Send &apos;HI&apos; 👇</p>
          <p className={`${m9} mt-1 font-bold text-success`}>118/139 ✓</p>
        </div>
      </Phone>
    </Stage>
  ),
  "cron-schedule-generator": () => (
    <Stage>
      <Win title="schedule" dark className="w-[230px]">
        <p className="font-mono text-[22px] font-bold text-paper">0 7 * * *</p>
        <p className={`${m10} text-brand`}>every day · 08:00 Lagos</p>
        {["Mon 28 Sep, 08:00", "Tue 29 Sep, 08:00"].map((d) => <p key={d} className={`${m9} mt-0.5 flex items-center gap-1 text-paper/70`}><Clock className="size-3" />{d}</p>)}
      </Win>
    </Stage>
  ),
  "hook-line-generator": () => (
    <Stage className="gap-3">
      <Phone className="h-[170px] w-[92px]">
        <div className="flex h-full flex-col justify-end bg-night p-1.5"><p className="bg-brand px-1 font-mono text-[9px] font-bold leading-tight text-ink">Stop charging clients in naira.</p></div>
      </Phone>
      <div className="w-[130px] space-y-1">{["Nobody tells freelancers this…", "5 steps to earning in dollars", "I tried AI websites for 30 days"].map((h) => <Box key={h} className="px-1.5 py-1"><span className={`${m9} text-ink`}>{h}</span></Box>)}</div>
    </Stage>
  ),
};

export function hasToolThumb(slug: string) {
  return slug in T;
}

export function ToolThumb({ slug, tone }: { slug: string; tone: Tone }) {
  const Render = T[slug];
  return (
    <Artboard bg={tones[tone].bg}>
      {Render ? <Render /> : <Stage><Box className="p-3"><span className={h12}>{slug}</span></Box></Stage>}
    </Artboard>
  );
}
