import Link from "next/link";
import type { ReactNode } from "react";
import { Cover, type Tone } from "./cover";
import { byline } from "./ui";

type CoverSpec = { tone: Tone; lines: string[]; label?: string };

/** Substack post row: serif title, sans dek, uppercase byline, thumbnail on the right. */
export function PostRow({
  href,
  title,
  dek,
  meta,
  cover,
  children,
}: {
  href?: string;
  title: string;
  dek: string;
  meta: string;
  cover: CoverSpec;
  children?: ReactNode;
}) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[17px] sm:text-[19px] font-semibold leading-[1.35] text-ink group-hover:underline decoration-1">{title}</h3>
        <p className="mt-1 line-clamp-2 text-[15px] leading-snug text-muted">{dek}</p>
        <p className={`mt-2 ${byline}`}>{meta}</p>
        {children}
      </div>
      <Cover {...cover} size="sm" className="w-28 shrink-0 rounded-md sm:w-40" />
    </>
  );
  const cls = "group flex items-start gap-4 border-b border-line py-5 sm:gap-6";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Substack grid card: cover on top, then title, dek and byline. */
export function PostCard({
  href,
  title,
  dek,
  meta,
  cover,
  muted = false,
}: {
  href?: string;
  title: string;
  dek: string;
  meta: string;
  cover: CoverSpec;
  muted?: boolean;
}) {
  const body = (
    <>
      <Cover {...cover} className="rounded-md" />
      <h3 className="mt-3 font-display text-[17px] sm:text-[19px] font-semibold leading-[1.35] text-ink group-hover:underline decoration-1">{title}</h3>
      <p className="mt-1 line-clamp-2 text-[15px] leading-snug text-muted">{dek}</p>
      <p className={`mt-2 ${byline}`}>{meta}</p>
    </>
  );
  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <div className={"block " + (muted ? "opacity-60" : "")}>{body}</div>
  );
}

export function SectionHead({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      {action}
    </div>
  );
}
