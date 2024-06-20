import SfStudentsComponent from "../components/sfStudentsComponent";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import SfCoursesComponent from "../components/sfCoursesComponent";
import SfDevComponent from "../components/sfDevComponent";

function DashboardSchwundberechnung(props) {
  return (
    <>
      <Container fluid>
        <Row xs="2">
        <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                <div>
                  <SfDevComponent selectedBaseCourse={props.selectedBaseCourse} selectedCourses={props.selectedCourses}></SfDevComponent>
                </div>
              </Card.Body>
            </Card>
        </Col>
        <Col xs='5'>
            <Card className="card-chart">
              <Card.Body>
                <div>
                  <SfCoursesComponent selectedBaseCourse={props.selectedBaseCourse} selectedCourses={props.selectedCourses}></SfCoursesComponent>
                </div>
              </Card.Body>
            </Card>
        </Col>
        </Row>
        <Row>
          <Col xs="10">
            <Card className="card-chart">
              <Card.Body>
                <div>
                  <SfStudentsComponent selectedBaseCourse={props.selectedBaseCourse} selectedCourses={props.selectedCourses}></SfStudentsComponent>
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
