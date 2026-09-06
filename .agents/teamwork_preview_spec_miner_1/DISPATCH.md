# Task Assignment: Technical Constraints, Next.js 16 / React 19 & A11y Spec Miner

## Mission
Investigate and document all technical constraints, framework rules (Next.js 16, React 19, AGENTS.md), bilingual localization keys, accessibility (WCAG AA) requirements, and build verification criteria.

## Authoritative Inputs
- Read `/Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md` (MANDATORY: read this first).
- Read `/Users/julianbarberis/Portfolio 2/AGENTS.md` (Next.js version breaking changes rule).
- Workspace Root: `/Users/julianbarberis/Portfolio 2`
- Check `package.json`, `tsconfig.json`, `tailwind.config.*`, and Next.js setup in `node_modules/next`.

## Scope of Investigation
1. **Framework & Runtime Constraints:**
   - Verify exact Next.js and React versions from `package.json`.
   - Heed `AGENTS.md`: check if there are specific Next.js 16 / React 19 conventions or breaking changes (e.g. `'use client'` requirements, ref handling, async request APIs, SSR hydration safety).
   - Ensure components designed for client-side state / Framer Motion are properly isolated with `'use client'` without causing hydration mismatches or breaking SSR.
2. **Bilingual Translations (EN / ES):**
   - Inspect existing dictionary / translation system (`src/context/LanguageContext.tsx` or similar).
   - List all new text strings needed for the dual-mode carousel:
     - Mode toggle: "Fluido" / "Fluid", "Coverflow 3D" / "3D Coverflow"
     - Navigation controls: Previous project / Siguiente proyecto, Next project / Proyecto anterior
     - Pagination: "Go to project X" / "Ir al proyecto X", "Project X of Y" / "Proyecto X de Y"
     - Mode change announcements for screen readers: "Cambiado a modo Fluido", etc.
3. **Accessibility & WCAG Standards:**
   - Color contrast: verify that all text, badges, and controls against dark glass backgrounds meet WCAG AA (>= 4.5:1 for normal text, >= 3:1 for large text / UI controls).
   - ARIA roles and labels: `role="region"`, `aria-roledescription="carousel"`, `aria-label`, `aria-live="polite"` for active slide updates.
   - Keyboard interaction: roving tab index or visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#f8559f] focus-visible:outline-none`).
   - `prefers-reduced-motion`: query and implementation strategy.
4. **Verification & Testing Criteria:**
   - Document exact build command (`npm run build` or `pnpm run build` or `next build`) and lint command.
   - Specify acceptance criteria checklist mapped to R1, R2, R3.

## Output Deliverable
Write your comprehensive specification report to:
`/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md`

Send a completion message back when done.

## 2026-09-06T01:54:00Z
You are spec_miner_1 (Tech Constraints & A11y Spec Miner) on the Julian Barberis Developer Portfolio Redesign team.
Your working directory is: /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1
Workspace root: /Users/julianbarberis/Portfolio 2

MANDATORY FIRST STEPS:
1. Read /Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md
2. Read /Users/julianbarberis/Portfolio 2/AGENTS.md (Next.js version breaking changes rule)
3. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/DISPATCH.md

TASK:
Mine and document all technical constraints, framework rules, localization requirements, accessibility rules, and build acceptance criteria:
- Inspect package.json, tsconfig.json, next.config.*, node_modules/next for Next.js 16 and React 19 rules and breaking changes.
- Ensure 'use client' boundaries and zero SSR hydration mismatches for carousel state.
- Enumerate all new bilingual translation keys (EN/ES) required for carousel controls, mode toggle, and ARIA labels.
- Verify WCAG AA 4.5:1 contrast requirements for dark glass surfaces and typography.
- Specify ARIA roles (carousel, slide, tablist), focus rings (focus-visible:ring-2), keyboard accessibility, and prefers-reduced-motion fallbacks.
- Document exact verification commands (build, lint, typecheck) and acceptance criteria checklist.

DELIVERABLE:
Write your comprehensive specification report to:
/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md

When complete, call send_message to report your findings and handoff path to parent.
