/**
 * Standardized error response format for API endpoints
 */
export interface ApiErrorResponse {
	error: {
		message: string;
		status: number;
		details?: unknown;
	};
}

/**
 * Generic paginated response format
 * Matches the GraphQL API structure for consistency
 */
export interface PaginatedApiResponse<T> {
	info: {
		count: number;
		pages: number;
		next: number | null;
		prev: number | null;
	};
	results: T[];
}
