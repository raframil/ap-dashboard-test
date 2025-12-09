export interface Location {
	id: string;
	name: string;
	type: string;
	dimension: string;
	residents: Array<{
		id: string;
		name: string;
	}>;
	created: string;
}

export interface LocationStats {
	name: string;
	residentCount: number;
	dimension: string;
}

export interface LocationFilter {
	name?: string;
	type?: string;
	dimension?: string;
}

/**
 * Shared response type for locations queries (both GraphQL and REST)
 */
export interface LocationsQueryResponse {
	locations: {
		info: {
			count: number;
			pages: number;
			next: number | null;
			prev: number | null;
		};
		results: Location[];
	};
}
