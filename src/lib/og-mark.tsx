// The STEINARK arch mark as plain SVG, for generated icons, share images and certificates.
export function Mark({ size, color = "#151515" }: { size: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 20.5v-8.2a6.5 6.5 0 0 1 13 0v8.2" />
      <path d="M10.3 3.2h3.4l-.7 3.6h-2z" fill={color} strokeWidth={1.4} />
      <path d="M3.5 20.5h17" />
    </svg>
  );
}

export const og = {
  orange: "#eb5e28",
  ink: "#151515",
  paper: "#fafaf8",
  muted: "#625f58",
  line: "#e7e5e0",
  /** Small caps labels on share images and certificates. */
  label: "#b8400f",
};
