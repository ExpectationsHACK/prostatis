import type { Metadata } from "next";
import Link from "next/link";
import { PlanCard } from "@/components/plan-card";
import { plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing: Fast Track ₦15,000 · Main Track ₦30,000",
  description: "Pay once in naira. The 14-day Fast Track takes you from zero to your first paid website; the one-month Main Track adds SEO, automation, AI agents and lead generation.",
};

const pricingFaqs = [
  { q: "How do I pay?", a: "Once, in naira, through Paystack: card, bank transfer or USSD. No subscription and no dollar card needed." },
  { q: "What happens right after I pay?", a: "Your dashboard and first lesson unlock immediately, and you get the invite to the WhatsApp community." },
  { q: "How long do I keep access?", a: "The Fast Track stays open for 30 days and the Main Track for 60: the track itself plus time to catch up." },
  { q: "Do I get a certificate?", a: "Yes, on both tracks. Pass every lesson and the final assessment and your certificate is ready to download, emailed to you, and verifiable on a public page." },
  { q: "Can I upgrade later?", a: "Yes. Everything in the Fast Track is part of the Main Track, so nothing you've learned is wasted." },
  { q: "What if it's not for me?", a: "Read the refund policy before you pay. It explains when you can get your money back and how." },
];

export default function PricingPage() {
  // The Fast Track is the main offer, so it always comes first.
  const ordered = [...plans].sort((a, b) => Number(b.id === "fast_track") - Number(a.id === "fast_track"));

  return (
    <div>
      <header className="border-b-2 border-ink bg-card px-4 py-14 text-center sm:py-20">
        <p className="label text-brand-text">Pricing</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-balance text-[40px] text-ink sm:text-[60px]">Pay once. Keep everything you build.</h1>
        <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted">
          Start with the Fast Track to build and sell websites in 14 days. Choose the Main Track to sell SEO, automation and AI agents on top.
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 md:grid-cols-2">
        {ordered.map((p) => (
          <PlanCard key={p.id} plan={p} badge={p.highlight ? "Start here" : "Everything"} />
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-20">
        <p className="ink-block bg-brand-wash px-5 py-4 text-center text-[15px] text-ink">
          Not ready yet? All 50 tools are free, no signup.{" "}
          <Link href="/tools" className="font-semibold underline">
            Start with those
          </Link>
          .
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {pricingFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[16px] font-semibold text-ink">{f.q}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                {f.a}
                {f.q.startsWith("What if") && (
                  <>
                    {" "}
                    <Link href="/refund-policy" className="font-semibold text-ink underline">
                      Refund policy
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
