"use client";

import { ErrorView } from "@/components/error-view";

// A dashboard page failed: the sidebar stays, and Home leads back to the dashboard.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorView error={error} retry={retry} home={{ href: "/dashboard", label: "Dashboard" }} />;
}
