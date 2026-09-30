import { Rss } from "lucide-react";
import Link from "next/link";
import { btn, size } from "@/components/ui";
import { type Post, tagSlug } from "@/lib/blog-shared";
import { PostCard } from "./post-card";

export function BlogIndex({ posts, allForTags, activeTag, tagName }: { posts: Post[]; allForTags?: Post[]; activeTag?: string; tagName?: string }) {
  const counts = new Map<string, { name: string; n: number }>();
  for (const p of allForTags ?? posts)
    for (const t of p.tags) {
      const s = tagSlug(t);
      counts.set(s, { name: counts.get(s)?.name ?? t, n: (counts.get(s)?.n ?? 0) + 1 });
    }
  const tags = [...counts.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 14);
  const [first, ...rest] = posts;

  return (
    <div className="pb-20">
      <header className="border-b border-line bg-card px-4 py-12 text-center sm:py-16">
        <p className="text-[13px] font-semibold text-brand-text">{tagName ? "Topic" : "The blog"}</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-balance text-[42px] text-ink sm:text-[62px]">{tagName ?? "Build it. Sell it. Get paid."}</h1>
        <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted">
          Practical guides on building websites with AI, finding clients, pricing, SEO and getting paid, written for Nigeria.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4">
        {tags.length > 0 && (
          <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Topics">
            <Link href="/blog" className={"rounded-full border px-3 py-1.5 text-[13px] font-medium " + (!activeTag ? "border-ink bg-ink text-white" : "border-line bg-card text-ink hover:bg-sunk")}>
              All
            </Link>
            {tags.map(([s, t]) => (
              <Link key={s} href={`/blog/tag/${s}`} className={"rounded-full border px-3 py-1.5 text-[13px] font-medium " + (activeTag === s ? "border-ink bg-ink text-white" : "border-line bg-card text-ink hover:bg-sunk")}>
                {t.name} <span className="opacity-60">{t.n}</span>
              </Link>
            ))}
            <a href="/blog/rss.xml" className="label ml-auto inline-flex items-center gap-1.5 px-2 py-1.5 text-muted hover:text-ink">
              <Rss className="size-3.5" aria-hidden /> RSS
            </a>
          </nav>
        )}

        {!first ? (
          <div className="ink-block mx-auto mt-12 max-w-xl bg-card p-8 text-center">
            <h2 className="display text-[26px] text-ink">First articles are on the way</h2>
            <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted">Meanwhile, the free tools are ready to use, no signup.</p>
            <Link href="/tools" className={`${btn.primary} ${size.md} mt-5`}>
              Try the free tools
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8">
              <PostCard post={first} big />
            </div>
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
