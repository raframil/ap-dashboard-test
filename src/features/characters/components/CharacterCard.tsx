"use client";

import { IconPin } from "@tabler/icons-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { SpoilerBadge } from "@/components/molecules/SpoilerBadge";
import type { Character } from "@/types/character";

interface CharacterCardProps {
	character: Character;
	onClick?: (character: Character) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: we need to use a div here because we have a children button
		<div
			onClick={() => onClick?.(character)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick?.(character);
				}
			}}
			tabIndex={0}
			className={`
				w-full bg-surface border border-DEFAULT rounded-lg p-6
				hover:bg-surface-elevated hover:border-brand
				transition-all duration-300
				shadow-default hover:shadow-portal
				text-left group cursor-pointer
      		`}
			role="button"
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
						<SpoilerBadge
							characterId={character.id}
							status={character.status}
						/>
						<Badge variant="default">{character.gender}</Badge>
					</div>
					{character.location && (
						<p className="text-xs text-muted mt-3 truncate flex items-center gap-2">
							<IconPin size={16} /> {character.location.name}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
