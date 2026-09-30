import type { ReactNode } from "react";
import { site } from "@/lib/site";

/** Shared layout for the legal pages: narrow column, readable type, a clear "last updated". */
export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <article className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-[13px] font-medium text-muted">Last updated {updated}</p>
        <h1 className="display mt-2 text-[36px] text-ink sm:text-[44px]">{title}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{intro}</p>
        <div className="mt-10 space-y-9 text-[16px] leading-[1.75] text-ink [&_h2]:text-[20px] [&_h2]:font-semibold [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_p+p]:mt-3">{children}</div>
      </div>
    </article>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** How to reach us: the contact email when it's set, otherwise a route that always works. */
export function Contact() {
  return site.contactEmail ? (
    <>
      email{" "}
      <a href={`mailto:${site.contactEmail}`} className="font-semibold underline">
        {site.contactEmail}
      </a>
    </>
  ) : (
    <>reply to any email you have received from us</>
  );
}
