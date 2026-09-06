# Task Assignment: Reviewer 2 — Accessibility (a11y), Contrast & Anti-Slop Design Review

## Mission
Independently review the dual-mode project carousel implementation at `/Users/julianbarberis/Portfolio 2` for accessibility (WCAG 2.1 AA compliance), design craft standards (`design-taste-frontend`, `impeccable`, Vice City Sunset + Apple Glass), bilingual localization, and `prefers-reduced-motion` compliance.

## Authoritative Inputs
1. MANDATORY: Read `/Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md`
2. Read `/Users/julianbarberis/Portfolio 2/.agents/PROJECT.md`
3. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md`
4. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1/handoff.md`
5. Inspect the implemented code files:
   - `src/components/carousel/ProjectCard.tsx`
   - `src/components/carousel/FluidCarousel.tsx`
   - `src/components/carousel/CoverflowCarousel.tsx`
   - `src/components/carousel/CarouselControls.tsx`
   - `src/components/carousel/EmptyCategory.tsx`
   - `src/components/Projects.tsx`

## Review Scope & Checklist
1. **WCAG 2.1 AA Color Contrast**:
   - Verify that all text on dark glass meets >= 4.5:1 contrast.
   - Verify that indigo accent `#3744bd` is paired with `dark:text-[#93c5fd]` or suitable light variant.
2. **Keyboard Accessibility & Focus States**:
   - Visible focus rings: `focus-visible:ring-2 focus-visible:ring-[#f8559f]`.
   - Keyboard interaction: `ArrowLeft`, `ArrowRight`, `Home`, `End`.
   - Focus trap prevention: non-active Coverflow cards have `tabIndex={-1}` on buttons/links.
3. **ARIA APG Standards**:
   - `role="region"` and `aria-roledescription="carousel"`.
   - `role="radiogroup"` on mode switcher toggle.
   - `role="tablist"` on pagination dots.
   - Live region `aria-live="polite"` for screen reader announcements.
4. **Motion & Reduced Motion**:
   - `useReducedMotion()` query disables 3D `rotateY`, scaling, and spring physics when active.
5. **Execution Verification**:
   - Run `pnpm run lint` and `pnpm run build` to verify clean execution.
6. **Verdict**:
   - Conclude with a clear, unambiguous verdict: **APPROVE** or **REQUEST_CHANGES**.

## Deliverable
Write your comprehensive review report to:
`/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_reviewer_2/handoff.md`

When complete, call send_message to report your verdict and handoff path to parent.

## 2026-09-06T02:03:24Z
You are reviewer_2 (Accessibility, Contrast & Design Reviewer) on the Julian Barberis Developer Portfolio Redesign team.
Your working directory is: /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_reviewer_2
Workspace root: /Users/julianbarberis/Portfolio 2

MANDATORY FIRST STEPS:
1. Read /Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md
2. Read /Users/julianbarberis/Portfolio 2/.agents/PROJECT.md
3. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_reviewer_2/DISPATCH.md
4. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md
5. Read /Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1/handoff.md

TASK:
Review the dual-mode project carousel implementation for:
- WCAG 2.1 AA color contrast (verify dark:text-[#93c5fd] for indigo accents on dark glass)
- Keyboard navigation (ArrowLeft, ArrowRight, Home, End) and visible focus rings
- ARIA APG roles: region, carousel, radiogroup, tablist, slide, live region
- prefers-reduced-motion fallback via useReducedMotion()
- Anti-slop design standards (Vice City Sunset + Apple Glass)
- Run "pnpm run lint" and "pnpm run build" to verify clean build

DELIVERABLE:
Write your structured review report to:
/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_reviewer_2/handoff.md
Must include explicit verdict: APPROVE or REQUEST_CHANGES.

When complete, call send_message to report your verdict and handoff path to parent.
