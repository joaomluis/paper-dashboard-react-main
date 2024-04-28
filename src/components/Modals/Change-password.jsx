import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from 'react-i18next';

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

import useAllUsersStore from "../../store/useAllUsersStore.jsx";

const ChangePassword = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          <Modal.Title>{t("updatePassword")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t("currentPassword")}</label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t("newPassword")}</label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t("confirmPassword")}</label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    
                  />{" "}
                  {t("showPassword")}
                </Label>
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={handleClose}>
          {t("closeButton")}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleClose();
              useAllUsersStore
                .getState()
                .updatePassowrd(
                  currentPassword,
                  newPassword,
                  confirmNewPassword
                );
            }}
          >
            {t("saveButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ChangePassword;
