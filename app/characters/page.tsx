"use client";

import { useState } from "react";
import { SearchInput } from "@/components/molecules/SearchInput";
import { SpoilerToggle } from "@/components/molecules/SpoilerToggle";
import { PageHeader } from "@/components/organisms/PageHeader";
import { CharacterModal } from "@/features/character-details/components/CharacterModal";
import { CharacterGrid } from "@/features/characters/components/CharacterGrid";

export default function CharactersPage() {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (query: string) => {
		setSearchTerm(query);
	};

	return (
		<div
			className="min-h-screen bg-space-950"
			style={{ background: "var(--bg-space-gradient)" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<PageHeader
					title="Character Database"
					subtitle="Search and explore characters from across the multiverse"
					action={<SpoilerToggle />}
				/>

				<div className="mt-8 mb-12 max-w-2xl">
					<SearchInput
						onSearch={handleSearch}
						placeholder="Search for characters across dimensions..."
						debounceMs={300}
					/>
				</div>

				<CharacterGrid filter={searchTerm ? { name: searchTerm } : undefined} />
			</div>

			<CharacterModal />
		</div>
	);
}
