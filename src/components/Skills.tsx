"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import TechIcon from "./TechIcon";
import { Sparkles } from "lucide-react";

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
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f8559f]/10 border border-[#f8559f]/30 text-xs font-bold uppercase tracking-wider text-[#f8559f]">
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

        {/* Category Pill Switcher (Minimalist Segmented Nav) */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 p-1.5 rounded-full apple-glass border border-white/10 shadow-lg max-w-full">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                selectedCategory === "all"
                  ? "bg-white/15 dark:bg-white/15 border border-white/20 text-white font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
              }`}
            >
              {language === "es" ? "Todos" : "All"}
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
                    isSelected
                      ? "bg-white/15 dark:bg-white/15 border border-white/20 text-white font-semibold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
                  }`}
                >
                  {t(cat.title)}
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
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#f8559f]/40 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-default select-none animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Colored Tech SVG Logo */}
              <div className="shrink-0 flex items-center justify-center">
                <TechIcon name={skill.name} className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              </div>

              {/* Tech Name */}
              <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)] dark:text-zinc-200 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
