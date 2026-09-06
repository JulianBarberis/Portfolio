"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/data/types";
import ProjectModal from "./ProjectModal";
import TechIcon from "./TechIcon";
import CoverflowCarousel from "./carousel/CoverflowCarousel";
import CarouselControls from "./carousel/CarouselControls";
import EmptyCategory from "./carousel/EmptyCategory";
import { FolderGit2 } from "lucide-react";

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  if (
    project.id === "booklibre" ||
    project.id === "biblioteca-comunitaria" ||
    project.title.toLowerCase().includes("book")
  ) {
    return (
      <div className="h-28 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative group-hover:border-[#f8559f]/40 transition-colors shadow-inner">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
          <span className="text-[#7F52FF] flex items-center gap-1.5 font-bold">
            <TechIcon name="Kotlin" className="w-3.5 h-3.5" />
            <span>BookLibre.kt</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#f8559f]/15 text-[#f8559f] text-[9px] font-bold">
            DDD CORE
          </span>
        </div>
        <div className="space-y-0.5 font-mono text-[11px]">
          <p className="text-[var(--text-secondary)] truncate">
            <span className="text-[#3744bd] dark:text-[#93c5fd]">val</span> karma = calculateKarma(user)
          </p>
          <p className="text-[var(--text-muted)] text-[10px] truncate">
            @Transactional fun reserveBook(isbn)
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-white/5">
          <span className="text-[#6DB33F] flex items-center gap-1 font-semibold">
            <TechIcon name="Spring Boot" className="w-3 h-3" /> Spring Boot
          </span>
          <span>•</span>
          <span className="text-[#4169E1] flex items-center gap-1 font-semibold">
            <TechIcon name="PostgreSQL" className="w-3 h-3" /> PostgreSQL
          </span>
        </div>
      </div>
    );
  }

  if (project.id === "sqlify") {
    return (
      <div className="h-28 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative group-hover:border-[#06B6D4]/40 transition-colors shadow-inner">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
          <span className="text-[#06B6D4] flex items-center gap-1.5 font-bold">
            <TechIcon name="Gemini AI API" className="w-3.5 h-3.5" />
            <span>prompt_to_sql.ai</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[9px] font-bold">
            NL2SQL
          </span>
        </div>
        <div className="space-y-0.5 font-mono text-[11px]">
          <p className="text-[var(--text-muted)] text-[10px] truncate">
            &gt; &quot;Top 5 clientes con más órdenes&quot;
          </p>
          <p className="text-cyan-300 font-semibold text-[10px] truncate">
            SELECT name, COUNT(*) FROM orders...
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-white/5">
          <span className="text-[#3178C6] flex items-center gap-1 font-semibold">
            <TechIcon name="TypeScript" className="w-3 h-3" /> TypeScript
          </span>
          <span>•</span>
          <span className="text-[#4479A1] flex items-center gap-1 font-semibold">
            <TechIcon name="MySQL" className="w-3 h-3" /> MySQL
          </span>
        </div>
      </div>
    );
  }

  // Default / Vice City Portfolio
  return (
    <div className="h-28 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative group-hover:border-[#f8559f]/40 transition-colors shadow-inner">
      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span className="text-[#f8559f] flex items-center gap-1.5 font-bold">
          <TechIcon name="Next.js" className="w-3.5 h-3.5" />
          <span>vice_city.glass</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9px] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          STATIC
        </span>
      </div>
      <div className="space-y-1 font-mono text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md bg-[#f8559f]/20 text-[#f8559f] text-[9px] font-bold">
            GTA VI Sunset
          </span>
          <span className="px-2 py-0.5 rounded-md apple-glass text-[9px] text-[var(--text-primary)]">
            Apple Glass
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-[10px] truncate">
          0 useEffect • Turbopack Optimized
        </p>
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-white/5">
        <span className="text-[#06B6D4] flex items-center gap-1 font-semibold">
          <TechIcon name="Tailwind CSS" className="w-3 h-3" /> Tailwind
        </span>
        <span className="text-[var(--text-secondary)] font-semibold">
          GitHub Pages CI/CD
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = portfolioData.projects;
  const categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategory === "All") return true;
    return proj.category === activeCategory;
  });

  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(0, filteredProjects.length - 1)
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (selectedProject !== null) return;
    if (filteredProjects.length === 0) return;

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

        {/* Category Pills */}
        <div
          role="tablist"
          aria-label={
            language === "es" ? "Filtrar por categoría" : "Filter by category"
          }
          className="flex flex-wrap items-center justify-center gap-1.5 mb-8 p-1 rounded-full apple-glass max-w-fit mx-auto"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
                  isSelected
                    ? "bg-[#3744bd] text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat === "All" ? (language === "es" ? "Todos" : "All") : cat}
              </button>
            );
          })}
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
          <div className="relative w-full">
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
