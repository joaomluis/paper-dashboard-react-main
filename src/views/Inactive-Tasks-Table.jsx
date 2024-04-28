import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import useTasksStore from "store/useTasksStore.jsx";
import useAllUsersStore from "store/useAllUsersStore.jsx";

import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";

import "../assets/css/general-css.css";

import DynamicTable from "components/Dynamic Table/dynamic-table";

import { useEffect, useState } from "react";

function InactiveTasksTable() {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);

  const deleteTask = useTasksStore((state) => state.deleteTaskPerma);
  const restoreTask = useTasksStore((state) => state.updateTaskActiveState);
  const inactiveTasks = useTasksStore((state) => state.data);
  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

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
      text: t("title"),
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "description",
      text: t("description"),
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
      text: t("initialDate"),
    },
    {
      dataField: "endDate",
      text: t("endDate"),
    },
    {
      dataField: "author.username",
      text: t("author"),
    },

    {
      dataField: "idCategory",
      text: t("actions"),
      formatter: (cell, row) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              className="btn-round"
              color="primary"
              size="sm"
              onClick={() => restoreTask(row.id)}
            >
              {t("restore")}
            </Button>
            <Button
              className="btn-round"
              style={{ marginTop: "15px" }}
              color="danger"
              size="sm"
              onClick={() => deleteTask(row.id)}
            >
              {t("delete")}
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
                    {t("inactiveTasksTable")}
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
