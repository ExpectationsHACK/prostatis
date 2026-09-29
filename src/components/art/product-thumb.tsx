import {
  BedDouble,
  Bell,
  Bike,
  Bot,
  Briefcase,
  Camera,
  Car,
  Check,
  Church,
  CirclePlay,
  Clock,
  Dumbbell,
  GraduationCap,
  Heart,
  HeartHandshake,
  House,
  Lock,
  Mail,
  MapPin,
  Package,
  QrCode,
  Scale,
  Scissors,
  Search,
  Shirt,
  ShoppingBag,
  Star,
  Stethoscope,
  Truck,
  User,
  Users,
  Utensils,
} from "lucide-react";
import type { ReactNode } from "react";
import { tones, type Tone } from "../cover";
import { Artboard } from "./artboard";

/* Print-style primitives */
const edge = "border-2 border-edge";
const shadow = "shadow-[3px_3px_0_var(--edge)]";
const t6 = "font-mono text-[6px] leading-tight";
const t7 = "font-mono text-[7px] leading-tight";
const h8 = "font-display text-[9px] font-bold leading-tight";

function Browser({ url, children, nav }: { url: string; children: ReactNode; nav?: ReactNode }) {
  return (
    <div className={`${edge} ${shadow} w-full overflow-hidden bg-card`}>
      <div className="flex items-center gap-1 border-b-2 border-edge bg-wash px-1.5 py-[3px]">
        <span className="size-1.5 rounded-full bg-danger" />
        <span className="size-1.5 rounded-full bg-[#e0a82e]" />
        <span className="size-1.5 rounded-full bg-success" />
        <span className={`ml-1 flex-1 truncate bg-paper px-1 ${t6} text-muted`}>{url}</span>
      </div>
      {nav}
      <div className="p-1.5">{children}</div>
    </div>
  );
}
function Nav({ brand, cta, dark }: { brand: string; cta?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between border-b border-line px-1.5 py-[3px] ${dark ? "bg-night" : ""}`}>
      <span className={`${t7} font-bold ${dark ? "text-paper" : "text-ink"}`}>{brand}</span>
      {cta && <span className={`bg-brand px-1 ${t6} font-bold text-ink`}>{cta}</span>}
    </div>
  );
}
function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${edge} ${shadow} flex h-full w-[42%] flex-col rounded-[10px] bg-card p-1 ${className}`}>
      <span className="mx-auto mb-0.5 h-1 w-5 rounded-full bg-edge/60" />
      <div className="flex-1 overflow-hidden rounded-[6px] bg-paper">{children}</div>
    </div>
  );
}
function Img({ c, icon, h = "h-7", className = "" }: { c: string; icon?: ReactNode; h?: string; className?: string }) {
  return <div className={`grid place-items-center ${h} ${className}`} style={{ background: c }}>{icon}</div>;
}
const Bar = ({ w = "100%", c = "bg-wash" }: { w?: string; c?: string }) => <span className={`block h-1 ${c}`} style={{ width: w }} />;
const ic = "size-3.5 text-ink/70";

/* ---------- products ---------- */
const thumbs = {
  coach: () => (
    <Browser url="kemicoaching.com" nav={<Nav brand="Kemi Coaching" cta="Book a call" />}>
      <div className="flex items-center gap-1.5">
        <div className="min-w-0 flex-1">
          <p className={h8}>Lose 8kg eating Nigerian food</p>
          <p className={`${t6} mt-0.5 text-muted`}>12-week coaching for busy mums</p>
          <span className={`mt-1 inline-block bg-brand px-1 ${t6} font-bold`}>Book a free call →</span>
        </div>
        <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-edge bg-[#ffd0b0]"><User className="size-5 text-ink/70" /></div>
      </div>
      <p className={`${t6} mt-1 border-l-2 border-brand pl-1 italic text-muted`}>“Down 9kg in 3 months!” — Bisi</p>
    </Browser>
  ),
  store: () => (
    <Browser url="adashop.ng" nav={<Nav brand="ADA SHOP" cta="🛒 2" />}>
      <div className="grid grid-cols-3 gap-1">
        {[["#ffe1cf", "Tote bag", "₦18,500"], ["#dfe7ff", "Sneakers", "₦42,000"], ["#e6f3ea", "Perfume", "₦25,000"]].map(([c, n, p]) => (
          <div key={n} className="border border-edge/40">
            <Img c={c} icon={<ShoppingBag className={ic} />} h="h-6" />
            <p className={`${t6} px-0.5 text-ink`}>{n}</p>
            <p className={`${t6} px-0.5 font-bold text-ink`}>{p}</p>
            <p className={`bg-ink text-center ${t6} text-paper`}>Add to cart</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  restaurant: () => (
    <Browser url="mamaskitchen.ng" nav={<Nav brand="Mama's Kitchen" cta="Order" />}>
      <p className={`${t7} font-bold uppercase tracking-wider text-brand-text`}>Menu</p>
      {[["Jollof rice & chicken", "₦3,500"], ["Pounded yam & egusi", "₦4,000"], ["Pepper soup (goat)", "₦3,000"]].map(([d, p]) => (
        <div key={d} className="mt-0.5 flex items-center gap-1">
          <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-[#ffd0b0]"><Utensils className="size-2 text-ink/70" /></span>
          <span className={`${t6} flex-1 text-ink`}>{d}</span>
          <span className="flex-1 border-b border-dotted border-edge/40" />
          <span className={`${t6} font-bold text-ink`}>{p}</span>
        </div>
      ))}
    </Browser>
  ),
  realestate: () => (
    <Browser url="adeolaproperties.ng" nav={<Nav brand="Adeola Properties" />}>
      <div className={`flex border border-edge ${t6}`}>
        <span className="flex-1 px-1 text-muted">Lekki · 3 bed · Any price</span>
        <span className="bg-brand px-1 font-bold"><Search className="inline size-2" /> Search</span>
      </div>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {[["₦85,000,000", "3 bed · Lekki"], ["₦4.5m/yr", "2 bed · Yaba"]].map(([p, d]) => (
          <div key={p} className="border border-edge/40">
            <Img c="#dfe7ff" icon={<House className={ic} />} h="h-5" />
            <p className={`${t6} px-0.5 font-bold text-ink`}>{p}</p>
            <p className={`${t6} px-0.5 text-muted`}>{d}</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  hotel: () => (
    <Browser url="palmshortlets.com" nav={<Nav brand="Palm Shortlets" cta="Book" />}>
      <div className={`grid grid-cols-3 gap-0.5 border border-edge ${t6}`}>
        <span className="px-0.5">Check-in 12 Oct</span><span className="px-0.5">Check-out 15 Oct</span><span className="bg-brand px-0.5 font-bold">2 guests</span>
      </div>
      <div className="mt-1 flex gap-1 border border-edge/40">
        <Img c="#e6f3ea" icon={<BedDouble className={ic} />} className="w-10" h="h-8" />
        <div className="py-0.5">
          <p className={`${t7} font-bold text-ink`}>Deluxe apartment</p>
          <p className={`${t6} text-muted`}>Wi-Fi · 24h power · pool</p>
          <p className={`${t6} font-bold text-ink`}>₦65,000 / night</p>
        </div>
      </div>
    </Browser>
  ),
  salon: () => (
    <div className="flex h-full items-center gap-2">
      <Phone>
        <p className={`bg-[#b8336a] px-1 py-0.5 ${t6} font-bold text-paper`}>Glow Studio</p>
        <div className="p-1">
          <p className={`${t6} font-bold text-ink`}><Scissors className="inline size-2" /> Knotless braids</p>
          <p className={`${t6} text-muted`}>4 hrs · ₦30,000</p>
          <div className="mt-0.5 grid grid-cols-3 gap-0.5">
            {["9:00", "11:00", "1:00", "3:00", "5:00", "6:00"].map((x, i) => <span key={x} className={`border border-edge/50 text-center ${t6} ${i === 2 ? "bg-brand font-bold" : ""}`}>{x}</span>)}
          </div>
          <p className={`mt-0.5 bg-ink text-center ${t6} text-paper`}>Pay ₦5,000 deposit</p>
        </div>
      </Phone>
      <p className={`${h8} max-w-[40%] text-ink`}>Salon booking</p>
    </div>
  ),
  clinic: () => (
    <Browser url="smilecaredental.ng" nav={<Nav brand="SmileCare Dental" cta="Book" />}>
      <div className="flex gap-1.5">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#dff1f7]"><Stethoscope className="size-4 text-ink/70" /></div>
        <div className="flex-1">
          <p className={`${t7} font-bold text-ink`}>Dr. Okafor · Dentist</p>
          <p className={`${t6} text-muted`}>Next available: Tue 10:30am</p>
          <div className="mt-0.5 flex gap-0.5">{["Cleaning", "Braces", "Whitening"].map((x) => <span key={x} className={`border border-edge/50 px-0.5 ${t6}`}>{x}</span>)}</div>
        </div>
      </div>
      <p className={`mt-1 bg-[#0f4d3a] text-center ${t6} font-bold text-paper`}>Book appointment</p>
    </Browser>
  ),
  school: () => (
    <Browser url="brightfutureschools.edu.ng" nav={<Nav brand="Bright Future Schools" cta="Apply" />}>
      <div className="flex items-center gap-1.5">
        <div className="grid size-9 shrink-0 place-items-center border-2 border-edge bg-[#2a2e6e]"><GraduationCap className="size-5 text-paper" /></div>
        <div>
          <p className={h8}>Admissions open for 2026/27</p>
          <p className={`${t6} text-muted`}>Nursery · Primary · Secondary</p>
        </div>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-0.5">{["Programmes", "Fees", "Gallery"].map((x) => <span key={x} className={`border border-edge/40 py-0.5 text-center ${t6}`}>{x}</span>)}</div>
    </Browser>
  ),
  church: () => (
    <Browser url="gracechapel.org" nav={<Nav brand="Grace Chapel" cta="Give" />}>
      <div className="flex items-center gap-1.5">
        <Church className="size-6 shrink-0 text-ink/70" />
        <div>
          <p className={h8}>Join us this Sunday</p>
          <p className={`${t6} text-muted`}>Services: 7:30am · 9:30am · 11:30am</p>
        </div>
      </div>
      <div className="mt-1 flex gap-1">
        <span className={`flex-1 border border-edge/40 px-1 ${t6}`}><CirclePlay className="inline size-2" /> Watch live</span>
        <span className={`flex-1 border border-edge/40 px-1 ${t6}`}>Sermons</span>
      </div>
    </Browser>
  ),
  gym: () => (
    <Browser url="fitzone.ng" nav={<Nav brand="FITZONE" cta="Join" dark />}>
      <p className={`${t7} font-bold text-ink`}><Dumbbell className="inline size-2.5" /> Class timetable</p>
      <div className="mt-0.5 grid grid-cols-4 gap-0.5">
        {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
          <div key={d} className="border border-edge/40">
            <p className={`bg-wash text-center ${t6} font-bold`}>{d}</p>
            <p className={`text-center ${t6} ${i % 2 ? "bg-brand" : ""}`}>{["HIIT", "Yoga", "Boxing", "Spin"][i]}</p>
            <p className={`text-center ${t6} text-muted`}>6:00</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  tickets: () => (
    <div className="flex h-full items-center gap-2">
      <div className={`${edge} ${shadow} flex w-[70%] bg-card`}>
        <div className="flex-1 p-1.5">
          <p className={`${t6} uppercase text-muted`}>Afrobeats Night</p>
          <p className={h8}>Sat 14 Dec · Eko Hotel</p>
          <p className={`${t6} mt-0.5 font-bold text-ink`}>VIP · ₦50,000</p>
        </div>
        <div className="grid place-items-center border-l-2 border-dashed border-edge px-1.5"><QrCode className="size-7 text-ink" /></div>
      </div>
      <p className={`${h8} text-ink`}>Event tickets</p>
    </div>
  ),
  photographer: () => (
    <Browser url="lensbytobi.com" nav={<Nav brand="Lens by Tobi" cta="Book shoot" dark />}>
      <div className="grid grid-cols-3 gap-0.5">
        {["#2a2e6e", "#b8336a", "#0f4d3a", "#ff6719", "#1b1714", "#e0a82e"].map((c, i) => <Img key={i} c={c} h="h-5" icon={i === 1 ? <Camera className="size-3 text-paper/80" /> : undefined} />)}
      </div>
      <p className={`${t6} mt-0.5 text-muted`}>Weddings · Portraits · Brands</p>
    </Browser>
  ),
  portfolio: () => (
    <Browser url="tunde.dev" nav={<Nav brand="Tunde A." cta="Hire me" />}>
      <p className={h8}>I build websites that bring customers.</p>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {[["Case study", "Clinic site +40% bookings"], ["Case study", "Store: ₦2m first month"]].map(([k, d]) => (
          <div key={d} className="border border-edge/40 p-0.5">
            <p className={`${t6} uppercase text-brand-text`}>{k}</p>
            <p className={`${t6} font-bold text-ink`}>{d}</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  lawfirm: () => (
    <Browser url="okekelegal.com" nav={<Nav brand="Okeke & Partners" dark />}>
      <div className="flex items-center gap-1.5">
        <Scale className="size-6 shrink-0 text-ink/70" />
        <div>
          <p className={h8}>Corporate & property law, Lagos</p>
          <p className={`${t6} text-muted`}>Company registration · Tenancy · Contracts</p>
        </div>
      </div>
      <p className={`mt-1 border border-edge text-center ${t6} font-bold`}>Book a consultation</p>
    </Browser>
  ),
  cars: () => (
    <Browser url="autoking.ng" nav={<Nav brand="AutoKing" cta="Sell your car" />}>
      <div className="grid grid-cols-2 gap-1">
        {[["Toyota Camry 2019", "₦18.5m"], ["Lexus RX 350 2018", "₦32m"]].map(([n, p]) => (
          <div key={n} className="border border-edge/40">
            <Img c="#dfe7ff" icon={<Car className={ic} />} h="h-5" />
            <p className={`${t6} px-0.5 text-ink`}>{n}</p>
            <p className={`${t6} px-0.5 font-bold text-ink`}>{p} · Foreign used</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  logistics: () => (
    <Browser url="quickship.ng/track" nav={<Nav brand="QuickShip" />}>
      <div className={`flex border border-edge ${t6}`}><span className="flex-1 px-1">QS-48213</span><span className="bg-brand px-1 font-bold">Track</span></div>
      <div className="mt-1 flex items-center">
        {["Picked up", "In transit", "Out for delivery", "Delivered"].map((s, i, a) => (
          <div key={s} className="flex flex-1 items-center">
            <span className={`grid size-3 shrink-0 place-items-center rounded-full border border-edge ${i < 3 ? "bg-success" : "bg-card"}`}>{i < 3 && <Check className="size-2 text-paper" strokeWidth={4} />}</span>
            {i < a.length - 1 && <span className={`h-0.5 flex-1 ${i < 2 ? "bg-success" : "bg-line"}`} />}
          </div>
        ))}
      </div>
      <p className={`${t6} mt-0.5 text-muted`}><Truck className="inline size-2" /> Out for delivery · ETA 2:30pm</p>
    </Browser>
  ),
  fashion: () => (
    <Browser url="zaraadire.com" nav={<Nav brand="ZARA ADIRE" cta="Shop" dark />}>
      <div className="flex gap-1">
        <Img c="#2a2e6e" h="h-12" className="w-1/2" icon={<Shirt className="size-5 text-paper/80" />} />
        <div className="flex-1">
          <p className={`${t6} uppercase text-muted`}>New collection</p>
          <p className={h8}>Adire kaftans</p>
          <p className={`${t6} font-bold`}>from ₦35,000</p>
          <p className={`mt-0.5 bg-ink text-center ${t6} text-paper`}>Shop now</p>
        </div>
      </div>
    </Browser>
  ),
  ngo: () => (
    <Browser url="feedafamily.org" nav={<Nav brand="Feed A Family" cta="Donate" />}>
      <p className={h8}><HeartHandshake className="inline size-3" /> Help 500 families this Christmas</p>
      <div className="mt-1 h-2 border border-edge bg-wash"><div className="h-full w-[68%] bg-success" /></div>
      <p className={`${t6} mt-0.5 text-muted`}>₦6.8m of ₦10m raised · 412 donors</p>
      <div className="mt-0.5 flex gap-0.5">{["₦5k", "₦10k", "₦25k"].map((x, i) => <span key={x} className={`flex-1 border border-edge/50 text-center ${t6} ${i === 1 ? "bg-brand font-bold" : ""}`}>{x}</span>)}</div>
    </Browser>
  ),
  fooddelivery: () => (
    <div className="flex h-full items-center justify-center gap-2">
      <Phone>
        <p className={`bg-brand px-1 py-0.5 ${t6} font-bold`}>ChopNow</p>
        <div className="space-y-0.5 p-1">
          {[["Suya Spot", "25 min"], ["Chicken Republic", "30 min"], ["Amala Place", "20 min"]].map(([n, m]) => (
            <div key={n} className="flex items-center gap-0.5 border border-edge/40 p-0.5">
              <Utensils className="size-2 text-ink/70" />
              <span className={`${t6} flex-1`}>{n}</span>
              <span className={`${t6} text-muted`}>{m}</span>
            </div>
          ))}
        </div>
      </Phone>
      <Bike className="size-8 text-ink/70" />
    </div>
  ),
  course: () => (
    <Browser url="learnexcel.ng/course" nav={<Nav brand="LearnExcel" />}>
      <div className="flex gap-1">
        <div className="grid h-10 w-[55%] place-items-center bg-night"><CirclePlay className="size-5 text-paper" /></div>
        <div className="flex-1 space-y-0.5">
          {["1. Basics", "2. Formulas", "3. Pivot tables"].map((l, i) => <p key={l} className={`${t6} ${i === 1 ? "bg-brand font-bold" : ""}`}>{i === 0 && <Check className="inline size-2 text-success" />} {l}</p>)}
        </div>
      </div>
      <div className="mt-1 h-1.5 border border-edge bg-wash"><div className="h-full w-[40%] bg-success" /></div>
    </Browser>
  ),
  saas: () => (
    <Browser url="payflow.app" nav={<Nav brand="PayFlow" cta="Start free" />}>
      <p className={`${h8} text-center`}>Get paid faster, Nigerian freelancers</p>
      <div className={`mx-auto mt-1 w-[85%] ${edge} bg-sunk p-1`}>
        <div className="flex items-end gap-0.5">{[30, 45, 35, 60, 75].map((hh, i) => <span key={i} className="flex-1 bg-brand" style={{ height: hh / 5 }} />)}</div>
      </div>
    </Browser>
  ),
  jobs: () => (
    <Browser url="naijajobs.ng" nav={<Nav brand="NaijaJobs" cta="Post a job" />}>
      {[["Frontend Developer", "Lagos · Remote", "₦600k"], ["Sales Executive", "Abuja", "₦250k"], ["Customer Support", "Port Harcourt", "₦180k"]].map(([r, l, p]) => (
        <div key={r} className="mb-0.5 flex items-center gap-1 border border-edge/40 px-1 py-0.5">
          <Briefcase className="size-2.5 text-ink/70" />
          <span className={`${t6} flex-1 font-bold`}>{r}</span>
          <span className={`${t6} text-muted`}>{l}</span>
          <span className={`${t6} font-bold`}>{p}</span>
        </div>
      ))}
    </Browser>
  ),
  blog: () => (
    <Browser url="techinlagos.blog" nav={<Nav brand="Tech in Lagos" />}>
      <div className="flex gap-1">
        <Img c="#ff6719" h="h-10" className="w-[45%]" />
        <div className="flex-1">
          <p className={`${t6} uppercase text-brand-text`}>Startups</p>
          <p className={h8}>How Lagos SMEs are using AI in 2026</p>
          <p className={`${t6} text-muted`}>6 min read</p>
        </div>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-0.5">{[0, 1, 2].map((i) => <Img key={i} c={["#2a2e6e", "#0f4d3a", "#e0a82e"][i]} h="h-3" />)}</div>
    </Browser>
  ),
  dashboard: () => (
    <Browser url="app.salesboard.ng" nav={<Nav brand="SalesBoard" dark />}>
      <div className="grid grid-cols-3 gap-0.5">{[["Revenue", "₦4.2m"], ["Orders", "318"], ["New", "+24%"]].map(([k, v]) => <div key={k} className="border border-edge/40 p-0.5"><p className={`${t6} text-muted`}>{k}</p><p className={`${t7} font-bold`}>{v}</p></div>)}</div>
      <svg viewBox="0 0 100 20" className="mt-1 h-5 w-full" aria-hidden><polyline points="0,18 15,14 30,15 45,9 60,11 75,5 100,2" fill="none" stroke="var(--brand)" strokeWidth="2.5" /></svg>
    </Browser>
  ),
  crm: () => (
    <Browser url="app.leadpipe.ng" nav={<Nav brand="LeadPipe CRM" />}>
      <div className="grid grid-cols-3 gap-0.5">
        {[["New", 3], ["Proposal", 2], ["Won", 1]].map(([c, cnt]) => (
          <div key={c as string} className="bg-sunk p-0.5">
            <p className={`${t6} font-bold`}>{c}</p>
            {Array.from({ length: cnt as number }).map((_, i) => <div key={i} className={`mt-0.5 border border-edge/50 bg-card px-0.5 ${t6}`}>{["SmileCare", "FitZone", "Kora Foods"][i]}</div>)}
          </div>
        ))}
      </div>
    </Browser>
  ),
  invoicing: () => (
    <Browser url="app.billme.ng" nav={<Nav brand="BillMe" cta="+ Get paid" />}>
      {[["INV-014", "Brightside Dental", "$1,200", "Paid"], ["INV-015", "Kora Foods", "₦450,000", "Due"], ["INV-016", "FitZone", "$800", "Overdue"]].map(([n, c, a, st]) => (
        <div key={n} className="mb-0.5 flex items-center gap-1 border-b border-line py-0.5">
          <span className={`${t6} w-8 text-muted`}>{n}</span>
          <span className={`${t6} flex-1`}>{c}</span>
          <span className={`${t6} font-bold`}>{a}</span>
          <span className={`${t6} px-0.5 font-bold ${st === "Paid" ? "bg-success/20 text-success" : st === "Due" ? "bg-wash" : "bg-danger/15 text-danger"}`}>{st}</span>
        </div>
      ))}
    </Browser>
  ),
  property: () => (
    <Browser url="rentease.ng/portal" nav={<Nav brand="RentEase" dark />}>
      <p className={`${t7} font-bold`}><House className="inline size-2.5" /> Flat 3B · Yaba</p>
      <div className="mt-0.5 grid grid-cols-2 gap-0.5">
        <div className="border border-edge/40 p-0.5"><p className={`${t6} text-muted`}>Rent due</p><p className={`${t7} font-bold`}>₦1.2m · 1 Jan</p></div>
        <div className="border border-edge/40 p-0.5"><p className={`${t6} text-muted`}>Maintenance</p><p className={`${t7} font-bold`}>1 open</p></div>
      </div>
      <p className={`mt-0.5 bg-brand text-center ${t6} font-bold`}>Pay rent</p>
    </Browser>
  ),
  wabot: () => (
    <div className="flex h-full items-center justify-center gap-2">
      <Phone>
        <p className={`bg-[#0f4d3a] px-1 py-0.5 ${t6} font-bold text-paper`}>Mama&apos;s Kitchen</p>
        <div className="space-y-0.5 bg-[#e7ddd0] p-1">
          <p className={`w-[90%] bg-card px-0.5 ${t6}`}>Hi! 1. Menu 2. Order 3. Track</p>
          <p className={`ml-auto w-6 bg-[#d7f5c4] px-0.5 text-right ${t6}`}>2</p>
          <p className={`w-[90%] bg-card px-0.5 ${t6}`}>What would you like? 🍛</p>
          <p className={`ml-auto w-[70%] bg-[#d7f5c4] px-0.5 ${t6}`}>2 jollof + chicken</p>
          <p className={`w-[90%] bg-card px-0.5 ${t6}`}>₦7,000 · Pay here →</p>
        </div>
      </Phone>
      <Bot className="size-8 text-ink/70" />
    </div>
  ),
  supportagent: () => (
    <Browser url="quickship.ng" nav={<Nav brand="QuickShip" />}>
      <div className="flex justify-end">
        <div className={`${edge} w-[70%] bg-card`}>
          <p className={`flex items-center gap-0.5 bg-accent px-1 py-0.5 ${t6} font-bold text-accent-ink`}><Bot className="size-2.5" /> Support · online</p>
          <div className="space-y-0.5 p-0.5">
            <p className={`w-[85%] bg-sunk px-0.5 ${t6}`}>Where is my order?</p>
            <p className={`ml-auto w-[85%] bg-brand-wash px-0.5 ${t6}`}>QS-48213 is out for delivery 🚚</p>
          </div>
        </div>
      </div>
    </Browser>
  ),
  leadgen: () => (
    <div className={`${edge} ${shadow} w-full overflow-hidden bg-card`}>
      <p className={`bg-[#0f4d3a] px-1 py-0.5 ${t6} font-bold text-paper`}>Prospects — Dental clinics, Lagos</p>
      <div className={`grid grid-cols-[1.3fr_1fr_0.8fr_0.5fr] bg-wash ${t6} font-bold`}>{["Business", "Area", "Website", "Score"].map((h) => <span key={h} className="border-r border-line px-0.5">{h}</span>)}</div>
      {[["SmileCare", "Lekki", "none", "5"], ["DentPro", "Ikeja", "old", "4"], ["BrightTeeth", "Yaba", "none", "5"], ["OralPlus", "VI", "good", "2"]].map((r) => (
        <div key={r[0]} className={`grid grid-cols-[1.3fr_1fr_0.8fr_0.5fr] border-t border-line ${t6}`}>{r.map((c, j) => <span key={j} className={`border-r border-line px-0.5 ${j === 3 && Number(c) >= 4 ? "font-bold text-success" : ""}`}>{c}</span>)}</div>
      ))}
    </div>
  ),
  gbp: () => (
    <div className="flex w-full gap-1.5">
      <div className="relative w-[45%] border-2 border-edge bg-[#e9efe4]">
        <div className="h-full min-h-14 w-full bg-[linear-gradient(90deg,transparent_45%,#fff_45%,#fff_52%,transparent_52%),linear-gradient(0deg,transparent_40%,#fff_40%,#fff_48%,transparent_48%)]" />
        <MapPin className="absolute left-[40%] top-1 size-5 fill-brand text-edge" />
      </div>
      <div className={`${edge} ${shadow} flex-1 bg-white p-1`}>
        <p className={`${t7} font-bold`}>Glow Beauty Studio</p>
        <p className={`${t6} text-[#e0a82e]`}>4.9 ★★★★★ (212)</p>
        <p className={`${t6} text-muted`}>Beauty salon · Lekki</p>
        <p className={`${t6} text-success`}>Open · Closes 7pm</p>
        <div className="mt-0.5 flex gap-0.5">{["Call", "Directions", "Book"].map((x) => <span key={x} className={`border border-edge/50 px-0.5 ${t6}`}>{x}</span>)}</div>
      </div>
    </div>
  ),
  newsletter: () => (
    <div className="flex w-full items-center gap-1.5">
      <div className={`${edge} ${shadow} w-[55%] bg-card`}>
        <p className={`bg-brand px-1 py-0.5 ${t6} font-bold`}><Mail className="inline size-2" /> Weekly deals</p>
        <div className="space-y-0.5 p-1"><Bar w="90%" /><Bar w="70%" /><Img c="#ffe1cf" h="h-4" /><Bar w="80%" /></div>
      </div>
      <div className="flex-1 space-y-0.5">
        {[["Sent", "2,410"], ["Opened", "48%"], ["Clicked", "9%"]].map(([k, v]) => <div key={k} className={`flex justify-between border border-edge/50 bg-card px-1 ${t6}`}><span>{k}</span><b>{v}</b></div>)}
      </div>
    </div>
  ),
  reminders: () => (
    <div className="flex h-full items-center justify-center gap-2">
      <Phone>
        <div className="space-y-0.5 p-1">
          <p className={`flex items-center gap-0.5 ${t6} font-bold`}><Bell className="size-2" /> Reminder</p>
          <p className={`bg-card px-0.5 ${t6} border border-edge/40`}>Hi Bisi, your dental check-up is tomorrow at 10:30am. Reply 1 to confirm, 2 to reschedule.</p>
          <p className={`ml-auto w-5 bg-[#d7f5c4] text-center ${t6}`}>1</p>
          <p className={`bg-card px-0.5 ${t6} border border-edge/40`}>Confirmed ✓ See you!</p>
        </div>
      </Phone>
      <Clock className="size-8 text-ink/70" />
    </div>
  ),
  wedding: () => (
    <Browser url="tolaandsegun.com" nav={<Nav brand="Tola & Segun" cta="RSVP" />}>
      <p className={`text-center ${h8}`}><Heart className="inline size-3 fill-[#b8336a] text-[#b8336a]" /> We&apos;re getting married</p>
      <p className={`text-center ${t6} text-muted`}>Sat 20 Dec 2026 · Ibadan</p>
      <div className="mt-1 grid grid-cols-3 gap-0.5">{["Our story", "Venue", "Registry"].map((x) => <span key={x} className={`border border-edge/40 py-0.5 text-center ${t6}`}>{x}</span>)}</div>
    </Browser>
  ),
  membership: () => (
    <Browser url="bookclub.ng/members" nav={<Nav brand="Lagos Book Club" />}>
      <div className="flex items-center gap-1.5">
        <Lock className="size-5 shrink-0 text-ink/70" />
        <div>
          <p className={h8}>Members area</p>
          <p className={`${t6} text-muted`}>₦5,000/month · cancel any time</p>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-0.5"><Users className="size-2.5 text-ink/70" /><span className={`${t6}`}>Next meetup · Sat 5pm</span></div>
    </Browser>
  ),
  pharmacy: () => (
    <Browser url="healthplus.ng" nav={<Nav brand="MedsPlus Pharmacy" cta="🛒" />}>
      <div className={`flex border border-edge ${t6}`}><span className="flex-1 px-1 text-muted">Search medicines…</span><Search className="size-2.5" /></div>
      <div className="mt-1 grid grid-cols-3 gap-0.5">
        {[["Vitamin C", "₦2,500"], ["Paracetamol", "₦800"], ["BP monitor", "₦28,000"]].map(([n, p]) => (
          <div key={n} className="border border-edge/40">
            <Img c="#dff1f7" icon={<Package className="size-3 text-ink/70" />} h="h-4" />
            <p className={`${t6} px-0.5`}>{n}</p>
            <p className={`${t6} px-0.5 font-bold`}>{p}</p>
          </div>
        ))}
      </div>
    </Browser>
  ),
  reviews: () => (
    <Browser url="kora.ng/reviews" nav={<Nav brand="Kora Foods" />}>
      <p className={`${h8}`}>4.8 <Star className="inline size-2.5 fill-[#e0a82e] text-[#e0a82e]" /> from 1,240 reviews</p>
      {["“Best jollof in Ikeja!”", "“Delivery was fast.”"].map((q) => <p key={q} className={`mt-0.5 border-l-2 border-brand pl-1 ${t6}`}>{q}</p>)}
      <p className={`mt-0.5 ${t6} text-muted`}>Auto-requested after every order</p>
    </Browser>
  ),
};

export type ThumbKind = keyof typeof thumbs;

export function ProductThumb({ kind, tone }: { kind: ThumbKind; tone: Tone }) {
  const T = thumbs[kind];
  return (
    <Artboard bg={tones[tone].bg}>
      <div className="flex h-full w-full items-center justify-center p-4">
        <T />
      </div>
    </Artboard>
  );
}
