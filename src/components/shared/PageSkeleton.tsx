import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  rows?: number;
}

export default function PageSkeleton({ rows = 4 }: PageSkeletonProps) {
  return (
    <div
      className="min-h-[60vh] space-y-6 p-4 md:p-6"
      role="status"
      aria-label="Loading content"
    >
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
