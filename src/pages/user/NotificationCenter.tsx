/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageTransition from "@/components/shared/PageTransition";
import PageSkeleton from "@/components/shared/PageSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import {
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useMyNotificationsQuery,
} from "@/redux/features/notification/notification.api";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

export default function NotificationCenter() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useMyNotificationsQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useMarkAllAsReadMutation();

  const notifications = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 text-white">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Notification Center</h1>
            <p className="text-sm text-slate-400">
              Stay updated on transactions, loans, and account activity
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-slate-700"
            onClick={() => markAllAsRead(undefined)}
            disabled={isMarkingAll}
          >
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You're all caught up. New alerts will appear here."
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((notification: any) => (
              <button
                key={notification._id}
                type="button"
                onClick={() =>
                  !notification.isRead && markAsRead(notification._id)
                }
                className={cn(
                  "w-full rounded-2xl border p-5 text-left transition hover:border-indigo-500/30",
                  notification.isRead
                    ? "border-slate-800 bg-slate-950/40"
                    : "border-indigo-500/20 bg-indigo-500/5",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <span className="size-2 rounded-full bg-indigo-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={notifications.length < ITEMS_PER_PAGE}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
