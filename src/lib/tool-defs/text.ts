import type { Block } from "./types";

const H = (t: string) => t.toUpperCase();

/** Plain-text version of a tool's result, for "copy everything", download and print. */
export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "text":
          return `${H(b.title)}\n${b.text}`;
        case "list":
          return `${H(b.title)}\n${b.items.map((x) => "- " + x.replace(/\n/g, "\n  ")).join("\n")}`;
        case "table":
          return `${H(b.title)}\n${[b.columns, ...b.rows].map((r) => r.join(" | ")).join("\n")}`;
        case "stats":
          return b.items.map((i) => `${i.label}: ${i.value}${i.sub ? ` (${i.sub})` : ""}`).join("\n");
        case "swatches":
          return `${H(b.title)}\n${b.colors.map((c) => `${c.name}: ${c.hex} (text ${c.ink}, ${c.contrast})`).join("\n")}`;
        case "serp":
          return `${H(b.title)}\n${b.pageTitle}\n${b.url}\n${b.description}`;
        case "wireframe":
          return `${H(b.title)}\n${b.sections.map((x, i) => `${i + 1}. ${x}`).join("\n")}`;
        case "fonts":
          return `${H(b.title)}\n${b.pairs.map((p) => `${p.heading} + ${p.body}: ${p.note}`).join("\n")}`;
        case "flow":
          return `${H(b.title)}\n${b.steps.map((x, i) => `${i + 1}. ${x.label}${x.detail ? " - " + x.detail : ""}`).join("\n")}`;
        case "checks":
          return `${H(b.title)}\n${b.items.map((x) => `${x.ok ? "✓" : "✗"} ${x.text}${!x.ok && x.fix ? " → " + x.fix : ""}`).join("\n")}`;
        case "notice":
          return `NOTE: ${b.text}`;
        case "image":
          return `${b.title}: ${b.alt}`;
        case "preview":
          return `${H(b.title)}\nBackground ${b.colors.background}, text ${b.colors.text}, buttons ${b.colors.primary} with ${b.colors.primaryInk} text, links ${b.colors.link}`;
      }
    })
    .join("\n\n");
}

/** Encode a tool's inputs for a shareable link (URL-safe base64 of JSON). */
export function encodeValues(v: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(v));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeValues<T>(s: string): T | null {
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))) as T;
  } catch {
    return null;
  }
}

const esc = (x: string) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A clean printable report (Save as PDF from the print dialog) built from a result's blocks.
 * No Prostatis branding is forced on it: it's the user's report for their client.
 */
export function blocksToHtml(blocks: Block[], meta: { title: string; subtitle?: string; preparedBy?: string; date?: string }): string {
  const sec = (title: string, inner: string) => `<section><h2>${esc(title)}</h2>${inner}</section>`;
  const body = blocks
    .map((b) => {
      switch (b.type) {
        case "text":
          return sec(b.title, `<pre>${esc(b.text)}</pre>`);
        case "list":
          return sec(b.title, `<ul>${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`);
        case "table":
          return sec(b.title, `<table><thead><tr>${b.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
        case "stats":
          return `<div class="stats">${b.items.map((i) => `<div><span>${esc(i.label)}</span><strong>${esc(i.value)}</strong>${i.sub ? `<em>${esc(i.sub)}</em>` : ""}</div>`).join("")}</div>`;
        case "checks": {
          const passed = b.items.filter((x) => x.ok).length;
          return sec(`${b.title} (${passed}/${b.items.length} passed)`, `<ul class="checks">${b.items.map((x) => `<li class="${x.ok ? "ok" : "no"}"><b>${x.ok ? "✓" : "✗"}</b> ${esc(x.text)}${!x.ok && x.fix ? `<small>Fix: ${esc(x.fix)}</small>` : ""}</li>`).join("")}</ul>`);
        }
        case "notice":
          return `<p class="note">${esc(b.text)}</p>`;
        case "swatches":
          return sec(b.title, `<div class="sw">${b.colors.map((c) => `<div style="background:${esc(c.hex)};color:${esc(c.ink)}">${esc(c.name)}<br>${esc(c.hex)} · ${esc(c.contrast)}</div>`).join("")}</div>`);
        case "serp":
          return sec(b.title, `<div class="serp"><small>${esc(b.url)}</small><p>${esc(b.pageTitle)}</p><span>${esc(b.description)}</span></div>`);
        case "wireframe":
          return sec(b.title, `<ol>${b.sections.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`);
        case "flow":
          return sec(b.title, `<ol>${b.steps.map((x) => `<li><b>${esc(x.label)}</b>${x.detail ? `: ${esc(x.detail)}` : ""}</li>`).join("")}</ol>`);
        case "fonts":
          return sec(b.title, `<ul>${b.pairs.map((p) => `<li><b>${esc(p.heading)}</b> + ${esc(p.body)}: ${esc(p.note)}</li>`).join("")}</ul>`);
        case "image":
          return /^data:image\//.test(b.src) ? sec(b.title, `<img src="${esc(b.src)}" alt="${esc(b.alt)}">`) : "";
        default:
          return "";
      }
    })
    .join("\n");
  const date = meta.date ?? new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(meta.title)}</title><style>
body{font:15px/1.55 Arial,Helvetica,sans-serif;color:#16120e;margin:40px auto;max-width:760px;padding:0 20px}
header{border-bottom:3px solid #16120e;padding-bottom:12px;margin-bottom:20px}h1{font-size:26px;margin:0}header p{margin:4px 0 0;color:#5b544c}
h2{font-size:16px;margin:26px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px}pre{white-space:pre-wrap;word-break:break-word;font:13px/1.5 Consolas,monospace;background:#f6f4f1;padding:10px}
table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;vertical-align:top}th{background:#f6f4f1}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:14px 0}.stats div{border:1px solid #ddd;padding:10px}.stats span{display:block;font-size:12px;color:#5b544c}.stats strong{font-size:22px}.stats em{display:block;font-size:12px;color:#5b544c;font-style:normal}
.checks{list-style:none;padding:0}.checks li{padding:6px 0;border-bottom:1px solid #eee}.checks .ok b{color:#1f7a3f}.checks .no b{color:#b3261e}.checks small{display:block;color:#5b544c;margin-left:18px}
.note{background:#fff4e8;border-left:3px solid #e8590c;padding:8px 10px;font-size:13px}.sw{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.sw div{padding:14px 8px;font-size:12px}
.serp small{color:#1f6f3f}.serp p{color:#1a0dab;font-size:19px;margin:2px 0}.serp span{color:#4d5156;font-size:14px}img{max-width:100%;max-height:420px;border:1px solid #ddd}
footer{margin-top:32px;border-top:1px solid #ddd;padding-top:8px;font-size:12px;color:#5b544c}@media print{body{margin:0 auto}section{break-inside:avoid}}
</style></head><body><header><h1>${esc(meta.title)}</h1>${meta.subtitle ? `<p>${esc(meta.subtitle)}</p>` : ""}<p>${esc(date)}${meta.preparedBy ? ` · Prepared by ${esc(meta.preparedBy)}` : ""}</p></header>
${body}
<footer>${meta.preparedBy ? `Prepared by ${esc(meta.preparedBy)}. ` : ""}Results reflect the page when it was checked; re-run after making changes.</footer></body></html>`;
}
