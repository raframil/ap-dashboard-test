import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocationCard } from "@/features/locations/components/LocationCard";
import type { Location } from "@/types/location";
import { renderWithProviders, userEvent } from "../../utils/test-utils";

const mockLocation: Location = {
	id: "1",
	name: "Earth (C-137)",
	type: "Planet",
	dimension: "Dimension C-137",
	residents: [
		{ id: "1", name: "Rick Sanchez" },
		{ id: "38", name: "Beth Smith" },
	],
	created: "2017-11-10T12:42:04.162Z",
};

describe("LocationCard", () => {
	it("renders location information correctly", () => {
		renderWithProviders(<LocationCard location={mockLocation} />);

		expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
		expect(screen.getByText("Planet")).toBeInTheDocument();
		expect(screen.getByText("Dimension C-137")).toBeInTheDocument();
	});

	it("displays resident count badge", () => {
		renderWithProviders(<LocationCard location={mockLocation} />);

		expect(screen.getByText("2 residents")).toBeInTheDocument();
	});

	it("shows correct count for location with no residents", () => {
		const emptyLocation = { ...mockLocation, residents: [] };
		renderWithProviders(<LocationCard location={emptyLocation} />);

		expect(screen.getByText("0 residents")).toBeInTheDocument();
	});

	it("shows correct count for location with one resident", () => {
		const locationWithOne = {
			...mockLocation,
			residents: [{ id: "1", name: "Rick Sanchez" }],
		};
		renderWithProviders(<LocationCard location={locationWithOne} />);

		expect(screen.getByText("1 residents")).toBeInTheDocument();
	});

	it("calls onClick when card is clicked", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<LocationCard location={mockLocation} onClick={handleClick} />,
		);

		const card = screen.getByText("Earth (C-137)").closest("button");
		if (!card) {
			throw new Error("Error in test: card not found");
		}
		await user.click(card);

		expect(handleClick).toHaveBeenCalledWith(mockLocation);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is keyboard accessible with Enter key", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<LocationCard location={mockLocation} onClick={handleClick} />,
		);

		const card = screen.getByText("Earth (C-137)").closest("button");
		card?.focus();

		await user.keyboard("{Enter}");

		expect(handleClick).toHaveBeenCalledWith(mockLocation);
	});

	it("is keyboard accessible with Space key", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<LocationCard location={mockLocation} onClick={handleClick} />,
		);

		const card = screen.getByText("Earth (C-137)").closest("button");
		card?.focus();

		await user.keyboard(" ");

		expect(handleClick).toHaveBeenCalledWith(mockLocation);
	});

	it("does not call onClick when not provided", async () => {
		const user = userEvent.setup();

		renderWithProviders(<LocationCard location={mockLocation} />);

		const card = screen.getByText("Earth (C-137)").closest("button");

		if (!card) {
			throw new Error("Error in test: card not found");
		}

		await user.click(card);
	});
});
