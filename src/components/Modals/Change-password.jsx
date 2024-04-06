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
} from "reactstrap";

const ChangePassword = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  return (
    <>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header >
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
            <Row>
              <Col className="pr-1" md="12">
                <FormGroup>
                  <label>Current Password</label>
                  <Input type="password"   />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <FormGroup>
                  <label>New Password</label>
                  <Input type="password"   />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <FormGroup>
                  <label>Confirm New Password</label>
                  <Input type="password"   />
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

export default ChangePassword;
