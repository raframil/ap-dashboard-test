"use client";

import { IconAlien } from "@tabler/icons-react";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { SkeletonLoadingCard } from "@/components/molecules/SkeletonLoadingCard";
import { EmptyState } from "@/components/organisms/EmptyState";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUIStore } from "@/stores/useUIStore";
import type { CharacterFilter } from "@/types/character";
import { useCharacters } from "../hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";

interface CharacterGridProps {
	filter?: CharacterFilter;
}

export function CharacterGrid({ filter }: CharacterGridProps) {
	const { characters, loading, error, loadMore, hasMore, refetch } =
		useCharacters(filter);
	const { openCharacterModal } = useUIStore();

	const sentinelRef = useInfiniteScroll({
		onLoadMore: loadMore,
		hasMore,
		isLoading: loading,
	});

	if (error) {
		return (
			<ErrorMessage
				message={"Failed to load characters"}
				onRetry={() => refetch()}
			/>
		);
	}

	if (loading && characters.length === 0) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<SkeletonLoadingCard key={index.toString()} />
				))}
			</div>
		);
	}

	if (characters.length === 0) {
		return (
			<EmptyState
				title="No characters found"
				description="Try adjusting your search or filters"
				icon={<IconAlien size={100} />}
			/>
		);
	}

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{characters.map((character) => (
					<CharacterCard
						key={character.id}
						character={character}
						onClick={openCharacterModal}
					/>
				))}
			</div>

			<div ref={sentinelRef} className="h-20 flex items-center justify-center">
				{loading && hasMore && <Spinner size="md" />}
			</div>

			{!hasMore && characters.length > 0 && (
				<div className="flex flex-col items-center justify-center gap-4 py-8">
					<span className="text-2xl font-display text-brand">
						Congratulations!
					</span>
					<p className="text-center text-muted">
						You have reached the end of the multiverse
					</p>
				</div>
			)}
		</div>
	);
}
