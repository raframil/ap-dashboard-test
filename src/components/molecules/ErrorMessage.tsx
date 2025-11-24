import { IconAlertCircle } from "@tabler/icons-react";
import { Button } from "../atoms/Button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Whoops! Something went wrong",
  message,
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`bg-error/10 border border-error/20 rounded-lg p-6 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <IconAlertCircle size={24} className="text-error" />
        <div className="flex-1">
          <h3 className="text-lg font-display text-error mb-2">{title}</h3>
          <p className="text-secondary text-sm mb-4">{message}</p>
          {onRetry && (
            <Button variant="ghost" size="sm" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
