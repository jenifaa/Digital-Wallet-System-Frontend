import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-rose-500/5 px-6 py-16 text-center"
      role="alert"
    >
      <div className="mb-4 rounded-2xl bg-rose-500/10 p-4">
        <AlertCircle className="size-8 text-rose-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-6 gap-2 rounded-2xl border-rose-500/30"
          type="button"
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
