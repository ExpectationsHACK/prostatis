import "server-only";
import { certDate, certificateImage, trackOf, verifyUrl } from "@/lib/certificate-image";
import { type Certificate, updateCertificate } from "@/lib/certificates";
import { escapeHtml, sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

/** Email the certificate (PNG attached, plus the public verification link) and record it. */
export async function emailCertificate(c: Certificate): Promise<{ ok: boolean; error?: string }> {
  if (!c.email) return { ok: false, error: "This student has no email address on file." };
  if (c.revoked_at) return { ok: false, error: "This certificate has been revoked." };

  const track = trackOf(c.track);
  const link = verifyUrl(c.id);
  const png = await certificateImage(c).arrayBuffer();
  const first = escapeHtml(c.name.split(" ")[0] || "there");

  const text = [
    `Congratulations ${c.name.split(" ")[0] || ""}!`.replace(" !", "!"),
    ``,
    `You completed the ${track.name} and passed the final assessment with ${c.score}/${c.total}. Your certificate is attached.`,
    ``,
    `Certificate ID: ${c.id}`,
    `Issued: ${certDate(c.issued_at)}`,
    `Anyone can verify it here: ${link}`,
    ``,
    `Add it to your LinkedIn (Licenses & certifications), your portfolio and your proposals. Share the verification link so clients can check it's real.`,
    ``,
    `${site.name}`,
  ].join("\n");

  const html = `<div style="font-family:ui-monospace,Menlo,Consolas,monospace;background:#f6efe2;padding:24px;color:#1b1714">
<div style="max-width:560px;margin:0 auto;background:#fffdf8;border:2px solid #1b1714;box-shadow:5px 5px 0 #1b1714;padding:28px">
<p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#0f4d3a;font-weight:bold">Certificate of completion</p>
<h1 style="font-family:Arial,Helvetica,sans-serif;font-size:26px;margin:12px 0">Congratulations, ${first}!</h1>
<p style="font-size:15px;line-height:1.6">You completed the <strong>${escapeHtml(track.name)}</strong> and passed the final assessment with <strong>${c.score}/${c.total}</strong>. Your certificate is attached to this email.</p>
<p style="font-size:14px;line-height:1.6;margin:18px 0 6px">Certificate ID: <strong>${escapeHtml(c.id)}</strong><br>Issued: ${certDate(c.issued_at)}</p>
<p style="margin:22px 0"><a href="${link}" style="display:inline-block;background:#ff6719;color:#1b1714;border:2px solid #1b1714;padding:12px 18px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px">View &amp; verify certificate</a></p>
<p style="font-size:14px;line-height:1.6">Add it to your LinkedIn (Licenses &amp; certifications), your portfolio and your proposals. Share the verification link so clients can check it's real.</p>
<p style="font-size:13px;color:#5c5249;margin-top:24px">${escapeHtml(site.name)}</p>
</div></div>`;

  const res = await sendEmail({
    to: c.email,
    subject: `Your ${track.name} certificate from ${site.name}`,
    html,
    text,
    attachments: [{ filename: `${c.id}.png`, content: png }],
  });
  if (res.ok) await updateCertificate(c.id, { emailed_at: new Date().toISOString() });
  return res;
}
