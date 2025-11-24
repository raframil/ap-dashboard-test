"use client";

import { IconPin } from "@tabler/icons-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { useUIStore } from "@/stores/useUIStore";
import type { Character } from "@/types/character";

interface CharacterCardProps {
	character: Character;
	onClick?: (character: Character) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
	const { isCharacterRevealed, revealCharacter } = useUIStore();

	const isRevealed = isCharacterRevealed(character.id);
	const shouldBlur = !isRevealed;

	const statusVariant = {
		Alive: "success" as const,
		Dead: "error" as const,
		unknown: "default" as const,
	}[character.status];

	const handleReveal = (e: React.MouseEvent) => {
		e.stopPropagation();
		revealCharacter(character.id);
	};

	return (
		<button
			onClick={() => onClick?.(character)}
			className={`
				w-full bg-surface border border-DEFAULT rounded-lg p-6
				hover:bg-surface-elevated hover:border-brand
				transition-all duration-300
				shadow-default hover:shadow-portal
				text-left group
      		`}
			type="button"
		>
			<div className="flex items-start gap-4">
				<Avatar
					src={character.image}
					alt={character.name}
					size="md"
					className="shrink-0 group-hover:scale-105 transition-transform"
				/>
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-display text-primary mb-1 truncate group-hover:text-brand transition-colors">
						{character.name}
					</h3>
					<p className="text-sm text-secondary mb-3 truncate">
						{character.species}
						{character.type && ` - ${character.type}`}
					</p>
					<div className="flex flex-wrap gap-2">
						<div className="relative">
							<Badge
								variant={shouldBlur ? "default" : statusVariant}
								className={shouldBlur ? "blur-sm select-none" : ""}
							>
								{isRevealed && !shouldBlur && <span className="mr-1">✓</span>}
								{character.status}
							</Badge>
							{shouldBlur && (
								<button
									onClick={handleReveal}
									className="absolute inset-0 flex flex-col items-center justify-center hover:bg-brand/10 transition-colors group rounded"
									aria-label="Click to reveal status"
									type="button"
								>
									<span className="text-xs font-display text-brand group-hover:opacity-0 transition-opacity">
										Spoiler
									</span>
									<span className="text-xs text-muted absolute opacity-0 group-hover:opacity-100 transition-opacity">
										Reveal
									</span>
								</button>
							)}
						</div>
						<Badge variant="default">{character.gender}</Badge>
					</div>
					{character.location && (
						<p className="text-xs text-muted mt-3 truncate flex items-center gap-2">
							<IconPin size={16} /> {character.location.name}
						</p>
					)}
				</div>
			</div>
		</button>
	);
}
