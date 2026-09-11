import { ProjectCategory } from "@/data/types";

export interface ProjectCategoryTheme {
  label: { en: string; es: string };
  pillClass: string;
  modalBadgeClass: string;
  activeTabClass: string;
  dotColor: string;
}

export const PROJECT_CATEGORY_THEMES: Record<ProjectCategory, ProjectCategoryTheme> = {
  "Full-Stack": {
    label: { en: "Full-Stack", es: "Full-Stack" },
    pillClass:
      "text-sky-600 dark:text-sky-300 bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20 dark:border-sky-400/30",
    modalBadgeClass:
      "bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30",
    activeTabClass:
      "bg-sky-600 text-white shadow-[0_0_15px_-3px_rgba(2,132,199,0.5)] border-sky-400/30",
    dotColor: "bg-sky-400",
  },
  AI: {
    label: { en: "AI", es: "IA" },
    pillClass:
      "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-400/30",
    modalBadgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30",
    activeTabClass:
      "bg-emerald-600 text-white shadow-[0_0_15px_-3px_rgba(5,150,105,0.5)] border-emerald-400/30",
    dotColor: "bg-emerald-400",
  },
  Backend: {
    label: { en: "Backend", es: "Backend" },
    pillClass:
      "text-amber-600 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-400/30",
    modalBadgeClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30",
    activeTabClass:
      "bg-amber-600 text-white shadow-[0_0_15px_-3px_rgba(217,119,6,0.5)] border-amber-400/30",
    dotColor: "bg-amber-400",
  },
  Frontend: {
    label: { en: "Frontend", es: "Frontend" },
    pillClass:
      "text-rose-600 dark:text-rose-300 bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 dark:border-rose-400/30",
    modalBadgeClass:
      "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30",
    activeTabClass:
      "bg-rose-600 text-white shadow-[0_0_15px_-3px_rgba(225,29,72,0.5)] border-rose-400/30",
    dotColor: "bg-rose-400",
  },
  Académico: {
    label: { en: "Academic", es: "Académico" },
    pillClass:
      "text-purple-600 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 dark:border-purple-400/30",
    modalBadgeClass:
      "bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30",
    activeTabClass:
      "bg-purple-600 text-white shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)] border-purple-400/30",
    dotColor: "bg-purple-400",
  },
};

export interface SkillCategoryTheme {
  activeClass: string;
  dotClass: string;
  glowClass: string;
}

export const SKILL_CATEGORY_THEMES: Record<string, SkillCategoryTheme> = {
  all: {
    activeClass:
      "bg-white/20 dark:bg-white/20 text-white border-white/30 shadow-sm",
    dotClass: "bg-zinc-300",
    glowClass: "shadow-[0_0_12px_rgba(255,255,255,0.15)]",
  },
  languages: {
    activeClass:
      "bg-violet-600 text-white border-violet-400/40 shadow-[0_0_16px_rgba(139,92,246,0.35)]",
    dotClass: "bg-violet-400",
    glowClass: "shadow-[0_0_16px_rgba(139,92,246,0.35)]",
  },
  frameworks: {
    activeClass:
      "bg-sky-600 text-white border-sky-400/40 shadow-[0_0_16px_rgba(14,165,233,0.35)]",
    dotClass: "bg-sky-400",
    glowClass: "shadow-[0_0_16px_rgba(14,165,233,0.35)]",
  },
  databases: {
    activeClass:
      "bg-amber-600 text-white border-amber-400/40 shadow-[0_0_16px_rgba(217,119,6,0.35)]",
    dotClass: "bg-amber-400",
    glowClass: "shadow-[0_0_16px_rgba(217,119,6,0.35)]",
  },
  devops: {
    activeClass:
      "bg-teal-600 text-white border-teal-400/40 shadow-[0_0_16px_rgba(20,184,166,0.35)]",
    dotClass: "bg-teal-400",
    glowClass: "shadow-[0_0_16px_rgba(20,184,166,0.35)]",
  },
  ai: {
    activeClass:
      "bg-emerald-600 text-white border-emerald-400/40 shadow-[0_0_16px_rgba(16,185,129,0.35)]",
    dotClass: "bg-emerald-400",
    glowClass: "shadow-[0_0_16px_rgba(16,185,129,0.35)]",
  },
};
