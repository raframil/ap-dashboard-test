"use client";

import { useQuery } from "@apollo/client/react";
import type { Character, CharacterFilter } from "@/types/character";
import { GET_CHARACTERS } from "../api/queries";

export interface CharactersQueryResponse {
	characters: {
	  info: {
		count: number;
		pages: number;
		next: number | null;
		prev: number | null;
	  };
	  results: Character[];
	};
  }	

export function useCharacters(filter?: CharacterFilter) {
	const { data, loading, error, fetchMore, refetch } =
		useQuery<CharactersQueryResponse>(GET_CHARACTERS, {
			variables: {
				page: 1,
				filter: filter || {},
			},
			notifyOnNetworkStatusChange: true,
		});

	const loadMore = async () => {
		if (!data?.characters.info.next) return;

		try {
			await fetchMore({
				variables: {
					page: data.characters.info.next,
					filter: filter || {},
				},
			});
		} catch (err) {
			console.error("Error loading more characters:", err);
		}
	};

	return {
		characters: data?.characters.results || [],
		info: data?.characters.info,
		loading,
		error,
		loadMore,
		refetch,
		hasMore: !!data?.characters.info.next,
	};
}
