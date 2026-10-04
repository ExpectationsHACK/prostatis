import { LOGO } from "./logo";

// The Prostatis mark as plain SVG, for generated icons, share images and certificates.
export function Mark({ size, color = "#151515" }: { size: number; color?: string }) {
  return (
    <svg viewBox={LOGO.viewBox} width={(size * 62) / 71} height={size}>
      <path d={LOGO.outline} fill="none" stroke={color} strokeWidth={LOGO.stroke} strokeLinecap="round" strokeLinejoin="round" />
      {LOGO.dashes.map((d) => (
        <path key={d} d={d} fill={color} />
      ))}
    </svg>
  );
}

export const og = {
  orange: "#eb5e28",
  ink: "#151515",
  paper: "#faf8f4",
  muted: "#625f58",
  line: "#e7e5e0",
  /** Small caps labels on share images and certificates. */
  label: "#b8400f",
};
