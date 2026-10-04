import { Bell, ChevronDown, Globe, Settings } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/(site)/(auth)/actions";
import { LogoMark } from "@/components/brand";
import { Avatar } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminSidebar, MobileNav } from "./admin-nav";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const first = (admin.name || admin.email).split(/[\s@]/)[0];
  const icon = "grid size-10 place-items-center rounded-full text-[#3a3a44] hover:bg-[var(--a-head)]";

  return (
    <div className="admin-ui flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col overflow-y-auto border-r-2 border-[#151515] bg-[var(--a-side)] px-4 py-6 lg:flex">
        <Link href="/admin" className="mb-9 flex items-center gap-2.5 px-2">
          <LogoMark size={32} />
          <span className="display text-[16.5px] sm:text-[18px] text-[#151515]">{site.name}</span>
          <span className="rounded-full border-2 border-[#151515] bg-[var(--a-accent)] px-2 py-[1px] text-[11px] font-semibold text-[#151515]">Admin</span>
        </Link>
        <AdminSidebar preview={admin.preview} signOut={signOut} />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b-2 border-[#151515] bg-[#faf8f4]/95 px-4 backdrop-blur sm:px-8">
          <MobileNav preview={admin.preview} signOut={signOut} />
          <p className="min-w-0 flex-1 truncate text-[16px] text-[#1c1c22] sm:text-[18px]">
            Welcome back, <span className="font-semibold">{first}</span> <span aria-hidden>☀️</span>
          </p>
          <div className="flex items-center gap-1">
            <Link href="/admin/system" className={icon + " hidden sm:grid"} aria-label="Setup & health" title="Setup & health"><Settings className="size-5" /></Link>
            <Link href="/" className={icon + " hidden sm:grid"} aria-label="View site" title="View site"><Globe className="size-5" /></Link>
            <Link href="/admin/affairs" className={icon + " relative"} aria-label="Students who need attention" title="Student affairs">
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-[var(--a-accent)]" aria-hidden />
            </Link>
            <details className="relative ml-2">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full p-1 hover:bg-[var(--a-head)]" aria-label="Account">
                <Avatar name={admin.name || admin.email} size={36} />
                <ChevronDown className="size-4 text-[var(--a-muted)]" aria-hidden />
              </summary>
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-[var(--a-border)] bg-white p-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]">
                <p className="px-3 pt-2 text-[14px] font-semibold text-[#1c1c22]">{admin.name || "Admin"}</p>
                <p className="truncate px-3 pb-2 text-[12.5px] text-[var(--a-muted)]">{admin.email}</p>
                {!admin.preview && (
                  <form action={signOut} className="border-t border-[var(--a-border)] pt-1">
                    <button className="w-full rounded-lg px-3 py-2 text-left text-[13.5px] text-[#1c1c22] hover:bg-[var(--a-head)]">Sign out</button>
                  </form>
                )}
              </div>
            </details>
          </div>
        </header>
        {admin.preview && (
          <p className="border-b border-[#f5dca0] bg-[#fff8e6] px-4 py-2 text-[12.5px] text-[#6b4d05] sm:px-8">
            Local preview (development only): data comes from the .data/ folder. In production this area needs a confirmed admin account listed in ADMIN_EMAILS.
          </p>
        )}
        <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
