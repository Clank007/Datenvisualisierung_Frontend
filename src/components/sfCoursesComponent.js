import { Col, Row } from "react-bootstrap";
import "../assets/css/sfCoursesComponent.css";
import sfCoursesChart from "../charts/sfCoursesChart";

const SfCoursesComponent = (props) => {

    const chartData = sfCoursesChart(props.selectedCourses, props.selectedBaseCourse);

    return (
        <div className='sfCoursesContainer'>
            <Col>
                <Row className='sfCoursesChart pe-0'>
                    {chartData}
                </Row>
            </Col>
        </div>
    );
}

export default SfCoursesComponent;