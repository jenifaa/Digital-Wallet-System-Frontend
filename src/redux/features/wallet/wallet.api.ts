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
  }),
});

export const { useMyWalletQuery, useSetPinMutation } = walletApi;
