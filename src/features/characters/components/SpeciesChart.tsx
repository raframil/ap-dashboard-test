"use client";

import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryTheme,
	VictoryTooltip,
} from "victory";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { useCharacterSpeciesCounts } from "../hooks/useCharacterSpeciesCounts";

export function SpeciesChart() {
	const { result, loading, error } = useCharacterSpeciesCounts();

	if (loading) {
		return (
			<div className="bg-surface rounded-lg p-8 h-96 flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (error) {
		return <ErrorMessage message="Failed to load species statistics" />;
	}

	if (!result) {
		return (
			<div className="bg-surface rounded-lg p-8 h-96 flex items-center justify-center">
				<p className="text-muted">No species data available</p>
			</div>
		);
	}

	return (
		<div className="bg-surface rounded-lg p-6 shadow-card">
			<h3 className="text-2xl font-display text-primary mb-4">
				Top Species Distribution
			</h3>
			<div className="w-full">
				<VictoryChart horizontal theme={VictoryTheme.clean}>
					<VictoryAxis
						style={{
							axis: { stroke: "#232766" },
							tickLabels: {
								fontSize: 11,
								fill: "#d6daff",
							},
							grid: { stroke: "transparent" },
						}}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							axis: { stroke: "#232766" },
							tickLabels: { fontSize: 11, fill: "#d6daff" },
							grid: { stroke: "#1a1a42", strokeDasharray: "5,5" },
						}}
					/>
					<VictoryBar
						data={Object.entries(result).map(([species, count]) => ({
							species,
							count: count.info.count,
						}))}
						x="species"
						y="count"
						barRatio={0.8}
						style={{
							data: {
								fill: ({ datum }) => {
									if (datum.count > 50) return "#3cffaa";
									if (datum.count > 20) return "#00d4ff";
									if (datum.count > 10) return "#6c5ce7";
									return "#ffa500";
								},
								fillOpacity: 0.8,
								stroke: "#6cffb8",
								strokeWidth: 2,
							},
						}}
						labels={({ datum }) => datum.count}
						labelComponent={
							<VictoryTooltip
								style={{
									fontSize: 12,
									fill: "#f5f7ff",
								}}
								flyoutStyle={{
									fill: "#0a0622",
									stroke: "#3cffaa",
									strokeWidth: 2,
								}}
								cornerRadius={8}
								pointerLength={8}
							/>
						}
						animate={{
							duration: 1000,
							onLoad: { duration: 500 },
						}}
					/>
				</VictoryChart>
			</div>
			<p className="text-sm text-muted mt-4 text-center">
				Showing {Object.keys(result).length} species by character count
			</p>
		</div>
	);
}
