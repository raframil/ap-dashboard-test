import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
	uri: "https://rickandmortyapi.com/graphql",
});

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					characters: {
						keyArgs: ["filter"],
						merge(existing, incoming, { args }) {
							if (!args?.page || args.page === 1) {
								return incoming;
							}

							return {
								...incoming,
								results: [
									...(existing?.results || []),
									...(incoming?.results || []),
								],
							};
						},
					},
					locations: {
						keyArgs: ["filter"],
						merge(existing, incoming, { args }) {
							if (!args?.page || args.page === 1) {
								return incoming;
							}

							return {
								...incoming,
								results: [
									...(existing?.results || []),
									...(incoming?.results || []),
								],
							};
						},
					},
				},
			},
		},
	}),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
			errorPolicy: "all",
		},
		query: {
			fetchPolicy: "cache-first",
			errorPolicy: "all",
		},
	},
});
