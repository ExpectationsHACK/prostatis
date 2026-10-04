import { createHmac } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { isValidWebhookSignature } from "./paystack";
import { safeNext } from "./safe-next";
import { clientIp, rateLimited, resetRateLimits } from "./server/rate-limit";

vi.mock("server-only", () => ({}));

describe("safeNext: where sign-in may send you", () => {
  it("keeps paths on this site, with their query", () => {
    expect(safeNext("/learn/main-track/3")).toBe("/learn/main-track/3");
    expect(safeNext("/checkout/main_track?error=init")).toBe("/checkout/main_track?error=init");
  });
  it("blocks other sites, however they're disguised", () => {
    for (const bad of ["https://evil.com", "//evil.com", "/\\evil.com", "/\t/evil.com", "/\n/evil.com", "/\r//evil.com", "javascript:alert(1)", "evil.com", "", null, 42, "/%09/evil.com/../"]) {
      const out = safeNext(bad);
      expect(out.startsWith("/") && !out.startsWith("//"), String(bad)).toBe(true);
      expect(new URL(out, "https://prostatis.test").origin, String(bad)).toBe("https://prostatis.test");
    }
    expect(safeNext("/\t/evil.com")).toBe("/dashboard");
    expect(safeNext("//evil.com", "/learn")).toBe("/learn");
  });
});

describe("rate limiter", () => {
  beforeEach(() => resetRateLimits());
  it("allows `max` requests per window, then blocks", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimited("k", 3, 60_000, t + i)).toBe(false);
    expect(rateLimited("k", 3, 60_000, t + 10)).toBe(true);
    expect(rateLimited("k", 3, 60_000, t + 60_001)).toBe(false); // window moved on
  });
  it("doesn't let a blocked caller grow its history", () => {
    const t = 2_000_000;
    rateLimited("x", 1, 60_000, t);
    for (let i = 1; i < 500; i++) expect(rateLimited("x", 1, 60_000, t + i)).toBe(true);
    expect(rateLimited("x", 1, 60_000, t + 60_000)).toBe(false); // only the first hit was kept
  });
  it("never forgets site-wide caps, even when flooded with new keys", () => {
    const t = 3_000_000;
    expect(rateLimited("global:ai-day", 1, 86_400_000, t)).toBe(false);
    for (let i = 0; i < 12_000; i++) rateLimited(`ip:${i}`, 5, 60_000, t);
    expect(rateLimited("global:ai-day", 1, 86_400_000, t + 1)).toBe(true);
  });
  it("reads the visitor IP from the first forwarded address", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "102.89.1.2, 10.0.0.1" }))).toBe("102.89.1.2");
    expect(clientIp(new Headers({ "x-real-ip": "41.58.0.1" }))).toBe("41.58.0.1");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});

describe("Paystack webhook signature", () => {
  const body = JSON.stringify({ event: "charge.success", data: { reference: "pst_abc" } });
  it("accepts only Paystack's HMAC of the exact body", () => {
    process.env.PAYSTACK_SECRET_KEY = "sk_test_unit";
    const sig = createHmac("sha512", "sk_test_unit").update(body).digest("hex");
    expect(isValidWebhookSignature(body, sig)).toBe(true);
    expect(isValidWebhookSignature(body.replace("pst_abc", "pst_xyz"), sig)).toBe(false); // tampered body
    expect(isValidWebhookSignature(body, createHmac("sha512", "wrong").update(body).digest("hex"))).toBe(false);
    expect(isValidWebhookSignature(body, null)).toBe(false);
    expect(isValidWebhookSignature(body, "short")).toBe(false);
  });
  it("rejects everything when no secret key is set", () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    expect(isValidWebhookSignature(body, createHmac("sha512", "").update(body).digest("hex"))).toBe(false);
  });
});
