"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { addNote, audit, endAccess, getStudent, setAccess, updateProfile } from "@/lib/admin/data";
import { deletePost, getPostById, listAllPosts, type PostInput, savePost, slugify } from "@/lib/blog";
import { emailCertificate } from "@/lib/certificate-delivery";
import { getCertificate, updateCertificate } from "@/lib/certificates";
import { starterPosts } from "@/content/blog-starters";
import { getPlan, newReference, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
import { createAdminClient } from "@/lib/supabase/admin";
import { site } from "@/lib/site";

export type Result = { ok: boolean; msg: string } | null;

const str = (fd: FormData, k: string, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);
const list = (s: string) => [...new Set(s.split(",").map((x) => x.trim()).filter(Boolean))].slice(0, 20);
const fail = (e: unknown): Result => ({ ok: false, msg: e instanceof Error ? e.message : "Something went wrong." });

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/blog/tag/[tag]", "page");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
}

/* ---------- Blog ---------- */
export async function savePostAction(_: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const title = str(fd, "title", 200);
  const slug = slugify(str(fd, "slug", 100) || title);
  if (!title) return { ok: false, msg: "Add a title." };
  if (!slug) return { ok: false, msg: "Add a URL slug." };
  const status = fd.get("status") === "published" ? "published" : "draft";
  const url = (k: string) => {
    const v = str(fd, k, 1000);
    return v && (/^https?:\/\//.test(v) || (v.startsWith("/") && !v.startsWith("//"))) ? v : null;
  };
  const scheduled = str(fd, "published_at", 40);
  const id = str(fd, "id", 60) || undefined;
  const prev = id ? await getPostById(id) : null;

  const input: PostInput = {
    id,
    slug,
    title,
    excerpt: str(fd, "excerpt", 400),
    content_md: str(fd, "content_md", 200_000),
    cover_image: url("cover_image"),
    cover_alt: str(fd, "cover_alt", 200) || null,
    tags: list(str(fd, "tags", 400)),
    seo_title: str(fd, "seo_title", 120) || null,
    seo_description: str(fd, "seo_description", 320) || null,
    seo_keywords: list(str(fd, "seo_keywords", 400)),
    canonical_url: url("canonical_url"),
    og_image: url("og_image"),
    author_name: str(fd, "author_name", 80) || site.name,
    status,
    // Keep the original publish date on edits; allow a date to be set for scheduling.
    published_at: scheduled ? new Date(scheduled).toISOString() : (prev?.published_at ?? null),
  };
  try {
    const saved = await savePost(input);
    await audit(admin.email, id ? "post.update" : "post.create", saved.slug, { status });
    revalidateBlog(saved.slug);
    if (prev && prev.slug !== saved.slug) revalidatePath(`/blog/${prev.slug}`);
    if (!id) redirect(`/admin/blog/${saved.id}?saved=1`);
    return { ok: true, msg: status === "published" ? "Saved and published." : "Draft saved." };
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e; // let redirect() through
    return fail(e);
  }
}

export async function deletePostAction(id: string) {
  const admin = await requireAdmin();
  const post = await getPostById(id);
  await deletePost(id);
  await audit(admin.email, "post.delete", post?.slug ?? id);
  revalidateBlog(post?.slug);
  redirect("/admin/blog");
}

export async function addStarterPostsAction(): Promise<Result> {
  const admin = await requireAdmin();
  const have = new Set((await listAllPosts()).map((p) => p.slug));
  let n = 0;
  for (const p of starterPosts) {
    if (have.has(p.slug)) continue;
    await savePost({ ...p, status: "draft", published_at: null });
    n++;
  }
  await audit(admin.email, "post.starters", undefined, { added: n });
  revalidatePath("/admin/blog");
  return { ok: true, msg: n ? `Added ${n} starter drafts. Review, then publish.` : "The starter posts are already here." };
}

/** Upload an image for a post. Returns its public URL. */
export async function uploadImageAction(_: unknown, fd: FormData): Promise<{ ok: boolean; msg: string; url?: string }> {
  const admin = await requireAdmin();
  const file = fd.get("file");
  if (!(file instanceof File) || !file.size) return { ok: false, msg: "Choose an image." };
  if (!/^image\/(png|jpe?g|webp|gif|avif)$/.test(file.type)) return { ok: false, msg: "Use PNG, JPG, WebP, GIF or AVIF." };
  if (file.size > 3 * 1024 * 1024) return { ok: false, msg: "Keep images under 3 MB (compress it first: squoosh.app)." };
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const name = `${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  try {
    const db = createAdminClient();
    const { error } = await db.storage.from("blog").upload(name, bytes, { contentType: file.type, cacheControl: "31536000" });
    if (error) throw error;
    const url = db.storage.from("blog").getPublicUrl(name).data.publicUrl;
    await audit(admin.email, "image.upload", url);
    return { ok: true, msg: "Uploaded.", url };
  } catch (e) {
    return { ok: false, msg: e instanceof Error ? e.message : "Upload failed." };
  }
}

/* ---------- Students ---------- */
export async function addNoteAction(userId: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const body = str(fd, "body", 4000);
  if (!body) return { ok: false, msg: "Write a note first." };
  try {
    await addNote(userId, admin.email, body);
    await audit(admin.email, "student.note", userId);
    revalidatePath(`/admin/students/${userId}`);
    revalidatePath("/admin/affairs");
    return { ok: true, msg: "Note added." };
  } catch (e) {
    return fail(e);
  }
}

export async function extendAccessAction(userId: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const days = Math.round(Number(fd.get("days")));
  if (!(days >= 1 && days <= 365)) return { ok: false, msg: "Days must be between 1 and 365." };
  try {
    const found = await getStudent(userId);
    if (!found?.student.plan) return { ok: false, msg: "This person has no track yet. Use “Grant a track” instead." };
    const current = found.student.accessEnd ? new Date(found.student.accessEnd) : new Date();
    const base = current > new Date() ? current : new Date();
    const end = new Date(base.getTime() + days * 86400_000);
    await setAccess(userId, found.student.plan, end);
    await audit(admin.email, "student.extend", userId, { days, until: end.toISOString() });
    revalidatePath(`/admin/students/${userId}`);
    return { ok: true, msg: `Access extended by ${days} days, to ${end.toDateString()}.` };
  } catch (e) {
    return fail(e);
  }
}

/** Grant a track, e.g. after a bank transfer outside Paystack. Records a manual payment. */
export async function grantTrackAction(userId: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const plan = String(fd.get("plan")) as PlanId;
  const p = getPlan(plan);
  if (!p) return { ok: false, msg: "Pick a track." };
  const amount = Math.max(0, Math.round(Number(fd.get("amount") || 0)));
  try {
    await recordSuccessfulPayment({ userId, plan, reference: `manual_${newReference(userId)}`, amountKobo: amount * 100, currency: "NGN", provider: "manual", raw: { by: admin.email, note: str(fd, "note", 300) } });
    await audit(admin.email, "student.grant", userId, { plan, amount });
    revalidatePath(`/admin/students/${userId}`);
    return { ok: true, msg: `${p.name} granted${amount ? ` and ₦${amount.toLocaleString()} recorded` : ""}.` };
  } catch (e) {
    return fail(e);
  }
}

export async function endAccessAction(userId: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  if (fd.get("confirm") !== "END") return { ok: false, msg: "Type END to confirm." };
  try {
    await endAccess(userId);
    await audit(admin.email, "student.end_access", userId);
    revalidatePath(`/admin/students/${userId}`);
    return { ok: true, msg: "Access ended." };
  } catch (e) {
    return fail(e);
  }
}

export async function updateProfileAction(userId: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const name = str(fd, "name", 80);
  if (!name) return { ok: false, msg: "Name can't be empty." };
  try {
    await updateProfile(userId, name, str(fd, "whatsapp", 30) || null);
    await audit(admin.email, "student.profile", userId, { name });
    revalidatePath(`/admin/students/${userId}`);
    return { ok: true, msg: "Profile saved." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- Certificates ---------- */
export async function certificateAction(id: string, _: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const cert = await getCertificate(id);
  if (!cert) return { ok: false, msg: "Certificate not found." };
  const op = String(fd.get("op"));
  try {
    if (op === "rename") {
      const name = str(fd, "name", 80);
      if (!name) return { ok: false, msg: "Name can't be empty." };
      await updateCertificate(id, { name });
    } else if (op === "email") {
      const email = str(fd, "email", 200) || cert.email;
      if (email !== cert.email) await updateCertificate(id, { email });
      const res = await emailCertificate({ ...cert, email });
      if (!res.ok) return { ok: false, msg: res.error ?? "Email failed." };
    } else if (op === "revoke") await updateCertificate(id, { revoked_at: new Date().toISOString() });
    else if (op === "restore") await updateCertificate(id, { revoked_at: null });
    else return { ok: false, msg: "Unknown action." };
    await audit(admin.email, `certificate.${op}`, id);
    revalidatePath("/admin/certificates");
    revalidatePath(`/admin/students/${cert.user_id}`);
    revalidatePath(`/certificate/${id}`);
    return { ok: true, msg: { rename: "Name updated.", email: "Certificate emailed.", revoke: "Certificate revoked.", restore: "Certificate restored." }[op]! };
  } catch (e) {
    return fail(e);
  }
}
