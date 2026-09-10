"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";
import { Mail, Send, Copy, Check, MapPin, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

export default function Contact() {
  const { language, t } = useLanguage();
  const { contact, personal } = portfolioData;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  // Strips HTML tags, control characters, and trims whitespace
  const sanitizeText = (value: string): string =>
    value
      .replace(/[\x00-\x1F\x7F]/g, "")
      .replace(/<[^>]*>?/gm, "")
      .trim();

  const validateForm = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};

    const name = sanitizeText(formData.name);
    const email = sanitizeText(formData.email);
    const message = sanitizeText(formData.message);

    if (!name || name.length < 2 || name.length > 100) {
      errors.name = language === "es" ? "Nombre inválido (2–100 caracteres)." : "Invalid name (2–100 chars).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      errors.email = language === "es" ? "Email inválido." : "Invalid email address.";
    }
    if (!message || message.length < 10 || message.length > 2000) {
      errors.message = language === "es" ? "Mensaje inválido (10–2000 caracteres)." : "Invalid message (10–2000 chars).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#f8559f", "#3744bd", "#a31621", "#dbcdc6"],
      });

      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };


  return (
    <section id="contact" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#3744bd]/10 border border-[#3744bd]/30 text-xs font-bold uppercase tracking-wider text-[#3744bd] dark:text-[#8d9cf8]">
            <Mail className="w-3 h-3" aria-hidden="true" />
            <span>{language === "es" ? "Contacto" : "Contact"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {t(contact.title)}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            {t(contact.subtitle)}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-4xl mx-auto">
          
          {/* Quick Info Column */}
          <div className="md:col-span-5 space-y-3">
            
            {/* Email Copy Card */}
            <div className="apple-glass-card p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f8559f]/10 text-[#f8559f] flex items-center justify-center">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Direct Email</span>
                  <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] font-mono">
                    {personal.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold apple-glass text-[var(--text-primary)] hover:border-[#f8559f]/40 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    <span className="text-emerald-500 font-bold">{t(contact.copiedEmail)}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#f8559f]" aria-hidden="true" />
                    <span>{t(contact.copyEmail)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Pill */}
            <div className="apple-glass-card p-4 rounded-3xl flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-[#f8559f]" aria-hidden="true" />
                <span>Buenos Aires</span>
              </span>
              <span className="text-[var(--text-muted)] font-mono text-[11px]">UTC-3</span>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="apple-glass-card p-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-[#f8559f] focus-visible:ring-2 focus-visible:ring-[#f8559f]"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="apple-glass-card p-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-[#3744bd] focus-visible:ring-2 focus-visible:ring-[#f8559f]"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7">
            <div className="apple-glass-card p-6 rounded-3xl space-y-4">
              
              {submitted && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2" role="alert">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t(contact.successMessage)}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">{language === "es" ? "Tu nombre" : "Your name"}</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t(contact.formName)}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "error-name" : undefined}
                      className={`w-full px-3.5 py-2 text-xs rounded-2xl apple-glass text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus-visible:ring-2 transition-all ${formErrors.name ? "focus-visible:ring-red-500 border-red-500/40" : "focus-visible:ring-[#f8559f]"}`}
                    />
                    {formErrors.name && (
                      <p id="error-name" role="alert" className="mt-1 text-[11px] text-red-500 font-semibold">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">{language === "es" ? "Tu email" : "Your email"}</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t(contact.formEmail)}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "error-email" : undefined}
                      className={`w-full px-3.5 py-2 text-xs rounded-2xl apple-glass text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus-visible:ring-2 transition-all ${formErrors.email ? "focus-visible:ring-red-500 border-red-500/40" : "focus-visible:ring-[#f8559f]"}`}
                    />
                    {formErrors.email && (
                      <p id="error-email" role="alert" className="mt-1 text-[11px] text-red-500 font-semibold">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">{language === "es" ? "Tu mensaje" : "Your message"}</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    maxLength={2000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(contact.formMessage)}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? "error-message" : undefined}
                    className={`w-full px-3.5 py-2 text-xs rounded-2xl apple-glass text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus-visible:ring-2 transition-all resize-none ${formErrors.message ? "focus-visible:ring-red-500 border-red-500/40" : "focus-visible:ring-[#f8559f]"}`}
                  />
                  {formErrors.message && (
                    <p id="error-message" role="alert" className="mt-1 text-[11px] text-red-500 font-semibold">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full font-bold text-xs text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-lg shadow-[#f8559f]/25 transition-all active:scale-95 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:ring-offset-2"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isSubmitting ? t(contact.sending) : t(contact.sendButton)}</span>
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
