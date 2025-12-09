"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/molecules/SearchInput";

interface SearchSectionProps {
	placeholder?: string;
}

export function SearchSection({ placeholder }: SearchSectionProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialValue = searchParams.get("search") || "";

	const handleSearch = (query: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (query === initialValue) {
			return;
		}
		query ? params.set("search", query) : params.delete("search");
		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="mt-8 mb-12 max-w-2xl">
			<SearchInput
				onSearch={handleSearch}
				placeholder={placeholder}
				debounceMs={300}
				initialValue={initialValue}
			/>
		</div>
	);
}
