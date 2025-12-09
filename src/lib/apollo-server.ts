import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * Server-side Apollo Client for API routes
 *
 * This client is optimized for server-side usage with:
 * - Simple cache configuration (no browser-specific merge policies)
 * - network-only fetch policy for fresh data on each request
 * - Minimal overhead for single-request scenarios
 *
 * Separate from the client-side Apollo Client to maintain different
 * caching strategies and avoid browser-specific optimizations.
 */

const httpLink = new HttpLink({
	uri:
		process.env.NEXT_PUBLIC_GRAPHQL_API_URL ||
		"https://rickandmortyapi.com/graphql",
});

export const apolloServerClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: "network-only",
			errorPolicy: "all",
		},
	},
	// Server-side doesn't need SSR mode since we're in Node environment
	ssrMode: typeof window === "undefined",
});
