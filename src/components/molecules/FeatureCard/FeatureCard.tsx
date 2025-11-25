"use client";

import Link from "next/link";
import { useState } from "react";
import { FeatureCardContext } from "./FeatureCardContext";
import { FeatureCardIcon } from "./FeatureCardIcon";
import { FeatureCardTitle } from "./FeatureCardTitle";
import { FeatureCardDescription } from "./FeatureCardDescription";
import { FeatureCardAction } from "./FeatureCardAction";

interface FeatureCardProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function FeatureCard({
	href,
	children,
	className = "",
}: FeatureCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<FeatureCardContext.Provider value={{ isHovered }}>
			<Link
				href={href}
				className={`
          group bg-surface border-2 border-DEFAULT hover:border-brand
          rounded-xl p-8 transition-all hover:shadow-portal hover:scale-105
          ${className}
        `}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="flex flex-col items-center gap-4">{children}</div>
			</Link>
		</FeatureCardContext.Provider>
	);
}

// Attach sub-components
FeatureCard.Icon = FeatureCardIcon;
FeatureCard.Title = FeatureCardTitle;
FeatureCard.Description = FeatureCardDescription;
FeatureCard.Action = FeatureCardAction;
