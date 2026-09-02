import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
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
