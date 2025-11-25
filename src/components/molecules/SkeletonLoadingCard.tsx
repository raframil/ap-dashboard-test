export function SkeletonLoadingCard() {
	return (
		<div
			className="bg-surface border border-DEFAULT rounded-lg p-6 animate-pulse"
			data-testid="skeleton-loading-card"
		>
			<div className="flex items-start gap-4">
				<div className="h-16 w-16 rounded-full bg-surface-hover" />
				<div className="flex-1 space-y-3">
					<div className="h-5 w-3/4 bg-surface-hover rounded" />
					<div className="h-4 w-1/2 bg-surface-hover rounded" />
					<div className="flex gap-2">
						<div className="h-6 w-16 bg-surface-hover rounded-full" />
						<div className="h-6 w-20 bg-surface-hover rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
