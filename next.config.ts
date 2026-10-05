import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings locally; harmless elsewhere.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
