"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../atoms/Input";

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	debounceMs?: number;
	initialValue?: string;
}

export function SearchInput({
	onSearch,
	placeholder = "Search...",
	debounceMs = 300,
	initialValue = "",
}: SearchInputProps) {
	const [value, setValue] = useState(initialValue);

	const debouncedSearch = useCallback(
		(searchTerm: string) => {
			const handler = setTimeout(() => {
				onSearch(searchTerm);
			}, debounceMs);

			return () => clearTimeout(handler);
		},
		[onSearch, debounceMs],
	);

	useEffect(() => {
		const cleanup = debouncedSearch(value);
		return cleanup;
	}, [value, debouncedSearch]);

	const handleClear = () => {
		setValue("");
	};

	return (
		<div className="relative w-full">
			<div className="relative">
				<IconSearch
					size={24}
					className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
				/>
				<Input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
					className="pl-12 pr-12"
					aria-label="Search"
				/>
				{value && (
					<button
						onClick={handleClear}
						className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
						aria-label="Clear search"
						type="button"
					>
						<IconX size={24} className="text-muted hover:text-primary transition-colors" />
					</button>
				)}
			</div>
		</div>
	);
}
