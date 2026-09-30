import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Tiny JSON-file tables in .data/, used only in local development preview (no Supabase, or
 * COURSE_PREVIEW=true) so the blog, analytics, certificates and admin work end to end.
 */
const dir = path.join(process.cwd(), ".data");
let queue: Promise<unknown> = Promise.resolve();

export async function readTable<T>(name: string): Promise<T[]> {
  await queue;
  try {
    return JSON.parse(await fs.readFile(path.join(dir, `${name}.json`), "utf8")) as T[];
  } catch {
    return [];
  }
}

/** Serialised read-modify-write so concurrent requests don't clobber each other. */
export function writeTable<T, R = void>(name: string, fn: (rows: T[]) => R): Promise<R> {
  const run = queue.then(async () => {
    const file = path.join(dir, `${name}.json`);
    let rows: T[] = [];
    try {
      rows = JSON.parse(await fs.readFile(file, "utf8")) as T[];
    } catch {}
    const out = fn(rows);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(rows, null, 1));
    return out;
  });
  queue = run.catch(() => undefined);
  return run;
}
