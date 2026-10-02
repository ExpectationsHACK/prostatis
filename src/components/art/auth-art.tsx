import { Award, Check, Flame, KeyRound, Lock, LockOpen, Mail, Sparkles } from "lucide-react";
import { Artboard } from "./artboard";
import { at, Box, Cursor, m, Stage, t, Tick, Win } from "./kit";

/** Animated scenes for the sign-in, sign-up and password pages. */
export type AuthArtKind = "signin" | "signup" | "reset";

const scenes: Record<AuthArtKind, () => React.ReactNode> = {
  // Welcome back: the streak ticks up, XP fills, the next lesson unlocks.
  signin: () => (
    <Stage d={9}>
      <Win title="steinark.com/dashboard" className="relative w-[272px]" bodyClass="p-2.5">
        <p className={"text-[13px] font-bold tracking-[-0.01em] " + m("type")} style={at(0.2)}>Welcome back, Ada</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <Box className="flex items-center gap-1.5 p-1.5">
            <Flame className="size-4 fill-[#eb5e28] text-[#eb5e28]" />
            <span className="relative h-[13px] w-[64px]">
              <span className={`absolute ${t.sm} font-bold ` + m("swap-a")} style={at(0)}>6-day streak</span>
              <span className={`absolute ${t.sm} font-bold text-[#b8400f] ` + m("swap-b")} style={at(0)}>7-day streak</span>
            </span>
          </Box>
          <Box className="p-1.5">
            <p className={`${t.xs} flex items-center gap-1 font-semibold`}><Sparkles className="size-3 text-[#eb5e28]" /> 1,240 XP</p>
            <div className="mt-1 h-[5px] overflow-hidden rounded-full bg-[#f1ede6]">
              <span className={"block h-full w-[72%] rounded-full bg-[#eb5e28] " + m("grow-x")} style={at(0.8)} />
            </div>
          </Box>
        </div>
        <Box className="mt-2 flex items-center gap-2 p-2">
          <span className="relative grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[#fdeee6]">
            <Lock className={"absolute size-3.5 text-[#8a857b] " + m("swap-a")} style={at(0)} />
            <LockOpen className={"absolute size-3.5 text-[#16794a] " + m("swap-b")} style={at(0)} />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block ${t.xs} text-[#8a857b]`}>Up next · Day 5</span>
            <span className={`block ${t.sm} truncate font-semibold`}>Landing pages that convert</span>
          </span>
          <span className={`rounded-[6px] bg-[#eb5e28] px-2 py-1 ${t.xs} font-semibold ` + m("press")} style={at(6.4)}>Continue</span>
        </Box>
        <Cursor className={"left-[160px] top-[130px] " + m("cursor")} style={at(4.6, { tx: "80px", ty: "-28px" })} />
      </Win>
    </Stage>
  ),

  // Your first 14 days: the course path fills in, ending with "get paid".
  signup: () => (
    <Stage d={10}>
      <Box className="relative w-[262px] p-3">
        <p className={`${t.xs} font-semibold tracking-[0.1em] text-[#8a857b]`}>YOUR FAST TRACK</p>
        <div className="relative mt-2">
          <span className="absolute bottom-2 left-[9px] top-2 w-[2px] bg-[#f1ede6]" />
          <span className={"absolute left-[9px] top-2 h-[calc(100%-16px)] w-[2px] bg-[#eb5e28] " + m("grow-y")} style={{ ...at(0.2), transformOrigin: "top" }} />
          {[["Day 1", "Brand kit and design"], ["Day 3", "First page live, free"], ["Day 4", "A five-page business website"], ["Day 9", "Online store with Paystack"], ["Day 14", "Ship it and get paid"]].map(([d, x], i, arr) => (
            <div key={d} className={"relative mb-1.5 flex items-center gap-2 last:mb-0 " + m("left")} style={at(0.4 + i * 0.5)}>
              <span className={"relative z-10 grid size-[20px] shrink-0 place-items-center rounded-full border-2 border-white " + (i === arr.length - 1 ? "bg-[#eb5e28]" : "bg-[#16794a]")}>
                <Check className="size-[10px] text-white" strokeWidth={3.5} />
              </span>
              <span className={`w-[38px] shrink-0 ${t.xs} font-semibold text-[#8a857b]`}>{d}</span>
              <span className={`${t.sm} font-semibold`}>{x}</span>
            </div>
          ))}
        </div>
        <span className={`absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#fdeee6] px-2 py-[2px] ${t.xs} font-semibold text-[#b8400f] ` + m("pop")} style={at(3.4)}>
          <Award className="size-3" /> Certificate
        </span>
      </Box>
    </Stage>
  ),

  // Account help: the email arrives, the link is opened, the lock opens.
  reset: () => (
    <Stage d={9} className="gap-3">
      <Win title="Inbox" className="w-[164px]" bodyClass="p-2">
        <div className={"flex items-start gap-1.5 " + m("left")} style={at(0.3)}>
          <span className="grid size-[18px] shrink-0 place-items-center rounded-[5px] bg-[#eb5e28] text-[#151515]"><Mail className="size-3" /></span>
          <span className="min-w-0">
            <span className={`block ${t.sm} font-bold`}>STEINARK</span>
            <span className={`block ${t.xs} truncate text-[#6b675f]`}>Reset your password</span>
          </span>
        </div>
        <p className={`${t.xs} mt-2 leading-snug text-[#6b675f] ` + m("in")} style={at(1.1)}>Tap the button to choose a new password. The link works once.</p>
        <span className={`mt-1.5 block rounded-[5px] bg-[#151515] py-1 text-center ${t.xs} font-semibold text-white ` + m("press")} style={at(2.4)}>Set a new password</span>
      </Win>
      <Box className="grid w-[96px] place-items-center p-3 text-center">
        <span className="relative grid size-[40px] place-items-center rounded-full bg-[#fdeee6]">
          <KeyRound className={"absolute size-5 text-[#b8400f] " + m("swap-a")} style={at(0)} />
          <LockOpen className={"absolute size-5 text-[#16794a] " + m("swap-b")} style={at(0)} />
        </span>
        <span className={`mt-1.5 flex items-center gap-1 ${t.xs} font-semibold text-[#16794a] ` + m("pop")} style={at(4.8)}>
          <Tick /> Updated
        </span>
      </Box>
    </Stage>
  ),
};

export function AuthArt({ kind }: { kind: AuthArtKind }) {
  const Scene = scenes[kind];
  return (
    <Artboard bg="#f3f0ea">
      <Scene />
    </Artboard>
  );
}
