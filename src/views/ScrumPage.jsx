import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

import { useRef, useEffect } from "react";

import useTasksStore from "../store/useTasksStore";

import "../assets/css/general-css.css";
import CreateTask from "../components/Modals/Create-task.jsx";
import Task from "../components/Task/Task.jsx";

function SrumPage() {
  const getActiveTasks = useTasksStore((state) => state.getActiveTasks);
  const tasks = useTasksStore((state) => state.activeTasksdata);
  const updateTaskState = useTasksStore((state) => state.updateTaskState);
  
  
  useEffect(() => {
    getActiveTasks();
  }, []);

  const createTaskRef = useRef();

  return (
    <>
      <div className="content">
        <CreateTask ref={createTaskRef} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="6">
                    <Button
                      className="btn-round add-user-button"
                      style={{ backgroundColor: "#3f74a6" }}
                      onClick={() => createTaskRef.current.handleShow()}
                    >
                      <i className="fa fa-plus" /> Add Task
                    </Button>
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
                        <h3 className="column-header">To Do</h3>
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
                        <h3 className="column-header">Doing</h3>
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
                        <h3 className="column-header">Done</h3>
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
