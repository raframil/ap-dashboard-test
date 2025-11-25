import type { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing/react";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	apolloMocks?: MockedResponse[];
}

function AllTheProviders({
	children,
	mocks = [],
}: {
	children: ReactNode;
	mocks?: MockedResponse[];
}) {
	return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
}

export function renderWithProviders(
	ui: ReactElement,
	{ apolloMocks = [], ...renderOptions }: CustomRenderOptions = {},
) {
	return render(ui, {
		wrapper: ({ children }) => (
			<AllTheProviders mocks={apolloMocks}>{children}</AllTheProviders>
		),
		...renderOptions,
	});
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
