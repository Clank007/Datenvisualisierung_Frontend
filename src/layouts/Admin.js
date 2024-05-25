import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import routes from "../routes.js";

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
            element={<prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={routes} /> 
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;