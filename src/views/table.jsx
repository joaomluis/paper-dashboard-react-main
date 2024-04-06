import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import useUserStore from "store/useUserStore";
import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";

import DynamicTable from "components/Dynamic Table/dynamic-table";


import { useEffect, useState } from "react";

async function getActiveUsers() {
  const activeUsersRequest =
    "http://localhost:8080/project_backend/rest/users/all";
    const token = useUserStore.getState().token;

  try {
    const response = await fetch(activeUsersRequest, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (response.ok) {
      const activeUsers = await response.json();

      console.log("Active users: ", activeUsers);
      return activeUsers;
    }
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
}

function UsersTable() {

  const [loading, setLoading] = useState(true);

  

  const [users, setData] = useState([]);

  useEffect(() => {
    getActiveUsers().then(activeUsers => {
      setData(activeUsers);
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
      sort: true
    },
    {
      dataField: "typeOfUser",
      text: "Role ",
      filter: textFilter(),
      formatter: (cell) => {
        switch(cell) {
          case 'product_owner':
            return 'Product Owner';
          case 'scrum_master':
            return 'Scrum Master';
          case 'developer':
            return 'Developer';
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
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <DynamicTable data={users} columns={columns}/>
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
