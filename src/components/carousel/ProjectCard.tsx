"use client";

import React from "react";
import { ProjectItem, normalizeCategories } from "@/data/types";
import { useLanguage } from "@/context/LanguageContext";
import TechIcon from "@/components/TechIcon";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { ExternalLink, Rocket, Clock, GraduationCap } from "lucide-react";
import { sanitizeExternalUrl, isSafeExternalUrl } from "@/lib/utils";
import { PROJECT_CATEGORY_THEMES } from "@/lib/categoryTheme";

interface ProjectCardProps {
  project: ProjectItem;
  isActive: boolean;
  onOpenModal: () => void;
  visualHeader: React.ReactNode;
  isCoverflowSide?: boolean;
}

export default function ProjectCard({
  project,
  isActive,
  onOpenModal,
  visualHeader,
  isCoverflowSide = false,
}: ProjectCardProps) {
  const { language, t } = useLanguage();
  const isLive = project.status === "live";
  const categories = Array.from(
    new Set(normalizeCategories(project.category))
  );

  return (
    <div
      className={`apple-glass-card rounded-3xl p-5 flex flex-col justify-between space-y-4 group transition-all duration-300 w-full ${
        isActive
          ? "border-[#f8559f]/50 shadow-[0_20px_45px_-10px_rgba(248,85,159,0.25)] ring-1 ring-[#f8559f]/20"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="space-y-3.5">
        {/* Preserved Visual Code Header */}
        {visualHeader}

        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const theme = PROJECT_CATEGORY_THEMES[cat];
              const isAcademic = cat === "Académico";
              const label = theme ? theme.label[language] : cat;
              const pillClass = theme
                ? theme.pillClass
                : "text-[#3744bd] dark:text-[#93c5fd] bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-400/30";

              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-colors ${pillClass}`}
                >
                  {isAcademic && <GraduationCap className="w-2.5 h-2.5" />}
                  <span>{label}</span>
                </span>
              );
            })}
          </div>

          <div className="shrink-0">
            {project.status === "live" ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{language === "es" ? "En Producción" : "Live"}</span>
              </span>
            ) : project.status === "in_development" ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{language === "es" ? "En Desarrollo" : "In Dev"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f8559f]/10 text-[#f8559f]">
                <Clock className="w-2.5 h-2.5" />
                <span>{language === "es" ? "Deploy Próximo" : "Deploying"}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#f8559f] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
            {t(project.tagline)}
          </p>
        </div>

        {/* Tech Chips with Authentic Brand Icons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <TechIcon name={tech} className="w-3 h-3 shrink-0" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div
        className={`pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 ${
          isCoverflowSide ? "pointer-events-none opacity-80" : ""
        }`}
      >
        <a
          href={sanitizeExternalUrl(project.githubUrl)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub for ${project.title}`}
          tabIndex={isCoverflowSide ? -1 : 0}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[#f8559f] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none"
        >
          <GitHubIcon className="w-4 h-4" />
        </a>

        <div className="flex items-center gap-2">
          {/* Always accessible Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            tabIndex={isCoverflowSide ? -1 : 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[var(--text-primary)] apple-glass hover:border-[#f8559f]/40 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none"
          >
            <Rocket className="w-3 h-3 text-[#f8559f]" />
            <span>{language === "es" ? "Detalles" : "Details"}</span>
          </button>

          {/* External Live Demo Link when available */}
          {isLive && project.demoUrl && isSafeExternalUrl(project.demoUrl) && (
            <a
              href={sanitizeExternalUrl(project.demoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              tabIndex={isCoverflowSide ? -1 : 0}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#f8559f] to-[#ff68ad] hover:opacity-90 border border-white/15 shadow-sm shadow-[#f8559f]/25 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none"
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
