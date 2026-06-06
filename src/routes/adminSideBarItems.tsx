import AllUsers from "@/pages/admin/AllUsers";
import AllWallet from "@/pages/admin/AllWallet";
import AdminLoans from "@/pages/admin/AdminLoans";

import type { ISidebarItems } from "@/types";
import { lazy } from "react";

import Notifications from "@/pages/admin/Notifications";

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
        title: "All Wallets",
        url: "/admin/wallet",
        component: AllWallet,
      },
      {
        title: "Loan Management",
        url: "/admin/loans",
        component: AdminLoans,
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        component: Notifications,
      },
    
    ],
  },
];
