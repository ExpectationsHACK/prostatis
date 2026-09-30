// Buttons and fields. The primary and secondary buttons carry the ink outline and offset
// shadow of the cards; one orange action per view.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";
const solid = "border-2 border-ink shadow-[3px_3px_0_var(--ink)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)]";

export const btn = {
  primary: `${base} ${solid} bg-brand text-brand-ink hover:bg-brand-hover`,
  secondary: `${base} ${solid} bg-card text-ink`,
  accent: `${base} ${solid} bg-ink text-white`,
  ghost: `${base} text-ink hover:bg-sunk`,
  outline: `${base} border-2 border-ink text-ink hover:bg-sunk`,
};

export const size = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export const input =
  "w-full rounded-[10px] border-2 border-ink/80 bg-card px-3 py-2.5 text-[15px] text-ink placeholder:text-faint focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

/** Small byline under titles. */
export const byline = "text-[12.5px] font-medium text-muted";
