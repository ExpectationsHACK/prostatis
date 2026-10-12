import { CircleX, Hourglass, LayoutDashboard, RefreshCw, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Notice, StatusPage } from "@/components/status";
import { btn, size } from "@/components/ui";
import { getPlan } from "@/lib/membership";
import { cleanReference } from "@/lib/payment-status";
import { settlePayment, type Settled } from "@/lib/settle-payment";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { AutoCheck } from "./auto-check";

export const metadata: Metadata = { title: "Payment status", robots: { index: false } };

function Ref({ reference }: { reference: string }) {
  return (
    <>
      Payment reference: <span className="font-code break-all text-ink">{reference}</span>
      {site.contactEmail && (
        <>
          {" "}· Questions?{" "}
          <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Payment ${reference}`)}`} className="font-semibold text-ink underline">
            Email us
          </a>
        </>
      )}
    </>
  );
}

// Where Paystack's callback sends anything that isn't a clean success: pending bank transfers
// and USSD, declined cards, and payments we couldn't confirm yet. Every visit asks Paystack again.
export default async function PaymentStatusPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const reference = cleanReference((await searchParams).ref);
  if (!reference) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/checkout/status?ref=${reference}`)}`);

  let settled: Settled | null = null;
  try {
    settled = await settlePayment(reference);
  } catch (e) {
    console.error("payment status check failed", reference, e);
  }
  // Someone else's payment reference: don't confirm it even exists.
  if (settled && settled.userId !== user.id) notFound();
  if (settled?.outcome.kind === "success") redirect("/welcome");

  const plan = settled?.planId ? getPlan(settled.planId) : undefined;
  const retryHref = `/checkout/${plan?.id ?? "fast_track"}`;
  const checkAgain = (
    <Link href={`/checkout/status?ref=${encodeURIComponent(reference)}`} className={`${btn.secondary} ${size.md}`}>
      <RefreshCw className="size-4" aria-hidden /> Check again
    </Link>
  );

  if (!settled) {
    return (
      <StatusPage icon={ShieldAlert} tone="warning" title="We couldn't confirm your payment yet" actions={checkAgain} footnote={<Ref reference={reference} />}>
        We couldn&apos;t reach Paystack to check this payment just now. If money left your account, it isn&apos;t lost: your access opens as soon as Paystack confirms it. Check again in a minute.
      </StatusPage>
    );
  }

  if (settled.outcome.kind === "pending") {
    return (
      <StatusPage
        icon={Hourglass}
        tone="pending"
        title="Your payment is being confirmed"
        actions={
          <>
            {checkAgain}
            <Link href="/dashboard" className={`${btn.ghost} ${size.md}`}>
              <LayoutDashboard className="size-4" aria-hidden /> Go to dashboard
            </Link>
          </>
        }
        footnote={<Ref reference={reference} />}
      >
        <p>Your bank hasn&apos;t confirmed the {plan?.name ?? "payment"} yet. Bank transfers and USSD can take a few minutes. Keep this page open: it checks by itself.</p>
        <div className="mt-4">
          <AutoCheck />
        </div>
      </StatusPage>
    );
  }

  if (settled.outcome.kind === "failed") {
    return (
      <StatusPage
        icon={CircleX}
        title={settled.outcome.reversed ? "This payment was reversed" : "Your payment didn't go through"}
        actions={
          <Link href={retryHref} className={`${btn.primary} ${size.md}`}>
            <RefreshCw className="size-4" aria-hidden /> Try again
          </Link>
        }
        footnote={<Ref reference={reference} />}
      >
        <p>{settled.outcome.reason}</p>
        {!settled.outcome.reversed && (
          <Notice tone="info" className="mt-4 text-left">
            No money was taken for this attempt. If your bank shows a debit, it&apos;s a temporary hold that your bank releases, usually within 24 hours.
          </Notice>
        )}
      </StatusPage>
    );
  }

  return (
    <StatusPage icon={ShieldAlert} tone="warning" title="We need to check this payment" footnote={<Ref reference={reference} />}>
      This payment didn&apos;t match the price of the track, so we haven&apos;t opened access automatically. Message us with the reference below and we&apos;ll sort it out quickly.
    </StatusPage>
  );
}
