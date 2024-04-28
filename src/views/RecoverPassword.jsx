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
import { useTranslation } from 'react-i18next';

import { Link } from "react-router-dom";
import { useState } from "react";

import useAllUsersStore from "../store/useAllUsersStore.jsx";

const RecoverPassword = () => {
 const { t, i18n } = useTranslation();

  const [emailValue, setEmailValue] = useState("");

  const sendUserPasswordResetEmail = useAllUsersStore(
    (state) => state.sendUserPasswordResetEmail
  );

  return (
    <>
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-transparent">
        <Row>
          <Col md={6} lg={12}>
            <div className=" form_container p-5 rounded bg-white">
              <form action="">
                <h3 className="text-center">{t("recoverPassword")}</h3>
                <div className="mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder={t("enterEmail")}
                    className="form-control"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary "
                    onClick={(event) => {
                      event.preventDefault();
                      sendUserPasswordResetEmail(emailValue);
                    }}
                  >
                    {t("recoverPassword")}{" "}
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Link to="/auth/login">
                    <a>{t("backToSignIn")}</a>
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

export default RecoverPassword;
