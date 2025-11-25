"use client";

import { IconMapPin, IconUsers } from "@tabler/icons-react";
import { Badge } from "@/components/atoms/Badge";
import type { Location } from "@/types/location";

interface LocationCardProps {
	location: Location;
	onClick?: (location: Location) => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
	return (
		<button
			onClick={() => onClick?.(location)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick?.(location);
				}
			}}
			tabIndex={0}
			className={`
				w-full bg-surface border border-DEFAULT rounded-lg p-6
				hover:bg-surface-elevated hover:border-brand
				transition-all duration-300
				shadow-default hover:shadow-portal
				text-left group cursor-pointer
      		`}
			type="button"
		>
			<div className="flex items-start gap-4">
				<div className="shrink-0 w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center group-hover:scale-105 transition-transform">
					<IconMapPin size={32} className="text-brand" />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-display text-primary mb-1 truncate group-hover:text-brand transition-colors">
						{location.name}
					</h3>
					<p className="text-sm text-secondary mb-3 truncate">
						{location.type}
					</p>
					<div className="flex flex-wrap gap-2">
						<Badge variant="default">{location.dimension}</Badge>
						<Badge variant="info">
							<IconUsers size={14} className="inline mr-1" />
							{location.residents.length} residents
						</Badge>
					</div>
				</div>
			</div>
		</button>
	);
}
