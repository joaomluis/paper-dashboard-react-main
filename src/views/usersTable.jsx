import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";


import useAllUsersStore from "store/useAllUsersStore.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";
import { useNavigate } from "react-router-dom";

import DynamicTable from "components/Dynamic Table/dynamic-table";

import { useEffect, useState } from "react";

function UsersTable() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [users, setData] = useState([]);

  useEffect(() => {
    useAllUsersStore
      .getState()
      .getAllUsers()
      .then((allUsers) => {
        setData(allUsers);
        setLoading(false);
      });
  }, []);

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

    {
      dataField: "action",
      text: "Action",
      formatter: () => {
        return (
          <Button
            className="btn-round"
            color="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log("click");
            }}
          >
            Actions
          </Button>
        );
      },
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate(`/agile-up/user/${row.username}`);
    },
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Users</CardTitle>
              </CardHeader>

              <CardBody>
                {loading ? (
                  <Spinner animation="border" role="status"></Spinner>
                ) : (
                  <DynamicTable
                    data={users}
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
