import {
	VictoryContainer,
	VictoryPie,
	VictoryTooltip,
} from "victory";

interface ChartDatum {
	x: string;
	y: number;
	[key: string]: unknown;
}

interface VictoryPieChartWrapperProps {
	data: ChartDatum[];
	colorScale: string[];
	labelFormatter: (datum: ChartDatum) => string;
	innerRadius?: number;
}

export function VictoryPieChartWrapper({
	data,
	colorScale,
	labelFormatter,
	innerRadius = 0,
}: VictoryPieChartWrapperProps) {
	return (
		<VictoryPie
			data={data}
			x="x"
			y="y"
			colorScale={colorScale}
			innerRadius={innerRadius}
			labels={({ datum }) => labelFormatter(datum as ChartDatum)}
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
	);
}
