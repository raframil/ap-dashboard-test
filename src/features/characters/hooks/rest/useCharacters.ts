"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
	CharacterFilter,
	CharactersQueryResponse,
} from "@/types/character";
import { getCharacters } from "../../api/rest";

export function useCharacters(filter?: CharacterFilter) {
	const [data, setData] = useState<CharactersQueryResponse>({
		characters: {
			info: {
				count: 0,
				pages: 0,
				next: null,
				prev: null,
			},
			results: [],
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [searchTerm, setSearchTerm] = useState(filter?.name || "");
	const [page, setPage] = useState(1);

	const isFetchingRef = useRef(false);

	useEffect(() => {
		if (filter?.name !== undefined && filter.name !== searchTerm) {
			setSearchTerm(filter.name);
			setPage(1);
			setData({
				characters: {
					info: {
						count: 0,
						pages: 0,
						next: null,
						prev: null,
					},
					results: [],
				},
			});
		}
	}, [filter?.name, searchTerm]);

	useEffect(() => {
		const fetchData = async () => {
			if (isFetchingRef.current) return;

			isFetchingRef.current = true;
			setIsLoading(true);
			setError(null);

			try {
				const result = await getCharacters(page, { name: searchTerm });

				setData((prev) => {
					if (page === 1) {
						return result;
					}

					return {
						characters: {
							results: [
								...prev.characters.results,
								...result.characters.results,
							],
							info: result.characters.info,
						},
					};
				});
			} catch (error) {
				console.error("Error fetching characters", error);
				setError(
					error instanceof Error
						? error
						: new Error("Failed to fetch characters"),
				);
			} finally {
				setIsLoading(false);
				isFetchingRef.current = false;
			}
		};

		fetchData();
	}, [page, searchTerm]);

	const refetch = useCallback(() => {
		setPage(1);
		setData({
			characters: {
				info: {
					count: 0,
					pages: 0,
					next: null,
					prev: null,
				},
				results: [],
			},
		});
	}, []);

	const loadMore = useCallback(() => {
		if (!isLoading && data.characters.info.next) {
			setPage((prev) => prev + 1);
		}
	}, [isLoading, data.characters.info.next]);

	return {
		characters: data.characters.results,
		loading: isLoading,
		error,
		loadMore,
		hasMore: data.characters.results.length < data.characters.info.count,
		refetch,
	};
}
