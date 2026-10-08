import * as Sentry from "@sentry/nextjs";
import { sentryServerOptions } from "@/lib/observability/sentry-options";

Sentry.init(sentryServerOptions());
