import { useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { schwundfaktorDaten } from './helperData';
import sfDevChart from './sfDevChart';
import { Option } from 'react-select/src/filters';
import '../assets/css/sfDevComponent.css';
import { Col, Row } from 'react-bootstrap';

const SfDevComponent = () => {
  const [selectedCourse, setSelectedCourse] = useState(schwundfaktorDaten[6]);

  const sfDevFilterOptions = schwundfaktorDaten.map((course, index) => ({
    value: String(index),
    label: course.course,
    data: null
  }));

  const handleChange = (selOption: Option | null, actionMeta: ActionMeta<Option>) => {
    if (selOption !== null) {
        const course = schwundfaktorDaten[Number(selOption.value)];
        setSelectedCourse(course);
    }
  };

  const chartData = sfDevChart({ sfData: selectedCourse });

  return (
    <div className='sfDevContainer'>
      <Col>
        <Row className='sfDevChart'>
          {chartData}
        </Row>
        <Row >
          <Col className='sfDevFilter' xs="1">
        <label className='sfDevFilterLabel align-middle'>Studiengang:</label>
        </Col>
        <Col>
          <Select
                isClearable={true}
                isSearchable={true}
                options={sfDevFilterOptions}
                onChange={handleChange}
                defaultValue={sfDevFilterOptions[6]}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default SfDevComponent;