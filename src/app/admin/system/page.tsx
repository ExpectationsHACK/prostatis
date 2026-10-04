import { CircleCheck, CircleX } from "lucide-react";
import { PageHead, Panel, Pill } from "@/components/admin/blocks";
import { adminEmails, requireAdmin } from "@/lib/admin/auth";
import { tableStatus } from "@/lib/admin/data";
import { emailConfigured } from "@/lib/email";
import { adminConfigured } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { site } from "@/lib/site";

const MIGRATIONS = ["20260927000000_waitlist.sql", "20260927120000_membership.sql", "20260929120000_learning.sql", "20260930120000_admin_blog_analytics.sql"];

function Check({ ok, title, fix }: { ok: boolean; title: string; fix: string }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      {ok ? <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden /> : <CircleX className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />}
      <div>
        <p className="font-bold text-ink">{title}</p>
        {!ok && <p className="font-mono text-[12.5px] leading-relaxed text-muted">{fix}</p>}
      </div>
    </li>
  );
}

export default async function SystemPage() {
  await requireAdmin("/admin/system");
  const tables = await tableStatus().catch((e: Error) => [{ table: "all", ok: false, rows: null, error: e.message }]);
  const env = (k: string) => Boolean(process.env[k]);

  return (
    <div className="space-y-6">
      <PageHead title="Setup & health" sub="What's configured, what's missing, and how to fix it. Secrets are never shown here." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Configuration">
          <ul className="divide-y divide-line">
            <Check ok={supabaseConfigured} title="Supabase URL and publishable key" fix="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY." />
            <Check ok={adminConfigured()} title="Supabase secret key (server only)" fix="Set SUPABASE_SECRET_KEY from Supabase → Project Settings → API Keys." />
            <Check ok={adminEmails().length > 0} title={`Admin emails: ${adminEmails().join(", ") || "none"}`} fix="Set ADMIN_EMAILS (comma-separated). Only these confirmed accounts can open /admin." />
            <Check ok={env("PAYSTACK_SECRET_KEY")} title="Paystack secret key" fix="Set PAYSTACK_SECRET_KEY (sk_test_… while testing, sk_live_… to take real payments)." />
            <Check ok={emailConfigured()} title="Email sending (certificates)" fix="Create a free Resend account, verify your domain, then set RESEND_API_KEY and EMAIL_FROM (e.g. Prostatis <hello@yourdomain.com>)." />
            <Check ok={env("PAGESPEED_API_KEY")} title="Google PageSpeed key (speed tools)" fix="Set PAGESPEED_API_KEY. Without it the speed tools use their quick built-in check." />
            <Check ok={Boolean(site.whatsappInviteUrl)} title="WhatsApp community invite link" fix="Set NEXT_PUBLIC_WHATSAPP_INVITE_URL." />
            <Check ok={!site.url.includes("localhost") || process.env.NODE_ENV !== "production"} title={`Site URL: ${site.url}`} fix="Set NEXT_PUBLIC_SITE_URL to your real domain in production (used in emails, certificates and the sitemap)." />
            <Check ok={!env("PAYMENTS_DEMO") || process.env.NODE_ENV !== "production"} title="Demo payments off in production" fix="Remove PAYMENTS_DEMO in production." />
          </ul>
        </Panel>

        <Panel title="Database tables">
          <ul className="divide-y divide-line font-mono text-[12.5px]">
            {tables.map((t) => (
              <li key={t.table} className="flex items-center justify-between gap-3 py-1.5">
                <span>{t.table}</span>
                {t.ok ? <Pill tone="ok">{t.rows} rows</Pill> : <Pill tone="bad">missing</Pill>}
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t-2 border-dashed border-line pt-3 font-mono text-[12.5px] leading-relaxed text-muted">
            <p>Missing tables? Open Supabase → SQL Editor and run these files from <code>supabase/migrations/</code>, in this order:</p>
            <ol className="mt-2 list-decimal pl-5 text-ink">
              {MIGRATIONS.map((m) => <li key={m}>{m}</li>)}
            </ol>
          </div>
        </Panel>
      </div>
    </div>
  );
}
