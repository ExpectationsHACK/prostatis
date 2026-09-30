"use server";

import { redirect } from "next/navigation";
import { getPlan, newReference, recordSuccessfulPayment, type PlanId } from "@/lib/membership";
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

  if (mode === "demo") {
    redirect(`/checkout/demo?plan=${plan.id}&reference=${reference}`);
  }
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

// Demo mode only: stands in for Paystack's hosted checkout.
export async function completeDemoPayment(form: FormData) {
  if (paymentsMode() !== "demo") redirect("/pricing");
  const plan = getPlan(String(form.get("plan")));
  const reference = String(form.get("reference") ?? "");
  const outcome = String(form.get("outcome"));
  if (!plan || !/^(stk|bwac)_/.test(reference)) redirect("/pricing");

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (outcome !== "success") redirect(`/checkout/${plan.id}?error=declined`);

  try {
    await recordSuccessfulPayment({
      userId: user.id,
      plan: plan.id as PlanId,
      reference: "demo_" + reference,
      amountKobo: plan.priceNgn * 100,
      currency: "NGN",
      provider: "demo",
    });
  } catch (e) {
    // Most often the database migrations haven't been run yet.
    console.error("demo payment", e);
    redirect(`/checkout/${plan.id}?error=record`);
  }
  redirect("/welcome");
}
