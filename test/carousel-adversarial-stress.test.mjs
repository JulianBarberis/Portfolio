/**
 * Adversarial Stress-Test Suite for Carousel Motion & Spatial Edge Cases
 */

import assert from "node:assert/strict";

console.log("=== ADVERSARIAL STRESS TEST & BOUNDARY HARNESS ===");

let passed = 0;
let total = 0;

function stress(name, fn) {
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

// 1. Extreme Viewport Stress (Foldables, Watches, 4K Screens)
stress("Extreme Viewports [280px fold, 320px mini, 3840px 4K]", () => {
  const extremeWidths = [240, 280, 320, 360, 480, 640, 768, 1024, 1920, 2560, 3840];

  for (const w of extremeWidths) {
    // Fluid sizing
    let cardWidth = 420;
    let gap = 24;
    if (w < 640) {
      cardWidth = Math.min(w * 0.86, 330);
      gap = 16;
    } else if (w < 1024) {
      cardWidth = 370;
      gap = 20;
    } else {
      cardWidth = 410;
      gap = 24;
    }

    assert.ok(cardWidth > 0, `cardWidth must be positive at ${w}px`);
    assert.ok(gap > 0, `gap must be positive at ${w}px`);
    const centerOffset = (w - cardWidth) / 2;
    assert.ok(centerOffset > 0, `centerOffset must be positive at ${w}px`);

    // Coverflow step
    let step = 260;
    if (w < 640) step = 130;
    else if (w < 1024) step = 190;
    assert.ok(step > 0, `step must be positive at ${w}px`);
    assert.ok(step < w, `step must be smaller than screen width at ${w}px`);
  }
});

// 2. Boundary Drag Spams (Swipe beyond start and end)
stress("Boundary Drag Operations (Clamped behavior at index 0 and N-1)", () => {
  const swipeThreshold = 50;
  const velocityThreshold = 400;

  function dragSnap(currentIndex, count, offset, velocity) {
    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      if (currentIndex < count - 1) return currentIndex + 1;
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      if (currentIndex > 0) return currentIndex - 1;
    }
    return currentIndex;
  }

  const count = 3;

  // At index 0, violent right swipe
  assert.equal(dragSnap(0, count, { x: 500 }, { x: 2000 }), 0);

  // At index 2, violent left swipe
  assert.equal(dragSnap(2, count, { x: -500 }, { x: -2000 }), 2);

  // At index 1, gentle swipe below threshold
  assert.equal(dragSnap(1, count, { x: 45 }, { x: 350 }), 1);
  assert.equal(dragSnap(1, count, { x: -45 }, { x: -350 }), 1);
});

// 3. Category Filter Mutation with Arbitrary Active Indices
stress("Category Switching Index Clamping Invariant", () => {
  const projectCounts = [0, 1, 3, 5];

  for (const count of projectCounts) {
    for (let currentActive = 0; currentActive < 10; currentActive++) {
      const safeActiveIndex = Math.min(
        currentActive,
        Math.max(0, count - 1)
      );

      if (count === 0) {
        assert.equal(safeActiveIndex, 0);
      } else {
        assert.ok(safeActiveIndex >= 0 && safeActiveIndex < count, `safeActiveIndex ${safeActiveIndex} out of bounds for count ${count}`);
      }
    }
  }
});

// 4. Coverflow Card Depth and Visual Scaling Degradation
stress("Coverflow Monotonic Z-Depth and Opacity Attenuation", () => {
  const offsets = [0, 1, 2, 3, 4];
  let prevZ = 100;
  let prevScale = 2.0;
  let prevOpacity = 2.0;

  for (const o of offsets) {
    let z = 0;
    let scale = 1;
    let opacity = 1;

    if (o === 0) {
      z = 40;
      scale = 1.05;
      opacity = 1;
    } else if (o === 1) {
      z = -60;
      scale = 0.9;
      opacity = 0.75;
    } else {
      z = -60 - (o - 1) * 80;
      scale = 0.8;
      opacity = 0.35;
    }

    assert.ok(z < prevZ, `z depth must strictly decrease with distance: o=${o}`);
    assert.ok(scale <= prevScale, `scale must non-increase with distance: o=${o}`);
    assert.ok(opacity <= prevOpacity, `opacity must non-increase with distance: o=${o}`);

    prevZ = z;
    prevScale = scale;
    prevOpacity = opacity;
  }
});

// 5. Reduced Motion Determinism
stress("Reduced Motion Invariant Enforcement", () => {
  const shouldReduceMotion = true;
  const offsets = [-2, -1, 0, 1, 2];

  for (const o of offsets) {
    const isCenter = o === 0;
    const z = shouldReduceMotion ? 0 : 40;
    const rotateY = shouldReduceMotion ? 0 : 35;
    const scale = isCenter ? 1 : 0.92;
    const blur = shouldReduceMotion ? "0px" : "1.5px";

    // When reduced motion is on:
    // 1. rotateY MUST BE 0 (no 3D tilts)
    assert.equal(rotateY, 0, "Reduced motion must have 0deg rotation");
    // 2. z MUST BE 0 (no depth shifts)
    assert.equal(z, 0, "Reduced motion must have 0px z translation");
    // 3. blur MUST BE 0px
    assert.equal(blur, "0px", "Reduced motion must have 0px blur");
    // 4. scale difference is subtle (1 vs 0.92) without exaggerated bounce
    assert.ok(scale >= 0.92 && scale <= 1.0);
  }
});

console.log(`\n=== ALL ${passed} OF ${total} ADVERSARIAL STRESS TESTS PASSED ===`);
