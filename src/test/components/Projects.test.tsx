import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "@/components/Projects";
import { LanguageProvider } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";

function renderProjects(lang: "es" | "en" = "es") {
  localStorage.setItem("portfolio_lang", lang);
  return render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>
  );
}

describe("Projects Component (src/components/Projects.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Category Tabs Rendering", () => {
    it("renders all category tabs in Spanish by default", () => {
      renderProjects("es");

      const tabs = screen.getAllByRole("tab");
      const tabTexts = tabs.map((tab) => tab.textContent?.trim());

      // Should include All (Todos), Full-Stack, AI (IA), Backend, Académico
      expect(tabTexts).toContain("Todos");
      expect(tabTexts).toContain("Full-Stack");
      expect(tabTexts).toContain("IA");
      expect(tabTexts).toContain("Backend");
      expect(tabTexts).toContain("Académico");
    });

    it("renders category tabs in English when language is 'en'", () => {
      renderProjects("en");

      const tabs = screen.getAllByRole("tab");
      const tabTexts = tabs.map((tab) => tab.textContent?.trim());

      expect(tabTexts).toContain("All");
      expect(tabTexts).toContain("Full-Stack");
      expect(tabTexts).toContain("AI");
      expect(tabTexts).toContain("Backend");
      expect(tabTexts).toContain("Academic");
    });

    it("applies active navbar styling (pink text and translucent pink background) to selected tab", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const allTab = screen.getByRole("tab", { name: /Todos/i });
      expect(allTab).toHaveClass("text-[#f8559f]");
      expect(allTab).toHaveClass("bg-[#f8559f]/10");

      const aiTab = screen.getByRole("tab", { name: /IA/i });
      expect(aiTab).not.toHaveClass("text-[#f8559f]");

      await user.click(aiTab);

      expect(aiTab).toHaveClass("text-[#f8559f]");
      expect(aiTab).toHaveClass("bg-[#f8559f]/10");
      expect(allTab).not.toHaveClass("text-[#f8559f]");
    });
  });

  describe("Category Filtering", () => {
    it("renders all 4 projects initially when 'Todos' is selected", () => {
      renderProjects("es");

      expect(screen.getByRole("heading", { name: "StudyQuest" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "BookLibre" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "SQLify" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "AlgoQuePedir" })).toBeInTheDocument();
    });

    it("filters to only AI projects (StudyQuest & SQLify) when clicking 'IA'", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const aiTab = screen.getByRole("tab", { name: /IA/i });
      await user.click(aiTab);

      // AI projects should be visible
      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "StudyQuest" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "SQLify" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "BookLibre" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "AlgoQuePedir" })).not.toBeInTheDocument();
      });
    });

    it("filters to only Backend projects (AlgoQuePedir) when clicking 'Backend'", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const backendTab = screen.getByRole("tab", { name: /Backend/i });
      await user.click(backendTab);

      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "AlgoQuePedir" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "StudyQuest" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "BookLibre" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "SQLify" })).not.toBeInTheDocument();
      });
    });

    it("resets back to all projects when clicking 'Todos'", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      // First click Backend
      await user.click(screen.getByRole("tab", { name: /Backend/i }));
      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "StudyQuest" })).not.toBeInTheDocument();
      });

      // Then click Todos
      await user.click(screen.getByRole("tab", { name: /Todos/i }));
      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "StudyQuest" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "BookLibre" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "SQLify" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "AlgoQuePedir" })).toBeInTheDocument();
      });
    });
  });

  describe("WAI-ARIA Tab Navigation and Keyboard Accessibility", () => {
    it("has proper role='tablist' and aria attributes", () => {
      renderProjects("es");

      const tablist = screen.getByRole("tablist", { name: /Filtrar por categoría/i });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole("tab");
      const activeTab = tabs.find((t) => t.getAttribute("aria-selected") === "true");
      expect(activeTab).toBeDefined();
      expect(activeTab).toHaveAttribute("tabIndex", "0");

      const inactiveTabs = tabs.filter((t) => t.getAttribute("aria-selected") === "false");
      expect(inactiveTabs.length).toBeGreaterThan(0);
      for (const tab of inactiveTabs) {
        expect(tab).toHaveAttribute("tabIndex", "-1");
      }
    });

    it("navigates tabs using keyboard arrows (ArrowRight and ArrowLeft)", () => {
      renderProjects("es");

      const tablist = screen.getByRole("tablist", { name: /Filtrar por categoría/i });
      const tabs = screen.getAllByRole("tab");

      // Initial active tab should be the first one ("Todos" / "All")
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");

      // Press ArrowRight on tablist
      fireEvent.keyDown(tablist, { key: "ArrowRight" });
      const updatedTabs = screen.getAllByRole("tab");
      expect(updatedTabs[1]).toHaveAttribute("aria-selected", "true");
      expect(updatedTabs[0]).toHaveAttribute("aria-selected", "false");

      // Press ArrowLeft to return to first tab
      fireEvent.keyDown(tablist, { key: "ArrowLeft" });
      const returnedTabs = screen.getAllByRole("tab");
      expect(returnedTabs[0]).toHaveAttribute("aria-selected", "true");
    });

    it("navigates to first tab on 'Home' and last tab on 'End'", () => {
      renderProjects("es");

      const tablist = screen.getByRole("tablist", { name: /Filtrar por categoría/i });

      // Press End to jump to last tab
      fireEvent.keyDown(tablist, { key: "End" });
      const afterEndTabs = screen.getAllByRole("tab");
      expect(afterEndTabs[afterEndTabs.length - 1]).toHaveAttribute("aria-selected", "true");

      // Press Home to jump to first tab
      fireEvent.keyDown(tablist, { key: "Home" });
      const afterHomeTabs = screen.getAllByRole("tab");
      expect(afterHomeTabs[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("ProjectModal Opening and Closing", () => {
    it("opens ProjectModal when clicking 'Detalles' on active project card and closes on close button", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      // Dialog should not be open initially
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      // Find the "Detalles" button on the active card (first project: StudyQuest)
      const detailsButtons = screen.getAllByRole("button", { name: /Detalles/i });
      // Click the first one
      await user.click(detailsButtons[0]);

      // Modal dialog should now be visible
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-label", "StudyQuest");

      // Verify architecture highlights and description are rendered inside modal
      expect(screen.getByText("Arquitectura")).toBeInTheDocument();

      // Close the dialog using close button
      const closeButton = screen.getByRole("button", { name: /Close/i });
      await user.click(closeButton);

      // Modal dialog should be dismissed
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes ProjectModal when pressing 'Escape' key", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const detailsButtons = screen.getAllByRole("button", { name: /Detalles/i });
      await user.click(detailsButtons[0]);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Press Escape inside dialog
      fireEvent.keyDown(dialog, { key: "Escape" });

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes ProjectModal when clicking the modal backdrop", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const detailsButtons = screen.getAllByRole("button", { name: /Detalles/i });
      await user.click(detailsButtons[0]);

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // The backdrop is the first child with fixed inset-0 bg-black/60
      const dialog = screen.getByRole("dialog");
      const backdrop = dialog.querySelector(".bg-black\\/60")!;
      expect(backdrop).toBeInTheDocument();

      await user.click(backdrop);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes ProjectModal using the bottom 'Cerrar' button when project has no demoUrl", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      // Filter by Backend (AlgoQuePedir has no demoUrl)
      const backendTab = screen.getByRole("tab", { name: /Backend/i });
      await user.click(backendTab);

      const detailsButtons = screen.getAllByRole("button", { name: /Detalles/i });
      await user.click(detailsButtons[0]);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Find bottom "Cerrar" button (since demoUrl is undefined)
      const bottomCloseButton = screen.getByRole("button", { name: "Cerrar" });
      await user.click(bottomCloseButton);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens ProjectModal in English with localized content and demo link", async () => {
      const user = userEvent.setup();
      renderProjects("en");

      const detailsButtons = screen.getAllByRole("button", { name: /Details/i });
      await user.click(detailsButtons[0]);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-label", "StudyQuest");

      // Verify localized English headers
      expect(screen.getByText("Architecture Highlights")).toBeInTheDocument();
      expect(screen.getByText("Deployment Status")).toBeInTheDocument();
      expect(screen.getByText("Deployed in production")).toBeInTheDocument();

      // Verify Demo link
      const demoLink = screen.getByRole("link", { name: /Open Demo/i });
      expect(demoLink).toBeInTheDocument();
      expect(demoLink).toHaveAttribute("href", "https://lorengrz.github.io/StudyQuest/");
      expect(demoLink).toHaveAttribute("target", "_blank");

      // Close modal using top X close button
      const closeButtons = screen.getAllByRole("button", { name: /Close/i });
      await user.click(closeButtons[0]);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes ProjectModal using bottom 'Close' button in English when project has no demoUrl", async () => {
      const user = userEvent.setup();
      renderProjects("en");

      const backendTab = screen.getByRole("tab", { name: /Backend/i });
      await user.click(backendTab);

      const detailsButtons = screen.getAllByRole("button", { name: /Details/i });
      await user.click(detailsButtons[0]);

      // In English without demoUrl, there are two Close buttons: top X and bottom button
      const closeButtons = screen.getAllByRole("button", { name: /Close/i });
      expect(closeButtons.length).toBe(2);
      // Click the bottom Close button
      await user.click(closeButtons[1]);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Carousel Controls and Navigation", () => {
    it("navigates forward and backward through carousel with next/prev buttons", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const slideCounter = screen.getByText(/01/);
      expect(slideCounter).toBeInTheDocument();

      const nextButton = screen.getByRole("button", { name: /Siguiente proyecto/i });
      const prevButton = screen.getByRole("button", { name: /Proyecto anterior/i });

      // At start, prev button should be disabled
      expect(prevButton).toBeDisabled();

      // Click next
      await user.click(nextButton);
      expect(screen.getByText(/02/)).toBeInTheDocument();
      expect(prevButton).not.toBeDisabled();

      // Click prev
      await user.click(prevButton);
      expect(screen.getByText(/01/)).toBeInTheDocument();
    });

    it("navigates to a specific project when clicking pagination dots", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      // Click dot for project 3: SQLify
      const dot3 = screen.getByRole("tab", { name: /Ir al proyecto 3: SQLify/i });
      await user.click(dot3);

      expect(screen.getByText(/03/)).toBeInTheDocument();
    });

    it("navigates carousel using keyboard on the projects region section", () => {
      renderProjects("es");

      const section = screen.getByRole("region", { name: /Proyectos Destacados/i });

      // Press ArrowRight on section
      fireEvent.keyDown(section, { key: "ArrowRight" });
      expect(screen.getByText(/02/)).toBeInTheDocument();

      // Press ArrowLeft
      fireEvent.keyDown(section, { key: "ArrowLeft" });
      expect(screen.getByText(/01/)).toBeInTheDocument();

      // Press End to jump to last project
      fireEvent.keyDown(section, { key: "End" });
      expect(screen.getByText(/04/)).toBeInTheDocument();

      // Press Home to return to first project
      fireEvent.keyDown(section, { key: "Home" });
      expect(screen.getByText(/01/)).toBeInTheDocument();
    });

    it("does not change carousel slide when keyboard events occur on interactive action links", () => {
      renderProjects("es");

      const githubLink = screen.getByLabelText("GitHub for StudyQuest");
      expect(githubLink).toBeInTheDocument();

      // Dispatch ArrowRight originating from the action link
      fireEvent.keyDown(githubLink, { key: "ArrowRight" });

      // Should still be on project 01
      expect(screen.getByText(/01/)).toBeInTheDocument();
    });

    it("announces live project information for screen readers in Spanish and English", async () => {
      const user = userEvent.setup();
      const { unmount } = renderProjects("es");

      // Spanish announcement
      expect(screen.getByText("Proyecto 1 de 4: StudyQuest")).toBeInTheDocument();

      const nextButton = screen.getByRole("button", { name: /Siguiente proyecto/i });
      await user.click(nextButton);
      expect(screen.getByText("Proyecto 2 de 4: BookLibre")).toBeInTheDocument();

      unmount();

      // English announcement
      renderProjects("en");
      expect(screen.getByText("Project 1 of 4: StudyQuest")).toBeInTheDocument();
    });

    it("hides carousel controls when filtered list has only 1 project", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      // Filter by Backend (only AlgoQuePedir, 1 project)
      const backendTab = screen.getByRole("tab", { name: /Backend/i });
      await user.click(backendTab);

      // Controls nav should not be present
      expect(
        screen.queryByRole("navigation", { name: /Controles de navegación del carrusel/i })
      ).not.toBeInTheDocument();
    });

    it("navigates to side project when clicking directly on a non-center project card", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      expect(screen.getByText(/01/)).toBeInTheDocument();

      // Click on side card heading (BookLibre)
      const sideCardHeading = screen.getByRole("heading", { name: "BookLibre" });
      await user.click(sideCardHeading);

      expect(screen.getByText(/02/)).toBeInTheDocument();
    });

    it("disables next button when on the final project", async () => {
      const user = userEvent.setup();
      renderProjects("es");

      const nextButton = screen.getByRole("button", { name: /Siguiente proyecto/i });
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);

      expect(screen.getByText(/04/)).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it("does not change carousel slide when keyboard events occur on interactive button elements", () => {
      renderProjects("es");

      const detailsButtons = screen.getAllByRole("button", { name: /Detalles/i });
      fireEvent.keyDown(detailsButtons[0], { key: "ArrowRight" });

      expect(screen.getByText(/01/)).toBeInTheDocument();
    });

    it("ignores non-navigation keys on the carousel region section", () => {
      renderProjects("es");

      const section = screen.getByRole("region", { name: /Proyectos Destacados/i });
      const event = new KeyboardEvent("keydown", { key: "Tab", cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");
      section.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
      expect(screen.getByText(/01/)).toBeInTheDocument();
    });

    it("renders fallback header for projects without an image", () => {
      const originalProjects = [...portfolioData.projects];
      portfolioData.projects = [
        {
          ...originalProjects[0],
          id: "no-image-proj",
          title: "Fallback Title Project",
          image: undefined,
        },
      ];

      try {
        renderProjects("es");
        const titles = screen.getAllByText("Fallback Title Project");
        expect(titles.length).toBe(2);
      } finally {
        portfolioData.projects = originalProjects;
      }
    });

    it("renders EmptyCategory state and resets when clicking reset button in Spanish and English", async () => {
      const user = userEvent.setup();
      const originalProjects = [...portfolioData.projects];
      portfolioData.projects = [];

      try {
        const { unmount } = renderProjects("es");
        expect(screen.getByText("No hay proyectos en esta categoría")).toBeInTheDocument();
        const resetButtonEs = screen.getByRole("button", { name: "Ver todos los proyectos" });
        await user.click(resetButtonEs);

        unmount();
        renderProjects("en");
        expect(screen.getByText("No projects in this category")).toBeInTheDocument();
        const resetButtonEn = screen.getByRole("button", { name: "View all projects" });
        expect(resetButtonEn).toBeInTheDocument();
      } finally {
        portfolioData.projects = originalProjects;
      }
    });
  });
});
