"use client";

import { ChartContainer } from "@/components/charts/ChartContainer";
import { VictoryPieChartWrapper } from "@/components/charts/VictoryPieChartWrapper";
import { useCharacterStatusCounts } from "../hooks/graphql";

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

export function CharacterStatusChart() {
	const { stats, loading, error } = useCharacterStatusCounts();

	const colorScale = stats.map((stat) => getColorForStatus(stat.status));

	const chartData = stats.map((stat) => ({
		x: stat.status.charAt(0).toUpperCase() + stat.status.slice(1),
		y: stat.count,
		percentage: stat.percentage,
	}));

	const formatLabel = (datum: { x: string; y: number; percentage: number }) => {
		return `${datum.x}\n${datum.y} (${datum.percentage.toFixed(1)}%)`;
	};

	return (
		<ChartContainer
			loading={loading}
			error={error}
			data={stats}
			title="Character Status Distribution"
			emptyMessage="No character data available"
		>
			<VictoryPieChartWrapper
				data={chartData}
				colorScale={colorScale}
				labelFormatter={(datum) =>
					formatLabel(
						datum as unknown as { x: string; y: number; percentage: number },
					)
				}
				innerRadius={100}
			/>
			<p className="text-sm text-muted text-center">
				Character survival statistics
			</p>
		</ChartContainer>
	);
}
