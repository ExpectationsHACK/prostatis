import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/(site)/(auth)/actions";
import { LogoTile } from "@/components/brand";
import { btn, size } from "@/components/ui";
import { getMySubscription, hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { BottomNav, SideNav } from "./dash-nav";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

function Avatar({ name, email }: { name: string; email: string }) {
  const letter = (name || email || "?").trim().charAt(0).toUpperCase();
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-wash text-[13px] font-semibold text-ink" aria-hidden>
      {letter}
    </span>
  );
}

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  // Create the profile row on first visit (no-op afterwards).
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .upsert({ id: user.id, name: user.name, whatsapp_number: user.whatsapp || null }, { onConflict: "id", ignoreDuplicates: true });

  // Billing stays reachable without an active membership so members can renew.
  const active = hasAccess(await getMySubscription());

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-line px-3 py-5 lg:flex">
        <Link href="/" className="flex items-center gap-2.5 px-3" aria-label={`${site.name} home`}>
          <LogoTile size={30} />
          <span className="font-display text-[17px] font-semibold text-ink">{site.name}</span>
        </Link>
        <SideNav whatsapp={site.whatsappInviteUrl} active={active} />
        <Link href={active ? "/learn" : "/pricing"} className={`${btn.primary} ${size.md} mx-1 mt-5`}>
          {active ? "Continue learning" : "Join"}
        </Link>
        <div className="mt-auto flex items-center gap-2.5 border-t border-line px-2 pt-4">
          <Avatar name={user.name} email={user.email} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-ink">{user.name || "Member"}</p>
            <p className="truncate text-[12px] text-muted">{user.email}</p>
          </div>
          <form action={signOut}>
            <button className="grid size-8 place-items-center rounded-lg text-muted hover:bg-wash hover:text-ink" aria-label="Sign out" title="Sign out">
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-20 lg:pb-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-paper/95 px-4 backdrop-blur-sm lg:hidden">
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <LogoTile size={28} />
            <span className="font-display text-[16px] font-semibold text-ink">{site.name}</span>
          </Link>
          <form action={signOut}>
            <button className={`${btn.ghost} ${size.sm}`}>
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </form>
        </header>
        {children}
      </div>

      <BottomNav whatsapp={site.whatsappInviteUrl} active={active} />
    </div>
  );
}
