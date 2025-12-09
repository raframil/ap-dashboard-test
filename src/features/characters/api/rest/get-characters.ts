import { ENV } from "@/config/env";
import type { CharacterFilter } from "@/types/character";

export const getCharacters = async (page = 1, filter: CharacterFilter = {}) => {
	try {
		const url = new URL("/api/characters", ENV.API_URL);

		url.searchParams.set("page", page.toString());
		url.searchParams.set("filter", JSON.stringify(filter));
		url.searchParams.set("name", filter.name || "");

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error("Failed on API Call");
		}

		return response.json();
	} catch (error) {
		console.error("Failed to fetch characters:", error);
		throw new Error("Failed to fetch characters");
	}
};
