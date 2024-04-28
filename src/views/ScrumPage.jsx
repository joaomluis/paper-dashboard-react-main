import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import useTasksStore from "../store/useTasksStore";
import useCategoriesStore from "../store/useCategoriesStore";
import ActiveUsersStore from "../store/useAllUsersStore";
import useUserStore from "store/useUserStore";

import "../assets/css/general-css.css";
import CreateTask from "../components/Modals/Create-task.jsx";
import Task from "../components/Task/Task.jsx";
import TaskWebsocket from "../assets/websocket/tasksWebsocket.js";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

function SrumPage() {
  const { t, i18n } = useTranslation();

  const getActiveTasks = useTasksStore((state) => state.getActiveTasks);
  const tasks = useTasksStore((state) => state.activeTasksdata);
  const updateTaskState = useTasksStore((state) => state.updateTaskState);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const getAllUsers = ActiveUsersStore((state) => state.getAllUsers);
  const {
    selectedCategory,
    selectedUser,
    setSelectedCategory,
    setSelectedUser,
  } = useTasksStore();

  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);

  const createTaskRef = useRef();

  const ws = TaskWebsocket();

  useEffect(() => {
    getActiveTasks();
    fetchCategories();
    getAllUsers();
  }, []);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = () => {
        getActiveTasks(selectedUser, selectedCategory);
      };
    }
  }, [ws, ws.current, selectedUser, selectedCategory]);

  useEffect(() => {
    if (token === null) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  const toggleDropdownCategory = () =>
    setDropdownOpenCategory((prevState) => !prevState);
  const toggleDropdownUser = () =>
    setDropdownOpenUser((prevState) => !prevState);

  const categories = useCategoriesStore((state) => state.categories);
  const users = ActiveUsersStore((state) => state.allUsers);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleUserChange = (username) => {
    setSelectedUser(username);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedUser("");
    getActiveTasks();
  }

  return (
    <>
      <div className="content">
        <CreateTask ref={createTaskRef} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <Button
                      className="btn-round add-user-button"
                      style={{ backgroundColor: "#3f74a6" }}
                      onClick={() => createTaskRef.current.handleShow()}
                    >
                      <i className="fa fa-plus" /> {t("addTask")}
                    </Button>
                  </Col>
                  <Col md="5"></Col>
                  <Col md="2">
                    <Dropdown
                      isOpen={dropdownOpenCategory}
                      toggle={toggleDropdownCategory}
                    >
                      <DropdownToggle
                        caret
                        style={{
                          borderRadius: "30px",
                          backgroundColor: "#3f74a6",
                          color: "white",
                        }}
                      >
                        {t("filterByCategory")}
                      </DropdownToggle>
                      <DropdownMenu>
                        {categories.map((category) => (
                          <DropdownItem
                            onClick={() =>
                              handleCategoryChange(category.idCategory)
                            }
                          >
                            {category.title}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col md="2">
                    <Dropdown
                      isOpen={dropdownOpenUser}
                      toggle={toggleDropdownUser}
                    >
                      <DropdownToggle
                        caret
                        style={{
                          borderRadius: "30px",
                          backgroundColor: "#3f74a6",
                          color: "white",
                        }}
                      >
                        {t("filterByUser")}
                      </DropdownToggle>
                      <DropdownMenu>
                        {users.map((user) => (
                          <DropdownItem
                            onClick={() => handleUserChange(user.username)}
                          >
                            {user.username}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col md="1">
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="3x"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        getActiveTasks(selectedUser, selectedCategory)
                      }
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      size="4x"
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => resetFilters()}
                    />
                  </Col>
                </Row>
                <hr />
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" className="mb-4 to-do-column">
                    <div
                      className="task-column"
                      onDragOver={(event) => {
                        event.preventDefault();
                      }}
                      onDrop={(event) => {
                        const taskId = event.dataTransfer.getData("text/plain");
                        updateTaskState(taskId, "toDo");
                      }}
                    >
                      <div>
                        <h3 className="column-header">{t("toDo")}</h3>
                        <hr />
                      </div>
                      <div className="column" id="column1">
                        <section className="task_list" id="toDo">
                          {tasks
                            .filter((task) => task.state === "toDo")
                            .map((task) => (
                              <Task key={task.id} task={task} />
                            ))}
                        </section>
                      </div>
                    </div>
                  </Col>
                  <Col md="4" className="mb-4 doing-column">
                    <div
                      className="task-column"
                      onDragOver={(event) => {
                        event.preventDefault();
                      }}
                      onDrop={(event) => {
                        const taskId = event.dataTransfer.getData("text/plain");
                        updateTaskState(taskId, "doing");
                      }}
                    >
                      <div>
                        <h3 className="column-header">{t("doing")}</h3>
                        <hr />
                      </div>
                      <div className="column" id="column2">
                        <section className="task_list" id="doing">
                          {tasks
                            .filter((task) => task.state === "doing")
                            .map((task) => (
                              <Task key={task.id} task={task} />
                            ))}
                        </section>
                      </div>
                    </div>
                  </Col>
                  <Col md="4" className="mb-4 doing-column">
                    <div
                      className="task-column"
                      onDragOver={(event) => {
                        event.preventDefault();
                      }}
                      onDrop={(event) => {
                        const taskId = event.dataTransfer.getData("text/plain");
                        updateTaskState(taskId, "done");
                      }}
                    >
                      <div>
                        <h3 className="column-header">{t("done")}</h3>
                        <hr />
                      </div>
                      <div className="column" id="column3">
                        <section className="task_list" id="done">
                          {tasks
                            .filter((task) => task.state === "done")
                            .map((task) => (
                              <Task key={task.id} task={task} />
                            ))}
                        </section>
                      </div>
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
      </div>
    </>
  );
}

export default SrumPage;
