import { CreditCard, LayoutDashboard, ShieldX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { StatusPage } from "@/components/status";
import { btn, size } from "@/components/ui";

export const metadata: Metadata = { title: "Not part of your plan", robots: { index: false } };

// 403: signed in, but this account can't open the page (e.g. the Main Track on a Fast Track plan).
// It renders inside the layout of the page that called forbidden(), which brings its own header.
export default function Forbidden() {
  return (
    <StatusPage
      code="403"
      icon={ShieldX}
      title="This isn't part of your plan"
      actions={
        <>
          <Link href="/dashboard/billing" className={`${btn.primary} ${size.md}`}>
            <CreditCard className="size-4" aria-hidden /> Upgrade in Billing
          </Link>
          <Link href="/dashboard" className={`${btn.secondary} ${size.md}`}>
            <LayoutDashboard className="size-4" aria-hidden /> My dashboard
          </Link>
        </>
      }
      footnote="Upgrading keeps all your progress: lessons you've finished count in both tracks."
    >
      You&apos;re signed in, but your account doesn&apos;t include this page. If it&apos;s the Main Track, you can upgrade from Billing and it opens straight away.
    </StatusPage>
  );
}
