"use client";

import { useFeatureCardContext } from "./FeatureCardContext";

interface FeatureCardIconProps {
	children: React.ReactNode;
	className?: string;
}

export function FeatureCardIcon({
	children,
	className = "",
}: FeatureCardIconProps) {
	const { isHovered } = useFeatureCardContext();

	return (
		<div
			className={`
        w-20 h-20 rounded-full bg-interactive-primary
        shadow-portal transition-all flex items-center justify-center
        ${isHovered ? "shadow-portal-lg" : ""}
        ${className}
      `}
		>
			{children}
		</div>
	);
}
