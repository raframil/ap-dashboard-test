import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterCard } from "@/features/characters/components/CharacterCard";
import type { Character } from "@/types/character";
import { renderWithProviders, userEvent } from "../../utils/test-utils";

const mockCharacter: Character = {
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
};

describe("CharacterCard", () => {
	it("renders character information correctly", () => {
		renderWithProviders(<CharacterCard character={mockCharacter} />);

		expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
		expect(screen.getByText("Human")).toBeInTheDocument();
		expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
	});

	it("displays character image with alt text", () => {
		renderWithProviders(<CharacterCard character={mockCharacter} />);

		const img = screen.getByAltText("Rick Sanchez");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", expect.stringContaining("1.jpeg"));
	});

	it("displays character type when provided", () => {
		const characterWithType = {
			...mockCharacter,
			type: "Scientist",
		};

		renderWithProviders(<CharacterCard character={characterWithType} />);

		expect(screen.getByText("Human - Scientist")).toBeInTheDocument();
	});

	it("displays gender badge", () => {
		renderWithProviders(<CharacterCard character={mockCharacter} />);

		expect(screen.getByText("Male")).toBeInTheDocument();
	});

	it("displays location with pin icon", () => {
		renderWithProviders(<CharacterCard character={mockCharacter} />);

		expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
	});

	it("calls onClick when card is clicked", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		const { container } = renderWithProviders(
			<CharacterCard character={mockCharacter} onClick={handleClick} />,
		);

		const card = container.querySelector('[role="button"]');
		if (!card) {
			throw new Error("Error in test: card not found");
		}
		await user.click(card);

		expect(handleClick).toHaveBeenCalledWith(mockCharacter);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is keyboard accessible with Enter key", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		const { container } = renderWithProviders(
			<CharacterCard character={mockCharacter} onClick={handleClick} />,
		);

		const card = container.querySelector('[role="button"]');
		(card as HTMLElement).focus();

		await user.keyboard("{Enter}");

		expect(handleClick).toHaveBeenCalledWith(mockCharacter);
	});

	it("is keyboard accessible with Space key", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		const { container } = renderWithProviders(
			<CharacterCard character={mockCharacter} onClick={handleClick} />,
		);

		const card = container.querySelector('[role="button"]');
		(card as HTMLElement).focus();

		await user.keyboard(" ");

		expect(handleClick).toHaveBeenCalledWith(mockCharacter);
	});

	it("does not call onClick when not provided", async () => {
		const user = userEvent.setup();

		const { container } = renderWithProviders(
			<CharacterCard character={mockCharacter} />,
		);

		const card = container.querySelector('[role="button"]');

		if (!card) {
			throw new Error("Error in test: Card not found");
		}

		await user.click(card);
	});
});
