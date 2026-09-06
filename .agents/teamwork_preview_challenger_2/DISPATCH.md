# Task Assignment: Challenger 2 — Edge Cases, Invariants & State Robustness Verification

## Mission
Empirically challenge and verify the robustness of state invariants, edge cases, category filtering transitions, modal interactions, and bilingual localization of the dual-mode project carousel.

## Authoritative Inputs
1. MANDATORY: Read `/Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md`
2. Read `/Users/julianbarberis/Portfolio 2/.agents/PROJECT.md`
3. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_spec_miner_1/handoff.md`
4. Read `/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_worker_1/handoff.md`
5. Inspect `src/components/Projects.tsx`, `src/components/carousel/EmptyCategory.tsx`, and `src/components/carousel/ProjectCard.tsx`.

## Challenge Scope & Stress Tests
1. **Category Filtering & Index Clamping Invariant**:
   - Stress test what happens when category switches from "All" (where `activeIndex` can be 2) to "Full-Stack" (1 project) or "Backend" (0 projects).
   - Verify that `safeActiveIndex` clamps safely: `Math.min(activeIndex, Math.max(0, filteredProjects.length - 1))`.
   - Verify that category switch resets `activeIndex = 0`.
   - Verify that selecting "Backend" renders `EmptyCategory` without throwing runtime TypeError.
2. **Modal Context & Link Security**:
   - Verify `ProjectModal` is mounted outside 3D perspective context so WebKit does not clip or distort it.
   - Verify external links (GitHub and Demo) have `target="_blank" rel="noopener noreferrer"`.
3. **Reduced Motion Robustness**:
   - Verify that when `prefers-reduced-motion` is enabled, 3D `rotateY` is 0, scaling bounce is disabled, and transitions are clean.
4. **Execution Verification**:
   - Run `pnpm run build` and `pnpm run lint`.
5. **Verdict**:
   - State clearly: **APPROVE** or **CHALLENGE_FAILED**.

## Deliverable
Write your comprehensive challenge report to:
`/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_challenger_2/handoff.md`

When complete, call send_message to report your verdict and handoff path to parent.
