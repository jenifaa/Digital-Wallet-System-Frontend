import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IWallet } from "@/types/wallet.type";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query<IResponse<IWallet>, void>({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    allWallets: builder.query<IResponse<IWallet[]>, void>({
      query: () => ({
        url: "/wallet/all",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    updateWalletStatus: builder.mutation<
      IResponse<IWallet>,
      { id: string; status: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/wallet/${id}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WALLET"],
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

export const { useMyWalletQuery, useSetPinMutation ,useForgetPinMutation,useResetPinMutation, useAllWalletsQuery, useUpdateWalletStatusMutation} = walletApi;
