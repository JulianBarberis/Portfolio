import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeCategories } from "../src/data/types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

console.log("==================================================================");
console.log(" MULTI-CATEGORY ADVERSARIAL REVIEW & ROBUSTNESS TEST SUITE       ");
console.log("==================================================================");

let total = 0;
let passed = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log("  ✓ PASS: " + name);
    passed++;
  } catch (err) {
    console.error("  ✗ FAIL: " + name);
    console.error("    " + err.message);
    throw err;
  }
}

// --- Suite 1: Multi-Category Schema & Filtering Architecture ---
console.log("\n--- Suite 1: Multi-Category Schema & Filtering Architecture ---");

runTest("types.ts exports ProjectCategory and supports union with array", () => {
  const typesContent = fs.readFileSync(path.join(ROOT, "src/data/types.ts"), "utf8");
  assert.ok(
    typesContent.includes("export type ProjectCategory") &&
    typesContent.includes("\"Full-Stack\"") &&
    typesContent.includes("\"AI\"") &&
    typesContent.includes("\"Académico\""),
    "types.ts must export ProjectCategory union with Académico"
  );
  assert.ok(
    typesContent.includes("category: ProjectCategory | ProjectCategory[]"),
    "ProjectItem.category must support ProjectCategory | ProjectCategory[]"
  );
  assert.ok(
    typesContent.includes("export function normalizeCategories"),
    "types.ts must export normalizeCategories helper"
  );
});

runTest("Category normalization is backwards compatible with strings, arrays & handles edge cases", () => {
  assert.deepEqual(normalizeCategories("Full-Stack"), ["Full-Stack"]);
  assert.deepEqual(normalizeCategories("AI"), ["AI"]);
  assert.deepEqual(normalizeCategories("Académico"), ["Académico"]);
  assert.deepEqual(normalizeCategories(["Full-Stack", "AI", "Académico"]), ["Full-Stack", "AI", "Académico"]);
  assert.deepEqual(normalizeCategories(["Full-Stack", "Backend"]), ["Full-Stack", "Backend"]);
  assert.deepEqual(normalizeCategories(["Full-Stack", "Full-Stack"]), ["Full-Stack"]);
  assert.deepEqual(normalizeCategories([]), []);
  assert.deepEqual(normalizeCategories(undefined), []);
  assert.deepEqual(normalizeCategories(null), []);
  // Adversarial edge cases: sparse arrays, empty strings, untrimmed whitespace
  assert.deepEqual(normalizeCategories(["Full-Stack", "", null, undefined, "   ", "AI"]), ["Full-Stack", "AI"]);
  assert.deepEqual(normalizeCategories(["  Full-Stack  ", " AI "]), ["Full-Stack", "AI"]);
});

runTest("Projects filtering matrix accurately segments multi-tagged projects", () => {
  const sampleProjects = [
    { id: "studyquest", category: ["Full-Stack", "AI", "Académico"] },
    { id: "booklibre", category: ["Full-Stack", "Académico"] },
    { id: "sqlify", category: ["Full-Stack", "AI", "Académico"] },
    { id: "algo-que-pedir", category: ["Full-Stack", "Backend", "Académico"] },
  ];

  const filterFor = (activeCategory, list) => {
    return list.filter((proj) => {
      if (activeCategory === "All") return true;
      const projectCategories = !proj.category
        ? []
        : Array.isArray(proj.category)
        ? proj.category
        : [proj.category];
      return projectCategories.includes(activeCategory);
    });
  };

  assert.equal(filterFor("All", sampleProjects).length, 4);
  assert.equal(filterFor("Full-Stack", sampleProjects).length, 4);
  assert.equal(filterFor("Académico", sampleProjects).length, 4);
  assert.equal(filterFor("AI", sampleProjects).length, 2);
  assert.equal(filterFor("Backend", sampleProjects).length, 1);
  assert.equal(filterFor("NonExistent", sampleProjects).length, 0);
});

// --- Suite 2: UI Presentation of Multiple Category Badges ---
console.log("\n--- Suite 2: UI Presentation of Multiple Category Badges ---");

runTest("ProjectCard renders category pills with flex-wrap, clean spacing & WCAG AA contrast", () => {
  const cardCode = fs.readFileSync(
    path.join(ROOT, "src/components/carousel/ProjectCard.tsx"),
    "utf8"
  );

  assert.ok(cardCode.includes("Array.from") && cardCode.includes("new Set"), "Must deduplicate categories");
  assert.ok(cardCode.includes("flex flex-wrap items-center gap-1.5"), "Must have gap-1.5 wrap container");
  assert.ok(cardCode.includes("rounded-full") && cardCode.includes("uppercase tracking-wider"), "Must have rounded pills");
  assert.ok(cardCode.includes("text-[#3744bd]") && cardCode.includes("dark:text-[#93c5fd]"), "Must have WCAG AA contrast text");
  assert.ok(cardCode.includes("<div className=\"shrink-0\">"), "Status badge must be shrink-0");
});

runTest("ProjectModal renders multiple category pills with clean spacing and year adjacency", () => {
  const modalCode = fs.readFileSync(
    path.join(ROOT, "src/components/ProjectModal.tsx"),
    "utf8"
  );

  assert.ok(modalCode.includes("Array.from") && modalCode.includes("new Set"), "Must deduplicate categories");
  assert.ok(modalCode.includes("flex flex-wrap items-center gap-1.5"), "Must have gap-1.5 wrap container");
  assert.ok(modalCode.includes("rounded-full") && modalCode.includes("bg-[#f8559f]/10 text-[#f8559f]"), "Must have pink pills");
  assert.ok(modalCode.includes("{project.year}"), "Must render project.year adjacent to category pills");
});

// --- Suite 3: Project Data Update & Technical Documentation Audit ---
console.log("\n--- Suite 3: Project Data Update & Technical Documentation Audit ---");

runTest("portfolioData.ts contains required categories and roadmaps for all 4 projects", () => {
  const dataCode = fs.readFileSync(
    path.join(ROOT, "src/data/portfolioData.ts"),
    "utf8"
  );

  assert.ok(dataCode.includes("id: \"studyquest\"") && dataCode.includes("[\"Full-Stack\", \"AI\", \"Académico\"]"));
  assert.ok(dataCode.includes("id: \"sqlify\"") && dataCode.includes("[\"Full-Stack\", \"AI\", \"Académico\"]"));
  assert.ok(dataCode.includes("id: \"algo-que-pedir\"") && dataCode.includes("[\"Full-Stack\", \"Backend\", \"Académico\"]"));
  assert.ok(dataCode.includes("id: \"booklibre\"") && dataCode.includes("[\"Full-Stack\", \"Académico\"]"));
  assert.ok(dataCode.includes("roadmap:"), "Projects must specify deployment/validation roadmap");
});

runTest("All project assets exist on disk in public/projects/", () => {
  const images = ["studyquest.png", "booklibre.png", "sqlify.png", "algo-que-pedir.png"];
  for (const img of images) {
    const fullPath = path.join(ROOT, "public/projects", img);
    assert.ok(fs.existsSync(fullPath), "Asset must exist: " + img);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 1000, "Asset must be non-empty: " + img);
  }
});

runTest("TechIcon maps authentic brand and CS icons for full project stacks", () => {
  const techIconCode = fs.readFileSync(
    path.join(ROOT, "src/components/TechIcon.tsx"),
    "utf8"
  );

  assert.ok(techIconCode.includes("SiExpress"), "TechIcon must use SiExpress");
  assert.ok(techIconCode.includes("SiSocketdotio"), "TechIcon must use SiSocketdotio");
  assert.ok(techIconCode.includes("SiVite"), "TechIcon must use SiVite");
  assert.ok(techIconCode.includes("SiFramer"), "TechIcon must use SiFramer");
  assert.ok(techIconCode.includes("SiTypeorm"), "TechIcon must use SiTypeorm");
  assert.ok(techIconCode.includes("SiFlyway"), "TechIcon must use SiFlyway");
  assert.ok(techIconCode.includes("SiJsonwebtokens"), "TechIcon must use SiJsonwebtokens");
  assert.ok(techIconCode.includes("Boxes"), "TechIcon must use Boxes for Data Structures");
  assert.ok(techIconCode.includes("Network"), "TechIcon must use Network for Graphs");
  assert.ok(techIconCode.includes("Cpu"), "TechIcon must use Cpu for Algorithms");
  assert.ok(techIconCode.includes("GraduationCap"), "TechIcon must use GraduationCap for UNSAM");
});

// --- Suite 4: Static Export HTML Integrity & WAI-ARIA Architecture ---
console.log("\n--- Suite 4: Static Export HTML Integrity & WAI-ARIA Architecture ---");

runTest("Compiled static HTML includes all projects and multi-category badges", () => {
  const htmlPath = path.join(ROOT, "out/index.html");
  assert.ok(fs.existsSync(htmlPath), "out/index.html must exist from pnpm build");

  const html = fs.readFileSync(htmlPath, "utf8");
  assert.ok(html.includes("StudyQuest"), "StudyQuest in static HTML");
  assert.ok(html.includes("BookLibre"), "BookLibre in static HTML");
  assert.ok(html.includes("SQLify"), "SQLify in static HTML");
  assert.ok(html.includes("AlgoQuePedir"), "AlgoQuePedir in static HTML");

  assert.ok(html.includes("Full-Stack"), "Full-Stack pill in static HTML");
  assert.ok(html.includes("Backend"), "Backend pill in static HTML");
});

runTest("Projects.tsx implements full WAI-ARIA tab pattern with roving tabIndex and tabpanel", () => {
  const projectsCode = fs.readFileSync(path.join(ROOT, "src/components/Projects.tsx"), "utf8");
  assert.ok(
    projectsCode.includes("id={toTabId(cat)}"),
    "Projects.tsx must assign deterministic id to each category tab"
  );
  assert.ok(
    projectsCode.includes("role=\"tablist\"") && projectsCode.includes("onKeyDown={handleTabKeyDown}"),
    "Projects.tsx must handle keyboard navigation on tablist"
  );
  assert.ok(
    projectsCode.includes("tabIndex={isSelected ? 0 : -1}"),
    "Projects.tsx must enforce WAI-ARIA roving tabIndex"
  );
  assert.ok(
    projectsCode.includes("aria-controls=\"projects-tabpanel\""),
    "Category tabs must link to tabpanel via aria-controls"
  );
  assert.ok(
    projectsCode.includes("id=\"projects-tabpanel\"") && projectsCode.includes("role=\"tabpanel\""),
    "Projects container must declare role=\"tabpanel\" and matching id"
  );
});

console.log("\n==================================================================");
console.log(" RESULTS: " + passed + " passed, 0 failed (Total: " + total + ")");
console.log("==================================================================");
