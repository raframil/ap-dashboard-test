"use client";

import { Suspense } from "react";
import { SpoilerToggle } from "@/components/molecules/SpoilerToggle";
import { ViewToggle } from "@/components/molecules/ViewToggle";
import { PageHeader } from "@/components/organisms/PageHeader";
import { SearchSection } from "@/components/organisms/SearchSection";
import { CharacterModal } from "@/features/character-details/components/CharacterModal";
import { CharacterGrid } from "@/features/characters/components/CharacterGrid";
import { CharacterTable } from "@/features/characters/components/CharacterTable";
import { useUIStore } from "@/stores/useUIStore";

export default function CharactersPage() {
	const { characterViewMode, setCharacterViewMode } = useUIStore();

	return (
		<div
			className="min-h-screen bg-space-950"
			style={{ background: "var(--bg-space-gradient)" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<PageHeader
					title="Character Database"
					subtitle="Search and explore characters from across the multiverse"
					action={
						<div className="flex items-center gap-4">
							<SpoilerToggle />
							<ViewToggle
								currentView={characterViewMode}
								onChange={setCharacterViewMode}
							/>
						</div>
					}
				/>

				<Suspense fallback={<div className="mt-8 mb-12 max-w-2xl h-12" />}>
					<SearchSection placeholder="Search for characters across dimensions..." />
				</Suspense>

				<Suspense fallback={<div>Loading...</div>}>
					{characterViewMode === "grid" ? (
						<CharacterGrid />
					) : (
						<CharacterTable />
					)}
				</Suspense>
			</div>

			<CharacterModal />
		</div>
	);
}
