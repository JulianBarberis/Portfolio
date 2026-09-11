import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { MotionGlobalConfig } from "framer-motion";

// Skip Framer Motion animations in tests for instant DOM transitions
MotionGlobalConfig.skipAnimations = true;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // Ignore environments where storage is disabled
  }
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver {
  callback?: ResizeObserverCallback;
  constructor(callback?: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  callback?: IntersectionObserverCallback;
  constructor(callback?: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock canvas-confetti
vi.mock("canvas-confetti", () => {
  const mockConfetti = vi.fn();
  const mockCreate = vi.fn().mockReturnValue(vi.fn());
  const mockReset = vi.fn();
  Object.assign(mockConfetti, {
    create: mockCreate,
    reset: mockReset,
  });
  return {
    __esModule: true,
    default: mockConfetti,
    create: mockCreate,
    reset: mockReset,
  };
});

// Mock navigator.clipboard
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    writable: true,
    configurable: true,
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue(""),
    },
  });
} else if (!navigator.clipboard.writeText) {
  navigator.clipboard.writeText = vi.fn().mockResolvedValue(undefined);
}

// Mock window.scrollTo
if (!window.scrollTo) {
  window.scrollTo = vi.fn();
}

// Ensure requestAnimationFrame is defined on window and global
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return setTimeout(() => callback(performance.now()), 0) as unknown as number;
  };
}
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = window.requestAnimationFrame;
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id: number): void => {
    clearTimeout(id);
  };
}
if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = window.cancelAnimationFrame;
}

if (!global.matchMedia) {
  global.matchMedia = window.matchMedia;
}

