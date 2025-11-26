import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { useUIStore } from "@/stores/useUIStore";
import type { Character } from "@/types/character";

interface SpoilerBadgeProps {
	characterId: string;
	status: Character["status"];
}

export function SpoilerBadge({ characterId, status }: SpoilerBadgeProps) {
	const [badgeBlurredText, setBadgeBlurredText] = useState<string>("Spoiler");
	const { isCharacterRevealed, revealCharacter, isSpoilerModeEnabled } =
		useUIStore();

	const isRevealed = isCharacterRevealed(characterId);
	const shouldBlur = !isRevealed;

	const statusVariant = {
		Alive: "success" as const,
		Dead: "error" as const,
		unknown: "warning" as const,
	}[status];

	const handleReveal = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isSpoilerModeEnabled) return;
		revealCharacter(characterId);
	};

	return (
		<Badge
			variant={shouldBlur ? "warning" : statusVariant}
			onClick={handleReveal}
			aria-label="Click to reveal status"
			onMouseEnter={() => setBadgeBlurredText("Reveal?")}
			onMouseLeave={() => setBadgeBlurredText("Spoiler")}
		>
			{shouldBlur ? badgeBlurredText : status}
		</Badge>
	);
}
