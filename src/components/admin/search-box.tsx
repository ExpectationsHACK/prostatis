"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

/** Search input with a ⌘K / Ctrl+K shortcut, as in the reference design. Submits its form. */
export function SearchBox({ name = "q", defaultValue, placeholder }: { name?: string; defaultValue?: string; placeholder: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  return (
    <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[var(--a-border)] bg-white px-3 focus-within:border-[var(--a-accent)] focus-within:shadow-[0_0_0_3px_var(--a-accent-soft)] sm:max-w-[340px]">
      <Search className="size-4 shrink-0 text-[var(--a-muted)]" aria-hidden />
      <input
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 border-0! bg-transparent p-0 text-[13.5px] shadow-none! outline-none placeholder:text-[#9a9aa4]"
      />
      <kbd className="hidden shrink-0 text-[11.5px] text-[var(--a-muted)] sm:block">⌘ K</kbd>
    </label>
  );
}
