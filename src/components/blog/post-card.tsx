import Link from "next/link";
import { tones } from "@/components/cover";
import { byline } from "@/components/ui";
import { type Post, readingMinutes } from "@/lib/blog-shared";

const toneList = ["orange", "forest", "indigo", "peach", "sand", "ink"] as const;

export function postDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }) : "Draft";
}

/** The post's cover image, or a coded print-style cover with its title when there isn't one. */
export function PostCover({ post, eager = false }: { post: Pick<Post, "slug" | "title" | "cover_image" | "cover_alt" | "tags">; eager?: boolean }) {
  if (post.cover_image)
    return (
      // eslint-disable-next-line @next/next/no-img-element -- covers can come from any host the author uses
      <img src={post.cover_image} alt={post.cover_alt ?? ""} loading={eager ? "eager" : "lazy"} decoding="async" className="aspect-[16/9] h-full w-full object-cover" />
    );
  const hash = [...post.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const t = tones[toneList[hash % toneList.length]];
  return (
    <div className="field-grid flex aspect-[16/9] h-full flex-col justify-between p-5" style={{ background: t.bg, color: t.fg }} aria-hidden>
      <span className="font-mono text-[11px] font-bold" style={{ color: t.dim }}>
        {post.tags[0] ?? "Blog"}
      </span>
      <span className="display line-clamp-3 text-balance text-[22px] leading-tight sm:text-[26px]">{post.title}</span>
    </div>
  );
}

export function PostCard({ post, big = false }: { post: Post; big?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={"ink-block block-press group flex flex-col overflow-hidden bg-card " + (big ? "md:flex-row" : "")}>
      <div className={"border-edge " + (big ? "border-b md:w-[55%] md:shrink-0 md:border-b-0 md:border-r" : "border-b")}>
        <PostCover post={post} eager={big} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.tags[0] && <p className="label text-brand-text">{post.tags[0]}</p>}
        <h2 className={"display mt-2 text-balance leading-tight text-ink group-hover:underline " + (big ? "text-[28px] sm:text-[34px]" : "text-[21px]")}>{post.title}</h2>
        <p className={"mt-2 font-mono leading-relaxed text-muted " + (big ? "text-[14px]" : "line-clamp-3 text-[13px]")}>{post.excerpt}</p>
        <p className={`mt-auto pt-4 ${byline}`}>
          {postDate(post.published_at)} · {readingMinutes(post.content_md)} min read
        </p>
      </div>
    </Link>
  );
}
