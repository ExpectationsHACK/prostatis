// Our logo mark (bracketed spark) as plain SVG, for generated icons and share images.
export function Mark({ size, color = "#1b1714" }: { size: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5H4.5v14H7" />
      <path d="M17 5h2.5v14H17" />
      <path d="M12 7.5l1.2 3.3 3.3 1.2-3.3 1.2L12 16.5l-1.2-3.3L7.5 12l3.3-1.2z" fill={color} strokeWidth={1.2} />
    </svg>
  );
}

export const og = {
  orange: "#ff6719",
  ink: "#1b1714",
  paper: "#f6efe2",
  green: "#0f4d3a",
};
