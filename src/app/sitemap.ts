import type { MetadataRoute } from "next";
import { listPublished, tagSlug } from "@/lib/blog";
import { site } from "@/lib/site";
import { liveTools } from "@/lib/tools";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublished();
  const tags = [...new Set(posts.flatMap((p) => p.tags.map(tagSlug)))];
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/pricing`, priority: 0.8 },
    { url: `${site.url}/tracks/fast-track`, priority: 0.8 },
    { url: `${site.url}/tracks/main-track`, priority: 0.8 },
    { url: `${site.url}/tools`, priority: 0.9 },
    ...liveTools.map((t) => ({ url: `${site.url}/tools/${t.slug}`, priority: 0.7 })),
    { url: `${site.url}/blog`, priority: 0.8, lastModified: posts[0]?.updated_at },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updated_at, priority: 0.7 })),
    ...tags.map((t) => ({ url: `${site.url}/blog/tag/${t}`, priority: 0.4 })),
  ];
}
