import { describe, it, expect, afterEach } from "vitest";
import { cn, isSafeExternalUrl, sanitizeExternalUrl, getAssetPath } from "@/lib/utils";

describe("Utility Functions (src/lib/utils.ts)", () => {
  describe("cn (classnames merger)", () => {
    it("merges class names correctly", () => {
      expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    });

    it("resolves Tailwind conflicts correctly", () => {
      expect(cn("px-2", "px-4")).toBe("px-4");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles conditional and falsy values", () => {
      expect(cn("base", false && "hidden", null, undefined, "extra")).toBe("base extra");
    });
  });

  describe("isSafeExternalUrl", () => {
    it("accepts valid https and http URLs", () => {
      expect(isSafeExternalUrl("https://github.com/JulianBarberis")).toBe(true);
      expect(isSafeExternalUrl("http://example.com/path?query=1")).toBe(true);
      expect(isSafeExternalUrl("  https://example.com  ")).toBe(true);
    });

    it("rejects dangerous JavaScript and data URIs", () => {
      expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
      expect(isSafeExternalUrl("JAVASCRIPT:void(0)")).toBe(false);
      expect(isSafeExternalUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
    });

    it("rejects other non-http/https protocols", () => {
      expect(isSafeExternalUrl("ftp://ftp.example.com")).toBe(false);
      expect(isSafeExternalUrl("mailto:user@example.com")).toBe(false);
      expect(isSafeExternalUrl("tel:+1234567890")).toBe(false);
      expect(isSafeExternalUrl("file:///etc/passwd")).toBe(false);
      expect(isSafeExternalUrl("vbscript:msgbox(1)")).toBe(false);
    });

    it("rejects incomplete or malformed URLs", () => {
      expect(isSafeExternalUrl("https:")).toBe(false);
      expect(isSafeExternalUrl("http://")).toBe(false);
      expect(isSafeExternalUrl("ht tp://example.com")).toBe(false);
    });

    it("accepts localhost URLs with port", () => {
      expect(isSafeExternalUrl("http://localhost:3000")).toBe(true);
      expect(isSafeExternalUrl("https://localhost:8080/api")).toBe(true);
    });

    it("rejects relative paths and protocol-relative URLs", () => {
      expect(isSafeExternalUrl("/projects/studyquest")).toBe(false);
      expect(isSafeExternalUrl("relative/path")).toBe(false);
      expect(isSafeExternalUrl("#hash-only")).toBe(false);
      expect(isSafeExternalUrl("//cdn.example.com/script.js")).toBe(false);
    });

    it("rejects control characters and unencoded whitespace in trimmed URL", () => {
      expect(isSafeExternalUrl("https://example.com\x00/admin")).toBe(false);
      expect(isSafeExternalUrl("https://example.com\x1F/path")).toBe(false);
      expect(isSafeExternalUrl("https://example .com")).toBe(false);
      expect(isSafeExternalUrl("https://example.com/foo bar")).toBe(false);
    });

    it("defensively handles null, undefined, empty, and non-string inputs", () => {
      expect(isSafeExternalUrl("")).toBe(false);
      expect(isSafeExternalUrl("   ")).toBe(false);
      expect(isSafeExternalUrl(null)).toBe(false);
      expect(isSafeExternalUrl(undefined)).toBe(false);
      expect(isSafeExternalUrl(12345 as unknown as string)).toBe(false);
      expect(isSafeExternalUrl({} as unknown as string)).toBe(false);
    });
  });

  describe("sanitizeExternalUrl", () => {
    it("returns trimmed URL for safe external links", () => {
      expect(sanitizeExternalUrl("https://github.com")).toBe("https://github.com");
      expect(sanitizeExternalUrl("  https://github.com  ")).toBe("https://github.com");
    });

    it("returns '#' by default for invalid or unsafe URLs", () => {
      expect(sanitizeExternalUrl("javascript:alert(1)")).toBe("#");
      expect(sanitizeExternalUrl("/local/path")).toBe("#");
      expect(sanitizeExternalUrl("")).toBe("#");
      expect(sanitizeExternalUrl(null)).toBe("#");
      expect(sanitizeExternalUrl(undefined)).toBe("#");
    });

    it("returns custom fallback when specified", () => {
      expect(sanitizeExternalUrl("javascript:void(0)", "/fallback")).toBe("/fallback");
      expect(sanitizeExternalUrl(null, "https://default.com")).toBe("https://default.com");
    });
  });

  describe("getAssetPath", () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;

    afterEach(() => {
      process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
    });

    it("returns empty string for empty, null, or undefined inputs", () => {
      expect(getAssetPath("")).toBe("");
      expect(getAssetPath(null)).toBe("");
      expect(getAssetPath(undefined)).toBe("");
    });

    it("returns external and data URLs untouched", () => {
      expect(getAssetPath("https://cdn.example.com/image.png")).toBe("https://cdn.example.com/image.png");
      expect(getAssetPath("http://cdn.example.com/image.png")).toBe("http://cdn.example.com/image.png");
      expect(getAssetPath("data:image/png;base64,iVBORw0KGgoAAAANSUhEUg")).toBe("data:image/png;base64,iVBORw0KGgoAAAANSUhEUg");
    });

    it("resolves paths without basePath when NEXT_PUBLIC_BASE_PATH is not set or empty", () => {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
      expect(getAssetPath("/projects/studyquest.png")).toBe("/projects/studyquest.png");
      expect(getAssetPath("projects/studyquest.png")).toBe("/projects/studyquest.png");

      process.env.NEXT_PUBLIC_BASE_PATH = "";
      expect(getAssetPath("/projects/studyquest.png")).toBe("/projects/studyquest.png");
    });

    it("resolves paths with NEXT_PUBLIC_BASE_PATH prefix", () => {
      process.env.NEXT_PUBLIC_BASE_PATH = "/Portfolio";
      expect(getAssetPath("/projects/studyquest.png")).toBe("/Portfolio/projects/studyquest.png");
      expect(getAssetPath("projects/studyquest.png")).toBe("/Portfolio/projects/studyquest.png");
      expect(getAssetPath("/favicon.ico")).toBe("/Portfolio/favicon.ico");
    });

    it("normalizes NEXT_PUBLIC_BASE_PATH having trailing slashes to prevent double slashes", () => {
      process.env.NEXT_PUBLIC_BASE_PATH = "/Portfolio/";
      expect(getAssetPath("/projects/studyquest.png")).toBe("/Portfolio/projects/studyquest.png");
      expect(getAssetPath("projects/studyquest.png")).toBe("/Portfolio/projects/studyquest.png");

      process.env.NEXT_PUBLIC_BASE_PATH = "/Portfolio///";
      expect(getAssetPath("/projects/studyquest.png")).toBe("/Portfolio/projects/studyquest.png");

      process.env.NEXT_PUBLIC_BASE_PATH = "/";
      expect(getAssetPath("/projects/studyquest.png")).toBe("/projects/studyquest.png");
    });
  });
});
