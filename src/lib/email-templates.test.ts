import { describe, expect, it } from "vitest";
import { authEmail, esc, layout, mdToEmailHtml, mdToText, newsletterEmail, welcomeEmail } from "./email-templates";

describe("email templates", () => {
  it("escapes HTML so subscribers' content can't inject markup", () => {
    expect(esc(`<script>"x" & 'y'</script>`)).toBe("&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;");
    const html = mdToEmailHtml("Hello <img src=x onerror=alert(1)>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img");
  });

  it("only allows web and mail links, and makes site links absolute", () => {
    const html = mdToEmailHtml("[ok](https://a.com) [bad](javascript:alert(1)) [tools](/tools)");
    expect(html).toContain('href="https://a.com"');
    expect(html).not.toContain("javascript:");
    expect(html).toMatch(/href="https?:\/\/[^"]+\/tools"/);
  });

  it("turns Markdown into email-safe HTML and plain text", () => {
    const md = "## What's new\n\n- **Bold** item\n- Second\n\n> A quote\n\nA paragraph.";
    const html = mdToEmailHtml(md);
    expect(html).toContain("<h2");
    expect(html).toContain("<ul");
    expect(html).toContain("<strong>Bold</strong>");
    expect(mdToText(md)).not.toMatch(/[#*>]/);
  });

  it("brands account emails as Prostatis with the link in the button and as text", () => {
    for (const kind of ["signup", "recovery", "magiclink"] as const) {
      const e = authEmail(kind, "https://example.com/auth/callback?token_hash=abc&type=email", "Ada Obi");
      expect(e.subject).toContain("Prostatis");
      expect(e.html).toContain("Prostatis by Stynark");
      expect(e.html).not.toMatch(/supabase/i);
      expect(e.html).toContain("token_hash=abc&amp;type=email");
      expect(e.text).toContain("https://example.com/auth/callback?token_hash=abc&type=email");
      expect(e.html).toContain("Hi Ada,");
    }
  });

  it("puts an unsubscribe link in every newsletter and welcome email", () => {
    const n = newsletterEmail({ subject: "Issue 1", preheader: "", body_md: "Hi" }, "https://site/unsubscribe?t=123");
    const w = welcomeEmail("https://site/unsubscribe?t=123");
    for (const e of [n, w]) {
      expect(e.html).toContain("https://site/unsubscribe?t=123");
      expect(e.text).toContain("https://site/unsubscribe?t=123");
    }
  });

  it("hides the preheader and keeps the layout table-based", () => {
    const html = layout({ preheader: "Peek", heading: "Hi", bodyHtml: "<p>x</p>" });
    expect(html).toContain("display:none");
    expect(html).toContain('role="presentation"');
  });
});
