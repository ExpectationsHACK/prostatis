import { Plus } from "lucide-react";
import Link from "next/link";
import { ab, fmtDate, PageHead, Pill, Table, td } from "@/components/admin/blocks";
import { ActionForm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { listAllPosts } from "@/lib/blog";
import { addStarterPostsAction } from "../actions";
import { SetupError, safe } from "../setup-error";

export default async function AdminBlogPage() {
  await requireAdmin("/admin/blog");
  const res = await safe(listAllPosts);
  if (!res.ok) return <SetupError error={res.error} />;
  const posts = res.data;

  return (
    <div className="space-y-6">
      <PageHead title="Blog" crumbs={[{ label: "Content" }]} sub="Write, schedule and publish articles. Each post has its own search title, description and share image.">
        <ActionForm action={addStarterPostsAction}>
          <button className={`${ab.secondary} ${ab.sm}`}>Add 3 starter drafts</button>
        </ActionForm>
        <Link href="/admin/blog/new" className={`${ab.primary} ${ab.sm}`}>
          <Plus className="size-4" aria-hidden /> New post
        </Link>
      </PageHead>
      <Table head={["Title", "Status", "Tags", "Published", "Updated"]} empty={!posts.length}>
        {posts.map((p) => {
          const scheduled = p.status === "published" && p.published_at && new Date(p.published_at) > new Date();
          return (
            <tr key={p.id} className="hover:bg-wash">
              <td className={td}>
                <Link href={`/admin/blog/${p.id}`} className="font-bold hover:underline">{p.title}</Link>
                <p className="text-[11.5px] text-muted">/blog/{p.slug}</p>
              </td>
              <td className={td}>
                <Pill tone={p.status === "published" ? (scheduled ? "warn" : "ok") : "muted"}>{scheduled ? "scheduled" : p.status}</Pill>
              </td>
              <td className={td}>{p.tags.join(", ") || "-"}</td>
              <td className={td}>{fmtDate(p.published_at)}</td>
              <td className={td}>{fmtDate(p.updated_at, true)}</td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
