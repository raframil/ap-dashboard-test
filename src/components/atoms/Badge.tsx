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
	...props
}: BadgeProps) {
	const variantStyles = {
		success: "bg-success/10 text-success border-success/20",
		warning: "bg-warning/10 text-warning border-warning/20",
		error: "bg-error/10 text-error border-error/20",
		info: "bg-info/10 text-info border-info/20",
		default: "bg-surface-hover text-secondary border-DEFAULT",
	};

	const badgeClasses = `
		inline-flex items-center px-3 py-1
		rounded-full
		border
		${onClick ? "cursor-pointer" : "cursor-default"}
		${variantStyles[variant]}
		${className}
	`;

	const content = (
		<span className="text-xs md:text-sm font-medium w-full truncate">
			{children}
		</span>
	);

	if (onClick || onMouseEnter || onMouseLeave) {
		return (
			<button
				className={badgeClasses}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				type="button"
				title={typeof children === "string" ? children : undefined}
				aria-label={typeof children === "string" ? children : undefined}
				{...props}
			>
				{content}
			</button>
		);
	}

	return (
		<span
			className={badgeClasses}
			title={typeof children === "string" ? children : undefined}
			{...props}
		>
			{content}
		</span>
	);
}
