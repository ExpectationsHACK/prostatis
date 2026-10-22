import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  // authInterrupts: forbidden() and its 403 page (src/app/forbidden.tsx).
  experimental: { authInterrupts: true },
  // The service worker must never be cached, or a fix to it could take days to reach phones.
  async headers() {
    return [
      // Baseline protection on every page. No full CSP: PostHog, Sentry, Paystack and fonts would
      // need a long allow-list that breaks quietly whenever one of them changes a host.
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

// Readable Sentry stack traces need the build to upload source maps, which needs Sentry's build
// credentials (SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT, read from the environment). Without
// them the build is left exactly as it is; error tracking itself only needs the DSN.
const sentryBuild = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

export default sentryBuild ? withSentryConfig(nextConfig, { silent: !process.env.CI, widenClientFileUpload: true }) : nextConfig;

// Lets `next dev` use Cloudflare bindings locally (only matters for the Cloudflare deploy).
if (process.env.NODE_ENV === "development") import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
