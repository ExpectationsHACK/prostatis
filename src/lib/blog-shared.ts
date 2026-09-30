// Blog types and pure helpers, safe for both server and the admin editor in the browser.

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  cover_image: string | null;
  cover_alt: string | null;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  canonical_url: string | null;
  og_image: string | null;
  author_name: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = Omit<Post, "id" | "created_at" | "updated_at" | "published_at"> & { id?: string; published_at?: string | null };

/** Google shows roughly this much before cutting off (it's measured in pixels, so treat as a guide). */
export const SEO_LIMITS = { title: 60, description: 155 };

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export function readingMinutes(md: string) {
  const words = md.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const seoTitle = (p: Pick<Post, "seo_title" | "title">) => p.seo_title?.trim() || p.title;
export const seoDescription = (p: Pick<Post, "seo_description" | "excerpt">) => p.seo_description?.trim() || p.excerpt;

export function tagSlug(t: string) {
  return slugify(t);
}

/** Posts sharing the most tags with this one, newest first on ties. */
export function relatedPosts(post: Post, all: Post[], n = 3): Post[] {
  const mine = new Set(post.tags.map(tagSlug));
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.tags.filter((t) => mine.has(tagSlug(t))).length }))
    .sort((a, b) => b.score - a.score || (b.p.published_at ?? "").localeCompare(a.p.published_at ?? ""))
    .slice(0, n)
    .map((x) => x.p);
}

/** Pre-publish checks shown in the editor. */
export function seoChecks(p: Pick<Post, "title" | "slug" | "excerpt" | "content_md" | "seo_title" | "seo_description" | "cover_image" | "cover_alt" | "tags">) {
  const title = seoTitle(p);
  const desc = seoDescription(p);
  const h1s = (p.content_md.match(/^# /gm) ?? []).length;
  const imgs = [...p.content_md.matchAll(/!\[([^\]]*)\]\(/g)];
  const words = p.content_md.split(/\s+/).filter(Boolean).length;
  return [
    { ok: title.length >= 30 && title.length <= SEO_LIMITS.title, text: `Search title is ${title.length} characters (aim for 30–${SEO_LIMITS.title})` },
    { ok: desc.length >= 70 && desc.length <= SEO_LIMITS.description, text: `Search description is ${desc.length} characters (aim for 70–${SEO_LIMITS.description})` },
    { ok: /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug) && p.slug.length <= 70, text: "Clean URL slug: lowercase words joined by hyphens" },
    { ok: h1s === 0, text: "No extra H1 in the body: the title is the only H1 (use ## for sections)" },
    { ok: /^## /m.test(p.content_md), text: "Body is split into ## sections" },
    { ok: imgs.every((m) => m[1].trim().length > 0), text: "Every image in the body has alt text" },
    { ok: !p.cover_image || Boolean(p.cover_alt?.trim()), text: "Cover image has alt text" },
    { ok: /\]\(\//.test(p.content_md), text: "Links to at least one page on this site (tracks, tools or another post)" },
    { ok: p.tags.length > 0, text: "Has at least one tag (powers related posts)" },
    { ok: words >= 300, text: `${words} words (300+ helps a post rank)` },
  ];
}
