import React from "react";
import SfStudentsComponent from "../charts/sfStudentsComponent";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import SfDevComponent from "../charts/sfDevComponent";
import SfCoursesComponent from "../charts/sfCoursesComponent";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
        <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row xs="2">
          <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                {/* <Card.Title as="h4" className="text-center">Schwundfaktor-Entwicklung</Card.Title> */}
                <div>
                  <SfDevComponent></SfDevComponent>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                {/* <Card.Title as="h4" className="text-center">Schwundfator-Entwicklung zwischen Studiengängen</Card.Title> */}
                <div>
                  <SfCoursesComponent></SfCoursesComponent>
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
                  <SfStudentsComponent></SfStudentsComponent>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
