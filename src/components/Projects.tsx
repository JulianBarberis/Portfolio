"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/data/types";
import ProjectModal from "./ProjectModal";
import { FolderGit2, ExternalLink, Rocket, Clock, Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

export default function Projects() {
  const { language, t, tArr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = portfolioData.projects;
  const categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategory === "All") return true;
    return proj.category === activeCategory;
  });

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 p-1 rounded-full apple-glass max-w-fit mx-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] ${
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const isLive = project.status === "live";

            return (
              <div
                key={project.id}
                className="apple-glass-card rounded-3xl p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#3744bd] dark:text-[#93c5fd] uppercase tracking-wider">
                      {project.category}
                    </span>

                    {isLive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{language === "es" ? "En Producción" : "Live"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f8559f]/10 text-[#f8559f]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{language === "es" ? "Deploy Próximo" : "Deploying"}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#f8559f] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
                      {t(project.tagline)}
                    </p>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/5 dark:bg-white/5 text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub for ${project.title}`}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[#f8559f] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>

                  {isLive && project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-sm shadow-[#f8559f]/20 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-[var(--text-primary)] apple-glass hover:border-[#f8559f]/40 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
                    >
                      <Rocket className="w-3 h-3 text-[#f8559f]" />
                      <span>{language === "es" ? "Detalles" : "Details"}</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
