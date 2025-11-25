import { createContext, useContext } from "react";

interface FeatureCardContextValue {
	isHovered: boolean;
}

export const FeatureCardContext = createContext<FeatureCardContextValue | null>(
	null,
);

export function useFeatureCardContext() {
	const context = useContext(FeatureCardContext);
	if (!context) {
		throw new Error(
			"FeatureCard compound components must be used within FeatureCard",
		);
	}
	return context;
}
