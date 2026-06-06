export type NotificationType =
  | "TRANSACTION"
  | "LOAN"
  | "SECURITY"
  | "SYSTEM"
  | "PROMOTION";

export interface INotification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}
