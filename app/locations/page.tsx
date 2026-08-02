"use client";

import { Suspense } from "react";
import { ViewToggle } from "@/components/molecules/ViewToggle";
import { PageHeader } from "@/components/organisms/PageHeader";
import { SearchSection } from "@/components/organisms/SearchSection";
import { LocationModal } from "@/features/location-details/components/LocationModal";
import { LocationGrid } from "@/features/locations/components/LocationGrid";
import { LocationTable } from "@/features/locations/components/LocationTable";
import { useUIStore } from "@/stores/useUIStore";

export default function LocationsPage() {
	const { locationViewMode, setLocationViewMode } = useUIStore();

	return (
		<div
			className="min-h-screen bg-space-950"
			style={{ background: "var(--bg-space-gradient)" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<PageHeader
					title="Location Explorer"
					subtitle="Discover and explore locations across the multiverse"
					action={
						<ViewToggle
							currentView={locationViewMode}
							onChange={setLocationViewMode}
						/>
					}
				/>

				<Suspense fallback={<div className="mt-8 mb-12 max-w-2xl h-12" />}>
					<SearchSection placeholder="Search for locations across dimensions..." />
				</Suspense>

				<Suspense fallback={<div>Loading...</div>}>
					{locationViewMode === "grid" ? (
						<LocationGrid />
					) : (
						<LocationTable />
					)}
				</Suspense>
			</div>

			<LocationModal />
		</div>
	);
}
