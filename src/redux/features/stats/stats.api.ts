import { baseApi } from "@/redux/baseApi";

export const statApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    transaction: builder.query({
      query: () => ({
        url: "/stat/transaction",
        method: "GET",
      }),
      providesTags: ["STAT"],
    }),
    payment: builder.query({
      query: () => ({
        url: "/stat/payment",
        method: "GET",
      }),
      providesTags: ["STAT"],
    }),
    user: builder.query({
      query: () => ({
        url: "/stat/user",
        method: "GET",
      }),
      providesTags: ["STAT"],
    }),
    wallet: builder.query({
      query: () => ({
        url: "/stat/wallet",
        method: "GET",
      }),
      providesTags: ["STAT"],
    }),
  }),
});

export const {
  useTransactionQuery,
  usePaymentQuery,
  useUserQuery,
  useWalletQuery,
} = statApi;
