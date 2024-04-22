import useTasksStore from "../../store/useTasksStore";
import useUserStore from "../../store/useUserStore";
import { Card } from "react-bootstrap";
import { Row, Col } from "reactstrap";

import "../../assets/css/general-css.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task }) => {
  const userType = useUserStore((state) => state.userType);
  const username = useUserStore((state) => state.username);

  const { selectedCategory, selectedUser } = useTasksStore();
  const updateTaskActiveState = useTasksStore(
    (state) => state.updateTaskActiveState
  );

  let backgroundColorTask;

  if (task.priority === 100) {
    backgroundColorTask = "#44ca4d";
  } else if (task.priority === 200) {
    backgroundColorTask = "#fcff2e";
  } else if (task.priority === 300) {
    backgroundColorTask = "#ff4d4d";
  }

  return (
    <Card
      id={task.id}
      
      item={task}
      className="card-container"
      draggable="true"
      style={{ backgroundColor: backgroundColorTask, color: "black" }}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", task.id);
      }}
    >
      <Card.Body>
        <Row>
          <Col md="10">
            <Card.Title className="task_title text-overflow-task">
              {task.title}
            </Card.Title>
          </Col>
          <Col md="2">
            {(userType === "scrum_master" ||
              userType === "product_owner" ||
              username === task.author.username) && (
              <div className="icon-container" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Card.Text className="task_category text-overflow-task_category">
              {task.category.title}
            </Card.Text>
          </Col>
          <Col md="2">
            {(userType === "scrum_master" || userType === "product_owner") && (
              <div className="icon-container" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  onClick={() =>
                    updateTaskActiveState(
                      task.id,
                      selectedUser,
                      selectedCategory
                    )
                  }
                />
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Task;
