"use client";

import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { SpoilerBadge } from "@/components/molecules/SpoilerBadge";
import { useUIStore } from "@/stores/useUIStore";

export function CharacterModal() {
	const { selectedCharacter, isCharacterModalOpen, closeCharacterModal } =
		useUIStore();

	useEffect(() => {
		if (isCharacterModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isCharacterModalOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeCharacterModal();
			}
		};

		if (isCharacterModalOpen) {
			window.addEventListener("keydown", handleEscape);
		}

		return () => window.removeEventListener("keydown", handleEscape);
	}, [isCharacterModalOpen, closeCharacterModal]);

	if (!isCharacterModalOpen || !selectedCharacter) return null;

	const handleOnKeyDownDialog = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeCharacterModal();
		}
	};

	const handleOnKeyUpDialog = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeCharacterModal();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-sm"
			onClick={closeCharacterModal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="character-modal-title"
			onKeyDown={handleOnKeyDownDialog}
			onKeyUp={handleOnKeyUpDialog}
		>
			<article
				className={`
          			w-full max-w-4xl max-h-[90vh] overflow-y-auto
					bg-surface-elevated border-2 border-brand rounded-xl
					shadow-portal-lg
					animate-in fade-in zoom-in duration-300
				`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				onKeyUp={(e) => e.stopPropagation()}
			>
				<div className="sticky top-0 bg-surface-elevated border-b border-DEFAULT p-6 flex items-start justify-between gap-4 z-10">
					<div className="flex flex-col sm:flex-row items-left sm:items-center gap-4">
						<Avatar
							src={selectedCharacter.image}
							alt={selectedCharacter.name}
							size="lg"
						/>
						<div>
							<h2
								id="character-modal-title"
								className="text-3xl font-display text-brand mb-2"
							>
								{selectedCharacter.name}
							</h2>
							<div className="flex flex-wrap gap-2">
								<SpoilerBadge
									characterId={selectedCharacter.id}
									status={selectedCharacter.status}
								/>
								<Badge variant="default">{selectedCharacter.species}</Badge>
								{selectedCharacter.type && (
									<Badge variant="info">{selectedCharacter.type}</Badge>
								)}
								<Badge variant="default">{selectedCharacter.gender}</Badge>
							</div>
						</div>
					</div>
					<button
						onClick={closeCharacterModal}
						className="text-muted hover:text-primary transition-colors p-2"
						aria-label="Close modal"
						type="button"
					>
						<IconX
							size={24}
							className="text-muted hover:text-primary transition-colors"
						/>
					</button>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-surface border border-DEFAULT rounded-lg p-4">
							<h3 className="text-lg font-display text-primary mb-2">Origin</h3>
							<p className="text-secondary">{selectedCharacter.origin.name}</p>
							{selectedCharacter.origin.type && (
								<p className="text-sm text-muted">
									{selectedCharacter.origin.type}
								</p>
							)}
							{selectedCharacter.origin.dimension && (
								<p className="text-sm text-muted">
									Dimension: {selectedCharacter.origin.dimension}
								</p>
							)}
						</div>

						<div className="bg-surface border border-DEFAULT rounded-lg p-4">
							<h3 className="text-lg font-display text-primary mb-2">
								Current Location
							</h3>
							<p className="text-secondary">
								{selectedCharacter.location.name}
							</p>
							{selectedCharacter.location.type && (
								<p className="text-sm text-muted">
									{selectedCharacter.location.type}
								</p>
							)}
							{selectedCharacter.location.dimension && (
								<p className="text-sm text-muted">
									Dimension: {selectedCharacter.location.dimension}
								</p>
							)}
						</div>
					</div>

					{selectedCharacter.episode &&
						selectedCharacter.episode.length > 0 && (
							<div>
								<h3 className="text-2xl font-display text-primary mb-4">
									Episodes ({selectedCharacter.episode.length})
								</h3>
								<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
									{selectedCharacter.episode.map((episode) => (
										<div
											key={episode.id}
											className="bg-surface border border-DEFAULT rounded-lg p-3 hover:border-brand transition-colors"
										>
											<p className="text-sm font-display text-brand mb-1">
												{episode.episode}
											</p>
											<p className="text-sm text-primary truncate">
												{episode.name}
											</p>
											<p className="text-xs text-muted mt-1">
												{episode.air_date}
											</p>
										</div>
									))}
								</div>
							</div>
						)}
				</div>

				<div className="sticky bottom-0 bg-surface-elevated border-t border-DEFAULT p-6">
					<Button
						variant="ghost"
						onClick={closeCharacterModal}
						className="w-full sm:w-auto"
					>
						Close
					</Button>
				</div>
			</article>
		</div>
	);
}
