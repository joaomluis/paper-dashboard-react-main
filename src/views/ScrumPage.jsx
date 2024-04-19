import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import "../assets/css/general-css.css";

function SrumPage() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Scrum Page</CardTitle>
                <hr />
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" className="mb-4 to-do-column">
                    <div className="task-column">
                      <div>
                      <h3 className="column-header">To Do</h3>
                        <hr />
                      </div>
                    </div>
                  </Col>
                  <Col md="4" className="mb-4 doing-column">
                    <div className="task-column">
                      <div>
                      <h3 className="column-header">Doing</h3>
                        <hr />
                      </div>
                    </div>
                  </Col>
                  <Col md="4" className="mb-4 done-column">
                    <div className="task-column">
                      <div>
                      <h3 className="column-header">Done</h3>
                        <hr />
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SrumPage;
