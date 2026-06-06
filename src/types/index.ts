
import type { ComponentType } from "react";

export type { ISendOtp, ILogin, IVerifyOtp } from "./auth.type";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";

export type { IWallet, WalletStatus } from "./wallet.type";
export type { ILoan, ILoanRepayment, ILoanRequestPayload, LoanStatus } from "./loan.type";
export type { INotification, NotificationType } from "./notification.type";
export type {
  ITransaction,
  TransactionType,
  TransactionStatus,
  TransactionEntry,
} from "./transaction.type";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
