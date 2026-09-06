# Task Assignment: Milestone 1 — Dual-Mode Project Carousel Implementation

## Mission
Implement the complete dual-mode interactive project carousel ("Modo Fluido" and "Modo Coverflow 3D") with Apple Glass mode switcher in Julian Barberis's developer portfolio, adhering to anti-slop design-engineering standards, Next.js 16.3.3 + React 19.2.8 compatibility, and achieving a 100% clean build (`pnpm run build`) and clean lint (`pnpm run lint`).

## Authoritative Inputs
1. MANDATORY: Read `/Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md` first.
2. Read `/Users/julianbarberis/Portfolio 2/.agents/PROJECT.md` (Architecture, contracts, feature inventory).
3. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_1/handoff.md` (Codebase architecture, visual headers, data model).
4. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_2/handoff.md` (Motion formulas, Framer Motion springs, 3D math, gestures, component blueprint).
5. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md` (Next 16/React 19 rules, contrast fixes, bilingual matrix, a11y, lint error fix).

## Exclusive Write Ownership
You exclusively own and may create/modify:
- `src/components/carousel/ProjectCard.tsx`
- `src/components/carousel/FluidCarousel.tsx`
- `src/components/carousel/CoverflowCarousel.tsx`
- `src/components/carousel/CarouselControls.tsx`
- `src/components/carousel/EmptyCategory.tsx`
- `src/components/Projects.tsx`

DO NOT modify files outside your write ownership.

## Key Implementation Requirements
1. **Apple Glass Segmented Mode Switcher**:
   - Placed in section header ("Fluido" / "Coverflow 3D") with Framer Motion `layoutId="activeCarouselModePill"`.
   - Dark glass surface (`apple-glass`, `border border-white/10`, `backdrop-blur-xl`), tactile tap feedback (`whileTap={{ scale: 0.95 }}`), ARIA radiogroup.
2. **Modo Fluido (Fluid Drag & Snap)**:
   - Relative drag gestures with `drag="x"`, `dragElastic: 0.15`.
   - Magnetic snap threshold (`offset.x > 50px` or `velocity.x > 400px/s`).
   - `touch-pan-y` mobile scroll safety so vertical scroll is never trapped.
   - Spring settling: `stiffness: 220, damping: 26`.
3. **Modo Coverflow (3D Perspective)**:
   - 3D perspective ($1000\text{px}$) stage with `transformStyle: "preserve-3d"`.
   - Active center card: `scale: 1.05`, `rotateY: 0deg`, $z = 40\text{px}$, specular border glow.
   - Neighbor cards: `scale: 0.90`, $\text{rotateY} = \pm 35^\circ$, ambient depth blur ($1.5\text{px}$), $z = -60\text{px}$.
   - Side card tap affordance: tapping a side card smoothly transitions it to active center.
   - Pointer events safety: only the active card has active external links/buttons.
4. **Navigation & Pagination Controls**:
   - Circular Apple Glass arrow buttons (clamped at boundaries with disabled state).
   - Expanding pagination pill dots (`w-8` active vs `w-2` inactive), click-to-jump.
   - Monospace slide counter badge (`01 / 03`).
5. **Preserved Custom Visual Headers & ProjectCard**:
   - Retain custom visual headers for `BookLibre` (Kotlin DDD snippet + Spring/Postgres), `SQLify` (Gemini NL2SQL prompt preview + TS/MySQL), and `Vice City Portfolio` (Apple Glass + CI/CD indicators).
   - CRITICAL: Fix unescaped quotes at `Projects.tsx:60` (`&quot;Top 5 clientes con más órdenes&quot;`) to ensure ESLint passes.
   - Prune unused imports (`Sparkles`, `Terminal`, `Database`, `Layout`).
6. **ProjectModal & Action Links**:
   - "Detalles" button opens `ProjectModal` with complete project data.
   - External links (GitHub and Demo) have `target="_blank" rel="noopener noreferrer"`.
   - `ProjectModal` mounted at root outside 3D perspective container to avoid WebKit clipping.
7. **Category Filtering & Clamping**:
   - Dynamic filtering tabs ("All", "Full-Stack", "Backend", "Frontend", "AI").
   - Clamping/resetting `activeIndex = 0` on category switch to prevent out-of-bounds `undefined` errors.
   - Render Apple Glass empty state card when 0 projects match (category "Backend").
8. **Bilingual Translations & A11y**:
   - Use `useLanguage()` with `t()` and inline ternaries across all UI strings.
   - WCAG AA contrast compliance: NEVER use bare `#3744bd` for text in dark mode; always pair with `dark:text-[#93c5fd]`.
   - Visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#f8559f]`).
   - Keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
   - Graceful fallback for `prefers-reduced-motion` via `useReducedMotion()`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification Requirement
You MUST run the following build and lint commands yourself and report exact results in your handoff:
1. `pnpm run lint` (MUST pass with 0 errors)
2. `pnpm run build` (MUST pass with exit code 0)

## Deliverable
Write your structured handoff report to:
`/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1/handoff.md`

When complete, call send_message to report your findings, build/lint command output, and handoff path to parent.

## 2026-09-06T01:58:25Z
You are worker_1 (Senior Frontend Design-Engineer) on the Julian Barberis Developer Portfolio Redesign team.
Your working directory is: /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1
Workspace root: /Users/julianbarberis/Portfolio 2

MANDATORY FIRST STEPS:
1. Read /Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md
2. Read /Users/julianbarberis/Portfolio 2/.agents/PROJECT.md
3. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1/DISPATCH.md
4. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_1/handoff.md
5. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_2/handoff.md
6. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md

EXCLUSIVE WRITE OWNERSHIP:
- src/components/carousel/ProjectCard.tsx
- src/components/carousel/FluidCarousel.tsx
- src/components/carousel/CoverflowCarousel.tsx
- src/components/carousel/CarouselControls.tsx
- src/components/carousel/EmptyCategory.tsx
- src/components/Projects.tsx

TASK:
Implement the complete dual-mode interactive project carousel:
1. Modo Fluido (Fluid Drag & Snap) with magnetic spring physics (stiffness: 220, damping: 26), velocity snap, touch-pan-y mobile safety, and responsive centering.
2. Modo Coverflow (3D Perspective) with perspective: 1000px, preserve-3d, active center scale 1.05 / rotateY 0deg / specular glow, side cards scale 0.90 / rotateY ±35deg / depth blur 1.5px, side card tap-to-center.
3. Apple Glass segmented toggle in section header ("Fluido" vs "Coverflow 3D") with Framer Motion layoutId="activeCarouselModePill", tactile tap feedback, and ARIA radiogroup.
4. Circular Apple Glass prev/next arrows (clamped at boundaries), expanding active pagination dots (w-8 vs w-2), slide counter.
5. Reusable ProjectCard preserving custom visual code headers for BookLibre (Kotlin DDD snippet + Spring/Postgres), SQLify (Gemini NL2SQL prompt preview + TS/MySQL), and Vice City Portfolio (Apple Glass + CI/CD indicators).
6. Fix unescaped quotes at Projects.tsx:60 (&quot;Top 5 clientes con más órdenes&quot;) so ESLint passes with 0 errors. Prune unused imports.
7. Integrate ProjectModal with "Detalles" button; ensure GitHub and Demo links have target="_blank" rel="noopener noreferrer". Mount ProjectModal outside 3D perspective to avoid clipping.
8. Category filtering with activeIndex clamping/reset and Apple Glass empty state card for 0-project categories (e.g. Backend).
9. Bilingual translations (EN/ES) via useLanguage() and t().
10. WCAG AA compliance: dark:text-[#93c5fd] for indigo accents on dark glass, focus-visible:ring-2 focus-visible:ring-[#f8559f], keyboard navigation (ArrowLeft/ArrowRight/Home/End), prefers-reduced-motion fallback.

