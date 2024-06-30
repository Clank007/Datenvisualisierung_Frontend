import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';
import { fetchCourseData, fetchReportingData } from "../util/api_calls";
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
              selectedYear={selectedYear}/>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseDataResult = await fetchCourseData();
        setCourseData(courseDataResult);
        //fetch initial selectedBaseCourse
        const initialBaseCourse = await fetchReportingData(undefined, courseDataResult[0].shortened);
        setSelectedBaseCourse(initialBaseCourse);
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
          setSelectedYear(yearsData[0]);
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
      setSelectedYear(selOption.label);
      //TODO: change data for development chart and pass it down via adminnavbar #fuck clean coding
    }
  };

  /**
   * Maps options from courseData to value and label fields for select option.
   * This is passed down to AdminNavbar.
   */
  const coursesOptions = () => {
    if (selectedBaseCourse) {
      return courseData
        .filter((course) => course.shortened !== selectedBaseCourse[0].course)
        .map((course, index) => ({
          value: String(index),
          label: course.shortened,
          labelLong: course.shortened + " - " + course.course,
      }));
    }
    return [];
  }

  /**
   * Function to handle the change in the comparative courses Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  function handleCoursesChange(selOptions) {
    let selCourses = [];
    if (selOptions !== null) {
        //One giant call and throw not needed away instead of multiple single calls
        fetchReportingData()
          .then((data) => {
            const selCoursesNames = selOptions.map((selection) => selection.label);
            selCourses = data.filter((entry) => selCoursesNames.includes(entry.course));
            // Sort selCourses by "course" and then by "year" in ascending order
            selCourses.sort((a, b) => {
              if (a.course < b.course) return -1;
              if (a.course > b.course) return 1;
              // If courses are equal, compare by year
              return a.year - b.year;
            });
          })
          .catch((error) => {
            setError(error.message);
          });
    }
    setSelectedCourses(selCourses);
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