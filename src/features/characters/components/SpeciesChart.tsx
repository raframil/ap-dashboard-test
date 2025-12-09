"use client";

import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryTheme,
	VictoryTooltip,
} from "victory";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { useCharacterSpeciesCounts } from "../hooks/graphql";

export function SpeciesChart() {
	const { result, loading, error } = useCharacterSpeciesCounts();

	const speciesData = result
		? Object.entries(result).map(([species, count]) => ({
				species,
				count: count.info.count,
			}))
		: [];

	return (
		<ChartContainer
			loading={loading}
			error={error}
			data={speciesData}
			title="Top Species Distribution"
			emptyMessage="No species data available"
		>
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
					data={speciesData}
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
			<p className="text-sm text-muted text-center">
				Showing {speciesData.length} species by character count
			</p>
		</ChartContainer>
	);
}
