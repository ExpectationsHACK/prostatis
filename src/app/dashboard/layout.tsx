import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/(site)/(auth)/actions";
import { LogoTile } from "@/components/brand";
import { PreviewBanner } from "@/components/learn/stats";
import { btn, size } from "@/components/ui";
import { dashboardContext } from "@/lib/dashboard";
import { hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { BottomNav, SideNav } from "./dash-nav";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

function Avatar({ name, email }: { name: string; email: string }) {
  const letter = (name || email || "?").trim().charAt(0).toUpperCase();
  return (
    <span className="grid size-9 shrink-0 place-items-center border-2 border-edge bg-brand font-mono text-[14px] font-bold text-ink" aria-hidden>
      {letter}
    </span>
  );
}

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const { user, sub, preview } = await dashboardContext();
  if (!user) redirect("/login?next=/dashboard");

  if (!preview) {
    // Create the profile row on first visit (no-op afterwards).
    const supabase = await createClient();
    await supabase.from("profiles").upsert({ id: user.id, name: user.name, whatsapp_number: user.whatsapp || null }, { onConflict: "id", ignoreDuplicates: true });
  }

  // Billing stays reachable without an active membership so members can renew.
  const active = hasAccess(sub);

  return (
    <div className="paper-grid flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r-2 border-edge bg-card px-3 py-5 lg:flex">
        <Link href="/" className="flex items-center gap-2.5 px-2" aria-label={`${site.name} home`}>
          <LogoTile size={30} />
          <span className="display text-[17px] text-ink">{site.name}</span>
        </Link>
        <SideNav whatsapp={site.whatsappInviteUrl} active={active} />
        <Link href={active ? "/learn" : "/pricing"} className={`${btn.primary} ${size.md} mx-1 mt-5`}>
          {active ? "Start Learning" : "Enroll Now"}
        </Link>
        <div className="mt-auto flex items-center gap-2.5 border-t-2 border-edge px-1 pt-4">
          <Avatar name={user.name} email={user.email} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-ink">{user.name || "Member"}</p>
            <p className="truncate font-mono text-[11.5px] text-muted">{user.email}</p>
          </div>
          <form action={signOut}>
            <button className="grid size-9 place-items-center text-muted hover:bg-wash hover:text-ink" aria-label="Sign out" title="Sign out">
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-20 lg:pb-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b-2 border-edge bg-paper/95 px-4 backdrop-blur-sm lg:hidden">
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <LogoTile size={28} />
            <span className="display text-[16px] text-ink">{site.name}</span>
          </Link>
          <form action={signOut}>
            <button className={`${btn.ghost} ${size.sm}`}>
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </form>
        </header>
        {preview && <PreviewBanner />}
        {children}
      </div>

      <BottomNav whatsapp={site.whatsappInviteUrl} active={active} />
    </div>
  );
}
