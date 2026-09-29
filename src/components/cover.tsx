/**
 * Post-cover art. Substack posts lead with an image; ours lead with a real artifact
 * from the stage or tool (a cron line, an invoice total, a CLAUDE.md heading), set
 * on a flat field of colour like a printed zine cover.
 */
export const tones = {
  orange: { bg: "#ff6719", fg: "#ffffff", dim: "rgba(255,255,255,0.72)" },
  ink: { bg: "#1f2021", fg: "#f4f4f4", dim: "#ff8a4c" },
  peach: { bg: "#ffe1cf", fg: "#5b2406", dim: "#a8471a" },
  forest: { bg: "#0f4d3a", fg: "#eaf4ee", dim: "#9fd3b8" },
  indigo: { bg: "#2a2e6e", fg: "#eceefe", dim: "#aab0f5" },
  sand: { bg: "#f1e9dc", fg: "#3a3128", dim: "#8a6f4e" },
} as const;

export type Tone = keyof typeof tones;

export function Cover({
  tone,
  label,
  lines,
  size = "md",
  className = "",
}: {
  tone: Tone;
  label?: string;
  lines: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const t = tones[tone];
  const text = size === "lg" ? "text-[15px] sm:text-lg" : size === "sm" ? "text-[9px]" : "text-[12px]";
  const pad = size === "lg" ? "p-6 sm:p-8" : size === "sm" ? "p-2" : "p-4";
  return (
    <div
      className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10 ${pad} ${className}`}
      style={{ background: t.bg, color: t.fg }}
      aria-hidden
    >
      {label && size !== "sm" && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: t.dim }}>
          {label}
        </span>
      )}
      <div className={`font-mono leading-snug ${text}`}>
        {lines.map((l, i) => (
          <p key={i} className="truncate" style={i > 0 ? { color: t.dim } : undefined}>
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
