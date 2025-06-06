import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const Tasks = React.lazy(() => import("./pages/Tasks"));
const TaskDetail = React.lazy(() => import("./pages/TaskDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "login",
        lazy: () => import("./pages/Login"),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "register",
        lazy: () => import("./pages/Register"),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "tasks/:taskId",
        element: (
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
