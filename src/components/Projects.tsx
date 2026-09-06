"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/data/types";
import ProjectModal from "./ProjectModal";
import TechIcon from "./TechIcon";
import { FolderGit2, ExternalLink, Rocket, Clock, Sparkles, Terminal, Database, Layout } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  if (project.id === "booklibre" || project.id === "biblioteca-comunitaria" || project.title.toLowerCase().includes("book")) {
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
            &gt; "Top 5 clientes con más órdenes"
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
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
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
        <span className="text-[var(--text-secondary)] font-semibold">GitHub Pages CI/CD</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = portfolioData.projects;
  const categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategory === "All") return true;
    return proj.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 relative">
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
                className="apple-glass-card rounded-3xl p-5 flex flex-col justify-between space-y-4 group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-3.5">
                  {/* Visual Architecture Banner Anchor */}
                  <ProjectVisualHeader project={project} />

                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 pt-1">
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
