import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard, PostCover, postDate } from "@/components/blog/post-card";
import { headingsOf, Markdown } from "@/components/markdown";
import { SharePills } from "@/components/share-pills";
import { btn, byline, size } from "@/components/ui";
import { getPublished, listPublished, readingMinutes, relatedPosts, seoDescription, seoTitle, tagSlug } from "@/lib/blog";
import { formatNgn, plans, site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await listPublished()).map((p) => ({ slug: p.slug }));
}

const abs = (u: string) => (u.startsWith("http") ? u : `${site.url}${u}`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPublished((await params).slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  const title = seoTitle(post);
  const description = seoDescription(post);
  const image = post.og_image || post.cover_image || `/api/og/blog/${post.slug}`;
  return {
    // `absolute` so the site-name suffix doesn't push a tuned search title past ~60 characters.
    title: { absolute: title },
    description,
    keywords: post.seo_keywords.length ? post.seo_keywords : undefined,
    authors: [{ name: post.author_name }],
    alternates: { canonical: post.canonical_url || `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      images: [{ url: image, alt: post.cover_alt || post.title }],
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublished(slug);
  if (!post) notFound();
  const all = await listPublished();
  const related = relatedPosts(post, all);
  const toc = headingsOf(post.content_md).filter((h) => h.level === 2);
  const url = `${site.url}/blog/${post.slug}`;
  const updated = post.published_at && post.updated_at.slice(0, 10) > post.published_at.slice(0, 10);
  const from = formatNgn(Math.min(...plans.map((p) => p.priceNgn)));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: seoDescription(post),
      datePublished: post.published_at,
      dateModified: post.updated_at,
      image: [abs(post.og_image || post.cover_image || `/api/og/blog/${post.slug}`)],
      author: { "@type": "Organization", name: post.author_name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/icon` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.seo_keywords.join(", ") || undefined,
      articleSection: post.tags[0],
      wordCount: post.content_md.split(/\s+/).filter(Boolean).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article className="paper-grid pb-14 sm:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:pt-14">
        <nav className="label flex flex-wrap items-center gap-1.5 text-muted" aria-label="Breadcrumb">
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          {post.tags[0] && (
            <>
              <span aria-hidden>/</span>
              <Link href={`/blog/tag/${tagSlug(post.tags[0])}`} className="text-brand-text hover:underline">{post.tags[0]}</Link>
            </>
          )}
        </nav>
        <h1 className="display mt-4 text-balance text-[30px] leading-[1.08] text-ink sm:text-[52px]">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-pretty font-mono text-[15px] leading-relaxed text-muted">{post.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-edge py-3">
          <p className={byline}>
            {post.author_name} · <time dateTime={post.published_at ?? undefined}>{postDate(post.published_at)}</time>
            {updated && <> · Updated <time dateTime={post.updated_at}>{postDate(post.updated_at)}</time></>} · {readingMinutes(post.content_md)} min read
          </p>
          <SharePills title={post.title} kind={`read on ${site.name}`} />
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="ink-block overflow-hidden bg-card">
          <PostCover post={post} eager />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4">
        {toc.length >= 3 && (
          <nav className="mt-10 border border-edge bg-card p-5" aria-label="In this article">
            <p className="label text-muted">In this article</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 font-mono text-[13.5px] marker:text-brand-text">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-ink hover:underline">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-6">
          <Markdown md={post.content_md} />
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t}>
                <Link href={`/blog/tag/${tagSlug(t)}`} className="label border border-edge bg-card px-2.5 py-1.5 text-ink hover:bg-wash">{t}</Link>
              </li>
            ))}
          </ul>
        )}

        <aside className="mt-12 rounded-[16px] bg-night p-6 text-white sm:p-8">
          <p className="text-[13px] font-semibold text-brand">Learn it properly</p>
          <p className="display mt-2 text-balance text-[22px] leading-tight text-white sm:text-[30px]">Build websites with AI and turn it into income.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            Step-by-step lessons, real client projects and a verified certificate when you finish. From {from}, paid once.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/pricing" className={`${btn.primary} ${size.md}`}>
              Enroll Now <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/tools" className={`${btn.secondary} ${size.md} border-white/15 bg-white/10 text-white hover:bg-white/15`}>Free tools</Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-12 sm:mt-16 max-w-6xl px-4" aria-labelledby="related">
          <h2 id="related" className="display text-[24px] sm:text-[28px] text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
