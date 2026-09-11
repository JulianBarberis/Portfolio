import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectModal from "@/components/ProjectModal";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProjectItem, ProjectCategory } from "@/data/types";

const baseProject: ProjectItem = {
  id: "test-modal-project",
  title: "Test Modal Project",
  tagline: {
    en: "Test Modal Tagline English",
    es: "Test Modal Tagline Español",
  },
  description: {
    en: "Test Modal Description English with sufficient length for overview.",
    es: "Test Modal Description Español con longitud suficiente para overview.",
  },
  year: "2026",
  featured: true,
  status: "live",
  demoUrl: "https://modal.example.com",
  githubUrl: "https://github.com/JulianBarberis/test-modal",
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  architectureHighlights: {
    en: ["Architecture highlight 1", "Architecture highlight 2"],
    es: ["Punto de arquitectura 1", "Punto de arquitectura 2"],
  },
  roadmap: {
    en: ["Roadmap step 1", "Roadmap step 2"],
    es: ["Paso de roadmap 1", "Paso de roadmap 2"],
  },
  category: ["Full-Stack", "Académico"],
  image: "/projects/studyquest.png",
  projectType: {
    en: "Academic Capstone Project",
    es: "Proyecto de Grado Académico",
  },
};

function renderModal(
  project: ProjectItem | null,
  options: { onClose?: () => void; lang?: "es" | "en" } = {}
) {
  const { onClose = vi.fn(), lang = "es" } = options;
  localStorage.setItem("portfolio_lang", lang);

  return {
    onClose,
    ...render(
      <LanguageProvider>
        <ProjectModal project={project} onClose={onClose} />
      </LanguageProvider>
    ),
  };
}

describe("ProjectModal Component (src/components/ProjectModal.tsx)", () => {
  it("returns null and renders nothing when project is null", () => {
    const { container } = renderModal(null);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  describe("Content Rendering & Localization", () => {
    it("renders project details in Spanish", () => {
      renderModal(baseProject, { lang: "es" });

      const dialog = screen.getByRole("dialog", { name: "Test Modal Project" });
      expect(dialog).toBeInTheDocument();

      expect(screen.getByText("Test Modal Project")).toBeInTheDocument();
      expect(screen.getByText("2026")).toBeInTheDocument();
      expect(screen.getByText("Test Modal Tagline Español")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Test Modal Description Español con longitud suficiente para overview."
        )
      ).toBeInTheDocument();

      expect(screen.getByText("Proyecto de Grado Académico")).toBeInTheDocument();
      expect(screen.getByText("Punto de arquitectura 1")).toBeInTheDocument();
      expect(screen.getByText("Paso de roadmap 1")).toBeInTheDocument();
      expect(screen.getByText("En producción")).toBeInTheDocument();

      // Categories
      expect(screen.getByText("Full-Stack")).toBeInTheDocument();
      expect(screen.getByText("Académico")).toBeInTheDocument();

      // Action links
      const githubLink = screen.getByRole("link", { name: /GitHub/i });
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/JulianBarberis/test-modal"
      );

      const demoLink = screen.getByRole("link", { name: /Ir a la Demo/i });
      expect(demoLink).toHaveAttribute("href", "https://modal.example.com");
    });

    it("renders project details in English", () => {
      renderModal(baseProject, { lang: "en" });

      expect(screen.getByText("Test Modal Tagline English")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Test Modal Description English with sufficient length for overview."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Academic Capstone Project")).toBeInTheDocument();
      expect(screen.getByText("Architecture Highlights")).toBeInTheDocument();
      expect(screen.getByText("Architecture highlight 1")).toBeInTheDocument();
      expect(screen.getByText("Deployment Status")).toBeInTheDocument();
      expect(screen.getByText("Deployed in production")).toBeInTheDocument();
      expect(screen.getByText("Academic")).toBeInTheDocument();

      const demoLink = screen.getByRole("link", { name: /Open Demo/i });
      expect(demoLink).toBeInTheDocument();
    });
  });

  describe("Status Indicator Variations", () => {
    it("renders 'coming_soon' status correctly in Spanish and English", () => {
      const comingSoonProj: ProjectItem = {
        ...baseProject,
        status: "coming_soon",
      };

      const { unmount } = renderModal(comingSoonProj, { lang: "es" });
      expect(
        screen.getByText("En preparación para deploy cloud")
      ).toBeInTheDocument();

      unmount();
      renderModal(comingSoonProj, { lang: "en" });
      expect(screen.getByText("Preparing cloud deploy")).toBeInTheDocument();
    });

    it("renders 'in_development' status correctly in Spanish and English", () => {
      const inDevProj: ProjectItem = {
        ...baseProject,
        status: "in_development",
      };

      const { unmount } = renderModal(inDevProj, { lang: "es" });
      expect(screen.getByText("Activamente en desarrollo")).toBeInTheDocument();

      unmount();
      renderModal(inDevProj, { lang: "en" });
      expect(screen.getByText("Actively in development")).toBeInTheDocument();
    });
  });

  describe("Optional Properties & Edge Cases", () => {
    it("renders fallback styling for unthemed categories", () => {
      const unthemedProj: ProjectItem = {
        ...baseProject,
        category: ["UnthemedCategory" as unknown as ProjectCategory],
      };

      renderModal(unthemedProj);
      const badge = screen.getByText("UnthemedCategory");
      expect(badge).toBeInTheDocument();
      expect(badge.parentElement).toHaveClass("text-[#f8559f]");
    });

    it("omits screenshot banner when project has no image", () => {
      const noImageProj: ProjectItem = {
        ...baseProject,
        image: undefined,
      };

      renderModal(noImageProj);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("omits projectType when projectType is undefined", () => {
      const noTypeProj: ProjectItem = {
        ...baseProject,
        projectType: undefined,
      };

      renderModal(noTypeProj);
      expect(
        screen.queryByText("Proyecto de Grado Académico")
      ).not.toBeInTheDocument();
    });

    it("omits roadmap section list when roadmap is undefined or empty", () => {
      const noRoadmapProj: ProjectItem = {
        ...baseProject,
        roadmap: undefined,
      };

      renderModal(noRoadmapProj);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("falls back to close button when demoUrl is unsafe", () => {
      const unsafeDemoProj: ProjectItem = {
        ...baseProject,
        demoUrl: "javascript:alert(1)",
      };

      renderModal(unsafeDemoProj, { lang: "es" });
      expect(screen.queryByRole("link", { name: /Demo/i })).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
    });
  });

  describe("Dismissal & Interaction Handlers", () => {
    it("calls onClose when clicking top X close button", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderModal(baseProject, { onClose });

      const closeButton = screen.getByRole("button", { name: "Close" });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when clicking the modal backdrop", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderModal(baseProject, { onClose });

      const dialog = screen.getByRole("dialog");
      const backdrop = dialog.querySelector(".bg-black\\/60")!;
      await user.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when pressing Escape key on dialog", () => {
      const onClose = vi.fn();
      renderModal(baseProject, { onClose });

      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Escape" });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when pressing other keys (e.g. Tab, Enter)", () => {
      const onClose = vi.fn();
      renderModal(baseProject, { onClose });

      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Enter" });
      fireEvent.keyDown(dialog, { key: "Tab" });

      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
