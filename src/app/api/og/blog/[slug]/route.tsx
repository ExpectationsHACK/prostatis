import { ImageResponse } from "next/og";
import { getPublished } from "@/lib/blog";
import { OgCard, ogSize } from "@/lib/og-card";

/** Default share image for a post that has no cover or custom OG image. */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublished((await params).slug);
  if (!post) return new Response("Not found", { status: 404 });
  return new ImageResponse(<OgCard kicker={post.tags[0] ?? "Blog"} title={post.title} sub="steinark · blog" />, {
    ...ogSize,
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
