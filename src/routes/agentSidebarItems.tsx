import AgentAnalytics from "@/pages/agent/agentAnalytics";

import type { ISidebarItems } from "@/types";
import MyWallet from "@/pages/agent/MyWallet";
import SetPin from "@/components/modules/User/SetPin";
import MyTransactions from "@/pages/user/MyTransactions";
import UserLoans from "@/pages/user/UserLoans";
import NotificationCenter from "@/pages/user/NotificationCenter";

export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: AgentAnalytics,
      },
      {
        title: "My Wallet",
        url: "/agent/my-wallet",
        component: MyWallet,
      },
      {
        title: "Set Pin",
        url: "/agent/set-pin",
        component: SetPin,
      },
      {
        title: "My Transactions",
        url: "/agent/history",
        component: MyTransactions,
      },
      {
        title: "Loans",
        url: "/agent/loans",
        component: UserLoans,
      },
      {
        title: "Notifications",
        url: "/agent/notifications",
        component: NotificationCenter,
      },
    ],
  },
];
