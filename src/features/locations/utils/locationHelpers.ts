import type { Location, LocationStats } from "@/types/location";

/**
 * Merges two arrays of locations, removing duplicates by ID.
 * Uses a Map for efficient deduplication.
 *
 * @param prev - Previous array of locations
 * @param next - New array of locations to merge
 * @returns Merged array with duplicates removed
 */
export function mergeLocations(prev: Location[], next: Location[]): Location[] {
	const map = new Map(prev.map((location) => [location.id, location]));
	next.forEach((location) => {
		map.set(location.id, location);
	});
	return Array.from(map.values());
}

/**
 * Transforms an array of locations into location statistics.
 * Filters out locations with no residents, sorts by resident count descending,
 * and limits to top 10 locations.
 *
 * @param locations - Array of locations to transform
 * @returns Array of location statistics (top 10 by resident count)
 */
export function transformLocationsToStats(
	locations: Location[],
): LocationStats[] {
	if (!locations.length) return [];

	return locations
		.map((location) => ({
			name: location.name,
			residentCount: location.residents.length,
			dimension: location.dimension || "Unknown",
		}))
		.filter((stat) => stat.residentCount > 0)
		.sort((a, b) => b.residentCount - a.residentCount)
		.slice(0, 10);
}
