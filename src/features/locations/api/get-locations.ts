import { gql } from "@apollo/client";
import { LOCATION_WITH_RESIDENTS } from "./fragments";

export const GET_LOCATIONS = gql`
	query GetLocations($page: Int, $filter: FilterLocation) {
		locations(page: $page, filter: $filter) {
			info {
				count
				pages
				next
				prev
			}
			results {
				...LocationWithResidents
			}
		}
	}
	${LOCATION_WITH_RESIDENTS}
`;
