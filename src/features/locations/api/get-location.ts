import { gql } from "@apollo/client";
import { LOCATION_FULL } from "./fragments";

export const GET_LOCATION = gql`
	query GetLocation($id: ID!) {
		location(id: $id) {
			...LocationFull
		}
	}
	${LOCATION_FULL}
`;
