import { CircleCheck, MailX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { btn, size } from "@/components/ui";
import { unsubscribeByToken } from "@/lib/newsletter";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false } };

async function confirm(form: FormData) {
  "use server";
  const token = String(form.get("t") ?? "");
  const who = await unsubscribeByToken(token);
  redirect(who ? "/unsubscribe?done=1" : "/unsubscribe?error=1");
}

// The link only asks; the button confirms. That way link scanners in mail apps can't
// unsubscribe people by opening the page.
export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ t?: string; done?: string; error?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="px-4 py-20 sm:py-28">
      <div className="ink-block mx-auto max-w-md bg-card p-8 text-center">
        {sp.done ? (
          <>
            <CircleCheck className="mx-auto size-10 text-success" aria-hidden />
            <h1 className="display mt-4 text-[28px] text-ink">You&apos;re unsubscribed</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">You won&apos;t get our newsletter any more. Changed your mind? Subscribe again from any page.</p>
            <Link href="/" className={`${btn.secondary} ${size.md} mt-6`}>Back to STEINARK</Link>
          </>
        ) : sp.error || !sp.t ? (
          <>
            <MailX className="mx-auto size-10 text-muted" aria-hidden />
            <h1 className="display mt-4 text-[28px] text-ink">That link didn&apos;t work</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">Use the unsubscribe link at the bottom of any email from us, or reply to the email and we&apos;ll remove you.</p>
          </>
        ) : (
          <form action={confirm}>
            <input type="hidden" name="t" value={sp.t} />
            <MailX className="mx-auto size-10 text-brand-text" aria-hidden />
            <h1 className="display mt-4 text-[28px] text-ink">Unsubscribe from our emails?</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">You&apos;ll stop getting the STEINARK newsletter. Course emails about your account still arrive.</p>
            <button className={`${btn.primary} ${size.lg} mt-6 w-full`}>Yes, unsubscribe me</button>
          </form>
        )}
      </div>
    </div>
  );
}
