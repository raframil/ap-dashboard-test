"use client";

import { useQuery } from "@apollo/client/react";
import { GET_LOCATIONS } from "../api/queries";
import type { LocationsResponse, LocationStats } from "@/types/location";
import { useMemo } from "react";

export function useLocationStats() {
  const { data, loading, error } = useQuery<LocationsResponse>(GET_LOCATIONS, {
    variables: { page: 1 },
  });

  const stats: LocationStats[] = useMemo(() => {
    if (!data?.locations.results) return [];

    return data.locations.results
      .map((location) => ({
        name: location.name,
        residentCount: location.residents.length,
        dimension: location.dimension || "Unknown",
      }))
      .filter((stat) => stat.residentCount > 0)
      .sort((a, b) => b.residentCount - a.residentCount)
      .slice(0, 10); // Top 10 locations
  }, [data]);

  return {
    stats,
    loading,
    error,
  };
}
