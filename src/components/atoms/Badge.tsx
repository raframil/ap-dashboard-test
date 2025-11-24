import type { ButtonHTMLAttributes } from "react";

interface BadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "success" | "warning" | "error" | "info" | "default";
	className?: string;
}

export function Badge({
	children,
	variant = "default",
	className = "",
	onClick,
	onMouseEnter,
	onMouseLeave,
}: BadgeProps) {
	const variantStyles = {
		success: "bg-success/10 text-success border-success/20",
		warning: "bg-warning/10 text-warning border-warning/20",
		error: "bg-error/10 text-error border-error/20",
		info: "bg-info/10 text-info border-info/20",
		default: "bg-surface-hover text-secondary border-DEFAULT",
	};

	return (
		<button
			className={`
        inline-flex items-center px-3 py-1
        text-sm font-medium rounded-full
        border
        ${variantStyles[variant]}
        ${className}
      `}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			type="button"
		>
			{children}
		</button>
	);
}
