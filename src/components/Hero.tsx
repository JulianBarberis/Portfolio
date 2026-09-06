"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ArrowRight, Mail, Sparkles, MapPin, Cpu, Terminal, Layers, CheckCircle2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

export default function Hero() {
  const { language, t, tArr } = useLanguage();
  const { personal } = portfolioData;
  const subtitles = tArr(personal.subtitles);

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Apple / GTA 6 Ambient Backdrop Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-[#3744bd]/25 via-[#f8559f]/20 to-[#a31621]/15 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Minimalist Typography & Actions */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-xs font-semibold text-[var(--text-primary)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f8559f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f8559f]"></span>
              </span>
              <span>{t(personal.statusBadge)}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Julian Barberis
              </h1>
              
              <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)]">
                {t(personal.title)}
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t(personal.shortBio)}
            </p>

            {/* Location & Academic Meta Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-[var(--text-secondary)]">
              <span className="px-3 py-1 rounded-full apple-glass flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#f8559f]" />
                <span>Buenos Aires</span>
              </span>
              <span className="px-3 py-1 rounded-full apple-glass flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#3744bd] dark:text-[#8d9cf8]" />
                <span>UNSAM Student</span>
              </span>
            </div>

            {/* Apple-style Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-lg shadow-[#f8559f]/25 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:ring-offset-2"
              >
                <span>{language === "es" ? "Ver Proyectos" : "View Projects"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[var(--text-primary)] apple-glass hover:border-[#f8559f]/50 hover:bg-[#f8559f]/10 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:ring-offset-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#f8559f]" />
                <span>{language === "es" ? "Contacto" : "Contact"}</span>
              </a>

              <div className="flex items-center gap-1.5 pl-1">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-full apple-glass hover:text-[#f8559f] transition-colors text-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[#f8559f]"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-full apple-glass hover:text-[#3744bd] transition-colors text-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[#f8559f]"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Architecture & Engineering Focus Panel */}
          <div className="lg:col-span-5">
            <div className="apple-glass rounded-3xl p-5 sm:p-6 space-y-4 relative overflow-hidden shadow-2xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f8559f]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3744bd]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dbcdc6]/80" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                  <Terminal className="w-3 h-3 text-[#f8559f]" />
                  <span>{language === "es" ? "arquitectura.config.ts" : "architecture.config.ts"}</span>
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                  {language === "es" ? "ENFOQUE" : "ACTIVE"}
                </span>
              </div>

              {/* Architecture & Engineering Focus Items */}
              <div className="space-y-2.5">
                
                {/* Paradigm 1: Clean Architecture & DDD */}
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[#f8559f]/30 transition-all space-y-1 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#f8559f] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Clean Architecture & DDD
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Backend</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {language === "es"
                      ? "Dominio desacoplado y microservicios modulares en Kotlin & Java Spring Boot."
                      : "Decoupled domain models & modular microservices in Kotlin & Spring Boot."}
                  </p>
                </div>

                {/* Paradigm 2: Spec-Driven Development */}
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[#06B6D4]/30 transition-all space-y-1 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Spec-Driven Development
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Methodology</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {language === "es"
                      ? "Diseño estructurado por contratos, especificaciones rigurosas y prompts deterministas."
                      : "Contract-first specs, rigorous requirements & deterministic engineering."}
                  </p>
                </div>

                {/* Paradigm 3: Cloud & Modern Web */}
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[#3744bd]/30 transition-all space-y-1 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#3744bd] dark:text-[#93c5fd] uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Cloud, Docker & Fullstack
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Infra / UI</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {language === "es"
                      ? "Contenerización con Docker Compose, PostgreSQL y frontends reactivos en Next.js."
                      : "Docker Compose environments, PostgreSQL databases & reactive Next.js frontends."}
                  </p>
                </div>

              </div>

              {/* Footer Academic Note */}
              <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f8559f]"></span>
                  <span>UNSAM • {language === "es" ? "Tecnicatura en Programación" : "CS Associate Degree"}</span>
                </span>
                <span className="text-[#f8559f] font-mono font-semibold">2023–2026</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
