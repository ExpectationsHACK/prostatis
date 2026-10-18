import { hueClass, type Hue } from "@/lib/hues";

/** The small coloured pill above a page or section headline. One style everywhere. */
export function Eyebrow({ children, hue = "orange", className = "" }: { children: React.ReactNode; hue?: Hue; className?: string }) {
  return <p className={`label inline-block rounded-full px-3 py-1 ${hueClass[hue].wash} ${hueClass[hue].text} ${className}`}>{children}</p>;
}
