/**
 * Post-cover art. Substack posts lead with an image; ours lead with a real artifact
 * from the stage or tool (a cron line, an invoice total, a CLAUDE.md heading), set
 * on a flat field of colour like a printed zine cover.
 */
export const tones = {
  // One quiet family: warm neutrals, a soft orange tint and a single dark. The orange itself
  // appears only inside the art (buttons, tags), never as a whole background.
  orange: { bg: "#fbe8de", fg: "#151515", dim: "#b8400f" },
  ink: { bg: "#1b1b1b", fg: "#f4f4f2", dim: "#f0946b" },
  peach: { bg: "#f6f0ea", fg: "#151515", dim: "#8a5a3c" },
  forest: { bg: "#eef0ec", fg: "#151515", dim: "#55604f" },
  indigo: { bg: "#eeeff3", fg: "#151515", dim: "#555a6e" },
  sand: { bg: "#f3f1ec", fg: "#151515", dim: "#6f6858" },
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
        <span className="text-[10px] font-semibold" style={{ color: t.dim }}>
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
