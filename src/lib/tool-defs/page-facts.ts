/**
 * Everything the URL-powered tools need to know about a page, extracted from its HTML in one
 * pass. Pure (regex-based, no DOM), so it runs on the server route and in unit tests.
 */

export type PageFacts = {
  title: string;
  description: string;
  h1s: string[];
  h2Count: number;
  wordCount: number;
  text: string;
  lang: boolean;
  viewport: boolean;
  canonical: boolean;
  noindex: boolean;
  og: { title: boolean; description: boolean; image: boolean };
  jsonLdTypes: string[];
  images: { count: number; noAlt: number; lazy: number; modern: number; srcs: string[] };
  scripts: string[];
  stylesheets: string[];
  links: { internal: number; external: number };
  whatsappLinks: number;
  telLinks: number;
  mailtoLinks: number;
  forms: number;
  buttons: string[];
  iframes: number;
  mapEmbed: boolean;
  prices: boolean;
  testimonials: boolean;
  faq: boolean;
  analytics: string[];
  paymentBrands: string[];
  fontFamilies: number;
};

const strip = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const attr = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1] ?? "";

export function extractPage(html: string, pageUrl = "https://example.com/"): PageFacts {
  const all = (re: RegExp) => [...html.matchAll(re)];
  const metas = all(/<meta\b[^>]*>/gi).map((m) => m[0]);
  const meta = (key: string, val: string) => metas.find((t) => attr(t, key).toLowerCase() === val);

  const title = strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const descTag = meta("name", "description");
  const description = descTag ? attr(descTag, "content").trim() : "";
  const h1s = all(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).map((m) => strip(m[1])).filter(Boolean);
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, " ");
  const text = strip(body);
  const wordCount = text ? text.split(" ").length : 0;

  const imgTags = all(/<img\b[^>]*>/gi).map((m) => m[0]);
  const srcs = imgTags.map((t) => attr(t, "src") || attr(t, "data-src")).filter(Boolean);
  const anchors = all(/<a\b[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>/gi).map((m) => m[1]);
  let host = "";
  try {
    host = new URL(pageUrl).hostname;
  } catch {}
  const isInternal = (h: string) => {
    if (h.startsWith("/") || !/^https?:/i.test(h)) return true;
    try {
      return new URL(h).hostname === host;
    } catch {
      return true;
    }
  };

  const jsonLdTypes = all(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi).flatMap((m) => [...m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((x) => x[1]));
  const scripts = all(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi).map((m) => m[1]);
  const stylesheets = all(/<link\b[^>]*>/gi).map((m) => m[0]).filter((t) => /rel\s*=\s*["']?stylesheet/i.test(t)).map((t) => attr(t, "href")).filter(Boolean);
  const buttons = [
    ...all(/<button\b[^>]*>([\s\S]*?)<\/button>/gi).map((m) => strip(m[1])),
    ...all(/<a\b[^>]*class\s*=\s*["'][^"']*(?:btn|button|cta)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi).map((m) => strip(m[1])),
  ].filter((b) => b && b.length < 40);
  const lower = html.toLowerCase();
  const analytics = [
    [/googletagmanager\.com|gtag\(|google-analytics\.com/, "Google Analytics"],
    [/plausible\.io/, "Plausible"],
    [/_vercel\/insights|va\.vercel-scripts/, "Vercel Analytics"],
    [/connect\.facebook\.net|fbq\(/, "Meta Pixel"],
    [/hotjar/, "Hotjar"],
    [/clarity\.ms/, "Microsoft Clarity"],
  ].filter(([re]) => (re as RegExp).test(lower)).map(([, n]) => n as string);
  const paymentBrands = [["paystack", "Paystack"], ["flutterwave", "Flutterwave"], ["stripe", "Stripe"], ["paypal", "PayPal"]].filter(([k]) => lower.includes(k)).map(([, n]) => n);
  const googleFonts = all(/fonts\.googleapis\.com\/css2?\?([^"'\s>]+)/gi).flatMap((m) => m[1].split("&").filter((p) => p.startsWith("family=")));

  return {
    title,
    description,
    h1s,
    h2Count: all(/<h2\b/gi).length,
    wordCount,
    text: text.slice(0, 20000),
    lang: /<html\b[^>]*\blang\s*=\s*["'][a-z]/i.test(html),
    viewport: !!meta("name", "viewport"),
    canonical: /<link\b[^>]*rel\s*=\s*["']canonical["']/i.test(html),
    noindex: /noindex/i.test(attr(meta("name", "robots") ?? "", "content")),
    og: { title: !!meta("property", "og:title"), description: !!meta("property", "og:description"), image: !!meta("property", "og:image") },
    jsonLdTypes,
    images: {
      count: imgTags.length,
      noAlt: imgTags.filter((t) => !/\balt\s*=\s*["'][^"']+["']/i.test(t)).length,
      lazy: imgTags.filter((t) => /loading\s*=\s*["']lazy/i.test(t)).length,
      modern: srcs.filter((s) => /\.(webp|avif)(\?|$)|_next\/image|format=(webp|avif)/i.test(s)).length,
      srcs,
    },
    scripts,
    stylesheets,
    links: { internal: anchors.filter(isInternal).length, external: anchors.filter((a) => !isInternal(a)).length },
    whatsappLinks: anchors.filter((a) => /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(a)).length,
    telLinks: anchors.filter((a) => /^tel:/i.test(a)).length,
    mailtoLinks: anchors.filter((a) => /^mailto:/i.test(a)).length,
    forms: all(/<form\b/gi).length,
    buttons,
    iframes: all(/<iframe\b/gi).length,
    mapEmbed: /google\.com\/maps|maps\.google\.|maps\.googleapis/i.test(html),
    prices: /₦\s?\d|ngn\s?\d|\$\s?\d|€\s?\d|£\s?\d|\bnaira\b/i.test(text),
    testimonials: /testimonial|review|what (our )?(customers|clients) say|★/i.test(text),
    faq: /faq|frequently asked/i.test(text) || jsonLdTypes.includes("FAQPage"),
    analytics,
    paymentBrands,
    fontFamilies: googleFonts.length,
  };
}
