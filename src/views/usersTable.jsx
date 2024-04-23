import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import { useRef } from "react";

import useAllUsersStore from "store/useAllUsersStore.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";
import { useNavigate } from "react-router-dom";

import "../assets/css/general-css.css";

import UsersWebsocket from "../assets/websocket/usersWebsocket.js";

import DynamicTable from "components/Dynamic Table/dynamic-table";
import CreateUser from "components/Modals/Create-user.jsx";

import { useEffect, useState } from "react";

function UsersTable() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const allUsers = useAllUsersStore((state) => state.allUsers);
  const getAllUsers = useAllUsersStore((state) => state.getAllUsers);

  useEffect(() => {
    useAllUsersStore
      .getState()
      .getAllUsers()
      .then(() => {
        
        setLoading(false);
      });
  }, []);

  const ws = UsersWebsocket();

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = () => {
        getAllUsers(); 
      };
    }
  }, [ws, ws.current]);

  const columns = [
    {
      dataField: "active",
      text: "Active Status",
    },
    {
      dataField: "username",
      text: "Username ",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "typeOfUser",
      text: "Role ",
      filter: textFilter(),
      formatter: (cell) => {
        switch (cell) {
          case "product_owner":
            return "Product Owner";
          case "scrum_master":
            return "Scrum Master";
          case "developer":
            return "Developer";
          default:
            return cell;
        }
      },
    },
    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "lastName",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },

    
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate(`/agile-up/user/${row.username}`);
    },
  };

  const keyField = "username";

  const changeCreateUserRef = useRef();

  return (
    <>
      <div className="content">
        <CreateUser ref={changeCreateUserRef} />
        <Row>
          <Col md="12">
            <Card>
              <Row>
                <Col md="10">
                  <CardHeader>
                    <CardTitle tag="h4" className="all-users-table-tittle">
                      All Users
                    </CardTitle>
                  </CardHeader>
                </Col>
                <Col
                  md="2"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Button
                    className="btn-round add-user-button"
                    style={{ backgroundColor: "#3f74a6" }}
                    onClick={() => changeCreateUserRef.current.handleShow()}
                  >
                    Add User
                  </Button>
                </Col>
              </Row>

              <CardBody>
                {loading ? (
                  <Spinner animation="border" role="status"></Spinner>
                ) : (
                  <DynamicTable
                    keyField={keyField}
                    data={allUsers}
                    columns={columns}
                    rowEvents={rowEvents}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UsersTable;
