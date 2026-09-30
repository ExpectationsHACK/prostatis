"use client";

import { useMemo } from "react";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { CopyButton, Field, Select, TextInput } from "../tool-ui";

// Lagos is UTC+1 all year (no daylight saving).
const LAGOS_OFFSET = 1;

const freqs = [
  { value: "minutes", label: "Every N minutes" },
  { value: "hourly", label: "Every hour" },
  { value: "daily", label: "Every day" },
  { value: "weekdays", label: "Weekdays (Mon–Fri)" },
  { value: "weekly", label: "Once a week" },
  { value: "monthly", label: "Once a month" },
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Spec = { min: number[]; hour: number[]; dom: number[] | null; dow: number[] | null };

function range(a: number, b: number, step = 1) {
  const r: number[] = [];
  for (let i = a; i <= b; i += step) r.push(i);
  return r;
}

const initial = { freq: "weekdays", every: "15", time: "08:00", dow: "1", dom: "1", tz: "utc" };
const examples = [
  { label: "8am weekday report", values: initial },
  { label: "Check every 15 min", values: { ...initial, freq: "minutes", every: "15" } },
  { label: "Monthly payment reminder", values: { ...initial, freq: "monthly", time: "09:00", dom: "25" } },
  { label: "Friday 5pm summary", values: { ...initial, freq: "weekly", time: "17:00", dow: "5" } },
];

export default function CronScheduleGenerator() {
  const { f, patch, load, source, shareUrl } = useToolState("cron-schedule-generator", initial);
  const { freq, every, time, dow, dom } = f;
  const tz = f.tz === "lagos" ? "lagos" : "utc";
  const setFreq = (v: string) => patch({ freq: v });
  const setEvery = (v: string) => patch({ every: v });
  const setTime = (v: string) => patch({ time: v });
  const setDow = (v: string) => patch({ dow: v });
  const setDom = (v: string) => patch({ dom: v });
  const setTz = (v: "lagos" | "utc") => patch({ tz: v });

  const [hh, mm] = time.split(":").map((x) => Number(x) || 0);
  // Convert the Lagos time the user typed into the server's UTC if needed.
  const shift = tz === "utc" ? -LAGOS_OFFSET : 0;
  let h = hh + shift;
  let dayShift = 0;
  if (h < 0) {
    h += 24;
    dayShift = -1;
  }
  if (h > 23) {
    h -= 24;
    dayShift = 1;
  }
  const n = Math.min(59, Math.max(1, Number(every) || 15));
  const wd = (Number(dow) + dayShift + 7) % 7;

  const { expr, spec, human } = useMemo(() => {
    const lagosTime = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} Lagos time`;
    switch (freq) {
      case "minutes":
        return {
          expr: `*/${n} * * * *`,
          spec: { min: range(0, 59, n), hour: range(0, 23), dom: null, dow: null } as Spec,
          human: `Every ${n} minute${n === 1 ? "" : "s"}, all day`,
        };
      case "hourly":
        return {
          expr: `${mm} * * * *`,
          spec: { min: [mm], hour: range(0, 23), dom: null, dow: null } as Spec,
          human: `Every hour at :${String(mm).padStart(2, "0")}`,
        };
      case "weekdays": {
        const days = dayShift === -1 ? "0-4" : dayShift === 1 ? "2-6" : "1-5";
        const dset = dayShift === -1 ? [0, 1, 2, 3, 4] : dayShift === 1 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
        return { expr: `${mm} ${h} * * ${days}`, spec: { min: [mm], hour: [h], dom: null, dow: dset } as Spec, human: `Monday to Friday at ${lagosTime}` };
      }
      case "weekly":
        return { expr: `${mm} ${h} * * ${wd}`, spec: { min: [mm], hour: [h], dom: null, dow: [wd] } as Spec, human: `Every ${dayNames[Number(dow)]} at ${lagosTime}` };
      case "monthly": {
        const d = Math.min(28, Math.max(1, Number(dom) || 1));
        return { expr: `${mm} ${h} ${d} * *`, spec: { min: [mm], hour: [h], dom: [d], dow: null } as Spec, human: `On day ${d} of every month at ${lagosTime}${dayShift ? " (server date may differ by a day)" : ""}` };
      }
      default:
        return { expr: `${mm} ${h} * * *`, spec: { min: [mm], hour: [h], dom: null, dow: null } as Spec, human: `Every day at ${lagosTime}` };
    }
  }, [freq, n, mm, h, hh, wd, dow, dom, dayShift]);

  // Next 5 runs, computed in the schedule's own timezone, displayed in Lagos time.
  const next = useMemo(() => {
    const out: Date[] = [];
    const offsetH = tz === "utc" ? 0 : LAGOS_OFFSET;
    const t = new Date();
    t.setUTCSeconds(0, 0);
    t.setUTCMinutes(t.getUTCMinutes() + 1);
    for (let i = 0; i < 60 * 24 * 40 && out.length < 5; i++) {
      const local = new Date(t.getTime() + offsetH * 3600_000);
      const ok =
        spec.min.includes(local.getUTCMinutes()) &&
        spec.hour.includes(local.getUTCHours()) &&
        (!spec.dom || spec.dom.includes(local.getUTCDate())) &&
        (!spec.dow || spec.dow.includes(local.getUTCDay()));
      if (ok) out.push(new Date(t));
      t.setUTCMinutes(t.getUTCMinutes() + 1);
    }
    return out;
  }, [spec, tz]);

  const fmt = (d: Date) =>
    d.toLocaleString("en-NG", { timeZone: "Africa/Lagos", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  const snippets = {
    "Vercel (vercel.json)": `{\n  "crons": [\n    { "path": "/api/cron/my-job", "schedule": "${expr}" }\n  ]\n}`,
    "GitHub Actions": `on:\n  schedule:\n    - cron: "${expr}"`,
    "Linux crontab": `${expr} /usr/bin/node /home/you/agent/run.js >> /home/you/agent/cron.log 2>&1`,
  };

  const frequent = freq === "minutes" || freq === "hourly";
  const text = `CRON: ${expr}\n${human}\n\nNext runs (Lagos time):\n${next.map((d) => "- " + fmt(d)).join("\n")}\n\n${Object.entries(snippets)
    .map(([k, v]) => `${k.toUpperCase()}\n${v}`)
    .join("\n\n")}${frequent ? "\n\nNOTE: Vercel's free Hobby plan runs cron jobs at most once a day, use Pro or another scheduler for this." : ""}`;

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
            <Field label={freq === "hourly" ? "At which minute past the hour?" : "At what time? (Lagos time, WAT)"}>
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
          <Field label="Where will it run?" hint="Vercel, GitHub Actions and most servers run cron in UTC, one hour behind Lagos.">
            <Select
              value={tz}
              onChange={(e) => setTz(e.target.value as "lagos" | "utc")}
              options={[
                { value: "utc", label: "Server in UTC (Vercel, GitHub, most VPS)" },
                { value: "lagos", label: "Server set to Africa/Lagos" },
              ]}
            />
          </Field>
        </>
      }
      output={
        <>
          <div className="border border-edge bg-card p-5">
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
            <p className="mt-4 text-sm font-semibold text-muted">Next runs (Lagos time)</p>
            <ul className="mt-1 space-y-0.5 text-sm text-ink">
              {next.map((d) => (
                <li key={d.toISOString()}>{fmt(d)}</li>
              ))}
            </ul>
          </div>
          {frequent && (
            <p className="border border-edge bg-danger/10 px-3 py-2.5 text-[14px] text-ink">
              <strong>Heads-up:</strong> Vercel's free Hobby plan only runs cron jobs once a day (and not at an exact minute). For every-few-minutes or hourly jobs, use Vercel Pro, GitHub Actions, or your automation tool's own scheduler.
            </p>
          )}
          {Object.entries(snippets).map(([k, v]) => (
            <div key={k} className="overflow-hidden border border-edge bg-card">
              <div className="flex items-center justify-between border-b border-line bg-sunk px-4 py-2">
                <span className="text-xs font-semibold text-muted">{k}</span>
                <CopyButton text={v} />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] text-ink">{v}</pre>
            </div>
          ))}
          <p className="text-sm text-muted">
            GitHub Actions schedules can run a few minutes late when GitHub is busy, don't use them for anything that must happen at an exact minute. Automation tools (Make, Zapier, n8n) have their own schedule settings: set their time zone to Africa/Lagos.
          </p>
        </>
      }
    />
  );
}
