import { Award, Check, LayoutDashboard, Lock, MessageCircle, Sparkles } from "lucide-react";
import { Artboard } from "./artboard";
import { at, Box, Line, loop, m, Phone, Stage, t, Tick, Win } from "./kit";

/** The four "How it works" scenes, each a short animated story on the 320×200 Artboard. */
export type Step = "enroll" | "build" | "pitch" | "paid";

const scenes: Record<Step, () => React.ReactNode> = {
  // Pay once, everything unlocks.
  enroll: () => (
    <Stage d={8} className="gap-3">
      <Box className="w-[138px] p-2.5">
        <p className={`${t.xs} text-[#8a857b]`}>STEINARK · Fast Track</p>
        <p className="mt-0.5 text-[18px] font-bold">₦15,000</p>
        <div className="mt-1.5 space-y-1">
          {["Card", "Bank transfer", "USSD"].map((x, i) => (
            <span key={x} className={`flex items-center gap-1 rounded-[4px] border border-[#e4e0d8] px-1.5 py-[2px] ${t.xs} ` + (i === 1 ? m("mark") : "")} style={i === 1 ? at(0.4, { off: "#fff", on: "#fdeee6" }) : undefined}>
              <span className="size-[6px] rounded-full border border-[#8a857b]" /> {x}
            </span>
          ))}
        </div>
        <span className={`mt-1.5 block rounded-[5px] bg-[#0ba4db] py-[3px] text-center ${t.xs} font-semibold text-white ` + m("press")} style={at(1.3)}>Pay ₦15,000</span>
      </Box>
      <div className="space-y-1.5">
        <Box className={"flex items-center gap-1.5 bg-[#e6f4ec] px-2 py-1.5 " + m("pop")} style={at(2)}>
          <Tick /> <span className={`${t.sm} font-semibold text-[#16794a]`}>Payment successful</span>
        </Box>
        {[[LayoutDashboard, "Dashboard"], [Sparkles, "Lesson 1"], [MessageCircle, "WhatsApp group"]].map(([I, l], i) => {
          const Icon = I as typeof Lock;
          return (
            <Box key={l as string} className={"flex items-center gap-1.5 px-2 py-1 " + m("left")} style={at(2.6 + i * 0.35)}>
              <Icon className="size-3 text-[#b8400f]" /> <span className={`${t.sm} font-semibold`}>{l as string}</span>
              <span className={`ml-auto ${t.xs} text-[#16794a]`}>unlocked</span>
            </Box>
          );
        })}
      </div>
    </Stage>
  ),
  // Describe it, AI builds it.
  build: () => (
    <Stage d={9} className="gap-2.5">
      <Win title="AI builder" dark className="w-[128px]" bodyClass="p-2">
        <p className={`${t.code} text-[#f0946b]`}>&gt; you</p>
        <p className={`${t.code} text-white/85 ` + m("type")} style={at(0.2)}>Build a booking page</p>
        <p className={`${t.code} text-white/85 ` + m("type")} style={at(0.9)}>for Glow Studio with</p>
        <p className={`${t.code} text-white/85 ` + m("type")} style={at(1.6)}>a WhatsApp button.</p>
        <p className={`${t.code} mt-1 flex items-center gap-1 text-[#4ade80] ` + m("in")} style={at(2.4)}>
          <span className={"size-[6px] rounded-full border border-[#4ade80] border-t-transparent " + loop("spin")} /> building…
        </p>
      </Win>
      <Win title="glowstudio.ng" className="w-[140px]" bodyClass="space-y-1 p-2">
        <div className={m("in")} style={at(2.8)}><Line w="45%" h="h-[6px]" c="bg-[#151515]" /></div>
        <p className={"text-[10px] font-bold leading-tight " + m("in")} style={at(3.2)}>Lashes that last.</p>
        <div className={"grid grid-cols-3 gap-1 " + m("in")} style={at(3.6)}>
          {[0, 1, 2].map((i) => <span key={i} className="h-[18px] rounded-[3px] bg-[#fbe8de]" />)}
        </div>
        <span className={`block rounded-full bg-[#1faa53] py-[2px] text-center ${t.xs} font-semibold text-white ` + m("pop")} style={at(4)}>Book on WhatsApp</span>
      </Win>
    </Stage>
  ),
  // Pitch a business near you.
  pitch: () => (
    <Stage d={9}>
      <Phone className="h-[172px] w-[160px]">
        <p className="flex items-center gap-1 bg-[#075e54] px-2 pb-1 pt-3.5 text-[7.5px] font-semibold text-white">
          <span className="size-[10px] rounded-full bg-white/80" /> SmileCare Dental
        </p>
        <div className="space-y-1 bg-[#efeae2] p-1.5 text-[6.5px]">
          <p className={"ml-auto w-[88%] rounded-[5px] bg-[#d9fdd3] p-1 " + m("in")} style={at(0.2)}>Hi Dr. Ada, I noticed patients can&apos;t book on your site from a phone.</p>
          <p className={"ml-auto w-[80%] rounded-[5px] bg-[#d9fdd3] p-1 " + m("in")} style={at(1.1)}>I build booking sites for clinics. Can I send a 1-minute example?</p>
          <span className={"flex w-fit gap-[2px] rounded-[5px] bg-white px-1.5 py-1 " + m("in")} style={at(2.1)}>
            {[0, 1, 2].map((i) => <span key={i} className="size-[3px] rounded-full bg-[#8a857b]" />)}
          </span>
          <p className={"w-[76%] rounded-[5px] bg-white p-1 font-semibold " + m("pop")} style={at(3)}>Yes please! What would it cost?</p>
        </div>
      </Phone>
    </Stage>
  ),
  // Paid, and certified.
  paid: () => (
    <Stage d={9} className="gap-3">
      <Box className="relative w-[128px] p-2.5">
        <div className="flex justify-between"><p className={`${t.sm} font-bold`}>INVOICE</p><p className={`${t.xs} text-[#8a857b]`}>INV-001</p></div>
        <div className="mt-1 flex justify-between border-b border-[#efece6] pb-0.5"><span className={t.xs}>Booking website</span><span className={t.xs}>₦350,000</span></div>
        <p className="mt-1 text-right text-[14px] font-bold">₦350,000</p>
        <span className={"absolute -right-2 top-5 rounded-[4px] border-[3px] border-[#16794a] bg-white/85 px-1.5 font-code text-[12px] font-bold text-[#16794a] " + m("stamp")} style={at(0.8)}>PAID</span>
      </Box>
      <Box className={"w-[122px] p-2.5 text-center " + m("pop")} style={at(2)}>
        <Award className="mx-auto size-6 text-[#eb5e28]" />
        <p className={`${t.xs} mt-1 font-semibold tracking-[0.1em] text-[#8a857b]`}>CERTIFICATE</p>
        <p className="text-[11px] font-bold">Fast Track</p>
        <p className={`mt-1 flex items-center justify-center gap-1 ${t.xs} font-semibold text-[#16794a]`}><Check className="size-3" strokeWidth={3} /> Verified</p>
      </Box>
    </Stage>
  ),
};

export function StepArt({ step }: { step: Step }) {
  const Scene = scenes[step];
  return (
    <Artboard bg="#f3f0ea">
      <Scene />
    </Artboard>
  );
}
