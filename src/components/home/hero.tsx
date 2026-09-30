import { ArrowRight, Award, Clock, Wallet } from "lucide-react";
import Link from "next/link";
import { LiveSite } from "@/components/art/live-site";
import { btn, size } from "@/components/ui";
import { formatNgn, plans, site } from "@/lib/site";

export function Hero() {
  const fast = plans.find((p) => p.id === "fast_track")!;

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* One soft wash of the accent behind the demo, nothing else. */}
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 size-[560px] rounded-full bg-brand/10 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[13px] font-medium text-ink">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            If you can type it, you can build it
          </p>
          <h1 className="display mt-6 text-balance text-[40px] text-ink sm:text-[56px] lg:text-[62px]">
            Learn to build <span className="text-brand">websites</span> with AI. And turn it into a source of <span className="text-brand">income</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted lg:mx-0">{site.subhead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/pricing" className={`${btn.primary} ${size.lg}`}>
              Enroll Now <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/tracks/fast-track" className={`${btn.secondary} ${size.lg}`}>
              Start Learning
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13.5px] text-muted lg:justify-start">
            <li className="flex items-center gap-1.5"><Clock className="size-4 text-ink" aria-hidden /> Fast Track in {fast.period}</li>
            <li className="flex items-center gap-1.5"><Wallet className="size-4 text-ink" aria-hidden /> {formatNgn(fast.priceNgn)}, paid once</li>
            <li className="flex items-center gap-1.5"><Award className="size-4 text-ink" aria-hidden /> Verified certificate</li>
          </ul>
        </div>

        {/* What you'll build: a fanned stack of three working website mock-ups */}
        <div className="mx-auto w-full max-w-[470px]">
          <div className="relative h-[300px] sm:h-[370px]">
            <div className="ink-block absolute left-0 top-6 w-[62%] -rotate-6 bg-card">
              <LiveSite kind="business" />
            </div>
            <div className="ink-block absolute right-0 top-0 w-[62%] rotate-[5deg] bg-card">
              <LiveSite kind="booking" />
            </div>
            <div className="ink-block absolute bottom-0 left-1/2 w-[70%] -translate-x-1/2 bg-card">
              <LiveSite kind="store" />
            </div>
          </div>
          <p className="mt-4 text-center text-[12.5px] text-muted">A business site, a booking system and an online store: three of the projects you build in the Fast Track.</p>
        </div>
      </div>
    </section>
  );
}
