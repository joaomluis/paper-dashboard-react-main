import { forwardRef, useImperativeHandle, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Button, FormGroup, Row, Col, Container } from "reactstrap";

const ChangeUserRole = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>Select new role</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <Form.Select size="lg">
                      <option value="developer">Developer</option>
                      <option value="scrum_master">Scrum Master</option>
                      <option value="product_owner">Product Owner</option>
                    </Form.Select>
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
          <Button color="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ChangeUserRole;
