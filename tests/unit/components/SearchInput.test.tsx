import { screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "@/components/molecules/SearchInput";
import { renderWithProviders, userEvent } from "../../utils/test-utils";

describe("SearchInput", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it("renders with placeholder text", () => {
		renderWithProviders(
			<SearchInput onSearch={vi.fn()} placeholder="Search characters..." />,
		);

		expect(
			screen.getByPlaceholderText("Search characters..."),
		).toBeInTheDocument();
	});

	it("displays initial value in input", () => {
		renderWithProviders(
			<SearchInput
				onSearch={vi.fn()}
				placeholder="Search"
				initialValue="Rick"
			/>,
		);

		expect(screen.getByDisplayValue("Rick")).toBeInTheDocument();
	});

	it("calls onSearch with debounced value after 300ms", async () => {
		vi.useRealTimers();
		const handleSearch = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<SearchInput onSearch={handleSearch} placeholder="Search" />,
		);

		const input = screen.getByPlaceholderText("Search");

		await user.type(input, "Rick");

		expect(handleSearch).not.toHaveBeenCalledWith("Rick");

		await new Promise((resolve) => setTimeout(resolve, 350));

		expect(handleSearch).toHaveBeenCalledWith("Rick");
		vi.useFakeTimers();
	});

	it("calls onSearch with empty string on mount", () => {
		const handleSearch = vi.fn();

		renderWithProviders(
			<SearchInput onSearch={handleSearch} placeholder="Search" />,
		);

		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(handleSearch).toHaveBeenCalledWith("");
	});

	it("shows clear button when value is not empty", async () => {
		vi.useRealTimers();
		const user = userEvent.setup();

		renderWithProviders(
			<SearchInput onSearch={vi.fn()} placeholder="Search" />,
		);

		const input = screen.getByPlaceholderText("Search");
		await user.type(input, "Rick");

		expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
		vi.useFakeTimers();
	});

	it("hides clear button when value is empty", () => {
		renderWithProviders(
			<SearchInput onSearch={vi.fn()} placeholder="Search" />,
		);

		expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
	});

	it("clears input when clear button is clicked", async () => {
		vi.useRealTimers();
		const handleSearch = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<SearchInput onSearch={handleSearch} placeholder="Search" />,
		);

		const input = screen.getByPlaceholderText("Search");

		await user.type(input, "Rick");

		const clearButton = screen.getByLabelText(/clear search/i);
		await user.click(clearButton);

		expect(input).toHaveValue("");

		await new Promise((resolve) => setTimeout(resolve, 350));

		expect(handleSearch).toHaveBeenCalledWith("");
		vi.useFakeTimers();
	});

	it("uses custom debounce delay", async () => {
		vi.useRealTimers();
		const handleSearch = vi.fn();
		const user = userEvent.setup();

		renderWithProviders(
			<SearchInput
				onSearch={handleSearch}
				placeholder="Search"
				debounceMs={500}
			/>,
		);

		const input = screen.getByPlaceholderText("Search");
		await user.type(input, "Test");

		await new Promise((resolve) => setTimeout(resolve, 300));
		expect(handleSearch).not.toHaveBeenCalledWith("Test");

		await new Promise((resolve) => setTimeout(resolve, 250));
		expect(handleSearch).toHaveBeenCalledWith("Test");
		vi.useFakeTimers();
	});
});
