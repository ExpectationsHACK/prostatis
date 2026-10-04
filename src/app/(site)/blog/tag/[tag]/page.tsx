import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { listPublished, tagSlug } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

async function load(tag: string) {
  const all = await listPublished();
  const posts = all.filter((p) => p.tags.some((t) => tagSlug(t) === tag));
  const name = posts[0]?.tags.find((t) => tagSlug(t) === tag);
  return { all, posts, name };
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const { name } = await load(tag);
  if (!name) return {};
  return { title: `${name}: articles`, description: `Guides about ${name.toLowerCase()} from the ${site.name} blog.`, alternates: { canonical: `/blog/tag/${tag}` } };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const { all, posts, name } = await load(tag);
  if (!name) notFound();
  return <BlogIndex posts={posts} allForTags={all} activeTag={tag} tagName={name} />;
}
