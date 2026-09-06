# Architectural Handoff Report: Projects Section & Component Hierarchy

**Agent**: `explorer_1` (Codebase Architecture Explorer)  
**Date**: 2026-09-06T01:56:00Z  
**Target Path**: `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_1/handoff.md`  
**Workspace Root**: `/Users/julianbarberis/Portfolio 2`

---

## 1. Observation

Directly observed facts from the filesystem, source code inspection, and command executions:

### 1.1 Package Dependencies & Environment (`package.json`)
- **Framework & Runtime**:
  - `next`: `16.3.3` (`Turbopack` enabled, static export `output: "export"`)
  - `react`: `19.2.8`
  - `react-dom`: `19.2.8`
  - `typescript`: `^5`
- **Animation & UI Packages**:
  - `framer-motion`: `^13.1.1` (installed version `13.1.1` confirmed in `node_modules/framer-motion/package.json`, currently **0** imports in `src/`)
  - `lucide-react`: `^1.35.0`
  - `react-icons`: `^5.7.0` (provides `SiKotlin`, `SiSpringboot`, `SiNextdotjs`, `SiMysql`, `SiGoogle`, `TbSql`, `TbFileCheck`, etc.)
  - `tailwindcss`: `^4` with `@tailwindcss/postcss: ^4` (Tailwind CSS v4 with `@import "tailwindcss";` in `src/app/globals.css`)
  - `clsx`: `^2.1.1` & `tailwind-merge`: `^3.6.0` (helper available at `src/lib/utils.ts:4` `export function cn(...)`)
  - `canvas-confetti`: `^1.9.4`
- **Build & Lint Results**:
  - Command: `pnpm run build`
    - Result: Exit code `0` (Compiled in 134ms, static export completed cleanly).
  - Command: `pnpm run lint`
    - Result: Exit code `1` (2 errors, 19 warnings).
    - Errors located in `src/components/Projects.tsx`:
      - Line 60: `error \`"\` can be escaped with \`&quot;\`, \`&ldquo;\`, \`&#34;\`, \`&rdquo;\` react/no-unescaped-entities` on `> "Top 5 clientes con más órdenes"`
      - Line 9: unused imports `Sparkles`, `Terminal`, `Database`, `Layout` from `lucide-react`.

---

### 1.2 Current File Structure & Component Hierarchy
- `src/app/page.tsx`:
  - Mounts `<Projects />` at line 28 between `<Education />` (line 27) and `<Contact />` (line 29).
  - Client component (`"use client"`).
- `src/components/Projects.tsx` (267 lines):
  - Line 12–113: Internal component `ProjectVisualHeader({ project }: { project: ProjectItem })`.
  - Line 115–266: Main `Projects()` component.
  - Line 120: Data source: `const projects = portfolioData.projects;` from `@/data/portfolioData`.
  - Line 121: Categories array: `const categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"];`.
  - Line 123–126: Category filtering logic:
    ```tsx
    const filteredProjects = projects.filter((proj) => {
      if (activeCategory === "All") return true;
      return proj.category === activeCategory;
    });
    ```
  - Line 164: Static grid container:
    ```tsx
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    ```
  - Line 260–263: ProjectModal anchor:
    ```tsx
    <ProjectModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
    />
    ```
- `src/components/ProjectModal.tsx` (169 lines):
  - Accessible modal dialog triggered when `selectedProject !== null`.
  - Backdrop blur: `bg-black/60 backdrop-blur-xl`.
  - Container: `relative w-full max-w-2xl apple-glass rounded-3xl p-6 sm:p-7 space-y-5 max-h-[88vh] overflow-y-auto`.
  - Closes on Escape key or backdrop click or close button.
- `src/components/TechIcon.tsx` (162 lines):
  - Resolves technology strings (e.g. `"Kotlin"`, `"Spring Boot"`, `"Gemini AI API"`, `"MySQL"`, `"Next.js"`) to colored brand icons with fallback to `Code2`.
- `src/components/icons/SocialIcons.tsx` (39 lines):
  - Exports `GitHubIcon` and `LinkedInIcon`.

---

### 1.3 Data Model & Structure (`src/data/types.ts` & `src/data/portfolioData.ts`)
- Interface `ProjectItem` (`src/data/types.ts:50-65`):
  ```typescript
  export type Language = "en" | "es";

  export interface LocalizedString {
    en: string;
    es: string;
  }

  export interface LocalizedArray {
    en: string[];
    es: string[];
  }

  export interface ProjectItem {
    id: string;
    title: string;
    tagline: LocalizedString;
    description: LocalizedString;
    year: string;
    featured: boolean;
    status: "live" | "coming_soon" | "in_development";
    demoUrl?: string;
    githubUrl: string;
    technologies: string[];
    architectureHighlights: LocalizedArray;
    roadmap?: LocalizedArray;
    image?: string;
    category: "Full-Stack" | "Backend" | "Frontend" | "AI";
  }
  ```
- Concrete Projects in `src/data/portfolioData.ts:334-448`:
  1. **`booklibre`**:
     - `title`: `"BookLibre"`
     - `category`: `"Full-Stack"`
     - `year`: `"2026"`, `status`: `"coming_soon"`, `featured`: `true`
     - `demoUrl`: `undefined`, `githubUrl`: `"https://github.com/jbarberis"`
     - `technologies`: `["Kotlin", "Spring Boot", "React", "PostgreSQL", "Flyway", "Docker", "JWT"]`
     - Has `architectureHighlights` and `roadmap`.
  2. **`sqlify`**:
     - `title`: `"SQLify"`
     - `category`: `"AI"`
     - `year`: `"2025"`, `status`: `"coming_soon"`, `featured`: `true`
     - `demoUrl`: `undefined`, `githubUrl`: `"https://github.com/jbarberis"`
     - `technologies`: `["React", "TypeScript", "Node.js", "Express", "Gemini AI", "MySQL"]`
     - Has `architectureHighlights` and `roadmap`.
  3. **`portfolio-gta6`**:
     - `title`: `"Vice City Portfolio"`
     - `category`: `"Frontend"`
     - `year`: `"2026"`, `status`: `"live"`, `featured`: `true`
     - `demoUrl`: `"https://jbarberis.github.io/portfolio/"`, `githubUrl`: `"https://github.com/jbarberis"`
     - `technologies`: `["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Apple Glass", "i18n"]`
     - Has `architectureHighlights` (no `roadmap`).
- **Category Taxonomy Observation**:
  - Filter options rendered: `["All", "Full-Stack", "Backend", "Frontend", "AI"]`.
  - Current project categories: `"Full-Stack"` (1), `"AI"` (1), `"Frontend"` (1).
  - Note: There are currently **0** projects with category `"Backend"`. Selecting `"Backend"` yields an empty list.

---

### 1.4 Custom Visual Code Headers (`src/components/Projects.tsx:12-113`)
Implemented in `ProjectVisualHeader`:
1. **BookLibre** (`project.id === "booklibre"`):
   - Shell: `h-28 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative group-hover:border-[#f8559f]/40 transition-colors shadow-inner`
   - Header: `<TechIcon name="Kotlin" className="w-3.5 h-3.5" /> BookLibre.kt` + Badge `DDD CORE` (`bg-[#f8559f]/15 text-[#f8559f]`)
   - Snippet:
     - `val karma = calculateKarma(user)`
     - `@Transactional fun reserveBook(isbn)`
   - Footer: Spring Boot badge (`#6DB33F`) • PostgreSQL badge (`#4169E1`)
2. **SQLify** (`project.id === "sqlify"`):
   - Shell: same shell, `group-hover:border-[#06B6D4]/40`
   - Header: `<TechIcon name="Gemini AI API" className="w-3.5 h-3.5" /> prompt_to_sql.ai` + Badge `NL2SQL` (`bg-cyan-500/15 text-cyan-400`)
   - Snippet:
     - `> "Top 5 clientes con más órdenes"` (needs unescaped quote fix)
     - `SELECT name, COUNT(*) FROM orders...` (`text-cyan-300 font-semibold`)
   - Footer: TypeScript badge (`#3178C6`) • MySQL badge (`#4479A1`)
3. **Vice City Portfolio** (Default fallback):
   - Shell: same shell, `group-hover:border-[#f8559f]/40`
   - Header: `<TechIcon name="Next.js" className="w-3.5 h-3.5" /> vice_city.glass` + Badge `STATIC` with pulsing green dot
   - Snippet:
     - Badges: `GTA VI Sunset` (`bg-[#f8559f]/20 text-[#f8559f]`) & `Apple Glass`
     - Text: `0 useEffect • Turbopack Optimized`
   - Footer: Tailwind badge (`#06B6D4`) + `GitHub Pages CI/CD`

---

### 1.5 ProjectModal Integration
- Props:
  ```typescript
  interface ProjectModalProps {
    project: ProjectItem | null;
    onClose: () => void;
  }
  ```
- Current invocation in `Projects.tsx`:
  - `const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);`
  - In card footer:
    - If `isLive && project.demoUrl`: shows "Demo" link to `project.demoUrl`.
    - Else: button shows `<Rocket className="w-3 h-3 text-[#f8559f]" /> Detalles / Details` which calls `setSelectedProject(project)`.
- Modal displays:
  - Header: Category badge, year, title, tagline.
  - Body: Description (`t(project.description)`).
  - Architecture highlights: `tArr(project.architectureHighlights)`.
  - Deployment roadmap: `tArr(project.roadmap)` with status indicator.
  - Tech chips: `project.technologies`.
  - Footer actions: GitHub repo button and Demo link (or Close button).

---

### 1.6 LanguageContext & Internationalization (`src/context/LanguageContext.tsx`)
- Does NOT use an external i18n JSON file.
- Provides hook `useLanguage()` returning:
  - `language`: `"en" | "es"`
  - `t(val: LocalizedString): string`: returns `val[language] || val.en || ""`
  - `tArr(val: LocalizedArray): string[]`: returns `val[language] || val.en || []`
  - `setLanguage(lang: Language): void`
  - `toggleLanguage(): void`
- Component-level strings use inline conditional ternaries:
  - `language === "es" ? "Proyectos" : "Projects"`
  - `language === "es" ? "Todos" : "All"`
  - `language === "es" ? "En Producción" : "Live"`
  - `language === "es" ? "Detalles" : "Details"`

---

### 1.7 Styling System & Design Tokens (`src/app/globals.css`)
- **Color Tokens**:
  - Primary Accent: Neon Pink `--deep-pink: #f8559f` / `--glow-pink: rgba(248, 85, 159, 0.3)`
  - Secondary Accent: Twilight Ocean `--ocean-twilight: #3744bd` / `--glow-indigo: rgba(55, 68, 189, 0.35)`
  - Tertiary Accent: Cyan `#06B6D4`
  - Dark Mode Background: `--bg-primary: #05060d`, `--bg-secondary: #0b0e1b`
  - Light Mode Background: `--bg-primary: #f8fafc`, `--bg-secondary: #f1f5f9`
- **Glass Classes**:
  - `.apple-glass`: `backdrop-filter: blur(24px) saturate(190%)`, border & specular shadow
  - `.apple-glass-card`: `backdrop-filter: blur(20px) saturate(180%)`, hover translation & glow
  - `.apple-glass-pill`: `backdrop-filter: blur(16px) saturate(180%)`
- **Typography & Gradients**:
  - `.text-gta-sunset`, `.text-gta-ocean`, `.bg-gta-gradient`, `.bg-gta-subtle`
- **Motion & Accessibility**:
  - Global `:focus-visible` ring in `#f8559f`.
  - `@media (prefers-reduced-motion: reduce)` resets animations to `0.01ms`.

---

## 2. Logic Chain

1. **Requirement Mapping**:
   - The user requested a dual-mode interactive project carousel ("Fluido" drag/snap vs "Coverflow 3D" perspective) with an Apple Glass mode switcher in the section header.
   - Observation 1.1 confirms `framer-motion` version `13.1.1` is already installed in `node_modules` and compatible with React 19 / Next.js 16. It is the optimal library for drag gestures, magnetic spring physics, and 3D card perspective rotations (`rotateY`, `transform-style: preserve-3d`).
2. **Component Architecture Decision**:
   - Currently, `Projects.tsx` holds the entire 3-column grid directly at lines 164–256.
   - `ProjectVisualHeader` is tightly bound within `Projects.tsx` (lines 12–113).
   - To build a clean, maintainable, anti-slop dual-mode carousel, `ProjectVisualHeader` and individual card presentation should be encapsulated (or modularized into subcomponents) so both **Fluido** and **Coverflow 3D** modes can render identical project cards with mode-specific layout wrappers.
3. **Card Interaction & Modal Trigger Logic**:
   - Currently, live projects (such as `portfolio-gta6`) show a "Demo" button in the footer and lack a direct "Detalles" button, whereas non-live projects show "Detalles" (which opens `ProjectModal`).
   - In both carousel modes, users should be able to view full project architecture details for *any* project without losing the ability to click directly through to GitHub or Demo. A card-level detail trigger (or dedicated info button alongside GitHub and Demo) ensures all projects are inspectable.
4. **Category Filtering & Active Index Invariant**:
   - When filtering by category (e.g. switching from "All" [3 projects] to "AI" [1 project]), the carousel's `activeIndex` could become out of bounds if not clamped or reset.
   - If a category with 0 projects is selected (currently `"Backend"` has 0 projects), an elegant empty state or graceful indicator must be rendered so the carousel does not break.
5. **ESLint Cleanliness**:
   - Observation 1.1 reveals line 60 in `Projects.tsx` fails ESLint due to unescaped quotation marks (`"Top 5 clientes..."`). This must be fixed (`&quot;` or template string) so `pnpm run lint` passes alongside `pnpm run build`.

---

## 3. Caveats

1. **Dataset Size**: Currently, there are exactly 3 projects in `portfolioData.projects`. In Coverflow 3D mode with 3 items, `activeIndex` can be 0, 1, or 2. When a category filter like "AI" is active, only 1 card is present. The Coverflow layout must gracefully handle 1 card (centered, scale 1.0, 0deg rotation) as well as 3+ cards.
2. **SSR / Hydration Considerations**: `Projects.tsx` is already marked `"use client"`. Window width measurements for drag bounds or carousel container sizing should be mounted-safe (e.g. `useEffect` or Framer Motion's `dragConstraints={containerRef}` ref-based bounds) to prevent hydration mismatch errors.
3. **Reduced Motion**: Any 3D rotations or continuous spring animations must honor `useReducedMotion()` from `framer-motion` or the existing CSS `@media (prefers-reduced-motion: reduce)`.

---

## 4. Conclusion

The existing portfolio codebase is exceptionally well-structured, modern (React 19 + Next 16 Turbopack), and fully primed for the dual-mode interactive carousel:
- **No new dependencies are required**: `framer-motion@13.1.1`, `lucide-react`, and Tailwind CSS v4 are already installed and functional.
- **Integration Points are unambiguous**:
  1. Section Header: Add an Apple Glass segmented toggle (`Fluido` / `Fluid Drag` vs `Coverflow 3D`).
  2. Subcomponents: Reuse `ProjectVisualHeader` verbatim for `BookLibre`, `SQLify`, and `Vice City Portfolio`.
  3. Modal: Wire `ProjectModal` to `selectedProject` state; ensure all cards provide a mechanism to open it.
  4. i18n: Use `useLanguage()` with inline ternaries for new carousel UI strings (`Fluido` / `Fluid`, `Coverflow 3D`, `Desliza para explorar` / `Swipe to explore`, etc.).
  5. Filtering: Keep `categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"]`, ensure `activeIndex` resets to 0 upon category change.

---

## 5. Verification Method

To independently verify these findings:
1. **Verify Dependencies**:
   ```bash
   node -e "console.log(require('./package.json').dependencies)"
   ```
2. **Verify Build**:
   ```bash
   pnpm run build
   ```
   Must succeed with exit code `0`.
3. **Verify Lint & Target ESLint Error**:
   ```bash
   pnpm run lint
   ```
   Inspect line 60 of `src/components/Projects.tsx` to verify the unescaped quote error that needs fixing.
4. **Verify Component Files**:
   - `src/components/Projects.tsx`
   - `src/components/ProjectModal.tsx`
   - `src/data/portfolioData.ts`
   - `src/data/types.ts`
   - `src/context/LanguageContext.tsx`
