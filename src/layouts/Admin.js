import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';

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

  /**
   * Maps options from schwundfaktorDaten to value, label and data fields.
   * This is passed down to AdminNavbar.
   */
  const baseCourseOptions = schwundfaktorDaten.map((course, index) => ({
    value: String(index),
    label: course.course,
    data: null
  }));


  /**
   * Function to handle the change in the base course Select component.
   * This is passed down to AdminNavbar.
   * 
   * @param selOption 
   */
  const handleBaseCourseChange = (selOption) => {
    if (selOption !== null) {
      setSelectedBaseCourses(schwundfaktorDaten[Number(selOption.value)]);
      console.log(selectedBaseCourse);
    }
  };

  /**
   * Maps options from schwundfaktorDaten to value and label fields.
   * This is passed down to AdminNavbar.
   */
  const coursesOptions = schwundfaktorDaten
    .filter((course) => course.course !== selectedBaseCourse.course)
    .map((course, index) => ({
        value: String(index),
        label: course.course
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