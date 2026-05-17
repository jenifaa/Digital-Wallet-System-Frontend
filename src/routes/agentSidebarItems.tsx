import agentAnalytics from "@/pages/agent/agentAnalytics";


import type { ISidebarItems } from "@/types";

export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: agentAnalytics,
      },
   
    ],
  },
];
