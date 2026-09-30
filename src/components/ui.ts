// Buttons and fields: soft corners, sentence case, one orange action per view.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const btn = {
  primary: `${base} bg-brand text-brand-ink hover:bg-brand-hover`,
  secondary: `${base} border border-line bg-card text-ink hover:border-edge hover:bg-sunk`,
  accent: `${base} bg-ink text-white hover:bg-[#2b2b2b]`,
  ghost: `${base} text-ink hover:bg-sunk`,
  outline: `${base} border border-line text-ink hover:bg-sunk`,
};

export const size = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export const input =
  "w-full rounded-[10px] border border-line bg-card px-3 py-2.5 text-[15px] text-ink placeholder:text-faint focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

/** Small byline under titles. */
export const byline = "text-[12.5px] font-medium text-muted";
