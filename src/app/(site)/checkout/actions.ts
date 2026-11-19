"use server";

import { redirect } from "next/navigation";
import { getMySubscription, getPlan, includesPlan, newReference } from "@/lib/membership";
import { initializeTransaction, paymentsMode } from "@/lib/paystack";
import { priceOf } from "@/lib/pricing";
import { visitorCurrency } from "@/lib/server/currency";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";

export async function startCheckout(form: FormData) {
  const plan = getPlan(String(form.get("plan")));
  if (!plan) redirect("/#tracks");

  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=${encodeURIComponent(`/checkout/${plan.id}`)}`);

  // Lifetime access: never charge for a track this account already has (the page hides the
  // button too, but the server is what counts).
  if (includesPlan(await getMySubscription(), plan.id)) redirect(`/checkout/${plan.id}`);

  const mode = paymentsMode();
  const reference = newReference(user.id);

  if (mode === "disabled") {
    redirect(`/checkout/${plan.id}?error=unavailable`);
  }

  // Naira in Nigeria, US dollars everywhere else: decided here from the request, never from the form.
  const currency = await visitorCurrency();
  let url: string;
  try {
    const tx = await initializeTransaction({
      email: user.email,
      amountKobo: priceOf(plan, currency) * 100,
      currency,
      reference,
      callbackUrl: `${site.url}/api/paystack/callback`,
      metadata: { user_id: user.id, plan: plan.id, currency },
    });
    url = tx.authorization_url;
  } catch (e) {
    console.error(e);
    // Paystack refuses dollar charges until USD is switched on for the account.
    redirect(`/checkout/${plan.id}?error=${currency === "USD" && /currency/i.test(String(e)) ? "currency" : "init"}`);
  }
  redirect(url);
}
