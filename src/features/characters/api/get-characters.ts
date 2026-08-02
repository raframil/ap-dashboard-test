import { gql } from "@apollo/client";
import { CHARACTER_FULL } from "./fragments";

export const GET_CHARACTERS = gql`
	query GetCharacters($page: Int, $filter: FilterCharacter) {
		characters(page: $page, filter: $filter) {
			info {
				count
				pages
				next
				prev
			}
			results {
				...CharacterFull
			}
		}
	}
	${CHARACTER_FULL}
`;
