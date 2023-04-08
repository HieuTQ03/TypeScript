import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./components/adminLayout";
import RootLayout from "./components/rootLayout";
import React from "react";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "contact", element: "Contact Page" },
      { path: "products", element: "Products Page" }
    ]
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "products", element: "Admin Products Page" },
      { path: "/products/:id/update", element: "Products Page" }
    ]
  }
]);
export default routers;
