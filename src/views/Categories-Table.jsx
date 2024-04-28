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

import { useRef } from "react";

import useCategoriesStore from "store/useCategoriesStore.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import { textFilter } from "react-bootstrap-table2-filter";

import "../assets/css/general-css.css";
import CategoriesWebsocket from "../assets/websocket/categoriesWebsocket.js";
import useAllUsersStore from "store/useAllUsersStore.jsx";

import DynamicTable from "components/Dynamic Table/dynamic-table";
import CreateCategory from "components/Modals/Create-category.jsx";

import { useEffect, useState } from "react";

function CategoriesTable() {
  const { t, i18n } = useTranslation();
  
  const [loading, setLoading] = useState(true);

  const allCategories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const ws = CategoriesWebsocket();

  const token = useAllUsersStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = () => {
        fetchCategories(); 
      };
    }
  }, [ws, ws.current]);

  useEffect(() => {
    useCategoriesStore
      .getState()
      .fetchCategories()
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
      dataField: 'description',
      text: t("description"),
      formatter: (cell, row) => {
        return (
          <div style={{ 
            width: '150px', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>
            {cell}
          </div>
        );
      }
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
              onClick={() => changeCreateCategoryRef.current.handleShow(row)}
            >
              {t("edit")}
            </Button>
            <Button
              className="btn-round"
              style={{ marginTop: "15px" }}
              color="danger"
              size="sm"
              onClick={() => {
                useCategoriesStore.getState().deleteCategory(cell);
              }}
            >
              {t("delete")}
            </Button>
          </div>
        );
      },
    },
  ];

  const keyField = "idCategory";

  const changeCreateCategoryRef = useRef();

  return (
    <>
      <div className="content">
        <CreateCategory ref={changeCreateCategoryRef} />
        <Row>
          <Col md="12">
            <Card>
              <Row>
                <Col md="10">
                  <CardHeader>
                    <CardTitle tag="h4" className="all-users-table-tittle">
                    {t("categoriesTable")}
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
                    onClick={() => changeCreateCategoryRef.current.handleShow()}
                  >
                    {t("addCategory")}
                  </Button>
                </Col>
              </Row>

              <CardBody>
                {loading ? (
                  <Spinner animation="border" role="status"></Spinner>
                ) : (
                  <DynamicTable
                    keyField={keyField}
                    data={allCategories}
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

export default CategoriesTable;
