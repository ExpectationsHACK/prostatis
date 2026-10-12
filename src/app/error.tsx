"use client";

import { ErrorView } from "@/components/error-view";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

// Errors outside the areas with their own boundary (the site, dashboard, learn and admin
// layouts each have one): keep the site's header and footer so the page never feels broken.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ErrorView error={error} retry={retry} />
      </main>
      <SiteFooter />
    </>
  );
}
