import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ISendOtp, IVerifyOtp } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    setPhone: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/set-phone",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllUsers: builder.query({
      query: (params?: Record<string, string | number | undefined>) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: `/user/profile`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    forgotPassword: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/auth/forget-password",
        method: "POST",
        data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { id: string; token: string; newPassword: string }) => ({
        url: "/auth/reset-password-token",
        method: "POST",
        data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: { currentPassword: string; newPassword: string }) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    searchUsers: builder.query({
      query: (query: string) => ({
        url: "/user/search",
        method: "GET",
        params: { searchTerm: query },
      }),
    }),
    lookupRecipient: builder.query({
      query: (query: string) => ({
        url: "/user/lookup-recipient",
        method: "GET",
        params: { query },
      }),
    }),
    searchAgents: builder.query({
      query: (params?: Record<string, string | number | undefined>) => ({
        url: "/user/search/agents",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
    requestAgent: builder.mutation({
      query: () => ({
        url: "/user/apply-agent",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    makeAgent: builder.mutation({
      query: (id: string) => ({
        url: `/user/make-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    makeAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/user/make-admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    makeUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/make-user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    approveAgent: builder.mutation({
      query: (id: string) => ({
        url: `/user/approve-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER", "NOTIFICATION"],
    }),
    rejectAgent: builder.mutation({
      query: ({ id, reason }: { id: string; reason?: string }) => ({
        url: `/user/reject-agent/${id}`,
        method: "PATCH",
        data: { reason },
      }),
      invalidatesTags: ["USER", "NOTIFICATION"],
    }),
    suspendAgent: builder.mutation({
      query: ({ id, reason }: { id: string; reason?: string }) => ({
        url: `/user/suspend-agent/${id}`,
        method: "PATCH",
        data: { reason },
      }),
      invalidatesTags: ["USER", "NOTIFICATION"],
    }),
    reactivateAgent: builder.mutation({
      query: (id: string) => ({
        url: `/user/reactivate-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER", "NOTIFICATION"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: { isActive: status },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useSetPhoneMutation,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useLazyLookupRecipientQuery,
  useSearchAgentsQuery,
  useDeleteUserMutation,
  useRequestAgentMutation,
  useMakeAgentMutation,
  useMakeAdminMutation,
  useApproveAgentMutation,
  useRejectAgentMutation,
  useSuspendAgentMutation,
  useReactivateAgentMutation,
  useUpdateUserStatusMutation,
  useMakeUserMutation
} = authApi;
