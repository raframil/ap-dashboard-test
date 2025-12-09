"use client";

import { ChartContainer } from "@/components/charts/ChartContainer";
import { VictoryPieChartWrapper } from "@/components/charts/VictoryPieChartWrapper";
import { useLocationStats } from "../hooks/graphql";

const LOCATION_COLORS = [
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
];

export function LocationChart() {
	const { stats, loadingFirstPage, error } = useLocationStats();

	const chartData = stats.map((stat) => ({
		x: stat.name,
		y: stat.residentCount,
		dimension: stat.dimension,
	}));

	return (
		<ChartContainer
			loading={loadingFirstPage}
			error={error}
			data={stats}
			title="Top Locations by Population"
			emptyMessage="No location data available"
		>
			<VictoryPieChartWrapper
				data={chartData}
				colorScale={LOCATION_COLORS}
				labelFormatter={(datum) => `${datum.x}\n${datum.y} residents`}
			/>
			<p className="text-sm text-muted text-center">
				Showing top 10 locations by resident count
			</p>
		</ChartContainer>
	);
}
