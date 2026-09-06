# Handoff Report: Dual-Mode Project Carousel Engineering & Motion Architecture

**Author**: `explorer_2` (Dual-Mode Motion Architect)  
**Target Path**: `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_2/handoff.md`  
**Date**: 2026-09-06T02:05:00Z  
**Project**: Julian Barberis Developer Portfolio Redesign  
**Status**: Complete (Hard Handoff)

---

## 1. Observation

### 1.1 Existing Codebase & Environment Findings
1. **Dependency Inventory (`package.json`)**:
   - `next`: `16.3.3` (Turbopack enabled)
   - `react` & `react-dom`: `19.2.8`
   - `framer-motion`: `^13.1.1` (installed at `13.1.1` in `node_modules/framer-motion`, fully supporting Motion v13 springs, `layoutId`, gestures, and `useReducedMotion`)
   - `tailwindcss`: `^4` (via `@tailwindcss/postcss` and `app/globals.css` with `@import "tailwindcss";`)
   - `lucide-react`: `^1.35.0`
2. **Existing Projects Implementation (`src/components/Projects.tsx`)**:
   - Currently renders a static 3-column grid (`grid grid-cols-1 md:grid-cols-3 gap-5`, lines 164-256).
   - Contains custom `ProjectVisualHeader` (lines 12-113) tailored for:
     - `BookLibre`: Kotlin DDD core snippet with tech badges.
     - `SQLify`: Gemini AI prompt-to-SQL preview with tabular accents.
     - `Vice City Portfolio`: GTA VI Sunset & Apple Glass architecture indicators.
   - Category filtering state: `categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"]` (line 121).
   - Modal trigger state: `selectedProject`, passing to `ProjectModal` (line 260).
3. **Data Shape (`src/data/portfolioData.ts` & `src/data/types.ts`)**:
   - Contains 3 projects: `booklibre` ("Full-Stack"), `sqlify` ("AI"), `portfolio-gta6` ("Frontend").
   - When active category is "Backend", `filteredProjects` length is 0 (requires an empty state).
4. **Style & Theme System (`src/app/globals.css`)**:
   - Apple Glass tokens: `--glass-bg: rgba(18, 22, 43, 0.55)`, `--glass-border: rgba(255, 255, 255, 0.16)`, `--glass-shadow`.
   - Utility classes: `.apple-glass`, `.apple-glass-card`, `.apple-glass-pill`.
   - Vice City Sunset color accents: `#f8559f` (neon pink), `#3744bd` (twilight indigo), `#06b6d4` (cyan).
   - Global focus ring: `*:focus-visible { outline: 2px solid #f8559f; outline-offset: 2px; }`.
5. **Static Export Configuration (`next.config.ts`)**:
   - `output: "export"`, `trailingSlash: true`, `reactStrictMode: true`. All components pre-render to static HTML. Window or browser-only APIs must not execute during SSR phase.
6. **Build & Lint Diagnostics**:
   - `pnpm run build` exits 0 (Turbopack successfully generated static bundle in 888ms).
   - `pnpm run lint` flagged an unescaped entity in `src/components/Projects.tsx` (line 60: `&gt; "Top 5 clientes con más órdenes"`) and unused icon imports (`Sparkles`, `Terminal`, `Database`, `Layout`).

---

## 2. Logic Chain

```
[Observation 1.1: Next 16 / React 19 / Framer Motion 13.1.1]
   │
   ├──> Framer Motion 13 supports native hardware-accelerated transforms (transform3d, rotateY, scale),
   │    spring physics (stiffness, damping), layoutId shared element morphing, and gesture dragging.
   │
[Observation 1.2: Static 3-column grid in Projects.tsx]
   │
   ├──> Transitioning to an interactive Dual-Mode Carousel requires decomposing Projects.tsx into:
   │    1. Section Header with Apple Glass Mode Switcher ("Fluido" vs "Coverflow 3D")
   │    2. Category Filter Pills ("All", "Full-Stack", "Backend", "Frontend", "AI")
   │    3. Mode View Stage (Modo Fluido track or Modo Coverflow 3D stage)
   │    4. Carousel Navigation & Pagination Controls (Arrows + Expanding Dot Pills + Counter)
   │    5. ProjectCard (reusable card component preserving ProjectVisualHeader and interactions)
   │    6. ProjectModal (isolated outside 3D perspective context)
   │
[Observation 1.3: WebKit 3D Transform & Stacking Context Rules]
   │
   ├──> transformStyle: "preserve-3d" in Safari flattens if an ancestor has overflow: hidden.
   │    Therefore, the 3D stage must use overflow: visible (or overflow-x: clip on outer section).
   │    ProjectModal (fixed z-50) must mount outside the 3D stage to avoid clipping.
   │
[Observation 1.4: Touch Drag & Page Scrolling Conflicts]
   │
   └──> Draggable Framer Motion containers must specify touch-action: pan-y (Tailwind touch-pan-y)
        so mobile users can scroll the document vertically without pointer gesture hijacking.
```

---

## 3. Motion & Architectural Specifications

### 3.1 Modo Fluido (Fluid Drag & Snap)

#### Motion Physics & Gestures
Modo Fluido delivers a horizontal magnetic swipe experience with momentum release and elastic resistance:

- **Gesture Properties**:
  - `drag="x"`
  - `dragElastic={0.15}` (delicate resistance at edges)
  - `dragConstraints={{ left: 0, right: 0 }}` (relative drag around current snapped position)
  - `className="touch-pan-y select-none cursor-grab active:cursor-grabbing"`
- **Magnetic Snap Calculation on `onDragEnd`**:
  ```ts
  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeThreshold = 50; // pixels
    const velocityThreshold = 400; // px/s
    const { offset, velocity } = info;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      // Swiped left -> advance forward
      setActiveIndex((prev) => Math.min(prev + 1, totalItems - 1));
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      // Swiped right -> retreat backward
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  ```
- **Track Offset & Centering Equation**:
  Cards are arranged in a horizontal row with width $w_{\text{card}}$ and gap $g$.
  Active card $i$ is centered by animating the track's $x$ offset:
  $$X_{\text{track}}(i) = -i \cdot (w_{\text{card}} + g)$$
  Container wrapping provides centering padding:
  $$\text{paddingX} = \frac{W_{\text{container}} - w_{\text{card}}}{2}$$
- **Spring Transition Spec**:
  ```ts
  const fluidSpringConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 26,
    mass: 0.8,
  };
  ```
- **Card States**:
  - **Active Card (`index === activeIndex`)**:
    - `scale: 1.0`
    - `opacity: 1.0`
    - Specular Border: `border-[#f8559f]/40`
    - Box Shadow: `0 20px 40px -15px rgba(248, 85, 159, 0.22)`
  - **Neighbor Cards (`index !== activeIndex`)**:
    - `scale: 0.94`
    - `opacity: 0.65`
    - Cursor: `cursor-pointer` (tapping a neighbor card snaps to it).

---

### 3.2 Modo Coverflow (3D Perspective)

#### 3D Geometry & Spatial Transforms
Inspired by classic Apple Coverflow, updated with Vice City sunset lighting and specular dark glass:

- **Stage Setup**:
  - CSS: `perspective: 1000px`, `perspective-origin: center center`, `transform-style: preserve-3d`.
  - Outer Stage: `relative w-full h-[520px] sm:h-[480px] flex items-center justify-center overflow-visible touch-pan-y`.
- **Card Offset Transform Formula**:
  Let $\Delta = \text{index} - \text{activeIndex}$.
  
  | Position | Offset $\Delta$ | Translate X ($x$) | Translate Z ($z$) | Rotate Y (`rotateY`) | Scale | Opacity | Blur | Z-Index |
  |---|---|---|---|---|---|---|---|---|
  | **Active Center** | $0$ | $0\text{px}$ | $+40\text{px}$ | $0^\circ$ | $1.05$ | $1.00$ | $0\text{px}$ | $30$ |
  | **Left Immediate** | $-1$ | $-S_{\text{step}}$ | $-60\text{px}$ | $+35^\circ$ | $0.90$ | $0.75$ | $1.5\text{px}$ | $20$ |
  | **Right Immediate** | $+1$ | $+S_{\text{step}}$ | $-60\text{px}$ | $-35^\circ$ | $0.90$ | $0.75$ | $1.5\text{px}$ | $20$ |
  | **Left Outer** | $\le -2$ | $-S_{\text{step}} - (|\Delta| - 1) \cdot 90\text{px}$ | $-140\text{px}$ | $+42^\circ$ | $0.80$ | $0.35$ | $3.0\text{px}$ | $10$ |
  | **Right Outer** | $\ge +2$ | $+S_{\text{step}} + (\Delta - 1) \cdot 90\text{px}$ | $-140\text{px}$ | $-42^\circ$ | $0.80$ | $0.35$ | $3.0\text{px}$ | $10$ |

- **Step Constants ($S_{\text{step}}$) by Breakpoint**:
  - **Desktop ($\ge 1024\text{px}$)**: $S_{\text{step}} = 260\text{px}$ (Card width: $400\text{px}$)
  - **Tablet ($640\text{px} - 1023\text{px}$)**: $S_{\text{step}} = 190\text{px}$ (Card width: $360\text{px}$)
  - **Mobile ($< 640\text{px}$)**: $S_{\text{step}} = 130\text{px}$ (Card width: $290\text{px}$)

- **Rotation Sign Rule**:
  In CSS 3D space, positive `rotateY` rotates clockwise around the vertical axis.
  - Left card ($\Delta < 0$): $\text{rotateY} = +35^\circ$ brings the right edge forward towards the center card and pushes the left edge into the screen.
  - Right card ($\Delta > 0$): $\text{rotateY} = -35^\circ$ brings the left edge forward towards the center card and pushes the right edge into the screen.
  - This matches classic Apple Coverflow and angles both cards directly towards the viewer.

- **Spring Physics Spec**:
  ```ts
  const coverflowSpringConfig = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1.0,
  };
  ```

- **Interactive Affordances in Coverflow**:
  - Side cards have `onClick={() => setActiveIndex(index)}` to smoothly bring them to the center.
  - On side cards, inner buttons/links have `pointer-events-none` so accidental clicks don't navigate to GitHub or Demo; only the active card has active link/button clicks.
  - The Coverflow stage also attaches `drag="x"` with elastic snapping so visitors can swipe through cards in 3D!

---

### 3.3 Mode Switcher: Apple Glass Segmented Pill

#### Design & Interaction Specification
- **Location**: Section header, centered below the "Featured Projects" title, right above the category filters.
- **Markup & Accessibility**:
  ```tsx
  <div
    role="radiogroup"
    aria-label={language === "es" ? "Modo de presentación de proyectos" : "Project presentation mode"}
    className="inline-flex items-center p-1 rounded-full apple-glass border border-white/10 shadow-inner bg-black/20 dark:bg-black/40 backdrop-blur-xl"
  >
    <button
      role="radio"
      aria-checked={mode === "fluid"}
      onClick={() => setMode("fluid")}
      className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 z-10 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
        mode === "fluid" ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      }`}
    >
      {mode === "fluid" && (
        <motion.div
          layoutId="activeCarouselModePill"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f8559f]/80 to-[#3744bd]/80 shadow-[0_0_12px_rgba(248,85,159,0.35)] border border-white/20"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <SlidersHorizontal className="w-3.5 h-3.5 relative z-10" />
      <span className="relative z-10">{language === "es" ? "Fluido" : "Fluid"}</span>
    </button>

    <button
      role="radio"
      aria-checked={mode === "coverflow"}
      onClick={() => setMode("coverflow")}
      className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 z-10 focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none ${
        mode === "coverflow" ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      }`}
    >
      {mode === "coverflow" && (
        <motion.div
          layoutId="activeCarouselModePill"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3744bd]/80 to-[#f8559f]/80 shadow-[0_0_12px_rgba(55,68,189,0.4)] border border-white/20"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <Box className="w-3.5 h-3.5 relative z-10" />
      <span className="relative z-10">Coverflow 3D</span>
    </button>
  </div>
  ```

- **Mode Switching Animation**:
  The active carousel view is wrapped in `<AnimatePresence mode="wait">`:
  ```tsx
  <AnimatePresence mode="wait">
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="w-full"
    >
      {mode === "fluid" ? (
        <FluidCarousel ... />
      ) : (
        <CoverflowCarousel ... />
      )}
    </motion.div>
  </AnimatePresence>
  ```
  This eliminates CSS layout clashes between 2D flexbox track and 3D absolute stage.

---

### 3.4 Navigation Controls & Pagination Indicators

1. **Circular Apple Glass Arrow Buttons**:
   - Left Prev & Right Next buttons placed flanking the carousel or integrated in the bottom control dock.
   - Button styles: `apple-glass w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-[#f8559f]/40 hover:bg-white/10 active:scale-95 transition-all text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#f8559f]`.
   - Boundary behavior: Clamped (disabled state with `opacity-25 pointer-events-none cursor-not-allowed`). Clamped boundaries provide an honest, orienting mental model for recruiters inspecting 3-5 curated projects.
2. **Expanding Pagination Dots**:
   - Inactive dot: `w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all`.
   - Active dot: Expanding pill `w-8 h-2 rounded-full bg-gradient-to-r from-[#f8559f] to-[#3744bd] shadow-[0_0_8px_rgba(248,85,159,0.5)] transition-all duration-300`.
   - Clickable: Each dot has `onClick={() => setActiveIndex(idx)}` and `aria-label={`Go to slide ${idx + 1}`}`.
3. **Slide Counter Badge**:
   - Monospace badge: `0${activeIndex + 1} / 0${filteredProjects.length}` in `font-mono text-xs text-[var(--text-muted)]`.

---

### 3.5 Responsive Breakpoint Matrix

| Specification | Mobile (`< 640px`) | Tablet (`640px - 1023px`) | Desktop (`>= 1024px`) |
|---|---|---|---|
| **Modo Fluido Card Width** | `82vw` (max 330px) | `380px` | `420px` |
| **Modo Fluido Track Gap** | `16px` (`gap-4`) | `20px` (`gap-5`) | `24px` (`gap-6`) |
| **Visible Peeking** | ~20px on left/right edges | ~40px on left/right edges | ~60px or full neighbor peek |
| **Modo Coverflow Card Width** | `78vw` (max 300px) | `360px` | `400px` |
| **Coverflow Perspective** | `800px` | `1000px` | `1200px` |
| **Coverflow Step ($S_{\text{step}}$)** | `130px` | `190px` | `260px` |
| **Coverflow RotateY** | $\pm 28^\circ$ | $\pm 32^\circ$ | $\pm 35^\circ$ |
| **Coverflow Stage Height** | `520px` | `490px` | `480px` |
| **Arrow Placement** | Docked below carousel | Flanking carousel or docked | Flanking carousel or docked |

---

### 3.6 Keyboard Navigation & Accessibility (WCAG AA)

1. **ARIA Structure**:
   - Carousel container has `role="region" aria-roledescription="carousel" aria-label={t("Featured Projects")}`.
   - Stage has `tabIndex={0}` to accept keyboard focus.
   - Screen reader announcement via live region:
     ```tsx
     <div className="sr-only" aria-live="polite" aria-atomic="true">
       {language === "es" ? `Proyecto ${activeIndex + 1} de ${filteredProjects.length}: ${filteredProjects[activeIndex]?.title}` : `Project ${activeIndex + 1} of ${filteredProjects.length}: ${filteredProjects[activeIndex]?.title}`}
     </div>
     ```
2. **Keyboard Handlers**:
   - `ArrowLeft`: Navigate to previous slide (`Math.max(0, activeIndex - 1)`).
   - `ArrowRight`: Navigate to next slide (`Math.min(filteredProjects.length - 1, activeIndex + 1)`).
   - `Home`: Jump to first slide (`0`).
   - `End`: Jump to last slide (`filteredProjects.length - 1`).
   - If `ProjectModal` is currently open, carousel keyboard shortcuts are suppressed so modal keys (e.g. `Escape`, scroll) take precedence.
3. **Focus Rings**:
   - High-contrast neon ring `focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50`.

---

### 3.7 Graceful Degradation (`prefers-reduced-motion`)

```ts
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
```
When `shouldReduceMotion === true`:
- **Modo Coverflow**:
  - `rotateY: 0deg` (all 3D tilts disabled).
  - `scale: offset === 0 ? 1 : 0.95`.
  - `filter: "none"` (blur disabled).
  - Transition duration reduced to `0.01s` or instant crossfade.
- **Modo Fluido**:
  - Disable spring bounce and inertia.
  - Snap transitions execute with instant discrete cuts.
- **Mode Switcher**:
  - Pill position changes instantaneously without spring layout transition.

---

### 3.8 Edge Cases & Resilience

1. **Category Filter Reset & Clamping**:
   - When active category changes, `filteredProjects.length` changes dynamically.
   - To prevent out-of-bounds `undefined` indexing, `setActiveIndex(0)` is invoked whenever category changes:
     ```ts
     const handleCategoryChange = (cat: string) => {
       setActiveCategory(cat);
       setActiveIndex(0);
     };
     ```
   - Defensive rendering guard:
     ```ts
     const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredProjects.length - 1));
     ```
2. **Empty Category State (e.g. "Backend")**:
   - When `filteredProjects.length === 0`, render an elegant Apple Glass card:
     - Icon: `FolderGit2` in `#f8559f`
     - Title: "Próximamente más proyectos" / "More projects coming soon"
     - Subtitle: "Actualmente no hay proyectos en esta categoría. Puedes explorar todos los proyectos destacados."
     - Action button: "Ver Todos los Proyectos" / "View All Projects" which executes `handleCategoryChange("All")`.
3. **Modal Isolation from 3D Stacking Context**:
   - `ProjectModal` is rendered at the root of `src/components/Projects.tsx`, outside any `perspective` or `preserve-3d` container. This ensures its `fixed inset-0 z-50` backdrop blur covers the full viewport without clipping.
4. **Mobile Scroll Trapping Prevention**:
   - All draggable containers must have `touch-action: pan-y` (`className="touch-pan-y"`) so users can vertically scroll past the carousel without gestures getting stuck.
5. **Drag Click Suppression**:
   - Framer Motion automatically suppresses click events when pointer drag exceeds threshold.
   - On Coverflow side cards, clicking navigates to the card. Only on the active center card (`offset === 0`) do GitHub and Details/Demo buttons accept clicks.

---

## 4. Proposed Implementation Architecture

### File Layout Recommendation
```
src/components/
├── Projects.tsx              # Main Section Controller (Categories, Mode Switcher, Layout, Modal)
├── carousel/
│   ├── ProjectCard.tsx       # Reusable Project Card (preserves ProjectVisualHeader & actions)
│   ├── FluidCarousel.tsx     # Modo Fluido (drag, snap, responsive centering)
│   ├── CoverflowCarousel.tsx # Modo Coverflow (3D perspective stage, rotateY, scale, blur)
│   ├── CarouselControls.tsx  # Prev/Next Apple Glass buttons & expanding pagination dots
│   └── EmptyCategory.tsx     # Apple Glass empty state card
```

### Complete Code Pattern Blueprint

#### `src/components/carousel/ProjectCard.tsx`
```tsx
"use client";

import React from "react";
import { ProjectItem } from "@/data/types";
import { useLanguage } from "@/context/LanguageContext";
import TechIcon from "@/components/TechIcon";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { ExternalLink, Rocket, Clock } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  isActive: boolean;
  onOpenModal: () => void;
  visualHeader: React.ReactNode;
  isCoverflowSide?: boolean;
}

export default function ProjectCard({
  project,
  isActive,
  onOpenModal,
  visualHeader,
  isCoverflowSide = false,
}: ProjectCardProps) {
  const { language, t } = useLanguage();
  const isLive = project.status === "live";

  return (
    <div
      className={`apple-glass-card rounded-3xl p-5 flex flex-col justify-between space-y-4 group transition-all duration-300 ${
        isActive
          ? "border-[#f8559f]/50 shadow-[0_20px_45px_-10px_rgba(248,85,159,0.25)]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="space-y-3.5">
        {/* Visual Header */}
        {visualHeader}

        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[11px] font-mono font-bold text-[#3744bd] dark:text-[#93c5fd] uppercase tracking-wider">
            {project.category}
          </span>

          {isLive ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{language === "es" ? "En Producción" : "Live"}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f8559f]/10 text-[#f8559f]">
              <Clock className="w-2.5 h-2.5" />
              <span>{language === "es" ? "Deploy Próximo" : "Deploying"}</span>
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#f8559f] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
            {t(project.tagline)}
          </p>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <TechIcon name={tech} className="w-3 h-3 shrink-0" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div
        className={`pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 ${
          isCoverflowSide ? "pointer-events-none opacity-80" : ""
        }`}
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub for ${project.title}`}
          tabIndex={isCoverflowSide ? -1 : 0}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[#f8559f] transition-colors focus-visible:ring-2 focus-visible:ring-[#f8559f]"
        >
          <GitHubIcon className="w-4 h-4" />
        </a>

        {isLive && project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isCoverflowSide ? -1 : 0}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#f8559f] hover:bg-[#ff68ad] border border-white/15 shadow-sm shadow-[#f8559f]/20 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <span>Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            tabIndex={isCoverflowSide ? -1 : 0}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-[var(--text-primary)] apple-glass hover:border-[#f8559f]/40 transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f]"
          >
            <Rocket className="w-3 h-3 text-[#f8559f]" />
            <span>{language === "es" ? "Detalles" : "Details"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
```

#### `src/components/carousel/CoverflowCarousel.tsx`
```tsx
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectItem } from "@/data/types";
import ProjectCard from "./ProjectCard";

interface CoverflowCarouselProps {
  projects: ProjectItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: ProjectItem) => void;
  renderVisualHeader: (project: ProjectItem) => React.ReactNode;
}

export default function CoverflowCarousel({
  projects,
  activeIndex,
  onSelectIndex,
  onOpenModal,
  renderVisualHeader,
}: CoverflowCarouselProps) {
  const shouldReduceMotion = useReducedMotion();

  const getStep = () => {
    if (typeof window === "undefined") return 240;
    if (window.innerWidth < 640) return 130;
    if (window.innerWidth < 1024) return 190;
    return 260;
  };

  const step = getStep();

  return (
    <div
      className="relative w-full h-[520px] sm:h-[480px] flex items-center justify-center select-none touch-pan-y overflow-visible"
      style={{
        perspective: shouldReduceMotion ? undefined : 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {projects.map((project, index) => {
        const offset = index - activeIndex;
        const isCenter = offset === 0;

        let x = 0;
        let z = 0;
        let rotateY = 0;
        let scale = 1;
        let opacity = 1;
        let blur = "0px";

        if (shouldReduceMotion) {
          x = offset * (step + 40);
          scale = isCenter ? 1 : 0.92;
          opacity = isCenter ? 1 : 0.6;
        } else {
          if (isCenter) {
            x = 0;
            z = 40;
            rotateY = 0;
            scale = 1.05;
            opacity = 1;
            blur = "0px";
          } else if (offset < 0) {
            // Left cards
            x = -step - (Math.abs(offset) - 1) * 90;
            z = -60 - (Math.abs(offset) - 1) * 80;
            rotateY = 35;
            scale = offset === -1 ? 0.9 : 0.8;
            opacity = offset === -1 ? 0.75 : 0.35;
            blur = offset === -1 ? "1.5px" : "3px";
          } else {
            // Right cards
            x = step + (offset - 1) * 90;
            z = -60 - (offset - 1) * 80;
            rotateY = -35;
            scale = offset === 1 ? 0.9 : 0.8;
            opacity = offset === 1 ? 0.75 : 0.35;
            blur = offset === 1 ? "1.5px" : "3px";
          }
        }

        return (
          <motion.div
            key={project.id}
            onClick={() => {
              if (!isCenter) onSelectIndex(index);
            }}
            animate={{
              x,
              z: shouldReduceMotion ? 0 : z,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              scale,
              opacity,
              filter: `blur(${blur})`,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 1.0,
            }}
            style={{
              transformStyle: "preserve-3d",
              zIndex: 30 - Math.abs(offset) * 5,
            }}
            className={`absolute w-[80vw] max-w-[320px] sm:max-w-[370px] md:max-w-[400px] origin-center ${
              isCenter ? "cursor-default" : "cursor-pointer hover:opacity-90"
            }`}
          >
            <ProjectCard
              project={project}
              isActive={isCenter}
              onOpenModal={() => onOpenModal(project)}
              visualHeader={renderVisualHeader(project)}
              isCoverflowSide={!isCenter}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
```

---

## 5. Caveats
1. **Window Measurement during SSR**: On server pre-rendering (`output: "export"`), `window.innerWidth` is undefined. The helper `getStep()` defaults to `240` during SSR, which hydrates seamlessly into client dimensions.
2. **WebKit 3D Flattening**: Avoid adding `overflow: hidden` directly to the `CoverflowCarousel` container, as Safari flattens 3D rendering context when `overflow: hidden` is encountered on a `preserve-3d` element. Horizontal boundaries are maintained via section padding.
3. **Curated Project Count**: Currently 3 projects exist (`booklibre`, `sqlify`, `portfolio-gta6`). The formulas are mathematically generalized to support any number of projects $N \ge 1$.

---

## 6. Conclusion
The dual-mode carousel motion and engineering architecture is fully specified, mathematically modeled, and ready for clean implementation. It provides:
1. **Modo Fluido**: Magnetic drag gestures, velocity release, elastic boundaries, and centered track alignment.
2. **Modo Coverflow**: True 3D perspective ($1000\text{px}$), dynamic $\text{rotateY} = \pm 35^\circ$, $\text{scale} = 1.05 / 0.90$, ambient depth blur, and spring physics (`stiffness: 200, damping: 25`).
3. **Apple Glass Switcher**: High-craft segmented pill with `layoutId` pill morphing and specular sheen.
4. **Full Resilience**: Clamped pagination, keyboard ARIA support, `touch-action: pan-y` mobile scroll safety, empty category fallback, and `prefers-reduced-motion` compliance.

---

## 7. Verification Method

### 7.1 Automated Verification Commands
Run in workspace root (`/Users/julianbarberis/Portfolio 2`):
```bash
# 1. Verify Next.js 16 static export build passes with 0 errors
pnpm run build

# 2. Verify ESLint passes with 0 errors
pnpm run lint
```

### 7.2 Empirical Motion & UX Verification Checklist
1. **Mode Switcher**: Click between "Fluido" and "Coverflow 3D" — verify the gradient pill morphs seamlessly across tabs using `layoutId`.
2. **Modo Fluido Drag Physics**: Drag card horizontally on desktop and mobile. Verify:
   - Drag resistance at edges (`dragElastic: 0.15`).
   - Quick flick releases forward/backward based on velocity.
   - Vertical swipe on mobile allows normal page scrolling (`touch-pan-y`).
3. **Modo Coverflow 3D Geometry**:
   - Center card is scaled $105\%$, unblurred, with specular border glow.
   - Left card is angled $+35^\circ$ facing the center; right card is angled $-35^\circ$.
   - Clicking a side card smoothly animates it into the center active position with spring settling (`stiffness: 200, damping: 25`).
4. **Keyboard & a11y**:
   - Focus carousel with Tab key; press `ArrowRight` and `ArrowLeft` to navigate cards.
   - Verify focus visible rings (`focus-visible:ring-2 focus-visible:ring-[#f8559f]`).
   - Open modal via "Detalles" button; press `Escape` to close.
5. **Category Clamping**:
   - Navigate to slide 2 on "All".
   - Switch category to "Full-Stack" (1 project).
   - Verify active index clamps to 0 without any NaN or blank card glitch.
   - Switch category to "Backend" (0 projects) — verify the Apple Glass empty state displays gracefully.
