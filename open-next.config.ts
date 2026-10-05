import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache bucket yet: pages are rendered per request or served from the
// prerendered assets. Add an R2 cache here later if traffic grows.
export default defineCloudflareConfig({});
