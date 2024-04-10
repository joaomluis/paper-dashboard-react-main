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
  
  import {Link} from 'react-router-dom';
  
  const RecoverPassword = () => {
    return (
      <>
        <div className="login template d-flex justify-content-center align-items-center vh-100 bg-transparent">
          <Row>
            <Col md={6} lg={12}>
              <div className=" form_container p-5 rounded bg-white">
                <form action="">
                  <Col className="pr-1" md="12">
                  <h3 className="text-center">Enter a new password</h3>
                  <div className="mb-2">
                    <label htmlFor="email">Insert a new password</label>
                    <input
                      type="password"
                      placeholder="Enter your new password here"
                      className="form-control"
                    />
                  </div>
                  </Col>
                  <Col className="pr-1" md="12">
                  <div className="mb-2">
                    <label htmlFor="email">Confirm password</label>
                    <input
                      type="password"
                      placeholder="Confirm your new password"
                      className="form-control"
                    />
                  </div>
                  </Col>
                  
                  
  
                  <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary ">Confirm changes</button>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", marginTop: "15px"}}
                  >
                    
                    
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };
  
  export default RecoverPassword;
  