export type LoanStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "PAID" | "DEFAULTED";

export interface ILoan {
  _id: string;
  userId: string;
  amount: number;
  interestRate: number;
  duration: number;
  status: LoanStatus;
  purpose?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt?: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface ILoanRepayment {
  _id: string;
  loanId: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface ILoanRequestPayload {
  amount: number;
  duration: number;
  purpose: string;
}
