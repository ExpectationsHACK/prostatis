/**
 * Currencies for the free money tools (invoices, proposals, rate and cost calculators). The tools
 * work anywhere: US dollars by default, any of these as "your currency". Formatting uses the
 * browser's Intl data, so symbols and separators come out right for each one.
 */
export const currencies = [
  { value: "USD", label: "US dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British pound (£)" },
  { value: "CAD", label: "Canadian dollar (CA$)" },
  { value: "AUD", label: "Australian dollar (A$)" },
  { value: "INR", label: "Indian rupee (₹)" },
  { value: "NGN", label: "Nigerian naira (₦)" },
  { value: "GHS", label: "Ghanaian cedi (GH₵)" },
  { value: "KES", label: "Kenyan shilling (KSh)" },
  { value: "ZAR", label: "South African rand (R)" },
  { value: "EGP", label: "Egyptian pound (E£)" },
  { value: "AED", label: "UAE dirham (AED)" },
  { value: "PHP", label: "Philippine peso (₱)" },
  { value: "BRL", label: "Brazilian real (R$)" },
  { value: "MXN", label: "Mexican peso (MX$)" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["value"];

export const isCurrency = (c: string): c is CurrencyCode => currencies.some((x) => x.value === c);

/** "$1,250", "₦450,000", "€1,250.50" (digits: decimal places; whole units by default). */
export function fmtMoney(n: number, currency: string, digits = 0): string {
  const code = isCurrency(currency) ? currency : "USD";
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency: code, currencyDisplay: "narrowSymbol", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
  } catch {
    return `${code} ${n.toLocaleString("en", { maximumFractionDigits: digits })}`;
  }
}

/** Just the symbol, for field labels ("Monthly goal (₦)"). */
export function currencySymbol(currency: string): string {
  return fmtMoney(0, currency).replace(/[\d.,\s]/g, "") || currency;
}
