import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import SankeyChart from "../charts/SankeyChart";
import { fetchStudyProgressAnalysis } from "../util/api_calls"; // Importiere die API-Funktion

const {RGB_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT} = require('../util/color_constants');

function DashboardStudienverlauf(props) {
  const [ersteKohorte, setErsteKohorte] = useState(0);
  const [anzahlAbbrecher, setAnzahlAbbrecher] = useState(0);
  const [anzahlAbsolventen, setAnzahlAbsolventen] = useState(0);
  const [studyProgressAnalysis, setStudyProgressAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchStudyProgressAnalysis();
        setStudyProgressAnalysis(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (studyProgressAnalysis) {
      const filteredData = studyProgressAnalysis.filter(item => {
        const yearMatch = item.year.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : null;
        return item.course === props.selectedBaseCourse?.[0]?.course && year === props.selectedCohort;
      });

      if (filteredData.length > 0 && filteredData[0]?.cohorts) {
        const cohort = filteredData[0].cohorts;
        setErsteKohorte(cohort[0]);
        setAnzahlAbbrecher(cohort.slice(1, -1).reduce((acc, val, index) => acc + Math.max(0, cohort[index] - val), 0));
        setAnzahlAbsolventen(cohort[cohort.length - 1]);
      }
    }
  }, [studyProgressAnalysis, props.selectedBaseCourse, props.selectedCohort]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_TUERKIS} opacity={0.7} className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Studienanfänger:innen</p>
                      <Card.Title as="h3">{ersteKohorte}</Card.Title>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_VIOLETT} opacity={0.7} className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Fachwechsel oder Studienabbruch</p>
                      <Card.Title as="h3">{anzahlAbbrecher}</Card.Title>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={RGB_CD_HELLGRUEN} opacity={0.7} className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                      </svg>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Absolventen</p>
                      <Card.Title as="h3">{anzahlAbsolventen}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="9">
            <Card className="card-chart">
              <Card.Title as="h3" className="text-center pt-4">
                Studienverlauf {props.selectedBaseCourse[0]?.course} Kohorte {props.selectedCohort}
              </Card.Title>
              <Card.Body>
                <SankeyChart
                  selectedCohort={props.selectedCohort}
                  selectedBaseCourse={props.selectedBaseCourse}
                  studyProgressAnalysis={studyProgressAnalysis}
                  setErsteKohorte={setErsteKohorte}
                  setAnzahlAbbrecher={setAnzahlAbbrecher}
                  setAnzahlAbsolventen={setAnzahlAbsolventen}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardStudienverlauf
