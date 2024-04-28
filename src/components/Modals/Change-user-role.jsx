import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Button, FormGroup, Row, Col, Container } from "reactstrap";

import useAllUsersStore from "../../store/useAllUsersStore.jsx";

const ChangeTokenTime = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  
  const [show, setShow] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const { username } = useParams();

  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateRole = () => {
    handleClose();
    useAllUsersStore.getState().updateUserRole(username, selectedRole);
  };


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
          <Modal.Title>{t("updateUserRole")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t("selectRole")}</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <Form.Select size="lg"  value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
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
          {t("closeButton")}
          </Button>
          <Button color="primary" onClick={handleUpdateRole}>
          {t("saveButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ChangeTokenTime;
