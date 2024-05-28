import Select, { ActionMeta, MultiValue } from "react-select";
import { schwundfaktorDaten } from './helperData';
import sfCoursesChart from "./sfCoursesChart";
import "./sfCoursesComponent.css";
import { useState } from "react";
import SchwundfaktorFormat from "./helperTypes";

type SelectOption = {
    value: string;
    label: string;
};

const SfCoursesComponent = () => {
    const [selectedCourses, setSelectedCourses] = useState<SchwundfaktorFormat[]>([]);
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
            <div className='sfCoursesChart'>
                {chartData}
            </div>
            <div className='sfCoursesFilter'>
                <label className='sfCoursesFilterLabel'>Studiengänge:</label>
                <Select
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    options={sfCoursesFilterOptions}
                    onChange={handleChange}
                    defaultValue={sfCoursesFilterOptions[0]}
                />
            </div>
        </div>
    )
};

export default SfCoursesComponent;