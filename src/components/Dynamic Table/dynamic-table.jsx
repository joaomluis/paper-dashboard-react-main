import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import overlayFactory from "react-bootstrap-table2-overlay";
import {useNavigate} from "react-router-dom";

function DynamicTable({ data, columns, rowEvents }) {

  const navigate = useNavigate();


  return (
    <>
      <style>
        {`
              .table-fixed thead {
                position: sticky;
                top: 0;
                z-index: 1;
                background-color: white;
              }
              .table-fixed {
                height: 300px; /* Adjust this value to your needs */
                overflow: auto;
              }
            `}
      </style>
      <div
        style={{ overflowX: "auto", maxHeight: "500px", position: "relative" }}
      >
        <BootstrapTable
          keyField="username"
          data={data}
          columns={columns}
          filter={filterFactory()}
          hover
          bordered={false}
          classes="table-fixed"
          rowEvents={rowEvents}
        />
      </div>
    </>
  );
}

export default DynamicTable;
