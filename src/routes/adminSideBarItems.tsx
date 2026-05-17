


import AllUsers from "@/pages/admin/AllUsers";
import AllWallet from "@/pages/admin/AllWallet";

import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    
      {
        title: "All Users",
        url: "/admin/allUsers",
        component: AllUsers,
      },
      {
        title: "My Wallet",
        url: "/admin/wallet",
        component: AllWallet,
      },
   
    ],
  },
  
];
