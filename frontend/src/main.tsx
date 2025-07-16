import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { App } from "@/app";
import { AuthGuard, AuthProvider } from "@/auth";
import { AuthLayout } from "@/pages/(auth)/layout";
import { LoginPage } from "@/pages/(auth)/login/page";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: "",
            element: <div>Dashboard</div>,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
