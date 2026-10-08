import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {};

// Readable Sentry stack traces need the build to upload source maps, which needs Sentry's build
// credentials (SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT, read from the environment). Without
// them the build is left exactly as it is; error tracking itself only needs the DSN.
const sentryBuild = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

export default sentryBuild ? withSentryConfig(nextConfig, { silent: !process.env.CI, widenClientFileUpload: true }) : nextConfig;

// Lets `next dev` use Cloudflare bindings locally (only matters for the Cloudflare deploy).
if (process.env.NODE_ENV === "development") import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
