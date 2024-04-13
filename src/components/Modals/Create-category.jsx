import { forwardRef, useImperativeHandle, useState } from "react";

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

import "../../assets/css/general-css.css";
import useCategoriesStore from "../../store/useCategoriesStore.jsx";

const CreateCategory = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setTitleValue("");
    setDescriptionValue("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  const createCategory = useCategoriesStore((state) => state.createCategory);

  async function handleCreateCategory() {
    const newCategory = {
      title: titleValue,
      description: descriptionValue,
    };

    createCategory(newCategory).then((response) => {
      if (response.success) {
        handleClose();
      }
    });
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <Label>Title</Label>
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
                    <Label>Description</Label>
                    <Input
                      name="text"
                      type="textarea"
                      value={descriptionValue}
                      onChange={(e) => setDescriptionValue(e.target.value)}
                    />
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
          <Button color="primary" onClick={handleCreateCategory}>
            Create Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CreateCategory;
