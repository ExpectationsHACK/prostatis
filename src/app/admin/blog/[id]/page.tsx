import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getPostById } from "@/lib/blog";
import { site } from "@/lib/site";
import { deletePostAction } from "../../actions";
import { PostEditor } from "../post-editor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin(`/admin/blog/${id}`);
  const post = await getPostById(id);
  if (!post) notFound();
  return <PostEditor post={post} siteUrl={site.url} onDelete={deletePostAction.bind(null, post.id)} />;
}
