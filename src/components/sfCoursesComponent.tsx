import Select, { ActionMeta, MultiValue } from "react-select";
import { schwundfaktorDaten } from '../charts/helperData';
import sfCoursesChart from "../charts/sfCoursesChart";
import "../assets/css/sfCoursesComponent.css";
import { useState } from "react";
import SchwundfaktorFormat from "../charts/helperTypes";
import { Col, Row } from "react-bootstrap";

type SelectOption = {
    value: string;
    label: string;
};

const SfCoursesComponent = () => {
    const [selectedCourses, setSelectedCourses] = useState<SchwundfaktorFormat[]>([schwundfaktorDaten[6]]);
    const sfCoursesFilterOptions = schwundfaktorDaten.map((course, index) => ({
        value: String(index),
        label: course.course
    }));

    function handleChange(selOptions: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) {
        if (selOptions !== null) {
            const selCourses = selOptions.map((selOption) => schwundfaktorDaten[Number(selOption.value)]);
            setSelectedCourses(selCourses);
        } else {
            setSelectedCourses([]);
        }
    };

    const chartData = sfCoursesChart({ sfData: selectedCourses });
    
    return (
        <div className='sfCoursesContainer'>
            <Col>
                <Row className='sfCoursesChart'>
                    {chartData}
                </Row>
                <Row>
                    <Col className='sfCoursesFilter' xs="1">
                        <label className='sfCoursesFilterLabel align-middle'>Studiengänge:</label>
                    </Col>
                    <Col>
                        <Select
                            isClearable={true}
                            isSearchable={true}
                            isMulti={true}
                            options={sfCoursesFilterOptions}
                            onChange={handleChange}
                            defaultValue={sfCoursesFilterOptions[6]}
                        />
                    </Col>
                </Row>
            </Col>
        </div>
    )
};

export default SfCoursesComponent;