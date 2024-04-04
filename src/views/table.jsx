import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  
  function DynamicTable() {
    return (

        <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th >Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>  
        </>

    );
}

export default DynamicTable;

