import { notFound } from "next/navigation";
import { PageHead } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { canEmailAnyone } from "@/lib/email";
import { getIssue, listSubscribers } from "@/lib/newsletter";
import { safe } from "../../setup-error";
import { deleteIssueAction } from "../actions";
import { IssueEditor } from "../editor";

export default async function EditIssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireAdmin(`/admin/newsletter/${id}`);
  const issue = await getIssue(id);
  if (!issue) notFound();
  const subs = await safe(listSubscribers);
  return (
    <div className="space-y-6">
      <PageHead title={issue.subject} crumbs={[{ label: "Content" }, { label: "Newsletter", href: "/admin/newsletter" }]} />
      <IssueEditor
        issue={issue}
        adminEmail={admin.email}
        subscribers={subs.data?.filter((s) => s.status === "subscribed").length ?? 0}
        canSend={canEmailAnyone()}
        onDelete={deleteIssueAction.bind(null, issue.id)}
      />
    </div>
  );
}
