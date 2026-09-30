import { requireAdmin } from "@/lib/admin/auth";
import { site } from "@/lib/site";
import { PostEditor } from "../post-editor";

export default async function NewPostPage() {
  await requireAdmin("/admin/blog/new");
  return <PostEditor post={null} siteUrl={site.url} />;
}
