# Execution Plan: Julian Barberis Developer Portfolio Redesign

## Goal
Implement a high-craft dual-mode project carousel (Fluid Drag/Snap and 3D Coverflow) with an Apple Glass mode switcher, honoring the Vice City Sunset + Apple Glass aesthetic, Next.js 16 + React 19 compatibility, zero TS/lint/hydration errors, and complete architectural integration.

## Orchestration Strategy: Project Pattern
- **Top-Level Orchestrator**: teamwork_preview_orchestrator (Dispatch-only)
- **Phase 0: Survey & Discovery (3 Parallel Explorers)**
  - Explorer 1 (`teamwork_preview_explorer`): Codebase architecture, component hierarchy, Projects section structure, project data, BookLibre/SQLify/Portfolio header implementations, ProjectModal, Category Filter, and LanguageContext.
  - Explorer 2 (`teamwork_preview_explorer`): Carousel engineering & motion dynamics (Framer Motion gesture drag/snap physics, 3D Coverflow perspective/rotateY/scale math, Apple Glass toggle design, responsiveness).
  - Explorer 3 / Spec Miner (`teamwork_preview_spec_miner`): Technical constraints, Next.js 16 / React 19 rules (per AGENTS.md), package dependencies, Tailwind tokens, WCAG AA contrast, a11y requirements, and bilingual translation inventory.
- **Phase 1: Project Scope & Architecture Synthesis**
  - Synthesize explorer findings into `/Users/julianbarberis/Portfolio 2/PROJECT.md`.
  - Enumerate Feature Inventory, Milestones, Interface Contracts, and Code Layout.
- **Phase 2: Milestone Execution & Quality Gates**
  - Dispatched via dedicated Workers, independently reviewed by Reviewers, empirically verified by Challengers, and vetted by Forensic Auditors.
- **Phase 3: Verification & Reporting**
  - Verify clean Next.js 16 build (`pnpm run build` or `npm run build`), 0 lint errors, 0 TS errors, 0 hydration issues.
  - Deliver comprehensive completion report to Sentinel (`parent`).
