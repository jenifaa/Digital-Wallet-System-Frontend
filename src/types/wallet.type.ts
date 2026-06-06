export type WalletStatus = "ACTIVE" | "BLOCKED" | "DEACTIVATED";

export interface IWalletSecurity {
  isPinSet: boolean;
}

export interface IWallet {
  _id: string;
  userId: string;
  balance: number;
  status: WalletStatus;
  restrictions?: string[];
  security?: IWalletSecurity;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}
