import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { INotification } from "@/types/notification.type";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myNotifications: builder.query<
      IResponse<INotification[]>,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/notification/my-notifications",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["NOTIFICATION"],
    }),
    unreadCount: builder.query<IResponse<{ count: number }>, void>({
      query: () => ({
        url: "/notification/unread-count",
        method: "GET",
      }),
      providesTags: ["NOTIFICATION"],
    }),
    markAsRead: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
    markAllAsRead: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const {
  useMyNotificationsQuery,
  useUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
