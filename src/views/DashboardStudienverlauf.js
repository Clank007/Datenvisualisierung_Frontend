// react-bootstrap components
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import SankeyChart from "../charts/SankeyChart";

const sum = (X) => X.reduce((a, b) => a + b, 0);
const avg = (X) => (sum(X) / X.length) || 0;

function DashboardStudienverlauf() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="10">
            <Card className="card-chart">
              <Card.Title as="h3" className="text-center pt-4">Studienverlauf DSI WiSe 17/18</Card.Title>
              <Card.Body>
                <SankeyChart></SankeyChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardStudienverlauf;
