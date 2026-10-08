import type { Metadata } from "next";
import { Contact, LegalPage, Section } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", description: `How ${site.name} collects, uses and protects your personal data.`, alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="8 October 2026" intro={`${site.name} is run by ${site.company} ("we", "us"), which is responsible for your personal data. This explains what we collect, why, who helps us process it, and the rights you have under the Nigeria Data Protection Act 2023.`}>
      <Section title="What we collect">
        <ul>
          <li><strong>Your account:</strong> your name, email address and, if you give it, your WhatsApp number.</li>
          <li><strong>Payments:</strong> the track you bought, the amount, the date and Paystack&apos;s payment reference. Card and bank details are handled by Paystack; we never see or store them.</li>
          <li><strong>Your learning:</strong> quiz scores, completed tasks, XP, streaks and certificates, so the course can track your progress.</li>
          <li><strong>Emails you give us:</strong> when you join a mailing list on the site.</li>
          <li><strong>Visits:</strong> the page viewed, the website that sent you, your approximate country and city (from our host), and your device type. We don&apos;t use tracking cookies and don&apos;t store IP addresses; visits are counted with an anonymous code that changes every day.</li>
          <li><strong>How the site is used:</strong> which pages and buttons are used, and milestones such as finishing a lesson or paying, through PostHog. It keeps an ID in your browser&apos;s local storage (not a cookie). When you&apos;re signed in, it&apos;s linked to your account ID, never your name or email. We don&apos;t record your screen, and the admin pages and receipts are never tracked. If your browser sends &ldquo;Do Not Track&rdquo;, PostHog doesn&apos;t run.</li>
          <li><strong>Error reports:</strong> when something breaks, a technical report (the error, the page and your browser type) goes to Sentry so we can fix it. Signed-in reports carry your account ID only.</li>
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
        <p>Most tools run in your browser, and what you type is saved in your browser only. Some buttons send what you enter to a service to do their job, and only when you press them:</p>
        <ul>
          <li><strong>Website checks</strong> fetch the public page you enter; the speed check also sends that address to Google PageSpeed Insights.</li>
          <li><strong>&ldquo;Get real searches&rdquo; and &ldquo;Get real questions&rdquo;</strong> send the service and area you typed to Google&apos;s search suggestions.</li>
          <li><strong>&ldquo;Write it with AI&rdquo;</strong>, where it&apos;s switched on, sends that tool&apos;s inputs to Anthropic (the maker of Claude) to write the result. Don&apos;t put passwords, card numbers or other people&apos;s private details into a tool.</li>
          <li>The money tools load today&apos;s exchange rate from ExchangeRate-API; nothing you type is sent.</li>
        </ul>
      </Section>

      <Section title="Who helps us">
        <p>We use trusted providers to run the site: Supabase (accounts and database), Paystack (payments), Resend (email), Netlify (hosting), PostHog (usage analytics), Sentry (error reports), Google (speed checks and search suggestions) and Anthropic (AI writing in the free tools). They process data only to provide their service to us. Some store data outside Nigeria; we use providers that protect it with appropriate safeguards.</p>
      </Section>

      <Section title="Cookies">
        <p>We use only the cookies needed to keep you signed in and secure. No advertising or tracking cookies. Usage analytics keep an ID in local storage instead, as described above.</p>
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
