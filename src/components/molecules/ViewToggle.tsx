"use client";

import { IconLayoutGrid, IconTable } from "@tabler/icons-react";
import { Button } from "@/components/atoms/Button";

interface ViewToggleProps {
	currentView: "grid" | "table";
	onChange: (view: "grid" | "table") => void;
}

export function ViewToggle({ currentView, onChange }: ViewToggleProps) {
	return (
		<div className="flex items-center gap-2 rounded-lg bg-surface p-1 border border-DEFAULT">
			<Button
				variant={currentView === "grid" ? "primary" : "ghost"}
				size="sm"
				onClick={() => onChange("grid")}
				aria-label="Grid view"
				className="gap-2"
			>
				<IconLayoutGrid size={18} />
				<span className="hidden sm:inline">Grid</span>
			</Button>

			<Button
				variant={currentView === "table" ? "primary" : "ghost"}
				size="sm"
				onClick={() => onChange("table")}
				aria-label="Table view"
				className="gap-2"
			>
				<IconTable size={18} />
				<span className="hidden sm:inline">Table</span>
			</Button>
		</div>
	);
}
