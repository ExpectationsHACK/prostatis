import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Learn", robots: { index: false } };

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-grid flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-edge bg-paper/95 backdrop-blur print:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/learn" className="flex items-center gap-2" aria-label={`${site.name}: my learning`}>
            <LogoMark size={30} />
            <span className="display hidden text-[17px] text-ink sm:inline">{site.name}</span>
            <span className="label border border-edge bg-brand px-1.5 py-0.5 text-ink">Learn</span>
          </Link>
          <nav className="flex items-center gap-1 font-mono text-[12px] font-bold" aria-label="Learning">
            <Link href="/learn" className="px-2.5 py-2 text-ink hover:bg-wash">My tracks</Link>
            <Link href="/tools" className="hidden px-2.5 py-2 text-ink hover:bg-wash sm:block">Tools</Link>
            <Link href="/dashboard" className="px-2.5 py-2 text-ink hover:bg-wash">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
