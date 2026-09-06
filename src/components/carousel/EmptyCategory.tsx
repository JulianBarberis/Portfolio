"use client";

import React from "react";
import { FolderGit2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EmptyCategoryProps {
  onResetCategory: () => void;
}

export default function EmptyCategory({ onResetCategory }: EmptyCategoryProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4">
      <div className="apple-glass-card rounded-3xl p-8 sm:p-10 text-center space-y-5 border border-white/10 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#f8559f]/10 border border-[#f8559f]/30 flex items-center justify-center mx-auto text-[#f8559f] shadow-[0_0_20px_rgba(248,85,159,0.2)]">
          <FolderGit2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            {language === "es"
              ? "Próximamente más proyectos"
              : "More projects coming soon"}
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            {language === "es"
              ? "Actualmente no hay proyectos en esta categoría. Puedes explorar todos los proyectos destacados o volver a la vista general."
              : "There are currently no projects in this category. You can explore all featured projects or return to the overview."}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onResetCategory}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#f8559f] to-[#3744bd] hover:opacity-90 shadow-md shadow-[#f8559f]/25 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none"
          >
            <span>
              {language === "es"
                ? "Ver Todos los Proyectos"
                : "View All Projects"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
