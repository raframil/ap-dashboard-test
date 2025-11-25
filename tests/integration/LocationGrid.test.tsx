import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocationGrid } from "@/features/locations/components/LocationGrid";
import { mockLocationsResponse } from "../utils/apollo-mocks";
import { renderWithProviders } from "../utils/test-utils";

describe("LocationGrid Integration", () => {
	it("fetches and displays locations on mount", async () => {
		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockLocationsResponse],
		});

		const skeletons = screen.getAllByTestId("skeleton-loading-card");
		expect(skeletons.length).toBeGreaterThan(0);

		await waitFor(
			() => {
				expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Abadango")).toBeInTheDocument();
	});

	it("displays loading skeletons while fetching", () => {
		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockLocationsResponse],
		});

		const skeletons = screen.getAllByTestId("skeleton-loading-card");
		expect(skeletons.length).toBe(6);
	});

	it("displays location details correctly", async () => {
		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockLocationsResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Planet")).toBeInTheDocument();
		expect(screen.getByText("Dimension C-137")).toBeInTheDocument();

		expect(screen.getByText("2 residents")).toBeInTheDocument();
	});

	it("displays error message when query fails", async () => {
		const mockError = {
			request: mockLocationsResponse.request,
			error: new Error("Network error: Failed to fetch"),
		};

		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockError],
		});

		await waitFor(
			() => {
				expect(
					screen.getByText("Failed to load locations"),
				).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);
	});

	it("displays empty state when no locations found", async () => {
		const mockEmptyResponse = {
			request: mockLocationsResponse.request,
			result: {
				data: {
					locations: {
						info: { count: 0, pages: 0, next: null, prev: null },
						results: [],
					},
				},
			},
		};

		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockEmptyResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("No locations found")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(
			screen.getByText("Try adjusting your search or filters"),
		).toBeInTheDocument();
	});

	it("displays end message when hasMore is false", async () => {
		const mockNoMorePages = {
			...mockLocationsResponse,
			result: {
				data: {
					locations: {
						...mockLocationsResponse.result.data.locations,
						info: {
							...mockLocationsResponse.result.data.locations.info,
							next: null,
						},
					},
				},
			},
		};

		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockNoMorePages],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Congratulations!")).toBeInTheDocument();
		expect(
			screen.getByText("You have explored all locations in the multiverse"),
		).toBeInTheDocument();
	});

	it("renders multiple locations from API response", async () => {
		renderWithProviders(<LocationGrid />, {
			apolloMocks: [mockLocationsResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
		expect(screen.getByText("Abadango")).toBeInTheDocument();
	});
});
