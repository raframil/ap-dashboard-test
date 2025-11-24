"use client";

import { IconArrowRight, IconChartDonut, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-space-950"
      style={{ background: "var(--bg-space-gradient)" }}
    >
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-primary mb-6 leading-tight">
              Interdimensional
              <br />
              <span className="text-brand">Portal</span> Hub
            </h1>
            <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto mb-12">
              Track characters, explore dimensions, and manage your multiverse
              operations across infinite realities
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Link
                href="/characters"
                className="group bg-surface border-2 border-DEFAULT hover:border-brand rounded-xl p-8 transition-all hover:shadow-portal hover:scale-105"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-interactive-primary shadow-portal group-hover:shadow-portal-lg transition-all flex items-center justify-center">
                    <IconUsers size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display text-brand mb-2">
                      Browse Characters
                    </h3>
                    <p className="text-secondary text-sm">
                      Search and explore the multiverse character database with
                      infinite scroll
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-brand group-hover:gap-3 transition-all">
                    <span className="font-display">Explore Now</span>
                    <IconArrowRight size={20} />
                  </div>
                </div>
              </Link>

              <Link
                href="/analytics"
                className="group bg-surface border-2 border-DEFAULT hover:border-brand rounded-xl p-8 transition-all hover:shadow-portal hover:scale-105"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-interactive-primary shadow-portal group-hover:shadow-portal-lg transition-all flex items-center justify-center">
                    <IconChartDonut size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display text-brand mb-2">
                      View Statistics
                    </h3>
                    <p className="text-secondary text-sm">
                      Analyze location data and population statistics across
                      dimensions
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-brand group-hover:gap-3 transition-all">
                    <span className="font-display">View Charts</span>
                    <IconArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
