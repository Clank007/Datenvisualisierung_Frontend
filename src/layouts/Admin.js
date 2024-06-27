import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';
import { fetchCourseData } from "../util/api_calls";
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
  const [selectedBaseCourse, setSelectedBaseCourses] = React.useState(schwundfaktorDaten[6]);
  /**
   * State variable for selected courses in comparison.
   * Passed to the components in each route in getRoutes().
   */
  const [selectedCourses, setSelectedCourses] = React.useState([]);
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

  // API Calls
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearsData, setYearsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseDataResult = await fetchCourseData();
        setCourseData(courseDataResult);
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
  const yearsOptions = selectedBaseCourse.years
    .filter((year, index) => selectedBaseCourse.faktor[index] !== null)
    .map((year, index) => ({
      value: String(year),
      label: year,
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
      setSelectedBaseCourses(mapBECourseToTempData(selOption.label));
      // Could also just be a constant array since the years are the same for all courses as of now
      setYearsData(mapBECourseToTempData(selOption.label));
      setSelectedYear(null);
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
    }
  };


  /**
   * Selects the corresponding shrinkageFactor data from the current constants by the selected course from BE
   * @param {string} beCourse 
   * @returns {SchwundfaktorFormat}
   */
  function mapBECourseToTempData(beCourse) {
    return schwundfaktorDaten.find((entry) => entry.course === beCourse );
  }

  /**
   * Maps options from schwundfaktorDaten to value and label fields.
   * This is passed down to AdminNavbar.
   */
  const coursesOptions = courseData
    .filter((course) => course.shortened !== selectedBaseCourse.course)
    .map((course, index) => ({
        value: String(index),
        label: course.shortened,
        labelLong: course.shortened + " - " + course.course,
    }));

  /**
   * Function to handle the change in the comparative courses Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  function handleCoursesChange(selOptions) {
      if (selOptions !== null) {
          const selCourses = selOptions.map((selOption) => mapBECourseToTempData(selOption.label));
          setSelectedCourses(selCourses);
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