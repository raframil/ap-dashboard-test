import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterGrid } from "@/features/characters/components/CharacterGrid";
import {
	mockCharactersError,
	mockCharactersResponse,
	mockEmptyCharactersResponse,
} from "../utils/apollo-mocks";
import { renderWithProviders } from "../utils/test-utils";

describe("CharacterGrid Integration", () => {
	it("fetches and displays characters on mount", async () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockCharactersResponse],
		});

		const skeletons = screen.getAllByTestId("skeleton-loading-card");
		expect(skeletons.length).toBeGreaterThan(0);

		await waitFor(
			() => {
				expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Morty Smith")).toBeInTheDocument();
	});

	it("displays loading skeletons while fetching", () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockCharactersResponse],
		});

		const skeletons = screen.getAllByTestId("skeleton-loading-card");
		expect(skeletons.length).toBe(6);
	});

	it("displays error message when query fails", async () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockCharactersError],
		});

		await waitFor(
			() => {
				expect(
					screen.getByText("Failed to load characters"),
				).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);
	});

	it("displays empty state when no characters found", async () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockEmptyCharactersResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("No characters found")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(
			screen.getByText("Try adjusting your search or filters"),
		).toBeInTheDocument();
	});

	it("renders character cards with correct data", async () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockCharactersResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		const humanElements = screen.getAllByText("Human");
		expect(humanElements.length).toBeGreaterThan(0);
		const locationElements = screen.getAllByText("Citadel of Ricks");
		expect(locationElements.length).toBeGreaterThan(0);
		expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
	});

	it("displays end message when hasMore is false", async () => {
		const mockNoMorePages = {
			...mockCharactersResponse,
			result: {
				data: {
					characters: {
						...mockCharactersResponse.result.data.characters,
						info: {
							...mockCharactersResponse.result.data.characters.info,
							next: null,
						},
					},
				},
			},
		};

		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockNoMorePages],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Congratulations!")).toBeInTheDocument();
		expect(
			screen.getByText("You have reached the end of the multiverse"),
		).toBeInTheDocument();
	});

	it("renders multiple characters from API response", async () => {
		renderWithProviders(<CharacterGrid />, {
			apolloMocks: [mockCharactersResponse],
		});

		await waitFor(
			() => {
				expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
		expect(screen.getByText("Morty Smith")).toBeInTheDocument();
	});
});
