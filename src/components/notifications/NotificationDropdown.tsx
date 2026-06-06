/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useMyNotificationsQuery,
  useUnreadCountQuery,
} from "@/redux/features/notification/notification.api";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router";

export default function NotificationDropdown() {
  const { data: countData } = useUnreadCountQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data, isLoading } = useMyNotificationsQuery({ limit: 8 });

  const navigate = useNavigate();
  const [markAsRead] = useMarkAsReadMutation();

  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useMarkAllAsReadMutation();

  const unreadCount = countData?.data?.count ?? 0;
  const notifications = data?.data ?? [];

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead(undefined).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-3 transition hover:border-indigo-500/30"
        aria-label={`Notifications${
          unreadCount ? `, ${unreadCount} unread` : ""
        }`}
      >
        <Bell className="size-5 text-slate-300" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1 px-2"
              onClick={handleMarkAllRead}
              disabled={isMarkingAll || unreadCount === 0}
            >
              <CheckCheck className="size-4" />
              Mark all read
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {isLoading && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        )}

        {!isLoading && notifications.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        )}

        {notifications.map((notification: any) => (
          <DropdownMenuItem
            key={notification._id}
            className="flex cursor-pointer flex-col items-start gap-1 p-3"
            onClick={() =>
              !notification.isRead && handleMarkRead(notification._id)
            }
          >
            <div className="flex w-full items-start justify-between gap-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  !notification.isRead && "text-indigo-500",
                )}
              >
                {notification.title}
              </span>

              {!notification.isRead && (
                <span className="size-2 shrink-0 rounded-full bg-indigo-500" />
              )}
            </div>

            <span className="line-clamp-2 text-xs text-muted-foreground">
              {notification.message}
            </span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full justify-center"
          onClick={() => {
            navigate("/user/notifications");
          }}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
