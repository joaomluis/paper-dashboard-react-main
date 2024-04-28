import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

import FormRBT from "react-bootstrap/Form";

import "../../assets/css/general-css.css";

import useAllUsersStore from "../../store/useAllUsersStore.jsx";

const CreateUser = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUsernameValue("");
    setEmailValue("");
    setFirstNameValue("");
    setLastNameValue("");
    setPhoneValue("");
    setImgValue("");
    setRoleValue("");

    setShow(false);
  };
  const handleShow = () => setShow(true);


  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [imgValue, setImgValue] = useState("");
  const [roleValue, setRoleValue] = useState("");

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  const createUser = useAllUsersStore((state) => state.createUser);

  async function handleCreateUser() {

    const newUser = {
      username: usernameValue,
      email: emailValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      phoneNumber: phoneValue,
      imgURL: imgValue,
      typeOfUser: roleValue,
    };

    createUser(newUser);

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
          <Modal.Title>{t('createUser')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Username</label>
                    <Input
                      type="text"
                      value={usernameValue}
                      onChange={(e) => setUsernameValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Email</label>
                    <Input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>{t('firstName')}</label>
                    <Input
                      type="text"
                      value={firstNameValue}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>{t('lastName')}</label>
                    <Input
                      type="text"
                      value={lastNameValue}
                      onChange={(e) => setLastNameValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>{t('phone')}</label>
                    <Input
                      type="text"
                      value={phoneValue}
                      onChange={(e) => setPhoneValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>{t('imageURL')}</label>
                    <Input
                      type="text"
                      value={imgValue}
                      onChange={(e) => setImgValue(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="12">
                  <FormGroup>
                    <label>{t('selectUserRole')}</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <FormRBT.Select
                      size="lg"
                      className="large-select"
                      value={roleValue}
                      onChange={(e) => setRoleValue(e.target.value)}
                    >
                      <option value="" disabled>{t('selectUserRole')}</option>
                      <option value="developer">Developer</option>
                      <option value="scrum_master">Scrum Master</option>
                      <option value="product_owner">Product Owner</option>
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
          <Button color="primary" onClick={() => {handleCreateUser()}}>{t('createUser')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CreateUser;
