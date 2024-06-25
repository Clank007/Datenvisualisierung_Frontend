import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';
import { fetchCourseData } from "../util/api_calls";

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
            element={<prop.component selectedBaseCourse={selectedBaseCourse} selectedCourses={selectedCourses}/>}
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
   * Function to handle the change in the base course Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  const handleBaseCourseChange = (selOption) => {
    if (selOption !== null) {
      setSelectedBaseCourses(schwundfaktorDaten[Number(selOption.value)]);
    }
  };

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
          const selCourses = selOptions.map((selOption) => schwundfaktorDaten[Number(selOption.value)]);
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