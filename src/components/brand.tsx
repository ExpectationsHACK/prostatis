import Link from "next/link";

/** Our mark: an orange tile with a bracketed spark, "build" + "AI". */
export function LogoTile({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={"inline-grid shrink-0 place-items-center rounded-[22%] bg-brand text-brand-ink " + className} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 5H4.5v14H7" />
        <path d="M17 5h2.5v14H17" />
        <path d="M12 7.5l1.2 3.3 3.3 1.2-3.3 1.2L12 16.5l-1.2-3.3L7.5 12l3.3-1.2z" fill="currentColor" strokeWidth={1.2} />
      </svg>
    </span>
  );
}

/** The name in the headline face, as it has always appeared next to the tile. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={"display text-ink " + className}>STEINARK</span>;
}

export function Brand({ size = 32, name = true }: { size?: number; name?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="STEINARK home">
      <LogoTile size={size} />
      {name && <Wordmark className="text-[17px] sm:text-[20px]" />}
    </Link>
  );
}
