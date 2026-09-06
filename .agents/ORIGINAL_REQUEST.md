# Original User Request

## 2026-09-06T01:52:20Z

Equipo completo de agentes autónomos (full team).

Redesign and elevate Julian Barberis's developer portfolio by implementing a high-craft dual-mode project carousel (Fluid Drag/Snap and 3D Coverflow) with an interactive mode switcher, adhering to anti-slop design-engineering principles and impeccable frontend standards.

Working directory: /Users/julianbarberis/Portfolio 2
Integrity mode: development

## Requirements

### R1. Dual-Mode Interactive Project Carousel
- Replace the static 3-column project grid with an interactive carousel component supporting two switchable presentation modes so the user can compare and choose:
  1. **Modo Fluido (Fluid Drag & Snap):** Smooth horizontal drag/swipe gestures with magnetic spring physics, next/prev arrow buttons, and pagination indicators.
  2. **Modo Coverflow (3D Perspective):** Centered active card with 3D depth, perspective rotation (`rotateY`), scale transitions (`scale-105` active vs `scale-90` side cards), and ambient depth blur.
- Include a discreet, elegant Apple Glass segmented toggle in the section header (e.g. "Fluido" / "Coverflow 3D") allowing real-time switching between both presentation modes.
- Ensure full touch swipe support on mobile devices and accessible arrow / keyboard navigation on desktop.

### R2. Design Taste & Impeccable Craft Standards
- Strictly adhere to `design-taste-frontend` and `impeccable` guidelines:
  - Honor the portfolio's established "Vice City Sunset + Apple Glass" design language (neon pink `#f8559f` primary accent, indigo `#3744bd`, cyan accents, dark glass `apple-glass-card` surfaces with specular `border-white/10` and backdrop blur).
  - Banned patterns: No generic AI purple gradients, no broken descenders on display text, no illegible low-contrast text (all elements must meet WCAG AA 4.5:1 min contrast).
  - Tactile micro-interactions: provide responsive `:active` feedback (`scale-[0.98]` or `-translate-y-[1px]`), smooth spring animations (`type: "spring", stiffness: 200, damping: 25`), and respect `prefers-reduced-motion`.

### R3. Seamless Integration with Existing Architecture
- Preserve and adapt the custom visual code headers for all projects:
  - `BookLibre`: Kotlin DDD core snippet with tech badges.
  - `SQLify`: Gemini AI NL2SQL prompt preview with tabular accents.
  - `Vice City Portfolio`: Apple Glass & CI/CD architecture indicators.
- Preserve category filtering ("All", "Full-Stack", "Backend", "Frontend", "AI") with animated layout transitions.
- Maintain full bilingual EN/ES translations through `LanguageContext` (`t()`).
- Preserve the `ProjectModal` integration for details view and ensure GitHub/demo external links function seamlessly.

## Acceptance Criteria

### Carousel & UX Interaction
- [ ] Users can toggle between "Fluido" and "3D Coverflow" modes with instant, fluid visual updates.
- [ ] Drag, swipe, and arrow controls advance slides smoothly without jitter or layout shift.
- [ ] Pagination dots accurately reflect the current active project index and allow direct navigation.
- [ ] Category filter properly filters projects and updates carousel slide count dynamically.
- [ ] Clicking "Detalles" / "Details" opens `ProjectModal` with complete project data.
- [ ] GitHub and Demo links retain proper attributes (`target="_blank" rel="noopener noreferrer"`).

### Design & Accessibility (a11y)
- [ ] Responsive across all viewports: mobile (< 640px), tablet (768px), and desktop (1024px+).
- [ ] Motion honors `prefers-reduced-motion` with non-animated fallbacks.
- [ ] Interactive buttons and pills have visible keyboard focus rings (`focus-visible:ring-2`).

### Technical Verification
- [ ] Next.js 16 and React 19 compatibility maintained.
- [ ] `pnpm run build` (or `next build`) completes with exit code 0 and zero TypeScript / ESLint errors.
- [ ] Zero browser console errors or hydration mismatches.
