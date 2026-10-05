import { PageHead } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { canEmailAnyone } from "@/lib/email";
import { listSubscribers } from "@/lib/newsletter";
import { safe } from "../../setup-error";
import { IssueEditor } from "../editor";

export default async function NewIssuePage() {
  const admin = await requireAdmin("/admin/newsletter/new");
  const subs = await safe(listSubscribers);
  return (
    <div className="space-y-6">
      <PageHead title="New issue" crumbs={[{ label: "Content" }, { label: "Newsletter", href: "/admin/newsletter" }]} />
      <IssueEditor issue={null} adminEmail={admin.email} subscribers={subs.data?.filter((s) => s.status === "subscribed").length ?? 0} canSend={canEmailAnyone()} />
    </div>
  );
}
