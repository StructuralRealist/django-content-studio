import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { App } from "@/app";
import { AuthGuard, AuthProvider } from "@/auth";
import { AuthLayout } from "@/pages/(auth)/layout";
import { LoginPage } from "@/pages/(auth)/login/page";
import { DashboardPage } from "@/pages/(studio)/(dashboard)/page";
import { ModelListLayout } from "@/pages/(studio)/content/[model]/layout";
import { ModelListPage } from "@/pages/(studio)/content/[model]/page";
import { StudioLayout } from "@/pages/(studio)/layout";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            element: <StudioLayout />,
            children: [
              {
                path: "",
                element: <DashboardPage />,
              },
              {
                path: "/content/:model",
                element: <ModelListLayout />,
                children: [
                  {
                    path: "",
                    element: <ModelListPage />,
                  },
                ],
              },
            ],
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
