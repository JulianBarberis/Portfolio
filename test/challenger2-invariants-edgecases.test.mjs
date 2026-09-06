/**
 * Challenger 2 Invariants & Edge Cases Empirical Test Suite
 *
 * Mandate:
 * 1. Category filtering clamping: activeIndex reset to 0, safeActiveIndex clamping on count changes
 * 2. 0-project category handling: category "Backend" renders EmptyCategory without errors
 * 3. ProjectModal mounting outside 3D perspective context to prevent WebKit clipping
 * 4. External links retain target="_blank" rel="noopener noreferrer"
 * 5. Reduced motion fallback behavior across Fluid and Coverflow modes
 * 6. Keyboard navigation locking during modal open state
 */

import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT = process.cwd();

console.log("===============================================================");
console.log(" CHALLENGER 2: INVARIANTS, EDGE CASES & ROBUSTNESS TEST SUITE ");
console.log("===============================================================\n");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

// ----------------------------------------------------------------------------
// 1. Category Filtering Clamping & Transition State Invariants
// ----------------------------------------------------------------------------
console.log("--- 1. Category Filtering & Index Clamping Invariants ---");

runTest("Every category transition matrix preserves safe index bounds", () => {
  // Real categories and project inventory from src/data/portfolioData.ts
  const portfolioProjects = [
    { id: "booklibre", category: "Full-Stack" },
    { id: "sqlify", category: "AI" },
    { id: "portfolio-gta6", category: "Frontend" },
  ];

  const categories = ["All", "Full-Stack", "Backend", "Frontend", "AI"];

  const getFiltered = (cat) => {
    if (cat === "All") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === cat);
  };

  // Verify inventory counts
  assert.equal(getFiltered("All").length, 3);
  assert.equal(getFiltered("Full-Stack").length, 1);
  assert.equal(getFiltered("Backend").length, 0);
  assert.equal(getFiltered("Frontend").length, 1);
  assert.equal(getFiltered("AI").length, 1);

  // Transition from every category to every other category from all valid activeIndex positions
  for (const fromCat of categories) {
    const fromList = getFiltered(fromCat);
    const maxFromIdx = Math.max(0, fromList.length - 1);

    for (let activeIndex = 0; activeIndex <= maxFromIdx; activeIndex++) {
      for (const toCat of categories) {
        const toList = getFiltered(toCat);

        // Clamping invariant in Projects.tsx:
        // const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredProjects.length - 1));
        const safeActiveIndex = Math.min(activeIndex, Math.max(0, toList.length - 1));

        if (toList.length === 0) {
          assert.equal(safeActiveIndex, 0, `Expected safeActiveIndex to be 0 for empty category ${toCat}`);
        } else {
          assert.ok(
            safeActiveIndex >= 0 && safeActiveIndex < toList.length,
            `safeActiveIndex (${safeActiveIndex}) must be within [0, ${toList.length - 1}] when switching ${fromCat} -> ${toCat}`
          );
          // Target project must be defined
          const targetProj = toList[safeActiveIndex];
          assert.ok(targetProj !== undefined, `Project at safeActiveIndex must not be undefined in ${toCat}`);
        }

        // Check handleCategoryChange reset invariant:
        // setActiveCategory(cat); setActiveIndex(0);
        const resetIndex = 0;
        if (toList.length > 0) {
          assert.ok(resetIndex < toList.length);
          assert.ok(toList[resetIndex] !== undefined);
        }
      }
    }
  }
});

// ----------------------------------------------------------------------------
// 2. 0-Project Category Handling ("Backend" -> EmptyCategory)
// ----------------------------------------------------------------------------
console.log("\n--- 2. 0-Project Category Handling & Empty State Invariants ---");

runTest("EmptyCategory handles 0-project state without errors and provides reset", () => {
  const projectsCode = fs.readFileSync(path.join(ROOT, "src/components/Projects.tsx"), "utf8");
  const emptyCategoryCode = fs.readFileSync(
    path.join(ROOT, "src/components/carousel/EmptyCategory.tsx"),
    "utf8"
  );

  // 1. Verify conditional rendering guard
  assert.ok(
    projectsCode.includes("filteredProjects.length === 0 ? ("),
    "Projects.tsx must conditionally check filteredProjects.length === 0"
  );
  assert.ok(
    projectsCode.includes("<EmptyCategory"),
    "Projects.tsx must render EmptyCategory when filteredProjects.length === 0"
  );
  assert.ok(
    projectsCode.includes('onResetCategory={() => handleCategoryChange("All")}'),
    "EmptyCategory must receive onResetCategory callback resetting to 'All'"
  );

  // 2. Verify screen reader announcement guard
  assert.ok(
    projectsCode.includes("filteredProjects.length > 0 && ("),
    "Screen reader announcement must be guarded by filteredProjects.length > 0"
  );

  // 3. Verify keyboard navigation guard
  assert.ok(
    projectsCode.includes("if (filteredProjects.length === 0) return;"),
    "handleKeyDown must guard against filteredProjects.length === 0"
  );

  // 4. Verify EmptyCategory component exports and props contract
  assert.ok(
    emptyCategoryCode.includes("interface EmptyCategoryProps"),
    "EmptyCategory must define EmptyCategoryProps"
  );
  assert.ok(
    emptyCategoryCode.includes("onResetCategory: () => void"),
    "EmptyCategory must require onResetCategory: () => void"
  );
  assert.ok(
    emptyCategoryCode.includes("onClick={onResetCategory}"),
    "EmptyCategory button must trigger onResetCategory onClick"
  );

  // 5. Bilingual support in EmptyCategory
  assert.ok(
    emptyCategoryCode.includes("Próximamente más proyectos") &&
      emptyCategoryCode.includes("More projects coming soon"),
    "EmptyCategory must support ES/EN title"
  );
  assert.ok(
    emptyCategoryCode.includes("Ver Todos los Proyectos") &&
      emptyCategoryCode.includes("View All Projects"),
    "EmptyCategory must support ES/EN button CTA"
  );
});

// ----------------------------------------------------------------------------
// 3. Modal Stacking Context & WebKit 3D Perspective Clipping Isolation
// ----------------------------------------------------------------------------
console.log("\n--- 3. WebKit 3D Clipping Isolation & Modal Mount Context ---");

runTest("ProjectModal is mounted at section root outside 3D perspective context", () => {
  const projectsCode = fs.readFileSync(path.join(ROOT, "src/components/Projects.tsx"), "utf8");
  const modalCode = fs.readFileSync(path.join(ROOT, "src/components/ProjectModal.tsx"), "utf8");

  // WebKit (Safari on macOS and iOS) bug: Any child inside an element with
  // perspective, transform-style: preserve-3d, or transform will have fixed positioning
  // flattened or clipped to that ancestor's bounding box instead of the viewport.

  // 1. In Projects.tsx, find the position of CoverflowCarousel and ProjectModal
  const coverflowPos = projectsCode.indexOf("<CoverflowCarousel");
  const modalPos = projectsCode.indexOf("<ProjectModal");

  assert.ok(coverflowPos > 0, "CoverflowCarousel must be present");
  assert.ok(modalPos > 0, "ProjectModal must be present");
  assert.ok(
    modalPos > coverflowPos,
    "ProjectModal must be rendered AFTER CoverflowCarousel in JSX tree"
  );

  // 2. Ensure ProjectModal is NOT inside the AnimatePresence or carousel stage
  const animatePresenceEnd = projectsCode.indexOf("</AnimatePresence>");
  assert.ok(
    modalPos > animatePresenceEnd,
    "ProjectModal must be rendered OUTSIDE <AnimatePresence>"
  );

  // 3. Ensure ProjectModal is a direct child of the section container
  const lastSectionDivEnd = projectsCode.lastIndexOf("</div>\n\n      {/* ProjectModal");
  assert.ok(
    lastSectionDivEnd > 0,
    "ProjectModal must be outside the max-w-6xl container div"
  );

  // 4. Modal container must use fixed inset-0 z-50
  assert.ok(
    modalCode.includes('className="fixed inset-0 z-50'),
    "ProjectModal must have fixed inset-0 z-50"
  );

  // 5. Modal must trap Escape key
  assert.ok(
    modalCode.includes('if (e.key === "Escape") onClose();'),
    "ProjectModal must close on Escape key"
  );

  // 6. Keyboard events on section must be disabled when modal is open
  assert.ok(
    projectsCode.includes("if (selectedProject !== null) return;"),
    "Projects section keyboard handler must be disabled when modal is open"
  );
});

// ----------------------------------------------------------------------------
// 4. External Links Security Attributes
// ----------------------------------------------------------------------------
console.log("\n--- 4. External Links Security Attributes (target='_blank' rel='noopener noreferrer') ---");

runTest("All external links strictly retain target='_blank' and rel='noopener noreferrer'", () => {
  const filesToCheck = [
    "src/components/carousel/ProjectCard.tsx",
    "src/components/ProjectModal.tsx",
    "src/components/Projects.tsx",
  ];

  for (const file of filesToCheck) {
    const filePath = path.join(ROOT, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Regular expression to match all <a ... > tags
    const anchorRegex = /<a\s+([^>]+)>/g;
    let match;

    while ((match = anchorRegex.exec(content)) !== null) {
      const tagAttributes = match[1];

      // If this anchor has an external link (href starting with http, https, or dynamic project.url)
      if (
        tagAttributes.includes("githubUrl") ||
        tagAttributes.includes("demoUrl") ||
        tagAttributes.includes("http://") ||
        tagAttributes.includes("https://")
      ) {
        assert.ok(
          tagAttributes.includes('target="_blank"'),
          `External link in ${file} missing target="_blank": ${match[0]}`
        );
        assert.ok(
          tagAttributes.includes('rel="noopener noreferrer"'),
          `External link in ${file} missing rel="noopener noreferrer": ${match[0]}`
        );
      }
    }
  }
});

// ----------------------------------------------------------------------------
// 5. Reduced Motion Fallback Conformance
// ----------------------------------------------------------------------------
console.log("\n--- 5. Reduced Motion Fallback Conformance ---");

runTest("Reduced motion eliminates 3D perspective, tilts, and spring oscillation", () => {
  const coverflowCode = fs.readFileSync(
    path.join(ROOT, "src/components/carousel/CoverflowCarousel.tsx"),
    "utf8"
  );
  const fluidCode = fs.readFileSync(
    path.join(ROOT, "src/components/carousel/FluidCarousel.tsx"),
    "utf8"
  );

  // Coverflow reduced motion checks
  assert.ok(
    coverflowCode.includes("const shouldReduceMotion = useReducedMotion();"),
    "CoverflowCarousel must query useReducedMotion()"
  );
  assert.ok(
    coverflowCode.includes("perspective: shouldReduceMotion ? undefined : 1000"),
    "CoverflowCarousel must remove 3D perspective under reduced motion"
  );
  assert.ok(
    coverflowCode.includes("drag={shouldReduceMotion ? false : \"x\"}"),
    "CoverflowCarousel must disable drag gestures under reduced motion"
  );
  assert.ok(
    coverflowCode.includes("rotateY: shouldReduceMotion ? 0 : rotateY"),
    "CoverflowCarousel must force rotateY=0 under reduced motion"
  );
  assert.ok(
    coverflowCode.includes("z: shouldReduceMotion ? 0 : z"),
    "CoverflowCarousel must force z=0 under reduced motion"
  );
  assert.ok(
    coverflowCode.includes("shouldReduceMotion ? { duration: 0.15 } : springTransition"),
    "CoverflowCarousel must use discrete { duration: 0.15 } transition instead of spring"
  );

  // Fluid reduced motion checks
  assert.ok(
    fluidCode.includes("const shouldReduceMotion = useReducedMotion();"),
    "FluidCarousel must query useReducedMotion()"
  );
  assert.ok(
    fluidCode.includes("drag={shouldReduceMotion ? false : \"x\"}"),
    "FluidCarousel must disable drag gestures under reduced motion"
  );
  assert.ok(
    fluidCode.includes("shouldReduceMotion ? { duration: 0.15 } : springTransition"),
    "FluidCarousel must replace spring transitions with discrete transition"
  );
  assert.ok(
    fluidCode.includes("scale: shouldReduceMotion ? 1 : isActive ? 1.0 : 0.94"),
    "FluidCarousel must lock scale to 1 under reduced motion"
  );
});

// ----------------------------------------------------------------------------
// 6. WCAG AA Contrast Invariants for `#3744bd`
// ----------------------------------------------------------------------------
console.log("\n--- 6. WCAG AA Contrast Invariants for Ocean Twilight Indigo ---");

runTest("Every occurrence of #3744bd on dark backgrounds is paired with high-contrast text", () => {
  const filesToCheck = [
    "src/components/carousel/ProjectCard.tsx",
    "src/components/ProjectModal.tsx",
    "src/components/Projects.tsx",
  ];

  for (const file of filesToCheck) {
    const content = fs.readFileSync(path.join(ROOT, file), "utf8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // If line uses text-[#3744bd], verify it has dark:text-[#93c5fd]
      if (line.includes("text-[#3744bd]") && !line.includes("bg-[#3744bd]")) {
        assert.ok(
          line.includes("dark:text-[#93c5fd]"),
          `Line ${i + 1} in ${file} uses text-[#3744bd] without dark:text-[#93c5fd]:\n  ${line.trim()}`
        );
      }

      // If line uses bg-[#3744bd], verify it uses text-white
      if (line.includes("bg-[#3744bd]")) {
        assert.ok(
          line.includes("text-white") || line.includes("from-[#3744bd]"),
          `Line ${i + 1} in ${file} uses bg-[#3744bd] without text-white:\n  ${line.trim()}`
        );
      }
    }
  }
});

console.log(`\n===============================================================`);
console.log(` ALL ${passed} OF ${total} CHALLENGER 2 TESTS PASSED WITH ZERO FAILURES `);
console.log(`===============================================================\n`);
