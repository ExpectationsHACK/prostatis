import { PreFooterCta } from "@/components/pre-footer-cta";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { formatNgn, plans } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <PreFooterCta from={formatNgn(Math.min(...plans.map((p) => p.priceNgn)))} />
      <SiteFooter />
    </>
  );
}
