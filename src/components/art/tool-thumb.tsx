import { ArrowDown, ArrowRight, Bell, Bot, Clock, Database, FileText, Gift, GitBranch, HardDrive, Link2, Mail, MapPin, Monitor, Search, Smartphone, Tablet, User, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";
import { at, Box, Cursor, Line, loop, m, Phone, Stage, Stars, t, Tick, Win } from "./kit";

/**
 * One animated thumbnail per free tool: each shows the tool's real result being produced
 * (swatches appearing, a gauge sweeping, domains being checked, an invoice stamped PAID).
 */
const O = "#eb5e28";
const chip = "rounded-full border border-[#e4e0d8] bg-white px-1.5 py-[1px]";

const T: Record<string, () => ReactNode> = {
  /* ---------------- Web design ---------------- */
  "color-palette-generator": () => (
    <Stage d={8} className="flex-col gap-2">
      <div className="flex gap-2">
        {[["#eb5e28", "Primary", "#151515"], ["#b8400f", "Deep", "#fff"], ["#fdeee6", "Light", "#151515"], ["#1f4d3a", "Accent", "#fff"], ["#151515", "Text", "#fff"]].map(([c, n, ink], i) => (
          <div key={c} className={"flex h-[104px] w-[46px] flex-col justify-between rounded-[8px] border border-black/10 p-1.5 shadow-sm " + m("pop")} style={{ ...at(0.2 + i * 0.25), background: c, color: ink }}>
            <span className="text-[15px] font-bold">Aa</span>
            <span>
              <span className={`block ${t.xs} font-semibold`}>{n}</span>
              <span className={`block font-code text-[6.5px]`}>{c}</span>
            </span>
          </div>
        ))}
      </div>
      <span className={`${chip} ${t.sm} flex items-center gap-1 font-semibold text-[#16794a] ` + m("in")} style={at(1.9)}>
        <Tick /> Text contrast AA · 5.4 : 1
      </span>
    </Stage>
  ),
  "wireframe-generator": () => (
    <Stage d={9}>
      <Win title="wireframe · home" className="w-[236px]" bodyClass="space-y-1 p-2">
        {[
          ["Header · logo · menu · call button", "h-[14px]"],
          ["Hero · headline · one button", "h-[34px]"],
          ["3 services", "h-[22px]"],
          ["Reviews", "h-[16px]"],
          ["Contact · map · WhatsApp", "h-[16px]"],
        ].map(([l, h], i) => (
          <div key={l} className={`flex items-center rounded-[4px] border border-dashed border-[#c9c3b8] bg-[#faf8f4] px-1.5 ${h} ` + m("left")} style={at(0.2 + i * 0.35)}>
            <span className={`${t.xs} font-semibold text-[#6b675f]`}>{l}</span>
            {i === 1 && <span className="ml-auto h-[8px] w-[34px] rounded-[3px] bg-[#eb5e28]" />}
          </div>
        ))}
      </Win>
    </Stage>
  ),
  "hero-copy-generator": () => (
    <Stage d={8}>
      <Win title="mamaskitchen.ng" className="w-[250px]" bodyClass="p-3">
        <p className={"text-[19px] font-bold leading-[1.05] tracking-[-0.02em] text-[#151515] " + m("type")} style={at(0.3)}>Hot lunch at your desk.</p>
        <p className={`${t.sm} mt-1.5 text-[#6b675f] ` + m("in")} style={at(1.6)}>Home-style meals delivered across Ikeja, from ₦3,500.</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className={`rounded-full bg-[#1faa53] px-2.5 py-1 ${t.sm} font-semibold text-white ` + m("pop")} style={at(2.2)}>Order on WhatsApp</span>
          <span className={`flex items-center gap-1 ${t.xs} text-[#6b675f] ` + m("in")} style={at(2.6)}><Stars /> 4.8 · 300+ orders</span>
        </div>
      </Win>
    </Stage>
  ),
  "font-pairing-picker": () => (
    <Stage d={8} className="gap-3">
      {[["Georgia, serif", "system-ui, sans-serif", "Playfair + Lato", "Manrope + Lora"], ["system-ui, sans-serif", "Georgia, serif", "Archivo + Inter", "DM Serif + DM Sans"]].map(([h, b, n1, n2], i) => (
        <Box key={n1} className={"relative w-[122px] p-2.5 " + (i === 0 ? m("glow") : "")} style={at(3.4)}>
          <div className="relative h-[62px]">
            <div className={"absolute inset-0 " + m("swap-a")} style={at(0)}>
              <p className="text-[32px] font-bold leading-none" style={{ fontFamily: h }}>Aa</p>
              <p className="mt-1 text-[9px] leading-snug text-[#6b675f]" style={{ fontFamily: b }}>Fast websites for Lagos businesses.</p>
            </div>
            <div className={"absolute inset-0 " + m("swap-b")} style={at(0)}>
              <p className="text-[32px] font-bold leading-none" style={{ fontFamily: b }}>Aa</p>
              <p className="mt-1 text-[9px] leading-snug text-[#6b675f]" style={{ fontFamily: h }}>Fast websites for Lagos businesses.</p>
            </div>
          </div>
          <p className={`${t.xs} mt-1.5 border-t border-[#efece6] pt-1 font-semibold`}>
            <span className={m("swap-a")} style={at(0)}>{n1}</span>
            <span className={"absolute left-2.5 " + m("swap-b")} style={at(0)}>{n2}</span>
          </p>
        </Box>
      ))}
    </Stage>
  ),
  "logo-concept-prompts": () => (
    <Stage d={9}>
      <div className="grid grid-cols-2 gap-2">
        <Box className={"grid h-[64px] w-[112px] place-items-center " + m("pop")} style={at(0.2)}><span className="grid size-10 place-items-center rounded-full bg-[#eb5e28] text-[20px] font-bold">K</span></Box>
        <Box className={"relative grid h-[64px] w-[112px] place-items-center " + m("pop")} style={at(0.5)}>
          <span className="text-[22px] font-bold tracking-tight">kora</span>
          <span className={`absolute right-1 top-1 rounded-full bg-[#151515] px-1.5 ${t.xs} font-semibold text-white ` + m("pop")} style={at(2.4)}>Chosen</span>
        </Box>
        <Box className={"grid h-[64px] w-[112px] place-items-center " + m("pop")} style={at(0.8)}><span className="grid size-11 place-items-center rounded-full border-[3px] border-[#151515] text-center font-code text-[7px] font-bold leading-tight">KORA<br />FOODS</span></Box>
        <Box className={"flex h-[64px] w-[112px] items-center justify-center gap-1.5 " + m("pop")} style={at(1.1)}><span className="size-5 rotate-45 rounded-[3px] bg-[#1f4d3a]" /><span className="text-[15px] font-bold">Kora</span></Box>
      </div>
    </Stage>
  ),
  "brand-style-guide": () => (
    <Stage d={9}>
      <Box className="w-[248px] p-3">
        <p className={`${t.xs} font-semibold tracking-[0.12em] text-[#8a857b]`}>GLOW BEAUTY · STYLE GUIDE</p>
        <div className="mt-2 flex gap-1.5">
          {["#b8336a", "#f5e6d3", "#151515", "#eb5e28"].map((c, i) => <span key={c} className={"h-7 flex-1 rounded-[5px] border border-black/10 " + m("grow-y")} style={{ ...at(0.2 + i * 0.2), background: c }} />)}
        </div>
        <p className={"mt-2 text-[19px] font-bold leading-none " + m("type")} style={{ ...at(1.2), fontFamily: "Georgia, serif" }}>Confidence, styled.</p>
        <div className="mt-2 flex gap-1">
          {["Warm", "Confident", "Premium"].map((v, i) => <span key={v} className={`${chip} ${t.xs} ` + m("pop")} style={at(2.4 + i * 0.25)}>{v}</span>)}
        </div>
      </Box>
    </Stage>
  ),
  "design-brief-generator": () => (
    <Stage d={9}>
      <Box className="relative w-[226px] p-3">
        <p className={t.h}>Website design brief</p>
        {[["Goal", "More enquiries from Lekki"], ["Pages", "Home · About · Listings"], ["Look", "Premium, calm, photo-led"], ["Budget", "₦650,000 · 3 weeks"]].map(([k, v], i) => (
          <div key={k} className={"mt-1.5 flex gap-2 border-b border-[#efece6] pb-1 " + m("left")} style={at(0.3 + i * 0.35)}>
            <span className={`${t.xs} w-10 text-[#8a857b]`}>{k}</span>
            <span className={`${t.xs} font-semibold`}>{v}</span>
          </div>
        ))}
        <p className={`${t.xs} mt-2 text-[#8a857b]`}>
          Signed: <span className={"inline-block text-[12px] italic text-[#151515] " + m("type")} style={{ ...at(2), fontFamily: "Georgia, serif" }}>Adeola O.</span>
        </p>
        <span className={`absolute bottom-2.5 right-2.5 rounded-[4px] border-2 border-[#16794a] px-1.5 ${t.sm} font-bold text-[#16794a] ` + m("stamp")} style={at(3)}>APPROVED</span>
      </Box>
    </Stage>
  ),

  /* ---------------- Web development ---------------- */
  "tech-stack-picker": () => (
    <Stage d={8} className="gap-3">
      <div className="w-[152px] space-y-1.5">
        {[["N", "Next.js", "Framework", "#151515"], ["~", "Tailwind", "Styling", "#0ea5e9"], ["S", "Supabase", "Logins + data", "#16a34a"], ["▲", "Vercel", "Hosting", "#151515"]].map(([ic, n, r, c], i) => (
          <Box key={n} className={"flex items-center gap-1.5 px-1.5 py-1 " + m("left")} style={at(0.2 + i * 0.3)}>
            <span className="grid size-[14px] place-items-center rounded-[4px] text-[8px] font-bold text-white" style={{ background: c }}>{ic}</span>
            <span className={`${t.sm} font-semibold`}>{n}</span>
            <span className={`${t.xs} ml-auto text-[#8a857b]`}>{r}</span>
          </Box>
        ))}
      </div>
      <Box className={"w-[88px] p-2 text-center " + m("pop")} style={at(1.8)}>
        <p className={`${t.xs} text-[#8a857b]`}>To start</p>
        <p className="text-[20px] font-bold">₦0</p>
        <p className={`${t.xs} text-[#16794a]`}>free plans</p>
      </Box>
    </Stage>
  ),
  "claude-md-generator": () => (
    <Stage d={9}>
      <Win title="CLAUDE.md" dark className="w-[252px]" bodyClass="space-y-[3px] p-2.5">
        {[["# Mama's Kitchen website", "text-white"], ["## Always", "text-[#f0946b]"], ["- Mobile-first, pages under 1MB", "text-white/70"], ["- Prices in naira: ₦4,500", "text-white/70"], ["- Ask before adding packages", "text-white/70"], ["## Decisions", "text-[#f0946b]"]].map(([l, c], i) => (
          <p key={l} className={`${t.code} ${c} ` + m("type")} style={at(0.2 + i * 0.45)}>{l}</p>
        ))}
        <span className={"inline-block h-[9px] w-[5px] bg-[#f0946b] " + loop("blink")} />
      </Win>
    </Stage>
  ),
  "component-prompt-library": () => (
    <Stage d={8} className="flex-col gap-2">
      <div className="relative grid grid-cols-3 gap-1.5">
        {["Header", "Pricing", "FAQ", "Cart", "Booking", "Footer"].map((c, i) => (
          <span key={c} className={`w-[74px] rounded-[6px] border border-[#e4e0d8] py-1 text-center ${t.sm} font-semibold ` + (i === 1 ? m("mark") : "bg-white")} style={i === 1 ? at(1.3, { off: "#fff", on: O }) : undefined}>{c}</span>
        ))}
        <Cursor className={"left-[150px] top-[40px] " + m("cursor")} style={at(0.2, { tx: "-40px", ty: "-30px" })} />
      </div>
      <Box className="w-[240px] p-2">
        <p className={`${t.xs} font-semibold text-[#b8400f]`}>Prompt</p>
        <p className={`${t.sm} mt-0.5 ` + m("type")} style={at(1.6)}>Build a pricing table: 3 tiers, middle one highlighted, mobile-first…</p>
      </Box>
    </Stage>
  ),
  "debug-prompt-template": () => (
    <Stage d={9}>
      <Win title="terminal" dark className="w-[262px]" bodyClass="space-y-1 p-2.5">
        <p className={`${t.code} text-[#ff6b5f] ` + m("shake")} style={at(0.3)}>✕ Error: fetch failed</p>
        <p className={`${t.code} text-white/45 ` + m("in")} style={at(0.8)}>  at POST (app/api/contact/route.ts:14)</p>
        <p className={`${t.code} text-white/80 ` + m("type")} style={at(1.6)}>→ Cause: RESEND_API_KEY is missing</p>
        <p className={`${t.code} flex items-center gap-1 text-[#f0946b] ` + m("in")} style={at(2.8)}>
          <span className={"size-[7px] rounded-full border border-[#f0946b] border-t-transparent " + loop("spin")} /> applying fix…
        </p>
        <p className={`${t.code} text-[#4ade80] ` + m("pop")} style={at(3.8)}>✓ Fixed · the form sends email</p>
      </Win>
    </Stage>
  ),
  "website-speed-checklist": () => (
    <Stage d={8} className="gap-3">
      <Box className="flex w-[112px] flex-col items-center p-2">
        <div className="relative h-[52px] w-[96px] overflow-hidden">
          <div className="absolute inset-0 rounded-t-full border-[9px] border-b-0 border-[#ece8e1]" />
          <div className="absolute inset-0 rounded-t-full border-[9px] border-b-0 border-[#16794a] [clip-path:inset(0_0_0_45%)]" />
          <span className={"absolute bottom-0 left-1/2 -ml-[1.5px] h-[44px] w-[3px] rounded-full bg-[#151515] " + m("needle")} style={at(0.3, { r0: "-80deg", r1: "58deg" })} />
        </div>
        <div className="relative h-[26px] w-full text-center">
          <p className={"absolute inset-x-0 text-[22px] font-bold text-[#c0392b] " + m("swap-a")} style={at(0)}>41</p>
          <p className={"absolute inset-x-0 text-[22px] font-bold text-[#16794a] " + m("swap-b")} style={at(0)}>92</p>
        </div>
        <p className={`${t.xs} text-[#8a857b]`}>Mobile score</p>
      </Box>
      <Box className="w-[128px] space-y-1.5 p-2">
        {[["Loads in", "1.8s"], ["Layout shift", "0.02"], ["Page weight", "850KB"], ["Images", "WebP"]].map(([k, v], i) => (
          <div key={k} className={"flex justify-between " + m("in")} style={at(1.2 + i * 0.3)}><span className={`${t.sm} text-[#6b675f]`}>{k}</span><span className={`${t.sm} font-semibold text-[#16794a]`}>{v}</span></div>
        ))}
      </Box>
    </Stage>
  ),
  "responsive-design-checklist": () => (
    <Stage d={9} className="items-end gap-2.5">
      {([[146, 92, Monitor, "Desktop"], [78, 104, Tablet, "Tablet"], [48, 90, Smartphone, "Phone"]] as const).map(([w, h, Icon, label], i) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <Box className="overflow-hidden">
            <div style={{ width: w, height: h }} className="flex flex-col gap-1 p-1.5">
              <Line c="bg-[#eb5e28]" h="h-[6px]" w="55%" />
              <Line w="90%" />
              <Line w="70%" />
              <div className={`grid flex-1 gap-1 ${i === 0 ? "grid-cols-3" : "grid-cols-1"}`}>
                {[0, 1, 2].slice(0, i === 0 ? 3 : i === 1 ? 2 : 1).map((k) => <span key={k} className="rounded-[3px] bg-[#f1ede6]" />)}
              </div>
            </div>
          </Box>
          <span className={`flex items-center gap-0.5 ${t.xs} font-semibold ` + m("pop")} style={at(0.6 + i * 0.6)}>
            <Tick /> <Icon className="size-[8px]" /> {label}
          </span>
        </div>
      ))}
    </Stage>
  ),
  "domain-name-generator": () => (
    <Stage d={9}>
      <Box className="w-[240px] p-2.5">
        <div className={`flex items-center gap-1.5 rounded-[6px] border border-[#e4e0d8] px-2 py-1 ${t.md}`}>
          <Search className="size-3 text-[#8a857b]" />
          <span className={m("type")} style={at(0.1)}>glow beauty lagos</span>
        </div>
        {[["glowbeauty.ng", true], ["getglow.com", true], ["glow.com", false], ["glowhq.co", true]].map(([d, ok], i) => (
          <div key={d as string} className={"mt-1.5 flex items-center justify-between border-b border-[#efece6] pb-1 " + m("left")} style={at(1.4 + i * 0.35)}>
            <span className={`relative ${t.md} font-semibold ${ok ? "" : "text-[#8a857b]"}`}>
              {d as string}
              {!ok && <span className={"absolute left-0 top-1/2 h-[1.5px] w-full bg-[#c0392b] " + m("grow-x")} style={at(2.4)} />}
            </span>
            <span className={`flex items-center gap-1 ${t.xs} font-semibold ${ok ? "text-[#16794a]" : "text-[#c0392b]"}`}><Tick ok={ok as boolean} />{ok ? "available" : "taken"}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),

  /* ---------------- Web solutions ---------------- */
  "website-requirements-questionnaire": () => (
    <Stage d={9} className="gap-3">
      <Box className="w-[158px] space-y-1.5 p-2.5">
        <p className={t.h}>What does the site need?</p>
        {[["WhatsApp button", true], ["Online booking", true], ["Paystack checkout", true], ["Blog", false]].map(([f, on], i) => (
          <div key={f as string} className="flex items-center gap-1.5">
            <span className={"grid size-[11px] place-items-center rounded-[3px] border border-[#c9c3b8] " + (on ? m("mark") : "")} style={on ? at(0.4 + i * 0.4, { off: "#fff", on: O }) : undefined}>
              {on && <svg viewBox="0 0 12 12" className="size-[8px]"><path d="M2.5 6.2l2.2 2.2 4.8-4.8" fill="none" stroke="#151515" strokeWidth="2" /></svg>}
            </span>
            <span className={t.sm}>{f as string}</span>
          </div>
        ))}
      </Box>
      <Box className={"bg-[#151515] p-2.5 text-center text-white " + m("pop")} style={at(2.2)}>
        <p className={`${t.xs} text-white/60`}>Estimate</p>
        <p className="text-[20px] font-bold">9 days</p>
        <p className={`${t.xs} text-[#f0946b]`}>Medium build</p>
      </Box>
    </Stage>
  ),
  "booking-feature-picker": () => (
    <Stage d={9}>
      <Box className="w-[232px] p-2.5">
        <div className="flex justify-between"><p className={t.h}>October</p><p className={`${t.xs} text-[#8a857b]`}>Glow Studio</p></div>
        <div className="mt-1.5 grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <span key={i} className={`grid h-[15px] place-items-center rounded-[3px] ${t.xs} ${[3, 9, 10].includes(i) ? "bg-[#f1ede6] text-[#b3ada2] line-through" : i === 12 ? m("mark") : "border border-[#efece6]"}`} style={i === 12 ? at(0.6, { off: "#fff", on: O }) : undefined}>{i + 1}</span>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1">
          {["9:00", "11:00", "14:00"].map((s, i) => <span key={s} className={`flex-1 rounded-[4px] border border-[#e4e0d8] py-[2px] text-center ${t.xs} ` + (i === 1 ? m("mark") : "")} style={i === 1 ? at(1.4, { off: "#fff", on: "#151515", "on-ink": "#fff" }) : undefined}>{s}</span>)}
        </div>
        <p className={`${t.sm} mt-1.5 font-semibold ` + m("type")} style={at(2.2)}>Sat 13 Oct · 11:00 · ₦5,000 deposit paid</p>
      </Box>
    </Stage>
  ),
  "whatsapp-catalog-guide": () => (
    <Stage d={9} className="gap-3">
      <Phone className="h-[168px] w-[100px]">
        <p className={`bg-[#075e54] px-1.5 pb-1 pt-2.5 ${t.xs} font-semibold text-white`}>Ada&apos;s Bakery · Catalog</p>
        <div className="grid grid-cols-2 gap-1 p-1">
          {[["Cake", "₦18,000", "#f7cdb0"], ["Meat pie", "₦4,500", "#efe2cf"], ["Small chops", "₦25,000", "#f9dcc9"], ["Puff-puff", "₦2,000", "#e8d9c4"]].map(([n, p, c], i) => (
            <div key={n} className={"rounded-[4px] border border-[#efece6] " + m("pop")} style={at(0.3 + i * 0.3)}>
              <div className="h-[24px] rounded-t-[4px]" style={{ background: c }} />
              <p className="px-0.5 text-[6px]">{n}</p>
              <p className="px-0.5 text-[6.5px] font-bold">{p}</p>
            </div>
          ))}
        </div>
      </Phone>
      <div className="space-y-1.5">
        {["Open Catalog", "Add 4 items", "Share the link"].map((x, i) => (
          <Box key={x} className={"flex items-center gap-1.5 px-2 py-1 " + m("left")} style={at(1.8 + i * 0.4)}>
            <Tick /> <span className={`${t.sm} font-semibold`}>{x}</span>
          </Box>
        ))}
      </div>
    </Stage>
  ),
  "landing-page-copy-generator": () => (
    <Stage d={9}>
      <Box className="w-[252px] space-y-1 p-2.5">
        {[["HERO", "Lose 8kg eating the food you love."], ["PROBLEM", "Diets that ignore Nigerian food"], ["BENEFITS", "Meal plans · 20-minute workouts"], ["OFFER", "₦120,000 · Start my plan"], ["GUARANTEE", "Full refund within 14 days"]].map(([k, v], i) => (
          <div key={k} className="flex gap-2 border-b border-[#efece6] pb-1">
            <span className={`w-[52px] shrink-0 ${t.xs} font-bold ${i === 0 ? "text-[#b8400f]" : "text-[#8a857b]"}`}>{k}</span>
            <span className={`${t.sm} truncate ` + m("type")} style={at(0.3 + i * 0.5)}>{v}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "pricing-layout-picker": () => (
    <Stage d={8}>
      <div className="relative flex items-end gap-2">
        {[["Starter", "₦80k", false], ["Growth", "₦150k", true], ["Pro", "₦300k", false]].map(([n, p, hi], i) => (
          <div key={n as string} className={m("in")} style={at(0.2 + i * 0.25)}>
            <Box className={`w-[80px] p-2 ${hi ? "-translate-y-2.5 border-[#eb5e28] bg-[#fdeee6]" : ""}`}>
              {hi && <p className={`mb-1 rounded-full bg-[#151515] text-center text-[6px] font-bold text-white ` + m("pop")} style={at(1.2)}>MOST POPULAR</p>}
              <p className={`${t.sm} font-semibold`}>{n as string}</p>
              <p className="text-[16px] font-bold">{p as string}</p>
              <div className="mt-1 space-y-1">{[0, 1, 2].map((k) => <Line key={k} w="80%" />)}</div>
              <span className={`mt-1.5 block rounded-[4px] py-[2px] text-center text-[6.5px] font-semibold ${hi ? "bg-[#eb5e28] " + m("press") : "border border-[#e4e0d8]"}`} style={hi ? at(2.1) : undefined}>Choose</span>
            </Box>
          </div>
        ))}
        <Cursor className={"left-[150px] top-[110px] " + m("cursor")} style={at(0.9, { tx: "-20px", ty: "-18px" })} />
      </div>
    </Stage>
  ),
  "faq-generator": () => (
    <Stage d={9} className="flex-col gap-1.5">
      {[["How much does a repair cost?", "From ₦25,000. We confirm the price before we start."], ["How long does it take?", ""], ["Do you give a warranty?", ""]].map(([q, a], i) => (
        <Box key={q} className={"w-[252px] px-2.5 py-1.5 " + m("in")} style={at(0.2 + i * 0.3)}>
          <div className="flex justify-between"><span className={`${t.md} font-semibold`}>{q}</span><span className={`${t.md} font-bold text-[#b8400f]`}>{a ? "−" : "+"}</span></div>
          {a && <p className={`${t.sm} mt-1 text-[#6b675f] ` + m("type")} style={at(1.2)}>{a}</p>}
        </Box>
      ))}
      <span className={`self-end rounded-full bg-[#16794a] px-2 py-[2px] ${t.xs} font-semibold text-white ` + m("pop")} style={at(2.6)}>FAQ schema added ✓</span>
    </Stage>
  ),
  "testimonial-formatter": () => (
    <Stage d={9} className="gap-2">
      <p className={`w-[104px] rounded-[10px] rounded-tl-[2px] bg-[#d9fdd3] p-2 ${t.sm} shadow-sm ` + m("in")} style={at(0.2)}>omg thx sooo much!!! the website is sweet 😍 3 bookings first week</p>
      <ArrowRight className={"size-4 shrink-0 " + m("in")} style={at(1)} strokeWidth={2.5} />
      <Box className={"w-[134px] p-2.5 " + m("pop")} style={at(1.4)}>
        <Stars />
        <p className={"mt-1 text-[11px] font-bold leading-tight " + m("type")} style={at(1.8)}>“We got 3 bookings in the first week.”</p>
        <p className={`${t.xs} mt-1 text-[#8a857b]`}>Chioma O., Lash Studio</p>
      </Box>
    </Stage>
  ),

  /* ---------------- SEO ---------------- */
  "keyword-research-prompts": () => (
    <Stage d={8}>
      <Box className="w-[252px] p-2.5">
        {[["web design lagos", "Buy", 90], ["website cost nigeria", "Compare", 70], ["how to choose a web designer", "Learn", 45], ["web designer near me", "Buy", 80]].map(([k, intent, w], i) => (
          <div key={k as string} className="mb-1.5">
            <div className="flex justify-between">
              <span className={t.sm}>{k}</span>
              <span className={`rounded-full px-1.5 ${t.xs} font-semibold ${intent === "Buy" ? "bg-[#e6f4ec] text-[#16794a]" : intent === "Compare" ? "bg-[#fdeee6] text-[#b8400f]" : "bg-[#f1ede6] text-[#6b675f]"} ` + m("pop")} style={at(1.4 + i * 0.25)}>{intent as string}</span>
            </div>
            <div className="mt-0.5 h-[5px] rounded-full bg-[#f1ede6]">
              <span className={"block h-full rounded-full bg-[#eb5e28] " + m("grow-x")} style={{ ...at(0.2 + i * 0.25), width: `${w}%` }} />
            </div>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "meta-tag-generator": () => (
    <Stage d={8}>
      <Box className="w-[268px] p-3">
        <p className="text-[8.5px] text-[#4d5156]">glowbeauty.ng › lash-extensions</p>
        <p className={"text-[13px] leading-tight text-[#1a0dab] " + m("type")} style={at(0.2)}>Lash Extensions in Lekki | Glow Beauty</p>
        <p className={"mt-0.5 text-[9px] leading-snug text-[#4d5156] " + m("in")} style={at(1.3)}>Natural-looking lashes that last 4 weeks. Book online today and pay easily.</p>
        <div className="mt-2 flex gap-1.5">
          <span className={`flex items-center gap-1 ${chip} ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(2.1)}><Tick /> Title 41/60</span>
          <span className={`flex items-center gap-1 ${chip} ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(2.4)}><Tick /> Description 142/155</span>
        </div>
      </Box>
    </Stage>
  ),
  "local-seo-checklist": () => (
    <Stage d={9} className="gap-2.5">
      <Box className="relative h-[140px] w-[140px] overflow-hidden bg-[#eef0ec]">
        <svg viewBox="0 0 140 140" className="absolute inset-0"><path d="M0 60h140M0 100h140M60 0v140M104 0v140" stroke="#fff" strokeWidth="8" /><path d="M0 30C50 26 80 50 140 44" stroke="#dcd6c8" strokeWidth="4" fill="none" /></svg>
        <span className={"absolute left-[58px] top-[44px] size-[16px] rounded-full bg-[#eb5e28]/40 " + loop("pulse")} />
        <MapPin className={"absolute left-[57px] top-[26px] size-[18px] fill-[#eb5e28] text-white " + m("pop")} style={at(0.3)} />
        <MapPin className={"absolute left-[22px] top-[70px] size-[12px] fill-white text-[#8a857b] " + m("pop")} style={at(0.7)} />
        <MapPin className={"absolute left-[100px] top-[84px] size-[12px] fill-white text-[#8a857b] " + m("pop")} style={at(0.9)} />
      </Box>
      <Box className="w-[118px] p-2">
        <p className={`${t.md} font-bold`}>Glow Beauty</p>
        <p className={`flex items-center gap-1 ${t.xs} text-[#6b675f]`}><Stars /> 4.9 (212)</p>
        {["Profile verified", "Category set", "20+ reviews", "Same address everywhere"].map((x, i) => (
          <div key={x} className={"mt-1 flex items-center gap-1 " + m("left")} style={at(1.2 + i * 0.35)}><Tick /><span className={t.xs}>{x}</span></div>
        ))}
      </Box>
    </Stage>
  ),
  "on-page-seo-audit": () => (
    <Stage d={9} className="gap-3">
      <Box className="grid size-[100px] place-items-center">
        <div className="relative grid size-[78px] place-items-center">
          <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
            <circle cx="40" cy="40" r="33" stroke="#f1ede6" strokeWidth="8" fill="none" />
            <circle cx="40" cy="40" r="33" stroke="#eb5e28" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="207" className={m("draw")} style={at(0.2, { len: 207 })} />
          </svg>
          <span className="text-[22px] font-bold">81</span>
        </div>
      </Box>
      <Box className="w-[140px] space-y-1 p-2">
        {[["Title, 52 characters", true], ["Meta description", true], ["One H1", false], ["Image alt text", false], ["Canonical link", true], ["Schema", true]].map(([x, ok], i) => (
          <div key={x as string} className={"flex items-center gap-1.5 " + m("in")} style={at(0.6 + i * 0.3)}><Tick ok={ok as boolean} /><span className={t.xs}>{x as string}</span></div>
        ))}
      </Box>
    </Stage>
  ),
  "blog-topic-generator": () => (
    <Stage d={8} className="flex-col gap-1.5">
      {[["COST", "How much does solar cost in Abuja?"], ["MISTAKES", "7 solar mistakes that cost you money"], ["COMPARE", "Inverter vs generator: the real numbers"], ["LOCAL", "Best areas in Abuja for solar"]].map(([k, x], i) => (
        <Box key={x} className={"flex w-[262px] items-center gap-2 px-2 py-1.5 " + m("left")} style={at(0.2 + i * 0.4)}>
          <FileText className="size-3.5 shrink-0 text-[#b8400f]" />
          <span className={`${t.sm} flex-1 truncate`}>{x}</span>
          <span className={`rounded-full bg-[#f1ede6] px-1.5 ${t.xs} font-semibold text-[#6b675f]`}>{k}</span>
        </Box>
      ))}
    </Stage>
  ),
  "backlink-outreach-scripts": () => (
    <Stage d={9}>
      <Win title="New message" className="w-[262px]" bodyClass="p-2.5">
        <p className={`${t.xs} text-[#8a857b] ` + m("type")} style={at(0.2)}>To: editor@techblog.ng</p>
        <p className={`${t.sm} font-semibold ` + m("type")} style={at(0.9)}>Subject: Story idea: first 100 customers online</p>
        <div className="mt-1.5 space-y-1">
          {["92%", "84%", "60%"].map((w, i) => (
            <div key={w} className={m("grow-x")} style={at(1.6 + i * 0.2)}>
              <Line w={w} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-[4px] bg-[#151515] px-2 py-[2px] ${t.xs} font-semibold text-white ` + m("press")} style={at(2.6)}>Send</span>
          <span className={`flex items-center gap-1 ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(3.2)}><Link2 className="size-3" /> Link earned · authority up</span>
        </div>
      </Win>
    </Stage>
  ),
  "seo-content-brief": () => (
    <Stage d={9}>
      <Box className="w-[242px] p-2.5">
        <div className="flex items-center justify-between">
          <p className={`${t.xs} font-semibold tracking-[0.1em] text-[#8a857b]`}>CONTENT BRIEF</p>
          <span className={`${t.xs} font-semibold`}>1,400 words</span>
        </div>
        <div className="mt-1 h-[4px] rounded-full bg-[#f1ede6]"><span className={"block h-full rounded-full bg-[#16794a] " + m("grow-x")} style={at(0.2)} /></div>
        {[["H1", "Cost of solar installation in Abuja", 0], ["H2", "What affects the price", 1], ["H2", "Typical prices (table)", 1], ["H2", "How to save money", 1], ["H2", "FAQ and schema", 1]].map(([h, l, ind], i) => (
          <p key={l as string} className={`${t.sm} mt-1 ` + m("left")} style={{ ...at(0.6 + i * 0.35), marginLeft: (ind as number) * 12 }}>
            <span className="font-bold text-[#b8400f]">{h as string}</span> {l as string}
          </p>
        ))}
      </Box>
    </Stage>
  ),
  "gbp-post-generator": () => (
    <Stage d={8}>
      <Box className="w-[204px] overflow-hidden">
        <div className="relative grid h-[66px] place-items-center bg-[linear-gradient(135deg,#eb5e28,#c2410c)]">
          <span className={"text-[22px] font-bold text-white " + m("pop")} style={at(0.3)}>20% OFF</span>
        </div>
        <div className="p-2">
          <p className={`${t.md} font-semibold ` + m("type")} style={at(0.9)}>Party trays this weekend</p>
          <p className={`${t.xs} text-[#6b675f] ` + m("in")} style={at(1.6)}>Jollof, fried rice and small chops · Ikeja</p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className={`rounded-full border border-[#151515] px-2 py-[1px] ${t.xs} font-semibold ` + m("glow")} style={at(2.4)}>Order online</span>
            <span className={`${t.xs} text-[#16794a] ` + m("in")} style={at(3)}>+46 views</span>
          </div>
        </div>
      </Box>
    </Stage>
  ),

  /* ---------------- Automation ---------------- */
  "automation-idea-generator": () => (
    <Stage d={9} className="flex-col gap-1.5">
      {[["New Paystack payment", "WhatsApp receipt + sheet", "3h"], ["Order delivered", "Ask for a Google review", "2h"], ["Stock below 5", "Alert the owner", "1h"]].map(([a, b, h], i) => (
        <Box key={a} className={"flex w-[272px] items-center gap-1.5 px-2 py-1.5 " + m("left")} style={at(0.2 + i * 0.45)}>
          <Zap className="size-3.5 shrink-0 fill-[#eb5e28] text-[#eb5e28]" />
          <span className={t.xs}>{a}</span>
          <ArrowRight className="size-3 shrink-0 text-[#8a857b]" />
          <span className={`${t.xs} flex-1 font-semibold`}>{b}</span>
          <span className={`rounded-full bg-[#e6f4ec] px-1.5 ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(0.8 + i * 0.45)}>{h}/wk</span>
        </Box>
      ))}
      <p className={`${t.sm} self-end font-bold ` + m("pop")} style={at(2.6)}>6 hours saved every week</p>
    </Stage>
  ),
  "zapier-make-scenario-planner": () => (
    <Stage d={8}>
      <div className="relative flex w-[270px] items-center justify-between">
        <span className="absolute left-6 right-6 top-[24px] h-[2px] bg-[#dcd6c8]" />
        <span className={"absolute left-6 top-[21px] size-[8px] rounded-full bg-[#eb5e28] shadow-[0_0_0_3px_rgba(235,94,40,0.25)] " + m("scroll-x")} style={at(0.2, { sx: "214px" })} />
        {[["Sheets", "#0f9d58"], ["Filter", "#e0a82e"], ["WhatsApp", "#25d366"], ["Slack", "#4a154b"]].map(([n, c], i) => (
          <div key={n} className="relative flex flex-col items-center gap-1">
            <span className={"grid size-[48px] place-items-center rounded-full border-2 border-white text-[9px] font-bold text-white shadow-md " + m("glow")} style={{ ...at(0.4 + i * 0.9), background: c }}>{n.slice(0, 2)}</span>
            <span className={`${t.xs} font-semibold`}>{n}</span>
          </div>
        ))}
      </div>
    </Stage>
  ),
  "business-process-audit": () => (
    <Stage d={9}>
      <Box className="w-[262px] p-2.5">
        <p className={`${t.xs} mb-1.5 font-semibold text-[#8a857b]`}>Hours per week</p>
        {[["Replying “how much?”", 8, "Automate"], ["Typing orders", 5, "Automate"], ["Payment reminders", 3, "Automate"], ["Instagram posts", 4, "AI assist"], ["Hiring", 2, "Keep manual"]].map(([x, h, v], i) => (
          <div key={x as string} className="mb-1 flex items-center gap-1.5">
            <span className={`${t.xs} w-[92px] truncate`}>{x as string}</span>
            <span className={"h-[7px] rounded-full bg-[#eb5e28] " + m("grow-x")} style={{ ...at(0.2 + i * 0.2), width: (h as number) * 9 }} />
            <span className={`ml-auto ${t.xs} font-semibold ${v === "Automate" ? "text-[#16794a]" : "text-[#8a857b]"} ` + m("in")} style={at(1.4 + i * 0.25)}>{v as string}</span>
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "email-autoresponder-generator": () => (
    <Stage d={9} className="gap-2">
      <Win title="Inbox" className="w-[170px]" bodyClass="p-2">
        <div className={"mb-1 flex items-center gap-1 border-b border-[#efece6] pb-1 " + m("left")} style={at(0.3)}><Mail className="size-3 text-[#b8400f]" /><span className={`${t.xs} flex-1 truncate font-semibold`}>New enquiry: Kemi</span><span className={`${t.xs} text-[#8a857b]`}>9:41</span></div>
        <div className={"flex items-center gap-1 " + m("left")} style={at(1.3)}><Mail className="size-3 text-[#16794a]" /><span className={`${t.xs} flex-1 truncate`}>Re: Thanks for contacting us</span><span className={`${t.xs} font-semibold text-[#16794a]`}>+2s</span></div>
      </Win>
      <div className="space-y-1">
        {["Now", "Day 2", "Day 5"].map((d, i) => (
          <span key={d} className={`block rounded-full border border-[#e4e0d8] px-2 py-[2px] text-center ${t.xs} font-semibold ` + m("mark")} style={at(1.6 + i * 0.6, { off: "#fff", on: O })}>{d}</span>
        ))}
      </div>
    </Stage>
  ),
  "automation-roi-calculator": () => (
    <Stage d={8} className="gap-3">
      <div className="space-y-2">
        <Box className={"px-2.5 py-1.5 " + m("pop")} style={at(1.4)}><p className={`${t.xs} text-[#8a857b]`}>Pays for itself in</p><p className="text-[17px] font-bold">2.5 months</p></Box>
        <Box className={"bg-[#151515] px-2.5 py-1.5 text-white " + m("pop")} style={at(1.8)}><p className={`${t.xs} text-white/60`}>Saved per year</p><p className="text-[17px] font-bold">₦2,100,000</p></Box>
      </div>
      <Box className="flex h-[118px] items-end gap-1.5 px-2.5 pb-2 pt-3">
        {[22, 36, 52, 72, 96].map((h, i) => <span key={i} className={`w-[16px] rounded-t-[3px] ${i === 4 ? "bg-[#eb5e28]" : "bg-[#dcd6c8]"} ` + m("grow-y")} style={{ ...at(0.2 + i * 0.2), height: h }} />)}
      </Box>
    </Stage>
  ),
  "token-cost-calculator": () => (
    <Stage d={8}>
      <Box className="w-[252px] p-2.5">
        <p className={`${t.xs} mb-1.5 text-[#8a857b]`}>6,000 chatbot replies a month</p>
        {[["Haiku 4.5", "₦27,900"], ["Sonnet 5.5", "₦55,800"], ["Opus 5.5", "₦111,600"]].map(([x, p], i) => (
          <div key={x} className={`mb-1 flex justify-between rounded-[5px] px-1.5 py-1 ` + (i === 1 ? m("mark") : m("in") + " border-b border-[#efece6]")} style={i === 1 ? at(1.6, { off: "#fff", on: "#fdeee6" }) : at(0.3 + i * 0.3)}>
            <span className={`${t.sm} font-semibold`}>{x}</span>
            <span className={t.sm}>{p}/mo</span>
          </div>
        ))}
        <p className={`${t.xs} mt-1 text-[#16794a] ` + m("in")} style={at(2.2)}>Best value for this job: Sonnet 5.5</p>
      </Box>
    </Stage>
  ),
  "mcp-server-picker": () => (
    <Stage d={9}>
      <div className="relative h-[160px] w-[262px]">
        <svg className="absolute inset-0" viewBox="0 0 262 160" aria-hidden>
          {["M60 26 L131 80", "M202 26 L131 80", "M60 134 L131 80", "M202 134 L131 80"].map((d, i) => (
            <path key={d} d={d} stroke="#c9c3b8" strokeWidth="2" strokeDasharray="100" fill="none" className={m("draw")} style={at(0.2 + i * 0.3, { len: 100 })} />
          ))}
        </svg>
        <span className="absolute left-1/2 top-1/2 grid size-[54px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[14px] bg-[#eb5e28] shadow-md"><Bot className="size-7 text-[#151515]" /></span>
        {([["GitHub", GitBranch, "left-0 top-2"], ["Drive", HardDrive, "right-0 top-2"], ["Supabase", Database, "left-0 bottom-2"], ["Paystack", Zap, "right-0 bottom-2"]] as const).map(([n, Icon, pos], i) => (
          <Box key={n} className={`absolute flex items-center gap-1 px-2 py-1 ${pos} ` + m("pop")} style={at(0.5 + i * 0.3)}>
            <Icon className="size-3.5" /><span className={`${t.sm} font-semibold`}>{n}</span>
          </Box>
        ))}
      </div>
    </Stage>
  ),

  /* ---------------- Lead generation ---------------- */
  "cold-dm-script-generator": () => (
    <Stage d={9}>
      <Phone className="h-[176px] w-[150px]">
        <p className={`border-b border-[#efece6] px-2 pb-1 pt-3 ${t.xs} font-semibold`}>@oakandironbarbers</p>
        <div className="space-y-1 p-1.5">
          <p className={`w-[88%] rounded-[8px] bg-[#f1ede6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(0.2)}>Hi James, your booking link doesn&apos;t open on mobile.</p>
          <p className={`w-[80%] rounded-[8px] bg-[#f1ede6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(1)}>Want a free 2-minute video showing the fix?</p>
          <span className={"flex w-fit gap-[2px] rounded-[8px] bg-[#3797f0]/15 px-1.5 py-1 " + m("in")} style={at(1.8)}>
            {[0, 1, 2].map((i) => <span key={i} className="size-[3px] rounded-full bg-[#3797f0]" />)}
          </span>
          <p className={`ml-auto w-[62%] rounded-[8px] bg-[#3797f0] px-1.5 py-1 ${t.xs} text-white ` + m("pop")} style={at(2.6)}>Yes please! 🙏</p>
        </div>
      </Phone>
    </Stage>
  ),
  "lead-magnet-ideas": () => (
    <Stage d={8} className="gap-3">
      <Box className="w-[142px] p-2.5">
        <Gift className="size-5 text-[#b8400f]" />
        <p className="mt-1 text-[13px] font-bold leading-tight">Free 5-point website check</p>
        <div className={`mt-2 rounded-[4px] border border-[#e4e0d8] px-1.5 py-[3px] ${t.xs}`}>
          <span className={"inline-block " + m("type")} style={at(0.3)}>ada@glowbeauty.ng</span>
        </div>
        <p className={`mt-1 rounded-[4px] bg-[#eb5e28] py-[3px] text-center ${t.xs} font-semibold ` + m("press")} style={at(1.8)}>Get my check</p>
      </Box>
      <Box className="w-[86px] bg-[#151515] p-2 text-center text-white">
        <div className="relative h-[26px]">
          <p className={"absolute inset-x-0 text-[22px] font-bold " + m("swap-a")} style={at(0)}>123</p>
          <p className={"absolute inset-x-0 text-[22px] font-bold text-[#f0946b] " + m("swap-b")} style={at(0)}>124</p>
        </div>
        <p className={`${t.xs} text-white/60`}>leads this month</p>
      </Box>
    </Stage>
  ),
  "prospect-list-builder": () => (
    <Stage d={9}>
      <Box className="w-[272px] overflow-hidden">
        <div className={`flex items-center gap-1.5 border-b border-[#efece6] px-2 py-1.5 ${t.sm}`}>
          <Search className="size-3 text-[#8a857b]" /><span className={m("type")} style={at(0.1)}>dental clinic in Lagos</span>
        </div>
        <div className={`grid grid-cols-[1.2fr_0.8fr_0.9fr_0.4fr] bg-[#f7f5f1] px-2 py-[2px] ${t.xs} font-semibold text-[#8a857b]`}><span>Business</span><span>Area</span><span>Website</span><span>Fit</span></div>
        {[["SmileCare", "Lekki", "none", "5"], ["DentPro", "Ikeja", "outdated", "4"], ["BrightTeeth", "Yaba", "none", "5"], ["OralPlus", "VI", "good", "2"]].map((r, i) => (
          <div key={r[0]} className={"grid grid-cols-[1.2fr_0.8fr_0.9fr_0.4fr] border-t border-[#efece6] px-2 py-[3px] " + m("left")} style={at(1.3 + i * 0.3)}>
            {r.map((c, j) => <span key={j} className={`${t.xs} ${j === 3 ? `font-bold ${Number(c) >= 4 ? "text-[#16794a]" : "text-[#8a857b]"}` : ""}`}>{c}</span>)}
          </div>
        ))}
      </Box>
    </Stage>
  ),
  "follow-up-sequence-generator": () => (
    <Stage d={9} className="flex-col gap-2.5">
      <div className="flex w-[262px] items-center">
        {["Day 3", "Day 7", "Day 14", "Day 21"].map((d, i, arr) => (
          <div key={d} className="flex flex-1 items-center last:flex-none">
            <span className={`grid size-[40px] shrink-0 place-items-center rounded-full border-2 border-[#151515] ${t.xs} font-bold ` + m("mark")} style={at(0.3 + i * 0.5, { off: "#fff", on: i === 1 ? O : "#f1ede6" })}>{d}</span>
            {i < arr.length - 1 && <span className="h-[2px] flex-1 bg-[#dcd6c8]" />}
          </div>
        ))}
      </div>
      <p className={`ml-10 self-start rounded-[10px] rounded-tl-[2px] bg-[#d9fdd3] px-2 py-1 ${t.sm} shadow-sm ` + m("pop")} style={at(1.4)}>“Yes, send the video!” · replied on day 7</p>
    </Stage>
  ),
  "web-scraper-config": () => (
    <Stage d={9} className="gap-2">
      <Win title="directory.ng" className="relative w-[142px]" bodyClass="relative p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-1 rounded-[4px] border border-dashed border-[#eb5e28] p-1"><Line w="70%" c="bg-[#dcd6c8]" /><div className="mt-0.5"><Line w="45%" /></div></div>
        ))}
        <span className={"absolute inset-x-1 top-1 h-[2px] bg-[#eb5e28] shadow-[0_0_8px_rgba(235,94,40,0.8)] " + m("scan")} style={at(0.2, { sy: "70px" })} />
      </Win>
      <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} />
      <Box className="w-[102px] overflow-hidden">
        <p className={`bg-[#f7f5f1] px-1.5 py-[2px] ${t.xs} font-semibold`}>leads.csv</p>
        {["name,phone", "Kora,0803…", "Ada,0812…", "Chi,0906…"].map((r, i) => <p key={r} className={`border-t border-[#efece6] px-1.5 py-[1px] font-code text-[7px] ` + m("left")} style={at(1.4 + i * 0.35)}>{r}</p>)}
      </Box>
    </Stage>
  ),
  "lead-qualification": () => (
    <Stage d={8} className="gap-3">
      <Box className="w-[142px] p-2.5">
        {[["Budget", 3], ["Authority", 3], ["Need", 3], ["Timing", 1], ["Fit", 3]].map(([k, p], r) => (
          <div key={k as string} className="mb-1 flex items-center gap-1.5">
            <span className={`${t.xs} w-[50px]`}>{k as string}</span>
            {[0, 1, 2].map((i) => <span key={i} className={"size-[11px] rounded-[3px] border border-[#dcd6c8] " + (i < (p as number) ? m("mark") : "bg-[#f7f5f1]")} style={i < (p as number) ? at(0.2 + r * 0.3 + i * 0.1, { off: "#f7f5f1", on: O }) : undefined} />)}
          </div>
        ))}
      </Box>
      <Box className={"bg-[#16794a] p-2.5 text-center text-white " + m("pop")} style={at(2.2)}>
        <p className="text-[26px] font-bold leading-none">13</p>
        <p className={`${t.xs} mt-1 text-white/80`}>out of 15 · GO</p>
      </Box>
    </Stage>
  ),
  "landing-page-checklist": () => (
    <Stage d={8} className="gap-2.5">
      <Win title="offer.ng" className="w-[160px]" bodyClass="p-2">
        {["Clear headline", "One button", "Real proof", "Fast on mobile"].map((x, i) => (
          <div key={x} className={"mb-1 flex items-center gap-1.5 " + m("in")} style={at(0.3 + i * 0.35)}><Tick /><span className={t.xs}>{x}</span></div>
        ))}
        <p className={`mt-1 rounded-[4px] bg-[#151515] py-[2px] text-center ${t.xs} font-semibold text-white`}>Book a call</p>
      </Win>
      <Box className="w-[70px] p-2 text-center">
        <div className="relative h-[28px]">
          <p className={"absolute inset-x-0 text-[22px] font-bold text-[#c0392b] " + m("swap-a")} style={at(0)}>58</p>
          <p className={"absolute inset-x-0 text-[22px] font-bold text-[#16794a] " + m("swap-b")} style={at(0)}>91</p>
        </div>
        <p className={`${t.xs} text-[#8a857b]`}>out of 100</p>
      </Box>
    </Stage>
  ),

  /* ---------------- AI agents ---------------- */
  "chatbot-persona-builder": () => (
    <Stage d={9}>
      <Box className="flex w-[252px] gap-2.5 p-2.5">
        <span className={"grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-[#151515] " + m("pop")} style={at(0.2)}><Bot className="size-7 text-[#f0946b]" /></span>
        <div className="min-w-0">
          <p className={t.h + " " + m("type")} style={at(0.6)}>Ada · Glow Beauty assistant</p>
          <div className="mt-1 flex gap-1">{["Warm", "Short answers"].map((x, i) => <span key={x} className={`${chip} ${t.xs} ` + m("pop")} style={at(1.4 + i * 0.25)}>{x}</span>)}</div>
          <p className={`${t.xs} mt-1.5 text-[#16794a] ` + m("in")} style={at(2.2)}>✓ books, quotes, takes deposits</p>
          <p className={`${t.xs} text-[#c0392b] ` + m("in")} style={at(2.6)}>✕ no medical advice, no made-up discounts</p>
        </div>
      </Box>
    </Stage>
  ),
  "customer-service-scripts": () => (
    <Stage d={9}>
      <Box className="w-[226px] overflow-hidden">
        <p className={`flex items-center gap-1 bg-[#151515] px-2 py-1 ${t.sm} font-semibold text-white`}><Bot className="size-3.5 text-[#f0946b]" /> QuickShip support</p>
        <div className="space-y-1 p-2">
          <p className={`w-[70%] rounded-[8px] bg-[#f1ede6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(0.2)}>Where is my order?</p>
          <p className={`ml-auto w-[84%] rounded-[8px] bg-[#fdeee6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(1)}>QS-48213 is out for delivery. It should arrive by 2:30pm.</p>
          <p className={`w-[62%] rounded-[8px] bg-[#f1ede6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(2)}>I want a refund</p>
          <p className={`ml-auto w-[84%] rounded-[8px] bg-[#fdeee6] px-1.5 py-1 ${t.xs} ` + m("in")} style={at(2.8)}>I&apos;m connecting you to Tolu now.</p>
        </div>
      </Box>
    </Stage>
  ),
  "whatsapp-bot-flow-builder": () => (
    <Stage d={9} className="flex-col gap-1">
      <span className={`rounded-[10px] bg-[#075e54] px-3 py-1 ${t.md} font-semibold text-white ` + m("pop")} style={at(0.2)}>Hi 👋 Pick an option</span>
      <ArrowDown className={"size-4 " + m("in")} style={at(0.6)} strokeWidth={2.5} />
      <div className="flex gap-1.5">
        {["1 · Menu", "2 · Order", "3 · Track", "4 · Talk to us"].map((o, i) => (
          <span key={o} className={`rounded-[6px] border border-[#e4e0d8] px-1.5 py-1 ${t.xs} font-semibold ` + (i === 1 ? m("mark") : "bg-white " + m("in"))} style={i === 1 ? at(1.6, { off: "#fff", on: O }) : at(0.9 + i * 0.15)}>{o}</span>
        ))}
      </div>
      <p className={`${t.sm} mt-1 ` + m("type")} style={at(2.2)}>Order → items → address → Paystack link</p>
    </Stage>
  ),
  "agent-task-decomposer": () => (
    <Stage d={9} className="flex-col gap-1">
      {["Search 20 restaurants", "Keep the ones with no website", "Save them to a Google Sheet", "Draft outreach emails"].map((s, i) => (
        <Box key={s} className={"flex w-[224px] items-center gap-1.5 px-2 py-1 " + m("left")} style={at(0.2 + i * 0.4)}>
          <Tick /><span className={`${t.sm} font-semibold`}>{i + 1}. {s}</span>
        </Box>
      ))}
      <Box className={"flex w-[224px] items-center gap-1.5 bg-[#fdeee6] px-2 py-1 " + m("left")} style={at(1.8)}>
        <span className={"size-[8px] rounded-full bg-[#eb5e28] " + loop("pulse")} /><span className={`${t.sm} font-semibold`}>5. Waiting for your approval</span>
      </Box>
    </Stage>
  ),
  "faq-to-knowledge-base": () => (
    <Stage d={9} className="gap-2">
      <p className={`w-[98px] rounded-[6px] bg-[#fff8d8] p-1.5 ${t.xs} text-[#6b675f] shadow-sm ` + m("in")} style={at(0.2)}>opening hrs? mon-sat 9-7. lash price?? 25k classic 35k volume…</p>
      <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} />
      <Win title="knowledge-base.json" dark className="w-[142px]" bodyClass="p-2">
        <p className={`${t.code} text-[#f0946b] ` + m("type")} style={at(0.9)}>{`{ "q": "Hours?",`}</p>
        <p className={`${t.code} text-white/80 ` + m("type")} style={at(1.6)}>{`  "a": "Mon–Sat 9–7" }`}</p>
        <p className={`${t.code} mt-1 text-[#4ade80] ` + m("pop")} style={at(2.6)}>✓ 12 Q&amp;A pairs</p>
      </Win>
    </Stage>
  ),
  "agent-monitoring-checklist": () => (
    <Stage d={9}>
      <Box className="relative w-[262px] p-2.5">
        <div className="flex justify-between">
          <span className={`${t.md} font-semibold`}>WhatsApp agent</span>
          <span className={`flex items-center gap-1 ${t.sm} font-semibold text-[#16794a]`}><span className="relative size-[6px]"><span className={"absolute inset-0 rounded-full bg-[#16794a] " + loop("pulse")} /><span className="absolute inset-0 rounded-full bg-[#16794a]" /></span> 99.9% up</span>
        </div>
        <svg viewBox="0 0 240 40" className="mt-1.5 h-10 w-full" aria-hidden>
          <polyline points="0,24 50,24 60,6 70,34 80,24 150,24 160,10 170,30 180,24 240,24" fill="none" stroke="#16794a" strokeWidth="2.5" strokeLinejoin="round" className={m("draw")} style={at(0.2, { len: 320 })} strokeDasharray="320" />
        </svg>
        <p className={`${t.xs} mt-1 flex items-center gap-1 ` + m("in")} style={at(2.4)}><Bell className="size-3 text-[#b8400f]" /> If it goes down, you get a WhatsApp alert</p>
      </Box>
    </Stage>
  ),
  "handoff-script-generator": () => (
    <Stage d={8} className="gap-3">
      <span className="grid size-[56px] place-items-center rounded-[14px] bg-[#151515]"><Bot className="size-7 text-[#f0946b]" /></span>
      <div className="flex flex-col items-center">
        <p className={`rounded-[10px] bg-white px-2 py-1 ${t.sm} shadow-sm ` + m("type")} style={at(0.3)}>“Connecting you to Tolu…”</p>
        <div className="relative mt-1.5 h-[2px] w-[70px] bg-[#dcd6c8]">
          <span className={"absolute -top-[3px] left-0 size-[8px] rounded-full bg-[#eb5e28] " + m("scroll-x")} style={at(1.2, { sx: "62px" })} />
        </div>
      </div>
      <span className={"grid size-[56px] place-items-center rounded-full bg-[#eb5e28] " + m("pop")} style={at(2.2)}><User className="size-7 text-[#151515]" /></span>
    </Stage>
  ),

  /* ---------------- Bonus: get paid ---------------- */
  "proposal-generator": () => (
    <Stage d={9}>
      <Box className="relative w-[214px] p-3">
        <p className={`${t.xs} font-semibold tracking-[0.1em] text-[#8a857b]`}>PROPOSAL · BRIGHTSIDE DENTAL</p>
        {["1. The problem", "2. What you'll get", "3. Timeline: 2 weeks", "4. Investment"].map((l, i) => <p key={l} className={`${t.md} mt-1 ` + m("left")} style={at(0.3 + i * 0.35)}>{l}</p>)}
        <p className={"mt-1.5 text-[19px] font-bold " + m("pop")} style={at(1.9)}>₦650,000 <span className={`${t.xs} font-normal text-[#8a857b]`}>· 50% upfront</span></p>
        <span className={`absolute right-3 top-8 rounded-[4px] border-2 border-[#16794a] px-1.5 ${t.sm} font-bold text-[#16794a] ` + m("stamp")} style={at(2.8)}>ACCEPTED</span>
      </Box>
    </Stage>
  ),
  "client-pricing-calculator": () => (
    <Stage d={8} className="gap-3">
      <Box className={"p-2.5 " + m("in")} style={at(0.2)}><p className={`${t.xs} text-[#8a857b]`}>Monthly goal</p><p className="text-[16px] font-bold">₦1.5m</p></Box>
      <ArrowRight className="size-4" strokeWidth={2.5} />
      <Box className="w-[112px] bg-[#fdeee6] p-2.5 text-center">
        <p className={`${t.xs} text-[#6b675f]`}>Your minimum rate</p>
        <p className={"text-[22px] font-bold " + m("pop")} style={at(1)}>₦28,000<span className="text-[10px] font-normal">/hr</span></p>
        <p className={`${t.xs} font-semibold ` + m("in")} style={at(1.8)}>Landing page from ₦280,000</p>
      </Box>
    </Stage>
  ),
  "invoice-generator": () => (
    <Stage d={9}>
      <Box className="relative w-[204px] p-3">
        <div className="flex justify-between"><p className={`${t.md} font-bold`}>INVOICE</p><p className={`${t.xs} text-[#8a857b]`}>INV-001</p></div>
        {[["Website build", "₦450,000"], ["WhatsApp chat setup", "₦150,000"]].map(([a, b], i) => (
          <div key={a} className={"mt-1 flex justify-between border-b border-[#efece6] pb-0.5 " + m("left")} style={at(0.3 + i * 0.4)}><span className={t.xs}>{a}</span><span className={t.xs}>{b}</span></div>
        ))}
        <p className={"mt-1.5 text-right text-[17px] font-bold " + m("pop")} style={at(1.3)}>₦600,000</p>
        <span className={"absolute -right-2 top-6 rounded-[4px] border-[3px] border-[#16794a] bg-white/80 px-1.5 font-code text-[13px] font-bold text-[#16794a] " + m("stamp")} style={at(2.3)}>PAID</span>
      </Box>
    </Stage>
  ),
  "whatsapp-business-bio": () => (
    <Stage d={8}>
      <Phone className="h-[170px] w-[150px]">
        <div className="flex flex-col items-center px-2 pt-4">
          <span className={"grid size-10 place-items-center rounded-full bg-[#eb5e28] text-[15px] font-bold " + m("pop")} style={at(0.2)}>T</span>
          <p className={`${t.md} mt-1 font-bold`}>Tolu Builds</p>
          <p className={`${t.xs} text-[#16794a]`}>Business account</p>
          <p className={`${t.xs} mt-1.5 text-center ` + m("type")} style={at(0.8)}>AI websites for Lagos businesses.</p>
          <p className={`${t.xs} text-center ` + m("type")} style={at(1.6)}>Live in 5 days. Send HI 👇</p>
          <p className={`${t.xs} mt-1.5 font-semibold text-[#16794a] ` + m("pop")} style={at(2.6)}>118/139 characters ✓</p>
        </div>
      </Phone>
    </Stage>
  ),
  "cron-schedule-generator": () => (
    <Stage d={8}>
      <Win title="schedule" dark className="w-[232px]" bodyClass="p-3">
        <div className="flex items-center gap-2">
          <p className={"font-code text-[21px] font-bold text-white " + m("type")} style={at(0.2)}>0 7 * * *</p>
          <span className="relative ml-auto grid size-[22px] place-items-center rounded-full border-2 border-white/60">
            <span className={"absolute left-1/2 top-[3px] h-[7px] w-[1.5px] origin-bottom -translate-x-1/2 bg-[#f0946b] " + loop("spin")} />
          </span>
        </div>
        <p className={`${t.sm} text-[#f0946b] ` + m("in")} style={at(1.2)}>Every day at 08:00 Lagos time</p>
        {["Mon 5 Oct, 08:00", "Tue 6 Oct, 08:00"].map((d, i) => <p key={d} className={`${t.xs} mt-0.5 flex items-center gap-1 text-white/60 ` + m("left")} style={at(1.8 + i * 0.35)}><Clock className="size-3" />{d}</p>)}
      </Win>
    </Stage>
  ),
  "hook-line-generator": () => (
    <Stage d={9} className="gap-3">
      <Phone className="h-[168px] w-[94px]">
        <div className="flex h-full flex-col justify-end bg-[linear-gradient(180deg,#2a2a2a,#111)] p-1.5">
          <div className="relative h-[34px]">
            <p className={"absolute bottom-0 rounded-[4px] bg-[#eb5e28] px-1 text-[8.5px] font-bold leading-tight " + m("swap-a")} style={at(0)}>Stop pricing websites in naira only.</p>
            <p className={"absolute bottom-0 rounded-[4px] bg-white px-1 text-[8.5px] font-bold leading-tight " + m("swap-b")} style={at(0)}>I built a store in 2 hours with AI.</p>
          </div>
        </div>
      </Phone>
      <div className="w-[132px] space-y-1">
        {["Nobody tells freelancers this…", "5 steps to your first client", "I built a store in 2 hours with AI"].map((h, i) => (
          <Box key={h} className={"px-1.5 py-1 " + m("left")} style={at(0.3 + i * 0.35)}><span className={t.xs}>{h}</span></Box>
        ))}
      </div>
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
      {Render ? (
        <Render />
      ) : (
        <Stage>
          <Box className="p-3">
            <span className={t.h}>{slug}</span>
          </Box>
        </Stage>
      )}
    </Artboard>
  );
}
