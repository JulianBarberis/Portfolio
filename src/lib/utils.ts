import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates whether an external URL uses a safe web protocol (http/https).
 * Rejects javascript:, data:, and other injection protocols.
 */
export function isSafeExternalUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  // Reject control characters and unencoded whitespace
  if (/[\x00-\x1F\x7F\s]/.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Returns the URL if safe, or a fallback "#" if invalid or unsafe.
 */
export function sanitizeExternalUrl(
  url?: string | null,
  fallback: string = "#"
): string {
  return isSafeExternalUrl(url) ? (url as string).trim() : fallback;
}

/**
 * Resolves static asset paths against basePath (e.g. /Portfolio for GitHub Pages)
 */
export function getAssetPath(path?: string | null): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

