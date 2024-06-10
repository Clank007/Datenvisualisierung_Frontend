import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

import { schwundfaktorDaten } from '../charts/helperData';

function Admin() {
  //const [image, setImage] = React.useState(sidebarImage);
  //const [color, setColor] = React.useState("black");
  const color = "black"
  //const [hasImage, setHasImage] = React.useState(false);
  //const location = useLocation();

  
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            element={<prop.component selectedBaseStudiengang={selectedBaseStudiengang}/>}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const baseStudiengangOptions = schwundfaktorDaten.map((course, index) => ({
    value: String(index),
    label: course.course,
    data: null
  }));

  const [selectedBaseStudiengang, setSelectedBaseStudiengang] = React.useState(schwundfaktorDaten[6]);

  const handleBaseStudiengagChange = (selOption) => {
    if (selOption !== null) {
      setSelectedBaseStudiengang(schwundfaktorDaten[Number(selOption.value)]);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={routes} /> 
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar baseStudiengangOptions={baseStudiengangOptions} handleBaseStudiengagChange={handleBaseStudiengagChange}/>
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;