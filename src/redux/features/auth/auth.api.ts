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
      query: () => ({
        url: "/user/all-users",
        method: "GET",
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
        url: "/auth/forgot-password",
        method: "POST",
        data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string; password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: {
        currentPassword: string;
        newPassword: string;
      }) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    searchUsers: builder.query({
      query: (query: string) => ({
        url: "/user/search",
        method: "GET",
        params: { query },
      }),
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
} = authApi;
