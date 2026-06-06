import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REJECTED: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  FAILED: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  BLOCKED: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  DEACTIVATED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  DEFAULTED: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  OVERDUE: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  CANCELLED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status?.replace(/_/g, " ") ?? "UNKNOWN";

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status] ?? "bg-slate-500/10 text-slate-300 border-slate-500/20",
        className,
      )}
    >
      {normalized.toLowerCase()}
    </Badge>
  );
}
