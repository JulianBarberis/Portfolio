"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { User, Calendar } from "lucide-react";
import profilePhoto from "../../public/profile.jpg";

export default function About() {
  const { language, t } = useLanguage();
  const educationItems = portfolioData.education;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <User className="w-3 h-3" />
            <span>{language === "es" ? "Sobre mí" : "About Me"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {language === "es" 
              ? "Formación Académica" 
              : "Academic Background"}
          </h2>
        </div>


        {/* Layout: Education on Left (no card background, showing section background), Photo on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Education Rows directly on background */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            {educationItems.map((edu, idx) => (
              <div
                key={edu.id}
                className={`space-y-3 ${idx !== 0 ? "pt-6 border-t border-black/5 dark:border-white/10" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f8559f]/10 text-[#f8559f] border border-[#f8559f]/20">
                      {t(edu.badge || { en: "Degree", es: "Grado" })}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#3744bd] dark:text-[#93c5fd]" />
                      {t(edu.period)}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold apple-glass text-[var(--text-muted)]">
                    {t(edu.status)}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {t(edu.degree)}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#3744bd] dark:text-[#93c5fd] mt-1">
                    {t(edu.institution)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Julian's Profile Image */}
          <div className="md:col-span-5 rounded-3xl overflow-hidden relative group min-h-[340px] sm:min-h-[380px] shadow-2xl">
            <Image
              src={profilePhoto}
              alt="Julian Barberis"
              fill
              priority
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
