import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/(site)/(auth)/actions";
import { LogoMark } from "@/components/brand";
import { MemberIdentity, SignOutForm } from "@/components/member-identity";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { dashboardContext } from "@/lib/dashboard";
import { slugOf } from "@/lib/learning/access";
import { trackProgress } from "@/lib/learning/engine";
import { loadLearnerState } from "@/lib/learning/store";
import { hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { BottomNav, SideNav } from "./dash-nav";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

function Avatar({ name, email }: { name: string; email: string }) {
  const letter = (name || email || "?").trim().charAt(0).toUpperCase();
  return (
    <span className="grid size-9 shrink-0 place-items-center border border-edge bg-brand font-mono text-[14px] font-bold text-ink" aria-hidden>
      {letter}
    </span>
  );
}

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const { user, sub } = await dashboardContext();
  if (!user) redirect("/login?next=/dashboard");

  // Create the profile row on first visit (no-op afterwards).
  const supabase = await createClient();
  await supabase.from("profiles").upsert({ id: user.id, name: user.name, whatsapp_number: user.whatsapp || null }, { onConflict: "id", ignoreDuplicates: true });

  // Billing stays reachable without an active membership so members can renew.
  const active = hasAccess(sub);
  // The Main Track includes the Fast Track. Progress is read once per request (shared with the page).
  const owned = !active ? [] : sub!.plan === "main_track" ? [mainTrack, fastTrack] : [fastTrack];
  const state = owned.length ? await loadLearnerState(user.id) : null;
  const tracks = owned.map((t) => {
    const p = trackProgress(t, state!);
    return { href: `/learn/${slugOf(t)}`, name: t.name, done: p.completed, total: p.total };
  });

  return (
    <div className="paper-grid flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-edge bg-card px-3 py-5 lg:flex print:hidden">
        <Link href="/" className="flex items-center gap-2.5 px-2" aria-label={`${site.name} home`}>
          <LogoMark size={30} />
          <span className="display text-[16px] sm:text-[17px] text-ink">{site.name}</span>
        </Link>
        <SideNav whatsapp={site.whatsappInviteUrl} active={active} />
        {tracks.length > 0 && (
          <div className="mt-5 border-t border-line px-1 pt-4">
            <p className="label px-2 text-muted">Your tracks</p>
            <ul className="mt-2 space-y-0.5">
              {tracks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="flex h-10 items-center gap-2.5 rounded-[10px] px-2 text-[13.5px] font-semibold text-ink hover:bg-wash">
                    <span className={"size-2.5 shrink-0 rounded-full border border-edge " + (t.done === t.total ? "bg-success" : "bg-brand")} aria-hidden />
                    <span className="min-w-0 flex-1 truncate">{t.name}</span>
                    <span className="tabular-nums text-[12px] text-muted">{t.done}/{t.total}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Dark when the page below already has the orange action; orange only to enroll. */}
        <Link href={active ? "/learn" : "/pricing"} className={`${active ? btn.accent : btn.primary} ${size.md} mx-1 mt-5`}>
          {active ? "Start Learning" : "Enroll Now"}
        </Link>
        <div className="mt-auto flex items-center gap-2.5 border-t border-edge px-1 pt-4">
          <Avatar name={user.name} email={user.email} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-ink">{user.name || "Member"}</p>
            <p className="truncate font-mono text-[11.5px] text-muted">{user.email}</p>
          </div>
          <SignOutForm action={signOut}>
            <button className="grid size-9 place-items-center rounded-[8px] text-muted hover:bg-wash hover:text-ink" aria-label="Sign out" title="Sign out">
              <LogOut className="size-4" />
            </button>
          </SignOutForm>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-20 lg:pb-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-edge bg-paper/95 px-4 backdrop-blur-sm lg:hidden print:hidden">
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <LogoMark size={28} />
            <span className="display text-[16px] text-ink">{site.name}</span>
          </Link>
          <SignOutForm action={signOut}>
            <button className={`${btn.ghost} ${size.sm}`}>
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </SignOutForm>
        </header>
        {children}
      </div>

      <BottomNav whatsapp={site.whatsappInviteUrl} active={active} />
      <MemberIdentity id={user.id} plan={active ? sub!.plan : "none"} />
    </div>
  );
}
