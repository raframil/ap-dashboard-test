import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

describe("useInfiniteScroll", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns a sentinel ref object", () => {
		const onLoadMore = vi.fn();
		const { result } = renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: false,
			}),
		);

		expect(result.current.current).toBeNull();
	});

	it("creates IntersectionObserver on mount", () => {
		const onLoadMore = vi.fn();

		renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: false,
			}),
		);

		expect(onLoadMore).not.toHaveBeenCalled();
	});

	it("does not call onLoadMore when not intersecting", () => {
		const onLoadMore = vi.fn();

		renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: false,
			}),
		);

		expect(onLoadMore).not.toHaveBeenCalled();
	});

	it("does not call onLoadMore when hasMore is false", () => {
		const onLoadMore = vi.fn();

		renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: false,
				isLoading: false,
			}),
		);

		expect(onLoadMore).not.toHaveBeenCalled();
	});

	it("does not call onLoadMore when isLoading is true", () => {
		const onLoadMore = vi.fn();

		renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: true,
			}),
		);

		expect(onLoadMore).not.toHaveBeenCalled();
	});

	it("accepts custom threshold", () => {
		const onLoadMore = vi.fn();

		const { result } = renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: false,
				threshold: 0.5,
			}),
		);

		expect(result.current.current).toBeNull();
	});

	it("disconnects observer on unmount", () => {
		const onLoadMore = vi.fn();

		const { unmount } = renderHook(() =>
			useInfiniteScroll({
				onLoadMore,
				hasMore: true,
				isLoading: false,
			}),
		);

		unmount();
		expect(onLoadMore).not.toHaveBeenCalled();
	});
});
