import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Share images live under /api, and social crawlers honour robots.txt, so allow those two.
    rules: { userAgent: "*", allow: ["/", "/api/og/", "/api/certificate/"], disallow: ["/api/", "/dashboard", "/admin", "/learn", "/checkout"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
