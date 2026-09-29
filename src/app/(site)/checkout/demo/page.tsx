import { FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoTile } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { getPlan } from "@/lib/membership";
import { paymentsMode } from "@/lib/paystack";
import { formatNgn, site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { completeDemoPayment } from "../actions";

export const metadata: Metadata = { title: "Demo checkout", robots: { index: false } };

export default async function DemoCheckoutPage({ searchParams }: PageProps<"/checkout/demo">) {
  const sp = await searchParams; // read first so this page renders per request
  if (paymentsMode() !== "demo") redirect("/pricing");
  const plan = getPlan(String(sp.plan ?? ""));
  const reference = String(sp.reference ?? "");
  if (!plan || !reference) redirect("/pricing");
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-[400px] px-4 py-14">
      <p className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-brand-wash px-3 py-2 text-[13px] font-semibold text-ink">
        <FlaskConical className="size-4 text-brand-text" aria-hidden /> Demo checkout — simulates Paystack. No real payment.
      </p>
      <div className="rounded-xl border border-line bg-card p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <LogoTile size={32} />
            <div className="min-w-0">
              <p className="truncate text-[13px] text-muted">{user.email}</p>
              <p className="text-[13px] font-semibold text-ink">{site.name}</p>
            </div>
          </div>
          <p className="tabular text-right text-[13px] text-muted">
            Pay <span className="block text-lg font-semibold text-ink">{formatNgn(plan.priceNgn)}</span>
          </p>
        </div>
        <p className="mt-4 text-[14px] text-ink">{plan.name} membership</p>
        <p className="mt-1 break-all font-mono text-[11px] text-muted">{reference}</p>

        <form action={completeDemoPayment} className="mt-6 space-y-2">
          <input type="hidden" name="plan" value={plan.id} />
          <input type="hidden" name="reference" value={reference} />
          <button name="outcome" value="success" className={`${btn.primary} ${size.lg} w-full`}>
            Simulate successful payment
          </button>
          <button name="outcome" value="failed" className={`${btn.secondary} ${size.lg} w-full`}>
            Simulate declined card
          </button>
        </form>
      </div>
    </div>
  );
}
