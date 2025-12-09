import type { CharacterFilter } from "@/types/character";

/**
 * Validation error class for API parameter validation
 */
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

/**
 * Parse and validate query parameters for character filters
 *
 * @param searchParams - URL search parameters from the request
 * @returns Validated page number and character filter object
 * @throws ValidationError if parameters are invalid
 */
export function parseCharacterFilters(searchParams: URLSearchParams): {
	page: number;
	filter: CharacterFilter;
} {
	// Parse and validate page parameter
	const pageParam = searchParams.get("page");
	const page = validatePage(pageParam);

	// Parse filter parameters
	const name = searchParams.get("name") || undefined;
	const status = validateStatus(searchParams.get("status"));
	const species = searchParams.get("species") || undefined;
	const type = searchParams.get("type") || undefined;
	const gender = searchParams.get("gender") || undefined;

	const filter: CharacterFilter = {
		...(name && { name }),
		...(status && { status }),
		...(species && { species }),
		...(type && { type }),
		...(gender && { gender }),
	};

	return { page, filter };
}

/**
 * Validate page parameter
 *
 * @param pageParam - Page parameter from query string
 * @returns Validated page number (defaults to 1)
 * @throws ValidationError if page is invalid
 */
function validatePage(pageParam: string | null): number {
	if (!pageParam) {
		return 1;
	}

	const page = Number.parseInt(pageParam, 10);

	if (Number.isNaN(page) || page < 1) {
		throw new ValidationError("Page must be a positive integer");
	}

	return page;
}

/**
 * Validate status parameter against allowed values
 *
 * @param status - Status parameter from query string
 * @returns Validated status or undefined
 * @throws ValidationError if status is invalid
 */
function validateStatus(status: string | null): string | undefined {
	if (!status) {
		return undefined;
	}

	const validStatuses = ["Alive", "Dead", "unknown"];

	if (!validStatuses.includes(status)) {
		throw new ValidationError(
			`Status must be one of: ${validStatuses.join(", ")}`,
		);
	}

	return status;
}

/**
 * Create a standardized error response
 *
 * @param error - Error object or message
 * @param status - HTTP status code
 * @returns Response object with error details
 */
export function createErrorResponse(
	error: Error | string,
	status: number,
): Response {
	const message = typeof error === "string" ? error : error.message;

	return new Response(
		JSON.stringify({
			error: {
				message,
				status,
			},
		}),
		{
			status,
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
}

/**
 * Create a standardized success response
 *
 * @param data - Response data to send
 * @param options - Optional ResponseInit options (headers, etc.)
 * @returns Response object with data
 */
export function createSuccessResponse<T>(
	data: T,
	options?: ResponseInit,
): Response {
	return new Response(JSON.stringify(data), {
		status: 200,
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});
}
