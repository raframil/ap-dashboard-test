import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "@/types/character";

type PersistedUIState = {
	isSpoilerModeEnabled: boolean;
	revealedCharacters: string[];
};

interface UIStore {
	selectedCharacter: Character | null;
	isCharacterModalOpen: boolean;
	searchQuery: string;
	isSpoilerModeEnabled: boolean;
	revealedCharacters: Set<string>;
	setSelectedCharacter: (character: Character | null) => void;
	openCharacterModal: (character: Character) => void;
	closeCharacterModal: () => void;
	setSearchQuery: (query: string) => void;
	toggleSpoilerMode: () => void;
	revealCharacter: (characterId: string) => void;
	hideCharacter: (characterId: string) => void;
	clearRevealedCharacters: () => void;
	isCharacterRevealed: (characterId: string) => boolean;
}

export const useUIStore = create<UIStore>()(
	persist(
		(set, get) => ({
			selectedCharacter: null,
			isCharacterModalOpen: false,
			searchQuery: "",
			isSpoilerModeEnabled: false,
			revealedCharacters: new Set<string>(),
			setSelectedCharacter: (character) =>
				set({ selectedCharacter: character }),
			openCharacterModal: (character) =>
				set({ selectedCharacter: character, isCharacterModalOpen: true }),
			closeCharacterModal: () =>
				set({ isCharacterModalOpen: false, selectedCharacter: null }),
			setSearchQuery: (query) => set({ searchQuery: query }),
			toggleSpoilerMode: () =>
				set((state) => ({
					isSpoilerModeEnabled: !state.isSpoilerModeEnabled,
				})),
			revealCharacter: (id) =>
				set((state) => {
					const newSet = new Set(state.revealedCharacters);
					newSet.add(id);
					return { revealedCharacters: newSet };
				}),
			hideCharacter: (id) =>
				set((state) => {
					const newSet = new Set(state.revealedCharacters);
					newSet.delete(id);
					return { revealedCharacters: newSet };
				}),
			clearRevealedCharacters: () => set({ revealedCharacters: new Set() }),
			isCharacterRevealed: (id) => {
				const state = get();
				return !state.isSpoilerModeEnabled || state.revealedCharacters.has(id);
			},
		}),
		{
			name: "portal-hub-ui",
			partialize: (state): PersistedUIState => ({
				isSpoilerModeEnabled: state.isSpoilerModeEnabled,
				revealedCharacters: Array.from(state.revealedCharacters),
			}),
			merge: (persistedState: unknown, currentState: UIStore): UIStore => {
				const state = persistedState as Partial<PersistedUIState>;
				return {
					...currentState,
					isSpoilerModeEnabled: state.isSpoilerModeEnabled ?? currentState.isSpoilerModeEnabled,
					revealedCharacters: new Set(state.revealedCharacters || []),
				};
			},
		},
	),
);
