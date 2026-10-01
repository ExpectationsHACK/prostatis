"use client";

import { ArrowLeft, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useMemo, useState } from "react";
import { ab, afield, alabel } from "@/components/admin/blocks";
import { layout, mdToEmailHtml, unsubscribeFooter } from "@/lib/email-templates";
import type { Issue } from "@/lib/newsletter";
import { issueAction } from "./actions";

/** Write, preview (the real email, rendered), test and send one newsletter issue. */
export function IssueEditor({ issue, adminEmail, subscribers, canSend, onDelete }: { issue: Issue | null; adminEmail: string; subscribers: number; canSend: boolean; onDelete?: () => Promise<void> }) {
  const [state, run, pending] = useActionState(issueAction, null);
  const [f, setF] = useState({ subject: issue?.subject ?? "", preheader: issue?.preheader ?? "", body_md: issue?.body_md ?? "" });
  const [confirm, setConfirm] = useState("");
  const sent = issue && issue.status !== "draft";

  const preview = useMemo(
    () => layout({ preheader: f.preheader || f.subject, heading: f.subject || "Your subject line", bodyHtml: mdToEmailHtml(f.body_md || "Start writing on the left. You can use **bold**, [links](https://example.com), lists and ## headings."), footerHtml: unsubscribeFooter("#") }),
    [f],
  );

  const submit = (op: "save" | "test" | "send") => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form!;
    const fd = new FormData(form);
    fd.set("op", op);
    // A manual submit, so the form isn't reset after the action and the fields keep their text.
    startTransition(() => run(fd));
  };

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <input type="hidden" name="id" value={issue?.id ?? ""} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/newsletter" className="inline-flex items-center gap-1.5 text-[13px] text-[var(--a-muted)] hover:text-[#1c1c22]">
          <ArrowLeft className="size-4" aria-hidden /> All issues
        </Link>
        {!sent && (
          <div className="flex flex-wrap gap-2">
            <button onClick={submit("save")} disabled={pending} className={ab.secondary}>Save draft</button>
            <button onClick={submit("test")} disabled={pending} className={ab.secondary}>Send me a test</button>
          </div>
        )}
      </div>
      {state && <p role="status" className={"text-[13.5px] font-semibold " + (state.ok ? "text-[#16794a]" : "text-[#c0392b]")}>{state.msg}</p>}
      {sent && <p className="rounded-[10px] bg-[#effaf3] px-3 py-2 text-[13.5px] text-[#1f7a4d]">This issue was sent to {issue.recipients} subscribers. It can&apos;t be edited any more.</p>}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <label className="block">
            <span className={alabel}>Subject line</span>
            <input name="subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} disabled={!!sent} className={afield + " text-[16px] font-semibold"} placeholder="5 free tools that save you hours on client work" maxLength={150} required />
          </label>
          <label className="block">
            <span className={alabel}>Preview text (shown after the subject in the inbox)</span>
            <input name="preheader" value={f.preheader} onChange={(e) => setF({ ...f, preheader: e.target.value })} disabled={!!sent} className={afield} placeholder="Plus a new lesson on pricing your first website" maxLength={200} />
          </label>
          <label className="block">
            <span className={alabel}>Email body (Markdown: ## heading, **bold**, [link](url), - list, &gt; quote)</span>
            <textarea name="body_md" value={f.body_md} onChange={(e) => setF({ ...f, body_md: e.target.value })} disabled={!!sent} rows={18} className={afield + " font-mono text-[13.5px] leading-relaxed"} placeholder={"Hi,\n\nThis week we added…\n\n## What's new\n\n- …"} />
          </label>
          <label className="block">
            <span className={alabel}>Send the test to</span>
            <input name="test_to" defaultValue={adminEmail} className={afield} type="email" />
          </label>

          {!sent && (
            <div className="rounded-[14px] border-2 border-[#151515] p-4 shadow-[3px_3px_0_#151515]">
              <p className="text-[14px] font-semibold">Send to {subscribers} subscriber{subscribers === 1 ? "" : "s"}</p>
              <p className="mt-1 text-[12.5px] text-[var(--a-muted)]">{canSend ? "This sends immediately and can't be undone. Send yourself a test first." : "Sending is on hold until your domain is verified in Resend (see the Newsletter page)."}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <input name="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type SEND" className={afield + " w-32"} autoComplete="off" aria-label="Type SEND to confirm" />
                <button onClick={submit("send")} disabled={pending || !canSend || confirm !== "SEND" || subscribers === 0} className={ab.primary}>
                  <Send className="size-4" aria-hidden /> Send now
                </button>
              </div>
            </div>
          )}
          {onDelete && !sent && (
            <button
              type="button"
              className={ab.danger}
              onClick={async () => {
                if (window.confirm("Delete this draft?")) await onDelete();
              }}
            >
              <Trash2 className="size-4" aria-hidden /> Delete draft
            </button>
          )}
        </div>

        <div>
          <p className={alabel}>Preview: exactly what subscribers will get</p>
          <iframe title="Email preview" srcDoc={preview} sandbox="" className="h-[760px] w-full rounded-[14px] border border-[var(--a-border)] bg-white" />
        </div>
      </div>
    </form>
  );
}
