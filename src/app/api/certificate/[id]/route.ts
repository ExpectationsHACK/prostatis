import { certificateImage } from "@/lib/certificate-image";
import { getCertificate } from "@/lib/certificates";

/** The certificate PNG. `?download=1` saves it as a file instead of showing it. */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await getCertificate(id);
  if (!cert || cert.revoked_at) return new Response("Certificate not found", { status: 404 });
  const img = certificateImage(cert);
  const headers = new Headers(img.headers);
  headers.set("Cache-Control", "private, max-age=300");
  if (new URL(request.url).searchParams.has("download")) headers.set("Content-Disposition", `attachment; filename="${cert.id}.png"`);
  return new Response(img.body, { status: 200, headers });
}
