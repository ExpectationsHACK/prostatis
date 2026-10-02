import { ArrowRight, BadgeCheck, CalendarClock, Check, CircleHelp, Receipt, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { btn, size } from "@/components/ui";
import { longDate, money, myPayments } from "@/lib/billing";
import { dashboardContext } from "@/lib/dashboard";
import { getPlan, hasAccess } from "@/lib/membership";
import { formatNgn, plans, refund, site } from "@/lib/site";

export const metadata: Metadata = { title: "Billing", robots: { index: false } };

const DAY = 86400_000;

function Section({ title, icon: Icon, children, className = "" }: { title: string; icon: typeof Receipt; children: React.ReactNode; className?: string }) {
  return (
    <section className={"ink-block bg-card p-5 sm:p-6 " + className}>
      <h2 className="label flex items-center gap-1.5 text-brand-text">
        <Icon className="size-3.5" aria-hidden /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function BillingPage() {
  const { user, sub, preview } = await dashboardContext();
  if (!user) redirect("/login?next=/dashboard/billing");

  const active = hasAccess(sub);
  const plan = sub ? getPlan(sub.plan) : undefined;
  const payments = await myPayments(preview);
  const paid = payments.filter((p) => p.status === "success");
  const end = sub ? new Date(sub.current_period_end) : null;
  const daysLeft = end ? Math.max(0, Math.ceil((end.getTime() - new Date().getTime()) / DAY)) : 0;
  const lastPaid = paid.find((p) => p.plan === sub?.plan);
  const mainTrack = plans.find((p) => p.id === "main_track")!;
  const onFast = active && sub?.plan === "fast_track";

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:py-8">
      <h1 className="display text-[32px] leading-tight text-ink sm:text-[40px]">Billing</h1>
      <p className="mt-1 max-w-xl font-mono text-[13px] leading-relaxed text-muted">
        You pay once per track. There&apos;s no subscription, so nothing renews and your card is never charged again.
      </p>

      {/* Access */}
      <Section title="Your access" icon={BadgeCheck} className="mt-6">
        {sub && plan ? (
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="flex flex-wrap items-center gap-2">
                <span className="display text-[26px] leading-tight text-ink">{plan.name}</span>
                <span className={"label border border-edge px-2 py-0.5 " + (active ? "bg-[#e3f5e9] text-ink" : "bg-danger/10 text-danger")}>{active ? "Active" : "Ended"}</span>
              </p>
              <p className="mt-1 font-mono text-[13px] text-muted">
                Paid once{lastPaid ? `: ${money(lastPaid.amount_kobo, lastPaid.currency)} on ${longDate(lastPaid.created_at)}` : `: ${formatNgn(plan.priceNgn)}`}
                {plan.id === "main_track" && " · includes the Fast Track"}
              </p>
              <p className="mt-4 flex items-center gap-2 text-[15px] text-ink">
                <CalendarClock className="size-4 shrink-0 text-brand-text" aria-hidden />
                {active ? (
                  <span>
                    Access until <strong>{longDate(end!.toISOString())}</strong> · {daysLeft} day{daysLeft === 1 ? "" : "s"} left
                  </span>
                ) : (
                  <span>Access ended on {longDate(end!.toISOString())}. Your progress is saved: buy again to pick up where you stopped.</span>
                )}
              </p>
              {active && (
                <div className="mt-3 h-2.5 max-w-md border border-edge bg-paper" role="progressbar" aria-label="Access time left" aria-valuenow={daysLeft} aria-valuemin={0} aria-valuemax={plan.accessDays}>
                  <div className={"h-full " + (daysLeft <= 7 ? "bg-danger" : "bg-brand")} style={{ width: `${Math.min(100, (daysLeft / plan.accessDays) * 100)}%` }} />
                </div>
              )}
            </div>
            {active && (
              <Link href="/learn" className={`${btn.primary} ${size.md}`}>
                Start Learning <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        ) : (
          <div>
            <p className="display text-[24px] leading-tight text-ink">You haven&apos;t joined a track yet</p>
            <p className="mt-1 text-[15px] text-muted">Pick one below. One payment, no subscription.</p>
          </div>
        )}
      </Section>

      {/* Upgrade, renew or join */}
      {onFast && (
        <Section title="Upgrade to the Main Track" icon={Sparkles} className="mt-5">
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink">
            Keep everything you&apos;ve done and add the services businesses pay for every month. Your access is extended by {mainTrack.accessDays} days from your current end date.
          </p>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {mainTrack.results.slice(1, 5).map((r) => (
              <li key={r} className="flex gap-2 text-[14px] leading-snug text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden /> {r}
              </li>
            ))}
          </ul>
          <Link href={`/checkout/${mainTrack.id}`} className={`${btn.primary} ${size.md} mt-4`}>
            Enroll Now: Main Track · {formatNgn(mainTrack.priceNgn)}
          </Link>
        </Section>
      )}

      {active && !onFast && daysLeft <= 14 && (
        <Section title="Need more time?" icon={RotateCcw} className="mt-5">
          <p className="text-[15px] text-ink">
            Buying the track again adds {plan?.accessDays} days to your current end date, so you never lose days you&apos;ve paid for.
          </p>
          <Link href={`/checkout/${sub!.plan}`} className={`${btn.secondary} ${size.md} mt-4`}>
            Add {plan?.accessDays} days · {formatNgn(plan?.priceNgn ?? 0)}
          </Link>
        </Section>
      )}

      {!active && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {plans.map((p) => (
            <div key={p.id} className="ink-block flex flex-col bg-card p-5">
              <p className="label text-brand-text">{p.period}</p>
              <p className="display mt-1 text-[24px] text-ink">{p.name}</p>
              <p className="mt-1 text-[14px] leading-snug text-muted">{p.blurb}</p>
              <p className="display mt-3 text-[28px] text-ink">{formatNgn(p.priceNgn)}</p>
              <p className="font-mono text-[12px] text-muted">one payment · {p.accessDays} days of access</p>
              <Link href={`/checkout/${p.id}`} className={`${btn.primary} ${size.md} mt-4`}>
                {sub ? "Buy again" : "Enroll Now"}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      <Section title="Payment history" icon={Receipt} className="mt-5">
        {payments.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {payments.map((p) => (
              <li key={p.reference} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 py-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-ink">{getPlan(p.plan)?.name ?? p.plan}</p>
                  {p.sample && <p className="label mt-1 w-fit border border-edge bg-brand-wash px-1.5 py-0.5 text-brand-text">Preview sample · not a real payment</p>}
                  {!p.sample && p.provider === "demo" && <p className="label mt-1 w-fit border border-edge bg-brand-wash px-1.5 py-0.5 text-brand-text">Demo payment</p>}
                  <p className="mt-1 font-mono text-[12px] text-muted">{longDate(p.created_at)}</p>
                  <p className="break-all font-mono text-[11.5px] text-muted">Ref {p.reference}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="tabular text-[15px] font-bold text-ink">{money(p.amount_kobo, p.currency)}</p>
                  {p.status === "success" ? (
                    <Link href={`/dashboard/billing/receipt/${encodeURIComponent(p.reference)}`} className={`${btn.secondary} ${size.sm}`}>
                      <Receipt className="size-3.5" aria-hidden /> Receipt
                    </Link>
                  ) : (
                    <span className="label border border-edge bg-danger/10 px-2 py-1 text-danger">{p.status}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] text-muted">No payments yet. When you pay, your receipt appears here straight away.</p>
        )}
      </Section>

      {/* Help */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Section title="Refunds" icon={ShieldCheck}>
          <p className="text-[14px] leading-relaxed text-ink">
            Changed your mind? Ask within <strong>{refund.days} days</strong> of paying, having completed no more than <strong>{refund.maxLessons} lessons</strong>, for a full refund. Charged twice by mistake? That&apos;s always refunded.
          </p>
          <Link href="/refund-policy" className="mt-2 inline-block font-mono text-[12.5px] font-bold text-brand-text underline">
            Read the refund policy
          </Link>
        </Section>
        <Section title="Payment problem?" icon={CircleHelp}>
          <p className="text-[14px] leading-relaxed text-ink">
            Paid but your track didn&apos;t open, or the amount looks wrong? Send us your payment reference (it&apos;s on your receipt and in Paystack&apos;s email) and we&apos;ll sort it out.
          </p>
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`} className="mt-2 inline-block font-mono text-[12.5px] font-bold text-brand-text underline">
              {site.contactEmail}
            </a>
          ) : (
            <p className="mt-2 font-mono text-[12px] text-muted">[Support email: set NEXT_PUBLIC_CONTACT_EMAIL]</p>
          )}
        </Section>
      </div>
    </div>
  );
}
