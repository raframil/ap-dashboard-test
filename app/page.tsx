"use client";

import { IconChartDonut, IconMapPin, IconUsers } from "@tabler/icons-react";
import { FeatureCard } from "@/components/molecules/FeatureCard";

export default function Home() {
	return (
		<div
			className="min-h-screen bg-space-950"
			style={{ background: "var(--bg-space-gradient)" }}
		>
			<section className="relative overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
					<div className="text-center max-w-4xl mx-auto flex flex-col gap-12">
						<h1 className="text-3xl md:text-6xl lg:text-7xl font-display text-primary leading-tight">
							Interdimensional
							<br />
							<span className="text-brand">Portal</span> Hub
						</h1>
						<p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
							Track characters, explore dimensions, and manage your multiverse
							operations across infinite realities
						</p>

						<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
							<FeatureCard href="/characters">
								<FeatureCard.Icon>
									<IconUsers size={32} />
								</FeatureCard.Icon>
								<FeatureCard.Title>Browse Characters</FeatureCard.Title>
								<FeatureCard.Description>
									Search and explore the multiverse character database with
									infinite scroll
								</FeatureCard.Description>
								<FeatureCard.Action>Explore Now</FeatureCard.Action>
							</FeatureCard>

							<FeatureCard href="/locations">
								<FeatureCard.Icon>
									<IconMapPin size={32} />
								</FeatureCard.Icon>
								<FeatureCard.Title>Explore Locations</FeatureCard.Title>
								<FeatureCard.Description>
									Discover and navigate through locations across the multiverse
								</FeatureCard.Description>
								<FeatureCard.Action>Discover</FeatureCard.Action>
							</FeatureCard>

							<FeatureCard href="/analytics">
								<FeatureCard.Icon>
									<IconChartDonut size={32} />
								</FeatureCard.Icon>
								<FeatureCard.Title>View Statistics</FeatureCard.Title>
								<FeatureCard.Description>
									Analyze location data and population statistics across
									dimensions
								</FeatureCard.Description>
								<FeatureCard.Action>View Charts</FeatureCard.Action>
							</FeatureCard>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
