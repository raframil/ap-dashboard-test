"use client";

import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryContainer,
	VictoryTheme,
	VictoryTooltip,
} from "victory";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { useLocationStats } from "../hooks/useLocationStats";

export function LocationChart() {
	const { stats, loading, error } = useLocationStats();

	if (loading) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (error) {
		return <ErrorMessage message="Failed to load location statistics" />;
	}

	if (stats.length === 0) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<p className="text-muted">No location data available</p>
			</div>
		);
	}

	return (
		<div className="bg-surface border border-DEFAULT rounded-lg p-6 shadow-card">
			<h3 className="text-2xl font-display text-primary mb-4">
				Top Locations by Population
			</h3>
			<div className="w-full" style={{ height: 400 }}>
				<VictoryChart
					theme={VictoryTheme.material}
					domainPadding={{ x: 30 }}
					padding={{ top: 20, bottom: 80, left: 60, right: 20 }}
					containerComponent={<VictoryContainer responsive={true} />}
				>
					<VictoryAxis
						style={{
							axis: { stroke: "#232766" },
							tickLabels: {
								fontSize: 10,
								fill: "#d6daff",
								angle: -45,
								textAnchor: "end",
							},
							grid: { stroke: "transparent" },
						}}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							axis: { stroke: "#232766" },
							tickLabels: { fontSize: 12, fill: "#d6daff" },
							grid: { stroke: "#1a1a42", strokeDasharray: "5,5" },
						}}
					/>
					<VictoryBar
						data={stats}
						x="name"
						y="residentCount"
						style={{
							data: {
								fill: "#3cffaa",
								fillOpacity: 0.8,
								stroke: "#6cffb8",
								strokeWidth: 2,
							},
						}}
						labels={({ datum }) => `${datum.residentCount} residents`}
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
				Showing top 10 locations by resident count
			</p>
		</div>
	);
}
