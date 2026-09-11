import { describe, it, expect } from "vitest";
import { normalizeCategories, ProjectCategory } from "@/data/types";

describe("Types & Category Normalization (src/data/types.ts)", () => {
  describe("normalizeCategories", () => {
    it("handles null, undefined, and empty string gracefully", () => {
      expect(normalizeCategories(null)).toEqual([]);
      expect(normalizeCategories(undefined)).toEqual([]);
      expect(normalizeCategories("")).toEqual([]);
      expect(normalizeCategories("   ")).toEqual([]);
    });

    it("normalizes a single category string", () => {
      expect(normalizeCategories("Full-Stack")).toEqual(["Full-Stack"]);
      expect(normalizeCategories("AI")).toEqual(["AI"]);
      expect(normalizeCategories("Académico")).toEqual(["Académico"]);
    });

    it("trims untrimmed whitespace from single strings", () => {
      expect(normalizeCategories("  Backend  ")).toEqual(["Backend"]);
      expect(normalizeCategories("\tAI\n")).toEqual(["AI"]);
    });

    it("normalizes an array of valid categories", () => {
      expect(normalizeCategories(["Full-Stack", "AI", "Académico"])).toEqual([
        "Full-Stack",
        "AI",
        "Académico",
      ]);
    });

    it("removes duplicate categories", () => {
      expect(
        normalizeCategories(["Full-Stack", "Full-Stack", "AI", "AI", "Backend"])
      ).toEqual(["Full-Stack", "AI", "Backend"]);
    });

    it("deduplicates strings that differ only by whitespace", () => {
      expect(
        normalizeCategories([" Full-Stack ", "Full-Stack", "Full-Stack   "])
      ).toEqual(["Full-Stack"]);
    });

    it("preserves insertion order of first occurrence when deduplicating", () => {
      expect(
        normalizeCategories(["AI", "Backend", "AI", "Full-Stack", "Backend"])
      ).toEqual(["AI", "Backend", "Full-Stack"]);
    });

    it("filters out empty strings, whitespace-only strings, null, and undefined in arrays", () => {
      const mixed = [
        "Full-Stack",
        "",
        "   ",
        null as unknown as string,
        undefined as unknown as string,
        "AI",
        "\t\n",
      ];
      expect(normalizeCategories(mixed)).toEqual(["Full-Stack", "AI"]);
    });

    it("filters out non-string elements defensively", () => {
      const invalidItems = [
        123 as unknown as string,
        true as unknown as string,
        { category: "Backend" } as unknown as string,
        "Backend",
        [] as unknown as string,
      ];
      expect(normalizeCategories(invalidItems)).toEqual(["Backend"]);
    });

    it("handles empty arrays and sparse arrays", () => {
      expect(normalizeCategories([])).toEqual([]);
      // Sparse array
      const sparse = new Array(4) as unknown as ProjectCategory[];
      expect(normalizeCategories(sparse)).toEqual([]);
    });

    it("defensively handles non-array objects, numbers, and booleans passed directly", () => {
      expect(normalizeCategories({} as unknown as string)).toEqual([]);
      expect(normalizeCategories({ category: "AI" } as unknown as string)).toEqual([]);
      expect(normalizeCategories(12345 as unknown as string)).toEqual([]);
      expect(normalizeCategories(true as unknown as string)).toEqual([]);
    });
  });
});
