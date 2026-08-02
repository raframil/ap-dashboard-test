import { gql } from "@apollo/client";

// Basic character fields (for table view)
export const CHARACTER_FIELDS = gql`
	fragment CharacterFields on Character {
		id
		name
		status
		species
		type
		gender
		image
	}
`;

// Full character data (for modals & grid)
export const CHARACTER_FULL = gql`
	fragment CharacterFull on Character {
		...CharacterFields
		origin {
			id
			name
			type
			dimension
		}
		location {
			id
			name
			type
			dimension
		}
		episode {
			id
			name
			episode
			air_date
		}
		created
	}
	${CHARACTER_FIELDS}
`;
