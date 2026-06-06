import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-16 text-center">
      <div className="mb-4 rounded-2xl bg-slate-900 p-4">
        <Icon className="size-8 text-slate-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-6 rounded-2xl"
          type="button"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
