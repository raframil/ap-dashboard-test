import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterStatusChart } from "@/features/characters/components/CharacterStatusChart";
import * as useCharacterStatusCountsHook from "@/features/characters/hooks/useCharacterStatusCounts";
import { renderWithProviders } from "../../utils/test-utils";

vi.mock("@/features/characters/hooks/useCharacterStatusCounts");

const mockStats = [
	{ status: "Alive", count: 439, percentage: 0.7 },
	{ status: "Dead", count: 150, percentage: 0.24 },
	{ status: "unknown", count: 37, percentage: 0.06 },
];

describe("CharacterStatusChart", () => {
	it("renders chart with status data", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: mockStats,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(
			screen.getByText("Character Status Distribution"),
		).toBeInTheDocument();
		expect(
			screen.getByText("Character survival statistics"),
		).toBeInTheDocument();
	});

	it("displays loading state", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: [],
			loading: true,
			error: undefined,
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays error message when query fails", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: [],
			loading: false,
			error: new Error("Network error"),
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(
			screen.getByText("Failed to load character status distribution"),
		).toBeInTheDocument();
	});

	it("displays empty state when no data available", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: [],
			loading: false,
			error: undefined,
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(screen.getByText("No character data available")).toBeInTheDocument();
	});

	it("renders chart with correct status labels", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: mockStats,
			loading: false,
			error: undefined,
		});

		const { container } = renderWithProviders(<CharacterStatusChart />);

		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("transforms status data correctly for chart display", () => {
		const customStats = [
			{ status: "Alive", count: 100, percentage: 0.5 },
			{ status: "Dead", count: 100, percentage: 0.5 },
			{ status: "unknown", count: 0, percentage: 0 },
		];

		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: customStats,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(
			screen.getByText("Character Status Distribution"),
		).toBeInTheDocument();
	});

	it("displays subtitle text", () => {
		vi.spyOn(
			useCharacterStatusCountsHook,
			"useCharacterStatusCounts",
		).mockReturnValue({
			stats: mockStats,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<CharacterStatusChart />);

		expect(
			screen.getByText("Character survival statistics"),
		).toBeInTheDocument();
	});
});
