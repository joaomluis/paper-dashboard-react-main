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
import { Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../store/useUserStore.jsx";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpenLanguage, setDropdownOpenLanguage] = useState(false);
  const dropdownToggleLanguage = (e) => {
    setDropdownOpenLanguage(!dropdownOpenLanguage);
  };

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

        navigate("/agile-up/scrum");
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
                <h3 className="text-center">{t("signIn")}</h3>
                <div className="mb-2">
                  <label htmlFor="email">Username</label>
                  <input
                    type="text"
                    placeholder={t("enterUsername")}
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
                    placeholder={t("enterPassword")}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <button className="btn btn-primary ">{t("signIn")}</button>
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
                    <a>{t("forgotPassword")}</a>{" "}
                  </Link>
                  <Dropdown
                    nav
                    isOpen={dropdownOpenLanguage}
                    toggle={(e) => dropdownToggleLanguage(e)}
                  >
                    <DropdownToggle caret nav>
                      <i
                        className="fas fa-globe"
                        style={{ display: "inline" }}
                      />
                      <p style={{ display: "inline" }}>
                        <span className="d-lg-none d-md-block"></span>
                      </p>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem header>{t("Select Language")}</DropdownItem>
                      <DropdownItem onClick={() => i18n.changeLanguage("en")}>
                        English
                      </DropdownItem>
                      <DropdownItem onClick={() => i18n.changeLanguage("pt")}>
                        Portuguese
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
