import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';
import { fetchCourseData, fetchReportingData, fetchStudyProgressAnalysis } from "../util/api_calls";
import SchwundfaktorFormat from "../charts/helperTypes";

/**
 * Parent component containing Sidebar, Navbar and Dashboards.
 * 
 * @returns Admin Component
 */
function Admin() {
  /**
   * State variable for selected base course. 
   * Passed to the components in each route in getRoutes().
   */
  const [selectedBaseCourse, setSelectedBaseCourse] = React.useState([]);
  /**
   * State variable for selected courses in comparison.
   * Passed to the components in each route in getRoutes().
   */
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  /**
   * State variable for selected year.
   * Passed to the components in each route in getRoutes().
   */
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedCohort, setSelectedCohort] = React.useState(null);
 
  const mainPanel = React.useRef(null);
  /**
   * Uses routes defined in routes.js to create Route components, which are embedded in the return function of this class.
   * 
   * @param routes 
   * @returns Route components
   */
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            element={<prop.component 
              selectedBaseCourse={selectedBaseCourse} 
              selectedCourses={selectedCourses}
              selectedYear={selectedYear}
              selectedCohort={selectedCohort}/>
            }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  // API Calls for filters
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearsData, setYearsData] = useState([]);
  const [studyProgressData, setStudyProgressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseDataResult = await fetchCourseData();
        setCourseData(courseDataResult);
        const studyProgressResult = await fetchStudyProgressAnalysis();
        setStudyProgressData(studyProgressResult);
        //fetch initial selectedBaseCourse
        const initialBaseCourse = await fetchReportingData(undefined, courseDataResult[0].shortened);
        setSelectedBaseCourse(initialBaseCourse);
        setSelectedYear(initialBaseCourse[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  /**
  * Maps options from courseDataResult to value, label and data fields.
  * This is passed down to AdminNavbar.
  */
  const baseCourseOptions = courseData.map((course, index) => (
    {
      value: String(index),
      label: course.shortened,
      labelLong: course.shortened + " - " + course.course,
      data: null
    }
  ));

  /**
   * Maps options from yearsData to value and label fields.
   * This is passed down to AdminNavbar.
   */
  const yearsOptions = selectedBaseCourse.map((entry) => ({
    value: String(entry.year),
    label: entry.year,
    data: null,
  }));

  const cohortOptions = 
    studyProgressData
      .filter(item => item?.course === selectedBaseCourse[0]?.course && item?.cohorts !== null)
      .map(item => {
        const yearMatch = item.year.match(/\d{4}/);
        return yearMatch ? yearMatch[0] : null;
      })
      .filter(year => year !== null) // Remove any null values
      .map((year) => ({
        value: year,
        label:year
      })); 

  if (selectedCohort == null) {
    setSelectedCohort(cohortOptions[0]?.label)
  }
  

  /**
   * Function to handle the change in the base course Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  const handleBaseCourseChange = (selOption) => {
    if (selOption !== null) {
      //Set selected base course
      fetchReportingData(undefined, selOption.label)
        .then((data) => {
          setSelectedBaseCourse(data);
      
          //Set available years based on selected base course
          setYearsData(selectedBaseCourse.map((entry) => entry.year));
          //Reset selected year
          setSelectedYear(selectedBaseCourse[0]);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  /**
   * Function to handle the change in the year Select component.
   * This is passed down to AdminNavbar.
   * @param selOption 
   */
  const handleYearChange = (selOption) => {
    if (selOption !== null) {
      const selYear = selectedBaseCourse.find((entry) => entry.year === selOption.label);
      if (selYear !== undefined) {
        setSelectedYear(selYear);
      }
    }
  };

  const handleCohortChange = (selOption) => {
    setSelectedCohort(selOption.label);
  }

  /**
   * Maps options from courseData to value and label fields for select option.
   * This is passed down to AdminNavbar.
   */
  const coursesOptions = courseData
        .filter((course) => course?.shortened !== selectedBaseCourse[0]?.course)
        .map((course, index) => ({
          value: String(index),
          label: course?.shortened,
          labelLong: course?.shortened + " - " + course?.course,
  }));

  /**
   * Function to handle the change in the comparative courses Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  function handleCoursesChange(selOptions) {
    if (selOptions !== null) {
        //One giant call and throw not needed away instead of multiple single calls
        fetchReportingData(undefined, undefined)
          .then((data) => {
            const selCoursesNames = selOptions.map((selection) => selection.label);
            let selCourses = data.filter((entry) => selCoursesNames.includes(entry.course));
            // Sort selCourses by "course" and then by "year" in ascending order
            selCourses.sort((a, b) => {
              if (a.course < b.course) return -1;
              if (a.course > b.course) return 1;
              // If courses are equal, compare by year
              return a.year - b.year;
            });
            setSelectedCourses(selCourses);
          })
          .catch((error) => {
            setError(error.message);
          });
    } else {
      setSelectedCourses([]);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar routes={routes} /> 
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar 
              baseCourseOptions={baseCourseOptions} handleBaseCourseChange={handleBaseCourseChange}
              coursesOptions={coursesOptions} handleCoursesChange={handleCoursesChange}
              yearsOptions={yearsOptions} handleYearChange={handleYearChange}
              cohortOptions={cohortOptions} handleCohortChange={handleCohortChange}
          />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;