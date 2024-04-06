import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import useUserStore from "store/useUserStore";



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

function DynamicTable() {


  const [users, setData] = useState([]);

  useEffect(() => {
    getActiveUsers().then(activeUsers => setData(activeUsers));
  }, []);

  
  

 
  

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
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DynamicTable;
