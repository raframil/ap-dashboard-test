"use client";

import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "../atoms/Button";

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

	const renderCorrectEyeIcon = () => {
		return isSpoilerModeEnabled ? (
			<IconEye size={20} />
		) : (
			<IconEyeOff size={20} />
		);
	};

	return (
		<div
			className="relative flex flex-col gap-2 items-start md:items-end"
			ref={menuRef}
		>
			<Button
				onClick={toggleSpoilerMode}
				variant={isSpoilerModeEnabled ? "primary" : "secondary"}
				size="sm"
				aria-label={isSpoilerModeEnabled ? "Show All" : "Hide Spoilers"}
				className="w-fit"
			>
				<div className="flex items-center gap-2">
					{renderCorrectEyeIcon()}
					{isSpoilerModeEnabled ? "Show All" : "Hide Spoilers"}
				</div>
			</Button>

			{isSpoilerModeEnabled && revealedCount > 0 && (
				<Button
					variant="ghost"
					onClick={() => {
						clearRevealedCharacters();
						setIsMenuOpen(false);
					}}
					size="sm"
					className="w-fit"
				>
					<div className="flex items-center gap-2">
						<IconX size={20} />
						Clear {revealedCount} reveal{revealedCount !== 1 ? "s" : ""}
					</div>
				</Button>
			)}
		</div>
	);
}
