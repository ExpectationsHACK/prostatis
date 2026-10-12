import { CircleAlert, CircleCheck, Clock, Info, TriangleAlert, type LucideIcon } from "lucide-react";

/**
 * The site's error, empty and status building blocks, in one place so every failure looks and
 * reads the same: what happened, whether anything was lost, and the one thing to do next.
 */

export type Tone = "error" | "warning" | "info" | "success" | "pending";

const tones: Record<Tone, { box: string; icon: string; Icon: LucideIcon }> = {
  error: { box: "bg-[#fdecea]", icon: "text-danger", Icon: CircleAlert },
  warning: { box: "bg-brand-wash", icon: "text-brand-text", Icon: TriangleAlert },
  info: { box: "bg-sunk", icon: "text-ink", Icon: Info },
  success: { box: "bg-[#e3f5e9]", icon: "text-success", Icon: CircleCheck },
  pending: { box: "bg-brand-wash", icon: "text-brand-text", Icon: Clock },
};

/** An inline message inside a page or form. Errors are announced at once; the rest politely. */
export function Notice({ tone = "info", title, icon, children, action, className = "" }: { tone?: Tone; title?: string; icon?: LucideIcon; children?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  const t = tones[tone];
  const Icon = icon ?? t.Icon;
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`flex gap-3 rounded-[12px] border-2 border-edge px-3.5 py-3 text-ink ${t.box} ${className}`}>
      <Icon className={`mt-0.5 size-[18px] shrink-0 ${t.icon}`} aria-hidden />
      <div className="min-w-0 flex-1 text-[14px] leading-relaxed">
        {title && <p className="font-bold">{title}</p>}
        {children && <div className={title ? "mt-0.5" : ""}>{children}</div>}
        {action && <div className="mt-2.5 flex flex-wrap gap-2">{action}</div>}
      </div>
    </div>
  );
}

/**
 * A whole-page state (404, 403, 500, payment pending…): a big status mark, a plain headline,
 * what it means for the visitor, and the way forward.
 */
export function StatusPage({ code, icon: Icon, tone = "error", title, children, actions, footnote }: { code?: string; icon: LucideIcon; tone?: Tone; title: string; children?: React.ReactNode; actions?: React.ReactNode; footnote?: React.ReactNode }) {
  const t = tones[tone];
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-14 text-center sm:py-20">
      <div className="relative">
        {code ? (
          <p className="display select-none text-[88px] leading-none text-ink [text-shadow:5px_5px_0_var(--brand)] sm:text-[124px]" aria-hidden>
            {code}
          </p>
        ) : (
          <span className={`grid size-20 place-items-center rounded-[22px] border-2 border-edge shadow-[4px_4px_0_var(--edge)] ${t.box}`}>
            <Icon className={`size-9 ${t.icon}`} aria-hidden />
          </span>
        )}
        {code && (
          <span className={`absolute -right-5 -top-3 grid size-12 place-items-center rounded-full border-2 border-edge shadow-[3px_3px_0_var(--edge)] ${t.box}`}>
            <Icon className={`size-6 ${t.icon}`} aria-hidden />
          </span>
        )}
      </div>
      <h1 className="display mt-7 text-balance text-[28px] leading-tight text-ink sm:text-[38px]">{title}</h1>
      {children && <div className="mt-3 max-w-md text-pretty text-[15.5px] leading-relaxed text-muted sm:text-[16.5px]">{children}</div>}
      {actions && <div className="mt-7 flex flex-wrap justify-center gap-3">{actions}</div>}
      {footnote && <div className="mt-6 max-w-md text-[13px] leading-relaxed text-muted">{footnote}</div>}
    </div>
  );
}

/** Nothing to show yet: say why, and what fills it. */
export function EmptyState({ icon: Icon, title, children, action, className = "" }: { icon: LucideIcon; title: string; children?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center rounded-[16px] border-2 border-dashed border-faint bg-card/60 px-5 py-8 text-center ${className}`}>
      <span className="grid size-12 place-items-center rounded-full border-2 border-edge bg-sunk">
        <Icon className="size-5 text-ink" aria-hidden />
      </span>
      <p className="mt-3 text-[16px] font-bold text-ink">{title}</p>
      {children && <div className="mt-1 max-w-sm text-[14px] leading-relaxed text-muted">{children}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** The message under a form field. Point the field at it with aria-describedby + aria-invalid. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-danger">
      <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
