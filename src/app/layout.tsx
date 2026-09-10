import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Julian Barberis | Software Developer & Full-Stack Engineer",
  description:
    "Portfolio of Julian Barberis — Computer Programming student at UNSAM, specializing in Kotlin (Spring Boot), React, TypeScript, Node.js, NestJS, Docker, and Clean Architecture.",
  keywords: [
    "Julian Barberis",
    "Software Developer",
    "Full Stack Developer",
    "Kotlin",
    "Spring Boot",
    "React",
    "TypeScript",
    "NestJS",
    "UNSAM",
    "Portfolio",
  ],
  authors: [{ name: "Julian Barberis" }],
  openGraph: {
    title: "Julian Barberis | Software Developer",
    description:
      "Software Developer & Full-Stack Engineer specializing in Kotlin, Spring Boot, React, TypeScript, and Clean Architecture.",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: [
      { url: `${basePath}/icon.png`, type: "image/png" },
      { url: `${basePath}/favicon.ico`, sizes: "any" },
    ],
    apple: [{ url: `${basePath}/icon.png` }],
  },
};

const isDev = process.env.NODE_ENV === "development";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self'${isDev ? " ws: wss: http://localhost:* ws://localhost:*" : ""}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/*
          Security headers via meta tags.
          This project is a Next.js static export deployed on GitHub Pages,
          so HTTP response headers cannot be set at the server level.
          Meta-based headers provide best-effort CSP and anti-clickjacking protection.

          CSP notes:
          - 'unsafe-inline' for scripts is required by Next.js hydration chunks.
          - 'unsafe-eval' is enabled only in development for React callstack debugging / HMR.
          - 'unsafe-inline' for styles is required by Tailwind CSS v4 (runtime injection)
            and Framer Motion (dynamic style attributes).
          - All other directives are kept strict ('none' / 'self').
        */}
        <meta httpEquiv="Content-Security-Policy" content={cspDirectives} />
        {/* Prevent MIME-type sniffing */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        {/* Control referrer information sent to external origins */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Anti-clickjacking protection */}
        <meta httpEquiv="X-Frame-Options" content="DENY" />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
