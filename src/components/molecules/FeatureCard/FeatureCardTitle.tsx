interface FeatureCardTitleProps {
	children: React.ReactNode;
	className?: string;
}

export function FeatureCardTitle({
	children,
	className = "",
}: FeatureCardTitleProps) {
	return (
		<h3 className={`text-2xl font-display text-brand ${className}`}>
			{children}
		</h3>
	);
}
