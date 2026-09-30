import Link from "next/link";

/**
 * The STEINARK mark: a stone arch with its keystone, the strong opening you build through.
 * Ink on the orange tile. The same drawing is used for icons and share images (og-mark.tsx).
 */
export function ArchMark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5.5 20.5v-8.2a6.5 6.5 0 0 1 13 0v8.2" />
      <path d="M10.3 3.2h3.4l-.7 3.6h-2z" fill="currentColor" strokeWidth={1.4} />
      <path d="M3.5 20.5h17" />
    </svg>
  );
}

export function LogoTile({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={"inline-grid shrink-0 place-items-center rounded-[26%] bg-brand text-brand-ink " + className} style={{ width: size, height: size }} aria-hidden>
      <ArchMark size={Math.round(size * 0.64)} />
    </span>
  );
}

/** The wordmark: capitals with a little air between them. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={"font-semibold tracking-[0.12em] text-ink " + className}>STEINARK</span>;
}

export function Brand({ size = 32, name = true }: { size?: number; name?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="STEINARK home">
      <LogoTile size={size} />
      {name && <Wordmark className="text-[16px] sm:text-[18px]" />}
    </Link>
  );
}
