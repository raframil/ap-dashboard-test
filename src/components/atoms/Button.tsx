import { IconLoader2 } from "@tabler/icons-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost" | "danger";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			variant = "primary",
			size = "md",
			isLoading = false,
			className = "",
			disabled,
			...props
		},
		ref,
	) => {
		const baseStyles =
			"inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-interactive-primary/20 disabled:opacity-50 disabled:cursor-not-allowed";

		const variantStyles = {
			primary:
				"bg-interactive-primary text-inverse shadow-[var(--shadow-portal)] hover:bg-interactive-primary-hover hover:shadow-[var(--shadow-portal-lg)] active:bg-interactive-primary-active",
			secondary:
				"bg-interactive-secondary text-primary hover:bg-interactive-secondary-hover",
			ghost: "border-2 border-brand text-brand hover:bg-surface-hover",
			danger:
				"bg-interactive-danger text-inverse shadow-[var(--shadow-plasma)] hover:bg-interactive-danger-hover",
		};

		const sizeStyles = {
			sm: "px-4 py-2 text-sm rounded-md",
			md: "px-6 py-3 text-base rounded-lg",
			lg: "px-8 py-4 text-lg rounded-xl",
		};

		return (
			<button
				ref={ref}
				className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading ? (
					<span className="flex items-center gap-2">
						<IconLoader2 size={16} className="animate-spin" />
						{children}
					</span>
				) : (
					children
				)}
			</button>
		);
	},
);

Button.displayName = "Button";
