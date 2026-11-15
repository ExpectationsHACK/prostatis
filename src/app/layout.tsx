import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { NetworkStatus } from "@/components/network-status";
import { ServiceWorker } from "@/components/service-worker";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo's width axis gives the condensed, heavy uppercase display voice.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
// Only small code snippets use the mono face, so it loads when needed instead of competing with
// the page's first paint.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_NG" },
  // Google Search Console's "HTML tag" check: a netlify.app address can't be verified by DNS.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Analytics />
        <NetworkStatus />
        <ServiceWorker />
      </body>
    </html>
  );
}
