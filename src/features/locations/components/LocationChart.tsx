"use client";

import {
	VictoryContainer,
	VictoryPie,
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
				<VictoryPie
					data={stats}
					x="name"
					y="residentCount"
					colorScale={[
						"#3cffaa",
						"#ff6b9d",
						"#ffa500",
						"#00d4ff",
						"#c44569",
						"#6c5ce7",
						"#fdcb6e",
						"#00b894",
						"#e17055",
						"#a29bfe",
					]}
					labels={({ datum }) =>
						`${datum.name}\n${datum.residentCount} residents`
					}
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
					style={{
						data: {
							stroke: "#6cffb8",
							strokeWidth: 2,
						},
						labels: {
							fill: "#f5f7ff",
							fontSize: 11,
						},
					}}
					containerComponent={<VictoryContainer responsive={true} />}
					animate={{
						duration: 1000,
						onLoad: { duration: 500 },
					}}
				/>
			</div>
			<p className="text-sm text-muted mt-4 text-center">
				Showing top 10 locations by resident count
			</p>
		</div>
	);
}
