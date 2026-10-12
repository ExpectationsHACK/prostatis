import { describe, expect, it } from "vitest";
import { fetchProblem } from "./fetch-errors";
import { fixFields, validateNewPassword, validateSignup } from "./form-validation";
import { classifyPayment, cleanReference, failureReason } from "./payment-status";

describe("sign-up and password checks", () => {
  const ok = { name: "Ada Okafor", email: "ada@example.com", password: "longenough", whatsapp: "" };
  it("passes a good form and flags each bad field with its own message", () => {
    expect(validateSignup(ok)).toEqual({});
    const f = validateSignup({ name: "", email: "ada@example", password: "short", whatsapp: "123" });
    expect(Object.keys(f).sort()).toEqual(["email", "name", "password", "whatsapp"]);
    expect(f.password).toContain("that's 5");
    expect(validateSignup({ ...ok, whatsapp: "0803 123 4567" })).toEqual({});
    expect(validateSignup({ ...ok, whatsapp: "+234 803 123 4567" })).toEqual({});
  });
  it("checks a new password before checking the two match", () => {
    expect(validateNewPassword("short", "other")).toEqual({ password: expect.any(String) });
    expect(validateNewPassword("longenough", "longenougH")).toEqual({ confirm: expect.any(String) });
    expect(validateNewPassword("longenough", "longenough")).toEqual({});
  });
  it("counts the fields to fix", () => {
    expect(fixFields({ email: "x" })).toBe("Please fix the highlighted field.");
    expect(fixFields({ email: "x", password: "y" })).toBe("Please fix the 2 highlighted fields.");
  });
});

describe("payment outcomes", () => {
  const price = 1_500_000;
  it("grants access only for a full success in naira", () => {
    expect(classifyPayment({ status: "success", amount: price, currency: "NGN" }, price)).toEqual({ kind: "success" });
    expect(classifyPayment({ status: "success", amount: 100, currency: "NGN" }, price)).toEqual({ kind: "mismatch" });
    expect(classifyPayment({ status: "success", amount: price, currency: "USD" }, price)).toEqual({ kind: "mismatch" });
  });
  it("keeps bank transfers and USSD waiting instead of failing them", () => {
    for (const status of ["ongoing", "pending", "processing", "queued", "send_otp"]) expect(classifyPayment({ status, amount: price, currency: "NGN" }, price).kind).toBe("pending");
  });
  it("explains failures in the payer's words", () => {
    expect(classifyPayment({ status: "failed", amount: price, currency: "NGN", gateway_response: "Insufficient Funds" }, price)).toMatchObject({ kind: "failed", reversed: false });
    expect(failureReason("failed", "Insufficient Funds")).toContain("isn't enough money");
    expect(failureReason("failed", "Declined")).toContain("declined");
    expect(failureReason("abandoned", "")).toContain("closed before paying");
    expect(classifyPayment({ status: "reversed", amount: price, currency: "NGN" }, price)).toMatchObject({ kind: "failed", reversed: true });
  });
  it("accepts only reference-shaped strings", () => {
    expect(cleanReference("pst_1a2b3c4d_lx9k2_ab12cd")).toBe("pst_1a2b3c4d_lx9k2_ab12cd");
    for (const bad of ["", "abc", "<script>", "a/../b/c/d", null, 42, "x".repeat(101)]) expect(cleanReference(bad)).toBeNull();
  });
});

describe("request problems", () => {
  it("tells offline, weak connections, expiry, rate limits and server faults apart", () => {
    expect(fetchProblem({ online: false }).kind).toBe("offline");
    expect(fetchProblem({ error: new TypeError("Failed to fetch") }).kind).toBe("network");
    expect(fetchProblem({ error: new TypeError("Load failed") }).kind).toBe("network");
    expect(fetchProblem({ status: 401 }).kind).toBe("session");
    expect(fetchProblem({ status: 429, message: "Slow down." })).toEqual({ kind: "busy", message: "Slow down." });
    expect(fetchProblem({ status: 503 }).kind).toBe("server");
    expect(fetchProblem({ status: 400, message: "Enter a website address." })).toEqual({ kind: "rejected", message: "Enter a website address." });
  });
});
