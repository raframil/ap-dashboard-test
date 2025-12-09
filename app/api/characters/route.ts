import { GET_CHARACTERS } from "@/features/characters/api/graphql/get-characters";
import {
	createErrorResponse,
	createSuccessResponse,
	parseCharacterFilters,
	ValidationError,
} from "@/lib/api-utils";
import { apolloServerClient } from "@/lib/apollo-server";

/**
 * GET /api/characters
 *
 * RESTful endpoint for fetching characters from Rick and Morty API
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - name: Filter by character name
 * - status: Filter by status (Alive, Dead, unknown)
 * - species: Filter by species
 * - type: Filter by type
 * - gender: Filter by gender
 *
 * Example: /api/characters?page=2&name=rick&status=alive
 */
export async function GET(request: Request) {
	try {
		// Parse and validate query parameters
		const { searchParams } = new URL(request.url);
		const { page, filter } = parseCharacterFilters(searchParams);

		// Execute GraphQL query using server-side Apollo Client
		const { data, error } = await apolloServerClient.query({
			query: GET_CHARACTERS,
			variables: { page, filter },
		});

		// Handle GraphQL errors
		if (error) {
			console.error("[API /characters] GraphQL errors:", error);
			return createErrorResponse(
				new Error("Failed to fetch characters from GraphQL API"),
				500,
			);
		}

		// Handle empty or null response
		if (!data) {
			return createErrorResponse(new Error("No characters found"), 404);
		}

		// Return successful response with caching headers
		return createSuccessResponse(data, {
			headers: {
				"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
			},
		});
	} catch (error) {
		// Handle validation errors
		if (error instanceof ValidationError) {
			return createErrorResponse(error, 400);
		}

		// Handle unexpected errors
		console.error("[API /characters] Unexpected error:", error);
		return createErrorResponse(
			error instanceof Error ? error : new Error("Internal server error"),
			500,
		);
	}
}
