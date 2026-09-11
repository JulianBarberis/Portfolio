"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import TechIcon from "./TechIcon";
import { Sparkles } from "lucide-react";
import { SKILL_CATEGORY_THEMES } from "@/lib/categoryTheme";

export default function Skills() {
  const { language, t } = useLanguage();
  const categories = portfolioData.skillCategories;
  
  // Default to first category (Languages) matching Achyut Katiyar's layout
  const [selectedCategory, setSelectedCategory] = useState<string>("languages");

  const allSkills = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.skills.map((skill) => ({
        ...skill,
        categoryTitle: t(cat.title),
      }))
    );
  }, [categories, t]);

  const displayedSkills = useMemo(() => {
    if (selectedCategory === "all") {
      return allSkills;
    }
    return allSkills.filter((item) => item.category === selectedCategory);
  }, [allSkills, selectedCategory]);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Achyut Katiyar Typography & Hierarchy) */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            <Sparkles className="w-3 h-3" />
            <span>{language === "es" ? "Habilidades" : "Skills"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" ? "Habilidades Técnicas" : "Technical Skills"}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            {language === "es" 
              ? "Mis tecnologías y herramientas de desarrollo" 
              : "My expertise across various technologies and tools"}
          </p>
        </div>

        {/* Category Pill Switcher (Matches general Navbar glass & active style) */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 px-3 py-1.5 rounded-full apple-glass-nav max-w-full">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                selectedCategory === "all"
                  ? `${SKILL_CATEGORY_THEMES.all.activeClass}`
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span>{language === "es" ? "Todos" : "All"}</span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const theme = SKILL_CATEGORY_THEMES[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                    isSelected
                      ? `${theme?.activeClass ?? "text-[#f8559f] font-semibold bg-[#f8559f]/10 shadow-sm border border-[#f8559f]/20"}`
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {isSelected && theme && (
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass}`} />
                  )}
                  <span>{t(cat.title)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Badges directly on background */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto py-2 min-h-[120px]">
          {displayedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-default select-none animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Colored Tech SVG Logo */}
              <div className="shrink-0 flex items-center justify-center">
                <TechIcon name={skill.name} className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              </div>

              {/* Tech Name */}
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
