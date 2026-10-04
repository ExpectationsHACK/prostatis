import type { Metadata } from "next";
import Link from "next/link";
import { Contact, LegalPage, Section } from "@/components/legal";
import { plans, site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms", description: `The terms for using ${site.name} and its courses.`, alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="4 October 2026" intro={`${site.name} is a product of ${site.company}, which owns and runs it ("we", "us"). These terms apply when you use ${site.name}, its free tools and its courses. By creating an account or paying for a track, you agree to them.`}>
      <Section title="Your access">
        <ul>
          {plans.map((p) => (
            <li key={p.id}>
              The <strong>{p.name}</strong> is a one-time payment that opens the course for {p.accessDays} days from the day you pay.
            </li>
          ))}
          <li>Your account is for you alone. Please don&apos;t share your login or the course content.</li>
        </ul>
      </Section>

      <Section title="Payments">
        <p>Prices are in naira and paid through Paystack. There is no subscription and nothing renews automatically. Refunds follow our <Link href="/refund-policy" className="font-semibold underline">refund policy</Link>.</p>
      </Section>

      <Section title="What you build is yours">
        <p>The websites, pages and projects you build during the course belong to you or your clients. The course lessons, quizzes, videos and materials belong to {site.company}; you may use what you learn, but not copy or resell the materials.</p>
      </Section>

      <Section title="No income guarantee">
        <p>We teach real, practical skills and how to sell them, but we can&apos;t promise any particular income or number of clients. Results depend on your effort, your market and your clients.</p>
      </Section>

      <Section title="Third-party tools">
        <p>The course uses tools from other companies (for example Google Antigravity, Cloudflare, Supabase and Paystack). Their own terms and prices apply, and some have free plans with limits. We show you how to start free wherever we can.</p>
      </Section>

      <Section title="Certificates">
        <p>A certificate is issued when you complete every lesson and pass the final assessment. We may revoke a certificate earned by cheating or by someone else doing the work.</p>
      </Section>

      <Section title="Community">
        <p>Be respectful in the WhatsApp community. No spam, harassment or selling to members without permission. We may remove anyone who breaks these rules.</p>
      </Section>

      <Section title="Changes and contact">
        <p>We may update these terms and will change the date at the top when we do. These terms are governed by the laws of the Federal Republic of Nigeria. Questions? <Contact />.</p>
      </Section>
    </LegalPage>
  );
}
