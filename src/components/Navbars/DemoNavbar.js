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
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Badge,
} from "reactstrap";

import routes from "routes.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import useUserStore from "../../store/useUserStore.jsx";
import useNotificationsStore from "../../store/useNotificationsStore.jsx";
import notificationsWebsocket from "../../assets/websocket/notificationWebsocket.js";

function Header(props) {

  const username = useUserStore((state) => state.username);

  const ws = notificationsWebsocket(username);



  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();
  const setLoggedIn = useUserStore((state) => state.setLoggedIn);

  const firstName = useUserStore((state) => state.firstName);

  async function logoutUser() {
    try {
      const response = await fetch(
        "http://localhost:8080/project_backend/rest/users/logout",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.text();

        setLoggedIn(false);
        navigate("/");
        sessionStorage.clear();
      } else {
        const error = await response.text();
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  const notifications = useNotificationsStore((state) => state.notifications);

  return (
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand>{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
              {notifications.length > 0 && <Badge color="danger" pill>{notifications.length}</Badge>}
                <i className="nc-icon nc-bell-55" />
                
                <p>
                  <span className="d-lg-none d-md-block"></span>
                </p>
              </DropdownToggle>
              <DropdownMenu
                right
                style={{ maxHeight: "150px", overflow: "auto" }}
              >
                {notifications.map((notification) => {
                  const date = new Date(notification.timestamp);

                  const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(date);

                  return (
                    <DropdownItem key={notification.timestamp}>
                      {`Message from ${notification.sender} at ${formattedDate}`}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <Link to={"/agile-up/user-page"} className="nav-link btn-rotate">
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{ marginRight: "10px" }}
                />

                <p>
                  <span className="d-lg-none d-md-block"></span>
                  <span>{firstName}</span>
                </p>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link btn-rotate" onClick={logoutUser}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="lg"
                  style={{ marginRight: "10px" }}
                />
                <p>
                  <span className="d-lg-none d-md-block">Log out</span>
                </p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
