// react-bootstrap components
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import SankeyChart from "../charts/SankeyChart";


function DashboardStudienverlauf(props) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="10">
            <Card className="card-chart">
              <Card.Title as="h3" className="text-center pt-4">Studienverlauf {props.selectedBaseCourse[0].course} Kohorte {props.selectedCohort}</Card.Title>
              <Card.Body>
                <SankeyChart selectedCohort={props.selectedCohort} selectedBaseCourse={props.selectedBaseCourse}></SankeyChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardStudienverlauf;
