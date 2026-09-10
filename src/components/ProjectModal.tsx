"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/data/types";
import { X, ExternalLink, Layers, CheckCircle2, Rocket, Clock } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language, t, tArr } = useLanguage();

  if (!project) return null;

  const highlights = tArr(project.architectureHighlights);
  const roadmap = project.roadmap ? tArr(project.roadmap) : [];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-200" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl apple-glass rounded-3xl p-6 sm:p-7 space-y-5 max-h-[88vh] overflow-y-auto animate-in zoom-in-95 duration-200 z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f8559f]/10 text-[#f8559f]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {project.year}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#3744bd] dark:text-[#93c5fd]">
              {t(project.tagline)}
            </p>
          </div>

          <button
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Screenshot Banner */}
        {project.image && (
          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Overview */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {t(project.description)}
        </p>

        {/* Architecture Highlights */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#f8559f]" />
            <span>{language === "es" ? "Arquitectura" : "Architecture Highlights"}</span>
          </span>
          <div className="space-y-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5">
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

        {/* Deployment Roadmap */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-[#3744bd] dark:text-[#93c5fd]" />
            <span>{language === "es" ? "Estado de Despliegue" : "Deployment Status"}</span>
          </span>
          
          <div className="p-3 rounded-2xl bg-[#f8559f]/5 border border-[#f8559f]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f8559f]">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {project.status === "live"
                  ? (language === "es" ? "En producción" : "Deployed in production")
                  : project.status === "in_development"
                  ? (language === "es" ? "Activamente en desarrollo" : "Actively in development")
                  : (language === "es" ? "En preparación para deploy cloud" : "Preparing cloud deploy")}
              </span>
            </div>

            {roadmap.length > 0 && (
              <ul className="space-y-1 text-xs text-[var(--text-secondary)] pl-5 list-disc">
                {roadmap.map((step, sIdx) => (
                  <li key={sIdx}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 text-[var(--text-primary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-[var(--text-primary)] apple-glass hover:border-[#f8559f]/40 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-md shadow-[#f8559f]/25 focus-visible:ring-2 focus-visible:ring-[#f8559f]"
            >
              <span>{language === "es" ? "Ir a la Demo" : "Open Demo"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[var(--text-muted)] apple-glass hover:text-[var(--text-primary)] transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
            >
              {language === "es" ? "Cerrar" : "Close"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
