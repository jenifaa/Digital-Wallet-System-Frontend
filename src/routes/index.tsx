import App from "@/App";
import Login from "@/pages/authenticationPage/Login";
import Register from "@/pages/authenticationPage/Register";
import Unauthorized from "@/pages/authenticationPage/Unauthorized";
import Verify from "@/pages/authenticationPage/Verify";
import HomePage from "@/pages/HomePage/HomePage";
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
