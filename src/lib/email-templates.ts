// Branded Prostatis emails: one table-based layout that works in Gmail, Outlook and phone
// mail apps, plus the auth, welcome and newsletter messages built on it. Pure functions
// (tested in email-templates.test.ts).
import { site } from "./site";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const C = { paper: "#faf8f4", card: "#ffffff", ink: "#151515", muted: "#5f5b53", orange: "#eb5e28", line: "#e6e1d8" };
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export type Email = { subject: string; html: string; text: string };

/** The shared frame: logo, a white card with an ink outline, an optional button and a footer. */
export function layout(o: { preheader: string; heading: string; bodyHtml: string; cta?: { label: string; url: string }; afterHtml?: string; footerHtml?: string }) {
  const button = o.cta
    ? `<tr><td style="padding:8px 0 4px"><a href="${esc(o.cta.url)}" style="display:inline-block;background:${C.orange};color:${C.ink};border:2px solid ${C.ink};border-radius:12px;padding:13px 22px;font:600 15px ${FONT};text-decoration:none;box-shadow:3px 3px 0 ${C.ink}">${esc(o.cta.label)}</a></td></tr>`
    : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(o.heading)}</title></head>
<body style="margin:0;padding:0;background:${C.paper}">
<span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all">${esc(o.preheader)}</span>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.paper}"><tr><td align="center" style="padding:28px 14px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px">
<tr><td style="padding:0 4px 18px">
  <table role="presentation" cellspacing="0" cellpadding="0"><tr>
    <td style="width:36px;height:36px"><img src="${esc(site.url)}/brand/prostatis-mark-email.png" width="36" height="36" alt="" style="display:block;border:0"></td>
    <td style="padding-left:10px;font:700 19px ${FONT};color:${C.ink}">${esc(site.name)}</td>
  </tr></table>
</td></tr>
<tr><td style="background:${C.card};border:2px solid ${C.ink};border-radius:16px;padding:30px 28px;box-shadow:4px 4px 0 ${C.ink}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr><td style="font:700 24px/1.25 ${FONT};color:${C.ink};padding-bottom:12px">${esc(o.heading)}</td></tr>
    <tr><td style="font:400 16px/1.65 ${FONT};color:${C.ink}">${o.bodyHtml}</td></tr>
    ${button}
    ${o.afterHtml ? `<tr><td style="font:400 13.5px/1.6 ${FONT};color:${C.muted};padding-top:18px">${o.afterHtml}</td></tr>` : ""}
  </table>
</td></tr>
<tr><td style="padding:18px 6px 0;font:400 12.5px/1.6 ${FONT};color:${C.muted}">
  ${o.footerHtml ?? ""}${o.footerHtml ? "<br>" : ""}${esc(site.byline)} · Learn to build websites with AI and turn it into a source of income.<br><a href="${esc(site.url)}" style="color:${C.muted}">${esc(site.url.replace(/^https?:\/\//, ""))}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

const p = (s: string) => `<p style="margin:0 0 14px">${s}</p>`;

/* ---------- Account emails ---------- */
export type AuthKind = "signup" | "recovery" | "magiclink";

export function authEmail(kind: AuthKind, link: string, name = ""): Email {
  const hi = name ? `Hi ${esc(name.split(" ")[0])},` : "Hi,";
  const copy = {
    signup: {
      subject: `Confirm your email to start with ${site.name}`,
      heading: "Confirm your email",
      preheader: "One tap and your account is ready.",
      body: p(hi) + p(`Thanks for joining ${site.name}. Tap the button below to confirm your email address and finish setting up your account.`),
      cta: "Confirm my email",
      after: "Didn't create an account? You can ignore this email and nothing will happen.",
    },
    recovery: {
      subject: `Reset your ${site.name} password`,
      heading: "Reset your password",
      preheader: "Choose a new password in a minute.",
      body: p(hi) + p(`Someone asked to reset the password for your ${site.name} account. If that was you, tap the button below to choose a new one. The link works once.`),
      cta: "Set a new password",
      after: "Didn't ask for this? Ignore this email and your password stays the same.",
    },
    magiclink: {
      subject: `Your ${site.name} sign-in link`,
      heading: `Sign in to ${site.name}`,
      preheader: "Tap to sign in, no password needed.",
      body: p(hi) + p("Tap the button below to sign in. The link works once and only on the device you open it on."),
      cta: "Sign me in",
      after: "Didn't ask to sign in? You can safely ignore this email.",
    },
  }[kind];
  const html = layout({ preheader: copy.preheader, heading: copy.heading, bodyHtml: copy.body, cta: { label: copy.cta, url: link }, afterHtml: `${copy.after}<br><br>Button not working? Paste this link into your browser:<br><a href="${esc(link)}" style="color:#5f5b53;word-break:break-all">${esc(link)}</a>` });
  const text = `${copy.heading}\n\n${hi}\n\n${copy.body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()}\n\n${copy.cta}: ${link}\n\n${copy.after}\n\n${site.byline}`;
  return { subject: copy.subject, html, text };
}

/* ---------- Newsletter ---------- */
export function unsubscribeFooter(url: string) {
  return `You're getting this because you subscribed on our website. <a href="${esc(url)}" style="color:#5f5b53">Unsubscribe</a> in one click.`;
}

export function welcomeEmail(unsubscribeUrl: string): Email {
  const body =
    p("Thanks for subscribing. You'll get one short email when we ship something worth your time: new free tools, practical guides on building and selling websites with AI, and the occasional course update.") +
    p("While you're here, the free tools are ready to use, no signup needed.");
  return {
    subject: `You're subscribed to ${site.name}`,
    html: layout({ preheader: "Short, useful emails. No spam.", heading: "You're in.", bodyHtml: body, cta: { label: "Try the free tools", url: `${site.url}/tools` }, footerHtml: unsubscribeFooter(unsubscribeUrl) }),
    text: `You're in.\n\nThanks for subscribing to ${site.name}. You'll get one short email when we ship something worth your time.\n\nTry the free tools: ${site.url}/tools\n\nUnsubscribe: ${unsubscribeUrl}`,
  };
}

export function newsletterEmail(issue: { subject: string; preheader: string; body_md: string }, unsubscribeUrl: string): Email {
  return {
    subject: issue.subject,
    html: layout({ preheader: issue.preheader || issue.subject, heading: issue.subject, bodyHtml: mdToEmailHtml(issue.body_md), footerHtml: unsubscribeFooter(unsubscribeUrl) }),
    text: `${issue.subject}\n\n${mdToText(issue.body_md)}\n\nUnsubscribe: ${unsubscribeUrl}`,
  };
}

/* ---------- Markdown for emails (safe: everything is escaped first) ---------- */
const safeHref = (u: string) => (/^(https?:|mailto:)/i.test(u) ? u : u.startsWith("/") ? `${site.url}${u}` : null);

function inline(s: string) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
    const url = safeHref(href.replace(/&amp;/g, "&"));
    return url ? `<a href="${esc(url)}" style="color:#b8400f;font-weight:600">${label}</a>` : label;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  out = out.replace(/`([^`]+)`/g, '<code style="background:#f3f0ea;border-radius:4px;padding:1px 5px;font-family:Menlo,Consolas,monospace;font-size:14px">$1</code>');
  return out;
}

export function mdToEmailHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = /^(#{1,3})\s+(.+)$/.exec(line);
    if (h) {
      out.push(`<h2 style="margin:22px 0 10px;font:700 19px/1.3 ${FONT};color:${C.ink}">${inline(h[2])}</h2>`);
      i++;
      continue;
    }
    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(line.trim());
    if (img) {
      const src = safeHref(img[2]);
      if (src) out.push(`<p style="margin:0 0 14px"><img src="${esc(src)}" alt="${esc(img[1])}" width="500" style="max-width:100%;height:auto;border-radius:10px;border:1px solid ${C.line}"></p>`);
      i++;
      continue;
    }
    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const re = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(`<li style="margin:0 0 6px">${inline(lines[i++].replace(re, ""))}</li>`);
      out.push(`<${ordered ? "ol" : "ul"} style="margin:0 0 14px;padding-left:22px">${items.join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }
    if (line.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) body.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<p style="margin:0 0 14px;border-left:4px solid ${C.orange};padding:6px 0 6px 14px;color:${C.muted};font-style:italic">${inline(body.join(" "))}</p>`);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|[-*]\s|\d+\.\s|>)/.test(lines[i])) para.push(lines[i++].trim());
    if (para.length) out.push(p(inline(para.join(" "))));
    else i++;
  }
  return out.join("");
}

export function mdToText(md: string) {
  return md
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/[*_`#>]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
