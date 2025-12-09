import { screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CharacterGrid } from "@/features/characters/components/CharacterGrid";
import { renderWithProviders } from "../utils/test-utils";

const mockCharactersData = {
	characters: {
		info: {
			count: 826,
			pages: 42,
			next: 2,
			prev: null,
		},
		results: [
			{
				id: "1",
				name: "Rick Sanchez",
				status: "Alive",
				species: "Human",
				type: "",
				gender: "Male",
				origin: {
					id: "1",
					name: "Earth (C-137)",
					type: "Planet",
					dimension: "Dimension C-137",
				},
				location: {
					id: "20",
					name: "Citadel of Ricks",
					type: "Space station",
					dimension: "unknown",
				},
				image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
				episode: [],
				created: "2017-11-04T18:48:46.250Z",
			},
			{
				id: "2",
				name: "Morty Smith",
				status: "Alive",
				species: "Human",
				type: "",
				gender: "Male",
				origin: {
					id: "1",
					name: "Earth (C-137)",
					type: "Planet",
					dimension: "Dimension C-137",
				},
				location: {
					id: "20",
					name: "Citadel of Ricks",
					type: "Space station",
					dimension: "unknown",
				},
				image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
				episode: [],
				created: "2017-11-04T18:50:21.651Z",
			},
		],
	},
};

const mockEmptyCharactersData = {
	characters: {
		info: { count: 0, pages: 0, next: null, prev: null },
		results: [],
	},
};

const mockNoMorePagesData = {
	characters: {
		...mockCharactersData.characters,
		info: {
			count: 2,
			pages: 1,
			next: null,
			prev: null,
		},
	},
};

describe("CharacterGrid Integration", () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("fetches and displays characters on mount", async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockCharactersData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

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
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockCharactersData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

		const skeletons = screen.getAllByTestId("skeleton-loading-card");
		expect(skeletons.length).toBe(6);
	});

	it("displays error message when query fails", async () => {
		vi.mocked(global.fetch).mockRejectedValueOnce(
			new Error("Network error: Failed to fetch"),
		);

		renderWithProviders(<CharacterGrid />);

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
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockEmptyCharactersData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

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
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockCharactersData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

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
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockNoMorePagesData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

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
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockCharactersData,
		} as Response);

		renderWithProviders(<CharacterGrid />);

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
