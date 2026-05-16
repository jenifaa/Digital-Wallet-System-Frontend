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
  }),
});

export const { useAddMoneyMutation,useSendMoneyMutation } = transactionApi;
