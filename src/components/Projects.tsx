"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ProjectCategory, ProjectItem, normalizeCategories } from "@/data/types";
import ProjectModal from "./ProjectModal";
import CoverflowCarousel from "./carousel/CoverflowCarousel";
import CarouselControls from "./carousel/CarouselControls";
import { FolderGit2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { PROJECT_CATEGORY_THEMES } from "@/lib/categoryTheme";

function EmptyCategory({ onResetCategory }: { onResetCategory: () => void }) {
  const { language } = useLanguage();
  return (
    <div className="text-center py-16 px-4 rounded-3xl apple-glass border border-white/10 max-w-md mx-auto my-8">
      <FolderGit2 className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3 opacity-60" />
      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
        {language === "es"
          ? "No hay proyectos en esta categoría"
          : "No projects in this category"}
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        {language === "es"
          ? "Pronto añadiremos proyectos a esta sección."
          : "Projects will be added to this section soon."}
      </p>
      <button
        onClick={onResetCategory}
        className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#3744bd] hover:bg-[#4353db] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none"
      >
        {language === "es" ? "Ver todos los proyectos" : "View all projects"}
      </button>
    </div>
  );
}

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  if (project.image) {
    return (
      <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/20">
        <Image
          src={getAssetPath(project.image)}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
          priority={project.featured}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  return (
    <div className="h-36 sm:h-40 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 p-3.5 flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
      <span>{project.title}</span>
    </div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = portfolioData.projects;
  const categories: string[] = [
    "All",
    ...Array.from(
      new Set(
        projects.flatMap((p) => normalizeCategories(p.category))
      )
    ),
  ];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategory === "All") return true;
    const projectCategories = normalizeCategories(proj.category);
    return projectCategories.includes(activeCategory as ProjectCategory);
  });

  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(0, filteredProjects.length - 1)
  );

  const toTabId = (cat: string) =>
    `project-tab-${cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return language === "es" ? "Todos" : "All";
    if (cat === "AI") return language === "es" ? "IA" : "AI";
    if (cat === "Académico") return language === "es" ? "Académico" : "Academic";
    return cat;
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = categories.indexOf(activeCategory);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      e.stopPropagation();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      e.stopPropagation();
      nextIndex = categories.length - 1;
    }

    if (nextIndex !== -1) {
      const nextCategory = categories[nextIndex];
      handleCategoryChange(nextCategory);
      const nextTabId = toTabId(nextCategory);
      requestAnimationFrame(() => {
        document.getElementById(nextTabId)?.focus();
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (selectedProject !== null) return;
    if (filteredProjects.length === 0) return;

    // Do not intercept keyboard events originating inside the category tablist or interactive inputs
    const target = e.target as HTMLElement | null;
    if (
      target?.closest('[role="tablist"]') ||
      target?.closest("button, input, textarea, select, a, [role='button']")
    ) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) =>
        Math.min(filteredProjects.length - 1, prev + 1)
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(filteredProjects.length - 1);
    }
  };

  return (
    <section
      id="projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={
        language === "es" ? "Proyectos Destacados" : "Featured Projects"
      }
      className="py-20 relative outline-none focus-visible:ring-1 focus-visible:ring-[#f8559f]/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f8559f]/10 border border-[#f8559f]/30 text-xs font-bold uppercase tracking-wider text-[#f8559f]">
            <FolderGit2 className="w-3 h-3" />
            <span>{language === "es" ? "Proyectos" : "Projects"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" ? "Proyectos Destacados" : "Featured Projects"}
          </h2>
        </div>

        {/* Category Pills (Matches general Navbar glass & active style) */}
        <div className="flex items-center justify-center mb-8">
          <div
            role="tablist"
            onKeyDown={handleTabKeyDown}
            aria-label={
              language === "es" ? "Filtrar por categoría" : "Filter by category"
            }
            className="inline-flex flex-wrap items-center justify-center gap-1 px-3 py-1.5 rounded-full apple-glass-nav max-w-full"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const theme = PROJECT_CATEGORY_THEMES[cat as ProjectCategory];
              const activeClass =
                cat === "All"
                  ? "text-[#f8559f] font-semibold bg-[#f8559f]/10 shadow-sm border border-[#f8559f]/20"
                  : theme?.activeTabClass ?? "text-[#f8559f] font-semibold bg-[#f8559f]/10 shadow-sm border border-[#f8559f]/20";

              return (
                <button
                  key={cat}
                  id={toTabId(cat)}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  aria-controls="projects-tabpanel"
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
                    isSelected
                      ? `${activeClass}`
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {isSelected && theme && (
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor}`} />
                  )}
                  <span>{getCategoryLabel(cat)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Screen Reader Live Region */}
        {filteredProjects.length > 0 && (
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {language === "es"
              ? `Proyecto ${safeActiveIndex + 1} de ${filteredProjects.length}: ${
                  filteredProjects[safeActiveIndex]?.title
                }`
              : `Project ${safeActiveIndex + 1} of ${filteredProjects.length}: ${
                  filteredProjects[safeActiveIndex]?.title
                }`}
          </div>
        )}

        {/* Carousel Presentation Stage */}
        {filteredProjects.length === 0 ? (
          <EmptyCategory
            onResetCategory={() => handleCategoryChange("All")}
          />
        ) : (
          <div
            id="projects-tabpanel"
            role="tabpanel"
            aria-labelledby={toTabId(activeCategory)}
            className="relative w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="w-full"
              >
                <CoverflowCarousel
                  projects={filteredProjects}
                  activeIndex={safeActiveIndex}
                  onSelectIndex={setActiveIndex}
                  onOpenModal={setSelectedProject}
                  renderVisualHeader={(proj) => (
                    <ProjectVisualHeader project={proj} />
                  )}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation and Pagination Controls */}
            <CarouselControls
              total={filteredProjects.length}
              activeIndex={safeActiveIndex}
              onPrev={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              onNext={() =>
                setActiveIndex((prev) =>
                  Math.min(filteredProjects.length - 1, prev + 1)
                )
              }
              onSelectIndex={setActiveIndex}
              projects={filteredProjects}
            />
          </div>
        )}
      </div>

      {/* ProjectModal rendered outside 3D perspective stage */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
