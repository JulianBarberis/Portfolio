import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd && process.env.GITHUB_ACTIONS ? repoName : "");

/**
 * HTTP Security Headers.
 * Applied only when the app runs behind a Node server (Vercel, Railway, local `next start`).
 * For the static GitHub Pages export these headers are expressed as meta tags in layout.tsx.
 */
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    // CSP note: 'unsafe-inline' for scripts/styles is required by
    // Next.js hydration and Tailwind CSS v4 / Framer Motion.
    // In development mode, 'unsafe-eval' is required by React for callstack reconstruction & Turbopack.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${!isProd ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      `connect-src 'self' https://formsubmit.co https://formspree.io${!isProd ? " ws: wss: http://localhost:* ws://localhost:*" : ""}`,
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formsubmit.co https://formspree.io",
      "frame-ancestors 'none'",
      ...(isProd ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || "",
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  // headers() is a no-op for `output: "export"` but is preserved here
  // so security headers are automatically applied if the deployment
  // strategy switches to a Node server (Vercel, Railway, etc.).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
