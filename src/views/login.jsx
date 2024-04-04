/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../store/useUserStore.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/project_backend/rest/users/login",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setUser(data);

        navigate("/agile-up/dashboard");
      } else if (response.status === 404) {
        console.log("Wrong username or password");
      } else {
        alert("Something went wrong:(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-transparent">
        <Row>
          <Col md={6} lg={12}>
            <div className=" form_container p-5 rounded bg-white">
              <form action="" onSubmit={handleSubmit}>
                <h3 className="text-center">Sign In</h3>
                <div className="mb-2">
                  <label htmlFor="email">Username</label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  
                    <button className="btn btn-primary ">Sign in</button>
                  
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Link to="/auth/recover">
                    {" "}
                    <a>Forgot Password?</a>{" "}
                  </Link>
                  <Link to="/auth/register">
                    {" "}
                    <a>Sign up</a>{" "}
                  </Link>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
