import SfStudentsComponent from "../components/sfStudentsComponent";
// react-bootstrap components
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import SfCoursesComponent from "../components/sfCoursesComponent";
import SfDevComponent from "../components/sfDevComponent";


const sum = (X) => X.reduce((a, b) => a + b, 0);
const avg = (X) => (sum(X) / X.length) || 0;

function DashboardSchwundberechnung(props) {
  return (
    <>
      <Container fluid>
        <Row xs="2">
        <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                {/* <Card.Title as="h4" className="text-center">Schwundfator-Entwicklung zwischen Studiengängen</Card.Title> */}
                <div>
                  <SfCoursesComponent selectedBaseStudiengang={props.selectedBaseStudiengang}></SfCoursesComponent>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                {/* <Card.Title as="h4" className="text-center">Schwundfaktor-Entwicklung</Card.Title> */}
                <div>
                  <SfDevComponent selectedBaseStudiengang={props.selectedBaseStudiengang}></SfDevComponent>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col xs="10">
            <Card className="card-chart">
              <Card.Body>
                {/* <Card.Title as="h3" className="text-center">Schwundberechnung</Card.Title> */}
                <div>
                  <SfStudentsComponent selectedBaseStudiengang={props.selectedBaseStudiengang}></SfStudentsComponent>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardSchwundberechnung;
