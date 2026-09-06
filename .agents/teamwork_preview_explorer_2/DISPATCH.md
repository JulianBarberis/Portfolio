# Task Assignment: Dual-Mode Carousel & 3D Coverflow Motion Architect

## Mission
Design the complete motion engineering, component architecture, gesture handling, and visual design specifications for the dual-mode project carousel ("Modo Fluido" and "Modo Coverflow 3D") with Apple Glass mode switcher.

## Authoritative Inputs
- Read `/Users/julianbarberis/Portfolio 2/.agents/ORIGINAL_REQUEST.md` (MANDATORY: read this first).
- Workspace Root: `/Users/julianbarberis/Portfolio 2`
- Design skills: `design-taste-frontend`, `impeccable`

## Scope of Investigation & Design
1. **Modo Fluido (Fluid Drag & Snap):**
   - Gesture physics using Framer Motion (`drag="x"`, dragElastic, dragConstraints, dragTransition with bounce/power).
   - Magnetic snap to card indices upon drag release.
   - Desktop and mobile handling: card width, gap, visible peeking of neighboring cards, responsive breakpoints (mobile, tablet, desktop).
   - Prev / Next button interactions and state (disabled at start/end or circular/infinite loop - determine best UX).
   - Interactive pagination indicators (dots / pills showing active index, click to jump).
2. **Modo Coverflow (3D Perspective):**
   - 3D CSS / Framer Motion transform model: `transformStyle: "preserve-3d"`, container `perspective: 1000px`.
   - Dynamic transforms for cards based on offset relative to active card (`offset = index - activeIndex`):
     - Active card (`offset === 0`): `scale: 1.05` (or `scale-105`), `rotateY: 0deg`, `z: 0`, full opacity, no blur, specular highlight.
     - Side cards (`offset < 0` or `offset > 0`): `scale: 0.90` (or `scale-90`), `rotateY: -35deg` / `+35deg`, ambient depth blur (e.g. `blur(2px)` or `blur(1px)`), lower opacity (e.g. 0.7 - 0.8), correct z-index layering so center card is on top.
     - Smooth spring transitions: `type: "spring", stiffness: 200, damping: 25`.
3. **Apple Glass Segmented Toggle:**
   - Visual styling: dark glass surface (`apple-glass-card`, `backdrop-blur-md`, `border border-white/10`, specular sheen).
   - Animated active background pill using Framer Motion `layoutId="activeModePill"`.
   - Subtle tactile micro-interactions on click (`scale-[0.98]`, active state feedback).
4. **Interaction Controls & Edge Cases:**
   - Touch swipe on mobile.
   - Keyboard navigation (ArrowLeft / ArrowRight when carousel or cards are focused).
   - Category filter interaction: when active category changes, how does the carousel reset or clamp `activeIndex` without glitching?
   - `prefers-reduced-motion` graceful degradation (instant transitions, disable 3D rotation, standard opacity change).

## Output Deliverable
Write your comprehensive architecture and design specification to:
`/Users/julianbarberis/Portfolio 2/.agents/teamwork_preview_explorer_2/handoff.md`


Include code architecture, Framer Motion motion values, CSS classes, responsive dimension calculations, and edge-case handling. Send a completion message back when done.

## 2026-09-06T01:53:44Z
Received instruction from orchestrator: Design engineering and motion architecture for dual-mode project carousel (Modo Fluido, Modo Coverflow 3D, Apple Glass segmented toggle, responsive breakpoints, gestures, keyboard, category transitions, anti-slop craft).

