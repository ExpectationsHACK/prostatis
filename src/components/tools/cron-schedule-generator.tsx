"use client";

import { useMemo } from "react";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { CopyButton, Field, Select, TextInput } from "../tool-ui";

const freqs = [
  { value: "minutes", label: "Every N minutes" },
  { value: "hourly", label: "Every hour" },
  { value: "daily", label: "Every day" },
  { value: "weekdays", label: "Weekdays (Mon–Fri)" },
  { value: "weekly", label: "Once a week" },
  { value: "monthly", label: "Once a month" },
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Common time zones; the visitor's own (from their device) is added to the top of the list.
const zones = [
  "UTC", "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "America/Toronto", "America/Mexico_City", "America/Sao_Paulo",
  "Europe/London", "Europe/Berlin", "Europe/Paris", "Africa/Lagos", "Africa/Cairo", "Africa/Johannesburg", "Africa/Nairobi",
  "Asia/Dubai", "Asia/Kolkata", "Asia/Singapore", "Asia/Manila", "Asia/Tokyo", "Australia/Sydney",
];

/** Minutes a time zone is ahead of UTC at a given moment (handles daylight saving and half-hour zones). */
function offsetMinutes(zone: string, at = new Date()): number {
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(at).map((x) => [x.type, x.value]));
    const asUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
  } catch {
    return 0;
  }
}

const deviceZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

type Spec = { min: number[]; hour: number[]; dom: number[] | null; dow: number[] | null };

function range(a: number, b: number, step = 1) {
  const r: number[] = [];
  for (let i = a; i <= b; i += step) r.push(i);
  return r;
}

// zone "" = the visitor's own time zone. server: "utc" (most hosts) or "local" (server set to that zone).
const initial = { freq: "weekdays", every: "15", time: "08:00", dow: "1", dom: "1", zone: "", server: "utc" };
const examples = [
  { label: "8am weekday report", values: initial },
  { label: "Check every 15 min", values: { ...initial, freq: "minutes", every: "15" } },
  { label: "Monthly payment reminder", values: { ...initial, freq: "monthly", time: "09:00", dom: "25" } },
  { label: "Friday 5pm summary", values: { ...initial, freq: "weekly", time: "17:00", dow: "5" } },
];

export default function CronScheduleGenerator() {
  const { f, patch, load, source, shareUrl } = useToolState("cron-schedule-generator", initial);
  const { freq, every, time, dow, dom } = f;
  const mine = useMemo(() => deviceZone(), []);
  const setFreq = (v: string) => patch({ freq: v });
  const setEvery = (v: string) => patch({ every: v });
  const setTime = (v: string) => patch({ time: v });
  const setDow = (v: string) => patch({ dow: v });
  const setDom = (v: string) => patch({ dom: v });
  const zone = f.zone || mine;
  const utc = f.server !== "local";
  const zoneLabel = zone.replace(/_/g, " ");
  const offset = useMemo(() => offsetMinutes(zone), [zone]);
  // Daylight saving: the offset differs between January and July.
  const dst = useMemo(() => {
    const y = new Date().getUTCFullYear();
    return offsetMinutes(zone, new Date(Date.UTC(y, 0, 15))) !== offsetMinutes(zone, new Date(Date.UTC(y, 6, 15)));
  }, [zone]);

  const [hh, mm] = time.split(":").map((x) => Number(x) || 0);
  // Convert the local time the user typed into the server's UTC if needed.
  const shift = utc ? -offset : 0;
  let total = hh * 60 + mm + shift;
  let dayShift = 0;
  if (total < 0) {
    total += 1440;
    dayShift = -1;
  }
  if (total >= 1440) {
    total -= 1440;
    dayShift = 1;
  }
  const h = Math.floor(total / 60);
  const m = total % 60;
  const n = Math.min(59, Math.max(1, Number(every) || 15));
  const wd = (Number(dow) + dayShift + 7) % 7;

  const { expr, spec, human } = useMemo(() => {
    const localTime = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${zoneLabel} time`;
    switch (freq) {
      case "minutes":
        return {
          expr: `*/${n} * * * *`,
          spec: { min: range(0, 59, n), hour: range(0, 23), dom: null, dow: null } as Spec,
          human: `Every ${n} minute${n === 1 ? "" : "s"}, all day`,
        };
      case "hourly":
        return {
          expr: `${m} * * * *`,
          spec: { min: [m], hour: range(0, 23), dom: null, dow: null } as Spec,
          human: `Every hour at :${String(mm).padStart(2, "0")} ${zoneLabel} time`,
        };
      case "weekdays": {
        const days = dayShift === -1 ? "0-4" : dayShift === 1 ? "2-6" : "1-5";
        const dset = dayShift === -1 ? [0, 1, 2, 3, 4] : dayShift === 1 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
        return { expr: `${m} ${h} * * ${days}`, spec: { min: [m], hour: [h], dom: null, dow: dset } as Spec, human: `Monday to Friday at ${localTime}` };
      }
      case "weekly":
        return { expr: `${m} ${h} * * ${wd}`, spec: { min: [m], hour: [h], dom: null, dow: [wd] } as Spec, human: `Every ${dayNames[Number(dow)]} at ${localTime}` };
      case "monthly": {
        const d = Math.min(28, Math.max(1, Number(dom) || 1));
        return { expr: `${m} ${h} ${d} * *`, spec: { min: [m], hour: [h], dom: [d], dow: null } as Spec, human: `On day ${d} of every month at ${localTime}${dayShift ? " (server date may differ by a day)" : ""}` };
      }
      default:
        return { expr: `${m} ${h} * * *`, spec: { min: [m], hour: [h], dom: null, dow: null } as Spec, human: `Every day at ${localTime}` };
    }
  }, [freq, n, mm, m, h, hh, wd, dow, dom, dayShift, zoneLabel]);

  // Next 5 runs, computed in the server's clock, shown in the user's time zone.
  const next = useMemo(() => {
    const out: Date[] = [];
    const serverOffset = utc ? 0 : offset;
    const t = new Date();
    t.setUTCSeconds(0, 0);
    t.setUTCMinutes(t.getUTCMinutes() + 1);
    for (let i = 0; i < 60 * 24 * 40 && out.length < 5; i++) {
      const server = new Date(t.getTime() + serverOffset * 60_000);
      const ok =
        spec.min.includes(server.getUTCMinutes()) &&
        spec.hour.includes(server.getUTCHours()) &&
        (!spec.dom || spec.dom.includes(server.getUTCDate())) &&
        (!spec.dow || spec.dow.includes(server.getUTCDay()));
      if (ok) out.push(new Date(t));
      t.setUTCMinutes(t.getUTCMinutes() + 1);
    }
    return out;
  }, [spec, utc, offset]);

  const fmt = (d: Date) => d.toLocaleString("en", { timeZone: zone, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const offsetText = `UTC${offset >= 0 ? "+" : "−"}${Math.floor(Math.abs(offset) / 60)}${Math.abs(offset) % 60 ? ":" + String(Math.abs(offset) % 60).padStart(2, "0") : ""}`;

  const snippets = {
    "Cloudflare Worker (wrangler.toml, free plan)": `[triggers]\ncrons = ["${expr}"]`,
    "GitHub Actions": `on:\n  schedule:\n    - cron: "${expr}"`,
    "Linux crontab": `${expr} /usr/bin/node /home/you/agent/run.js >> /home/you/agent/cron.log 2>&1`,
  };

  const frequent = freq === "minutes" || freq === "hourly";
  // Free-plan limits worth knowing before you promise a client a schedule (checked Oct 2026).
  const limits = [
    "Cloudflare's free Workers plan includes 5 cron triggers per account, and runs them in UTC.",
    "GitHub Actions schedules can't run more often than every 5 minutes and may start late when GitHub is busy.",
    "Make's free plan runs scheduled scenarios at most every 15 minutes (set the schedule in the scenario, not with cron).",
    ...(frequent ? ["Every run of a frequent job uses your free allowance: check the monthly limits before choosing every few minutes."] : []),
    ...(dst && utc && !frequent ? [`${zoneLabel} uses daylight saving, so a UTC schedule runs an hour earlier or later in your time for part of the year. Update it when the clocks change, or set the server to your time zone.`] : []),
  ];
  const text = `CRON: ${expr}\n${human}\n\nNext runs (${zoneLabel} time):\n${next.map((d) => "- " + fmt(d)).join("\n")}\n\n${Object.entries(snippets)
    .map(([k, v]) => `${k.toUpperCase()}\n${v}`)
    .join("\n\n")}\n\nNOTES\n- ${limits.join("\n- ")}`;

  return (
    <AppToolLayout
      slug="cron-schedule-generator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={text}
      form={
        <>
          <Field label="How often?">
            <Select value={freq} onChange={(e) => setFreq(e.target.value)} options={freqs} />
          </Field>
          {freq === "minutes" && (
            <Field label="Every how many minutes?">
              <TextInput inputMode="numeric" value={every} onChange={(e) => setEvery(e.target.value)} />
            </Field>
          )}
          {freq !== "minutes" && (
            <Field label={freq === "hourly" ? "At which minute past the hour?" : `At what time? (${zoneLabel} time)`}>
              <TextInput type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
          )}
          {freq === "weekly" && (
            <Field label="On which day?">
              <Select value={dow} onChange={(e) => setDow(e.target.value)} options={dayNames.map((d, i) => ({ value: String(i), label: d }))} />
            </Field>
          )}
          {freq === "monthly" && (
            <Field label="Day of month" hint="1–28 so it runs every month, including February.">
              <TextInput inputMode="numeric" value={dom} onChange={(e) => setDom(e.target.value)} />
            </Field>
          )}
          <Field label="Your time zone" hint={`Right now ${offsetText}. Detected from your device; change it if the schedule is for somewhere else.`}>
            <Select
              value={zone}
              onChange={(e) => patch({ zone: e.target.value === mine ? "" : e.target.value })}
              options={[...new Set([mine, ...zones])].map((z) => ({ value: z, label: z === mine ? `${z.replace(/_/g, " ")} (yours)` : z.replace(/_/g, " ") }))}
            />
          </Field>
          <Field label="Where will it run?" hint="Cloudflare, GitHub Actions and most servers run cron in UTC.">
            <Select
              value={utc ? "utc" : "local"}
              onChange={(e) => patch({ server: e.target.value })}
              options={[
                { value: "utc", label: "Server in UTC (Cloudflare, GitHub, most VPS)" },
                { value: "local", label: `Server set to ${zoneLabel} time` },
              ]}
            />
          </Field>
        </>
      }
      output={
        <>
          <div className="rounded-[12px] border border-edge bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <code className="font-mono text-3xl font-bold text-ink">{expr}</code>
              <CopyButton text={expr} />
            </div>
            <p className="mt-2 text-[15px] text-ink">{human}</p>
            <div className="mt-4 grid grid-cols-5 gap-1 text-center font-mono text-[11px] text-muted">
              {["minute", "hour", "day", "month", "weekday"].map((l, i) => (
                <div key={l}>
                  <div className="rounded bg-sunk py-1 text-sm font-bold text-ink">{expr.split(" ")[i]}</div>
                  {l}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-muted">Next runs ({zoneLabel} time)</p>
            <ul className="mt-1 space-y-0.5 text-sm text-ink">
              {next.map((d) => (
                <li key={d.toISOString()}>{fmt(d)}</li>
              ))}
            </ul>
          </div>
          <div className={"rounded-[12px] border border-edge px-3 py-2.5 text-[14px] text-ink " + (frequent ? "bg-danger/10" : "bg-brand-wash")}>
            <strong>Free-plan limits:</strong>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          {Object.entries(snippets).map(([k, v]) => (
            <div key={k} className="overflow-hidden rounded-[12px] border border-edge bg-card">
              <div className="flex items-center justify-between border-b border-line bg-sunk px-4 py-2">
                <span className="text-xs font-semibold text-muted">{k}</span>
                <CopyButton text={v} />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] text-ink">{v}</pre>
            </div>
          ))}
          <p className="text-sm text-muted">
            GitHub Actions schedules can run a few minutes late when GitHub is busy, don't use them for anything that must happen at an exact minute. Automation tools (Make, Zapier, n8n) have their own schedule settings: set their time zone to yours ({zone}).
          </p>
        </>
      }
    />
  );
}
