"use client";

import { ErrorView } from "@/components/error-view";

// A lesson or course page failed: progress is saved server-side, so retrying loses nothing.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorView error={error} retry={retry} home={{ href: "/learn", label: "My tracks" }} />;
}
