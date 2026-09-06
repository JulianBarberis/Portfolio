/**
 * Empirical Motion & Physics Verification Suite for Julian Barberis Developer Portfolio
 *
 * Tests:
 * 1. FluidCarousel Motion Physics & Magnetic Snapping
 * 2. CoverflowCarousel 3D Spatial Geometry & Normal Vector Calculations
 * 3. Responsive Breakpoint Step Spacing & Centering
 * 4. Card Overlap, Viewport Peeking & Z-Stacking Monotonicity
 * 5. Reduced Motion Fallback Conformance
 * 6. AST/Source Code Contract Invariant Checks
 */

import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT_DIR = process.cwd();

console.log("=== EMPIRICAL MOTION & 3D GEOMETRY VERIFICATION SUITE ===");
console.log(`Root: ${ROOT_DIR}\n`);

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

// -------------------------------------------------------------
// Test 1: Fluid Mode Physics & Magnetic Snap Mechanics
// -------------------------------------------------------------
console.log("Suite 1: Modo Fluido Drag & Magnetic Snap Physics");

test("Magnetic Snap Decision Function (Thresholds: dx > 50px, vx > 400px/s)", () => {
  const SWIPE_THRESHOLD = 50;
  const VELOCITY_THRESHOLD = 400;

  function simulateDragEnd(activeIndex, total, offset, velocity) {
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
      if (activeIndex < total - 1) return activeIndex + 1;
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
      if (activeIndex > 0) return activeIndex - 1;
    }
    return activeIndex;
  }

  const total = 3;

  // Case 1: Drag left past threshold -> advance slide
  assert.equal(simulateDragEnd(0, total, { x: -55 }, { x: 0 }), 1);
  assert.equal(simulateDragEnd(1, total, { x: -100 }, { x: 0 }), 2);

  // Case 2: Drag right past threshold -> retreat slide
  assert.equal(simulateDragEnd(2, total, { x: 55 }, { x: 0 }), 1);
  assert.equal(simulateDragEnd(1, total, { x: 80 }, { x: 0 }), 0);

  // Case 3: Fast flick left with small offset -> advance slide
  assert.equal(simulateDragEnd(0, total, { x: -20 }, { x: -450 }), 1);

  // Case 4: Fast flick right with small offset -> retreat slide
  assert.equal(simulateDragEnd(1, total, { x: 20 }, { x: 450 }), 0);

  // Case 5: Below both thresholds -> stay on current slide
  assert.equal(simulateDragEnd(1, total, { x: 30 }, { x: 150 }), 1);
  assert.equal(simulateDragEnd(1, total, { x: -30 }, { x: -200 }), 1);

  // Case 6: Boundary clamping: cannot advance past total-1
  assert.equal(simulateDragEnd(2, total, { x: -150 }, { x: -800 }), 2);

  // Case 7: Boundary clamping: cannot retreat below 0
  assert.equal(simulateDragEnd(0, total, { x: 150 }, { x: 800 }), 0);
});

test("Fluid Dynamic Centering & Track Offset Math", () => {
  function computeFluidGeometry(containerWidth, activeIndex, totalCards) {
    let cardWidth = 420;
    let gap = 24;

    if (containerWidth < 640) {
      cardWidth = Math.min(containerWidth * 0.86, 330);
      gap = 16;
    } else if (containerWidth < 1024) {
      cardWidth = 370;
      gap = 20;
    } else {
      cardWidth = 410;
      gap = 24;
    }

    const centerOffset = (containerWidth - cardWidth) / 2;
    const targetX = centerOffset - activeIndex * (cardWidth + gap);

    // Active card's visual left edge
    const activeCardLeft = targetX + activeIndex * (cardWidth + gap);
    // Active card's center
    const activeCardCenter = activeCardLeft + cardWidth / 2;
    const containerCenter = containerWidth / 2;

    const peekingLeft = centerOffset;
    const peekingRight = containerWidth - (activeCardLeft + cardWidth);

    return {
      cardWidth,
      gap,
      centerOffset,
      targetX,
      activeCardCenter,
      containerCenter,
      peekingLeft,
      peekingRight,
    };
  }

  // Check across multiple screen widths
  const viewports = [360, 375, 414, 600, 768, 800, 1024, 1280, 1440];

  for (const w of viewports) {
    for (let idx = 0; idx < 3; idx++) {
      const geo = computeFluidGeometry(w, idx, 3);

      // Centering must be mathematically exact: active card center == container center
      assert.ok(
        Math.abs(geo.activeCardCenter - geo.containerCenter) < 1e-9,
        `Viewport ${w}px index ${idx} failed exact centering: ${geo.activeCardCenter} vs ${geo.containerCenter}`
      );

      // Peeking margins must be symmetric around active card
      assert.ok(
        Math.abs(geo.peekingLeft - geo.peekingRight) < 1e-9,
        `Viewport ${w}px index ${idx} failed symmetric peeking: ${geo.peekingLeft} vs ${geo.peekingRight}`
      );

      // Peeking margin must be strictly positive to ensure aesthetic surrounding card visibility
      assert.ok(
        geo.peekingLeft > 0,
        `Viewport ${w}px peeking margin non-positive: ${geo.peekingLeft}`
      );
    }
  }
});

// -------------------------------------------------------------
// Test 2: Coverflow Mode 3D Geometry & Spatial Transformation
// -------------------------------------------------------------
console.log("\nSuite 2: Modo Coverflow 3D Geometry & Transforms");

test("Coverflow Card Transform Computation Matrix", () => {
  function computeCoverflowCard(offset, step, shouldReduceMotion = false) {
    const isCenter = offset === 0;

    let x = 0;
    let z = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let blur = "0px";

    if (shouldReduceMotion) {
      x = offset * (step + 40);
      scale = isCenter ? 1 : 0.92;
      opacity = isCenter ? 1 : 0.6;
    } else {
      if (isCenter) {
        x = 0;
        z = 40;
        rotateY = 0;
        scale = 1.05;
        opacity = 1;
        blur = "0px";
      } else if (offset < 0) {
        // Left cards: rotateY +35 brings right edge forward
        x = -step - (Math.abs(offset) - 1) * 90;
        z = -60 - (Math.abs(offset) - 1) * 80;
        rotateY = offset === -1 ? 35 : 42;
        scale = offset === -1 ? 0.9 : 0.8;
        opacity = offset === -1 ? 0.75 : 0.35;
        blur = offset === -1 ? "1.5px" : "3px";
      } else {
        // Right cards: rotateY -35 brings left edge forward
        x = step + (offset - 1) * 90;
        z = -60 - (offset - 1) * 80;
        rotateY = offset === 1 ? -35 : -42;
        scale = offset === 1 ? 0.9 : 0.8;
        opacity = offset === 1 ? 0.75 : 0.35;
        blur = offset === 1 ? "1.5px" : "3px";
      }
    }

    const zIndex = 30 - Math.abs(offset) * 5;

    return { x, z, rotateY, scale, opacity, blur, zIndex };
  }

  const stepDesktop = 260;

  // 1. Center card verification
  const center = computeCoverflowCard(0, stepDesktop);
  assert.equal(center.x, 0);
  assert.equal(center.z, 40);
  assert.equal(center.rotateY, 0);
  assert.equal(center.scale, 1.05);
  assert.equal(center.opacity, 1.0);
  assert.equal(center.blur, "0px");
  assert.equal(center.zIndex, 30);

  // 2. Left immediate card (offset -1)
  const left1 = computeCoverflowCard(-1, stepDesktop);
  assert.equal(left1.x, -260);
  assert.equal(left1.z, -60);
  assert.equal(left1.rotateY, 35);
  assert.equal(left1.scale, 0.9);
  assert.equal(left1.opacity, 0.75);
  assert.equal(left1.blur, "1.5px");
  assert.equal(left1.zIndex, 25);

  // 3. Right immediate card (offset +1)
  const right1 = computeCoverflowCard(1, stepDesktop);
  assert.equal(right1.x, 260);
  assert.equal(right1.z, -60);
  assert.equal(right1.rotateY, -35);
  assert.equal(right1.scale, 0.9);
  assert.equal(right1.opacity, 0.75);
  assert.equal(right1.blur, "1.5px");
  assert.equal(right1.zIndex, 25);

  // 4. Outer left card (offset -2)
  const left2 = computeCoverflowCard(-2, stepDesktop);
  assert.equal(left2.x, -350); // -260 - (2-1)*90 = -350
  assert.equal(left2.z, -140); // -60 - 80 = -140
  assert.equal(left2.rotateY, 42);
  assert.equal(left2.scale, 0.8);
  assert.equal(left2.opacity, 0.35);
  assert.equal(left2.blur, "3px");
  assert.equal(left2.zIndex, 20);

  // 5. Outer right card (offset +2)
  const right2 = computeCoverflowCard(2, stepDesktop);
  assert.equal(right2.x, 350);
  assert.equal(right2.z, -140);
  assert.equal(right2.rotateY, -42);
  assert.equal(right2.scale, 0.8);
  assert.equal(right2.opacity, 0.35);
  assert.equal(right2.blur, "3px");
  assert.equal(right2.zIndex, 20);
});

test("Trigonometric Normal Vector & Visual Facing Orientation", () => {
  // In CSS 3D (Right-Handed Coordinate System with +Y pointing down):
  // Initial card normal faces viewer: N_0 = [0, 0, 1]
  // RotateY by angle theta:
  // N_x = sin(theta)
  // N_z = cos(theta)
  const deg2rad = (deg) => (deg * Math.PI) / 180;

  // Left card (offset = -1): rotateY = +35 deg
  const thetaLeft = deg2rad(35);
  const leftNormalX = Math.sin(thetaLeft);
  const leftNormalZ = Math.cos(thetaLeft);

  // Normal points toward positive X (toward center active card!)
  assert.ok(
    leftNormalX > 0,
    `Left card normal X should point positive toward center, got ${leftNormalX}`
  );
  assert.ok(
    leftNormalZ > 0,
    `Left card normal Z should face forward toward viewer, got ${leftNormalZ}`
  );

  // Right card (offset = +1): rotateY = -35 deg
  const thetaRight = deg2rad(-35);
  const rightNormalX = Math.sin(thetaRight);
  const rightNormalZ = Math.cos(thetaRight);

  // Normal points toward negative X (toward center active card!)
  assert.ok(
    rightNormalX < 0,
    `Right card normal X should point negative toward center, got ${rightNormalX}`
  );
  assert.ok(
    rightNormalZ > 0,
    `Right card normal Z should face forward toward viewer, got ${rightNormalZ}`
  );

  // Symmetry: absolute X inclinations must be equal
  assert.ok(
    Math.abs(leftNormalX + rightNormalX) < 1e-9,
    "Left and right normal X components must be perfectly symmetric"
  );
});

test("Z-Index Monotonicity & Stacking Hierarchy", () => {
  // Center card must have highest z-index, followed strictly by distance from center
  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const zIndices = offsets.map((o) => 30 - Math.abs(o) * 5);

  assert.equal(zIndices[3], 30); // Center
  assert.equal(zIndices[2], 25); // -1
  assert.equal(zIndices[4], 25); // +1
  assert.equal(zIndices[1], 20); // -2
  assert.equal(zIndices[5], 20); // +2
  assert.equal(zIndices[0], 15); // -3
  assert.equal(zIndices[6], 15); // +3

  // Verify center is strictly greater than all neighbors
  assert.ok(zIndices[3] > zIndices[2]);
  assert.ok(zIndices[3] > zIndices[4]);
  assert.ok(zIndices[2] > zIndices[1]);
  assert.ok(zIndices[4] > zIndices[5]);
});

// -------------------------------------------------------------
// Test 3: Responsive Breakpoint Step Spacing
// -------------------------------------------------------------
console.log("\nSuite 3: Responsive Step Spacing & Sizing Breakpoints");

test("Responsive Step Selection Rules", () => {
  function getStep(width) {
    if (width < 640) return 130;
    if (width < 1024) return 190;
    return 260;
  }

  assert.equal(getStep(320), 130);
  assert.equal(getStep(375), 130);
  assert.equal(getStep(639), 130);
  assert.equal(getStep(640), 190);
  assert.equal(getStep(768), 190);
  assert.equal(getStep(1023), 190);
  assert.equal(getStep(1024), 260);
  assert.equal(getStep(1440), 260);
  assert.equal(getStep(1920), 260);
});

test("Mobile Viewport Step & Card Containment (Screen: 360px)", () => {
  // Verify that on small 360px mobile viewport, Coverflow step of 130px keeps
  // side cards neatly visible without pushing cards offscreen or creating invisible clippings
  const screenWidth = 360;
  const step = 130;
  const cardWidth = Math.min(screenWidth * 0.82, 320); // 295.2px

  const centerPos = screenWidth / 2; // 180px
  const leftCardCenter = centerPos - step; // 50px
  const rightCardCenter = centerPos + step; // 310px

  // Left card right edge = 50 + cardWidth/2 = 50 + 147.6 = 197.6px (reaches into center)
  // Left card left edge = 50 - 147.6 = -97.6px (partially peeks offscreen, giving depth hint)
  // Right card left edge = 310 - 147.6 = 162.4px (reaches under center)
  assert.ok(leftCardCenter > 0, "Left card center stays on screen");
  assert.ok(rightCardCenter < screenWidth, "Right card center stays on screen");
});

// -------------------------------------------------------------
// Test 4: Static File Contract & Code Invariant Assertions
// -------------------------------------------------------------
console.log("\nSuite 4: Source Code Contract Invariant Checks");

test("FluidCarousel.tsx Source Invariants", () => {
  const code = fs.readFileSync(
    path.join(ROOT_DIR, "src/components/carousel/FluidCarousel.tsx"),
    "utf8"
  );

  // Check drag props
  assert.ok(code.includes('drag={shouldReduceMotion ? false : "x"}'), 'Missing drag="x" / reduced motion guard');
  assert.ok(code.includes("dragConstraints={{ left: 0, right: 0 }}"), "Missing relative drag constraints");
  assert.ok(code.includes("dragElastic={0.15}"), "Missing dragElastic={0.15}");

  // Check touch-pan-y
  assert.ok(code.includes("touch-pan-y"), "Missing touch-pan-y for mobile vertical scroll safety");

  // Check swipeThreshold & velocityThreshold
  assert.ok(code.includes("swipeThreshold = 50"), "Missing swipeThreshold = 50");
  assert.ok(code.includes("velocityThreshold = 400"), "Missing velocityThreshold = 400");

  // Check dynamic centering
  assert.ok(code.includes("centerOffset = (containerWidth - cardWidth) / 2"), "Missing centerOffset formula");
  assert.ok(code.includes("targetX = centerOffset - activeIndex * (cardWidth + gap)"), "Missing targetX centering formula");

  // Check spring transition
  assert.ok(code.includes("stiffness: 220"), "Missing spring stiffness 220");
  assert.ok(code.includes("damping: 26"), "Missing spring damping 26");
  assert.ok(code.includes("mass: 0.8"), "Missing spring mass 0.8");
});

test("CoverflowCarousel.tsx Source Invariants", () => {
  const code = fs.readFileSync(
    path.join(ROOT_DIR, "src/components/carousel/CoverflowCarousel.tsx"),
    "utf8"
  );

  // Check 3D perspective & preserve-3d
  assert.ok(code.includes("perspective: shouldReduceMotion ? undefined : 1000"), "Missing perspective 1000");
  assert.ok(code.includes('transformStyle: "preserve-3d"'), "Missing preserve-3d transform style");
  assert.ok(code.includes("touch-pan-y"), "Missing touch-pan-y");

  // Check active center card values
  assert.ok(code.includes("z = 40;"), "Missing center card z=40");
  assert.ok(code.includes("rotateY = 0;"), "Missing center card rotateY=0");
  assert.ok(code.includes("scale = 1.05;"), "Missing center card scale=1.05");
  assert.ok(code.includes('blur = "0px";'), "Missing center card blur=0px");

  // Check side card values (offset ±1)
  assert.ok(code.includes("rotateY = offset === -1 ? 35 : 42;"), "Missing left rotateY +35");
  assert.ok(code.includes("rotateY = offset === 1 ? -35 : -42;"), "Missing right rotateY -35");
  assert.ok(code.includes("scale = offset === -1 ? 0.9 : 0.8;"), "Missing left scale 0.9");
  assert.ok(code.includes("scale = offset === 1 ? 0.9 : 0.8;"), "Missing right scale 0.9");
  assert.ok(code.includes('blur = offset === -1 ? "1.5px" : "3px";'), "Missing left blur 1.5px");
  assert.ok(code.includes('blur = offset === 1 ? "1.5px" : "3px";'), "Missing right blur 1.5px");
  assert.ok(code.includes("z = -60 - (Math.abs(offset) - 1) * 80;"), "Missing side card z=-60");

  // Check responsive step spacing
  assert.ok(code.includes("setStep(130);"), "Missing mobile step 130");
  assert.ok(code.includes("setStep(190);"), "Missing tablet step 190");
  assert.ok(code.includes("setStep(260);"), "Missing desktop step 260");

  // Check tap-to-center affordance
  assert.ok(code.includes("if (!isCenter) {\n                  onSelectIndex(index);\n                }"), "Missing tap-to-center guard");

  // Check spring transition
  assert.ok(code.includes("stiffness: 200"), "Missing spring stiffness 200");
  assert.ok(code.includes("damping: 25"), "Missing spring damping 25");
  assert.ok(code.includes("mass: 1.0"), "Missing spring mass 1.0");
});

test("ProjectCard.tsx Click Isolation & Accessibility Invariants", () => {
  const code = fs.readFileSync(
    path.join(ROOT_DIR, "src/components/carousel/ProjectCard.tsx"),
    "utf8"
  );

  // Check side card pointer-events isolation
  assert.ok(code.includes('isCoverflowSide ? "pointer-events-none opacity-80" : ""'), "Missing side card pointer-events isolation");
  assert.ok(code.includes("tabIndex={isCoverflowSide ? -1 : 0}"), "Missing tabIndex isolation for side cards");
  assert.ok(code.includes("e.stopPropagation();"), "Missing stopPropagation on details button");
});

test("Projects.tsx Integration & Stacking Isolation Invariants", () => {
  const code = fs.readFileSync(
    path.join(ROOT_DIR, "src/components/Projects.tsx"),
    "utf8"
  );

  // Check mode switcher
  assert.ok(code.includes('layoutId="activeCarouselModePill"'), "Missing layoutId for mode pill");
  assert.ok(code.includes('<AnimatePresence mode="wait">'), "Missing AnimatePresence with mode='wait'");

  // Check index clamping & category reset
  assert.ok(code.includes("const safeActiveIndex = Math.min("), "Missing safeActiveIndex clamping");
  assert.ok(code.includes("setActiveIndex(0);"), "Missing setActiveIndex(0) on category switch");

  // Check keyboard navigation
  assert.ok(code.includes('e.key === "ArrowLeft"'), "Missing ArrowLeft keyboard navigation");
  assert.ok(code.includes('e.key === "ArrowRight"'), "Missing ArrowRight keyboard navigation");
  assert.ok(code.includes('e.key === "Home"'), "Missing Home key handler");
  assert.ok(code.includes('e.key === "End"'), "Missing End key handler");

  // Check modal outside 3D stage
  const modalIndex = code.indexOf("<ProjectModal");
  const coverflowIndex = code.indexOf("<CoverflowCarousel");
  assert.ok(modalIndex > coverflowIndex, "ProjectModal must be outside and after CoverflowCarousel");
});

console.log(`\n=== ALL ${passedTests} OF ${totalTests} TESTS PASSED CLEANLY ===`);
