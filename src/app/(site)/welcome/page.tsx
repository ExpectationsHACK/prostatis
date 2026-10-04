import { BookOpen, CircleCheck, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { btn, size } from "@/components/ui";
import { getMySubscription, hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";
import { WhatsAppRedirect } from "./whatsapp-redirect";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

// After payment: a confirmation, then the two next steps.
export default async function WelcomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/welcome");
  const sub = await getMySubscription();
  if (!hasAccess(sub)) redirect("/pricing");
  const track = sub!.plan === "main_track" ? "main-track" : "fast-track";
  const first = (user.name || "").split(" ")[0];

  return (
    <div className="mx-auto max-w-[480px] px-4 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand-wash">
          <CircleCheck className="size-8 text-brand" aria-hidden />
        </span>
        <h1 className="display mt-5 text-[34px] sm:text-[44px] text-ink">
          You&apos;re in{first ? `, ${first}` : ""}
        </h1>
        <p className="mt-2 text-[16px] sm:text-[17px] text-muted">Payment confirmed. Welcome to {site.name}.</p>
      </div>

      <ol className="mt-10 divide-y divide-line border-y border-line">
        <li className="py-6">
          <p className="flex items-center gap-2 text-[16px] sm:text-[17px] font-semibold text-ink">
            <MessageCircle className="size-5 text-muted" aria-hidden /> Join the community
          </p>
          <p className="mb-4 mt-1 text-[15px] text-muted">Say hello, share what you're building and get unstuck.</p>
          {site.whatsappInviteUrl ? (
            <WhatsAppRedirect url={site.whatsappInviteUrl} />
          ) : (
            <p className="rounded-lg bg-sunk px-3 py-2.5 text-sm text-muted">
              The WhatsApp invite link isn't configured yet (set NEXT_PUBLIC_WHATSAPP_INVITE_URL).
            </p>
          )}
        </li>
        <li className="py-6">
          <p className="flex items-center gap-2 text-[16px] sm:text-[17px] font-semibold text-ink">
            <BookOpen className="size-5 text-muted" aria-hidden /> Start your first lesson
          </p>
          <p className="mb-4 mt-1 text-[15px] text-muted">It takes about an hour and ends with your first piece of real work. Your progress saves as you go.</p>
          <Link href={`/learn/${track}`} className={`${btn.primary} ${size.lg} w-full`}>
            Start Learning
          </Link>
        </li>
      </ol>
    </div>
  );
}
