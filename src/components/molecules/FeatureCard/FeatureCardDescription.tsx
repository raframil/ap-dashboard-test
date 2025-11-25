interface FeatureCardDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function FeatureCardDescription({
	children,
	className = "",
}: FeatureCardDescriptionProps) {
	return <p className={`text-secondary text-sm ${className}`}>{children}</p>;
}
