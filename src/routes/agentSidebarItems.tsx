import AgentAnalytics from "@/pages/agent/agentAnalytics";
import CashIn from "@/components/modules/User/CashIn";
import CashOut from "@/components/modules/User/CashOut";

import type { ISidebarItems } from "@/types";

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
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        component: CashOut,
      },
    ],
  },
];
