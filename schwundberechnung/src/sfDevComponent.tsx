import { useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { schwundfaktorDaten } from './helperData';
import sfDevChart from './sfDevChart';
import { Option } from 'react-select/src/filters';
import './sfDevComponent.css';

const SfDevComponent = () => {
  const [selectedCourse, setSelectedCourse] = useState(schwundfaktorDaten[0]);

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
      <div className='sfDevChart'>
        {chartData}
      </div>
      <div className='sfDevFilter'>
      <label className='sfDevFilterLabel'>Studiengang:</label>
        <Select
              isClearable={true}
              isSearchable={true}
              options={sfDevFilterOptions}
              onChange={handleChange}
              defaultValue={sfDevFilterOptions[0]}
          />
      </div>
    </div>
  );
};

export default SfDevComponent;