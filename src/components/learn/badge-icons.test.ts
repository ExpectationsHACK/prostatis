import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
import { milestones } from "@/content/lessons";
import { tracks } from "@/lib/curriculum";
import { badges, emptyState } from "@/lib/learning/engine";
import { badgeIcons } from "./badge-icons";

describe("badge icons", () => {
  it("every badge in every track has its own icon", () => {
    for (const t of tracks) {
      const ids = badges(t, emptyState(), milestones).map((b) => b.id);
      expect(ids.filter((id) => !badgeIcons[id]), `${t.name}: badges without an icon`).toEqual([]);
    }
  });

  it("no icon is used by two badges", () => {
    const icons = Object.values(badgeIcons);
    expect(new Set(icons).size).toBe(icons.length);
  });
});
