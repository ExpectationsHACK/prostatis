import Link from "next/link";
import type { ReactNode } from "react";

/**
 * A small, safe Markdown renderer for blog posts: it builds React elements and never injects
 * HTML, so a post can't run scripts. Supports ## / ### headings, paragraphs, - and 1. lists,
 * > quotes, ``` code, --- rules, | tables |, images on their own line, **bold**, *italic*,
 * `code` and [links](url).
 */

export type Heading = { id: string; text: string; level: 2 | 3 };

const headingId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`*_[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_]/g, "");

export function safeUrl(url: string): string | null {
  const u = url.trim();
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  if (u.startsWith("#")) return u;
  if (/^(https?:|mailto:)/i.test(u)) return u;
  return null;
}

export function headingsOf(md: string): Heading[] {
  const out: Heading[] = [];
  let fence = false;
  for (const line of md.split(/\r?\n/)) {
    if (line.trim().startsWith("```")) fence = !fence;
    if (fence) continue;
    const m = /^(#{1,3})\s+(.+)$/.exec(line);
    if (m) {
      const text = plain(m[2].trim());
      out.push({ id: headingId(text), text, level: m[1].length === 3 ? 3 : 2 });
    }
  }
  return out;
}

/* ---------- Inline ---------- */
const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(\[[^\]]+\]\([^)\s]+\))/g;

function inline(text: string, key = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${key}-${n++}`;
    if (m[1]) out.push(<code key={k} className="rounded-sm bg-wash px-1 py-0.5 font-mono text-[0.9em]">{tok.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={k}>{inline(tok.slice(2, -2), k)}</strong>);
    else if (m[3]) out.push(<em key={k}>{inline(tok.slice(1, -1), k)}</em>);
    else {
      const [, label, href] = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok)!;
      const url = safeUrl(href);
      if (!url) out.push(label);
      else if (url.startsWith("/") || url.startsWith("#"))
        out.push(<Link key={k} href={url} className="font-semibold text-brand-text underline underline-offset-2">{inline(label, k)}</Link>);
      else
        out.push(
          <a key={k} href={url} target="_blank" rel="noopener" className="font-semibold text-brand-text underline underline-offset-2">
            {inline(label, k)}
          </a>,
        );
    }
    last = m.index! + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* ---------- Blocks ---------- */
const cells = (row: string) => row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

export function Markdown({ md }: { md: string }) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;

  const isBlockStart = (l: string) => /^(#{1,3}\s|[-*]\s|\d+\.\s|>\s?|```|---\s*$|\|)/.test(l) || /^!\[[^\]]*\]\([^)]+\)\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${k++}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      i++;
      out.push(
        <pre key={key} className="my-6 overflow-x-auto border-2 border-edge bg-night p-4 font-mono text-[13.5px] leading-relaxed text-paper" data-lang={lang || undefined}>
          <code>{body.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const h = /^(#{1,3})\s+(.+)$/.exec(line);
    if (h) {
      const text = h[2].trim();
      const id = headingId(plain(text));
      out.push(
        h[1].length === 3 ? (
          <h3 key={key} id={id} className="display mt-8 scroll-mt-24 text-[21px] text-ink">{inline(text, key)}</h3>
        ) : (
          <h2 key={key} id={id} className="display mt-11 scroll-mt-24 text-[27px] leading-tight text-ink">{inline(text, key)}</h2>
        ),
      );
      i++;
      continue;
    }

    if (/^---\s*$/.test(line)) {
      out.push(<hr key={key} className="my-10 border-t-2 border-dashed border-line" />);
      i++;
      continue;
    }

    const img = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line.trim());
    if (img) {
      const src = safeUrl(img[2]);
      if (src)
        out.push(
          <figure key={key} className="my-7">
            {/* eslint-disable-next-line @next/next/no-img-element -- author-supplied images from any host */}
            <img src={src} alt={img[1]} loading="lazy" decoding="async" className="h-auto w-full border-2 border-edge bg-card" />
            {img[3] && <figcaption className="mt-2 font-mono text-[12.5px] text-muted">{img[3]}</figcaption>}
          </figure>,
        );
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) body.push(lines[i++].replace(/^>\s?/, ""));
      out.push(
        <blockquote key={key} className="my-6 border-l-4 border-brand bg-card px-5 py-3 text-[17px] italic leading-relaxed text-ink">
          {inline(body.join(" "), key)}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      const re = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ""));
      const cls = "my-5 space-y-2 pl-6 text-[17px] leading-[1.75] text-ink marker:text-brand-text " + (ordered ? "list-decimal marker:font-bold" : "list-disc");
      const lis = items.map((t, j) => <li key={j}>{inline(t, `${key}-${j}`)}</li>);
      out.push(ordered ? <ol key={key} className={cls}>{lis}</ol> : <ul key={key} className={cls}>{lis}</ul>);
      continue;
    }

    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      out.push(
        <div key={key} className="my-6 overflow-x-auto border-2 border-edge">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead className="bg-wash">
              <tr>{head.map((c, j) => <th key={j} className="border-b-2 border-edge px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-wider text-ink">{inline(c, `${key}-h${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="odd:bg-card even:bg-paper">
                  {r.map((c, j) => <td key={j} className="border-t border-line px-3 py-2 align-top text-ink">{inline(c, `${key}-${ri}-${j}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Paragraph: consecutive plain lines.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i]))) para.push(lines[i++].trim());
    out.push(<p key={key} className="my-5 text-[17px] leading-[1.8] text-ink">{inline(para.join(" "), key)}</p>);
  }

  return <>{out}</>;
}
