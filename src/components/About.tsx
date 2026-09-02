"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { User, CheckCircle2, Award, Sparkles, Layers, ShieldCheck } from "lucide-react";

export default function About() {
  const { language, t, tArr } = useLanguage();
  const { personal } = portfolioData;

  const fullBioParagraphs = tArr(personal.fullBio);

  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f8559f]/10 border border-[#f8559f]/30 text-xs font-bold uppercase tracking-wider text-[#f8559f]">
            <User className="w-3 h-3" />
            <span>{language === "es" ? "Sobre mí" : "About Me"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" 
              ? "Formación académica y rigor de ingeniería." 
              : "Computer Science Foundations & Practical Engineering."}
          </h2>
        </div>

        {/* Apple-style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Bio Card */}
          <div className="md:col-span-7 apple-glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f8559f]">Profile</span>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {fullBioParagraphs[0]}
              </p>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {fullBioParagraphs[1]}
              </p>
            </div>

            {/* Quick Skills Pill Bar */}
            <div className="pt-3 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 text-[var(--text-primary)] border border-white/5">
                Clean Architecture & DDD
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 text-[var(--text-primary)] border border-white/5">
                Docker Containers
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 text-[var(--text-primary)] border border-white/5">
                LLM Engineering
              </span>
            </div>
          </div>

          {/* Metrics Bento Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {personal.stats.map((stat, i) => (
              <div 
                key={i} 
                className="apple-glass-card p-4 rounded-2xl flex flex-col justify-between space-y-2"
              >
                <div className="text-2xl sm:text-3xl font-black text-gta-sunset">
                  {stat.value}
                  {stat.suffix && <span className="text-lg text-[#3744bd] ml-0.5">{stat.suffix}</span>}
                </div>
                <p className="text-xs font-semibold text-[var(--text-muted)] leading-tight">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
