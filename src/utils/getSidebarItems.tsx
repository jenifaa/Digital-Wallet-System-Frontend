import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSideBarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems, ...userSidebarItems];

    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    case role.agent:
      return [...agentSidebarItems];

    default:
      return [];
  }
};
