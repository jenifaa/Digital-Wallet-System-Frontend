



import MyProfile from "@/pages/user/MyProfile";
import MyWallet from "@/pages/user/MyWallet";
import UserAnalytics from "@/pages/user/userAnalytics";

import type { ISidebarItems } from "@/types";

export const userSidebarItems : ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/user/analytics",
        component: UserAnalytics,
      },
      {
        title: "My Profile",
        url: "/user/profile",
        component: MyProfile,
      },
      {
        title: "My Wallet",
        url: "/user/wallet",
        component: MyWallet,
      },
    ],
  },
 

];
