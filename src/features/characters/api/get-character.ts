import { gql } from "@apollo/client";
import { CHARACTER_FULL } from "./fragments";

export const GET_CHARACTER = gql`
	query GetCharacter($id: ID!) {
		character(id: $id) {
			...CharacterFull
		}
	}
	${CHARACTER_FULL}
`;
