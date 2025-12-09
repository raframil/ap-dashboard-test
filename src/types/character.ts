export interface Character {
	id: string;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: string;
	type: string;
	gender: string;
	origin: {
		id: string;
		name: string;
		type: string;
		dimension: string;
	};
	location: {
		id: string;
		name: string;
		type: string;
		dimension: string;
	};
	image: string;
	episode: Array<{
		id: string;
		name: string;
		episode: string;
		air_date: string;
	}>;
	created: string;
}

export interface CharacterFilter {
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
}

/**
 * Shared response type for characters queries (both GraphQL and REST)
 */
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
