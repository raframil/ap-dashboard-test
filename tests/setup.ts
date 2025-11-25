import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
	cleanup();
});

global.IntersectionObserver = class IntersectionObserver {
	disconnect(): void {}
	observe(): void {}
	unobserve(): void {}
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
} as unknown as typeof IntersectionObserver;

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
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
