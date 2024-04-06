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

import { toast, Slide } from 'react-toastify';

import useUserStore from "../store/useUserStore.jsx";

import ChangePassword from "components/Modals/Change-password.jsx";

async function getUserByToken(token) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/user",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (response.ok) {
      const user = await response.json();

      return user;
    } else {
      console.error("Failed to fetch user data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

function User() {
  const userImg = useUserStore((state) => state.imgURL);
  const firstName = useUserStore((state) => state.firstName);
  const token = useUserStore((state) => state.token);

  const [userFetched, setUserFetched] = useState(null);

  useEffect(() => {
    getUserByToken(token).then((userFetched) => {
      setUserFetched(userFetched);
      setUpdateUsername(userFetched.username);
      setUpdateEmail(userFetched.email);
      setUpdateFirstName(userFetched.firstName);
      setUpdateLastName(userFetched.lastName);
      setUpdatePhone(userFetched.phoneNumber);
      setUpdateImgUrl(userFetched.imgURL);
      setRole(userFetched.typeOfUser);
    });
  }, [token]);

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

  async function handleUpdateProfile(e) {
    e.preventDefault();


    const updatedUser = {
        firstName: updateFirstName,
        lastName: updateLastName,
        email: updateEmail,
        phoneNumber: updatePhone,
        imgURL: updateImgUrl

    };

    try {
        const response = await fetch('http://localhost:8080/project_backend/rest/users/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'token': token
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {

            const data = await response.json();
            useUserStore.setState({firstName: data.firstName, imgURL: data.imgURL});

            toast.success("Profile updated successfully", {position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            transition: Slide,
            theme: "colored"
            });
            
            
    
          
          } else {
            const errorData = await response.text();
            toast.error(errorData, {position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            transition: Slide,
            theme: "colored"
            });
          }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

  return (
    <>
      
      <div className="content">
      
        <ChangePassword ref={changePasswordRef} />
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <div className="author" style={{ marginTop: "20px" }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={userImg}
                    />
                    <h5 className="title" style={{ color: "#34b5b8" }}>
                      {firstName}
                    </h5>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        12 <br />
                        <small>Files</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        2GB <br />
                        <small>Used</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        24,6$ <br />
                        <small>Spent</small>
                      </h5>
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
                    <CardTitle tag="h5">Edit Profile</CardTitle>
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
                          onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          type="text"
                          value={updateFirstName}
                          onChange={(e) => setUpdateFirstName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          type="text"
                          value={updateLastName}
                          onChange={(e) => setUpdateLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Image URL</label>
                        <Input
                          type="text"
                          value={updateImgUrl}
                          onChange={(e) => setUpdateImgUrl(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Phone Number</label>
                        <Input
                          type="text"
                          value={updatePhone}
                          onChange={(e) => setUpdatePhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-3" md="6">
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={handleUpdateProfile}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Col>
                    <Col
                      className="pl-3"
                      md="6"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div className="update">
                        <Button
                          className="btn-round"
                          color="danger"
                          onClick={() => changePasswordRef.current.handleShow()}
                        >
                          Update Password
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
