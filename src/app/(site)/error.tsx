"use client";

import { ErrorView } from "@/components/error-view";

// A page on the public site failed: the header and footer stay, so visitors can move on.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorView error={error} retry={retry} />;
}
