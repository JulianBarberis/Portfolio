import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "@/components/carousel/ProjectCard";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProjectItem, ProjectCategory } from "@/data/types";
import { PROJECT_CATEGORY_THEMES } from "@/lib/categoryTheme";

const mockLiveProject: ProjectItem = {
  id: "mock-live",
  title: "Mock Live Project",
  tagline: {
    en: "An awesome live project tagline",
    es: "Un lema genial de proyecto en vivo",
  },
  description: {
    en: "Full description of the live project",
    es: "Descripción completa del proyecto en vivo",
  },
  year: "2026",
  featured: true,
  status: "live",
  demoUrl: "https://demo.example.com",
  githubUrl: "https://github.com/JulianBarberis/mock-live",
  technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  architectureHighlights: {
    en: ["Architecture point 1"],
    es: ["Punto de arquitectura 1"],
  },
  roadmap: {
    en: ["Roadmap item 1"],
    es: ["Item de roadmap 1"],
  },
  category: ["Full-Stack", "AI", "Académico"],
};

const mockInDevProject: ProjectItem = {
  ...mockLiveProject,
  id: "mock-indev",
  title: "Mock In Dev Project",
  status: "in_development",
  demoUrl: undefined,
  category: ["Backend"],
};

const mockComingSoonProject: ProjectItem = {
  ...mockLiveProject,
  id: "mock-coming-soon",
  title: "Mock Coming Soon Project",
  status: "coming_soon",
  demoUrl: undefined,
  category: ["Frontend"],
};

function renderCard(
  project: ProjectItem,
  options: {
    isActive?: boolean;
    isCoverflowSide?: boolean;
    onOpenModal?: () => void;
    lang?: "es" | "en";
  } = {}
) {
  const {
    isActive = true,
    isCoverflowSide = false,
    onOpenModal = vi.fn(),
    lang = "es",
  } = options;

  localStorage.setItem("portfolio_lang", lang);

  return {
    onOpenModal,
    ...render(
      <LanguageProvider>
        <ProjectCard
          project={project}
          isActive={isActive}
          onOpenModal={onOpenModal}
          visualHeader={<div data-testid="visual-header">Header</div>}
          isCoverflowSide={isCoverflowSide}
        />
      </LanguageProvider>
    ),
  };
}

describe("ProjectCard Component (src/components/carousel/ProjectCard.tsx)", () => {
  it("renders visual header, title, tagline, and technologies", () => {
    renderCard(mockLiveProject, { lang: "es" });

    expect(screen.getByTestId("visual-header")).toBeInTheDocument();
    expect(screen.getByText("Mock Live Project")).toBeInTheDocument();
    expect(
      screen.getByText("Un lema genial de proyecto en vivo")
    ).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  describe("Category Pill Badges", () => {
    it("renders category badges with specific classes from PROJECT_CATEGORY_THEMES", () => {
      renderCard(mockLiveProject, { lang: "es" });

      // In Spanish: "Full-Stack", "IA", "Académico"
      const fullStackBadge = screen.getByText("Full-Stack");
      const aiBadge = screen.getByText("IA");
      const academicBadge = screen.getByText("Académico");

      expect(fullStackBadge).toBeInTheDocument();
      expect(aiBadge).toBeInTheDocument();
      expect(academicBadge).toBeInTheDocument();

      // Check classes on outer badge container
      const fullStackTheme = PROJECT_CATEGORY_THEMES["Full-Stack"];
      expect(fullStackBadge.parentElement).toHaveClass(
        fullStackTheme.pillClass.split(" ")[0]
      );

      const aiTheme = PROJECT_CATEGORY_THEMES["AI"];
      expect(aiBadge.parentElement).toHaveClass(aiTheme.pillClass.split(" ")[0]);
    });

    it("renders English category labels when language is 'en'", () => {
      renderCard(mockLiveProject, { lang: "en" });

      expect(screen.getByText("AI")).toBeInTheDocument();
      expect(screen.getByText("Academic")).toBeInTheDocument();
    });

    it("falls back to default pill class and category name for unthemed categories", () => {
      const unthemedProject: ProjectItem = {
        ...mockLiveProject,
        category: ["CustomCategory" as unknown as ProjectCategory],
      };
      renderCard(unthemedProject);

      const customBadge = screen.getByText("CustomCategory");
      expect(customBadge).toBeInTheDocument();
      expect(customBadge.parentElement).toHaveClass("text-[#3744bd]");
    });
  });

  describe("Active vs Inactive Card Styling", () => {
    it("renders active styling when isActive is true", () => {
      const { container } = renderCard(mockLiveProject, { isActive: true });
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-[#f8559f]/50");
    });

    it("renders inactive styling when isActive is false", () => {
      const { container } = renderCard(mockLiveProject, { isActive: false });
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-white/10");
      expect(card).not.toHaveClass("border-[#f8559f]/50");
    });
  });

  describe("Status Indicators", () => {
    it("renders 'En Producción' indicator for live projects", () => {
      renderCard(mockLiveProject, { lang: "es" });
      expect(screen.getByText("En Producción")).toBeInTheDocument();
    });

    it("renders 'Live' indicator for live projects in English", () => {
      renderCard(mockLiveProject, { lang: "en" });
      expect(screen.getByText("Live")).toBeInTheDocument();
    });

    it("renders 'En Desarrollo' indicator for in_development projects", () => {
      renderCard(mockInDevProject, { lang: "es" });
      expect(screen.getByText("En Desarrollo")).toBeInTheDocument();
    });

    it("renders 'In Dev' indicator for in_development projects in English", () => {
      renderCard(mockInDevProject, { lang: "en" });
      expect(screen.getByText("In Dev")).toBeInTheDocument();
    });

    it("renders 'Deploy Próximo' indicator for coming_soon projects", () => {
      renderCard(mockComingSoonProject, { lang: "es" });
      expect(screen.getByText("Deploy Próximo")).toBeInTheDocument();
    });

    it("renders 'Deploying' indicator for coming_soon projects in English", () => {
      renderCard(mockComingSoonProject, { lang: "en" });
      expect(screen.getByText("Deploying")).toBeInTheDocument();
    });
  });

  describe("External Action Links and Modal Trigger", () => {
    it("renders GitHub link with correct sanitized URL and attributes", () => {
      renderCard(mockLiveProject);

      const githubLink = screen.getByLabelText("GitHub for Mock Live Project");
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/JulianBarberis/mock-live"
      );
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders Demo link when demoUrl is safe and status is live", () => {
      renderCard(mockLiveProject);

      const demoLink = screen.getByLabelText("Live demo for Mock Live Project");
      expect(demoLink).toBeInTheDocument();
      expect(demoLink).toHaveAttribute("href", "https://demo.example.com");
      expect(demoLink).toHaveAttribute("target", "_blank");
    });

    it("does not render Demo link when demoUrl is undefined or status is not live", () => {
      renderCard(mockInDevProject);
      expect(
        screen.queryByLabelText(/Live demo for/i)
      ).not.toBeInTheDocument();
    });

    it("does not render Demo link when live project has an unsafe javascript: URL", () => {
      const unsafeLiveProject: ProjectItem = {
        ...mockLiveProject,
        demoUrl: "javascript:alert('xss')",
      };
      renderCard(unsafeLiveProject);
      expect(
        screen.queryByLabelText(/Live demo for/i)
      ).not.toBeInTheDocument();
    });

    it("does not render Demo link when non-live project has a valid demoUrl", () => {
      const devProjectWithDemo: ProjectItem = {
        ...mockInDevProject,
        demoUrl: "https://demo.example.com",
      };
      renderCard(devProjectWithDemo);
      expect(
        screen.queryByLabelText(/Live demo for/i)
      ).not.toBeInTheDocument();
    });

    it("renders 'Details' button label in English", () => {
      renderCard(mockLiveProject, { lang: "en" });
      expect(screen.getByRole("button", { name: "Details" })).toBeInTheDocument();
    });

    it("triggers onOpenModal callback when clicking the Details button", async () => {
      const user = userEvent.setup();
      const onOpenModal = vi.fn();

      renderCard(mockLiveProject, { onOpenModal, lang: "es" });

      const detailsButton = screen.getByRole("button", { name: /Detalles/i });
      await user.click(detailsButton);

      expect(onOpenModal).toHaveBeenCalledTimes(1);
    });

    it("disables keyboard navigation on actions when isCoverflowSide is true", () => {
      renderCard(mockLiveProject, { isCoverflowSide: true });

      const githubLink = screen.getByLabelText("GitHub for Mock Live Project");
      const detailsButton = screen.getByRole("button", { name: /Detalles/i });
      const demoLink = screen.getByLabelText("Live demo for Mock Live Project");

      expect(githubLink).toHaveAttribute("tabIndex", "-1");
      expect(detailsButton).toHaveAttribute("tabIndex", "-1");
      expect(demoLink).toHaveAttribute("tabIndex", "-1");
    });
  });
});
