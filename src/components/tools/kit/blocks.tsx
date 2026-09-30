"use client";

import { ArrowDown, Check, CircleAlert, Info, X } from "lucide-react";
import { useEffect } from "react";
import type { Block } from "@/lib/tool-defs/types";
import { CopyButton, Output } from "../../tool-ui";

const head = "flex items-center justify-between gap-2 border-b border-edge px-4 py-2.5";
const headTitle = "font-mono text-[11px] font-bold text-muted";
const box = "overflow-hidden border border-edge bg-card";

function FontLoader({ families }: { families: string[] }) {
  useEffect(() => {
    const id = "tool-fonts-" + families.join("-").replace(/\W+/g, "");
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families.map((f) => "family=" + f.replace(/ /g, "+") + ":wght@400;700").join("&")}&display=swap`;
    document.head.appendChild(link);
  }, [families]);
  return null;
}

export function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "text":
      return <Output title={b.title} text={b.text} filename={b.filename} />;

    case "notice": {
      const Icon = b.tone === "warn" ? CircleAlert : b.tone === "good" ? Check : Info;
      const cls = b.tone === "warn" ? "bg-danger/10 text-danger" : b.tone === "good" ? "bg-success/10 text-success" : "bg-brand-wash text-ink";
      return (
        <p className={`flex items-start gap-2 border border-edge px-3 py-2.5 text-[14px] ${cls}`}>
          <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="text-ink">{b.text}</span>
        </p>
      );
    }

    case "list":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <CopyButton text={b.items.join("\n")} label="Copy all" />
          </div>
          <ul className="divide-y divide-line">
            {b.items.map((it, i) => (
              <li key={i} className="flex items-start justify-between gap-3 px-4 py-2.5">
                <span className="whitespace-pre-wrap text-[14px] text-ink">{it}</span>
                <CopyButton text={it} />
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <CopyButton text={[b.columns, ...b.rows].map((r) => r.join("\t")).join("\n")} label="Copy table" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-sunk">
                <tr>
                  {b.columns.map((c) => (
                    <th key={c} className="whitespace-nowrap px-3 py-2 font-mono text-[11px] font-bold text-muted">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((cell, j) => (
                      <td key={j} className={"px-3 py-2 align-top text-ink " + (j === 0 ? "font-semibold" : "")}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-3">
          {b.items.map((it) => (
            <div key={it.label} className="border border-edge bg-card p-4">
              <p className={headTitle}>{it.label}</p>
              <p className="display tabular mt-1 text-[28px] text-ink">{it.value}</p>
              {it.sub && <p className="mt-0.5 text-[12px] text-muted">{it.sub}</p>}
            </div>
          ))}
        </div>
      );

    case "swatches":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <CopyButton text={b.colors.map((c) => `--${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")} label="Copy CSS" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {b.colors.map((c) => (
              <div key={c.name} className="border-b border-r border-line p-2">
                <div className="flex h-20 items-end justify-between p-2 font-mono text-[11px] font-bold" style={{ background: c.hex, color: c.ink }}>
                  <span>Aa</span>
                  <span>{c.contrast}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <div>
                    <p className="text-[12px] font-semibold text-ink">{c.name}</p>
                    <p className="font-mono text-[11px] text-muted">{c.hex}</p>
                  </div>
                  <CopyButton text={c.hex} label="Hex" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "serp":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
          </div>
          {/* Approximates a Google result: ~600px title width, ~155 char description. */}
          <div className="bg-white p-4 font-sans">
            <p className="truncate text-[13px] text-[#1f6f3f]">{b.url}</p>
            <p className="mt-0.5 line-clamp-1 max-w-[600px] text-[19px] leading-snug text-[#1a0dab]">{b.pageTitle}</p>
            <p className="mt-1 line-clamp-2 max-w-[600px] text-[14px] leading-snug text-[#4d5156]">{b.description}</p>
          </div>
        </div>
      );

    case "wireframe":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <CopyButton text={b.sections.map((x, i) => `${i + 1}. ${x}`).join("\n")} label="Copy outline" />
          </div>
          <div className="space-y-1.5 bg-sunk p-3">
            {b.sections.map((sec, i) => (
              <div
                key={i}
                className={"flex items-center justify-between border border-dashed border-edge/50 bg-card px-3 font-mono text-[11px] font-bold text-muted " + (i === 0 ? "h-8" : i === 1 ? "h-24" : "h-14")}
              >
                <span>{sec}</span>
                <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "fonts":
      return (
        <div className={box}>
          <FontLoader families={[...new Set(b.pairs.flatMap((p) => [p.heading, p.body]))]} />
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
          </div>
          <div className="divide-y divide-line">
            {b.pairs.map((p) => (
              <div key={p.heading + p.body} className="p-4">
                <p className="text-[28px] leading-tight text-ink" style={{ fontFamily: `'${p.heading}', serif`, fontWeight: 700 }}>
                  Build your business online
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted" style={{ fontFamily: `'${p.body}', sans-serif` }}>
                  Fast, mobile-first websites for Nigerian businesses, booking, WhatsApp orders and payments built in.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[12px] text-ink">
                    <strong>{p.heading}</strong> + {p.body} · <span className="text-muted">{p.note}</span>
                  </p>
                  <CopyButton
                    text={`@import url('https://fonts.googleapis.com/css2?family=${p.heading.replace(/ /g, "+")}:wght@700&family=${p.body.replace(/ /g, "+")}:wght@400;700&display=swap');\nh1,h2,h3 { font-family: '${p.heading}', serif; }\nbody { font-family: '${p.body}', sans-serif; }`}
                    label="Copy CSS"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "flow":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <CopyButton text={b.steps.map((st, i) => `${i + 1}. ${st.label}${st.detail ? ` - ${st.detail}` : ""}`).join("\n")} label="Copy steps" />
          </div>
          <ol className="bg-sunk p-4">
            {b.steps.map((st, i) => (
              <li key={i} className="flex flex-col items-center">
                <div className="w-full max-w-md border border-edge bg-card px-3 py-2">
                  <p className="text-[13px] font-bold text-ink">
                    <span className="mr-2 font-mono text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                    {st.label}
                  </p>
                  {st.detail && <p className="mt-0.5 text-[12px] text-muted">{st.detail}</p>}
                </div>
                {i < b.steps.length - 1 && <ArrowDown className="my-1 size-4 text-brand-text" aria-hidden />}
              </li>
            ))}
          </ol>
        </div>
      );

    case "image":
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
          </div>
          <div className="grid place-items-center bg-sunk p-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL from the analysis, not an optimisable asset */}
            <img src={b.src} alt={b.alt} className="max-h-[420px] w-auto border border-edge" />
          </div>
        </div>
      );

    case "checks": {
      const passed = b.items.filter((x) => x.ok).length;
      return (
        <div className={box}>
          <div className={head}>
            <span className={headTitle}>{b.title}</span>
            <span className="font-mono text-[12px] font-bold text-ink">
              {passed}/{b.items.length} passed
            </span>
          </div>
          <ul className="divide-y divide-line">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-3 px-4 py-2.5">
                {it.ok ? <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-label="Pass" /> : <X className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={3} aria-label="Fail" />}
                <div>
                  <p className="text-[14px] text-ink">{it.text}</p>
                  {!it.ok && it.fix && <p className="mt-0.5 text-[12px] text-muted">→ {it.fix}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
