import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpeciesChart } from "@/features/characters/components/SpeciesChart";
import * as useCharacterSpeciesCountsHook from "@/features/characters/hooks/graphql";
import { renderWithProviders } from "../../utils/test-utils";

vi.mock("@/features/characters/hooks/graphql");

const mockSpeciesData = {
	Human: { info: { count: 200 } },
	Alien: { info: { count: 150 } },
	Humanoid: { info: { count: 100 } },
	Animal: { info: { count: 50 } },
	Robot: { info: { count: 30 } },
};

describe("SpeciesChart", () => {
	it("renders chart with species data", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: mockSpeciesData,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<SpeciesChart />);

		expect(screen.getByText("Top Species Distribution")).toBeInTheDocument();
		expect(
			screen.getByText("Showing 5 species by character count"),
		).toBeInTheDocument();
	});

	it("displays loading state", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: null,
			loading: true,
			error: undefined,
		});

		renderWithProviders(<SpeciesChart />);

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays error message when query fails", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: null,
			loading: false,
			error: new Error("Network error"),
		});

		renderWithProviders(<SpeciesChart />);

		expect(
			screen.getByText("Failed to load top species distribution"),
		).toBeInTheDocument();
	});

	it("displays empty state when no data available", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: null,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<SpeciesChart />);

		expect(screen.getByText("No species data available")).toBeInTheDocument();
	});

	it("transforms species data correctly for bar chart", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: mockSpeciesData,
			loading: false,
			error: undefined,
		});

		const { container } = renderWithProviders(<SpeciesChart />);

		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("displays correct count in subtitle", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: mockSpeciesData,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<SpeciesChart />);

		expect(
			screen.getByText("Showing 5 species by character count"),
		).toBeInTheDocument();
	});

	it("handles empty object result", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: null,
			loading: false,
			error: undefined,
		});

		renderWithProviders(<SpeciesChart />);

		expect(screen.getByText("No species data available")).toBeInTheDocument();
	});

	it("renders horizontal bar chart", () => {
		vi.spyOn(
			useCharacterSpeciesCountsHook,
			"useCharacterSpeciesCounts",
		).mockReturnValue({
			result: mockSpeciesData,
			loading: false,
			error: undefined,
		});

		const { container } = renderWithProviders(<SpeciesChart />);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});
});
