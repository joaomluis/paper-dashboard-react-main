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
  Row,
  Col,
} from "reactstrap";

import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-transparent">
        <div className=" form_container p-5 rounded bg-white">
          <form action="">
            <h3 className="text-center">Sign Up</h3>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="firstName">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="firstName">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="firstName">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <label htmlFor="firstName">Image Url</label>
                  <input
                    type="text"
                    placeholder="Enter Image Url"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-primary ">Sign Up</button>
            </div>
            <div
                  style={{ display: "flex", justifyContent: "space-between", marginTop: "15px"}}
                >
                  <Link to="/auth/login"> <a> Return to Login Page</a> </Link>
                  
                </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
