import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILoan, ILoanRepayment, ILoanRequestPayload } from "@/types/loan.type";

export const loanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestLoan: builder.mutation<IResponse<ILoan>, ILoanRequestPayload>({
      query: (data) => ({
        url: "/loan/request",
        method: "POST",
        data,
      }),
      invalidatesTags: ["LOAN"],
    }),
    myLoans: builder.query<IResponse<ILoan[]>, void>({
      query: () => ({
        url: "/loan/my-loans",
        method: "GET",
      }),
      providesTags: ["LOAN"],
    }),
    myRepayments: builder.query<IResponse<ILoanRepayment[]>, void>({
      query: () => ({
        url: "/loan/my-repayments",
        method: "GET",
      }),
      providesTags: ["LOAN"],
    }),
    allLoans: builder.query<IResponse<ILoan[]>, { status?: string } | void>({
      query: (params) => ({
        url: "/loan/all",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["LOAN"],
    }),
    approveLoan: builder.mutation<IResponse<ILoan>, string>({
      query: (id) => ({
        url: `/loan/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["LOAN"],
    }),
    rejectLoan: builder.mutation<IResponse<ILoan>, string>({
      query: (id) => ({
        url: `/loan/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["LOAN"],
    }),
  }),
});

export const {
  useRequestLoanMutation,
  useMyLoansQuery,
  useMyRepaymentsQuery,
  useAllLoansQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} = loanApi;
