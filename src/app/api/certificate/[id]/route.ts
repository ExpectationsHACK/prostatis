import { certificateImage } from "@/lib/certificate-image";
import { getCertificate } from "@/lib/certificates";

/** The certificate PNG. `?download=1` saves it as a file instead of showing it. */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await getCertificate(id);
  if (!cert || cert.revoked_at) return new Response("Certificate not found", { status: 404 });
  const img = certificateImage(cert);
  const headers = new Headers(img.headers);
  // Public by design (anyone can verify a certificate) and costly to draw, so let the CDN keep
  // it for an hour; a revoked certificate disappears within the hour.
  headers.set("Cache-Control", "public, max-age=300, s-maxage=3600");
  if (new URL(request.url).searchParams.has("download")) headers.set("Content-Disposition", `attachment; filename="${cert.id}.png"`);
  return new Response(img.body, { status: 200, headers });
}
