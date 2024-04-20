/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";

import UserPage from "views/User.js";
import UsersTable from "views/usersTable.jsx";
import Login from "views/login.jsx";
import Register from "views/register.jsx";
import RecoverPassword from "views/RecoverPassword.jsx";
import ConfirmAccount from "views/Confirm-Account.jsx";
import CategoriesTables from "views/Categories-Table.jsx";
import InactiveTasksTable from "views/Inactive-Tasks-Table.jsx";
import ScrumPage from "views/ScrumPage.jsx";

var routes = [
  {
    path: "/scrum",
    name: "Scrum",
    icon: "nc-icon nc-paper",
    component: <ScrumPage />,
    layout: "/agile-up",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/agile-up",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/agile-up",
  },
  {
    path: "/user-page",
    name: "My Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/agile-up",
    hidden: true,
  },

  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: <UsersTable />,
    layout: "/agile-up",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-bullet-list-67",
    component: <CategoriesTables />,
    layout: "/agile-up",
  },
  {
    path: "/inactive-tasks",
    name: "Inactive Tasks",
    icon: "nc-icon nc-simple-remove",
    component: <InactiveTasksTable />,
    layout: "/agile-up",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-single-02",
    component: <Login />,
    layout: "/auth",
  },

  {
    path: "/register",
    name: "Register",
    component: <Register />,
    layout: "/auth",
  },

  {
    path: "/recover",
    name: "Recover Password",
    component: <RecoverPassword />,
    layout: "/auth",
  },

  {
    path: "/user/:username",
    name: "User",
    component: <UserPage />,
    layout: "/agile-up",
    hidden: true,
  },

  {
    path: "/define-password/:mode/:token/",
    name: "Confirm Account",
    component: <ConfirmAccount />,
    layout: "/auth",
  }

  
];
export default routes;
