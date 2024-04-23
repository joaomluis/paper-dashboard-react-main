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
    { name: "To Do Tasks", count: tasksData.toDoTasksQuantity },
    { name: "Doing Tasks", count: tasksData.doingTasksQuantity },
    { name: "Done Tasks", count: tasksData.doneTasksQuantity },
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
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
                <div className="stats">
                  <i className="fa fa-users" /> Total number of users :{" "}
                  {usersData.totalUsers}
                </div>
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
                <div className="stats">
                  <i className="fa fa-tasks" /> Total number of tasks :{" "}
                  {tasksData.totalTasks}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
