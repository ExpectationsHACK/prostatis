import { Bell, Calendar, Check, MessageCircle, Minus, Phone as PhoneIcon, Plus, Send, ShoppingBag, Star } from "lucide-react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";
import { at, Box, Line, m, Phone, Stage, Stars, t, Tick, Win } from "./kit";

/**
 * Example products students build, each acting out what it does for the business
 * (an order placed, an appointment booked, a deal won, an invoice paid). Used in lessons
 * and on the course map. Distinct from the homepage LiveSite mock-ups on purpose.
 */
const thumbs = {
  coach: () => (
    <Stage d={10}>
      <Win title="kemicoaching.com" className="relative w-[262px]" bodyClass="p-3">
        <p className={`${t.xs} font-semibold tracking-[0.1em] text-[#b8400f]`}>1:1 COACHING · ONLINE</p>
        <p className={"mt-1 text-[16px] font-bold leading-[1.05] tracking-[-0.02em] " + m("type")} style={at(0.2)}>Lose 8kg eating Nigerian food.</p>
        <p className={`${t.sm} mt-1 text-[#6b675f] ` + m("in")} style={at(1.4)}>12-week plans built around jollof, not against it.</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-full bg-[#151515] px-2.5 py-1 ${t.sm} font-semibold text-white ` + m("press")} style={at(3.6)}>Book a free call</span>
          <span className={`flex items-center gap-1 ${t.xs} text-[#6b675f] ` + m("in")} style={at(2)}><Stars /> 48 clients</span>
        </div>
        <p className={`mt-2 rounded-[6px] bg-[#f7f5f1] p-1.5 ${t.xs} italic ` + m("in")} style={at(2.6)}>“Down 9kg and I still eat amala on Sundays.” · Bisi</p>
        <div className={"absolute right-2 top-2 flex items-center gap-1.5 rounded-[8px] border border-[#efece6] bg-white p-1.5 shadow-md " + m("pop")} style={at(4.4)}>
          <Calendar className="size-3 text-[#16794a]" />
          <span className={`${t.xs} font-semibold`}>Call booked · Thu 4pm</span>
        </div>
      </Win>
    </Stage>
  ),

  store: () => (
    <Stage d={10} className="gap-3">
      <Phone className="h-[170px] w-[104px]">
        <p className={`px-2 pb-1 pt-3 ${t.sm} font-bold`}>Ada&apos;s Bakery</p>
        {[["Chocolate cake", "₦18,000", "#7b4a36"], ["Meat pie ×6", "₦4,500", "#e0b27a"], ["Small chops", "₦25,000", "#c9793d"]].map(([n, p, c], i) => (
          <div key={n} className="flex items-center gap-1.5 border-t border-[#f1ede6] px-1.5 py-1">
            <span className="size-[20px] shrink-0 rounded-[5px]" style={{ background: c }} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${t.xs}`}>{n}</span>
              <span className={`block text-[7px] font-bold`}>{p}</span>
            </span>
            <span className="flex items-center gap-[2px]">
              <Minus className="size-[7px] text-[#8a857b]" />
              <span className="relative w-[6px] text-center text-[7px] font-bold">
                <span className={i === 0 ? m("swap-a") : ""} style={i === 0 ? at(0) : undefined}>1</span>
                {i === 0 && <span className={"absolute inset-0 " + m("swap-b")} style={at(0)}>2</span>}
              </span>
              <Plus className={"size-[7px] " + (i === 0 ? m("press") : "")} style={i === 0 ? at(4.7) : undefined} />
            </span>
          </div>
        ))}
        <div className="absolute inset-x-1.5 bottom-1.5">
          <span className={`flex items-center justify-center gap-1 rounded-[6px] bg-[#0ba4db] py-[3px] text-[7px] font-semibold text-white`}>
            <ShoppingBag className="size-[7px]" /> Pay with Paystack
          </span>
        </div>
      </Phone>
      <div className="space-y-1.5">
        <Box className="w-[118px] p-2">
          <p className={`${t.xs} text-[#8a857b]`}>Cart total</p>
          <div className="relative h-[20px]">
            <p className={"absolute text-[16px] font-bold " + m("swap-a")} style={at(0)}>₦47,500</p>
            <p className={"absolute text-[16px] font-bold " + m("swap-b")} style={at(0)}>₦65,500</p>
          </div>
        </Box>
        <Box className={"flex w-[118px] items-center gap-1.5 bg-[#e6f4ec] p-2 " + m("pop")} style={at(6.2)}>
          <Tick /> <span className={`${t.xs} font-semibold text-[#16794a]`}>Order #1042 paid</span>
        </Box>
      </div>
    </Stage>
  ),

  restaurant: () => (
    <Stage d={10} className="gap-2.5">
      <Win title="bukkaexpress.ng/menu" className="w-[170px]" bodyClass="p-2">
        <div className="relative mb-1.5 flex gap-1">
          {["Rice", "Swallow", "Drinks"].map((c, i) => (
            <span key={c} className={`rounded-full border border-[#e4e0d8] px-1.5 ${t.xs} ` + (i === 0 ? "bg-[#151515] text-white" : "")}>{c}</span>
          ))}
        </div>
        {[["Jollof rice + chicken", "₦3,500"], ["Fried rice + turkey", "₦4,200"], ["Ofada + ayamase", "₦3,800"]].map(([d, p], i) => (
          <div key={d} className={"flex items-center justify-between border-b border-[#f1ede6] py-1 " + m("left")} style={at(0.2 + i * 0.3)}>
            <span className={t.xs}>{d}</span>
            <span className={`${t.xs} font-semibold`}>{p}</span>
          </div>
        ))}
        <span className={`mt-1.5 flex items-center justify-center gap-1 rounded-[6px] bg-[#1faa53] py-[3px] ${t.xs} font-semibold text-white ` + m("press")} style={at(1.8)}>
          <MessageCircle className="size-[8px]" /> Order on WhatsApp
        </span>
      </Win>
      <Phone className="h-[150px] w-[98px]">
        <p className={`bg-[#075e54] px-1.5 pb-1 pt-3 text-[7px] font-semibold text-white`}>Bukka Express</p>
        <div className="space-y-1 bg-[#efeae2] p-1.5">
          <p className={`ml-auto w-[88%] rounded-[5px] bg-[#d9fdd3] p-1 text-[6.5px] ` + m("pop")} style={at(2.4)}>Hi! 2× Jollof rice + chicken, to Allen Ave.</p>
          <p className={`w-[88%] rounded-[5px] bg-white p-1 text-[6.5px] ` + m("pop")} style={at(3.6)}>Got it! ₦7,000 + delivery. Pay here 👇</p>
          <p className={`w-[70%] rounded-[5px] bg-white p-1 text-[6.5px] font-semibold text-[#0ba4db] ` + m("pop")} style={at(4.4)}>paystack.com/pay/bukka</p>
        </div>
      </Phone>
    </Stage>
  ),

  salon: () => (
    <Stage d={10}>
      <Phone className="h-[172px] w-[124px]">
        <div className="px-2 pb-2 pt-3.5">
          <p className={`${t.sm} font-bold`}>Glow Studio</p>
          <p className={`${t.xs} text-[#8a857b]`}>Book an appointment</p>
          {[["Classic lashes", "₦18,000"], ["Knotless braids", "₦35,000"]].map(([s, p], i) => (
            <div key={s} className={`mt-1 flex justify-between rounded-[5px] border border-[#e4e0d8] px-1.5 py-1 ${t.xs} ` + (i === 0 ? m("mark") : "")} style={i === 0 ? at(0.4, { off: "#fff", on: "#fdeee6" }) : undefined}>
              <span>{s}</span>
              <span className="font-semibold">{p}</span>
            </div>
          ))}
          <p className={`${t.xs} mt-1.5 font-semibold`}>Saturday 18 Oct</p>
          <div className="mt-0.5 grid grid-cols-3 gap-1">
            {["10:00", "12:30", "15:00"].map((x, i) => (
              <span key={x} className={`rounded-[4px] border border-[#e4e0d8] py-[2px] text-center text-[6.5px] ` + (i === 1 ? m("mark") : "")} style={i === 1 ? at(1.4, { off: "#fff", on: "#151515", "on-ink": "#fff" }) : undefined}>{x}</span>
            ))}
          </div>
          <span className={`mt-1.5 block rounded-[5px] bg-[#eb5e28] py-[3px] text-center text-[7px] font-semibold ` + m("press")} style={at(2.4)}>Confirm · ₦5,000 deposit</span>
        </div>
        <div className={"absolute inset-0 grid place-items-center bg-white/90 " + m("in")} style={at(3)}>
          <div className="text-center">
            <span className="mx-auto grid size-[22px] place-items-center rounded-full bg-[#16794a] text-white"><Check className="size-[12px]" strokeWidth={3} /></span>
            <p className={`${t.sm} mt-1 font-bold`}>You&apos;re booked</p>
            <p className="text-[6.5px] text-[#6b675f]">Sat 18 Oct · 12:30</p>
          </div>
        </div>
      </Phone>
    </Stage>
  ),

  clinic: () => (
    <Stage d={10}>
      <Win title="brightcareclinic.ng/appointments" className="relative w-[262px]" bodyClass="grid grid-cols-[1fr_1.2fr] gap-2.5 p-2.5">
        <div>
          <p className={`${t.md} font-bold`}>See a doctor this week</p>
          {[["Dr. Okafor", "General"], ["Dr. Bello", "Paediatrics"]].map(([n, r], i) => (
            <div key={n} className={"mt-1.5 flex items-center gap-1.5 " + m("left")} style={at(0.2 + i * 0.3)}>
              <span className="size-[18px] rounded-full bg-[radial-gradient(circle_at_50%_38%,#7a5646_0_30%,#e9d7c6_31%)]" />
              <span><span className={`block ${t.xs} font-semibold`}>{n}</span><span className="block text-[6.5px] text-[#8a857b]">{r}</span></span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[["Name", "Chinedu Eze"], ["Phone", "0803 555 0192"], ["Day", "Wed 22 Oct, 10:00"]].map(([k, v], i) => (
            <div key={k} className="rounded-[4px] border border-[#e4e0d8] px-1.5 py-[2px]">
              <span className="block text-[6px] text-[#8a857b]">{k}</span>
              <span className={`block ${t.xs} ` + m("type")} style={at(0.8 + i * 0.6)}>{v}</span>
            </div>
          ))}
          <span className={`block rounded-[4px] bg-[#151515] py-[3px] text-center ${t.xs} font-semibold text-white ` + m("press")} style={at(2.8)}>Request appointment</span>
        </div>
        <div className={"absolute bottom-2 left-2 flex items-center gap-1.5 rounded-[8px] bg-[#151515] px-2 py-1 text-white shadow-md " + m("in")} style={at(3.6)}>
          <Bell className="size-3 text-[#f0946b]" /><span className={t.xs}>SMS reminder set for Tue 6pm</span>
        </div>
      </Win>
    </Stage>
  ),

  portfolio: () => (
    <Stage d={10}>
      <Win title="tunde.dev/work/glow-studio" className="w-[262px]" bodyClass="p-2.5">
        <p className={`${t.xs} font-semibold tracking-[0.1em] text-[#b8400f]`}>CASE STUDY</p>
        <p className={"text-[13px] font-bold leading-tight " + m("type")} style={at(0.2)}>A booking site for Glow Studio</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[["Bookings a week", "Before", 38, "After", 62], ["Mobile speed", "Before", 30, "After", 88]].map(([label, b, bv, a, av], i) => (
            <div key={label as string} className="rounded-[6px] border border-[#efece6] p-1.5">
              <p className={`${t.xs} font-semibold`}>{label as string}</p>
              {[[b, bv, "#dcd6c8"], [a, av, "#eb5e28"]].map(([k, v, c], j) => (
                <div key={k as string} className="mt-1 flex items-center gap-1">
                  <span className="w-[26px] text-[6px] text-[#8a857b]">{k as string}</span>
                  <span className={"h-[6px] rounded-full " + m("grow-x")} style={{ ...at(0.8 + i * 0.4 + j * 0.3), width: `${(v as number) * 0.7}px`, background: c as string }} />
                  <span className="text-[6.5px] font-semibold">{v as number}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className={`flex items-center gap-1 ${t.xs} ` + m("in")} style={at(2.6)}><Stars /> “Our Saturdays are full now.”</span>
          <span className={`rounded-full bg-[#eb5e28] px-2 py-[2px] ${t.xs} font-semibold ` + m("glow")} style={at(3.4)}>Hire me</span>
        </div>
      </Win>
    </Stage>
  ),

  dashboard: () => (
    <Stage d={11}>
      <Win title="shop.adire.ng/admin" className="w-[266px]" bodyClass="p-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[["Sales today", "₦184,000", "₦226,500"], ["Orders", "23", "27"], ["Visitors", "1,204", "1,318"]].map(([k, a, b]) => (
            <div key={k} className="rounded-[5px] border border-[#efece6] p-1">
              <p className="text-[6px] text-[#8a857b]">{k}</p>
              <div className="relative h-[13px]">
                <p className={"absolute text-[9.5px] font-bold " + m("swap-a")} style={at(0)}>{a}</p>
                <p className={"absolute text-[9.5px] font-bold text-[#16794a] " + m("swap-b")} style={at(0)}>{b}</p>
              </div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 250 54" className="mt-1.5 h-[54px] w-full rounded-[5px] border border-[#efece6]" aria-hidden>
          <path d="M0 44 L30 38 L60 40 L90 30 L120 33 L150 22 L180 25 L210 14 L250 8" fill="none" stroke="#eb5e28" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="280" className={m("draw")} style={at(0.2, { len: 280 })} />
          <path d="M0 44 L30 38 L60 40 L90 30 L120 33 L150 22 L180 25 L210 14 L250 8 L250 54 L0 54Z" fill="#eb5e28" opacity="0.08" />
        </svg>
        <div className="mt-1.5 rounded-[5px] border border-[#efece6]">
          <p className={"flex justify-between bg-[#fdeee6] px-1.5 py-[2px] text-[6.5px] " + m("in")} style={at(5.4)}>
            <span className="font-semibold">#1043 · Adire dress</span><span className="font-semibold text-[#16794a]">₦25,000 paid</span>
          </p>
          <p className="flex justify-between border-t border-[#efece6] px-1.5 py-[2px] text-[6.5px]"><span>#1042 · Tote bag ×2</span><span className="text-[#16794a]">₦16,000 paid</span></p>
        </div>
      </Win>
    </Stage>
  ),

  crm: () => (
    <Stage d={10}>
      <Box className="relative w-[272px] p-2">
        <div className="grid grid-cols-3 gap-1.5">
          {["New lead", "Proposal sent", "Won"].map((c, i) => (
            <div key={c} className="h-[112px] rounded-[6px] bg-[#f7f5f1] p-1">
              <p className={`${t.xs} mb-1 font-semibold ${i === 2 ? "text-[#16794a]" : "text-[#6b675f]"}`}>{c}</p>
              {i === 0 && <div className="mb-1 rounded-[4px] border border-[#e4e0d8] bg-white p-1"><p className="text-[6.5px] font-semibold">SmileCare Dental</p><p className="text-[6px] text-[#8a857b]">₦650,000</p></div>}
              {i === 1 && <div className="mb-1 rounded-[4px] border border-[#e4e0d8] bg-white p-1"><p className="text-[6.5px] font-semibold">Bukka Express</p><p className="text-[6px] text-[#8a857b]">₦400,000</p></div>}
            </div>
          ))}
        </div>
        <div className={"absolute left-[12px] top-[62px] w-[80px] rounded-[4px] border border-[#eb5e28] bg-white p-1 shadow-md " + m("scroll-x")} style={at(0.8, { sx: "176px" })}>
          <p className="text-[6.5px] font-semibold">Glow Studio</p>
          <p className="text-[6px] text-[#8a857b]">₦350,000</p>
        </div>
        <p className={`mt-1.5 flex items-center gap-1 ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(3.8)}>
          <Tick /> Won this month: ₦1,000,000
        </p>
      </Box>
    </Stage>
  ),

  invoicing: () => (
    <Stage d={10}>
      <Win title="Invoices" className="w-[252px]" bodyClass="p-2">
        {[["INV-014", "Glow Studio", "₦350,000", false], ["INV-013", "Bukka Express", "₦400,000", true], ["INV-012", "SmileCare", "₦650,000", true]].map(([id, c, amt, paid]) => (
          <div key={id as string} className="flex items-center gap-2 border-b border-[#f1ede6] py-1.5">
            <span className="font-code text-[7px] text-[#8a857b]">{id as string}</span>
            <span className={`${t.xs} flex-1 font-semibold`}>{c as string}</span>
            <span className={t.xs}>{amt as string}</span>
            {paid ? (
              <span className={`rounded-full bg-[#e6f4ec] px-1.5 text-[6.5px] font-semibold text-[#16794a]`}>Paid</span>
            ) : (
              <span className="relative w-[40px]">
                <span className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#fff4d6] px-1.5 text-[6.5px] font-semibold text-[#8a6d00] ` + m("swap-a")} style={at(0)}>Pending</span>
                <span className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#e6f4ec] px-1.5 text-[6.5px] font-semibold text-[#16794a] ` + m("swap-b")} style={at(0)}>Paid</span>
              </span>
            )}
          </div>
        ))}
        <div className="mt-2 flex items-end justify-between">
          <span className={`${t.xs} text-[#8a857b]`}>Paid this month</span>
          <span className="relative h-[16px] w-[80px] text-right">
            <span className={"absolute right-0 text-[13px] font-bold " + m("swap-a")} style={at(0)}>₦1,050,000</span>
            <span className={"absolute right-0 text-[13px] font-bold text-[#16794a] " + m("swap-b")} style={at(0)}>₦1,400,000</span>
          </span>
        </div>
      </Win>
    </Stage>
  ),

  wabot: () => (
    <Stage d={11}>
      <Phone className="h-[176px] w-[150px]">
        <p className="flex items-center gap-1 bg-[#075e54] px-2 pb-1 pt-3.5 text-[7.5px] font-semibold text-white">
          <span className="size-[10px] rounded-full bg-white/80" /> Mama&apos;s Kitchen · bot
        </p>
        <div className="space-y-1 bg-[#efeae2] p-1.5 text-[6.5px]">
          <p className={"w-[86%] rounded-[5px] bg-white p-1 " + m("in")} style={at(0.2)}>Hi! Reply with a number: 1 Menu · 2 Order · 3 Track · 4 Talk to us</p>
          <p className={"ml-auto w-fit rounded-[5px] bg-[#d9fdd3] px-1.5 py-1 " + m("in")} style={at(1.4)}>2</p>
          <p className={"w-[80%] rounded-[5px] bg-white p-1 " + m("in")} style={at(2.4)}>What would you like?</p>
          <p className={"ml-auto w-[70%] rounded-[5px] bg-[#d9fdd3] p-1 " + m("in")} style={at(3.4)}>Jollof ×2, to Ikeja</p>
          <p className={"w-[86%] rounded-[5px] bg-white p-1 " + m("in")} style={at(4.6)}>
            Total ₦7,000. Pay here: <span className="font-semibold text-[#0ba4db]">paystack.com/pay/mk</span>
          </p>
        </div>
      </Phone>
    </Stage>
  ),

  supportagent: () => (
    <Stage d={11}>
      <div className="relative h-[168px] w-[272px]">
        <Win title="quickship.ng" className="absolute inset-0" bodyClass="space-y-1.5 p-2.5">
          <Line w="50%" h="h-[7px]" c="bg-[#dcd6c8]" />
          <Line w="80%" />
          <Line w="70%" />
          <Line w="40%" />
        </Win>
        <div className={"absolute bottom-2 right-2 w-[150px] overflow-hidden rounded-[10px] border border-[#e4e0d8] bg-white shadow-lg " + m("in")} style={at(0.2)}>
          <p className="bg-[#151515] px-2 py-1 text-[7px] font-semibold text-white">QuickShip assistant</p>
          <div className="space-y-1 p-1.5 text-[6.5px]">
            <p className={"ml-auto w-fit rounded-[5px] bg-[#f1ede6] px-1.5 py-1 " + m("in")} style={at(0.8)}>Do you deliver to Ibadan?</p>
            <p className={"w-[92%] rounded-[5px] bg-[#fdeee6] p-1 " + m("in")} style={at(2)}>Yes, in 2 working days for ₦3,500.</p>
            <span className={"inline-block rounded-full border border-[#e4e0d8] px-1 text-[6px] text-[#8a857b] " + m("pop")} style={at(2.6)}>Source: Delivery FAQ</span>
            <span className={"block rounded-[5px] border border-[#151515] py-[2px] text-center text-[6.5px] font-semibold " + m("glow")} style={at(3.8)}>Talk to a person</span>
          </div>
        </div>
      </div>
    </Stage>
  ),

  leadgen: () => (
    <Stage d={11} className="gap-2.5">
      <Win title="freeaudit.tolubuilds.ng" className="w-[140px]" bodyClass="p-2">
        <p className="text-[10px] font-bold leading-tight">Is your website losing customers?</p>
        <p className="mt-0.5 text-[6.5px] text-[#6b675f]">Get a free 5-point check in 24 hours.</p>
        <div className="mt-1.5 rounded-[4px] border border-[#e4e0d8] px-1 py-[2px] text-[7px]">
          <span className={"inline-block " + m("type")} style={at(0.3)}>kemi@glowbeauty.ng</span>
        </div>
        <span className={"mt-1 block rounded-[4px] bg-[#eb5e28] py-[2px] text-center text-[7px] font-semibold " + m("press")} style={at(2)}>Send my audit</span>
      </Win>
      <div className="space-y-1.5">
        <Box className="w-[124px] overflow-hidden">
          <p className="bg-[#0f9d58] px-1.5 py-[2px] text-[6.5px] font-semibold text-white">Leads · Google Sheet</p>
          {["Tobi · Bukka Express", "Ada · SmileCare"].map((r) => <p key={r} className="border-t border-[#efece6] px-1.5 py-[2px] text-[6.5px]">{r}</p>)}
          <p className={"border-t border-[#efece6] bg-[#fdeee6] px-1.5 py-[2px] text-[6.5px] font-semibold " + m("left")} style={at(2.6)}>Kemi · Glow Beauty</p>
        </Box>
        <Box className={"flex w-[124px] items-center gap-1 bg-[#151515] px-1.5 py-1 text-white " + m("pop")} style={at(3.4)}>
          <MessageCircle className="size-3 text-[#4ade80]" /><span className="text-[6.5px]">New lead: Kemi, Glow Beauty</span>
        </Box>
      </div>
    </Stage>
  ),

  gbp: () => (
    <Stage d={10}>
      <Box className="relative w-[252px] p-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className={`${t.md} font-bold`}>Glow Beauty Studio</p>
            <p className="flex items-center gap-1 text-[7px] text-[#6b675f]">
              <span className="font-semibold text-[#151515]">4.9</span> <Stars />
              <span className="relative inline-block w-[42px]">
                <span className={"absolute left-0 " + m("swap-a")} style={at(0)}>(211 reviews)</span>
                <span className={"absolute left-0 font-semibold text-[#16794a] " + m("swap-b")} style={at(0)}>(212 reviews)</span>
              </span>
            </p>
            <p className="text-[7px] text-[#6b675f]">Beauty salon · Lekki Phase 1 · Open until 7pm</p>
          </div>
        </div>
        <div className="mt-1.5 flex gap-1">
          {[[PhoneIcon, "Call"], [Send, "Directions"], [Calendar, "Book"]].map(([I, l], i) => {
            const Icon = I as typeof Send;
            return (
              <span key={l as string} className={`flex flex-1 items-center justify-center gap-1 rounded-full border border-[#e4e0d8] py-[3px] text-[7px] font-semibold text-[#1a73e8] ` + (i === 2 ? m("glow") : "")} style={i === 2 ? at(3.2) : undefined}>
                <Icon className="size-[8px]" /> {l as string}
              </span>
            );
          })}
        </div>
        <div className={"mt-1.5 rounded-[6px] border border-[#efece6] p-1.5 " + m("left")} style={at(5)}>
          <p className="flex items-center gap-1 text-[7px] font-semibold">Zainab A. <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-[6px] fill-[#f5a623] text-[#f5a623]" />)}</span></p>
          <p className="text-[6.5px] text-[#6b675f]">Booked online in 2 minutes. My lashes are perfect!</p>
        </div>
        <span className={"absolute right-2 top-2 rounded-full bg-[#e6f4ec] px-1.5 text-[6.5px] font-semibold text-[#16794a] " + m("pop")} style={at(5.4)}>+1 review</span>
      </Box>
    </Stage>
  ),
};

export type ThumbKind = keyof typeof thumbs;

export function ProductThumb({ kind, tone }: { kind: ThumbKind; tone: Tone }) {
  const T = thumbs[kind];
  return (
    <Artboard bg={tones[tone].bg}>
      <T />
    </Artboard>
  );
}
