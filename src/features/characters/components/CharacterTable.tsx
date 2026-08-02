"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	createColumnHelper,
	type SortingState,
} from "@tanstack/react-table";
import { IconAlien, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { EmptyState } from "@/components/organisms/EmptyState";
import { SpoilerBadge } from "@/components/molecules/SpoilerBadge";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUIStore } from "@/stores/useUIStore";
import { useCharacters } from "../hooks/useCharacters";
import type { Character } from "@/types/character";

const columnHelper = createColumnHelper<Character>();

export function CharacterTable() {
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("search") || "";
	const filter = searchTerm ? { name: searchTerm } : undefined;

	const { characters, loading, error, loadMore, hasMore, refetch } =
		useCharacters(filter);
	const { openCharacterModal } = useUIStore();

	const sentinelRef = useInfiniteScroll({
		onLoadMore: loadMore,
		hasMore,
		isLoading: loading,
	});

	const [sorting, setSorting] = useState<SortingState>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("image", {
				cell: (info) => (
					<Avatar
						src={info.getValue()}
						alt={info.row.original.name}
						size="sm"
					/>
				),
				header: "",
				size: 60,
				enableSorting: false,
			}),
			columnHelper.accessor("name", {
				cell: (info) => (
					<span className="font-medium text-brand">{info.getValue()}</span>
				),
				header: "Name",
				size: 200,
			}),
			columnHelper.accessor("status", {
				cell: (info) => (
					<SpoilerBadge
						status={info.getValue()}
						characterId={info.row.original.id}
					/>
				),
				header: "Status",
				size: 120,
			}),
			columnHelper.accessor("species", {
				cell: (info) => <span>{info.getValue()}</span>,
				header: "Species",
				size: 120,
			}),
			columnHelper.accessor("gender", {
				cell: (info) => (
					<Badge variant="default" size="sm">
						{info.getValue()}
					</Badge>
				),
				header: "Gender",
				size: 100,
			}),
			columnHelper.accessor("type", {
				cell: (info) => (
					<span className="text-muted text-sm">
						{info.getValue() || "—"}
					</span>
				),
				header: "Type",
				size: 150,
			}),
		],
		[],
	);

	const table = useReactTable({
		data: characters,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	if (error) {
		return (
			<ErrorMessage
				message="Failed to load characters"
				onRetry={() => refetch()}
			/>
		);
	}

	if (loading && characters.length === 0) {
		return (
			<div className="w-full overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-DEFAULT">
							<th className="px-4 py-3 text-left">Name</th>
							<th className="px-4 py-3 text-left">Status</th>
							<th className="px-4 py-3 text-left">Species</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 6 }).map((_, i) => (
							<tr key={i} className="border-b border-DEFAULT">
								<td className="px-4 py-3">
									<div className="h-4 bg-surface-elevated rounded animate-pulse" />
								</td>
								<td className="px-4 py-3">
									<div className="h-4 bg-surface-elevated rounded animate-pulse" />
								</td>
								<td className="px-4 py-3">
									<div className="h-4 bg-surface-elevated rounded animate-pulse" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
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
			<div className="w-full overflow-x-auto rounded-lg border border-DEFAULT bg-surface shadow-default">
				<table className="w-full border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr
								key={headerGroup.id}
								className="border-b border-DEFAULT bg-surface-elevated"
							>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left text-sm font-medium text-muted"
										style={{ width: header.getSize() }}
									>
										{header.isPlaceholder ? null : (
											<div
												className={
													header.column.getCanSort()
														? "cursor-pointer select-none flex items-center gap-2 hover:text-brand"
														: ""
												}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{header.column.getCanSort() && (
													<span className="text-muted">
														{header.column.getIsSorted() === "asc" ? (
															<IconChevronUp size={16} />
														) : header.column.getIsSorted() === "desc" ? (
															<IconChevronDown size={16} />
														) : (
															"⇅"
														)}
													</span>
												)}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								onClick={() => openCharacterModal(row.original)}
								className="border-b border-DEFAULT hover:bg-surface-elevated cursor-pointer transition-colors"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-4 py-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
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
