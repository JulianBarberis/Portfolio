import { describe, it, expect } from "vitest";
import {
  PROJECT_CATEGORY_THEMES,
  SKILL_CATEGORY_THEMES,
  ProjectCategoryTheme,
  SkillCategoryTheme,
} from "@/lib/categoryTheme";
import { ProjectCategory, normalizeCategories } from "@/data/types";
import { portfolioData } from "@/data/portfolioData";

describe("Category Themes (src/lib/categoryTheme.ts)", () => {
  const expectedProjectCategories: ProjectCategory[] = [
    "Full-Stack",
    "AI",
    "Backend",
    "Frontend",
    "Académico",
  ];

  const expectedSkillCategoryKeys = [
    "all",
    "languages",
    "frameworks",
    "databases",
    "devops",
    "ai",
  ];

  describe("PROJECT_CATEGORY_THEMES", () => {
    it("defines themes for all expected project categories", () => {
      for (const category of expectedProjectCategories) {
        expect(PROJECT_CATEGORY_THEMES[category]).toBeDefined();
      }
    });

    it("has all required properties with non-empty styling classes and labels", () => {
      for (const [catName, theme] of Object.entries(PROJECT_CATEGORY_THEMES) as [
        ProjectCategory,
        ProjectCategoryTheme,
      ][]) {
        expect(theme.label, `label missing for ${catName}`).toBeDefined();
        expect(theme.label.en, `label.en missing for ${catName}`).toBeTruthy();
        expect(theme.label.es, `label.es missing for ${catName}`).toBeTruthy();
        expect(theme.pillClass, `pillClass missing for ${catName}`).toBeTruthy();
        expect(theme.modalBadgeClass, `modalBadgeClass missing for ${catName}`).toBeTruthy();
        expect(theme.activeTabClass, `activeTabClass missing for ${catName}`).toBeTruthy();
        expect(theme.dotColor, `dotColor missing for ${catName}`).toBeTruthy();
      }
    });

    it("covers every category used in portfolioData.projects", () => {
      const usedCategories = Array.from(
        new Set(
          portfolioData.projects.flatMap((p) => normalizeCategories(p.category))
        )
      );

      for (const category of usedCategories) {
        expect(PROJECT_CATEGORY_THEMES[category]).toBeDefined();
      }
    });
  });

  describe("SKILL_CATEGORY_THEMES", () => {
    it("defines themes for all expected skill categories", () => {
      for (const key of expectedSkillCategoryKeys) {
        expect(SKILL_CATEGORY_THEMES[key]).toBeDefined();
      }
    });

    it("has all required styling classes without missing keys", () => {
      for (const [key, theme] of Object.entries(SKILL_CATEGORY_THEMES) as [
        string,
        SkillCategoryTheme,
      ][]) {
        expect(theme.activeClass, `activeClass missing for ${key}`).toBeTruthy();
        expect(theme.dotClass, `dotClass missing for ${key}`).toBeTruthy();
        expect(theme.glowClass, `glowClass missing for ${key}`).toBeTruthy();
      }
    });

    it("covers all skill category IDs present in portfolioData.skillCategories plus 'all'", () => {
      const skillIds = portfolioData.skillCategories.map((cat) => cat.id);
      for (const id of skillIds) {
        expect(
          SKILL_CATEGORY_THEMES[id],
          `Missing SKILL_CATEGORY_THEMES entry for skillCategory id: "${id}"`
        ).toBeDefined();
      }
    });
  });
});
