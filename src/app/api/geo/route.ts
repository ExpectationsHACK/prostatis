import { currencyForCountry } from "@/lib/pricing";
import { countryFrom } from "@/lib/server/currency";

// Which currency to show this visitor. Public pages are cached for everyone, so prices start in
// US dollars and the browser asks here once; the checkout decides the real charge on the server.
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return Response.json(
    { currency: currencyForCountry(countryFrom(request.headers)) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
