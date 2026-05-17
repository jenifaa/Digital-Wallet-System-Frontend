import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constant/role";
import Login from "@/pages/authenticationPage/Login";
import Register from "@/pages/authenticationPage/Register";
import Unauthorized from "@/pages/authenticationPage/Unauthorized";
import Verify from "@/pages/authenticationPage/Verify";
import HomePage from "@/pages/HomePage/HomePage";
import About from "@/pages/publicPages/About";
import Contact from "@/pages/publicPages/Contact";
import Pricing from "@/pages/publicPages/Pricing";
import Service from "@/pages/publicPages/Service";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import withAuth from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSideBarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userPrivateRoutes } from "./userPrivateRoutes";
import Success from "@/pages/transaction/Success";
import Fail from "@/pages/transaction/Fail";
import Cancel from "@/pages/transaction/Cancel";
import MyProfile from "@/pages/CommonPages/MyProfile";
import UpdateProfile from "@/pages/CommonPages/UpdateProfile";
// import UpdateProfile from "@/pages/user/UpdateProfile";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
      {
        Component: Service,
        path: "service",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: MyProfile,
        path: "profile",
      },
      {
        Component: UpdateProfile,
        path: "user/:id",
      },
    ],
  },
  {
    Component: withAuth(
      DashboardLayout,
      (role.superAdmin as TRole) || (role.admin as TRole),
    ),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/analytics" /> },

      ...generateRoutes(userSidebarItems),
      ...userPrivateRoutes,
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/analytics" /> },

      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: Success,
    path: "/transaction/success",
  },
  {
    Component: Fail,
    path: "/transaction/fail",
  },
  {
    Component: Cancel,
    path: "/transaction/cancel",
  },
]);
export default router;
