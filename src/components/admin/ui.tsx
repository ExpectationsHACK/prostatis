"use client";

import { useActionState, type ReactNode } from "react";

type R = { ok: boolean; msg: string } | null;

/** A form bound to a server action that shows the action's success or error message. */
export function ActionForm({ action, children, className = "", confirm }: { action: (prev: R, fd: FormData) => Promise<R>; children: ReactNode; className?: string; confirm?: string }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <form
      action={run}
      className={className}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
      {state && (
        <p role="status" className={"mt-2 font-mono text-[12.5px] font-bold " + (state.ok ? "text-success" : "text-danger")}>
          {state.msg}
        </p>
      )}
    </form>
  );
}
