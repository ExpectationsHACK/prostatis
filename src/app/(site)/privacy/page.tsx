import type { Metadata } from "next";
import { Contact, LegalPage, Section } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", description: `How ${site.name} collects, uses and protects your personal data.`, alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="1 October 2026" intro={`This explains what personal data ${site.name} collects, why, who helps us process it, and the rights you have under the Nigeria Data Protection Act 2023.`}>
      <Section title="What we collect">
        <ul>
          <li><strong>Your account:</strong> your name, email address and, if you give it, your WhatsApp number.</li>
          <li><strong>Payments:</strong> the track you bought, the amount, the date and Paystack&apos;s payment reference. Card and bank details are handled by Paystack; we never see or store them.</li>
          <li><strong>Your learning:</strong> quiz scores, completed tasks, XP, streaks and certificates, so the course can track your progress.</li>
          <li><strong>Emails you give us:</strong> when you join a mailing list on the site.</li>
          <li><strong>Visits:</strong> the page viewed, the website that sent you, your approximate country and city (from our host), and your device type. We don&apos;t use tracking cookies and don&apos;t store IP addresses; visits are counted with an anonymous code that changes every day.</li>
        </ul>
      </Section>

      <Section title="Why we use it">
        <ul>
          <li>To give you access to the course you paid for and keep your progress.</li>
          <li>To issue, email and verify your certificate.</li>
          <li>To answer your questions and help you when you&apos;re stuck.</li>
          <li>To send the emails you asked for. You can unsubscribe at any time.</li>
          <li>To understand which pages help people, so we can improve the site.</li>
        </ul>
        <p>We don&apos;t sell your data or share it with advertisers.</p>
      </Section>

      <Section title="Your certificate is public by design">
        <p>A certificate has a public page showing your name, track, score, date and certificate ID, so clients and employers can check it&apos;s real. Ask us and we&apos;ll take it down.</p>
      </Section>

      <Section title="The free tools">
        <p>Most tools run in your browser, and what you type is saved in your browser only. Tools that check a website fetch the public page you enter; the speed check also sends that address to Google PageSpeed Insights.</p>
      </Section>

      <Section title="Who helps us">
        <p>We use trusted providers to run the site: Supabase (accounts and database), Paystack (payments), Resend (email), Vercel (hosting) and Google (speed checks). They process data only to provide their service to us. Some store data outside Nigeria; we use providers that protect it with appropriate safeguards.</p>
      </Section>

      <Section title="Cookies">
        <p>We use only the cookies needed to keep you signed in and secure. No advertising or tracking cookies.</p>
      </Section>

      <Section title="How long we keep it">
        <p>We keep your account and learning data while your account is open, and payment records for as long as the law requires. Close your account and we&apos;ll delete the rest.</p>
      </Section>

      <Section title="Your rights">
        <p>You can ask to see, correct or delete your data, object to how we use it, or withdraw consent at any time. To do any of this, <Contact />. If you&apos;re not happy with our answer, you can complain to the Nigeria Data Protection Commission (NDPC).</p>
      </Section>
    </LegalPage>
  );
}
