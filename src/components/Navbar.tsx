"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { portfolioData } from "@/data/portfolioData";
import { Sun, Moon, Menu, X, FileText } from "lucide-react";
import profilePhoto from "../../public/profile.jpg";
import { getAssetPath } from "@/lib/utils";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const nav = portfolioData.navigation;

  const navLinks = [
    { id: "about", label: t(nav.about) },
    { id: "skills", label: t(nav.skills) },
    // { id: "experience", label: t(nav.experience) },
    { id: "projects", label: t(nav.projects) },
    { id: "contact", label: t(nav.contact) },
  ];

  const cvUrl = getAssetPath(
    language === "es" ? "/cv/Julian_Barberis_CV.pdf" : "/cv/Julian_Barberis_Resume.pdf"
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between apple-glass-nav px-4 sm:px-6 py-2.5 rounded-full">
        
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#f8559f] rounded-full"
        >
          <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-black/20 dark:group-hover:border-white/30 overflow-hidden relative">
            <Image
              src={profilePhoto}
              alt="Julian Barberis"
              width={32}
              height={32}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <span>
            Julian Barberis
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveSection(link.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                  isActive
                    ? "text-[#f8559f] font-semibold bg-[#f8559f]/10 shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: CV, Language & Theme & Mobile */}
        <div className="flex items-center gap-2">
          {/* CV Download Button (Desktop) */}
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-sm shadow-[#f8559f]/25 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:ring-offset-2"
            aria-label={language === "es" ? "Ver CV en español" : "View Resume in English"}
          >
            <FileText className="w-3 h-3" aria-hidden="true" />
            <span>{t(nav.cvButton)}</span>
          </a>
          {/* Apple Segmented Language Switcher */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-0.5 border border-white/10" role="radiogroup" aria-label={language === "es" ? "Idioma" : "Language"}>
            <button
              onClick={() => setLanguage("es")}
              role="radio"
              aria-checked={language === "es"}
              className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                language === "es"
                  ? "bg-[#3744bd] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              role="radio"
              aria-checked={language === "en"}
              className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                language === "en"
                  ? "bg-[#3744bd] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
            suppressHydrationWarning
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[#f8559f] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            {!mounted ? (
              <span className="inline-block w-3.5 h-3.5" />
            ) : theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-[#f8559f]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#3744bd]" />
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#f8559f]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 apple-glass-nav rounded-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                    isActive
                      ? "text-[#f8559f] bg-[#f8559f]/10 font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* CV Download Button (Mobile) */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 mt-1 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-sm shadow-[#f8559f]/25 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f8559f]"
              aria-label={language === "es" ? "Ver CV en español" : "View Resume in English"}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t(nav.cvButton)}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
