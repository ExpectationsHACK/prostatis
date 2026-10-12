import { SearchX } from "lucide-react";
import Link from "next/link";
import { StatusPage } from "@/components/status";
import { btn, size } from "@/components/ui";
import { site } from "@/lib/site";

// A verification link with an ID we never issued: say so plainly, since an employer or client
// may be checking whether a certificate is real.
export default function CertificateNotFound() {
  return (
    <StatusPage
      code="404"
      icon={SearchX}
      tone="warning"
      title="No certificate with that ID"
      actions={
        <Link href="/" className={`${btn.secondary} ${size.md}`}>
          About {site.name}
        </Link>
      }
      footnote={<>Certificate IDs look like <span className="font-code text-ink">PRS-MT-2026-ABC1234XYZ</span>. If you were sent this link, ask the person to share it again.</>}
    >
      We couldn&apos;t find a {site.name} certificate with this ID. Check the link was copied in full. If it was, this certificate wasn&apos;t issued by {site.name} or has been withdrawn.
    </StatusPage>
  );
}
