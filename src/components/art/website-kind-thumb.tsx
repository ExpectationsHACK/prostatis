import { CalendarDays, Check, Lock, MapPin, MessageCircle, ShoppingCart, Star, User } from "lucide-react";
import type { ReactNode } from "react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";

export type WebsiteKind = "landing" | "business" | "store" | "webapp" | "booking" | "portfolio";

const edge = "border-2 border-edge";
const shadow = "shadow-[3px_3px_0_var(--edge)]";
const t7 = "font-mono text-[7px] leading-tight";
const t8 = "font-mono text-[8px] leading-tight";
const h10 = "font-display text-[11px] font-bold leading-tight";

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className={`${edge} ${shadow} w-full overflow-hidden bg-card`}>
      <div className="flex items-center gap-1 border-b-2 border-edge bg-wash px-1.5 py-[3px]">
        <span className="size-1.5 rounded-full bg-danger" />
        <span className="size-1.5 rounded-full bg-[#e0a82e]" />
        <span className="size-1.5 rounded-full bg-success" />
        <span className={`ml-1 flex-1 truncate bg-paper px-1 ${t7} text-muted`}>{url}</span>
      </div>
      {children}
    </div>
  );
}

/** An orange callout tag naming the part of the page it sits next to. */
const Tag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`absolute z-10 ${edge} bg-brand px-1 py-px font-mono text-[7px] font-bold uppercase tracking-wide text-ink ${className}`}>{children}</span>
);

const kinds: Record<WebsiteKind, () => ReactNode> = {
  landing: () => (
    <div className="relative w-[250px]">
      <Browser url="glowlashes.ng">
        <div className="space-y-1.5 p-2 text-center">
          <p className={h10}>Lashes that last 4 weeks</p>
          <p className={`${t7} text-muted`}>Natural look · Lekki studio · from ₦18,000</p>
          <span className={`mx-auto block w-fit bg-brand px-2 py-0.5 ${t8} font-bold`}>Book on WhatsApp</span>
          <div className="flex justify-center gap-1 border-t border-line pt-1.5">
            {["“Best lashes!”", "“So natural”", "“Lasted 5 weeks”"].map((q) => <span key={q} className={`${t7} border border-line px-1`}><Star className="inline size-2 fill-[#e0a82e] text-[#e0a82e]" /> {q}</span>)}
          </div>
        </div>
      </Browser>
      <Tag className="-left-3 top-6">Offer</Tag>
      <Tag className="-right-3 top-[52px]">1 button</Tag>
      <Tag className="-left-3 bottom-1">Proof</Tag>
    </div>
  ),
  business: () => (
    <div className="relative w-[256px]">
      <Browser url="mamaskitchen.ng">
        <div className="flex items-center justify-between border-b border-line px-2 py-1">
          <span className={`${t8} font-bold`}>Mama&apos;s Kitchen</span>
          <span className={`${t7} text-muted`}>Home · Menu · About · Contact</span>
        </div>
        <div className="grid grid-cols-[1.3fr_1fr] gap-1.5 p-1.5">
          <div className="space-y-1">
            <p className={h10}>Hot lunch at your desk</p>
            <span className={`inline-flex items-center gap-0.5 bg-[#25d366] px-1.5 py-0.5 ${t7} font-bold text-white`}><MessageCircle className="size-2.5" /> Order on WhatsApp</span>
            <p className={`${t7} text-muted`}>Jollof · Egusi · Ofada</p>
          </div>
          <div className={`relative grid place-items-center border border-edge bg-[#dfe9d8]`}>
            <MapPin className="size-5 text-danger" />
            <span className={`absolute bottom-0.5 ${t7}`}>Ikeja, Lagos</span>
          </div>
        </div>
      </Browser>
      <Tag className="-right-2 -top-2">5 pages</Tag>
      <Tag className="-left-3 -bottom-2">WhatsApp</Tag>
      <Tag className="-right-3 bottom-0">Maps</Tag>
    </div>
  ),
  store: () => (
    <div className="relative w-[256px]">
      <Browser url="adireshop.ng">
        <div className="flex items-center justify-between border-b border-line px-2 py-1">
          <span className={`${t8} font-bold`}>Adire Shop</span>
          <span className={`flex items-center gap-0.5 ${t7} font-bold`}><ShoppingCart className="size-2.5" /> Cart (2)</span>
        </div>
        <div className="grid grid-cols-3 gap-1 p-1.5">
          {[["#2f4a8a", "Adire dress", "₦25,000"], ["#c4552c", "Ankara top", "₦12,500"], ["#0f4d3a", "Tote bag", "₦8,000"]].map(([c, n, p]) => (
            <div key={n} className="border border-edge">
              <div className="h-8" style={{ background: c }} />
              <p className={`${t7} px-0.5`}>{n}</p>
              <p className={`${t7} px-0.5 font-bold`}>{p}</p>
            </div>
          ))}
        </div>
        <div className="mx-1.5 mb-1.5 flex items-center justify-between bg-[#0fa958] px-1.5 py-0.5">
          <span className={`${t7} font-bold text-white`}>Pay ₦37,500 with Paystack</span>
          <Lock className="size-2.5 text-white" />
        </div>
      </Browser>
      <Tag className="-left-3 top-9">Products</Tag>
      <Tag className="-right-3 -top-2">Cart</Tag>
      <Tag className="-right-3 -bottom-2">Checkout</Tag>
    </div>
  ),
  webapp: () => (
    <div className="relative w-[256px]">
      <Browser url="app.schoolhub.ng/dashboard">
        <div className="flex">
          <div className="w-14 space-y-1 border-r border-line bg-night p-1">
            {["Dashboard", "Students", "Results", "Fees"].map((l, i) => <p key={l} className={`${t7} ${i === 0 ? "bg-brand text-ink" : "text-paper/80"} px-0.5`}>{l}</p>)}
          </div>
          <div className="flex-1 space-y-1 p-1.5">
            <p className={`flex items-center gap-1 ${t8} font-bold`}><User className="size-2.5" /> Welcome back, Mrs Ade</p>
            <div className="grid grid-cols-3 gap-1">
              {[["312", "students"], ["94%", "fees paid"], ["18", "classes"]].map(([n, l]) => <div key={l} className="border border-edge p-0.5 text-center"><p className={h10}>{n}</p><p className={t7}>{l}</p></div>)}
            </div>
            <div className="flex h-7 items-end gap-0.5 border border-line p-0.5">{[40, 65, 50, 80, 70, 90].map((h, i) => <span key={i} className="flex-1 bg-brand" style={{ height: `${h}%` }} />)}</div>
          </div>
        </div>
      </Browser>
      <Tag className="-right-3 -top-2">Login</Tag>
      <Tag className="-left-3 bottom-8">Dashboard</Tag>
      <Tag className="-right-3 bottom-0">Database</Tag>
    </div>
  ),
  booking: () => (
    <div className="relative w-[256px]">
      <Browser url="braidsbytemi.ng/book">
        <div className="grid grid-cols-2 gap-1.5 p-1.5">
          <div className="space-y-1">
            <p className={`flex items-center gap-0.5 ${t8} font-bold`}><CalendarDays className="size-2.5" /> Pick a time</p>
            <div className="grid grid-cols-3 gap-0.5">
              {["9:00", "11:00", "13:00", "15:00", "17:00", "19:00"].map((s, i) => <span key={s} className={`border border-edge text-center ${t7} ${i === 1 ? "bg-brand font-bold" : i === 3 ? "bg-wash text-muted line-through" : ""}`}>{s}</span>)}
            </div>
          </div>
          <div className="space-y-1 border-l border-line pl-1.5">
            <p className={`${t8} font-bold`}>Knotless braids</p>
            <p className={`${t7} text-muted`}>Sat · 11:00 · 4 hrs</p>
            <span className={`block bg-[#0fa958] px-1 py-0.5 text-center ${t7} font-bold text-white`}>Pay ₦5,000 deposit</span>
            <p className={`${t7} text-success`}><Check className="inline size-2" /> Reminder 24h before</p>
          </div>
        </div>
      </Browser>
      <Tag className="-left-3 -top-2">Calendar</Tag>
      <Tag className="-right-3 top-9">Deposit</Tag>
      <Tag className="-right-3 bottom-0">Reminder</Tag>
    </div>
  ),
  portfolio: () => (
    <div className="relative w-[256px]">
      <Browser url="tunde.dev">
        <div className="space-y-1 p-1.5">
          <div className="flex items-center gap-1.5">
            <span className="grid size-6 place-items-center rounded-full border-2 border-edge bg-brand"><User className="size-3" /></span>
            <div>
              <p className={h10}>Tunde — web developer</p>
              <p className={`${t7} text-muted`}>Websites that bring customers</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[["#f3d9c4", "Salon · +40% bookings"], ["#d6e4d0", "Store · ₦2.1m sales"], ["#dcdcf2", "School portal"]].map(([c, l]) => (
              <div key={l} className="border border-edge">
                <div className="h-6" style={{ background: c }} />
                <p className={`${t7} px-0.5`}>{l}</p>
              </div>
            ))}
          </div>
          <span className={`block w-fit bg-ink px-1.5 py-0.5 ${t8} font-bold text-paper`}>Hire me →</span>
        </div>
      </Browser>
      <Tag className="-right-3 top-7">Best work</Tag>
      <Tag className="-right-3 top-[82px]">Results</Tag>
      <Tag className="left-[84px] -bottom-2">Hire me</Tag>
    </div>
  ),
};

export function WebsiteKindThumb({ kind, tone }: { kind: WebsiteKind; tone: Tone }) {
  const K = kinds[kind];
  return (
    <Artboard bg={tones[tone].bg}>
      <div className="flex h-full w-full items-center justify-center p-4">
        <K />
      </div>
    </Artboard>
  );
}

