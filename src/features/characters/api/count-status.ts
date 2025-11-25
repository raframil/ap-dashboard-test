import { gql } from "@apollo/client";

export const COUNT_CHARACTERS_STATUSES = gql`
    query Counts {
        Alive: characters(filter: {status: "Alive"}) {
            info {
            count
            }
        }
        Dead: characters(filter: {status: "Dead"}) {
            info {
            count
            }
        }
        Unknown: characters(filter: {status: "unknown"}) {
            info {
            count
            }
        }
    }
`;