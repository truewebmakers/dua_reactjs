import { Children, useState } from "react";
import Login from "./Components/auth/Login";
import Dashboard from "./Components/admin/Dashboard";
import AppLayout from "./Components/layouts/Guest/AppLayout";
import LandingPage from "./Components/LandingPage";
import AppLayoutAdmin from "./Components/layouts/Main/AppLayoutAdmin";
import CreatePermission from "./Components/admin/usermanagement/permission/CreatePermission";
import ManagePermission from "./Components/admin/usermanagement/permission/ManagePermission";
import CreateRole from "./Components/admin/usermanagement/role/CreateRole";
import ManageRole from "./Components/admin/usermanagement/role/ManageRole";
import CreateUser from "./Components/admin/usermanagement/user/CreateUser";
import ManageUserList from "./Components/admin/usermanagement/user/ManageUserList";
import VenueCreate from "./Components/admin/VenueManagement/VenueCreate";
import VenueList from "./Components/admin/VenueManagement/VenueList";
import PrivateRoute from "./Components/PrivateRoute";

export const routeConfig = [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <LandingPage /> },
        { path: "auth/login", element: <Login /> },
      ],
    },
    {
      path: "/admin/",
    //   element: <PrivateRoute isAuthenticated={isAuthenticated} />,
      element: <AppLayoutAdmin />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "permission/create", element: <CreatePermission /> },
        { path: "permission/edit/:id", element: <CreatePermission /> },
        { path: "permission/list", element: <ManagePermission /> },
        { path: "role/create", element: <CreateRole /> },
        { path: "role/list", element: <ManageRole /> },
        { path: "users/create", element: <CreateUser /> },
        { path: "users/list", element: <ManageUserList /> },
        { path: "venue/create", element: <VenueCreate /> },
        { path: "venue/list", element: <VenueList /> },
      ],
    },
  ];