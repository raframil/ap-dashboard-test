import { GET_CHARACTERS } from "@/features/characters/api";
import { GET_LOCATIONS } from "@/features/locations/api";

export const mockCharactersResponse = {
	request: {
		query: GET_CHARACTERS,
		variables: { page: 1, filter: {} },
	},
	result: {
		data: {
			characters: {
				info: {
					count: 826,
					pages: 42,
					next: 2,
					prev: null,
				},
				results: [
					{
						id: "1",
						name: "Rick Sanchez",
						status: "Alive",
						species: "Human",
						type: "",
						gender: "Male",
						origin: {
							id: "1",
							name: "Earth (C-137)",
							type: "Planet",
							dimension: "Dimension C-137",
						},
						location: {
							id: "20",
							name: "Citadel of Ricks",
							type: "Space station",
							dimension: "unknown",
						},
						image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
						episode: [],
						created: "2017-11-04T18:48:46.250Z",
					},
					{
						id: "2",
						name: "Morty Smith",
						status: "Alive",
						species: "Human",
						type: "",
						gender: "Male",
						origin: {
							id: "1",
							name: "Earth (C-137)",
							type: "Planet",
							dimension: "Dimension C-137",
						},
						location: {
							id: "20",
							name: "Citadel of Ricks",
							type: "Space station",
							dimension: "unknown",
						},
						image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
						episode: [],
						created: "2017-11-04T18:50:21.651Z",
					},
				],
			},
		},
	},
};

export const mockLocationsResponse = {
	request: {
		query: GET_LOCATIONS,
		variables: { page: 1, filter: {} },
	},
	result: {
		data: {
			locations: {
				info: {
					count: 126,
					pages: 7,
					next: 2,
					prev: null,
				},
				results: [
					{
						id: "1",
						name: "Earth (C-137)",
						type: "Planet",
						dimension: "Dimension C-137",
						residents: [
							{ id: "1", name: "Rick Sanchez" },
							{ id: "38", name: "Beth Smith" },
						],
						created: "2017-11-10T12:42:04.162Z",
					},
					{
						id: "2",
						name: "Abadango",
						type: "Cluster",
						dimension: "unknown",
						residents: [{ id: "6", name: "Abadango Cluster Princess" }],
						created: "2017-11-10T13:06:38.182Z",
					},
				],
			},
		},
	},
};

export const mockEmptyCharactersResponse = {
	request: {
		query: GET_CHARACTERS,
		variables: { page: 1, filter: {} },
	},
	result: {
		data: {
			characters: {
				info: { count: 0, pages: 0, next: null, prev: null },
				results: [],
			},
		},
	},
};

export const mockCharactersError = {
	request: {
		query: GET_CHARACTERS,
		variables: { page: 1, filter: {} },
	},
	error: new Error("Network error: Failed to fetch"),
};
