import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocationChart } from "@/features/locations/components/LocationChart";
import * as useLocationStatsHook from "@/features/locations/hooks/graphql";
import { renderWithProviders } from "../../utils/test-utils";

vi.mock("@/features/locations/hooks/graphql");

const mockStats = [
	{
		id: "1",
		name: "Earth (C-137)",
		dimension: "Dimension C-137",
		type: "Planet",
		residentCount: 27,
	},
	{
		id: "2",
		name: "Citadel of Ricks",
		dimension: "unknown",
		type: "Space station",
		residentCount: 15,
	},
	{
		id: "3",
		name: "Abadango",
		dimension: "unknown",
		type: "Cluster",
		residentCount: 1,
	},
];

describe("LocationChart", () => {
	it("renders chart with location data", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: mockStats,
			loadingFirstPage: false,
			fullyLoaded: true,
			error: null,
		});

		renderWithProviders(<LocationChart />);

		expect(screen.getByText("Top Locations by Population")).toBeInTheDocument();
		expect(
			screen.getByText("Showing top 10 locations by resident count"),
		).toBeInTheDocument();
	});

	it("displays loading state", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: [],
			loadingFirstPage: true,
			fullyLoaded: false,
			error: null,
		});

		renderWithProviders(<LocationChart />);

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays error message when query fails", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: [],
			loadingFirstPage: false,
			fullyLoaded: false,
			error: new Error("Network error"),
		});

		renderWithProviders(<LocationChart />);

		expect(
			screen.getByText("Failed to load top locations by population"),
		).toBeInTheDocument();
	});

	it("displays empty state when no data available", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: [],
			loadingFirstPage: false,
			fullyLoaded: true,
			error: null,
		});

		renderWithProviders(<LocationChart />);

		expect(screen.getByText("No location data available")).toBeInTheDocument();
	});

	it("transforms stats data correctly for chart", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: mockStats,
			loadingFirstPage: false,
			fullyLoaded: true,
			error: null,
		});

		const { container } = renderWithProviders(<LocationChart />);

		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("displays chart title and subtitle", () => {
		vi.spyOn(useLocationStatsHook, "useLocationStats").mockReturnValue({
			stats: mockStats,
			loadingFirstPage: false,
			fullyLoaded: true,
			error: null,
		});

		renderWithProviders(<LocationChart />);

		expect(screen.getByText("Top Locations by Population")).toBeInTheDocument();
		expect(
			screen.getByText("Showing top 10 locations by resident count"),
		).toBeInTheDocument();
	});
});
