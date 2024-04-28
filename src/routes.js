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
import i18next from 'i18next';

import Dashboard from "views/Dashboard.jsx";
import UserPage from "views/User.js";
import UsersTable from "views/usersTable.jsx";
import Login from "views/login.jsx";
import RecoverPassword from "views/RecoverPassword.jsx";
import ConfirmAccount from "views/Confirm-Account.jsx";
import CategoriesTables from "views/Categories-Table.jsx";
import InactiveTasksTable from "views/Inactive-Tasks-Table.jsx";
import ScrumPage from "views/ScrumPage.jsx";

var routes = [
  {
    path: "/scrum",
    name: "scrum",
    icon: "nc-icon nc-paper",
    component: <ScrumPage />,
    layout: "/agile-up",
    roles: ["product_owner", "scrum_master", "developer"],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/agile-up",
    roles: ["product_owner"],
  },
  {
    path: "/user-page",
    name: "myProfile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/agile-up",
    hidden: true,
    roles: ["product_owner", "scrum_master", "developer"],
  },

  {
    path: "/users",
    name: "users",
    icon: "nc-icon nc-single-02",
    component: <UsersTable />,
    layout: "/agile-up",
    roles: ["product_owner", "scrum_master", "developer"],
  },
  {
    path: "/categories",
    name: "categories",
    icon: "nc-icon nc-bullet-list-67",
    component: <CategoriesTables />,
    layout: "/agile-up",
    roles: ["product_owner"],
  },
  {
    path: "/inactive-tasks",
    name: "inactiveTasks",
    icon: "nc-icon nc-simple-remove",
    component: <InactiveTasksTable />,
    layout: "/agile-up",
    roles: ["product_owner", "scrum_master"],
  },
  {
    path: "/login",
    name: i18next.t("login"),
    icon: "nc-icon nc-single-02",
    component: <Login />,
    layout: "/auth",
    roles: [],
  },

  {
    path: "/recover",
    name: i18next.t("recoverPassword"),
    component: <RecoverPassword />,
    layout: "/auth",
    roles: [],
  },

  {
    path: "/user/:username",
    name: i18next.t("user"),
    component: <UserPage />,
    layout: "/agile-up",
    hidden: true,
    roles: ["product_owner", "scrum_master", "developer"],
  },

  {
    path: "/define-password/:mode/:token/",
    name: i18next.t("confirmAccount"),
    component: <ConfirmAccount />,
    layout: "/auth",
    roles: [],
  }

  
];
export default routes;
