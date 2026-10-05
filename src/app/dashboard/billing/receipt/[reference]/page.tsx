import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoMark } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { longDate, money, myPayment } from "@/lib/billing";
import { dashboardContext } from "@/lib/dashboard";
import { getPlan } from "@/lib/membership";
import { site } from "@/lib/site";
import { PrintButton } from "./print-button";

export const metadata: Metadata = { title: "Receipt", robots: { index: false } };

export default async function ReceiptPage({ params }: { params: Promise<{ reference: string }> }) {
  const { user } = await dashboardContext();
  const { reference } = await params;
  if (!user) redirect("/login?next=/dashboard/billing");
  // RLS returns only the member's own payments, so another person's reference is simply not found.
  const p = await myPayment(decodeURIComponent(reference));
  if (!p || p.status !== "success") notFound();
  const plan = getPlan(p.plan);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/dashboard/billing" className={`${btn.ghost} ${size.sm}`}>
          <ArrowLeft className="size-4" aria-hidden /> Back to billing
        </Link>
        <PrintButton />
      </div>

      <article className="ink-block bg-card p-6 sm:p-8 print:border-0 print:shadow-none">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-edge pb-5">
          <div className="flex items-center gap-2.5">
            <LogoMark size={34} />
            <span className="display text-[18px] sm:text-[20px] text-ink">{site.name}</span>
          </div>
          <div className="text-right">
            <p className="display text-[22px] sm:text-[26px] leading-none text-ink">RECEIPT</p>
            <p className="mt-1 font-mono text-[12px] text-muted">{longDate(p.created_at)}</p>
          </div>
        </header>

        <dl className="mt-5 grid gap-x-6 gap-y-3 text-[14px] sm:grid-cols-2">
          <div>
            <dt className="label text-muted">Paid by</dt>
            <dd className="mt-0.5 text-ink">
              {user.name || "Member"}
              <br />
              <span className="break-all text-muted">{user.email}</span>
            </dd>
          </div>
          <div>
            <dt className="label text-muted">Reference</dt>
            <dd className="mt-0.5 break-all font-mono text-[13px] text-ink">{p.reference}</dd>
          </div>
          <div>
            <dt className="label text-muted">Paid with</dt>
            <dd className="mt-0.5 text-ink">{p.provider === "paystack" ? "Paystack" : "Recorded by Prostatis (bank transfer or other)"}</dd>
          </div>
          <div>
            <dt className="label text-muted">Status</dt>
            <dd className="mt-0.5 font-semibold text-success">Paid</dd>
          </div>
        </dl>

        <table className="tabular mt-6 w-full text-left text-[14px]">
          <thead className="border-b border-edge text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2 font-semibold">Item</th>
              <th className="py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line">
              <td className="py-3 text-ink">
                {plan?.name ?? p.plan}: one-time payment
                {plan && <span className="block text-[12.5px] text-muted">{plan.accessDays} days of course access, community and certificate on passing the final</span>}
              </td>
              <td className="py-3 text-right text-ink">{money(p.amount_kobo, p.currency)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-3 font-bold text-ink">Total paid</td>
              <td className="pt-3 text-right text-[16.5px] sm:text-[18px] font-bold text-ink">
                {money(p.amount_kobo, p.currency)} {p.currency}
              </td>
            </tr>
          </tfoot>
        </table>

        <p className="mt-8 border-t border-line pt-4 text-[12.5px] leading-relaxed text-muted">
          One-time payment: nothing renews. Keep this receipt for your records.
          {site.contactEmail ? ` Questions? ${site.contactEmail}` : ""}
        </p>
      </article>
    </div>
  );
}
