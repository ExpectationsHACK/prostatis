"use client";

import { ab, afield } from "@/components/admin/blocks";
import { ArrowLeft, Bold, CircleCheck, CircleX, Heading2, ImagePlus, Link2, List, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useRef, useState, useTransition } from "react";
import { Markdown } from "@/components/markdown";
import { type Post, readingMinutes, SEO_LIMITS, seoChecks, slugify } from "@/lib/blog-shared";
import { savePostAction, uploadImageAction } from "../actions";

const label = "label mb-1 block text-muted";
const toLocal = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date(iso).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");

function Counter({ n, max }: { n: number; max: number }) {
  return <span className={"tabular font-mono text-[11px] " + (n > max ? "font-bold text-danger" : "text-muted")}>{n}/{max}</span>;
}

const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

export function PostEditor({ post, siteUrl, onDelete }: { post: Post | null; siteUrl: string; onDelete?: () => Promise<void> }) {
  const [state, save, saving] = useActionState(savePostAction, null);
  const [f, setF] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content_md: post?.content_md ?? "",
    cover_image: post?.cover_image ?? "",
    cover_alt: post?.cover_alt ?? "",
    tags: post?.tags.join(", ") ?? "",
    seo_title: post?.seo_title ?? "",
    seo_description: post?.seo_description ?? "",
    seo_keywords: post?.seo_keywords.join(", ") ?? "",
    canonical_url: post?.canonical_url ?? "",
    og_image: post?.og_image ?? "",
    author_name: post?.author_name ?? "Prostatis",
    status: post?.status ?? "draft",
    published_at: toLocal(post?.published_at ?? null),
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [upload, setUpload] = useState<{ msg: string; ok: boolean } | null>(null);
  const [uploading, startUpload] = useTransition();
  const body = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<"body" | "cover">("body");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setF((p) => ({ ...p, [k]: v, ...(k === "title" && !slugTouched ? { slug: slugify(v) } : {}) }));
  };

  const insert = (before: string, after = "", placeholder = "") => {
    const el = body.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const sel = value.slice(a, b) || placeholder;
    const next = value.slice(0, a) + before + sel + after + value.slice(b);
    setF((p) => ({ ...p, content_md: next }));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + before.length, a + before.length + sel.length);
    });
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0];
    e.target.value = "";
    if (!chosen) return;
    const fd = new FormData();
    fd.set("file", chosen);
    startUpload(async () => {
      const res = await uploadImageAction(null, fd);
      setUpload(res);
      if (!res.ok || !res.url) return;
      if (uploadTarget.current === "cover") setF((p) => ({ ...p, cover_image: res.url! }));
      else insert(`\n![`, `](${res.url})\n`, "Describe the image");
    });
  };
  const pick = (t: "body" | "cover") => {
    uploadTarget.current = t;
    file.current?.click();
  };

  const tags = f.tags.split(",").map((t) => t.trim()).filter(Boolean);
  const checks = seoChecks({ ...f, tags, cover_image: f.cover_image || null, cover_alt: f.cover_alt || null, seo_title: f.seo_title || null, seo_description: f.seo_description || null });
  const shownTitle = f.seo_title || f.title || "Your post title";
  const shownDesc = f.seo_description || f.excerpt || "Your description shows here. Write one or two sentences that make people want to click.";
  const host = siteUrl.replace(/^https?:\/\//, "");
  const shareImg = f.og_image || f.cover_image;
  const scheduledIso = f.published_at ? new Date(f.published_at).toISOString() : "";

  return (
    <form
      className="space-y-5"
      // Submit manually: a plain form action resets the form afterwards, which would put the
      // controlled fields (like Status) back to their first values on screen.
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => save(fd));
      }}
    >
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <input type="hidden" name="published_at" value={scheduledIso} />
      <input ref={file} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" className="hidden" onChange={onFile} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-edge pb-4">
        <Link href="/admin/blog" className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> All posts
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {post?.status === "published" && (
            <Link href={`/blog/${post.slug}`} target="_blank" className={`${ab.ghost} ${ab.sm}`}>View live</Link>
          )}
          <select name="status" value={f.status} onChange={set("status")} className={afield + " w-40 py-2"} aria-label="Status">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className={`${ab.primary}`} disabled={saving}>{saving ? "Saving…" : f.status === "published" ? "Save & publish" : "Save draft"}</button>
        </div>
      </div>
      {state && <p role="status" className={"font-mono text-[13px] font-bold " + (state.ok ? "text-success" : "text-danger")}>{state.msg}</p>}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Main column */}
        <div className="space-y-4">
          <label className="block">
            <span className={label}>Title (the H1 on the page)</span>
            <input name="title" value={f.title} onChange={set("title")} className={afield + " text-[18px] sm:text-[20px] font-semibold"} required placeholder="How to find your first website client" />
          </label>
          <label className="block">
            <span className={label}>URL slug</span>
            <div className="flex items-center border-2 border-edge bg-card">
              <span className="shrink-0 pl-3 font-mono text-[13px] text-muted">/blog/</span>
              <input name="slug" value={f.slug} onChange={(e) => { setSlugTouched(true); setF((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })); }} className="w-full bg-transparent px-1 py-2.5 font-mono text-[14px] text-ink focus:outline-none" placeholder="find-your-first-client" />
            </div>
          </label>
          <label className="block">
            <span className={label}>Excerpt (shown on the blog list and under the title)</span>
            <textarea name="excerpt" value={f.excerpt} onChange={set("excerpt")} rows={2} className={afield} />
          </label>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-b-0 border-edge bg-wash px-2 py-1.5">
              <div className="flex gap-1">
                {(["write", "preview"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)} className={"label px-2.5 py-1 " + (tab === t ? "border-[var(--a-accent)] bg-[var(--a-accent-soft)] font-medium text-[var(--a-accent-text)]" : "text-ink")}>{t}</button>
                ))}
              </div>
              {tab === "write" && (
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => insert("\n## ", "\n", "Section heading")} className="grid size-8 place-items-center hover:bg-card" title="Section heading" aria-label="Section heading"><Heading2 className="size-4" /></button>
                  <button type="button" onClick={() => insert("**", "**", "bold text")} className="grid size-8 place-items-center hover:bg-card" title="Bold" aria-label="Bold"><Bold className="size-4" /></button>
                  <button type="button" onClick={() => insert("[", "](/tools)", "link text")} className="grid size-8 place-items-center hover:bg-card" title="Link" aria-label="Link"><Link2 className="size-4" /></button>
                  <button type="button" onClick={() => insert("\n- ", "", "List item")} className="grid size-8 place-items-center hover:bg-card" title="List" aria-label="List"><List className="size-4" /></button>
                  <button type="button" onClick={() => pick("body")} className="grid size-8 place-items-center hover:bg-card" title="Upload image" aria-label="Upload image" disabled={uploading}><ImagePlus className="size-4" /></button>
                </div>
              )}
            </div>
            {tab === "write" ? (
              <textarea ref={body} name="content_md" value={f.content_md} onChange={set("content_md")} rows={26} className={afield + " font-mono text-[14px] leading-relaxed"} placeholder={"Write in Markdown.\n\n## A section heading\n\nA paragraph with **bold** and a [link](/tracks/fast-track).\n\n- a list item"} />
            ) : (
              <>
                <input type="hidden" name="content_md" value={f.content_md} />
                <div className="min-h-[400px] border-2 border-edge bg-card px-5 py-3">
                  {f.content_md ? <Markdown md={f.content_md} /> : <p className="py-6 font-mono text-[13px] text-muted">Nothing to preview yet.</p>}
                </div>
              </>
            )}
            <p className="mt-1.5 font-mono text-[11.5px] text-muted">
              {f.content_md.split(/\s+/).filter(Boolean).length} words · {readingMinutes(f.content_md)} min read · Markdown: ## heading, **bold**, *italic*, [link](url), - list, 1. list, &gt; quote, | table |, ![alt](image-url)
              {uploading && " · uploading…"}
            </p>
            {upload && <p className={"font-mono text-[12px] " + (upload.ok ? "text-success" : "text-danger")}>{upload.msg}</p>}
          </div>
        </div>

        {/* Side column: search, social and settings */}
        <div className="space-y-5">
          <section className="ink-block bg-card p-4">
            <p className="label text-muted">Google preview</p>
            <div className="mt-3 rounded-lg border border-line bg-white p-3 font-sans">
              <p className="truncate text-[12px] text-[#4d5156]">{host} › blog › {f.slug || "your-post"}</p>
              <p className="mt-0.5 text-[18px] leading-snug text-[#1a0dab]">{cut(shownTitle, SEO_LIMITS.title + 2)}</p>
              <p className="mt-1 text-[13px] leading-snug text-[#4d5156]">{cut(shownDesc, SEO_LIMITS.description + 3)}</p>
            </div>
            <label className="mt-4 block">
              <span className={label + " flex justify-between"}>Search title <Counter n={(f.seo_title || f.title).length} max={SEO_LIMITS.title} /></span>
              <input name="seo_title" value={f.seo_title} onChange={set("seo_title")} className={afield} placeholder="Defaults to the title" />
            </label>
            <label className="mt-3 block">
              <span className={label + " flex justify-between"}>Search description <Counter n={(f.seo_description || f.excerpt).length} max={SEO_LIMITS.description} /></span>
              <textarea name="seo_description" value={f.seo_description} onChange={set("seo_description")} rows={3} className={afield} placeholder="Defaults to the excerpt" />
            </label>
            <label className="mt-3 block">
              <span className={label}>Keywords (comma-separated, for your planning)</span>
              <input name="seo_keywords" value={f.seo_keywords} onChange={set("seo_keywords")} className={afield} placeholder="find website clients, web designer Nigeria" />
            </label>
          </section>

          <section className="ink-block bg-card p-4">
            <p className="label text-muted">WhatsApp / social share preview</p>
            <div className="mt-3 overflow-hidden rounded-lg border border-line bg-[#e7ffdb]">
              {shareImg ? (
                // eslint-disable-next-line @next/next/no-img-element -- live preview of an author-supplied URL
                <img src={shareImg} alt="" className="aspect-[1.91/1] w-full object-cover" />
              ) : (
                <div className="grid aspect-[1.91/1] place-items-center bg-brand p-4 text-center font-display text-[16px] font-semibold text-ink">{shownTitle}</div>
              )}
              <div className="p-2.5 font-sans">
                <p className="line-clamp-2 text-[13.5px] font-semibold text-[#111b21]">{shownTitle}</p>
                <p className="mt-0.5 line-clamp-2 text-[12px] text-[#667781]">{shownDesc}</p>
                <p className="mt-1 text-[11px] text-[#667781]">{host}</p>
              </div>
            </div>
            {!shareImg && <p className="mt-2 font-mono text-[11.5px] text-muted">No image set: a branded card with the title is generated automatically.</p>}
          </section>

          <section className="ink-block bg-card p-4">
            <p className="label text-muted">Before you publish</p>
            <ul className="mt-2 space-y-1.5">
              {checks.map((c) => (
                <li key={c.text} className="flex items-start gap-2 font-mono text-[12px] leading-snug text-ink">
                  {c.ok ? <CircleCheck className="mt-px size-4 shrink-0 text-success" aria-hidden /> : <CircleX className="mt-px size-4 shrink-0 text-danger" aria-hidden />}
                  {c.text}
                </li>
              ))}
            </ul>
          </section>

          <section className="ink-block space-y-3 bg-card p-4">
            <p className="label text-muted">Cover, tags and settings</p>
            <label className="block">
              <span className={label}>Cover image URL</span>
              <div className="flex gap-2">
                <input name="cover_image" value={f.cover_image} onChange={set("cover_image")} className={afield} placeholder="https://… or upload" />
                <button type="button" onClick={() => pick("cover")} className={`${ab.secondary} shrink-0`} disabled={uploading} aria-label="Upload cover">
                  <ImagePlus className="size-4" aria-hidden />
                </button>
              </div>
            </label>
            <label className="block">
              <span className={label}>Cover alt text (describe the image)</span>
              <input name="cover_alt" value={f.cover_alt} onChange={set("cover_alt")} className={afield} />
            </label>
            <label className="block">
              <span className={label}>Tags (comma-separated; the first is the main topic)</span>
              <input name="tags" value={f.tags} onChange={set("tags")} className={afield} placeholder="Clients, Getting paid" />
            </label>
            <label className="block">
              <span className={label}>Author</span>
              <input name="author_name" value={f.author_name} onChange={set("author_name")} className={afield} />
            </label>
            <label className="block">
              <span className={label}>Publish date (set a future date to schedule)</span>
              <input type="datetime-local" value={f.published_at} onChange={set("published_at")} className={afield} />
            </label>
            <label className="block">
              <span className={label}>Share image URL (optional, 1200×630)</span>
              <input name="og_image" value={f.og_image} onChange={set("og_image")} className={afield} placeholder="Defaults to the cover" />
            </label>
            <label className="block">
              <span className={label}>Canonical URL (only if first published elsewhere)</span>
              <input name="canonical_url" value={f.canonical_url} onChange={set("canonical_url")} className={afield} placeholder="Leave empty" />
            </label>
          </section>

          {onDelete && (
            <button
              type="button"
              className={`${ab.secondary} ${ab.sm} text-danger`}
              onClick={async () => {
                if (window.confirm("Delete this post permanently? This can't be undone.")) await onDelete();
              }}
            >
              <Trash2 className="size-4" aria-hidden /> Delete post
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
