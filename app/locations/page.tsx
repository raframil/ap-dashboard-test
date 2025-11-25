"use client";

import { useState } from "react";
import { SearchInput } from "@/components/molecules/SearchInput";
import { PageHeader } from "@/components/organisms/PageHeader";
import { LocationModal } from "@/features/location-details/components/LocationModal";
import { LocationGrid } from "@/features/locations/components/LocationGrid";

export default function LocationsPage() {
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
					title="Location Explorer"
					subtitle="Discover and explore locations across the multiverse"
				/>

				<div className="mt-8 mb-12 max-w-2xl">
					<SearchInput
						onSearch={handleSearch}
						placeholder="Search for locations across dimensions..."
						debounceMs={300}
					/>
				</div>

				<LocationGrid filter={searchTerm ? { name: searchTerm } : undefined} />
			</div>

			<LocationModal />
		</div>
	);
}
