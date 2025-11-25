"use client";

import { VictoryContainer, VictoryPie, VictoryTooltip } from "victory";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { useCharacterStatusCounts } from "../hooks/useCharacterStatusCounts";


export function CharacterStatusChart() {
	const { stats, loading, error } = useCharacterStatusCounts();

	if (loading) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (error) {
		return <ErrorMessage message="Failed to load character statistics" />;
	}

	if (stats.length === 0) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<p className="text-muted">No character data available</p>
			</div>
		);
	}

	const getColorForStatus = (status: string) => {
		switch (status) {
			case "Alive":
				return "#3cffaa";
			case "Dead":
				return "#ff3c3c";
			case "unknown":
				return "#ffa500";
			default:
				return "#d6daff";
		}
	};

	const colorScale = stats.map((stat) => getColorForStatus(stat.status));

	const formatLabel = (datum: (typeof stats)[number]) => {
		return `${datum.status.charAt(0).toUpperCase() + datum.status.slice(1)}\n${datum.count} (${datum.percentage.toFixed(1)}%)`;
	};

	return (
		<div className="bg-surface border border-DEFAULT rounded-lg p-6 shadow-card">
			<h3 className="text-2xl font-display text-primary mb-4">
				Character Status Distribution
			</h3>
			<div className="w-full" style={{ height: 400 }}>
				<VictoryPie
					data={stats}
					x="status"
					y="count"
					colorScale={colorScale}
					innerRadius={100}
					labels={({ datum }) => formatLabel(datum)}
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
							fontSize: 13,
							fontWeight: 600,
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
				Character survival statistics
			</p>
		</div>
	);
}
