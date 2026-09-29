// Print-shop control vocabulary: ink outline, hard offset shadow that presses in, bold caps label.
const base =
  "inline-flex items-center justify-center gap-2 rounded-none font-mono font-bold uppercase tracking-[0.08em] whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50";

export const btn = {
  primary: `${base} ink-block block-press bg-brand text-brand-ink`,
  secondary: `${base} ink-block block-press bg-card text-ink`,
  accent: `${base} ink-block block-press bg-accent text-accent-ink`,
  ghost: `${base} text-ink hover:bg-wash`,
  outline: `${base} border-2 border-edge text-ink hover:bg-wash`,
};

export const size = {
  sm: "h-9 px-3.5 text-[12px]",
  md: "h-11 px-5 text-[13px]",
  lg: "h-13 px-7 text-[14px]",
};

export const input =
  "w-full rounded-none border-2 border-edge bg-card px-3 py-2.5 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-brand/30";

/** Typewriter byline under titles. */
export const byline = "font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted";
