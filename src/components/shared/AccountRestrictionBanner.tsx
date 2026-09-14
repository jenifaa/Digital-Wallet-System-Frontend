import { AlertTriangle } from "lucide-react";

export default function AccountRestrictionBanner({
  message,
}: {
  message: string;
}) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-rose-400" />
      <p>{message}</p>
    </div>
  );
}
