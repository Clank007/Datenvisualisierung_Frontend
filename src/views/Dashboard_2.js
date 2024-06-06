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

import SchwundfaktorFormat from "../charts/helperTypes";
import { schwundfaktorDaten } from '../charts/helperData';

const sum = (X) => X.reduce((a, b) => a + b, 0);
const avg = (X) => (sum(X) / X.length) || 0;

const {RGB_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT} = require('../constants/color_constants');

function Dashboard_2() {
  return (
    <>
      <Container fluid>
        <Row>
        <Col lg="3" sm="3">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_BLAU} class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Studierende gesamt</p>
                      <Card.Title as="h3">111</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="3">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_BLAU} class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Ø Schwundfaktor</p>
                      {/* <Card.Title as="h3">{Math.round(avg(schwundfaktorDaten[6].faktor)*10000,4)/10000}</Card.Title> */}
                      <Card.Title as="h3">1,1928</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="3">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_BLAU} class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Studieanfänger:innen WiSe 23/24</p>
                      <Card.Title as="h3">35</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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

export default Dashboard_2;
