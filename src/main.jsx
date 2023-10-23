import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./components/Index.jsx";
import Menu from "./components/Menu.jsx";
import Problem1 from "./components/Problem-1.jsx";
import Problem2 from "./components/Problem-2.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        path: "problem-1",
        element: <Problem1 />,
      },
      {
        path: "problem-2",
        element: <Problem2 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
