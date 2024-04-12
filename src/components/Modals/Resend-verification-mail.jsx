import { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from 'react-router-dom';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Button, FormGroup, Row, Col, Container } from "reactstrap";

import useAllUsersStore from "../../store/useAllUsersStore.jsx";

const ResendVerification = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const { username } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  const handleResendVerification = () => {
    handleClose();
    useAllUsersStore.getState().resendUserVerificationEmail(username);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Resend Verification Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label style={{ fontSize: "16px" }}>
                      Are you sure you want to resend the verification email?{" "}
                    </label>
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
          <Button color="primary" onClick={handleResendVerification}>Send</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ResendVerification;
