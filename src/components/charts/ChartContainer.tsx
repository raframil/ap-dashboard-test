import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";

interface ChartContainerProps {
	loading: boolean;
	error?: Error | null;
	data: unknown[] | Record<string, unknown> | null | undefined;
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	height?: number;
	onRetry?: () => void;
	emptyMessage?: string;
}

export function ChartContainer({
	loading,
	error,
	data,
	title,
	subtitle,
	children,
	height = 400,
	onRetry,
	emptyMessage = "No data available",
}: ChartContainerProps) {
	const isEmpty =
		!data ||
		(Array.isArray(data) && data.length === 0) ||
		(typeof data === "object" && Object.keys(data).length === 0);

	if (loading) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (error) {
		return (
			<ErrorMessage
				message={`Failed to load ${title.toLowerCase()}`}
				onRetry={onRetry}
			/>
		);
	}

	if (isEmpty) {
		return (
			<div className="bg-surface border border-DEFAULT rounded-lg p-8 h-96 flex items-center justify-center">
				<p className="text-muted">{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className="bg-surface border border-DEFAULT rounded-lg p-6 shadow-card">
			<div className="mb-4">
				<h3 className="text-2xl font-display text-primary">{title}</h3>
				{subtitle && <p className="text-sm text-muted mt-2">{subtitle}</p>}
			</div>
			<div className="w-full" style={{ height }}>
				{children}
			</div>
		</div>
	);
}
