import agentAnalytics from "@/pages/agent/agentAnalytics";

import MyProfile from "@/pages/agent/MyProfile";
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
      {
        title: "My Profile",
        url: "/agent/profile",
        component: MyProfile,
      },
    ],
  },
];
