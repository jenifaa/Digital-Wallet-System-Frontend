"use client";

import { useSendNotificationsMutation } from "@/redux/features/notification/notification.api";
import { useState } from "react";
import { toast } from "sonner";

type NotificationType = "ADMIN" | "BROADCAST" | "SYSTEM";

interface RecentNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
}

const MOCK_RECENT: RecentNotification[] = [
  { id: "1", title: "Account verified", message: "Your account has been verified successfully.", type: "ADMIN", createdAt: new Date(Date.now() - 2 * 60 * 1000) },
  { id: "2", title: "Scheduled maintenance", message: "System will be down for 30 minutes tonight at 2 AM.", type: "BROADCAST", createdAt: new Date(Date.now() - 60 * 60 * 1000) },
  { id: "3", title: "Loan approved", message: "Your loan request of $500 has been approved.", type: "SYSTEM", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
];

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const TYPE_BADGE: Record<NotificationType, string> = {
  ADMIN: "bg-blue-50 text-blue-800",
  BROADCAST: "bg-amber-50 text-amber-800",
  SYSTEM: "bg-green-50 text-green-800",
};

const TYPE_OPTIONS: { value: NotificationType; label: string; icon: string }[] = [
  { value: "ADMIN", label: "Admin", icon: "👤" },
  { value: "BROADCAST", label: "Broadcast", icon: "📢" },
  { value: "SYSTEM", label: "System", icon: "⚙️" },
];

export default function Notifications() {
  const [type, setType] = useState<NotificationType>("ADMIN");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [recent, setRecent] = useState<RecentNotification[]>(MOCK_RECENT);

  const [sendNotification, { isLoading }] = useSendNotificationsMutation();

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required");
      return;
    }
    if (type !== "BROADCAST" && !recipient.trim()) {
      toast.error("Recipient ID is required");
      return;
    }

    const payload =
      type === "BROADCAST"
        ? { title, message, type, ...(roleFilter && { role: roleFilter }) }
        : { title, message, type, recipient };

    try {
      await sendNotification(payload).unwrap();

      setRecent((prev) => [
        { id: Date.now().toString(), title, message, type, createdAt: new Date() },
        ...prev.slice(0, 4),
      ]);

      setTitle("");
      setMessage("");
      setRecipient("");
      setRoleFilter("");
      toast.success(type === "BROADCAST" ? "Broadcast sent successfully!" : "Notification sent!");
    } catch {
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
          🔔 Notifications
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Send targeted or broadcast messages to users
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Sent today", value: recent.filter((n) => timeAgo(n.createdAt) !== "").length + 24 },
          { label: "Total users", value: "1,842" },
          { label: "Avg read rate", value: "68%" },
        ].map((m) => (
          <div key={m.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{m.label}</p>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Compose Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          ✉️ Compose notification
        </h2>

        {/* Type selector */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-2">Notification type</label>
          <div className="grid grid-cols-3 gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg border text-sm transition-all ${
                  type === opt.value
                    ? "border-blue-400 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipient / Role filter */}
        {type === "BROADCAST" ? (
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1.5">
              Filter by role{" "}
              <span className="text-gray-400">(optional — leave blank for all)</span>
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All users</option>
              <option value="USER">User</option>
              <option value="AGENT">Agent</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1.5">Recipient user ID</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. 64f3a2b1c9d0e5f6a7b8c9d0"
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-gray-500">Title</label>
            <span className="text-xs text-gray-400">{title.length}/80</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 80))}
            placeholder="Short, descriptive title"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Message */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-gray-500">Message</label>
            <span className="text-xs text-gray-400">{message.length}/300</span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 300))}
            placeholder="Write your notification message here..."
            rows={3}
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span> Sending...
            </>
          ) : (
            <>📤 Send notification</>
          )}
        </button>
      </div>

      {/* Recent notifications */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🕐 Recent notifications
        </h2>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recent.map((n) => (
            <div key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {n.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${TYPE_BADGE[n.type]}`}>
                    {n.type.charAt(0) + n.type.slice(1).toLowerCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{n.message}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0 pt-0.5">{timeAgo(n.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}