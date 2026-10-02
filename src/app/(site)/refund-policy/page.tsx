import type { Metadata } from "next";
import { Contact, LegalPage, Section } from "@/components/legal";
import { refund, site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy", description: `When and how you can get a refund from ${site.name}.`, alternates: { canonical: "/refund-policy" } };

// Owner to confirm the window and lesson limit before launch (set in src/lib/site.ts).
const REFUND_DAYS = refund.days;
const REFUND_MAX_LESSONS = refund.maxLessons;

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund policy" updated="1 October 2026" intro="We want you to be sure. If the course isn't right for you, here's how refunds work.">
      <Section title="Full refund">
        <p>
          Ask within <strong>{REFUND_DAYS} days</strong> of paying, and if you&apos;ve completed no more than <strong>{REFUND_MAX_LESSONS} lessons</strong>, we&apos;ll refund you in full. No long form, just tell us why so we can improve.
        </p>
      </Section>

      <Section title="When we can't refund">
        <ul>
          <li>After {REFUND_DAYS} days, or once you&apos;ve completed more than {REFUND_MAX_LESSONS} lessons.</li>
          <li>After your certificate has been issued.</li>
        </ul>
      </Section>

      <Section title="Charged twice or by mistake?">
        <p>Duplicate or mistaken payments are always refunded in full, whenever you tell us.</p>
      </Section>

      <Section title="How to ask">
        <p>
          To request a refund, <Contact /> with the email you signed up with and your payment reference. Refunds go back to your original payment method through Paystack, usually within 10 working days, and your course access ends when the refund is made.
        </p>
      </Section>
    </LegalPage>
  );
}
