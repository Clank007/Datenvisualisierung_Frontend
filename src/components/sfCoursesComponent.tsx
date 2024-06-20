import { Col, Row } from "react-bootstrap";
import "../assets/css/sfCoursesComponent.css";
import sfCoursesChart from "../charts/sfCoursesChart";

type SelectOption = {
    value: string;
    label: string;
};

const SfCoursesComponent = (props: any) => {

    const chartData = sfCoursesChart({ sfData: props.selectedCourses}, {selectedBaseCourse: props.selectedBaseCourse});
    
    return (
        <div className='sfCoursesContainer'>
            <Col>
                <Row className='sfCoursesChart pe-0'>
                    {chartData}
                </Row>
            </Col>
        </div>
    )
};

export default SfCoursesComponent;