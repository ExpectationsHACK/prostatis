import { PreFooterCta } from "@/components/pre-footer-cta";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <PreFooterCta />
      <SiteFooter />
    </>
  );
}
