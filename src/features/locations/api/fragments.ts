import { gql } from "@apollo/client";

// Basic location fields
export const LOCATION_FIELDS = gql`
	fragment LocationFields on Location {
		id
		name
		type
		dimension
	}
`;

// Location with basic resident info (for grid)
export const LOCATION_WITH_RESIDENTS = gql`
	fragment LocationWithResidents on Location {
		...LocationFields
		residents {
			id
			name
		}
		created
	}
	${LOCATION_FIELDS}
`;

// Full location data with detailed residents (for modals)
export const LOCATION_FULL = gql`
	fragment LocationFull on Location {
		...LocationFields
		residents {
			id
			name
			status
			species
			image
		}
		created
	}
	${LOCATION_FIELDS}
`;
