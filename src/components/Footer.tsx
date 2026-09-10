"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-black/5 dark:border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--text-primary)]">
            Julian Barberis
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f8559f]/10 text-[#f8559f] font-mono font-medium border border-[#f8559f]/20">
            Fullstack Developer
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[#f8559f] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#3744bd] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="p-1.5 rounded-full apple-glass hover:text-[#f8559f] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
