import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

function DynamicTable({ data, columns }) {
  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <BootstrapTable
          keyField="username"
          data={data}
          columns={columns}
          filter={filterFactory()}
          hover
          bordered={ false }
          
          
        />
      </div>
    </>
  );
}

export default DynamicTable;
