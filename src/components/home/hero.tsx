import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductThumb } from "@/components/art/product-thumb";
import { Marquee } from "@/components/marquee";
import { btn, size } from "@/components/ui";
import { formatNgn, plans, site } from "@/lib/site";

const chipRows = [
  ["Landing pages", "Business websites", "Online stores", "Web apps", "Booking sites", "Portfolios", "Restaurant menus", "School sites"],
  ["Next.js", "Tailwind", "Deploy to Vercel", "Custom domains", "SEO", "Paystack checkout", "WhatsApp buttons", "Mobile-first"],
  ["Hero sections", "Pricing pages", "Contact forms", "Blogs", "Dashboards", "Client portals", "Admin panels", "Fast on 4G"],
  ["Redesigns", "Website retainers", "Dollar clients", "Proposals", "Get paid", "AI agents", "Automations", "Lead generation"],
];

function Chip({ text }: { text: string }) {
  return (
    <span className="whitespace-nowrap border-2 border-edge/60 bg-paper/25 px-3.5 py-2 font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-ink/70">
      {text}
    </span>
  );
}

export function Hero() {
  const from = Math.min(...plans.map((p) => p.priceNgn));

  return (
    <section className="field-grid relative isolate overflow-hidden border-b-2 border-edge bg-brand">
      {/* Drifting chips: everything you'll learn to make */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 flex h-[50svh] -translate-y-1/2 flex-col justify-evenly overflow-hidden opacity-30 motion-reduce:opacity-20 lg:inset-y-0 lg:h-auto lg:translate-y-0 lg:justify-center lg:gap-4" aria-hidden>
        {chipRows.map((row, i) => (
          <Marquee key={i} reverse={i % 2 === 1} seconds={40 + i * 8} gap="gap-4">
            {row.map((t) => (
              <Chip key={t} text={t} />
            ))}
          </Marquee>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div className="text-center lg:text-left">
          <p className="ink-block label inline-flex -rotate-1 items-center gap-2 bg-paper px-3.5 py-2 text-ink">
            <span className="size-2 bg-accent" aria-hidden />
            Websites first · no code needed
          </p>
          <h1 className="display mt-7 text-balance text-[46px] text-ink sm:text-[68px] lg:text-[80px]">
            Build <span className="text-paper [text-shadow:3px_3px_0_var(--edge)]">websites</span> with AI. Get paid in dollars.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-mono text-[15px] leading-relaxed text-ink lg:mx-0">{site.subhead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link href="/pricing" className={`${btn.secondary} ${size.lg} bg-paper`}>
              Choose your track <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/tools" className={`${btn.accent} ${size.lg}`}>
              Try the free tools
            </Link>
          </div>
          <p className="label mt-4 text-ink/80">Fast Track 14 days · Main Track 1 month · from {formatNgn(from)}</p>
        </div>

        {/* What you'll build: a fanned stack of real website thumbnails */}
        <div className="relative mx-auto h-[300px] w-full max-w-[440px] sm:h-[360px]">
          <div className="ink-block absolute left-0 top-6 w-[62%] -rotate-6 bg-card">
            <ProductThumb kind="restaurant" tone="sand" />
          </div>
          <div className="ink-block absolute right-0 top-0 w-[62%] rotate-[5deg] bg-card">
            <ProductThumb kind="store" tone="peach" />
          </div>
          <div className="ink-block absolute bottom-0 left-1/2 w-[68%] -translate-x-1/2 bg-card">
            <ProductThumb kind="coach" tone="forest" />
          </div>
        </div>
      </div>
    </section>
  );
}
