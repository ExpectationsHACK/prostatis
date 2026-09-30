"use client";

import { Printer, X } from "lucide-react";
import { btn, size } from "../ui";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { Field, Select, TextArea, TextInput } from "../tool-ui";

type Item = { desc: string; qty: string; price: string };

const symbols: Record<string, string> = { USD: "$", GBP: "£", EUR: "€", NGN: "₦" };
const num = (s: string) => Number(String(s).replace(/,/g, "")) || 0;

const today = () => new Date().toISOString().slice(0, 10);
const inDays = (d: number) => new Date(Date.now() + d * 86400_000).toISOString().slice(0, 10);

const initial = {
    number: "INV-001",
    date: new Date().toISOString().slice(0, 10),
    due: new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 10),
    currency: "USD",
    fromName: "Ada Builds",
    fromDetails: "Ada Okafor\nLagos, Nigeria\nada@adabuilds.com",
    toName: "Brightside Dental",
    toDetails: "Attn: Sarah Mitchell\nAustin, Texas, USA",
    payment: "Wise (USD): Account 0000000000 · Routing 000000000\nOr pay by card: [payment link]",
    notes: "50% deposit per the approved proposal. Thank you for your business!",
    tax: "0",
    discount: "0",
    items: [
      { desc: "Website design & build (5 pages), 50% deposit", qty: "1", price: "600" },
    ] as Item[],
};
const examples = [
  { label: "Lagos client (₦ deposit)", values: { ...initial, number: "GBS-001", currency: "NGN", toName: "Glow Beauty Studio", toDetails: "Attn: Kemi Adebayo\nLekki Phase 1, Lagos", payment: "Bank transfer: [Bank name] · [Account number] · [Account name]\nOr pay by card/transfer/USSD: [Paystack payment link]", notes: "50% deposit as agreed in the proposal. Work starts once this is received. Thank you!", items: [{ desc: "Booking website: 50% deposit", qty: "1", price: "225000" }] } },
  { label: "US client ($ balance)", values: { ...initial, items: [{ desc: "Website design & build (5 pages), 50% balance", qty: "1", price: "600" }], notes: "Final 50% before launch, as agreed. Thank you for your business!" } },
  { label: "Monthly care plan (₦)", values: { ...initial, number: "MNK-CARE-07", currency: "NGN", toName: "Mama Nkechi's Kitchen", toDetails: "Ikeja, Lagos", payment: "Bank transfer: [Bank name] · [Account number] · [Account name]", notes: "Care plan for this month: menu updates, monitoring and report.", items: [{ desc: "Website care plan: monthly", qty: "1", price: "60000" }] } },
];

export default function InvoiceGenerator() {
  const { f, patch, load, source } = useToolState("invoice-generator", { ...initial, date: today(), due: inDays(7) });
  const items = f.items;
  const setItems = (next: Item[]) => patch({ items: next });
  const set = (k: Exclude<keyof typeof initial, "items">) => (e: { target: { value: string } }) => patch({ [k]: e.target.value });
  const setItem = (i: number, k: keyof Item, v: string) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  const sym = symbols[f.currency];
  const money = (n: number) => sym + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const subtotal = items.reduce((n, it) => n + num(it.qty) * num(it.price), 0);
  const discount = num(f.discount);
  const tax = ((subtotal - discount) * num(f.tax)) / 100;
  const total = subtotal - discount + tax;

  const plain = `PAYMENT REQUEST ${f.number}
From: ${f.fromName}
${f.fromDetails}

To: ${f.toName}
${f.toDetails}

Issued: ${f.date} · Due: ${f.due}

${items.map((it) => `- ${it.desc}: ${num(it.qty)} × ${money(num(it.price))} = ${money(num(it.qty) * num(it.price))}`).join("\n")}
Subtotal: ${money(subtotal)}${discount > 0 ? `\nDiscount: −${money(discount)}` : ""}${tax > 0 ? `\nTax (${num(f.tax)}%): ${money(tax)}` : ""}
TOTAL DUE: ${money(total)} ${f.currency}

How to pay:
${f.payment}

${f.notes}`;

  const ready = [
    [f.payment.trim().length > 10 && !/\[(bank|account|paystack)/i.test(f.payment), "Payment details are filled in (no [brackets] left)"],
    [f.due >= f.date, "Due date is after the issue date"],
    [total > 0, "The total is more than zero"],
    [f.toName.trim().length > 0, "The client's name is filled in"],
  ] as [boolean, string][];

  return (
    <AppToolLayout
      slug="invoice-generator"
      source={source}
      examples={examples}
      onExample={(i) => load({ ...examples[i].values, date: today(), due: inDays(7) })}
      onReset={() => load({ ...initial, date: today(), due: inDays(7) })}
      text={plain}
      form={
      <div className="space-y-4 print:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Reference number">
            <TextInput value={f.number} onChange={set("number")} />
          </Field>
          <Field label="Currency">
            <Select value={f.currency} onChange={set("currency")} options={Object.keys(symbols)} />
          </Field>
          <Field label="Issue date">
            <TextInput type="date" value={f.date} onChange={set("date")} />
          </Field>
          <Field label="Due date">
            <TextInput type="date" value={f.due} onChange={set("due")} />
          </Field>
        </div>
        <Field label="From (you)">
          <TextInput value={f.fromName} onChange={set("fromName")} />
        </Field>
        <TextArea value={f.fromDetails} onChange={set("fromDetails")} aria-label="Your details" />
        <Field label="Bill to">
          <TextInput value={f.toName} onChange={set("toName")} />
        </Field>
        <TextArea value={f.toDetails} onChange={set("toDetails")} aria-label="Client details" />
        <div>
          <span className="block text-sm font-semibold text-ink">Line items</span>
          <div className="mt-1.5 space-y-2">
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-[1fr_56px_88px_28px] gap-2">
                <TextInput value={it.desc} placeholder="Description" onChange={(e) => setItem(i, "desc", e.target.value)} aria-label="Description" />
                <TextInput value={it.qty} inputMode="decimal" onChange={(e) => setItem(i, "qty", e.target.value)} aria-label="Quantity" />
                <TextInput value={it.price} inputMode="decimal" onChange={(e) => setItem(i, "price", e.target.value)} aria-label="Unit price" />
                <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))} className="grid place-items-center text-muted hover:text-danger" aria-label="Remove item">
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setItems([...items, { desc: "", qty: "1", price: "0" }])} className="mt-2 text-sm font-semibold text-brand-text hover:underline">
            + Add item
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={`Discount (${sym})`}>
            <TextInput inputMode="decimal" value={f.discount} onChange={set("discount")} />
          </Field>
          <Field label="Tax / VAT %" hint="Nigerian VAT is 7.5% if you're registered.">
            <TextInput inputMode="decimal" value={f.tax} onChange={set("tax")} />
          </Field>
        </div>
        <Field label="Payment details" hint="Bank details, a Paystack payment link (card, transfer, USSD), or a USD account for clients abroad.">
          <TextArea value={f.payment} onChange={set("payment")} />
        </Field>
        <Field label="Notes">
          <TextArea value={f.notes} onChange={set("notes")} />
        </Field>
      </div>
      }
      output={
      <div className="min-w-0 space-y-3">
        <ul className="border border-edge bg-card p-3 text-[13.5px] print:hidden">
          {ready.map(([ok, label]) => (
            <li key={label} className={ok ? "text-success" : "text-danger"}>
              {ok ? "✓" : "✗"} <span className="text-ink">{label}</span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => window.print()} className={`${btn.primary} ${size.md} w-full print:hidden`}>
          <Printer className="size-4" aria-hidden /> Print / Save as PDF
        </button>
        <div id="invoice-print" className="border border-edge bg-white p-6 text-[13px] text-neutral-900 sm:p-8 print:border-0 print:p-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xl font-bold">{f.fromName}</p>
              <p className="mt-1 whitespace-pre-line text-neutral-600">{f.fromDetails}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold tracking-tight">INVOICE</p>
              <p className="text-neutral-600">{f.number}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold text-neutral-500">Bill to</p>
              <p className="font-semibold">{f.toName}</p>
              <p className="whitespace-pre-line text-neutral-600">{f.toDetails}</p>
            </div>
            <div className="text-right">
              <p><span className="text-neutral-500">Issued:</span> {f.date}</p>
              <p><span className="text-neutral-500">Due:</span> {f.due}</p>
            </div>
          </div>
          <table className="mt-6 w-full">
            <thead>
              <tr className="border-b border-neutral-300 text-left text-[11px] text-neutral-500">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-neutral-200">
                  <td className="py-2 pr-2">{it.desc}</td>
                  <td className="py-2 text-right">{num(it.qty)}</td>
                  <td className="py-2 text-right">{money(num(it.price))}</td>
                  <td className="py-2 text-right">{money(num(it.qty) * num(it.price))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ml-auto mt-4 w-full max-w-[240px] space-y-1">
            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{money(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between"><span className="text-neutral-500">Discount</span><span>−{money(discount)}</span></div>}
            {tax > 0 && <div className="flex justify-between"><span className="text-neutral-500">Tax ({num(f.tax)}%)</span><span>{money(tax)}</span></div>}
            <div className="flex justify-between border-t border-neutral-300 pt-2 text-base font-bold"><span>Total due</span><span>{money(total)} {f.currency}</span></div>
          </div>
          <div className="mt-8">
            <p className="text-[11px] font-semibold text-neutral-500">Payment details</p>
            <p className="whitespace-pre-line">{f.payment}</p>
          </div>
          {f.notes && <p className="mt-4 text-neutral-600">{f.notes}</p>}
        </div>
      </div>
      }
    />
  );
}
