import App from "@/App";
import Login from "@/pages/authenticationPage/Login";
import Register from "@/pages/authenticationPage/Register";
import Unauthorized from "@/pages/authenticationPage/Unauthorized";
import Verify from "@/pages/authenticationPage/Verify";
import HomePage from "@/pages/HomePage/HomePage";
import About from "@/pages/publicPages/About";
import Contact from "@/pages/publicPages/Contact";
import Pricing from "@/pages/publicPages/Pricing";
import Service from "@/pages/publicPages/Service";
import { createBrowserRouter } from "react-router";

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
        Component:About,
        path:"about"
      },
      {
        Component:Pricing,
        path:"pricing"
      },
      {
        Component:Service,
        path:"service"
      },
      {
        Component:Contact,
        path:"contact"
      }
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
]);
export default router;
