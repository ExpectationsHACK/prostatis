"use client";

import { useEffect, useState } from "react";

/** Shown under a loading skeleton when the page takes unusually long (slow or patchy data). */
export function SlowHint({ after = 8000 }: { after?: number }) {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), after);
    return () => clearTimeout(t);
  }, [after]);
  if (!slow) return null;
  return (
    <p className="mx-auto mt-6 max-w-sm rounded-[12px] border-2 border-edge bg-card px-4 py-3 text-center text-[13.5px] text-muted">
      This is taking longer than usual. Your connection may be slow: keep this page open, or{" "}
      <button type="button" onClick={() => window.location.reload()} className="font-semibold text-ink underline">
        reload
      </button>
      .
    </p>
  );
}
