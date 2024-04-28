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
import { useNavigate } from "react-router-dom";

import FormRBT from "react-bootstrap/Form";

import "../../assets/css/general-css.css";

import useCategoriesStore from "../../store/useCategoriesStore";
import useTasksStore from "../../store/useTasksStore";
import useAllUsersStore from "../../store/useAllUsersStore";

import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const CreateTask = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const { task } = props;

  const [show, setShow] = useState(false);


  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (show && task) {
      setTitleValue(task.title);
      setDescriptionValue(task.description);
      setInitialDateValue(task.initialDate);
      setEndDateValue(task.endDate);
      setSelectedOption(task.priority);
      setCategoryValue(task.category.idCategory);
    } else {
      setTitleValue("");
      setDescriptionValue("");
      setInitialDateValue("");
      setEndDateValue("");
      setSelectedOption(100);
    }
  }, [show, task]);

  const modalTitle = task ? t('editTaskTitle') : t('createTaskTitle');

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
  const updateTask = useTasksStore((state) => state.updateTask);

  const handleSubmit = () => {
    if (!task) {
      createTask(
        {
          title: titleValue,
          description: descriptionValue,
          initialDate: initialDateValue,
          endDate: endDateValue,
          priority: selectedOption,
        },
        categoryValue
      ).then(() => {
        handleClose();
      });
    } else {
      updateTask(task.id, categoryValue, {
        title: titleValue,
        description: descriptionValue,
        initialDate: initialDateValue,
        endDate: endDateValue,
        priority: selectedOption,
        state: task.state,
      }).then(() => {
        handleClose();
      });
    }
  };

  const categories = useCategoriesStore((state) => state.categories);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t('title')}</label>
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
                    <label>{t('description')}</label>
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
                    <label>{t('initialDate')}</label>
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
                    <label>{t('endDate')}</label>
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
                    <Label for="priority-low">{t('taskSelectPriority')}</Label>
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
                      {t('taskLowPriority')}
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
                      {t('taskMediumPriority')}
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
                      {t('taskHighPriority')}
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
                    <label>{t('taskSelectCategory')}</label>
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
                      {t('taskSelectCategory')}
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.idCategory}
                          value={category.idCategory}
                        >
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
          {t('closeButton')}
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {modalTitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CreateTask;
