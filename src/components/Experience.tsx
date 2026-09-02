"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, CheckCircle, DraftingCompass } from "lucide-react";

export default function Experience() {
  const { language, t, tArr } = useLanguage();
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#a31621]/10 border border-[#a31621]/30 text-xs font-bold uppercase tracking-wider text-[#a31621] dark:text-[#f87171]">
            <Briefcase className="w-3 h-3" />
            <span>{language === "es" ? "Experiencia" : "Experience"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" ? "Trayectoria Técnica" : "Work History"}
          </h2>
        </div>

        {/* Experience Bento Card */}
        <div className="max-w-3xl mx-auto space-y-4">
          {experiences.map((exp) => {
            const highlights = tArr(exp.highlights);
            return (
              <div
                key={exp.id}
                className="apple-glass-card p-6 rounded-3xl space-y-4 relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/5 dark:border-white/10">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                      {t(exp.role)}
                    </h3>
                    <p className="text-sm font-semibold text-[#f8559f]">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold apple-glass text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#3744bd]" />
                      {t(exp.period)}
                    </span>
                  </div>
                </div>

                {/* Concise Highlights */}
                <div className="space-y-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#f8559f] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 text-[var(--text-muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
