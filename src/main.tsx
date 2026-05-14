import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./providers/theme-provider";
import router from "./routes";
import { RouterProvider } from "react-router";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
