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
    allWallets: builder.query<IResponse<IWallet[]>, Record<string, string | number | undefined> | void>({
      query: (params) => ({
        url: "/wallet/all-wallet",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["WALLET"],
    }),
    updateWalletStatus: builder.mutation<
      IResponse<IWallet>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url:
          status === "BLOCKED"
            ? `/wallet/block/${id}`
            : `/wallet/unblock/${id}`,
        method: "PATCH",
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
    deleteWallet: builder.mutation({
      query: (id: string) => ({
        url: `/wallet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
  }),
});

export const {
  useMyWalletQuery,
  useSetPinMutation,
  useForgetPinMutation,
  useResetPinMutation,
  useAllWalletsQuery,
  useUpdateWalletStatusMutation,
  useDeleteWalletMutation,
} = walletApi;
