"use client";

import { useQuery } from "@apollo/client/react";
import { COUNT_CHARACTERS_SPECIES } from "../../api/graphql/count-species";

export interface SpeciesCountsQueryResponse {
	Human: {
		info: {
			count: number;
		};
	};
	Alien: {
		info: {
			count: number;
		};
	};
	Humanoid: {
		info: {
			count: number;
		};
	};
	Animal: {
		info: {
			count: number;
		};
	};
	Robot: {
		info: {
			count: number;
		};
	};
}

export function useCharacterSpeciesCounts() {
	const countsQuery = useQuery<SpeciesCountsQueryResponse>(
		COUNT_CHARACTERS_SPECIES,
		{
			fetchPolicy: "cache-first",
		},
	);

	const loading = countsQuery.loading;
	const error = countsQuery.error;

	return {
		result: countsQuery.data ?? null,
		loading,
		error,
	};
}
