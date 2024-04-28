/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEnvelopeCircleCheck,
  faUserSlash,
  faArrowRotateLeft,
  faTrashCan,
  faClipboardList,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/general-css.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../assets/css/general-css.css";

import useUserStore from "../store/useUserStore.jsx";
import useAllUsersStore from "../store/useAllUsersStore.jsx";
import useTasksStore from "../store/useTasksStore.jsx";

import ChangePassword from "components/Modals/Change-password.jsx";
import ChangeUserRole from "components/Modals/Change-user-role.jsx";
import ResendVerification from "components/Modals/Resend-verification-mail.jsx";
import Chat from "components/Chat/Chat.jsx";

function User() {
  const { t, i18n } = useTranslation();

  const usernameFromStore = useUserStore((state) => state.username);
  const userType = useUserStore((state) => state.userType);
  console.log(userType);

  const location = useLocation();
  const currentPath = location.pathname;

  const token = useUserStore((state) => state.token);
  const { username: paramUsername } = useParams();
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const [isOwner, setIsOwner] = useState(false); //verifica se o user é dono do perfil para poder editar ou não
  const [showChangeRole, setShowChangeRole] = useState(false);

  const updateOtherUserProfile = useAllUsersStore(
    (state) => state.updateOtherUserProfile
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    setIsOwner(!paramUsername);
    if (paramUsername) {
      setShowChangeRole(true);
    } else {
      setShowChangeRole(false);
    }
  }, [paramUsername]);

  useEffect(() => {
    const fetchUser = async () => {
      const username = paramUsername || usernameFromStore;
      const fetchedUser = await useAllUsersStore
        .getState()
        .getUserByUsername(username, token);
      setUser(fetchedUser);
    };

    fetchUser();
  }, [paramUsername, usernameFromStore, token]);

  useEffect(() => {
    if (user) {
      setUpdateUsername(user.username);
      setUpdateEmail(user.email);
      setUpdateFirstName(user.firstName);
      setUpdateLastName(user.lastName);
      setUpdatePhone(user.phoneNumber);
      setUpdateImgUrl(user.imgURL);
      setRole(user.typeOfUser);
    }
  }, [user]);

  //dados dos inputs
  const [updateUsername, setUpdateUsername] = useState("");

  const [updateEmail, setUpdateEmail] = useState("");
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateImgUrl, setUpdateImgUrl] = useState("");
  const [role, setRole] = useState("");

  if (role === "product_owner") {
    setRole("Product Owner");
  } else if (role === "scrum_master") {
    setRole("Scrum Master");
  } else if (role === "developer") {
    setRole("Developer");
  }

  const changePasswordRef = useRef();
  const changeUserRoleRef = useRef();
  const resendVerificationRef = useRef();

  async function handleUpdateOtherUserProfile(e) {
    e.preventDefault();

    const updatedUser = {
      firstName: updateFirstName,
      lastName: updateLastName,
      email: updateEmail,
      phoneNumber: updatePhone,
      imgURL: updateImgUrl,
    };

    updateOtherUserProfile(paramUsername, updatedUser);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();

    const updatedUser = {
      firstName: updateFirstName,
      lastName: updateLastName,
      email: updateEmail,
      phoneNumber: updatePhone,
      imgURL: updateImgUrl,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/project_backend/rest/users/updateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        useUserStore.setState({
          firstName: data.firstName,
          imgURL: data.imgURL,
        });

        toast.success("Profile updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      } else {
        const errorData = await response.text();
        toast.error(errorData, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const softDeleteUser = useAllUsersStore((state) => state.softDeleteUser);
  const restoreUser = useAllUsersStore((state) => state.restoreUser);
  const permaDeleteUser = useAllUsersStore((state) => state.deleteUserPerma);
  const deleteAllUserTasks = useTasksStore((state) => state.deleteTaskByUser);

  const taskStatistics = useTasksStore((state) => state.getTasksStatistics);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const username = paramUsername || usernameFromStore;
    taskStatistics(username).then((data) => {
      setStatistics(data);
    });
  }, []);

  return (
    <>
      <div className="content">
        <ChangePassword ref={changePasswordRef} />
        <ChangeUserRole ref={changeUserRoleRef} />
        <ResendVerification ref={resendVerificationRef} />

        {!currentPath.includes("user-page") && (
          <Row>
            <Col md={userType === "product_owner" ? "7" : "11"}></Col>
            <Col md={userType === "product_owner" ? "5" : "1"}>
              <Card className="card-user">
                <CardHeader style={{ paddingTop: "0px" }}>
                  <Row>
                    {userType === "product_owner" && (
                      <>
                        <Col md="2">
                          <Button
                            style={{ backgroundColor: "#3f74a6" }}
                            className="btn-round add-user-button"
                            color="primary"
                            title="Resend confirmation email"
                            size="sm"
                            onClick={() =>
                              resendVerificationRef.current.handleShow()
                            }
                          >
                            <FontAwesomeIcon
                              icon={faEnvelopeCircleCheck}
                              className="hoverable-icon"
                            />
                          </Button>
                        </Col>

                        <Col md="2">
                          <Button
                            style={{ backgroundColor: "#3f74a6" }}
                            className="btn-round add-user-button"
                            color="primary"
                            title="Deactivate user"
                            size="sm"
                            onClick={() => softDeleteUser(paramUsername)}
                          >
                            <FontAwesomeIcon
                              icon={faUserSlash}
                              className="hoverable-icon"
                            />
                          </Button>
                        </Col>
                        <Col md="2">
                          <Button
                            style={{ backgroundColor: "#3f74a6" }}
                            className="btn-round add-user-button"
                            color="primary"
                            title="Reactivate user"
                            size="sm"
                            onClick={() => restoreUser(paramUsername)}
                          >
                            <FontAwesomeIcon
                              icon={faArrowRotateLeft}
                              className="hoverable-icon"
                            />
                          </Button>
                        </Col>
                        <Col md="2">
                          <Button
                            style={{ backgroundColor: "#3f74a6" }}
                            className="btn-round add-user-button"
                            color="danger"
                            title="Delete user"
                            size="sm"
                            onClick={() =>
                              permaDeleteUser(paramUsername).then(() =>
                                window.location.replace("/agile-up/users")
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="hoverable-icon"
                            />
                          </Button>
                        </Col>
                        <Col md="2">
                          <Button
                            style={{ backgroundColor: "#3f74a6" }}
                            className="btn-round add-user-button"
                            color="primary"
                            title="Delete user tasks"
                            size="sm"
                            onClick={() => deleteAllUserTasks(paramUsername)}
                          >
                            <FontAwesomeIcon
                              icon={faClipboardList}
                              className="hoverable-icon"
                            />
                          </Button>
                        </Col>
                      </>
                    )}
                    <Col md="2">
                      <Button
                        style={{ backgroundColor: "#3f74a6" }}
                        className="btn-round add-user-button"
                        color="primary"
                        title="Open chat"
                        size="sm"
                        onClick={() => setShowChat(!showChat)}
                      >
                        <FontAwesomeIcon
                          icon={faMessage}
                          className="hoverable-icon"
                        />
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <div className="author" style={{ marginTop: "20px" }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={updateImgUrl}
                    />
                    <h5 className="title" style={{ color: "#34b5b8" }}>
                      {updateFirstName}
                    </h5>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" md="3">
                      <p>
                      {t("totalTasks")}: {statistics ? statistics.numberOfTasks : 0}
                      </p>
                    </Col>
                    <Col className="ml-auto" md="3">
                      <p>
                      {t("toDo")}:{" "}
                        {statistics ? statistics.numberOfToDoTasks : 0}
                      </p>
                    </Col>
                    <Col className="ml-auto" md="3">
                      <p>
                      {t("doing")}:{" "}
                        {statistics ? statistics.numberOfDoingTasks : 0}
                      </p>
                    </Col>
                    <Col className="ml-auto" md="3">
                      <p>
                      {t("done")}:{" "}
                        {statistics ? statistics.numberOfDoneTasks : 0}
                      </p>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <Row>
                  <Col md="6">
                    <CardTitle tag="h5">
                      {userType === "product_owner"
                        ? t("editProfile") 
                        : t("profile")}
                      {!isOwner &&
                        (userType === "product_owner" && (
                          <FontAwesomeIcon
                            icon={faPen}
                            className="hoverable-icon"
                            onClick={() => setIsOwner(true)}
                          />
                        ))}
                    </CardTitle>
                  </Col>
                  <Col md="3"></Col>
                  <Col md="3">
                    <CardTitle
                      tag="h6"
                      style={{
                        backgroundColor: "#51cbce",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      {role}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input type="text" disabled value={updateUsername} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="text"
                          value={updateEmail}
                          disabled={!isOwner}
                          onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>{t("firstName")}</label>
                        <Input
                          type="text"
                          value={updateFirstName}
                          disabled={!isOwner}
                          onChange={(e) => setUpdateFirstName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>{t("lastName")}</label>
                        <Input
                          type="text"
                          value={updateLastName}
                          disabled={!isOwner}
                          onChange={(e) => setUpdateLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>{t("imageURL")}</label>
                        <Input
                          type="text"
                          value={updateImgUrl}
                          disabled={!isOwner}
                          onChange={(e) => setUpdateImgUrl(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>{t("phone")}</label>
                        <Input
                          type="text"
                          value={updatePhone}
                          disabled={!isOwner}
                          onChange={(e) => setUpdatePhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {userType === "product_owner" && (
                    <Row>
                      <Col className="pl-3" md="6">
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            disabled={!isOwner}
                            onClick={(e) => {
                              if (!paramUsername) {
                                handleUpdateProfile(e);
                              } else {
                                handleUpdateOtherUserProfile(e);
                              }
                            }}
                          >
                            {t("editProfile")}
                          </Button>
                        </div>
                      </Col>
                      <Col
                        className="pl-3"
                        md="6"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <div className="update">
                          {showChangeRole ? (
                            <Button
                              className="btn-round"
                              color="danger"
                              onClick={() =>
                                changeUserRoleRef.current.handleShow()
                              }
                            >
                              {t("updateRole")}
                            </Button>
                          ) : (
                            <Button
                              className="btn-round"
                              color="danger"
                              onClick={() =>
                                changePasswordRef.current.handleShow()
                              }
                            >
                              {t("updatePassword")}
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {showChat && <Chat />}
      </div>
    </>
  );
}

export default User;
