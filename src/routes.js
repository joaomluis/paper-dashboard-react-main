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
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";
import DynamicTable from "views/table.jsx";
import Login from "views/login.jsx";
import Register from "views/register.jsx";
import RecoverPassword from "views/RecoverPassword.jsx";

var routes = [
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
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    layout: "/agile-up",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/agile-up",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/agile-up",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <Typography />,
    layout: "/agile-up",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: <DynamicTable />,
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
    icon: "nc-icon nc-single-02",
    component: <Register />,
    layout: "/auth",
  },

  {
    path: "/recover",
    name: "Recover Password",
    icon: "nc-icon nc-single-02",
    component: <RecoverPassword />,
    layout: "/auth",
  },
];
export default routes;
