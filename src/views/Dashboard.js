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
import React, { useEffect } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

import useDashboardStore from "../store/useDashboardStore.jsx";

import UsersPieChart from "../components/Charts/Users-Info-PieChart.jsx";
import TasksBarChart from "../components/Charts/Tasks-Count-BarChart.jsx";
import UsersRegistrationChart from "../components/Charts/Users-Registration-LineChart.jsx";
import CategoryUsageChart from "../components/Charts/Category-Usage-BarChart.jsx";

function Dashboard() {
  const usersData = useDashboardStore((state) => state.usersData);
  const getUsersData = useDashboardStore((state) => state.fetchUsersData);

  const tasksData = useDashboardStore((state) => state.tasksData);
  const getTasksData = useDashboardStore((state) => state.fetchTasksData);

  useEffect(() => {
    getUsersData();
    getTasksData();
  }, []);

  const usersDataForChart = [
    { name: "Active Users", value: usersData.activeUsers },
    { name: "Inactive Users", value: usersData.inactiveUsers },
  ];

  const tasksDataForChart = [
    { name: "To Do", count: tasksData.toDoTasksQuantity },
    { name: "Doing", count: tasksData.doingTasksQuantity },
    { name: "Done", count: tasksData.doneTasksQuantity },
  ];

  const categoryUsageData = tasksData.categoryUsage 
  ? tasksData.categoryUsage.map(item => ({
      name: item.title,
      count: item.count
    }))
  : [];

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-tasks text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of tasks</p>
                      <CardTitle tag="p">{tasksData.totalTasks}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-users text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of users</p>
                      <CardTitle tag="p">{usersData.totalUsers}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-user-clock text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Tasks per user</p>
                      <CardTitle tag="p">{tasksData.avgTaskPerUser}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-hourglass-half text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Time to finish task</p>
                      <CardTitle tag="p">+placeholder</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users statistics</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <UsersPieChart data={usersDataForChart} />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle" style={{ color: "#0088FE" }} />{" "}
                  Active Users{" "}
                  <i className="fa fa-circle" style={{ color: "#FFBB28" }} />{" "}
                  Inactive Users{" "}
                </div>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Tasks statistics</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <TasksBarChart data={tasksDataForChart} />
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Category Usage</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <CategoryUsageChart data={categoryUsageData} />
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
