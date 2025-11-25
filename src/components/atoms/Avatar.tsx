import Image from "next/image";

interface AvatarProps {
	src: string;
	alt: string;
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
}

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
	const sizeClasses = {
		sm: "h-10 w-10",
		md: "h-16 w-16",
		lg: "h-24 w-24",
		xl: "h-32 w-32",
	};

	return (
		<div
			className={`
        relative ${sizeClasses[size]} rounded-full overflow-hidden
        border-2 border-brand
        ${className}
      `}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</div>
	);
}
