import { gql } from "@apollo/client";

export const COUNT_CHARACTERS_SPECIES = gql`
    query CountCharactersSpecies {
        Human: characters(filter: {species: "Human"}) {
            info {
                count
            }
        }
        Alien: characters(filter: {species: "Alien"}) {
            info {
                count
            }
        }
        Humanoid: characters(filter: {species: "Humanoid"}) {
            info {
                count
            }
        }
        Animal: characters(filter: {species: "Animal"}) {
            info {
                count
            }
        }
        Robot: characters(filter: {species: "Robot"}) {
            info {
                count
            }
        }
    }
`;
