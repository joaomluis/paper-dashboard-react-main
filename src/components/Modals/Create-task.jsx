import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";

import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
  Label,
} from "reactstrap";

import FormRBT from "react-bootstrap/Form";

import "../../assets/css/general-css.css";

import useCategoriesStore from "../../store/useCategoriesStore";
import useTasksStore from "../../store/useTasksStore";

const CreateTask = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setTitleValue("");
    setDescriptionValue("");
    setInitialDateValue("");
    setEndDateValue("");
    setSelectedOption(100);
    setCategoryValue("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [initialDateValue, setInitialDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(100);
  const [categoryValue, setCategoryValue] = useState("");

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  const colorMap = {
    100: "#44ca4d",
    200: "#fcff2e",
    300: "#ff4d4d",
  };

  const createTask = useTasksStore((state) => state.createTask);

  const handleSubmit = () => {
    createTask({
      title: titleValue,
      description: descriptionValue,
      initialDate: initialDateValue,
      endDate: endDateValue,
      priority: selectedOption,
    }, categoryValue);
    handleClose();
  };

  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>Title</label>
                    <Input
                      type="text"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      name="text"
                      type="textarea"
                      value={descriptionValue}
                      onChange={(e) => setDescriptionValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Initial Date</label>
                    <Input
                      id="exampleDate"
                      name="date"
                      type="date"
                      value={initialDateValue}
                      onChange={(e) => setInitialDateValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>End Date</label>
                    <Input
                      id="exampleDate"
                      name="date"
                      type="date"
                      value={endDateValue}
                      onChange={(e) => setEndDateValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <Label for="priority-low">Select task priority</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="3">
                  <FormGroup>
                    <label>
                      <input
                        type="radio"
                        value={100}
                        name="priority"
                        style={{ marginRight: "10px" }}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />{" "}
                      Low
                    </label>
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="3">
                  <FormGroup>
                    <label>
                      <input
                        type="radio"
                        value={200}
                        name="priority"
                        style={{ marginRight: "10px" }}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />{" "}
                      Medium
                    </label>
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="3">
                  <FormGroup>
                    <label>
                      <input
                        type="radio"
                        value={300}
                        name="priority"
                        style={{ marginRight: "10px" }}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />{" "}
                      High
                    </label>
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="3">
                  <FormGroup>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        backgroundColor: colorMap[selectedOption],
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>Select task category</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <FormRBT.Select
                      size="lg"
                      className="large-select"
                      value={categoryValue}
                      onChange={(e) => setCategoryValue(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category.idCategory} value={category.idCategory}>
                          {category.title}
                        </option>
                      ))}
                    </FormRBT.Select>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit}>Create Task</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CreateTask;
