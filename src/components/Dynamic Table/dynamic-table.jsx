import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import overlayFactory from "react-bootstrap-table2-overlay";

function DynamicTable({ data, columns }) {
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
    },
    onMouseEnter: (e, row, rowIndex) => {
      console.log(`enter on row with index: ${rowIndex}`);
    },
  };

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
