/**
 * Loading skeletons: grey "bones" in the shape of the page that's on its way, so a slow
 * connection shows structure instead of a blank screen. Server components (no JS needed);
 * the pulse stops for people who prefer reduced motion.
 */

/** One placeholder block. Size and shape come from className. */
export function Bone({ className = "" }: { className?: string }) {
  return <span aria-hidden className={"block bg-faint/35 motion-safe:animate-pulse " + className} />;
}

/** A few lines of placeholder text; the last line is shorter, like a real paragraph. */
export function Lines({ n = 3, className = "" }: { n?: number; className?: string }) {
  return (
    <span aria-hidden className={"block space-y-2 " + className}>
      {Array.from({ length: n }, (_, i) => (
        <Bone key={i} className={"h-3.5 " + (i === n - 1 ? "w-2/3" : "w-full")} />
      ))}
    </span>
  );
}

/** Announces the loading state once to screen readers, and wraps the bones. */
function Loading({ label = "Loading", className = "", children }: { label?: string; className?: string; children: React.ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}…</span>
      {children}
    </div>
  );
}

function CardBone({ tall = false }: { tall?: boolean }) {
  return (
    <div className="border border-edge bg-card p-4">
      <Bone className={(tall ? "h-36" : "h-24") + " w-full"} />
      <Bone className="mt-4 h-5 w-3/4" />
      <Lines n={2} className="mt-3" />
    </div>
  );
}

/** Marketing and content pages: heading, intro, then a grid of cards. */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <Loading label="Loading page" className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Bone className="h-3.5 w-28" />
      <Bone className="mt-4 h-10 w-full max-w-xl sm:h-14" />
      <Bone className="mt-3 h-10 w-2/3 max-w-md sm:h-14" />
      <Lines n={2} className="mt-5 max-w-2xl" />
      <div className="mt-6 flex gap-3">
        <Bone className="h-11 w-36" />
        <Bone className="h-11 w-32" />
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }, (_, i) => (
          <CardBone key={i} tall={i < 3} />
        ))}
      </div>
    </Loading>
  );
}

/** A single free tool: header, "how to use it", then the form and result columns. */
export function ToolSkeleton() {
  return (
    <Loading label="Loading tool" className="pb-12 sm:pb-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1.3fr_1fr] md:py-14">
        <div>
          <Bone className="h-3.5 w-32" />
          <Bone className="mt-4 h-10 w-full max-w-md sm:h-14" />
          <Lines n={2} className="mt-4 max-w-lg" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Bone className="h-20 w-full" />
            <Bone className="h-20 w-full" />
          </div>
        </div>
        <Bone className="hidden h-56 w-full md:block" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <ToolBodySkeleton />
      </div>
    </Loading>
  );
}

/** The working part of a tool (form + result), also shown while a tool's code downloads. */
export function ToolBodySkeleton() {
  return (
    <div aria-hidden className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-4 border border-edge bg-card p-5">
        <div className="flex items-center gap-3">
          <Bone className="size-8" />
          <Bone className="h-5 w-48" />
        </div>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <Bone className="h-3.5 w-28" />
            <Bone className="mt-2 h-11 w-full" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Bone className="size-8" />
          <Bone className="h-5 w-40" />
        </div>
        <Bone className="h-11 w-full" />
        <Bone className="h-40 w-full" />
        <Bone className="h-28 w-full" />
      </div>
    </div>
  );
}

/** Blog post and lesson: a narrow reading column. */
export function ArticleSkeleton({ label = "Loading article" }: { label?: string }) {
  return (
    <Loading label={label} className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Bone className="h-3.5 w-36" />
      <Bone className="mt-4 h-10 w-full sm:h-12" />
      <Bone className="mt-3 h-10 w-3/4 sm:h-12" />
      <div className="mt-5 flex items-center gap-3">
        <Bone className="size-9" />
        <Bone className="h-3.5 w-40" />
      </div>
      <Bone className="mt-8 h-52 w-full sm:h-72" />
      <Lines n={4} className="mt-8" />
      <Lines n={3} className="mt-6" />
      <Bone className="mt-8 h-6 w-1/2" />
      <Lines n={4} className="mt-4" />
    </Loading>
  );
}

/** Sign in, sign up and password pages. */
export function FormSkeleton() {
  return (
    <Loading label="Loading form" className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-14">
      <div className="max-w-md">
        <Bone className="size-10" />
        <Bone className="mt-5 h-9 w-3/4" />
        <Bone className="mt-3 h-3.5 w-1/2" />
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="mt-6">
            <Bone className="h-3.5 w-20" />
            <Bone className="mt-2 h-11 w-full" />
          </div>
        ))}
        <Bone className="mt-6 h-11 w-full" />
      </div>
      <Bone className="hidden h-[420px] w-full md:block" />
    </Loading>
  );
}

/** Member dashboard home. */
export function DashboardSkeleton() {
  return (
    <Loading label="Loading your dashboard" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      <Bone className="h-3.5 w-40" />
      <Bone className="mt-3 h-9 w-72 max-w-full" />
      <div className="mt-6 grid gap-5 border border-edge bg-card p-5 md:grid-cols-[260px_1fr] md:items-center">
        <Bone className="h-40 w-full" />
        <div>
          <Bone className="h-3.5 w-28" />
          <Bone className="mt-3 h-7 w-3/4" />
          <Lines n={2} className="mt-3" />
          <Bone className="mt-5 h-11 w-44" />
        </div>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="border border-edge bg-card p-5">
            <Bone className="h-3.5 w-24" />
            <Bone className="mt-4 h-8 w-20" />
            <Bone className="mt-4 h-2.5 w-full" />
          </div>
        ))}
      </div>
    </Loading>
  );
}

/** A narrow account page (billing, receipts). */
export function AccountSkeleton() {
  return (
    <Loading label="Loading" className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <Bone className="h-9 w-40" />
      <div className="mt-6 border border-edge bg-card p-5">
        <Bone className="h-3.5 w-28" />
        <Bone className="mt-3 h-8 w-56" />
        <Bone className="mt-5 h-2.5 w-full" />
        <Lines n={3} className="mt-5" />
      </div>
      <Bone className="mt-8 h-6 w-44" />
      <div className="mt-3 space-y-2">
        {Array.from({ length: 3 }, (_, i) => (
          <Bone key={i} className="h-12 w-full" />
        ))}
      </div>
    </Loading>
  );
}

/** A track's lesson list. */
export function TrackSkeleton() {
  return (
    <Loading label="Loading your track" className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Bone className="h-3.5 w-28" />
      <Bone className="mt-4 h-10 w-80 max-w-full" />
      <Lines n={2} className="mt-4 max-w-xl" />
      <Bone className="mt-6 h-3 w-full max-w-xl" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 border border-edge bg-card p-4">
            <Bone className="size-12 shrink-0" />
            <div className="min-w-0 flex-1">
              <Bone className="h-3.5 w-20" />
              <Bone className="mt-2 h-5 w-3/4" />
            </div>
            <Bone className="hidden h-9 w-24 sm:block" />
          </div>
        ))}
      </div>
    </Loading>
  );
}

/** Admin pages: stat tiles and a table. */
export function AdminSkeleton() {
  return (
    <Loading label="Loading" className="px-4 py-6 sm:px-8">
      <Bone className="h-8 w-56" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-2xl border-2 border-[#151515]/15 bg-white p-4">
            <Bone className="h-3.5 w-20 rounded" />
            <Bone className="mt-3 h-8 w-24 rounded" />
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2 rounded-2xl border-2 border-[#151515]/15 bg-white p-4">
        {Array.from({ length: 7 }, (_, i) => (
          <Bone key={i} className="h-10 w-full rounded" />
        ))}
      </div>
    </Loading>
  );
}
