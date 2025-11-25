"use client";

import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Location } from "@/types/location";
import { GET_LOCATIONS } from "../api";
import {
	mergeLocations,
	transformLocationsToStats,
} from "../utils/locationHelpers";

export interface LocationsQueryResponse {
	locations: {
		info: {
			count: number;
			pages: number;
			next: number | null;
			prev: number | null;
		};
		results: Location[];
	};
}

export function useLocationStats() {
	const { data, loading, error, fetchMore } = useQuery<LocationsQueryResponse>(
		GET_LOCATIONS,
		{ variables: { page: 1 } },
	);

	const [allLocations, setAllLocations] = useState<Location[]>([]);
	const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);
	const [prefetchError, setPrefetchError] = useState<Error | null>(null);
	const prefetchStartedRef = useRef<boolean>(false);

	useEffect(() => {
		if (!data?.locations) return;

		setAllLocations((prev) =>
			mergeLocations(prev, data.locations.results ?? []),
		);

		if (prefetchStartedRef.current) return;
		prefetchStartedRef.current = true;

		const totalPages: number = data.locations.info.pages ?? 1;

		let cancelled: boolean = false;

		async function prefetchAllPages(): Promise<void> {
			for (let page = 2; page <= totalPages && !cancelled; page++) {
				try {
					const { data: more } = await fetchMore({
						variables: { page },
					});

					if (more?.locations?.results) {
						setAllLocations((prev) =>
							mergeLocations(prev, more.locations.results),
						);
					}
				} catch (err) {
					console.error("Error prefetching page", page, err);
					setPrefetchError(err instanceof Error ? err : new Error(String(err)));
					break;
				}
			}

			if (!cancelled) {
				setFullyLoaded(true);
			}
		}

		if (totalPages > 1) {
			void prefetchAllPages();
		} else {
			setFullyLoaded(true);
		}

		return () => {
			cancelled = true;
		};
	}, [data, fetchMore]);

	const stats = useMemo(() => {
		const locationsSource =
			allLocations.length > 0 ? allLocations : (data?.locations?.results ?? []);

		return transformLocationsToStats(locationsSource);
	}, [allLocations, data]);

	return {
		stats,
		loadingFirstPage: loading,
		fullyLoaded,
		error: (error || prefetchError) ?? null,
	};
}
