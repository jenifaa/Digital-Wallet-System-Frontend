import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    setPin: builder.mutation({
      query: (pinInfo) => ({
        url: "/wallet/pin/set",
        method: "POST",
        data: pinInfo,
      }),
    }),
    forgetPin: builder.mutation({
      query: (pinInfo) => ({
        url: "/wallet/pin/forgot",
        method: "POST",
        data: pinInfo,
      }),
    }),
    resetPin: builder.mutation({
      query: (pinInfo) => ({
        url: "/wallet/pin/reset",
        method: "POST",
        data: pinInfo,
      }),
    }),
  }),
});

export const { useMyWalletQuery, useSetPinMutation ,useForgetPinMutation,useResetPinMutation} = walletApi;
