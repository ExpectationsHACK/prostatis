import type { Thumb } from "@/lib/curriculum";
import { getTool } from "@/lib/tools";
import type { Tone } from "../cover";
import { ProductThumb } from "./product-thumb";
import { ToolThumb } from "./tool-thumb";

const cycle: Tone[] = ["peach", "orange", "forest", "indigo", "sand", "ink"];

/** A lesson's cover: the tool output or the finished product that lesson produces. */
export function LessonThumb({ thumb, index }: { thumb: Thumb; index: number }) {
  if ("product" in thumb) return <ProductThumb kind={thumb.product} tone={cycle[index % cycle.length]} />;
  const tool = getTool(thumb.tool);
  return <ToolThumb slug={thumb.tool} tone={tool?.tone ?? cycle[index % cycle.length]} />;
}
