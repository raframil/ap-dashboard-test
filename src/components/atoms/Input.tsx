import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, className = "", ...props }, ref) => {
		return (
			<div className="w-full">
				<input
					ref={ref}
					className={`
            w-full bg-inset border rounded-md px-4 py-3
            text-primary placeholder:text-muted
            transition-all
            focus:border-brand focus:outline-none focus:ring-2 focus:ring-interactive-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
			${error && "border-error focus:border-error focus:ring-error/20" }
			${!error && "border-DEFAULT"}
            ${className}
          `}
					{...props}
				/>
				{error && (
					<p className="mt-1 text-sm text-error" role="alert">
						{error}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
