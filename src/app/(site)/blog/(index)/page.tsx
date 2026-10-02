import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { listPublished } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog: building and selling websites with AI",
  description: `Practical guides from ${site.name}: building websites with AI, finding clients, pricing, SEO and getting paid, written for Nigeria.`,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogPage() {
  return <BlogIndex posts={await listPublished()} />;
}
