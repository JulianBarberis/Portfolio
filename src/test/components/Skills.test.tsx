import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "@/components/Skills";
import { LanguageProvider } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { SKILL_CATEGORY_THEMES } from "@/lib/categoryTheme";

function renderSkills(lang: "es" | "en" = "es") {
  localStorage.setItem("portfolio_lang", lang);
  return render(
    <LanguageProvider>
      <Skills />
    </LanguageProvider>
  );
}

describe("Skills Component (src/components/Skills.tsx)", () => {
  it("renders the section header and title", () => {
    renderSkills("es");
    expect(screen.getByRole("heading", { name: "Habilidades Técnicas" })).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
  });

  describe("Category Filter Buttons & Active States", () => {
    it("renders filter buttons for 'Todos' and all skill categories", () => {
      renderSkills("es");

      expect(screen.getByRole("button", { name: /Todos/i })).toBeInTheDocument();

      for (const cat of portfolioData.skillCategories) {
        expect(screen.getByRole("button", { name: new RegExp(cat.title.es, "i") })).toBeInTheDocument();
      }
    });

    it("renders filter buttons with English titles when language is 'en'", () => {
      renderSkills("en");

      expect(screen.getByRole("button", { name: /All/i })).toBeInTheDocument();
      for (const cat of portfolioData.skillCategories) {
        expect(screen.getByRole("button", { name: new RegExp(cat.title.en, "i") })).toBeInTheDocument();
      }
    });

    it("defaults to 'languages' category as active with corresponding active styles", () => {
      renderSkills("es");

      const languagesCat = portfolioData.skillCategories.find((c) => c.id === "languages")!;
      const languagesButton = screen.getByRole("button", { name: new RegExp(languagesCat.title.es, "i") });

      const activeTheme = SKILL_CATEGORY_THEMES.languages;
      expect(languagesButton).toHaveClass(activeTheme.activeClass.split(" ")[0]);
    });
  });

  describe("Category Selection & Skill Filtering", () => {
    it("displays only language skills by default", () => {
      renderSkills("es");

      // Language skills should be visible
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Kotlin")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();

      // Database or DevOps skills should NOT be visible
      expect(screen.queryByText("PostgreSQL")).not.toBeInTheDocument();
      expect(screen.queryByText("Docker")).not.toBeInTheDocument();
    });

    it("switches to 'Bases de Datos' when clicking its button and shows database technologies", async () => {
      const user = userEvent.setup();
      renderSkills("es");

      const dbCat = portfolioData.skillCategories.find((c) => c.id === "databases")!;
      const dbButton = screen.getByRole("button", { name: new RegExp(dbCat.title.es, "i") });

      await user.click(dbButton);

      // Database skills should now be rendered
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
      expect(screen.getByText("MySQL")).toBeInTheDocument();
      expect(screen.getByText("Redis")).toBeInTheDocument();

      // Language-only skills should not be visible anymore
      expect(screen.queryByText("Kotlin")).not.toBeInTheDocument();
      expect(screen.queryByText("Python")).not.toBeInTheDocument();
    });

    it("switches to 'Cloud / DevOps' when clicking its button and shows DevOps technologies", async () => {
      const user = userEvent.setup();
      renderSkills("es");

      const devopsCat = portfolioData.skillCategories.find((c) => c.id === "devops")!;
      const devopsButton = screen.getByRole("button", { name: new RegExp(devopsCat.title.es, "i") });

      await user.click(devopsButton);

      expect(screen.getByText("Docker Compose")).toBeInTheDocument();
      expect(screen.getByText("Git & GitHub")).toBeInTheDocument();
      expect(screen.getByText("GitHub Actions")).toBeInTheDocument();

      expect(screen.queryByText("Kotlin")).not.toBeInTheDocument();
      expect(screen.queryByText("PostgreSQL")).not.toBeInTheDocument();
    });

    it("switches to 'IA & Arquitectura' when clicking its button and shows AI technologies", async () => {
      const user = userEvent.setup();
      renderSkills("es");

      const aiCat = portfolioData.skillCategories.find((c) => c.id === "ai")!;
      const aiButton = screen.getByRole("button", { name: new RegExp(aiCat.title.es, "i") });

      await user.click(aiButton);

      expect(screen.getByText("Gemini AI API")).toBeInTheDocument();
      expect(screen.getByText("Clean Architecture")).toBeInTheDocument();
      expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();

      expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
      expect(screen.queryByText("Docker Compose")).not.toBeInTheDocument();
    });

    it("displays all skills and applies active styling when clicking 'Todos'", async () => {
      const user = userEvent.setup();
      renderSkills("es");

      const allButton = screen.getByRole("button", { name: /Todos/i });
      expect(allButton).not.toHaveClass("bg-white/20");

      await user.click(allButton);

      // Verify active styles on 'Todos'
      expect(allButton).toHaveClass("bg-white/20");
      expect(allButton).toHaveClass("border-white/30");

      // Check skills from various categories are all present
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
      expect(screen.getByText("Docker Compose")).toBeInTheDocument();
      expect(screen.getByText("NestJS")).toBeInTheDocument();
      expect(screen.getByText("Gemini AI API")).toBeInTheDocument();
    });
  });
});
