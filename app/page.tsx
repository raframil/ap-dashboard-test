import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  sm:items-start">
				<h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-color-space-950 drop-shadow-xl">
					CHAOTIC CHARACTER
				</h1>
				<p className="font-body text-color-space-950 text-sm md:text-base">
					Browse the multiverse, stalk every Rick and Morty…
				</p>

				<button
					type="button"
					className="bg-interactive-primary text-inverse px-8 py-4 rounded-goo font-display shadow-portal hover:bg-interactive-primary-hover transition-all hover:shadow-portal-lg"
				>
					Open Portal
				</button>
			</main>
		</div>
	);
}
