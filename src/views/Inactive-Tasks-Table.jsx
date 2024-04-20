import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import useTasksStore from "store/useTasksStore.jsx";

import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";

import "../assets/css/general-css.css";

import DynamicTable from "components/Dynamic Table/dynamic-table";

import { useEffect, useState } from "react";

function InactiveTasksTable() {
  const [loading, setLoading] = useState(true);

  const deleteTask = useTasksStore((state) => state.deleteTaskPerma);
  const restoreTask = useTasksStore((state) => state.updateTaskActiveState);
  const inactiveTasks = useTasksStore((state) => state.data);

  useEffect(() => {
    useTasksStore
      .getState()
      .getInactiveTasks()
      .then(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      formatter: (cell, row) => {
        return (
          <div
            style={{
              width: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cell}
          </div>
        );
      },
    },
    {
      dataField: "initialDate",
      text: "Initial Date",
    },
    {
      dataField: "endDate",
      text: "Final Date",
    },
    {
      dataField: "author.username",
      text: "Author",
    },

    {
      dataField: "idCategory",
      text: "Actions",
      formatter: (cell, row) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              className="btn-round"
              color="primary"
              size="sm"
              onClick={() => restoreTask(row.id)}
            >
              Restore
            </Button>
            <Button
              className="btn-round"
              style={{ marginTop: "15px" }}
              color="danger"
              size="sm"
              onClick={() => deleteTask(row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const keyField = "id";

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Row>
                <Col md="10">
                  <CardHeader>
                    <CardTitle tag="h4" className="all-users-table-tittle">
                      Inactive Tasks Table
                    </CardTitle>
                  </CardHeader>
                </Col>
              </Row>

              <CardBody>
                {loading ? (
                  <Spinner animation="border" role="status"></Spinner>
                ) : (
                  <DynamicTable
                    keyField={keyField}
                    data={inactiveTasks}
                    columns={columns}
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

export default InactiveTasksTable;
