// react-bootstrap components
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";

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
                {/* <Card.Title as="h3" className="text-center">Schwundberechnung</Card.Title> */}
                <div>
                  <img src={require('../assets/img/sankey.png')} width="100%" height="100%" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardStudienverlauf;
