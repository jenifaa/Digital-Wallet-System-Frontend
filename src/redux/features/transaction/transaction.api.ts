import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation({
      query: (addMoneyInfo) => ({
        url: "/transaction/add-money",
        method: "POST",
        data: addMoneyInfo,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyInfo) => ({
        url: "/transaction/send-money",
        method: "POST",
        data: sendMoneyInfo,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    cashOut: builder.mutation({
      query: (cashOutInfo) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data: cashOutInfo,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    cashIn: builder.mutation({
      query: (cashInInfo) => ({
        url: "/transaction/cash-in",
        method: "POST",
        data: cashInInfo,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    withdraw: builder.mutation({
      query: (withdrawInfo) => ({
        url: "/transaction/withdraw",
        method: "POST",
        data: withdrawInfo,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    myTransactions: builder.query({
      query: (params?: Record<string, string | number | undefined>) => ({
        url: "/transaction/my-transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
    searchTransactions: builder.query({
      query: (params?: Record<string, string | number | undefined>) => ({
        url: "/transaction/search",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
  useWithdrawMutation,
  useMyTransactionsQuery,
  useSearchTransactionsQuery,
} = transactionApi;
