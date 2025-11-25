import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/organisms/Footer";
import { Navigation } from "@/components/organisms/Navigation";
import { Providers } from "../src/app/providers";

const silkscreen = Silkscreen({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-display",
});

export const metadata: Metadata = {
	title: "Rick & Morty Portal Hub - Interdimensional Dashboard",
	description:
		"Track characters, explore dimensions, and manage your multiverse operations",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${silkscreen.variable} antialiased`}>
				<Providers>
					<Navigation />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
