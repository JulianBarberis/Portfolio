"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/data/types";
import ProjectModal from "./ProjectModal";
import CoverflowCarousel from "./carousel/CoverflowCarousel";
import CarouselControls from "./carousel/CarouselControls";
import EmptyCategory from "./carousel/EmptyCategory";
import { FolderGit2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  if (project.image) {
    return (
      <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 group-hover:border-[#f8559f]/50 transition-all duration-300 shadow-md bg-black/40">
        <Image
          src={getAssetPath(project.image)}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          priority={project.featured}
        />
        {/* Subtle gradient overlay to enhance visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
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
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

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
