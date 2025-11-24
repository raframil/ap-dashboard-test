"use client";

import { PageHeader } from "@/components/organisms/PageHeader";
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

        <div>
          <LocationChart />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-surface border border-DEFAULT rounded-lg p-6">
            <h3 className="text-lg font-display text-brand mb-2">
              Population Tracking
            </h3>
            <p className="text-sm text-secondary">
              View resident counts across different locations in the multiverse
            </p>
          </div>
          <div className="bg-surface border border-DEFAULT rounded-lg p-6">
            <h3 className="text-lg font-display text-brand mb-2">
              Dimensional Analysis
            </h3>
            <p className="text-sm text-secondary">
              Compare character distribution across various dimensions
            </p>
          </div>
          <div className="bg-surface border border-DEFAULT rounded-lg p-6">
            <h3 className="text-lg font-display text-brand mb-2">
              Interactive Charts
            </h3>
            <p className="text-sm text-secondary">
              Hover over bars to see detailed statistics for each location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
