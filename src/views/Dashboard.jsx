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
import { useTranslation } from 'react-i18next';

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
import { useNavigate } from "react-router-dom";
import useAllUsersStore from "store/useAllUsersStore.jsx";

import useDashboardStore from "../store/useDashboardStore.jsx";
import DashboardWebsocket from "../assets/websocket/dashboardWebsocket.js";

import UsersPieChart from "../components/Charts/Users-Info-PieChart.jsx";
import TasksBarChart from "../components/Charts/Tasks-Count-BarChart.jsx";
import UsersRegistrationChart from "../components/Charts/Users-Registration-LineChart.jsx";
import CategoryUsageChart from "../components/Charts/Category-Usage-BarChart.jsx";
import TaskCompletionChart from "../components/Charts/Task-Completion-LineChart.jsx";

function Dashboard() {
  const { t, i18n } = useTranslation();

  //websocket
  const ws = DashboardWebsocket();

  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const message = event.data;

      if (message === 'New tasks info detected') {
        getTasksData();
      } else if (message === 'New users info detected') {
        getUsersData();
      }
    };
    }
  }, [ws, ws.current]);

  //data for the charts
  const usersData = useDashboardStore((state) => state.usersData);
  const getUsersData = useDashboardStore((state) => state.fetchUsersData);

  const tasksData = useDashboardStore((state) => state.tasksData);
  const getTasksData = useDashboardStore((state) => state.fetchTasksData);

  useEffect(() => {
    getUsersData();
    getTasksData();
  }, []);

  const usersDataForChart = [
    { name: t('activeUsers'), value: usersData.activeUsers },
    { name: t('inactiveUsers'), value: usersData.inactiveUsers },
  ];

  const tasksDataForChart = [
    { name: t('toDo'), count: tasksData.toDoTasksQuantity },
    { name: t('doing'), count: tasksData.doingTasksQuantity },
    { name: t('done'), count: tasksData.doneTasksQuantity },
  ];

  const categoryUsageData = tasksData.categoryUsage
    ? tasksData.categoryUsage.map((item) => ({
        name: item.title,
        count: item.count,
      }))
    : [];

  const usersRegistrationData = usersData.userRegistration
    ? usersData.userRegistration.map((item) => ({
        date: item.registrationDate,
        count: item.count,
      }))
    : [];

  const tasksCompletionData = tasksData.tasksDateCompletion
    ? tasksData.tasksDateCompletion.map((item) => ({
        date: item.completionDate,
        count: item.count,
      }))
    : [];

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
                      <i className="fa fa-tasks text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">{t('tasksNumber')}</p>
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
                      <p className="card-category">{t('usersNumber')}</p>
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
                      <p className="card-category">{t('tasksPerUserNumber')}</p>
                      <CardTitle tag="p">
                        {tasksData.avgTaskPerUser % 1 !== 0
                          ? parseFloat(tasksData.avgTaskPerUser).toFixed(1)
                          : Math.floor(tasksData.avgTaskPerUser)}
                      </CardTitle>
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
                      <p className="card-category">{t('tasksAvgCompletionTime')}</p>
                      <CardTitle tag="p">
                        {tasksData.avgCompletionTime % 1 !== 0
                          ? parseFloat(tasksData.avgCompletionTime).toFixed(1)
                          : Math.floor(tasksData.avgCompletionTime)}{" "}
                        {t('days')}
                      </CardTitle>
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
                <CardTitle tag="h5">{t('usersStats')}</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <UsersPieChart data={usersDataForChart} />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle" style={{ color: "#0088FE" }} />{" "}
                  {t('activeUsers')}{" "}
                  <i className="fa fa-circle" style={{ color: "#FFBB28" }} />{" "}
                  {t('inactiveUsers')}{" "}
                </div>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">{t('tasksStats')}</CardTitle>
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
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">{t('categoryStats')}</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <CategoryUsageChart data={categoryUsageData} />
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">{t('usersTimeline')}</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <UsersRegistrationChart data={usersRegistrationData} />
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
                <CardTitle tag="h5">{t('tasksCompletionTime')}</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <TaskCompletionChart data={tasksCompletionData} />
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
