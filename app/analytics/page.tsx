import { PageHeader } from "@/components/organisms/PageHeader";
import { CharacterStatusChart } from "@/features/characters/components/CharacterStatusChart";
import { SpeciesChart } from "@/features/characters/components/SpeciesChart";
import { LocationChart } from "@/features/locations/components/LocationChart";

export default function LocationsPage() {
	return (
		<div
			className="min-h-screen bg-space-950"
			style={{ background: "var(--bg-space-gradient)" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<PageHeader
					title="Analytics"
					subtitle="Analyze data across dimensions and locations"
				/>

				<section className="my-12 grid md:grid-cols-3 gap-6">
					<article className="bg-surface border border-DEFAULT rounded-lg p-6">
						<h3 className="text-lg font-display text-brand mb-2">
							Population Tracking
						</h3>
						<p className="text-sm text-secondary">
							View resident counts across different locations in the multiverse
						</p>
					</article>
					<article className="bg-surface border border-DEFAULT rounded-lg p-6">
						<h3 className="text-lg font-display text-brand mb-2">
							Character Status
						</h3>
						<p className="text-sm text-secondary">
							Track survival rates and character status across the universe
						</p>
					</article>
					<article className="bg-surface border border-DEFAULT rounded-lg p-6">
						<h3 className="text-lg font-display text-brand mb-2">
							Species Diversity
						</h3>
						<p className="text-sm text-secondary">
							Explore the distribution of species in the Rick and Morty universe
						</p>
					</article>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<LocationChart />
					<CharacterStatusChart />
				</div>

				<div className="mb-12">
					<SpeciesChart />
				</div>
			</div>
		</div>
	);
}
