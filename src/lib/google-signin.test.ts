import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { googleAuthUrl, hashNonce, newFlow, readFlow, sameState, googleRedirectUri } = await import("./google-signin");

describe("Google sign-in flow", () => {
  it("sends Google the hashed nonce, a fresh state and our own callback", () => {
    const flow = newFlow("/learn", "signup");
    const url = new URL(googleAuthUrl(flow, "client-123.apps.googleusercontent.com", "https://stynark.com/auth/google"));
    expect(url.origin + url.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(url.searchParams.get("redirect_uri")).toBe("https://stynark.com/auth/google");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toBe("openid email profile");
    expect(url.searchParams.get("state")).toBe(flow.state);
    // Supabase hashes the raw nonce (hex SHA-256) and compares it with the token's nonce.
    expect(url.searchParams.get("nonce")).toBe(createHash("sha256").update(flow.nonce).digest("hex"));
    expect(url.searchParams.get("nonce")).not.toBe(flow.nonce);
    expect(url.toString()).not.toContain("secret");
  });

  it("makes a new random state and nonce every time", () => {
    const a = newFlow("/dashboard", "login"), b = newFlow("/dashboard", "login");
    expect(a.state).not.toBe(b.state);
    expect(a.nonce).not.toBe(b.nonce);
    expect(a.state.length).toBeGreaterThanOrEqual(32);
  });

  it("only accepts a matching, non-empty state", () => {
    expect(sameState("abc", "abc")).toBe(true);
    expect(sameState("abc", "abd")).toBe(false);
    expect(sameState("abc", "abcd")).toBe(false);
    expect(sameState("", "")).toBe(false);
  });

  it("reads its cookie back and rejects anything malformed", () => {
    const flow = newFlow("/learn/main", "signup");
    expect(readFlow(JSON.stringify(flow))).toEqual(flow);
    expect(readFlow(undefined)).toBeNull();
    expect(readFlow("not json")).toBeNull();
    expect(readFlow(JSON.stringify({ state: "x" }))).toBeNull();
    expect(readFlow(JSON.stringify({ ...flow, from: "evil" }))?.from).toBe("login");
  });

  it("builds the callback from the site address without a double slash", () => {
    expect(googleRedirectUri("https://stynark.com/")).toBe("https://stynark.com/auth/google");
    expect(hashNonce("a")).toHaveLength(64);
  });
});
