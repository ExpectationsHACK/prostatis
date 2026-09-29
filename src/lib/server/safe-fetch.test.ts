import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { FetchRejected, isPrivateIp, normaliseUrl, safeFetch } = await import("./safe-fetch");

describe("SSRF guard", () => {
  it.each(["127.0.0.1", "10.1.2.3", "192.168.0.10", "172.16.5.4", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1"])("blocks private address %s", (ip) => {
    expect(isPrivateIp(ip)).toBe(true);
  });
  it.each(["8.8.8.8", "104.18.2.1", "2606:4700::1111"])("allows public address %s", (ip) => {
    expect(isPrivateIp(ip)).toBe(false);
  });
  it("normalises bare domains to https", () => {
    expect(normaliseUrl("glow.ng/page").toString()).toBe("https://glow.ng/page");
  });
  it.each(["ftp://x.com", "http://user:pass@x.com", "http://x.com:8080", "http://localhost", "http://intranet", "javascript:alert(1)", "http://printer.local"])("rejects %s", (u) => {
    expect(() => normaliseUrl(u)).toThrow(FetchRejected);
  });
  it("refuses to fetch a hostname that resolves to a private IP", async () => {
    await expect(safeFetch("http://127.0.0.1.nip.io/")).rejects.toThrow(FetchRejected);
  });
});
