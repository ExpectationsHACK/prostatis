import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo's width axis gives the condensed, heavy uppercase display voice.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_NG" },
};

const contract = `
THESIS: a loud, poster-scale club page: the work itself (real tool outputs, example builds) slides behind the promise, instead of a quiet text hero.
OWN-WORLD: near-black ink stage with an orange #FF6719 glow; white body sections; condensed heavy uppercase Archivo headlines; Geist UI text; artifact cards (mono outputs on flat colour fields) as the imagery system.
STORY: see the builds, believe you can make them, try a free tool, join via Paystack.
FIRST VIEWPORT: dark hero, three rows of artifact cards drifting in alternating directions at low opacity under an orange glow; centred uppercase headline, one-line subhead, orange Join button + outline Free tools; topic ticker along the bottom.
FORM: owner-requested club-landing structure (sections: before/after, inside, curriculum, tools, wins, builds gallery, method, plans, team, FAQ, close), built from our own content.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${contract}-->` }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
