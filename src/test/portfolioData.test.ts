import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { portfolioData } from "@/data/portfolioData";
import { normalizeCategories, ProjectCategory } from "@/data/types";
import { PROJECT_CATEGORY_THEMES } from "@/lib/categoryTheme";
import { isSafeExternalUrl } from "@/lib/utils";

describe("Portfolio Data Integrity (src/data/portfolioData.ts)", () => {
  const allowedCategories: ProjectCategory[] = [
    "Full-Stack",
    "Backend",
    "Frontend",
    "AI",
    "Académico",
  ];

  const expectedProjectTitles = ["StudyQuest", "BookLibre", "SQLify", "AlgoQuePedir"];
  const expectedProjectIds = ["studyquest", "booklibre", "sqlify", "algo-que-pedir"];

  it("contains all 4 expected projects", () => {
    expect(portfolioData.projects.length).toBe(4);
    const titles = portfolioData.projects.map((p) => p.title);
    expect(titles).toEqual(expect.arrayContaining(expectedProjectTitles));
    const ids = portfolioData.projects.map((p) => p.id);
    expect(ids).toEqual(expect.arrayContaining(expectedProjectIds));
  });

  describe.each(portfolioData.projects)("Project Integrity: $title ($id)", (project) => {
    it("has a valid non-empty title, id, and year", () => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.year).toMatch(/^\d{4}$/);
    });

    it("has valid categories recognized by PROJECT_CATEGORY_THEMES", () => {
      const categories = normalizeCategories(project.category);
      expect(categories.length).toBeGreaterThan(0);
      for (const cat of categories) {
        expect(allowedCategories).toContain(cat);
        expect(PROJECT_CATEGORY_THEMES[cat]).toBeDefined();
      }
    });

    it("has non-empty localized tagline and description in both en and es", () => {
      expect(project.tagline.en.trim().length).toBeGreaterThan(10);
      expect(project.tagline.es.trim().length).toBeGreaterThan(10);
      expect(project.description.en.trim().length).toBeGreaterThan(20);
      expect(project.description.es.trim().length).toBeGreaterThan(20);
    });

    it("has non-empty localized architecture highlights in both en and es", () => {
      expect(project.architectureHighlights.en.length).toBeGreaterThan(0);
      expect(project.architectureHighlights.es.length).toBeGreaterThan(0);
      for (const highlight of project.architectureHighlights.en) {
        expect(highlight.trim().length).toBeGreaterThan(5);
      }
      for (const highlight of project.architectureHighlights.es) {
        expect(highlight.trim().length).toBeGreaterThan(5);
      }
    });

    it("has non-empty localized roadmap items in both en and es", () => {
      expect(project.roadmap).toBeDefined();
      expect(project.roadmap?.en.length).toBeGreaterThan(0);
      expect(project.roadmap?.es.length).toBeGreaterThan(0);
      for (const item of project.roadmap?.en ?? []) {
        expect(item.trim().length).toBeGreaterThan(5);
      }
      for (const item of project.roadmap?.es ?? []) {
        expect(item.trim().length).toBeGreaterThan(5);
      }
    });

    it("has a valid status", () => {
      expect(["live", "coming_soon", "in_development"]).toContain(project.status);
    });

    it("has a non-empty technologies list", () => {
      expect(project.technologies.length).toBeGreaterThan(0);
      for (const tech of project.technologies) {
        expect(tech.trim().length).toBeGreaterThan(0);
      }
    });

    it("has a valid GitHub repository or profile URL", () => {
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/[A-Za-z0-9_.-]+/);
    });

    it("has valid projectType when specified", () => {
      if (project.projectType) {
        expect(project.projectType.en.trim().length).toBeGreaterThan(3);
        expect(project.projectType.es.trim().length).toBeGreaterThan(3);
      }
    });

    it("has a boolean featured flag", () => {
      expect(typeof project.featured).toBe("boolean");
    });

    it("has a safe external URL for demoUrl if present", () => {
      if (project.demoUrl) {
        expect(isSafeExternalUrl(project.demoUrl)).toBe(true);
      }
    });

    it("has an on-disk image asset that exists in public/", () => {
      expect(project.image).toBeDefined();
      const relativeImagePath = project.image!.replace(/^\//, "");
      const fullPath = path.resolve(process.cwd(), "public", relativeImagePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  describe("Personal and Navigation Integrity", () => {
    it("has valid personal information with contact email and social profiles", () => {
      expect(portfolioData.personal.name).toBeTruthy();
      expect(portfolioData.personal.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(portfolioData.personal.social.github).toBeTruthy();
      expect(portfolioData.personal.social.linkedin).toBeTruthy();
      expect(isSafeExternalUrl(portfolioData.personal.social.github)).toBe(true);
      expect(isSafeExternalUrl(portfolioData.personal.social.linkedin)).toBe(true);
    });

    it("has valid personal subtitles in en and es", () => {
      expect(portfolioData.personal.subtitles.en.length).toBeGreaterThan(0);
      expect(portfolioData.personal.subtitles.es.length).toBeGreaterThan(0);
      for (const sub of portfolioData.personal.subtitles.en) {
        expect(sub.trim().length).toBeGreaterThan(2);
      }
      for (const sub of portfolioData.personal.subtitles.es) {
        expect(sub.trim().length).toBeGreaterThan(2);
      }
    });

    it("has skill categories with populated skills", () => {
      expect(portfolioData.skillCategories.length).toBeGreaterThan(0);
      for (const cat of portfolioData.skillCategories) {
        expect(cat.id).toBeTruthy();
        expect(cat.skills.length).toBeGreaterThan(0);
        expect(cat.title.en).toBeTruthy();
        expect(cat.title.es).toBeTruthy();
      }
    });

    it("has valid education entries with localized degrees and institutions", () => {
      expect(portfolioData.education.length).toBeGreaterThan(0);
      for (const edu of portfolioData.education) {
        expect(edu.id).toBeTruthy();
        expect(edu.institution.en).toBeTruthy();
        expect(edu.institution.es).toBeTruthy();
        expect(edu.degree.en).toBeTruthy();
        expect(edu.degree.es).toBeTruthy();
        expect(edu.period.en).toBeTruthy();
        expect(edu.status.en).toBeTruthy();
      }
    });

    it("has valid experience entries with roles, periods, and skills", () => {
      expect(portfolioData.experience.length).toBeGreaterThan(0);
      for (const exp of portfolioData.experience) {
        expect(exp.id).toBeTruthy();
        expect(exp.company).toBeTruthy();
        expect(exp.role.en).toBeTruthy();
        expect(exp.role.es).toBeTruthy();
        expect(exp.period.en).toBeTruthy();
        expect(exp.description.en).toBeTruthy();
        expect(exp.description.es).toBeTruthy();
        expect(exp.highlights.en.length).toBeGreaterThan(0);
        expect(exp.skills.length).toBeGreaterThan(0);
      }
    });

    it("has complete localized navigation and contact metadata", () => {
      expect(portfolioData.navigation.projects.en).toBeTruthy();
      expect(portfolioData.navigation.projects.es).toBeTruthy();
      expect(portfolioData.contact.title.en).toBeTruthy();
      expect(portfolioData.contact.title.es).toBeTruthy();
      expect(portfolioData.contact.sendButton.en).toBeTruthy();
      expect(portfolioData.contact.sendButton.es).toBeTruthy();
    });
  });
});
