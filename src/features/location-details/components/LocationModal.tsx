"use client";

import { IconMapPin, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { useUIStore } from "@/stores/useUIStore";

export function LocationModal() {
	const { selectedLocation, isLocationModalOpen, closeLocationModal } =
		useUIStore();

	useEffect(() => {
		if (isLocationModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isLocationModalOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeLocationModal();
			}
		};

		if (isLocationModalOpen) {
			window.addEventListener("keydown", handleEscape);
		}

		return () => window.removeEventListener("keydown", handleEscape);
	}, [isLocationModalOpen, closeLocationModal]);

	if (!isLocationModalOpen || !selectedLocation) return null;

	const handleOnKeyDownDialog = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeLocationModal();
		}
	};

	const handleOnKeyUpDialog = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeLocationModal();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-sm"
			onClick={closeLocationModal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="location-modal-title"
			onKeyDown={handleOnKeyDownDialog}
			onKeyUp={handleOnKeyUpDialog}
		>
			<article
				className={`
          			w-full max-w-4xl max-h-[90vh] overflow-y-auto
					bg-surface-elevated border-2 border-brand rounded-xl
					shadow-portal-lg
					animate-in fade-in zoom-in duration-300
				`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				onKeyUp={(e) => e.stopPropagation()}
			>
				<div className="sticky top-0 bg-surface-elevated border-b border-DEFAULT p-6 flex items-start justify-between gap-4 z-10">
					<div className="flex items-center gap-4">
						<div className="shrink-0 w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
							<IconMapPin size={40} className="text-brand" />
						</div>
						<div>
							<h2
								id="location-modal-title"
								className="text-3xl font-display text-brand mb-2"
							>
								{selectedLocation.name}
							</h2>
							<div className="flex flex-wrap gap-2">
								<Badge variant="default">{selectedLocation.type}</Badge>
								<Badge variant="info">{selectedLocation.dimension}</Badge>
							</div>
						</div>
					</div>
					<button
						onClick={closeLocationModal}
						className="text-muted hover:text-primary transition-colors p-2"
						aria-label="Close modal"
						type="button"
					>
						<IconX
							size={24}
							className="text-muted hover:text-primary transition-colors"
						/>
					</button>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-surface border border-DEFAULT rounded-lg p-4">
							<h3 className="text-lg font-display text-primary mb-2">Type</h3>
							<p className="text-secondary">{selectedLocation.type}</p>
						</div>

						<div className="bg-surface border border-DEFAULT rounded-lg p-4">
							<h3 className="text-lg font-display text-primary mb-2">
								Dimension
							</h3>
							<p className="text-secondary">{selectedLocation.dimension}</p>
						</div>
					</div>

					{selectedLocation.residents &&
						selectedLocation.residents.length > 0 && (
							<div>
								<h3 className="text-2xl font-display text-primary mb-4">
									Residents ({selectedLocation.residents.length})
								</h3>
								<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
									{selectedLocation.residents.map((resident) => (
										<div
											key={resident.id}
											className="bg-surface border border-DEFAULT rounded-lg p-3 hover:border-brand transition-colors"
										>
											<p className="text-sm font-display text-brand mb-1 truncate">
												{resident.name}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

					{selectedLocation.residents &&
						selectedLocation.residents.length === 0 && (
							<div className="bg-surface border border-DEFAULT rounded-lg p-6 text-center">
								<p className="text-muted">No known residents in this location</p>
							</div>
						)}
				</div>

				<div className="sticky bottom-0 bg-surface-elevated border-t border-DEFAULT p-6">
					<Button
						variant="ghost"
						onClick={closeLocationModal}
						className="w-full sm:w-auto"
					>
						Close
					</Button>
				</div>
			</article>
		</div>
	);
}
