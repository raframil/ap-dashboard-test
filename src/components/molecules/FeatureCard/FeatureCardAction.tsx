"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useFeatureCardContext } from "./FeatureCardContext";

interface FeatureCardActionProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
}

export function FeatureCardAction({
	children,
	icon = <IconArrowRight size={20} />,
	className = "",
}: FeatureCardActionProps) {
	const { isHovered } = useFeatureCardContext();

	return (
		<div
			className={`
        mt-auto flex items-center text-brand transition-all
        ${isHovered ? "gap-3" : "gap-2"}
        ${className}
      `}
		>
			<span className="font-display">{children}</span>
			{icon}
		</div>
	);
}
