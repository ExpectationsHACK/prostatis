import Link from "next/link";

export async function safe<T>(fn: () => Promise<T>): Promise<{ ok: true; data: T; error: null } | { ok: false; data: null; error: string }> {
  try {
    return { ok: true, data: await fn(), error: null };
  } catch (e) {
    return { ok: false, data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Shown when the database isn't ready, most often because the migrations haven't been run. */
export function SetupError({ error }: { error: string }) {
  return (
    <div className="ink-block mx-auto max-w-2xl bg-[#fff1c2] p-6">
      <h1 className="display text-[26px] text-ink">The database isn&apos;t ready yet</h1>
      <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink">
        This usually means the SQL migrations haven&apos;t been run. Open Supabase → SQL Editor and run the four files in <code>supabase/migrations/</code>, oldest first.
      </p>
      <p className="mt-3 break-words border-2 border-edge bg-card p-3 font-mono text-[12px] text-danger">{error}</p>
      <Link href="/admin/system" className="label mt-4 inline-block text-brand-text underline">Check setup &amp; health</Link>
    </div>
  );
}
