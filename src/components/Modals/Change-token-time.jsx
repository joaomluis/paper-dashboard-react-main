import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Button, FormGroup, Row, Col, Container } from "reactstrap";
import { useTranslation } from 'react-i18next';

import useAllUsersStore from "../../store/useAllUsersStore.jsx";

const ChangeUserRole = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  const udpateTokenTime = useAllUsersStore((state) => state.udpateTokenTime);

  const handleSubmit = (selectedRole) => {
    
    udpateTokenTime(selectedRole).then((response) => {
      if (response.success) {
        handleClose();
      }
    });
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
          <Modal.Title>{t("updateTokenValidty")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t("selectNewTokenValidity")}</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <Form.Select
                      size="lg"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="60">60</option>
                    </Form.Select>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={handleClose}>
          {t("closeButton")}
          </Button>
          <Button color="primary" onClick={()=> handleSubmit(selectedRole)}>
          {t("saveButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ChangeUserRole;
