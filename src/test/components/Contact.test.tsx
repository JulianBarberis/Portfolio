import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";
import { LanguageProvider } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";

function renderContact(lang: "es" | "en" = "es") {
  localStorage.setItem("portfolio_lang", lang);
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>
  );
}

describe("Contact Component (src/components/Contact.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Form Validation", () => {
    it("renders all input fields and submit button", () => {
      renderContact("es");

      expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Mensaje")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Enviar Mensaje/i })).toBeInTheDocument();
    });

    it("displays error messages when submitting empty form", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const submitButton = screen.getByRole("button", { name: /Enviar Mensaje/i });
      await user.click(submitButton);

      expect(screen.getByText("Nombre inválido (2–100 caracteres).")).toBeInTheDocument();
      expect(screen.getByText("Email inválido.")).toBeInTheDocument();
      expect(screen.getByText("Mensaje inválido (10–2000 caracteres).")).toBeInTheDocument();
      expect(confetti).not.toHaveBeenCalled();
    });

    it("displays English error messages when language is 'en'", async () => {
      const user = userEvent.setup();
      renderContact("en");

      const submitButton = screen.getByRole("button", { name: /Send Message/i });
      await user.click(submitButton);

      expect(screen.getByText("Invalid name (2–100 chars).")).toBeInTheDocument();
      expect(screen.getByText("Invalid email address.")).toBeInTheDocument();
      expect(screen.getByText("Invalid message (10–2000 chars).")).toBeInTheDocument();
    });

    it("validates that name must be at least 2 characters", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      await user.type(nameInput, "A");
      await user.type(emailInput, "test@example.com");
      await user.type(messageInput, "This is a valid long enough message.");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.getByText("Nombre inválido (2–100 caracteres).")).toBeInTheDocument();
      expect(screen.queryByText("Email inválido.")).not.toBeInTheDocument();
      expect(screen.queryByText("Mensaje inválido (10–2000 caracteres).")).not.toBeInTheDocument();
    });

    it("validates that email format must be valid", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      await user.type(nameInput, "Julian");
      await user.type(emailInput, "not-an-email");
      await user.type(messageInput, "This is a valid long enough message.");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.queryByText("Nombre inválido (2–100 caracteres).")).not.toBeInTheDocument();
      expect(screen.getByText("Email inválido.")).toBeInTheDocument();
      expect(screen.queryByText("Mensaje inválido (10–2000 caracteres).")).not.toBeInTheDocument();
    });

    it("validates that message must be at least 10 characters", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      await user.type(nameInput, "Julian");
      await user.type(emailInput, "test@example.com");
      await user.type(messageInput, "Short");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.queryByText("Nombre inválido (2–100 caracteres).")).not.toBeInTheDocument();
      expect(screen.queryByText("Email inválido.")).not.toBeInTheDocument();
      expect(screen.getByText("Mensaje inválido (10–2000 caracteres).")).toBeInTheDocument();
    });

    it("rejects names that become too short after HTML tags are stripped by sanitizer", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      // "<b>A</b>" strips to "A" (length 1, < 2)
      await user.type(nameInput, "<b>A</b>");
      await user.type(emailInput, "test@example.com");
      await user.type(messageInput, "This is a valid long enough message.");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.getByText("Nombre inválido (2–100 caracteres).")).toBeInTheDocument();
    });

    it("rejects emails exceeding 254 characters", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      await user.type(nameInput, "Julian");
      await user.type(emailInput, "a".repeat(250) + "@test.com");
      await user.type(messageInput, "This is a valid long enough message.");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.getByText("Email inválido.")).toBeInTheDocument();
    });

    it("rejects whitespace-only messages", async () => {
      const user = userEvent.setup();
      renderContact("es");

      const nameInput = screen.getByPlaceholderText("Nombre");
      const emailInput = screen.getByPlaceholderText("Email");
      const messageInput = screen.getByPlaceholderText("Mensaje");

      await user.type(nameInput, "Julian");
      await user.type(emailInput, "test@example.com");
      await user.type(messageInput, "              ");

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      expect(screen.getByText("Mensaje inválido (10–2000 caracteres).")).toBeInTheDocument();
    });

    it("submits successfully with valid data, triggering confetti and showing success message", async () => {
      const user = userEvent.setup();
      renderContact("es");

      await user.type(screen.getByPlaceholderText("Nombre"), "Julian Barberis");
      await user.type(screen.getByPlaceholderText("Email"), "julian@example.com");
      await user.type(
        screen.getByPlaceholderText("Mensaje"),
        "Hola! Me interesa conversar sobre oportunidades de software engineering."
      );

      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      // Wait for async submission timeout (600ms)
      await waitFor(
        () => {
          expect(
            screen.getByText("¡Mensaje enviado! Te responderé a la brevedad.")
          ).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 60,
          spread: 60,
        })
      );

      // Form inputs should be cleared
      expect(screen.getByPlaceholderText("Nombre")).toHaveValue("");
      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(screen.getByPlaceholderText("Mensaje")).toHaveValue("");
    });
  });

  describe("Email Clipboard Copy", () => {
    it("copies personal email to clipboard and updates button text", async () => {
      const user = userEvent.setup();
      const writeSpy = vi.spyOn(navigator.clipboard, "writeText");
      renderContact("es");

      const copyButton = screen.getByRole("button", { name: /Copiar Email/i });
      expect(copyButton).toBeInTheDocument();

      await user.click(copyButton);

      expect(writeSpy).toHaveBeenCalledWith(portfolioData.personal.email);
      expect(screen.getByText("¡Copiado!")).toBeInTheDocument();
    });

    it("copies email and shows English text when language is 'en'", async () => {
      const user = userEvent.setup();
      const writeSpy = vi.spyOn(navigator.clipboard, "writeText");
      renderContact("en");

      const copyButton = screen.getByRole("button", { name: /Copy Email/i });
      await user.click(copyButton);

      expect(writeSpy).toHaveBeenCalledWith(portfolioData.personal.email);
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });

    it("handles clipboard rejection gracefully without throwing unhandled error", async () => {
      const user = userEvent.setup();
      vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(
        new Error("Clipboard permission denied")
      );
      renderContact("es");

      const copyButton = screen.getByRole("button", { name: /Copiar Email/i });
      await user.click(copyButton);

      // Button should not have transitioned to copied state
      expect(screen.queryByText("¡Copiado!")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Copiar Email/i })).toBeInTheDocument();
    });

    it("cleans up active timers on unmount without throwing errors or setting state", async () => {
      const user = userEvent.setup();
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
      const { unmount } = renderContact("es");

      // Trigger copy timer
      const copyButton = screen.getByRole("button", { name: /Copiar Email/i });
      await user.click(copyButton);

      // Trigger submit timer
      await user.type(screen.getByPlaceholderText("Nombre"), "Julian Barberis");
      await user.type(screen.getByPlaceholderText("Email"), "julian@example.com");
      await user.type(
        screen.getByPlaceholderText("Mensaje"),
        "This is a message to test unmount teardown."
      );
      await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

      // Unmount while timers are active
      expect(() => unmount()).not.toThrow();
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });
});
