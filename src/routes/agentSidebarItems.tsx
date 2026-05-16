import Analytics from "@/pages/agent/Analytics";
import MyProfile from "@/pages/agent/MyProfile";
import type { ISidebarItems } from "@/types";

export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "My Profile",
        url: "/admin/profile",
        component: MyProfile,
      },
    ],
  },
];
