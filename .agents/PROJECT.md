# Project: Julian Barberis Developer Portfolio Redesign — Dual-Mode Project Carousel

## Architecture
- **Framework & Runtime**: Next.js 16.3.3 (Turbopack, Static Export `output: "export"`), React 19.2.8, TypeScript 5.
- **Styling & Tokens**: Tailwind CSS v4 (`@tailwindcss/postcss`), Apple Glass theme tokens (`--glass-bg`, `--glass-border`, `.apple-glass-card`, `.apple-glass`), Vice City Sunset palette (`#f8559f` primary neon pink, `#3744bd` ocean twilight indigo paired with `dark:text-[#93c5fd]`, `#06b6d4` cyan).
- **Animation & Physics Engine**: `framer-motion@13.1.1` (gestures, magnetic springs, 3D perspective transforms, `layoutId` pill morphing, `useReducedMotion`).
- **Module Boundaries**:
  - `src/components/Projects.tsx`: Main section controller. Houses section header, Apple Glass mode switcher, category filter tabs, carousel stage dispatcher, and `ProjectModal` container.
  - `src/components/carousel/ProjectCard.tsx`: Reusable project card preserving custom visual code headers (`BookLibre`, `SQLify`, `Vice City Portfolio`), badges, tech tags, and external action links.
  - `src/components/carousel/FluidCarousel.tsx`: "Modo Fluido" implementation. Horizontal drag track with magnetic snap, responsive peeking, and spring settling.
  - `src/components/carousel/CoverflowCarousel.tsx`: "Modo Coverflow" implementation. 3D perspective ($1000\text{px}$) stage with dynamic `rotateY(±35deg)`, `scale(1.05 / 0.90)`, ambient depth blur, and click-to-center affordance.
  - `src/components/carousel/CarouselControls.tsx`: Accessible Apple Glass navigation buttons (Prev/Next), expanding pagination pill dots, and monospace slide counter.
  - `src/components/carousel/EmptyCategory.tsx`: Apple Glass fallback card displayed when a filtered category has 0 projects (e.g. "Backend").

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Apple Glass Mode Switcher | Discreet segmented toggle in section header ("Fluido" / "Coverflow 3D") with `layoutId="activeCarouselModePill"`, tactile tap feedback, and ARIA radiogroup. | M1 | ORIGINAL_REQUEST §R1 |
| F2 | Modo Fluido (Fluid Drag & Snap) | Relative drag gestures (`drag="x"`, `dragElastic: 0.15`), magnetic snap on release (`offset.x > 50px` or `velocity.x > 400px/s`), `touch-pan-y` mobile scroll safety, spring physics (`stiffness: 200, damping: 25`). | M1 | ORIGINAL_REQUEST §R1 |
| F3 | Modo Coverflow (3D Perspective) | 3D stage (`perspective: 1000px`, `preserve-3d`), active card (`scale: 1.05`, `rotateY: 0deg`, specular border), neighbor cards (`scale: 0.90`, `rotateY: ±35deg`, `blur: 1.5px`), spring settling (`stiffness: 200, damping: 25`). | M1 | ORIGINAL_REQUEST §R1 |
| F4 | Navigation & Pagination Controls | Circular Apple Glass arrow buttons (clamped at bounds), expanding active pill dots (`w-8` vs `w-2`), direct slide jumping, and slide counter (`01 / 03`). | M1 | ORIGINAL_REQUEST §R1 |
| F5 | Preserved Custom Visual Headers | Full preservation and polish of custom code headers: `BookLibre` (Kotlin DDD snippet + Spring/Postgres badges), `SQLify` (Gemini NL2SQL prompt preview + TS/MySQL badges, fixing unescaped quotes), `Vice City Portfolio` (Apple Glass + CI/CD indicators). | M1 | ORIGINAL_REQUEST §R3 |
| F6 | ProjectModal Integration | Clicking "Detalles" opens `ProjectModal` with full architecture highlights, roadmap, and tech badges. GitHub and Demo links preserve `target="_blank" rel="noopener noreferrer"`. | M1 | ORIGINAL_REQUEST §R3 |
| F7 | Category Filtering & Clamping | Dynamic filtering ("All", "Full-Stack", "Backend", "Frontend", "AI") with layout transitions, safe `activeIndex` clamping on count changes, and empty state for 0-item categories. | M1 | ORIGINAL_REQUEST §R3 |
| F8 | Bilingual Support (EN/ES) | Full Spanish/English localization using `LanguageContext` (`t()`) across all carousel controls, mode toggle, and ARIA announcements. | M1 | ORIGINAL_REQUEST §R3 |
| F9 | WCAG AA Contrast & Focus Rings | All text meets WCAG AA (>= 4.5:1); `#3744bd` dark mode paired with `dark:text-[#93c5fd]`; visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#f8559f]`); keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`). | M1 | ORIGINAL_REQUEST §R2 |
| F10 | Reduced Motion Fallback | Graceful fallback when `prefers-reduced-motion: reduce` is active via `useReducedMotion()` (disables 3D `rotateY`, scaling bounce, and inertia). | M1 | ORIGINAL_REQUEST §R2 |
| F11 | Zero-Error Build & Lint Gate | Turbopack static export compilation (`pnpm run build`) exits 0; ESLint (`pnpm run lint`) exits 0; zero hydration mismatches. | M1 | ORIGINAL_REQUEST Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Dual-Mode Project Carousel Implementation | Implement `src/components/carousel/*` and refactor `src/components/Projects.tsx` covering F1 through F11. Fix unescaped quotes at `Projects.tsx:60`. Ensure clean build and lint. | Survey complete | DONE |
| M2 | Multi-Agent Quality & Verification Gate | Independent review by 2 Reviewers, empirical verification by 2 Challengers, and integrity check by 1 Forensic Auditor. | M1 | DONE |

## Interface Contracts
### `Projects.tsx` ↔ `FluidCarousel.tsx` & `CoverflowCarousel.tsx`
```typescript
interface CarouselProps {
  projects: ProjectItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: ProjectItem) => void;
  renderVisualHeader: (project: ProjectItem) => React.ReactNode;
}
```

### `Projects.tsx` ↔ `CarouselControls.tsx`
```typescript
interface CarouselControlsProps {
  total: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  projects: ProjectItem[];
}
```

### `Projects.tsx` ↔ `ProjectCard.tsx`
```typescript
interface ProjectCardProps {
  project: ProjectItem;
  isActive: boolean;
  onOpenModal: () => void;
  visualHeader: React.ReactNode;
  isCoverflowSide?: boolean;
}
```

## Code Layout
- `src/components/Projects.tsx`: Refactored section component with mode switcher, category tabs, and modal mounting.
- `src/components/carousel/ProjectCard.tsx`: Individual project card with custom visual code header and actions.
- `src/components/carousel/FluidCarousel.tsx`: Drag and snap carousel with elastic constraints.
- `src/components/carousel/CoverflowCarousel.tsx`: 3D perspective Coverflow carousel.
- `src/components/carousel/CarouselControls.tsx`: Apple Glass navigation buttons and pagination dots.
- `src/components/carousel/EmptyCategory.tsx`: Apple Glass empty state card.
