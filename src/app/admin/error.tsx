"use client";

import { ErrorView } from "@/components/error-view";

// An admin page failed (often a missing migration or service key: see Setup & health).
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorView error={error} retry={retry} home={{ href: "/admin/system", label: "Setup & health" }} />;
}
