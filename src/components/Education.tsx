"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";

export default function Education() {
  const { language, t, tArr } = useLanguage();
  const educationItems = portfolioData.education;

  return (
    <section id="education" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#3744bd]/10 border border-[#3744bd]/30 text-xs font-bold uppercase tracking-wider text-[#3744bd] dark:text-[#8d9cf8]">
            <GraduationCap className="w-3 h-3" />
            <span>{language === "es" ? "Educación" : "Education"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" ? "Formación Académica" : "Academic Background"}
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationItems.map((edu) => {
            const highlights = edu.highlights ? tArr(edu.highlights) : [];
            return (
              <div
                key={edu.id}
                className="apple-glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f8559f]/10 text-[#f8559f]">
                      {t(edu.badge || { en: "Degree", es: "Grado" })}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#3744bd]" />
                      {t(edu.period)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      {t(edu.degree)}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#3744bd] dark:text-[#93c5fd]">
                      {t(edu.institution)}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f8559f] shrink-0 mt-0.5" />
                        <span className="text-xs text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/10 text-xs font-semibold text-[var(--text-muted)]">
                  <span>{t(edu.status)}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
