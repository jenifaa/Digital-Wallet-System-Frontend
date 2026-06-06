export type TransactionType = "SEND" | "ADD" | "CASH_IN" | "CASH_OUT" | "PAYMENT" | "WITHDRAW";
export type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
export type TransactionEntry = "CREDIT" | "DEBIT";

export interface ITransaction {
  _id: string;
  type: TransactionType;
  status: TransactionStatus;
  entry: TransactionEntry;
  amount: number;
  fee?: number;
  sender?: { name: string; email?: string; phone?: string };
  receiver?: { name: string; email?: string; phone?: string };
  createdAt: string;
  updatedAt?: string;
}
