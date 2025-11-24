"use client";

import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";

export function SpoilerToggle() {
	const {
		isSpoilerModeEnabled,
		toggleSpoilerMode,
		revealedCharacters,
		clearRevealedCharacters,
	} = useUIStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const revealedCount = revealedCharacters.size;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMenuOpen]);

	return (
		<div className="relative" ref={menuRef}>
			<button
				onClick={toggleSpoilerMode}
				className={`
          flex items-center gap-3 px-4 py-2 rounded-full
          font-display text-sm transition-all
          border-2
          ${
						isSpoilerModeEnabled
							? "bg-brand/10 border-brand text-brand shadow-portal"
							: "bg-surface border-DEFAULT text-secondary hover:border-brand"
					}
        `}
				aria-label={isSpoilerModeEnabled ? "Hide spoilers" : "Show spoilers"}
				type="button"
			>
				<span className="text-lg">
					{isSpoilerModeEnabled ? (
						<IconEyeOff size={20}/>
					) : (
						<IconEye size={20}/>
					)}
				</span>

				<span className="hidden sm:inline">
					{isSpoilerModeEnabled ? "Spoilers Hidden" : "Spoilers Shown"}
				</span>

		
			</button>

			{isSpoilerModeEnabled && revealedCount > 0 && (
				<button
					onClick={() => {
						clearRevealedCharacters();
						setIsMenuOpen(false);
					}}
					className="absolute top-full right-0 mt-2 px-4 py-2 bg-surface border border-DEFAULT hover:border-brand rounded-lg text-sm text-secondary hover:text-primary transition-all whitespace-nowrap shadow-[var(--shadow-default)]"
					type="button"
				>
					<div className="flex items-center gap-2">
						<IconX
							size={16}
							className="text-muted hover:text-primary transition-colors"
						/>
						Clear {revealedCount} reveal{revealedCount !== 1 ? "s" : ""}
					</div>
				</button>
			)}
		</div>
	);
}
