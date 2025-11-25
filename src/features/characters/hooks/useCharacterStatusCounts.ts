"use client";

import { useQuery } from "@apollo/client/react";
import { COUNT_CHARACTERS_STATUSES } from "../api/count-status";

export interface StatusCountsQueryResponse {
	Alive: {
	  info: {
		count: number;
	  };
	};
	Dead: {
	  info: {
		count: number;
	  };
	};
	Unknown: {
	  info: {
		count: number;
	  };
	};
  }

export function useCharacterStatusCounts() {
	const countsQuery = useQuery<StatusCountsQueryResponse>(COUNT_CHARACTERS_STATUSES, {
		fetchPolicy: "cache-first",
	});


	const loading = countsQuery.loading;
	const error = countsQuery.error;

	const aliveCount = countsQuery.data?.Alive.info.count || 0;
	const deadCount = countsQuery.data?.Dead.info.count || 0;
	const unknownCount = countsQuery.data?.Unknown.info.count || 0;

	const totalCount = aliveCount + deadCount + unknownCount;

	return {
		stats: [
			{ status: "Alive", count: aliveCount, percentage: aliveCount / totalCount },
			{ status: "Dead", count: deadCount, percentage: deadCount / totalCount },
			{ status: "unknown", count: unknownCount, percentage: unknownCount / totalCount },
		],
		loading,
		error,
	};
}
