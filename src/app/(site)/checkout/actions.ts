"use server";

import { redirect } from "next/navigation";
import { getPlan, newReference } from "@/lib/membership";
import { initializeTransaction, paymentsMode } from "@/lib/paystack";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";

export async function startCheckout(form: FormData) {
  const plan = getPlan(String(form.get("plan")));
  if (!plan) redirect("/pricing");

  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=${encodeURIComponent(`/checkout/${plan.id}`)}`);

  const mode = paymentsMode();
  const reference = newReference(user.id);

  if (mode === "disabled") {
    redirect(`/checkout/${plan.id}?error=unavailable`);
  }

  let url: string;
  try {
    const tx = await initializeTransaction({
      email: user.email,
      amountKobo: plan.priceNgn * 100,
      reference,
      callbackUrl: `${site.url}/api/paystack/callback`,
      metadata: { user_id: user.id, plan: plan.id },
    });
    url = tx.authorization_url;
  } catch (e) {
    console.error(e);
    redirect(`/checkout/${plan.id}?error=init`);
  }
  redirect(url);
}
