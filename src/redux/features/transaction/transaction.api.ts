import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation({
      query: (addMoneyInfo) => ({
        url: "/transaction/add-money",
        method: "POST",
        data: addMoneyInfo,
      }),
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyInfo) => ({
        url: "/transaction/send-money",
        method: "POST",
        data: sendMoneyInfo,
      }),
    }),
    cashOut: builder.mutation({
      query: (cashOutInfo) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data: cashOutInfo,
      }),
    }),

    myTransactions: builder.query({
      query: () => ({
        url: "/transaction/my-transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useCashOutMutation,
  useMyTransactionsQuery,
} = transactionApi;
