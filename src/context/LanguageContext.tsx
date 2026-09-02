"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { Language, LocalizedString, LocalizedArray } from "@/data/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (val: LocalizedString) => string;
  tArr: (val: LocalizedArray) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const langListeners = new Set<() => void>();

function subscribeLanguage(callback: () => void) {
  langListeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
  }
  return () => {
    langListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback);
    }
  };
}

function getLanguageSnapshot(): Language {
  try {
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    if (saved === "en" || saved === "es") return saved;
    return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  } catch {
    return "es";
  }
}

function getLanguageServerSnapshot(): Language {
  return "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeLanguage, getLanguageSnapshot, getLanguageServerSnapshot);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem("portfolio_lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
      langListeners.forEach((l) => l());
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "es" : "en";
    setLanguage(nextLang);
  };

  const t = (val: LocalizedString): string => {
    if (!val) return "";
    return val[language] || val.en || "";
  };

  const tArr = (val: LocalizedArray): string[] => {
    if (!val) return [];
    return val[language] || val.en || [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
