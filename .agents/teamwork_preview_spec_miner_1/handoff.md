# Technical Constraints, Bilingual Localization & A11y Specification Report

**Agent**: `spec_miner_1` (Tech Constraints & A11y Spec Miner)  
**Date**: 2026-09-06  
**Project**: Julian Barberis Developer Portfolio Redesign — Dual-Mode Project Carousel  
**Working Directory**: `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1`  
**Workspace Root**: `/Users/julianbarberis/Portfolio 2`

---

## 1. Observation

Direct observations extracted through authoritative static analysis, file inspection, and tool execution:

1. **Framework & Package Versions (`package.json`, lines 12–33)**:
   - `next`: `"16.3.3"`
   - `react`: `"19.2.8"`, `react-dom`: `"19.2.8"`
   - `framer-motion`: `"^13.1.1"` (installed version: `13.1.1`)
   - `packageManager`: `"pnpm@11.22.0"`
   - `tailwindcss`: `"^4"`, `@tailwindcss/postcss`: `"^4"` (Tailwind CSS v4)
   - `clsx`: `"^2.1.1"`, `tailwind-merge`: `"^3.6.0"`, `lucide-react`: `"^1.35.0"`
   - `eslint`: `"^9"`, `eslint-config-next`: `"16.3.3"`, `typescript`: `"^5"`

2. **Next.js 16 Breaking Changes & AGENTS.md (`AGENTS.md`, `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`)**:
   - `next lint` CLI command was removed in Next.js 16 (`version-16.md` line 1083). Linting is executed via direct ESLint CLI (`"lint": "eslint"` in `package.json` with flat config `eslint.config.mjs`). `next build` does **not** run linting automatically.
   - Turbopack is stable and active by default for both `next dev` and `next build` (confirmed by build output: `▲ Next.js 16.3.3 (Turbopack)`).
   - Async request APIs (`cookies`, `headers`, `params`, `searchParams`) have synchronous access completely removed in Next.js 16.
   - React 19.2: Function components support direct `ref` prop (no mandatory `forwardRef`).
   - `scroll-behavior: smooth` override: Next.js 16 no longer overrides CSS smooth scrolling during route transitions by default (`version-16.md` line 961).

3. **Build Target & Rendering Model (`next.config.ts`, lines 7–15)**:
   - `output: "export"`: Static HTML export architecture targeting GitHub Pages.
   - `images: { unoptimized: true }`, `trailingSlash: true`, `reactStrictMode: true`.
   - In static export, pre-rendering occurs in a Node worker at build time. Dynamic client state must have strict `"use client"` boundaries and must not read browser globals (`window`, `localStorage`, viewport width) during initial render to prevent SSR hydration mismatches.

4. **Pre-existing Lint Failure (`pnpm run lint`)**:
   - `pnpm run lint` failed with exit code 1:
     - `/Users/julianbarberis/Portfolio 2/src/components/Projects.tsx:60:18` and `60:49`: `error: "` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;` (`react/no-unescaped-entities`).
     - Line 60 verbatim: `&gt; "Top 5 clientes con más órdenes"`.
     - 19 additional unused variable warnings across `About.tsx`, `Contact.tsx`, `Experience.tsx`, `Footer.tsx`, `Hero.tsx`, `Projects.tsx`, `ThemeContext.tsx`.

5. **Existing Bilingual Architecture (`src/context/LanguageContext.tsx`, lines 3–88)**:
   - Types: `Language = "en" | "es"`, `LocalizedString = { en: string; es: string }`, `LocalizedArray = { en: string[]; es: string[] }`.
   - Uses `useSyncExternalStore` for client language subscription with server fallback snapshot `"es"`.
   - Hook: `const { language, setLanguage, toggleLanguage, t, tArr } = useLanguage();`.
   - Existing project cards in `src/components/Projects.tsx` use `t(project.tagline)` and inline ternaries `language === "es" ? "..." : "..."`.

6. **Accessibility & Color Contrast Calculations (WCAG 2.1 AA Analysis)**:
   - Dark mode background: `--bg-primary: #05060d;`, composite dark glass `--glass-bg: rgba(18, 22, 43, 0.55)` over `#05060d` yields effective background `#0c0f1e`.
   - Evaluated contrast against dark glass (`#0c0f1e`):
     - `--text-primary (#fbfef9)`: **18.72:1** (PASS AA / AAA)
     - `--text-secondary (#d4dce8)`: **13.79:1** (PASS AA / AAA)
     - `--text-muted (#a8b8cc)`: **9.43:1** (PASS AA / AAA)
     - Deep pink accent (`#f8559f`): **6.16:1** (PASS AA normal text >= 4.5:1)
     - Light blue accent (`#93c5fd`): **10.56:1** (PASS AA >= 4.5:1)
     - Cyan accent (`#06b6d4`): **7.84:1** (PASS AA >= 4.5:1)
     - Ocean twilight indigo (`#3744bd`): **2.47:1** (💥 **FAILS WCAG AA** < 4.5:1 for body text)
     - Focus ring (`focus-visible:ring-[#f8559f]`): **6.16:1** (PASS Non-text contrast >= 3.0:1)

7. **Project Data & Category Inventory (`src/data/portfolioData.ts`, lines 334–448)**:
   - 3 projects:
     1. `booklibre` (Category: `"Full-Stack"`, Status: `"coming_soon"`)
     2. `sqlify` (Category: `"AI"`, Status: `"coming_soon"`)
     3. `portfolio-gta6` (Category: `"Frontend"`, Status: `"live"`)
   - Categories declared in `Projects.tsx`: `["All", "Full-Stack", "Backend", "Frontend", "AI"]`.
   - Critical inventory gap: `"Backend"` currently contains **0 projects** (`filteredProjects.length === 0`).

---

## 2. Logic Chain

1. **Static Export & Hydration Safety**:
   - *Premise*: Next.js is configured with `output: "export"`.
   - *Observation*: The build command generates static HTML at build time (`out/index.html`).
   - *Inference*: Any interactive carousel component must have `"use client"` at the top. The initial state (`mode: "fluid"`, `currentIndex: 0`) must render deterministically during static prerendering. Reading `localStorage` or `window.innerWidth` synchronously during initial render causes hydration mismatch errors in React 19.
   - *Action*: Viewport-dependent bounds and gesture math must be measured in `useEffect` or via Framer Motion refs, never in top-level state.

2. **Contrast & Color Safety**:
   - *Premise*: Vice City Sunset palette relies on deep pink (`#f8559f`) and ocean twilight indigo (`#3744bd`).
   - *Observation*: Contrast calculation shows `#3744bd` against dark glass (`#0c0f1e`) produces 2.47:1, violating WCAG AA (4.5:1 min for body text). In contrast, `#93c5fd` produces 10.56:1 and `#7080ff` produces 5.64:1.
   - *Inference*: `#3744bd` must never be used for raw text on dark surfaces without the `dark:text-[#93c5fd]` or `dark:text-[#7080ff]` variant. Active category pills in dark mode must use white text (`text-white`) over `bg-[#3744bd]` (which achieves 7.58:1 contrast).

3. **Motion Intensity & Accessibility**:
   - *Premise*: The carousel introduces 3D perspective rotation (`rotateY`) and spring gestures.
   - *Observation*: `prefers-reduced-motion: reduce` is configured globally in `src/app/globals.css` (lines 193–206).
   - *Inference*: Framer Motion's `useReducedMotion()` must be queried. When reduced motion is requested, `rotateY`, scale bouncing (`scale-105`), and continuous spring oscillations must be disabled, falling back to clean opacity fades or instant transitions with standard button/dot navigation remaining fully functional.

4. **Zero-Project Category Handling**:
   - *Premise*: Filtering by `"Backend"` results in an empty array `[]`.
   - *Observation*: If the carousel assumes `filteredProjects[currentIndex]` is always defined, selecting "Backend" causes a runtime TypeError (`Cannot read properties of undefined`). Furthermore, switching from category "All" (where `currentIndex` could be 2) to "Full-Stack" (which has only 1 item) will cause out-of-bounds indexing if `currentIndex` is not clamped.
   - *Inference*: The carousel must reset or clamp `currentIndex = Math.min(currentIndex, Math.max(0, filteredProjects.length - 1))` on category change and provide an accessible empty state when `filteredProjects.length === 0`.

5. **Build & Lint Acceptance Gate**:
   - *Premise*: Acceptance criteria require `pnpm run build` with zero TypeScript and ESLint errors.
   - *Observation*: `pnpm run lint` fails on `src/components/Projects.tsx:60` due to unescaped quotes.
   - *Inference*: The refactored carousel component in `Projects.tsx` must escape JSX quotes as `&quot;` in the `sqlify` visual header and prune unused imports (`Sparkles`, `Terminal`, `Database`, `Layout`).

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Runtime | Static HTML Export | Complete client-side pre-rendering with zero Node server runtime | `next build` with `output: "export"` | Static assets in `out/` | Fails if server-only APIs are invoked | `next.config.ts:8` |
| 2 | Runtime | Turbopack Engine | Default build and dev compiler in Next.js 16 | `next build` / `next dev` | Fast incremental bundles | Incompatible with custom Webpack plugins without `--webpack` | `node_modules/next/dist/docs/.../version-16.md:126` |
| 3 | Runtime | ESLint Flat Config Migration | Direct ESLint CLI execution (`eslint.config.mjs`) | `pnpm run lint` | ESLint report & exit code | Exits code 1 on unescaped entities or lint errors | `package.json:10`, `eslint.config.mjs` |
| 4 | Carousel | Dual Presentation Modes | Switchable presentation between "Modo Fluido" and "Modo Coverflow 3D" | Mode state: `"fluid"` \| `"coverflow"` | Dynamic card layout & motion physics | Preserves active index across mode switches | `ORIGINAL_REQUEST.md:14-19` |
| 5 | Carousel | Mode Switcher Control | Apple Glass segmented toggle in section header with ARIA radiogroup | User click / keyboard selection | Mode switch + live announcement | Accessible radio keyboard navigation | `ORIGINAL_REQUEST.md:18`, `Navbar.tsx:69-94` |
| 6 | Carousel | Fluid Drag & Snap Track | Magnetic horizontal swipe with spring physics (`stiffness: 200, damping: 25`) | Pointer drag, touch swipe, velocity | Snaps to nearest slide card | Clamped to track boundaries | `ORIGINAL_REQUEST.md:16, 25` |
| 7 | Carousel | 3D Coverflow Perspective | Depth perspective with `rotateY(±35deg)`, `scale(1.05)` active, ambient blur | Active index, slide offset | Centered 3D carousel presentation | Offscreen cards hidden/inert | `ORIGINAL_REQUEST.md:17` |
| 8 | Carousel | Arrow Navigation Controls | Next/Previous circular Apple Glass buttons with hover glow | Click, Enter/Space key | Steps `currentIndex` ±1 | Disabled / hidden at boundary (if not looped) | `ORIGINAL_REQUEST.md:16, 19` |
| 9 | Carousel | Interactive Pagination Dots | Dot indicators reflecting active slide with direct navigation | Click on dot, Arrow keys | Jumps to specific slide index | Active dot visually highlighted (`bg-[#f8559f]`) | `ORIGINAL_REQUEST.md:16, 41` |
| 10 | Carousel | Keyboard Navigation | ARIA APG compliant keyboard navigation | `ArrowLeft`, `ArrowRight`, `Home`, `End` | Updates slide index | Ignored when focus is inside modal | W3C WAI-ARIA APG Carousel Spec |
| 11 | Carousel | Screen Reader Live Region | Accessible announcements of slide changes and mode switches | Slide index change, mode change | `aria-live="polite"` text announcement | Suppressed for silent/rapid transitions | W3C WAI-ARIA APG Carousel Spec |
| 12 | Architecture | Project Visual Headers | Tailored code and architecture headers for projects | `project.id` (`booklibre`, `sqlify`, `portfolio-gta6`) | Rendered visual code preview banner | Default fallback to Vice City architecture card | `src/components/Projects.tsx:12-113` |
| 13 | Architecture | Category Filtering & Dynamic Count | Filter tabs ("All", "Full-Stack", "Backend", "Frontend", "AI") | Category click | Re-filters project list, resets/clamps index | Renders empty state if count === 0 | `src/components/Projects.tsx:123-126` |
| 14 | Architecture | ProjectModal Integration | Modal overlay showing deep architecture highlights, roadmap, and links | Click on "Detalles" / "Details" | Modal dialog with trap focus & Esc key | Graceful close on `Escape` or backdrop click | `src/components/ProjectModal.tsx` |
| 15 | Localization | Bilingual Context (`t()`) | Full Spanish/English localization via `LanguageContext` | `LocalizedString = { en, es }` | Current language string | Falls back to `en` if `es` missing | `src/context/LanguageContext.tsx` |
| 16 | A11y | Visible Focus Indicators | Global focus rings on all interactive elements | Keyboard `Tab` navigation | `focus-visible:ring-2 focus-visible:ring-[#f8559f]` | Never `outline: none` without ring | `src/app/globals.css:63-68` |
| 17 | A11y | Prefers Reduced Motion | Graceful motion suppression for vestibular safety | `prefers-reduced-motion: reduce` | Flattens 3D rotations, eliminates springs | Zero layout disruption | `src/app/globals.css:192-206` |

---

## 4. Edge Cases

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---------|-------------------|------------------------------|
| 1 | Category Filter | User selects "Backend" category (0 items) | `filteredProjects.length === 0`. Carousel must not throw undefined error. Render an elegant empty state: "No projects found in this category" / "No se encontraron proyectos en esta categoría". |
| 2 | Category Filter | Switching category while `currentIndex = 2` | If new category has 1 item, index 2 is out of bounds. Must clamp: `setCurrentIndex((prev) => Math.min(prev, Math.max(0, newProjects.length - 1)))`. |
| 3 | Single Item List | Category has exactly 1 project | Next/Prev buttons disabled or hidden; pagination dots single or hidden; drag gesture disabled to prevent track oscillation. |
| 4 | Mode Switch | User switches from Fluid to 3D Coverflow on slide index 1 | `currentIndex` must be preserved. Card at index 1 becomes the centered 3D focal card without resetting to index 0. |
| 5 | Touch Swipe on Track | Quick flick with high velocity (> 500 px/s) vs small drag (< 50 px) | Elastic drag bounds (`dragElastic: 0.2`). Advance slide if drag offset > 50px OR swipe velocity > 500 px/s; snap back if below threshold. |
| 6 | SSR Hydration | Initial page load in static export (`out/`) | Mode and initial slide must default deterministically (`"fluid"`, `0`). Never read `window.innerWidth` in initial render state; measure dimensions inside `useEffect` or `ResizeObserver`. |
| 7 | Reduced Motion | OS setting `prefers-reduced-motion: reduce` enabled | `rotateY` 3D rotation must be clamped to 0deg; spring transitions replaced with instant or subtle 150ms opacity transition; pagination dots and arrows remain fully operative. |
| 8 | Screen Reader Focus | Inactive / blurred side cards in 3D Coverflow | Side cards have `opacity: 0.6` and `filter: blur(1px)`. Interactive elements in inactive side cards should have `tabIndex={-1}` or `aria-hidden="true"` so screen reader focus is not trapped in background cards. Only active card has `tabIndex={0}`. |
| 9 | Color Contrast | Ocean twilight indigo (`#3744bd`) text on dark glass | Contrast is only 2.47:1 (FAILS AA). Must always pair with `dark:text-[#93c5fd]` (10.56:1) or `dark:text-[#7080ff]` (5.64:1) for text. |
| 10 | JSX Text Quotes | Raw quotes in JSX: `> "Top 5 clientes..."` in `ProjectVisualHeader` | Triggers ESLint `react/no-unescaped-entities` error. Must be escaped as `&quot;Top 5 clientes con más órdenes&quot;`. |
| 11 | Modal Navigation | User opens `ProjectModal` while carousel is mounted | Carousel keyboard listeners (`ArrowLeft`/`ArrowRight`) must be deactivated or ignored while modal is open, allowing `Escape` to close modal. |

---

## 5. Technical Constraints & Framework Rules

### 5.1 Next.js 16.3.3 & AGENTS.md Compliance
1. **Static Export (`output: "export"`)**:
   - The project is deployed as static HTML/CSS/JS (GitHub Pages).
   - No server-side runtime (`getServerSideProps`, dynamic Node headers, dynamic cookies) can be used.
   - All interactive components are client-rendered after static hydration.
2. **Turbopack Compiler**:
   - `next build` runs Turbopack by default.
   - Module resolution follows `tsconfig.json` paths (`@/*` -> `./src/*`).
   - Image optimization uses unoptimized static loader (`images: { unoptimized: true }`).
3. **ESLint CLI Execution**:
   - `next lint` is deprecated and removed in Next.js 16.
   - Project uses `package.json: "lint": "eslint"` with flat configuration `eslint.config.mjs`.
   - Build command `next build` does **not** run ESLint; verification requires running both `pnpm run lint` and `pnpm run build`.

### 5.2 React 19.2.8 Conventions
1. **Ref Passing**: Direct `ref` prop is standard on React 19 function components.
2. **Client Boundaries**:
   - Any file using `useState`, `useEffect`, `useRef`, `useSyncExternalStore`, or importing `motion` from `framer-motion` must declare `"use client";` as the first line.
3. **SSR Hydration Defense**:
   - Zero difference between server-rendered HTML and client initial mount.
   - Do not conditionally render JSX based on `typeof window !== "undefined"`.
   - Initialize state with static constants:
     ```tsx
     const [mode, setMode] = useState<"fluid" | "coverflow">("fluid");
     const [currentIndex, setCurrentIndex] = useState<number>(0);
     ```

### 5.3 Framer Motion 13.1.1 Physics Specification
Per `ORIGINAL_REQUEST.md` R2, motion configurations must adhere to:
```tsx
export const CAROUSEL_SPRING_TRANSITION = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 1,
} as const;

export const REDUCED_MOTION_TRANSITION = {
  duration: 0.15,
  ease: "easeOut",
} as const;
```

---

## 6. Bilingual Localization Specification (EN / ES)

The following translation keys are required for the carousel component. They should be integrated cleanly via `useLanguage()`:

### Complete Bilingual Key Matrix
```tsx
export const CAROUSEL_TRANSLATIONS = {
  sectionBadge: {
    en: "Projects",
    es: "Proyectos",
  },
  sectionTitle: {
    en: "Featured Projects",
    es: "Proyectos Destacados",
  },
  modeToggleLabel: {
    en: "Presentation mode",
    es: "Modo de presentación",
  },
  modeFluid: {
    en: "Fluid",
    es: "Fluido",
  },
  modeCoverflow: {
    en: "3D Coverflow",
    es: "Coverflow 3D",
  },
  prevButtonLabel: {
    en: "Previous project",
    es: "Proyecto anterior",
  },
  nextButtonLabel: {
    en: "Next project",
    es: "Siguiente proyecto",
  },
  paginationLabel: {
    en: "Projects pagination",
    es: "Paginación de proyectos",
  },
  goToProjectLabel: {
    en: "Go to project {index}: {title}",
    es: "Ir al proyecto {index}: {title}",
  },
  projectCounter: {
    en: "Project {current} of {total}",
    es: "Proyecto {current} de {total}",
  },
  dragHint: {
    en: "Swipe or use arrow keys to navigate",
    es: "Desliza o usa las flechas para navegar",
  },
  statusLive: {
    en: "Live",
    es: "En Producción",
  },
  statusDeploying: {
    en: "Deploying",
    es: "Deploy Próximo",
  },
  detailsButton: {
    en: "Details",
    es: "Detalles",
  },
  demoButton: {
    en: "Demo",
    es: "Demo",
  },
  emptyCategoryTitle: {
    en: "No projects in this category",
    es: "No hay proyectos en esta categoría",
  },
  emptyCategoryDescription: {
    en: "New projects are currently in development. Select another category above.",
    es: "Nuevos proyectos están actualmente en desarrollo. Selecciona otra categoría arriba.",
  },
  announcements: {
    modeSwitchedFluid: {
      en: "Presentation mode switched to Fluid drag and snap.",
      es: "Modo de presentación cambiado a Fluido.",
    },
    modeSwitchedCoverflow: {
      en: "Presentation mode switched to 3D Coverflow.",
      es: "Modo de presentación cambiado a Coverflow 3D.",
    },
    slideChanged: {
      en: "Showing project {current} of {total}: {title}",
      es: "Mostrando proyecto {current} de {total}: {title}",
    },
  },
} as const;
```

---

## 7. Accessibility (a11y) & WCAG AA Matrix

### 7.1 Contrast Verification (Dark Glass `#0c0f1e` baseline)

| UI Element | Hex / Token | Computed Contrast Ratio | WCAG 2.1 AA Compliance | Mitigation / Required Class |
|------------|-------------|-------------------------|------------------------|-----------------------------|
| Primary Text | `#fbfef9` (`--text-primary`) | 18.72:1 | PASS (AAA) | Standard `text-[var(--text-primary)]` |
| Secondary Text | `#d4dce8` (`--text-secondary`) | 13.79:1 | PASS (AAA) | Standard `text-[var(--text-secondary)]` |
| Muted Labels / Year | `#a8b8cc` (`--text-muted`) | 9.43:1 | PASS (AAA) | Standard `text-[var(--text-muted)]` |
| Neon Pink Accent | `#f8559f` (`--deep-pink`) | 6.16:1 | PASS (AA >= 4.5:1) | Text, icons, category pills |
| Indigo Ocean Twilight | `#3744bd` (`--ocean-twilight`) | **2.47:1** | 💥 **FAIL (< 4.5:1)** | **MUST USE** `text-[#3744bd] dark:text-[#93c5fd]` |
| Blue Accent (Dark) | `#93c5fd` | 10.56:1 | PASS (AAA) | Safe replacement for dark mode text |
| Cyan Accent | `#06b6d4` | 7.84:1 | PASS (AAA) | Gemini AI and NL2SQL badges |
| Emerald Status | `#34d399` (`emerald-400`) | 9.91:1 | PASS (AAA) | "Live" / "Static" status badges |
| Focus Indicator | `#f8559f` | 6.16:1 | PASS (UI >= 3.0:1) | `focus-visible:ring-2 focus-visible:ring-[#f8559f]` |
| Demo Button Text | White on `#f8559f` | 3.09:1 | PASS (Large/UI >= 3.0:1) | Requires `font-bold text-xs` |

### 7.2 W3C APG ARIA Markup Contract
```tsx
{/* 1. Carousel Outer Region */}
<section
  id="projects"
  role="region"
  aria-roledescription="carousel"
  aria-label={language === "es" ? "Proyectos Destacados" : "Featured Projects"}
  tabIndex={0}
  onKeyDown={handleKeyDown}
  className="py-20 relative outline-none"
>
  {/* 2. Mode Toggle (Segmented Radiogroup) */}
  <div
    role="radiogroup"
    aria-label={language === "es" ? "Modo de presentación" : "Presentation mode"}
    className="inline-flex items-center p-1 rounded-full apple-glass border border-white/10"
  >
    <button
      role="radio"
      aria-checked={mode === "fluid"}
      onClick={() => setMode("fluid")}
      className="px-3 py-1 rounded-full text-xs font-semibold focus-visible:ring-2 focus-visible:ring-[#f8559f]"
    >
      {language === "es" ? "Fluido" : "Fluid"}
    </button>
    <button
      role="radio"
      aria-checked={mode === "coverflow"}
      onClick={() => setMode("coverflow")}
      className="px-3 py-1 rounded-full text-xs font-semibold focus-visible:ring-2 focus-visible:ring-[#f8559f]"
    >
      {language === "es" ? "Coverflow 3D" : "3D Coverflow"}
    </button>
  </div>

  {/* 3. Screen Reader Live Announcements */}
  <div className="sr-only" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  {/* 4. Slides Track */}
  <div
    id="project-carousel-track"
    className="relative overflow-hidden"
  >
    {filteredProjects.map((project, idx) => {
      const isActive = idx === currentIndex;
      return (
        <article
          key={project.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${idx + 1} of ${filteredProjects.length}: ${project.title}`}
          aria-hidden={!isActive}
          className="apple-glass-card rounded-3xl p-5 ..."
        >
          {/* Active slide card content with interactive buttons (tabIndex={isActive ? 0 : -1}) */}
        </article>
      );
    })}
  </div>

  {/* 5. Pagination Dot Indicators */}
  <div
    role="tablist"
    aria-label={language === "es" ? "Paginación de proyectos" : "Projects pagination"}
    className="flex items-center justify-center gap-2"
  >
    {filteredProjects.map((project, idx) => (
      <button
        key={project.id}
        role="tab"
        aria-selected={idx === currentIndex}
        aria-label={`${language === "es" ? "Ir al proyecto" : "Go to project"} ${idx + 1}: ${project.title}`}
        onClick={() => setCurrentIndex(idx)}
        className="w-2.5 h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#f8559f] ..."
      />
    ))}
  </div>
</section>
```

### 7.3 Keyboard Navigation Contract
- **`ArrowLeft`**: Moves to previous slide (`currentIndex - 1`). If `currentIndex === 0`, stops or wraps smoothly.
- **`ArrowRight`**: Moves to next slide (`currentIndex + 1`). If `currentIndex === total - 1`, stops or wraps smoothly.
- **`Home`**: Navigates directly to first slide (`0`).
- **`End`**: Navigates directly to last slide (`total - 1`).
- **`Tab`**: Enters slide controls, then active slide action links (GitHub, Details/Demo), then pagination dots. Inactive/blurred side cards must have `tabIndex={-1}` on interactive children to prevent keyboard traps.

---

## 8. Verification Commands & Acceptance Criteria Checklist

### 8.1 Verification Commands
All three verification commands must execute cleanly in `/Users/julianbarberis/Portfolio 2`:

1. **TypeScript Typecheck**:
   ```bash
   pnpm exec tsc --noEmit
   ```
   *Expectation*: Exit code 0, 0 diagnostic errors.

2. **ESLint Code Quality**:
   ```bash
   pnpm run lint
   ```
   *Expectation*: Exit code 0, 0 errors. (Pre-existing `react/no-unescaped-entities` in `Projects.tsx:60` must be resolved).

3. **Production Static Build**:
   ```bash
   pnpm run build
   ```
   *Expectation*: Exit code 0, static pages successfully compiled with Turbopack into `out/`.

### 8.2 Acceptance Criteria Checklist (Mapped to R1, R2, R3)

#### R1. Dual-Mode Carousel & Interaction
- [ ] Users can toggle between "Fluido" and "Coverflow 3D" modes with instant, fluid visual updates.
- [ ] Active project index is preserved when toggling between presentation modes.
- [ ] Fluid mode supports magnetic horizontal drag and swipe with spring physics (`stiffness: 200, damping: 25`).
- [ ] 3D Coverflow mode displays centered active card (`scale: 1.05`, `rotateY: 0deg`) and angled side cards (`scale: 0.90`, `rotateY: ±35deg`, `opacity: 0.65`, `blur: 1px`).
- [ ] Next and Previous arrow buttons navigate slides smoothly with disabled states at boundaries.
- [ ] Pagination dots accurately reflect `currentIndex` and allow direct slide jumping.
- [ ] Category filter updates project count dynamically; clamps `currentIndex` to prevent out-of-bounds errors.
- [ ] Category filter renders an accessible empty state when category has 0 projects (e.g. "Backend").

#### R2. Design Taste & Impeccable Craft Standards
- [ ] Conforms to "Vice City Sunset + Apple Glass" design language (`#f8559f`, `#3744bd`, dark glass `apple-glass-card`).
- [ ] No generic AI purple gradients; specular `border-white/10` and multi-layer backdrop blur maintained.
- [ ] Tactile feedback on buttons (`:active` scales `scale-[0.98]` or `-translate-y-[1px]`).
- [ ] Contrast meets WCAG AA: all dark mode text over dark glass meets >= 4.5:1; `#3744bd` paired with `dark:text-[#93c5fd]`.
- [ ] Visible focus rings on all interactive elements (`focus-visible:ring-2 focus-visible:ring-[#f8559f]`).
- [ ] Motion honors `prefers-reduced-motion: reduce` with non-animated fallback.

#### R3. Architecture & Modal Integration
- [ ] Custom visual code headers preserved for all projects:
  - `BookLibre`: Kotlin DDD snippet (`BookLibre.kt`, `val karma`, Spring Boot, PostgreSQL).
  - `SQLify`: Gemini AI NL2SQL snippet (`prompt_to_sql.ai`, `NL2SQL`, TypeScript, MySQL).
  - `Vice City Portfolio`: Apple Glass & CI/CD architecture indicators.
- [ ] Full bilingual support in both Spanish and English using `LanguageContext` (`t()`).
- [ ] Clicking "Detalles" / "Details" opens `ProjectModal` with complete project data.
- [ ] GitHub and Demo external links preserve `target="_blank" rel="noopener noreferrer"`.
- [ ] Zero SSR hydration mismatches during static export and client mount.

---

## 9. Caveats

1. **Backend Category Inventory**: Currently, `src/data/portfolioData.ts` has 3 projects across "Full-Stack", "Frontend", and "AI". The "Backend" category returns 0 projects. The carousel MUST gracefully display the specified empty state when "Backend" is selected.
2. **ESLint Scope**: The repository currently contains 19 unused variable warnings across other components (`About.tsx`, `Hero.tsx`, `Footer.tsx`). While `pnpm run lint` will succeed once the two `no-unescaped-entities` errors in `Projects.tsx` are fixed, future maintenance should consider pruning unused imports repository-wide.
3. **Reduced Motion Simulation**: In testing environments without physical displays, `prefers-reduced-motion` can be verified by injecting `window.matchMedia('(prefers-reduced-motion: reduce)')` mock or testing CSS media query behavior.

---

## 10. Conclusion

The Julian Barberis Portfolio repository is primed for the dual-mode project carousel upgrade. The technical foundation (Next.js 16.3.3 Turbopack, React 19.2.8, Framer Motion 13.1.1, Tailwind CSS v4) fully supports both Fluid Drag and 3D Coverflow modes under a static export architecture. Adhering strictly to the contrast fixes (replacing unstyled `#3744bd` text in dark mode with `dark:text-[#93c5fd]`), ARIA APG carousel roles, deterministic client state boundaries, and bilingual dictionary keys defined in this report will ensure a flawless, anti-slop, accessible implementation.

---

## 11. Verification Method

To independently verify this specification report:

1. **Verify Next.js and React versions**:
   ```bash
   pnpm list next react framer-motion tailwindcss
   ```
2. **Inspect AGENTS.md and Upgrading Docs**:
   ```bash
   cat AGENTS.md
   head -n 40 "node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md"
   ```
3. **Reproduce Existing Lint Error**:
   ```bash
   pnpm run lint
   ```
   Confirm failure at `src/components/Projects.tsx:60`.
4. **Run Production Build**:
   ```bash
   pnpm run build
   ```
   Confirm static pages generated in `out/` with zero runtime errors.
5. **Inspect Color Contrast**:
   Execute the contrast verification script in python or via browser devtools to verify `#3744bd` (2.47:1) vs `#93c5fd` (10.56:1).
