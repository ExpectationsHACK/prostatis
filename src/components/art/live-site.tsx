import { Bell, CalendarDays, Check, GraduationCap, LayoutDashboard, Lock, MapPin, MessageCircle, Search, ShoppingBag, Star, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { Artboard } from "./artboard";

/**
 * Six realistic, animated website mock-ups for the homepage: each loops through what the
 * real thing does (a visitor books, buys, signs in, gets a reply). Drawn on the fixed
 * 320×200 Artboard; animations run only while on screen and never under reduced motion
 * (keyframes live in globals.css under "Live site mock-ups").
 */
export type SiteKind = "landing" | "business" | "store" | "webapp" | "booking" | "portfolio";

const a = (name: string) => `art-anim ${name}`;

function Window({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="absolute left-[14px] top-[12px] h-[176px] w-[292px] overflow-hidden rounded-[10px] border border-[#e2dfd8] bg-white shadow-[0_12px_28px_-14px_rgba(21,21,21,0.35)]">
      <div className="flex h-[18px] items-center gap-[3px] border-b border-[#eeece7] bg-[#f7f6f3] px-2">
        <span className="size-[5px] rounded-full bg-[#ff5f57]" />
        <span className="size-[5px] rounded-full bg-[#febc2e]" />
        <span className="size-[5px] rounded-full bg-[#28c840]" />
        <span className="mx-auto flex h-[11px] w-[120px] items-center justify-center gap-[3px] rounded-[4px] bg-white text-[6.5px] text-[#77736b]">
          <Lock className="size-[6px]" strokeWidth={3} /> {url}
        </span>
      </div>
      <div className="relative h-[158px] overflow-hidden">{children}</div>
    </div>
  );
}

function Cursor({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 12 16" width="11" height="15" className={"pointer-events-none absolute z-30 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] " + className}>
      <path d="M1 1l9.5 9.2H5.8L8 15l-2 .8-2.3-4.9L1 13.4z" fill="#151515" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

const Stars = () => (
  <span className="flex gap-[1px]">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="size-[6px] fill-[#f5a623] text-[#f5a623]" />
    ))}
  </span>
);

/* 1. Landing page: the page scrolls to the proof, back up, a visitor taps the button and a booking lands. */
function Landing() {
  return (
    <Window url="glowlashes.ng">
      <div className={"absolute inset-x-0 top-0 " + a("lk-lp-scroll")}>
        <div className="flex h-[20px] items-center justify-between border-b border-[#f0eee9] px-3">
          <span className="text-[8px] font-semibold tracking-[0.06em]">GLOW LASHES</span>
          <span className="rounded-full border border-[#e2dfd8] px-1.5 text-[6px]">Book now</span>
        </div>
        <div className="grid h-[96px] grid-cols-[1.3fr_1fr] gap-2 px-3 pt-2.5">
          <div>
            <p className="text-[6px] font-semibold tracking-[0.1em] text-[#b8400f]">LEKKI STUDIO</p>
            <p className="mt-1 text-[13px] font-bold leading-[1.1] tracking-[-0.02em]">Lashes that last four weeks.</p>
            <p className="mt-1 text-[6.5px] leading-snug text-[#6b675f]">Natural and volume sets from ₦18,000.</p>
            <span className={"mt-2 inline-flex h-[15px] items-center gap-1 rounded-full bg-[#1faa53] px-2 text-[6.5px] font-semibold text-white " + a("lk-lp-btn")}>
              <MessageCircle className="size-[7px]" /> Book on WhatsApp
            </span>
          </div>
          <div className="relative h-[78px] overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#f7dccf,#e9a98f)]">
            <svg viewBox="0 0 60 40" className="absolute inset-0 m-auto w-[70%]">
              <path d="M8 22c10-12 34-12 44 0-10 10-34 10-44 0z" fill="#fff" opacity=".9" />
              <circle cx="30" cy="22" r="7" fill="#5a3a2e" />
              <circle cx="30" cy="22" r="3" fill="#1d1411" />
              <path d="M9 21l-3-5M15 16l-2-5M22 13l-1-5M30 12V7M38 13l1-5M45 16l2-5M51 21l3-5" stroke="#1d1411" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="grid h-[46px] grid-cols-3 gap-1.5 px-3">
          {[["“So natural, lasted 5 weeks.”", "Amaka"], ["“Best lash tech in Lekki.”", "Bisi"], ["“Booked in 2 minutes.”", "Zainab"]].map(([q, n]) => (
            <div key={n} className="rounded-[6px] border border-[#eeece7] p-1.5">
              <Stars />
              <p className="mt-0.5 text-[6px] leading-snug">{q}</p>
              <p className="text-[5.5px] text-[#8a867e]">{n}</p>
            </div>
          ))}
        </div>
        <div className="flex h-[40px] items-center gap-1.5 px-3">
          {[["Classic set", "₦18,000"], ["Volume set", "₦25,000"], ["Refill", "₦9,000"]].map(([t, p]) => (
            <div key={t} className="flex-1 rounded-[6px] bg-[#f7f6f3] px-1.5 py-1">
              <p className="text-[6px] text-[#6b675f]">{t}</p>
              <p className="text-[8px] font-bold">{p}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={"absolute right-2 top-2 z-20 flex w-[132px] items-center gap-1.5 rounded-[8px] border border-[#eeece7] bg-white p-1.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] " + a("lk-lp-toast")}>
        <span className="grid size-[16px] shrink-0 place-items-center rounded-full bg-[#1faa53] text-white">
          <MessageCircle className="size-[8px]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[6.5px] font-bold">New booking request</span>
          <span className="block truncate text-[6px] text-[#6b675f]">Tolu · Classic set · Sat 11:00</span>
        </span>
      </div>
      <Cursor className={"left-[200px] top-[128px] " + a("lk-lp-cursor")} />
    </Window>
  );
}

/* 2. Business website: the map pin drops, then a customer asks on WhatsApp and gets a reply. */
function Business() {
  return (
    <Window url="mamaskitchen.ng">
      <div className="flex h-[20px] items-center justify-between border-b border-[#f0eee9] px-3">
        <span className="text-[8px] font-bold">Mama&apos;s Kitchen</span>
        <span className="flex gap-2 text-[6px] text-[#6b675f]">
          <span className="text-[#151515]">Home</span>
          <span>Menu</span>
          <span>About</span>
          <span>Contact</span>
        </span>
      </div>
      <div className="grid grid-cols-[1.35fr_1fr] gap-2 px-3 pt-2">
        <div>
          <p className="text-[12px] font-bold leading-[1.1] tracking-[-0.02em]">Hot lunch at your desk.</p>
          <p className="mt-1 text-[6.5px] leading-snug text-[#6b675f]">Jollof, egusi and ofada, delivered around Ikeja from 11am.</p>
          <span className="mt-1.5 inline-flex h-[14px] items-center gap-1 rounded-full bg-[#151515] px-2 text-[6.5px] font-semibold text-white">Order now</span>
        </div>
        <div className="relative h-[58px] overflow-hidden rounded-[8px] bg-[radial-gradient(circle_at_50%_55%,#fff_0_34%,#f1e4d6_35%)]">
          <div className="absolute left-1/2 top-[55%] size-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#e8662c_0_40%,#c94c1c_41%_58%,#f4f1ec_59%)]" />
          <span className="absolute left-[38%] top-[44%] size-[4px] rounded-full bg-[#3f8b3a]" />
          <span className="absolute left-[56%] top-[58%] size-[4px] rounded-full bg-[#3f8b3a]" />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_1fr] gap-2 px-3">
        <div className="rounded-[6px] border border-[#eeece7] p-1.5">
          <p className="text-[6.5px] font-bold">Today&apos;s menu</p>
          {[["Jollof + chicken", "₦3,500"], ["Egusi + pounded yam", "₦4,000"], ["Ofada + plantain", "₦3,800"]].map(([d, p]) => (
            <p key={d} className="mt-0.5 flex justify-between text-[6px]">
              <span>{d}</span>
              <span className="font-semibold">{p}</span>
            </p>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-[6px] bg-[#eef0ec]">
          <svg viewBox="0 0 120 56" className="absolute inset-0 size-full" preserveAspectRatio="none">
            <path d="M0 18h120M0 40h120M30 0v56M78 0v56" stroke="#fff" strokeWidth="5" />
            <path d="M0 30C40 26 70 44 120 36" stroke="#dcd6c8" strokeWidth="3" fill="none" />
          </svg>
          <span className={"absolute left-[46%] top-[34%] size-[14px] rounded-full bg-[#eb5e28]/30 " + a("lk-bz-ring")} />
          <MapPin className={"absolute left-[45%] top-[18%] size-[14px] fill-[#eb5e28] text-white " + a("lk-bz-pin")} />
          <span className="absolute bottom-1 left-1 rounded-[3px] bg-white px-1 text-[5.5px]">Allen Ave, Ikeja</span>
        </div>
      </div>
      <div className={"absolute bottom-[26px] right-2 z-20 w-[122px] overflow-hidden rounded-[8px] border border-[#eeece7] bg-[#efeae2] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] " + a("lk-bz-chat")}>
        <div className="flex items-center gap-1 bg-[#075e54] px-1.5 py-1 text-[6.5px] font-semibold text-white">
          <span className="size-[9px] rounded-full bg-white/80" /> Mama&apos;s Kitchen
        </div>
        <div className="space-y-1 p-1.5">
          <p className={"w-fit max-w-[88%] rounded-[5px] bg-white px-1.5 py-0.5 text-[6px] " + a("lk-bz-m1")}>Are you open today?</p>
          <div className="relative">
            <p className={"ml-auto w-fit max-w-[88%] rounded-[5px] bg-[#d9fdd3] px-1.5 py-0.5 text-[6px] " + a("lk-bz-m2")}>Yes! Open till 9pm. Send your order here.</p>
            <span className={"absolute right-0 top-0 flex w-fit gap-[2px] rounded-[5px] bg-[#d9fdd3] px-1.5 py-1 " + a("lk-bz-dots")}>
              <span className="size-[3px] rounded-full bg-[#6b675f]" />
              <span className="size-[3px] rounded-full bg-[#6b675f]" />
              <span className="size-[3px] rounded-full bg-[#6b675f]" />
            </span>
          </div>
        </div>
      </div>
      <span className="absolute bottom-2 right-2 z-20 grid size-[18px] place-items-center rounded-full bg-[#1faa53] text-white shadow-md">
        <MessageCircle className="size-[9px]" />
      </span>
    </Window>
  );
}

/* 3. Online store: add to cart, the item flies to the cart, then Paystack checkout succeeds. */
function Store() {
  const items = [
    { n: "Adire dress", p: "₦25,000", bg: "bg-[repeating-radial-gradient(circle_at_30%_30%,#2b3a8c_0_3px,#3f50b5_3px_6px)]" },
    { n: "Ankara top", p: "₦17,000", bg: "bg-[repeating-linear-gradient(45deg,#e0a82e_0_4px,#c2410c_4px_8px,#1f7a4d_8px_12px)]" },
    { n: "Tote bag", p: "₦8,000", bg: "bg-[repeating-linear-gradient(90deg,#1f2a44_0_5px,#f3efe6_5px_7px)]" },
  ];
  return (
    <Window url="adireshop.ng">
      <div className="flex h-[20px] items-center justify-between border-b border-[#f0eee9] px-3">
        <span className="text-[8px] font-bold tracking-[0.04em]">ADIRE SHOP</span>
        <span className="flex h-[11px] w-[90px] items-center gap-1 rounded-full bg-[#f4f3ef] px-1.5 text-[5.5px] text-[#8a867e]">
          <Search className="size-[6px]" /> Search products
        </span>
        <span className="relative">
          <ShoppingBag className="size-[10px]" />
          <span className="absolute -right-1.5 -top-1 grid size-[8px] place-items-center rounded-full bg-[#eb5e28] text-[5px] font-bold text-[#151515]">
            <span className={a("lk-st-c1")}>1</span>
            <span className={"absolute inset-0 grid place-items-center " + a("lk-st-c2")}>2</span>
          </span>
        </span>
      </div>
      <p className="px-3 pt-1.5 text-[7px] font-semibold">New in · Handmade in Abeokuta</p>
      <div className="grid grid-cols-3 gap-2 px-3 pt-1.5">
        {items.map((it, i) => (
          <div key={it.n} className="rounded-[6px] border border-[#eeece7] p-1">
            <div className={`h-[52px] rounded-[4px] ${it.bg}`} />
            <p className="mt-1 text-[6.5px] font-semibold">{it.n}</p>
            <p className="text-[6.5px] text-[#6b675f]">{it.p}</p>
            <span className={"mt-1 flex h-[12px] items-center justify-center rounded-[4px] bg-[#151515] text-[5.5px] font-semibold text-white " + (i === 1 ? a("lk-st-add") : "")}>Add to cart</span>
          </div>
        ))}
      </div>
      <span className={"absolute left-[131px] top-[59px] z-20 h-[26px] w-[34px] rounded-[4px] bg-[repeating-linear-gradient(45deg,#e0a82e_0_4px,#c2410c_4px_8px,#1f7a4d_8px_12px)] " + a("lk-st-fly")} />
      <div className={"absolute inset-y-0 right-0 z-20 flex w-[124px] flex-col border-l border-[#eeece7] bg-white p-2 shadow-[-10px_0_24px_-12px_rgba(0,0,0,0.25)] " + a("lk-st-drawer")}>
        <p className="text-[7.5px] font-bold">Your cart (2)</p>
        {[["Adire dress", "₦25,000"], ["Ankara top", "₦17,000"]].map(([n, p]) => (
          <p key={n} className="mt-1 flex justify-between border-b border-[#f0eee9] pb-1 text-[6.5px]">
            <span>{n}</span>
            <span>{p}</span>
          </p>
        ))}
        <p className="mt-1.5 flex justify-between text-[7px] font-bold">
          <span>Total</span>
          <span>₦42,000</span>
        </p>
        <div className="relative mt-auto h-[18px]">
          <span className={"absolute inset-0 flex items-center justify-center rounded-[5px] bg-[#0ba4db] text-[6.5px] font-semibold text-white " + a("lk-st-pay")}>Pay with Paystack</span>
          <span className={"absolute inset-0 flex items-center justify-center rounded-[5px] bg-[#0ba4db] " + a("lk-st-spin")}>
            <span className="size-[8px] animate-spin rounded-full border-[1.5px] border-white/40 border-t-white" />
          </span>
          <span className={"absolute inset-0 flex items-center justify-center gap-1 rounded-[5px] bg-[#16794a] text-[6.5px] font-semibold text-white " + a("lk-st-ok")}>
            <Check className="size-[8px]" strokeWidth={3} /> Payment successful
          </span>
        </div>
      </div>
      <Cursor className={"left-[230px] top-[140px] " + a("lk-st-cursor")} />
    </Window>
  );
}

/* 4. Web app: someone signs in, the dashboard loads, the chart grows and a new payment appears. */
function WebApp() {
  const bars = [38, 52, 44, 66, 58, 80, 72];
  return (
    <Window url="app.schoolhub.ng">
      <div className="flex h-full">
        <div className="w-[62px] shrink-0 border-r border-[#f0eee9] bg-[#fafaf8] p-1.5">
          <p className="flex items-center gap-1 text-[7px] font-bold">
            <GraduationCap className="size-[9px] text-[#eb5e28]" /> SchoolHub
          </p>
          {[
            [LayoutDashboard, "Overview", true],
            [Users, "Students", false],
            [Wallet, "Fees", false],
            [CalendarDays, "Classes", false],
          ].map(([Icon, l, on]) => {
            const I = Icon as typeof Users;
            return (
              <p key={l as string} className={"mt-1 flex items-center gap-1 rounded-[4px] px-1 py-[3px] text-[6px] " + (on ? "bg-white font-semibold shadow-sm" : "text-[#6b675f]")}>
                <I className="size-[7px]" /> {l as string}
              </p>
            );
          })}
        </div>
        <div className="min-w-0 flex-1 p-2">
          <p className="text-[8px] font-bold">Welcome back, Mrs Ade</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {[["Students", "312"], ["Fees paid", "94%"], ["Classes", "18"]].map(([l, v]) => (
              <div key={l} className="rounded-[5px] border border-[#eeece7] p-1">
                <p className="text-[5.5px] text-[#6b675f]">{l}</p>
                <p className="text-[10px] font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex h-[40px] items-end gap-[5px] rounded-[5px] border border-[#eeece7] px-2 pb-1 pt-1.5">
            {bars.map((h, i) => (
              <span key={i} className={"flex-1 origin-bottom rounded-t-[2px] " + (i === bars.length - 2 ? "bg-[#eb5e28] " : "bg-[#e9e6df] ") + a("lk-wa-bar")} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
          <div className="mt-1.5 rounded-[5px] border border-[#eeece7]">
            <p className={"flex justify-between bg-[#fdeee6] px-1.5 py-[3px] text-[6px] " + a("lk-wa-row")}>
              <span className="font-semibold">Chidi O. · JSS2</span>
              <span className="font-semibold text-[#16794a]">₦45,000 paid</span>
            </p>
            {[["Amina B. · SS1", "₦45,000 paid"], ["Tobi A. · JSS1", "₦40,000 paid"]].map(([n, v]) => (
              <p key={n} className="flex justify-between border-t border-[#f0eee9] px-1.5 py-[3px] text-[6px]">
                <span>{n}</span>
                <span className="text-[#16794a]">{v}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={"absolute inset-0 z-20 grid place-items-center bg-[#fafaf8] " + a("lk-wa-login")}>
        <div className="w-[130px] rounded-[8px] border border-[#eeece7] bg-white p-2.5 shadow-sm">
          <p className="flex items-center gap-1 text-[8px] font-bold">
            <GraduationCap className="size-[10px] text-[#eb5e28]" /> Sign in to SchoolHub
          </p>
          <div className="mt-1.5 h-[13px] overflow-hidden rounded-[4px] border border-[#e2dfd8] px-1 text-[6px] leading-[12px]">
            <span className={"inline-block overflow-hidden whitespace-nowrap align-top " + a("lk-wa-type")}>ade@schoolhub.ng</span>
          </div>
          <div className="mt-1 h-[13px] rounded-[4px] border border-[#e2dfd8] px-1 text-[7px] leading-[12px] tracking-[1px]">••••••••</div>
          <span className={"mt-1.5 flex h-[14px] items-center justify-center rounded-[4px] bg-[#151515] text-[6.5px] font-semibold text-white " + a("lk-wa-signin")}>Sign in</span>
        </div>
      </div>
    </Window>
  );
}

/* 5. Booking: pick a date and a time, pay the deposit, get a confirmation and a reminder. */
function Booking() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  return (
    <Window url="braidsbytemi.ng/book">
      <div className="grid h-full grid-cols-[1.15fr_1fr] gap-2 p-2.5">
        <div>
          <p className="text-[8px] font-bold">Knotless braids · 4 hrs</p>
          <p className="text-[6px] text-[#6b675f]">Pick a day, October</p>
          <div className="relative mt-1 grid grid-cols-7 gap-[2px]">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-center text-[5px] text-[#8a867e]">{d}</span>
            ))}
            {days.map((d) => (
              <span key={d} className={"relative grid h-[13px] place-items-center rounded-[3px] text-[6px] " + ([3, 10, 17, 24].includes(d) ? "text-[#c9c5bc]" : "")}>
                {d}
                {(d === 11 || d === 18) && (
                  <span className={"absolute inset-0 grid place-items-center rounded-[3px] bg-[#151515] font-semibold text-white " + a(d === 11 ? "lk-bk-day1" : "lk-bk-day2")}>{d}</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[7px] font-semibold">Sat 18 Oct</p>
          <div className="mt-1 space-y-1">
            {["9:00", "11:00", "13:00", "15:00"].map((t) => (
              <span key={t} className={"relative flex h-[14px] items-center justify-center rounded-[4px] border border-[#e2dfd8] text-[6.5px] " + (t === "15:00" ? "text-[#c9c5bc] line-through" : "")}>
                {t}
                {t === "11:00" && <span className={"absolute inset-0 flex items-center justify-center rounded-[4px] bg-[#eb5e28] font-semibold text-[#151515] " + a("lk-bk-slot")}>11:00</span>}
              </span>
            ))}
          </div>
          <span className={"mt-1.5 flex h-[15px] items-center justify-center rounded-[4px] bg-[#151515] text-[6.5px] font-semibold text-white " + a("lk-bk-pay")}>Pay ₦5,000 deposit</span>
        </div>
      </div>
      <div className={"absolute inset-0 z-20 grid place-items-center bg-white/85 backdrop-blur-[1px] " + a("lk-bk-done")}>
        <div className="w-[150px] rounded-[8px] border border-[#eeece7] bg-white p-2.5 text-center shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)]">
          <span className="mx-auto grid size-[18px] place-items-center rounded-full bg-[#16794a] text-white">
            <Check className="size-[10px]" strokeWidth={3} />
          </span>
          <p className="mt-1 text-[8px] font-bold">You&apos;re booked!</p>
          <p className="text-[6.5px] text-[#6b675f]">Sat 18 Oct · 11:00 · Deposit paid</p>
        </div>
      </div>
      <div className={"absolute left-1/2 top-1.5 z-30 flex w-[168px] -translate-x-1/2 items-center gap-1.5 rounded-[8px] bg-[#151515]/90 p-1.5 text-white " + a("lk-bk-note")}>
        <Bell className="size-[9px] shrink-0 text-[#f0946b]" />
        <span className="text-[6px]">Reminder: knotless braids tomorrow at 11:00</span>
      </div>
      <Cursor className={"left-[240px] top-[140px] " + a("lk-bk-cursor")} />
    </Window>
  );
}

/* 6. Portfolio: the work slides past, a visitor taps "Hire me" and the message is sent. */
function Portfolio() {
  const work = [
    ["bg-[linear-gradient(135deg,#fbe8de,#f0946b)]", "Salon booking site", "+40% bookings"],
    ["bg-[linear-gradient(135deg,#eef0ec,#9fb59a)]", "Restaurant website", "Orders on WhatsApp"],
    ["bg-[linear-gradient(135deg,#eeeff3,#9aa3c7)]", "School portal", "312 students"],
    ["bg-[linear-gradient(135deg,#f6f0ea,#d4b18c)]", "Fashion store", "Paystack checkout"],
    ["bg-[linear-gradient(135deg,#fbe8de,#f0946b)]", "Salon booking site", "+40% bookings"],
    ["bg-[linear-gradient(135deg,#eef0ec,#9fb59a)]", "Restaurant website", "Orders on WhatsApp"],
  ];
  return (
    <Window url="tunde.dev">
      <div className="flex items-center gap-2 px-3 pt-2.5">
        <span className="size-[26px] shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,#6b4a3a_0_28%,#e9d7c6_29%)]" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold leading-tight">Tunde Bakare</p>
          <p className="text-[6.5px] text-[#6b675f]">I build websites that bring businesses customers.</p>
        </div>
        <span className={"flex h-[15px] items-center rounded-full bg-[#eb5e28] px-2 text-[6.5px] font-semibold text-[#151515] " + a("lk-pf-hire")}>Hire me</span>
      </div>
      <p className="px-3 pt-2 text-[7px] font-semibold">Selected work</p>
      <div className="mt-1 overflow-hidden pl-3">
        <div className={"flex w-max gap-2 " + a("lk-pf-track")}>
          {work.map(([bg, t, r], i) => (
            <div key={i} className="w-[84px] shrink-0 rounded-[6px] border border-[#eeece7] p-1">
              <div className={`h-[44px] rounded-[4px] ${bg}`}>
                <div className="mx-1.5 mt-1.5 h-[4px] w-[60%] rounded-full bg-white/80" />
                <div className="mx-1.5 mt-1 h-[3px] w-[40%] rounded-full bg-white/60" />
              </div>
              <p className="mt-1 text-[6.5px] font-semibold">{t}</p>
              <p className="text-[6px] text-[#16794a]">{r}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="flex items-center gap-3 px-3 pt-2 text-[6.5px] text-[#6b675f]">
        <span><b className="text-[#151515]">12</b> sites shipped</span>
        <span className="flex items-center gap-1"><Stars /> from clients</span>
      </p>
      <div className={"absolute inset-0 z-20 grid place-items-center bg-white/85 " + a("lk-pf-modal")}>
        <div className="w-[150px] rounded-[8px] border border-[#eeece7] bg-white p-2.5 text-center shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)]">
          <span className="mx-auto grid size-[18px] place-items-center rounded-full bg-[#16794a] text-white">
            <Check className="size-[10px]" strokeWidth={3} />
          </span>
          <p className="mt-1 text-[8px] font-bold">Message sent</p>
          <p className="text-[6.5px] text-[#6b675f]">Tunde replies within a day.</p>
        </div>
      </div>
      <Cursor className={"left-[150px] top-[130px] " + a("lk-pf-cursor")} />
    </Window>
  );
}

const scenes: Record<SiteKind, () => ReactNode> = { landing: Landing, business: Business, store: Store, webapp: WebApp, booking: Booking, portfolio: Portfolio };

export function LiveSite({ kind, bg = "#f3f1ec" }: { kind: SiteKind; bg?: string }) {
  const Scene = scenes[kind];
  return (
    <Artboard bg={bg}>
      <Scene />
    </Artboard>
  );
}
