"use client";

import { useQuery } from "@apollo/client/react";
import type { LocationFilter, LocationsQueryResponse } from "@/types/location";
import { GET_LOCATIONS } from "../../api/graphql";

export function useLocations(filter?: LocationFilter) {
	const { data, loading, error, fetchMore, refetch } =
		useQuery<LocationsQueryResponse>(GET_LOCATIONS, {
			variables: {
				page: 1,
				filter: filter || {},
			},
			notifyOnNetworkStatusChange: true,
		});

	const loadMore = async () => {
		if (!data?.locations.info.next) return;

		try {
			await fetchMore({
				variables: {
					page: data.locations.info.next,
					filter: filter || {},
				},
			});
		} catch (err) {
			console.error("Error loading more locations:", err);
		}
	};

	return {
		locations: data?.locations.results || [],
		info: data?.locations.info,
		loading,
		error,
		loadMore,
		refetch,
		hasMore: !!data?.locations.info.next,
	};
}
