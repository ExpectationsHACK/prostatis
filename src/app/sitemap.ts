import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { liveTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/pricing`, priority: 0.8 },
    { url: `${site.url}/tools`, priority: 0.9 },
    ...liveTools.map((t) => ({ url: `${site.url}/tools/${t.slug}`, priority: 0.7 })),
  ];
}
