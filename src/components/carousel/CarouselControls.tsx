"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectItem } from "@/data/types";
import { useLanguage } from "@/context/LanguageContext";

interface CarouselControlsProps {
  total: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  projects: ProjectItem[];
}

export default function CarouselControls({
  total,
  activeIndex,
  onPrev,
  onNext,
  onSelectIndex,
  projects,
}: CarouselControlsProps) {
  const { language } = useLanguage();

  if (total <= 1) {
    return null;
  }

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === total - 1;

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2 max-w-2xl mx-auto select-none"
      role="navigation"
      aria-label={language === "es" ? "Controles de navegación del carrusel" : "Carousel navigation controls"}
    >
      {/* Slide Counter */}
      <div className="order-2 sm:order-1 flex items-center gap-2">
        <span
          className="font-mono text-xs font-semibold text-[var(--text-muted)] bg-black/20 dark:bg-white/5 border border-white/10 px-3 py-1 rounded-full shadow-inner tracking-wider"
          aria-live="polite"
        >
          {formatNumber(activeIndex + 1)}{" "}
          <span className="text-white/30">/</span> {formatNumber(total)}
        </span>
      </div>

      {/* Pagination Dots */}
      <div
        role="tablist"
        aria-label={language === "es" ? "Paginación de proyectos" : "Projects pagination"}
        className="order-1 sm:order-2 flex items-center gap-1.5 p-1.5 rounded-full apple-glass border border-white/10 shadow-inner"
      >
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={project.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${
                language === "es" ? "Ir al proyecto" : "Go to project"
              } ${idx + 1}: ${project.title}`}
              onClick={() => onSelectIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
                isActive
                  ? "w-8 bg-gradient-to-r from-[#f8559f] to-[#3744bd] shadow-[0_0_10px_rgba(248,85,159,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/40 active:scale-90"
              }`}
            />
          );
        })}
      </div>

      {/* Prev / Next Circular Apple Glass Arrow Buttons */}
      <div className="order-3 flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isPrevDisabled}
          aria-label={language === "es" ? "Proyecto anterior" : "Previous project"}
          className={`w-10 h-10 rounded-full apple-glass border border-white/10 flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
            isPrevDisabled
              ? "opacity-25 pointer-events-none cursor-not-allowed"
              : "hover:border-[#f8559f]/40 hover:bg-white/10 active:scale-95 hover:text-[#f8559f]"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label={language === "es" ? "Siguiente proyecto" : "Next project"}
          className={`w-10 h-10 rounded-full apple-glass border border-white/10 flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
            isNextDisabled
              ? "opacity-25 pointer-events-none cursor-not-allowed"
              : "hover:border-[#f8559f]/40 hover:bg-white/10 active:scale-95 hover:text-[#f8559f]"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
