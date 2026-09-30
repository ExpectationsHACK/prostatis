import { listPublished, seoDescription } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export async function GET() {
  const posts = (await listPublished()).slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(p.published_at!).toUTCString()}</pubDate><description>${esc(seoDescription(p))}</description>${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}</item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(site.name)} blog</title><link>${site.url}/blog</link><atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml"/><description>${esc("Practical guides on building websites with AI, finding clients and getting paid.")}</description><language>en-ng</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
